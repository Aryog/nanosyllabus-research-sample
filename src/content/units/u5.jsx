import { C, K, Pts, answer, duo, solve, topic } from '../video/kit.jsx';
import { chain, part } from '../video/kit.jsx';
import { Cap, T, W, head } from '../unit4/figs.jsx';
import { inductionTour } from '../machines/models3d.js';

/*
  Unit 5 Three Phase Induction Machines (IOE syllabus), one topic per bullet (rule 68):
    5.1 Constructional Details and Types
    5.2 Operating Principle, RMF, Synchronous Speed, Slip, Induced EMF, Rotor Current and its frequency, Torque Equation
    5.3 Torque-Slip characteristics
    5.4 Induction Generator: Working Principle, voltage build up
    5.5 Power Stages
  Segment 1 walks the 3D induction machine (machines/models3d.js inductionTour).
  Recomputed: 2071 Magh Ns 1500, s 0.04, f2 2 Hz, E2r 5.2 V, K 440/130 = 3.385.
  2072 Ashwin sm = 0.8/2 = 0.4, N = 900 rpm, Tst/Tmax = 2sm/(1+sm²) = 0.6897,
  Tmax = 72.5 N·m. 2078 Poush Ns 1000, s 0.025, P2 39 kW, Pcu2 0.975 kW,
  Pm 38.025 kW, output 36.025 kW = 48.29 hp, η = 90.06 %.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
const IM = ['frame', 'stator', 'winding', 'rotorCore', 'cage', 'shaft'];
const FED = [...IM, 'supply'];

/* ── Figures ─────────────────────────────────────────────────────────── */
const wave = (ph, x0 = 30, w = 150, y0 = 70, a = 34) =>
  Array.from({ length: 41 }, (_, i) => `${i ? 'L' : 'M'}${x0 + (w * i) / 40} ${y0 - a * Math.sin((i / 40) * 2 * Math.PI - ph)}`).join(' ');
const vec = (cx, cy, ang, len) => {
  const a = (ang * Math.PI) / 180;
  return [cx + Math.cos(a) * len, cy - Math.sin(a) * len];
};
// Fig. 5.1: 0 three-phase flux waves · 1 resultant at t1 · 2 at t2 · 3 at t3 · 4 constant 1.5Φm rotating at Ns
export const rmfFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M30 70 H185" w={0.8} />
      <path d={wave(0)} fill="none" stroke={C.chalk} strokeWidth={1.4} />
      <path d={wave((2 * Math.PI) / 3)} fill="none" stroke={C.chalk} strokeWidth={1.1} strokeDasharray="5 3" />
      <path d={wave((4 * Math.PI) / 3)} fill="none" stroke={C.chalk} strokeWidth={1.1} strokeDasharray="1.5 3" />
      <T x={30} y={124} a="start" size={10}>ΦR ─  ΦY - -  ΦB ···</T>
      {[0, 1, 2].map((k) => <W key={k} d={`M${30 + 25 * k} 30 V112`} w={0.6} dash="2 3" />)}
      <T x={30} y={26} size={9}>t₁</T>
      <T x={55} y={26} size={9}>t₂</T>
      <T x={80} y={26} size={9}>t₃</T>
      <Cap y={214}>Fig. 5.1  Rotating magnetic field from three-phase fluxes</Cap>
    </g>
    {[0, 1, 2].map((k) => {
      const cx = 220 + k * 50;
      const [x, y] = vec(cx, 150, 90 - 60 * k, 30);
      return (
        <g key={k} className={s.on(k + 1) + s.hl(k + 1)}>
          <circle cx={cx} cy={150} r={30} fill="none" stroke={C.chalk} strokeWidth={0.6} strokeDasharray="2 3" />
          <W d={`M${cx} 150 L${x} ${y}`} w={1.8} />
          <circle cx={x} cy={y} r={2.6} fill={C.chalk} />
          <T x={cx} y={196} size={10}>t{['₁', '₂', '₃'][k]}: {60 * k}°</T>
        </g>
      );
    })}
    <g className={s.on(4) + s.hl(4)}>
      <T x={270} y={60} size={11}>Φr = 1.5 Φm</T>
      <T x={270} y={76} size={10}>rotates at Ns = 120f/P</T>
    </g>
  </>
);

// Fig. 5.2: 0 stator field at Ns · 1 rotor at N · 2 relative speed (Ns − N) · 3 rotor circuit sE2, R2, sX2
export const slipFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <circle cx={95} cy={105} r={70} fill="none" stroke={C.chalk} strokeWidth={1.4} />
      <path d="M95 25 A80 80 0 0 1 172 80" fill="none" stroke={C.chalk} strokeWidth={1.1} />
      {head(172, 80, 'down', 6)}
      <T x={160} y={34} a="start" i>Ns (field)</T>
      <Cap y={214}>Fig. 5.2  Slip and the rotor circuit</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <circle cx={95} cy={105} r={42} fill="none" stroke={C.chalk} strokeWidth={1.4} />
      <path d="M95 75 A30 30 0 0 1 120 92" fill="none" stroke={C.chalk} strokeWidth={1} />
      {head(121, 93, 'down', 5)}
      <T x={95} y={110} i>N</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <T x={95} y={192} size={10}>relative speed Ns − N</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M220 60 H330 V160 H220 Z" />
      <circle cx={220} cy={110} r={13} fill={C.board} stroke={C.chalk} strokeWidth={1.2} />
      <T x={220} y={114} i size={10}>sE₂</T>
      <rect x={258} y={53} width={30} height={14} fill={C.board} stroke={C.chalk} strokeWidth={1.2} />
      <T x={273} y={47} i size={10}>R₂</T>
      <path d="M300 160 a5 5 0 0 1 10 0 a5 5 0 0 1 10 0" fill={C.board} stroke={C.chalk} strokeWidth={1.2} transform="translate(-40 0)" />
      <T x={275} y={180} i size={10}>sX₂</T>
      <T x={340} y={114} a="start" i size={10}>I₂</T>
    </g>
  </>
);

// Fig. 5.3: 0 axes · 1 T-s curve · 2 starting torque · 3 Tmax at sm · 4 stable (linear) region · 5 higher R2
export const tsFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M40 190 H330 M330 190 V30" />
      <T x={40} y={206} size={10}>s = 1 (start)</T>
      <T x={330} y={206} size={10}>s = 0 (Ns)</T>
      <T x={338} y={34} a="start" i>T</T>
      <Cap x={185} y={224}>Fig. 5.3  Torque-slip characteristic</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <path d="M40 130 C110 110 170 60 230 50 C270 46 300 80 330 190" fill="none" stroke={C.chalk} strokeWidth={1.6} />
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <circle cx={40} cy={130} r={3} fill={C.chalk} />
      <T x={48} y={122} a="start" i size={10}>Tst</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M232 50 V190" w={0.8} dash="3 3" />
      <T x={232} y={42} i size={10}>Tmax (s = sm)</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <T x={300} y={150} a="end" size={9}>stable, T ∝ s</T>
      <T x={120} y={160} size={9}>unstable</T>
    </g>
    <g className={s.on(5) + s.hl(5)}>
      <path d="M40 70 C80 50 120 46 150 46 C220 50 280 120 330 190" fill="none" stroke={C.chalk} strokeWidth={1.1} strokeDasharray="5 3" />
      <T x={110} y={38} size={9}>higher R₂: same Tmax, earlier</T>
    </g>
  </>
);

// Fig. 5.4: 0 stator input · 1 stator losses · 2 air-gap power P2 · 3 rotor Cu sP2 · 4 Pm (1 − s)P2 → output
export const stagesFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <rect x={8} y={80} width={62} height={40} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={39} y={98} size={10}>Stator</T>
      <T x={39} y={112} size={10}>input</T>
      <Cap y={214}>Fig. 5.4  Power stages of an induction motor</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M70 100 H100" />
      {head(100, 100, 'right', 6)}
      <W d="M84 100 V146" w={1} />
      {head(84, 150, 'down', 5)}
      <T x={84} y={166} size={9}>stator Cu + iron</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <rect x={102} y={80} width={70} height={40} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={137} y={98} size={10}>Air gap</T>
      <T x={137} y={112} i size={10}>P₂</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M172 100 H202" />
      {head(202, 100, 'right', 6)}
      <W d="M186 100 V146" w={1} />
      {head(186, 150, 'down', 5)}
      <T x={186} y={166} i size={9}>rotor Cu = sP₂</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <rect x={204} y={80} width={70} height={40} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={239} y={98} size={10}>Gross Pm</T>
      <T x={239} y={112} i size={10}>(1 − s)P₂</T>
      <W d="M274 100 H300" />
      {head(300, 100, 'right', 6)}
      <T x={326} y={96} size={10}>output</T>
      <T x={326} y={112} size={9}>− friction</T>
    </g>
  </>
);

/* ── 5.1 Construction, types, RMF ─────────────────────────────────────── */
export const basics51 = duo('5.1 · Basic understanding: what is inside an induction motor?', {
  three: inductionTour([
    { shot: 'whole', show: IM, spin: 0.25, labels: [['induction motor', 'frame']] },
    { shot: 'inside', spin: 0, focus: ['stator'], labels: [['stator: sthir', 'stator']] },
    { show: FED, shot: 'supply', flow: 0.6, focus: ['winding', 'supply'], labels: [['tin phase', 'supply'], ['RYB coil', 'winding']] },
    { shot: 'front', field: 1, rmf: 0.6, flow: 0.6, focus: ['winding'], labels: [['ghumne magnet', 'field']] },
    { field: 1, rmf: 0.6, focus: ['cage', 'rotorCore'], labels: [['cage rotor', 'cage']] },
    { shot: 'inside', field: 1, rmf: 0.6, spin: 0.55, spinMs: 3000, focus: ['cage', 'rotorCore'], labels: [['rotor pachhi lagcha', 'rotorCore']] },
    { shot: 'slip', show: [...FED.filter((p) => p !== 'cage'), 'slip', 'rheo'], field: 0.6, rmf: 0.6, spin: 0.55, focus: ['slip', 'rheo'], labels: [['slip ring', 'slip'], ['bahira ko resistance', 'rheo']] },
    { shot: 'whole', show: FED, field: 0.8, rmf: 0.6, spin: 0.55, focus: null },
  ]),
  tutor: [
    {
      say: 'Factory ko pump, lift, escalator: dherai jaso induction motor le chalchan. Yasma brush ra commutator nai chaina!',
      voice: 'फ्याक्ट्रीको पम्प, लिफ्ट, एस्केलेटर — धेरैजसो इन्डक्सन मोटरले चल्छन्। यसमा ब्रस र कम्युटेटर नै छैन!',
      lines: [['h', <>5.1 · Naghumi magnet kasari ghumcha?</>], ['step', <>Pump, lift: induction motor (brush chaina)</>]],
    },
    {
      say: 'Bahira ko falam ko ring stator ho. Yo kahile ghumdaina.',
      voice: 'बाहिरको फलामको रिङ स्टेटर हो। यो कहिल्यै घुम्दैन।',
      lines: [part(<>Stator</>, <>nachalne bahira ko ring</>)],
    },
    {
      say: 'Stator ma tin set coil: R, Y ra B. Tin phase supply ko ek-ek tar ek-ek coil ma.',
      voice: 'स्टेटरमा तीन सेट कोइल — आर, वाई, र बी। तीन फेज सप्लाईको एक एक तार एक एक कोइलमा।',
      lines: [['step', <>Tin coil R Y B ← tin phase supply</>]],
    },
    {
      say: 'Tin phase ko current palo-palo thulo hunchha, ra magnet ko disha ghumdai jancha. Kehi naghumi, magnet ghumcha!',
      voice: 'तीन फेजको करेन्ट पालो पालो ठूलो हुन्छ, र म्याग्नेटको दिशा घुम्दै जान्छ। केही नघुमी, म्याग्नेट घुम्छ!',
      lines: [chain(<>Palo-palo current → ghumne magnet (rotating field)</>)],
      ask: {
        q: 'Stator ko magnet kina ghumcha?',
        voice: 'स्टेटरको म्याग्नेट किन घुम्छ?',
        options: ['Tin phase ko current palo-palo thulo huncha', 'Stator aafai ghumcha', 'Brush le ghumaucha'],
        answer: 0,
        why: 'Tin coil ma current ko timing farak: magnet ko disha ghumdai jancha.',
      },
    },
    {
      say: 'Bich ma rotor: aluminium ka bar ra dui chheu ma ring, musa ko pinjada jasto. Yaslai squirrel cage bhanchan.',
      voice: 'बीचमा रोटर — एल्युमिनियमका बार र दुई छेउमा रिङ, मुसाको पिँजडा जस्तो। यसलाई स्क्विरल केज भन्छन्।',
      lines: [part(<>Rotor</>, <>bar + ring, pinjada jasto (squirrel cage)</>)],
    },
    {
      say: 'Ghumne magnet le bar ma current induce garcha, ra rotor magnet ko pachhi-pachhi ghumcha.',
      voice: 'घुम्ने म्याग्नेटले बारमा करेन्ट इन्ड्युस गर्छ, र रोटर म्याग्नेटको पछि पछि घुम्छ।',
      lines: [chain(<>Bar ma current → rotor magnet ko pachhi</>)],
    },
    {
      say: 'Arko type: rotor ma tar ko winding, slip ring ra brush bata bahira resistance jodna milcha. Yo slip-ring motor.',
      voice: 'अर्को टाइप — रोटरमा तारको वाइन्डिङ, स्लिप रिङ र ब्रसबाट बाहिर रेजिस्टेन्स जोड्न मिल्छ। यो स्लिप रिङ मोटर।',
      lines: [part(<>Slip-ring rotor</>, <>winding + slip ring + bahira resistance</>)],
    },
    {
      say: 'Saransha: nachalne stator le ghumne magnet banaucha, ra rotor tyo magnet lai pachhyaucha.',
      voice: 'सारांश — नचल्ने स्टेटरले घुम्ने म्याग्नेट बनाउँछ, र रोटर त्यो म्याग्नेटलाई पछ्याउँछ।',
      lines: [['idea', <>Stator: ghumne magnet · rotor: pachhyaucha · cage wa slip ring</>]],
    },
  ],
  lecturer: [
    {
      say: 'Three-phase induction motor industry ma sabai bhanda dherai prayog hune motor ho; yasma commutator hudaina.',
      voice: 'थ्री फेज इन्डक्सन मोटर इन्डस्ट्रीमा सबैभन्दा धेरै प्रयोग हुने मोटर हो, यसमा कम्युटेटर हुँदैन।',
      lines: [['h', <>5.1 · Three-phase induction motor</>], ['step', <>The most used industrial motor; no commutator</>]],
    },
    {
      say: 'Stator stationary part ho: laminated core ra slots.',
      voice: 'स्टेटर स्टेसनरी पार्ट हो — ल्यामिनेटेड कोर र स्लट्स।',
      lines: [part(<>Stator</>, <>laminated slotted core</>)],
    },
    {
      say: 'Stator slots ma 120 degree displaced three-phase winding huncha.',
      voice: 'स्टेटर स्लट्समा वान ट्वेन्टी डिग्री डिस्प्लेस्ड थ्री फेज वाइन्डिङ हुन्छ।',
      lines: [['step', <>Three-phase winding displaced by 120°</>]],
    },
    {
      say: 'Balanced three-phase current le constant magnitude ko rotating magnetic field banaucha.',
      voice: 'ब्यालेन्स्ड थ्री फेज करेन्टले कन्स्टेन्ट म्याग्निच्युडको रोटेटिङ म्याग्नेटिक फिल्ड बनाउँछ।',
      lines: [chain(<>Balanced currents → rotating magnetic field of constant magnitude</>)],
      ask: {
        q: 'RMF ko speed kasle tay garcha?',
        voice: 'आर एम एफको स्पिड कसले तय गर्छ?',
        options: ['Supply frequency ra poles', 'Load', 'Rotor resistance'],
        answer: 0,
        why: 'Ns = 120 f / P.',
      },
    },
    {
      say: 'Squirrel cage rotor: short-circuited aluminium wa copper bars ra end rings.',
      voice: 'स्क्विरल केज रोटर — सर्ट सर्किटेड एल्युमिनियम वा कपर बार्स र एन्ड रिङ्स।',
      lines: [part(<>Squirrel cage</>, <>short-circuited bars and end rings</>)],
    },
    {
      say: 'RMF le rotor conductors ma EMF ra current induce garcha; tesko force le rotor RMF ko direction ma ghumcha.',
      voice: 'आर एम एफले रोटर कन्डक्टर्समा ई एम एफ र करेन्ट इन्ड्युस गर्छ, त्यसको फोर्सले रोटर आर एम एफको डाइरेक्सनमा घुम्छ।',
      lines: [chain(<>Induced rotor current → torque in the direction of the RMF</>)],
    },
    {
      say: 'Slip-ring rotor ma three-phase winding, slip rings ra brushes hunchan; external resistance jodna sakincha.',
      voice: 'स्लिप रिङ रोटरमा थ्री फेज वाइन्डिङ, स्लिप रिङ्स, र ब्रसेस हुन्छन्, एक्सटर्नल रेजिस्टेन्स जोड्न सकिन्छ।',
      lines: [chain(<>Slip-ring (wound) rotor: external resistance via slip rings</>)],
    },
    {
      say: 'Saransha: stator ko RMF ra rotor ma induction: yahi induction motor ko principle.',
      voice: 'सारांश — स्टेटरको आर एम एफ र रोटरमा इन्डक्सन — यही इन्डक्सन मोटरको प्रिन्सिपल।',
      lines: [['idea', <>Stator RMF + induction in the rotor; cage or slip-ring rotor</>]],
    },
  ],
});

