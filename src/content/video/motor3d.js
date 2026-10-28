/*
  The DC motor in 3D, for "Armature le torque kasari banaucha" (ch3.jsx). It
  follows the same seven beats as the flat drawing:
    0  armature between N and S, the field flowing left → right
    1  current: into the screen under N (⊗), out under S (⊙), flowing along the conductors
    2  Fleming: force down on the left conductors
    3  force up on the right conductors
    4  together they turn the armature counter-clockwise (torque)
    5  question (the armature keeps turning)
    6  neutral zone: crossing it, a conductor's current (and its push) flips
  Front view = looking along the shaft (+z toward the viewer), as in the 2D
  drawing. Everything moves on the scene clock (see Stage3D.jsx).
*/

const COL = { north: 0xe03131, south: 0x1c7ed6, steel: 0x5c636a, copper: 0xd9480f, spark: 0xffd43b, force: 0x2b8a3e, field: 0x1c7ed6, torque: 0xf08c00 };
const R = 1.2; // armature radius
const L = 3; // armature length (along z)
const ANGLES = [140, 180, 220, -40, 0, 40].map((d) => (d * Math.PI) / 180);
// Camera per beat: where it stands (it always looks at the armature).
const SHOTS = [
  [3.6, 2.6, 8.6],
  [4.4, 3.8, 7.2],
  [-3, 1.4, 8.6],
  [3, 1.4, 8.6],
  [0.8, 1.4, 9.2],
  [0.8, 1.4, 9.2],
  [0, 0.8, 9.2],
];
const MOVE = 1100; // ms for the camera to reach the beat's shot
const SPIN = 0.0011; // armature turn, rad per ms of clock, from beat 4 on

