/*
  Basic Understanding (segment 1, skill rule 7) in 3D: one DC motor, built
  once, that a topic walks through part by part. Each topic writes only a
  plan, one entry per beat of its duo() (Tutor and Lecturer share it):

    three: motorTour([
      { shot: 'whole', spin: 0.3 },
      { shot: 'inside', open: 1, focus: ['poles', 'field'], label: [['Magnet: N', 'north'], ['S', 'south']] },
      …
    ])

  Entry keys (all optional; a key left out keeps the previous beat's value,
  so a beat gives only what changes; `focus: null` clears the focus;
  `labels` never carry over):
    shot    a name from SHOTS or [x, y, z]; the camera glides there (aim follows)
    focus   parts that stay bright and glow; every other shown part fades
    show    parts drawn at all (default: the motor, without battery and starter)
    open    0–1, the yoke (outer frame) turns see-through to show the inside
    spin    0–1 of full speed; negative turns the other way
    spinMs  how slowly the speed changes to `spin` (default 900; ~6000 = coasting down)
    push    0–1, the two force arrows on the coil sides (one down, one up)
    field   0–1, the field arrows N → S and how strong the poles glow
    flow    0–1, dots moving along the wires (needs 'battery' in show)
    wiring  'main' | 'shunt' | 'series' | 'compound' | 'none': which wires are drawn
    back    0–1, the orange "push back" arrow against the battery's push
    heat    { coil, fieldCoil, armature, brushes, fan }: 0–1 red-hot glow
    spark   0–1, sparks at the brushes
    ac      true: the battery stands for an AC supply (universal motor): its + and − marks hide
    stud    0–5, the starter handle's stud (0 = off); it glides between beats
    studMs  how slowly the handle glides there (default 500; ~3000 = stud by stud)
    labels  [[text, anchor or [x, y, z]], …], shown on this beat only, each
            coming in `gap` ms after the last (the line names them in order)

  Parts: yoke, poles (north, south), fieldCoil, field, armature, coil,
  commutator, brushes, shaft, fan, battery, wires, starter (studs, handle,
  nvc, olr), and for the DC generator (Unit 3) lamp (the load, in place of the
  battery; it glows with `flow`) and engine (the prime mover behind the shaft). Anchors for labels are the part names plus north/south/nvc/olr.
  Every motion runs on the scene clock (M1): pause, seek and the MP4 match.
*/
import { kit } from './scenes41.js';

const smooth = (t) => t * t * (3 - 2 * t);
const clamp = (t) => Math.max(0, Math.min(1, t));

// Camera shots: [position, aim].
export const SHOTS = {
  whole: [[5.2, 3.0, 9.6], [-0.4, 0, 0.4]],
  inside: [[2.6, 2.2, 8.4], [0, 0, 0.6]],
  front: [[0.6, 1.0, 8.6], [0, 0, 1]],
  commutator: [[3.4, 1.8, 6.6], [0, 0, 1.7]],
  side: [[7.6, 2.4, 3.2], [0, 0, 0]],
  wiring: [[-0.6, 2.6, 10.6], [-1.6, -0.6, 0.8]],
  starter: [[-3.6, 1.6, 8.0], [-4.3, 0.5, 0.8]],
  back: [[3.2, 2.4, -7.6], [0, 0, -1.6]],
  engine: [[4.2, 2.4, -8.6], [0, 0, -3.6]],
};

