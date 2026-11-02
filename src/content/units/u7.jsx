import { C, K, Pts, answer, duo, topic } from '../video/kit.jsx';
import { br, chain, figAt, part, rem } from '../video/kit.jsx';
import { Cap, CoilH, T, W, head } from '../unit4/figs.jsx';
import { smallTour } from '../machines/models3d.js';
import { motorTour } from '../unit4/basics3d.js';

/*
  Unit 7 Fractional Kilowatt Motors (IOE syllabus), one topic per bullet (rule 68):
    7.1 Single phase Induction Motors: Construction and Characteristics
    7.2 Double Field Revolving Theory
    7.3 Split phase Induction Motor
    7.4 Capacitor start and run motor
    7.5 Reluctance start motor
    7.6 Alternating Current Series motor and Universal motor
    7.7 Special Purpose Machines: Stepper, Schrage and Servo motor
  Segment 1 walks machines/models3d.js smallTour (single-phase and stepper);
  7.6 uses the DC machine of Unit 4 (unit4/basics3d.js) with `ac: true`.
*/

const tex = (s) => <K>{s}</K>;
const step = (label, math) => <><span className="lbl">{label}</span><K>{math}</K></>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
const SP = ['frame', 'stator', 'main', 'rotorCore', 'cage', 'shaft'];
const SPF = [...SP, 'supply'];
const STEP = ['stepStator', 'stepCoils', 'stepRotor'];
const SERIES = ['yoke', 'poles', 'fieldCoil', 'armature', 'coil', 'commutator', 'brushes', 'shaft', 'fan', 'battery'];

/* ── Figures ─────────────────────────────────────────────────────────── */
// Fig. 7.1: 0 pulsating field axis · 1 two halves Φm/2 at ±θ · 2 resultant Φm cos θ · 3 Tf, Tb curves · 4 net torque zero at s = 1
export const dfrFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M90 30 V190" w={0.8} dash="3 3" />
      <T x={90} y={24} i size={10}>main axis</T>
      <Cap x={180} y={218}>Fig. 7.1  Double field revolving theory</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M90 110 L130 60" w={1.6} />
      {head(130, 60, 'up', 6)}
      <W d="M90 110 L50 60" w={1.6} />
      {head(50, 60, 'up', 6)}
      <T x={140} y={60} a="start" i size={10}>Φm/2 (ω)</T>
      <T x={40} y={60} a="end" i size={10}>Φm/2 (−ω)</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M90 110 V48" w={2.2} />
      <T x={96} y={150} a="start" i size={10}>Φr = Φm cos θ</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M200 120 H350 M275 40 V200" w={0.8} />
      <path d="M200 120 C230 118 250 112 262 90 C270 70 272 60 275 72 C280 95 300 115 350 118" fill="none" stroke={C.chalk} strokeWidth={1.3} transform="translate(0 0)" />
      <path d="M350 120 C320 122 300 128 288 150 C280 170 278 180 275 168 C270 145 250 125 200 122" fill="none" stroke={C.chalk} strokeWidth={1.1} strokeDasharray="4 3" />
      <T x={300} y={70} a="start" i size={9}>Tf</T>
      <T x={300} y={178} a="start" i size={9}>Tb</T>
      <T x={350} y={134} a="end" size={9}>s = 0 (fwd sync)</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <circle cx={275} cy={120} r={3.5} fill={C.chalk} />
      <T x={268} y={208} size={9}>s = 1: Tf = Tb, net T = 0</T>
    </g>
  </>
);

// Fig. 7.2: 0 main winding · 1 auxiliary + centrifugal switch · 2 capacitor · 3 phasors Im, Ia, α · 4 T ∝ Im Ia sin α
export const splitFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M20 50 H160 M20 170 H160" />
      <W d="M60 50 V80 M60 140 V170" />
      <path d="M60 80 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12" fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={50} y={114} a="end" i size={10}>main</T>
      <T x={14} y={114} a="end" i>V</T>
      <Cap x={180} y={214}>Fig. 7.2  Split-phase / capacitor-start motor</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M130 50 V66 M130 154 V170" />
      <W d="M130 66 L140 74" w={1.3} />
      <circle cx={130} cy={66} r={2} fill={C.chalk} />
      <T x={146} y={72} a="start" size={9}>S (centrifugal)</T>
      <path d="M130 80 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12" fill="none" stroke={C.chalk} strokeWidth={1.1} />
      <W d="M130 116 V126" />
      <T x={146} y={104} a="start" i size={10}>aux</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M122 132 H138 M122 138 H138" w={1.6} />
      <W d="M130 126 V132 M130 138 V154" />
      <T x={146} y={140} a="start" i size={10}>C</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M220 140 H340" w={1.4} />
      {head(340, 140, 'right')}
      <T x={344} y={144} a="start" i size={10}>V</T>
      <W d="M220 140 L300 190" w={1.3} />
      <T x={304} y={198} a="start" i size={10}>Im</T>
      <W d="M220 140 L300 70" w={1.3} />
      <T x={304} y={68} a="start" i size={10}>Ia (C-start)</T>
      <T x={256} y={136} i size={10}>α</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <T x={280} y={34} size={11} i>T ∝ Im Ia sin α</T>
    </g>
  </>
);

// Fig. 7.5: 0 salient poles with a non-uniform air gap, rotor · 1 wide and
// narrow gap fluxes · 2 the field shifting towards the narrow gap
export const relFigure = (s) => (
  <>
    <g className={s.on(0) + s.hl(0)}>
      <circle cx={180} cy={112} r={48} fill="none" stroke={C.chalk} strokeWidth={1.4} />
      <circle cx={180} cy={112} r={4} fill="none" stroke={C.chalk} strokeWidth={1.1} />
      <W d="M120 20 H240 V40 Q240 56 222 62 Q180 62 138 50 Q120 46 120 40 Z" />
      <W d="M120 204 H240 V184 Q240 168 222 162 Q180 162 138 174 Q120 178 120 184 Z" />
      <T x={180} y={34} b size={12}>N</T>
      <T x={180} y={198} b size={12}>S</T>
      <T x={80} y={112} i size={10} a="end">rotor (cage)</T>
      <Cap y={232}>Fig. 7.5  Reluctance start: non-uniform air gap</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M136 52 L136 70" w={0.8} />
      <T x={110} y={80} size={9.5} a="end">wide gap: flux lags less</T>
      <W d="M224 62 L224 68" w={0.8} />
      <T x={250} y={80} size={9.5} a="start">narrow gap: lags more</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <path d="M150 88 A40 40 0 0 1 212 92" fill="none" stroke={C.chalk} strokeWidth={1.3} />
      {head(214, 95, 'right', 6)}
      <T x={182} y={112} i size={10}>field shifts →</T>
    </g>
  </>
);

// Fig. 7.3: 0 series circuit on AC · 1 i and φ in phase · 2 torque always positive · 3 compensating winding note
export const universalFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <circle cx={40} cy={110} r={14} fill={C.board} stroke={C.chalk} strokeWidth={1.3} />
      <T x={40} y={114}>~</T>
      <W d="M40 96 V50 H70 M40 124 V170 H150 V140" />
      <CoilH x1={70} x2={110} y={50} label="series field" ly={-10} />
      <W d="M110 50 H150 V80" />
      <circle cx={150} cy={110} r={22} fill={C.board} stroke={C.chalk} strokeWidth={1.4} />
      <T x={150} y={114} i>A</T>
      <Cap x={180} y={214}>Fig. 7.3  Universal (AC series) motor</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M200 80 H350" w={0.7} />
      <path d={Array.from({ length: 41 }, (_, i) => `${i ? 'L' : 'M'}${200 + i * 3.75} ${80 - 28 * Math.sin((i / 40) * 4 * Math.PI)}`).join(' ')} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={352} y={60} a="end" i size={9}>i and φ (in phase)</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M200 170 H350" w={0.7} />
      <path d={Array.from({ length: 41 }, (_, i) => `${i ? 'L' : 'M'}${200 + i * 3.75} ${170 - 40 * Math.sin((i / 40) * 4 * Math.PI) ** 2}`).join(' ')} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={352} y={186} a="end" i size={9}>T ∝ φ i ∝ i²: always positive</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <T x={100} y={196} size={9}>laminated field, compensating winding</T>
    </g>
  </>
);

// Fig. 7.4: 0 stator with 4 poles (A, B, A′, B′) · 1 rotor · 2 phase A on · 3 phase B on, rotor steps · 4 step angle · 5 servo loop
export const stepperFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <circle cx={100} cy={110} r={70} fill="none" stroke={C.chalk} strokeWidth={1.4} />
      {['A', 'B', 'A′', 'B′'].map((p, i) => {
        const a = (i * Math.PI) / 2 - Math.PI / 2;
        const x = 100 + Math.cos(a) * 52;
        const y = 110 + Math.sin(a) * 52;
        return <g key={p}><rect x={x - 10} y={y - 10} width={20} height={20} fill="none" stroke={C.chalk} strokeWidth={1.2} /><T x={100 + Math.cos(a) * 84} y={110 + Math.sin(a) * 84 + 4} size={10}>{p}</T></g>;
      })}
      <Cap x={180} y={218}>Fig. 7.4  Stepper motor and servo loop</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <rect x={93} y={86} width={14} height={48} fill="none" stroke={C.chalk} strokeWidth={1.4} />
      <T x={100} y={84} size={9}>N</T>
      <T x={100} y={144} size={9}>S</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <T x={100} y={32} size={9}>A on</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M100 110 L140 110" w={1.4} dash="3 2" />
      <T x={150} y={98} a="start" size={9}>B on → rotor steps 90°</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <T x={280} y={60} size={11} i>β = 360° / (m Nr)</T>
    </g>
    <g className={s.on(5) + s.hl(5)}>
      <rect x={214} y={120} width={50} height={26} fill="none" stroke={C.chalk} strokeWidth={1.2} />
      <T x={239} y={137} size={9}>amplifier</T>
      <rect x={290} y={120} width={50} height={26} fill="none" stroke={C.chalk} strokeWidth={1.2} />
      <T x={315} y={137} size={9}>motor</T>
      <W d="M264 133 H290" />
      {head(290, 133, 'right', 5)}
      <W d="M315 146 V172 H239 V146" w={1} dash="3 2" />
      <T x={277} y={186} size={9}>feedback (sensor)</T>
    </g>
  </>
);

/* ── 7.1 Single-phase IM, DFR theory ──────────────────────────────────── */
export const basics71 = duo('7.2 · Basic understanding: why can’t a single-phase motor start by itself?', {
  three: smallTour([
    { shot: 'whole', show: SPF, spin: 0.4, flow: 0.5, labels: [['single phase motor', 'frame']] },
    { shot: 'front', spin: 0, flow: 0.6, pulse: 1, focus: ['main', 'supply'], labels: [['main winding', 'main']] },
    { pulse: 1, focus: ['main'], labels: [['mathi-tala matra', 'field']] },
    { pulse: 1, focus: ['cage', 'rotorCore'], labels: [['rotor chupchap', 'cage']] },
    { pulse: 0, dfr: 1, focus: ['main'], labels: [['dui ulto ghumne', 'field']] },
    { dfr: 1, spin: 0.15, spinMs: 600, focus: ['cage'], labels: [['ali dhakka diyo', 'cage']] },
    { dfr: 1, spin: 0.7, spinMs: 4000, focus: ['cage', 'shaft'], labels: [['aghi ko jityo', 'shaft']] },
    { shot: 'whole', dfr: 0, pulse: 0, spin: 0.7, focus: null },
  ]),
  tutor: [
    {
      say: 'Ghar ko fan, mixie, fridge: sabai ghar ko single phase bijuli ma chalne sana motor.',
      voice: 'घरको फ्यान, मिक्सी, फ्रिज — सबै घरको सिङ्गल फेज बिजुलीमा चल्ने साना मोटर।',
      lines: [['h', <>7.2 · Fan aafai kina ghumdaina?</>], ['step', <>Fan, mixie, fridge: single phase motor</>]],
    },
    {
      say: 'Stator ma euta main winding, single phase supply ma.',
      voice: 'स्टेटरमा एउटा मेन वाइन्डिङ, सिङ्गल फेज सप्लाईमा।',
      lines: [['step', <>Euta main winding</>]],
    },
    {
      say: 'Euta winding ko magnet ghumdaina; mathi-tala matra thulo-sano huncha, chhatpataune jasto.',
      voice: 'एउटा वाइन्डिङको म्याग्नेट घुम्दैन, माथि तल मात्र ठूलो सानो हुन्छ, छटपटाउने जस्तो।',
      lines: [part(<>Magnet ghumdaina</>, <>mathi-tala matra (pulsating)</>)],
    },
    {
      say: 'Tesaile rotor lai dubai tira barabar tancha, ra rotor chupchap basthan. Aafai start hudaina!',
      voice: 'त्यसैले रोटरलाई दुवैतिर बराबर तान्छ, र रोटर चुपचाप बस्छ। आफैं स्टार्ट हुँदैन!',
      lines: [chain(<>Dubai tira barabar → rotor chupchap</>)],
      ask: {
        q: 'Single phase induction motor aafai start kina hudaina?',
        voice: 'सिङ्गल फेज इन्डक्सन मोटर आफैं स्टार्ट किन हुँदैन?',
        options: ['Field ghumdaina, mathi-tala matra', 'Rotor ma bar chaina', 'Supply DC huncha'],
        answer: 0,
        why: 'Pulsating field le dubai disha ma barabar torque dincha.',
      },
    },
    {
      say: 'Mathi-tala ko magnet lai dui aadha-aadha magnet jasto socha, euta yata ra arko uta ulto ghumne.',
      voice: 'माथि तलको म्याग्नेटलाई दुई आधा आधा म्याग्नेट जस्तो सोच, एउटा यता र अर्को उता उल्टो घुम्ने।',
      lines: [chain(<>Dui aadha magnet: ulto-ulto ghumne</>)],
    },
    {
      say: 'Rotor lai hat le ali dhakka diye, euta aadha le badhi tancha.',
      voice: 'रोटरलाई हातले अलि धक्का दिए, एउटा आधाले बढी तान्छ।',
      lines: [chain(<>Ali dhakka → euta aadha badhi</>)],
    },
    {
      say: 'Jun tira dhakka diyo, tyai tira ko aadha jitcha, ra motor tyai tira ghumirahancha.',
      voice: 'जुनतिर धक्का दियो, त्यहीतिरको आधा जित्छ, र मोटर त्यहीतिर घुमिरहन्छ।',
      lines: [chain(<>Dhakka ko tira jitcha → ghumirahancha</>)],
    },
    {
      say: 'Saransha: euta winding ko magnet mathi-tala matra, tesaile start hudaina; start bhayepachi chalirahancha; start ko lagi upaya chahincha.',
      voice: 'सारांश — एउटा वाइन्डिङको म्याग्नेट माथि तल मात्र, त्यसैले स्टार्ट हुँदैन, स्टार्ट भएपछि चलिरहन्छ, स्टार्टको लागि उपाय चाहिन्छ।',
      lines: [['idea', <>Mathi-tala → start hudaina · dhakka pachhi chalcha · start ko upaya chahincha</>]],
    },
  ],
  lecturer: [
    {
      say: 'Ghar ka sana appliances ma single-phase induction motor prayog hunchha.',
      voice: 'घरका साना एप्लायन्सेसमा सिङ्गल फेज इन्डक्सन मोटर प्रयोग हुन्छ।',
      lines: [['h', <>7.2 · Single-phase induction motor</>], part(<>Domestic appliances</>, <>fans, mixers, compressors</>)],
    },
    {
      say: 'Stator ma single-phase main winding ra cage rotor hunchha.',
      voice: 'स्टेटरमा सिङ्गल फेज मेन वाइन्डिङ र केज रोटर हुन्छ।',
      lines: [['step', <>Stator main winding, cage rotor</>]],
    },
    {
      say: 'Single-phase supply le rotating hoina, pulsating field banaucha.',
      voice: 'सिङ्गल फेज सप्लाईले रोटेटिङ होइन, पल्सेटिङ फिल्ड बनाउँछ।',
      lines: [['step', <>Pulsating (not rotating) field</>]],
    },
    {
      say: 'Standstill ma net torque zero; motor self-starting hudaina.',
      voice: 'स्ट्यान्डस्टिलमा नेट टर्क जिरो, मोटर सेल्फ स्टार्टिङ हुँदैन।',
      lines: [chain(<>Zero starting torque: not self-starting</>)],
      ask: {
        q: 'Single phase IM ko field kasto huncha?',
        voice: 'सिङ्गल फेज आई एमको फिल्ड कस्तो हुन्छ?',
        options: ['Pulsating', 'Rotating, constant', 'DC steady'],
        answer: 0,
        why: 'Euta winding, euta phase: axis fixed, magnitude matra badlincha.',
      },
    },
    {
      say: 'Double field revolving theory anusar pulsating field lai dui barabar, ulto ghumne field ma chhuttauna sakincha.',
      voice: 'डबल फिल्ड रिभल्भिङ थ्योरी अनुसार पल्सेटिङ फिल्डलाई दुई बराबर, उल्टो घुम्ने फिल्डमा छुट्याउन सकिन्छ।',
      lines: [['step', <>Two equal fields rotating in opposite directions</>]],
    },
    {
      say: 'Rotor kunai disha ma ghumna thalepachi tyo disha ko field ko torque badhi huncha.',
      voice: 'रोटर कुनै दिशामा घुम्न थालेपछि त्यो दिशाको फिल्डको टर्क बढी हुन्छ।',
      lines: [['step', <>Once turning, the forward torque exceeds the backward</>]],
    },
    {
      say: 'Tesaile motor tyai disha ma chalirahancha.',
      voice: 'त्यसैले मोटर त्यही दिशामा चलिरहन्छ।',
      lines: [['step', <>The motor keeps running that way</>]],
    },
    {
      say: 'Saransha: pulsating field, zero starting torque, ra starting ko lagi auxiliary arrangement chahincha.',
      voice: 'सारांश — पल्सेटिङ फिल्ड, जिरो स्टार्टिङ टर्क, र स्टार्टिङको लागि अक्जिलरी एरेन्जमेन्ट चाहिन्छ।',
      lines: [['idea', <>Pulsating field · zero starting torque · needs a starting arrangement</>]],
    },
  ],
});