export const construction51 = duo('Construction and types: squirrel cage and slip ring', {
  draw: rmfFigure,
  viewBox: '0 0 360 225',
  tutor: [
    {
      say: 'Stator: frame, laminated core ra slots ma three-phase winding, star wa delta ma jodiyeko.',
      voice: 'स्टेटर — फ्रेम, ल्यामिनेटेड कोर, र स्लट्समा थ्री फेज वाइन्डिङ, स्टार वा डेल्टामा जोडिएको।',
      lines: [['h', <>Construction</>], ['step', <>Stator: frame, laminated slotted core, 3-phase winding (Y or Δ)</>]],
    },
    {
      say: 'Air gap ati sano, 0.4 dekhi 2 millimeter, tesaile magnetising current I mu kam.',
      voice: 'एयर ग्याप अति सानो, जिरो पोइन्ट फोर देखि दुई मिलिमिटर, त्यसैले म्याग्नेटाइजिङ करेन्ट आई म्यु कम।',
      lines: [['step', <>Small air gap (0.4–2 mm) → low magnetising current, better pf</>]],
    },
    {
      say: 'Squirrel cage rotor: bars ra end rings sadhai short. Sasto, majbut, maintenance kam; tara starting torque kam.',
      voice: 'स्क्विरल केज रोटर — बार्स र एन्ड रिङ्स सधैं सर्ट। सस्तो, मजबुत, मेन्टेनेन्स कम, तर स्टार्टिङ टर्क कम।',
      lines: [['step', <>Cage: bars + end rings, robust, cheap; skewed bars; low starting torque</>]],
      ask: {
        q: 'Starting ma rotor circuit ma resistance jodna kun rotor chahincha?',
        voice: 'स्टार्टिङमा रोटर सर्किटमा रेजिस्टेन्स जोड्न कुन रोटर चाहिन्छ?',
        options: ['Slip-ring rotor', 'Squirrel cage rotor', 'Jun pani'],
        answer: 0,
        why: 'Slip ring bata matra rotor winding bahira niklancha.',
      },
    },
    {
      say: 'Slip-ring rotor: three-phase winding, star ma, tin slip ring ra brush bata bahira ko rheostat.',
      voice: 'स्लिप रिङ रोटर — थ्री फेज वाइन्डिङ, स्टारमा, तीन स्लिप रिङ र ब्रसबाट बाहिरको रियोस्टेट।',
      lines: [['step', <>Slip-ring: wound rotor (Y), 3 slip rings, brushes, external rheostat</>]],
    },
    {
      say: 'Slip-ring ma badhi starting torque ra speed control, tara mahango ra maintenance chahincha: crane, hoist ma.',
      voice: 'स्लिप रिङमा बढी स्टार्टिङ टर्क र स्पिड कन्ट्रोल, तर महँगो र मेन्टेनेन्स चाहिन्छ — क्रेन, होइस्टमा।',
      lines: [['idea', <>Cage: fans, pumps, lathes · slip-ring: cranes, hoists (high starting torque)</>]],
    },
  ],
  lecturer: [
    {
      say: 'The stator has a frame, a laminated slotted core and a three-phase winding connected in star or delta.',
      voice: 'द स्टेटर ह्याज अ फ्रेम, अ ल्यामिनेटेड स्लटेड कोर, एन्ड अ थ्री फेज वाइन्डिङ कनेक्टेड इन स्टार अर डेल्टा।',
      lines: [['h', <>Constructional details and types</>], ['step', <>Stator: frame, core, three-phase winding</>]],
    },
    {
      say: 'The air gap is kept small to reduce the magnetising current I mu.',
      voice: 'द एयर ग्याप इज केप्ट स्मल टु रिड्युस द म्याग्नेटाइजिङ करेन्ट आई म्यु।',
      lines: [['step', <>Small air gap: low magnetising current</>]],
    },
    {
      say: 'Squirrel cage rotor: bars permanently short-circuited by end rings; simple, robust, low starting torque.',
      voice: 'स्क्विरल केज रोटर — बार्स पर्मानेन्ट्ली सर्ट सर्किटेड बाइ एन्ड रिङ्स, सिम्पल, रोबस्ट, लो स्टार्टिङ टर्क।',
      lines: [['step', <>Squirrel cage rotor: short-circuited bars; skewed slots</>]],
      ask: {
        q: 'Cage rotor ka bars skew kina garincha?',
        voice: 'केज रोटरका बार्स स्क्यु किन गरिन्छ?',
        options: ['Smooth torque ra kam noise', 'Badhi copper loss', 'Speed badhauna'],
        answer: 0,
        why: 'Skewing le cogging ra magnetic hum ghataucha.',
      },
    },
    {
      say: 'Slip-ring rotor: a star-connected winding brought out to three slip rings for external resistance.',
      voice: 'स्लिप रिङ रोटर — अ स्टार कनेक्टेड वाइन्डिङ ब्रट आउट टु थ्री स्लिप रिङ्स फर एक्सटर्नल रेजिस्टेन्स।',
      lines: [['step', <>Slip-ring rotor: wound, star, slip rings, rheostat</>]],
    },
    {
      say: 'Slip-ring motors give high starting torque and speed control, for cranes and hoists.',
      voice: 'स्लिप रिङ मोटर्स गिभ हाई स्टार्टिङ टर्क एन्ड स्पिड कन्ट्रोल, फर क्रेन्स एन्ड होइस्ट्स।',
      lines: [['step', <><Pts items={[<>Cage: fans, pumps, machine tools</>, <>Slip-ring: cranes, hoists, compressors</>]} /></>]],
    },
  ],
});

export const rmf51 = duo('Derivation: rotating magnetic field 1.5 Φm', {
  draw: rmfFigure,
  viewBox: '0 0 360 225',
  tutor: [
    {
      say: 'Figure 5.1: tin phase ko flux 120 degree farak: phi R, phi Y, phi B.',
      voice: 'फिगर फाइभ पोइन्ट वान — तीन फेजको फ्लक्स वान ट्वेन्टी डिग्री फरक — फाइ आर, फाइ वाई, फाइ बी।',
      lines: [['h', <>Rotating magnetic field</>], ['eq', tex(String.raw`\begin{aligned} \Phi_R &= \Phi_m\sin\omega t \\ \Phi_Y &= \Phi_m\sin(\omega t - 120^\circ) \\ \Phi_B &= \Phi_m\sin(\omega t - 240^\circ) \end{aligned}`)]],
    },
    {
      say: 'Instant t 1, omega t zero: phi R zero, phi Y minus 0.866, phi B plus 0.866 phi m. Jodda 1.5 phi m.',
      voice: 'इन्स्टेन्ट टी वान, ओमेगा टी जिरो — फाइ आर जिरो, फाइ वाई माइनस जिरो पोइन्ट एट सिक्स सिक्स, फाइ बी प्लस जिरो पोइन्ट एट सिक्स सिक्स फाइ एम। जोड्दा वान पोइन्ट फाइभ फाइ एम।',
      lines: [['eq', tex(String.raw`\begin{aligned} \Phi_r &= 2\times0.866\,\Phi_m\cos30^\circ \\ &= 1.5\,\Phi_m \end{aligned}`)]],
    },
    {
      say: 'Instant t 2, omega t 60 degree: phi B zero bhayo, resultant pheri 1.5 phi m, tara 60 degree ghumyo.',
      voice: 'इन्स्टेन्ट टी टु, ओमेगा टी सिक्स्टी डिग्री — फाइ बी जिरो भयो, रिजल्टेन्ट फेरि वान पोइन्ट फाइभ फाइ एम, तर सिक्स्टी डिग्री घुम्यो।',
      lines: [['step', <>ωt = 60°: Φ<sub>r</sub> = 1.5 Φ<sub>m</sub>, turned by 60°</>]],
      ask: {
        q: 'Supply 60° aghi badhda resultant field kati ghumcha?',
        voice: 'सप्लाई सिक्स्टी डिग्री अघि बढ्दा रिजल्टेन्ट फिल्ड कति घुम्छ?',
        options: ['60°', '120°', '30°'],
        answer: 0,
        why: 'Field supply ko angle jati nai ghumcha (2-pole ma).',
      },
    },
    {
      say: 't 3 ma 120 degree pugcha. Size sadhai 1.5 phi m, disha ghumdai: constant magnitude ko rotating field.',
      voice: 'टी थ्री मा वान ट्वेन्टी डिग्री पुग्छ। साइज सधैं वान पोइन्ट फाइभ फाइ एम, दिशा घुम्दै — कन्स्टेन्ट म्याग्निच्युडको रोटेटिङ फिल्ड।',
      lines: [['eq', tex(String.raw`\boxed{\Phi_r = 1.5\,\Phi_m}`)]],
    },
    {
      say: 'Ek cycle ma 2 pole ko field ek ghumai. P poles ma, speed N s equals 120 f over P.',
      voice: 'एक साइकलमा टु पोलको फिल्ड एक घुमाइ। पी पोल्समा, स्पिड एन एस इक्वल्स वान ट्वेन्टी एफ ओभर पी।',
      lines: [['eq', tex(String.raw`\boxed{N_s = \dfrac{120 f}{P}}\unit{rpm}`)]],
    },
  ],
  lecturer: [
    {
      say: 'Let the three fluxes be phi m sin omega t, displaced by 120 degrees, Figure 5.1.',
      voice: 'लेट द थ्री फ्लक्सेस बी फाइ एम साइन ओमेगा टी, डिस्प्लेस्ड बाइ वान ट्वेन्टी डिग्रिज, फिगर फाइभ पोइन्ट वान।',
      lines: [['h', <>Production of the rotating magnetic field</>], ['eq', tex(String.raw`\begin{aligned} \Phi_R &= \Phi_m\sin\omega t \\ \Phi_Y &= \Phi_m\sin(\omega t - 120^\circ) \\ \Phi_B &= \Phi_m\sin(\omega t - 240^\circ) \end{aligned}`)]],
    },
    {
      say: 'At omega t equal to zero, the resultant of phi Y and phi B is 1.5 phi m.',
      voice: 'एट ओमेगा टी इक्वल टु जिरो, द रिजल्टेन्ट अफ फाइ वाई एन्ड फाइ बी इज वान पोइन्ट फाइभ फाइ एम।',
      lines: [['eq', tex(String.raw`\begin{aligned} \Phi_r &= 2\times0.866\,\Phi_m\cos30^\circ \\ &= 1.5\,\Phi_m \end{aligned}`)]],
    },
    {
      say: 'At omega t equal to 60 degrees, the resultant is again 1.5 phi m, turned through 60 degrees.',
      voice: 'एट ओमेगा टी इक्वल टु सिक्स्टी डिग्रिज, द रिजल्टेन्ट इज अगेन वान पोइन्ट फाइभ फाइ एम, टर्न्ड थ्रु सिक्स्टी डिग्रिज।',
      lines: [['step', <>At ωt = 60°: 1.5 Φ<sub>m</sub>, rotated 60°</>]],
      ask: {
        q: 'RMF ko magnitude kati huncha?',
        voice: 'आर एम एफको म्याग्निच्युड कति हुन्छ?',
        options: ['1.5 Φm', '3 Φm', 'Φm'],
        answer: 0,
        why: 'Sabai instant ma resultant 1.5 Φm.',
      },
    },
    {
      say: 'Hence the resultant has constant magnitude 1.5 phi m and rotates.',
      voice: 'हेन्स द रिजल्टेन्ट ह्याज कन्स्टेन्ट म्याग्निच्युड वान पोइन्ट फाइभ फाइ एम एन्ड रोटेट्स।',
      lines: [['eq', tex(String.raw`\boxed{\Phi_r = 1.5\,\Phi_m}`)]],
    },
    {
      say: 'It rotates at the synchronous speed N s equals 120 f over P.',
      voice: 'इट रोटेट्स एट द सिन्क्रोनस स्पिड एन एस इक्वल्स वान ट्वेन्टी एफ ओभर पी।',
      lines: [['eq', tex(String.raw`\boxed{N_s = \dfrac{120 f}{P}}\unit{rpm}`)]],
    },
  ],
});

export const rmfAnswer51 = answer('Model answer: production of the RMF and why the rotor turns', {
  draw: rmfFigure,
  viewBox: '0 0 360 225',
  papers: ['2071 Bhadra'],
  q: 'Explain with necessary vector diagram how rotating magnetic field is produced in a three phase induction motor. Also explain how this rotating magnetic field helps the motor to rotate.',
  read: {
    say: 'IOE 2071 Bhadra: explain with necessary vector diagram how rotating magnetic field is produced in a three phase induction motor. Also explain how this rotating magnetic field helps the motor to rotate.',
    voice: 'आई ओ ई दुई हजार एकहत्तर भदौ — एक्सप्लेन विद नेसेसरी भेक्टर डायग्राम हाउ रोटेटिङ म्याग्नेटिक फिल्ड इज प्रोड्युस्ड इन अ थ्री फेज इन्डक्सन मोटर। अल्सो एक्सप्लेन हाउ दिस रोटेटिङ म्याग्नेटिक फिल्ड हेल्प्स द मोटर टु रोटेट।',
  },
  points: [
    {
      node: <><H>Production of RMF</H>Balanced 3-phase currents in windings 120° apart give (Fig. 5.1):<K>{String.raw`\begin{aligned} \Phi_R &= \Phi_m\sin\omega t \\ \Phi_Y &= \Phi_m\sin(\omega t - 120^\circ) \\ \Phi_B &= \Phi_m\sin(\omega t - 240^\circ) \end{aligned}`}</K></>,
      say: 'Balanced three-phase currents in windings 120 degrees apart give three fluxes phi m sin omega t, displaced by 120 degrees.',
      voice: 'ब्यालेन्स्ड थ्री फेज करेन्ट्स इन वाइन्डिङ्स वान ट्वेन्टी डिग्रिज अपार्ट गिभ थ्री फ्लक्सेस फाइ एम साइन ओमेगा टी, डिस्प्लेस्ड बाइ वान ट्वेन्टी डिग्रिज।',
    },
    {
      node: <><Pts items={[<>ωt = 0: Φ<sub>R</sub> = 0, Φ<sub>Y</sub> = −0.866Φ<sub>m</sub>, Φ<sub>B</sub> = +0.866Φ<sub>m</sub> → Φ<sub>r</sub> = 2(0.866Φ<sub>m</sub>)cos 30° = 1.5Φ<sub>m</sub></>, <>ωt = 60°: Φ<sub>r</sub> = 1.5Φ<sub>m</sub>, turned 60° · ωt = 120°: 1.5Φ<sub>m</sub>, turned 120°</>]} /></>,
      say: 'At omega t zero the resultant is 1.5 phi m. At 60 degrees it is again 1.5 phi m, turned 60 degrees; at 120 degrees, turned 120 degrees.',
      voice: 'एट ओमेगा टी जिरो द रिजल्टेन्ट इज वान पोइन्ट फाइभ फाइ एम। एट सिक्स्टी डिग्रिज इट इज अगेन वान पोइन्ट फाइभ फाइ एम, टर्न्ड सिक्स्टी डिग्रिज, एट वान ट्वेन्टी डिग्रिज, टर्न्ड वान ट्वेन्टी डिग्रिज।',
    },
    {
      node: <><K>{String.raw`\boxed{\Phi_r = 1.5\,\Phi_m}, \quad N_s = \tfrac{120f}{P}`}</K>∴ a field of constant magnitude rotating at synchronous speed.</>,
      say: 'Therefore a field of constant magnitude 1.5 phi m rotates at the synchronous speed 120 f over P.',
      voice: 'देयरफोर अ फिल्ड अफ कन्स्टेन्ट म्याग्निच्युड वान पोइन्ट फाइभ फाइ एम रोटेट्स एट द सिन्क्रोनस स्पिड वान ट्वेन्टी एफ ओभर पी।',
    },
    {
      page: true,
      node: <><H>How the RMF rotates the rotor</H><Pts items={[<>The RMF cuts the stationary rotor conductors → EMF induced (Faraday)</>, <>Short-circuited rotor → rotor currents; current in a field → force (F = BIl)</>, <>By Lenz’s law the rotor turns in the direction of the RMF to reduce the relative speed</>]} /></>,
      say: 'The RMF cuts the rotor conductors and induces EMF. The short-circuited rotor carries current, which in the field gets a force. By Lenz’s law the rotor turns with the RMF to reduce the relative speed.',
      voice: 'द आर एम एफ कट्स द रोटर कन्डक्टर्स एन्ड इन्ड्युसेज ई एम एफ। द सर्ट सर्किटेड रोटर क्यारिज करेन्ट, ह्विच इन द फिल्ड गेट्स अ फोर्स। बाइ लेन्जेस ल द रोटर टर्न्स विद द आर एम एफ टु रिड्युस द रिलेटिभ स्पिड।',
      ask: {
        q: 'Rotor RMF ko direction ma nai kina ghumcha?',
        voice: 'रोटर आर एम एफको डाइरेक्सनमा नै किन घुम्छ?',
        options: ['Relative speed ghatauna (Lenz)', 'Friction le', 'Supply ulto bhayera'],
        answer: 0,
        why: 'Induced current le aafno karan, relative motion, lai ghataucha.',
      },
    },
    {
      node: <><Pts items={[<>The rotor never reaches N<sub>s</sub>: at N<sub>s</sub> no flux is cut, no current, no torque</>, <>It runs at N slightly below N<sub>s</sub>; slip <K>{String.raw`s = (N_s - N)/N_s`}</K></>]} /></>,
      say: 'The rotor never reaches N s, since then no flux is cut and there is no torque. It runs slightly below, with slip s.',
      voice: 'द रोटर नेभर रिचेज एन एस, साइन्स देन नो फ्लक्स इज कट एन्ड देयर इज नो टर्क। इट रन्स स्लाइट्ली बिलो, विद स्लिप एस।',
    },
  ],
});