export function buildMotor(THREE, scene) {
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.15, ...o });

  // Text on a sprite, always facing the camera.
  const label = (text, { color = '#1f2328', size = 0.7, weight = 800 } = {}) => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 128;
    const g = c.getContext('2d');
    g.font = `${weight} 84px Inter, sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = color;
    g.fillText(text, 256, 68);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
    s.scale.set(size * 4, size, 1);
    s.renderOrder = 10;
    return s;
  };
  // The ⊗ / ⊙ mark on a conductor's end.
  const markTex = (kind) => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    g.strokeStyle = g.fillStyle = '#5c1d05';
    g.lineWidth = 12;
    g.lineCap = 'round';
    if (kind === 'in') {
      g.beginPath();
      g.moveTo(36, 36);
      g.lineTo(92, 92);
      g.moveTo(92, 36);
      g.lineTo(36, 92);
      g.stroke();
    } else if (kind === 'out') {
      g.beginPath();
      g.arc(64, 64, 16, 0, Math.PI * 2);
      g.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const marks = { in: markTex('in'), out: markTex('out'), none: markTex('none') };
  // An arrow along +y: shaft and head.
  const arrow = (color, len = 0.9) => {
    const g = new THREE.Group();
    const m = mat(color, { roughness: 0.6 });
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, len - 0.26, 12), m);
    shaft.position.y = (len - 0.26) / 2;
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.26, 16), m);
    head.position.y = len - 0.13;
    g.add(shaft, head);
    return g;
  };

  // Poles.
  const pole = (x, color, name) => {
    const g = new THREE.Group();
    const block = new THREE.Mesh(new THREE.BoxGeometry(1, 2.8, 3.1), mat(color, { roughness: 0.55 }));
    g.add(block);
    const tag = label(name, { color: '#ffffff', size: 0.9 });
    tag.position.set(0, 0, 1.62);
    g.add(tag);
    g.position.x = x;
    scene.add(g);
  };
  pole(-2.9, COL.north, 'N');
  pole(2.9, COL.south, 'S');

  // Field lines from N to S, with dots flowing along them.
  const dots = [];
  for (const y of [-0.85, 0.85]) {
    for (const z of [-1.1, 0, 1.1]) {
      const pts = [new THREE.Vector3(-2.38, y, z), new THREE.Vector3(2.3, y, z)];
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: COL.field, transparent: true, opacity: 0.35 }));
      scene.add(line);
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 12), mat(COL.field));
      head.rotation.z = -Math.PI / 2;
      head.position.set(2.3, y, z);
      scene.add(head);
      for (let k = 0; k < 6; k++) {
        const d = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), mat(COL.field, { emissive: COL.field, emissiveIntensity: 0.4 }));
        d.userData = { y, z, k };
        scene.add(d);
        dots.push(d);
      }
    }
  }

  // Armature: a steel cylinder on a shaft, with six copper conductors.
  const rotor = new THREE.Group();
  scene.add(rotor);
  const core = new THREE.Mesh(new THREE.CylinderGeometry(R, R, L, 72), mat(COL.steel, { metalness: 0.55, roughness: 0.35 }));
  core.rotation.x = Math.PI / 2;
  rotor.add(core);
  for (let i = 1; i < 6; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(R + 0.002, 0.008, 6, 72), mat(0x343a40));
    ring.position.z = -L / 2 + (i * L) / 6;
    rotor.add(ring);
  }
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, L + 1.4, 24), mat(0xced4da, { metalness: 0.8, roughness: 0.25 }));
  shaft.rotation.x = Math.PI / 2;
  rotor.add(shaft);

  const conductors = ANGLES.map((a) => {
    const g = new THREE.Group();
    g.position.set(R * 0.93 * Math.cos(a), R * 0.93 * Math.sin(a), 0);
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, L + 0.12, 20), mat(COL.copper, { metalness: 0.5, roughness: 0.3 }));
    rod.rotation.x = Math.PI / 2;
    g.add(rod);
    const cap = new THREE.Mesh(new THREE.CircleGeometry(0.15, 24), new THREE.MeshBasicMaterial({ map: marks.none, transparent: true }));
    cap.position.z = L / 2 + 0.065;
    g.add(cap);
    const sparks = [0, 1, 2, 3].map((k) => {
      const sp = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 10), mat(COL.spark, { emissive: COL.spark, emissiveIntensity: 0.9 }));
      sp.userData.k = k;
      g.add(sp);
      return sp;
    });
    rotor.add(g);
    const push = arrow(COL.force);
    scene.add(push);
    const out = new THREE.Vector2(Math.cos(a), Math.sin(a)).multiplyScalar(0.16);
    return { g, cap, sparks, push, out };
  });

  // Torque: a curved arrow around the shaft, in front.
  const torque = new THREE.Group();
  const tm = mat(COL.torque, { roughness: 0.5 });
  const arc = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.055, 10, 64, Math.PI * 1.5), tm);
  arc.rotation.z = Math.PI * 0.25;
  torque.add(arc);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.32, 16), tm);
  const end = Math.PI * 1.75;
  tip.position.set(0.72 * Math.cos(end), 0.72 * Math.sin(end), 0);
  tip.rotation.z = end;
  torque.add(tip);
  const ta = label('Ta', { color: '#f08c00', size: 0.55 });
  torque.add(ta);
  torque.position.z = L / 2 + 0.35;
  scene.add(torque);

  // Neutral zone: the plane where a conductor passes from N's side to S's.
  const neutral = new THREE.Group();
  const plane = new THREE.Mesh(new THREE.BoxGeometry(0.02, 3.3, 3.6), new THREE.MeshBasicMaterial({ color: 0x495057, transparent: true, opacity: 0.18, depthWrite: false }));
  neutral.add(plane);
  const nz = label('neutral zone', { size: 0.42, weight: 700 });
  nz.position.set(0, 1.75, 1.6);
  neutral.add(nz);
  scene.add(neutral);

  // State that runs on the clock.
  let spin = 0;
  let flow = 0;
  let beatWas = -1;
  const from = new THREE.Vector3();
  const pos = new THREE.Vector3(...SHOTS[0]);
  const world = new THREE.Vector3();
  const smooth = (t) => t * t * (3 - 2 * t);

  return ({ beat, ms, dt, camera, look }) => {
    const b = Math.min(beat, SHOTS.length - 1);
    if (b !== beatWas) {
      from.copy(beatWas < 0 ? pos.set(...SHOTS[b]) : pos);
      beatWas = b;
    }
    flow += dt;
    if (b >= 4) spin += dt * SPIN;
    rotor.rotation.z = spin;

    // Camera: glide to this beat's shot, then add the viewer's drag.
    const t = smooth(Math.min(1, ms / MOVE));
    pos.copy(from).lerp(new THREE.Vector3(...SHOTS[b]), t);
    const r = pos.length();
    const yaw = Math.atan2(pos.x, pos.z) + look.yaw;
    const pitch = Math.max(-0.5, Math.min(1.2, Math.asin(pos.y / r) + look.pitch));
    camera.position.set(r * Math.cos(pitch) * Math.sin(yaw), r * Math.sin(pitch), r * Math.cos(pitch) * Math.cos(yaw));
    camera.lookAt(0, 0, 0);

    for (const d of dots) {
      const { y, z, k } = d.userData;
      d.position.set(-2.3 + ((k / 6 + flow * 0.00028) % 1) * 4.55, y, z);
    }

    // Each conductor: its current depends on which pole it is under
    // (the commutator's job), and so does its push.
    for (const c of conductors) {
      c.g.getWorldPosition(world);
      const side = world.x < 0 ? 'in' : 'out';
      const lit = b >= 1;
      c.cap.material.map = marks[lit ? side : 'none'];
      c.cap.rotation.z = -spin; // the mark stays upright as the armature turns
      c.sparks.forEach((sp) => {
        sp.visible = lit;
        const u = (sp.userData.k / 4 + flow * 0.0006) % 1;
        // On the rod's outer surface, so they show.
        sp.position.set(c.out.x, c.out.y, (side === 'in' ? 0.5 - u : u - 0.5) * L);
      });
      const show = side === 'in' ? b >= 2 : b >= 3;
      c.push.visible = show && b !== 5;
      c.push.position.set(world.x + (side === 'in' ? -0.32 : 0.32), world.y, L / 2 + 0.2);
      c.push.rotation.z = side === 'in' ? Math.PI : 0;
    }
    torque.visible = b >= 4;
    neutral.visible = b >= 6;
  };
}
