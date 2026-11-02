/*
  The 3D machines of Basic Understanding outside Unit 4 (engine: tour3d.js).
  One model per unit; a topic picks the parts it needs with `show` and walks
  them with `focus`, one part per beat (skill rule 7, basic-understanding.md §8).

    magnetTour       Unit 1  iron core + coil + battery, air gap, flux, domains,
                             eddy rings, laminations, coil 2 + lamp, bar magnet +
                             loop + meter, magnet poles + rod (force)
    transformerTour  Unit 2  core, primary, secondary, AC source, lamp load, flux,
                             leakage, tank + bushings, tap (auto), 3-phase core
    inductionTour    Unit 5  frame, stator, 3-phase winding, rotating field,
                             cage or slip-ring rotor, rheostat, supply, capacitors, engine
    syncTour         Unit 6  frame, stator, winding, salient or round rotor,
                             field coils, slip rings, exciter, damper, turbine, lamps, supply
    smallTour        Unit 7  single-phase stator: main + auxiliary winding,
                             capacitor, centrifugal switch, cage rotor, pulsing /
                             two counter-rotating fields; stepper (poles, coils,
                             magnet rotor, step); servo arm + sensor
  DC generator topics (Unit 3) use unit4/basics3d.js `motorTour` with its
  `lamp` and `engine` parts.

  Model keys (besides the engine's shot, focus, show, spin, flow, heat, labels):
    magnet:      flux 0–1 (flux dots round the core), air 0–1 (air gap opens),
                 align 0–1 (domains line up), eddy 0–1, lamp 0–1, move 0–1
                 (bar magnet in and out; the meter swings), push 0–1 (force on rod)
    transformer: flux, flow2 0–1 (current in the secondary and lamp), leak 0–1, tap 0–1
    induction:   field 0–1 (rotating field arrow), rmf −1…1 (its speed), rmfMs
    sync:        field 0–1 (rotor field arrow), rmf, rmfMs, lamp 0–1
    small:       pulse 0–1 (one field that only grows and shrinks), dfr 0–1 (the two
                 halves turning opposite ways), rot 0–1 (a rotating field: main + auxiliary), step 0,1,2,… (stepper position), arm 0–1
*/
import { clamp, makeTour, smooth } from './tour3d.js';

const COL = { north: 0xe03131, south: 0x1c7ed6, steel: 0x868e96, iron: 0x5c636a, copper: 0xd9480f, copper2: 0xa8461a, carbon: 0x343a40, field: 0x74c0fc, force: 0x2f9e44, flow: 0xffd43b, R: 0xe03131, Y: 0xf59f00, B: 0x1c7ed6, panel: 0xe9ecef, alu: 0xb0b7bf, purple: 0x9775fa };
const PI = Math.PI;

// A rectangular core in the x-y plane: two limbs (x = ±w/2) and two yokes.
// With `gap`, the right limb is cut at y = 0 and the piece `bridge` fills it.
function frame(api, name, { w = 3.7, h = 2.7, th = 0.7, d = 0.8, gap = false, color = COL.iron } = {}) {
  const { THREE, mesh } = api;
  const box = (x, y, sx, sy, n = name) => {
    const m = mesh(n, new THREE.BoxGeometry(sx, sy, d), color, { metalness: 0.45 });
    m.position.set(x, y, 0);
    return m;
  };
  box(-w / 2, 0, th, h + th);
  if (gap) {
    const piece = (h + th) / 2 - 0.15;
    box(w / 2, (h + th) / 4 + 0.075, th, piece);
    box(w / 2, -(h + th) / 4 - 0.075, th, piece);
    api.part('bridge');
    box(w / 2, 0, th, 0.3, 'bridge');
  } else box(w / 2, 0, th, h + th);
  box(0, h / 2, w - th, th);
  box(0, -h / 2, w - th, th);
  // Lamination lines on the front face, so it reads as stacked sheets.
  for (let i = -3; i <= 3; i++) {
    const l = mesh(name, new THREE.BoxGeometry(w + th, 0.012, 0.012), 0x343a40);
    l.position.set(0, (i * (h + th)) / 7.5, d / 2 + 0.01);
    l.scale.x = 0.999;
  }
  const z = d / 2 + 0.08;
  const loop = [[-w / 2, 0], [-w / 2, h / 2], [0, h / 2], [w / 2, h / 2], [w / 2, 0], [w / 2, -h / 2], [0, -h / 2], [-w / 2, -h / 2]].map(([x, y]) => api.V(x, y, z));
  return { w, h, th, d, loop };
}

// Turns of wire round a vertical limb at x (axis y) or a horizontal one at y (axis x).
function turns(api, name, { x = 0, y = 0, n = 6, from = -0.8, to = 0.8, r = 0.55, tube = 0.07, color = COL.copper, axis = 'y', z = 0 }) {
  const { THREE, mesh } = api;
  for (let i = 0; i < n; i++) {
    const s = n > 1 ? from + ((to - from) * i) / (n - 1) : 0;
    const t = mesh(name, new THREE.TorusGeometry(r, tube, 10, 32), color, { metalness: 0.5, roughness: 0.3 });
    if (axis === 'y') {
      t.rotation.x = PI / 2;
      t.position.set(x, y + s, z);
    } else {
      t.rotation.y = PI / 2;
      t.position.set(x + s, y, z);
    }
  }
}

// A light bulb: glass, base, and a glow driven by `amount` in update.
function bulb(api, name, [x, y, z]) {
  const { THREE, mesh } = api;
  const glass = mesh(name, new THREE.SphereGeometry(0.42, 24, 18), 0xfff3bf, { roughness: 0.2 });
  glass.position.set(x, y + 0.3, z);
  const cap = mesh(name, new THREE.CylinderGeometry(0.2, 0.2, 0.32, 18), 0x868e96, { metalness: 0.6 });
  cap.position.set(x, y - 0.2, z);
  return glass;
}
const glow = (m, amount, t) => {
  if (amount <= 0.02) return;
  m.material.emissive.setHex(0xffd43b);
  m.material.emissiveIntensity += amount * (1.1 + 0.1 * Math.sin(t / 90));
};