const ANCHORS = {
  yoke: [0, 2.75, 0.6],
  north: [-1.9, 1.75, 1.3],
  south: [1.9, 1.75, 1.3],
  poles: [0, 2.3, 1.3],
  fieldCoil: [-2.0, -1.55, 1.3],
  field: [0, 1.45, 1.5],
  armature: [0, 1.5, 0.2],
  coil: [0.9, 1.35, 1.25],
  commutator: [1.25, 0.55, 2.2],
  brushes: [-1.0, 0.95, 2.1],
  shaft: [0.6, -0.55, 3.3],
  fan: [0, 1.6, -3.4],
  battery: [-3.5, -3.0, 1.6],
  lamp: [-3.5, -0.9, 1.6],
  engine: [0, 1.3, -5.0],
  wires: [-1.9, -1.9, 1.9],
  starter: [-4.6, 2.15, 1.2],
  studs: [-4.6, 1.75, 1.3],
  handle: [-4.0, 0.2, 1.5],
  nvc: [-3.3, 1.45, 1.4],
  olr: [-5.4, -0.2, 1.4],
};

const MOTOR = ['yoke', 'poles', 'fieldCoil', 'armature', 'coil', 'commutator', 'brushes', 'shaft', 'fan'];
const COL = { north: 0xe03131, south: 0x1c7ed6, steel: 0x868e96, iron: 0x5c636a, copper: 0xd9480f, carbon: 0x343a40, force: 0x2f9e44, field: 0x74c0fc, back: 0xf08c00, flow: 0xffd43b, panel: 0xe9ecef };
const R = 1.0; // armature radius
const SLOTS = 12;
const COMM_Z = 1.75; // commutator along the shaft (front)
const FULL = 0.0042; // full spin, rad per ms

