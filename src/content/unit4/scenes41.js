/*
  3D pictures for 4.1 Terms (segment 1 is playful, skill rule 7): things an
  8th-grader has seen, built in three.js and run on the scene clock
  (src/video/Stage3D.jsx: build(THREE, scene) → update({ beat, ms, dt, camera, look })).
    fan41     the ceiling fan at home, and the motor inside its hub (opener)
    swing41   a copper rod hung like a swing between a magnet's poles: current on, it kicks (F = BIl)
    torque41  the armature turning (motor3d.js), cues timed for these lines
    backEmf41 a toy motor, a cell and an ammeter: the needle falls as the motor speeds up
  Parts come in a little after a beat starts (CUE times, ms into the beat), so
  they appear as the line names them.
*/
import { buildMotor, CUE as MOTOR_CUE } from '../video/motor3d.js';

const smooth = (t) => t * t * (3 - 2 * t);
const clamp = (t) => Math.max(0, Math.min(1, t));

// Shared kit: materials, a camera-facing label, an arrow, the beat camera.
function kit(THREE, scene) {
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.15, ...o });
  // White text with a dark edge, readable on the blue page and the white one.
  const label = (text, { color = '#ffffff', size = 0.5, italic = false } = {}) => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 192;
    const g = c.getContext('2d');
    g.font = `${italic ? 'italic ' : ''}700 120px Poppins, Inter, sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.lineWidth = 18;
    g.strokeStyle = 'rgba(8, 30, 66, 0.85)';
    g.strokeText(text, 512, 100);
    g.fillStyle = color;
    g.fillText(text, 512, 100);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
    s.scale.set(size * 5.33, size, 1);
    s.userData.size = size;
    s.renderOrder = 10;
    scene.add(s);
    return s;
  };
  const show = (sprite, k) => {
    sprite.visible = k > 0.01;
    const z = sprite.userData.size * (0.6 + 0.4 * k);
    sprite.scale.set(z * 5.33, z, 1);
    sprite.material.opacity = k;
  };
  // Arrow along +y: shaft and head.
  const arrow = (color, len = 1) => {
    const g = new THREE.Group();
    const m = mat(color, { roughness: 0.6, emissive: color, emissiveIntensity: 0.25 });
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, len - 0.28, 12), m);
    shaft.position.y = (len - 0.28) / 2;
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.28, 16), m);
    head.position.y = len - 0.14;
    g.add(shaft, head);
    scene.add(g);
    return g;
  };
  // Camera: glides to each beat's shot, plus the viewer's drag.
  const rig = (shots, aim, move = 1200) => {
    const from = new THREE.Vector3();
    const pos = new THREE.Vector3(...shots[0]);
    let was = -1;
    return (b, ms, camera, look) => {
      const k = Math.min(b, shots.length - 1);
      if (k !== was) {
        from.copy(was < 0 ? pos.set(...shots[k]) : pos);
        was = k;
      }
      pos.copy(from).lerp(new THREE.Vector3(...shots[k]), smooth(Math.min(1, ms / move)));
      const r = pos.length();
      const yaw = Math.atan2(pos.x, pos.z) + look.yaw;
      const pitch = Math.max(-0.5, Math.min(1.2, Math.asin(pos.y / r) + look.pitch));
      camera.position.set(r * Math.cos(pitch) * Math.sin(yaw), r * Math.sin(pitch), r * Math.cos(pitch) * Math.cos(yaw));
      camera.lookAt(...aim);
    };
  };
  // 0 → 1 as a part comes in on beat k at `at` ms (stays after).
  const cueOf = (b, ms) => (k, at, dur = 600) => (b > k ? 1 : b < k ? 0 : smooth(clamp((ms - at) / dur)));
  return { mat, label, show, arrow, rig, cueOf };
}

/* ── The ceiling fan, and the motor in its hub ───────────────────────── */
export function fan41(THREE, scene) {
  const { mat, label, show, rig, cueOf } = kit(THREE, scene);
  const fan = new THREE.Group();
  fan.position.y = 0.6;
  scene.add(fan);
  const white = mat(0xf1f3f5, { roughness: 0.35 });
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.6, 16), white);
  rod.position.y = 1.2;
  const canopy = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 0.3, 32), white);
  canopy.position.y = 2.05;
  fan.add(rod, canopy);
  // The hub: a shell that turns see-through to show the motor inside.
  const shellMat = mat(0xe9ecef, { roughness: 0.3, transparent: true, opacity: 1 });
  const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.55, 48), shellMat);
  const rotor = new THREE.Group();
  fan.add(shell, rotor);
  for (let i = 0; i < 3; i++) {
    const arm = new THREE.Group();
    const blade = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.04, 0.55), mat(0xc8a27a, { roughness: 0.6 }));
    blade.position.x = 2.1;
    blade.rotation.x = 0.12;
    arm.add(blade);
    arm.rotation.y = (i * Math.PI * 2) / 3;
    rotor.add(arm);
  }
  // Inside: copper armature and the field poles (red N, blue S).
  const inside = new THREE.Group();
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.4, 32), mat(0xd9480f, { metalness: 0.5, roughness: 0.3 }));
  inside.add(core);
  for (const [x, c] of [[-0.66, 0xe03131], [0.66, 0x1c7ed6]]) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.36, 0.5), mat(c));
    p.position.x = x;
    inside.add(p);
  }
  fan.add(inside);
  const tMotor = label('DC motor', { size: 0.42 });
  const tags = [label('force F = BIl', { size: 0.55 }), label('torque Ta', { size: 0.55 }), label('back EMF Eb', { size: 0.55 })];
  const shot = rig([[0, 1.8, 11], [0, 2.8, 7.4], [1.8, 1.6, 9.4], [0, 1.6, 10.5]], [0, 1.2, 0]);
  let spin = 0;
  let speed = 0;
  return ({ beat: b, ms, dt, camera, look }) => {
    const cue = cueOf(b, ms);
    shot(b, ms, camera, look);
    speed += ((b === 1 ? 0.0012 : 0.0055) - speed) * clamp(dt / 900);
    spin += dt * speed;
    rotor.rotation.y = spin;
    core.rotation.y = spin;
    // Beat 1: the hub opens up (see-through), the motor inside is named.
    const open = b === 1 ? cue(1, 600, 900) : b > 1 ? 1 - cue(2, 0, 800) : 0;
    shellMat.opacity = 1 - 0.82 * open;
    inside.visible = open > 0.02;
    show(tMotor, open);
    tMotor.position.set(1.7, 1.25, 0);
    // Beat 2 on: the three ideas of the topic float round the fan.
    tags.forEach((t, i) => {
      show(t, cue(2, 800 + i * 1500, 500));
      t.position.set([-2.4, 0, 2.4][i], [-0.4, 3.6, -0.4][i], 1.2);
    });
  };
}

/* ── The wire swing: a rod between the poles kicks out when current flows ── */
export function swing41(THREE, scene) {
  const { mat, label, show, arrow, rig, cueOf } = kit(THREE, scene);
  // Horseshoe magnet on its side: N on the top arm, S on the bottom, joined
  // at the back (right); the gap opens to the left. Field: N → S, downward.
  const magnet = new THREE.Group();
  scene.add(magnet);
  const red = mat(0xe03131);
  const blue = mat(0x1c7ed6);
  const steel = mat(0x868e96, { metalness: 0.5 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 1.4), red);
  top.position.set(0, 0.95, 0);
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 1.4), blue);
  bottom.position.set(0, -0.95, 0);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.4, 1.4), steel);
  back.position.set(1.35, 0, 0);
  magnet.add(top, bottom, back);
  const tN = label('N', { size: 0.5 });
  tN.position.set(-0.6, 0.95, 0.8);
  const tS = label('S', { size: 0.5 });
  tS.position.set(-0.6, -0.95, 0.8);
  // Field: dots falling from N to S.
  const dots = [];
  for (const x of [-0.7, 0, 0.6])
    for (const z of [-0.45, 0.45])
      for (let k = 0; k < 3; k++) {
        const d = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), mat(0x8ee3f5, { emissive: 0x8ee3f5, emissiveIntensity: 0.6 }));
        d.userData = { x, z, k };
        scene.add(d);
        dots.push(d);
      }
  const tB = label('field B', { size: 0.34, italic: true });
  tB.position.set(0.55, 0.1, 0.2);
  // The swing: a bar overhead, two wires, the copper rod through the gap.
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.6, 12), steel);
  bar.rotation.x = Math.PI / 2;
  bar.position.set(-0.3, 2.4, 0);
  scene.add(bar);
  const swing = new THREE.Group();
  swing.position.set(-0.3, 2.4, 0);
  scene.add(swing);
  const L = 2.4;
  for (const z of [-1.45, 1.45]) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, L, 8), mat(0xadb5bd));
    w.position.set(0, -L / 2, z);
    swing.add(w);
  }
  const rodMat = mat(0xd9480f, { metalness: 0.5, roughness: 0.3, emissive: 0xffd43b, emissiveIntensity: 0 });
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 3, 20), rodMat);
  rod.rotation.x = Math.PI / 2;
  rod.position.y = -L;
  swing.add(rod);
  const sparks = [0, 1, 2, 3, 4].map((k) => {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), mat(0xffd43b, { emissive: 0xffd43b, emissiveIntensity: 1 }));
    s.userData.k = k;
    swing.add(s);
    return s;
  });
  const tI = label('current I', { size: 0.34, italic: true });
  // The push: out of the gap, to the left.
  const push = arrow(0x2b8a3e, 1.3);
  push.rotation.z = Math.PI / 2;
  const tF = label('force F', { size: 0.38 });
  const tEq = label('F = B I l', { size: 0.5 });
  tEq.position.set(-0.4, -2.1, 0.6);
  // Three-quarter views from the open side, so the rod's length and its kick show.
  const shot = rig([[-3.6, 2.2, 7.6], [-4.4, 1.6, 6.6], [-4.8, 1.9, 7], [-3.2, 1.5, 8.8]], [-0.6, 0.4, 0]);
  let flow = 0;
  let angle = 0;
  return ({ beat: b, ms, dt, camera, look }) => {
    const cue = cueOf(b, ms);
    shot(b, ms, camera, look);
    flow += dt;
    // Beat 0: the magnet, its poles, the field between them.
    show(tN, cue(0, 900, 400));
    show(tS, cue(0, 1300, 400));
    const field = cue(0, 2400, 900);
    for (const d of dots) {
      const { x, z, k } = d.userData;
      d.visible = field > 0;
      d.position.set(x, 0.65 - ((k / 3 + flow * 0.0004) % 1) * 1.3, z);
    }
    show(tB, field * (b === 0 ? 1 : 0.7));
    // Beat 1: current in the rod (it glows, sparks run along it).
    const on = cue(1, 1800, 500);
    rodMat.emissiveIntensity = 0.55 * on;
    sparks.forEach((s) => {
      s.visible = on > 0;
      s.position.set(0, -L + 0.11, 1.4 - ((s.userData.k / 5 + flow * 0.0005) % 1) * 2.8);
    });
    show(tI, on);
    // Beat 2: the rod kicks out of the gap, like a swing pushed.
    const kick = cue(2, 1500, 1200);
    const want = 0.42 * kick;
    angle += (want - angle) * clamp(dt / 250);
    if (b < 2) angle = 0;
    swing.rotation.z = -angle;
    const rx = -0.3 - Math.sin(angle) * L;
    const ry = 2.4 - Math.cos(angle) * L;
    tI.position.set(rx - 0.1, ry - 0.35, 1.9);
    push.visible = kick > 0.02;
    push.scale.set(1, Math.max(0.001, kick), 1);
    push.position.set(rx - 0.15, ry, 0.95);
    show(tF, kick);
    tF.position.set(rx - 1.5, ry + 0.4, 0.95);
    // Beat 3: the rule, written in the air.
    show(tEq, cue(3, 800, 600));
  };
}

/* ── The armature turning: motor3d.js, cued for these shorter lines ──── */
const TORQUE_CUE = { ...MOTOR_CUE, armature: 200, north: 900, south: 1500, field: 2200, left: 900, right: 2600, fieldHi: 600, currentHi: 1400, pushDown: 2200, rightHi: 300, pushUp: 1200, tapLeft: 100, tapRight: 900, turn: 2200, arc: 2800, ta: 4200 };
export const torque41 = (THREE, scene) => buildMotor(THREE, scene, TORQUE_CUE);

/* ── Toy motor, cell and ammeter: back EMF you can watch on the needle ── */
export function backEmf41(THREE, scene) {
  const { mat, label, show, arrow, rig, cueOf } = kit(THREE, scene);
  // The cell (left), the ammeter (middle, front), the toy motor (right).
  const cell = new THREE.Group();
  const can = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.6, 32), mat(0x343a40));
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.55, 32), mat(0xf59f00));
  band.position.y = 0.45;
  const nub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.14, 16), mat(0xced4da, { metalness: 0.7 }));
  nub.position.y = 0.87;
  cell.add(can, band, nub);
  cell.position.set(-2.6, 0, 0);
  scene.add(cell);
  const motor = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.2, 32), mat(0xadb5bd, { metalness: 0.6, roughness: 0.3 }));
  body.rotation.z = Math.PI / 2;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 12), mat(0xdee2e6, { metalness: 0.8 }));
  shaft.rotation.z = Math.PI / 2;
  shaft.position.x = -0.95;
  const prop = new THREE.Group();
  for (let i = 0; i < 2; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.5, 0.22), mat(0xe03131));
    blade.rotation.x = (i * Math.PI) / 2;
    prop.add(blade);
  }
  prop.position.x = -1.35;
  motor.add(body, shaft, prop);
  motor.position.set(2.4, 0.1, 0);
  scene.add(motor);
  // Ammeter: a dial with a needle.
  const meter = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.3, 0.35), mat(0xf8f9fa));
  const face = (() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 384;
    const g = c.getContext('2d');
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, 512, 384);
    g.strokeStyle = '#343a40';
    g.lineWidth = 6;
    g.beginPath();
    g.arc(256, 330, 220, Math.PI * 1.15, Math.PI * 1.85);
    g.stroke();
    g.strokeStyle = '#e03131';
    g.lineWidth = 14;
    g.beginPath();
    g.arc(256, 330, 212, Math.PI * 1.7, Math.PI * 1.85);
    g.stroke();
    g.fillStyle = '#343a40';
    g.font = '700 64px Poppins, Inter, sans-serif';
    g.textAlign = 'center';
    g.fillText('A', 256, 250);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.125), new THREE.MeshBasicMaterial({ map: t }));
  })();
  face.position.z = 0.18;
  const needle = new THREE.Group();
  const stick = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.85, 0.02), mat(0x212529));
  stick.position.y = 0.42;
  needle.add(stick);
  needle.position.set(0, -0.5, 0.2);
  meter.add(box, face, needle);
  meter.position.set(0, -0.2, 0.6);
  scene.add(meter);
  // Wires: cell + → meter → motor → back to cell −.
  const wire = (pts) => {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
    const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.035, 8), mat(0xd9480f, { roughness: 0.5 }));
    scene.add(m);
    return m;
  };
  const wires = [
    wire([[-2.6, 0.95, 0], [-2.2, 1.6, 0.2], [-0.9, 0.9, 0.6], [-0.85, 0.1, 0.6]]),
    wire([[0.85, 0.1, 0.6], [1.3, 0.7, 0.4], [2.2, 0.75, 0.1], [2.4, 0.65, 0]]),
    wire([[2.6, -0.45, 0], [2.2, -1.3, 0.2], [-1.6, -1.4, 0.2], [-2.6, -0.8, 0]]),
  ];
  const tV = label('V', { size: 0.5 });
  tV.position.set(-2.6, 1.55, 0.5);
  const tM = label('motor', { size: 0.4 });
  tM.position.set(2.6, 1.15, 0.5);
  // Two pushes on the current: V forward, Eb backward (grows with speed).
  const vArrow = arrow(0x2b8a3e, 1.1);
  vArrow.rotation.z = -Math.PI / 2;
  vArrow.position.set(-1.9, 1.9, 0.4);
  const ebArrow = arrow(0xf08c00, 1.1);
  ebArrow.rotation.z = Math.PI / 2;
  ebArrow.position.set(2.0, 1.9, 0.4);
  const tEb = label('back EMF Eb', { size: 0.36, color: '#ffd8a8' });
  tEb.position.set(1.45, 2.35, 0.4);
  const tLoad = label('load', { size: 0.4 });
  const brake = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.8), mat(0x495057));
  scene.add(brake);
  const tStart = label('start: huge current!', { size: 0.36, color: '#ffc9c9' });
  tStart.position.set(0, 1.0, 1.1);
  const shot = rig([[0, 1.4, 9.4], [1.2, 1.2, 8.6], [0, 0.6, 6.6], [2.4, 1, 7.6], [0, 1.2, 9], [0, 0.8, 7]], [0, 0.2, 0]);
  let speed = 0; // 0 … 1 of no-load speed
  let amps = 0; // needle 0 … 1 (1 = red zone)
  let spin = 0;
  let was = -1;
  return ({ beat: b, ms, dt, camera, look }) => {
    const cue = cueOf(b, ms);
    shot(b, ms, camera, look);
    if (b !== was) {
      // The start beat begins from rest; a seek into a beat starts it fresh.
      if (b === 5 || b === 0) speed = 0;
      if (b >= 1 && b <= 4 && was < 1) speed = b === 1 ? 0 : 0.95;
      was = b;
    }
    const running = b >= 1 && (b < 5 || ms > 2600);
    const loaded = b === 3 || b === 4;
    const target = !running ? 0 : loaded ? 0.7 : 0.95;
    speed += (target - speed) * clamp(dt / (b === 5 ? 1800 : 1300));
    // Ia = (V − Eb)/Ra: the needle reads what is left of V after Eb.
    const ia = running || b === 5 ? clamp(1 - speed) : 0;
    amps += ((b === 5 && ms < 2600 && ms > 600 ? 1 : ia) - amps) * clamp(dt / 180);
    needle.rotation.z = 0.55 - 1.1 * amps;
    spin += dt * speed * 0.03;
    prop.rotation.x = spin;
    // Beat 0: the circuit, part by part.
    cell.scale.setScalar(Math.max(0.001, cue(0, 200, 400)));
    meter.scale.setScalar(Math.max(0.001, cue(0, 900, 400)));
    motor.scale.setScalar(Math.max(0.001, cue(0, 1600, 400)));
    wires.forEach((w, i) => (w.visible = cue(0, 2200 + i * 250, 200) > 0.5));
    show(tV, cue(0, 400, 400));
    show(tM, cue(0, 1800, 400));
    vArrow.visible = b >= 1;
    // Back EMF grows with the speed, pointing against V.
    const eb = b >= 1 ? speed : 0;
    ebArrow.visible = eb > 0.05;
    ebArrow.scale.set(1, Math.max(0.001, eb), 1);
    show(tEb, b >= 1 ? clamp(eb * 1.4) : 0);
    // Beats 3–4: a load (a brake pad on the shaft).
    const pad = cue(3, 500, 600) * (b <= 4 ? 1 : 0);
    brake.visible = pad > 0.02;
    brake.position.set(1.55, 0.5 + 0.6 * (1 - pad), 0);
    show(tLoad, pad);
    tLoad.position.set(1.55, 1.15, 0.5);
    show(tStart, b === 5 ? cue(5, 800, 400) : 0);
  };
}