// A battery lying along x, + on the right.
function cell(api, name, [x, y, z]) {
  const { THREE, mesh, label } = api;
  const b = mesh(name, new THREE.CylinderGeometry(0.38, 0.38, 1.3, 26), 0x2b2f33);
  b.rotation.z = PI / 2;
  b.position.set(x, y, z);
  const c = mesh(name, new THREE.CylinderGeometry(0.39, 0.39, 0.28, 26), 0xfab005);
  c.rotation.z = PI / 2;
  c.position.set(x + 0.55, y, z);
  const p = label('+', { size: 0.36 });
  p.position.set(x + 0.55, y - 0.6, z + 0.1);
  const m = label('−', { size: 0.36 });
  m.position.set(x - 0.55, y - 0.6, z + 0.1);
  return [p, m];
}

// An AC source: a round dial with a sine wave on it.
function acSource(api, name, [x, y, z]) {
  const { THREE, mesh } = api;
  const body = mesh(name, new THREE.CylinderGeometry(0.62, 0.62, 0.3, 32), 0x343a40);
  body.rotation.x = PI / 2;
  body.position.set(x, y, z);
  const pts = Array.from({ length: 24 }, (_, i) => new THREE.Vector3(x - 0.4 + (0.8 * i) / 23, y + 0.22 * Math.sin((i / 23) * PI * 2), z + 0.17));
  const wave = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.035, 6), api.mat(name, 0xffd43b, { emissiveIntensity: 0.6 }));
  api.group(name).add(wave);
  return wave;
}

/* ── Unit 1: magnetic circuits and induction ─────────────────────────── */
export const magnetTour = makeTour({
  build(api) {
    const { THREE, part, mesh, free, V } = api;
    part('core');
    const F = frame(api, 'core', { gap: true });
    part('coil');
    turns(api, 'coil', { x: -F.w / 2, n: 7, from: -0.75, to: 0.75 });
    part('battery');
    const signs = cell(api, 'battery', [-4.3, -1.6, 0.6]);
    // Coil 2 on the top yoke and its lamp.
    part('coil2');
    turns(api, 'coil2', { y: F.h / 2, axis: 'x', n: 5, from: -0.5, to: 0.5, r: 0.5, color: COL.copper2 });
    part('lamp');
    const lampGlass = bulb(api, 'lamp', [0, 2.9, 0.4]);
    // Magnetic domains: little arrows on the front face, jumbled until `align`.
    part('domains');
    const doms = [];
    const along = [];
    for (let i = 0; i < 8; i++) along.push([-F.w / 2, -1.05 + (2.1 * i) / 7, PI / 2]);
    for (let i = 0; i < 4; i++) along.push([-1.1 + (2.2 * i) / 3, F.h / 2, 0]);
    for (let i = 0; i < 4; i++) along.push([-1.1 + (2.2 * i) / 3, -F.h / 2, PI]);
    along.forEach(([x, y, a], i) => {
      const g = new THREE.Group();
      const m = api.mat('domains', 0xffffff, { emissiveIntensity: 0.4 });
      const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.26, 8), m);
      const hd = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.14, 10), m);
      hd.position.y = 0.18;
      g.add(sh, hd);
      g.position.set(x, y, F.d / 2 + 0.06);
      api.group('domains').add(g);
      doms.push({ g, a, rnd: ((i * 137) % 360) * (PI / 180) });
    });
    // Eddy currents: glowing rings on the bottom yoke's face.
    part('eddy');
    const eddies = [-0.9, 0, 0.9].map((x) => {
      const e = mesh('eddy', new THREE.TorusGeometry(0.22, 0.03, 8, 28), 0xff922b, { emissiveIntensity: 0.8 });
      e.position.set(x, -F.h / 2, F.d / 2 + 0.06);
      return e;
    });
    // Laminations: a stack of thin insulated sheets beside the battery.
    part('sheets');
    for (let i = 0; i < 9; i++) {
      const s = mesh('sheets', new THREE.BoxGeometry(1.4, 1.0, 0.07), i % 2 ? 0x5c636a : 0x868e96, { metalness: 0.4 });
      s.position.set(-4.5, 1.5, -0.32 + i * 0.08);
    }
    // Bar magnet, a loop of wire and a meter (Faraday), on the right.
    part('magnet');
    const bar = api.group('magnet');
    const barN = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.5, 0.5), api.mat('magnet', COL.north));
    barN.position.x = -0.5;
    const barS = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.5, 0.5), api.mat('magnet', COL.south));
    barS.position.x = 0.5;
    bar.add(barN, barS);
    part('loop');
    turns(api, 'loop', { x: 4.6, y: 0, axis: 'x', n: 6, from: -0.45, to: 0.45, r: 0.6, color: COL.copper });
    part('meter');
    const meterBox = mesh('meter', new THREE.BoxGeometry(1.2, 0.9, 0.2), COL.panel);
    meterBox.position.set(4.6, 1.9, 0.2);
    const needle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.6, 0.04), api.mat('meter', 0xc92a2a));
    needle.geometry.translate(0, 0.3, 0);
    needle.position.set(4.6, 1.55, 0.34);
    api.group('meter').add(needle);
    // Magnet poles and a rod (force on a current-carrying conductor).
    part('poles');
    for (const [y, c] of [[1.1, COL.north], [-1.1, COL.south]]) {
      const p = mesh('poles', new THREE.BoxGeometry(1.6, 0.7, 1.6), c);
      p.position.set(5.0, y, 0);
    }
    const fieldArrows = [-0.45, 0.45].map((x) => {
      const a = api.arrow(COL.field, 1.2, 0.03);
      a.rotation.z = PI;
      a.position.set(5.0 + x, 0.6, 0.55);
      return a;
    });
    part('rod');
    const rod = mesh('rod', new THREE.CylinderGeometry(0.09, 0.09, 2.6, 14), COL.copper, { metalness: 0.5 });
    rod.rotation.x = PI / 2;
    rod.position.set(5.0, 0, 0);
    const force = api.arrow(COL.force, 1.1, 0.07);
    force.rotation.z = -PI / 2;

    const shots = {
      whole: [[-0.4, 1.6, 10.8], [-0.8, -0.2, 0]],
      core: [[-1.2, 1.2, 8.6], [-1.0, -0.3, 0]],
      coil: [[-3.4, 1.4, 5.6], [-1.85, 0, 0]],
      gap: [[3.6, 0.6, 4.6], [1.85, 0, 0]],
      top: [[0.2, 3.6, 6.4], [0, 1.4, 0]],
      battery: [[-4.0, 0.8, 6.4], [-3.4, -0.6, 0]],
      sheets: [[-3.2, 2.4, 4.6], [-4.5, 1.5, 0]],
      right: [[5.6, 1.6, 6.8], [4.8, 0.4, 0]],
      wide: [[1.6, 2.2, 13.5], [1.2, 0.2, 0]],
    };
    const anchors = {
      core: [0, -2.15, 0.6],
      coil: [-2.9, 1.2, 0.6],
      battery: [-4.3, -2.6, 0.6],
      flux: [0, 1.85, 0.8],
      bridge: [2.7, 0.0, 0.6],
      gap: [2.7, 0.0, 0.6],
      domains: [-0.6, -0.5, 0.8],
      eddy: [0, -2.0, 0.8],
      sheets: [-4.5, 2.35, 0.4],
      coil2: [0, 2.0, 0.8],
      lamp: [1.0, 3.3, 0.4],
      magnet: [6.6, -0.8, 0.4],
      loop: [4.6, -1.0, 0.6],
      meter: [4.6, 2.75, 0.4],
      poles: [6.3, 1.1, 0.8],
      rod: [5.0, -0.35, 1.6],
      force: [6.4, 0.3, 0.8],
    };
    const paths = {
      current: { pts: [V(-3.6, -1.6, 0.6), V(-3.0, -0.6, 0.9), V(-2.5, 0.75, 0.6), V(-1.85, 0.75, 0.62), V(-1.3, 0, 0.62), V(-1.85, -0.75, 0.62), V(-2.6, -1.2, 0.8), V(-3.8, -2.4, 0.8), V(-5.0, -1.6, 0.6)], color: 0xe8590c },
      flux: { pts: F.loop, loop: true, tube: false, dot: COL.field, dotR: 0.09, dots: 14, flowKey: 'flux', speed: 0.00016 },
      lampWire: { pts: [V(-0.4, 1.75, 0.45), V(-0.5, 2.4, 0.4), V(0, 2.6, 0.4), V(0.5, 2.4, 0.4), V(0.4, 1.75, 0.45)], color: COL.copper2, r: 0.035, dots: 6, flowKey: 'lamp' },
      rodCurrent: { pts: [V(5.0, 0, 1.3), V(5.0, 0, -1.3)], tube: false, dots: 6, flowKey: 'push' },
    };
    let ph = 0;
    return {
      shots,
      anchors,
      base: ['core', 'coil'],
      def: { flux: 0, air: 0, align: 0, eddy: 0, lamp: 0, move: 0, push: 0 },
      paths,
      links: { core: ['bridge'] },
      opacity: (st, name, o) => (name === 'bridge' ? o * (1 - st.air) : o),
      pathOn: (st, key, shown) =>
        key === 'current' ? +shown.has('battery') : key === 'flux' ? +shown.has('core') : key === 'lampWire' ? +shown.has('lamp') : +shown.has('rod'),
      update({ st, pr, mix, t, shown }) {
        signs.forEach((s) => (s.visible = shown.has('battery')));
        const al = mix(pr.align, st.align);
        doms.forEach(({ g, a, rnd }, i) => {
          g.visible = shown.has('domains');
          g.rotation.z = rnd + (a - PI / 2 - rnd) * al + (1 - al) * 0.25 * Math.sin(t / 300 + i);
        });
        const ed = mix(pr.eddy, st.eddy);
        eddies.forEach((e, i) => {
          e.scale.setScalar(0.6 + 0.4 * ed + 0.08 * Math.sin(t / 200 + i));
          e.rotation.z = t / 300;
          e.material.opacity *= ed;
        });
        glow(lampGlass, mix(pr.lamp, st.lamp), t);
        // Bar magnet: still at the loop's mouth, or moving in and out.
        const mv = mix(pr.move, st.move);
        ph = t / 520;
        bar.position.set(6.4 + 0.9 * Math.sin(ph) * mv, 0, 0);
        needle.rotation.z = -0.9 * Math.cos(ph) * mv;
        const pu = mix(pr.push, st.push);
        fieldArrows.forEach((a) => {
          a.visible = shown.has('poles');
          a.userData.m.opacity = shown.has('poles') ? 0.9 : 0;
        });
        rod.position.x = 5.0 + 0.35 * pu;
        force.visible = pu > 0.02 && shown.has('rod');
        force.userData.m.opacity = pu;
        force.position.set(5.2 + 0.35 * pu, 0, 0.9);
      },
    };
  },
});