/* ── 5.2 Slip, rotor frequency, rotor EMF and current ────────────────── */
export const basics52 = duo('5.2 · Basic understanding: why does the rotor turn, and never reach synchronous speed?', {
  three: inductionTour([
    { shot: 'front', show: FED, field: 1, rmf: 0.7, spin: 0, flow: 0.6, focus: ['winding'], labels: [['speed fixed', 'field']] },
    { spin: 0.65, spinMs: 3500, focus: ['cage', 'rotorCore'], labels: [['rotor ali pachhi', 'cage']] },
    { spin: 0.7, rmf: 0.7, heat: {}, focus: ['cage'], labels: [['barabar: kei kaatdaina', 'cage']] },
    { spin: 0.65, focus: ['cage', 'rotorCore'], labels: [['farak: slip', 'rotorCore']] },
    { spin: 0.55, heat: { cage: 0.5 }, focus: ['cage', 'shaft'], labels: [['load: jhan pachhi', 'shaft']] },
    { shot: 'inside', spin: 0.55, focus: ['cage'], labels: [['rotor current bistarai', 'cage']] },
    { spin: 0, spinMs: 1500, heat: { cage: 0.9 }, focus: ['cage'], labels: [['rokiyeko: thulo current', 'cage']] },
    { shot: 'whole', spin: 0.65, spinMs: 3000, heat: {}, focus: null },
  ]),
  tutor: [
    {
      say: 'Stator ko ghumne magnet fixed speed ma ghumcha, supply ko frequency ra pole le tay gareko: synchronous speed.',
      voice: 'स्टेटरको घुम्ने म्याग्नेट फिक्स्ड स्पिडमा घुम्छ, सप्लाईको फ्रिक्वेन्सी र पोलले तय गरेको — सिन्क्रोनस स्पिड।',
      lines: [['h', <>5.2 · Rotor kina pachhi parcha?</>], chain(<>Magnet ko speed fixed: synchronous speed</>)],
    },
    {
      say: 'Rotor magnet lai pachhyaucha, tara sadhai ali pachhi. Kina?',
      voice: 'रोटर म्याग्नेटलाई पछ्याउँछ, तर सधैं अलि पछि। किन?',
      lines: [['step', <>Rotor sadhai ali pachhi</>]],
    },
    {
      say: 'Rotor magnet jattikai chito bhayo bhane bar le magnet kaatdaina: current hudaina, dhakka hudaina, ra rotor sust huncha.',
      voice: 'रोटर म्याग्नेट जत्तिकै छिटो भयो भने बारले म्याग्नेट काट्दैन — करेन्ट हुँदैन, धक्का हुँदैन, र रोटर सुस्त हुन्छ।',
      lines: [chain(<>Barabar speed → kaatdaina → current, dhakka chaina</>)],
      ask: {
        q: 'Rotor magnet ko barabar speed ma pugyo bhane k huncha?',
        voice: 'रोटर म्याग्नेटको बराबर स्पिडमा पुग्यो भने के हुन्छ?',
        options: ['Torque zero huncha', 'Torque dobar huncha', 'Rotor ulto ghumcha'],
        answer: 0,
        why: 'Relative motion chaina: EMF, current ra torque sabai zero.',
      },
    },
    {
      say: 'Magnet ra rotor ko speed ko farak, magnet ko speed ko bhag ma: yahi slip. Sadharan ma 2 dekhi 5 percent.',
      voice: 'म्याग्नेट र रोटरको स्पिडको फरक, म्याग्नेटको स्पिडको भागमा — यही स्लिप। साधारणमा दुई देखि पाँच प्रतिशत।',
      lines: [chain(<>Speed ko farak ÷ magnet ko speed → slip (2–5 %)</>)],
    },
    {
      say: 'Load badhaye rotor jhan pachhi parcha, slip badhcha, ra badhi current le badhi dhakka dincha.',
      voice: 'लोड बढाए रोटर झन् पछि पर्छ, स्लिप बढ्छ, र बढी करेन्टले बढी धक्का दिन्छ।',
      lines: [chain(<>Load badhyo → slip badhyo → badhi dhakka</>)],
    },
    {
      say: 'Rotor le magnet lai bistarai matra kaatcha, tesaile rotor ko current dherai bistarai ulto-sulto huncha: 1-2 hertz jasto.',
      voice: 'रोटरले म्याग्नेटलाई बिस्तारै मात्र काट्छ, त्यसैले रोटरको करेन्ट धेरै बिस्तारै उल्टो सुल्टो हुन्छ — एक दुई हर्ट्ज जस्तो।',
      lines: [['step', <>Rotor ko current bistarai badlincha (rotor frequency sano)</>]],
    },
    {
      say: 'Ascharya: start ma rotor rokiyeko, magnet le sabai bhanda chito kaatcha, ra rotor ma sabai bhanda thulo current.',
      voice: 'आश्चर्य — स्टार्टमा रोटर रोकिएको, म्याग्नेटले सबैभन्दा छिटो काट्छ, र रोटरमा सबैभन्दा ठूलो करेन्ट।',
      lines: [part(<>Start</>, <>rotor rokiyeko → sabai bhanda thulo current</>)],
    },
    {
      say: 'Saransha: rotor sadhai ali pachhi; farak nai slip; slip le rotor ko current ra frequency tay garcha.',
      voice: 'सारांश — रोटर सधैं अलि पछि, फरक नै स्लिप, स्लिपले रोटरको करेन्ट र फ्रिक्वेन्सी तय गर्छ।',
      lines: [['idea', <>Rotor ali pachhi · farak: slip · slip → rotor current ra frequency</>]],
    },
  ],
  lecturer: [
    {
      say: 'RMF synchronous speed ma rotate garcha, jun frequency ra poles le tay huncha.',
      voice: 'आर एम एफ सिन्क्रोनस स्पिडमा रोटेट गर्छ, जुन फ्रिक्वेन्सी र पोल्सले तय हुन्छ।',
      lines: [['h', <>5.2 · Slip</>], ['step', <>RMF at synchronous speed</>]],
    },
    {
      say: 'Rotor RMF ko direction ma, tara alikati kam speed ma ghumcha.',
      voice: 'रोटर आर एम एफको डाइरेक्सनमा, तर अलिकति कम स्पिडमा घुम्छ।',
      lines: [['step', <>Rotor runs slightly below synchronous speed</>]],
    },
    {
      say: 'Synchronous speed ma relative motion hudaina, rotor EMF ra torque zero hunchan.',
      voice: 'सिन्क्रोनस स्पिडमा रिलेटिभ मोसन हुँदैन, रोटर ई एम एफ र टर्क जिरो हुन्छन्।',
      lines: [chain(<>At synchronous speed: no EMF, no torque</>)],
      ask: {
        q: 'Induction motor lai asynchronous motor kina bhanincha?',
        voice: 'इन्डक्सन मोटरलाई एसिन्क्रोनस मोटर किन भनिन्छ?',
        options: ['Kahile synchronous speed ma chaldaina', 'Synchronous speed ma matra chalcha', 'DC ma chalcha'],
        answer: 0,
        why: 'Torque ko lagi slip chahincha.',
      },
    },
    {
      say: 'Relative speed ra synchronous speed ko ratio slip ho; full load ma 2 dekhi 5 percent.',
      voice: 'रिलेटिभ स्पिड र सिन्क्रोनस स्पिडको रेसियो स्लिप हो, फुल लोडमा दुई देखि पाँच प्रतिशत।',
      lines: [part(<>Slip</>, <>relative speed over synchronous speed (2–5 %)</>)],
    },
    {
      say: 'Load badhda slip badhcha, rotor current badhcha ra torque badhcha.',
      voice: 'लोड बढ्दा स्लिप बढ्छ, रोटर करेन्ट बढ्छ, र टर्क बढ्छ।',
      lines: [chain(<>Load ↑ → slip ↑ → rotor current and torque ↑</>)],
    },
    {
      say: 'Rotor EMF ko frequency slip ko anupat ma sano huncha.',
      voice: 'रोटर ई एम एफको फ्रिक्वेन्सी स्लिपको अनुपातमा सानो हुन्छ।',
      lines: [['step', <>Rotor frequency small, in proportion to slip</>]],
    },
    {
      say: 'Standstill ma slip ek, rotor EMF ra current maximum hunchan.',
      voice: 'स्ट्यान्डस्टिलमा स्लिप एक, रोटर ई एम एफ र करेन्ट म्याक्सिमम हुन्छन्।',
      lines: [part(<>Standstill</>, <>slip unity, maximum rotor EMF and current</>)],
    },
    {
      say: 'Saransha: slip le rotor ko EMF, frequency, reactance ra current tay garcha.',
      voice: 'सारांश — स्लिपले रोटरको ई एम एफ, फ्रिक्वेन्सी, रियाक्टेन्स, र करेन्ट तय गर्छ।',
      lines: [['idea', <>Slip decides rotor EMF, frequency, reactance and current</>]],
    },
  ],
});

export const slip52 = duo('Derivation: slip and rotor frequency', {
  draw: slipFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Figure 5.2: field N s ma, rotor N ma. Slip s equals N s minus N over N s.',
      voice: 'फिगर फाइभ पोइन्ट टु — फिल्ड एन एसमा, रोटर एनमा। स्लिप एस इक्वल्स एन एस माइनस एन ओभर एन एस।',
      lines: [['h', <>Slip</>], ['eq', tex(String.raw`\boxed{s = \dfrac{N_s - N}{N_s}}, \quad N = N_s(1 - s)`)]],
    },
    {
      say: 'Rotor le field lai relative speed N s minus N ma kaatcha.',
      voice: 'रोटरले फिल्डलाई रिलेटिभ स्पिड एन एस माइनस एनमा काट्छ।',
      lines: [['step', <>Relative speed of field past the rotor = N<sub>s</sub> − N = sN<sub>s</sub></>]],
    },
    {
      say: 'Rotor frequency f 2 equals P times relative speed over 120. N s minus N equals s N s rakhda.',
      voice: 'रोटर फ्रिक्वेन्सी एफ टु इक्वल्स पी टाइम्स रिलेटिभ स्पिड ओभर वान ट्वेन्टी। एन एस माइनस एन इक्वल्स एस एन एस राख्दा।',
      lines: [['eq', tex(String.raw`\begin{aligned} f_2 &= \dfrac{P(N_s - N)}{120} \\ &= s\underbrace{\dfrac{PN_s}{120}}_{f} \end{aligned}`)]],
    },
    {
      say: 'Tesaile f 2 equals s f. 50 hertz ma 4 percent slip bhaye f 2 matra 2 hertz.',
      voice: 'त्यसैले एफ टु इक्वल्स एस एफ। फिफ्टी हर्ट्जमा चार प्रतिशत स्लिप भए एफ टु मात्र टु हर्ट्ज।',
      lines: [['eq', tex(String.raw`\boxed{f_2 = s f}`)]],
      ask: {
        q: 'Standstill ma rotor frequency kati?',
        voice: 'स्ट्यान्डस्टिलमा रोटर फ्रिक्वेन्सी कति?',
        options: ['Supply frequency f', 'Zero', 'f / 2'],
        answer: 0,
        why: 'Standstill: s = 1, f2 = f.',
      },
    },
    {
      say: 'Slip sano bhayera rotor ko iron loss negligible huncha: f 2 sano.',
      voice: 'स्लिप सानो भएर रोटरको आइरन लस नेग्लिजिबल हुन्छ — एफ टु सानो।',
      lines: [['idea', <>Small f<sub>2</sub> → rotor core loss negligible while running</>]],
    },
  ],
  lecturer: [
    {
      say: 'Slip is defined as the ratio of relative speed to synchronous speed, Figure 5.2.',
      voice: 'स्लिप इज डिफाइन्ड एज द रेसियो अफ रिलेटिभ स्पिड टु सिन्क्रोनस स्पिड, फिगर फाइभ पोइन्ट टु।',
      lines: [['h', <>Slip and rotor frequency</>], ['eq', tex(String.raw`\boxed{s = \dfrac{N_s - N}{N_s}}, \quad N = N_s(1 - s)`)]],
    },
    {
      say: 'The field moves past the rotor at N s minus N, that is s N s.',
      voice: 'द फिल्ड मुभ्स पास्ट द रोटर एट एन एस माइनस एन, दयाट इज एस एन एस।',
      lines: [['step', <>Relative speed = sN<sub>s</sub></>]],
    },
    {
      say: 'The rotor frequency is P times the relative speed over 120.',
      voice: 'द रोटर फ्रिक्वेन्सी इज पी टाइम्स द रिलेटिभ स्पिड ओभर वान ट्वेन्टी।',
      lines: [['eq', tex(String.raw`\begin{aligned} f_2 &= \dfrac{P(N_s - N)}{120} \\ &= s\underbrace{\dfrac{PN_s}{120}}_{f} \end{aligned}`)]],
    },
    {
      say: 'Hence f 2 equals s f.',
      voice: 'हेन्स एफ टु इक्वल्स एस एफ।',
      lines: [['eq', tex(String.raw`\boxed{f_2 = s f}`)]],
      ask: {
        q: '50 Hz ma 3 % slip bhaye rotor frequency kati?',
        voice: 'फिफ्टी हर्ट्जमा तीन प्रतिशत स्लिप भए रोटर फ्रिक्वेन्सी कति?',
        options: ['1.5 Hz', '3 Hz', '48.5 Hz'],
        answer: 0,
        why: 'f2 = 0.03 × 50 = 1.5 Hz.',
      },
    },
    {
      say: 'Since f 2 is small, the rotor core loss is negligible in normal running.',
      voice: 'साइन्स एफ टु इज स्मल, द रोटर कोर लस इज नेग्लिजिबल इन नर्मल रनिङ।',
      lines: [['step', <>Rotor core loss negligible (small f<sub>2</sub>)</>]],
    },
  ],
});

export const rotor52 = duo('Derivation: rotor EMF, reactance and current', {
  draw: slipFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Standstill ma rotor ko EMF E 2 ra reactance X 2. Rotor resistance R 2.',
      voice: 'स्ट्यान्डस्टिलमा रोटरको ई एम एफ ई टु र रियाक्टेन्स एक्स टु। रोटर रेजिस्टेन्स आर टु।',
      lines: [['h', <>Rotor EMF and current</>], ['step', <>At standstill: E<sub>2</sub>, X<sub>2</sub> = 2πfL<sub>2</sub>; resistance R<sub>2</sub></>]],
    },
    {
      say: 'EMF relative speed ko anupat ma: running ma E 2 r equals s E 2.',
      voice: 'ई एम एफ रिलेटिभ स्पिडको अनुपातमा — रनिङमा ई टु आर इक्वल्स एस ई टु।',
      lines: [['eq', tex(String.raw`\boxed{E_{2r} = sE_2}`)]],
    },
    {
      say: 'Reactance frequency ko anupat ma: X 2 r equals 2 pi s f L 2, equals s X 2. R 2 badlidaina.',
      voice: 'रियाक्टेन्स फ्रिक्वेन्सीको अनुपातमा — एक्स टु आर इक्वल्स टु पाइ एस एफ एल टु, इक्वल्स एस एक्स टु। आर टु बदलिँदैन।',
      lines: [['eq', tex(String.raw`\begin{aligned} X_{2r} &= 2\pi (sf) L_2 \\ &= \boxed{sX_2} \end{aligned}`)]],
    },
    {
      say: 'Rotor current I 2 equals s E 2 over root of R 2 square plus s X 2 square.',
      voice: 'रोटर करेन्ट आई टु इक्वल्स एस ई टु ओभर रुट अफ आर टु स्क्वायर प्लस एस एक्स टु स्क्वायर।',
      lines: [['eq', tex(String.raw`\boxed{I_2 = \dfrac{sE_2}{\sqrt{R_2^2 + (sX_2)^2}}}`)]],
      ask: {
        q: 'Slip zero bhaye rotor current kati?',
        voice: 'स्लिप जिरो भए रोटर करेन्ट आई टु कति?',
        options: ['Zero', 'Maximum', 'E2/R2'],
        answer: 0,
        why: 'Numerator sE2 = 0.',
      },
    },
    {
      say: 'Rotor power factor cos phi 2 equals R 2 over root of R 2 square plus s X 2 square: sano slip ma lagbhag ek.',
      voice: 'रोटर पावर फ्याक्टर कस फाइ टु इक्वल्स आर टु ओभर रुट अफ आर टु स्क्वायर प्लस एस एक्स टु स्क्वायर — सानो स्लिपमा लगभग एक।',
      lines: [['idea', <><K>{String.raw`\cos\varphi_2 = \dfrac{R_2}{\sqrt{R_2^2 + (sX_2)^2}}`}</K>: near unity when running, low at start</>]],
    },
  ],
  lecturer: [
    {
      say: 'Let E 2 and X 2 be the rotor EMF and reactance per phase at standstill, and R 2 the rotor resistance.',
      voice: 'लेट ई टु एन्ड एक्स टु बी द रोटर ई एम एफ एन्ड रियाक्टेन्स पर फेज एट स्ट्यान्डस्टिल, एन्ड आर टु द रोटर रेजिस्टेन्स।',
      lines: [['h', <>Rotor EMF, reactance and current</>], ['step', <>Let E<sub>2</sub>, X<sub>2</sub> (standstill), R<sub>2</sub> per phase</>]],
    },
    {
      say: 'Running at slip s, the rotor EMF is s E 2.',
      voice: 'रनिङ एट स्लिप एस, द रोटर ई एम एफ इज एस ई टु।',
      lines: [['eq', tex(String.raw`\boxed{E_{2r} = sE_2}`)]],
    },
    {
      say: 'The rotor reactance is s X 2, since the frequency is s f.',
      voice: 'द रोटर रियाक्टेन्स इज एस एक्स टु, साइन्स द फ्रिक्वेन्सी इज एस एफ।',
      lines: [['eq', tex(String.raw`\begin{aligned} X_{2r} &= 2\pi (sf) L_2 \\ &= \boxed{sX_2} \end{aligned}`)]],
    },
    {
      say: 'Hence the rotor current I 2 per phase.',
      voice: 'हेन्स द रोटर करेन्ट आई टु पर फेज।',
      lines: [['eq', tex(String.raw`\boxed{I_2 = \dfrac{sE_2}{\sqrt{R_2^2 + (sX_2)^2}}}`)]],
      ask: {
        q: 'Running ma rotor reactance standstill bhanda kasto?',
        voice: 'रनिङमा रोटर रियाक्टेन्स स्ट्यान्डस्टिलभन्दा कस्तो?',
        options: ['s guna sano', 'Utti nai', 'Thulo'],
        answer: 0,
        why: 'X2r = sX2, s < 1.',
      },
    },
    {
      say: 'The rotor power factor is R 2 over the rotor impedance.',
      voice: 'द रोटर पावर फ्याक्टर इज आर टु ओभर द रोटर इम्पिडेन्स।',
      lines: [['eq', tex(String.raw`\cos\varphi_2 = \dfrac{R_2}{\sqrt{R_2^2 + (sX_2)^2}}`)]],
    },
  ],
});