export const construction71 = duo('Single-phase induction motor: construction, not self-starting', {
  draw: dfrFigure,
  viewBox: '0 0 360 225',
  tutor: [
    {
      say: 'Construction three-phase jastai: laminated stator, cage rotor. Tara stator ma main winding ra 90 degree ma auxiliary winding.',
      voice: 'कन्स्ट्रक्सन थ्री फेज जस्तै — ल्यामिनेटेड स्टेटर, केज रोटर। तर स्टेटरमा मेन वाइन्डिङ, र नाइन्टी डिग्रीमा अक्जिलरी वाइन्डिङ।',
      lines: [['h', <>Single-phase induction motor</>], ['step', <>Laminated stator: main + auxiliary winding (90° apart); cage rotor</>]],
    },
    {
      say: 'Main winding: mota tar, kam resistance, badhi reactance. Auxiliary: patlo tar, badhi resistance.',
      voice: 'मेन वाइन्डिङ — मोटो तार, कम रेजिस्टेन्स, बढी रियाक्टेन्स। अक्जिलरी — पातलो तार, बढी रेजिस्टेन्स।',
      lines: [['step', <>Main: thick wire, low R, high X · auxiliary: thin wire, high R (different, so currents differ in phase)</>]],
    },
    {
      say: 'Main winding matra bhaye field ko axis fixed; size matra phi m cos omega t le badlincha: pulsating.',
      voice: 'मेन वाइन्डिङ मात्र भए फिल्डको एक्सिस फिक्स्ड, साइज मात्र फाइ एम कस ओमेगा टीले बदलिन्छ — पल्सेटिङ।',
      lines: [['eq', tex(String.raw`\Phi = \Phi_m\cos\omega t \quad \text{(fixed axis)}`)]],
      ask: {
        q: 'Auxiliary winding ko construction main winding bhanda kina farak?',
        voice: 'अक्जिलरी वाइन्डिङको कन्स्ट्रक्सन मेन वाइन्डिङभन्दा किन फरक?',
        options: ['Current ma phase farak lyauna', 'Weight ghatauna', 'Speed badhauna'],
        answer: 0,
        why: 'R/X farak: dui current ko phase farak, ra rotating field.',
      },
    },
    {
      say: 'Pulsating field le standstill ma rotor lai dubai disha barabar torque dincha: net zero, not self-starting.',
      voice: 'पल्सेटिङ फिल्डले स्ट्यान्डस्टिलमा रोटरलाई दुवै दिशा बराबर टर्क दिन्छ — नेट जिरो, नट सेल्फ स्टार्टिङ।',
      lines: [['step', <>At standstill: equal and opposite torques → net zero</>]],
    },
    {
      say: 'Characteristics: speed lagbhag constant, pf kam, starting method anusar starting torque.',
      voice: 'क्यारेक्टरिस्टिक्स — स्पिड लगभग कन्स्टेन्ट, पी एफ कम, स्टार्टिङ मेथड अनुसार स्टार्टिङ टर्क।',
      lines: [['idea', <>Nearly constant speed, low pf, lower efficiency than 3-phase; starting torque set by the starting method</>]],
    },
  ],
  lecturer: [
    {
      say: 'The stator carries a main and an auxiliary winding, displaced 90 electrical degrees; the rotor is a squirrel cage.',
      voice: 'द स्टेटर क्यारिज अ मेन एन्ड एन अक्जिलरी वाइन्डिङ, डिस्प्लेस्ड नाइन्टी इलेक्ट्रिकल डिग्रिज, द रोटर इज अ स्क्विरल केज।',
      lines: [['h', <>Construction and characteristics</>], ['step', <>Main + auxiliary (90°), cage rotor</>]],
    },
    {
      say: 'The main winding has low resistance and high reactance; the auxiliary winding has high resistance.',
      voice: 'द मेन वाइन्डिङ ह्याज लो रेजिस्टेन्स एन्ड हाई रियाक्टेन्स, द अक्जिलरी वाइन्डिङ ह्याज हाई रेजिस्टेन्स।',
      lines: [['step', <>Main: low R, high X · auxiliary: high R</>]],
    },
    {
      say: 'With the main winding alone, the field is phi m cos omega t on a fixed axis: pulsating.',
      voice: 'विद द मेन वाइन्डिङ अलोन, द फिल्ड इज फाइ एम कस ओमेगा टी अन अ फिक्स्ड एक्सिस — पल्सेटिङ।',
      lines: [['eq', tex(String.raw`\Phi = \Phi_m\cos\omega t \quad \text{(fixed axis)}`)]],
      ask: {
        q: 'Single-phase motor ma auxiliary winding kina chahincha?',
        voice: 'सिङ्गल फेज मोटरमा अक्जिलरी वाइन्डिङ किन चाहिन्छ?',
        options: ['Starting torque dina', 'Running speed badhauna', 'Copper loss ghatauna'],
        answer: 0,
        why: 'Phase-shifted current le rotating field ra starting torque.',
      },
    },
    {
      say: 'Such a field gives equal and opposite torques at standstill; the motor is not self-starting.',
      voice: 'सच अ फिल्ड गिभ्स इक्वल एन्ड अपोजिट टर्क्स एट स्ट्यान्डस्टिल, द मोटर इज नट सेल्फ स्टार्टिङ।',
      lines: [['step', <>Not self-starting</>]],
    },
    {
      say: 'Characteristics: nearly constant speed, low power factor and efficiency compared with three-phase motors.',
      voice: 'क्यारेक्टरिस्टिक्स — नियर्ली कन्स्टेन्ट स्पिड, लो पावर फ्याक्टर एन्ड इफिसियन्सी कम्पेयर्ड विद थ्री फेज मोटर्स।',
      lines: [['step', <>Constant speed, low pf and efficiency</>]],
    },
  ],
});

export const dfr71 = duo('Derivation: double field revolving theory', {
  draw: dfrFigure,
  viewBox: '0 0 360 225',
  tutor: [
    {
      say: 'Figure 7.1: pulsating field phi m cos omega t lai dui field ma bandau: phi m over 2, euta omega le, arko minus omega le ghumne.',
      voice: 'फिगर सेभेन पोइन्ट वान — पल्सेटिङ फिल्ड फाइ एम कस ओमेगा टीलाई दुई फिल्डमा बाँडौं — फाइ एम ओभर टु, एउटा ओमेगाले, अर्को माइनस ओमेगाले घुम्ने।',
      lines: [['h', <>Double field revolving theory</>], ['step', <>Φ<sub>m</sub> cos ωt = two fields Φ<sub>m</sub>/2 rotating at +ω and −ω</>]],
    },
    {
      say: 'Angle theta equals omega t ma, dubai ko tero component cancel, thado component jodincha: 2 into phi m over 2 cos theta.',
      voice: 'एङ्गल थिटा इक्वल्स ओमेगा टीमा, दुवैको तेर्सो कम्पोनेन्ट क्यान्सिल, ठाडो कम्पोनेन्ट जोडिन्छ — टु इन्टु फाइ एम ओभर टु कस थिटा।',
      lines: [['eq', tex(String.raw`\begin{aligned} \Phi_r &= 2\cdot\dfrac{\Phi_m}{2}\cos\theta \\ &= \boxed{\Phi_m\cos\omega t} \end{aligned}`)]],
    },
    {
      say: 'Rotor N ma ghumda, forward field sanga slip s, backward field sanga slip 2 minus s.',
      voice: 'रोटर एनमा घुम्दा, फरवार्ड फिल्डसँग स्लिप एस, ब्याकवार्ड फिल्डसँग स्लिप टु माइनस एस।',
      lines: [['eq', tex(String.raw`\begin{aligned} s_f &= \dfrac{N_s - N}{N_s} \\ &= s \\ s_b &= \dfrac{N_s + N}{N_s} \\ &= 2 - s \end{aligned}`)]],
      ask: {
        q: 'Standstill ma backward field sanga ko slip kati?',
        voice: 'स्ट्यान्डस्टिलमा ब्याकवार्ड फिल्डसँगको स्लिप कति?',
        options: ['1', '2', '0'],
        answer: 0,
        why: 's = 1: sb = 2 − 1 = 1, dubai barabar.',
      },
    },
    {
      say: 'Standstill ma s 1, s b 1: T f ra T b barabar ra ulto, net torque zero.',
      voice: 'स्ट्यान्डस्टिलमा एस वान, एस बी वान — टी एफ र टी बी बराबर र उल्टो, नेट टर्क जिरो।',
      lines: [['eq', tex(String.raw`\begin{aligned} s &= 1:\ T_f \\ &= T_b \;\Rightarrow\; T \\ &= T_f - T_b \\ &= 0 \end{aligned}`)]],
    },
    {
      say: 'Rotor forward ghumepachi T f badhi, T b kam: net torque forward. Tesaile dhakka pachhi chalirahancha.',
      voice: 'रोटर फरवार्ड घुमेपछि टी एफ बढी, टी बी कम — नेट टर्क फरवार्ड। त्यसैले धक्कापछि चलिरहन्छ।',
      lines: [['idea', <>Running forward: T<sub>f</sub> &gt; T<sub>b</sub> → net forward torque; it runs in whichever direction it is started</>]],
    },
  ],
  lecturer: [
    {
      say: 'A pulsating field phi m cos omega t can be resolved into two fields of phi m over 2 rotating in opposite directions, Figure 7.1.',
      voice: 'अ पल्सेटिङ फिल्ड फाइ एम कस ओमेगा टी क्यान बी रिजल्भ्ड इन्टु टु फिल्ड्स अफ फाइ एम ओभर टु रोटेटिङ इन अपोजिट डाइरेक्सन्स, फिगर सेभेन पोइन्ट वान।',
      lines: [['h', <>Double field revolving theory</>], ['step', <>Two fields Φ<sub>m</sub>/2 at ±ω</>]],
    },
    {
      say: 'Their horizontal components cancel and the vertical components add to phi m cos omega t.',
      voice: 'देयर होरिजन्टल कम्पोनेन्ट्स क्यान्सिल एन्ड द भर्टिकल कम्पोनेन्ट्स एड टु फाइ एम कस ओमेगा टी।',
      lines: [['eq', tex(String.raw`\begin{aligned} \Phi_r &= 2\cdot\dfrac{\Phi_m}{2}\cos\theta \\ &= \boxed{\Phi_m\cos\omega t} \end{aligned}`)]],
    },
    {
      say: 'With the rotor at N, its slip is s with the forward field and 2 minus s with the backward field.',
      voice: 'विद द रोटर एट एन, इट्स स्लिप इज एस विद द फरवार्ड फिल्ड एन्ड टु माइनस एस विद द ब्याकवार्ड फिल्ड।',
      lines: [['eq', tex(String.raw`\begin{aligned} s_f &= \dfrac{N_s - N}{N_s} \\ &= s \\ s_b &= \dfrac{N_s + N}{N_s} \\ &= 2 - s \end{aligned}`)]],
      ask: {
        q: 'Forward field ko slip s bhaye backward ko slip kati?',
        voice: 'फरवार्ड फिल्डको स्लिप एस भए ब्याकवार्डको स्लिप कति?',
        options: ['2 − s', 's', '1 − s'],
        answer: 0,
        why: '(Ns + N)/Ns = 2 − s.',
      },
    },
    {
      say: 'At standstill both slips are unity, the two torques are equal and opposite, and the net torque is zero.',
      voice: 'एट स्ट्यान्डस्टिल बोथ स्लिप्स आर युनिटी, द टु टर्क्स आर इक्वल एन्ड अपोजिट, एन्ड द नेट टर्क इज जिरो।',
      lines: [['eq', tex(String.raw`\begin{aligned} s &= 1:\ T_f \\ &= T_b \;\Rightarrow\; T \\ &= T_f - T_b \\ &= 0 \end{aligned}`)]],
    },
    {
      say: 'Once rotating, the forward torque exceeds the backward, so the motor runs on in that direction.',
      voice: 'वन्स रोटेटिङ, द फरवार्ड टर्क एक्सिड्स द ब्याकवार्ड, सो द मोटर रन्स अन इन दयाट डाइरेक्सन।',
      lines: [['step', <>Running: T<sub>f</sub> &gt; T<sub>b</sub>, net torque in the direction of rotation</>]],
    },
  ],
});

export const dfrAnswer71 = answer('Model answer: double field revolving theory', {
  draw: dfrFigure,
  viewBox: '0 0 360 225',
  papers: ['2072 Ashwin', '2070 Magh', '2078 Poush', '2078 Baishakh', '2069 Bhadra'],
  q: 'What do you understand by double field revolving theory? Explain it with the help of a neat diagram.',
  read: {
    say: 'IOE ma paanch choti: what do you understand by double field revolving theory? Explain it with the help of a neat diagram.',
    voice: 'आई ओ ईमा पाँच चोटि — ह्वाट डु यु अन्डरस्ट्यान्ड बाइ डबल फिल्ड रिभल्भिङ थ्योरी? एक्सप्लेन इट विद द हेल्प अफ अ निट डायग्राम।',
  },
  points: [
    {
      node: <><H>Statement</H><Pts items={[<>A pulsating (alternating) field of maximum Φ<sub>m</sub> can be resolved into two fields of magnitude Φ<sub>m</sub>/2 each, rotating at synchronous speed in opposite directions</>]} /></>,
      say: 'A pulsating field of maximum phi m can be resolved into two fields of phi m over 2 each, rotating at synchronous speed in opposite directions.',
      voice: 'अ पल्सेटिङ फिल्ड अफ म्याक्सिमम फाइ एम क्यान बी रिजल्भ्ड इन्टु टु फिल्ड्स अफ फाइ एम ओभर टु इच, रोटेटिङ एट सिन्क्रोनस स्पिड इन अपोजिट डाइरेक्सन्स।',
    },
    {
      node: <><H>Proof (Fig. 7.1)</H>At θ = ωt, the two Φ<sub>m</sub>/2 phasors make ±θ with the main axis:<K>{String.raw`\begin{aligned} \Phi_r &= 2\cdot\dfrac{\Phi_m}{2}\cos\theta \\ &= \Phi_m\cos\omega t \end{aligned}`}</K>(their quadrature components cancel)</>,
      say: 'At theta equal to omega t the two phasors make plus and minus theta with the axis; their quadrature components cancel and the resultant is phi m cos omega t.',
      voice: 'एट थिटा इक्वल टु ओमेगा टी द टु फेजर्स मेक प्लस एन्ड माइनस थिटा विद द एक्सिस, देयर क्वाड्रेचर कम्पोनेन्ट्स क्यान्सिल एन्ड द रिजल्टेन्ट इज फाइ एम कस ओमेगा टी।',
    },
    {
      page: true,
      node: <><H>Torques</H><Pts items={[<>Each field produces an induction-motor torque: forward T<sub>f</sub> at slip s, backward T<sub>b</sub> at slip (2 − s)</>, <>At standstill s = 1 = (2 − s): T<sub>f</sub> = T<sub>b</sub>, net torque zero → not self-starting</>]} /></>,
      say: 'Each field gives an induction torque: forward at slip s, backward at slip 2 minus s. At standstill both slips are one, the torques cancel, and the motor is not self-starting.',
      voice: 'इच फिल्ड गिभ्स एन इन्डक्सन टर्क — फरवार्ड एट स्लिप एस, ब्याकवार्ड एट स्लिप टु माइनस एस। एट स्ट्यान्डस्टिल बोथ स्लिप्स आर वान, द टर्क्स क्यान्सिल, एन्ड द मोटर इज नट सेल्फ स्टार्टिङ।',
    },
    {
      node: <><Pts items={[<>If rotated forward, s &lt; 1 and T<sub>f</sub> &gt; T<sub>b</sub>: a net forward torque keeps it running</>, <>It runs in either direction, whichever it is started in; hence a starting arrangement (auxiliary winding) is needed</>]} /></>,
      say: 'If rotated forward, the forward torque exceeds the backward, and the motor keeps running. It runs in whichever direction it is started, so a starting arrangement is needed.',
      voice: 'इफ रोटेटेड फरवार्ड, द फरवार्ड टर्क एक्सिड्स द ब्याकवार्ड, एन्ड द मोटर किप्स रनिङ। इट रन्स इन ह्विचएभर डाइरेक्सन इट इज स्टार्टेड, सो अ स्टार्टिङ एरेन्जमेन्ट इज निडेड।',
      ask: {
        q: 'DFR theory anusar single phase IM kun disha ma ghumcha?',
        voice: 'डी एफ आर थ्योरी अनुसार सिङ्गल फेज आई एम कुन दिशामा घुम्छ?',
        options: ['Start gareko disha ma', 'Sadhai clockwise', 'Ghumdai ghumdaina'],
        answer: 0,
        why: 'Jun disha ma start garyo, tyo disha ko torque badhi huncha.',
      },
    },
  ],
});