/* ── Unit 2: transformer ─────────────────────────────────────────────── */
export const transformerTour = makeTour({
  build(api) {
    const { THREE, part, mesh, V } = api;
    part('core');
    const F = frame(api, 'core');
    part('primary');
    turns(api, 'primary', { x: -F.w / 2, n: 6, from: -0.8, to: 0.8, r: 0.56, tube: 0.08 });
    part('secondary');
    turns(api, 'secondary', { x: F.w / 2, n: 12, from: -0.9, to: 0.9, r: 0.52, tube: 0.05, color: COL.copper2 });
    part('source');
    acSource(api, 'source', [-4.6, 0, 0.5]);
    part('lamp');
    const lampGlass = bulb(api, 'lamp', [4.7, -0.2, 0.5]);
    part('leak');
    for (const x of [-F.w / 2, F.w / 2]) {
      const l = mesh('leak', new THREE.TorusGeometry(1.0, 0.025, 8, 40), COL.field, { emissiveIntensity: 0.6, opacity: 0.8 });
      l.position.set(x, 0, 0);
      l.scale.set(0.7, 1.15, 1);
    }
    part('tank');
    mesh('tank', new THREE.BoxGeometry(6.2, 4.6, 2.4), 0x4c6ef5, { opacity: 0.16, roughness: 0.1 });
    part('bushings');
    for (const x of [-2.2, -1.4, 1.4, 2.2]) {
      const b = mesh('bushings', new THREE.CylinderGeometry(0.16, 0.24, 0.9, 16), 0xf1f3f5, { roughness: 0.3 });
      b.position.set(x, 2.75, 0);
    }
    part('tap');
    const tap = mesh('tap', new THREE.BoxGeometry(0.34, 0.2, 0.34), 0x2f9e44, { emissiveIntensity: 0.3 });
    // Three-phase core (shown instead of the single-phase one).
    part('core3');
    for (const x of [-1.9, 0, 1.9]) {
      const l = mesh('core3', new THREE.BoxGeometry(0.6, 3.4, 0.8), COL.iron, { metalness: 0.45 });
      l.position.set(x, 0, 0);
    }
    for (const y of [1.45, -1.45]) {
      const yk = mesh('core3', new THREE.BoxGeometry(4.4, 0.6, 0.8), COL.iron, { metalness: 0.45 });
      yk.position.set(0, y, 0);
    }
    part('coils3');
    [[-1.9, COL.R], [0, COL.Y], [1.9, COL.B]].forEach(([x, c]) => turns(api, 'coils3', { x, n: 6, from: -0.75, to: 0.75, r: 0.5, tube: 0.07, color: c }));

    const shots = {
      whole: [[0.4, 1.8, 11.2], [0, 0, 0]],
      core: [[0, 1.2, 7.6], [0, 0, 0]],
      primary: [[-3.6, 1.2, 5.4], [-1.85, 0, 0]],
      secondary: [[3.6, 1.2, 5.4], [1.85, 0, 0]],
      source: [[-4.6, 1.2, 6.0], [-3.4, 0, 0]],
      load: [[4.8, 1.2, 6.0], [3.4, 0, 0]],
      tank: [[5.2, 4.0, 9.6], [0, 0.6, 0]],
      top: [[0, 5.4, 6.4], [0, 1.2, 0]],
    };
    const anchors = {
      core: [0, -2.2, 0.6],
      primary: [-2.6, 1.35, 0.8],
      secondary: [2.6, 1.45, 0.8],
      source: [-4.6, -1.0, 0.6],
      lamp: [4.7, -1.0, 0.6],
      load: [4.7, -1.0, 0.6],
      flux: [0, 1.9, 0.9],
      leak: [-1.85, -1.6, 1.0],
      tank: [0, 2.6, 1.3],
      bushings: [-1.8, 3.5, 0.2],
      tap: [-2.9, 0, 0.8],
      core3: [0, -2.1, 0.6],
      coils3: [0, 2.2, 0.6],
    };
    const paths = {
      pri: { pts: [V(-4.6, 0.55, 0.6), V(-3.4, 1.2, 0.7), V(-2.4, 0.8, 0.62), V(-1.3, 0, 0.62), V(-2.4, -0.8, 0.62), V(-3.4, -1.2, 0.7), V(-4.6, -0.55, 0.6)], color: 0xe8590c },
      sec: { pts: [V(2.4, 0.9, 0.62), V(3.6, 1.1, 0.6), V(4.7, 0.6, 0.5), V(4.7, -0.5, 0.5), V(3.6, -1.1, 0.6), V(2.4, -0.9, 0.62)], color: COL.copper2, r: 0.04, flowKey: 'flow2' },
      flux: { pts: F.loop, loop: true, tube: false, dot: COL.field, dotR: 0.09, dots: 14, flowKey: 'flux', speed: 0.00016 },
    };
    return {
      shots,
      anchors,
      base: ['core', 'primary', 'secondary'],
      def: { flux: 0, flow2: 0, leak: 0, tap: 0.5 },
      paths,
      opacity: (st, name, o) => (name === 'leak' ? o * st.leak : o),
      pathOn: (st, key, shown) => (key === 'pri' ? +shown.has('source') : key === 'sec' ? +shown.has('lamp') : +shown.has('core')),
      update({ st, pr, mix, t, shown }) {
        glow(lampGlass, mix(pr.flow2, st.flow2), t);
        tap.position.set(-F.w / 2 - 0.6, -0.8 + 1.6 * mix(pr.tap, st.tap), 0.3);
        tap.visible = shown.has('tap');
      },
    };
  },
});

