/*
  Basic Understanding (segment 1, skill rule 7) in 3D for every unit that is
  not the DC motor: one machine, built once, walked through part by part. The
  engine here is the same idea as unit4/basics3d.js `motorTour`, made generic:
  a MODEL (models3d.js) builds the parts and says how its own keys look; a
  topic writes only a PLAN, one entry per beat of its duo().

    three: transformerTour([
      { shot: 'whole', show: ['core', 'primary', 'secondary'] },
      { focus: ['primary'], flow: 1, labels: [['primary', 'primary']] },
      …
    ])

  Keys every model understands (a key left out keeps the previous beat's
  value; `focus: null` clears the focus; `labels` never carry over):
    shot    a name from the model's shots, or [x, y, z]; the camera glides there
    focus   parts that stay bright and pulse; every other shown part fades to 0.22
    show    parts drawn at all (default: the model's `base`)
    spin    −1…1 of full speed for the model's rotor (if it has one)
    spinMs  how slowly the speed changes (default 900; ~6000 = coasting)
    flow    0–1, dots along the model's paths that are on (current, flux)
    heat    { part: 0–1 } red-hot glow (losses)
    labels  [[text, anchor or [x, y, z]], …], one after another, `gap` ms apart
  Model keys are listed in models3d.js beside each model.

  Every value is a function of (beat, ms) only, so a seek, a pause and the
  offline MP4 render show the same frame (M1). Only spin angles accumulate.
*/
import { kit } from '../unit4/scenes41.js';

export const smooth = (t) => t * t * (3 - 2 * t);
export const clamp = (t) => Math.max(0, Math.min(1, t));
const FULL = 0.0042; // full spin, rad per ms