/* ── 7.2 Split phase, capacitor, reluctance start ────────────────────── */
export const basics72 = duo('7.3 · Basic understanding: how is a single-phase motor made self-starting?', {
  three: smallTour([
    { shot: 'front', show: [...SPF, 'aux'], flow: 0.6, focus: ['aux'], labels: [['dosro coil: aux', 'aux']] },
    { pulse: 0, rot: 1, focus: ['main', 'aux'], labels: [['field ghumyo!', 'field']] },
    { rot: 1, spin: 0.5, spinMs: 3000, focus: ['cage'], labels: [['aafai start', 'cage']] },
    { shot: 'cap', show: [...SPF, 'aux', 'capacitor'], rot: 1, spin: 0.5, focus: ['capacitor'], labels: [['capacitor', 'capacitor']] },
    { shot: 'switch', spin: 0.8, spinMs: 2500, focus: ['switch'], labels: [['centrifugal switch', 'switch']] },
    { show: SPF, rot: 0, pulse: 0, spin: 0.8, focus: ['main', 'cage'], labels: [['aux bina chalcha', 'main']] },
    { shot: 'front', show: [...SPF, 'aux', 'capacitor'], rot: 1, spin: 0.8, focus: ['capacitor', 'aux'], labels: [['fan: capacitor sadhai', 'capacitor']] },
    { shot: 'whole', rot: 1, spin: 0.8, focus: null },
  ]),
  tutor: [
    {
      say: 'Upaya: main coil sanga 90 degree ma dosro coil, auxiliary winding, jodne.',
      voice: 'उपाय — मेन कोइलसँग नाइन्टी डिग्रीमा दोस्रो कोइल, अक्जिलरी वाइन्डिङ, जोड्ने।',
      lines: [['h', <>7.3 · Aafai kasari start garaune?</>], ['step', <>Dosro coil (auxiliary) 90° ma</>]],
    },
    {
      say: 'Dui coil ko current ali farak samaya ma thulo bhaye magnet ghumna thalcha, tin phase jastai.',
      voice: 'दुई कोइलको करेन्ट अलि फरक समयमा ठूलो भए म्याग्नेट घुम्न थाल्छ, तीन फेज जस्तै।',
      lines: [chain(<>Current farak samaya ma → field ghumcha</>)],
      ask: {
        q: 'Dui winding ma current eutai samaya ma thulo bhaye k huncha?',
        voice: 'दुई वाइन्डिङमा करेन्ट एउटै समयमा ठूलो भए के हुन्छ?',
        options: ['Field ghumdaina, start hudaina', 'Jhan chito start', 'Ulto ghumcha'],
        answer: 0,
        why: 'Phase farak chaina bhane field pulsating nai rahancha.',
      },
    },
    {
      say: 'Ghumne field le rotor aafai start garcha.',
      voice: 'घुम्ने फिल्डले रोटर आफैं स्टार्ट गर्छ।',
      lines: [chain(<>Ghumne field → aafai start</>)],
    },
    {
      say: 'Aux coil ma capacitor jode current dherai aghi aaucha: badhi dhakka. Yo capacitor-start motor.',
      voice: 'अक्स कोइलमा क्यापासिटर जोडे करेन्ट धेरै अघि आउँछ — बढी धक्का। यो क्यापासिटर स्टार्ट मोटर।',
      lines: [chain(<>Capacitor → current aghi → badhi dhakka</>)],
    },
    {
      say: 'Speed 75 percent pugepachi shaft ko centrifugal switch ka gola bahira phaliyera aux coil chhutaucha.',
      voice: 'स्पिड पचहत्तर प्रतिशत पुगेपछि सफ्टको सेन्ट्रिफ्युगल स्विचका गोला बाहिर फालिएर अक्स कोइल छुटाउँछ।',
      lines: [chain(<>75 % speed → centrifugal switch le aux chhutaucha</>)],
    },
    {
      say: 'Tyaspachi main coil matra le chalaucha, kinaki chalisakeko motor chalirahancha.',
      voice: 'त्यसपछि मेन कोइल मात्रले चलाउँछ, किनकि चलिसकेको मोटर चलिरहन्छ।',
      lines: [['step', <>Main coil matra le chalcha</>]],
    },
    {
      say: 'Ceiling fan ma capacitor sadhai jodiyekai huncha: capacitor-run, chup ra smooth. Dherai sano motor ma pole ko bango aakar le pani start garcha: reluctance start.',
      voice: 'सिलिङ फ्यानमा क्यापासिटर सधैं जोडिएकै हुन्छ — क्यापासिटर रन, चुप र स्मुथ। धेरै सानो मोटरमा पोलको बाङ्गो आकारले पनि स्टार्ट गर्छ — रिलक्टेन्स स्टार्ट।',
      lines: [['step', <>Fan: capacitor-run · ati sano: reluctance start</>]],
    },
    {
      say: 'Saransha: dosro coil le field ghumaucha, capacitor le badhi dhakka, ra switch le start pachhi chhutaucha.',
      voice: 'सारांश — दोस्रो कोइलले फिल्ड घुमाउँछ, क्यापासिटरले बढी धक्का, र स्विचले स्टार्टपछि छुटाउँछ।',
      lines: [['idea', <>Aux → field ghumcha · capacitor → badhi dhakka · switch → chhutaucha</>]],
    },
  ],
  lecturer: [
    {
      say: 'Main winding sanga 90 electrical degree displaced auxiliary winding rakhincha.',
      voice: 'मेन वाइन्डिङसँग नाइन्टी इलेक्ट्रिकल डिग्री डिस्प्लेस्ड अक्जिलरी वाइन्डिङ राखिन्छ।',
      lines: [['h', <>7.3 · Starting methods</>], ['step', <>Auxiliary winding displaced 90° electrical</>]],
    },
    {
      say: 'Dui winding ko current ma time-phase difference bhaye rotating field banchha.',
      voice: 'दुई वाइन्डिङको करेन्टमा टाइम फेज डिफरेन्स भए रोटेटिङ फिल्ड बन्छ।',
      lines: [chain(<>Time-phase difference → rotating field (phase splitting)</>)],
      ask: {
        q: 'Rotating field ko lagi kun dui kura chahincha?',
        voice: 'रोटेटिङ फिल्डको लागि कुन दुई कुरा चाहिन्छ?',
        options: ['Space ra time displacement', 'Space matra', 'Thulo current matra'],
        answer: 0,
        why: 'Winding 90° space ma ra current phase ma farak.',
      },
    },
    {
      say: 'Rotating field le starting torque dincha.',
      voice: 'रोटेटिङ फिल्डले स्टार्टिङ टर्क दिन्छ।',
      lines: [['step', <>Starting torque produced</>]],
    },
    {
      say: 'Capacitor-start motor ma auxiliary winding sanga capacitor series ma huncha, ra phase difference lagbhag 90 degree.',
      voice: 'क्यापासिटर स्टार्ट मोटरमा अक्जिलरी वाइन्डिङसँग क्यापासिटर सिरिजमा हुन्छ, र फेज डिफरेन्स लगभग नाइन्टी डिग्री।',
      lines: [part(<>Capacitor-start</>, <>currents nearly a right angle apart, high starting torque</>)],
    },
    {
      say: 'Centrifugal switch le 70 dekhi 80 percent speed ma auxiliary circuit disconnect garcha.',
      voice: 'सेन्ट्रिफ्युगल स्विचले सत्तरी देखि असी प्रतिशत स्पिडमा अक्जिलरी सर्किट डिसकनेक्ट गर्छ।',
      lines: [['step', <>Centrifugal switch opens at 70–80 % speed</>]],
    },
    {
      say: 'Motor main winding matra ma run garcha.',
      voice: 'मोटर मेन वाइन्डिङ मात्रमा रन गर्छ।',
      lines: [['step', <>Runs on the main winding</>]],
    },
    {
      say: 'Capacitor-run motor ma capacitor permanently connected; reluctance-start motor ma non-uniform air gap le starting torque.',
      voice: 'क्यापासिटर रन मोटरमा क्यापासिटर पर्मानेन्ट्ली कनेक्टेड, रिलक्टेन्स स्टार्ट मोटरमा नन युनिफर्म एयर ग्यापले स्टार्टिङ टर्क।',
      lines: [['step', <>Capacitor-run: permanent C · reluctance start: non-uniform air gap</>]],
    },
    {
      say: 'Saransha: phase splitting le rotating field, capacitor le starting torque sudhar, ra switch le auxiliary hataucha.',
      voice: 'सारांश — फेज स्प्लिटिङले रोटेटिङ फिल्ड, क्यापासिटरले स्टार्टिङ टर्क सुधार, र स्विचले अक्जिलरी हटाउँछ।',
      lines: [['idea', <>Phase splitting · capacitor improves torque · switch removes auxiliary</>]],
    },
  ],
});

export const split72 = duo('Split-phase induction motor', {
  draw: splitFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Figure 7.2: main winding ra auxiliary winding dubai V ma parallel. Aux ma centrifugal switch S.',
      voice: 'फिगर सेभेन पोइन्ट टु — मेन वाइन्डिङ र अक्जिलरी वाइन्डिङ दुवै भीमा प्यारालल। अक्समा सेन्ट्रिफ्युगल स्विच एस।',
      lines: [['h', <>Split-phase induction motor</>], ['step', <>Main ∥ auxiliary across V; switch S in the auxiliary</>]],
    },
    {
      say: 'Split-phase: aux ma badhi R, kam X, tesaile I a kam lag garcha. I m ra I a bich angle alpha 25 dekhi 30 degree.',
      voice: 'स्प्लिट फेज — अक्समा बढी आर, कम एक्स, त्यसैले आई ए कम ल्याग गर्छ। आई एम र आई ए बीच एङ्गल अल्फा पच्चीस देखि तीस डिग्री।',
      lines: [['step', <>Split-phase (resistance start): α ≈ 25–30°, moderate starting torque (fans, blowers)</>]],
    },
    {
      say: 'Starting torque I m I a sin alpha sanga badhcha.',
      voice: 'स्टार्टिङ टर्क आई एम आई ए साइन अल्फासँग बढ्छ।',
      lines: [['eq', tex(String.raw`\boxed{T_{st} \propto I_m I_a \sin\alpha}`)]],
      ask: {
        q: 'Starting torque maximum garna alpha kati hunu ramro?',
        voice: 'स्टार्टिङ टर्क म्याक्सिमम गर्न अल्फा कति हुनु राम्रो?',
        options: ['90°', '0°', '30°'],
        answer: 0,
        why: 'sin 90° = 1, maximum.',
      },
    },
    {
      say: 'Split-phase motor ko starting torque madhyam huncha, tesaile fan, blower ra washing machine jasta halka load ma prayog garincha.',
      voice: 'स्प्लिट फेज मोटरको स्टार्टिङ टर्क मध्यम हुन्छ, त्यसैले फ्यान, ब्लोअर र वासिङ मेसिन जस्ता हल्का लोडमा प्रयोग गरिन्छ।',
      lines: [['idea', <>Split-phase: moderate starting torque → fans, blowers, washing machines</>]],
    },
  ],
  lecturer: [
    {
      say: 'The main and auxiliary windings are in parallel across V, with a centrifugal switch in the auxiliary, Figure 7.2.',
      voice: 'द मेन एन्ड अक्जिलरी वाइन्डिङ्स आर इन प्यारालल एक्रस भी, विद अ सेन्ट्रिफ्युगल स्विच इन द अक्जिलरी, फिगर सेभेन पोइन्ट टु।',
      lines: [['h', <>Split-phase induction motor</>], ['step', <>Main ∥ auxiliary; centrifugal switch</>]],
    },
    {
      say: 'Split-phase motor: a high-resistance auxiliary gives a phase difference of about 25 to 30 degrees.',
      voice: 'स्प्लिट फेज मोटर — अ हाई रेजिस्टेन्स अक्जिलरी गिभ्स अ फेज डिफरेन्स अफ अबाउट ट्वेन्टी फाइभ टु थर्टी डिग्रिज।',
      lines: [['step', <>Split-phase: α ≈ 25–30°</>]],
    },
    {
      say: 'The starting torque is proportional to I m I a sin alpha.',
      voice: 'द स्टार्टिङ टर्क इज प्रपोर्सनल टु आई एम आई ए साइन अल्फा।',
      lines: [['eq', tex(String.raw`\boxed{T_{st} \propto I_m I_a \sin\alpha}`)]],
      ask: {
        q: 'Split-phase motor ko starting torque kina kam?',
        voice: 'स्प्लिट फेज मोटरको स्टार्टिङ टर्क किन कम?',
        options: ['α sano (25–30°)', 'Current zero', 'Field ghumdaina'],
        answer: 0,
        why: 'sin 30° = 0.5 matra.',
      },
    },
    {
      say: 'Split-phase motor ko starting torque moderate huncha; yo fan, blower ra washing machine ma prayog huncha.',
      voice: 'स्प्लिट फेज मोटरको स्टार्टिङ टर्क मोडरेट हुन्छ। यो फ्यान, ब्लोअर र वासिङ मेसिनमा प्रयोग हुन्छ।',
      lines: [['idea', <>Moderate starting torque: fans, blowers, washing machines</>]],
    },
  ],
});

export const reluctance72 = duo('Reluctance start motor', {
  draw: relFigure,
  viewBox: '0 0 360 240',
  tutor: [
    {
      say: 'Reluctance start motor ma auxiliary winding nai chaina; salient stator pole ko air gap barabar chaina.',
      voice: 'रिलक्टेन्स स्टार्ट मोटरमा अक्जिलरी वाइन्डिङ नै छैन, सेलियन्ट स्टेटर पोलको एयर ग्याप बराबर छैन।',
      lines: [['h', <>Reluctance start motor</>], ['step', <>No auxiliary winding; salient stator poles with a non-uniform air gap</>]],
    },
    {
      say: 'Pole ko euta bhag ma gap sano, arko bhag ma thulo. Thulo gap ko bhag ko flux kam lag garcha.',
      voice: 'पोलको एउटा भागमा ग्याप सानो, अर्को भागमा ठूलो। ठूलो ग्यापको भागको फ्लक्स कम ल्याग गर्छ।',
      lines: [['step', <>Large-gap part: low inductance, flux lags less · small-gap part: flux lags more</>]],
    },
    {
      say: 'Dui bhag ko flux ma phase farak hunchha, ra field kam gap tira bistarai sarcha: kamjor rotating field.',
      voice: 'दुई भागको फ्लक्समा फेज फरक हुन्छ, र फिल्ड कम ग्यापतिर बिस्तारै सर्छ — कमजोर रोटेटिङ फिल्ड।',
      lines: [['step', <>Phase difference between the two fluxes → field shifts towards the small gap</>]],
      ask: {
        q: 'Reluctance start motor kun disha ma ghumcha?',
        voice: 'रिलक्टेन्स स्टार्ट मोटर कुन दिशामा घुम्छ?',
        options: ['Thulo gap bata sano gap tira', 'Sano gap bata thulo tira', 'Jun disha pani'],
        answer: 0,
        why: 'Field ko shift kam reluctance (sano gap) tira huncha.',
      },
    },
    {
      say: 'Starting torque ati kam, efficiency kam. Tesaile ati sano load: clock, timer, toy.',
      voice: 'स्टार्टिङ टर्क अति कम, इफिसियन्सी कम। त्यसैले अति सानो लोड — क्लक, टाइमर, टोय।',
      lines: [['step', <>Very low starting torque and efficiency: clocks, timers, toys</>]],
    },
    {
      say: 'Direction pole ko aakar le fixed; ulto garna sajilo chaina.',
      voice: 'डाइरेक्सन पोलको आकारले फिक्स्ड, उल्टो गर्न सजिलो छैन।',
      lines: [['idea', <>Direction fixed by pole shape (not easily reversible); simple and cheap</>]],
    },
  ],
  lecturer: [
    {
      say: 'The reluctance start motor has salient stator poles with a non-uniform air gap and no auxiliary winding.',
      voice: 'द रिलक्टेन्स स्टार्ट मोटर ह्याज सेलियन्ट स्टेटर पोल्स विद अ नन युनिफर्म एयर ग्याप एन्ड नो अक्जिलरी वाइन्डिङ।',
      lines: [['h', <>Reluctance start motor</>], ['step', <>Salient stator poles, non-uniform gap</>]],
    },
    {
      say: 'The flux in the larger-gap portion lags less than the flux in the smaller-gap portion.',
      voice: 'द फ्लक्स इन द लार्जर ग्याप पोर्सन ल्याग्स लेस दयान द फ्लक्स इन द स्मलर ग्याप पोर्सन।',
      lines: [['step', <>Large-gap flux lags less</>]],
    },
    {
      say: 'The resulting phase difference shifts the field towards the smaller gap, producing a starting torque.',
      voice: 'द रिजल्टिङ फेज डिफरेन्स सिफ्ट्स द फिल्ड टुवार्ड्स द स्मलर ग्याप, प्रोड्युसिङ अ स्टार्टिङ टर्क।',
      lines: [['step', <>Field shifts towards the smaller gap → starting torque</>]],
      ask: {
        q: 'Reluctance start motor ko main ulmo kamjori k?',
        voice: 'रिलक्टेन्स स्टार्ट मोटरको मुख्य कमजोरी के?',
        options: ['Kam starting torque', 'Thulo copper', 'Dherai noise matra'],
        answer: 0,
        why: 'Phase farak sano: kamjor rotating field.',
      },
    },
    {
      say: 'It has low starting torque and efficiency and is used in clocks, timers and toys.',
      voice: 'इट ह्याज लो स्टार्टिङ टर्क एन्ड इफिसियन्सी एन्ड इज युज्ड इन क्लक्स, टाइमर्स, एन्ड टोयज।',
      lines: [['step', <>Low torque: clocks, timers</>]],
    },
    {
      say: 'Its direction is fixed by the pole shape.',
      voice: 'इट्स डाइरेक्सन इज फिक्स्ड बाइ द पोल सेप।',
      lines: [['step', <>Direction fixed by pole shape</>]],
    },
  ],
});