/* ── Units 5 and 6: the round machines share a stator ───────────────── */
function stator(api, { slipRotor } = {}) {
  const { THREE, part, mesh } = api;
  part('frame');
  const shell = mesh('frame', new THREE.CylinderGeometry(2.55, 2.55, 2.6, 64, 1, true), COL.steel, { side: THREE.DoubleSide, metalness: 0.4 });
  shell.rotation.x = PI / 2;
  const feet = mesh('frame', new THREE.BoxGeometry(3.4, 0.3, 2.2), COL.iron);
  feet.position.set(0, -2.7, 0);
  for (let i = 0; i < 16; i++) {
    const fin = mesh('frame', new THREE.BoxGeometry(0.06, 0.22, 2.5), COL.steel, { metalness: 0.4 });
    const a = (i / 16) * PI * 2;
    fin.position.set(Math.cos(a) * 2.62, Math.sin(a) * 2.62, 0);
    fin.rotation.z = a + PI / 2;
  }
  part('stator');
  const ring = mesh('stator', new THREE.TorusGeometry(1.95, 0.42, 16, 64), COL.iron, { metalness: 0.45 });
  ring.scale.z = 2.6;
  // Three phases, two coil sides each, 120° apart, with end arcs.
  part('winding');
  const phases = [];
  [['R', 0], ['Y', (2 * PI) / 3], ['B', (4 * PI) / 3]].forEach(([p, a0]) => {
    const mats = [];
    for (const da of [0, PI]) {
      const a = a0 + da + PI / 2;
      const bar = mesh('winding', new THREE.BoxGeometry(0.34, 0.26, 2.5), COL[p], { metalness: 0.4 });
      bar.position.set(Math.cos(a) * 1.5, Math.sin(a) * 1.5, 0);
      bar.rotation.z = a;
      mats.push(bar.material);
    }
    for (const z of [-1.3, 1.3]) {
      const arc = mesh('winding', new THREE.TorusGeometry(1.5, 0.07, 8, 40, PI), COL[p], { metalness: 0.4 });
      arc.rotation.z = a0 + PI / 2;
      arc.position.z = z;
      mats.push(arc.material);
    }
    phases.push({ a0, mats });
  });
  return { phases };
}

// The rotating field: one bar across the bore, a red N head and a blue S tail.
function fieldBar(api, len = 2.4) {
  const { THREE } = api;
  const g = new THREE.Group();
  const mN = api.free(COL.north, { emissiveIntensity: 0.6 });
  const mS = api.free(COL.south, { emissiveIntensity: 0.6 });
  const mB = api.free(0xffffff, { emissiveIntensity: 0.5 });
  const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, len, 12), mB);
  const hN = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.4, 18), mN);
  hN.position.y = len / 2 + 0.2;
  const hS = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), mS);
  hS.position.y = -len / 2;
  g.add(sh, hN, hS);
  g.userData.mats = [mN, mS, mB];
  api.scene.add(g);
  return g;
}