export const speedAnswer52 = answer('Model answer: synchronous speed and why the rotor lags', {
  draw: slipFigure,
  viewBox: '0 0 360 222',
  papers: ['2075 Baishakh'],
  marks: '[2 + 3 + 3]',
  q: 'Define synchronous speed of three phase induction motor. Why does the rotor of a three phase induction motor rotate in the same direction as the rotating magnetic field? Why rotor can never reach the speed of stator field.',
  read: {
    say: 'IOE 2075 Baishakh: define synchronous speed. Why does the rotor rotate in the same direction as the rotating magnetic field? Why can the rotor never reach the speed of the stator field? Dui, tin, tin marks.',
    voice: 'आई ओ ई दुई हजार पचहत्तर वैशाख — डिफाइन सिन्क्रोनस स्पिड। ह्वाई डज द रोटर रोटेट इन द सेम डाइरेक्सन एज द रोटेटिङ म्याग्नेटिक फिल्ड? ह्वाई क्यान द रोटर नेभर रिच द स्पिड अफ द स्टेटर फिल्ड? दुई, तीन, तीन मार्क्स।',
  },
  points: [
    {
      node: <><H>(a) Synchronous speed [2]</H><Pts items={[<>The speed at which the rotating magnetic field of the stator rotates</>]} /><K>{String.raw`\boxed{N_s = \dfrac{120 f}{P}}\unit{rpm}`}</K></>,
      say: 'Synchronous speed: the speed of the stator’s rotating magnetic field, N s equals 120 f over P.',
      voice: 'सिन्क्रोनस स्पिड — द स्पिड अफ द स्टेटर्स रोटेटिङ म्याग्नेटिक फिल्ड, एन एस इक्वल्स वान ट्वेन्टी एफ ओभर पी।',
    },
    {
      page: true,
      node: <><H>(b) Same direction as the RMF [3]</H><Pts items={[<>The RMF cuts the rotor conductors; EMF and current are induced (Faraday)</>, <>By Lenz’s law the rotor current opposes its cause, the relative speed between RMF and rotor</>, <>To reduce the relative speed, the rotor turns in the direction of the RMF</>]} /></>,
      say: 'The RMF cuts the rotor and induces current. By Lenz’s law the current opposes its cause, the relative speed. To reduce it, the rotor turns in the RMF’s direction.',
      voice: 'द आर एम एफ कट्स द रोटर एन्ड इन्ड्युसेज करेन्ट। बाइ लेन्जेस ल द करेन्ट अपोजेज इट्स कज, द रिलेटिभ स्पिड। टु रिड्युस इट, द रोटर टर्न्स इन द आर एम एफ्स डाइरेक्सन।',
    },
    {
      page: true,
      node: <><H>(c) Never reaches N<sub>s</sub> [3]</H><Pts items={[<>If N = N<sub>s</sub>, relative speed is zero: no flux cut, no rotor EMF, no current</>, <>No current → no torque; the rotor slows below N<sub>s</sub> due to friction and load</>, <>∴ it always runs with some slip <K>{String.raw`s = (N_s - N)/N_s`}</K>, typically 2–5 %</>]} /></>,
      say: 'If N equals N s, there is no relative speed, no EMF, no current and no torque, so the rotor slows below N s. It always runs with some slip, typically 2 to 5 percent.',
      voice: 'इफ एन इक्वल्स एन एस, देयर इज नो रिलेटिभ स्पिड, नो ई एम एफ, नो करेन्ट, एन्ड नो टर्क, सो द रोटर स्लोज बिलो एन एस। इट अल्वेज रन्स विद सम स्लिप, टिपिकल्ली टु टु फाइभ पर्सेन्ट।',
      ask: {
        q: '4-pole, 50 Hz motor ko synchronous speed kati?',
        voice: 'फोर पोल, फिफ्टी हर्ट्ज मोटरको सिन्क्रोनस स्पिड कति?',
        options: ['1500 rpm', '3000 rpm', '1000 rpm'],
        answer: 0,
        why: 'Ns = 120 × 50 / 4 = 1500 rpm.',
      },
    },
  ],
});