export const makeTour = (model) => (plan) =>
  function build(THREE, scene) {
    const { label, show: showLabel } = kit(THREE, scene);
    const parts = {};
    const api = {
      THREE,
      scene,
      label,
      part(name, parent = scene) {
        const g = new THREE.Group();
        parent.add(g);
        parts[name] = { group: g, mats: [] };
        return g;
      },
      mat(name, color, o = {}) {
        const m = new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.15, transparent: true, emissive: color, emissiveIntensity: 0, ...o });
        m.userData.base = o.emissiveIntensity ?? 0;
        m.userData.opacity = o.opacity ?? 1;
        parts[name].mats.push(m);
        return m;
      },
      mesh(name, geo, color, o) {
        const m = new THREE.Mesh(geo, api.mat(name, color, o));
        parts[name].group.add(m);
        return m;
      },
      // A free material (arrows, dots) that the engine does not fade.
      free(color, o = {}) {
        return new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.45, transparent: true, ...o });
      },
      arrow(color, len = 1, r = 0.06) {
        const g = new THREE.Group();
        const m = api.free(color);
        const sh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len - 0.3, 12), m);
        sh.position.y = (len - 0.3) / 2;
        const hd = new THREE.Mesh(new THREE.ConeGeometry(r * 2.6, 0.3, 16), m);
        hd.position.y = len - 0.15;
        g.add(sh, hd);
        g.userData.m = m;
        scene.add(g);
        return g;
      },
      V: (x, y, z) => new THREE.Vector3(x, y, z),
      group: (name) => parts[name].group,
    };
    const M = model.build(api);
    const { shots, anchors = {}, base, def = {}, paths = {}, links = {} } = M;

    // Flow paths: a tube (a part of its own) and dots that run along it.
    const curves = {};
    const tubes = {};
    const dots = {};
    for (const [k, p] of Object.entries(paths)) {
      curves[k] = new THREE.CatmullRomCurve3(p.pts, !!p.loop, 'catmullrom', 0.3);
      if (p.tube !== false) {
        const m = new THREE.MeshStandardMaterial({ color: p.color ?? 0xe8590c, roughness: 0.5, transparent: true });
        tubes[k] = new THREE.Mesh(new THREE.TubeGeometry(curves[k], 100, p.r ?? 0.05, 8, !!p.loop), m);
        scene.add(tubes[k]);
      }
      dots[k] = Array.from({ length: p.dots ?? 9 }, () => {
        const d = new THREE.Mesh(new THREE.SphereGeometry(p.dotR ?? 0.075, 10, 8), api.free(p.dot ?? 0xffd43b, { emissiveIntensity: 0.9 }));
        scene.add(d);
        return d;
      });
    }

    const tags = plan.map((e) => (e?.labels ?? []).map(([text, at]) => ({ sprite: label(text, { size: 0.36 }), at })));
    for (const list of tags) for (const t of list) t.sprite.visible = false;

    const DEF = { shot: Object.keys(shots)[0], focus: null, show: base, spin: 0, flow: 0, heat: {}, ...def };
    const states = [];
    plan.forEach((e, i) => {
      const prev = states[i - 1] ?? DEF;
      states.push({ ...prev, labels: undefined, ...(e ?? {}), heat: { ...(e?.heat ?? (i ? prev.heat : {})) } });
    });
    const stateAt = (b) => states[Math.min(b, states.length - 1)];
    const shotOf = (s) => (Array.isArray(s) ? [s, [0, 0, 0]] : shots[s] ?? Object.values(shots)[0]);
    const names = Object.keys(parts);
    const shownOf = (st) => {
      const shown = new Set([...(st.show ?? base), ...(st.focus ?? [])]);
      for (const [p, subs] of Object.entries(links)) if (shown.has(p)) subs.forEach((s) => shown.add(s));
      return shown;
    };
    const opacityOf = (st, name) => {
      const shown = shownOf(st);
      if (!shown.has(name)) return 0;
      const owner = Object.entries(links).find(([, subs]) => subs.includes(name))?.[0];
      const focused = !st.focus || st.focus.includes(name) || (owner && st.focus.includes(owner));
      const o = focused ? 1 : 0.22;
      return M.opacity ? M.opacity(st, name, o) : o;
    };
    const V = (a) => new THREE.Vector3(...a);
    const spinAngle = {};

    return ({ beat, ms, dt, camera, look }) => {
      const st = stateAt(beat);
      const pr = beat > 0 ? stateAt(beat - 1) : st;
      const k = smooth(clamp(ms / 600));
      const mix = (a, b, kk = k) => (a ?? 0) + ((b ?? 0) - (a ?? 0)) * kk;
      const t = beat * 7919 + ms;

      const kc = smooth(clamp(ms / 1200));
      const [fp, fa] = shotOf(pr.shot);
      const [tp, ta] = shotOf(st.shot);
      const pos = V(fp).lerp(V(tp), kc);
      const aim = V(fa).lerp(V(ta), kc);
      const rel = pos.clone().sub(aim);
      const r = rel.length();
      const yaw = Math.atan2(rel.x, rel.z) + look.yaw;
      const pitch = Math.max(-0.5, Math.min(1.2, Math.asin(rel.y / r) + look.pitch));
      camera.position.set(aim.x + r * Math.cos(pitch) * Math.sin(yaw), aim.y + r * Math.sin(pitch), aim.z + r * Math.cos(pitch) * Math.cos(yaw));
      camera.lookAt(aim);

      // Spins: `spin` drives M.rotor; a model may name more (e.g. rmf).
      const spinOf = (key, msKey) => mix(pr[key], st[key], smooth(clamp(ms / (st[msKey] ?? 900)))) * FULL;
      for (const [key, msKey] of M.spins ?? [['spin', 'spinMs']]) {
        spinAngle[key] = (spinAngle[key] ?? 0) + spinOf(key, msKey) * dt;
      }

      for (const name of names) {
        const p = parts[name];
        const o = mix(opacityOf(pr, name), opacityOf(st, name));
        p.group.visible = o > 0.02;
        const pulse = st.focus?.includes(name) ? (0.22 + 0.16 * Math.sin(t / 260)) * k : 0;
        const heat = mix(pr.heat?.[name] ?? 0, st.heat?.[name] ?? 0);
        for (const m of p.mats) {
          m.opacity = o * m.userData.opacity;
          m.depthWrite = o > 0.9;
          m.emissiveIntensity = m.userData.base + pulse + heat * (0.55 + 0.25 * Math.sin(t / 180));
          m.emissive.setHex(heat > 0.02 ? 0xff2200 : m.color.getHex());
        }
      }

      // Paths: a model says how much each is on in a state (0–1).
      const flowK = mix(pr.flow, st.flow);
      for (const [key, p] of Object.entries(paths)) {
        const on = mix(M.pathOn(pr, key, shownOf(pr)), M.pathOn(st, key, shownOf(st)));
        if (tubes[key]) {
          tubes[key].visible = on > 0.02;
          tubes[key].material.opacity = on * (p.tubeOpacity ?? 1);
        }
        const amt = p.flowKey ? mix(pr[p.flowKey], st[p.flowKey]) : flowK;
        const sp = p.speed ?? 0.00018;
        dots[key].forEach((d, i) => {
          d.visible = on > 0.5 && amt > 0.02;
          d.material.opacity = amt;
          const u = (((t * sp * (0.4 + amt) * (p.dir ?? 1) + i / dots[key].length) % 1) + 1) % 1;
          d.position.copy(curves[key].getPointAt(u));
        });
      }

      M.update({ st, pr, mix, k, t, ms, dt, beat, angle: spinAngle, speed: spinOf('spin', 'spinMs') / FULL, shown: shownOf(st) });

      tags.forEach((list, i) =>
        list.forEach((tg, j) => {
          const on = i === Math.min(beat, tags.length - 1) ? smooth(clamp((ms - 500 - j * (plan[i]?.gap ?? 1400)) / 500)) : 0;
          showLabel(tg.sprite, on);
          const at = Array.isArray(tg.at) ? tg.at : anchors[tg.at] ?? [0, 2, 1];
          tg.sprite.position.set(...at);
        }),
      );
    };
  };