/* ── Unit 5: three-phase induction machine ───────────────────────────── */
export const inductionTour = makeTour({
  build(api) {
    const { THREE, part, mesh, V } = api;
    const { phases } = stator(api);
    const rotor = new THREE.Group();
    api.scene.add(rotor);
    part('rotorCore', rotor);
    const core = mesh('rotorCore', new THREE.CylinderGeometry(1.15, 1.15, 2.2, 48), COL.iron, { metalness: 0.5 });
    core.rotation.x = PI / 2;
    part('cage', rotor);
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * PI * 2;
      const bar = mesh('cage', new THREE.BoxGeometry(0.12, 0.12, 2.5), COL.alu, { metalness: 0.7, roughness: 0.25 });
      bar.position.set(Math.cos(a) * 1.13, Math.sin(a) * 1.13, 0);
      bar.rotation.z = a;
    }
    for (const z of [-1.22, 1.22]) {
      const er = mesh('cage', new THREE.TorusGeometry(1.13, 0.1, 10, 48), COL.alu, { metalness: 0.7 });
      er.position.z = z;
    }
    part('slip', rotor);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * PI * 2;
      const bar = mesh('slip', new THREE.BoxGeometry(0.16, 0.16, 2.4), [COL.R, COL.Y, COL.B][i % 3], { metalness: 0.4 });
      bar.position.set(Math.cos(a) * 1.13, Math.sin(a) * 1.13, 0);
    }
    for (const z of [2.0, 2.3, 2.6]) {
      const sr = mesh('slip', new THREE.CylinderGeometry(0.42, 0.42, 0.16, 32), COL.copper, { metalness: 0.6 });
      sr.rotation.x = PI / 2;
      sr.position.z = z;
    }
    part('rheo');
    const box = mesh('rheo', new THREE.BoxGeometry(1.3, 1.1, 0.6), COL.panel, { roughness: 0.7 });
    box.position.set(3.9, 1.4, 0.4);
    for (let i = 0; i < 3; i++) {
      const c = mesh('rheo', new THREE.TorusGeometry(0.14, 0.04, 8, 16), 0x868e96);
      c.position.set(3.5 + i * 0.4, 1.4, 0.75);
    }
    part('shaft', rotor);
    const shaft = mesh('shaft', new THREE.CylinderGeometry(0.14, 0.14, 7.0, 20), 0xced4da, { metalness: 0.7 });
    shaft.rotation.x = PI / 2;
    for (let i = 0; i < 3; i++) {
      const blade = mesh('shaft', new THREE.BoxGeometry(0.3, 1.3, 0.05), 0xc8a27a);
      const a = (i / 3) * PI * 2;
      blade.position.set(Math.cos(a + PI / 2) * 0.7, Math.sin(a + PI / 2) * 0.7, -3.3);
      blade.rotation.z = a;
      blade.rotation.y = 0.35;
    }
    part('supply');
    const sbox = mesh('supply', new THREE.BoxGeometry(1.0, 1.6, 0.6), 0x343a40);
    sbox.position.set(-4.4, 0, 0.6);
    part('capacitor');
    for (let i = 0; i < 3; i++) {
      const c = mesh('capacitor', new THREE.CylinderGeometry(0.26, 0.26, 0.8, 20), 0x4c6ef5);
      c.position.set(3.6 + i * 0.62, -2.2, 1.2);
    }
    part('engine');
    const eng = mesh('engine', new THREE.BoxGeometry(1.6, 1.6, 1.4), 0x2b8a3e);
    eng.position.set(0, 0, -4.6);
    const field = fieldBar(api);
    field.position.z = 1.45;

    const shots = {
      whole: [[5.0, 2.8, 9.4], [0, 0, 0.3]],
      front: [[0.3, 0.5, 8.6], [0, 0, 0.6]],
      inside: [[2.6, 1.8, 7.6], [0, 0, 0.6]],
      side: [[8.0, 2.0, 2.4], [0, 0, 0]],
      supply: [[-3.2, 1.6, 8.0], [-2.6, 0, 0.5]],
      slip: [[4.2, 1.8, 8.2], [1.4, 0.6, 1.4]],
      back: [[3.2, 2.4, -8.2], [0, 0, -2.4]],
      wide: [[3.4, 3.0, 12.4], [0.2, 0, 0]],
    };
    const anchors = {
      frame: [0, 3.0, 0.6],
      stator: [-1.95, 2.3, 1.4],
      winding: [0.6, -2.1, 1.6],
      field: [0, 1.6, 1.8],
      rotorCore: [0, -0.55, 1.6],
      cage: [0.9, 0.9, 1.7],
      slip: [0.4, -0.7, 2.8],
      rheo: [3.9, 2.3, 0.4],
      shaft: [0.5, -0.4, 3.4],
      supply: [-4.4, 1.2, 0.6],
      capacitor: [4.2, -1.5, 1.2],
      engine: [0, 1.2, -4.6],
    };
    const lead = (y, c) => ({ wire: true, pts: [V(-3.9, y, 0.6), V(-2.9, y, 0.6), V(-2.9, y, 1.35), V(-2.3, y, 1.35), V(-2.3, y * 0.5, 1.35), V(-1.6, y * 0.5, 1.35)], color: c, r: 0.045, bend: 0.12, dots: 5 });
    const paths = { r: lead(0.45, COL.R), y: lead(0, COL.Y), b: lead(-0.45, COL.B) };
    return {
      shots,
      anchors,
      base: ['frame', 'stator', 'winding', 'rotorCore', 'cage', 'shaft'],
      def: { field: 0, rmf: 0 },
      spins: [['spin', 'spinMs'], ['rmf', 'rmfMs']],
      paths,
      opacity: (st, name, o) => (name === 'frame' ? o * 0.55 : o),
      pathOn: (st, key, shown) => +shown.has('supply'),
      update({ st, pr, mix, angle, shown }) {
        rotor.rotation.z = angle.spin;
        const fk = mix(pr.field, st.field);
        field.visible = fk > 0.02;
        field.rotation.z = angle.rmf;
        field.userData.mats.forEach((m) => (m.opacity = fk));
        // Each phase glows when the field points along it: three-phase timing made visible.
        if (fk > 0.02 && shown.has('winding'))
          for (const { a0, mats } of phases) {
            const lit = Math.max(0, Math.cos(angle.rmf - a0)) * fk;
            mats.forEach((m) => (m.emissiveIntensity += 0.7 * lit));
          }
      },
    };
  },
});