export const rotorSolve52 = solve({
  title: 'IOE 2071 Magh: slip, rotor frequency and EMF',
  paper: '2071 Magh',
  paperVoice: 'दुई हजार एकहत्तर माघ',
  question: 'A 3-phase delta connected 440 volts, 50 Hz, 4-pole induction motor has a rotor stand-still emf per phase of 130 volts. If the motor is running at 1,440 RPM, calculate for this speed: (i) the slip, (ii) the frequency of rotor induced emf, (iii) the value of the rotor induced emf per phase, and (iv) stator to rotor turn ratio.',
  read: '440 volt delta, 50 hertz, 4 pole. Rotor standstill EMF 130 volt per phase, speed 1440 rpm. Slip, f 2, rotor EMF ra turns ratio.',
  readVoice: 'चार सय चालीस भोल्ट डेल्टा, फिफ्टी हर्ट्ज, फोर पोल। रोटर स्ट्यान्डस्टिल ई एम एफ एक सय तीस भोल्ट पर फेज, स्पिड चौध सय चालीस आर पी एम। स्लिप, एफ टु, रोटर ई एम एफ, र टर्न्स रेसियो।',
  given: [
    { node: <>V = 440 V (Δ, so phase voltage 440 V), f = 50 Hz, P = 4</>, say: 'Delta: phase voltage 440, f 50, P 4', voice: 'डेल्टा — फेज भोल्टेज चार सय चालीस, एफ फिफ्टी, पी फोर' },
    { node: <>E<sub>2</sub> = 130 V per phase, N = 1440 rpm</>, say: 'E2 130 volt, N 1440 rpm', voice: 'ई टु एक सय तीस भोल्ट, एन चौध सय चालीस आर पी एम' },
  ],
  find: { node: <>s, f<sub>2</sub>, E<sub>2r</sub>, turns ratio</>, say: 'Nikalnu parne: s, f 2, E 2 r, turns ratio.', voice: 'निकाल्नु पर्ने — एस, एफ टु, ई टु आर, टर्न्स रेसियो।' },
  idea: { node: <>N<sub>s</sub> = 120f/P; s; f<sub>2</sub> = sf; E<sub>2r</sub> = sE<sub>2</sub>; ratio = E<sub>1</sub>/E<sub>2</sub></>, say: 'Method: N s, slip, s f, s E 2, ani E 1 over E 2.', voice: 'मेथड — एन एस, स्लिप, एस एफ, एस ई टु, अनि ई वान ओभर ई टु।' },
  steps: [
    {
      node: <K>{String.raw`\begin{aligned} N_s &= \dfrac{120\times50}{4} \\ &= 1500\ \text{rpm} \\ s &= \dfrac{1500 - 1440}{1500} \\ &= 0.04 \end{aligned}`}</K>,
      say: 'N s equals 1500 rpm; slip equals 60 over 1500, 0.04.',
      voice: 'एन एस इक्वल्स पन्ध्र सय आर पी एम, स्लिप इक्वल्स सिक्स्टी ओभर पन्ध्र सय, जिरो पोइन्ट जिरो फोर।',
    },
    {
      node: <K>{String.raw`\begin{aligned} f_2 &= sf \\ &= 0.04\times50 \\ &= 2\ \text{Hz} \\ E_{2r} &= sE_2 \\ &= 0.04\times130 \\ &= 5.2\ \text{V} \end{aligned}`}</K>,
      say: 'f 2 equals 2 hertz; E 2 r equals 5.2 volt.',
      voice: 'एफ टु इक्वल्स टु हर्ट्ज, ई टु आर इक्वल्स फाइभ पोइन्ट टु भोल्ट।',
      ask: {
        q: 'Running rotor EMF standstill ko kati guna?',
        voice: 'रनिङ रोटर ई एम एफ स्ट्यान्डस्टिलको कति गुना?',
        options: ['s guna (0.04)', '1/s guna', 'Barabar'],
        answer: 0,
        why: 'E2r = sE2.',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} \dfrac{N_1}{N_2} &= \dfrac{E_1}{E_2} \\ &= \dfrac{440}{130} \end{aligned}`}</K>,
      say: 'Turns ratio equals stator phase voltage over rotor standstill EMF, 440 over 130.',
      voice: 'टर्न्स रेसियो इक्वल्स स्टेटर फेज भोल्टेज ओभर रोटर स्ट्यान्डस्टिल ई एम एफ, चार सय चालीस ओभर एक सय तीस।',
    },
  ],
  answer: { node: <>s = 0.04, f<sub>2</sub> = 2 Hz, E<sub>2r</sub> = 5.2 V, N<sub>1</sub>/N<sub>2</sub> = 3.385</>, say: 'Answer: s 0.04, f 2 2 hertz, E 2 r 5.2 volt, ratio 3.385.', voice: 'आन्सर — एस जिरो पोइन्ट जिरो फोर, एफ टु टु हर्ट्ज, ई टु आर फाइभ पोइन्ट टु भोल्ट, रेसियो थ्री पोइन्ट थ्री एट फाइभ।' },
  trap: { node: <>Trap: in delta the phase voltage is the line voltage (440 V); in star it would be 440/√3.</>, say: 'Trap: delta ma phase voltage line jattikai, star ma root 3 le bhag.', voice: 'ट्र्याप — डेल्टामा फेज भोल्टेज लाइन जत्तिकै, स्टारमा रुट थ्रीले भाग।' },
});

/* ── 5.3 Torque equation, T-s ──────────────────────────────────────── */
export const basics53 = duo('5.3 · Basic understanding: why high current but low torque at start?', {
  three: inductionTour([
    { shot: 'front', show: FED, field: 1, rmf: 0.7, spin: 0, flow: 1, heat: { cage: 0.9 }, focus: ['cage'], labels: [['start: thulo current', 'cage']] },
    { spin: 0.08, focus: ['cage', 'rotorCore'], labels: [['tara dhakka kam', 'rotorCore']] },
    { spin: 0.4, spinMs: 2500, heat: { cage: 0.6 }, focus: ['cage'], labels: [['badhi dhakka', 'cage']] },
    { spin: 0.55, heat: { cage: 0.5 }, focus: ['cage', 'shaft'], labels: [['maximum dhakka', 'shaft']] },
    { spin: 0.67, heat: { cage: 0.2 }, focus: ['cage'], labels: [['najik pugda ghatyo', 'cage']] },
    { spin: 0.65, focus: ['shaft'], labels: [['sadharan chalne thau', 'shaft']] },
    { shot: 'slip', show: [...FED.filter((p) => p !== 'cage'), 'slip', 'rheo'], spin: 0.2, spinMs: 1500, heat: { rheo: 0.6 }, focus: ['rheo', 'slip'], labels: [['resistance thapyo', 'rheo']] },
    { shot: 'whole', show: FED, spin: 0.65, spinMs: 2500, heat: {}, focus: null },
  ]),
  tutor: [
    {
      say: 'Motor on garda rotor rokiyeko: magnet sabai bhanda chito kaatcha, ra rotor ma bhayankar current.',
      voice: 'मोटर अन गर्दा रोटर रोकिएको — म्याग्नेट सबैभन्दा छिटो काट्छ, र रोटरमा भयंकर करेन्ट।',
      lines: [['h', <>5.3 · Thulo current, kam dhakka?</>], part(<>Start</>, <>rotor ma thulo current</>)],
    },
    {
      say: 'Tara dhakka kam! Rotor ko current magnet bhanda ali pachhi huncha, ra pachhi pareko current le kam kaam garcha.',
      voice: 'तर धक्का कम! रोटरको करेन्ट म्याग्नेटभन्दा अलि पछि हुन्छ, र पछि परेको करेन्टले कम काम गर्छ।',
      lines: [chain(<>Current pachhi parcha → dhakka kam</>)],
      ask: {
        q: 'Start ma induction motor ko torque kina kam huncha?',
        voice: 'स्टार्टमा इन्डक्सन मोटरको टर्क किन कम हुन्छ?',
        options: ['Rotor current dherai pachhi parcha', 'Current nai hudaina', 'Magnet ghumdaina'],
        answer: 0,
        why: 'Start ma rotor reactance thulo: current lag garcha, power factor kam.',
      },
    },
    {
      say: 'Speed badhdai jada current kam pachhi parcha, ra dhakka badhdai jancha.',
      voice: 'स्पिड बढ्दै जाँदा करेन्ट कम पछि पर्छ, र धक्का बढ्दै जान्छ।',
      lines: [chain(<>Speed badhyo → dhakka badhyo</>)],
    },
    {
      say: 'Euta speed ma dhakka sabai bhanda thulo huncha: maximum torque.',
      voice: 'एउटा स्पिडमा धक्का सबैभन्दा ठूलो हुन्छ — म्याक्सिमम टर्क।',
      lines: [['step', <>Euta speed ma sabai bhanda thulo dhakka</>]],
    },
    {
      say: 'Tyo pachhi magnet ko speed najik pugda bar le kam kaatcha, ra dhakka ghatdai zero tira.',
      voice: 'त्यो पछि म्याग्नेटको स्पिड नजिक पुग्दा बारले कम काट्छ, र धक्का घट्दै जिरोतिर।',
      lines: [chain(<>Magnet ko speed najik → dhakka ghatcha</>)],
    },
    {
      say: 'Sadharan motor yahi antim bhag ma chalcha: load thapyo bhane ali sust bhayera dhakka badhaucha. Yo stable thau.',
      voice: 'साधारण मोटर यही अन्तिम भागमा चल्छ — लोड थप्यो भने अलि सुस्त भएर धक्का बढाउँछ। यो स्टेबल ठाउँ।',
      lines: [chain(<>Sadharan chalne thau: stable</>)],
    },
    {
      say: 'Slip-ring motor ma rotor ma bahira resistance thape current kam pachhi parcha, ra start mai thulo dhakka.',
      voice: 'स्लिप रिङ मोटरमा रोटरमा बाहिर रेजिस्टेन्स थपे करेन्ट कम पछि पर्छ, र स्टार्टमै ठूलो धक्का।',
      lines: [chain(<>Rotor resistance thapyo → start mai thulo dhakka</>)],
    },
    {
      say: 'Saransha: start ma thulo current tara kam dhakka, ani maximum, ani sync najik ghatcha; resistance le maximum lai start tira sarcha.',
      voice: 'सारांश — स्टार्टमा ठूलो करेन्ट तर कम धक्का, अनि म्याक्सिमम, अनि सिंक नजिक घट्छ, रेजिस्टेन्सले म्याक्सिममलाई स्टार्टतिर सार्छ।',
      lines: [['idea', <>Start: kam dhakka → maximum → ghatcha · resistance → maximum start tira</>]],
    },
  ],
  lecturer: [
    {
      say: 'Starting ma slip ek huncha ra rotor current dherai thulo huncha.',
      voice: 'स्टार्टिङमा स्लिप एक हुन्छ, र रोटर करेन्ट धेरै ठूलो हुन्छ।',
      lines: [['h', <>5.3 · Torque against slip</>], part(<>At start</>, <>slip unity, large rotor current</>)],
    },
    {
      say: 'Tara rotor reactance thulo bhayera rotor power factor kam, tesaile starting torque kam.',
      voice: 'तर रोटर रियाक्टेन्स ठूलो भएर रोटर पावर फ्याक्टर कम, त्यसैले स्टार्टिङ टर्क कम।',
      lines: [chain(<>High rotor reactance → low rotor pf → low starting torque</>)],
      ask: {
        q: 'Torque kun current component sanga badhcha?',
        voice: 'टर्क कुन करेन्ट कम्पोनेन्टसँग बढ्छ?',
        options: ['Rotor current in phase with EMF', 'Magnetising current', 'Stator leakage current'],
        answer: 0,
        why: 'T ∝ Φ I2 cos φ2.',
      },
    },
    {
      say: 'Speed badhda slip ghatcha, power factor sudhrincha ra torque badhcha.',
      voice: 'स्पिड बढ्दा स्लिप घट्छ, पावर फ्याक्टर सुध्रिन्छ, र टर्क बढ्छ।',
      lines: [chain(<>Slip falls → pf improves → torque rises</>)],
    },
    {
      say: 'Euta slip ma torque maximum huncha: pull-out torque.',
      voice: 'एउटा स्लिपमा टर्क म्याक्सिमम हुन्छ — पुल आउट टर्क।',
      lines: [['step', <>Maximum (pull-out) torque at one slip</>]],
    },
    {
      say: 'Synchronous speed najik rotor current ghatcha ra torque zero tira jancha.',
      voice: 'सिन्क्रोनस स्पिड नजिक रोटर करेन्ट घट्छ, र टर्क जिरोतिर जान्छ।',
      lines: [['step', <>Near synchronous speed torque falls to zero</>]],
    },
    {
      say: 'Normal operation low-slip region ma huncha, jaha torque slip sanga lagbhag linear ra stable.',
      voice: 'नर्मल अपरेसन लो स्लिप रिजनमा हुन्छ, जहाँ टर्क स्लिपसँग लगभग लिनियर र स्टेबल।',
      lines: [part(<>Normal running</>, <>low-slip, linear, stable region</>)],
    },
    {
      say: 'Rotor resistance badhaye maximum torque ko slip badhcha, tara maximum torque ko value ustai rahancha.',
      voice: 'रोटर रेजिस्टेन्स बढाए म्याक्सिमम टर्कको स्लिप बढ्छ, तर म्याक्सिमम टर्कको भ्यालु उस्तै रहन्छ।',
      lines: [chain(<>Higher rotor resistance: same maximum torque at a higher slip</>)],
    },
    {
      say: 'Saransha: torque slip ma depend garcha, maximum euta slip ma, ra rotor resistance le starting torque badhauna sakcha.',
      voice: 'सारांश — टर्क स्लिपमा डिपेन्ड गर्छ, म्याक्सिमम एउटा स्लिपमा, र रोटर रेजिस्टेन्सले स्टार्टिङ टर्क बढाउन सक्छ।',
      lines: [['idea', <>Torque depends on slip · maximum at one slip · rotor resistance raises starting torque</>]],
    },
  ],
});

export const torque53 = duo('Derivation: torque equation of the induction motor', {
  draw: tsFigure,
  viewBox: '0 0 360 232',
  tutor: [
    {
      say: 'Torque flux phi, rotor current I 2 ra rotor power factor cos phi 2 ko product sanga badhcha.',
      voice: 'टर्क फ्लक्स फाइ, रोटर करेन्ट आई टु, र रोटर पावर फ्याक्टर कस फाइ टु को प्रडक्टसँग बढ्छ।',
      lines: [['h', <>Torque equation</>], ['eq', tex(String.raw`T \propto \Phi\, I_2 \cos\varphi_2`)]],
    },
    {
      say: 'E 2 flux sanga proportional, tesaile phi ko satta E 2. I 2 ra cos phi 2 rotor circuit bata rakhau.',
      voice: 'ई टु फ्लक्ससँग प्रपोर्सनल, त्यसैले फाइको सट्टा ई टु। आई टु र कस फाइ टु रोटर सर्किटबाट राखौं।',
      lines: [['eq', tex(String.raw`\begin{aligned} T &= kE_2\,I_2\cos\varphi_2 \\ &= kE_2\cdot\underbrace{\dfrac{sE_2}{Z_2}}_{I_2}\cdot\underbrace{\dfrac{R_2}{Z_2}}_{\cos\varphi_2} \\ Z_2 &= \sqrt{R_2^2+(sX_2)^2} \end{aligned}`)]],
    },
    {
      say: 'Milauda: T equals k s E 2 square R 2 over R 2 square plus s X 2 square.',
      voice: 'मिलाउँदा — टी इक्वल्स के एस ई टु स्क्वायर आर टु ओभर आर टु स्क्वायर प्लस एस एक्स टु स्क्वायर।',
      lines: [['eq', tex(String.raw`\boxed{T = \dfrac{k\,sE_2^2R_2}{R_2^2 + (sX_2)^2}}`)]],
    },
    {
      say: 'Power bata k: k equals 3 over 2 pi n s, n s rps ma. Starting torque s equals 1 rakhda.',
      voice: 'पावरबाट के — के इक्वल्स थ्री ओभर टु पाइ एन एस, एन एस आर पी एसमा। स्टार्टिङ टर्क एस इक्वल्स वान राख्दा।',
      lines: [['eq', tex(String.raw`k = \dfrac{3}{2\pi n_s}, \quad T_{st} = \dfrac{kE_2^2R_2}{R_2^2 + X_2^2}`)]],
      ask: {
        q: 'Supply voltage 10 % ghatyo bhane torque kati ghatcha?',
        voice: 'सप्लाई भोल्टेज दस प्रतिशत घट्यो भने टर्क कति घट्छ?',
        options: ['Lagbhag 19 %', '10 %', '5 %'],
        answer: 0,
        why: 'T ∝ E2² ∝ V²: 0.9² = 0.81.',
      },
    },
    {
      say: 'Sano slip ma s X 2 sano: T proportional to s. Thulo slip ma T proportional to 1 over s.',
      voice: 'सानो स्लिपमा एस एक्स टु सानो — टी प्रपोर्सनल टु एस। ठूलो स्लिपमा टी प्रपोर्सनल टु वान ओभर एस।',
      lines: [['idea', <>Low slip: <K>{String.raw`T \propto s`}</K> (linear) · high slip: <K>{String.raw`T \propto 1/s`}</K> · <K>{String.raw`T \propto V^2`}</K></>]],
    },
  ],
  lecturer: [
    {
      say: 'The torque is proportional to the flux, the rotor current I 2 and the rotor power factor.',
      voice: 'द टर्क इज प्रपोर्सनल टु द फ्लक्स, द रोटर करेन्ट आई टु, एन्ड द रोटर पावर फ्याक्टर।',
      lines: [['h', <>Torque developed by an induction motor</>], ['eq', tex(String.raw`T \propto \Phi\, I_2 \cos\varphi_2`)]],
    },
    {
      say: 'With E 2 proportional to phi, substitute I 2 and cos phi 2.',
      voice: 'विद ई टु प्रपोर्सनल टु फाइ, सब्स्टिट्युट आई टु एन्ड कस फाइ टु।',
      lines: [['eq', tex(String.raw`\begin{aligned} T &= kE_2\,I_2\cos\varphi_2 \\ &= kE_2\cdot\underbrace{\dfrac{sE_2}{Z_2}}_{I_2}\cdot\underbrace{\dfrac{R_2}{Z_2}}_{\cos\varphi_2} \\ Z_2 &= \sqrt{R_2^2+(sX_2)^2} \end{aligned}`)]],
    },
    {
      say: 'Hence T equals k s E 2 square R 2 over R 2 square plus s X 2 square.',
      voice: 'हेन्स टी इक्वल्स के एस ई टु स्क्वायर आर टु ओभर आर टु स्क्वायर प्लस एस एक्स टु स्क्वायर।',
      lines: [['eq', tex(String.raw`\boxed{T = \dfrac{k\,sE_2^2R_2}{R_2^2 + (sX_2)^2}}`)]],
    },
    {
      say: 'Here k equals 3 over 2 pi n s; at start s equals 1 gives the starting torque.',
      voice: 'हियर के इक्वल्स थ्री ओभर टु पाइ एन एस, एट स्टार्ट एस इक्वल्स वान गिभ्स द स्टार्टिङ टर्क।',
      lines: [['eq', tex(String.raw`k = \dfrac{3}{2\pi n_s}, \quad T_{st} = \dfrac{kE_2^2R_2}{R_2^2 + X_2^2}`)]],
      ask: {
        q: 'Starting torque ko lagi slip kati rakhincha?',
        voice: 'स्टार्टिङ टर्कको लागि स्लिप कति राखिन्छ?',
        options: ['1', '0', 'R2/X2'],
        answer: 0,
        why: 'Standstill: N = 0, s = 1.',
      },
    },
    {
      say: 'At low slip, T is proportional to s; at high slip, to 1 over s; and always to V square.',
      voice: 'एट लो स्लिप, टी इज प्रपोर्सनल टु एस, एट हाई स्लिप, टु वान ओभर एस, एन्ड अल्वेज टु भी स्क्वायर।',
      lines: [['step', <>Low slip <K>{String.raw`T \propto s`}</K>; high slip <K>{String.raw`T \propto 1/s`}</K>; <K>{String.raw`T \propto V^2`}</K></>]],
    },
  ],
});

export const tmax53 = duo('Derivation: maximum torque and torque-slip characteristics', {
  draw: tsFigure,
  viewBox: '0 0 360 232',
  tutor: [
    {
      say: 'T lai s sanga differentiate garera zero rakhau. Denominator over s minimum hunu parcha.',
      voice: 'टीलाई एससँग डिफरेन्सियट गरेर जिरो राखौं। डिनोमिनेटर ओभर एस मिनिमम हुनु पर्छ।',
      lines: [['h', <>Condition for maximum torque</>], ['eq', tex(String.raw`T = \dfrac{kE_2^2R_2}{\frac{R_2^2}{s} + sX_2^2}`)]],
    },
    {
      say: 'd by d s ma minus R 2 square over s square plus X 2 square equals zero. Tesaile s m equals R 2 over X 2.',
      voice: 'डी बाइ डी एसमा माइनस आर टु स्क्वायर ओभर एस स्क्वायर प्लस एक्स टु स्क्वायर इक्वल्स जिरो। त्यसैले एस एम इक्वल्स आर टु ओभर एक्स टु।',
      lines: [['eq', tex(String.raw`\begin{aligned} -\dfrac{R_2^2}{s^2} + X_2^2 &= 0 \\ \therefore\ s_m &= \boxed{\dfrac{R_2}{X_2}} \end{aligned}`)]],
    },
    {
      say: 'Rakhda T max equals k E 2 square over 2 X 2. Yo R 2 ma depend gardaina!',
      voice: 'राख्दा टी म्याक्स इक्वल्स के ई टु स्क्वायर ओभर टु एक्स टु। यो आर टु मा डिपेन्ड गर्दैन!',
      lines: [['eq', tex(String.raw`\boxed{T_{max} = \dfrac{kE_2^2}{2X_2}}`)]],
      ask: {
        q: 'Rotor resistance dobar garda maximum torque k huncha?',
        voice: 'रोटर रेजिस्टेन्स दोब्बर गर्दा म्याक्सिमम टर्क के हुन्छ?',
        options: ['Ustai rahancha, s m dobar', 'Dobar huncha', 'Aadha huncha'],
        answer: 0,
        why: 'Tmax = kE2²/2X2 ma R2 chaina; sm = R2/X2 matra badhcha.',
      },
    },
    {
      say: 'Figure 5.3: s equals 1 ma T st, s m ma T max, ra s zero najik stable linear region.',
      voice: 'फिगर फाइभ पोइन्ट थ्री — एस इक्वल्स वानमा टी एस टी, एस एममा टी म्याक्स, र एस जिरो नजिक स्टेबल लिनियर रिजन।',
      lines: [['step', <>T<sub>st</sub> at s = 1 · T<sub>max</sub> at s<sub>m</sub> · stable region between s<sub>m</sub> and 0</>]],
    },
    {
      say: 'R 2 equals X 2 rakhe s m equals 1: starting torque nai maximum. Ratio T st over T max equals 2 s m over 1 plus s m square.',
      voice: 'आर टु इक्वल्स एक्स टु राखे एस एम इक्वल्स वान — स्टार्टिङ टर्क नै म्याक्सिमम। रेसियो टी एस टी ओभर टी म्याक्स इक्वल्स टु एस एम ओभर वान प्लस एस एम स्क्वायर।',
      lines: [['eq', tex(String.raw`\begin{aligned} \dfrac{T_{st}}{T_{max}} &= \dfrac{2s_m}{1 + s_m^2} \\ R_2 = X_2:\ T_{st} &= T_{max} \end{aligned}`)]],
    },
  ],
  lecturer: [
    {
      say: 'Dividing the numerator and denominator by s, the torque is maximum when the denominator is minimum.',
      voice: 'डिभाइडिङ द न्युमेरेटर एन्ड डिनोमिनेटर बाइ एस, द टर्क इज म्याक्सिमम ह्वेन द डिनोमिनेटर इज मिनिमम।',
      lines: [['h', <>Maximum torque and T-s characteristic</>], ['eq', tex(String.raw`T = \dfrac{kE_2^2R_2}{\frac{R_2^2}{s} + sX_2^2}`)]],
    },
    {
      say: 'Setting the derivative to zero gives s m equals R 2 over X 2.',
      voice: 'सेटिङ द डेरिभेटिभ टु जिरो गिभ्स एस एम इक्वल्स आर टु ओभर एक्स टु।',
      lines: [['eq', tex(String.raw`\begin{aligned} -\dfrac{R_2^2}{s^2} + X_2^2 &= 0 \\ \therefore\ s_m &= \boxed{\dfrac{R_2}{X_2}} \end{aligned}`)]],
    },
    {
      say: 'Hence T max equals k E 2 square over 2 X 2, independent of R 2.',
      voice: 'हेन्स टी म्याक्स इक्वल्स के ई टु स्क्वायर ओभर टु एक्स टु, इन्डिपेन्डेन्ट अफ आर टु।',
      lines: [['eq', tex(String.raw`\boxed{T_{max} = \dfrac{kE_2^2}{2X_2}}`)]],
      ask: {
        q: 'Maximum torque kun quantity ko ulto anupat ma huncha?',
        voice: 'म्याक्सिमम टर्क कुन क्वान्टिटीको उल्टो अनुपातमा हुन्छ?',
        options: ['X2', 'R2', 'Slip'],
        answer: 0,
        why: 'Tmax = kE2²/2X2.',
      },
    },
    {
      say: 'The T-s curve, Figure 5.3: starting torque at s equals 1, maximum at s m, stable region from s m to zero.',
      voice: 'द टी एस कर्भ, फिगर फाइभ पोइन्ट थ्री — स्टार्टिङ टर्क एट एस इक्वल्स वान, म्याक्सिमम एट एस एम, स्टेबल रिजन फ्रम एस एम टु जिरो।',
      lines: [['step', <>T<sub>st</sub>, T<sub>max</sub> at s<sub>m</sub>, stable low-slip region</>]],
    },
    {
      say: 'The ratio of starting to maximum torque is 2 s m over 1 plus s m square; with R 2 equal to X 2, starting torque is maximum.',
      voice: 'द रेसियो अफ स्टार्टिङ टु म्याक्सिमम टर्क इज टु एस एम ओभर वान प्लस एस एम स्क्वायर, विद आर टु इक्वल टु एक्स टु, स्टार्टिङ टर्क इज म्याक्सिमम।',
      lines: [['eq', tex(String.raw`\begin{aligned} \dfrac{T_{st}}{T_{max}} &= \dfrac{2s_m}{1 + s_m^2} \\ R_2 = X_2:\ T_{st} &= T_{max} \end{aligned}`)]],
    },
  ],
});

export const torqueAnswer53 = answer('Model answer: torque equation, T-s curve and maximum torque', {
  draw: tsFigure,
  viewBox: '0 0 360 232',
  papers: ['2074 Bhadra', '2071 Magh', '2070 Magh', '2070 Bhadra'],
  q: 'Derive the relationship for torque developed by a 3-phase induction motor. Draw a typical torque-slip characteristic and deduce the condition for maximum torque.',
  read: {
    say: 'IOE ma char choti: derive the relationship for torque developed by a 3-phase induction motor. Draw a typical torque-slip characteristic and deduce the condition for maximum torque.',
    voice: 'आई ओ ईमा चार चोटि — डिराइभ द रिलेसनसिप फर टर्क डेभलप्ड बाइ अ थ्री फेज इन्डक्सन मोटर। ड्र अ टिपिकल टर्क स्लिप क्यारेक्टरिस्टिक एन्ड डिड्युस द कन्डिसन फर म्याक्सिमम टर्क।',
  },
  points: [
    {
      node: <><H>Torque equation</H>Let E<sub>2</sub>, R<sub>2</sub>, X<sub>2</sub> per phase at standstill, slip s.<K>{String.raw`\begin{aligned} T &\propto \Phi\,I_2\cos\varphi_2, \quad E_2 \propto \Phi \\ I_2 &= \dfrac{sE_2}{\sqrt{R_2^2+(sX_2)^2}}, \quad \cos\varphi_2 = \dfrac{R_2}{\sqrt{R_2^2+(sX_2)^2}} \end{aligned}`}</K></>,
      say: 'Let E 2, R 2, X 2 be per phase at standstill. T is proportional to phi I 2 cos phi 2; E 2 is proportional to phi; I 2 and cos phi 2 come from the rotor circuit.',
      voice: 'लेट ई टु, आर टु, एक्स टु बी पर फेज एट स्ट्यान्डस्टिल। टी इज प्रपोर्सनल टु फाइ आई टु कस फाइ टु, ई टु इज प्रपोर्सनल टु फाइ, आई टु एन्ड कस फाइ टु कम फ्रम द रोटर सर्किट।',
    },
    {
      node: <><K>{String.raw`\boxed{T = \dfrac{k\,sE_2^2R_2}{R_2^2 + (sX_2)^2}}, \quad k = \dfrac{3}{2\pi n_s}`}</K></>,
      say: 'Hence T equals k s E 2 square R 2 over R 2 square plus s X 2 square, with k equal to 3 over 2 pi n s.',
      voice: 'हेन्स टी इक्वल्स के एस ई टु स्क्वायर आर टु ओभर आर टु स्क्वायर प्लस एस एक्स टु स्क्वायर, विद के इक्वल टु थ्री ओभर टु पाइ एन एस।',
    },
    {
      page: true,
      node: <><H>Torque-slip characteristic (Fig. 5.3)</H><Pts items={[<>Low slip (s X<sub>2</sub> ≪ R<sub>2</sub>): T ∝ s, a straight line, stable operating region</>, <>High slip (s X<sub>2</sub> ≫ R<sub>2</sub>): T ∝ 1/s, a rectangular hyperbola, unstable</>, <>T<sub>st</sub> at s = 1; T<sub>max</sub> at s<sub>m</sub></>]} /></>,
      say: 'T-s curve: at low slip T is proportional to s, stable; at high slip T is proportional to 1 over s, unstable. Starting torque at s equals 1, maximum at s m.',
      voice: 'टी एस कर्भ — एट लो स्लिप टी इज प्रपोर्सनल टु एस, स्टेबल, एट हाई स्लिप टी इज प्रपोर्सनल टु वान ओभर एस, अनस्टेबल। स्टार्टिङ टर्क एट एस इक्वल्स वान, म्याक्सिमम एट एस एम।',
    },
    {
      page: true,
      node: <><H>Condition for maximum torque</H><K>{String.raw`\begin{aligned} \dfrac{d}{ds}\Big(\dfrac{R_2^2}{s} + sX_2^2\Big) &= 0 \\ -\dfrac{R_2^2}{s^2} + X_2^2 &= 0 \\ \therefore\ s_m &= \dfrac{R_2}{X_2} \end{aligned}`}</K></>,
      say: 'For maximum torque, R 2 square over s plus s X 2 square must be minimum. Its derivative is zero, giving s m equals R 2 over X 2.',
      voice: 'फर म्याक्सिमम टर्क, आर टु स्क्वायर ओभर एस प्लस एस एक्स टु स्क्वायर मस्ट बी मिनिमम। इट्स डेरिभेटिभ इज जिरो, गिभिङ एस एम इक्वल्स आर टु ओभर एक्स टु।',
    },
    {
      node: <><K>{String.raw`\boxed{T_{max} = \dfrac{kE_2^2}{2X_2}}`}</K>Maximum torque occurs when R<sub>2</sub> = s X<sub>2</sub>; its value is independent of R<sub>2</sub>.</>,
      say: 'Therefore T max equals k E 2 square over 2 X 2: maximum torque occurs when R 2 equals s X 2, and its value is independent of R 2.',
      voice: 'देयरफोर टी म्याक्स इक्वल्स के ई टु स्क्वायर ओभर टु एक्स टु — म्याक्सिमम टर्क अकर्स ह्वेन आर टु इक्वल्स एस एक्स टु, एन्ड इट्स भ्यालु इज इन्डिपेन्डेन्ट अफ आर टु।',
      ask: {
        q: 'Maximum torque ko condition k ho?',
        voice: 'म्याक्सिमम टर्कको कन्डिसन के हो?',
        options: ['R2 = sX2', 'R2 = 0', 's = 1'],
        answer: 0,
        why: 'dT/ds = 0 dida R2 = sX2.',
      },
    },
  ],
});

export const tmaxSolve53 = solve({
  title: 'IOE 2072 Ashwin: maximum torque and its speed',
  paper: '2072 Ashwin',
  paperVoice: 'दुई हजार बहत्तर असोज',
  question: 'A 4-pole, 50 Hz, 3 phase induction motor develops a starting torque of 50 N-m. The rotor winding has an impedance of (0.8 + j2) Ω per phase at stand still. At what speed the motor will develop maximum torque and calculate magnitude of the maximum torque.',
  read: '4 pole, 50 hertz, starting torque 50 newton meter. Rotor impedance 0.8 plus j 2 ohm. Maximum torque kun speed ma, ra kati?',
  readVoice: 'फोर पोल, फिफ्टी हर्ट्ज, स्टार्टिङ टर्क फिफ्टी न्युटन मिटर। रोटर इम्पिडेन्स जिरो पोइन्ट एट प्लस जे टु ओम। म्याक्सिमम टर्क कुन स्पिडमा, र कति?',
  given: [
    { node: <>P = 4, f = 50 Hz, T<sub>st</sub> = 50 N·m</>, say: 'P 4, f 50, T st 50', voice: 'पी फोर, एफ फिफ्टी, टी एस टी फिफ्टी' },
    { node: <>R<sub>2</sub> = 0.8 Ω, X<sub>2</sub> = 2 Ω (standstill)</>, say: 'R2 0.8, X2 2 ohm', voice: 'आर टु जिरो पोइन्ट एट, एक्स टु टु ओम' },
  ],
  find: { node: <>N at T<sub>max</sub>, and T<sub>max</sub></>, say: 'Nikalnu parne: speed ra T max.', voice: 'निकाल्नु पर्ने — स्पिड र टी म्याक्स।' },
  idea: { node: <><K>{String.raw`s_m = R_2/X_2`}</K>, <K>{String.raw`\dfrac{T_{st}}{T_{max}} = \dfrac{2s_m}{1+s_m^2}`}</K></>, say: 'Method: s m equals R 2 over X 2, ani T st over T max ko ratio.', voice: 'मेथड — एस एम इक्वल्स आर टु ओभर एक्स टु, अनि टी एस टी ओभर टी म्याक्सको रेसियो।' },
  steps: [
    {
      node: <K>{String.raw`\begin{aligned} s_m &= \dfrac{0.8}{2} \\ &= 0.4 \\ N_s &= \dfrac{120\times50}{4} \\ &= 1500\ \text{rpm} \end{aligned}`}</K>,
      say: 's m equals 0.4; N s equals 1500 rpm.',
      voice: 'एस एम इक्वल्स जिरो पोइन्ट फोर, एन एस इक्वल्स पन्ध्र सय आर पी एम।',
    },
    {
      node: <K>{String.raw`\begin{aligned} N &= N_s(1 - s_m) \\ &= 1500\times0.6 \\ &= 900\ \text{rpm} \end{aligned}`}</K>,
      say: 'N equals 1500 into 0.6, 900 rpm.',
      voice: 'एन इक्वल्स पन्ध्र सय इन्टु जिरो पोइन्ट सिक्स, नौ सय आर पी एम।',
      ask: {
        q: 'sm = 0.4 bhaye maximum torque ko speed Ns ko kati?',
        voice: 'एस एम जिरो पोइन्ट फोर भए म्याक्सिमम टर्कको स्पिड एन एसको कति?',
        options: ['60 %', '40 %', '100 %'],
        answer: 0,
        why: 'N = Ns(1 − 0.4) = 0.6 Ns.',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} \dfrac{T_{st}}{T_{max}} &= \dfrac{2\times0.4}{1 + 0.4^2} \\ &= 0.6897 \\ T_{max} &= \dfrac{50}{0.6897} \end{aligned}`}</K>,
      say: 'Ratio 0.8 over 1.16, 0.6897. T max equals 50 over 0.6897.',
      voice: 'रेसियो जिरो पोइन्ट एट ओभर वान पोइन्ट वान सिक्स, जिरो पोइन्ट सिक्स एट नाइन सेभेन। टी म्याक्स इक्वल्स फिफ्टी ओभर जिरो पोइन्ट सिक्स एट नाइन सेभेन।',
    },
  ],
  answer: { node: <K>{String.raw`\boxed{N = 900\ \text{rpm}, \quad T_{max} = 72.5\ \text{N}\cdot\text{m}}`}</K>, say: 'Answer: 900 rpm ma, T max 72.5 newton meter.', voice: 'आन्सर — नौ सय आर पी एममा, टी म्याक्स बहत्तर दशमलव पाँच न्युटन मिटर।' },
  trap: { node: <>Trap: use the ratio formula; k and E<sub>2</sub> are not given and are not needed.</>, say: 'Trap: k ra E 2 chaindaina, ratio le nai hal huncha.', voice: 'ट्र्याप — के र ई टु चाहिँदैन, रेसियोले नै हल हुन्छ।' },
});