export const startAnswer72 = answer('Model answer: why a single-phase IM is not self-starting, and starting methods', {
  draw: splitFigure,
  viewBox: '0 0 360 222',
  papers: ['2068 Bhadra', '2071 Chaitra', '2078 Baishakh'],
  q: 'Why single phase induction motor are not self starting? Explain any two starting methods for single phase induction motor.',
  read: {
    say: 'IOE ma tin choti: why are single phase induction motors not self starting? Explain any two starting methods for single phase induction motor.',
    voice: 'आई ओ ईमा तीन चोटि — ह्वाई आर सिङ्गल फेज इन्डक्सन मोटर्स नट सेल्फ स्टार्टिङ? एक्सप्लेन एनी टु स्टार्टिङ मेथड्स फर सिङ्गल फेज इन्डक्सन मोटर।',
  },
  points: [
    {
      node: <><H>Not self-starting</H><Pts items={[<>A single winding gives a pulsating field Φ<sub>m</sub> cos ωt on a fixed axis</>, <>By double field revolving theory it equals two Φ<sub>m</sub>/2 fields rotating oppositely; at standstill their torques are equal and opposite</>, <>∴ net starting torque is zero</>]} /></>,
      say: 'A single winding gives a pulsating field. By double field revolving theory it equals two half fields rotating oppositely, whose torques cancel at standstill. Therefore the starting torque is zero.',
      voice: 'अ सिङ्गल वाइन्डिङ गिभ्स अ पल्सेटिङ फिल्ड। बाइ डबल फिल्ड रिभल्भिङ थ्योरी इट इक्वल्स टु हाफ फिल्ड्स रोटेटिङ अपोजिट्ली, हुज टर्क्स क्यान्सिल एट स्ट्यान्डस्टिल। देयरफोर द स्टार्टिङ टर्क इज जिरो।',
    },
    {
      page: true,
      node: <><H>(1) Split-phase (resistance start)</H><Pts items={[<>Auxiliary winding of high R, low X, 90° in space from the main (Fig. 7.2)</>, <>I<sub>a</sub> lags less than I<sub>m</sub>: α ≈ 25–30° → rotating field; <K>{String.raw`T \propto I_mI_a\sin\alpha`}</K></>, <>Centrifugal switch cuts the auxiliary at ~75 % speed; moderate torque (fans, washing machines)</>]} /></>,
      say: 'Split-phase: an auxiliary winding of high resistance, 90 degrees in space. Its current lags less, alpha about 25 to 30 degrees, giving a rotating field; torque proportional to I m I a sin alpha. A centrifugal switch cuts it at about 75 percent speed.',
      voice: 'स्प्लिट फेज — एन अक्जिलरी वाइन्डिङ अफ हाई रेजिस्टेन्स, नाइन्टी डिग्रिज इन स्पेस। इट्स करेन्ट ल्याग्स लेस, अल्फा अबाउट ट्वेन्टी फाइभ टु थर्टी डिग्रिज, गिभिङ अ रोटेटिङ फिल्ड, टर्क प्रपोर्सनल टु आई एम आई ए साइन अल्फा। अ सेन्ट्रिफ्युगल स्विच कट्स इट एट अबाउट सेभेन्टी फाइभ पर्सेन्ट स्पिड।',
    },
    {
      page: true,
      node: <><H>(2) Capacitor start</H><Pts items={[<>A capacitor C in series with the auxiliary makes I<sub>a</sub> lead V</>, <>α ≈ 80–90° → high starting torque (compressors, pumps)</>, <>Auxiliary and C removed by the centrifugal switch; a run capacitor may be kept (capacitor-start-run)</>]} /></>,
      say: 'Capacitor start: a capacitor in series with the auxiliary makes its current lead, so alpha is about 80 to 90 degrees and the starting torque is high. The switch removes it; a run capacitor may be kept.',
      voice: 'क्यापासिटर स्टार्ट — अ क्यापासिटर इन सिरिज विद द अक्जिलरी मेक्स इट्स करेन्ट लिड, सो अल्फा इज अबाउट असी देखि नब्बे डिग्रिज एन्ड द स्टार्टिङ टर्क इज हाई। द स्विच रिमुभ्स इट, अ रन क्यापासिटर मे बी केप्ट।',
      ask: {
        q: 'Capacitor-start ma starting torque split-phase bhanda kina badhi?',
        voice: 'क्यापासिटर स्टार्टमा स्टार्टिङ टर्क स्प्लिट फेजभन्दा किन बढी?',
        options: ['α lagbhag 90°', 'Current kam', 'Speed badhi'],
        answer: 0,
        why: 'T ∝ sin α: sin 90° = 1, sin 30° = 0.5.',
      },
    },
  ],
});

/* ── 7.3 AC series motor, universal motor ───────────────────────────── */
export const basics73 = duo('7.6 · Basic understanding: why does a mixer motor run so fast?', {
  three: motorTour([
    { shot: 'whole', show: SERIES, ac: true, open: 0.6, spin: 0.9, wiring: 'series', flow: 0.8, field: 0.8, labels: [['mixie ko motor', [0, 3.1, 0.6]]] },
    { shot: 'wiring', ac: true, focus: ['fieldCoil', 'wires', 'armature'], labels: [['eutai line', 'wires']] },
    { focus: ['battery'], labels: [['AC supply', 'battery']] },
    { shot: 'inside', open: 1, push: 1, field: 1, spin: 0.9, focus: ['poles', 'coil'], labels: [['dubai sangai ulto', 'coil']] },
    { push: 1, focus: ['coil'], labels: [['dhakka eutai disha', [2.0, 1.3, 1.8]]] },
    { shot: 'commutator', push: 0, spin: 1, spark: 0.6, focus: ['commutator', 'brushes'], labels: [['brush ma spark', 'brushes']] },
    { spin: 1, spark: 0, focus: ['fan'], labels: [['halka load: dherai chito', 'fan']] },
    { shot: 'whole', open: 0.4, spin: 0.9, focus: null },
  ]),
  tutor: [
    {
      say: 'Mixie, drill, vacuum cleaner: yi motor hajarau rpm ma ghumchan. Bhitra herda DC motor jasto: commutator ra brush!',
      voice: 'मिक्सी, ड्रिल, भ्याकुम क्लिनर — यी मोटर हजारौं आर पी एममा घुम्छन्। भित्र हेर्दा डी सी मोटर जस्तो — कम्युटेटर र ब्रस!',
      lines: [['h', <>7.6 · Mixie kina yati chito?</>], ['step', <>Mixie, drill: commutator + brush bhayeko motor</>]],
    },
    {
      say: 'Field coil ra armature eutai line ma: series motor.',
      voice: 'फिल्ड कोइल र आर्मेचर एउटै लाइनमा — सिरिज मोटर।',
      lines: [['step', <>Field coil + armature eutai line ma (series)</>]],
    },
    {
      say: 'Tara supply ghar ko AC ho, ulto-sulto.',
      voice: 'तर सप्लाई घरको ए सी हो, उल्टो सुल्टो।',
      lines: [part(<>Supply</>, <>AC (ulto-sulto)</>)],
    },
    {
      say: 'AC ulto huda field coil ko magnet ra armature ko current dubai sangai ulto hunchan.',
      voice: 'ए सी उल्टो हुँदा फिल्ड कोइलको म्याग्नेट र आर्मेचरको करेन्ट दुवै सँगै उल्टो हुन्छन्।',
      lines: [['step', <>Magnet ra current dubai sangai ulto</>]],
    },
    {
      say: 'Dubai ulto bhaye dhakka eutai disha ma rahancha. Tesaile AC ra DC dubai ma chalcha: universal motor.',
      voice: 'दुवै उल्टो भए धक्का एउटै दिशामा रहन्छ। त्यसैले ए सी र डी सी दुवैमा चल्छ — युनिभर्सल मोटर।',
      lines: [chain(<>Dubai ulto → dhakka ustai → AC/DC dubai (universal)</>)],
      ask: {
        q: 'Series motor AC ma pani kina eutai disha ma ghumcha?',
        voice: 'सिरिज मोटर ए सीमा पनि किन एउटै दिशामा घुम्छ?',
        options: ['Field ra armature current sangai ulto hunchan', 'AC ulto hudaina', 'Brush le milaucha'],
        answer: 0,
        why: 'Duita chinha ulto: gunda dhakka ko chinha ustai.',
      },
    },
    {
      say: 'AC ma brush ma ali badhi spark ra taato huncha, tesaile brush chadai khiyincha.',
      voice: 'ए सीमा ब्रसमा अलि बढी स्पार्क र तातो हुन्छ, त्यसैले ब्रस चाँडै खिइन्छ।',
      lines: [chain(<>Brush ma spark → chadai khiyincha</>)],
    },
    {
      say: 'Load halka bhaye speed dherai badhcha: mixie khali ghumaye kati chito bhayo, sunnu bhayeko cha?',
      voice: 'लोड हल्का भए स्पिड धेरै बढ्छ — मिक्सी खाली घुमाए कति छिटो भयो, सुन्नु भएको छ?',
      lines: [chain(<>Halka load → dherai chito</>)],
    },
    {
      say: 'Saransha: series motor ma magnet ra current sangai ulto, tesaile AC ma pani chalcha; sano, chito ra thulo dhakka.',
      voice: 'सारांश — सिरिज मोटरमा म्याग्नेट र करेन्ट सँगै उल्टो, त्यसैले ए सीमा पनि चल्छ, सानो, छिटो, र ठूलो धक्का।',
      lines: [['idea', <>Sangai ulto → AC ma pani · sano, chito, thulo dhakka</>]],
    },
  ],
  lecturer: [
    {
      say: 'Mixers, drills ra vacuum cleaners ma commutator bhayeko high-speed motor hunchha.',
      voice: 'मिक्सर्स, ड्रिल्स, र भ्याकुम क्लिनर्समा कम्युटेटर भएको हाई स्पिड मोटर हुन्छ।',
      lines: [['h', <>7.6 · AC series and universal motor</>], ['step', <>High-speed commutator motors</>]],
    },
    {
      say: 'Field winding armature sanga series ma huncha.',
      voice: 'फिल्ड वाइन्डिङ आर्मेचरसँग सिरिजमा हुन्छ।',
      lines: [['step', <>Field in series with the armature</>]],
    },
    {
      say: 'Supply alternating huncha.',
      voice: 'सप्लाई अल्टरनेटिङ हुन्छ।',
      lines: [['step', <>Alternating supply</>]],
    },
    {
      say: 'Current reverse huda field flux ra armature current dubai sangai reverse hunchan.',
      voice: 'करेन्ट रिभर्स हुँदा फिल्ड फ्लक्स र आर्मेचर करेन्ट दुवै सँगै रिभर्स हुन्छन्।',
      lines: [['step', <>Flux and armature current reverse together</>]],
    },
    {
      say: 'Tesaile torque ko direction ustai rahancha; motor AC ra DC dubai ma chalcha.',
      voice: 'त्यसैले टर्कको डाइरेक्सन उस्तै रहन्छ, मोटर ए सी र डी सी दुवैमा चल्छ।',
      lines: [['step', <>Unidirectional torque on AC and DC: universal motor</>]],
      ask: {
        q: 'DC shunt motor AC ma kina ramro chaldaina?',
        voice: 'डी सी सन्ट मोटर ए सीमा किन राम्रो चल्दैन?',
        options: ['Field inductance le flux ra current ko phase farak', 'Shunt ma current chaina', 'Commutator chaina'],
        answer: 0,
        why: 'Shunt field ko thulo inductance le flux armature current bhanda pachhi.',
      },
    },
    {
      say: 'AC ma commutation kharab huncha ra brushes ma sparking badhcha.',
      voice: 'ए सीमा कम्युटेसन खराब हुन्छ, र ब्रसेसमा स्पार्किङ बढ्छ।',
      lines: [['step', <>Poorer commutation, sparking on AC</>]],
    },
    {
      say: 'Series characteristic: light load ma dherai high speed.',
      voice: 'सिरिज क्यारेक्टरिस्टिक — लाइट लोडमा धेरै हाई स्पिड।',
      lines: [part(<>Series characteristic</>, <>very high speed at light load</>)],
    },
    {
      say: 'Saransha: universal motor series motor ho jun AC ra DC dubai ma high speed ra high starting torque dincha.',
      voice: 'सारांश — युनिभर्सल मोटर सिरिज मोटर हो जुन ए सी र डी सी दुवैमा हाई स्पिड र हाई स्टार्टिङ टर्क दिन्छ।',
      lines: [['idea', <>Universal motor: series motor on AC or DC; high speed, high starting torque</>]],
    },
  ],
});

export const series73 = duo('Operation of the AC series motor and universal motor', {
  draw: universalFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Figure 7.3: series field ra armature AC supply ma series. Eutai current i dubai ma.',
      voice: 'फिगर सेभेन पोइन्ट थ्री — सिरिज फिल्ड र आर्मेचर ए सी सप्लाईमा सिरिज। एउटै करेन्ट आई दुवैमा।',
      lines: [['h', <>AC series and universal motor</>], ['step', <>Series field and armature carry the same current i</>]],
    },
    {
      say: 'Flux phi current i sanga in phase. Torque phi i sanga, tesaile i square sanga: sadhai positive.',
      voice: 'फ्लक्स फाइ करेन्ट आई सँग इन फेज। टर्क फाइ आईसँग, त्यसैले आई स्क्वायरसँग — सधैं पोजिटिभ।',
      lines: [['eq', tex(String.raw`\begin{aligned} T &\propto \phi\, i \propto i^2 \\ T_{av} &\propto I^2 \;(>0) \end{aligned}`)]],
    },
    {
      say: 'i equals I m sin omega t bhaye T proportional to I m square sin square omega t: double frequency ma pulsate garcha tara ulto hudaina.',
      voice: 'आई इक्वल्स आई एम साइन ओमेगा टी भए टी प्रपोर्सनल टु आई एम स्क्वायर साइन स्क्वायर ओमेगा टी — डबल फ्रिक्वेन्सीमा पल्सेट गर्छ तर उल्टो हुँदैन।',
      lines: [['eq', tex(String.raw`\begin{aligned} T &\propto I_m^2\sin^2\omega t \\ &= \dfrac{I_m^2}{2}(1 - \cos2\omega t) \end{aligned}`)]],
      ask: {
        q: 'AC series motor ko torque kun frequency ma pulsate garcha?',
        voice: 'ए सी सिरिज मोटरको टर्क कुन फ्रिक्वेन्सीमा पल्सेट गर्छ?',
        options: ['Supply ko dobar (2f)', 'Supply barabar (f)', 'Pulsate gardaina'],
        answer: 0,
        why: 'sin²ωt = (1 − cos 2ωt)/2.',
      },
    },
    {
      say: 'AC ma field ma eddy loss ra reactance drop: field laminated, kam turns, ra armature reaction rokna compensating winding.',
      voice: 'ए सीमा फिल्डमा एडी लस र रियाक्टेन्स ड्रप — फिल्ड ल्यामिनेटेड, कम टर्न्स, र आर्मेचर रियाक्सन रोक्न कम्पेन्सेटिङ वाइन्डिङ।',
      lines: [['step', <>AC design: laminated field, fewer field turns, compensating winding (reduces reactance and sparking)</>]],
    },
    {
      say: 'Universal motor: 1 kW bhanda sano, 20,000 rpm samma; mixie, drill, vacuum cleaner, hair dryer.',
      voice: 'युनिभर्सल मोटर — वान किलोवाटभन्दा सानो, बीस हजार आर पी एमसम्म, मिक्सी, ड्रिल, भ्याकुम क्लिनर, हेयर ड्रायर।',
      lines: [['idea', <>Universal motor: below 1 kW, up to ~20 000 rpm, high starting torque; mixers, drills, vacuum cleaners</>]],
    },
  ],
  lecturer: [
    {
      say: 'In the AC series motor, the field and armature carry the same current, Figure 7.3.',
      voice: 'इन द ए सी सिरिज मोटर, द फिल्ड एन्ड आर्मेचर क्यारी द सेम करेन्ट, फिगर सेभेन पोइन्ट थ्री।',
      lines: [['h', <>Operation</>], ['step', <>Same current in field and armature</>]],
    },
    {
      say: 'Since flux is in phase with current, the torque is proportional to i square, always positive.',
      voice: 'साइन्स फ्लक्स इज इन फेज विद करेन्ट, द टर्क इज प्रपोर्सनल टु आई स्क्वायर, अल्वेज पोजिटिभ।',
      lines: [['eq', tex(String.raw`\begin{aligned} T &\propto \phi\, i \propto i^2 \\ T_{av} &\propto I^2 \;(>0) \end{aligned}`)]],
    },
    {
      say: 'With sinusoidal current the torque pulsates at twice the supply frequency but does not reverse.',
      voice: 'विद साइनसोइडल करेन्ट द टर्क पल्सेट्स एट टुआइस द सप्लाई फ्रिक्वेन्सी बट डज नट रिभर्स।',
      lines: [['eq', tex(String.raw`\begin{aligned} T &\propto I_m^2\sin^2\omega t \\ &= \dfrac{I_m^2}{2}(1 - \cos2\omega t) \end{aligned}`)]],
      ask: {
        q: 'AC series motor ko field core laminated kina?',
        voice: 'ए सी सिरिज मोटरको फिल्ड कोर ल्यामिनेटेड किन?',
        options: ['Alternating flux ko eddy loss ghatauna', 'Weight badhauna', 'DC ma chalauna'],
        answer: 0,
        why: 'AC ma field flux pani alternate huncha.',
      },
    },
    {
      say: 'For AC: a laminated field, fewer field turns, and a compensating winding to reduce reactance and sparking.',
      voice: 'फर ए सी — अ ल्यामिनेटेड फिल्ड, फ्युअर फिल्ड टर्न्स, एन्ड अ कम्पेन्सेटिङ वाइन्डिङ टु रिड्युस रियाक्टेन्स एन्ड स्पार्किङ।',
      lines: [['step', <>Laminated field, fewer turns, compensating winding</>]],
    },
    {
      say: 'Universal motors are small, very high speed, with high starting torque; used in mixers, drills and vacuum cleaners.',
      voice: 'युनिभर्सल मोटर्स आर स्मल, भेरी हाई स्पिड, विद हाई स्टार्टिङ टर्क, युज्ड इन मिक्सर्स, ड्रिल्स, एन्ड भ्याकुम क्लिनर्स।',
      lines: [['step', <>Small, very high speed; mixers, drills, vacuum cleaners</>]],
    },
  ],
});

