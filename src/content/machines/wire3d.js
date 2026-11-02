/*
  Wires drawn like a wiring diagram (user, 2026-11-02: "make these wires
  turned 90 degrees"): straight runs along the x, y and z axes, joined by
  small rounded 90° bends, so a wire reads as neat cabling, never a loose
  loop. `pts` are the corners; a step between two corners that changes more
  than one axis is split into runs in `order`. Returns a THREE.CurvePath, so
  TubeGeometry and the flow dots (getPoint) use it like any curve.
*/
export function orthoWire(THREE, pts, { r = 0.2, order = 'xyz' } = {}) {
  const P = [pts[0].clone()];
  for (let i = 1; i < pts.length; i++)
    for (const ax of order) {
      const last = P[P.length - 1];
      if (Math.abs(pts[i][ax] - last[ax]) > 1e-4) {
        const c = last.clone();
        c[ax] = pts[i][ax];
        P.push(c);
      }
    }
  // Keep only real corners.
  const Q = [P[0]];
  for (let i = 1; i < P.length - 1; i++) {
    const d1 = P[i].clone().sub(Q[Q.length - 1]).normalize();
    const d2 = P[i + 1].clone().sub(P[i]).normalize();
    if (d1.dot(d2) < 0.999) Q.push(P[i]);
  }
  Q.push(P[P.length - 1]);
  const path = new THREE.CurvePath();
  let start = Q[0].clone();
  for (let i = 1; i < Q.length; i++) {
    const b = Q[i];
    if (i === Q.length - 1) {
      if (start.distanceTo(b) > 1e-4) path.add(new THREE.LineCurve3(start, b.clone()));
      break;
    }
    const a = Q[i - 1];
    const c = Q[i + 1];
    const rr = Math.min(r, b.distanceTo(a) / 2, b.distanceTo(c) / 2);
    const inP = b.clone().add(a.clone().sub(b).normalize().multiplyScalar(rr));
    const outP = b.clone().add(c.clone().sub(b).normalize().multiplyScalar(rr));
    if (start.distanceTo(inP) > 1e-4) path.add(new THREE.LineCurve3(start, inP));
    path.add(new THREE.QuadraticBezierCurve3(inP, b.clone(), outP));
    start = outP;
  }
  return path;
}