/* ── Unit 6: three-phase synchronous machine ─────────────────────────── */
export const syncTour = makeTour({
  build(api) {
    const { THREE, part, mesh, V } = api;
    const { phases } = stator(api);
    const rotor = new THREE.Group();
    api.scene.add(rotor);
    part('salient', rotor);
    const hub = mesh('salient', new THREE.CylinderGeometry(0.55, 0.55, 2.2, 32), COL.iron, { metalness: 0.5 });
    hub.rotation.x = PI / 2;
    part('fieldCoil', rotor);
    part('damper', rotor);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * PI * 2;
      const c = i % 2 ? COL.south : COL.north;
      const body = mesh('salient', new THREE.BoxGeometry(0.55, 0.7, 2.1), c);
      body.position.set(Math.cos(a) * 0.85, Math.sin(a) * 0.85, 0);
      body.rotation.z = a + PI / 2;
      const shoe = mesh('salient', new THREE.CylinderGeometry(1.25, 1.25, 2.1, 24, 1, true, -a + PI / 2 - 0.45, 0.9), c, { side: THREE.DoubleSide });
      shoe.rotation.x = PI / 2;
      const coil = mesh('fieldCoil', new THREE.TorusGeometry(0.5, 0.08, 8, 24), COL.copper, { metalness: 0.5 });
      coil.position.set(Math.cos(a) * 0.85, Math.sin(a) * 0.85, 0);
      coil.rotation.set(PI / 2, 0, a + PI / 2);
      coil.scale.set(1, 2.1, 1);
      for (const d of [-0.25, 0, 0.25]) {
        const bar = mesh('damper', new THREE.CylinderGeometry(0.035, 0.035, 2.2, 8), COL.copper2, { metalness: 0.6 });
        bar.rotation.x = PI / 2;
        bar.position.set(Math.cos(a + d) * 1.2, Math.sin(a + d) * 1.2, 0);
      }
    }
    part('round', rotor);
    const rc = mesh('round', new THREE.CylinderGeometry(1.2, 1.2, 2.4, 48), COL.iron, { metalness: 0.5 });
    rc.rotation.x = PI / 2;
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * PI * 2 + 0.3;
      if (i % 5 === 0) continue;
      const sl = mesh('round', new THREE.BoxGeometry(0.1, 0.1, 2.42), COL.copper, { metalness: 0.5 });
      sl.position.set(Math.cos(a) * 1.18, Math.sin(a) * 1.18, 0);
    }
    part('sliprings', rotor);
    for (const z of [1.9, 2.2]) {
      const sr = mesh('sliprings', new THREE.CylinderGeometry(0.4, 0.4, 0.16, 32), COL.copper, { metalness: 0.6 });
      sr.rotation.x = PI / 2;
      sr.position.z = z;
    }
    part('exciter', rotor);
    const ex = mesh('exciter', new THREE.CylinderGeometry(0.6, 0.6, 0.8, 32), 0x495057, { metalness: 0.4 });
    ex.rotation.x = PI / 2;
    ex.position.z = 3.0;
    part('shaft', rotor);
    const shaft = mesh('shaft', new THREE.CylinderGeometry(0.14, 0.14, 8.0, 20), 0xced4da, { metalness: 0.7 });
    shaft.rotation.x = PI / 2;
    part('brushes');
    for (const z of [1.9, 2.2]) {
      const b = mesh('brushes', new THREE.BoxGeometry(0.2, 0.3, 0.14), COL.carbon);
      b.position.set(0, 0.55, z);
    }
    part('turbine', rotor);
    for (let i = 0; i < 6; i++) {
      const bl = mesh('turbine', new THREE.BoxGeometry(0.34, 1.6, 0.06), 0x2b8a3e);
      const a = (i / 6) * PI * 2;
      bl.position.set(Math.cos(a + PI / 2) * 0.85, Math.sin(a + PI / 2) * 0.85, -3.6);
      bl.rotation.z = a;
      bl.rotation.y = 0.5;
    }
    part('lamps');
    const glasses = [0, 1, 2].map((i) => bulb(api, 'lamps', [4.2 + i * 0.95, -1.6, 0.8]));
    part('supply');
    const sbox = mesh('supply', new THREE.BoxGeometry(1.0, 1.6, 0.6), 0x343a40);
    sbox.position.set(-4.4, 0, 0.6);
    const rotorField = fieldBar(api, 2.0);
    const statorField = fieldBar(api, 3.2);
    statorField.position.z = 1.5;
    rotorField.position.z = 1.35;

    const shots = {
      whole: [[5.0, 2.8, 9.4], [0, 0, 0.3]],
      front: [[0.3, 0.5, 8.6], [0, 0, 0.6]],
      inside: [[2.6, 1.8, 7.6], [0, 0, 0.6]],
      rotor: [[3.2, 1.6, 6.2], [0, 0, 1.2]],
      exciter: [[3.6, 1.6, 7.4], [0, 0.2, 2.6]],
      back: [[3.2, 2.4, -8.2], [0, 0, -2.4]],
      lamps: [[5.4, 1.2, 7.4], [3.6, -1.0, 0.6]],
      supply: [[-3.2, 1.6, 8.0], [-2.6, 0, 0.5]],
      wide: [[3.6, 3.0, 12.8], [0.6, 0, 0]],
    };
    const anchors = {
      frame: [0, 3.0, 0.6],
      stator: [-1.95, 2.3, 1.4],
      winding: [0.6, -2.1, 1.6],
      salient: [0, -0.6, 1.6],
      round: [0, -0.6, 1.7],
      fieldCoil: [0.9, 0.9, 1.6],
      damper: [-0.9, -1.0, 1.7],
      sliprings: [0.6, -0.6, 2.4],
      brushes: [0, 1.0, 2.2],
      exciter: [0.9, 0.9, 3.0],
      shaft: [0.5, -0.4, 3.8],
      turbine: [0, 1.6, -3.6],
      lamps: [5.15, -0.4, 0.8],
      supply: [-4.4, 1.2, 0.6],
      field: [0, 1.5, 1.9],
    };
    const lead = (y, c, from) => ({ wire: true, pts: from ? [V(1.6, y * 0.5, 1.35), V(2.3, y * 0.5, 1.35), V(2.3, y, 1.35), V(4.2 + (y + 0.45) * 2.1, y, 1.35), V(4.2 + (y + 0.45) * 2.1, -1.0, 1.35), V(4.2 + (y + 0.45) * 2.1, -1.0, 0.8)] : [V(-3.9, y, 0.6), V(-2.9, y, 0.6), V(-2.9, y, 1.35), V(-2.3, y, 1.35), V(-2.3, y * 0.5, 1.35), V(-1.6, y * 0.5, 1.35)], color: c, r: 0.045, bend: 0.12, dots: 5 });
    const paths = {
      r: lead(0.45, COL.R), y: lead(0, COL.Y), b: lead(-0.45, COL.B),
      or: lead(0.45, COL.R, true), oy: lead(0, COL.Y, true), ob: lead(-0.45, COL.B, true),
    };
    return {
      shots,
      anchors,
      base: ['frame', 'stator', 'winding', 'salient', 'fieldCoil', 'shaft'],
      def: { field: 0, rmf: 0, lamp: 0 },
      spins: [['spin', 'spinMs'], ['rmf', 'rmfMs']],
      paths,
      links: { sliprings: ['brushes'] },
      opacity: (st, name, o) => (name === 'frame' ? o * 0.55 : o),
      pathOn: (st, key, shown) => (key.length === 1 ? +shown.has('supply') : +shown.has('lamps')),
      update({ st, pr, mix, t, angle, shown }) {
        rotor.rotation.z = angle.spin;
        const fk = mix(pr.field, st.field);
        rotorField.visible = fk > 0.02;
        rotorField.rotation.z = angle.spin;
        rotorField.userData.mats.forEach((m) => (m.opacity = fk));
        const sk = shown.has('supply') ? fk : 0;
        statorField.visible = sk > 0.02;
        statorField.rotation.z = angle.rmf;
        statorField.userData.mats.forEach((m) => (m.opacity = sk * 0.7));
        if (fk > 0.02 && shown.has('winding'))
          for (const { a0, mats } of phases) {
            const lit = Math.max(0, Math.cos((shown.has('supply') ? angle.rmf : angle.spin) - a0)) * fk;
            mats.forEach((m) => (m.emissiveIntensity += 0.7 * lit));
          }
        const lk = mix(pr.lamp, st.lamp);
        glasses.forEach((g, i) => glow(g, lk * (0.75 + 0.25 * Math.max(0, Math.cos(angle.spin - (i * 2 * PI) / 3))), t));
      },
    };
  },
});