export const universalAnswer73 = answer('Model answer: operation and applications of the universal motor', {
  draw: universalFigure,
  viewBox: '0 0 360 222',
  papers: ['2079 Jestha', '2073 Chaitra', '2071 Magh'],
  q: 'What is universal motor? Explain its operation and applications.',
  read: {
    say: 'IOE ma tin choti: what is universal motor? Explain its operation and applications.',
    voice: 'आई ओ ईमा तीन चोटि — ह्वाट इज युनिभर्सल मोटर? एक्सप्लेन इट्स अपरेसन एन्ड एप्लिकेसन्स।',
  },
  points: [
    {
      node: <><H>Universal motor</H><Pts items={[<>A series-wound commutator motor that runs on either DC or single-phase AC at about the same speed and output (Fig. 7.3)</>]} /></>,
      say: 'A universal motor is a series-wound commutator motor that runs on DC or single-phase AC at about the same speed and output.',
      voice: 'अ युनिभर्सल मोटर इज अ सिरिज वाउन्ड कम्युटेटर मोटर दयाट रन्स अन डी सी अर सिङ्गल फेज ए सी एट अबाउट द सेम स्पिड एन्ड आउटपुट।',
    },
    {
      node: <><H>Operation</H><Pts items={[<>The field and armature are in series, so the flux φ and current i reverse together on AC</>, <><K>{String.raw`T \propto \phi i \propto i^2`}</K>: the torque stays in one direction, pulsating at 2f</>]} /></>,
      say: 'Field and armature are in series, so the flux and current reverse together on AC. Torque is proportional to i square and stays in one direction, pulsating at twice the frequency.',
      voice: 'फिल्ड एन्ड आर्मेचर आर इन सिरिज, सो द फ्लक्स एन्ड करेन्ट रिभर्स टुगेदर अन ए सी। टर्क इज प्रपोर्सनल टु आई स्क्वायर एन्ड स्टेज इन वान डाइरेक्सन, पल्सेटिङ एट टुआइस द फ्रिक्वेन्सी।',
    },
    {
      node: <><Pts items={[<>Design for AC: laminated stator and field, fewer field turns, compensating winding to cut reactance and sparking</>, <>Series characteristic: high starting torque, speed falls with load, very high no-load speed (keep a load)</>]} /></>,
      say: 'For AC the stator is laminated, field turns are fewer, and a compensating winding cuts reactance and sparking. It has a series characteristic: high starting torque and very high no-load speed.',
      voice: 'फर ए सी द स्टेटर इज ल्यामिनेटेड, फिल्ड टर्न्स आर फ्युअर, एन्ड अ कम्पेन्सेटिङ वाइन्डिङ कट्स रियाक्टेन्स एन्ड स्पार्किङ। इट ह्याज अ सिरिज क्यारेक्टरिस्टिक — हाई स्टार्टिङ टर्क एन्ड भेरी हाई नो लोड स्पिड।',
    },
    {
      page: true,
      node: <><H>Applications</H><Pts items={[<>Mixers and food processors, portable drills, vacuum cleaners, hair dryers, sewing machines, blenders</>, <>Wherever high speed (10 000–20 000 rpm), small size and high starting torque are needed</>]} /></>,
      say: 'Applications: mixers, drills, vacuum cleaners, hair dryers, sewing machines: wherever high speed, small size and high starting torque are needed.',
      voice: 'एप्लिकेसन्स — मिक्सर्स, ड्रिल्स, भ्याकुम क्लिनर्स, हेयर ड्रायर्स, सुइङ मेसिन्स — ह्वेयरएभर हाई स्पिड, स्मल साइज, एन्ड हाई स्टार्टिङ टर्क आर निडेड।',
      ask: {
        q: 'Universal motor ko speed control kasari garincha?',
        voice: 'युनिभर्सल मोटरको स्पिड कन्ट्रोल कसरी गरिन्छ?',
        options: ['Supply voltage badalera (regulator)', 'Pole sankhya badalera', 'Frequency matra badalera'],
        answer: 0,
        why: 'Series motor ko speed voltage sanga sajilai badlincha.',
      },
    },
  ],
});

/* ── 7.4 Stepper, Schrage, servo ──────────────────────────────────────── */
export const basics74 = duo('7.7 · Basic understanding: how does a printer motor stop at an exact position?', {
  three: smallTour([
    { shot: 'front', show: STEP, step: 0, focus: ['stepStator', 'stepCoils'], labels: [['char pole', 'stepStator']] },
    { step: 0, focus: ['stepRotor'], labels: [['magnet rotor', 'stepRotor']] },
    { step: 1, focus: ['stepCoils'], labels: [['arko coil on', 'stepCoils']] },
    { step: 2, focus: ['stepRotor'], labels: [['ek step', 'stepRotor']] },
    { step: 4, focus: ['stepRotor'], labels: [['ganera ghumcha', 'stepRotor']] },
    { show: [...STEP, 'arm', 'sensor'], step: 5, focus: ['arm', 'sensor'], labels: [['servo: sensor', 'sensor']] },
    { step: 5, focus: ['arm'], labels: [['bhaneko thau ma', 'arm']] },
    { shot: 'whole', step: 6, focus: null },
  ]),
  tutor: [
    {
      say: 'Printer, 3D printer, CNC: yi machine haru millimeter-millimeter sarnu parcha. Yaslai stepper motor chahincha.',
      voice: 'प्रिन्टर, थ्री डी प्रिन्टर, सी एन सी — यी मेसिनहरू मिलिमिटर मिलिमिटर सर्नु पर्छ। यसलाई स्टेपर मोटर चाहिन्छ।',
      lines: [['h', <>7.7 · Thik thau ma kasari rokincha?</>], ['step', <>Printer, 3D printer: stepper motor</>]],
    },
    {
      say: 'Bich ma magnet rotor. Stator ka char pole ma coil.',
      voice: 'बीचमा म्याग्नेट रोटर। स्टेटरका चार पोलमा कोइल।',
      lines: [['step', <>Magnet rotor + char pole ma coil</>]],
    },
    {
      say: 'Euta coil on garyo, rotor tyo pole tira pharkincha ra rokincha. Aba arko coil on garau.',
      voice: 'एउटा कोइल अन गर्‍यो, रोटर त्यो पोलतिर फर्किन्छ र रोकिन्छ। अब अर्को कोइल अन गरौं।',
      lines: [chain(<>Coil on → rotor tyo pole tira</>)],
    },
    {
      say: 'Rotor ek step sarcha ra pheri rokincha. Euta pulse, euta step.',
      voice: 'रोटर एक स्टेप सर्छ र फेरि रोकिन्छ। एउटा पल्स, एउटा स्टेप।',
      lines: [chain(<>Euta pulse → euta step</>)],
      ask: {
        q: 'Stepper motor ko rotor kati ghumcha bhanne kasle tay garcha?',
        voice: 'स्टेपर मोटरको रोटर कति घुम्छ भन्ने कसले तय गर्छ?',
        options: ['Pulse ko sankhya', 'Voltage ko size', 'Load'],
        answer: 0,
        why: 'Har pulse ma euta fixed step.',
      },
    },
    {
      say: 'Jati pulse, utti step: ganera ghumcha, sensor bina pani thik thau ma pugcha.',
      voice: 'जति पल्स, उति स्टेप — गनेर घुम्छ, सेन्सर बिना पनि ठिक ठाउँमा पुग्छ।',
      lines: [chain(<>Jati pulse, utti step → ganera ghumcha</>)],
    },
    {
      say: 'Servo motor arkai tarika: sensor le shaft kaha cha bhanera hercha ra farak bhaye sudharcha.',
      voice: 'सर्भो मोटर अर्कै तरिका — सेन्सरले सफ्ट कहाँ छ भनेर हेर्छ, र फरक भए सुधार्छ।',
      lines: [part(<>Servo</>, <>sensor le check → sudharcha (feedback)</>)],
    },
    {
      say: 'Tesaile servo bhaneko thau ma chito ra thik pugcha: robot ko haat, drone, RC car.',
      voice: 'त्यसैले सर्भो भनेको ठाउँमा छिटो र ठिक पुग्छ — रोबटको हात, ड्रोन, आर सी कार।',
      lines: [part(<>Servo</>, <>robot, drone, RC car</>)],
    },
    {
      say: 'Saransha: stepper pulse ganera step-step jancha; servo sensor le hera-hera milaucha; Schrage motor chai brush bata speed milaune purano AC motor.',
      voice: 'सारांश — स्टेपर पल्स गनेर स्टेप स्टेप जान्छ, सर्भो सेन्सरले हेरी हेरी मिलाउँछ, स्राग मोटर चाहिँ ब्रसबाट स्पिड मिलाउने पुरानो ए सी मोटर।',
      lines: [['idea', <>Stepper: pulse ganera · servo: sensor le milaune · Schrage: brush le speed milaune</>]],
    },
  ],
  lecturer: [
    {
      say: 'Precise positioning chahine machines ma stepper motor prayog hunchha.',
      voice: 'प्रिसाइज पोजिसनिङ चाहिने मेसिन्समा स्टेपर मोटर प्रयोग हुन्छ।',
      lines: [['h', <>7.7 · Special purpose machines</>], part(<>Stepper motor</>, <>precise positioning</>)],
    },
    {
      say: 'Stator ma phase windings bhayeka poles ra rotor ma permanent magnet wa soft iron.',
      voice: 'स्टेटरमा फेज वाइन्डिङ्स भएका पोल्स र रोटरमा पर्मानेन्ट म्याग्नेट वा सफ्ट आइरन।',
      lines: [['step', <>Stator phases; PM or variable-reluctance rotor</>]],
    },
    {
      say: 'Euta phase excite garda rotor minimum reluctance position ma align huncha.',
      voice: 'एउटा फेज एक्साइट गर्दा रोटर मिनिमम रिलक्टेन्स पोजिसनमा एलाइन हुन्छ।',
      lines: [part(<>Excited phase</>, <>rotor aligns</>)],
    },
    {
      say: 'Arko phase excite garda rotor euta step angle le ghumcha.',
      voice: 'अर्को फेज एक्साइट गर्दा रोटर एउटा स्टेप एङ्गलले घुम्छ।',
      lines: [chain(<>Next phase → one step</>)],
      ask: {
        q: 'Stepper motor ko speed kasle tay garcha?',
        voice: 'स्टेपर मोटरको स्पिड कसले तय गर्छ?',
        options: ['Pulse frequency', 'Pulse amplitude', 'Load'],
        answer: 0,
        why: 'Steps per second = pulse rate.',
      },
    },
    {
      say: 'Total rotation pulses ko sankhya sanga proportional; open loop ma position control.',
      voice: 'टोटल रोटेसन पल्सेसको संख्यासँग प्रपोर्सनल, ओपन लुपमा पोजिसन कन्ट्रोल।',
      lines: [['step', <>Angle follows the number of pulses: open-loop control</>]],
    },
    {
      say: 'Servo motor closed-loop system ma feedback sensor sanga kaam garcha.',
      voice: 'सर्भो मोटर क्लोज्ड लुप सिस्टममा फिडब्याक सेन्सरसँग काम गर्छ।',
      lines: [part(<>Servo motor</>, <>closed loop with feedback</>)],
    },
    {
      say: 'Yasle error signal anusar position wa speed accurately control garcha.',
      voice: 'यसले एरर सिग्नल अनुसार पोजिसन वा स्पिड एक्युरेट्ली कन्ट्रोल गर्छ।',
      lines: [chain(<>Error signal → accurate position or speed</>)],
    },
    {
      say: 'Saransha: stepper open loop, servo closed loop, ra Schrage motor brush shifting bata speed control garne AC commutator motor.',
      voice: 'सारांश — स्टेपर ओपन लुप, सर्भो क्लोज्ड लुप, र स्राग मोटर ब्रस सिफ्टिङबाट स्पिड कन्ट्रोल गर्ने ए सी कम्युटेटर मोटर।',
      lines: [['idea', <>Stepper: open loop · servo: closed loop · Schrage: brush-shift speed control</>]],
    },
  ],
});

export const stepper74 = duo('Stepper motor: construction, working and step angle', {
  draw: stepperFigure,
  viewBox: '0 0 360 225',
  tutor: [
    {
      say: 'Figure 7.4: stator ma A, B, A dash, B dash poles, pratyek ma coil. Rotor permanent magnet.',
      voice: 'फिगर सेभेन पोइन्ट फोर — स्टेटरमा ए, बी, ए ड्यास, बी ड्यास पोल्स, प्रत्येकमा कोइल। रोटर पर्मानेन्ट म्याग्नेट।',
      lines: [['h', <>Stepper motor</>], ['step', <>Stator poles A, B, A′, B′ with windings; PM rotor</>]],
    },
    {
      say: 'Rotor N ra S; phase A on huda rotor A tira align.',
      voice: 'रोटर एन र एस, फेज ए अन हुँदा रोटर ए तिर एलाइन।',
      lines: [['step', <>Phase A on: rotor aligns with A</>]],
    },
    {
      say: 'Phase A off, B on: rotor 90 degree ghumera B tira. Pulse sequence A, B, A dash, B dash.',
      voice: 'फेज ए अफ, बी अन — रोटर नाइन्टी डिग्री घुमेर बी तिर। पल्स सिक्वेन्स ए, बी, ए ड्यास, बी ड्यास।',
      lines: [['step', <>A → B → A′ → B′: one step per pulse; sequence reversed → direction reversed</>]],
    },
    {
      say: 'Step angle beta equals 360 over m N r: m phases, N r rotor teeth wa poles.',
      voice: 'स्टेप एङ्गल बिटा इक्वल्स थ्री सिक्स्टी ओभर एम एन आर — एम फेजेस, एन आर रोटर टिथ वा पोल्स।',
      lines: [['eq', tex(String.raw`\boxed{\beta = \dfrac{360^\circ}{m\,N_r}}, \quad \text{steps/rev} = \dfrac{360^\circ}{\beta}`)]],
      ask: {
        q: '4-phase, 50 rotor teeth ko stepper ko step angle kati?',
        voice: 'फोर फेज, फिफ्टी रोटर टिथको स्टेपरको स्टेप एङ्गल कति?',
        options: ['1.8°', '7.2°', '0.9°'],
        answer: 0,
        why: 'β = 360/(4 × 50) = 1.8°.',
      },
    },
    {
      say: 'Types: variable reluctance, permanent magnet ra hybrid. Speed pulse rate le, angle pulse sankhya le.',
      voice: 'टाइप्स — भेरिएबल रिलक्टेन्स, पर्मानेन्ट म्याग्नेट, र हाइब्रिड। स्पिड पल्स रेटले, एङ्गल पल्स संख्याले।',
      lines: [['idea', <>Types: variable reluctance, PM, hybrid · angle ∝ number of pulses, speed ∝ pulse rate (printers, CNC, robots)</>]],
    },
  ],
  lecturer: [
    {
      say: 'The stator has salient poles A, B, A dash, B dash with windings; the rotor is a permanent magnet, Figure 7.4.',
      voice: 'द स्टेटर ह्याज सेलियन्ट पोल्स ए, बी, ए ड्यास, बी ड्यास विद वाइन्डिङ्स, द रोटर इज अ पर्मानेन्ट म्याग्नेट, फिगर सेभेन पोइन्ट फोर।',
      lines: [['h', <>Stepper motor</>], ['step', <>Stator phases A, B; PM rotor</>]],
    },
    {
      say: 'When phase A is excited the rotor aligns with A.',
      voice: 'ह्वेन फेज ए इज एक्साइटेड द रोटर एलाइन्स विद ए।',
      lines: [['step', <>Phase A excited: rotor aligns</>]],
    },
    {
      say: 'Exciting the phases in sequence moves the rotor one step per pulse; reversing the sequence reverses the direction.',
      voice: 'एक्साइटिङ द फेजेस इन सिक्वेन्स मुभ्स द रोटर वान स्टेप पर पल्स, रिभर्सिङ द सिक्वेन्स रिभर्सेज द डाइरेक्सन।',
      lines: [['step', <>One step per pulse; sequence sets direction</>]],
    },
    {
      say: 'The step angle is 360 degrees over m N r.',
      voice: 'द स्टेप एङ्गल इज थ्री सिक्स्टी डिग्रिज ओभर एम एन आर।',
      lines: [['eq', tex(String.raw`\boxed{\beta = \dfrac{360^\circ}{m\,N_r}}, \quad \text{steps/rev} = \dfrac{360^\circ}{\beta}`)]],
      ask: {
        q: '1.8° step angle ko stepper ma ek revolution ma kati step?',
        voice: 'वान पोइन्ट एट डिग्री स्टेप एङ्गलको स्टेपरमा एक रिभोल्युसनमा कति स्टेप?',
        options: ['200', '180', '360'],
        answer: 0,
        why: '360/1.8 = 200.',
      },
    },
    {
      say: 'Types are variable reluctance, permanent magnet and hybrid; used in printers, CNC and robots.',
      voice: 'टाइप्स आर भेरिएबल रिलक्टेन्स, पर्मानेन्ट म्याग्नेट, एन्ड हाइब्रिड, युज्ड इन प्रिन्टर्स, सी एन सी, एन्ड रोबट्स।',
      lines: [['step', <>VR, PM, hybrid · printers, CNC, robots</>]],
    },
  ],
});