export function motorTour(plan) {
  return function build(THREE, scene) {
    const { label, show: showLabel } = kit(THREE, scene);
    const parts = {}; // name → { group, mats }
    const part = (name, parent = scene) => {
      const g = new THREE.Group();
      parent.add(g);
      parts[name] = { group: g, mats: [], fade: 0 };
      return g;
    };
    const mat = (name, color, o = {}) => {
      const m = new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.15, transparent: true, emissive: color, emissiveIntensity: 0, ...o });
      m.userData.base = o.emissiveIntensity ?? 0;
      m.userData.opacity = o.opacity ?? 1;
      parts[name].mats.push(m);
      return m;
    };
    const mesh = (name, geo, color, o) => {
      const m = new THREE.Mesh(geo, mat(name, color, o));
      parts[name].group.add(m);
      return m;
    };

    // ── The frame and the field ───────────────────────────────────────
    part('yoke');
    const yoke = mesh('yoke', new THREE.CylinderGeometry(2.45, 2.45, 2.6, 64, 1, true), COL.steel, { side: THREE.DoubleSide, metalness: 0.4 });
    yoke.rotation.x = Math.PI / 2;
    const ring = mesh('yoke', new THREE.TorusGeometry(2.45, 0.12, 12, 64), COL.steel, { metalness: 0.4 });
    ring.position.z = 1.3;
    const feet = mesh('yoke', new THREE.BoxGeometry(3.2, 0.3, 2.2), COL.iron);
    feet.position.set(0, -2.55, 0);

    part('poles');
    const poleMesh = {};
    for (const [key, x, c] of [['north', -1.72, COL.north], ['south', 1.72, COL.south]]) {
      const body = mesh('poles', new THREE.BoxGeometry(0.7, 0.9, 2.2), c);
      body.position.x = x;
      // The pole shoe: a curved face hugging the armature.
      const shoe = mesh('poles', new THREE.CylinderGeometry(1.28, 1.28, 2.2, 32, 1, true, x < 0 ? -Math.PI / 2 - 0.55 : Math.PI / 2 - 0.55, 1.1), c, { side: THREE.DoubleSide });
      shoe.rotation.x = Math.PI / 2;
      poleMesh[key] = body;
    }
    part('fieldCoil');
    for (const x of [-1.85, 1.85]) {
      for (let k = 0; k < 4; k++) {
        const w = mesh('fieldCoil', new THREE.TorusGeometry(0.62, 0.07, 10, 28), COL.copper, { metalness: 0.5, roughness: 0.3 });
        w.rotation.y = Math.PI / 2;
        w.scale.set(1, 0.85, 1.6);
        w.position.set(x + (x < 0 ? -1 : 1) * (k * 0.13 - 0.2), 0, 0);
      }
    }
    part('field');
    const fieldArrows = [-0.75, 0, 0.75].map((y) => {
      const g = new THREE.Group();
      const m = mat('field', COL.field, { emissiveIntensity: 0.5 });
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.0, 10), m);
      shaft.rotation.z = Math.PI / 2;
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.24, 14), m);
      head.rotation.z = -Math.PI / 2;
      head.position.x = 1.1;
      g.add(shaft, head);
      g.position.set(0, y, 1.32);
      parts.field.group.add(g);
      return g;
    });

    // ── What turns: armature, coil, commutator, shaft, load fan ─────────
    const rotor = new THREE.Group();
    scene.add(rotor);
    part('armature', rotor);
    const core = mesh('armature', new THREE.CylinderGeometry(R, R, 2.2, 48), COL.iron, { metalness: 0.5 });
    core.rotation.x = Math.PI / 2;
    part('coil', rotor);
    for (let i = 0; i < SLOTS; i++) {
      const a = (i / SLOTS) * Math.PI * 2;
      const bar = mesh('coil', new THREE.BoxGeometry(0.16, 0.16, 2.36), COL.copper, { metalness: 0.5, roughness: 0.3 });
      bar.position.set(Math.cos(a) * (R + 0.02), Math.sin(a) * (R + 0.02), 0);
      bar.rotation.z = a;
    }
    for (const z of [-1.18, 1.18]) {
      const end = mesh('coil', new THREE.TorusGeometry(R + 0.02, 0.07, 10, 48), COL.copper, { metalness: 0.5, roughness: 0.3 });
      end.position.z = z;
    }
    part('commutator', rotor);
    const seg = (Math.PI * 2) / SLOTS;
    for (let i = 0; i < SLOTS; i++) {
      const s = mesh('commutator', new THREE.CylinderGeometry(0.45, 0.45, 0.6, 6, 1, false, i * seg + 0.04, seg - 0.08), COL.copper, { metalness: 0.6, roughness: 0.25 });
      s.rotation.x = Math.PI / 2;
      s.position.z = COMM_Z;
    }
    const mica = mesh('commutator', new THREE.CylinderGeometry(0.43, 0.43, 0.61, 24), COL.carbon);
    mica.rotation.x = Math.PI / 2;
    mica.position.z = COMM_Z;
    part('shaft', rotor);
    const shaft = mesh('shaft', new THREE.CylinderGeometry(0.13, 0.13, 7.4, 20), 0xced4da, { metalness: 0.7, roughness: 0.25 });
    shaft.rotation.x = Math.PI / 2;
    shaft.position.z = -0.5;
    part('fan', rotor);
    for (let i = 0; i < 3; i++) {
      const blade = mesh('fan', new THREE.BoxGeometry(0.34, 1.5, 0.05), 0xc8a27a, { roughness: 0.6 });
      const a = (i / 3) * Math.PI * 2;
      blade.position.set(Math.cos(a + Math.PI / 2) * 0.82, Math.sin(a + Math.PI / 2) * 0.82, -3.6);
      blade.rotation.z = a;
      blade.rotation.y = 0.35;
    }
    // Brushes stand still, pressing on the commutator top and bottom.
    part('brushes');
    for (const y of [0.72, -0.72]) {
      const b = mesh('brushes', new THREE.BoxGeometry(0.3, 0.42, 0.42), COL.carbon, { roughness: 0.8 });
      b.position.set(0, y, COMM_Z);
      const spring = mesh('brushes', new THREE.CylinderGeometry(0.06, 0.06, 0.36, 8), 0xadb5bd, { metalness: 0.6 });
      spring.position.set(0, y + Math.sign(y) * 0.38, COMM_Z);
    }

    // The two forces on the coil sides (left down, right up): the pedal push.
    const pushArrows = [
      [-1.05, 0.55, -1],
      [1.05, -0.55, 1],
    ].map(([x, y, dir]) => {
      const g = new THREE.Group();
      const m = new THREE.MeshStandardMaterial({ color: COL.force, emissive: COL.force, emissiveIntensity: 0.4, transparent: true });
      const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.9, 12), m);
      sh.position.y = 0.45;
      const hd = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.3, 16), m);
      hd.position.y = 1.0;
      g.add(sh, hd);
      g.rotation.z = dir < 0 ? Math.PI : 0;
      g.position.set(x, y, 1.5);
      scene.add(g);
      return { g, m };
    });

    // ── Battery, wires, the current's dots ──────────────────────────────
    part('battery');
    const bat = mesh('battery', new THREE.CylinderGeometry(0.42, 0.42, 1.5, 28), 0x2b2f33, { roughness: 0.5 });
    bat.rotation.z = Math.PI / 2;
    bat.position.set(-3.5, -2.2, 1.6);
    const cap = mesh('battery', new THREE.CylinderGeometry(0.43, 0.43, 0.32, 28), 0xfab005);
    cap.rotation.z = Math.PI / 2;
    cap.position.set(-2.9, -2.2, 1.6);
    const tip = mesh('battery', new THREE.CylinderGeometry(0.13, 0.13, 0.16, 14), 0xced4da, { metalness: 0.7 });
    tip.rotation.z = Math.PI / 2;
    tip.position.set(-2.67, -2.2, 1.6);
    const plus = label('+', { size: 0.42 });
    const minus = label('−', { size: 0.42 });
    plus.position.set(-2.95, -2.8, 1.7);
    minus.position.set(-4.1, -2.8, 1.7);

    part('wires');
    const P = (x, y, z) => new THREE.Vector3(x, y, z);
    const PLUS = P(-2.6, -2.2, 1.6);
    const MINUS = P(-4.3, -2.2, 1.6);
    const TOP = P(0, 0.98, COMM_Z);
    const BOT = P(0, -0.98, COMM_Z);
    const NC = P(-2.35, 0, 1.25); // north field coil, outer face
    const SC = P(2.35, 0, 1.25);
    const paths = {
      mainPlus: [PLUS, P(-2.2, -1.2, 2.5), P(-1.2, 1.9, 2.6), P(-0.25, 1.6, COMM_Z), TOP],
      mainMinus: [BOT, P(0.1, -1.6, 2.4), P(-1.6, -3.0, 2.4), P(-3.6, -3.1, 2.0), MINUS],
      // Series: the whole current through both field coils, then the brushes.
      series: [PLUS, P(-2.4, -1.0, 1.9), NC, P(-1.2, 2.8, 1.4), P(1.4, 2.8, 1.4), SC, P(2.0, 1.6, 2.4), P(0.4, 1.7, COMM_Z), TOP],
      // Shunt: its own path, across the battery, through both field coils.
      shunt: [PLUS, P(-3.0, -1.0, 0.6), NC, P(-1.2, 2.9, 0.4), P(1.4, 2.9, 0.4), SC, P(2.6, -1.8, 0.6), P(-1.0, -3.3, 1.0), MINUS],
    };
    const curves = {};
    const wireMeshes = {};
    for (const [k, pts] of Object.entries(paths)) {
      curves[k] = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.3);
      const m = mat('wires', k === 'shunt' ? 0x9775fa : 0xe8590c, { roughness: 0.5 });
      wireMeshes[k] = new THREE.Mesh(new THREE.TubeGeometry(curves[k], 90, k === 'shunt' ? 0.035 : 0.055, 8, false), m);
      parts.wires.group.add(wireMeshes[k]);
    }
    const DOTS = 9;
    const dots = Object.fromEntries(
      Object.keys(paths).map((k) => [
        k,
        Array.from({ length: DOTS }, () => {
          const d = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), new THREE.MeshStandardMaterial({ color: COL.flow, emissive: COL.flow, emissiveIntensity: 0.9, transparent: true }));
          scene.add(d);
          return d;
        }),
      ]),
    );
    // The battery's push (green) and the motor's push back (orange).
    const pushOf = (color, x, y, dir) => {
      const g = new THREE.Group();
      const m = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.45, transparent: true });
      const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.1, 12), m);
      sh.rotation.z = Math.PI / 2;
      const hd = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.34, 16), m);
      hd.rotation.z = -dir * (Math.PI / 2);
      hd.position.x = dir * 0.7;
      g.add(sh, hd);
      g.position.set(x, y, 1.9);
      scene.add(g);
      return { g, m };
    };
    const supplyPush = pushOf(COL.force, -3.5, -1.15, 1);
    const backPush = pushOf(COL.back, -3.5, -1.6, -1);

    // ── Generator (Unit 3): a lamp in place of the battery, an engine at the back ──
    part('lamp');
    const lampGlass = mesh('lamp', new THREE.SphereGeometry(0.5, 24, 18), 0xfff3bf, { roughness: 0.2 });
    lampGlass.position.set(-3.5, -1.85, 1.6);
    const lampCap = mesh('lamp', new THREE.CylinderGeometry(0.22, 0.22, 0.36, 18), 0x868e96, { metalness: 0.6 });
    lampCap.position.set(-3.5, -2.5, 1.6);
    part('engine');
    const engine = mesh('engine', new THREE.BoxGeometry(2.0, 1.8, 1.4), 0x2b8a3e, { roughness: 0.6 });
    engine.position.set(0, 0, -5.0);
    const pulley = mesh('engine', new THREE.CylinderGeometry(0.5, 0.5, 0.3, 24), 0x495057, { metalness: 0.5 });
    pulley.rotation.x = Math.PI / 2;
    pulley.position.set(0, 0, -4.15);

    // ── The starter: a panel, an arc of studs, the handle, NVC and OLR ──
    part('starter');
    const ST = P(-4.6, 0.3, 1.0); // handle pivot, left of the motor
    const panel = mesh('starter', new THREE.BoxGeometry(2.6, 2.4, 0.12), COL.panel, { roughness: 0.7 });
    panel.position.set(ST.x, ST.y + 0.55, ST.z - 0.1);
    const STUDS = 6; // 0 = off, 1–5 = studs, 5 = run
    const studAngle = (k) => Math.PI * (0.85 - (0.7 * k) / (STUDS - 1));
    for (let k = 0; k < STUDS; k++) {
      const a = studAngle(k);
      const s = mesh('starter', new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16), k ? 0xadb5bd : COL.carbon, { metalness: 0.6 });
      s.rotation.x = Math.PI / 2;
      s.position.set(ST.x + Math.cos(a) * 1.1, ST.y + Math.sin(a) * 1.1, ST.z);
      // The resistance between studs: a small coil of wire.
      if (k > 1) {
        const b = studAngle(k - 1);
        const r = mesh('starter', new THREE.TorusGeometry(0.12, 0.035, 8, 16), 0x868e96);
        r.position.set(ST.x + Math.cos((a + b) / 2) * 1.32, ST.y + Math.sin((a + b) / 2) * 1.32, ST.z);
      }
    }
    const handle = new THREE.Group();
    handle.position.copy(ST);
    parts.starter.group.add(handle);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.12, 0.1), mat('starter', 0x495057, { metalness: 0.5 }));
    arm.position.x = 0.58;
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), mat('starter', 0x212529));
    knob.position.x = 1.15;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.14, 14), mat('starter', 0x495057));
    hub.rotation.x = Math.PI / 2;
    handle.add(arm, knob, hub);
    part('nvc', parts.starter.group);
    const nvc = mesh('nvc', new THREE.TorusGeometry(0.16, 0.07, 10, 20), COL.copper, { metalness: 0.5 });
    nvc.position.set(ST.x + Math.cos(studAngle(STUDS - 1)) * 1.1 + 0.12, ST.y + Math.sin(studAngle(STUDS - 1)) * 1.1 - 0.3, ST.z + 0.05);
    part('olr', parts.starter.group);
    const olr = mesh('olr', new THREE.BoxGeometry(0.42, 0.26, 0.14), 0xc92a2a);
    olr.position.set(ST.x - 0.9, ST.y - 0.45, ST.z);

    // Sparks at the brushes.
    const sparks = Array.from({ length: 8 }, () => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshStandardMaterial({ color: COL.flow, emissive: COL.flow, emissiveIntensity: 1, transparent: true }));
      scene.add(s);
      return s;
    });

    // ── Labels: made once per beat entry ─────────────────────────────────
    const tags = plan.map((e) => (e?.labels ?? []).map(([text, at]) => ({ sprite: label(text, { size: 0.36 }), at })));
    for (const list of tags) for (const t of list) t.sprite.visible = false;

    // ── Per-beat state, carried forward so a beat may give only changes ──
    const DEF = { shot: 'whole', focus: null, show: MOTOR, open: 0, spin: 0, push: 0, field: 0, flow: 0, wiring: 'main', back: 0, heat: {}, spark: 0, stud: 0 };
    const states = [];
    plan.forEach((e, i) => {
      const prev = states[i - 1] ?? DEF;
      states.push({ ...prev, labels: undefined, ...(e ?? {}), heat: { ...(e?.heat ?? (i ? prev.heat : {})) } });
    });
    const stateAt = (b) => states[Math.min(b, states.length - 1)];
    const shotOf = (s) => (Array.isArray(s) ? [s, [0, 0, 0.5]] : SHOTS[s] ?? SHOTS.whole);

    // Everything below is a function of (beat, ms) only, so a seek, a pause
    // and the offline MP4 render show the same frame (M1): each value goes
    // from the previous beat's state to this beat's over the first ~0.6 s.
    // Only the spin angle accumulates (it is never read back).
    const parts0 = Object.keys(parts);
    const shownOf = (st) => {
      const shown = new Set([...(st.show ?? MOTOR), ...(st.focus ?? [])]);
      if (shown.has('starter')) shown.add('nvc').add('olr');
      if (shown.has('poles')) shown.add('field');
      if (shown.has('battery') || shown.has('lamp')) shown.add('wires');
      return shown;
    };
    // How visible a part is in a state: 1 focused (or no focus), 0.22 shown, 0 hidden.
    const opacityOf = (st, name) => {
      const shown = shownOf(st);
      if (!shown.has(name)) return 0;
      if (name === 'field') return st.field;
      const sub = name === 'nvc' || name === 'olr';
      const focused = !st.focus || st.focus.includes(name) || (sub && st.focus.includes('starter') && !st.focus.some((f) => f === 'nvc' || f === 'olr'));
      const o = focused ? 1 : 0.22;
      return name === 'yoke' ? o * (1 - 0.86 * st.open) : o;
    };
    const USE = { main: ['mainPlus', 'mainMinus'], shunt: ['mainPlus', 'mainMinus', 'shunt'], series: ['series', 'mainMinus'], compound: ['series', 'mainMinus', 'shunt'] };
    const powered = (st) => shownOf(st).has('battery') || shownOf(st).has('lamp');
    const wireOf = (st, key) => (powered(st) && (USE[st.wiring] ?? []).includes(key) ? 1 : 0);
    const V = (a) => new THREE.Vector3(...a);
    let angle = 0;

    return ({ beat, ms, dt, camera, look }) => {
      const st = stateAt(beat);
      const pr = beat > 0 ? stateAt(beat - 1) : st;
      const k = smooth(clamp(ms / 600));
      const mix = (a, b, kk = k) => a + (b - a) * kk;
      const t = beat * 7919 + ms; // phase for pulses, dots and sparks

      // Camera: from the previous beat's shot to this one's.
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

      // Spin: the speed eases between beats, so speeding up and slowing down are seen.
      const speed = mix(pr.spin, st.spin, smooth(clamp(ms / (st.spinMs ?? 900)))) * FULL;
      angle += speed * dt;
      rotor.rotation.z = angle;

      // Shown and focused parts: the focus glows, the rest softens (rule 18).
      for (const name of parts0) {
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
      // Field strength shows as the poles' glow.
      const fieldK = mix(pr.field, st.field);
      for (const key of ['north', 'south']) poleMesh[key].material.emissiveIntensity += 0.5 * fieldK;
      fieldArrows.forEach((g, i) => (g.position.x = -0.15 + 0.15 * Math.sin(t / 400 + i)));

      // Force arrows.
      const pushK = mix(pr.push, st.push);
      for (const a of pushArrows) {
        a.g.visible = pushK > 0.02;
        a.m.opacity = pushK;
        a.g.scale.setScalar(0.6 + 0.4 * pushK);
      }

      // Wires and current.
      const wiredOf = (x) => (powered(x) ? 1 : 0);
      const flowK = mix(wiredOf(pr) * pr.flow, wiredOf(st) * st.flow);
      for (const [key, wm] of Object.entries(wireMeshes)) {
        const w = mix(wireOf(pr, key), wireOf(st, key));
        wm.visible = w > 0.02;
        wm.material.opacity = w;
        dots[key].forEach((d, i) => {
          d.visible = w > 0.5 && flowK > 0.02;
          d.material.opacity = flowK;
          d.position.copy(curves[key].getPointAt((t * 0.00018 * (0.4 + st.flow) + i / DOTS) % 1));
        });
      }
      const backK = mix(wiredOf(pr) * pr.back, wiredOf(st) * st.back);
      supplyPush.g.visible = backK > 0.02;
      supplyPush.m.opacity = backK;
      backPush.g.visible = backK > 0.02;
      backPush.m.opacity = backK;
      backPush.g.scale.set(0.4 + 0.6 * clamp(speed / (FULL * 0.8)), 1, 1);

      // Sparks.
      const sparkK = mix(pr.spark, st.spark, smooth(clamp(ms / 250)));
      sparks.forEach((s, i) => {
        const ph = ((t / 90 + i * 1.7) % 6) / 6;
        s.visible = sparkK > 0.05;
        s.material.opacity = sparkK * (1 - ph);
        s.position.set(Math.sin(i * 2.3) * (0.25 + ph * 0.5), (i % 2 ? 0.55 : -0.55) + Math.cos(i * 1.9) * ph * 0.5, COMM_Z + 0.25 + ph * 0.3);
      });

      // Starter handle: glides from the last beat's stud to this one's.
      handle.rotation.z = studAngle(mix(pr.stud, st.stud, smooth(clamp(ms / (st.studMs ?? 500)))));

      // Labels of this beat, one after another.
      tags.forEach((list, i) =>
        list.forEach((tg, j) => {
          const on = i === Math.min(beat, tags.length - 1) ? smooth(clamp((ms - 500 - j * (plan[i]?.gap ?? 1400)) / 500)) : 0;
          showLabel(tg.sprite, on);
          const at = Array.isArray(tg.at) ? tg.at : ANCHORS[tg.at] ?? [0, 2, 1];
          tg.sprite.position.set(...at);
        }),
      );
      plus.visible = minus.visible = shownOf(st).has('battery') && !st.ac;
      // The lamp glows with the current the generator sends round.
      if (shownOf(st).has('lamp') && flowK > 0.02) {
        lampGlass.material.emissive.setHex(0xffd43b);
        lampGlass.material.emissiveIntensity += flowK * (1.1 + 0.1 * Math.sin(t / 90));
      }
    };
  };
}