/* ── Unit 7: fractional-kilowatt motors ──────────────────────────────── */
export const smallTour = makeTour({
  build(api) {
    const { THREE, part, mesh, V } = api;
    part('frame');
    const shell = mesh('frame', new THREE.CylinderGeometry(2.4, 2.4, 2.4, 64, 1, true), COL.steel, { side: THREE.DoubleSide, metalness: 0.4 });
    shell.rotation.x = PI / 2;
    part('stator');
    const ring = mesh('stator', new THREE.TorusGeometry(1.85, 0.4, 16, 64), COL.iron, { metalness: 0.45 });
    ring.scale.z = 2.5;
    part('main');
    part('aux');
    for (const [name, a0, c] of [['main', PI / 2, COL.copper], ['aux', 0, COL.purple]]) {
      for (const da of [0, PI]) {
        const a = a0 + da;
        const bar = mesh(name, new THREE.BoxGeometry(0.34, 0.3, 2.4), c, { metalness: 0.4 });
        bar.position.set(Math.cos(a) * 1.45, Math.sin(a) * 1.45, 0);
        bar.rotation.z = a;
      }
      for (const z of [-1.25, 1.25]) {
        const arc = mesh(name, new THREE.TorusGeometry(1.45, name === 'main' ? 0.09 : 0.06, 8, 40, PI), c, { metalness: 0.4 });
        arc.rotation.z = a0;
        arc.position.z = z;
      }
    }
    part('capacitor');
    const cap = mesh('capacitor', new THREE.CylinderGeometry(0.4, 0.4, 1.2, 24), 0x343a40);
    cap.position.set(-3.6, 1.4, 0.6);
    const capBand = mesh('capacitor', new THREE.CylinderGeometry(0.41, 0.41, 0.2, 24), 0x4c6ef5);
    capBand.position.set(-3.6, 1.8, 0.6);
    const rotor = new THREE.Group();
    api.scene.add(rotor);
    part('rotorCore', rotor);
    const core = mesh('rotorCore', new THREE.CylinderGeometry(1.1, 1.1, 2.2, 48), COL.iron, { metalness: 0.5 });
    core.rotation.x = PI / 2;
    part('cage', rotor);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * PI * 2;
      const bar = mesh('cage', new THREE.BoxGeometry(0.11, 0.11, 2.4), COL.alu, { metalness: 0.7 });
      bar.position.set(Math.cos(a) * 1.08, Math.sin(a) * 1.08, 0);
      bar.rotation.z = a;
    }
    part('switch', rotor);
    const sw = mesh('switch', new THREE.CylinderGeometry(0.55, 0.55, 0.12, 24), 0x2f9e44, { metalness: 0.4 });
    sw.rotation.x = PI / 2;
    sw.position.z = 1.8;
    const weights = [0, PI].map((a) => {
      const w = mesh('switch', new THREE.SphereGeometry(0.13, 12, 10), 0x495057);
      w.position.set(Math.cos(a) * 0.45, Math.sin(a) * 0.45, 1.9);
      return { w, a };
    });
    part('shaft', rotor);
    const shaft = mesh('shaft', new THREE.CylinderGeometry(0.13, 0.13, 6.6, 20), 0xced4da, { metalness: 0.7 });
    shaft.rotation.x = PI / 2;
    part('supply');
    const plug = mesh('supply', new THREE.BoxGeometry(0.9, 1.2, 0.5), 0x343a40);
    plug.position.set(-4.4, -0.6, 0.6);
    // Stepper: four poles with coils and a two-pole magnet rotor, at the same place.
    part('stepStator');
    const sring = mesh('stepStator', new THREE.TorusGeometry(1.95, 0.32, 14, 56), COL.iron, { metalness: 0.45 });
    sring.scale.z = 2.0;
    part('stepCoils');
    const poleCoils = [];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * PI * 2 + PI / 2;
      const p = mesh('stepStator', new THREE.BoxGeometry(0.5, 0.9, 1.6), COL.iron, { metalness: 0.45 });
      p.position.set(Math.cos(a) * 1.35, Math.sin(a) * 1.35, 0);
      p.rotation.z = a + PI / 2;
      const c = mesh('stepCoils', new THREE.TorusGeometry(0.42, 0.08, 8, 24), COL.copper, { metalness: 0.5 });
      c.position.set(Math.cos(a) * 1.35, Math.sin(a) * 1.35, 0);
      c.rotation.set(PI / 2, 0, a + PI / 2);
      c.scale.set(1, 1.8, 1);
      poleCoils.push({ m: c.material, a });
    }
    const stepRotor = new THREE.Group();
    api.scene.add(stepRotor);
    part('stepRotor', stepRotor);
    const sn = mesh('stepRotor', new THREE.BoxGeometry(0.5, 0.8, 1.4), COL.north);
    sn.position.y = 0.4;
    const ss = mesh('stepRotor', new THREE.BoxGeometry(0.5, 0.8, 1.4), COL.south);
    ss.position.y = -0.4;
    part('arm', stepRotor);
    const arm = mesh('arm', new THREE.BoxGeometry(0.12, 1.6, 0.1), 0xfab005, { emissiveIntensity: 0.3 });
    arm.position.set(0, 0.8, 1.4);
    part('sensor');
    const sensor = mesh('sensor', new THREE.TorusGeometry(1.75, 0.05, 8, 64), 0x2f9e44, { emissiveIntensity: 0.4 });
    sensor.position.z = 1.4;

    // The pulsating field, and its two halves turning opposite ways.
    const pulse = fieldBar(api, 2.4);
    pulse.position.z = 1.45;
    const half1 = fieldBar(api, 1.6);
    const half2 = fieldBar(api, 1.6);
    half1.position.z = 1.5;
    half2.position.z = 1.55;

    const shots = {
      whole: [[4.6, 2.6, 9.0], [-0.4, 0, 0.3]],
      front: [[0.3, 0.5, 8.4], [0, 0, 0.6]],
      inside: [[2.6, 1.8, 7.4], [0, 0, 0.6]],
      cap: [[-2.8, 2.2, 6.6], [-2.6, 0.8, 0.5]],
      switch: [[2.8, 1.4, 6.0], [0, 0, 1.8]],
      side: [[7.6, 2.0, 2.4], [0, 0, 0]],
    };
    const anchors = {
      frame: [0, 2.9, 0.6],
      stator: [-1.9, 2.2, 1.4],
      main: [0, 2.0, 1.6],
      aux: [2.2, -0.6, 1.6],
      capacitor: [-3.6, 2.5, 0.6],
      rotorCore: [0, -0.55, 1.6],
      cage: [0.9, 0.9, 1.6],
      switch: [0.9, -0.7, 2.1],
      shaft: [0.5, -0.4, 3.2],
      supply: [-4.4, 0.3, 0.6],
      field: [0, 1.7, 1.9],
      stepStator: [-1.9, 2.0, 1.2],
      stepCoils: [1.4, 1.4, 1.2],
      stepRotor: [0, -1.0, 1.4],
      arm: [0.4, 1.9, 1.6],
      sensor: [1.4, -1.4, 1.6],
    };
    const paths = {
      line: { wire: true, pts: [V(-4.0, -0.4, 0.8), V(-3.0, -0.4, 0.8), V(-3.0, -0.4, 1.3), V(-3.0, 1.5, 1.3), V(-0.4, 1.5, 1.3)], color: 0xe8590c, dots: 6 },
      capLine: { wire: true, pts: [V(-3.6, 0.8, 0.8), V(-2.7, 0.8, 0.8), V(-2.7, 0.8, 1.2), V(-2.7, 0, 1.2), V(-1.5, 0, 1.2)], color: COL.purple, r: 0.04, bend: 0.12, dots: 5 },
    };
    return {
      shots,
      anchors,
      base: ['frame', 'stator', 'main', 'rotorCore', 'cage', 'shaft'],
      def: { pulse: 0, dfr: 0, rot: 0, step: 0 },
      paths,
      links: { stepStator: ['stepCoils'] },
      opacity: (st, name, o) => (name === 'frame' ? o * 0.55 : o),
      pathOn: (st, key, shown) => (key === 'line' ? +shown.has('supply') : +(shown.has('capacitor') && shown.has('aux'))),
      update({ st, pr, mix, t, ms, angle, speed, shown }) {
        rotor.rotation.z = angle.spin;
        // The centrifugal switch's weights fly out as the rotor gets up to speed.
        weights.forEach(({ w, a }) => {
          const r = 0.45 + 0.25 * clamp((Math.abs(speed) - 0.5) / 0.3);
          w.position.set(Math.cos(a) * r, Math.sin(a) * r, 1.9);
        });
        const pk = mix(pr.pulse, st.pulse);
        pulse.visible = pk > 0.02;
        const s = Math.sin(t / 260);
        pulse.scale.set(1, Math.max(0.05, Math.abs(s)), 1);
        pulse.rotation.z = s >= 0 ? 0 : PI;
        pulse.userData.mats.forEach((m) => (m.opacity = pk));
        // A true rotating field (main + auxiliary winding), shown on the same bar.
        const rk = mix(pr.rot, st.rot);
        if (rk > pk) {
          pulse.visible = rk > 0.02;
          pulse.scale.set(1, 1, 1);
          pulse.rotation.z = t / 260;
          pulse.userData.mats.forEach((m) => (m.opacity = rk));
        }
        const dk = mix(pr.dfr, st.dfr);
        for (const [h, dir] of [[half1, 1], [half2, -1]]) {
          h.visible = dk > 0.02;
          h.rotation.z = dir * (t / 260);
          h.userData.mats.forEach((m) => (m.opacity = dk));
        }
        // Stepper: the rotor jumps a quarter turn per step, toward the lit pole.
        const stepK = smooth(clamp(ms / 450));
        const ang = (pr.step + (st.step - pr.step) * stepK) * (PI / 2);
        stepRotor.rotation.z = -ang;
        poleCoils.forEach(({ m }, i) => {
          if (((st.step % 4) + 4) % 4 === i && shown.has('stepCoils')) m.emissiveIntensity += 0.9;
        });
      },
    };
  },
});