export const servo74 = duo('Servo motor and Schrage motor', {
  draw: stepperFigure,
  viewBox: '0 0 360 225',
  tutor: [
    {
      say: 'Servo system: command, amplifier, motor ra feedback sensor. Sensor le actual position amplifier lai pharkaucha.',
      voice: 'सर्भो सिस्टम — कमान्ड, एम्प्लिफायर, मोटर, र फिडब्याक सेन्सर। सेन्सरले एक्चुअल पोजिसन एम्प्लिफायरलाई फर्काउँछ।',
      lines: [['h', <>Servo motor</>], ['step', <>Closed loop: command → amplifier → motor → sensor feedback</>]],
    },
    {
      say: 'Error equals command minus actual. Error jati, utti voltage motor lai; error zero bhaye motor rokincha.',
      voice: 'एरर इक्वल्स कमान्ड माइनस एक्चुअल। एरर जति, उति भोल्टेज मोटरलाई, एरर जिरो भए मोटर रोकिन्छ।',
      lines: [['step', <>Error = command − actual; motor driven until error is zero</>]],
    },
    {
      say: 'AC servo: two-phase, rotor ko resistance dherai, sano diameter ra lamo: inertia kam, chito response.',
      voice: 'ए सी सर्भो — टु फेज, रोटरको रेजिस्टेन्स धेरै, सानो डायमिटर र लामो — इनर्सिया कम, छिटो रेस्पोन्स।',
      lines: [['step', <>AC servo: two-phase (reference + control winding), high-resistance rotor, long and thin (low inertia)</>]],
      ask: {
        q: 'Servo motor lamo ra patlo kina banaincha?',
        voice: 'सर्भो मोटर लामो र पातलो किन बनाइन्छ?',
        options: ['Inertia kam garna, chito response', 'Dherai power dina', 'Sasto banauna'],
        answer: 0,
        why: 'Sano diameter: kam inertia, chito start-stop.',
      },
    },
    {
      say: 'DC servo: separately excited wa PM, armature voltage le control. Robot, antenna, CNC ma.',
      voice: 'डी सी सर्भो — सेपरेट्ली एक्साइटेड वा पी एम, आर्मेचर भोल्टेजले कन्ट्रोल। रोबट, एन्टेना, सी एन सीमा।',
      lines: [['step', <>DC servo: armature-controlled; robots, antennas, CNC</>]],
    },
    {
      say: 'Schrage motor: rotor-fed three-phase commutator motor; brush ko gap badalera speed ra pf smooth control garcha. Textile ra printing ma.',
      voice: 'स्राग मोटर — रोटर फेड थ्री फेज कम्युटेटर मोटर, ब्रसको ग्याप बदलेर स्पिड र पी एफ स्मुथ कन्ट्रोल गर्छ। टेक्सटाइल र प्रिन्टिङमा।',
      lines: [['idea', <>Schrage: rotor-fed 3-phase commutator motor; moving brush sets speed above or below N<sub>s</sub> and improves pf (textile, printing)</>]],
    },
  ],
  lecturer: [
    {
      say: 'A servo motor works in a closed loop with an amplifier and a feedback sensor, Figure 7.4.',
      voice: 'अ सर्भो मोटर वर्क्स इन अ क्लोज्ड लुप विद एन एम्प्लिफायर एन्ड अ फिडब्याक सेन्सर, फिगर सेभेन पोइन्ट फोर।',
      lines: [['h', <>Servo and Schrage motors</>], ['step', <>Closed-loop servo system</>]],
    },
    {
      say: 'The error between command and actual position drives the motor until it becomes zero.',
      voice: 'द एरर बिट्विन कमान्ड एन्ड एक्चुअल पोजिसन ड्राइभ्स द मोटर अन्टिल इट बिकम्स जिरो।',
      lines: [['step', <>Error-driven until zero</>]],
    },
    {
      say: 'An AC servo motor is a two-phase motor with a high-resistance rotor of small diameter and long length, for low inertia.',
      voice: 'एन ए सी सर्भो मोटर इज अ टु फेज मोटर विद अ हाई रेजिस्टेन्स रोटर अफ स्मल डायमिटर एन्ड लङ लेन्थ, फर लो इनर्सिया।',
      lines: [['step', <>AC servo: two-phase, high-R rotor, low inertia</>]],
      ask: {
        q: 'AC servo motor ko rotor resistance badhi kina?',
        voice: 'ए सी सर्भो मोटरको रोटर रेजिस्टेन्स बढी किन?',
        options: ['Linear torque-speed ra stability', 'Badhi speed', 'Kam loss'],
        answer: 0,
        why: 'High R/X le T-N curve linear ra negative slope.',
      },
    },
    {
      say: 'DC servo motors are armature-controlled and used in robots and CNC machines.',
      voice: 'डी सी सर्भो मोटर्स आर आर्मेचर कन्ट्रोल्ड एन्ड युज्ड इन रोबट्स एन्ड सी एन सी मेसिन्स।',
      lines: [['step', <>DC servo: armature control</>]],
    },
    {
      say: 'The Schrage motor is a rotor-fed three-phase commutator motor whose speed and power factor are controlled by shifting brushes.',
      voice: 'द स्राग मोटर इज अ रोटर फेड थ्री फेज कम्युटेटर मोटर हुज स्पिड एन्ड पावर फ्याक्टर आर कन्ट्रोल्ड बाइ सिफ्टिङ ब्रसेस।',
      lines: [['step', <>Schrage: brush-shift speed and pf control</>]],
    },
  ],
});

export const stepperAnswer74 = answer('Model answer: principle of the stepper motor and servo motor', {
  draw: stepperFigure,
  viewBox: '0 0 360 225',
  papers: ['2068 Bhadra', '2075 Baishakh', '2069 Bhadra'],
  q: 'Explain the operating principle of stepper motor and servo motor.',
  read: {
    say: 'IOE ma tin choti: explain the operating principle of stepper motor and servo motor.',
    voice: 'आई ओ ईमा तीन चोटि — एक्सप्लेन द अपरेटिङ प्रिन्सिपल अफ स्टेपर मोटर एन्ड सर्भो मोटर।',
  },
  points: [
    {
      node: <><H>Stepper motor</H><Pts items={[<>A digital (pulse-driven) motor: each input pulse turns the shaft through a fixed step angle</>, <>Stator: salient poles with phase windings A, B, …; rotor: PM or soft-iron toothed (Fig. 7.4)</>]} /></>,
      say: 'A stepper motor is pulse-driven: each pulse turns the shaft through a fixed step angle. The stator has salient poles with phase windings; the rotor is a permanent magnet or soft-iron toothed.',
      voice: 'अ स्टेपर मोटर इज पल्स ड्रिभन — इच पल्स टर्न्स द सफ्ट थ्रु अ फिक्स्ड स्टेप एङ्गल। द स्टेटर ह्याज सेलियन्ट पोल्स विद फेज वाइन्डिङ्स, द रोटर इज अ पर्मानेन्ट म्याग्नेट अर सफ्ट आइरन टुथ्ड।',
    },
    {
      node: <><Pts items={[<>Exciting phase A aligns the rotor with A (minimum reluctance); switching to B moves it one step</>, <><K>{String.raw`\beta = \dfrac{360^\circ}{m N_r}`}</K>; angle ∝ number of pulses, speed ∝ pulse rate</>, <>Uses: printers, CNC, 3D printers, robots (open-loop positioning)</>]} /></>,
      say: 'Exciting A aligns the rotor with A; switching to B moves one step. Step angle is 360 over m N r; angle follows the number of pulses and speed the pulse rate. Used in printers, CNC and robots.',
      voice: 'एक्साइटिङ ए एलाइन्स द रोटर विद ए, स्विचिङ टु बी मुभ्स वान स्टेप। स्टेप एङ्गल इज थ्री सिक्स्टी ओभर एम एन आर, एङ्गल फलोज द नम्बर अफ पल्सेस एन्ड स्पिड द पल्स रेट। युज्ड इन प्रिन्टर्स, सी एन सी, एन्ड रोबट्स।',
    },
    {
      page: true,
      node: <><H>Servo motor</H><Pts items={[<>A motor in a closed-loop system: command → amplifier → motor → load, with a feedback sensor (potentiometer, encoder)</>, <>Error = command − actual; the amplified error drives the motor until the error is zero</>]} /></>,
      say: 'A servo motor works in a closed loop: command, amplifier, motor and a feedback sensor. The amplified error drives the motor until the error is zero.',
      voice: 'अ सर्भो मोटर वर्क्स इन अ क्लोज्ड लुप — कमान्ड, एम्प्लिफायर, मोटर, एन्ड अ फिडब्याक सेन्सर। द एम्प्लिफाइड एरर ड्राइभ्स द मोटर अन्टिल द एरर इज जिरो।',
    },
    {
      node: <><Pts items={[<>AC servo: two-phase, fixed reference winding + control winding; high-resistance, small-diameter rotor for low inertia and a linear torque-speed curve</>, <>DC servo: armature-controlled; uses: robots, antennas, CNC, aircraft controls</>]} /></>,
      say: 'AC servo: two-phase with reference and control windings, and a high-resistance, small-diameter rotor for low inertia. DC servo: armature-controlled. Uses: robots, antennas, CNC.',
      voice: 'ए सी सर्भो — टु फेज विद रेफरेन्स एन्ड कन्ट्रोल वाइन्डिङ्स, एन्ड अ हाई रेजिस्टेन्स, स्मल डायमिटर रोटर फर लो इनर्सिया। डी सी सर्भो — आर्मेचर कन्ट्रोल्ड। युजेज — रोबट्स, एन्टेनाज, सी एन सी।',
      ask: {
        q: 'Stepper ra servo ko mukhya farak k?',
        voice: 'स्टेपर र सर्भोको मुख्य फरक के?',
        options: ['Stepper open loop, servo closed loop', 'Stepper AC matra', 'Servo ma motor hudaina'],
        answer: 0,
        why: 'Servo ma feedback sensor huncha.',
      },
    },
  ],
});

/* ── 7.1 Construction and characteristics: what is inside, how it runs ─ */
export const basicsCons71 = duo('7.1 · Basic understanding: what is inside a single-phase induction motor?', {
  three: smallTour([
    { shot: 'whole', show: SPF, spin: 0.3, focus: ['frame'], labels: [['frame', 'frame']] },
    { shot: 'front', focus: ['stator'], labels: [['stator', 'stator']] },
    { flow: 0.6, focus: ['main', 'supply'], labels: [['main winding', 'main']] },
    { focus: ['cage', 'rotorCore'], labels: [['cage rotor', 'cage']] },
    { show: [...SPF, 'aux'], focus: ['aux'], labels: [['aux winding', 'aux']] },
    { show: SPF, spin: 0.75, spinMs: 2500, focus: ['cage', 'shaft'], labels: [['speed lagbhag ustai', 'shaft']] },
    { shot: 'whole', spin: 0.75, focus: null },
  ]),
  tutor: [
    {
      say: 'Ghar ko fan, pump ra fridge ma single-phase induction motor huncha. Bahira falam ko frame cha.',
      voice: 'घरको फ्यान, पम्प र फ्रिजमा सिंगल फेज इन्डक्सन मोटर हुन्छ। बाहिर फलामको फ्रेम छ।',
      lines: [['h', <>7.1 · Single-phase motor bhitra k cha?</>], part(<>Frame</>, <>bahiri khol</>)],
    },
    {
      say: 'Frame bhitra patla pata jodeko stator cha, jasko khalda ma winding rakhincha.',
      voice: 'फ्रेमभित्र पातला पाता जोडेको स्टेटर छ, जसको खाल्डामा वाइन्डिङ राखिन्छ।',
      lines: [part(<>Stator</>, <>patla pata jodeko, khalda ma winding</>)],
    },
    {
      say: 'Stator ma main winding huncha, jun ghar ko single-phase supply ma jodincha.',
      voice: 'स्टेटरमा मेन वाइन्डिङ हुन्छ, जुन घरको सिंगल फेज सप्लाईमा जोडिन्छ।',
      lines: [part(<>Main winding</>, <>single-phase supply ma jodincha</>)],
    },
    {
      say: 'Bich ma cage rotor cha: falam ko drum ma aluminium ka dandi, dubai chheu ring le jodeko.',
      voice: 'बीचमा केज रोटर छ — फलामको ड्रममा एल्युमिनियमका डन्डी, दुवै छेउ रिङले जोडेको।',
      lines: [part(<>Cage rotor</>, <>dandi ra ring, tar le najodeko</>)],
    },
    {
      say: 'Start garna dosro aux winding pani huncha. Yasko kaam arko topic ma herchau.',
      voice: 'स्टार्ट गर्न दोस्रो अक्स वाइन्डिङ पनि हुन्छ। यसको काम अर्को टपिकमा हेर्छौं।',
      lines: [part(<>Aux winding</>, <>start garna sahayog</>)],
    },
    {
      say: 'Chalisakepachi load badhda pani speed thorai matra ghatcha. Tara power factor ra efficiency three-phase motor bhanda kam huncha.',
      voice: 'चलिसकेपछि लोड बढ्दा पनि स्पिड थोरै मात्र घट्छ। तर पावर फ्याक्टर र इफिसियन्सी, थ्री फेज मोटरभन्दा कम हुन्छ।',
      lines: [chain(<>Load badhyo → speed thorai ghatyo · pf ra efficiency kam</>)],
      ask: {
        q: 'Single-phase induction motor ko speed load sanga kasto huncha?',
        voice: 'सिंगल फेज इन्डक्सन मोटरको स्पिड लोडसँग कस्तो हुन्छ?',
        options: ['Lagbhag constant, thorai ghatcha', 'Dherai badhcha', 'Zero huncha'],
        answer: 0,
        why: 'Induction motor jastai slip sano huncha, tesaile speed lagbhag constant.',
      },
    },
    {
      say: 'Saransh: frame, stator, main winding, cage rotor ra aux winding; speed lagbhag ustai, tara pf ra efficiency kam.',
      voice: 'सारांश — फ्रेम, स्टेटर, मेन वाइन्डिङ, केज रोटर र अक्स वाइन्डिङ। स्पिड लगभग उस्तै, तर पी एफ र इफिसियन्सी कम।',
      lines: [['idea', <>Frame · stator · main winding · cage rotor · aux winding</>]],
    },
  ],
  lecturer: [
    {
      say: 'Single-phase induction motor fractional kilowatt range ma ghar ra office ma prayog huncha; outer frame le support dincha.',
      voice: 'सिंगल फेज इन्डक्सन मोटर, फ्र्याक्सनल किलोवाट रेन्जमा घर र अफिसमा प्रयोग हुन्छ। आउटर फ्रेमले सपोर्ट दिन्छ।',
      lines: [['h', <>7.1 · Construction</>], part(<>Frame</>, <>mechanical support</>)],
    },
    {
      say: 'Stator laminated huncha ra slot ma winding rakhincha.',
      voice: 'स्टेटर ल्यामिनेटेड हुन्छ, र स्लटमा वाइन्डिङ राखिन्छ।',
      lines: [part(<>Stator</>, <>laminated, slotted</>)],
    },
    {
      say: 'Main winding single-phase supply ma jodincha ra pulsating flux banauncha.',
      voice: 'मेन वाइन्डिङ सिंगल फेज सप्लाईमा जोडिन्छ, र पल्सेटिङ फ्लक्स बनाउँछ।',
      lines: [part(<>Main (running) winding</>, <>connected to the supply</>)],
    },
    {
      say: 'Rotor squirrel cage type ko huncha.',
      voice: 'रोटर स्क्विरल केज टाइपको हुन्छ।',
      lines: [part(<>Rotor</>, <>squirrel cage</>)],
    },
    {
      say: 'Starting ko lagi auxiliary winding huncha, jun main winding sanga space ma 90 degree farak ma rakhincha.',
      voice: 'स्टार्टिङको लागि अक्जिलरी वाइन्डिङ हुन्छ, जुन मेन वाइन्डिङसँग स्पेसमा नब्बे डिग्री फरकमा राखिन्छ।',
      lines: [part(<>Auxiliary winding</>, <>for starting, 90° in space from the main</>)],
    },
    {
      say: 'Characteristic: speed lagbhag constant, tara power factor, efficiency ra starting torque three-phase motor bhanda kam.',
      voice: 'क्यारेक्टरिस्टिक — स्पिड लगभग कन्स्टेन्ट, तर पावर फ्याक्टर, इफिसियन्सी र स्टार्टिङ टर्क, थ्री फेज मोटरभन्दा कम।',
      lines: [chain(<>Nearly constant speed · lower pf, efficiency and starting torque</>)],
      ask: {
        q: 'Single-phase induction motor ko power factor three-phase motor bhanda kasto huncha?',
        voice: 'सिंगल फेज इन्डक्सन मोटरको पावर फ्याक्टर, थ्री फेज मोटरभन्दा कस्तो हुन्छ?',
        options: ['Kam', 'Badhi', 'Barabar'],
        answer: 0,
        why: 'Pulsating flux ra backward field le magnetising current ra losses badhauchan.',
      },
    },
    {
      say: 'Saransh: frame, laminated stator, main ra auxiliary winding, ra cage rotor.',
      voice: 'सारांश — फ्रेम, ल्यामिनेटेड स्टेटर, मेन र अक्जिलरी वाइन्डिङ, र केज रोटर।',
      lines: [['idea', <>Frame · stator · main + auxiliary windings · cage rotor</>]],
    },
  ],
});