/* ── 5.4 Induction generator, power stages ──────────────────────────── */
export const basics54 = duo('5.4 · Basic understanding: what if the motor is driven faster than synchronous speed?', {
  three: inductionTour([
    { shot: 'supply', show: FED, field: 1, rmf: 0.7, spin: 0.65, flow: 0.7, focus: ['supply', 'winding'], labels: [['power bhitra', 'supply']] },
    { shot: 'inside', heat: { stator: 0.4, winding: 0.5 }, focus: ['stator', 'winding'], labels: [['stator ma taato', 'winding']] },
    { heat: { stator: 0.4, winding: 0.5 }, focus: ['rotorCore'], labels: [['air gap pari', 'rotorCore']] },
    { heat: { stator: 0.4, winding: 0.5, cage: 0.4 }, focus: ['cage'], labels: [['rotor ma taato', 'cage']] },
    { shot: 'side', heat: {}, focus: ['shaft'], labels: [['baki: shaft ma', 'shaft']] },
    { shot: 'back', show: [...FED, 'engine'], spin: 0.8, spinMs: 2500, focus: ['engine', 'shaft'], labels: [['engine le chito', 'engine']] },
    { shot: 'whole', show: [...IM, 'engine', 'capacitor'], spin: 0.8, flow: 0, focus: ['capacitor'], labels: [['capacitor', 'capacitor']] },
    { show: [...FED, 'engine'], spin: 0.8, flow: 0.8, focus: null, labels: [['power farkyo', 'supply']] },
  ]),
  tutor: [
    {
      say: 'Supply ko power stator ma pasch, ra motor ghumcha.',
      voice: 'सप्लाईको पावर स्टेटरमा पस्छ, र मोटर घुम्छ।',
      lines: [['h', <>5.4 · Chito ghumaye k huncha?</>], ['step', <>Supply ko power stator ma</>]],
    },
    {
      say: 'Stator ko tar ra falam ma ali power taato bhayera jaancha.',
      voice: 'स्टेटरको तार र फलाममा अलि पावर तातो भएर जान्छ।',
      lines: [['step', <>Stator ko tar + falam ma taato</>]],
    },
    {
      say: 'Baki power hawa ko gap pari rotor samma pugcha: air gap power.',
      voice: 'बाँकी पावर हावाको ग्यापपारि रोटरसम्म पुग्छ — एयर ग्याप पावर।',
      lines: [chain(<>Baki → hawa ko gap pari rotor ma</>)],
    },
    {
      say: 'Rotor ma slip jati bhag taato bancha. Slip 4 percent bhaye rotor ma pugeko ko 4 percent taato.',
      voice: 'रोटरमा स्लिप जति भाग तातो बन्छ। स्लिप चार प्रतिशत भए रोटरमा पुगेकोको चार प्रतिशत तातो।',
      lines: [['step', <>Rotor ma slip jati bhag taato</>]],
      ask: {
        q: 'Slip 5 % bhaye rotor ma pugeko power ko kati bhag rotor ko tar ma taato?',
        voice: 'स्लिप पाँच प्रतिशत भए रोटरमा पुगेको पावरको कति भाग रोटरको तारमा तातो?',
        options: ['5 %', '95 %', '50 %'],
        answer: 0,
        why: 'Rotor copper loss = s × air-gap power.',
      },
    },
    {
      say: 'Baki sabai ghumai ma; ghasai ghatayera shaft bata kaam.',
      voice: 'बाँकी सबै घुमाइमा, घसाइ घटाएर सफ्टबाट काम।',
      lines: [chain(<>Baki → ghumai → shaft ko kaam</>)],
    },
    {
      say: 'Aba engine le rotor lai magnet bhanda chito ghumaucha. Slip ulto bhayo, ra power ulto bagcha: supply tira!',
      voice: 'अब इन्जिनले रोटरलाई म्याग्नेटभन्दा छिटो घुमाउँछ। स्लिप उल्टो भयो, र पावर उल्टो बग्छ — सप्लाईतिर!',
      lines: [chain(<>Magnet bhanda chito → power ulto: generator</>)],
    },
    {
      say: 'Tara magnet banauna current chahincha. Grid nabhaye capacitor le tyo current dincha, ra voltage build up huncha.',
      voice: 'तर म्याग्नेट बनाउन करेन्ट चाहिन्छ। ग्रिड नभए क्यापासिटरले त्यो करेन्ट दिन्छ, र भोल्टेज बिल्ड अप हुन्छ।',
      lines: [['step', <>Grid nabhaye capacitor le magnet ko current</>]],
    },
    {
      say: 'Saransha: power stator, gap, rotor hudai shaft ma; magnet bhanda chito ghumaye ulto bagcha. Hawa-chakki ma yahi generator.',
      voice: 'सारांश — पावर स्टेटर, ग्याप, रोटर हुँदै सफ्टमा, म्याग्नेटभन्दा छिटो घुमाए उल्टो बग्छ। हावा चक्कीमा यही जेनेरेटर।',
      lines: [['idea', <>Stator → gap → rotor → shaft · chito ghumaye → generator (wind turbine)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Electrical input stator ma diincha.',
      voice: 'इलेक्ट्रिकल इनपुट स्टेटरमा दिइन्छ।',
      lines: [['h', <>5.4 · Power flow and generator action</>], ['step', <>Electrical input to the stator</>]],
    },
    {
      say: 'Stator copper ra iron losses pahila ghatchan.',
      voice: 'स्टेटर कपर र आइरन लसेस पहिला घट्छन्।',
      lines: [['step', <>Stator copper and iron losses</>]],
    },
    {
      say: 'Baki power air gap pari rotor ma transfer huncha: rotor input.',
      voice: 'बाँकी पावर एयर ग्यापपारि रोटरमा ट्रान्सफर हुन्छ — रोटर इनपुट।',
      lines: [part(<>Air-gap power</>, <>rotor input</>)],
    },
    {
      say: 'Rotor copper loss rotor input ko slip guna huncha.',
      voice: 'रोटर कपर लस रोटर इनपुटको स्लिप गुना हुन्छ।',
      lines: [chain(<>Rotor copper loss: slip times rotor input</>)],
      ask: {
        q: 'Rotor input ko kati bhag gross mechanical power ma badlincha?',
        voice: 'रोटर इनपुटको कति भाग ग्रस मेकानिकल पावरमा बदलिन्छ?',
        options: ['(1 − s)', 's', '1/s'],
        answer: 0,
        why: 'P2 : Pcu2 : Pm = 1 : s : (1 − s).',
      },
    },
    {
      say: 'Baki gross mechanical power bata friction ra windage ghataye shaft output.',
      voice: 'बाँकी ग्रस मेकानिकल पावरबाट फ्रिक्सन र विन्डेज घटाए सफ्ट आउटपुट।',
      lines: [['step', <>Gross mechanical power less friction: shaft output</>]],
    },
    {
      say: 'Prime mover le rotor lai synchronous speed bhanda badhi ghumaye slip negative huncha ra machine generator banchha.',
      voice: 'प्राइम मुभरले रोटरलाई सिन्क्रोनस स्पिडभन्दा बढी घुमाए स्लिप नेगेटिभ हुन्छ, र मेसिन जेनेरेटर बन्छ।',
      lines: [chain(<>Above synchronous speed: negative slip → generator</>)],
    },
    {
      say: 'Magnetising reactive power grid wa capacitor bank le dinu parcha; isolated generator ma capacitor le voltage build up garcha.',
      voice: 'म्याग्नेटाइजिङ रियाक्टिभ पावर ग्रिड वा क्यापासिटर बैंकले दिनु पर्छ, आइसोलेटेड जेनेरेटरमा क्यापासिटरले भोल्टेज बिल्ड अप गर्छ।',
      lines: [['step', <>Reactive power from the grid or a capacitor bank</>]],
    },
    {
      say: 'Saransha: power stages ko ratio 1, s ra 1 minus s; negative slip ma induction generator.',
      voice: 'सारांश — पावर स्टेजेजको रेसियो वान, एस, र वान माइनस एस, नेगेटिभ स्लिपमा इन्डक्सन जेनेरेटर।',
      lines: [['idea', <>Power stages 1 : s : (1 − s) · negative slip → induction generator</>]],
    },
  ],
});

export const stages54 = duo('Derivation: power stages, P2 : Pcu2 : Pm = 1 : s : (1 − s)', {
  draw: stagesFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Figure 5.4: stator input bata stator copper ra iron loss ghataye air-gap power P 2.',
      voice: 'फिगर फाइभ पोइन्ट फोर — स्टेटर इनपुटबाट स्टेटर कपर र आइरन लस घटाए एयर ग्याप पावर पी टु।',
      lines: [['h', <>Power stages</>], ['step', <>Stator input − stator losses = air-gap power P<sub>2</sub></>]],
    },
    {
      say: 'P 2 equals T times omega s, synchronous speed ma. Gross mechanical power P m equals T omega, rotor speed ma.',
      voice: 'पी टु इक्वल्स टी टाइम्स ओमेगा एस, सिन्क्रोनस स्पिडमा। ग्रस मेकानिकल पावर पी एम इक्वल्स टी ओमेगा, रोटर स्पिडमा।',
      lines: [['eq', tex(String.raw`P_2 = T\omega_s, \quad P_m = T\omega = T\omega_s(1 - s)`)]],
    },
    {
      say: 'Farak nai rotor copper loss: P cu 2 equals P 2 minus P m equals s P 2.',
      voice: 'फरक नै रोटर कपर लस — पी सी यु टु इक्वल्स पी टु माइनस पी एम इक्वल्स एस पी टु।',
      lines: [['eq', tex(String.raw`\begin{aligned} P_{cu2} &= P_2 - P_m \\ &= \boxed{s\,P_2} \end{aligned}`)]],
      ask: {
        q: 'Rotor copper loss 2 kW ra slip 0.04 bhaye air-gap power kati?',
        voice: 'रोटर कपर लस टु किलोवाट र स्लिप जिरो पोइन्ट जिरो फोर भए एयर ग्याप पावर कति?',
        options: ['50 kW', '48 kW', '0.08 kW'],
        answer: 0,
        why: 'P2 = Pcu2/s = 2/0.04 = 50 kW.',
      },
    },
    {
      say: 'Tesaile P 2 is to P cu 2 is to P m equals 1 is to s is to 1 minus s.',
      voice: 'त्यसैले पी टु इज टु पी सी यु टु इज टु पी एम इक्वल्स वान इज टु एस इज टु वान माइनस एस।',
      lines: [['eq', tex(String.raw`\boxed{P_2 : P_{cu2} : P_m = 1 : s : (1 - s)}`)]],
    },
    {
      say: 'Shaft output equals P m minus friction ra windage. Efficiency equals output over stator input.',
      voice: 'सफ्ट आउटपुट इक्वल्स पी एम माइनस फ्रिक्सन र विन्डेज। इफिसियन्सी इक्वल्स आउटपुट ओभर स्टेटर इनपुट।',
      lines: [['idea', <>Output = P<sub>m</sub> − friction &amp; windage; η = output / stator input; rotor efficiency ≈ 1 − s</>]],
    },
  ],
  lecturer: [
    {
      say: 'From the stator input, the stator copper and iron losses leave the air-gap power P 2, Figure 5.4.',
      voice: 'फ्रम द स्टेटर इनपुट, द स्टेटर कपर एन्ड आइरन लसेस लिभ द एयर ग्याप पावर पी टु, फिगर फाइभ पोइन्ट फोर।',
      lines: [['h', <>Power stages of an induction motor</>], ['step', <>Stator input − stator losses = P<sub>2</sub></>]],
    },
    {
      say: 'P 2 equals T omega s, and the gross mechanical power is T omega, that is T omega s into 1 minus s.',
      voice: 'पी टु इक्वल्स टी ओमेगा एस, एन्ड द ग्रस मेकानिकल पावर इज टी ओमेगा, दयाट इज टी ओमेगा एस इन्टु वान माइनस एस।',
      lines: [['eq', tex(String.raw`P_2 = T\omega_s, \quad P_m = T\omega = T\omega_s(1 - s)`)]],
    },
    {
      say: 'The difference is the rotor copper loss, s P 2.',
      voice: 'द डिफरेन्स इज द रोटर कपर लस, एस पी टु।',
      lines: [['eq', tex(String.raw`\begin{aligned} P_{cu2} &= P_2 - P_m \\ &= \boxed{s\,P_2} \end{aligned}`)]],
      ask: {
        q: 'Rotor copper loss lai kun rup ma lekhna sakincha?',
        voice: 'रोटर कपर लसलाई कुन रूपमा लेख्न सकिन्छ?',
        options: ['s × P2', '(1 − s) × P2', 'P2 / s'],
        answer: 0,
        why: 'Pcu2 = P2 − Pm = sP2.',
      },
    },
    {
      say: 'Hence the power stages are in the ratio 1 to s to 1 minus s.',
      voice: 'हेन्स द पावर स्टेजेज आर इन द रेसियो वान टु एस टु वान माइनस एस।',
      lines: [['eq', tex(String.raw`\boxed{P_2 : P_{cu2} : P_m = 1 : s : (1 - s)}`)]],
    },
    {
      say: 'Shaft output equals P m less friction and windage; efficiency is output over stator input.',
      voice: 'सफ्ट आउटपुट इक्वल्स पी एम लेस फ्रिक्सन एन्ड विन्डेज, इफिसियन्सी इज आउटपुट ओभर स्टेटर इनपुट।',
      lines: [['step', <>Output = P<sub>m</sub> − friction; η = output / input</>]],
    },
  ],
});