/* ── 7.4 Capacitor start and run motor ──────────────────────────────── */
export const basicsCap74 = duo('7.4 · Basic understanding: what does the capacitor do in a fan motor?', {
  three: smallTour([
    { shot: 'front', show: [...SPF, 'aux'], flow: 0.6, focus: ['aux'], labels: [['aux winding', 'aux']] },
    { shot: 'cap', show: [...SPF, 'aux', 'capacitor'], rot: 1, focus: ['capacitor'], labels: [['capacitor', 'capacitor']] },
    { rot: 1, spin: 0.5, spinMs: 2500, focus: ['cage'], labels: [['balio suru', 'cage']] },
    { shot: 'switch', spin: 0.8, focus: ['switch'], labels: [['start capacitor hatyo', 'switch']] },
    { shot: 'front', rot: 1, spin: 0.8, focus: ['capacitor', 'aux'], labels: [['run capacitor sadhai', 'capacitor']] },
    { shot: 'whole', rot: 1, spin: 0.8, focus: null },
  ]),
  tutor: [
    {
      say: 'Aux winding ma capacitor jodiyo bhane tesko current main winding bhanda aghi pugcha.',
      voice: 'अक्स वाइन्डिङमा क्यापासिटर जोडियो भने, त्यसको करेन्ट मेन वाइन्डिङभन्दा अघि पुग्छ।',
      lines: [['h', <>7.4 · Capacitor ko kaam</>], part(<>Capacitor</>, <>aux ko current aghi pathaucha</>)],
    },
    {
      say: 'Dui winding ko current ma lagbhag aadha chakkar ko aadha jati farak hunda field ramro sanga ghumcha.',
      voice: 'दुई वाइन्डिङको करेन्टमा ठूलो समय फरक हुँदा, फिल्ड राम्रोसँग घुम्छ।',
      lines: [chain(<>Current ma thulo farak → field ramro ghumcha</>)],
    },
    {
      say: 'Yesaile capacitor-start motor ko suru ko dhakka dherai balio huncha: pump ra compressor ma.',
      voice: 'यसैले क्यापासिटर स्टार्ट मोटरको सुरुको धक्का धेरै बलियो हुन्छ — पम्प र कम्प्रेसरमा।',
      lines: [chain(<>Balio suru ko dhakka → pump, compressor</>)],
    },
    {
      say: 'Speed pugepachi centrifugal switch le start capacitor hatauncha.',
      voice: 'स्पिड पुगेपछि सेन्ट्रिफ्युगल स्विचले स्टार्ट क्यापासिटर हटाउँछ।',
      lines: [part(<>Centrifugal switch</>, <>speed pugepachi start capacitor hatauncha</>)],
    },
    {
      say: 'Capacitor-run motor ma sano capacitor sadhai jodiyeko rahancha: chup, smooth ra ramro power factor. Ceiling fan ma yahi.',
      voice: 'क्यापासिटर रन मोटरमा सानो क्यापासिटर सधैं जोडिएको रहन्छ — चुप, स्मुथ, र राम्रो पावर फ्याक्टर। सिलिङ फ्यानमा यही।',
      lines: [chain(<>Run capacitor sadhai → chup, smooth, ramro pf (ceiling fan)</>)],
      ask: {
        q: 'Ceiling fan ma capacitor kina sadhai jodiyeko huncha?',
        voice: 'सिलिङ फ्यानमा क्यापासिटर किन सधैं जोडिएको हुन्छ?',
        options: ['Smooth chalai ra ramro power factor ko lagi', 'Speed zero garna', 'Voltage badhauna'],
        answer: 0,
        why: 'Run capacitor le field lagatar ghumirakhcha, tesaile smooth ra ramro pf.',
      },
    },
    {
      say: 'Saransh: start capacitor le balio suru, run capacitor le smooth chalai.',
      voice: 'सारांश — स्टार्ट क्यापासिटरले बलियो सुरु, रन क्यापासिटरले स्मुथ चलाइ।',
      lines: [['idea', <>Start capacitor: strong start · run capacitor: smooth running</>]],
    },
  ],
  lecturer: [
    {
      say: 'Auxiliary winding sanga series ma capacitor jodda auxiliary current supply voltage lai lead garcha.',
      voice: 'अक्जिलरी वाइन्डिङसँग सिरिजमा क्यापासिटर जोड्दा, अक्जिलरी करेन्ट सप्लाई भोल्टेजलाई लिड गर्छ।',
      lines: [['h', <>7.4 · Capacitor motors</>], part(<>Capacitor</>, <>makes the auxiliary current lead</>)],
    },
    {
      say: 'Main ra auxiliary current bich phase difference lagbhag 90 degree hunchha, ra rotating field ramro banchha.',
      voice: 'मेन र अक्जिलरी करेन्टबीच फेज डिफरेन्स लगभग नब्बे डिग्री हुन्छ, र रोटेटिङ फिल्ड राम्रो बन्छ।',
      lines: [chain(<>Phase difference near 90° → good rotating field</>)],
    },
    {
      say: 'Phalswarup capacitor-start motor ko starting torque ucho huncha.',
      voice: 'फलस्वरूप क्यापासिटर स्टार्ट मोटरको स्टार्टिङ टर्क उच्च हुन्छ।',
      lines: [chain(<>High starting torque: pumps, compressors</>)],
    },
    {
      say: 'Rated speed ko lagbhag 75 percent ma centrifugal switch le start capacitor disconnect garcha.',
      voice: 'रेटेड स्पिडको लगभग पचहत्तर प्रतिशतमा, सेन्ट्रिफ्युगल स्विचले स्टार्ट क्यापासिटर डिस्कनेक्ट गर्छ।',
      lines: [part(<>Centrifugal switch</>, <>opens near 75 % of rated speed</>)],
    },
    {
      say: 'Capacitor-start capacitor-run motor ma run capacitor circuit mai rahancha, jasle power factor ra efficiency sudharcha.',
      voice: 'क्यापासिटर स्टार्ट क्यापासिटर रन मोटरमा, रन क्यापासिटर सर्किटमै रहन्छ, जसले पावर फ्याक्टर र इफिसियन्सी सुधार्छ।',
      lines: [chain(<>Run capacitor stays → better pf and efficiency, quiet</>)],
      ask: {
        q: 'Capacitor-start motor ma centrifugal switch ko kaam k ho?',
        voice: 'क्यापासिटर स्टार्ट मोटरमा सेन्ट्रिफ्युगल स्विचको काम के हो?',
        options: ['Speed pugepachi start capacitor ra auxiliary hataunu', 'Main winding hataunu', 'Speed badhaunu'],
        answer: 0,
        why: 'Starting pachi auxiliary circuit chahidaina, tesaile switch le khuldincha.',
      },
    },
    {
      say: 'Saransh: start capacitor le starting torque, run capacitor le running performance sudharcha.',
      voice: 'सारांश — स्टार्ट क्यापासिटरले स्टार्टिङ टर्क, रन क्यापासिटरले रनिङ पर्फर्मेन्स सुधार्छ।',
      lines: [['idea', <>Start capacitor: starting torque · run capacitor: running performance</>]],
    },
  ],
});

// splitFigure: 0 main · 1 auxiliary + switch · 2 capacitor · 3 phasors · 4 T ∝ Im Ia sin α
export const capacitor74 = duo('Capacitor start and capacitor run motors', {
  draw: figAt(splitFigure, { 0: 0, 1: 0, 2: 1, 3: 2, 4: 3 }),
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Yaad garau: starting torque T st, I m I a sin alpha sanga proportional, jaha alpha dui current bich ko phase difference.',
      voice: 'याद गरौं — स्टार्टिङ टर्क टी एस टी, आई एम आई ए साइन अल्फासँग प्रोपोर्सनल, जहाँ अल्फा दुई करेन्टबीचको फेज डिफरेन्स।',
      lines: [['h', <>Capacitor start and run motors</>], rem(<K>{String.raw`T_{st} \propto I_m I_a \sin\alpha`}</K>, <>Split-phase: α ≈ 25–30° only</>)],
    },
    {
      say: 'Capacitor-start motor ma auxiliary winding sanga series ma capacitor jodincha. Capacitor le I a lai V bhanda aghi lead garaucha.',
      voice: 'क्यापासिटर स्टार्ट मोटरमा अक्जिलरी वाइन्डिङसँग सिरिजमा क्यापासिटर जोडिन्छ। क्यापासिटरले आई एलाई भीभन्दा अघि लिड गराउँछ।',
      lines: [['step', <>Capacitor C in series with the auxiliary → I<sub>a</sub> leads V</>]],
    },
    {
      say: 'I m V bhanda pachhi lag garcha, I a aghi lead garcha, tesaile alpha lagbhag 90 degree. Sin 90 equals one, tesaile starting torque maximum.',
      voice: 'आई एम भीभन्दा पछि ल्याग गर्छ, आई ए अघि लिड गर्छ, त्यसैले अल्फा लगभग नब्बे डिग्री। साइन नाइन्टी इक्वल्स वान, यसरी स्टार्टिङ टर्क म्याक्सिमम।',
      lines: [['step', step('Phase difference', String.raw`\begin{aligned} \alpha &\approx 90^\circ \\ \sin\alpha &\approx 1 \end{aligned}`)]],
    },
    {
      say: 'Kina capacitor le current lead garaucha? Capacitor ma voltage bhanda pahila current pugcha: charge bharna current pahila bagnu parcha.',
      voice: 'किन क्यापासिटरले करेन्ट लिड गराउँछ? क्यापासिटरमा भोल्टेजभन्दा पहिला करेन्ट पुग्छ — चार्ज भर्न करेन्ट पहिला बग्नुपर्छ।',
      lines: [br('Why does a capacitor make the current lead?', <Pts items={[<>Current must flow first to put charge on the plates</>, <>The voltage builds up after the charge</>, <>So in a capacitor the current leads the voltage (up to 90°)</>]} />)],
    },
    {
      say: 'Main line ma farkau. Rated speed ko lagbhag 75 percent ma centrifugal switch khulcha, ra motor main winding le matra chalcha.',
      voice: 'मेन लाइनमा फर्कौं। रेटेड स्पिडको लगभग पचहत्तर प्रतिशतमा सेन्ट्रिफ्युगल स्विच खुल्छ, र मोटर मेन वाइन्डिङले मात्र चल्छ।',
      lines: [['step', <>At ≈ 75 % speed the centrifugal switch opens; the motor runs on the main winding</>]],
    },
    {
      say: 'Capacitor-start capacitor-run motor ma dui capacitor: thulo electrolytic start ko lagi, sano oil-filled run ko lagi, jun sadhai rahancha.',
      voice: 'क्यापासिटर स्टार्ट क्यापासिटर रन मोटरमा दुई क्यापासिटर — ठूलो इलेक्ट्रोलाइटिक स्टार्टको लागि, सानो अयल फिल्ड रनको लागि, जुन सधैं रहन्छ।',
      lines: [['step', <Pts items={[<>C<sub>s</sub> (large, electrolytic): starting only</>, <>C<sub>r</sub> (small, oil-filled): stays in circuit</>, <>Better pf and efficiency, quiet: compressors, fans, refrigerators</>]} />]],
      ask: {
        q: 'Capacitor-start motor ko starting torque split-phase bhanda kina badhi huncha?',
        voice: 'क्यापासिटर स्टार्ट मोटरको स्टार्टिङ टर्क, स्प्लिट फेजभन्दा किन बढी हुन्छ?',
        options: ['α lagbhag 90° huncha', 'Main winding hatcha', 'Supply voltage badhcha'],
        answer: 0,
        why: 'Tst ∝ Im Ia sin α; α ≈ 90° ma sin α ≈ 1, split-phase ma 25–30° matra.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: T st proportional to I m I a sin alpha; split-phase ma alpha 25 dekhi 30 degree matra.',
      voice: 'स्मरण — टी एस टी, प्रोपोर्सनल टु आई एम आई ए साइन अल्फा। स्प्लिट फेजमा अल्फा पच्चीस देखि तीस डिग्री मात्र।',
      lines: [['h', <>Capacitor start and run motors (Fig. 7.2)</>], rem(<K>{String.raw`T_{st} \propto I_m I_a \sin\alpha`}</K>)],
    },
    {
      say: 'Capacitor-start motor: auxiliary winding sanga series ma capacitor, ra centrifugal switch.',
      voice: 'क्यापासिटर स्टार्ट मोटर — अक्जिलरी वाइन्डिङसँग सिरिजमा क्यापासिटर, र सेन्ट्रिफ्युगल स्विच।',
      lines: [['step', <>A capacitor C and centrifugal switch in series with the auxiliary winding.</>]],
    },
    {
      say: 'I a V lai lead garcha ra I m lag garcha, tesaile alpha lagbhag 90 degree ra starting torque ucho.',
      voice: 'आई ए भीलाई लिड गर्छ, र आई एम ल्याग गर्छ, त्यसैले अल्फा लगभग नब्बे डिग्री, र स्टार्टिङ टर्क उच्च।',
      lines: [['step', <>I<sub>a</sub> leads V, I<sub>m</sub> lags: <K>{String.raw`\alpha \approx 90^\circ`}</K>, hence high starting torque.</>]],
    },
    {
      say: 'Capacitor ma current voltage lai lead garcha, kinaki plates charge huna pahila current bagnu parcha.',
      voice: 'क्यापासिटरमा करेन्ट भोल्टेजलाई लिड गर्छ, किनकि प्लेट्स चार्ज हुनुपहिला करेन्ट बग्नुपर्छ।',
      lines: [br('Leading current in C', <Pts items={[<>Charge (current) comes before voltage</>, <>Ideal capacitor: current leads by 90°</>]} />)],
    },
    {
      say: 'Lagbhag 75 percent speed ma centrifugal switch le auxiliary circuit disconnect garcha.',
      voice: 'लगभग पचहत्तर प्रतिशत स्पिडमा, सेन्ट्रिफ्युगल स्विचले अक्जिलरी सर्किट डिस्कनेक्ट गर्छ।',
      lines: [['step', <>At about 75 % of synchronous speed the switch disconnects the auxiliary.</>]],
    },
    {
      say: 'Capacitor-start capacitor-run motor ma C s start ko lagi ra C r sadhai circuit ma; power factor, efficiency ra quiet running sudharchan.',
      voice: 'क्यापासिटर स्टार्ट क्यापासिटर रन मोटरमा, सी एस स्टार्टको लागि, र सी आर सधैं सर्किटमा। पावर फ्याक्टर, इफिसियन्सी र क्वाइट रनिङ सुधारिन्छन्।',
      lines: [['step', <Pts items={[<>C<sub>s</sub> for starting, C<sub>r</sub> permanently connected</>, <>Improved pf and efficiency; quiet running</>]} />]],
      ask: {
        q: 'Capacitor-run motor ma run capacitor le k sudharcha?',
        voice: 'क्यापासिटर रन मोटरमा रन क्यापासिटरले के सुधार्छ?',
        options: ['Power factor ra efficiency', 'Starting current badhaucha', 'Speed zero garcha'],
        answer: 0,
        why: 'Run capacitor le running ma pani rotating field balio rakhcha.',
      },
    },
  ],
});

/* ── 7.5 Reluctance start motor ─────────────────────────────────────── */
export const basicsRel75 = duo('7.5 · Basic understanding: how can a motor start with no extra winding?', {
  three: smallTour([
    { shot: 'front', show: SPF, flow: 0.6, pulse: 1, focus: ['stator', 'main'], labels: [['asaman hawa ko gap', 'stator']] },
    { pulse: 0.6, rot: 0.35, focus: ['main'], labels: [['field bistarai sarcha', 'field']] },
    { rot: 0.35, spin: 0.3, spinMs: 3000, focus: ['cage'], labels: [['sano dhakka', 'cage']] },
    { spin: 0.6, focus: ['shaft'], labels: [['halka kaam: ghadi, timer', 'shaft']] },
    { shot: 'whole', rot: 0.35, spin: 0.6, focus: null },
  ]),
  tutor: [
    {
      say: 'Reluctance start motor ma aux winding nai hudaina. Pole ra rotor bich ko hawa ko gap euta chheu ma sano, arko chheu ma thulo huncha.',
      voice: 'रिलक्टेन्स स्टार्ट मोटरमा अक्स वाइन्डिङ नै हुँदैन। पोल र रोटरबीचको हावाको ग्याप एउटा छेउमा सानो, अर्को छेउमा ठूलो हुन्छ।',
      lines: [['h', <>7.5 · Extra coil bina start?</>], part(<>Asaman gap</>, <>euta chheu sano, arko thulo</>)],
    },
    {
      say: 'Gap farak bhayeko le magnet ko bal ek chheu bata arko chheu tira bistarai sarcha.',
      voice: 'ग्याप फरक भएकोले, म्याग्नेटको बल एक छेउबाट अर्को छेउतिर बिस्तारै सर्छ।',
      lines: [chain(<>Gap farak → field sano gap tira sarcha</>)],
    },
    {
      say: 'Sarne field le rotor lai sano dhakka dincha, ra rotor ghumna thalcha.',
      voice: 'सर्ने फिल्डले रोटरलाई सानो धक्का दिन्छ, र रोटर घुम्न थाल्छ।',
      lines: [chain(<>Sarne field → sano dhakka → rotor ghumyo</>)],
      ask: {
        q: 'Reluctance start motor ma field kun tira sarcha?',
        voice: 'रिलक्टेन्स स्टार्ट मोटरमा फिल्ड कुनतिर सर्छ?',
        options: ['Sano gap tira', 'Thulo gap tira', 'Sardaina'],
        answer: 0,
        why: 'Sano gap tira ko flux dherai lag garcha, tesaile field tyatai sarcha.',
      },
    },
    {
      say: 'Dhakka kamjor bhayeko le yo motor ghadi, timer ra khelauna jasta dherai halka kaam ma matra prayog huncha.',
      voice: 'धक्का कमजोर भएकोले यो मोटर घडी, टाइमर र खेलौना जस्ता धेरै हल्का काममा मात्र प्रयोग हुन्छ।',
      lines: [chain(<>Kamjor dhakka → ghadi, timer, khelauna</>)],
    },
    {
      say: 'Saransh: asaman gap le field sarcha, sano dhakka dincha, ra sasto ra sajilo motor banchha.',
      voice: 'सारांश — असमान ग्यापले फिल्ड सर्छ, सानो धक्का दिन्छ, र सस्तो र सजिलो मोटर बन्छ।',
      lines: [['idea', <>Asaman gap → field sarcha → sano dhakka · sasto, sajilo</>]],
    },
  ],
  lecturer: [
    {
      say: 'Reluctance start motor ma auxiliary winding hudaina; stator pole ko air gap non-uniform huncha.',
      voice: 'रिलक्टेन्स स्टार्ट मोटरमा अक्जिलरी वाइन्डिङ हुँदैन। स्टेटर पोलको एयर ग्याप नन युनिफर्म हुन्छ।',
      lines: [['h', <>7.5 · Reluctance start motor</>], part(<>Non-uniform gap</>, <>no auxiliary winding</>)],
    },
    {
      say: 'Thulo gap bhaeko bhag ko flux kam lag garcha, sano gap ko bhag ko flux badhi.',
      voice: 'ठूलो ग्याप भएको भागको फ्लक्स कम ल्याग गर्छ, सानो ग्यापको भागको फ्लक्स बढी।',
      lines: [chain(<>Phase difference between the two fluxes → field shifts to the small gap</>)],
    },
    {
      say: 'Yo sarne field le kamjor starting torque dincha.',
      voice: 'यो सर्ने फिल्डले कमजोर स्टार्टिङ टर्क दिन्छ।',
      lines: [chain(<>Shifting field → weak starting torque</>)],
      ask: {
        q: 'Reluctance start motor ko starting torque kasto huncha?',
        voice: 'रिलक्टेन्स स्टार्ट मोटरको स्टार्टिङ टर्क कस्तो हुन्छ?',
        options: ['Dherai kam', 'Dherai ucho', 'Capacitor-start barabar'],
        answer: 0,
        why: 'Dui flux bich ko phase difference sano bhayeko le torque kam.',
      },
    },
    {
      say: 'Yasko efficiency kam huncha ra yo clock, timer ra toy ma prayog huncha.',
      voice: 'यसको इफिसियन्सी कम हुन्छ, र यो क्लक, टाइमर र टोयमा प्रयोग हुन्छ।',
      lines: [chain(<>Low efficiency → clocks, timers, toys</>)],
    },
    {
      say: 'Saransh: non-uniform air gap bata starting, ati sano power ko lagi.',
      voice: 'सारांश — नन युनिफर्म एयर ग्यापबाट स्टार्टिङ, अति सानो पावरको लागि।',
      lines: [['idea', <>Starting from a non-uniform air gap; very small ratings</>]],
    },
  ],
});

/* ── 7.1 Model answer: working principle and the effect of the air gap ─ */
// 2068 Magh Q1(a) [5+3] (Question Bank part 11).
export const consAnswer71 = answer('Model answer: working principle of a single-phase induction motor and the air gap', {
  draw: dfrFigure,
  viewBox: '0 0 360 225',
  papers: ['2068 Magh'],
  marks: '[5 + 3]',
  q: 'Explain the working principle of a single phase induction motor. What is the effect of air gap in the magnetic circuit?',
  read: {
    say: 'IOE 2068 Magh: single phase induction motor ko working principle explain gara, ra magnetic circuit ma air gap ko asar k huncha. Pahilo bhag panch, dosro tin marks.',
    voice: 'आई ओ ई दुई हजार अठसट्ठी माघ — सिंगल फेज इन्डक्सन मोटरको वर्किङ प्रिन्सिपल एक्सप्लेन गर, र म्याग्नेटिक सर्किटमा एयर ग्यापको असर के हुन्छ। पहिलो भाग पाँच, दोस्रो तीन मार्क्स।',
  },
  points: [
    {
      carry: <>(a) Pulsating flux = two halves Φ<sub>m</sub>/2 rotating opposite ways</>,
      node: <><H>(a) Working principle [5]</H><Pts items={[<>Single-phase supply to the main winding gives a pulsating (not rotating) flux <K>{String.raw`\Phi_m\cos\omega t`}</K></>, <>By double field revolving theory it equals two fluxes Φ<sub>m</sub>/2 rotating in opposite directions at N<sub>s</sub> (Fig. 7.1)</>]} /></>,
      say: 'Main winding ma single-phase supply dida pulsating flux phi m cos omega t banchha, rotating hoina. Double field revolving theory anusar yo dui phi m by two ka flux ho, jun ulto disha ma N s ma ghumchan.',
      voice: 'मेन वाइन्डिङमा सिंगल फेज सप्लाई दिँदा पल्सेटिङ फ्लक्स, फाइ एम कस ओमेगा टी बन्छ, रोटेटिङ होइन। डबल फिल्ड रिभल्भिङ थ्योरी अनुसार, यो दुई फाइ एम बाइ टु का फ्लक्स हो, जुन उल्टो दिशामा एन एसमा घुम्छन्।',
    },
    {
      node: <><Pts items={[<>At standstill the two torques T<sub>f</sub> and T<sub>b</sub> are equal and opposite: net starting torque is zero, so the motor is not self-starting</>, <>Once started in either direction, the torque of that field becomes larger and the motor keeps running; an auxiliary winding is used to start it</>]} /></>,
      say: 'Standstill ma forward ra backward torque barabar ra ulto, net starting torque zero, tesaile motor self-starting hudaina. Euta disha ma suru garepachi tyo field ko torque thulo hunchha ra motor chalirahancha; start garna auxiliary winding prayog garincha.',
      voice: 'स्ट्यान्डस्टिलमा फरवार्ड र ब्याकवार्ड टर्क बराबर र उल्टो, नेट स्टार्टिङ टर्क जिरो, त्यसैले मोटर सेल्फ स्टार्टिङ हुँदैन। एउटा दिशामा सुरु गरेपछि त्यो फिल्डको टर्क ठूलो हुन्छ, र मोटर चलिरहन्छ। स्टार्ट गर्न अक्जिलरी वाइन्डिङ प्रयोग गरिन्छ।',
    },
    {
      page: true,
      node: <><H>(b) Effect of the air gap [3]</H><Pts items={[<>The air gap has a very high reluctance: <K>{String.raw`S_g = \dfrac{l_g}{\mu_0 A}`}</K></>, <>A larger gap needs a larger magnetising current → lower power factor and efficiency</>, <>So the gap is kept as small as mechanically possible (≈ 0.25–0.5 mm)</>]} /></>,
      say: 'Air gap ko reluctance dherai ucho huncha: S g equals l g over mu zero A. Gap thulo bhaye magnetising current badhi chahincha, ra power factor ra efficiency ghatchan. Tesaile gap mechanical rupma sambhav bhaye samma sano rakhincha.',
      voice: 'एयर ग्यापको रिलक्टेन्स धेरै उच्च हुन्छ — एस जी इक्वल्स, एल जी ओभर म्यु जिरो ए। ग्याप ठूलो भए म्याग्नेटाइजिङ करेन्ट बढी चाहिन्छ, र पावर फ्याक्टर र इफिसियन्सी घट्छन्। त्यसैले ग्याप मेकानिकल रूपमा सम्भव भएसम्म सानो राखिन्छ।',
      ask: {
        q: 'Induction motor ma air gap badhaye power factor lai k huncha?',
        voice: 'इन्डक्सन मोटरमा एयर ग्याप बढाए पावर फ्याक्टरलाई के हुन्छ?',
        options: ['Ghatcha', 'Badhcha', 'Farak pardaina'],
        answer: 0,
        why: 'Thulo gap ma badhi magnetising current chahincha, jun reactive current ho.',
      },
    },
  ],
});

/* ── 7.4 Model answer: short note on the capacitor start and run motor ─ */
// 2073 Chaitra Q(b)(i) short note; 2068 Magh Q6(a) "Capacitor starting of
// 1φ induction motor" (Question Bank parts 2 and 11). Marks per note not shown.
export const capAnswer74 = answer('Model answer: capacitor start and run motor (short note)', {
  draw: splitFigure,
  viewBox: '0 0 360 222',
  papers: ['2073 Chaitra', '2068 Magh'],
  marks: '',
  q: 'Write short notes on: Capacitor start and run motor.',
  read: {
    say: 'IOE 2073 Chaitra ra 2068 Magh: capacitor start and run motor ma short note lekha.',
    voice: 'आई ओ ई दुई हजार त्रिहत्तर चैत र दुई हजार अठसट्ठी माघ — क्यापासिटर स्टार्ट एन्ड रन मोटरमा सर्ट नोट लेख।',
  },
  points: [
    {
      carry: <>Capacitor in the auxiliary → α ≈ 90°</>,
      node: <><H>Capacitor start motor (Fig. 7.2)</H><Pts items={[<>A capacitor and a centrifugal switch in series with the auxiliary winding</>, <>I<sub>a</sub> leads V, I<sub>m</sub> lags: α ≈ 90°, so <K>{String.raw`T_{st} \propto I_mI_a\sin\alpha`}</K> is high</>, <>Switch opens at about 75 % speed</>]} /></>,
      say: 'Capacitor start motor: auxiliary winding sanga series ma capacitor ra centrifugal switch. I a lead ra I m lag garda alpha lagbhag 90 degree, tesaile starting torque ucho. Lagbhag 75 percent speed ma switch khulcha.',
      voice: 'क्यापासिटर स्टार्ट मोटर — अक्जिलरी वाइन्डिङसँग सिरिजमा क्यापासिटर र सेन्ट्रिफ्युगल स्विच। आई ए लिड र आई एम ल्याग गर्दा, अल्फा लगभग नब्बे डिग्री, त्यसैले स्टार्टिङ टर्क उच्च। लगभग पचहत्तर प्रतिशत स्पिडमा स्विच खुल्छ।',
    },
    {
      node: <><H>Capacitor start capacitor run motor</H><Pts items={[<>Two capacitors: C<sub>s</sub> (large, electrolytic) for starting, C<sub>r</sub> (small, oil-filled) always connected</>, <>Better power factor and efficiency, quiet and smooth running</>, <>Uses: compressors, refrigerators, air conditioners, pumps; ceiling fans use one permanent capacitor</>]} /></>,
      say: 'Capacitor start capacitor run motor ma dui capacitor: C s thulo starting ko lagi, C r sano sadhai jodiyeko. Power factor ra efficiency ramro, ra chalai chup ra smooth. Compressor, fridge, AC ra pump ma prayog huncha.',
      voice: 'क्यापासिटर स्टार्ट क्यापासिटर रन मोटरमा दुई क्यापासिटर — सी एस ठूलो स्टार्टिङको लागि, सी आर सानो सधैं जोडिएको। पावर फ्याक्टर र इफिसियन्सी राम्रो, र चलाइ चुप र स्मुथ। कम्प्रेसर, फ्रिज, एयर कन्डिसनर र पम्पमा प्रयोग हुन्छ।',
      ask: {
        q: 'Capacitor start capacitor run motor ma kati capacitor hunchan?',
        voice: 'क्यापासिटर स्टार्ट क्यापासिटर रन मोटरमा कति क्यापासिटर हुन्छन्?',
        options: ['Dui', 'Euta', 'Tin'],
        answer: 0,
        why: 'Starting ko lagi Cs ra running ko lagi Cr.',
      },
    },
  ],
});

/* ── 7.5 Model answer: starting methods, reluctance start ───────────── */
// No reluctance-start question in vault/; the closest real question is the
// starting-methods one (2068 Bhadra, 2071 Chaitra, 2078 Baishakh), answered
// here with the reluctance start and resistance split-phase methods.
export const relAnswer75 = answer('Model answer: starting methods (reluctance start and split phase)', {
  draw: relFigure,
  viewBox: '0 0 360 240',
  papers: ['2068 Bhadra', '2071 Chaitra', '2078 Baishakh'],
  marks: '',
  q: 'Why single phase induction motor are not self starting? Explain any two starting methods for single phase induction motor.',
  read: {
    say: 'IOE ko question: single phase induction motor kina self starting hudaina, ra kunai dui starting method explain gara. Yaha reluctance start ra split phase method lekhchhau.',
    voice: 'आई ओ ईको क्वेस्चन — सिंगल फेज इन्डक्सन मोटर किन सेल्फ स्टार्टिङ हुँदैन, र कुनै दुई स्टार्टिङ मेथड एक्सप्लेन गर। यहाँ रिलक्टेन्स स्टार्ट र स्प्लिट फेज मेथड लेख्छौं।',
  },
  points: [
    {
      carry: <>(a) Pulsating flux → T<sub>f</sub> = T<sub>b</sub> at rest → no starting torque</>,
      node: <><H>(a) Not self-starting</H><Pts items={[<>A single winding gives a pulsating flux, equal to two halves rotating opposite ways (double field revolving theory)</>, <>At standstill their torques are equal and opposite: net torque zero</>]} /></>,
      say: 'Euta winding le pulsating flux dincha, jun ulto disha ma ghumne dui half ho. Standstill ma tinka torque barabar ra ulto, net torque zero.',
      voice: 'एउटा वाइन्डिङले पल्सेटिङ फ्लक्स दिन्छ, जुन उल्टो दिशामा घुम्ने दुई हाफ हो। स्ट्यान्डस्टिलमा तिनका टर्क बराबर र उल्टो, नेट टर्क जिरो।',
    },
    {
      page: true,
      node: <><H>(b)(i) Reluctance start (Fig. 7.5)</H><Pts items={[<>Salient stator poles with a non-uniform air gap; no auxiliary winding</>, <>The flux of the wide-gap part lags less than that of the narrow-gap part → the field shifts towards the narrow gap → small starting torque</>, <>Low torque and efficiency: clocks, timers, toys</>]} /></>,
      say: 'Reluctance start: salient pole ma non-uniform air gap, auxiliary winding chaina. Thulo gap ko flux kam lag garcha, field sano gap tira sarcha, ra sano starting torque aaucha. Clock, timer ra toy ma.',
      voice: 'रिलक्टेन्स स्टार्ट — सेलियन्ट पोलमा नन युनिफर्म एयर ग्याप, अक्जिलरी वाइन्डिङ छैन। ठूलो ग्यापको फ्लक्स कम ल्याग गर्छ, फिल्ड सानो ग्यापतिर सर्छ, र सानो स्टार्टिङ टर्क आउँछ। क्लक, टाइमर र टोयमा।',
    },
    {
      node: <><H>(b)(ii) Split phase (resistance start)</H><Pts items={[<>High-resistance auxiliary winding 90° in space from the main, with a centrifugal switch</>, <>I<sub>a</sub> nearly in phase with V, I<sub>m</sub> lags: α ≈ 25–30°, so <K>{String.raw`T_{st} \propto I_mI_a\sin\alpha`}</K> is moderate</>, <>Fans, blowers, washing machines</>]} /></>,
      say: 'Split phase: high resistance auxiliary winding main sanga space ma 90 degree, centrifugal switch sahit. Alpha 25 dekhi 30 degree, tesaile starting torque madhyam. Fan, blower ra washing machine ma.',
      voice: 'स्प्लिट फेज — हाई रेजिस्टेन्स अक्जिलरी वाइन्डिङ, मेनसँग स्पेसमा नब्बे डिग्री, सेन्ट्रिफ्युगल स्विचसहित। अल्फा पच्चीस देखि तीस डिग्री, त्यसैले स्टार्टिङ टर्क मध्यम। फ्यान, ब्लोअर र वासिङ मेसिनमा।',
      ask: {
        q: 'Reluctance start motor ma field kun tira sarcha?',
        voice: 'रिलक्टेन्स स्टार्ट मोटरमा फिल्ड कुनतिर सर्छ?',
        options: ['Narrow (sano) gap tira', 'Wide (thulo) gap tira', 'Kunai pani tira sardaina'],
        answer: 0,
        why: 'Narrow gap ko flux badhi lag garcha, tesaile field tyatira sarcha.',
      },
    },
  ],
});

// One topic per IOE syllabus bullet of Unit 7 (rule 68).
const t71 = topic({ num: '7.1', title: 'Single phase Induction Motors: Construction and Characteristics', opener: basicsCons71, derive: [construction71], picture: [consAnswer71] });
const t72 = topic({ num: '7.2', title: 'Double Field Revolving Theory', opener: basics71, derive: [dfr71], picture: [dfrAnswer71] });
const t73 = topic({ num: '7.3', title: 'Split phase Induction Motor', opener: basics72, derive: [split72], picture: [startAnswer72] });
const t74 = topic({ num: '7.4', title: 'Capacitor start and run motor', opener: basicsCap74, derive: [capacitor74], picture: [capAnswer74] });
const t75 = topic({ num: '7.5', title: 'Reluctance start motor', opener: basicsRel75, derive: [reluctance72], picture: [relAnswer75] });
const t76 = topic({ num: '7.6', title: 'Alternating Current Series motor and Universal motor', opener: basics73, derive: [series73], picture: [universalAnswer73] });
const t77 = topic({ num: '7.7', title: 'Special Purpose Machines: Stepper motor, Schrage motor and Servo motor', opener: basics74, derive: [stepper74, servo74], picture: [stepperAnswer74] });

export const unit7 = {
  topics: [t71, t72, t73, t74, t75, t76, t77],
  summary: [
    <>Single-phase IM: pulsating field Φ<sub>m</sub> cos ωt = two Φ<sub>m</sub>/2 fields ulto ghumne; standstill ma T<sub>f</sub> = T<sub>b</sub>, not self-starting.</>,
    <>Starting: auxiliary winding 90° ma; T ∝ I<sub>m</sub>I<sub>a</sub> sin α; split-phase α ≈ 30°, capacitor-start α ≈ 90°; centrifugal switch.</>,
    <>Reluctance start: non-uniform air gap, kam torque (clock, timer).</>,
    <>Universal motor: series, T ∝ i² → AC ra DC dubai; high speed (mixie, drill).</>,
    <>Stepper β = 360°/(mN<sub>r</sub>), open loop; servo closed loop feedback; Schrage: brush shift speed control.</>,
  ],
};