export const gen54 = duo('Induction generator and voltage build-up', {
  draw: tsFigure,
  viewBox: '0 0 360 232',
  tutor: [
    {
      say: 'Prime mover le rotor lai N s bhanda chito ghumaye N greater than N s, ra slip negative.',
      voice: 'प्राइम मुभरले रोटरलाई एन एसभन्दा छिटो घुमाए एन ग्रेटर दयान एन एस, र स्लिप नेगेटिभ।',
      lines: [['h', <>Induction generator</>], ['eq', tex(String.raw`N > N_s \;\Rightarrow\; s = \dfrac{N_s - N}{N_s} < 0`)]],
    },
    {
      say: 'Negative slip ma rotor EMF ra current ulto; torque ulto, ra power stator bata grid tira bagcha.',
      voice: 'नेगेटिभ स्लिपमा रोटर ई एम एफ र करेन्ट उल्टो, टर्क उल्टो, र पावर स्टेटरबाट ग्रिडतिर बग्छ।',
      lines: [['step', <>s &lt; 0: torque reverses (T-s curve extends below zero) → power fed to the supply</>]],
      ask: {
        q: 'Induction machine generator kahile banchha?',
        voice: 'इन्डक्सन मेसिन जेनेरेटर कहिले बन्छ?',
        options: ['N > Ns (negative slip)', 'N < Ns', 'N = 0'],
        answer: 0,
        why: 'Rotor field bhanda aghi: power ulto bagcha.',
      },
    },
    {
      say: 'Yasko afnai field hudaina: magnetising reactive power grid bata linchha, ra grid ko frequency ma chalcha.',
      voice: 'यसको आफ्नै फिल्ड हुँदैन — म्याग्नेटाइजिङ रियाक्टिभ पावर ग्रिडबाट लिन्छ, र ग्रिडको फ्रिक्वेन्सीमा चल्छ।',
      lines: [['step', <>Grid-connected: takes magnetising VAr from the grid; frequency fixed by the grid</>]],
    },
    {
      say: 'Isolated ma capacitor bank jodne. Residual flux le sano voltage, capacitor current le flux badhaucha: self-excited build-up.',
      voice: 'आइसोलेटेडमा क्यापासिटर बैंक जोड्ने। रेसिड्युअल फ्लक्सले सानो भोल्टेज, क्यापासिटर करेन्टले फ्लक्स बढाउँछ — सेल्फ एक्साइटेड बिल्ड अप।',
      lines: [['step', <>Isolated: capacitor bank + residual flux → self-excited build-up (like a DC shunt generator)</>]],
    },
    {
      say: 'Capacitor ko value: no-load ma magnetising current I mu barabar capacitor current: C equals I mu over omega V.',
      voice: 'क्यापासिटरको भ्यालु — नो लोडमा म्याग्नेटाइजिङ करेन्ट आई म्यु बराबर क्यापासिटर करेन्ट — सी इक्वल्स आई म्यु ओभर ओमेगा भी।',
      lines: [['eq', tex(String.raw`\begin{aligned} I_C &= \omega C V \\ &= I_\mu \\ \therefore\ C &= \boxed{\dfrac{I_\mu}{2\pi f V}}\ \text{per phase} \end{aligned}`)]],
    },
  ],
  lecturer: [
    {
      say: 'If the rotor is driven above synchronous speed, the slip becomes negative.',
      voice: 'इफ द रोटर इज ड्रिभन एबभ सिन्क्रोनस स्पिड, द स्लिप बिकम्स नेगेटिभ।',
      lines: [['h', <>Induction generator</>], ['eq', tex(String.raw`N > N_s \;\Rightarrow\; s = \dfrac{N_s - N}{N_s} < 0`)]],
    },
    {
      say: 'The rotor current I 2 and torque reverse, and power flows from the shaft to the supply.',
      voice: 'द रोटर करेन्ट आई टु एन्ड टर्क रिभर्स, एन्ड पावर फ्लोज फ्रम द सफ्ट टु द सप्लाई।',
      lines: [['step', <>Negative slip: generating region of the T-s curve</>]],
      ask: {
        q: 'Induction generator lai reactive power kaha bata chahincha?',
        voice: 'इन्डक्सन जेनेरेटरलाई रियाक्टिभ पावर कहाँबाट चाहिन्छ?',
        options: ['Grid wa capacitor bank', 'Rotor aafai', 'Prime mover'],
        answer: 0,
        why: 'Yasko DC excitation hudaina.',
      },
    },
    {
      say: 'Conditions: speed above synchronous, and a source of magnetising reactive power.',
      voice: 'कन्डिसन्स — स्पिड एबभ सिन्क्रोनस, एन्ड अ सोर्स अफ म्याग्नेटाइजिङ रियाक्टिभ पावर।',
      lines: [['step', <>Conditions: N &gt; N<sub>s</sub>; magnetising VAr supplied externally</>]],
    },
    {
      say: 'In isolated operation, a capacitor bank with residual flux allows the voltage to build up.',
      voice: 'इन आइसोलेटेड अपरेसन, अ क्यापासिटर बैंक विद रेसिड्युअल फ्लक्स अलाउज द भोल्टेज टु बिल्ड अप।',
      lines: [['step', <>Isolated: capacitor self-excitation from residual flux</>]],
    },
    {
      say: 'The capacitance per phase equals the magnetising current I mu over omega V.',
      voice: 'द क्यापासिटेन्स पर फेज इक्वल्स द म्याग्नेटाइजिङ करेन्ट आई म्यु ओभर ओमेगा भी।',
      lines: [['eq', tex(String.raw`\begin{aligned} I_C &= \omega C V \\ &= I_\mu \\ \therefore\ C &= \boxed{\dfrac{I_\mu}{2\pi f V}}\ \text{per phase} \end{aligned}`)]],
    },
  ],
});

export const genAnswer54 = answer('Model answer: induction generator and excitation capacitor', {
  draw: tsFigure,
  viewBox: '0 0 360 232',
  papers: ['2073 Bhadra', '2079 Jestha', '2071 (Old Back)'],
  q: 'Explain how an induction motor can be used as induction generator. Explain the procedure to determine the value of excitation capacitor required for voltage build up in the generator.',
  read: {
    say: 'IOE 2073 Bhadra: explain how an induction motor can be used as an induction generator. Explain the procedure to determine the value of excitation capacitor required for voltage build-up.',
    voice: 'आई ओ ई दुई हजार त्रिहत्तर भदौ — एक्सप्लेन हाउ एन इन्डक्सन मोटर क्यान बी युज्ड एज एन इन्डक्सन जेनेरेटर। एक्सप्लेन द प्रोसिजर टु डिटर्मिन द भ्यालु अफ एक्साइटेसन क्यापासिटर रिक्वायर्ड फर भोल्टेज बिल्ड अप।',
  },
  points: [
    {
      node: <><H>Induction generator</H><Pts items={[<>Drive the rotor by a prime mover above N<sub>s</sub>: <K>{String.raw`s = (N_s - N)/N_s < 0`}</K></>, <>Rotor EMF, current and torque reverse; mechanical input is converted to electrical output fed to the supply</>]} /></>,
      say: 'Drive the rotor above synchronous speed so that slip is negative. Rotor EMF, current and torque reverse, and mechanical input becomes electrical output.',
      voice: 'ड्राइभ द रोटर एबभ सिन्क्रोनस स्पिड सो दयाट स्लिप इज नेगेटिभ। रोटर ई एम एफ, करेन्ट, एन्ड टर्क रिभर्स, एन्ड मेकानिकल इनपुट बिकम्स इलेक्ट्रिकल आउटपुट।',
    },
    {
      node: <><Pts items={[<>Conditions: N &gt; N<sub>s</sub> and an external source of magnetising (reactive) power</>, <>On the grid: frequency and voltage set by the grid; used in wind and mini-hydro plants</>]} /></>,
      say: 'Conditions: speed above synchronous and an external magnetising source. On the grid, frequency and voltage are set by the grid; used in wind and mini-hydro.',
      voice: 'कन्डिसन्स — स्पिड एबभ सिन्क्रोनस एन्ड एन एक्सटर्नल म्याग्नेटाइजिङ सोर्स। अन द ग्रिड, फ्रिक्वेन्सी एन्ड भोल्टेज आर सेट बाइ द ग्रिड, युज्ड इन विन्ड एन्ड मिनी हाइड्रो।',
    },
    {
      page: true,
      node: <><H>Voltage build-up (isolated)</H><Pts items={[<>A capacitor bank across the stator; residual flux induces a small voltage</>, <>It drives a leading capacitor current that magnetises the machine, raising the voltage cumulatively</>, <>It settles where the magnetising curve meets the capacitor line V = I<sub>C</sub>/(ωC)</>]} /></>,
      say: 'Isolated: a capacitor bank is connected. Residual flux gives a small voltage, which drives a capacitor current that magnetises the machine. The voltage rises until the magnetising curve meets the capacitor line.',
      voice: 'आइसोलेटेड — अ क्यापासिटर बैंक इज कनेक्टेड। रेसिड्युअल फ्लक्स गिभ्स अ स्मल भोल्टेज, ह्विच ड्राइभ्स अ क्यापासिटर करेन्ट दयाट म्याग्नेटाइजेज द मेसिन। द भोल्टेज राइजेज अन्टिल द म्याग्नेटाइजिङ कर्भ मिट्स द क्यापासिटर लाइन।',
    },
    {
      node: <><H>Value of capacitor</H><Pts items={[<>Run the machine as a motor on no load at rated V, f; measure the no-load current (≈ I<sub>μ</sub>)</>]} /><K>{String.raw`\begin{aligned} \omega C V &= I_\mu \\ \therefore\ C &= \boxed{\dfrac{I_\mu}{2\pi f V}} \end{aligned}`}</K>per phase (rated V across each capacitor).</>,
      say: 'Procedure: run as a motor on no load at rated voltage and frequency, and measure the no-load current I 0, nearly I mu. Then omega C V equals I mu, so C equals I mu over 2 pi f V per phase.',
      voice: 'प्रोसिजर — रन एज अ मोटर अन नो लोड एट रेटेड भोल्टेज एन्ड फ्रिक्वेन्सी, एन्ड मेजर द नो लोड करेन्ट आई जिरो, नियर्ली आई म्यु। देन ओमेगा सी भी इक्वल्स आई म्यु, सो सी इक्वल्स आई म्यु ओभर टु पाइ एफ भी पर फेज।',
      ask: {
        q: 'Capacitor kam bhaye isolated induction generator ma k huncha?',
        voice: 'क्यापासिटर कम भए आइसोलेटेड इन्डक्सन जेनेरेटरमा के हुन्छ?',
        options: ['Voltage build up hudaina', 'Voltage dherai badhcha', 'Frequency dobar'],
        answer: 0,
        why: 'Capacitor line magnetising curve lai kaatdaina.',
      },
    },
  ],
});

export const stagesSolve54 = solve({
  title: 'IOE 2078 Poush: slip and efficiency from the power stages',
  paper: '2078 Poush',
  paperVoice: 'दुई हजार अठहत्तर पुस',
  question: 'The power input to a 500 V, 50 Hz, 6-pole, 3-phase induction motor running at 975 rpm is 40 kW. The stator losses are 1 kW and friction loss is 2 kW. Calculate: (a) slip (b) Rotor copper loss (c) output hp (d) efficiency.',
  read: '500 volt, 50 hertz, 6 pole, 975 rpm, input 40 kilowatt. Stator loss 1 kilowatt, friction 2 kilowatt. Slip, rotor copper loss, output hp, efficiency.',
  readVoice: 'पाँच सय भोल्ट, फिफ्टी हर्ट्ज, सिक्स पोल, नौ सय पचहत्तर आर पी एम, इनपुट चालीस किलोवाट। स्टेटर लस एक किलोवाट, फ्रिक्सन दुई किलोवाट। स्लिप, रोटर कपर लस, आउटपुट एच पी, इफिसियन्सी।',
  given: [
    { node: <>f = 50 Hz, P = 6, N = 975 rpm, input = 40 kW</>, say: 'f 50, P 6, N 975, input 40 kW', voice: 'एफ फिफ्टी, पी सिक्स, एन नौ सय पचहत्तर, इनपुट चालीस किलोवाट' },
    { node: <>Stator losses 1 kW, friction 2 kW</>, say: 'Stator loss 1, friction 2 kW', voice: 'स्टेटर लस एक, फ्रिक्सन दुई किलोवाट' },
  ],
  find: { node: <>s, P<sub>cu2</sub>, output (hp), η</>, say: 'Nikalnu parne: slip, rotor copper loss, hp, efficiency.', voice: 'निकाल्नु पर्ने — स्लिप, रोटर कपर लस, एच पी, इफिसियन्सी।' },
  idea: { node: <>P<sub>2</sub> = input − stator losses; P<sub>cu2</sub> = sP<sub>2</sub>; output = P<sub>m</sub> − friction</>, say: 'Method: P 2, ani s P 2, ani P m minus friction.', voice: 'मेथड — पी टु, अनि एस पी टु, अनि पी एम माइनस फ्रिक्सन।' },
  steps: [
    {
      node: <K>{String.raw`\begin{aligned} N_s &= \dfrac{120\times50}{6} \\ &= 1000\ \text{rpm} \\ s &= \dfrac{1000 - 975}{1000} \\ &= 0.025 \end{aligned}`}</K>,
      say: 'N s 1000 rpm; slip 25 over 1000, 0.025.',
      voice: 'एन एस एक हजार आर पी एम, स्लिप पच्चीस ओभर एक हजार, जिरो पोइन्ट जिरो टु फाइभ।',
    },
    {
      node: <K>{String.raw`\begin{aligned} P_2 &= 40 - 1 \\ &= 39\ \text{kW} \\ P_{cu2} &= sP_2 \\ &= 0.025\times39 \\ &= 0.975\ \text{kW} \end{aligned}`}</K>,
      say: 'P 2 equals 39 kilowatt; rotor copper loss 0.975 kilowatt.',
      voice: 'पी टु इक्वल्स उनन्चालीस किलोवाट, रोटर कपर लस जिरो पोइन्ट नाइन सेभेन फाइभ किलोवाट।',
      ask: {
        q: 'Air-gap power P2 kasari nikalne?',
        voice: 'एयर ग्याप पावर पी टु कसरी निकाल्ने?',
        options: ['Input − stator losses', 'Input − friction', 'Output + friction'],
        answer: 0,
        why: 'Stator losses pachhi baki power gap pari jaancha.',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} P_m &= 39 - 0.975 \\ &= 38.025\ \text{kW} \\ \text{Output} &= 38.025 - 2 \\ &= 36.025\ \text{kW} \end{aligned}`}</K>,
      say: 'P m equals 38.025; output equals 36.025 kilowatt.',
      voice: 'पी एम इक्वल्स अठतीस दशमलव जिरो टु फाइभ, आउटपुट इक्वल्स छत्तीस दशमलव जिरो टु फाइभ किलोवाट।',
    },
    {
      node: <K>{String.raw`\begin{aligned} \text{hp} &= \dfrac{36\,025}{746} \\ &= 48.29 \\ \eta &= \dfrac{36.025}{40} \\ &= 90.06\,\% \end{aligned}`}</K>,
      say: 'Output 36,025 over 746, 48.29 hp; efficiency 90.06 percent.',
      voice: 'आउटपुट छत्तीस हजार पच्चीस ओभर सात सय छयालीस, अठचालीस दशमलव दुई नौ एच पी, इफिसियन्सी नब्बे दशमलव जिरो छ प्रतिशत।',
    },
  ],
  answer: { node: <>s = 0.025, P<sub>cu2</sub> = 0.975 kW, output = 48.29 hp, η = 90.06 %</>, say: 'Answer: s 0.025, rotor copper 0.975 kW, 48.29 hp, efficiency 90.06 percent.', voice: 'आन्सर — एस जिरो पोइन्ट जिरो टु फाइभ, रोटर कपर जिरो पोइन्ट नाइन सेभेन फाइभ किलोवाट, अठचालीस दशमलव दुई नौ एच पी, इफिसियन्सी नब्बे दशमलव जिरो छ प्रतिशत।' },
  trap: { node: <>Trap: rotor Cu loss is s × P<sub>2</sub> (air-gap power), not s × input.</>, say: 'Trap: s times P 2, s times input hoina.', voice: 'ट्र्याप — एस टाइम्स पी टु, एस टाइम्स इनपुट होइन।' },
});

/* ── 5.1 Model answer: stator connection of a slip-ring induction motor ─ */
// 2067 Mangsir (Question Bank part 12, OCR "tlpe" = type): "Explain the effect
// of type of connection of stator winding of slip ring induction motor."
// Marks not legible. The closest real question for Constructional Details and
// Types: no other construction question exists in vault/.
// Fig. 1: 0 star stator · 1 delta stator · 2 star rotor, slip rings, rheostat
const connFigure51 = (s) => {
  const star = (cx, cy) => [0, 120, 240].map((a) => {
    const r = ((a - 90) * Math.PI) / 180;
    return [cx + 34 * Math.cos(r), cy + 34 * Math.sin(r)];
  });
  const coil = (x1, y1, x2, y2) => <W d={`M${x1} ${y1} L${x2} ${y2}`} w={1.4} />;
  const S = star(80, 70);
  const D = [[260, 34], [222, 100], [298, 100]];
  const R = star(120, 182);
  return (
    <>
      <g className={s.on(0) + s.hl(0)}>
        {S.map(([x, y], k) => <g key={k}>{coil(80, 70, x, y)}<circle cx={x} cy={y} r={2.4} fill={C.chalk} /></g>)}
        <circle cx={80} cy={70} r={2} fill={C.chalk} />
        <T x={80} y={122} i size={10}>(a) Star: phase voltage VL/√3</T>
      </g>
      <g className={s.on(1) + s.hl(1)}>
        <W d={`M${D[0][0]} ${D[0][1]} L${D[1][0]} ${D[1][1]} L${D[2][0]} ${D[2][1]} Z`} w={1.4} />
        {D.map(([x, y], k) => <circle key={k} cx={x} cy={y} r={2.4} fill={C.chalk} />)}
        <T x={260} y={122} i size={10}>(b) Delta: phase voltage VL</T>
      </g>
      <g className={s.on(2) + s.hl(2)}>
        {R.map(([x, y], k) => <g key={k}>{coil(120, 182, x, y)}<W d={`M${x} ${y} H${210 + k * 16}`} w={0.9} /><circle cx={210 + k * 16} cy={y} r={3.2} fill="none" stroke={C.chalk} strokeWidth={1.1} /></g>)}
        <rect x={262} y={150} width={44} height={58} fill="none" stroke={C.chalk} strokeWidth={1.1} />
        <T x={284} y={184} size={9}>R (ext.)</T>
        <T x={180} y={236} i size={10}>(c) Rotor: star, three ends to slip rings → external R</T>
      </g>
      <Cap y={256}>Fig. 1  Stator and rotor connections</Cap>
    </>
  );
};
export const connAnswer51 = answer('Model answer: effect of the stator connection of a slip-ring induction motor', {
  draw: connFigure51,
  viewBox: '0 0 360 264',
  papers: ['2067 Mangsir'],
  marks: '',
  q: 'Explain the effect of type of connection of stator winding of slip ring induction motor.',
  read: {
    say: 'IOE 2067 Mangsir: slip ring induction motor ko stator winding ko connection ko prakar le k asar parcha, explain gara.',
    voice: 'आई ओ ई दुई हजार सतसट्ठी मंसिर — स्लिप रिङ इन्डक्सन मोटरको स्टेटर वाइन्डिङको कनेक्सनको प्रकारले के असर पर्छ, एक्सप्लेन गर।',
  },
  points: [
    {
      carry: <>(a) Star: phase voltage V<sub>L</sub>/√3</>,
      node: <><H>(a) Star-connected stator (Fig. 1a)</H><Pts items={[<>Phase voltage <K>{String.raw`V_{ph} = V_L/\sqrt{3}`}</K>, phase current = line current</>, <>Less insulation per phase; a neutral point is available</>]} /></>,
      say: 'Star connection ma phase voltage V L over root three huncha, ra phase current line current barabar. Phase ma kam voltage bhayeko le insulation kam chahincha, ra neutral point pani milcha.',
      voice: 'स्टार कनेक्सनमा फेज भोल्टेज, भी एल ओभर रुट थ्री हुन्छ, र फेज करेन्ट लाइन करेन्ट बराबर। फेजमा कम भोल्टेज भएकोले इन्सुलेसन कम चाहिन्छ, र न्युट्रल पोइन्ट पनि मिल्छ।',
    },
    {
      carry: <>(a) Delta: phase voltage V<sub>L</sub>; star-delta starting possible</>,
      node: <><H>(b) Delta-connected stator (Fig. 1b)</H><Pts items={[<>Phase voltage = V<sub>L</sub>; phase current <K>{String.raw`I_L/\sqrt{3}`}</K></>, <>More turns of thinner wire per phase; more insulation</>, <>A motor that runs in delta can be started in star (star–delta starting)</>]} /></>,
      say: 'Delta ma phase voltage pura V L huncha ra phase current I L over root three. Phase ma dherai turns ra patlo tar, insulation badhi. Delta ma chalne motor lai star ma start garna milcha: star-delta starter.',
      voice: 'डेल्टामा फेज भोल्टेज पूरा भी एल हुन्छ, र फेज करेन्ट आई एल ओभर रुट थ्री। फेजमा धेरै टर्न्स र पातलो तार, इन्सुलेसन बढी। डेल्टामा चल्ने मोटरलाई स्टारमा स्टार्ट गर्न मिल्छ — स्टार डेल्टा स्टार्टर।',
    },
    {
      page: true,
      node: <><H>(c) Effect on performance</H><Pts items={[<>For the same line voltage, the flux per pole, rotating field and torque are the same if each phase gets its rated voltage</>, <>Star–delta starting gives <K>{String.raw`\tfrac{1}{3}`}</K> of the direct-on-line starting current and torque</>, <>The rotor of a slip-ring motor is always star-connected; its three ends go to the slip rings for external starting resistance (Fig. 1)</>]} /></>,
      say: 'Asar: line voltage same bhaye ra phase le rated voltage paye flux, rotating field ra torque usai. Star-delta starting ma starting current ra torque direct online ko ek tihai. Slip ring motor ko rotor sadhai star ma jodincha, ra tin ota end slip ring hudai bahira ko resistance samma jancha.',
      voice: 'असर — लाइन भोल्टेज उही भए र फेजले रेटेड भोल्टेज पाए, फ्लक्स, रोटेटिङ फिल्ड र टर्क उस्तै। स्टार डेल्टा स्टार्टिङमा स्टार्टिङ करेन्ट र टर्क, डाइरेक्ट अनलाइनको एक तिहाइ। स्लिप रिङ मोटरको रोटर सधैं स्टारमा जोडिन्छ, र तीन ओटा एन्ड स्लिप रिङ हुँदै बाहिरको रेजिस्टेन्ससम्म जान्छ।',
      ask: {
        q: 'Star-delta starting le starting current lai direct-on-line starting ko kati gunama ghataucha?',
        voice: 'स्टार डेल्टा स्टार्टिङले स्टार्टिङ करेन्टलाई डाइरेक्ट अनलाइन स्टार्टिङको कति गुणामा घटाउँछ?',
        options: ['1/3', '1/√3', '1/2'],
        answer: 0,
        why: 'Star ma phase voltage 1/√3 huncha; line current ra torque dubai 1/3 ma jharchan.',
      },
    },
  ],
});

/* ── 5.5 Power stages: where the input power goes ───────────────────── */
export const basicsStages55 = duo('5.5 · Basic understanding: where does an induction motor’s power go?', {
  three: inductionTour([
    { shot: 'supply', show: FED, field: 1, rmf: 0.7, spin: 0.65, flow: 0.7, focus: ['supply', 'winding'], labels: [['power bhitra', 'supply']] },
    { shot: 'inside', heat: { stator: 0.4, winding: 0.5 }, focus: ['stator', 'winding'], labels: [['stator ma taato', 'winding']] },
    { heat: { stator: 0.4, winding: 0.5 }, focus: ['rotorCore'], labels: [['air gap pari', 'rotorCore']] },
    { heat: { stator: 0.4, winding: 0.5, cage: 0.4 }, focus: ['cage'], labels: [['rotor ma taato', 'cage']] },
    { shot: 'side', heat: {}, focus: ['shaft'], labels: [['baki: shaft ma', 'shaft']] },
    { shot: 'whole', spin: 0.6, focus: null },
  ]),
  tutor: [
    {
      say: 'Supply le stator ma power dincha. Yo power ek-ek chiran gari shaft samma pugcha.',
      voice: 'सप्लाईले स्टेटरमा पावर दिन्छ। यो पावर एक एक चरण गरी साफ्टसम्म पुग्छ।',
      lines: [['h', <>5.5 · Power kaha kaha jancha?</>], part(<>Input</>, <>supply bata stator ma</>)],
    },
    {
      say: 'Pahila stator ko tar ra falam ma kehi power taato bhayera harauncha.',
      voice: 'पहिला स्टेटरको तार र फलाममा केही पावर तातो भएर हराउँछ।',
      lines: [chain(<>Stator: tar ra falam ma taato</>)],
    },
    {
      say: 'Bachi rahane power hawa ko gap pari rotor samma pugcha. Yaslai air gap power bhanchan.',
      voice: 'बाँकी रहने पावर हावाको ग्याप पारी रोटरसम्म पुग्छ। यसलाई एयर ग्याप पावर भन्छन्।',
      lines: [part(<>Air gap power</>, <>gap pari rotor samma pugne power</>)],
    },
    {
      say: 'Rotor ma slip jati bhag taato huncha. Rotor jati chito, slip utti kam, ra rotor ma loss pani kam.',
      voice: 'रोटरमा स्लिप जति भाग तातो हुन्छ। रोटर जति छिटो, स्लिप उत्ति कम, र रोटरमा लस पनि कम।',
      lines: [chain(<>Slip jati bhag → rotor ma taato</>)],
      ask: {
        q: 'Induction motor ko rotor copper loss kun kura sanga badhcha?',
        voice: 'इन्डक्सन मोटरको रोटर कपर लस कुन कुरासँग बढ्छ?',
        options: ['Slip', 'Supply frequency matra', 'Stator ko resistance'],
        answer: 0,
        why: 'Rotor copper loss air gap power ko slip guna huncha.',
      },
    },
    {
      say: 'Baki power shaft ghumauna jancha, ra ghasai ra hawa ko loss pachhi bachi rahane output ho.',
      voice: 'बाँकी पावर साफ्ट घुमाउन जान्छ, र घर्षण र हावाको लसपछि बाँकी रहने आउटपुट हो।',
      lines: [chain(<>Baki → shaft ghumai → ghasai pachi output</>)],
    },
    {
      say: 'Saransh: input, stator loss, air gap power, rotor loss, ani shaft ko output.',
      voice: 'सारांश — इनपुट, स्टेटर लस, एयर ग्याप पावर, रोटर लस, अनि साफ्टको आउटपुट।',
      lines: [['idea', <>Input → stator loss → air gap power → rotor loss → output</>]],
    },
  ],
  lecturer: [
    {
      say: 'Power stages le stator input dekhi shaft output samma power ko bato dekhaucha.',
      voice: 'पावर स्टेजेसले स्टेटर इनपुटदेखि साफ्ट आउटपुटसम्म पावरको बाटो देखाउँछ।',
      lines: [['h', <>5.5 · Power stages</>], part(<>Stator input</>, <>electrical power from the supply</>)],
    },
    {
      say: 'Stator ma stator copper loss ra iron loss huncha.',
      voice: 'स्टेटरमा स्टेटर कपर लस र आइरन लस हुन्छ।',
      lines: [chain(<>Stator: copper loss + iron loss</>)],
    },
    {
      say: 'Bachi rahane power air gap power ko rupma rotor ma transfer huncha.',
      voice: 'बाँकी रहने पावर, एयर ग्याप पावरको रूपमा रोटरमा ट्रान्सफर हुन्छ।',
      lines: [part(<>Air gap power</>, <>power transferred to the rotor</>)],
    },
    {
      say: 'Rotor copper loss air gap power ko slip guna huncha.',
      voice: 'रोटर कपर लस, एयर ग्याप पावरको स्लिप गुणा हुन्छ।',
      lines: [chain(<>Rotor copper loss: slip times the air gap power</>)],
      ask: {
        q: 'Air gap power ko kati bhag rotor copper loss huncha?',
        voice: 'एयर ग्याप पावरको कति भाग रोटर कपर लस हुन्छ?',
        options: ['Slip guna', '(1 − slip) guna', 'Sadhai aadha'],
        answer: 0,
        why: 'P2 : Pcu2 : Pm = 1 : s : (1 − s).',
      },
    },
    {
      say: 'Bachi rahane gross mechanical power bata friction ra windage ghataye shaft output prapta huncha.',
      voice: 'बाँकी रहने ग्रस मेकानिकल पावरबाट फ्रिक्सन र विन्डेज घटाए, साफ्ट आउटपुट प्राप्त हुन्छ।',
      lines: [chain(<>Gross mechanical power − friction and windage → shaft output</>)],
    },
    {
      say: 'Saransh: stator input, stator losses, air gap power, rotor copper loss, mechanical power ra output.',
      voice: 'सारांश — स्टेटर इनपुट, स्टेटर लसेस, एयर ग्याप पावर, रोटर कपर लस, मेकानिकल पावर र आउटपुट।',
      lines: [['idea', <>Input → stator losses → air gap power → rotor Cu loss → mechanical → output</>]],
    },
  ],
});

// One topic per IOE syllabus bullet of Unit 5 (rule 68). Bullet 2 is one long
// IOE item (principle, RMF, Ns, slip, rotor EMF, current, frequency, torque eq).
const t51 = topic({ num: '5.1', title: 'Three Phase Induction Motor: Constructional Details and Types', opener: basics51, derive: [construction51], picture: [connAnswer51] });
const t52 = topic({ num: '5.2', title: 'Operating Principle, Rotating Magnetic Field, Synchronous Speed, Slip, Induced EMF, Rotor Current and its frequency, Torque Equation', opener: basics52, derive: [rmf51, slip52, rotor52, torque53], picture: [rmfAnswer51, speedAnswer52, rotorSolve52] });
const t53 = topic({ num: '5.3', title: 'Torque-Slip characteristics', opener: basics53, derive: [tmax53], picture: [torqueAnswer53, tmaxSolve53] });
const t54 = topic({ num: '5.4', title: 'Three Phase Induction Generator: Working Principle, voltage build up in an Induction Generator', opener: basics54, derive: [gen54], picture: [genAnswer54] });
const t55 = topic({ num: '5.5', title: 'Power Stages', opener: basicsStages55, derive: [stages54], picture: [stagesSolve54] });

export const unit5 = {
  topics: [t51, t52, t53, t54, t55],
  summary: [
    <>Three-phase winding → RMF of 1.5Φ<sub>m</sub> at N<sub>s</sub> = 120f/P; rotor (cage wa slip ring) le pachhyaucha.</>,
    <>s = (N<sub>s</sub> − N)/N<sub>s</sub>; f<sub>2</sub> = sf; E<sub>2r</sub> = sE<sub>2</sub>; X<sub>2r</sub> = sX<sub>2</sub>.</>,
    <>T = ksE<sub>2</sub>²R<sub>2</sub>/(R<sub>2</sub>² + (sX<sub>2</sub>)²); T<sub>max</sub> = kE<sub>2</sub>²/2X<sub>2</sub> at s<sub>m</sub> = R<sub>2</sub>/X<sub>2</sub>.</>,
    <>P<sub>2</sub> : P<sub>cu2</sub> : P<sub>m</sub> = 1 : s : (1 − s).</>,
    <>N &gt; N<sub>s</sub> → induction generator; isolated ma C = I<sub>μ</sub>/(2πfV) per phase.</>,
  ],
};
