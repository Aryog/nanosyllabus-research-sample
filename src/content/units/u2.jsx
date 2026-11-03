import { C, K, Pts, answer, duo, figAt, solve, topic } from '../video/kit.jsx';
import { Let, br, chain, part, rem } from '../video/kit.jsx';
import { Cap, CoilV, ResH, T, W, head } from '../unit4/figs.jsx';
import { transformerTour } from '../machines/models3d.js';

/*
  Unit 2 Transformer (IOE syllabus), one topic per bullet (rule 68): 2.1
  construction, recent trends · 2.2 working principle and EMF equation · 2.3
  ideal transformer · 2.4 no-load and load operation · 2.5 operation with
  load · 2.6 equivalent circuit and phasors · 2.7 polarity, OC, SC tests · 2.8
  voltage regulation · 2.9 losses · 2.10 efficiency, maximum and all-day ·
  2.11 PT and CT · 2.12 auto transformer · 2.13 three-phase transformers.
    2.1 construction, working principle, EMF equation
    2.2 ideal transformer, no-load and load operation (flux constant)
    2.3 equivalent circuit, phasor, OC/SC tests
    2.4 voltage regulation, losses, efficiency, maximum and all-day efficiency
    2.5 auto transformer (Cu saving), CT and PT, three-phase transformers
  Recomputed: 2073 Bhadra OC cos φ0 = 0.4, Iw = 0.32 A, Iμ = 0.7332 A,
  R0 = 781.25 Ω, X0 = 341.0 Ω; SC Z02 = 8 Ω, R02 = 1.2 Ω, X02 = 7.909 Ω;
  K = 4 → R01 = 0.075 Ω, X01 = 0.4943 Ω. 2073 Bhadra 100 kVA: η(FL, upf) =
  97.89 %, η(½ FL, 0.8) = 96.95 %.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
const step = (label, math) => <><span className="lbl">{label}</span><K>{math}</K></>;
// Expanding terms (rule 33c): X marks the term, R drops in its expansion.
const INK = { BL: '#1c7ed6', OR: '#d9480f', GR: '#2b8a3e', VI: '#7048e8' };
const X = (t, c) => String.raw`\htmlClass{xt}{\textcolor{${c}}{${t}}}`;
const R = (t, c, n = 1) => String.raw`\htmlClass{xr xr${n}}{\textcolor{${c}}{${t}}}`;
const BASE = ['core', 'primary', 'secondary'];
const FED = [...BASE, 'source'];
const LOADED = [...FED, 'lamp'];

/* ── Figures ─────────────────────────────────────────────────────────── */
// Fig. 2.1: 0 core · 1 primary N1 on V1 · 2 flux Φm · 3 secondary N2, E2 · 4 load
export const xfmrFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M110 40 H250 V180 H110 Z" w={1.5} />
      <W d="M135 65 H225 V155 H135 Z" w={1.5} />
      <Cap y={210}>Fig. 2.1  Two-winding transformer</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      {[80, 95, 110, 125, 140].map((y) => <W key={y} d={`M102 ${y} H143`} w={1.6} />)}
      <W d="M102 80 H50 M102 140 H50" />
      <circle cx={50} cy={110} r={14} fill={C.board} stroke={C.chalk} strokeWidth={1.3} />
      <T x={50} y={114}>~</T>
      <W d="M50 80 V96 M50 124 V140" />
      <T x={24} y={114} i>V₁</T>
      <T x={122} y={168} i size={10}>N₁</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M122 52 H238 V168 H122 Z" w={1} dash="4 3" />
      {head(180, 52, 'right')}
      <T x={180} y={46} i>Φm</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      {[75, 87, 99, 111, 123, 135, 147].map((y) => <W key={y} d={`M217 ${y} H258`} w={1.3} />)}
      <W d="M258 75 H300 M258 147 H300" />
      <T x={238} y={168} i size={10}>N₂</T>
      <T x={290} y={114} i>E₂</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <W d="M300 75 V95 M300 127 V147" />
      <rect x={292} y={95} width={16} height={32} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={326} y={114} a="start" size={10}>load</T>
    </g>
  </>
);

// Fig. 2.2: phasors. 0 Φ axis · 1 V1, E1 · 2 I0 at φ0 · 3 Iw, Iμ · 4 on load I2′ and I1
export const noLoadFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M150 120 H300" w={1.4} />
      {head(300, 120, 'right')}
      <T x={306} y={124} a="start" i>Φ</T>
      <Cap x={180} y={222}>Fig. 2.2  Phasor diagram of a transformer</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M150 120 V30" w={1.6} />
      {head(150, 30, 'up')}
      <T x={140} y={34} a="end" i>V₁</T>
      <W d="M150 120 V200" w={1.2} />
      {head(150, 200, 'down')}
      <T x={140} y={198} a="end" i>E₁</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M150 120 L225 82" w={1.6} />
      {head(225, 82, 'right', 6)}
      <T x={232} y={78} a="start" i>I₀</T>
      <path d="M150 95 A25 25 0 0 1 172 108" fill="none" stroke={C.chalk} strokeWidth={1} />
      <T x={170} y={92} a="start" i size={10}>φ₀</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M225 82 V120" w={0.9} dash="3 3" />
      <W d="M150 82 H225" w={0.9} dash="3 3" />
      <T x={118} y={86} a="end" i size={10}>Iw</T>
      <W d="M150 82 H155" w={1} />
      <T x={225} y={136} i size={10}>Iμ</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <W d="M150 120 L110 190" w={1.3} />
      {head(110, 190, 'down', 6)}
      <T x={100} y={204} a="end" i size={10}>I₂ (load)</T>
      <W d="M150 120 L190 50" w={1.3} />
      {head(190, 50, 'up', 6)}
      <T x={196} y={48} a="start" i size={10}>I₂′ = KI₂</T>
    </g>
  </>
);

// Fig. 2.3: 0 R1, X1 · 1 shunt R0 ∥ X0 · 2 R2′, X2′ · 3 load and V2′ · 4 approximate note
export const eqFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M20 60 H40" />
      <ResH x1={40} x2={80} y={60} label="R₁" />
      <CoilLoops x={88} y={60} label="X₁" />
      <W d="M128 60 H160" />
      <W d="M20 170 H330" />
      <T x={14} y={118} a="end" i>V₁</T>
      <Cap y={208}>Fig. 2.3  Equivalent circuit referred to the primary</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M160 60 V170" w={0.6} dash="2 3" />
      <W d="M145 60 V85 M145 135 V170 M175 60 V85 M175 135 V170" />
      <rect x={139} y={85} width={12} height={50} fill="none" stroke={C.chalk} strokeWidth={1.2} />
      <T x={133} y={115} a="end" i size={10}>R₀</T>
      <path d="M175 85 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 14" fill="none" stroke={C.chalk} strokeWidth={1.2} />
      <T x={186} y={115} a="start" i size={10}>X₀</T>
      <T x={160} y={52} i size={10}>I₀</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M175 60 H200" />
      <ResH x1={200} x2={240} y={60} label="R₂′" />
      <CoilLoops x={248} y={60} label="X₂′" />
      <W d="M288 60 H330" />
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M330 60 V95 M330 135 V170" />
      <rect x={322} y={95} width={16} height={40} fill="none" stroke={C.chalk} strokeWidth={1.2} />
      <T x={312} y={118} a="end" i size={10}>V₂′</T>
      <T x={346} y={118} a="start" i size={10}>Z′L</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <T x={180} y={190} size={10}>R₂′ = R₂/K², X₂′ = X₂/K², V₂′ = V₂/K</T>
    </g>
  </>
);
function CoilLoops({ x, y, label }) {
  return (
    <g>
      <path d={`M${x} ${y} a5 5 0 0 1 10 0 a5 5 0 0 1 10 0 a5 5 0 0 1 10 0 a5 5 0 0 1 10 0`} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <W d={`M${x - 8} ${y} H${x}`} />
      <T x={x + 20} y={y - 10} i>{label}</T>
    </g>
  );
}

// Fig. 2.4: 0 axes · 1 iron loss (flat) · 2 copper loss (rises as x²) · 3 η curve · 4 maximum where they cross
export const effCurveFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M40 190 H330 M40 190 V30" />
      {head(330, 190, 'right')}
      {head(40, 30, 'up')}
      <T x={326} y={206} i>load</T>
      <T x={30} y={34} a="end" i>η, W</T>
      <Cap y={222}>Fig. 2.4  Losses and efficiency against load</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M40 150 H320" w={1.2} dash="5 3" />
      <T x={322} y={146} a="end" size={10}>Pi (constant)</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M40 190 Q190 185 320 90" w={1.2} />
      <T x={300} y={84} a="end" size={10}>Pcu ∝ x²</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M42 185 C90 70 150 52 205 50 S290 62 320 72" w={1.6} />
      <T x={92} y={70} a="end" i size={11}>η</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <W d="M205 50 V190" w={0.9} dash="3 3" />
      <T x={205} y={204} size={10}>Pcu = Pi</T>
    </g>
  </>
);

// Fig. 2.5: auto transformer. 0 one winding · 1 V1, I1 across the whole · 2 tap, V2, I2 · 3 common part carries I2 − I1
export const autoFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <CoilV x={180} y1={35} y2={185} />
      <Cap y={212}>Fig. 2.5  Step-down auto transformer</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M180 35 H80 M180 185 H80" />
      {head(110, 35, 'right', 6)}
      <T x={110} y={27} i>I₁</T>
      <T x={70} y={114} a="end" i>V₁ (N₁)</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M180 115 H290 M180 185 H290" />
      <W d="M172 115 H188" w={2} />
      {head(260, 115, 'right', 6)}
      <T x={260} y={107} i>I₂</T>
      <T x={300} y={154} a="start" i>V₂ (N₂)</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <T x={200} y={154} a="start" i size={10}>I₂ − I₁</T>
      <T x={200} y={78} a="start" i size={10}>I₁</T>
    </g>
  </>
);

/* ── 2.1 Construction, principle, EMF equation ───────────────────────── */
export const basics21 = duo('2.2 · Basic understanding: how does a transformer change voltage?', {
  three: transformerTour([
    { shot: 'whole', show: BASE, labels: [['transformer', [0, 2.3, 0.6]]] },
    { shot: 'core', focus: ['core'], labels: [['falam ko core', 'core']] },
    { shot: 'source', show: FED, flow: 0.7, focus: ['primary', 'source'], labels: [['primary coil', 'primary'], ['AC', 'source']] },
    { shot: 'core', flux: 1, focus: ['core'], labels: [['flux ghumcha', 'flux']] },
    { shot: 'load', show: LOADED, flux: 1, flow2: 1, focus: ['secondary', 'lamp'], labels: [['secondary coil', 'secondary'], ['nachhoi bijuli', 'lamp']] },
    { shot: 'whole', focus: ['primary', 'secondary'], labels: [['kam pheri', 'primary'], ['dherai pheri', 'secondary']] },
    { shot: 'tank', show: [...LOADED, 'tank', 'bushings'], focus: ['tank', 'bushings'], labels: [['tel ko tank', 'tank'], ['bushing', 'bushings']] },
    { shot: 'whole', show: LOADED, focus: null },
  ]),
  tutor: [
    {
      say: 'Phone charger dekheko cha? Tyo bhitra euta sano transformer cha, jasle 230 volt lai sano voltage ma jharcha.',
      voice: 'फोन चार्जर देखेको छ? त्यो भित्र एउटा सानो ट्रान्सफर्मर छ, जसले दुई सय तीस भोल्टलाई सानो भोल्टेजमा झार्छ।',
      lines: [['h', <>2.2 · Transformer le voltage kasari badalcha?</>], ['step', <>Charger, pole ko box: sabai ma transformer</>]],
    },
    {
      say: 'Bich ma patla falam ko pata thupareko core. Yahi falam magnet ko bato ho.',
      voice: 'बीचमा पातलो फलामको पाता थुपारेको कोर। यही फलाम म्याग्नेटको बाटो हो।',
      lines: [part(<>Core</>, <>patla falam ko pata, magnet ko bato</>)],
    },
    {
      say: 'Euta coil AC supply ma jodincha: primary coil. AC current ulto-sulto bagcha.',
      voice: 'एउटा कोइल ए सी सप्लाईमा जोडिन्छ — प्राइमरी कोइल। ए सी करेन्ट उल्टो सुल्टो बग्छ।',
      lines: [part(<>Primary coil</>, <>AC supply ma</>)],
    },
    {
      say: 'Tyo current le core ma flux banaucha, ra flux pani ulto-sulto badlirahancha.',
      voice: 'त्यो करेन्टले कोरमा फ्लक्स बनाउँछ, र फ्लक्स पनि उल्टो सुल्टो बदलिरहन्छ।',
      lines: [['step', <>Badlirahne flux core bhari ghumcha</>]],
    },
    {
      say: 'Arko coil le tyo badlirahne flux paucha ra yasma bijuli aaucha. Dui coil chhuidainan, tara bulb balcha!',
      voice: 'अर्को कोइलले त्यो बदलिरहने फ्लक्स पाउँछ, र यसमा बिजुली आउँछ। दुई कोइल छुँदैनन्, तर बल्ब बल्छ!',
      lines: [part(<>Secondary coil</>, <>nachhoi bijuli aaucha</>)],
      ask: {
        q: 'Secondary coil ma bijuli kina aaucha?',
        voice: 'सेकेन्डरी कोइलमा बिजुली किन आउँछ?',
        options: ['Badlirahne flux le', 'Tar jodiyeko le', 'Battery le'],
        answer: 0,
        why: 'Flux badlida coil ma EMF induce huncha; dui coil jodiyeka chainan.',
      },
    },
    {
      say: 'Dherai pheri bhayeko coil ma dherai voltage, kam pheri ma kam. Pheri ko hisab le voltage badhcha wa ghatcha.',
      voice: 'धेरै फेरा भएको कोइलमा धेरै भोल्टेज, कम फेरामा कम। फेराको हिसाबले भोल्टेज बढ्छ वा घट्छ।',
      lines: [chain(<>Dherai pheri → dherai voltage (step-up / step-down)</>)],
    },
    {
      say: 'Thulo transformer tel bhariyeko tank ma huncha: tel le taato hataucha. Mathi ko bushing bata tar bahira niklancha.',
      voice: 'ठूलो ट्रान्सफर्मर तेल भरिएको ट्याङ्कमा हुन्छ — तेलले तातो हटाउँछ। माथिको बुसिङबाट तार बाहिर निक्लन्छ।',
      lines: [['step', <>Tank + tel: taato hataune · bushing: tar bahira</>]],
    },
    {
      say: 'Saransha: AC le flux badalcha, badlirahne flux le arko coil ma bijuli dincha, ra pheri le voltage tay garcha.',
      voice: 'सारांश — ए सीले फ्लक्स बदल्छ, बदलिरहने फ्लक्सले अर्को कोइलमा बिजुली दिन्छ, र फेराले भोल्टेज तय गर्छ।',
      lines: [['idea', <>AC → badlirahne flux → arko coil ma bijuli · pheri → voltage</>]],
    },
  ],
  lecturer: [
    {
      say: 'Transformer static device ho jasle frequency nabadali AC power lai eutai circuit bata arko ma transfer garcha.',
      voice: 'ट्रान्सफर्मर स्टाटिक डिभाइस हो, जसले फ्रिक्वेन्सी नबदली ए सी पावरलाई एउटा सर्किटबाट अर्कोमा ट्रान्सफर गर्छ।',
      lines: [['h', <>2.2 · The transformer</>], chain(<>A static device: AC power from one circuit to another at the same frequency</>)],
    },
    {
      say: 'Core silicon steel ko laminations bata baneko huncha, flux lai low reluctance path dina.',
      voice: 'कोर सिलिकन स्टिलको ल्यामिनेसन्सबाट बनेको हुन्छ, फ्लक्सलाई लो रिलक्टेन्स पाथ दिन।',
      lines: [part(<>Core</>, <>laminated silicon steel, a low-reluctance path</>)],
    },
    {
      say: 'Supply sanga jodiyeko winding primary winding ho; yasma alternating current bagcha.',
      voice: 'सप्लाईसँग जोडिएको वाइन्डिङ प्राइमरी वाइन्डिङ हो, यसमा अल्टरनेटिङ करेन्ट बग्छ।',
      lines: [part(<>Primary winding</>, <>connected to the AC supply</>)],
    },
    {
      say: 'Primary current le core ma alternating flux set up garcha.',
      voice: 'प्राइमरी करेन्टले कोरमा अल्टरनेटिङ फ्लक्स सेट अप गर्छ।',
      lines: [['step', <>Alternating flux set up in the core</>]],
    },
    {
      say: 'Yo flux secondary winding sanga link huncha, ra mutual induction le secondary ma EMF induce huncha.',
      voice: 'यो फ्लक्स सेकेन्डरी वाइन्डिङसँग लिङ्क हुन्छ, र म्युचुअल इन्डक्सनले सेकेन्डरीमा ई एम एफ इन्ड्युस हुन्छ।',
      lines: [part(<>Mutual induction</>, <>EMF induced in the secondary</>)],
      ask: {
        q: 'Transformer kun principle ma chalcha?',
        voice: 'ट्रान्सफर्मर कुन प्रिन्सिपलमा चल्छ?',
        options: ['Mutual induction', 'Self induction matra', 'Electrostatic induction'],
        answer: 0,
        why: 'Primary ko alternating flux le secondary ma EMF induce garcha.',
      },
    },
    {
      say: 'Induced voltage turns sanga proportional huncha; secondary turns badhi bhaye step-up, kam bhaye step-down.',
      voice: 'इन्ड्युस्ड भोल्टेज टर्न्ससँग प्रपोर्सनल हुन्छ, सेकेन्डरी टर्न्स बढी भए स्टेप अप, कम भए स्टेप डाउन।',
      lines: [['step', <>More turns, more voltage: step-up or step-down</>]],
    },
    {
      say: 'Power transformer ko core ra winding transformer oil bhariyeko tank ma rakhincha, ra leads bushings bata niklanchan.',
      voice: 'पावर ट्रान्सफर्मरको कोर र वाइन्डिङ ट्रान्सफर्मर आयल भरिएको ट्याङ्कमा राखिन्छ, र लिड्स बुसिङ्सबाट निक्लन्छन्।',
      lines: [['step', <>Tank with transformer oil (cooling, insulation) · bushings for the leads</>]],
    },
    {
      say: 'Saransha: alternating flux, mutual induction, ra turns ratio: yahi transformer ko principle.',
      voice: 'सारांश — अल्टरनेटिङ फ्लक्स, म्युचुअल इन्डक्सन, र टर्न्स रेसियो — यही ट्रान्सफर्मरको प्रिन्सिपल।',
      lines: [['idea', <>Alternating flux + mutual induction + turns ratio</>]],
    },
  ],
});

/* ── 2.2 Syllabus Content: working principle ──────────────────────────── */
// Canvas plan: heading · Remember (Faraday, Lenz) · left: definition, primary
// on AC, alternating flux, why AC only · page turn (carry Φ = Φm sin ωt, AC
// only) · secondary EMF by mutual induction, load · recap. Right: Fig. 2.1
// (0 core · 1 primary · 2 flux · 3 secondary · 4 load).
export const principle21 = duo('Working principle of a transformer', {
  draw: figAt(xfmrFigure, { 0: 1, 1: 2, 2: 3, 3: 5, 4: 6 }),
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Working principle bujhna duita law yaad garau. Faraday: coil sanga link bhayeko flux change bhaye EMF induce huncha. Lenz: induced EMF le aafno cause lai oppose garcha.',
      voice: 'वर्किङ प्रिन्सिपल बुझ्न दुईटा ल याद गरौं। फाराडे — कोइलसँग लिङ्क भएको फ्लक्स चेन्ज भए ई एम एफ इन्ड्युस हुन्छ। लेन्ज — इन्ड्युस्ड ई एम एफले आफ्नो कजलाई अपोज गर्छ।',
      lines: [['h', <>Working principle of a transformer</>], rem(<>Faraday: changing flux linkage induces an EMF, <K>{String.raw`e = -N\,\dfrac{d\Phi}{dt}`}</K></>, <>Lenz: the induced EMF opposes its cause</>)],
    },
    {
      say: 'Transformer static device ho. Yasle AC power euta circuit bata arko circuit ma transfer garcha, frequency change nagari, ra voltage step up wa step down garcha. Figure ma laminated core cha.',
      voice: 'ट्रान्सफर्मर स्टाटिक डिभाइस हो। यसले ए सी पावर एउटा सर्किटबाट अर्को सर्किटमा ट्रान्सफर गर्छ, फ्रिक्वेन्सी चेन्ज नगरी, र भोल्टेज स्टेप अप वा स्टेप डाउन गर्छ। फिगरमा ल्यामिनेटेड कोर छ।',
      lines: [['step', <><b>Transformer:</b> a static device that transfers AC power from one circuit to another at the same frequency, stepping the voltage up or down</>]],
    },
    {
      say: 'Primary winding N 1 turns ko cha, ra AC supply V 1 ma jodincha. V 1 le primary ma sano magnetising current I mu pathaucha.',
      voice: 'प्राइमरी वाइन्डिङ एन वान टर्न्सको छ, र ए सी सप्लाई भी वानमा जोडिन्छ। भी वानले प्राइमरीमा सानो म्याग्नेटाइजिङ करेन्ट आई म्यु पठाउँछ।',
      lines: [['step', <>Primary (N<sub>1</sub> turns) on AC supply V<sub>1</sub> → magnetising current I<sub>μ</sub></>]],
    },
    {
      say: 'I mu alternating bhayeko le core ma alternating flux phi equals phi m sin omega t banchha. Yo flux low-reluctance iron core bhitra circulate garcha.',
      voice: 'आई म्यु अल्टरनेटिङ भएकोले कोरमा अल्टरनेटिङ फ्लक्स — फाइ इक्वल्स फाइ एम साइन ओमेगा टी बन्छ। यो फ्लक्स लो रिलक्टेन्स आइरन कोरभित्र सर्कुलेट गर्छ।',
      lines: [['eq', tex(String.raw`\Phi = \Phi_m \sin \omega t`), undefined, { carry: <K>{String.raw`\Phi = \Phi_m \sin\omega t`}</K> }]],
    },
    {
      say: 'Supply AC nai kina? DC le constant flux dincha: d phi by d t zero, secondary EMF zero. Primary ma opposing EMF pani hudaina, so R 1 matra le current limit garcha ra winding burn huncha.',
      voice: 'सप्लाई ए सी नै किन? डी सीले कन्स्टेन्ट फ्लक्स दिन्छ — डी फाइ बाइ डी टी जिरो, सेकेन्डरी ई एम एफ जिरो। प्राइमरीमा अपोजिङ ई एम एफ पनि हुँदैन, सो आर वानले मात्र करेन्ट लिमिट गर्छ, र वाइन्डिङ बर्न हुन्छ।',
      lines: [br('Why must the supply be AC?', <Pts items={[<>DC: constant flux → dΦ/dt = 0 → no secondary EMF</>, <>No self-induced EMF in the primary either</>, <>Only R<sub>1</sub> limits the current → winding burns</>]} />)],
      ask: {
        q: 'Transformer ko primary DC supply ma jodda secondary EMF kati huncha?',
        voice: 'ट्रान्सफर्मरको प्राइमरी डी सी सप्लाईमा जोड्दा सेकेन्डरी ई एम एफ कति हुन्छ?',
        options: ['Zero', 'Supply voltage barabar', 'Turns ratio times supply voltage'],
        answer: 0,
        why: 'DC le constant flux dincha; dΦ/dt = 0, tesaile e = −N dΦ/dt = 0.',
      },
    },
    {
      page: true,
      say: 'Yahi flux secondary N 2 sanga pani link huncha, ra mutual induction le e 2 equals minus N 2 d phi by d t induce huncha. Primary ko e 1 le chai V 1 lai oppose garcha.',
      voice: 'यही फ्लक्स सेकेन्डरी एन टुसँग पनि लिङ्क हुन्छ, र म्युचुअल इन्डक्सनले — ई टु इक्वल्स माइनस एन टु डी फाइ बाइ डी टी — इन्ड्युस हुन्छ। प्राइमरीको ई वानले चाहिँ भी वानलाई अपोज गर्छ।',
      lines: [['step', <>Same flux links N<sub>2</sub>: mutual induction{tex(String.raw`\begin{aligned} e_1 &= -N_1\dfrac{d\Phi}{dt} \\ e_2 &= -N_2\dfrac{d\Phi}{dt} \end{aligned}`)}</>, undefined, { carry: <>Mutual induction: <K>{String.raw`e_2 = -N_2\,d\Phi/dt`}</K></> }]],
    },
    {
      say: 'Secondary ma load jodda secondary current I 2 bagcha, ra power load samma pugcha. Primary ra secondary electrically connected chainan; power magnetic flux le transfer huncha, ra frequency ustai rahancha.',
      voice: 'सेकेन्डरीमा लोड जोड्दा सेकेन्डरी करेन्ट आई टु बग्छ, र पावर लोडसम्म पुग्छ। प्राइमरी र सेकेन्डरी इलेक्ट्रिकल्ली कनेक्टेड छैनन्, पावर म्याग्नेटिक फ्लक्सले ट्रान्सफर हुन्छ, र फ्रिक्वेन्सी उस्तै रहन्छ।',
      lines: [['step', <>Load connected → I<sub>2</sub> flows; no electrical connection, power passes through the flux; frequency unchanged</>]],
      ask: {
        q: 'Transformer le kun quantity change gardaina?',
        voice: 'ट्रान्सफर्मरले कुन क्वान्टिटी चेन्ज गर्दैन?',
        options: ['Frequency', 'Voltage', 'Current'],
        answer: 0,
        why: 'Secondary EMF eutai flux bata induce huncha, tesaile yasko frequency supply ko frequency nai huncha.',
      },
    },
    {
      say: 'Recap: AC V 1 bata alternating flux, flux dubai winding sanga link, mutual induction le secondary ma EMF, ra frequency ustai. Yo EMF kati huncha, arko video ma derive garchau.',
      voice: 'रिक्याप — ए सी भी वानबाट अल्टरनेटिङ फ्लक्स, फ्लक्स दुवै वाइन्डिङसँग लिङ्क, म्युचुअल इन्डक्सनले सेकेन्डरीमा ई एम एफ, र फ्रिक्वेन्सी उस्तै। यो ई एम एफ कति हुन्छ, अर्को भिडियोमा डिराइभ गर्छौं।',
      lines: [['idea', <>Recap: AC V<sub>1</sub> → alternating Φ → links both windings → EMF in the secondary by mutual induction · same frequency · AC only</>]],
    },
  ],
  lecturer: [
    {
      say: 'Smaran garau: Faraday ko law anusar flux linkage change huda EMF induce huncha, ra Lenz ko law anusar tyo EMF le aafno cause lai oppose garcha.',
      voice: 'स्मरण गरौं — फाराडेको ल अनुसार फ्लक्स लिङ्केज चेन्ज हुँदा ई एम एफ इन्ड्युस हुन्छ, र लेन्जको ल अनुसार त्यो ई एम एफले आफ्नो कजलाई अपोज गर्छ।',
      lines: [['h', <>Working principle of a transformer (Fig. 2.1)</>], rem(<>Faraday: <K>{String.raw`e = -N\,\dfrac{d\Phi}{dt}`}</K></>, <>Lenz: the induced EMF opposes its cause</>)],
    },
    {
      say: 'Definition: transformer static device ho jasle electrical power lai euta circuit bata arko circuit ma, frequency change nagari, mutual induction dwara transfer garcha.',
      voice: 'डेफिनिसन — ट्रान्सफर्मर स्टाटिक डिभाइस हो, जसले इलेक्ट्रिकल पावरलाई एउटा सर्किटबाट अर्को सर्किटमा, फ्रिक्वेन्सी चेन्ज नगरी, म्युचुअल इन्डक्सनद्वारा ट्रान्सफर गर्छ।',
      lines: [['step', <><i>A transformer is a static device which transfers electrical power from one circuit to another without change of frequency, by mutual induction.</i></>]],
    },
    {
      say: 'Primary winding, N 1 turns, lai AC supply V 1 ma jodda magnetising current I mu bagcha.',
      voice: 'प्राइमरी वाइन्डिङ, एन वान टर्न्स, लाई ए सी सप्लाई भी वानमा जोड्दा म्याग्नेटाइजिङ करेन्ट आई म्यु बग्छ।',
      lines: [['step', <>The primary winding of N<sub>1</sub> turns is connected to the AC supply V<sub>1</sub>; a magnetising current I<sub>μ</sub> flows.</>]],
    },
    {
      say: 'I mu le core ma alternating flux phi equals phi m sin omega t set up garcha, equation ek.',
      voice: 'आई म्यु ले कोरमा अल्टरनेटिङ फ्लक्स — फाइ इक्वल्स फाइ एम साइन ओमेगा टी — सेट अप गर्छ, इक्वेसन वान।',
      lines: [['step', <>I<sub>μ</sub> sets up an alternating flux in the core,{tex(String.raw`\Phi = \Phi_m \sin \omega t \qquad \cdots(1)`)}</>, undefined, { carry: <K>{String.raw`\Phi = \Phi_m \sin\omega t \quad (1)`}</K> }]],
    },
    {
      say: 'DC supply ma flux constant hune bhayeko le d phi by d t zero huncha; EMF induce hudaina, ra primary current resistance le matra limit bhayera winding damage huncha.',
      voice: 'डी सी सप्लाईमा फ्लक्स कन्स्टेन्ट हुने भएकोले, डी फाइ बाइ डी टी जिरो हुन्छ। ई एम एफ इन्ड्युस हुँदैन, र प्राइमरी करेन्ट रेजिस्टेन्सले मात्र लिमिट भएर वाइन्डिङ ड्यामेज हुन्छ।',
      lines: [br('Transformer on DC', <Pts items={[<>Constant flux: dΦ/dt = 0, no induced EMF</>, <>Current limited by R<sub>1</sub> only: winding burns</>]} />)],
      ask: {
        q: 'Transformer DC supply ma kina kaam gardaina?',
        voice: 'ट्रान्सफर्मर डी सी सप्लाईमा किन काम गर्दैन?',
        options: ['DC le constant flux dincha, dΦ/dt = 0', 'DC ko voltage low huncha', 'Core saturate hudaina'],
        answer: 0,
        why: 'EMF flux ko rate of change le induce huncha; constant flux ma EMF zero.',
      },
    },
    {
      page: true,
      say: 'Yo flux secondary winding N 2 sanga link bhayera mutual induction le e 2 induce garcha; primary ma self-induced e 1 le V 1 lai oppose garcha, equation dui ra tin.',
      voice: 'यो फ्लक्स सेकेन्डरी वाइन्डिङ एन टुसँग लिङ्क भएर म्युचुअल इन्डक्सनले ई टु इन्ड्युस गर्छ। प्राइमरीमा सेल्फ इन्ड्युस्ड ई वानले भी वानलाई अपोज गर्छ, इक्वेसन टु र थ्री।',
      lines: [['step', <>The flux links the secondary (N<sub>2</sub>); by mutual induction,{tex(String.raw`\begin{aligned} e_1 &= -N_1\dfrac{d\Phi}{dt} && \cdots(2) \\ e_2 &= -N_2\dfrac{d\Phi}{dt} && \cdots(3) \end{aligned}`)}</>, undefined, { carry: <><K>{String.raw`e_2 = -N_2\,d\Phi/dt \quad (3)`}</K></> }]],
    },
    {
      say: 'Secondary circuit close garda I 2 bagcha ra power load ma transfer huncha; dui winding bich electrical connection hudaina, ra frequency same rahancha.',
      voice: 'सेकेन्डरी सर्किट क्लोज गर्दा आई टु बग्छ, र पावर लोडमा ट्रान्सफर हुन्छ। दुई वाइन्डिङबीच इलेक्ट्रिकल कनेक्सन हुँदैन, र फ्रिक्वेन्सी सेम रहन्छ।',
      lines: [['step', <>With the secondary closed, I<sub>2</sub> flows and power is delivered to the load; there is no electrical connection, and the frequency is unchanged.</>]],
      ask: {
        q: 'Transformer ko primary ra secondary bich power kasari transfer huncha?',
        voice: 'ट्रान्सफर्मरको प्राइमरी र सेकेन्डरीबीच पावर कसरी ट्रान्सफर हुन्छ?',
        options: ['Mutual flux (magnetic coupling) bata', 'Direct electrical connection bata', 'Rotating shaft bata'],
        answer: 0,
        why: 'Dui winding electrically isolated hunchan; common core ko mutual flux le EMF induce garcha.',
      },
    },
    {
      say: 'Saransha: AC supply le alternating mutual flux banaucha, jasle mutual induction dwara secondary ma same frequency ko EMF induce garcha.',
      voice: 'सारांश — ए सी सप्लाईले अल्टरनेटिङ म्युचुअल फ्लक्स बनाउँछ, जसले म्युचुअल इन्डक्सनद्वारा सेकेन्डरीमा सेम फ्रिक्वेन्सीको ई एम एफ इन्ड्युस गर्छ।',
      lines: [['idea', <>Summary: AC supply → alternating mutual flux → EMF induced in the secondary by mutual induction, at the same frequency</>]],
    },
  ],
});

/* ── 2.2 Syllabus Content: EMF equation and turns ratio ──────────────── */
// Canvas plan: heading · Remember (Faraday, RMS = max/√2, ω = 2πf) · Let
// (N1, N2, Φm, f) · flux, e1 by differentiation, why the 90° lag · page turn
// (carry Φ, e1) · E1m, RMS, why 4.44, boxed E1, E2 · turns ratio K with the
// IOE 2075 numbers (KBT notes) · recap. Right: Fig. 2.1.
// Recomputed: 2π/√2 = 4.4429; 2075: E2 = (100/500) × 3000 = 600 V,
// Φm = 3000/(4.44 × 50 × 500) = 0.02703 Wb.
export const emf21 = duo('Derivation: EMF equation of a transformer', {
  draw: figAt(xfmrFigure, { 0: 1, 1: 1, 2: 2, 3: 7, 4: 8 }),
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Derivation ko lagi tin kura yaad garau: Faraday ko law, e equals minus N d phi by d t; sine wave ko RMS value maximum over root two; ra omega equals two pi f.',
      voice: 'डिराइभेसनको लागि तीन कुरा याद गरौं — फाराडेको ल, ई इक्वल्स माइनस एन डी फाइ बाइ डी टी, साइन वेभको आर एम एस भ्यालु म्याक्सिमम ओभर रुट टु, र ओमेगा इक्वल्स टु पाइ एफ।',
      lines: [['h', <>Derivation: EMF equation of a transformer</>], rem(<K>{String.raw`e = -N\,\dfrac{d\Phi}{dt}`}</K>, <>Sine wave: RMS = maximum ÷ √2</>, <K>{String.raw`\omega = 2\pi f`}</K>)],
    },
    {
      say: 'Let: N 1 primary turns, N 2 secondary turns, phi m core ko maximum flux weber ma, ra f supply frequency hertz ma.',
      voice: 'लेट — एन वान प्राइमरी टर्न्स, एन टु सेकेन्डरी टर्न्स, फाइ एम कोरको म्याक्सिमम फ्लक्स वेबरमा, र एफ सप्लाई फ्रिक्वेन्सी हर्ट्जमा।',
      lines: [['step', <Let items={[<>N<sub>1</sub> = primary turns</>, <>N<sub>2</sub> = secondary turns</>, <>Φ<sub>m</sub> = maximum flux (Wb)</>, <>f = supply frequency (Hz)</>]} />, undefined, { carry: <>N<sub>1</sub>, N<sub>2</sub>, Φ<sub>m</sub>, f as defined</> }]],
    },
    {
      say: 'Sinusoidal supply le sinusoidal flux dincha: phi equals phi m sin omega t.',
      voice: 'साइनसोइडल सप्लाईले साइनसोइडल फ्लक्स दिन्छ — फाइ इक्वल्स फाइ एम साइन ओमेगा टी।',
      lines: [['step', step('Flux in the core', String.raw`\Phi = \Phi_m \sin \omega t \unit{weber}`), undefined, { carry: <K>{String.raw`\Phi = \Phi_m\sin\omega t`}</K> }]],
    },
    {
      say: 'Faraday ko law ma yo flux rakhau. Differentiate garda e 1 equals minus N 1 omega phi m cos omega t, arthat N 1 omega phi m sin omega t minus 90 degree.',
      voice: 'फाराडेको लमा यो फ्लक्स राखौं। डिफरेन्सियट गर्दा — ई वान इक्वल्स माइनस एन वान ओमेगा फाइ एम कस ओमेगा टी, अर्थात एन वान ओमेगा फाइ एम, साइन ओमेगा टी माइनस नाइन्टी डिग्री।',
      lines: [['step', step('Primary EMF (Faraday)', String.raw`\begin{aligned} e_1 &= -N_1\dfrac{d}{dt}(${X(String.raw`\Phi_m\sin\omega t`, INK.BL)}) \\ &= -N_1${R(String.raw`\omega\Phi_m\cos\omega t`, INK.BL, 1)} \\ &= N_1\omega\Phi_m\sin(\omega t - 90^\circ) \end{aligned}`), undefined, { carry: <K>{String.raw`e_1 = N_1\omega\Phi_m\sin(\omega t - 90^\circ)`}</K> }]],
    },
    {
      say: 'Minus cos kasari sin omega t minus 90 bhayo? Minus cos omega t ra sin omega t minus 90 degree eutai wave ho. Yesko matlab e 1 le flux lai 90 degree le lag garcha.',
      voice: 'माइनस कस कसरी साइन ओमेगा टी माइनस नाइन्टी भयो? माइनस कस ओमेगा टी, र साइन ओमेगा टी माइनस नाइन्टी डिग्री, एउटै वेभ हो। यसको मतलब ई वानले फ्लक्सलाई नाइन्टी डिग्रीले ल्याग गर्छ।',
      lines: [br('Why sin(ωt − 90°)?', <Pts items={[<><K>{String.raw`-\cos\omega t = \sin(\omega t - 90^\circ)`}</K></>, <>So e<sub>1</sub> lags the flux by 90°</>, <>Its peak is reached when |cos ωt| = 1</>]} />)],
    },
    {
      page: true,
      say: 'Maximum value E 1 m equals N 1 omega phi m; omega ko thau ma two pi f rakhau. RMS value chai maximum over root two.',
      voice: 'म्याक्सिमम भ्यालु — ई वान एम इक्वल्स एन वान ओमेगा फाइ एम, ओमेगाको ठाउँमा टु पाइ एफ राखौं। आर एम एस भ्यालु चाहिँ म्याक्सिमम ओभर रुट टु।',
      lines: [['step', step('Maximum, then RMS value', String.raw`\begin{aligned} E_{1m} &= N_1\,${X(String.raw`\omega`, INK.VI)}\,\Phi_m \\ &= ${R(String.raw`2\pi f`, INK.VI, 1)}\,N_1\Phi_m \\ E_1 &= \dfrac{E_{1m}}{\sqrt 2} \\ &= \dfrac{2\pi}{\sqrt 2}\,f N_1\Phi_m \end{aligned}`)]],
    },
    {
      say: '4.44 kaha bata aaucha? Two pi over root two equals 4.443, round garda 4.44. Yo number sinusoidal flux ko lagi matra ho.',
      voice: 'फोर पोइन्ट फोर फोर कहाँबाट आउँछ? टु पाइ ओभर रुट टु इक्वल्स फोर पोइन्ट फोर फोर थ्री, राउन्ड गर्दा फोर पोइन्ट फोर फोर। यो नम्बर साइनसोइडल फ्लक्सको लागि मात्र हो।',
      lines: [br('Where does 4.44 come from?', tex(String.raw`\begin{aligned} \dfrac{2\pi}{\sqrt 2} &= 4.443 \\ &\approx 4.44 \end{aligned}`))],
      ask: {
        q: 'EMF equation ko 4.44 kun ratio bata aaucha?',
        voice: 'ई एम एफ इक्वेसनको फोर पोइन्ट फोर फोर कुन रेसियोबाट आउँछ?',
        options: ['2π / √2', '√2 / 2π', '2 / π'],
        answer: 0,
        why: 'E1 = E1m/√2 = (2π/√2) f N1 Φm, ra 2π/√2 = 4.443.',
      },
    },
    {
      say: 'Tesaile primary EMF E 1 equals 4.44 f N 1 phi m volt. Eutai flux secondary ma pani link bhayeko le E 2 equals 4.44 f N 2 phi m volt.',
      voice: 'त्यसैले प्राइमरी ई एम एफ — ई वान इक्वल्स फोर पोइन्ट फोर फोर एफ एन वान फाइ एम भोल्ट। एउटै फ्लक्स सेकेन्डरीमा पनि लिङ्क भएकोले, ई टु इक्वल्स फोर पोइन्ट फोर फोर एफ एन टु फाइ एम भोल्ट।',
      lines: [['eq', tex(String.raw`E_1 = 4.44\,f N_1 \Phi_m \unit{volt}`)], ['eq', tex(String.raw`E_2 = 4.44\,f N_2 \Phi_m \unit{volt}`)]],
    },
    {
      say: 'Bhag garda E 2 over E 1 equals N 2 over N 1 equals K, transformation ratio. IOE 2075: 500 ra 100 turns, V 1 3000 volt, so E 2 600 volt.',
      voice: 'भाग गर्दा, ई टु ओभर ई वान इक्वल्स एन टु ओभर एन वान इक्वल्स के, ट्रान्सफर्मेसन रेसियो। आई ओ ई दुई हजार पचहत्तर — पाँच सय र एक सय टर्न्स, भी वान तीन हजार भोल्ट, सो ई टु छ सय भोल्ट।',
      lines: [['step', step('Transformation ratio', String.raw`\begin{aligned} K &= \dfrac{E_2}{E_1} \\ &= \dfrac{N_2}{N_1} \end{aligned}`)], ['note', <>K &gt; 1 step-up · K &lt; 1 step-down · IOE 2075: E<sub>2</sub> = (100/500) × 3000 = 600 V</>]],
      ask: {
        q: 'IOE 2075: 500/100 turns ko transformer 3000 V, 50 Hz ma jodda maximum flux Φm kati huncha?',
        voice: 'आई ओ ई दुई हजार पचहत्तर — पाँच सय बाई एक सय टर्न्सको ट्रान्सफर्मर तीन हजार भोल्ट, पचास हर्ट्जमा जोड्दा म्याक्सिमम फ्लक्स फाइ एम कति हुन्छ?',
        options: ['0.027 Wb', '0.135 Wb', '0.0054 Wb'],
        answer: 0,
        why: 'Φm = E1/(4.44 f N1) = 3000/(4.44 × 50 × 500) = 0.027 Wb.',
      },
    },
    {
      say: 'Recap: E equals 4.44 f N phi m. EMF turns, frequency ra maximum flux teenai sanga proportional, ra voltage ratio turns ratio K barabar.',
      voice: 'रिक्याप — ई इक्वल्स फोर पोइन्ट फोर फोर एफ एन फाइ एम। ई एम एफ टर्न्स, फ्रिक्वेन्सी र म्याक्सिमम फ्लक्स तीनैसँग प्रोपोर्सनल, र भोल्टेज रेसियो टर्न्स रेसियो के बराबर।',
      lines: [['idea', <>Recap: <K>{String.raw`E = 4.44\,fN\Phi_m`}</K> · E ∝ f, N, Φ<sub>m</sub> · E<sub>2</sub>/E<sub>1</sub> = N<sub>2</sub>/N<sub>1</sub> = K</>]],
    },
  ],
  lecturer: [
    {
      say: 'Smaran garau: Faraday ko law e equals minus N d phi by d t, RMS value maximum over root two, ra omega equals two pi f.',
      voice: 'स्मरण गरौं — फाराडेको ल, ई इक्वल्स माइनस एन डी फाइ बाइ डी टी, आर एम एस भ्यालु म्याक्सिमम ओभर रुट टु, र ओमेगा इक्वल्स टु पाइ एफ।',
      lines: [['h', <>EMF equation of a transformer (Fig. 2.1)</>], rem(<K>{String.raw`e = -N\,d\Phi/dt`}</K>, <>RMS = maximum ÷ √2 · ω = 2πf</>)],
    },
    {
      say: 'Let N 1 ra N 2 primary ra secondary turns, phi m maximum flux weber ma, ra f supply frequency hertz ma.',
      voice: 'लेट, एन वान र एन टु प्राइमरी र सेकेन्डरी टर्न्स, फाइ एम म्याक्सिमम फ्लक्स वेबरमा, र एफ सप्लाई फ्रिक्वेन्सी हर्ट्जमा।',
      lines: [['step', <Let items={[<>N<sub>1</sub>, N<sub>2</sub> = primary and secondary turns</>, <>Φ<sub>m</sub> = maximum value of flux (Wb)</>, <>f = frequency of the supply (Hz)</>]} />, undefined, { carry: <>N<sub>1</sub>, N<sub>2</sub>, Φ<sub>m</sub>, f</> }]],
    },
    {
      say: 'Sinusoidal supply ma core ko flux phi equals phi m sin omega t, equation ek.',
      voice: 'साइनसोइडल सप्लाईमा कोरको फ्लक्स — फाइ इक्वल्स फाइ एम साइन ओमेगा टी, इक्वेसन वान।',
      lines: [['step', <>The flux in the core is{tex(String.raw`\Phi = \Phi_m\sin\omega t \qquad \cdots(1)`)}</>, undefined, { carry: <K>{String.raw`\Phi = \Phi_m\sin\omega t \quad (1)`}</K> }]],
    },
    {
      say: 'Faraday ko law anusar, equation ek prayog garda, e 1 equals N 1 omega phi m sin omega t minus 90 degree, equation dui.',
      voice: 'फाराडेको ल अनुसार, इक्वेसन वान प्रयोग गर्दा, ई वान इक्वल्स एन वान ओमेगा फाइ एम, साइन ओमेगा टी माइनस नाइन्टी डिग्री, इक्वेसन टु।',
      lines: [['step', <>By Faraday’s law, using (1),{tex(String.raw`\begin{aligned} e_1 &= -N_1\dfrac{d\Phi}{dt} && \\ &= -N_1\omega\Phi_m\cos\omega t && \\ &= N_1\omega\Phi_m\sin(\omega t - 90^\circ) && \cdots(2) \end{aligned}`)}</>, undefined, { carry: <K>{String.raw`e_1 = N_1\omega\Phi_m\sin(\omega t - 90^\circ) \quad (2)`}</K> }]],
    },
    {
      say: 'Equation dui le dekhaucha: induced EMF le flux lai 90 degree le lag garcha, ra yesko maximum value N 1 omega phi m ho.',
      voice: 'इक्वेसन टुले देखाउँछ — इन्ड्युस्ड ई एम एफले फ्लक्सलाई नाइन्टी डिग्रीले ल्याग गर्छ, र यसको म्याक्सिमम भ्यालु एन वान ओमेगा फाइ एम हो।',
      lines: [br('From (2)', <Pts items={[<>e<sub>1</sub> lags Φ by 90°</>, <>Maximum value E<sub>1m</sub> = N<sub>1</sub>ωΦ<sub>m</sub></>]} />)],
    },
    {
      page: true,
      say: 'Maximum value E 1 m equals two pi f N 1 phi m, ra RMS value E 1 equals E 1 m over root two, equation tin.',
      voice: 'म्याक्सिमम भ्यालु — ई वान एम इक्वल्स टु पाइ एफ एन वान फाइ एम, र आर एम एस भ्यालु — ई वान इक्वल्स ई वान एम ओभर रुट टु, इक्वेसन थ्री।',
      lines: [['step', <>Maximum and RMS values,{tex(String.raw`\begin{aligned} E_{1m} &= 2\pi f N_1\Phi_m && \\ E_1 &= \dfrac{E_{1m}}{\sqrt 2} && \\ &= \dfrac{2\pi}{\sqrt 2}\,fN_1\Phi_m && \cdots(3) \end{aligned}`)}</>]],
    },
    {
      say: 'Equation tin ma two pi over root two equals 4.443, arthat 4.44.',
      voice: 'इक्वेसन थ्रीमा टु पाइ ओभर रुट टु इक्वल्स फोर पोइन्ट फोर फोर थ्री, अर्थात फोर पोइन्ट फोर फोर।',
      lines: [br('The factor 4.44', tex(String.raw`\begin{aligned} \dfrac{2\pi}{\sqrt 2} &= 4.443 \\ &\approx 4.44 \end{aligned}`))],
      ask: {
        q: 'Transformer ko EMF equation ma 4.44 kasari aaucha?',
        voice: 'ट्रान्सफर्मरको ई एम एफ इक्वेसनमा फोर पोइन्ट फोर फोर कसरी आउँछ?',
        options: ['2π/√2', '√2 × π', '2/π'],
        answer: 0,
        why: 'E1 = E1m/√2 = (2π/√2) f N1 Φm = 4.44 f N1 Φm.',
      },
    },
    {
      say: 'Tesaile E 1 equals 4.44 f N 1 phi m, ra secondary ko lagi tyastai E 2 equals 4.44 f N 2 phi m, equation char ra panch.',
      voice: 'त्यसैले ई वान इक्वल्स फोर पोइन्ट फोर फोर एफ एन वान फाइ एम, र सेकेन्डरीको लागि त्यस्तै ई टु इक्वल्स फोर पोइन्ट फोर फोर एफ एन टु फाइ एम, इक्वेसन फोर र फाइभ।',
      lines: [['step', <>∴ From (3), and similarly for the secondary,{tex(String.raw`\begin{aligned} &\boxed{E_1 = 4.44\,fN_1\Phi_m} && \cdots(4) \\ &\boxed{E_2 = 4.44\,fN_2\Phi_m} && \cdots(5) \end{aligned}`)}</>]],
    },
    {
      say: 'Equation panch lai char le bhag garda E 2 over E 1 equals N 2 over N 1 equals K, transformation ratio. IOE 2075 ko data ma E 2 equals 600 volt aaucha.',
      voice: 'इक्वेसन फाइभलाई फोरले भाग गर्दा, ई टु ओभर ई वान इक्वल्स एन टु ओभर एन वान इक्वल्स के, ट्रान्सफर्मेसन रेसियो। आई ओ ई दुई हजार पचहत्तरको डाटामा ई टु इक्वल्स छ सय भोल्ट आउँछ।',
      lines: [['step', <>Dividing (5) by (4),{tex(String.raw`\begin{aligned} K &= \dfrac{E_2}{E_1} \\ &= \dfrac{N_2}{N_1} \end{aligned}`)}</>], ['note', <>K &gt; 1 step-up, K &lt; 1 step-down · IOE 2075 (N<sub>1</sub> = 500, N<sub>2</sub> = 100, 3000 V): E<sub>2</sub> = 600 V</>]],
      ask: {
        q: 'IOE 2075: 500 primary turns, 3000 V, 50 Hz bhaye core ko maximum flux kati?',
        voice: 'आई ओ ई दुई हजार पचहत्तर — पाँच सय प्राइमरी टर्न्स, तीन हजार भोल्ट, पचास हर्ट्ज भए कोरको म्याक्सिमम फ्लक्स कति?',
        options: ['0.027 Wb', '0.27 Wb', '0.0027 Wb'],
        answer: 0,
        why: 'Φm = 3000/(4.44 × 50 × 500) = 0.027 Wb.',
      },
    },
    {
      say: 'Saransha: E equals 4.44 f N phi m, ra voltage ratio turns ratio K barabar huncha.',
      voice: 'सारांश — ई इक्वल्स फोर पोइन्ट फोर फोर एफ एन फाइ एम, र भोल्टेज रेसियो टर्न्स रेसियो के बराबर हुन्छ।',
      lines: [['idea', <>Summary: <K>{String.raw`E = 4.44\,fN\Phi_m`}</K> · <K>{String.raw`E_2/E_1 = N_2/N_1`}</K> (= K)</>]],
    },
  ],
});

export const emfAnswer21 = answer('Model answer: principle and EMF equation of an ideal transformer', {
  draw: xfmrFigure,
  viewBox: '0 0 360 220',
  papers: ['2072 Ashwin'],
  q: 'Explain the operating principle of an ideal transformer and derive the emf equation.',
  read: {
    say: 'IOE 2072 Ashwin: explain the operating principle of an ideal transformer and derive the emf equation.',
    voice: 'आई ओ ई दुई हजार बहत्तर असोज — एक्सप्लेन द अपरेटिङ प्रिन्सिपल अफ एन आइडियल ट्रान्सफर्मर एन्ड डिराइभ द ई एम एफ इक्वेसन।',
  },
  points: [
    {
      node: <><H>Ideal transformer</H><Pts items={[<>No winding resistance, no leakage flux, no core loss, infinitely permeable core</>]} /></>,
      say: 'Ideal transformer: no winding resistance, no leakage flux, no core loss, and an infinitely permeable core.',
      voice: 'आइडियल ट्रान्सफर्मर — नो वाइन्डिङ रेजिस्टेन्स, नो लिकेज फ्लक्स, नो कोर लस, एन्ड एन इन्फिनिट्ली पर्मिएबल कोर।',
    },
    {
      node: <><H>Operating principle</H><Pts items={[<>V<sub>1</sub> on the primary sets up an alternating flux Φ<sub>m</sub> sin ωt in the core (Fig. 2.1)</>, <>The flux links the secondary; by mutual induction an EMF E<sub>2</sub> is induced at the same frequency</>]} /></>,
      say: 'Principle: V 1 sets up an alternating flux in the core. It links the secondary, and by mutual induction an EMF E 2 is induced at the same frequency.',
      voice: 'प्रिन्सिपल — भी वान सेट्स अप एन अल्टरनेटिङ फ्लक्स इन द कोर। इट लिङ्क्स द सेकेन्डरी, एन्ड बाइ म्युचुअल इन्डक्सन एन ई एम एफ ई टु इज इन्ड्युस्ड एट द सेम फ्रिक्वेन्सी।',
    },
    {
      page: true,
      node: <><H>EMF equation</H>Let <K>{String.raw`\Phi = \Phi_m\sin\omega t`}</K>.<K>{String.raw`\begin{aligned} e_1 &= -N_1\dfrac{d\Phi}{dt} \\ &= N_1\omega\Phi_m\sin(\omega t - 90^\circ) \end{aligned}`}</K></>,
      say: 'Let phi equal phi m sin omega t. Then e 1 equals minus N 1 d phi by d t, which equals N 1 omega phi m sin omega t minus 90 degrees.',
      voice: 'लेट फाइ इक्वल फाइ एम साइन ओमेगा टी। देन ई वान इक्वल्स माइनस एन वान डी फाइ बाइ डी टी, ह्विच इक्वल्स एन वान ओमेगा फाइ एम साइन ओमेगा टी माइनस नाइन्टी डिग्रिज।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} E_1 &= \dfrac{2\pi f N_1\Phi_m}{\sqrt 2} \\ \therefore\ E_1 &= \boxed{4.44 f N_1 \Phi_m} \end{aligned}`}</K></>,
      say: 'RMS: E 1 equals 2 pi f N 1 phi m over root 2. Therefore E 1 equals 4.44 f N 1 phi m.',
      voice: 'आर एम एस — ई वान इक्वल्स टु पाइ एफ एन वान फाइ एम ओभर रुट टु। देयरफोर ई वान इक्वल्स फोर पोइन्ट फोर फोर एफ एन वान फाइ एम।',
    },
    {
      node: <><K>{String.raw`\boxed{E_2 = 4.44 f N_2 \Phi_m}`}</K><K>{String.raw`\begin{aligned} \therefore\ \dfrac{E_2}{E_1} &= \dfrac{N_2}{N_1} \\ &= K \end{aligned}`}</K></>,
      say: 'Similarly E 2 equals 4.44 f N 2 phi m, and E 2 over E 1 equals N 2 over N 1 equals K.',
      voice: 'सिमिलर्ली ई टु इक्वल्स फोर पोइन्ट फोर फोर एफ एन टु फाइ एम, एन्ड ई टु ओभर ई वान इक्वल्स एन टु ओभर एन वान इक्वल्स के।',
      ask: {
        q: '230/115 V transformer ko K kati?',
        voice: 'दुई सय तीस बटा एक सय पन्ध्र भोल्ट ट्रान्सफर्मरको के कति?',
        options: ['0.5', '2', '1'],
        answer: 0,
        why: 'K = E2/E1 = 115/230 = 0.5 (step-down).',
      },
    },
  ],
});

/* ── 2.2 Ideal transformer, no load and load ─────────────────────────── */
export const basics22 = duo('2.4 · Basic understanding: what happens when a transformer is loaded?', {
  three: transformerTour([
    { shot: 'whole', show: FED, focus: ['core', 'primary', 'secondary'], labels: [['loss chaina', [0, 2.3, 0.6]]] },
    { shot: 'source', flow: 0.2, flux: 1, focus: ['primary', 'source'], labels: [['sano current', 'primary']] },
    { shot: 'core', flux: 1, focus: ['core'], labels: [['flux banaune matra', 'flux']] },
    { shot: 'load', show: LOADED, flow: 0.2, flux: 1, flow2: 1, focus: ['secondary', 'lamp'], labels: [['load ma current', 'lamp']] },
    { shot: 'source', flow: 1, flow2: 1, focus: ['primary', 'source'], labels: [['primary current badhyo', 'primary']] },
    { shot: 'core', flux: 1, focus: ['core'], labels: [['flux ustai', 'flux']] },
    { shot: 'whole', flow: 1, flow2: 1, focus: ['primary', 'secondary'], labels: [['ulto magnet', 'secondary'], ['milaune', 'primary']] },
    { shot: 'whole', focus: null },
  ]),
  tutor: [
    {
      say: 'Pahila sapana ko transformer socha: kunai loss chaina, tar ma resistance chaina, sabai flux dubai coil ma pugcha. Yo ideal transformer.',
      voice: 'पहिला सपनाको ट्रान्सफर्मर सोच — कुनै लस छैन, तारमा रेजिस्टेन्स छैन, सबै फ्लक्स दुवै कोइलमा पुग्छ। यो आइडियल ट्रान्सफर्मर।',
      lines: [['h', <>2.4 · Load lagauda k huncha?</>], part(<>Ideal</>, <>kunai loss chaina, sabai flux dubai coil ma</>)],
    },
    {
      say: 'Secondary ma kei jodeko chaina. Tara pani primary le sano current lincha.',
      voice: 'सेकेन्डरीमा केही जोडेको छैन। तर पनि प्राइमरीले सानो करेन्ट लिन्छ।',
      lines: [part(<>No load</>, <>primary ma sano current</>)],
    },
    {
      say: 'Tyo sano current ko kaam core ma flux banaunu matra ho. Yahi no-load current.',
      voice: 'त्यो सानो करेन्टको काम कोरमा फ्लक्स बनाउनु मात्र हो। यही नो लोड करेन्ट।',
      lines: [chain(<>Sano current → flux banaune matra (no-load current)</>)],
    },
    {
      say: 'Aba bulb jodau. Secondary ma current bagcha, bulb balcha.',
      voice: 'अब बल्ब जोडौं। सेकेन्डरीमा करेन्ट बग्छ, बल्ब बल्छ।',
      lines: [chain(<>Load jodyo → secondary current</>)],
    },
    {
      say: 'Ani primary le aafai badhi current tancha, kasaile nabhani. Kina?',
      voice: 'अनि प्राइमरीले आफैं बढी करेन्ट तान्छ, कसैले नभनी। किन?',
      lines: [['step', <>Primary current aafai badhcha</>]],
    },
    {
      say: 'Secondary current le ulto magnet banaucha. Primary ko thap current le tyo ulto magnet cancel garcha, tesaile core ko flux ustai rahancha.',
      voice: 'सेकेन्डरी करेन्टले उल्टो म्याग्नेट बनाउँछ। प्राइमरीको थप करेन्टले त्यो उल्टो म्याग्नेट क्यान्सिल गर्छ, त्यसैले कोरको फ्लक्स उस्तै रहन्छ।',
      lines: [chain(<>Secondary ko ulto magnet ↔ primary ko thap current → flux ustai</>)],
      ask: {
        q: 'Load badhda core ko flux k huncha?',
        voice: 'लोड बढ्दा कोरको फ्लक्स के हुन्छ?',
        options: ['Lagbhag ustai rahancha', 'Dherai badhcha', 'Zero huncha'],
        answer: 0,
        why: 'Primary ko thap current le secondary ko ulto magnet cancel garcha.',
      },
    },
    {
      say: 'Yesari load jati badhyo, primary le utti nai badhi power supply bata tancha. Transformer aafai milaucha.',
      voice: 'यसरी लोड जति बढ्यो, प्राइमरीले उति नै बढी पावर सप्लाईबाट तान्छ। ट्रान्सफर्मर आफैं मिलाउँछ।',
      lines: [chain(<>Load ↑ → primary power ↑: aafai milaucha</>)],
    },
    {
      say: 'Saransha: no load ma sano current le flux banaucha; load ma primary le secondary ko ulto magnet cancel garcha; flux ustai.',
      voice: 'सारांश — नो लोडमा सानो करेन्टले फ्लक्स बनाउँछ, लोडमा प्राइमरीले सेकेन्डरीको उल्टो म्याग्नेट क्यान्सिल गर्छ, फ्लक्स उस्तै।',
      lines: [['idea', <>No load: sano current → flux · load: primary cancels → flux ustai</>]],
    },
  ],
  lecturer: [
    {
      say: 'Ideal transformer ma winding resistance, leakage flux ra core loss kei pani hudaina.',
      voice: 'आइडियल ट्रान्सफर्मरमा वाइन्डिङ रेजिस्टेन्स, लिकेज फ्लक्स, र कोर लस केही पनि हुँदैन।',
      lines: [['h', <>2.4 · No load and on load</>], part(<>Ideal</>, <>no resistance, no leakage, no core loss</>)],
    },
    {
      say: 'Secondary open huda primary le no-load current matra lincha.',
      voice: 'सेकेन्डरी ओपन हुँदा प्राइमरीले नो लोड करेन्ट मात्र लिन्छ।',
      lines: [part(<>Secondary open</>, <>primary draws only the no-load current</>)],
    },
    {
      say: 'No-load current le core lai magnetise garcha ra mutual flux set up garcha.',
      voice: 'नो लोड करेन्टले कोरलाई म्याग्नेटाइज गर्छ, र म्युचुअल फ्लक्स सेट अप गर्छ।',
      lines: [['step', <>No-load current magnetises the core (mutual flux)</>]],
    },
    {
      say: 'Load connect garda secondary current I 2 bagcha.',
      voice: 'लोड कनेक्ट गर्दा सेकेन्डरी करेन्ट आई टु बग्छ।',
      lines: [part(<>Load connected</>, <>secondary current I<sub>2</sub> flows</>)],
    },
    {
      say: 'Primary le thap load component current automatically draw garcha.',
      voice: 'प्राइमरीले थप लोड कम्पोनेन्ट करेन्ट अटोम्याटिकल्ली ड्र गर्छ।',
      lines: [['step', <>The primary draws an extra load component automatically</>]],
    },
    {
      say: 'Secondary MMF le core flux ghataune prayas garcha; primary ko load component ko MMF le tyo balance garcha, ra flux constant rahancha.',
      voice: 'सेकेन्डरी एम एम एफले कोर फ्लक्स घटाउने प्रयास गर्छ, प्राइमरीको लोड कम्पोनेन्टको एम एम एफले त्यो ब्यालेन्स गर्छ, र फ्लक्स कन्स्टेन्ट रहन्छ।',
      lines: [chain(<>Secondary MMF balanced by primary load MMF → constant flux</>)],
      ask: {
        q: 'Loaded transformer ma core flux constant kina rahancha?',
        voice: 'लोडेड ट्रान्सफर्मरमा कोर फ्लक्स कन्स्टेन्ट किन रहन्छ?',
        options: ['Primary load MMF le secondary MMF balance garcha', 'Load le flux badhaucha', 'Core saturate huncha'],
        answer: 0,
        why: 'N1 I1′ = N2 I2: dubai MMF cancel hunchan.',
      },
    },
    {
      say: 'Tesaile input power load anusar aafai adjust huncha.',
      voice: 'त्यसैले इनपुट पावर लोड अनुसार आफैं एडजस्ट हुन्छ।',
      lines: [['step', <>Input power adjusts itself to the load</>]],
    },
    {
      say: 'Saransha: no-load current le flux banaucha, load ma MMF balance hunchan, ra mutual flux constant rahancha.',
      voice: 'सारांश — नो लोड करेन्टले फ्लक्स बनाउँछ, लोडमा एम एम एफ ब्यालेन्स हुन्छन्, र म्युचुअल फ्लक्स कन्स्टेन्ट रहन्छ।',
      lines: [['idea', <>No-load current → flux · on load: MMFs balance → mutual flux constant</>]],
    },
  ],
});

export const noLoad22 = duo('Ideal transformer and no-load operation', {
  draw: noLoadFigure,
  viewBox: '0 0 360 232',
  tutor: [
    {
      say: 'Figure 2.2: flux phi reference ma tero. Ideal transformer ma V 1 le phi lai 90 degree le lead garcha, ra E 1 V 1 ko ulto.',
      voice: 'फिगर टु पोइन्ट टु — फ्लक्स फाइ रेफरेन्समा तेर्सो। आइडियल ट्रान्सफर्मरमा भी वानले फाइलाई नाइन्टी डिग्रीले लिड गर्छ, र ई वान भी वानको उल्टो।',
      lines: [['h', <>No-load operation</>], ['step', <>Φ reference; V<sub>1</sub> leads Φ by 90°; E<sub>1</sub> = −V<sub>1</sub> (ideal)</>]],
    },
    {
      say: 'Real core ma loss cha, tesaile no-load current I 0 le V 1 lai phi 0 angle le lag garcha, 90 bhanda kam.',
      voice: 'रियल कोरमा लस छ, त्यसैले नो लोड करेन्ट आई जिरोले भी वानलाई फाइ जिरो एङ्गलले ल्याग गर्छ, नाइन्टी भन्दा कम।',
      lines: [['step', <>I<sub>0</sub> lags V<sub>1</sub> by φ<sub>0</sub> (slightly less than 90°)</>]],
    },
    {
      say: 'I 0 ko dui component: V 1 sanga I w, core loss dine working component; phi sanga I mu, flux banaune magnetising component.',
      voice: 'आई जिरोको दुई कम्पोनेन्ट — भी वानसँग आई डब्लु, कोर लस दिने वर्किङ कम्पोनेन्ट, फाइसँग आई म्यु, फ्लक्स बनाउने म्याग्नेटाइजिङ कम्पोनेन्ट।',
      lines: [['eq', tex(String.raw`\begin{aligned} I_w &= I_0\cos\varphi_0 \\ I_\mu &= I_0\sin\varphi_0 \end{aligned}`)]],
    },
    {
      say: 'Dubai jodda I 0 equals root of I w square plus I mu square. No-load input power nai core loss.',
      voice: 'दुवै जोड्दा आई जिरो इक्वल्स रुट अफ आई डब्लु स्क्वायर प्लस आई म्यु स्क्वायर। नो लोड इनपुट पावर नै कोर लस।',
      lines: [['eq', tex(String.raw`\boxed{I_0 = \sqrt{I_w^2 + I_\mu^2}}, \quad P_0 = V_1 I_0\cos\varphi_0`)]],
      ask: {
        q: 'No-load current ko kun component le flux banaucha?',
        voice: 'नो लोड करेन्ट आई टुको कुन कम्पोनेन्टले फ्लक्स बनाउँछ?',
        options: ['Iμ (magnetising)', 'Iw (working)', 'Dubai le barabar'],
        answer: 0,
        why: 'Iμ flux sanga in phase: flux banaune kaam yasko.',
      },
    },
    {
      say: 'I 0 rated current ko 2 dekhi 5 percent matra huncha, tesaile no-load power factor dherai kam.',
      voice: 'आई जिरो रेटेड करेन्टको दुई देखि पाँच प्रतिशत मात्र हुन्छ, त्यसैले नो लोड पावर फ्याक्टर धेरै कम।',
      lines: [['idea', <>I<sub>0</sub> ≈ 2–5 % of rated current; cos φ<sub>0</sub> is low (≈ 0.1–0.2)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Taking flux as reference, V 1 leads phi by 90 degrees and E 1 is equal and opposite to V 1, Figure 2.2.',
      voice: 'टेकिङ फ्लक्स एज रेफरेन्स, भी वान लिड्स फाइ बाइ नाइन्टी डिग्रिज, एन्ड ई वान इज इक्वल एन्ड अपोजिट टु भी वान, फिगर टु पोइन्ट टु।',
      lines: [['h', <>Transformer on no load</>], ['step', <>Φ reference; V<sub>1</sub> leads by 90°; E<sub>1</sub> opposite to V<sub>1</sub></>]],
    },
    {
      say: 'Owing to core loss, the no-load current I 0 lags V 1 by phi 0, slightly less than 90 degrees.',
      voice: 'ओइङ टु कोर लस, द नो लोड करेन्ट आई जिरो ल्याग्स भी वान बाइ फाइ जिरो, स्लाइट्ली लेस दयान नाइन्टी डिग्रिज।',
      lines: [['step', <>I<sub>0</sub> lags V<sub>1</sub> by φ<sub>0</sub> &lt; 90°</>]],
    },
    {
      say: 'Its components: the working component I w in phase with V 1, and the magnetising component I mu in phase with phi.',
      voice: 'इट्स कम्पोनेन्ट्स — द वर्किङ कम्पोनेन्ट आई डब्लु इन फेज विद भी वान, एन्ड द म्याग्नेटाइजिङ कम्पोनेन्ट आई म्यु इन फेज विद फाइ।',
      lines: [['eq', tex(String.raw`\begin{aligned} I_w &= I_0\cos\varphi_0 \\ I_\mu &= I_0\sin\varphi_0 \end{aligned}`)]],
    },
    {
      say: 'Hence I 0 equals root of I w square plus I mu square, and the no-load input is the core loss.',
      voice: 'हेन्स आई जिरो इक्वल्स रुट अफ आई डब्लु स्क्वायर प्लस आई म्यु स्क्वायर, एन्ड द नो लोड इनपुट इज द कोर लस।',
      lines: [['eq', tex(String.raw`\boxed{I_0 = \sqrt{I_w^2 + I_\mu^2}}, \quad P_0 = V_1 I_0\cos\varphi_0`)]],
      ask: {
        q: 'No-load test ma wattmeter le mukhya kun loss naapcha?',
        voice: 'नो लोड टेस्टमा वाटमिटरले मुख्य कुन लस नाप्छ?',
        options: ['Core (iron) loss', 'Full-load copper loss', 'Friction loss'],
        answer: 0,
        why: 'I0 sano, copper loss negligible; P0 ≈ core loss.',
      },
    },
    {
      say: 'I 0 is only 2 to 5 percent of rated current and the no-load power factor is low.',
      voice: 'आई जिरो इज ओन्ली टु टु फाइभ पर्सेन्ट अफ रेटेड करेन्ट, एन्ड द नो लोड पावर फ्याक्टर इज लो।',
      lines: [['step', <>I<sub>0</sub> ≈ 2–5 % of rated current; cos φ<sub>0</sub> ≈ 0.1–0.2</>]],
    },
  ],
});

export const onLoad22 = duo('Derivation: flux stays constant on load', {
  draw: noLoadFigure,
  viewBox: '0 0 360 232',
  tutor: [
    {
      say: 'No load ma flux phi le E 1 banaucha, ra E 1 lagbhag V 1 barabar. V 1 fixed bhaye phi pani fixed.',
      voice: 'नो लोडमा फ्लक्स फाइले ई वान बनाउँछ, र ई वान लगभग भी वान बराबर। भी वान फिक्स्ड भए फाइ पनि फिक्स्ड।',
      lines: [['h', <>Transformer on load</>], ['eq', tex(String.raw`V_1 \approx E_1 = 4.44 f N_1 \Phi_m`)]],
    },
    {
      say: 'Load lagaye secondary current I 2 bagcha. Yasko MMF N 2 I 2 le main flux ghataune koshish garcha.',
      voice: 'लोड लगाए सेकेन्डरी करेन्ट आई टु बग्छ। यसको एम एम एफ एन टु आई टु ले मेन फ्लक्स घटाउने कोसिस गर्छ।',
      lines: [['step', <>Secondary MMF N<sub>2</sub>I<sub>2</sub> opposes Φ (Lenz) → Φ, E<sub>1</sub> tend to fall</>]],
    },
    {
      say: 'E 1 alikati ghatepachi V 1 minus E 1 le primary ma thap current I 2 dash tancha.',
      voice: 'ई वान अलिकति घटेपछि, भी वान माइनस ई वानले प्राइमरीमा थप करेन्ट आई टु ड्यास तान्छ।',
      lines: [['step', <>E<sub>1</sub> falls slightly → primary draws an extra current I<sub>2</sub>′</>]],
    },
    {
      say: 'Yo thap current ko MMF secondary ko MMF barabar ra ulto: N 1 I 2 dash equals N 2 I 2. Tesaile I 2 dash equals K I 2.',
      voice: 'यो थप करेन्टको एम एम एफ सेकेन्डरीको एम एम एफ बराबर र उल्टो — एन वान आई टु ड्यास इक्वल्स एन टु आई टु। त्यसैले आई टु ड्यास इक्वल्स के आई टु।',
      lines: [['eq', tex(String.raw`\begin{aligned} N_1 I_2' &= N_2 I_2 \\ \therefore\ I_2' &= \boxed{K I_2} \end{aligned}`)]],
      ask: {
        q: 'K = 0.5 ra I2 = 40 A bhaye primary ko load component kati?',
        voice: 'के जिरो पोइन्ट फाइभ र आई टु चालीस एम्पियर भए प्राइमरीको लोड कम्पोनेन्ट कति?',
        options: ['20 A', '80 A', '40 A'],
        answer: 0,
        why: 'I2′ = K I2 = 0.5 × 40 = 20 A.',
      },
    },
    {
      say: 'Dubai MMF cancel bhayera net MMF no-load jastai, ra flux constant. Primary current I 1 equals I 0 plus I 2 dash.',
      voice: 'दुवै एम एम एफ क्यान्सिल भएर नेट एम एम एफ नो लोड जस्तै, र फ्लक्स कन्स्टेन्ट। प्राइमरी करेन्ट आई वान इक्वल्स आई जिरो प्लस आई टु ड्यास।',
      lines: [['eq', tex(String.raw`\boxed{\vec I_1 = \vec I_0 + \vec I_2'}, \quad \Phi \approx \text{constant}`)]],
    },
  ],
  lecturer: [
    {
      say: 'With the supply voltage constant, E 1 approximately equals V 1, so the flux is fixed by V 1.',
      voice: 'विद द सप्लाई भोल्टेज कन्स्टेन्ट, ई वान एप्रोक्सिमेट्ली इक्वल्स भी वान, सो द फ्लक्स इज फिक्स्ड बाइ भी वान।',
      lines: [['h', <>Flux constant on load</>], ['eq', tex(String.raw`V_1 \approx E_1 = 4.44 f N_1 \Phi_m`)]],
    },
    {
      say: 'On load, the secondary MMF N 2 I 2 opposes the main flux by Lenz’s law.',
      voice: 'अन लोड, द सेकेन्डरी एम एम एफ एन टु आई टु अपोजेज द मेन फ्लक्स बाइ लेन्जेस ल।',
      lines: [['step', <>Secondary MMF N<sub>2</sub>I<sub>2</sub> opposes the main flux</>]],
    },
    {
      say: 'E 1 falls momentarily and the primary draws an additional current I 2 dash.',
      voice: 'ई वान फल्स मोमेन्टरिली एन्ड द प्राइमरी ड्रज एन एडिसनल करेन्ट आई टु ड्यास।',
      lines: [['step', <>The primary draws a load component I<sub>2</sub>′</>]],
    },
    {
      say: 'Its MMF balances the secondary MMF: N 1 I 2 dash equals N 2 I 2, so I 2 dash equals K I 2.',
      voice: 'इट्स एम एम एफ ब्यालेन्सेज द सेकेन्डरी एम एम एफ — एन वान आई टु ड्यास इक्वल्स एन टु आई टु, सो आई टु ड्यास इक्वल्स के आई टु।',
      lines: [['eq', tex(String.raw`\begin{aligned} N_1 I_2' &= N_2 I_2 \\ \therefore\ I_2' &= \boxed{K I_2} \end{aligned}`)]],
      ask: {
        q: 'Primary load component I2′ ko phase I2 sanga kasto huncha?',
        voice: 'प्राइमरी लोड कम्पोनेन्ट आई टु ड्यासको फेज आई टु सँग कस्तो हुन्छ?',
        options: ['Ulto (antiphase)', 'Sangai (in phase)', '90° lead'],
        answer: 0,
        why: 'Yasko MMF le secondary MMF cancel garnu parcha.',
      },
    },
    {
      say: 'The net MMF equals the no-load MMF; hence the flux remains constant, and I 1 equals I 0 plus I 2 dash.',
      voice: 'द नेट एम एम एफ इक्वल्स द नो लोड एम एम एफ, हेन्स द फ्लक्स रिमेन्स कन्स्टेन्ट, एन्ड आई वान इक्वल्स आई जिरो प्लस आई टु ड्यास।',
      lines: [['eq', tex(String.raw`\boxed{\vec I_1 = \vec I_0 + \vec I_2'}, \quad \Phi \approx \text{constant}`)]],
    },
  ],
});

export const fluxAnswer22 = answer('Model answer: no-load and load operation, constant flux', {
  draw: noLoadFigure,
  viewBox: '0 0 360 232',
  papers: ['2073 Bhadra', '2069 Bhadra', '2071 Chaitra', '2081 Ashwin (ECM)'],
  q: 'Explain no-load and loaded operation of single phase transformer. Prove that the magnetic flux in the core at no load and load conditions remains same.',
  read: {
    say: 'IOE ma char choti: explain no-load and loaded operation of single phase transformer. Prove that the magnetic flux in the core at no load and load conditions remains same.',
    voice: 'आई ओ ईमा चार चोटि — एक्सप्लेन नो लोड एन्ड लोडेड अपरेसन अफ सिङ्गल फेज ट्रान्सफर्मर। प्रुभ दयाट द म्याग्नेटिक फ्लक्स इन द कोर एट नो लोड एन्ड लोड कन्डिसन्स रिमेन्स सेम।',
  },
  points: [
    {
      node: <><H>No-load operation</H><Pts items={[<>Secondary open; the primary draws I<sub>0</sub> lagging V<sub>1</sub> by φ<sub>0</sub> (Fig. 2.2)</>, <><K>{String.raw`I_w = I_0\cos\varphi_0`}</K> supplies core loss; <K>{String.raw`I_\mu = I_0\sin\varphi_0`}</K> sets up Φ</>]} /></>,
      say: 'No load: the secondary is open and the primary draws I 0 lagging V 1 by phi 0. I w supplies core loss, I mu sets up the flux.',
      voice: 'नो लोड — द सेकेन्डरी इज ओपन एन्ड द प्राइमरी ड्रज आई जिरो ल्यागिङ भी वान बाइ फाइ जिरो। आई डब्लु सप्लाइज कोर लस, आई म्यु सेट्स अप द फ्लक्स।',
    },
    {
      node: <><Pts items={[<><K>{String.raw`I_0 = \sqrt{I_w^2 + I_\mu^2}`}</K>, about 2–5 % of rated current</>, <><K>{String.raw`V_1 \approx E_1 = 4.44 f N_1\Phi_m`}</K>, so Φ<sub>m</sub> is set by V<sub>1</sub></>]} /></>,
      say: 'I 0 equals root of I w square plus I mu square, a few percent of rated current. V 1 approximately E 1, so the flux is set by V 1.',
      voice: 'आई जिरो इक्वल्स रुट अफ आई डब्लु स्क्वायर प्लस आई म्यु स्क्वायर, अ फ्यु पर्सेन्ट अफ रेटेड करेन्ट। भी वान एप्रोक्सिमेट्ली ई वान, सो द फ्लक्स इज सेट बाइ भी वान।',
    },
    {
      page: true,
      node: <><H>Loaded operation</H><Pts items={[<>Load current I<sub>2</sub> produces MMF N<sub>2</sub>I<sub>2</sub>, which opposes Φ (Lenz’s law)</>, <>E<sub>1</sub> falls slightly, and the primary draws an extra current I<sub>2</sub>′</>]} /></>,
      say: 'On load: I 2 produces MMF N 2 I 2 that opposes the flux. E 1 falls slightly and the primary draws an extra current I 2 dash.',
      voice: 'अन लोड — आई टु प्रोड्युसेज एम एम एफ एन टु आई टु दयाट अपोजेज द फ्लक्स। ई वान फल्स स्लाइट्ली एन्ड द प्राइमरी ड्रज एन एक्स्ट्रा करेन्ट आई टु ड्यास।',
    },
    {
      node: <><H>Proof: flux constant</H><K>{String.raw`\begin{aligned} N_1 I_2' &= N_2 I_2 \\ \therefore\ I_2' &= K I_2 \end{aligned}`}</K>The two MMFs cancel; the net MMF is that of I<sub>0</sub> alone.</>,
      say: 'Proof: N 1 I 2 dash equals N 2 I 2, so I 2 dash equals K I 2. The two MMFs cancel, and the net MMF is that of I 0 alone.',
      voice: 'प्रुफ — एन वान आई टु ड्यास इक्वल्स एन टु आई टु, सो आई टु ड्यास इक्वल्स के आई टु। द टु एम एम एफ्स क्यान्सिल, एन्ड द नेट एम एम एफ इज दयाट अफ आई जिरो अलोन।',
      ask: {
        q: 'Load ma net MMF kasko barabar huncha?',
        voice: 'लोडमा नेट एम एम एफ कसको बराबर हुन्छ?',
        options: ['No-load current ko MMF', 'Secondary ko MMF', 'Zero'],
        answer: 0,
        why: 'N1 I2′ ra N2 I2 cancel hunchan; N1 I0 matra baki.',
      },
    },
    {
      node: <><K>{String.raw`\boxed{\vec I_1 = \vec I_0 + \vec I_2'}`}</K>∴ the core flux is the same at no load and on load. Hence proved.</>,
      say: 'Therefore I 1 equals I 0 plus I 2 dash, and the core flux is the same at no load and on load. Hence proved.',
      voice: 'देयरफोर आई वान इक्वल्स आई जिरो प्लस आई टु ड्यास, एन्ड द कोर फ्लक्स इज द सेम एट नो लोड एन्ड अन लोड। हेन्स प्रुभ्ड।',
    },
  ],
});

/* ── 2.3 Equivalent circuit, OC/SC tests ─────────────────────────────── */
export const basics23 = duo('2.9 · Basic understanding: what does a real transformer lose?', {
  three: transformerTour([
    { shot: 'whole', show: LOADED, flow: 0.7, flow2: 0.8, flux: 1, focus: null, labels: [['real transformer', [0, 2.3, 0.6]]] },
    { shot: 'primary', heat: { primary: 0.7 }, focus: ['primary'], labels: [['tar taato', 'primary']] },
    { shot: 'whole', heat: { primary: 0.7, secondary: 0.7 }, leak: 1, focus: ['leak'], labels: [['bahira chuheko flux', 'leak']] },
    { shot: 'core', heat: { core: 0.6 }, leak: 0, focus: ['core'], labels: [['core taato', 'core']] },
    { shot: 'whole', heat: {}, focus: ['primary', 'core', 'secondary'], labels: [['kagaj ma circuit', [0, 2.3, 0.6]]] },
    { shot: 'source', show: FED, flow: 0.2, flow2: 0, heat: { core: 0.6 }, focus: ['source', 'primary', 'core'], labels: [['secondary khulla', 'secondary']] },
    { shot: 'load', show: LOADED, flux: 0.2, flow: 1, flow2: 1, heat: { primary: 0.7, secondary: 0.7 }, focus: ['secondary', 'primary'], labels: [['sano voltage', 'source'], ['short', 'lamp']] },
    { shot: 'whole', flux: 1, heat: {}, focus: null },
  ]),
  tutor: [
    {
      say: 'Real transformer sapana jasto hudaina. Kehi bijuli bato mai harauncha. Kaha-kaha harauncha, herau.',
      voice: 'रियल ट्रान्सफर्मर सपना जस्तो हुँदैन। केही बिजुली बाटोमै हराउँछ। कहाँ कहाँ हराउँछ, हेरौं।',
      lines: [['h', <>2.9 · Real transformer ma k-k harauncha?</>], part(<>Real</>, <>kehi bijuli bato mai harauncha</>)],
    },
    {
      say: 'Tama ko tar ma pani resistance huncha, current bagda tar taato huncha.',
      voice: 'तामाको तारमा पनि रेजिस्टेन्स हुन्छ, करेन्ट बग्दा तार तातो हुन्छ।',
      lines: [chain(<>Tar ko resistance → taato</>)],
    },
    {
      say: 'Sabai flux arko coil samma pugdaina; kehi flux coil ko bahira chuhincha. Yo chuheko flux pani bato rokcha.',
      voice: 'सबै फ्लक्स अर्को कोइलसम्म पुग्दैन, केही फ्लक्स कोइलको बाहिर चुहिन्छ। यो चुहेको फ्लक्स पनि बाटो रोक्छ।',
      lines: [chain(<>Chuheko flux (leakage) → voltage ghatcha</>)],
    },
    {
      say: 'Core pani taato huncha, ra flux banauna sano current sadhai chahincha.',
      voice: 'कोर पनि तातो हुन्छ, र फ्लक्स बनाउन सानो करेन्ट सधैं चाहिन्छ।',
      lines: [['step', <>Core taato + flux ko current sadhai</>]],
    },
    {
      say: 'Engineer haru yo sabai lai kagaj ma resistance ra coil ko sano circuit jasto kornchan: yahi equivalent circuit.',
      voice: 'इन्जिनियरहरू यो सबैलाई कागजमा रेजिस्टेन्स र कोइलको सानो सर्किट जस्तो कोर्छन् — यही इक्विभ्यालेन्ट सर्किट।',
      lines: [chain(<>Sabai loss → kagaj ko sano circuit (equivalent circuit)</>)],
    },
    {
      say: 'Pahilo test: secondary khulla rakhera pura voltage dine. Current sano, tar taato hudaina; naapeko loss sabai core ko.',
      voice: 'पहिलो टेस्ट — सेकेन्डरी खुल्ला राखेर पूरा भोल्टेज दिने। करेन्ट सानो, तार तातो हुँदैन, नापेको लस सबै कोरको।',
      lines: [chain(<>Secondary khulla, pura voltage → core ko loss (OC test)</>)],
      ask: {
        q: 'Secondary khulla rakhera garne test ma kun loss naapincha?',
        voice: 'सेकेन्डरी खुल्ला राखेर गर्ने टेस्टमा कुन लस नापिन्छ?',
        options: ['Core ko loss', 'Tar ko loss', 'Kunai pani hoina'],
        answer: 0,
        why: 'Current sano: tar taato hudaina; pura voltage le core ko pura loss.',
      },
    },
    {
      say: 'Dosro test: secondary short garera sano voltage matra dine. Pura current bagcha tara flux sano: naapeko loss sabai tar ko.',
      voice: 'दोस्रो टेस्ट — सेकेन्डरी सर्ट गरेर सानो भोल्टेज मात्र दिने। पूरा करेन्ट बग्छ तर फ्लक्स सानो — नापेको लस सबै तारको।',
      lines: [chain(<>Secondary short, sano voltage → tar ko loss (SC test)</>)],
    },
    {
      say: 'Saransha: tar, chuheko flux ra core le loss garchan; dui sajilo test le tiniharu naapchan, load nalagai.',
      voice: 'सारांश — तार, चुहेको फ्लक्स, र कोरले लस गर्छन्, दुई सजिलो टेस्टले तिनीहरू नाप्छन्, लोड नलगाई।',
      lines: [['idea', <>Tar + chuheko flux + core → circuit · khulla test: core · short test: tar</>]],
    },
  ],
  lecturer: [
    {
      say: 'Practical transformer ma resistance, leakage flux ra core loss hunchan.',
      voice: 'प्राक्टिकल ट्रान्सफर्मरमा रेजिस्टेन्स, लिकेज फ्लक्स, र कोर लस हुन्छन्।',
      lines: [['h', <>2.9 · The practical transformer</>], ['step', <>Resistance, leakage flux and core loss</>]],
    },
    {
      say: 'Winding resistance R 1 ra R 2 ma copper loss huncha.',
      voice: 'वाइन्डिङ रेजिस्टेन्स आर वान र आर टु मा कपर लस हुन्छ।',
      lines: [chain(<>Winding resistances → copper loss</>)],
    },
    {
      say: 'Leakage flux le leakage reactance X 1 ra X 2 dincha.',
      voice: 'लिकेज फ्लक्सले लिकेज रियाक्टेन्स एक्स वान र एक्स टु दिन्छ।',
      lines: [chain(<>Leakage flux → leakage reactances</>)],
    },
    {
      say: 'Core loss ra magnetising current lai shunt branch R 0 ra X 0 le represent garincha.',
      voice: 'कोर लस र म्याग्नेटाइजिङ करेन्टलाई सन्ट ब्रान्च आर जिरो र एक्स जिरोले रिप्रिजेन्ट गरिन्छ।',
      lines: [chain(<>Core loss and magnetising current → shunt branch</>)],
    },
    {
      say: 'Yi sabai elements milayera banaeko circuit nai equivalent circuit ho.',
      voice: 'यी सबै एलिमेन्ट्स मिलाएर बनाएको सर्किट नै इक्विभ्यालेन्ट सर्किट हो।',
      lines: [chain(<>All elements together: the equivalent circuit</>)],
    },
    {
      say: 'Open circuit test: secondary open, rated voltage; reading le core loss ra shunt branch dincha.',
      voice: 'ओपन सर्किट टेस्ट — सेकेन्डरी ओपन, रेटेड भोल्टेज, रिडिङले कोर लस र सन्ट ब्रान्च दिन्छ।',
      lines: [part(<>OC test</>, <>rated voltage, secondary open → core loss, shunt branch</>)],
      ask: {
        q: 'OC test ma copper loss kina negligible huncha?',
        voice: 'ओ सी टेस्टमा कपर लस किन नेग्लिजिबल हुन्छ?',
        options: ['No-load current sano huncha', 'Voltage sano huncha', 'Winding short huncha'],
        answer: 0,
        why: 'I0 matra 2–5 %: I0²R negligible.',
      },
    },
    {
      say: 'Short circuit test: secondary short, rated current samma sano voltage; reading le copper loss ra series parameters dincha.',
      voice: 'सर्ट सर्किट टेस्ट — सेकेन्डरी सर्ट, रेटेड करेन्टसम्म सानो भोल्टेज, रिडिङले कपर लस र सिरिज प्यारामिटर्स दिन्छ।',
      lines: [part(<>SC test</>, <>low voltage, rated current → copper loss, series parameters</>)],
    },
    {
      say: 'Saransha: equivalent circuit le losses model garcha, ra OC ra SC test le yesko parameters dincha.',
      voice: 'सारांश — इक्विभ्यालेन्ट सर्किटले लसेस मोडल गर्छ, र ओ सी र एस सी टेस्टले यसको प्यारामिटर्स दिन्छ।',
      lines: [['idea', <>Equivalent circuit models the losses · OC: shunt branch · SC: series branch</>]],
    },
  ],
});

export const eqCircuit23 = duo('Equivalent circuit and referring to the primary', {
  draw: eqFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Figure 2.3: primary ma R 1 ra X 1 series ma. R 1 winding ko resistance, X 1 leakage flux ko reactance.',
      voice: 'फिगर टु पोइन्ट थ्री — प्राइमरीमा आर वान र एक्स वान सिरिजमा। आर वान वाइन्डिङको रेजिस्टेन्स, एक्स वान लिकेज फ्लक्सको रियाक्टेन्स।',
      lines: [['h', <>Equivalent circuit</>], ['step', <>Series: R<sub>1</sub> (winding), X<sub>1</sub> (leakage flux)</>]],
    },
    {
      say: 'Bich ma shunt branch: R 0 ma I w, core loss; X 0 ma I mu, magnetising.',
      voice: 'बीचमा सन्ट ब्रान्च — आर जिरोमा आई डब्लु, कोर लस, एक्स जिरोमा आई म्यु, म्याग्नेटाइजिङ।',
      lines: [['eq', tex(String.raw`R_0 = \dfrac{V_1}{I_w}, \quad X_0 = \dfrac{V_1}{I_\mu}`)]],
    },
    {
      say: 'Secondary ko R 2 ra X 2 lai primary tira sarna K square le bhag garne. Loss ustai rahanu parcha: I 2 square R 2 equals I 1 square R 2 dash.',
      voice: 'सेकेन्डरीको आर टु र एक्स टु लाई प्राइमरीतिर सार्न के स्क्वायरले भाग गर्ने। लस उस्तै रहनु पर्छ — आई टु स्क्वायर आर टु इक्वल्स आई वान स्क्वायर आर टु ड्यास।',
      lines: [['eq', tex(String.raw`\begin{aligned} I_1^2 R_2' &= I_2^2 R_2 \\ \therefore\ R_2' &= R_2\Big(\dfrac{I_2}{I_1}\Big)^2 \\ &= \dfrac{R_2}{K^2} \end{aligned}`)]],
    },
    {
      say: 'Tyastai X 2 dash equals X 2 over K square, ra V 2 dash equals V 2 over K.',
      voice: 'त्यस्तै एक्स टु ड्यास इक्वल्स एक्स टु ओभर के स्क्वायर, र भी टु ड्यास इक्वल्स भी टु ओभर के।',
      lines: [['step', <><K>{String.raw`X_2' = X_2/K^2`}</K>, <K>{String.raw`V_2' = V_2/K`}</K>, <K>{String.raw`Z_L' = Z_L/K^2`}</K></>]],
      ask: {
        q: 'K = 2 bhaye R2 = 0.8 Ω primary tira kati huncha?',
        voice: 'के टु भए आर टु जिरो पोइन्ट एट ओम प्राइमरीतिर कति हुन्छ?',
        options: ['0.2 Ω', '3.2 Ω', '1.6 Ω'],
        answer: 0,
        why: 'R2′ = R2/K² = 0.8/4 = 0.2 Ω.',
      },
    },
    {
      say: 'Shunt branch lai supply tira sare approximate circuit: R 01 equals R 1 plus R 2 over K square, X 01 pani tyastai.',
      voice: 'सन्ट ब्रान्चलाई सप्लाईतिर सारे एप्रोक्सिमेट सर्किट — आर जिरो वान इक्वल्स आर वान प्लस आर टु ओभर के स्क्वायर, एक्स जिरो वान पनि त्यस्तै।',
      lines: [['eq', tex(String.raw`\boxed{R_{01} = R_1 + \dfrac{R_2}{K^2}}, \quad \boxed{X_{01} = X_1 + \dfrac{X_2}{K^2}}`)]],
    },
  ],
  lecturer: [
    {
      say: 'The primary has resistance R 1 and leakage reactance X 1 in series, Figure 2.3.',
      voice: 'द प्राइमरी ह्याज रेजिस्टेन्स आर वान एन्ड लिकेज रियाक्टेन्स एक्स वान इन सिरिज, फिगर टु पोइन्ट थ्री।',
      lines: [['h', <>Equivalent circuit of a transformer</>], ['step', <>Series: R<sub>1</sub>, X<sub>1</sub></>]],
    },
    {
      say: 'The exciting branch: R 0 carries I w for core loss and X 0 carries I mu.',
      voice: 'द एक्साइटिङ ब्रान्च — आर जिरो क्यारिज आई डब्लु फर कोर लस, एन्ड एक्स जिरो क्यारिज आई म्यु।',
      lines: [['eq', tex(String.raw`R_0 = \dfrac{V_1}{I_w}, \quad X_0 = \dfrac{V_1}{I_\mu}`)]],
    },
    {
      say: 'Referring R 2 to the primary, the copper loss must be unchanged, so R 2 dash equals R 2 over K square.',
      voice: 'रेफरिङ आर टु टु द प्राइमरी, द कपर लस मस्ट बी अनचेन्ज्ड, सो आर टु ड्यास इक्वल्स आर टु ओभर के स्क्वायर।',
      lines: [['eq', tex(String.raw`\begin{aligned} I_1^2 R_2' &= I_2^2 R_2 \\ \therefore\ R_2' &= R_2\Big(\dfrac{I_2}{I_1}\Big)^2 \\ &= \dfrac{R_2}{K^2} \end{aligned}`)]],
    },
    {
      say: 'Similarly X 2 dash equals X 2 over K square, and V 2 dash equals V 2 over K.',
      voice: 'सिमिलर्ली एक्स टु ड्यास इक्वल्स एक्स टु ओभर के स्क्वायर, एन्ड भी टु ड्यास इक्वल्स भी टु ओभर के।',
      lines: [['step', <><K>{String.raw`X_2' = X_2/K^2`}</K>, <K>{String.raw`V_2' = V_2/K`}</K>, <K>{String.raw`Z_L' = Z_L/K^2`}</K></>]],
      ask: {
        q: 'Secondary ko impedance primary tira refer garda kun factor le bhag garincha?',
        voice: 'सेकेन्डरीको इम्पिडेन्स प्राइमरीतिर रेफर गर्दा कुन फ्याक्टरले भाग गरिन्छ?',
        options: ['K²', 'K', '√K'],
        answer: 0,
        why: 'Power equality: I1²Z′ = I2²Z, I2/I1 = 1/K.',
      },
    },
    {
      say: 'Moving the exciting branch to the input gives the approximate circuit with R 01 and X 01.',
      voice: 'मुभिङ द एक्साइटिङ ब्रान्च टु द इनपुट गिभ्स द एप्रोक्सिमेट सर्किट विद आर जिरो वान एन्ड एक्स जिरो वान।',
      lines: [['eq', tex(String.raw`\boxed{R_{01} = R_1 + \dfrac{R_2}{K^2}}, \quad \boxed{X_{01} = X_1 + \dfrac{X_2}{K^2}}`)]],
    },
  ],
});

export const tests23 = duo('Derivation: parameters from the OC and SC tests', {
  draw: eqFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'OC test: LV side ma rated voltage V 0, HV open. Wattmeter le P 0, ammeter le I 0.',
      voice: 'ओ सी टेस्ट — एल भी साइडमा रेटेड भोल्टेज भी जिरो, एच भी ओपन। वाटमिटरले पी जिरो, एमिटरले आई जिरो।',
      lines: [['h', <>Open-circuit and short-circuit tests</>], ['step', <>OC (on LV, HV open): V<sub>0</sub>, I<sub>0</sub>, P<sub>0</sub> = core loss</>]],
    },
    {
      say: 'Power factor cos phi 0 equals P 0 over V 0 I 0. Ani I w, I mu, ra shunt branch.',
      voice: 'पावर फ्याक्टर कस फाइ जिरो इक्वल्स पी जिरो ओभर भी जिरो आई जिरो। अनि आई डब्लु, आई म्यु, र सन्ट ब्रान्च।',
      lines: [['eq', tex(String.raw`\begin{aligned} \cos\varphi_0 &= \dfrac{P_0}{V_0 I_0} \\ R_0 &= \dfrac{V_0}{I_0\cos\varphi_0}, \quad X_0 = \dfrac{V_0}{I_0\sin\varphi_0} \end{aligned}`)]],
    },
    {
      say: 'SC test: LV short, HV ma sano voltage V sc dine jaba samma rated current I sc bagdaina. P sc nai full-load copper loss.',
      voice: 'एस सी टेस्ट — एल भी सर्ट, एच भीमा सानो भोल्टेज भी एस सी दिने, जबसम्म रेटेड करेन्ट आई एस सी बग्दैन। पी एस सी नै फुल लोड कपर लस।',
      lines: [['step', <>SC (on HV, LV shorted): V<sub>sc</sub> ≈ 5–10 % of rated, I<sub>sc</sub> = rated, P<sub>sc</sub> = full-load Cu loss</>]],
      ask: {
        q: 'SC test ma core loss kina negligible?',
        voice: 'एस सी टेस्टमा कोर लस किन नेग्लिजिबल?',
        options: ['Voltage sano: flux sano', 'Current sano', 'Frequency zero'],
        answer: 0,
        why: 'Core loss ∝ flux² ∝ V²; 5–10 % voltage ma ati sano.',
      },
    },
    {
      say: 'SC reading le HV side ko Z, R ra X dincha.',
      voice: 'एस सी रिडिङले एच भी साइडको जेड, आर, र एक्स दिन्छ।',
      lines: [['eq', tex(String.raw`\begin{aligned} Z_{02} &= \dfrac{V_{sc}}{I_{sc}}, \quad R_{02} = \dfrac{P_{sc}}{I_{sc}^2} \\ X_{02} &= \sqrt{Z_{02}^2 - R_{02}^2} \end{aligned}`)]],
    },
    {
      say: 'Polarity test le terminals ko sahi marking dincha. Yi tin test le load nalagai sabai parameter dincha.',
      voice: 'पोलारिटी टेस्टले टर्मिनल्सको सही मार्किङ दिन्छ। यी तीन टेस्टले लोड नलगाई सबै प्यारामिटर दिन्छ।',
      lines: [['idea', <>Polarity test: terminal marking (additive / subtractive) · OC + SC give every parameter without loading</>]],
    },
  ],
  lecturer: [
    {
      say: 'OC test is done on the LV side at rated voltage with the HV side open; P 0 equals the core loss.',
      voice: 'ओ सी टेस्ट इज डन अन द एल भी साइड एट रेटेड भोल्टेज विद द एच भी साइड ओपन, पी जिरो इक्वल्स द कोर लस।',
      lines: [['h', <>OC and SC tests</>], ['step', <>OC on LV (HV open): V<sub>0</sub>, I<sub>0</sub>, P<sub>0</sub> = core loss</>]],
    },
    {
      say: 'From the readings: cos phi 0, then R 0 and X 0.',
      voice: 'फ्रम द रिडिङ्स — कस फाइ जिरो, देन आर जिरो एन्ड एक्स जिरो।',
      lines: [['eq', tex(String.raw`\begin{aligned} \cos\varphi_0 &= \dfrac{P_0}{V_0 I_0} \\ R_0 &= \dfrac{V_0}{I_0\cos\varphi_0}, \quad X_0 = \dfrac{V_0}{I_0\sin\varphi_0} \end{aligned}`)]],
    },
    {
      say: 'SC test is done on the HV side with the LV shorted, at reduced voltage circulating rated current; P sc is the full-load copper loss.',
      voice: 'एस सी टेस्ट इज डन अन द एच भी साइड विद द एल भी सर्टेड, एट रिड्युस्ड भोल्टेज सर्कुलेटिङ रेटेड करेन्ट, पी एस सी इज द फुल लोड कपर लस।',
      lines: [['step', <>SC on HV (LV shorted): V<sub>sc</sub>, I<sub>sc</sub> (rated), P<sub>sc</sub> = full-load Cu loss</>]],
      ask: {
        q: 'SC test ko wattmeter reading kun loss ho?',
        voice: 'एस सी टेस्टको वाटमिटर रिडिङ कुन लस हो?',
        options: ['Full-load copper loss', 'Core loss', 'Stray loss matra'],
        answer: 0,
        why: 'Rated current bagcha, flux ati sano.',
      },
    },
    {
      say: 'Hence Z 02, R 02 and X 02 referred to the HV side.',
      voice: 'हेन्स जेड जिरो टु, आर जिरो टु, एन्ड एक्स जिरो टु रेफर्ड टु द एच भी साइड।',
      lines: [['eq', tex(String.raw`\begin{aligned} Z_{02} &= \dfrac{V_{sc}}{I_{sc}}, \quad R_{02} = \dfrac{P_{sc}}{I_{sc}^2} \\ X_{02} &= \sqrt{Z_{02}^2 - R_{02}^2} \end{aligned}`)]],
    },
    {
      say: 'The polarity test identifies terminal marking; OC and SC together give all parameters without loading.',
      voice: 'द पोलारिटी टेस्ट आइडेन्टिफाइज टर्मिनल मार्किङ, ओ सी एन्ड एस सी टुगेदर गिभ अल प्यारामिटर्स विदआउट लोडिङ।',
      lines: [['step', <><Pts items={[<>Polarity test: additive or subtractive marking</>, <>OC + SC: all parameters, no loading needed</>]} /></>]],
    },
  ],
});

export const referAnswer23 = answer('Model answer: equivalent circuit and referring to the primary', {
  draw: eqFigure,
  viewBox: '0 0 360 220',
  papers: ['2074 Bhadra'],
  q: 'Draw the equivalent circuit of a transformer with their parameters as it is in primary side and secondary side. How all parameters can be transferred to primary side - explain with mathematical derivation.',
  read: {
    say: 'IOE 2074 Bhadra: draw the equivalent circuit of a transformer with its parameters on the primary and secondary sides. How can all parameters be transferred to the primary side? Explain with mathematical derivation.',
    voice: 'आई ओ ई दुई हजार चौहत्तर भदौ — ड्र द इक्विभ्यालेन्ट सर्किट अफ अ ट्रान्सफर्मर विद इट्स प्यारामिटर्स अन द प्राइमरी एन्ड सेकेन्डरी साइड्स। हाउ क्यान अल प्यारामिटर्स बी ट्रान्सफर्ड टु द प्राइमरी साइड? एक्सप्लेन विद म्याथम्याटिकल डेरिभेसन।',
  },
  points: [
    {
      node: <><H>Equivalent circuit</H><Pts items={[<>Primary: R<sub>1</sub>, X<sub>1</sub>; exciting branch R<sub>0</sub> ∥ X<sub>0</sub> carrying I<sub>w</sub>, I<sub>μ</sub></>, <>Secondary: R<sub>2</sub>, X<sub>2</sub> feeding the load Z<sub>L</sub> through an ideal transformer of ratio K</>]} /></>,
      say: 'Primary: R 1, X 1, and the exciting branch R 0 parallel X 0. Secondary: R 2, X 2 feeding the load, through an ideal transformer of ratio K.',
      voice: 'प्राइमरी — आर वान, एक्स वान, एन्ड द एक्साइटिङ ब्रान्च आर जिरो प्यारालल एक्स जिरो। सेकेन्डरी — आर टु, एक्स टु फिडिङ द लोड, थ्रु एन आइडियल ट्रान्सफर्मर अफ रेसियो के।',
    },
    {
      page: true,
      node: <><H>Transfer of resistance</H>Copper loss must not change:<K>{String.raw`\begin{aligned} I_1^2 R_2' &= I_2^2 R_2 \\ R_2' &= R_2\Big(\dfrac{I_2}{I_1}\Big)^2 \\ \therefore\ R_2' &= \dfrac{R_2}{K^2} \end{aligned}`}</K></>,
      say: 'Resistance: the copper loss must not change. I 1 square R 2 dash equals I 2 square R 2, and since I 2 over I 1 equals 1 over K, R 2 dash equals R 2 over K square.',
      voice: 'रेजिस्टेन्स — द कपर लस मस्ट नट चेन्ज। आई वान स्क्वायर आर टु ड्यास इक्वल्स आई टु स्क्वायर आर टु, एन्ड साइन्स आई टु ओभर आई वान इक्वल्स वान ओभर के, आर टु ड्यास इक्वल्स आर टु ओभर के स्क्वायर।',
    },
    {
      node: <><H>Transfer of reactance and voltage</H><K>{String.raw`\begin{aligned} X_2' &= \dfrac{X_2}{K^2}, \quad Z_L' = \dfrac{Z_L}{K^2} \\ V_2' &= \dfrac{V_2}{K}, \quad I_2' = K I_2 \end{aligned}`}</K>(reactive power I²X unchanged)</>,
      say: 'Similarly, keeping the reactive power the same, X 2 dash equals X 2 over K square, and Z L dash equals Z L over K square. V 2 dash equals V 2 over K, I 2 dash equals K I 2.',
      voice: 'सिमिलर्ली, किपिङ द रियाक्टिभ पावर द सेम, एक्स टु ड्यास इक्वल्स एक्स टु ओभर के स्क्वायर, एन्ड जेड एल ड्यास इक्वल्स जेड एल ओभर के स्क्वायर। भी टु ड्यास इक्वल्स भी टु ओभर के, आई टु ड्यास इक्वल्स के आई टु।',
      ask: {
        q: 'Secondary ko voltage primary tira refer garda kasari badlincha?',
        voice: 'सेकेन्डरीको भोल्टेज प्राइमरीतिर रेफर गर्दा कसरी बदलिन्छ?',
        options: ['V2 / K', 'V2 × K', 'V2 / K²'],
        answer: 0,
        why: 'Voltage turns sanga: V2′ = V2 N1/N2 = V2/K.',
      },
    },
    {
      node: <><H>Equivalent values (Fig. 2.3)</H><K>{String.raw`\begin{aligned} R_{01} &= R_1 + \dfrac{R_2}{K^2} \\ X_{01} &= X_1 + \dfrac{X_2}{K^2} \\ Z_{01} &= \sqrt{R_{01}^2 + X_{01}^2} \end{aligned}`}</K></>,
      say: 'Moving the exciting branch to the terminals: R 01 equals R 1 plus R 2 over K square, X 01 equals X 1 plus X 2 over K square, and Z 01 is their root sum of squares.',
      voice: 'मुभिङ द एक्साइटिङ ब्रान्च टु द टर्मिनल्स — आर जिरो वान इक्वल्स आर वान प्लस आर टु ओभर के स्क्वायर, एक्स जिरो वान इक्वल्स एक्स वान प्लस एक्स टु ओभर के स्क्वायर, एन्ड जेड जिरो वान इज देयर रुट सम अफ स्क्वायर्स।',
    },
  ],
});

export const ocscSolve23 = solve({
  title: 'IOE 2073 Bhadra: equivalent circuit from OC/SC tests',
  paper: '2073 Bhadra',
  paperVoice: 'दुई हजार त्रिहत्तर भदौ',
  question: 'The data obtained from the test of a 10 kVA, 250/1000 V single phase transformer are given below. No-load test (on LV side): 250 V, 0.8 A, 80 W. Short circuit test (on HV side): 80 V, 10 A, 120 W. Calculate the equivalent circuit parameters refer to primary side and draw the equivalent circuit.',
  read: '10 kVA, 250 by 1000 volt. OC LV ma 250 volt, 0.8 ampere, 80 watt. SC HV ma 80 volt, 10 ampere, 120 watt. Primary, LV, tira parameters.',
  readVoice: 'दस के भी ए, दुई सय पचास बटा एक हजार भोल्ट। ओ सी एल भीमा दुई सय पचास भोल्ट, जिरो पोइन्ट एट एम्पियर, असी वाट। एस सी एच भीमा असी भोल्ट, दस एम्पियर, एक सय बीस वाट। प्राइमरी, एल भी, तिर प्यारामिटर्स।',
  given: [
    { node: <>OC (LV): V<sub>0</sub> = 250 V, I<sub>0</sub> = 0.8 A, P<sub>0</sub> = 80 W</>, say: 'OC: 250 V, 0.8 A, 80 W', voice: 'ओ सी — दुई सय पचास भोल्ट, जिरो पोइन्ट एट एम्पियर, असी वाट' },
    { node: <>SC (HV): V<sub>sc</sub> = 80 V, I<sub>sc</sub> = 10 A, P<sub>sc</sub> = 120 W; K = 1000/250 = 4</>, say: 'SC: 80 V, 10 A, 120 W, ani K equals 4', voice: 'एस सी — असी भोल्ट, दस एम्पियर, एक सय बीस वाट, अनि के इक्वल्स फोर' },
  ],
  find: { node: <>R<sub>0</sub>, X<sub>0</sub>, R<sub>01</sub>, X<sub>01</sub> (primary = LV)</>, say: 'Nikalnu parne: R 0, X 0, R 01, X 01.', voice: 'निकाल्नु पर्ने — आर जिरो, एक्स जिरो, आर जिरो वान, एक्स जिरो वान।' },
  idea: { node: <>OC → shunt branch on LV; SC → series branch on HV, then divide by K²</>, say: 'Method: OC bata shunt branch, SC bata HV ko series, ani K square le bhag.', voice: 'मेथड — ओ सी बाट सन्ट ब्रान्च, एस सी बाट एच भीको सिरिज, अनि के स्क्वायरले भाग।' },
  steps: [
    {
      node: <K>{String.raw`\begin{aligned} \cos\varphi_0 &= \dfrac{80}{250\times0.8} \\ &= 0.4 \\ I_w &= 0.8\times0.4 \\ &= 0.32\ \text{A} \\ I_\mu &= 0.8\times0.9165 \\ &= 0.7332\ \text{A} \end{aligned}`}</K>,
      say: 'Cos phi 0 equals 80 over 200, 0.4. I w equals 0.32 ampere, I mu equals 0.7332 ampere.',
      voice: 'कस फाइ जिरो इक्वल्स असी ओभर दुई सय, जिरो पोइन्ट फोर। आई डब्लु इक्वल्स जिरो पोइन्ट थ्री टु एम्पियर, आई म्यु इक्वल्स जिरो पोइन्ट सेभेन थ्री थ्री टु एम्पियर।',
    },
    {
      node: <K>{String.raw`\begin{aligned} R_0 &= \dfrac{250}{0.32} \\ &= 781.25\ \Omega \\ X_0 &= \dfrac{250}{0.7332} \\ &= 341.0\ \Omega \end{aligned}`}</K>,
      say: 'R 0 equals 250 over 0.32, 781.25 ohm. X 0 equals 250 over 0.7332, 341 ohm.',
      voice: 'आर जिरो इक्वल्स दुई सय पचास ओभर जिरो पोइन्ट थ्री टु, सात सय एकासी दशमलव दुई पाँच ओम। एक्स जिरो इक्वल्स दुई सय पचास ओभर जिरो पोइन्ट सेभेन थ्री थ्री टु, तीन सय एकचालीस ओम।',
    },
    {
      node: <K>{String.raw`\begin{aligned} Z_{02} &= \dfrac{80}{10} \\ &= 8\ \Omega \\ R_{02} &= \dfrac{120}{10^2} \\ &= 1.2\ \Omega \\ X_{02} &= \sqrt{8^2 - 1.2^2} \\ &= 7.909\ \Omega \end{aligned}`}</K>,
      say: 'HV side: Z 02 equals 8 ohm, R 02 equals 1.2 ohm, X 02 equals 7.909 ohm.',
      voice: 'एच भी साइड — जेड जिरो टु इक्वल्स एट ओम, आर जिरो टु इक्वल्स वान पोइन्ट टु ओम, एक्स जिरो टु इक्वल्स सेभेन पोइन्ट नाइन जिरो नाइन ओम।',
      ask: {
        q: 'HV side ko R02 lai LV side tira lyauna K = 4 bhaye kati le bhag garne?',
        voice: 'एच भी साइडको आर जिरो टु लाई एल भी साइडतिर ल्याउन के फोर भए कतिले भाग गर्ने?',
        options: ['16', '4', '2'],
        answer: 0,
        why: 'Impedance K² le: 4² = 16.',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} R_{01} &= \dfrac{1.2}{16} \\ &= 0.075\ \Omega \\ X_{01} &= \dfrac{7.909}{16} \\ &= 0.4943\ \Omega \end{aligned}`}</K>,
      say: 'LV side: R 01 equals 1.2 over 16, 0.075 ohm. X 01 equals 7.909 over 16, 0.4943 ohm.',
      voice: 'एल भी साइड — आर जिरो वान इक्वल्स वान पोइन्ट टु ओभर सोह्र, जिरो पोइन्ट जिरो सेभेन फाइभ ओम। एक्स जिरो वान इक्वल्स सेभेन पोइन्ट नाइन जिरो नाइन ओभर सोह्र, जिरो पोइन्ट फोर नाइन फोर थ्री ओम।',
    },
  ],
  answer: { node: <>R<sub>0</sub> = 781.25 Ω, X<sub>0</sub> = 341.0 Ω, R<sub>01</sub> = 0.075 Ω, X<sub>01</sub> = 0.4943 Ω (on the 250 V side, Fig. 2.3)</>, say: 'Answer: R 0 781.25, X 0 341, R 01 0.075, X 01 0.4943 ohm, 250 volt side.', voice: 'आन्सर — आर जिरो सात सय एकासी दशमलव दुई पाँच, एक्स जिरो तीन सय एकचालीस, आर जिरो वान जिरो पोइन्ट जिरो सेभेन फाइभ, एक्स जिरो वान जिरो पोइन्ट फोर नाइन फोर थ्री ओम, दुई सय पचास भोल्ट साइड।' },
  trap: { node: <>Trap: SC data are on the HV side; divide by K², do not multiply.</>, say: 'Trap: SC HV ma liyeko, K square le bhag garne, gun hoina.', voice: 'ट्र्याप — एस सी एच भीमा लिएको, के स्क्वायरले भाग गर्ने, गुन होइन।' },
});

/* ── 2.4 Regulation, losses, efficiency ──────────────────────────────── */
export const basics24 = duo('2.10 · Basic understanding: how efficient is a transformer?', {
  three: transformerTour([
    { shot: 'load', show: LOADED, flux: 1, flow: 0.4, flow2: 0.4, focus: ['lamp'], labels: [['halka load', 'lamp']] },
    { flow: 1, flow2: 1, focus: ['lamp', 'secondary'], labels: [['voltage ali jharyo', 'lamp']] },
    { shot: 'core', heat: { core: 0.6 }, focus: ['core'], labels: [['core: sadhai eutai', 'core']] },
    { shot: 'whole', heat: { core: 0.6, primary: 0.8, secondary: 0.8 }, focus: ['primary', 'secondary'], labels: [['tar ko loss', 'secondary']] },
    { shot: 'whole', focus: null, labels: [['aaune vs jane', [0, 2.3, 0.6]]] },
    { heat: { core: 0.6, primary: 0.6, secondary: 0.6 }, focus: ['core', 'primary'], labels: [['dubai barabar: best', [0, 2.3, 0.6]]] },
    { shot: 'tank', show: [...LOADED, 'tank', 'bushings'], flow: 0.3, flow2: 0.3, heat: { core: 0.6 }, focus: ['tank'], labels: [['24 ghanta on', 'tank']] },
    { shot: 'whole', show: LOADED, heat: {}, focus: null },
  ]),
  tutor: [
    {
      say: 'Ghar ko pole transformer ma beluka sabai ko batti balcha. Halka load ma bulb ko voltage thik cha.',
      voice: 'घरको पोल ट्रान्सफर्मरमा बेलुका सबैको बत्ती बल्छ। हल्का लोडमा बल्बको भोल्टेज ठिक छ।',
      lines: [['h', <>2.10 · Transformer kati ramro kaam garcha?</>], part(<>Halka load</>, <>voltage thik</>)],
    },
    {
      say: 'Load dherai bhayo bhane secondary ko voltage alikati jharcha. Kati jharyo bhanne naap: regulation.',
      voice: 'लोड धेरै भयो भने सेकेन्डरीको भोल्टेज अलिकति झर्छ। कति झर्‍यो भन्ने नाप — रेगुलेसन।',
      lines: [chain(<>Load dherai → voltage ali jharcha (regulation)</>)],
    },
    {
      say: 'Core ko taato load jati bhaye pani lagbhag eutai: sadhai eutai loss.',
      voice: 'कोरको तातो लोड जति भए पनि लगभग एउटै — सधैं एउटै लस।',
      lines: [part(<>Core loss</>, <>load sanga badlindaina</>)],
    },
    {
      say: 'Tar ko taato chai load sanga chito badhcha: dobar load, char guna taato.',
      voice: 'तारको तातो चाहिँ लोडसँग छिटो बढ्छ — दोब्बर लोड, चार गुना तातो।',
      lines: [chain(<>Tar ko loss: dobar load → char guna</>)],
      ask: {
        q: 'Load dobar garda tar ko taato kati guna?',
        voice: 'लोड दोब्बर गर्दा तारको तातो कति गुना?',
        options: ['Char guna', 'Dobar', 'Ustai'],
        answer: 0,
        why: 'Current dobar, ra loss current ko square sanga: 2² = 4.',
      },
    },
    {
      say: 'Efficiency bhaneko diyeko power madhye kati kaam ma aayo. Thulo transformer ko 98 percent bhanda badhi!',
      voice: 'इफिसियन्सी भनेको दिएको पावरमध्ये कति काममा आयो। ठूलो ट्रान्सफर्मरको अन्ठानब्बे प्रतिशतभन्दा बढी!',
      lines: [part(<>Efficiency</>, <>aayeko madhye kaam ma gayeko (98 % +)</>)],
    },
    {
      say: 'Ascharya: sabai bhanda ramro efficiency full load ma hoina, jaba tar ko loss ra core ko loss barabar huncha.',
      voice: 'आश्चर्य — सबैभन्दा राम्रो इफिसियन्सी फुल लोडमा होइन, जब तारको लस र कोरको लस बराबर हुन्छ।',
      lines: [part(<>Best efficiency</>, <>tar ko loss ra core ko loss barabar</>)],
    },
    {
      say: 'Pole ko transformer din-raat on huncha, raati load kam. Tesaile pura din ko energy hisab garne: all-day efficiency.',
      voice: 'पोलको ट्रान्सफर्मर दिनरात अन हुन्छ, राति लोड कम। त्यसैले पूरा दिनको इनर्जी हिसाब गर्ने — अल डे इफिसियन्सी।',
      lines: [chain(<>24 ghanta on → pura din ko hisab (all-day efficiency)</>)],
    },
    {
      say: 'Saransha: load ma voltage ali jharcha, core ko loss fixed, tar ko badhdo, ra dubai barabar huda best.',
      voice: 'सारांश — लोडमा भोल्टेज अलि झर्छ, कोरको लस फिक्स्ड, तारको बढ्दो, र दुवै बराबर हुँदा बेस्ट।',
      lines: [['idea', <>Voltage drop · fixed core loss · growing tar loss · equal → best</>]],
    },
  ],
  lecturer: [
    {
      say: 'Halka load ma secondary terminal voltage lagbhag no-load voltage barabar huncha.',
      voice: 'हल्का लोडमा सेकेन्डरी टर्मिनल भोल्टेज लगभग नो लोड भोल्टेज बराबर हुन्छ।',
      lines: [['h', <>2.10 · Performance of a transformer</>], part(<>Light load</>, <>terminal voltage nearly the no-load voltage</>)],
    },
    {
      say: 'Load badhda internal impedance ma drop hunchha ra terminal voltage ghatcha: voltage regulation.',
      voice: 'लोड बढ्दा इन्टरनल इम्पिडेन्समा ड्रप हुन्छ, र टर्मिनल भोल्टेज घट्छ — भोल्टेज रेगुलेसन।',
      lines: [chain(<>Load ↑ → internal drop → voltage regulation</>)],
    },
    {
      say: 'Core loss load ma depend gardaina: constant loss.',
      voice: 'कोर लस लोडमा डिपेन्ड गर्दैन — कन्स्टेन्ट लस।',
      lines: [chain(<>Core (iron) loss: constant</>)],
    },
    {
      say: 'Copper loss load current ko square sanga badhcha: variable loss.',
      voice: 'कपर लस लोड करेन्टको स्क्वायरसँग बढ्छ — भेरिएबल लस।',
      lines: [part(<>Copper loss</>, <>grows with the square of load, variable</>)],
      ask: {
        q: 'Half load ma copper loss full-load ko kati?',
        voice: 'हाफ लोडमा कपर लस फुल लोडको कति?',
        options: ['Ek chauthai', 'Aadha', 'Barabar'],
        answer: 0,
        why: 'Pcu ∝ x²: (1/2)² = 1/4.',
      },
    },
    {
      say: 'Efficiency output ra input ko ratio ho; power transformers ma 98 percent bhanda badhi.',
      voice: 'इफिसियन्सी आउटपुट र इनपुटको रेसियो हो, पावर ट्रान्सफर्मर्समा अन्ठानब्बे प्रतिशतभन्दा बढी।',
      lines: [part(<>Efficiency</>, <>output over input, above 98 %</>)],
    },
    {
      say: 'Maximum efficiency copper loss ra core loss barabar huda huncha.',
      voice: 'म्याक्सिमम इफिसियन्सी कपर लस र कोर लस बराबर हुँदा हुन्छ।',
      lines: [['step', <>Maximum efficiency when copper loss equals core loss</>]],
    },
    {
      say: 'Distribution transformer 24 ghanta energised huncha; tesko lagi all-day efficiency energy ma nikalincha.',
      voice: 'डिस्ट्रिब्युसन ट्रान्सफर्मर चौबीस घण्टा इनर्जाइज्ड हुन्छ, त्यसको लागि अल डे इफिसियन्सी इनर्जीमा निकालिन्छ।',
      lines: [part(<>Distribution transformer</>, <>all-day (energy) efficiency</>)],
    },
    {
      say: 'Saransha: regulation le voltage drop, efficiency le losses, ra maximum efficiency loss barabar huda.',
      voice: 'सारांश — रेगुलेसनले भोल्टेज ड्रप, इफिसियन्सीले लसेस, र म्याक्सिमम इफिसियन्सी लस बराबर हुँदा।',
      lines: [['idea', <>Regulation: voltage drop · efficiency: losses · maximum when the two losses are equal</>]],
    },
  ],
});

export const reg24 = duo('Voltage regulation', {
  draw: eqFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'No load ma secondary voltage E 2. Load ma V 2, ali kam. Regulation equals E 2 minus V 2 over V 2.',
      voice: 'नो लोडमा सेकेन्डरी भोल्टेज ई टु। लोडमा भी टु, अलि कम। रेगुलेसन इक्वल्स ई टु माइनस भी टु ओभर भी टु।',
      lines: [['h', <>Voltage regulation</>], ['eq', tex(String.raw`\%\,\text{Reg} = \dfrac{E_2 - V_2}{V_2}\times100`)]],
    },
    {
      say: 'Secondary tira refer gareko R 02 ra X 02 ma I 2 le drop dincha: I 2 R 02 ra I 2 X 02.',
      voice: 'सेकेन्डरीतिर रेफर गरेको आर जिरो टु र एक्स जिरो टु मा आई टु ले ड्रप दिन्छ — आई टु आर जिरो टु, र आई टु एक्स जिरो टु।',
      lines: [['step', <>Drops in the secondary-referred impedance: I<sub>2</sub>R<sub>02</sub>, I<sub>2</sub>X<sub>02</sub></>]],
    },
    {
      say: 'Phasor ma tero component matra lida: E 2 minus V 2 approximately I 2 R 02 cos phi plus I 2 X 02 sin phi, lagging load ko lagi.',
      voice: 'फेजरमा तेर्सो कम्पोनेन्ट मात्र लिँदा — ई टु माइनस भी टु एप्रोक्सिमेट्ली आई टु आर जिरो टु कस फाइ प्लस आई टु एक्स जिरो टु साइन फाइ, ल्यागिङ लोडको लागि।',
      lines: [['eq', tex(String.raw`\boxed{\%\,\text{Reg} \approx \dfrac{I_2R_{02}\cos\varphi \pm I_2X_{02}\sin\varphi}{V_2}\times 100}`)]],
    },
    {
      say: 'Plus lagging ko lagi, minus leading ko lagi. Leading load ma regulation negative pani huna sakcha: voltage badhcha!',
      voice: 'प्लस ल्यागिङको लागि, माइनस लिडिङको लागि। लिडिङ लोडमा रेगुलेसन नेगेटिभ पनि हुन सक्छ — भोल्टेज बढ्छ!',
      lines: [['step', <>+ for lagging pf, − for leading pf (regulation can be negative)</>]],
      ask: {
        q: 'Capacitive (leading) load ma terminal voltage k huna sakcha?',
        voice: 'क्यापासिटिभ, लिडिङ लोडमा टर्मिनल भोल्टेज के हुन सक्छ?',
        options: ['No-load bhanda badhi', 'Sadhai kam', 'Zero'],
        answer: 0,
        why: 'Minus term thulo bhaye regulation negative: V2 > E2.',
      },
    },
    {
      say: 'Maximum regulation tan phi equals X 02 over R 02 huda aaucha. Ramro transformer ma regulation sano.',
      voice: 'म्याक्सिमम रेगुलेसन ट्यान फाइ इक्वल्स एक्स जिरो टु ओभर आर जिरो टु हुँदा आउँछ। राम्रो ट्रान्सफर्मरमा रेगुलेसन सानो।',
      lines: [['idea', <>Maximum regulation when <K>{String.raw`\tan\varphi = X_{02}/R_{02}`}</K>; a small regulation is better</>]],
    },
  ],
  lecturer: [
    {
      say: 'Voltage regulation is the change in secondary terminal voltage from no load to full load, as a percentage of full-load voltage.',
      voice: 'भोल्टेज रेगुलेसन इज द चेन्ज इन सेकेन्डरी टर्मिनल भोल्टेज फ्रम नो लोड टु फुल लोड, एज अ पर्सेन्टेज अफ फुल लोड भोल्टेज।',
      lines: [['h', <>Voltage regulation</>], ['eq', tex(String.raw`\%\,\text{Reg} = \dfrac{E_2 - V_2}{V_2}\times100`)]],
    },
    {
      say: 'Let R 02 and X 02 be the equivalent resistance and reactance referred to the secondary.',
      voice: 'लेट आर जिरो टु एन्ड एक्स जिरो टु बी द इक्विभ्यालेन्ट रेजिस्टेन्स एन्ड रियाक्टेन्स रेफर्ड टु द सेकेन्डरी।',
      lines: [['step', <>Let R<sub>02</sub>, X<sub>02</sub> be referred to the secondary; load current I<sub>2</sub> at pf cos φ</>]],
    },
    {
      say: 'From the phasor diagram, approximately, the regulation is I 2 R 02 cos phi plus or minus I 2 X 02 sin phi, over V 2.',
      voice: 'फ्रम द फेजर डायग्राम, एप्रोक्सिमेट्ली, द रेगुलेसन इज आई टु आर जिरो टु कस फाइ प्लस अर माइनस आई टु एक्स जिरो टु साइन फाइ, ओभर भी टु।',
      lines: [['eq', tex(String.raw`\boxed{\%\,\text{Reg} \approx \dfrac{I_2R_{02}\cos\varphi \pm I_2X_{02}\sin\varphi}{V_2}\times 100}`)]],
    },
    {
      say: 'Positive sign for lagging and negative for leading power factor.',
      voice: 'पोजिटिभ साइन फर ल्यागिङ एन्ड नेगेटिभ फर लिडिङ पावर फ्याक्टर।',
      lines: [['step', <>+ lagging, − leading</>]],
      ask: {
        q: 'Unity pf ma regulation kasle tay garcha?',
        voice: 'युनिटी पी एफमा रेगुलेसन कसले तय गर्छ?',
        options: ['I2 R02 matra', 'I2 X02 matra', 'Dubai barabar'],
        answer: 0,
        why: 'cos φ = 1, sin φ = 0: I2 X02 term hatcha.',
      },
    },
    {
      say: 'Regulation is maximum when tan phi equals X 02 over R 02.',
      voice: 'रेगुलेसन इज म्याक्सिमम ह्वेन ट्यान फाइ इक्वल्स एक्स जिरो टु ओभर आर जिरो टु।',
      lines: [['step', <>Maximum regulation at <K>{String.raw`\tan\varphi = X_{02}/R_{02}`}</K></>]],
    },
  ],
});

export const eff24 = duo('Derivation: efficiency and maximum efficiency', {
  draw: effCurveFigure,
  viewBox: '0 0 360 232',
  tutor: [
    {
      say: 'Load fraction x, rating S, power factor cos phi. Output x S cos phi.',
      voice: 'लोड फ्र्याक्सन एक्स, रेटिङ एस, पावर फ्याक्टर कस फाइ। आउटपुट एक्स एस कस फाइ।',
      lines: [['h', <>Efficiency</>], ['eq', tex(String.raw`\eta = \dfrac{x S\cos\varphi}{x S\cos\varphi + P_i + x^2 P_{cu,fl}}`)]],
    },
    {
      say: 'Figure 2.4: iron loss P i tero rekha, constant. Copper loss x square sanga badhcha.',
      voice: 'फिगर टु पोइन्ट फोर — आइरन लस पी आई तेर्सो रेखा, कन्स्टेन्ट। कपर लस एक्स स्क्वायरसँग बढ्छ।',
      lines: [['step', <>P<sub>i</sub> constant; P<sub>cu</sub> = x²P<sub>cu,fl</sub> grows with load</>]],
    },
    {
      say: 'Current I 1 ko hisab le, eta equals V I cos phi over V I cos phi plus P i plus I square R. Maximum ko lagi denominator over I minimum hunu parcha.',
      voice: 'करेन्ट आई वानको हिसाबले, इटा इक्वल्स भी आई कस फाइ ओभर भी आई कस फाइ प्लस पी आई प्लस आई स्क्वायर आर। म्याक्सिममको लागि डिनोमिनेटर ओभर आई मिनिमम हुनु पर्छ।',
      lines: [['eq', tex(String.raw`\dfrac{d}{dI}\Big(V\cos\varphi + \dfrac{P_i}{I} + IR\Big) = 0`)]],
    },
    {
      say: 'Differentiate: minus P i over I square plus R equals zero. Tesaile I square R equals P i: copper loss equals iron loss.',
      voice: 'डिफरेन्सियट — माइनस पी आई ओभर आई स्क्वायर प्लस आर इक्वल्स जिरो। त्यसैले आई स्क्वायर आर इक्वल्स पी आई — कपर लस इक्वल्स आइरन लस।',
      lines: [['eq', tex(String.raw`\begin{aligned} -\dfrac{P_i}{I^2} + R &= 0 \\ \therefore\ I^2R &= \boxed{P_i} \end{aligned}`)]],
      ask: {
        q: 'Pi = 960 W ra full-load Pcu = 1200 W bhaye maximum efficiency kun load ma?',
        voice: 'पी आई नौ सय साठी वाट र फुल लोड पी सी यु बाह्र सय वाट भए म्याक्सिमम इफिसियन्सी कुन लोडमा?',
        options: ['89.4 % load', '80 % load', 'Full load'],
        answer: 0,
        why: 'x = √(Pi/Pcu) = √(960/1200) = 0.894.',
      },
    },
    {
      say: 'All-day efficiency: din bhari ko output kilowatt-hour over input kilowatt-hour. Distribution transformer ma iron loss sano rakhne.',
      voice: 'अल डे इफिसियन्सी — दिनभरिको आउटपुट किलोवाट आवर ओभर इनपुट किलोवाट आवर। डिस्ट्रिब्युसन ट्रान्सफर्मरमा आइरन लस सानो राख्ने।',
      lines: [['eq', tex(String.raw`\begin{aligned} x_{\eta\,max} &= \sqrt{\dfrac{P_i}{P_{cu,fl}}} \\ \eta_{all\,day} &= \dfrac{\text{output kWh}}{\text{input kWh}}\ (24\ \text{h}) \end{aligned}`)]],
    },
  ],
  lecturer: [
    {
      say: 'At a fraction x of full load S at power factor cos phi, the efficiency is as follows.',
      voice: 'एट अ फ्र्याक्सन एक्स अफ फुल लोड एस एट पावर फ्याक्टर कस फाइ, द इफिसियन्सी इज एज फलोज।',
      lines: [['h', <>Efficiency and condition for maximum</>], ['eq', tex(String.raw`\eta = \dfrac{x S\cos\varphi}{x S\cos\varphi + P_i + x^2 P_{cu,fl}}`)]],
    },
    {
      say: 'Iron loss is constant and copper loss varies as x square, Figure 2.4.',
      voice: 'आइरन लस इज कन्स्टेन्ट एन्ड कपर लस भेरिज एज एक्स स्क्वायर, फिगर टु पोइन्ट फोर।',
      lines: [['step', <>P<sub>i</sub> constant, P<sub>cu</sub> ∝ x²</>]],
    },
    {
      say: 'In terms of current, efficiency is maximum when the denominator divided by I is minimum.',
      voice: 'इन टर्म्स अफ करेन्ट, इफिसियन्सी इज म्याक्सिमम ह्वेन द डिनोमिनेटर डिभाइडेड बाइ आई इज मिनिमम।',
      lines: [['eq', tex(String.raw`\dfrac{d}{dI}\Big(V\cos\varphi + \dfrac{P_i}{I} + IR\Big) = 0`)]],
    },
    {
      say: 'Hence I square R equals P i: maximum efficiency occurs when copper loss equals iron loss.',
      voice: 'हेन्स आई स्क्वायर आर इक्वल्स पी आई — म्याक्सिमम इफिसियन्सी अकर्स ह्वेन कपर लस इक्वल्स आइरन लस।',
      lines: [['eq', tex(String.raw`\begin{aligned} -\dfrac{P_i}{I^2} + R &= 0 \\ \therefore\ I^2R &= \boxed{P_i} \end{aligned}`)]],
      ask: {
        q: 'Maximum efficiency ko condition k ho?',
        voice: 'म्याक्सिमम इफिसियन्सीको कन्डिसन के हो?',
        options: ['Copper loss = iron loss', 'Copper loss = 0', 'Iron loss = 0'],
        answer: 0,
        why: 'dη/dI = 0 dida I²R = Pi.',
      },
    },
    {
      say: 'The load for maximum efficiency is root of P i over P cu full load; all-day efficiency is the ratio of energies over 24 hours.',
      voice: 'द लोड फर म्याक्सिमम इफिसियन्सी इज रुट अफ पी आई ओभर पी सी यु फुल लोड, अल डे इफिसियन्सी इज द रेसियो अफ इनर्जिज ओभर ट्वेन्टी फोर आवर्स।',
      lines: [['eq', tex(String.raw`\begin{aligned} x_{\eta\,max} &= \sqrt{\dfrac{P_i}{P_{cu,fl}}} \\ \eta_{all\,day} &= \dfrac{\text{output kWh}}{\text{input kWh}}\ (24\ \text{h}) \end{aligned}`)]],
    },
  ],
});

export const lossAnswer24 = answer('Model answer: transformer losses and maximum efficiency', {
  draw: figAt(effCurveFigure, { 0: 1, 1: 1, 2: 2, 3: 3, 4: 5 }),
  viewBox: '0 0 360 232',
  papers: ['2075 Baishakh', '2071 Bhadra', '2066 Magh', '2068 Bhadra'],
  marks: '[5 + 3]',
  q: 'Describe different types of losses on the transformer. Derive the expression for the maximum efficiency also.',
  read: {
    say: 'IOE ma char choti: describe different types of losses on the transformer. Derive the expression for the maximum efficiency also. Losses paanch marks, derivation tin.',
    voice: 'आई ओ ईमा चार चोटि — डिस्क्राइब डिफरेन्ट टाइप्स अफ लसेस अन द ट्रान्सफर्मर। डिराइभ द एक्सप्रेसन फर द म्याक्सिमम इफिसियन्सी अल्सो। लसेस पाँच मार्क्स, डेरिभेसन तीन।',
  },
  points: [
    {
      node: <><H>(a) Losses [5]</H><Pts items={[<><b>Iron (core) loss P<sub>i</sub>:</b> hysteresis <K>{String.raw`\eta B_{max}^{1.6} fV`}</K> + eddy current <K>{String.raw`k_eB_m^2f^2t^2V`}</K></>, <>Constant at all loads (V, f constant); found by the OC test</>]} /></>,
      say: 'Iron loss: hysteresis plus eddy current loss in the core. It is constant at all loads and is found by the OC test.',
      voice: 'आइरन लस — हिस्टेरेसिस प्लस एडी करेन्ट लस इन द कोर। इट इज कन्स्टेन्ट एट अल लोड्स एन्ड इज फाउन्ड बाइ द ओ सी टेस्ट।',
    },
    {
      node: <><Pts items={[<><b>Copper loss P<sub>cu</sub>:</b> <K>{String.raw`I_1^2R_1 + I_2^2R_2 = I_2^2R_{02}`}</K>, varies as (load)²; found by the SC test</>, <><b>Stray and dielectric losses:</b> small, in the tank and insulation</>]} /></>,
      say: 'Copper loss: I 1 square R 1 plus I 2 square R 2, varying as load square; found by the SC test. Stray and dielectric losses are small.',
      voice: 'कपर लस — आई वान स्क्वायर आर वान प्लस आई टु स्क्वायर आर टु, भेरिइङ एज लोड स्क्वायर, फाउन्ड बाइ द एस सी टेस्ट। स्ट्रे एन्ड डाइइलेक्ट्रिक लसेस आर स्मल।',
    },
    {
      page: true,
      node: <><H>(b) Maximum efficiency [3]</H>Let V<sub>2</sub>, I<sub>2</sub>, cos φ, R<sub>02</sub>:<K>{String.raw`\eta = \dfrac{V_2I_2\cos\varphi}{V_2I_2\cos\varphi + P_i + I_2^2R_{02}}`}</K></>,
      say: 'Maximum efficiency: let V 2, I 2, cos phi and R 02. Efficiency equals V 2 I 2 cos phi over V 2 I 2 cos phi plus P i plus I 2 square R 02.',
      voice: 'म्याक्सिमम इफिसियन्सी — लेट भी टु, आई टु, कस फाइ, एन्ड आर जिरो टु। इफिसियन्सी इक्वल्स भी टु आई टु कस फाइ ओभर भी टु आई टु कस फाइ प्लस पी आई प्लस आई टु स्क्वायर आर जिरो टु।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} \eta &= \dfrac{V_2\cos\varphi}{V_2\cos\varphi + \frac{P_i}{I_2} + I_2R_{02}} \\ \dfrac{d}{dI_2}\Big(\dfrac{P_i}{I_2} + I_2R_{02}\Big) &= 0 \end{aligned}`}</K></>,
      say: 'Dividing by I 2, efficiency is maximum when P i over I 2 plus I 2 R 02 is minimum; its derivative is zero.',
      voice: 'डिभाइडिङ बाइ आई टु, इफिसियन्सी इज म्याक्सिमम ह्वेन पी आई ओभर आई टु प्लस आई टु आर जिरो टु इज मिनिमम, इट्स डेरिभेटिभ इज जिरो।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} -\dfrac{P_i}{I_2^2} + R_{02} &= 0 \\ \therefore\ I_2^2R_{02} &= \boxed{P_i} \end{aligned}`}</K>Maximum efficiency when copper loss = iron loss (Fig. 2.4); at load <K>{String.raw`x = \sqrt{P_i/P_{cu,fl}}`}</K>.</>,
      say: 'Hence I 2 square R 02 equals P i: maximum efficiency when copper loss equals iron loss, at load x equals root of P i over P cu full load.',
      voice: 'हेन्स आई टु स्क्वायर आर जिरो टु इक्वल्स पी आई — म्याक्सिमम इफिसियन्सी ह्वेन कपर लस इक्वल्स आइरन लस, एट लोड एक्स इक्वल्स रुट अफ पी आई ओभर पी सी यु फुल लोड।',
      ask: {
        q: 'Maximum efficiency ma total loss kati?',
        voice: 'म्याक्सिमम इफिसियन्सीमा टोटल लस कति?',
        options: ['2 Pi', 'Pi', 'Pi/2'],
        answer: 0,
        why: 'Pcu = Pi, total = 2Pi.',
      },
    },
  ],
});

export const effSolve24 = solve({
  title: 'IOE 2073 Bhadra: efficiency of a 100 kVA transformer',
  paper: '2073 Bhadra',
  paperVoice: 'दुई हजार त्रिहत्तर भदौ',
  question: 'A transformer is rated at 100 kVA. At full load its copper loss is 1200 W and its iron loss is 960 W. Calculate: (i) Efficiency at full load, unity power factor (ii) Efficiency at half load, 0.8 power factor.',
  read: '100 kVA, full-load copper loss 1200 watt, iron loss 960 watt. Full load unity pf ra half load 0.8 pf ma efficiency.',
  readVoice: 'एक सय के भी ए, फुल लोड कपर लस बाह्र सय वाट, आइरन लस नौ सय साठी वाट। फुल लोड युनिटी पी एफ र हाफ लोड जिरो पोइन्ट एट पी एफमा इफिसियन्सी।',
  given: [
    { node: <>S = 100 kVA, P<sub>cu,fl</sub> = 1200 W, P<sub>i</sub> = 960 W</>, say: 'S 100 kVA, Pcu 1200 W, Pi 960 W', voice: 'एस एक सय के भी ए, पी सी यु बाह्र सय वाट, पी आई नौ सय साठी वाट' },
  ],
  find: { node: <>η at (i) x = 1, cos φ = 1; (ii) x = ½, cos φ = 0.8</>, say: 'Nikalnu parne: dui awastha ko efficiency.', voice: 'निकाल्नु पर्ने — दुई अवस्थाको इफिसियन्सी।' },
  idea: { node: <><K>{String.raw`\eta = \dfrac{xS\cos\varphi}{xS\cos\varphi + P_i + x^2P_{cu,fl}}`}</K></>, say: 'Method: x S cos phi over plus P i plus x square P cu.', voice: 'मेथड — एक्स एस कस फाइ ओभर प्लस पी आई प्लस एक्स स्क्वायर पी सी यु।' },
  steps: [
    {
      node: <K>{String.raw`\begin{aligned} \eta_{(i)} &= \dfrac{100\,000}{100\,000 + 960 + 1200} \\ &= \dfrac{100\,000}{102\,160} \\ &= 97.89\,\% \end{aligned}`}</K>,
      say: 'Full load unity pf: 100,000 over 102,160, equals 97.89 percent.',
      voice: 'फुल लोड युनिटी पी एफ — एक लाख ओभर एक लाख दुई हजार एक सय साठी, इक्वल्स सन्तानब्बे दशमलव आठ नौ प्रतिशत।',
    },
    {
      node: <K>{String.raw`\begin{aligned} \text{Output} &= 0.5\times100\times0.8 \\ &= 40\ \text{kW} \\ P_{cu} &= (0.5)^2\times1200 \\ &= 300\ \text{W} \end{aligned}`}</K>,
      say: 'Half load: output 40 kilowatt, copper loss one quarter of 1200, 300 watt.',
      voice: 'हाफ लोड — आउटपुट चालीस किलोवाट, कपर लस बाह्र सयको एक चौथाइ, तीन सय वाट।',
      ask: {
        q: 'Half load ma iron loss kati?',
        voice: 'हाफ लोडमा आइरन लस कति?',
        options: ['960 W', '480 W', '240 W'],
        answer: 0,
        why: 'Iron loss load ma depend gardaina.',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} \eta_{(ii)} &= \dfrac{40\,000}{40\,000 + 960 + 300} \\ &= \dfrac{40\,000}{41\,260} \\ &= 96.95\,\% \end{aligned}`}</K>,
      say: 'Efficiency equals 40,000 over 41,260, 96.95 percent.',
      voice: 'इफिसियन्सी इक्वल्स चालीस हजार ओभर एकचालीस हजार दुई सय साठी, छयानब्बे दशमलव नौ पाँच प्रतिशत।',
    },
  ],
  answer: { node: <K>{String.raw`\boxed{\eta_{(i)} = 97.89\,\%, \quad \eta_{(ii)} = 96.95\,\%}`}</K>, say: 'Answer: 97.89 percent ra 96.95 percent.', voice: 'आन्सर — सन्तानब्बे दशमलव आठ नौ प्रतिशत, र छयानब्बे दशमलव नौ पाँच प्रतिशत।' },
  trap: { node: <>Trap: at half load the copper loss is ¼ of full-load, not ½; the iron loss stays 960 W.</>, say: 'Trap: half load ma copper loss chauthai, aadha hoina; iron loss ustai.', voice: 'ट्र्याप — हाफ लोडमा कपर लस चौथाइ, आधा होइन, आइरन लस उस्तै।' },
});

/* ── 2.5 Auto, instrument and three-phase transformers ───────────────── */
export const basics25 = duo('2.12 · Basic understanding: auto, instrument and three-phase transformers', {
  three: transformerTour([
    { shot: 'primary', show: ['core', 'primary', 'source', 'tap'], flow: 0.6, flux: 1, tap: 0.5, focus: ['primary', 'tap'], labels: [['euta coil', 'primary'], ['tap', 'tap']] },
    { tap: 0.9, tapMs: 2000, focus: ['tap'], labels: [['tap sarauda voltage', 'tap']] },
    { tap: 0.5, focus: ['primary'], labels: [['tama bachyo', 'primary']] },
    { shot: 'whole', show: LOADED, flow: 1, flow2: 0.3, tap: 0.5, focus: ['primary', 'source'], labels: [['thulo current', 'primary'], ['sano naap', 'lamp']] },
    { focus: ['secondary'], flow2: 0.3, labels: [['kahile khulla nachhoda', 'secondary']] },
    { focus: ['secondary', 'lamp'], flow: 0.6, flow2: 0.6, labels: [['voltage ghatyo', 'lamp']] },
    { shot: 'core', show: ['core3', 'coils3'], flux: 0, flow: 0, flow2: 0, focus: ['core3', 'coils3'], labels: [['tin khutta', 'core3'], ['R Y B', 'coils3']] },
    { shot: 'whole', show: ['core3', 'coils3'], focus: null },
  ]),
  tutor: [
    {
      say: 'Yo transformer ma euta matra coil cha, bich ma euta tap. Supply pura coil ma, load chai coil ko ek bhag bata.',
      voice: 'यो ट्रान्सफर्मरमा एउटा मात्र कोइल छ, बीचमा एउटा ट्याप। सप्लाई पूरा कोइलमा, लोड चाहिँ कोइलको एक भागबाट।',
      lines: [['h', <>2.12 · Euta coil, CT ra tin phase</>], part(<>Auto transformer</>, <>euta coil, bich ma tap</>)],
    },
    {
      say: 'Tap sarauda output voltage badlincha. Ghar ko stabiliser ra lab ko variac yahi ho.',
      voice: 'ट्याप सराउँदा आउटपुट भोल्टेज बदलिन्छ। घरको स्टेबिलाइजर र ल्याबको भेरियाक यही हो।',
      lines: [chain(<>Tap sarayo → voltage badlincha (variac, stabiliser)</>)],
    },
    {
      say: 'Euta coil le dui coil ko kaam garcha, tesaile tama kam lagcha ra sasto. Tara input ra output jodiyekai hunchan.',
      voice: 'एउटा कोइलले दुई कोइलको काम गर्छ, त्यसैले तामा कम लाग्छ र सस्तो। तर इनपुट र आउटपुट जोडिएकै हुन्छन्।',
      lines: [['step', <>Tama bachcha · tara input-output jodiyeka</>]],
      ask: {
        q: 'Auto transformer ko kamjori k ho?',
        voice: 'अटो ट्रान्सफर्मरको कमजोरी के हो?',
        options: ['Input ra output alag hudainan', 'Dherai tama lagcha', 'AC ma chaldaina'],
        answer: 0,
        why: 'Euta coil: dubai side jodiyeka, tesaile isolation hudaina.',
      },
    },
    {
      say: 'Line ko thulo current meter le sidhai naapna sakdaina. CT le thulo current lai sano current ma badalera meter ma dincha.',
      voice: 'लाइनको ठूलो करेन्ट मिटरले सिधै नाप्न सक्दैन। सी टीले ठूलो करेन्टलाई सानो करेन्टमा बदलेर मिटरमा दिन्छ।',
      lines: [part(<>CT</>, <>thulo current → sano current, meter ko lagi</>)],
    },
    {
      say: 'CT ko secondary kahile khulla nachhoda. Khulla bhaye core ma bhayankar flux bancha, ra khatarnak thulo voltage aaucha.',
      voice: 'सी टीको सेकेन्डरी कहिल्यै खुल्ला नछोड। खुल्ला भए कोरमा भयंकर फ्लक्स बन्छ, र खतरनाक ठूलो भोल्टेज आउँछ।',
      lines: [chain(<>CT secondary khulla → thulo flux → khatarnak voltage</>)],
    },
    {
      say: 'PT chai thulo voltage lai sano voltage ma jharcha, voltmeter ko lagi.',
      voice: 'पी टी चाहिँ ठूलो भोल्टेजलाई सानो भोल्टेजमा झार्छ, भोल्टमिटरको लागि।',
      lines: [part(<>PT</>, <>thulo voltage → sano voltage</>)],
    },
    {
      say: 'Pawar house bata tin phase bijuli aaucha. Tin khutta bhayeko core ma R, Y ra B ka coil: three-phase transformer.',
      voice: 'पावरहाउसबाट तीन फेज बिजुली आउँछ। तीन खुट्टा भएको कोरमा आर, वाई, र बी का कोइल — थ्री फेज ट्रान्सफर्मर।',
      lines: [chain(<>Tin khutta ko core + R Y B coil → three-phase</>)],
    },
    {
      say: 'Saransha: auto ma euta coil, CT ra PT naapne kaam ma, ra three-phase ma tin khutta.',
      voice: 'सारांश — अटोमा एउटा कोइल, सी टी र पी टी नाप्ने काममा, र थ्री फेजमा तीन खुट्टा।',
      lines: [['idea', <>Auto: euta coil · CT, PT: naap · three-phase: tin khutta</>]],
    },
  ],
  lecturer: [
    {
      say: 'Auto transformer ma eutai winding hunchha, jasko ek bhag primary ra secondary dubai ma common huncha.',
      voice: 'अटो ट्रान्सफर्मरमा एउटै वाइन्डिङ हुन्छ, जसको एक भाग प्राइमरी र सेकेन्डरी दुवैमा कमन हुन्छ।',
      lines: [['h', <>2.12 · Special transformers</>], part(<>Auto transformer</>, <>a single winding with a common part</>)],
    },
    {
      say: 'Tapping position badlera variable output voltage paincha: variac.',
      voice: 'ट्यापिङ पोजिसन बदलेर भेरिएबल आउटपुट भोल्टेज पाइन्छ — भेरियाक।',
      lines: [chain(<>Movable tap → variable voltage (variac)</>)],
    },
    {
      say: 'Common part ma kam current bagcha, tesaile copper saving huncha; tara electrical isolation hudaina.',
      voice: 'कमन पार्टमा कम करेन्ट बग्छ, त्यसैले कपर सेभिङ हुन्छ, तर इलेक्ट्रिकल आइसोलेसन हुँदैन।',
      lines: [['step', <>Copper saving · no electrical isolation</>]],
      ask: {
        q: 'Auto transformer ma copper saving kina huncha?',
        voice: 'अटो ट्रान्सफर्मरमा कपर सेभिङ किन हुन्छ?',
        options: ['Common part ma kam current', 'Core sano huncha', 'Frequency badhcha'],
        answer: 0,
        why: 'Common part ma I2 − I1 matra bagcha.',
      },
    },
    {
      say: 'Current transformer le thulo line current lai standard sano current ma step down garcha.',
      voice: 'करेन्ट ट्रान्सफर्मरले ठूलो लाइन करेन्टलाई स्ट्यान्डर्ड सानो करेन्टमा स्टेप डाउन गर्छ।',
      lines: [part(<>CT</>, <>large line current → small standard current</>)],
    },
    {
      say: 'CT ko secondary open garnu hudaina; burden bina primary current sabai magnetising bancha ra high voltage induce huncha.',
      voice: 'सी टीको सेकेन्डरी ओपन गर्नु हुँदैन, बर्डन बिना प्राइमरी करेन्ट सबै म्याग्नेटाइजिङ बन्छ, र हाई भोल्टेज इन्ड्युस हुन्छ।',
      lines: [['step', <>CT secondary must never be open-circuited</>]],
    },
    {
      say: 'Potential transformer le high voltage lai measurement ko lagi low voltage ma jharcha.',
      voice: 'पोटेन्सियल ट्रान्सफर्मरले हाई भोल्टेजलाई मेजरमेन्टको लागि लो भोल्टेजमा झार्छ।',
      lines: [part(<>PT</>, <>high voltage → measurable low voltage</>)],
    },
    {
      say: 'Three-phase transformer ma tin limb ko core ma pratyek phase ko winding hunchha.',
      voice: 'थ्री फेज ट्रान्सफर्मरमा तीन लिम्बको कोरमा प्रत्येक फेजको वाइन्डिङ हुन्छ।',
      lines: [part(<>Three-phase</>, <>three-limb core, one phase per limb</>)],
    },
    {
      say: 'Saransha: auto transformer le copper bachaucha, instrument transformers le measurement surakshit banaucha, ra three-phase le power transmit garcha.',
      voice: 'सारांश — अटो ट्रान्सफर्मरले कपर बचाउँछ, इन्स्ट्रुमेन्ट ट्रान्सफर्मर्सले मेजरमेन्ट सुरक्षित बनाउँछ, र थ्री फेजले पावर ट्रान्समिट गर्छ।',
      lines: [['idea', <>Auto: Cu saving · CT/PT: safe measurement · three-phase: transmission</>]],
    },
  ],
});

export const auto25 = duo('Derivation: copper saving in an auto transformer', {
  draw: autoFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Figure 2.5: N 1 turns ko euta winding, V 1 pura ma. N 2 turns ma tap gareko bata V 2.',
      voice: 'फिगर टु पोइन्ट फाइभ — एन वान टर्न्सको एउटा वाइन्डिङ, भी वान पूरामा। एन टु टर्न्समा ट्याप गरेकोबाट भी टु।',
      lines: [['h', <>Auto transformer</>], ['step', <>One winding N<sub>1</sub>; tap at N<sub>2</sub>; K = N<sub>2</sub>/N<sub>1</sub> = V<sub>2</sub>/V<sub>1</sub></>]],
    },
    {
      say: 'Mathi ko bhag N 1 minus N 2 ma I 1 bagcha. Common bhag N 2 ma I 2 minus I 1 matra.',
      voice: 'माथिको भाग एन वान माइनस एन टु मा आई वान बग्छ। कमन भाग एन टु मा आई टु माइनस आई वान मात्र।',
      lines: [['step', <>Upper section (N<sub>1</sub> − N<sub>2</sub>): I<sub>1</sub> · common section N<sub>2</sub>: I<sub>2</sub> − I<sub>1</sub></>]],
    },
    {
      say: 'Copper ko weight length ra current density ko hisab le: turns times current. Dui winding ma N 1 I 1 plus N 2 I 2.',
      voice: 'कपरको वेट लेन्थ र करेन्ट डेन्सिटीको हिसाबले — टर्न्स टाइम्स करेन्ट। दुई वाइन्डिङमा एन वान आई वान प्लस एन टु आई टु।',
      lines: [['eq', tex(String.raw`\begin{aligned} W_{tw} &\propto N_1I_1 + N_2I_2 \\ W_{a} &\propto (N_1 - N_2)I_1 + N_2(I_2 - I_1) \end{aligned}`)]],
    },
    {
      say: 'I 2 equals I 1 over K ra N 2 equals K N 1 rakhda ratio 1 minus K aaucha.',
      voice: 'आई टु इक्वल्स आई वान ओभर के, र एन टु इक्वल्स के एन वान राख्दा रेसियो वान माइनस के आउँछ।',
      lines: [['eq', tex(String.raw`\begin{aligned} \dfrac{W_a}{W_{tw}} &= \dfrac{2N_1I_1(1-K)}{2N_1I_1} \\ \therefore\ W_a &= \boxed{(1 - K)\,W_{tw}} \end{aligned}`)]],
      ask: {
        q: 'K = 0.9 bhaye auto transformer ma two-winding ko kati copper lagcha?',
        voice: 'के जिरो पोइन्ट नाइन भए अटो ट्रान्सफर्मरमा टु वाइन्डिङको कति कपर लाग्छ?',
        options: ['10 %', '90 %', '50 %'],
        answer: 0,
        why: '1 − K = 0.1: saving 90 %.',
      },
    },
    {
      say: 'Saving K W tw. K ek najik bhaye saving dherai; tesaile auto transformer ratio ek najik huda matra ramro.',
      voice: 'सेभिङ के डब्लु टी डब्लु। के एक नजिक भए सेभिङ धेरै, त्यसैले अटो ट्रान्सफर्मर रेसियो एक नजिक हुँदा मात्र राम्रो।',
      lines: [['idea', <>Saving = K × W<sub>tw</sub>: economical when K ≈ 1 (e.g. 11 kV/ 13.2 kV interconnection, starters, variacs)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Consider a step-down auto transformer: one winding of N 1 turns, tapped at N 2 turns, Figure 2.5.',
      voice: 'कन्सिडर अ स्टेप डाउन अटो ट्रान्सफर्मर — वान वाइन्डिङ अफ एन वान टर्न्स, ट्याप्ड एट एन टु टर्न्स, फिगर टु पोइन्ट फाइभ।',
      lines: [['h', <>Copper saving in an auto transformer</>], ['step', <>Let N<sub>1</sub>, N<sub>2</sub>, K = N<sub>2</sub>/N<sub>1</sub></>]],
    },
    {
      say: 'The section N 1 minus N 2 carries I 1, and the common section carries I 2 minus I 1.',
      voice: 'द सेक्सन एन वान माइनस एन टु क्यारिज आई वान, एन्ड द कमन सेक्सन क्यारिज आई टु माइनस आई वान।',
      lines: [['step', <>Series section: I<sub>1</sub>; common section: I<sub>2</sub> − I<sub>1</sub></>]],
    },
    {
      say: 'Weight of copper is proportional to the product of turns and current in each section.',
      voice: 'वेट अफ कपर इज प्रपोर्सनल टु द प्रडक्ट अफ टर्न्स एन्ड करेन्ट इन इच सेक्सन।',
      lines: [['eq', tex(String.raw`\begin{aligned} W_{tw} &\propto N_1I_1 + N_2I_2 \\ W_{a} &\propto (N_1 - N_2)I_1 + N_2(I_2 - I_1) \end{aligned}`)]],
    },
    {
      say: 'With N 2 equals K N 1 and I 2 equals I 1 over K, the ratio becomes 1 minus K.',
      voice: 'विद एन टु इक्वल्स के एन वान एन्ड आई टु इक्वल्स आई वान ओभर के, द रेसियो बिकम्स वान माइनस के।',
      lines: [['eq', tex(String.raw`\begin{aligned} \dfrac{W_a}{W_{tw}} &= \dfrac{2N_1I_1(1-K)}{2N_1I_1} \\ \therefore\ W_a &= \boxed{(1 - K)\,W_{tw}} \end{aligned}`)]],
      ask: {
        q: 'Copper saving kati huncha?',
        voice: 'कपर सेभिङ कति हुन्छ?',
        options: ['K × W(two-winding)', '(1 − K) × W(two-winding)', 'Saving hudaina'],
        answer: 0,
        why: 'Saving = Wtw − Wa = K Wtw.',
      },
    },
    {
      say: 'Saving equals K times the two-winding copper; it is economical when K is close to unity.',
      voice: 'सेभिङ इक्वल्स के टाइम्स द टु वाइन्डिङ कपर, इट इज इकोनोमिकल ह्वेन के इज क्लोज टु युनिटी।',
      lines: [['step', <>Saving = K W<sub>tw</sub>, economical for K ≈ 1</>]],
    },
  ],
});

export const special25 = duo('Instrument transformers and three-phase transformers', {
  draw: autoFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Instrument transformer naapne kaam ko lagi: CT le current, PT le voltage. Meter ra manchhe dubai surakshit.',
      voice: 'इन्स्ट्रुमेन्ट ट्रान्सफर्मर नाप्ने कामको लागि — सी टीले करेन्ट, पी टीले भोल्टेज। मिटर र मान्छे दुवै सुरक्षित।',
      lines: [['h', <>Instrument and three-phase transformers</>], ['step', <>CT: current (series, few primary turns) · PT: voltage (parallel, many primary turns)</>]],
    },
    {
      say: 'CT secondary 5 ampere wa 1 ampere standard. Ammeter le lagbhag short circuit ma kaam garcha.',
      voice: 'सी टी सेकेन्डरी फाइभ एम्पियर वा वान एम्पियर स्ट्यान्डर्ड। एमिटरले लगभग सर्ट सर्किटमा काम गर्छ।',
      lines: [['step', <>CT secondary: 5 A or 1 A, works nearly short-circuited</>]],
    },
    {
      say: 'CT secondary open garyo bhane counter MMF hudaina; primary current sabai magnetising bancha, flux saturate, ra hajarau volt induce.',
      voice: 'सी टी सेकेन्डरी ओपन गर्‍यो भने काउन्टर एम एम एफ हुँदैन, प्राइमरी करेन्ट सबै म्याग्नेटाइजिङ बन्छ, फ्लक्स स्याचुरेट, र हजारौं भोल्ट इन्ड्युस।',
      lines: [['step', <>Open CT secondary: no counter MMF → core saturates → dangerous high voltage, overheating</>]],
      ask: {
        q: 'CT ko ammeter hataunu paryo bhane pahila k garne?',
        voice: 'सी टीको एमिटर हटाउनु पर्‍यो भने पहिला के गर्ने?',
        options: ['Secondary short garne', 'Secondary open garne', 'Primary short garne'],
        answer: 0,
        why: 'Short gare counter MMF rahancha, high voltage aaudaina.',
      },
    },
    {
      say: 'PT secondary 110 volt standard, ra yasko voltmeter le lagbhag open circuit ma kaam garcha.',
      voice: 'पी टी सेकेन्डरी एक सय दस भोल्ट स्ट्यान्डर्ड, र यसको भोल्टमिटरले लगभग ओपन सर्किटमा काम गर्छ।',
      lines: [['step', <>PT secondary: 110 V, works nearly open-circuited</>]],
    },
    {
      say: 'Three-phase connections: star-star, delta-delta, star-delta ra delta-star. Delta-star step-up ko lagi, star-delta step-down ko lagi.',
      voice: 'थ्री फेज कनेक्सन्स — स्टार स्टार, डेल्टा डेल्टा, स्टार डेल्टा, र डेल्टा स्टार। डेल्टा स्टार स्टेप अपको लागि, स्टार डेल्टा स्टेप डाउनको लागि।',
      lines: [['idea', <>Three-phase: Y-Y, Δ-Δ, Y-Δ (step-down at receiving end), Δ-Y (step-up at generating station, distribution)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Instrument transformers are used for measurement and protection: the CT for current and the PT for voltage.',
      voice: 'इन्स्ट्रुमेन्ट ट्रान्सफर्मर्स आर युज्ड फर मेजरमेन्ट एन्ड प्रोटेक्सन — द सी टी फर करेन्ट एन्ड द पी टी फर भोल्टेज।',
      lines: [['h', <>Instrument and three-phase transformers</>], ['step', <>CT in series with the line; PT across the line</>]],
    },
    {
      say: 'The CT secondary is rated 5 ampere or 1 ampere and works nearly short-circuited.',
      voice: 'द सी टी सेकेन्डरी इज रेटेड फाइभ एम्पियर अर वान एम्पियर एन्ड वर्क्स नियर्ली सर्ट सर्किटेड।',
      lines: [['step', <>CT secondary 5 A / 1 A, nearly short-circuited</>]],
    },
    {
      say: 'If the CT secondary is opened, there is no counter MMF; the core saturates and a dangerously high voltage is induced.',
      voice: 'इफ द सी टी सेकेन्डरी इज ओपन्ड, देयर इज नो काउन्टर एम एम एफ, द कोर स्याचुरेट्स एन्ड अ डेन्जरस्ली हाई भोल्टेज इज इन्ड्युस्ड।',
      lines: [['step', <>Open secondary: core saturates, high voltage, overheating</>]],
      ask: {
        q: 'CT ko primary current kasle tay garcha?',
        voice: 'सी टीको प्राइमरी करेन्ट कसले तय गर्छ?',
        options: ['Line ko load', 'CT ko burden', 'Secondary voltage'],
        answer: 0,
        why: 'CT primary line ma series: current line le tay garcha.',
      },
    },
    {
      say: 'The PT secondary is rated 110 volt and works nearly open-circuited.',
      voice: 'द पी टी सेकेन्डरी इज रेटेड वान हन्ड्रेड टेन भोल्ट एन्ड वर्क्स नियर्ली ओपन सर्किटेड।',
      lines: [['step', <>PT secondary 110 V, nearly open-circuited</>]],
    },
    {
      say: 'Three-phase connections: star-star, delta-delta, star-delta and delta-star, chosen by voltage level and neutral needs.',
      voice: 'थ्री फेज कनेक्सन्स — स्टार स्टार, डेल्टा डेल्टा, स्टार डेल्टा, एन्ड डेल्टा स्टार, चोजन बाइ भोल्टेज लेभल एन्ड न्युट्रल निड्स।',
      lines: [['step', <><Pts items={[<>Y-Y, Δ-Δ, Y-Δ (step-down), Δ-Y (step-up, distribution with neutral)</>]} /></>]],
    },
  ],
});

export const autoAnswer25 = answer('Model answer: auto transformer and Cu saving', {
  draw: autoFigure,
  viewBox: '0 0 360 220',
  papers: ['2073 Chaitra', '2070 Bhadra', '2079 Jestha'],
  q: 'What is an auto transformer? State its merits and demerits over a two winding transformer. Derive an expression of Cu-saving in auto transformer.',
  read: {
    say: 'IOE ma tin choti: what is an auto transformer? State its merits and demerits over a two winding transformer. Derive an expression of Cu-saving in auto transformer.',
    voice: 'आई ओ ईमा तीन चोटि — ह्वाट इज एन अटो ट्रान्सफर्मर? स्टेट इट्स मेरिट्स एन्ड डिमेरिट्स ओभर अ टु वाइन्डिङ ट्रान्सफर्मर। डिराइभ एन एक्सप्रेसन अफ कपर सेभिङ इन अटो ट्रान्सफर्मर।',
  },
  points: [
    {
      node: <><H>Auto transformer</H><Pts items={[<>A transformer with a single winding, part of which is common to both primary and secondary (Fig. 2.5)</>]} /></>,
      say: 'An auto transformer has a single winding, part of which is common to both primary and secondary.',
      voice: 'एन अटो ट्रान्सफर्मर ह्याज अ सिङ्गल वाइन्डिङ, पार्ट अफ ह्विच इज कमन टु बोथ प्राइमरी एन्ड सेकेन्डरी।',
    },
    {
      node: <><Pts items={[<><b>Merits:</b> less copper, smaller size and cost, lower losses, higher efficiency, better regulation, continuously variable output</>, <><b>Demerits:</b> no electrical isolation; a break in the common part puts full V<sub>1</sub> on the load; larger short-circuit current</>]} /></>,
      say: 'Merits: less copper, lower cost and losses, better regulation, variable output. Demerits: no isolation, full primary voltage on the load if the common part opens, higher fault current.',
      voice: 'मेरिट्स — लेस कपर, स्मलर एन्ड चिपर, लोअर लसेस, बेटर रेगुलेसन, भेरिएबल आउटपुट। डिमेरिट्स — नो आइसोलेसन, फुल प्राइमरी भोल्टेज अन द लोड इफ द कमन पार्ट ओपन्स, एन्ड हाइयर फल्ट करेन्ट।',
    },
    {
      page: true,
      node: <><H>Cu saving</H>Let N<sub>2</sub> = KN<sub>1</sub>, I<sub>2</sub> = I<sub>1</sub>/K. Weight of Cu ∝ NI.<K>{String.raw`\begin{aligned} W_{tw} &\propto N_1I_1 + N_2I_2 = 2N_1I_1 \\ W_a &\propto (N_1-N_2)I_1 + N_2(I_2-I_1) \end{aligned}`}</K></>,
      say: 'Let N 2 equal K N 1 and I 2 equal I 1 over K. Copper weight is proportional to N I. Two-winding: 2 N 1 I 1. Auto: N 1 minus N 2 times I 1, plus N 2 times I 2 minus I 1.',
      voice: 'लेट एन टु इक्वल के एन वान एन्ड आई टु इक्वल आई वान ओभर के। कपर वेट इज प्रपोर्सनल टु एन आई। टु वाइन्डिङ — टु एन वान आई वान। अटो — एन वान माइनस एन टु टाइम्स आई वान, प्लस एन टु टाइम्स आई टु माइनस आई वान।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} W_a &\propto N_1I_1(1-K) + N_1I_1(1-K) \\ \therefore\ \dfrac{W_a}{W_{tw}} &= 1 - K \end{aligned}`}</K></>,
      say: 'Substituting, W a is proportional to 2 N 1 I 1 times 1 minus K. Therefore W a over W tw equals 1 minus K.',
      voice: 'सब्स्टिट्युटिङ, डब्लु ए इज प्रपोर्सनल टु टु एन वान आई वान टाइम्स वान माइनस के। देयरफोर डब्लु ए ओभर डब्लु टी डब्लु इक्वल्स वान माइनस के।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} \text{Cu saving} &= W_{tw} - W_a \\ &= \boxed{K\,W_{tw}} \end{aligned}`}</K>The saving is large when K ≈ 1; hence used for ratios near unity.</>,
      say: 'Cu saving equals K times W tw; it is large when K is close to one.',
      voice: 'कपर सेभिङ इक्वल्स के टाइम्स डब्लु टी डब्लु, इट इज लार्ज ह्वेन के इज क्लोज टु वान।',
      ask: {
        q: '400/200 V auto transformer ma two-winding bhanda kati copper bachcha?',
        voice: 'चार सय बटा दुई सय भोल्ट अटो ट्रान्सफर्मरमा टु वाइन्डिङभन्दा कति कपर बच्छ?',
        options: ['50 %', '25 %', '75 %'],
        answer: 0,
        why: 'K = 0.5: saving = K = 50 %.',
      },
    },
  ],
});

export const ctAnswer25 = answer('Model answer: why the CT secondary must not be opened', {
  papers: ['2079 Jestha', '2068 Bhadra'],
  q: 'Why secondary of CT should not be left open?',
  read: {
    say: 'IOE 2079 Jestha: why secondary of CT should not be left open? 2068 Bhadra ma true-false justify ko rup ma.',
    voice: 'आई ओ ई दुई हजार उनासी जेठ — ह्वाई सेकेन्डरी अफ सी टी सुड नट बी लेफ्ट ओपन? दुई हजार अठसट्ठी भदौमा ट्रु फल्स जस्टिफाइको रूपमा।',
  },
  points: [
    {
      node: <><H>CT in normal use</H><Pts items={[<>Primary is in series with the line: I<sub>1</sub> is fixed by the load, not by the CT</>, <>Secondary MMF N<sub>2</sub>I<sub>2</sub> opposes N<sub>1</sub>I<sub>1</sub>; the core flux and EMF are small</>]} /></>,
      say: 'Normally the primary is in series with the line, so I 1 is fixed by the load. The secondary MMF opposes the primary MMF, so the flux and EMF are small.',
      voice: 'नर्मल्ली द प्राइमरी इज इन सिरिज विद द लाइन, सो आई वान इज फिक्स्ड बाइ द लोड। द सेकेन्डरी एम एम एफ अपोजेज द प्राइमरी एम एम एफ, सो द फ्लक्स एन्ड ई एम एफ आर स्मल।',
    },
    {
      node: <><H>If the secondary is open</H><Pts items={[<>No counter MMF: all of N<sub>1</sub>I<sub>1</sub> magnetises the core</>, <>Flux rises to saturation; <K>{String.raw`E_2 = 4.44 f N_2 \Phi_m`}</K> becomes very high (many N<sub>2</sub> turns)</>]} /></>,
      say: 'If the secondary is open there is no counter MMF; the whole primary MMF magnetises the core, the flux saturates, and E 2 becomes very high.',
      voice: 'इफ द सेकेन्डरी इज ओपन देयर इज नो काउन्टर एम एम एफ, द होल प्राइमरी एम एम एफ म्याग्नेटाइजेज द कोर, द फ्लक्स स्याचुरेट्स, एन्ड ई टु बिकम्स भेरी हाई।',
    },
    {
      node: <><H>Results</H><Pts items={[<>Dangerous voltage: risk to the operator and insulation breakdown</>, <>Large core loss overheats the CT; residual magnetism spoils its accuracy</>, <>∴ short the secondary before removing the meter</>]} /></>,
      say: 'Results: a dangerous voltage, insulation breakdown, overheating, and residual magnetism that spoils accuracy. Therefore short the secondary before removing the meter.',
      voice: 'रिजल्ट्स — अ डेन्जरस भोल्टेज, इन्सुलेसन ब्रेकडाउन, ओभरहिटिङ, एन्ड रेसिड्युअल म्याग्नेटिज्म दयाट स्पोइल्स एक्युरेसी। देयरफोर सर्ट द सेकेन्डरी बिफोर रिमुभिङ द मिटर।',
      ask: {
        q: 'CT secondary open huda core ko flux kina dherai badhcha?',
        voice: 'सी टी सेकेन्डरी ओपन हुँदा कोरको फ्लक्स किन धेरै बढ्छ?',
        options: ['Counter MMF hudaina', 'Primary current ghatcha', 'Frequency badhcha'],
        answer: 0,
        why: 'N2I2 = 0: primary ko pura MMF magnetising bancha.',
      },
    },
  ],
});


/* ── Fig. 2.6: core type and shell type ──────────────────────────────── */
// 0 core type (windings on both limbs) · 1 shell type (windings on the centre limb) · 2 laminations
export const coreShellFigure = (s) => (
  <>
    <g className={s.on(0) + s.hl(0)}>
      <W d="M20 40 H160 V170 H20 Z" w={1.4} />
      <W d="M48 68 H132 V142 H48 Z" w={1.2} />
      {[60, 80, 100, 120, 140].map((y) => <g key={y}><W d={`M14 ${y} H54`} w={1} /><W d={`M126 ${y} H166`} w={1} /></g>)}
      <T x={90} y={190} i size={10}>(a) Core type: windings on both limbs</T>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M200 40 H340 V170 H200 Z" w={1.4} />
      <W d="M222 64 H256 V146 H222 Z" w={1.2} />
      <W d="M284 64 H318 V146 H284 Z" w={1.2} />
      {[70, 88, 106, 124, 142].map((y) => <W key={y} d={`M250 ${y} H290`} w={1} />)}
      <T x={270} y={190} i size={10}>(b) Shell type: windings on the centre limb</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <T x={180} y={212} size={9.5}>Core: laminated CRGO silicon steel, 0.35–0.5 mm sheets, insulated by varnish</T>
    </g>
    <Cap y={234}>Fig. 2.6  Core-type and shell-type transformers</Cap>
  </>
);

/* ── Fig. 2.7: three-phase transformer connections ─────────────────── */
// 0 star–star · 1 delta–delta · 2 star–delta · 3 delta–star
const Ysym = (cx, cy, r = 18) => [0, 120, 240].map((a) => { const t = ((a - 90) * Math.PI) / 180; return <W key={a} d={`M${cx} ${cy} L${cx + r * Math.cos(t)} ${cy + r * Math.sin(t)}`} w={1.3} />; });
const Dsym = (cx, cy, r = 20) => { const p = [0, 120, 240].map((a) => { const t = ((a - 90) * Math.PI) / 180; return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; }); return <W d={`M${p[0][0]} ${p[0][1]} L${p[1][0]} ${p[1][1]} L${p[2][0]} ${p[2][1]} Z`} w={1.3} />; };
const pair = (x, y, a, b, label) => (
  <g>
    {a === 'Y' ? Ysym(x, y) : Dsym(x, y)}
    <T x={x + 40} y={y + 4} size={11}>→</T>
    {b === 'Y' ? Ysym(x + 80, y) : Dsym(x + 80, y)}
    <T x={x + 40} y={y + 40} i size={9.5}>{label}</T>
  </g>
);
export const threePhaseFigure = (s) => (
  <>
    <g className={s.on(0) + s.hl(0)}>{pair(40, 50, 'Y', 'Y', '(a) Star–star')}</g>
    <g className={s.on(1) + s.hl(1)}>{pair(220, 50, 'D', 'D', '(b) Delta–delta')}</g>
    <g className={s.on(2) + s.hl(2)}>{pair(40, 150, 'Y', 'D', '(c) Star–delta')}</g>
    <g className={s.on(3) + s.hl(3)}>{pair(220, 150, 'D', 'Y', '(d) Delta–star')}</g>
    <Cap y={226}>Fig. 2.7  Three-phase transformer connections (primary → secondary)</Cap>
  </>
);

export const basicsCons21 = duo('2.1 · Basic understanding: what is a transformer made of?', {
  three: transformerTour([
    { shot: 'whole', show: BASE, labels: [['transformer', [0, 2.3, 0.6]]] },
    { shot: 'core', focus: ['core'], labels: [['patla pata', 'core']] },
    { shot: 'whole', focus: ['primary', 'secondary'], labels: [['LV, HV winding', 'primary']] },
    { shot: 'tank', show: [...BASE, 'tank', 'bushings'], focus: ['tank', 'bushings'], labels: [['tel ko tank', 'tank'], ['bushing', 'bushings']] },
    { shot: 'whole', show: [...BASE, 'tank', 'bushings'], focus: null },
  ]),
  tutor: [
    {
      say: 'Transformer ma bijuli ko tar jodiyeko hudaina; magnet ko bato le matra bijuli sarcha. Bahira bata herda yo dherai sajilo dekhincha.',
      voice: 'ट्रान्सफर्मरमा बिजुलीको तार जोडिएको हुँदैन, म्याग्नेटको बाटोले मात्र बिजुली सर्छ। बाहिरबाट हेर्दा यो धेरै सजिलो देखिन्छ।',
      lines: [['h', <>2.1 · Transformer ka bhag</>], part(<>Transformer</>, <>magnet ko bato le bijuli sarcha</>)],
    },
    {
      say: 'Bich ma patla patla falam ka pata jodeko core cha. Pata patlo bhayeko le taato kam huncha.',
      voice: 'बीचमा पातला पातला फलामका पाता जोडेको कोर छ। पाता पातलो भएकोले तातो कम हुन्छ।',
      lines: [part(<>Core</>, <>patla pata jodeko falam</>)],
    },
    {
      say: 'Core ma dui winding: kam voltage ko LV ra badhi voltage ko HV.',
      voice: 'कोरमा दुई वाइन्डिङ — कम भोल्टेजको एल भी, र बढी भोल्टेजको एच भी।',
      lines: [part(<>Windings</>, <>LV ra HV</>)],
    },
    {
      say: 'Thulo transformer tel ko tank ma rakhincha; tel le chiso banaucha. Bushing bata tar bahira niskincha.',
      voice: 'ठूलो ट्रान्सफर्मर तेलको ट्याङ्कमा राखिन्छ, तेलले चिसो बनाउँछ। बुसिङबाट तार बाहिर निस्किन्छ।',
      lines: [part(<>Tank ra bushing</>, <>tel le chiso, bushing bata tar</>)],
    },
    {
      say: 'Saransh: core, winding, tank ra bushing. Aajakal tel bina ko dry type ra kam loss ko core pani banchhan.',
      voice: 'सारांश — कोर, वाइन्डिङ, ट्याङ्क र बुसिङ। आजकल तेलबिनाको ड्राई टाइप, र कम लसको कोर पनि बन्छन्।',
      lines: [['idea', <>Core · windings · tank · bushings · naya: dry type, kam loss core</>]],
    },
  ],
  lecturer: [
    {
      say: 'Transformer static machine ho; yasma ghumne bhag hudaina.',
      voice: 'ट्रान्सफर्मर स्टाटिक मेसिन हो, यसमा घुम्ने भाग हुँदैन।',
      lines: [['h', <>2.1 · Constructional details</>], part(<>Static machine</>, <>no moving parts</>)],
    },
    {
      say: 'Core laminated silicon steel ko huncha, jasle eddy current loss ghataucha.',
      voice: 'कोर ल्यामिनेटेड सिलिकन स्टिलको हुन्छ, जसले एडी करेन्ट लस घटाउँछ।',
      lines: [part(<>Core</>, <>laminated silicon steel</>)],
    },
    {
      say: 'LV ra HV winding core ka limb ma rakhincha.',
      voice: 'एल भी र एच भी वाइन्डिङ कोरका लिम्बमा राखिन्छ।',
      lines: [part(<>Windings</>, <>LV and HV on the limbs</>)],
    },
    {
      say: 'Tank, transformer oil, conservator ra bushing le cooling ra insulation dinchan.',
      voice: 'ट्याङ्क, ट्रान्सफर्मर अयल, कन्जर्भेटर र बुसिङले कुलिङ र इन्सुलेसन दिन्छन्।',
      lines: [part(<>Tank and accessories</>, <>cooling and insulation</>)],
    },
    {
      say: 'Saransh: core, winding ra accessories; recent trend ma amorphous core ra dry type transformer.',
      voice: 'सारांश — कोर, वाइन्डिङ र एक्सेसरिज। रिसेन्ट ट्रेन्डमा एमोर्फस कोर र ड्राई टाइप ट्रान्सफर्मर।',
      lines: [['idea', <>Core · windings · accessories · trends: amorphous core, dry type</>]],
    },
  ],
});

export const basicsIdeal23 = duo('2.3 · Basic understanding: what would a perfect transformer do?', {
  three: transformerTour([
    { shot: 'source', show: FED, flow: 0.6, flux: 1, focus: ['primary', 'core'], labels: [['kunai loss chaina', 'core']] },
    { shot: 'whole', show: LOADED, flux: 1, flow2: 1, focus: ['primary', 'secondary'], labels: [['turns ko anupat', 'secondary']] },
    { focus: ['secondary', 'lamp'], labels: [['voltage turns anusar', 'lamp']] },
    { focus: ['primary', 'source'], labels: [['current ulto anupat', 'source']] },
    { shot: 'whole', focus: null },
  ]),
  tutor: [
    {
      say: 'Ideal transformer bhaneko kunai pani loss nabhayeko kalpanik transformer: tar ko resistance zero, sabai flux dubai coil ma.',
      voice: 'आइडियल ट्रान्सफर्मर भनेको कुनै पनि लस नभएको काल्पनिक ट्रान्सफर्मर — तारको रेजिस्टेन्स जिरो, सबै फ्लक्स दुवै कोइलमा।',
      lines: [['h', <>2.3 · Perfect transformer</>], part(<>Ideal</>, <>loss zero, sabai flux dubai coil ma</>)],
    },
    {
      say: 'Yasma voltage turns ko anupat ma badalcha.',
      voice: 'यसमा भोल्टेज टर्न्सको अनुपातमा बदलिन्छ।',
      lines: [chain(<>Badhi turns → badhi voltage</>)],
    },
    {
      say: 'Secondary ma dui guna turns bhaye voltage pani dui guna.',
      voice: 'सेकेन्डरीमा दुई गुणा टर्न्स भए भोल्टेज पनि दुई गुणा।',
      lines: [chain(<>Dui guna turns → dui guna voltage</>)],
    },
    {
      say: 'Tara current ulto anupat ma: voltage dui guna bhaye current aadha, kinaki power ustai.',
      voice: 'तर करेन्ट उल्टो अनुपातमा — भोल्टेज दुई गुणा भए करेन्ट आधा, किनकि पावर उस्तै।',
      lines: [chain(<>Voltage dui guna → current aadha (power ustai)</>)],
    },
    {
      say: 'Saransh: voltage turns anusar, current ulto, power bhitra ra bahira barabar.',
      voice: 'सारांश — भोल्टेज टर्न्स अनुसार, करेन्ट उल्टो, पावर भित्र र बाहिर बराबर।',
      lines: [['idea', <>Voltage turns anusar · current ulto · power barabar</>]],
    },
  ],
  lecturer: [
    {
      say: 'Ideal transformer ma winding resistance, leakage flux ra core loss zero maanincha.',
      voice: 'आइडियल ट्रान्सफर्मरमा वाइन्डिङ रेजिस्टेन्स, लिकेज फ्लक्स र कोर लस जिरो मानिन्छ।',
      lines: [['h', <>2.3 · Ideal transformer</>], part(<>Ideal transformer</>, <>no resistance, leakage or core loss</>)],
    },
    {
      say: 'Voltage turns ratio ma badalcha.',
      voice: 'भोल्टेज टर्न्स रेसियोमा बदलिन्छ।',
      lines: [chain(<>Voltage ratio equals turns ratio</>)],
    },
    {
      say: 'Step-up ma secondary turns badhi.',
      voice: 'स्टेप अपमा सेकेन्डरी टर्न्स बढी।',
      lines: [chain(<>More secondary turns → step-up</>)],
    },
    {
      say: 'Current turns ratio ko ulto ma badalcha, kinaki input ra output power barabar.',
      voice: 'करेन्ट टर्न्स रेसियोको उल्टोमा बदलिन्छ, किनकि इनपुट र आउटपुट पावर बराबर।',
      lines: [chain(<>Current in the inverse ratio; input power equals output</>)],
    },
    {
      say: 'Saransh: ideal transformer le power badaldaina, voltage ra current matra.',
      voice: 'सारांश — आइडियल ट्रान्सफर्मरले पावर बदल्दैन, भोल्टेज र करेन्ट मात्र।',
      lines: [['idea', <>Changes voltage and current, not power</>]],
    },
  ],
});

export const basicsLoad25 = duo('2.5 · Basic understanding: how does the primary know a load is connected?', {
  three: transformerTour([
    { shot: 'load', show: LOADED, flux: 1, flow2: 0.4, focus: ['lamp'], labels: [['bulb: resistive', 'lamp']] },
    { flow2: 1, focus: ['secondary'], labels: [['load current', 'secondary']] },
    { flux: 1, flow: 1, focus: ['primary', 'source'], labels: [['primary badhi lincha', 'primary']] },
    { flux: 1, focus: ['core'], labels: [['flux ustai', 'flux']] },
    { shot: 'whole', focus: null },
  ]),
  tutor: [
    {
      say: 'Secondary ma bulb jodyau. Bulb resistive load ho.',
      voice: 'सेकेन्डरीमा बल्ब जोडौं। बल्ब रेजिस्टिभ लोड हो।',
      lines: [['h', <>2.5 · Load lagauda primary lai kasari thaha huncha?</>], part(<>Load</>, <>secondary ma bulb</>)],
    },
    {
      say: 'Secondary ma current bagcha, ra yasle core ma ulto magnet banaucha.',
      voice: 'सेकेन्डरीमा करेन्ट बग्छ, र यसले कोरमा उल्टो म्याग्नेट बनाउँछ।',
      lines: [chain(<>Secondary current → ulto magnet</>)],
    },
    {
      say: 'Tyo ulto magnet mettauna primary le supply bata badhi current tancha.',
      voice: 'त्यो उल्टो म्याग्नेट मेटाउन प्राइमरीले सप्लाईबाट बढी करेन्ट तान्छ।',
      lines: [chain(<>Primary le badhi current tancha</>)],
    },
    {
      say: 'Yasari core ko flux lagbhag ustai rahancha, load jati bhaye pani.',
      voice: 'यसरी कोरको फ्लक्स लगभग उस्तै रहन्छ, लोड जति भए पनि।',
      lines: [chain(<>Flux ustai</>)],
    },
    {
      say: 'Saransh: load ko current le primary lai sanket dincha, ra primary aafai badhi lincha.',
      voice: 'सारांश — लोडको करेन्टले प्राइमरीलाई सङ्केत दिन्छ, र प्राइमरी आफैं बढी लिन्छ।',
      lines: [['idea', <>Load current → primary aafai badhi current</>]],
    },
  ],
  lecturer: [
    {
      say: 'Secondary ma load jodda I 2 bagcha.',
      voice: 'सेकेन्डरीमा लोड जोड्दा आई टु बग्छ।',
      lines: [['h', <>2.5 · Transformer on load</>], part(<>Load</>, <>secondary current flows</>)],
    },
    {
      say: 'I 2 ko MMF le main flux lai oppose garcha.',
      voice: 'आई टुको एम एम एफले मेन फ्लक्सलाई अपोज गर्छ।',
      lines: [chain(<>Secondary MMF opposes the main flux</>)],
    },
    {
      say: 'Primary le counter-balancing current I 2 dash linchha.',
      voice: 'प्राइमरीले काउन्टर ब्यालेन्सिङ करेन्ट आई टु ड्यास लिन्छ।',
      lines: [chain(<>Primary draws a balancing current</>)],
    },
    {
      say: 'Phalswarup flux lagbhag constant rahancha.',
      voice: 'फलस्वरूप फ्लक्स लगभग कन्स्टेन्ट रहन्छ।',
      lines: [chain(<>Main flux stays nearly constant</>)],
    },
    {
      say: 'Saransh: load anusar primary current aafai milcha; phasor diagram load ko pf anusar badalcha.',
      voice: 'सारांश — लोड अनुसार प्राइमरी करेन्ट आफैं मिल्छ, फेजर डायाग्राम लोडको पी एफ अनुसार बदलिन्छ।',
      lines: [['idea', <>Primary current follows the load; phasors depend on load pf</>]],
    },
  ],
});

export const basicsEq26 = duo('2.6 · Basic understanding: how can a whole transformer fit in one small circuit?', {
  three: transformerTour([
    { shot: 'whole', show: LOADED, flux: 0.9, flow2: 0.8, focus: ['primary'], labels: [['tar ko resistance', 'primary']] },
    { leak: 1, focus: ['primary', 'secondary'], labels: [['leakage flux', 'secondary']] },
    { leak: 0, flux: 1, focus: ['core'], labels: [['magnetising current', 'core']] },
    { focus: ['primary', 'secondary', 'core'], labels: [['euta sano circuit', [0, 2.3, 0.6]]] },
    { shot: 'whole', focus: null },
  ]),
  tutor: [
    {
      say: 'Real transformer ko tar ma resistance huncha, ra tyo heat banaucha.',
      voice: 'रियल ट्रान्सफर्मरको तारमा रेजिस्टेन्स हुन्छ, र त्यो हिट बनाउँछ।',
      lines: [['h', <>2.6 · Transformer lai sano circuit ma</>], part(<>Resistance</>, <>tar ma heat</>)],
    },
    {
      say: 'Kehi flux core bata bahira chuhuncha: leakage flux. Yasle reactance jasto kaam garcha.',
      voice: 'केही फ्लक्स कोरबाट बाहिर चुहिन्छ — लिकेज फ्लक्स। यसले रियाक्टेन्स जस्तो काम गर्छ।',
      lines: [part(<>Leakage</>, <>chuheko flux, reactance</>)],
    },
    {
      say: 'Core ma magnet banauna ra core loss ko lagi pani sano current chahincha.',
      voice: 'कोरमा म्याग्नेट बनाउन, र कोर लसको लागि पनि सानो करेन्ट चाहिन्छ।',
      lines: [part(<>Core branch</>, <>magnet ra core loss ko current</>)],
    },
    {
      say: 'Yi sabai lai resistor ra inductor ko sano circuit ma rakhna milcha: equivalent circuit.',
      voice: 'यी सबैलाई रेजिस्टर र इन्डक्टरको सानो सर्किटमा राख्न मिल्छ — इक्विभ्यालेन्ट सर्किट।',
      lines: [chain(<>Sabai → euta sano circuit</>)],
    },
    {
      say: 'Saransh: equivalent circuit le pura transformer lai gannu sajilo banaucha.',
      voice: 'सारांश — इक्विभ्यालेन्ट सर्किटले पूरा ट्रान्सफर्मरलाई गन्न सजिलो बनाउँछ।',
      lines: [['idea', <>Equivalent circuit → hisab sajilo</>]],
    },
  ],
  lecturer: [
    {
      say: 'Winding resistance R 1 ra R 2 copper loss dinchan.',
      voice: 'वाइन्डिङ रेजिस्टेन्स आर वान र आर टु कपर लस दिन्छन्।',
      lines: [['h', <>2.6 · Equivalent circuit</>], part(<>R<sub>1</sub>, R<sub>2</sub></>, <>winding resistances</>)],
    },
    {
      say: 'Leakage flux leakage reactance X 1 ra X 2 le janaincha.',
      voice: 'लिकेज फ्लक्स, लिकेज रियाक्टेन्स एक्स वान र एक्स टुले जनाइन्छ।',
      lines: [part(<>X<sub>1</sub>, X<sub>2</sub></>, <>leakage reactances</>)],
    },
    {
      say: 'No-load current ko lagi shunt branch R 0 ra X 0.',
      voice: 'नो लोड करेन्टको लागि सन्ट ब्रान्च आर जिरो र एक्स जिरो।',
      lines: [part(<>R<sub>0</sub> ∥ X<sub>0</sub></>, <>core loss and magnetising branch</>)],
    },
    {
      say: 'Sabai parameter lai eutai side ma refer garera equivalent circuit banaincha.',
      voice: 'सबै प्यारामिटरलाई एउटै साइडमा रेफर गरेर इक्विभ्यालेन्ट सर्किट बनाइन्छ।',
      lines: [chain(<>Refer all to one side → equivalent circuit</>)],
    },
    {
      say: 'Saransh: equivalent circuit ra phasor diagram le transformer ko performance dekhauchan.',
      voice: 'सारांश — इक्विभ्यालेन्ट सर्किट र फेजर डायाग्रामले ट्रान्सफर्मरको पर्फर्मेन्स देखाउँछन्।',
      lines: [['idea', <>Equivalent circuit + phasor diagram → performance</>]],
    },
  ],
});

export const basicsTests27 = duo('2.7 · Basic understanding: how do we test a big transformer without loading it?', {
  three: transformerTour([
    { shot: 'source', show: FED, flow: 0.3, flux: 1, focus: ['primary', 'source'], labels: [['OC: secondary khulla', 'secondary']] },
    { focus: ['core'], labels: [['core loss napcha', 'core']] },
    { shot: 'load', show: LOADED, flux: 0.2, flow2: 1, focus: ['secondary'], labels: [['SC: secondary short', 'secondary']] },
    { focus: ['primary', 'secondary'], labels: [['copper loss napcha', 'primary']] },
    { shot: 'whole', focus: null },
  ]),
  tutor: [
    {
      say: 'Open circuit test ma secondary khulla rakhera LV side ma pura voltage dincha.',
      voice: 'ओपन सर्किट टेस्टमा सेकेन्डरी खुल्ला राखेर एल भी साइडमा पूरा भोल्टेज दिन्छ।',
      lines: [['h', <>2.7 · Load bina test</>], part(<>OC test</>, <>secondary khulla, pura voltage</>)],
    },
    {
      say: 'Current dherai thorai, tesaile wattmeter le core ko loss matra napcha.',
      voice: 'करेन्ट धेरै थोरै, त्यसैले वाटमिटरले कोरको लस मात्र नाप्छ।',
      lines: [chain(<>Thorai current → core loss matra</>)],
    },
    {
      say: 'Short circuit test ma secondary short garera sano voltage dincha, jun rated current bagauna pugcha.',
      voice: 'सर्ट सर्किट टेस्टमा सेकेन्डरी सर्ट गरेर सानो भोल्टेज दिन्छ, जुन रेटेड करेन्ट बगाउन पुग्छ।',
      lines: [part(<>SC test</>, <>secondary short, sano voltage</>)],
    },
    {
      say: 'Voltage sano bhayeko le core loss nagannya; wattmeter le copper loss napcha.',
      voice: 'भोल्टेज सानो भएकोले कोर लस नगन्य, वाटमिटरले कपर लस नाप्छ।',
      lines: [chain(<>Sano voltage → copper loss matra</>)],
    },
    {
      say: 'Saransh: OC le core loss ra shunt branch, SC le copper loss ra series parameter. Polarity test le terminal ko chinha milaucha.',
      voice: 'सारांश — ओ सीले कोर लस र सन्ट ब्रान्च, एस सीले कपर लस र सिरिज प्यारामिटर। पोलारिटी टेस्टले टर्मिनलको चिन्ह मिलाउँछ।',
      lines: [['idea', <>OC: core loss · SC: copper loss · polarity: terminal marks</>]],
    },
  ],
  lecturer: [
    {
      say: 'OC test LV side ma rated voltage dida HV side khulla rakhincha.',
      voice: 'ओ सी टेस्ट एल भी साइडमा रेटेड भोल्टेज दिँदा, एच भी साइड खुल्ला राखिन्छ।',
      lines: [['h', <>2.7 · Transformer tests</>], part(<>OC test</>, <>rated voltage on LV, HV open</>)],
    },
    {
      say: 'Wattmeter reading core loss barabar huncha.',
      voice: 'वाटमिटर रिडिङ कोर लस बराबर हुन्छ।',
      lines: [chain(<>Wattmeter reads the core loss</>)],
    },
    {
      say: 'SC test HV side ma reduced voltage dida LV short garincha.',
      voice: 'एस सी टेस्ट एच भी साइडमा रिड्युस्ड भोल्टेज दिँदा, एल भी सर्ट गरिन्छ।',
      lines: [part(<>SC test</>, <>reduced voltage, rated current</>)],
    },
    {
      say: 'Wattmeter reading full-load copper loss huncha.',
      voice: 'वाटमिटर रिडिङ फुल लोड कपर लस हुन्छ।',
      lines: [chain(<>Wattmeter reads the copper loss</>)],
    },
    {
      say: 'Saransh: OC ra SC test bata equivalent circuit parameter nikalincha; polarity test le relative polarity.',
      voice: 'सारांश — ओ सी र एस सी टेस्टबाट इक्विभ्यालेन्ट सर्किट प्यारामिटर निकालिन्छ, पोलारिटी टेस्टले रिलेटिभ पोलारिटी।',
      lines: [['idea', <>OC + SC → parameters · polarity test → terminal marking</>]],
    },
  ],
});

export const basicsReg28 = duo('2.8 · Basic understanding: why does the voltage drop when the load comes on?', {
  three: transformerTour([
    { shot: 'load', show: LOADED, flux: 1, flow2: 0.2, focus: ['lamp'], labels: [['no load', 'lamp']] },
    { flow2: 1, focus: ['lamp', 'secondary'], labels: [['full load', 'lamp']] },
    { leak: 1, focus: ['secondary'], labels: [['bhitra ko drop', 'secondary']] },
    { leak: 0, focus: ['lamp'], labels: [['sano regulation: ramro', 'lamp']] },
    { shot: 'whole', focus: null },
  ]),
  tutor: [
    {
      say: 'Load nabhaye secondary ko voltage sabai bhanda badhi huncha.',
      voice: 'लोड नभए सेकेन्डरीको भोल्टेज सबैभन्दा बढी हुन्छ।',
      lines: [['h', <>2.8 · Load ma voltage kina jharcha?</>], part(<>No load</>, <>voltage sabai bhanda badhi</>)],
    },
    {
      say: 'Pura load jodda voltage alik jharcha.',
      voice: 'पूरा लोड जोड्दा भोल्टेज अलि झर्छ।',
      lines: [chain(<>Full load → voltage alik jharyo</>)],
    },
    {
      say: 'Kina? Bhitra ko tar ko resistance ra chuheko flux ma drop huncha.',
      voice: 'किन? भित्रको तारको रेजिस्टेन्स र चुहिएको फ्लक्समा ड्रप हुन्छ।',
      lines: [chain(<>Resistance + leakage → bhitra drop</>)],
    },
    {
      say: 'Kati jharyo bhanne kura percent ma: voltage regulation. Sano bhaye ramro transformer.',
      voice: 'कति झर्‍यो भन्ने कुरा प्रतिशतमा — भोल्टेज रेगुलेसन। सानो भए राम्रो ट्रान्सफर्मर।',
      lines: [part(<>Regulation</>, <>kati jharyo, percent ma</>)],
    },
    {
      say: 'Saransh: lagging load ma badhi jharcha, leading ma voltage badhna pani sakcha.',
      voice: 'सारांश — ल्यागिङ लोडमा बढी झर्छ, लिडिङमा भोल्टेज बढ्न पनि सक्छ।',
      lines: [['idea', <>Lagging: badhi jharcha · leading: badhna sakcha</>]],
    },
  ],
  lecturer: [
    {
      say: 'No load ma secondary terminal voltage E 2 huncha.',
      voice: 'नो लोडमा सेकेन्डरी टर्मिनल भोल्टेज ई टु हुन्छ।',
      lines: [['h', <>2.8 · Voltage regulation</>], part(<>No load</>, <>terminal voltage equals E<sub>2</sub></>)],
    },
    {
      say: 'Full load ma terminal voltage V 2 ma jharcha.',
      voice: 'फुल लोडमा टर्मिनल भोल्टेज भी टुमा झर्छ।',
      lines: [chain(<>Full load → V<sub>2</sub> falls</>)],
    },
    {
      say: 'Yo drop equivalent resistance ra reactance ma huncha.',
      voice: 'यो ड्रप इक्विभ्यालेन्ट रेजिस्टेन्स र रियाक्टेन्समा हुन्छ।',
      lines: [chain(<>Drop in R<sub>02</sub> and X<sub>02</sub></>)],
    },
    {
      say: 'Voltage regulation equals E 2 minus V 2 over V 2, percent ma.',
      voice: 'भोल्टेज रेगुलेसन इक्वल्स ई टु माइनस भी टु ओभर भी टु, प्रतिशतमा।',
      lines: [part(<>Regulation</>, <>(E<sub>2</sub> − V<sub>2</sub>)/V<sub>2</sub> × 100 %</>)],
    },
    {
      say: 'Saransh: lagging pf ma regulation positive ra thulo, leading ma negative huna sakcha.',
      voice: 'सारांश — ल्यागिङ पी एफमा रेगुलेसन पोजिटिभ र ठूलो, लिडिङमा नेगेटिभ हुन सक्छ।',
      lines: [['idea', <>Lagging: positive, larger · leading: may be negative</>]],
    },
  ],
});

export const basicsInst211 = duo('2.11 · Basic understanding: how do we measure thousands of volts safely?', {
  three: transformerTour([
    { shot: 'whole', show: LOADED, flux: 0.8, flow2: 0.6, focus: ['primary'], labels: [['thulo V, I', 'primary']] },
    { focus: ['secondary', 'lamp'], labels: [['sano, surakshit meter', 'lamp']] },
    { flow2: 1, focus: ['secondary'], labels: [['CT: current ghataucha', 'secondary']] },
    { flow2: 0.3, focus: ['secondary'], labels: [['PT: voltage ghataucha', 'secondary']] },
    { shot: 'whole', focus: null },
  ]),
  tutor: [
    {
      say: 'Power line ma hajarau volt ra sayau ampere huncha; sidhai meter jodna khatara.',
      voice: 'पावर लाइनमा हजारौं भोल्ट र सयौं एम्पियर हुन्छ, सिधै मिटर जोड्न खतरा।',
      lines: [['h', <>2.11 · Thulo voltage surakshit napne</>], part(<>Power line</>, <>thulo voltage ra current</>)],
    },
    {
      say: 'Instrument transformer le yasko sano, surakshit copy meter lai dincha.',
      voice: 'इन्स्ट्रुमेन्ट ट्रान्सफर्मरले यसको सानो, सुरक्षित कपी मिटरलाई दिन्छ।',
      lines: [part(<>Instrument transformer</>, <>sano, surakshit copy</>)],
    },
    {
      say: 'CT le current ghataucha, jastai sau ampere bata panch ampere.',
      voice: 'सी टीले करेन्ट घटाउँछ, जस्तै सय एम्पियरबाट पाँच एम्पियर।',
      lines: [part(<>CT</>, <>current ghataucha</>)],
    },
    {
      say: 'PT le voltage ghataucha, jastai egara hajar bata ek sau das volt.',
      voice: 'पी टीले भोल्टेज घटाउँछ, जस्तै एघार हजारबाट एक सय दस भोल्ट।',
      lines: [part(<>PT</>, <>voltage ghataucha</>)],
    },
    {
      say: 'Saransh: CT ko secondary kahile pani khulla chhodnu hudaina; PT ko secondary short garnu hudaina.',
      voice: 'सारांश — सी टीको सेकेन्डरी कहिल्यै पनि खुल्ला छोड्नु हुँदैन, पी टीको सेकेन्डरी सर्ट गर्नु हुँदैन।',
      lines: [['idea', <>CT: open nagarne · PT: short nagarne</>]],
    },
  ],
  lecturer: [
    {
      say: 'High voltage ra current sidhai napna surakshit ra sambhav hudaina.',
      voice: 'हाई भोल्टेज र करेन्ट सिधै नाप्न सुरक्षित र सम्भव हुँदैन।',
      lines: [['h', <>2.11 · Instrument transformers</>], part(<>Need</>, <>safe measurement of high V and I</>)],
    },
    {
      say: 'Instrument transformer le standard sano value dincha ra meter lai isolate garcha.',
      voice: 'इन्स्ट्रुमेन्ट ट्रान्सफर्मरले स्ट्यान्डर्ड सानो भ्यालु दिन्छ, र मिटरलाई आइसोलेट गर्छ।',
      lines: [part(<>Instrument transformer</>, <>standard low values, isolation</>)],
    },
    {
      say: 'CT series ma jodincha ra 5 wa 1 ampere secondary dincha.',
      voice: 'सी टी सिरिजमा जोडिन्छ, र पाँच वा एक एम्पियर सेकेन्डरी दिन्छ।',
      lines: [part(<>CT</>, <>series, 5 A or 1 A secondary</>)],
    },
    {
      say: 'PT parallel ma jodincha ra 110 volt secondary dincha.',
      voice: 'पी टी प्याराललमा जोडिन्छ, र एक सय दस भोल्ट सेकेन्डरी दिन्छ।',
      lines: [part(<>PT</>, <>parallel, 110 V secondary</>)],
    },
    {
      say: 'Saransh: CT secondary open garda dherai thulo voltage induce huncha.',
      voice: 'सारांश — सी टी सेकेन्डरी ओपन गर्दा धेरै ठूलो भोल्टेज इन्ड्युस हुन्छ।',
      lines: [['idea', <>CT never open-circuited · PT never short-circuited</>]],
    },
  ],
});

export const basicsThree213 = duo('2.13 · Basic understanding: how does a transformer handle three phases?', {
  three: transformerTour([
    { shot: 'whole', show: LOADED, flux: 1, flow2: 0.8, focus: ['primary', 'secondary'], labels: [['tin jodi coil', [0, 2.3, 0.6]]] },
    { focus: ['primary'], labels: [['star: euta bindu', 'primary']] },
    { focus: ['secondary'], labels: [['delta: triangle', 'secondary']] },
    { focus: ['primary', 'secondary'], labels: [['jodne tarika', 'secondary']] },
    { shot: 'whole', focus: null },
  ]),
  tutor: [
    {
      say: 'Tin phase supply ma tin jodi coil chahincha: tin primary ra tin secondary.',
      voice: 'तीन फेज सप्लाईमा तीन जोडी कोइल चाहिन्छ — तीन प्राइमरी र तीन सेकेन्डरी।',
      lines: [['h', <>2.13 · Tin phase ko transformer</>], part(<>Three phase</>, <>tin jodi coil</>)],
    },
    {
      say: 'Coil ka euta chheu euta bindu ma jodda star banchha.',
      voice: 'कोइलका एउटा छेउ एउटा बिन्दुमा जोड्दा स्टार बन्छ।',
      lines: [part(<>Star</>, <>euta bindu ma jodeko</>)],
    },
    {
      say: 'Coil lai triangle ma jodda delta banchha.',
      voice: 'कोइललाई ट्राइएङ्गलमा जोड्दा डेल्टा बन्छ।',
      lines: [part(<>Delta</>, <>triangle ma jodeko</>)],
    },
    {
      say: 'Primary ra secondary ko jodne tarika anusar char prakar: star-star, delta-delta, star-delta ra delta-star.',
      voice: 'प्राइमरी र सेकेन्डरीको जोड्ने तरिका अनुसार चार प्रकार — स्टार स्टार, डेल्टा डेल्टा, स्टार डेल्टा, र डेल्टा स्टार।',
      lines: [chain(<>Star-star · delta-delta · star-delta · delta-star</>)],
    },
    {
      say: 'Saransh: power station ma voltage badhauna delta-star, distribution ma ghar samma delta-star pani.',
      voice: 'सारांश — पावर स्टेसनमा भोल्टेज बढाउन डेल्टा स्टार, डिस्ट्रिब्युसनमा घरसम्म पनि डेल्टा स्टार।',
      lines: [['idea', <>Jodne tarika anusar kaam</>]],
    },
  ],
  lecturer: [
    {
      say: 'Three-phase transformer ma tin phase ka winding hunchan.',
      voice: 'थ्री फेज ट्रान्सफर्मरमा तीन फेजका वाइन्डिङ हुन्छन्।',
      lines: [['h', <>2.13 · Three-phase transformers</>], part(<>Three-phase</>, <>three windings each side</>)],
    },
    {
      say: 'Star connection ma phase voltage line voltage ko one over root three.',
      voice: 'स्टार कनेक्सनमा फेज भोल्टेज, लाइन भोल्टेजको वान ओभर रुट थ्री।',
      lines: [part(<>Star</>, <>phase voltage is line voltage ÷ √3</>)],
    },
    {
      say: 'Delta connection ma phase voltage line voltage barabar.',
      voice: 'डेल्टा कनेक्सनमा फेज भोल्टेज लाइन भोल्टेज बराबर।',
      lines: [part(<>Delta</>, <>phase voltage equals line voltage</>)],
    },
    {
      say: 'Char standard connection: Y-Y, delta-delta, Y-delta ra delta-Y.',
      voice: 'चार स्ट्यान्डर्ड कनेक्सन — वाई वाई, डेल्टा डेल्टा, वाई डेल्टा, र डेल्टा वाई।',
      lines: [chain(<>Y–Y · Δ–Δ · Y–Δ · Δ–Y</>)],
    },
    {
      say: 'Saransh: connection ko chhanot voltage level ra application anusar.',
      voice: 'सारांश — कनेक्सनको छनोट भोल्टेज लेभल र एप्लिकेसन अनुसार।',
      lines: [['idea', <>Choice depends on voltage level and use</>]],
    },
  ],
});

/* ── 2.1 Syllabus Content: constructional details and recent trends ─── */
// Canvas plan: heading · Remember (static machine, mutual induction) · left:
// core type, shell type, why laminated, windings, why LV inside · page turn
// (carry (a), (b), laminations) · accessories, trends · recap. Right:
// Fig. 2.6 (0 core type · 1 shell type · 2 lamination note).
export const cons21 = duo('Constructional details and recent trends', {
  draw: figAt(coreShellFigure, { 0: 1, 1: 2, 2: 3 }),
  viewBox: '0 0 360 240',
  tutor: [
    {
      say: 'Construction suru garnu aghi duita kura yaad garau. Transformer static machine ho, yasma kunai rotating part chaina. Yo mutual induction le kaam garcha, ra main parts core ra windings hun.',
      voice: 'कन्स्ट्रक्सन सुरु गर्नुअघि दुईटा कुरा याद गरौं। ट्रान्सफर्मर स्टाटिक मेसिन हो, यसमा कुनै रोटेटिङ पार्ट छैन। यो म्युचुअल इन्डक्सनले काम गर्छ, र मेन पार्ट्स कोर र वाइन्डिङ्स हुन्।',
      lines: [['h', <>Constructional details and recent trends</>], rem(<>Static machine: no rotating part</>, <>Works by mutual induction; main parts: core and windings</>)],
    },
    {
      say: 'Figure a, core type: rectangular core ko dui limb hunchan, ra winding dubai limb ma rakhincha. Core type ma windings le core lai surround garchan.',
      voice: 'फिगर ए, कोर टाइप — रेक्ट्याङ्गुलर कोरको दुई लिम्ब हुन्छन्, र वाइन्डिङ दुवै लिम्बमा राखिन्छ। कोर टाइपमा वाइन्डिङ्सले कोरलाई सराउन्ड गर्छन्।',
      lines: [['step', <>(a) <b>Core type:</b> two limbs, windings on both limbs; the windings surround the core</>, undefined, { carry: <>(a) Core type: windings on both limbs</> }]],
    },
    {
      say: 'Figure b, shell type: core ko tin limb hunchan, ra dubai winding centre limb mai huncha. Core le winding lai dubai side bata surround garcha, ra flux dui side limb ma split huncha.',
      voice: 'फिगर बी, सेल टाइप — कोरको तीन लिम्ब हुन्छन्, र दुवै वाइन्डिङ सेन्टर लिम्बमै हुन्छ। कोरले वाइन्डिङलाई दुवै साइडबाट सराउन्ड गर्छ, र फ्लक्स दुई साइड लिम्बमा स्प्लिट हुन्छ।',
      lines: [['step', <>(b) <b>Shell type:</b> three limbs, both windings on the centre limb; the core surrounds the windings and the flux splits into two paths</>, undefined, { carry: <>(b) Shell type: windings on the centre limb</> }]],
    },
    {
      say: 'Core kina laminated? Solid iron core ma alternating flux le eddy current circulate garcha ra core heat up huncha. Thin, varnished silicon-steel sheets le eddy current ko path cut garchan.',
      voice: 'कोर किन ल्यामिनेटेड? सोलिड आइरन कोरमा अल्टरनेटिङ फ्लक्सले एडी करेन्ट सर्कुलेट गर्छ, र कोर हिट अप हुन्छ। थिन, भार्निस्ड सिलिकन स्टिल सिट्सले एडी करेन्टको पाथ कट गर्छन्।',
      lines: [br('Why a laminated silicon-steel core?', <Pts items={[<>Solid core: eddy currents circulate → heat</>, <>0.35–0.5 mm sheets, insulated by varnish</>, <>Eddy loss ∝ (thickness)²: thin sheets cut it sharply</>, <>Silicon steel: low hysteresis loss</>]} />, undefined)],
      ask: {
        q: 'Transformer ko core thin laminations ma kina banaincha?',
        voice: 'ट्रान्सफर्मरको कोर थिन ल्यामिनेसन्समा किन बनाइन्छ?',
        options: ['Eddy current loss kam garna', 'Copper loss kam garna', 'Flux zero garna'],
        answer: 0,
        why: 'Eddy loss thickness ko square sanga proportional; thin, insulated sheets le eddy current ko path cut garchan.',
      },
    },
    {
      page: true,
      say: 'Windings insulated copper ka hunchan. LV winding core ko najik, ra HV winding tyasko bahira concentric rakhincha.',
      voice: 'वाइन्डिङ्स इन्सुलेटेड कपरका हुन्छन्। एल भी वाइन्डिङ कोरको नजिक, र एच भी वाइन्डिङ त्यसको बाहिर कन्सेन्ट्रिक राखिन्छ।',
      lines: [['step', <><b>Windings:</b> insulated copper; LV next to the core, HV outside it (concentric)</>, undefined, { carry: <>Laminated core · LV inside, HV outside</> }]],
    },
    {
      say: 'LV winding core ko najik kina? Core earth potential ma huncha. LV lai core sanga kam insulation chahincha, ra HV bahira bhaye insulate garna ra tap linu easy huncha.',
      voice: 'एल भी वाइन्डिङ कोरको नजिक किन? कोर अर्थ पोटेन्सियलमा हुन्छ। एल भीलाई कोरसँग कम इन्सुलेसन चाहिन्छ, र एच भी बाहिर भए इन्सुलेट गर्न र ट्याप लिन इजी हुन्छ।',
      lines: [br('Why is LV placed next to the core?', <Pts items={[<>The core is at earth potential</>, <>LV needs less insulation from the core</>, <>HV outside: easier to insulate and to tap</>]} />)],
    },
    {
      say: 'Large transformer ko core ra winding oil bhariyeko tank ma huncha. Oil le cooling ra insulation dincha. Conservator le oil expansion ko space dincha, breather le moisture absorb garcha, ra bushings bata leads bahira niklanchan.',
      voice: 'लार्ज ट्रान्सफर्मरको कोर र वाइन्डिङ आयल भरिएको ट्याङ्कमा हुन्छ। आयलले कुलिङ र इन्सुलेसन दिन्छ। कन्जर्भेटरले आयल एक्सपान्सनको स्पेस दिन्छ, ब्रिदरले मोइस्चर एब्जर्ब गर्छ, र बुसिङ्सबाट लिड्स बाहिर निक्लन्छन्।',
      lines: [['step', <><H>Accessories</H><Pts items={[<>Tank + transformer oil: cooling and insulation</>, <>Conservator: room for oil expansion</>, <>Breather (silica gel): absorbs moisture</>, <>Bushings: bring the leads out; Buchholz relay: internal-fault alarm</>]} /></>]],
    },
    {
      say: 'Recent trends: CRGO steel ra amorphous metal ko core le core loss dherai kam garcha. Cast-resin dry-type transformer ma oil chaina, tesaile building bhitra safe. Online monitoring le temperature ra oil ko health track garcha.',
      voice: 'रिसेन्ट ट्रेन्ड्स — सी आर जी ओ स्टिल र एमोर्फस मेटलको कोरले कोर लस धेरै कम गर्छ। कास्ट रेजिन ड्राई टाइप ट्रान्सफर्मरमा आयल छैन, त्यसैले बिल्डिङभित्र सेफ। अनलाइन मनिटरिङले टेम्परेचर र आयलको हेल्थ ट्र्याक गर्छ।',
      lines: [['step', <><H>Recent trends</H><Pts items={[<>CRGO (cold-rolled grain-oriented) and amorphous cores: very low core loss</>, <>Cast-resin dry type: no oil, safe indoors</>, <>Online monitoring of temperature and oil</>]} /></>]],
      ask: {
        q: 'Amorphous metal ko core use garda kun loss kam huncha?',
        voice: 'एमोर्फस मेटलको कोर युज गर्दा कुन लस कम हुन्छ?',
        options: ['Core (iron) loss', 'Copper loss', 'Friction loss'],
        answer: 0,
        why: 'Amorphous metal ko hysteresis ra eddy loss dherai low huncha, tesaile core loss ghatcha; copper loss winding ko resistance ma bhar parcha.',
      },
    },
    {
      say: 'Recap: core type ma winding dubai limb ma, shell type ma centre limb ma. Core laminated silicon steel, LV bhitra HV bahira, tank-oil-conservator-breather-bushings, ra trends CRGO, amorphous, dry type.',
      voice: 'रिक्याप — कोर टाइपमा वाइन्डिङ दुवै लिम्बमा, सेल टाइपमा सेन्टर लिम्बमा। कोर ल्यामिनेटेड सिलिकन स्टिल, एल भी भित्र एच भी बाहिर, ट्याङ्क, आयल, कन्जर्भेटर, ब्रिदर, बुसिङ्स, र ट्रेन्ड्स — सी आर जी ओ, एमोर्फस, ड्राई टाइप।',
      lines: [['idea', <>Recap: core type (both limbs) · shell type (centre limb) · laminated silicon-steel core · LV inside, HV outside · tank, oil, conservator, breather, bushings · trends: CRGO, amorphous, dry type</>]],
    },
  ],
  lecturer: [
    {
      say: 'Smaran garau: transformer static machine ho, jasma rotating part hudaina. Yo mutual induction ko principle ma chalcha, ra yasko main parts core ra windings hun.',
      voice: 'स्मरण गरौं — ट्रान्सफर्मर स्टाटिक मेसिन हो, जसमा रोटेटिङ पार्ट हुँदैन। यो म्युचुअल इन्डक्सनको प्रिन्सिपलमा चल्छ, र यसको मेन पार्ट्स कोर र वाइन्डिङ्स हुन्।',
      lines: [['h', <>Construction of a single-phase transformer (Fig. 2.6)</>], rem(<>Static machine; works by mutual induction</>, <>Main parts: magnetic core and windings</>)],
    },
    {
      say: 'Core type transformer ma core ko dui limb hunchan ra winding dubai limb ma rakhincha; windings le core ko thulo bhag surround garchan.',
      voice: 'कोर टाइप ट्रान्सफर्मरमा कोरको दुई लिम्ब हुन्छन्, र वाइन्डिङ दुवै लिम्बमा राखिन्छ। वाइन्डिङ्सले कोरको ठूलो भाग सराउन्ड गर्छन्।',
      lines: [['step', <>(i) <b>Core type:</b> two limbs; the windings are placed on both limbs and surround the core.</>, undefined, { carry: <>(i) Core type: windings on both limbs</> }]],
    },
    {
      say: 'Shell type transformer ma tin limb hunchan, dubai winding centre limb ma rakhincha, ra core le windings lai surround garcha; flux dui parallel path ma split huncha.',
      voice: 'सेल टाइप ट्रान्सफर्मरमा तीन लिम्ब हुन्छन्, दुवै वाइन्डिङ सेन्टर लिम्बमा राखिन्छ, र कोरले वाइन्डिङ्सलाई सराउन्ड गर्छ। फ्लक्स दुई प्यारालल पाथमा स्प्लिट हुन्छ।',
      lines: [['step', <>(ii) <b>Shell type:</b> three limbs; both windings on the centre limb, surrounded by the core; the flux divides into two parallel paths.</>, undefined, { carry: <>(ii) Shell type: windings on the centre limb</> }]],
    },
    {
      say: 'Core 0.35 dekhi 0.5 mm ka silicon-steel laminations, varnish le insulated, bata banaincha. Lamination le eddy current loss ghataucha, ra silicon steel le hysteresis loss.',
      voice: 'कोर जिरो पोइन्ट थ्री फाइभ देखि जिरो पोइन्ट फाइभ मिलिमिटरका सिलिकन स्टिल ल्यामिनेसन्स, भार्निसले इन्सुलेटेड, बाट बनाइन्छ। ल्यामिनेसनले एडी करेन्ट लस घटाउँछ, र सिलिकन स्टिलले हिस्टेरेसिस लस।',
      lines: [br('Laminations', <Pts items={[<>0.35–0.5 mm silicon-steel sheets, varnished</>, <>Eddy-current loss ∝ (thickness)²: reduced</>, <>Silicon content: reduced hysteresis loss</>]} />)],
      ask: {
        q: 'Transformer core ma lamination ko main purpose k ho?',
        voice: 'ट्रान्सफर्मर कोरमा ल्यामिनेसनको मेन पर्पोज के हो?',
        options: ['Eddy current loss reduce garnu', 'Copper loss reduce garnu', 'Leakage flux badhaunu'],
        answer: 0,
        why: 'Insulated thin sheets le eddy current ko path ko resistance badhauchan; eddy loss thickness ko square sanga ghatcha.',
      },
    },
    {
      page: true,
      say: 'Windings insulated copper conductors ka hunchan. LV winding core ko najik ra HV winding tyasko bahira concentric rupma rakhincha.',
      voice: 'वाइन्डिङ्स इन्सुलेटेड कपर कन्डक्टर्सका हुन्छन्। एल भी वाइन्डिङ कोरको नजिक, र एच भी वाइन्डिङ त्यसको बाहिर कन्सेन्ट्रिक रूपमा राखिन्छ।',
      lines: [['step', <>(iii) <b>Windings:</b> insulated copper; LV next to the core, HV outside it (concentric arrangement).</>, undefined, { carry: <>(iii) LV inside, HV outside; laminated core</> }]],
    },
    {
      say: 'Yesko karan: core earth potential ma huncha, tesaile core ra LV bich kam insulation chahincha, ra bahira ko HV winding insulate garna ra tapping dina sajilo huncha.',
      voice: 'यसको कारण — कोर अर्थ पोटेन्सियलमा हुन्छ, त्यसैले कोर र एल भी बीच कम इन्सुलेसन चाहिन्छ, र बाहिरको एच भी वाइन्डिङ इन्सुलेट गर्न र ट्यापिङ दिन सजिलो हुन्छ।',
      lines: [br('Reason for LV next to the core', <Pts items={[<>Core at earth potential</>, <>Less insulation between core and LV</>, <>HV outside: easier insulation and tappings</>]} />)],
    },
    {
      say: 'Accessories: transformer oil sahit ko tank cooling ra insulation ko lagi, conservator oil expansion ko lagi, silica-gel breather moisture absorb garna, bushings leads bahira lyauna, ra Buchholz relay internal fault ko lagi.',
      voice: 'एक्सेसरिज — ट्रान्सफर्मर आयलसहितको ट्याङ्क कुलिङ र इन्सुलेसनको लागि, कन्जर्भेटर आयल एक्सपान्सनको लागि, सिलिका जेल ब्रिदर मोइस्चर एब्जर्ब गर्न, बुसिङ्स लिड्स बाहिर ल्याउन, र बुकहोल्ज रिले इन्टरनल फल्टको लागि।',
      lines: [['step', <>(iv) <b>Accessories:</b><Pts items={[<>Tank with transformer oil: cooling, insulation</>, <>Conservator: oil expansion · breather: moisture</>, <>Bushings: leads out · Buchholz relay: fault alarm</>]} /></>]],
    },
    {
      say: 'Recent trends: CRGO ra amorphous core le core loss ghatauchan; cast-resin dry-type transformer oil-free hunchan; ra online condition monitoring prayog huncha.',
      voice: 'रिसेन्ट ट्रेन्ड्स — सी आर जी ओ र एमोर्फस कोरले कोर लस घटाउँछन्। कास्ट रेजिन ड्राई टाइप ट्रान्सफर्मर आयल फ्री हुन्छन्, र अनलाइन कन्डिसन मनिटरिङ प्रयोग हुन्छ।',
      lines: [['step', <>(v) <b>Recent trends:</b><Pts items={[<>CRGO (cold-rolled grain-oriented) and amorphous cores: low core loss</>, <>Cast-resin dry-type units: oil-free, indoor use</>, <>Online condition monitoring</>]} /></>]],
      ask: {
        q: 'Dry-type (cast-resin) transformer ko main advantage k ho?',
        voice: 'ड्राई टाइप, कास्ट रेजिन ट्रान्सफर्मरको मेन एडभान्टेज के हो?',
        options: ['Oil chaina, building bhitra safe', 'Copper loss zero', 'Core chahidaina'],
        answer: 0,
        why: 'Cast-resin unit ma oil hudaina, tesaile fire risk kam ra indoor installation sajilo.',
      },
    },
    {
      say: 'Saransha: core type ra shell type, laminated silicon-steel core, LV bhitra HV bahira, accessories, ra CRGO, amorphous, dry-type jasta recent trends.',
      voice: 'सारांश — कोर टाइप र सेल टाइप, ल्यामिनेटेड सिलिकन स्टिल कोर, एल भी भित्र एच भी बाहिर, एक्सेसरिज, र सी आर जी ओ, एमोर्फस, ड्राई टाइप जस्ता रिसेन्ट ट्रेन्ड्स।',
      lines: [['idea', <>Summary: core and shell types · laminated core · LV inside, HV outside · tank, oil, conservator, breather, bushings, Buchholz · trends: CRGO, amorphous, dry type</>]],
    },
  ],
});

export const ideal23 = duo('Ideal transformer: voltage and current ratios', {
  draw: xfmrFigure,
  viewBox: '0 0 360 230',
  tutor: [
    {
      say: 'Yaad garau: Faraday ko law anusar e equals N d phi over d t, ra ideal ma loss zero.',
      voice: 'याद गरौं — फाराडेको ल अनुसार ई इक्वल्स एन डी फाइ ओभर डी टी, र आइडियलमा लस जिरो।',
      lines: [['h', <>Ideal transformer</>], rem(<K>{String.raw`e = N\,\dfrac{d\phi}{dt}`}</K>, <>Ideal: no R, no leakage, no core loss</>)],
    },
    {
      say: 'Dubai winding ma eutai flux phi linked cha, tesaile e 1 equals N 1 d phi over d t ra e 2 equals N 2 d phi over d t.',
      voice: 'दुवै वाइन्डिङमा एउटै फ्लक्स फाइ लिङ्क्ड छ, त्यसैले ई वान इक्वल्स एन वान डी फाइ ओभर डी टी, र ई टु इक्वल्स एन टु डी फाइ ओभर डी टी।',
      lines: [['step', step('Same flux links both windings', String.raw`\begin{aligned} e_1 &= N_1\dfrac{d\phi}{dt} \\ e_2 &= N_2\dfrac{d\phi}{dt} \end{aligned}`), undefined, { carry: <>Same φ in both windings</> }]],
    },
    {
      say: 'Bhag garda voltage ratio: V 1 over V 2 equals N 1 over N 2, arthat transformation ratio.',
      voice: 'भाग गर्दा भोल्टेज रेसियो — भी वान ओभर भी टु इक्वल्स एन वान ओभर एन टु, अर्थात ट्रान्सफर्मेसन रेसियो।',
      lines: [['eq', tex(String.raw`\dfrac{V_1}{V_2} = \dfrac{N_1}{N_2}`)]],
    },
    {
      say: 'Current ratio kina ulto? Ideal ma power harauna sakdaina: V 1 I 1 equals V 2 I 2.',
      voice: 'करेन्ट रेसियो किन उल्टो? आइडियलमा पावर हराउन सक्दैन — भी वान आई वान इक्वल्स भी टु आई टु।',
      lines: [br('Why is the current ratio inverted?', <><Pts items={[<>No loss: input power equals output power</>]} />{tex(String.raw`V_1I_1 = V_2I_2`)}</>)],
    },
    {
      say: 'I 1 over I 2 equals N 2 over N 1. Step-up ma voltage badhcha ra current ghatcha.',
      voice: 'आई वान ओभर आई टु इक्वल्स एन टु ओभर एन वान। स्टेप अपमा भोल्टेज बढ्छ, र करेन्ट घट्छ।',
      lines: [['eq', tex(String.raw`\dfrac{I_1}{I_2} = \dfrac{N_2}{N_1}`)]],
      ask: {
        q: 'Ideal step-up transformer ma secondary current primary bhanda kasto huncha?',
        voice: 'आइडियल स्टेप अप ट्रान्सफर्मरमा सेकेन्डरी करेन्ट प्राइमरीभन्दा कस्तो हुन्छ?',
        options: ['Sano', 'Thulo', 'Barabar'],
        answer: 0,
        why: 'I1/I2 = N2/N1; N2 > N1 bhaye I2 < I1.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: e equals N d phi over d t; ideal transformer ma kunai loss chaina.',
      voice: 'स्मरण — ई इक्वल्स एन डी फाइ ओभर डी टी। आइडियल ट्रान्सफर्मरमा कुनै लस छैन।',
      lines: [['h', <>Ideal transformer (Fig. 2.1)</>], rem(<K>{String.raw`e = N\,d\phi/dt`}</K>)],
    },
    {
      say: 'Mutual flux dubai winding ma link huncha, tesaile e 1 ra e 2 N 1 ra N 2 ko anupat ma.',
      voice: 'म्युचुअल फ्लक्स दुवै वाइन्डिङमा लिङ्क हुन्छ, त्यसैले ई वान र ई टु, एन वान र एन टुको अनुपातमा।',
      lines: [['step', tex(String.raw`\begin{aligned} e_1 &= N_1\dfrac{d\phi}{dt} && \cdots(1) \\ e_2 &= N_2\dfrac{d\phi}{dt} && \cdots(2) \end{aligned}`), undefined, { carry: <>(1), (2): same φ</> }]],
    },
    {
      say: 'Equation ek ra dui bata V 1 over V 2 equals N 1 over N 2 equals K ko ulto.',
      voice: 'इक्वेसन वान र टुबाट, भी वान ओभर भी टु इक्वल्स एन वान ओभर एन टु।',
      lines: [['step', tex(String.raw`\dfrac{V_1}{V_2} = \dfrac{N_1}{N_2} \qquad \cdots(3)`)]],
    },
    {
      say: 'Power conservation: V 1 I 1 equals V 2 I 2.',
      voice: 'पावर कन्जर्भेसन — भी वान आई वान इक्वल्स भी टु आई टु।',
      lines: [br('Power balance', tex(String.raw`V_1I_1 = V_2I_2`))],
    },
    {
      say: 'Tesaile I 1 over I 2 equals N 2 over N 1.',
      voice: 'त्यसैले आई वान ओभर आई टु इक्वल्स एन टु ओभर एन वान।',
      lines: [['step', tex(String.raw`\therefore\ \boxed{\dfrac{I_1}{I_2} = \dfrac{N_2}{N_1}} \qquad \cdots(4)`)]],
      ask: {
        q: 'Ideal transformer ma kun quantity badalidaina?',
        voice: 'आइडियल ट्रान्सफर्मरमा कुन क्वान्टिटी बदलिँदैन?',
        options: ['Power (VA)', 'Voltage', 'Current'],
        answer: 0,
        why: 'V1I1 = V2I2: voltage ra current badalchan, power ustai.',
      },
    },
  ],
});

export const load25 = duo('Operation of the transformer with load: phasor diagrams', {
  draw: noLoadFigure,
  viewBox: '0 0 360 230',
  tutor: [
    {
      say: 'Yaad garau: no load ma I 0 matra bagcha, ra flux phi m constant rahancha.',
      voice: 'याद गरौं — नो लोडमा आई जिरो मात्र बग्छ, र फ्लक्स फाइ एम कन्स्टेन्ट रहन्छ।',
      lines: [['h', <>Transformer on load: phasor diagrams</>], rem(<>No load: only I<sub>0</sub>; φ<sub>m</sub> constant</>)],
    },
    {
      say: 'Load jodda secondary current I 2 bagcha. Primary le load component I 2 dash linchha, jasle I 2 ko MMF lai balance garcha.',
      voice: 'लोड जोड्दा सेकेन्डरी करेन्ट आई टु बग्छ। प्राइमरीले लोड कम्पोनेन्ट आई टु ड्यास लिन्छ, जसले आई टुको एम एम एफलाई ब्यालेन्स गर्छ।',
      lines: [['step', step('Load component of primary current', String.raw`\begin{aligned} I_2'N_1 &= I_2N_2 \\ I_2' &= \dfrac{N_2}{N_1}I_2 \end{aligned}`), undefined, { carry: <><K>{String.raw`I_1 = I_0 + I_2'`}</K></> }]],
    },
    {
      say: 'Primary current I 1 equals I 0 plus I 2 dash, phasor ma jodincha.',
      voice: 'प्राइमरी करेन्ट आई वान इक्वल्स आई जिरो प्लस आई टु ड्यास, फेजरमा जोडिन्छ।',
      lines: [['eq', tex(String.raw`\bar{I}_1 = \bar{I}_0 + \bar{I}_2'`)]],
    },
    {
      say: 'Resistive load ma I 2 V 2 sanga eutai phase ma; inductive ma I 2 pachhi lag; capacitive ma aghi lead. Yasaile I 1 ko kon pani badalcha.',
      voice: 'रेजिस्टिभ लोडमा आई टु, भी टुसँग एउटै फेजमा। इन्डक्टिभमा आई टु पछि ल्याग, क्यापासिटिभमा अघि लिड। यसैले आई वानको कोण पनि बदलिन्छ।',
      lines: [br('I2 for each kind of load', <Pts items={[<>Resistive: I<sub>2</sub> in phase with V<sub>2</sub></>, <>Inductive: I<sub>2</sub> lags V<sub>2</sub> by φ<sub>2</sub></>, <>Capacitive: I<sub>2</sub> leads V<sub>2</sub> by φ<sub>2</sub></>]} />)],
    },
    {
      say: 'Real transformer ma V 1 equals minus E 1 plus I 1 Z 1, ra V 2 equals E 2 minus I 2 Z 2. Phasor diagram yahi equation bata banaincha.',
      voice: 'रियल ट्रान्सफर्मरमा भी वान इक्वल्स माइनस ई वान प्लस आई वान जेड वान, र भी टु इक्वल्स ई टु माइनस आई टु जेड टु। फेजर डायाग्राम यही इक्वेसनबाट बनाइन्छ।',
      lines: [['step', <K>{String.raw`\begin{aligned} \bar{V}_1 &= -\bar{E}_1 + \bar{I}_1\bar{Z}_1 \\ \bar{V}_2 &= \bar{E}_2 - \bar{I}_2\bar{Z}_2 \end{aligned}`}</K>]],
      ask: {
        q: 'Capacitive load ma secondary current V2 lai kasto huncha?',
        voice: 'क्यापासिटिभ लोडमा सेकेन्डरी करेन्ट भी टुलाई कस्तो हुन्छ?',
        options: ['Lead garcha', 'Lag garcha', 'In phase'],
        answer: 0,
        why: 'Capacitive load ma current voltage bhanda aghi huncha.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: no load ma I 0 ra constant flux.',
      voice: 'स्मरण — नो लोडमा आई जिरो र कन्स्टेन्ट फ्लक्स।',
      lines: [['h', <>Transformer on load (Fig. 2.2)</>], rem(<>No load: I<sub>0</sub>, constant φ<sub>m</sub></>)],
    },
    {
      say: 'Load ma primary le I 2 dash linchha, I 2 dash N 1 equals I 2 N 2.',
      voice: 'लोडमा प्राइमरीले आई टु ड्यास लिन्छ, आई टु ड्यास एन वान इक्वल्स आई टु एन टु।',
      lines: [['step', tex(String.raw`I_2'N_1 = I_2N_2 \qquad \cdots(1)`), undefined, { carry: <>(1) <K>{String.raw`I_2'N_1 = I_2N_2`}</K></> }]],
    },
    {
      say: 'Total primary current I 1 equals I 0 plus I 2 dash.',
      voice: 'टोटल प्राइमरी करेन्ट आई वान इक्वल्स आई जिरो प्लस आई टु ड्यास।',
      lines: [['step', tex(String.raw`\bar{I}_1 = \bar{I}_0 + \bar{I}_2' \qquad \cdots(2)`)]],
    },
    {
      say: 'Resistive, inductive ra capacitive load ma I 2 kramashah in phase, lagging ra leading huncha.',
      voice: 'रेजिस्टिभ, इन्डक्टिभ र क्यापासिटिभ लोडमा आई टु क्रमशः इन फेज, ल्यागिङ र लिडिङ हुन्छ।',
      lines: [br('Load types', <Pts items={[<>R: in phase · L: lagging · C: leading</>]} />)],
    },
    {
      say: 'Voltage equations V 1 equals minus E 1 plus I 1 Z 1, ra V 2 equals E 2 minus I 2 Z 2 bata phasor diagram banaincha.',
      voice: 'भोल्टेज इक्वेसन, भी वान इक्वल्स माइनस ई वान प्लस आई वान जेड वान, र भी टु इक्वल्स ई टु माइनस आई टु जेड टुबाट फेजर डायाग्राम बनाइन्छ।',
      lines: [['step', <K>{String.raw`\begin{aligned} \bar{V}_1 &= -\bar{E}_1 + \bar{I}_1\bar{Z}_1 && \cdots(3) \\ \bar{V}_2 &= \bar{E}_2 - \bar{I}_2\bar{Z}_2 && \cdots(4) \end{aligned}`}</K>]],
      ask: {
        q: 'Load badhda transformer ko primary current kina badhcha?',
        voice: 'लोड बढ्दा ट्रान्सफर्मरको प्राइमरी करेन्ट किन बढ्छ?',
        options: ['I2 ko MMF balance garna I2′ badhcha', 'Flux badhcha', 'Supply voltage badhcha'],
        answer: 0,
        why: 'I2′N1 = I2N2, flux constant rakhna.',
      },
    },
  ],
});

export const polarity27 = duo('Polarity test of a transformer', {
  draw: xfmrFigure,
  viewBox: '0 0 360 230',
  tutor: [
    {
      say: 'Yaad garau: transformer ko primary ra secondary ko EMF ko disha winding ko disha ma bhar parcha.',
      voice: 'याद गरौं — ट्रान्सफर्मरको प्राइमरी र सेकेन्डरीको ई एम एफको दिशा, वाइन्डिङको दिशामा भर पर्छ।',
      lines: [['h', <>Polarity test</>], rem(<>EMF direction depends on the winding sense</>)],
    },
    {
      say: 'Test: primary ko euta terminal ra secondary ko euta terminal jodera, sano AC voltage primary ma dincha. Voltmeter le baki dui terminal bich napcha.',
      voice: 'टेस्ट — प्राइमरीको एउटा टर्मिनल र सेकेन्डरीको एउटा टर्मिनल जोडेर, सानो ए सी भोल्टेज प्राइमरीमा दिन्छ। भोल्टमिटरले बाँकी दुई टर्मिनलबीच नाप्छ।',
      lines: [['step', <>Join one primary terminal to one secondary terminal; apply low AC voltage V<sub>1</sub>; voltmeter V across the other two</>]],
    },
    {
      say: 'Voltmeter V 1 minus V 2 dekhayo bhane subtractive polarity; V 1 plus V 2 dekhayo bhane additive polarity.',
      voice: 'भोल्टमिटरले भी वान माइनस भी टु देखायो भने सबट्र्याक्टिभ पोलारिटी, भी वान प्लस भी टु देखायो भने एडिटिभ पोलारिटी।',
      lines: [['step', <K>{String.raw`\begin{aligned} V &= V_1 - V_2 \Rightarrow \text{subtractive} \\ V &= V_1 + V_2 \Rightarrow \text{additive} \end{aligned}`}</K>]],
    },
    {
      say: 'Polarity kina chahincha? Transformer parallel ma jodda ra three-phase bank banauda ulto polarity bhaye thulo circulating current bagcha.',
      voice: 'पोलारिटी किन चाहिन्छ? ट्रान्सफर्मर प्याराललमा जोड्दा, र थ्री फेज बैंक बनाउँदा, उल्टो पोलारिटी भए ठूलो सर्कुलेटिङ करेन्ट बग्छ।',
      lines: [br('Why does polarity matter?', <Pts items={[<>Parallel operation: wrong polarity → short-circuit current</>, <>Three-phase banks and instrument transformers need correct marks</>]} />)],
    },
    {
      say: 'Test pachhi terminal lai A 1, A 2 ra a 1, a 2 jasta chinha diyincha.',
      voice: 'टेस्टपछि टर्मिनललाई ए वान, ए टु र स्मल ए वान, ए टु जस्ता चिन्ह दिइन्छ।',
      lines: [['step', <>Terminals are then marked (A<sub>1</sub>, A<sub>2</sub> on HV; a<sub>1</sub>, a<sub>2</sub> on LV)</>]],
      ask: {
        q: 'Polarity test ma voltmeter le V1 + V2 dekhayo bhane polarity kasto ho?',
        voice: 'पोलारिटी टेस्टमा भोल्टमिटरले भी वान प्लस भी टु देखायो भने पोलारिटी कस्तो हो?',
        options: ['Additive', 'Subtractive', 'Zero'],
        answer: 0,
        why: 'Dui EMF jodiye additive, ghatiye subtractive.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: induced EMF ko relative direction winding sense ma bhar parcha.',
      voice: 'स्मरण — इन्ड्युस्ड ई एम एफको रिलेटिभ डाइरेक्सन वाइन्डिङ सेन्समा भर पर्छ।',
      lines: [['h', <>Polarity test</>], rem(<>Relative polarity depends on winding sense</>)],
    },
    {
      say: 'Ek primary ra ek secondary terminal jodera primary ma reduced voltage diyincha.',
      voice: 'एक प्राइमरी र एक सेकेन्डरी टर्मिनल जोडेर, प्राइमरीमा रिड्युस्ड भोल्टेज दिइन्छ।',
      lines: [['step', <>Connect one HV and one LV terminal; apply reduced voltage to the HV side.</>]],
    },
    {
      say: 'Voltmeter reading V 1 minus V 2 bhaye subtractive, V 1 plus V 2 bhaye additive.',
      voice: 'भोल्टमिटर रिडिङ, भी वान माइनस भी टु भए सबट्र्याक्टिभ, भी वान प्लस भी टु भए एडिटिभ।',
      lines: [['step', <>V = V<sub>1</sub> − V<sub>2</sub>: subtractive · V = V<sub>1</sub> + V<sub>2</sub>: additive</>]],
    },
    {
      say: 'Correct polarity parallel operation ra three-phase connection ko lagi anivarya cha.',
      voice: 'करेक्ट पोलारिटी, प्यारालल अपरेसन र थ्री फेज कनेक्सनको लागि अनिवार्य छ।',
      lines: [br('Importance', <Pts items={[<>Parallel operation · three-phase banks · instrument transformers</>]} />)],
    },
    {
      say: 'Terminal ma polarity marking garincha.',
      voice: 'टर्मिनलमा पोलारिटी मार्किङ गरिन्छ।',
      lines: [['step', <>Terminals are marked accordingly.</>]],
      ask: {
        q: 'Transformer polarity test kina garincha?',
        voice: 'ट्रान्सफर्मर पोलारिटी टेस्ट किन गरिन्छ?',
        options: ['Parallel ra three-phase connection sahi garna', 'Efficiency napna', 'Core loss napna'],
        answer: 0,
        why: 'Ulto polarity ma circulating current ra short circuit huncha.',
      },
    },
  ],
});

export const losses29 = duo('Losses in a transformer', {
  draw: effCurveFigure,
  viewBox: '0 0 360 230',
  tutor: [
    {
      say: 'Yaad garau: transformer ma ghumne bhag chaina, tesaile mechanical loss hudaina. Loss core ra winding ma matra.',
      voice: 'याद गरौं — ट्रान्सफर्मरमा घुम्ने भाग छैन, त्यसैले मेकानिकल लस हुँदैन। लस कोर र वाइन्डिङमा मात्र।',
      lines: [['h', <>Losses in a transformer</>], rem(<>No moving parts → no mechanical loss</>)],
    },
    {
      say: 'Core loss wa iron loss: hysteresis ra eddy current. Yo flux ra frequency ma bhar parcha, load ma hoina, tesaile constant.',
      voice: 'कोर लस वा आइरन लस — हिस्टेरेसिस र एडी करेन्ट। यो फ्लक्स र फ्रिक्वेन्सीमा भर पर्छ, लोडमा होइन, त्यसैले कन्स्टेन्ट।',
      lines: [['step', <Pts items={[<>Hysteresis: <K>{String.raw`P_h = \eta B_{max}^{1.6} f V`}</K></>, <>Eddy current: <K>{String.raw`P_e = k_e B_{max}^2 f^2 t^2 V`}</K></>]} />, undefined, { carry: <>Core loss P<sub>i</sub>: constant</> }]],
    },
    {
      say: 'Copper loss: winding ko resistance ma I squared R. Yo load ko square sanga badhcha.',
      voice: 'कपर लस — वाइन्डिङको रेजिस्टेन्समा आई स्क्वायर आर। यो लोडको स्क्वायरसँग बढ्छ।',
      lines: [['step', step('Copper loss at a fraction x of full load', String.raw`\begin{aligned} P_{cu} &= I_1^2R_1 + I_2^2R_2 \\ &= x^2\,P_{cu,fl} \end{aligned}`), undefined, { carry: <>Cu loss ∝ x²</> }]],
    },
    {
      say: 'Kina x squared? Copper loss current ko square ma huncha, ra current load ko anupat ma, tesaile aadha load ma ek chauthai.',
      voice: 'किन एक्स स्क्वायर? कपर लस करेन्टको स्क्वायरमा हुन्छ, र करेन्ट लोडको अनुपातमा, त्यसैले आधा लोडमा एक चौथाइ।',
      lines: [br('Why x²?', <Pts items={[<>Cu loss ∝ I², and I ∝ load</>, <>Half load → (½)² = ¼ of full-load Cu loss</>]} />)],
    },
    {
      say: 'Stray loss ra dielectric loss sano hunchan. Figure 2.4 ma iron loss flat line ra copper loss parabola.',
      voice: 'स्ट्रे लस र डाइइलेक्ट्रिक लस साना हुन्छन्। फिगर टु पोइन्ट फोरमा आइरन लस फ्ल्याट लाइन, र कपर लस प्याराबोला।',
      lines: [['step', <>Small stray and dielectric losses · Fig. 2.4: iron loss flat, Cu loss rises as x²</>]],
      ask: {
        q: 'Transformer ko kun loss load sanga badalidaina?',
        voice: 'ट्रान्सफर्मरको कुन लस लोडसँग बदलिँदैन?',
        options: ['Core (iron) loss', 'Copper loss', 'Dubai'],
        answer: 0,
        why: 'Core loss flux ra frequency ma bhar parcha, jun lagbhag constant.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: transformer static machine bhayeko le mechanical loss hudaina.',
      voice: 'स्मरण — ट्रान्सफर्मर स्टाटिक मेसिन भएकोले मेकानिकल लस हुँदैन।',
      lines: [['h', <>Losses in a transformer (Fig. 2.4)</>], rem(<>Static machine: no friction or windage</>)],
    },
    {
      say: 'Core loss: hysteresis ra eddy current loss, jun constant hun.',
      voice: 'कोर लस — हिस्टेरेसिस र एडी करेन्ट लस, जुन कन्स्टेन्ट हुन्।',
      lines: [['step', <><H>(i) Core (iron) loss P<sub>i</sub></H><Pts items={[<><K>{String.raw`P_h = \eta B_{max}^{1.6} f V`}</K></>, <><K>{String.raw`P_e = k_e B_{max}^2 f^2 t^2 V`}</K></>]} /></>, undefined, { carry: <>(i) P<sub>i</sub> constant</> }]],
    },
    {
      say: 'Copper loss I 1 squared R 1 plus I 2 squared R 2, load ko square sanga.',
      voice: 'कपर लस, आई वान स्क्वायर आर वान प्लस आई टु स्क्वायर आर टु, लोडको स्क्वायरसँग।',
      lines: [['step', <><H>(ii) Copper loss</H><K>{String.raw`P_{cu} = I_1^2R_1 + I_2^2R_2 = x^2P_{cu,fl}`}</K></>]],
    },
    {
      say: 'Copper loss current ko square ma huncha.',
      voice: 'कपर लस करेन्टको स्क्वायरमा हुन्छ।',
      lines: [br('x²', <Pts items={[<>P<sub>cu</sub> ∝ I² ∝ x²</>]} />)],
    },
    {
      say: 'Stray ra dielectric loss sano hunchan.',
      voice: 'स्ट्रे र डाइइलेक्ट्रिक लस साना हुन्छन्।',
      lines: [['step', <>(iii) Stray and dielectric losses: small</>]],
      ask: {
        q: 'Transformer core lai laminate garda kun loss ghatcha?',
        voice: 'ट्रान्सफर्मर कोरलाई ल्यामिनेट गर्दा कुन लस घट्छ?',
        options: ['Eddy current loss', 'Copper loss', 'Hysteresis loss matra'],
        answer: 0,
        why: 'Pe ∝ t²; patla lamination le eddy loss ghataucha.',
      },
    },
  ],
});

export const allDay210 = duo('All-day efficiency', {
  draw: effCurveFigure,
  viewBox: '0 0 360 230',
  tutor: [
    {
      say: 'Yaad garau: efficiency eta equals output over input, ra maximum efficiency copper loss iron loss barabar hunda.',
      voice: 'याद गरौं — इफिसियन्सी इटा इक्वल्स आउटपुट ओभर इनपुट, र म्याक्सिमम इफिसियन्सी कपर लस आइरन लस बराबर हुँदा।',
      lines: [['h', <>All-day efficiency</>], rem(<K>{String.raw`\eta = \dfrac{\text{output}}{\text{input}}`}</K>, <>η<sub>max</sub> when Cu loss equals iron loss</>)],
    },
    {
      say: 'Distribution transformer chaubis ghanta jodiyeko huncha, tara load din bhari badalirahancha; raati dherai kam.',
      voice: 'डिस्ट्रिब्युसन ट्रान्सफर्मर चौबीस घण्टा जोडिएको हुन्छ, तर लोड दिनभरि बदलिरहन्छ — राति धेरै कम।',
      lines: [['step', <>Distribution transformers stay energised 24 h; the load varies through the day</>]],
    },
    {
      say: 'Yasko lagi energy ma efficiency herincha: all-day efficiency equals din bhari ko output kWh over input kWh.',
      voice: 'यसको लागि इनर्जीमा इफिसियन्सी हेरिन्छ — अल डे इफिसियन्सी इक्वल्स दिनभरिको आउटपुट किलोवाट आवर ओभर इनपुट किलोवाट आवर।',
      lines: [['eq', tex(String.raw`\eta_{\text{all-day}} = \dfrac{\text{output kWh in 24 h}}{\text{input kWh in 24 h}}`)]],
    },
    {
      say: 'Iron loss kina chaubis ghanta? Transformer supply ma jodiyeko jati bela core magnetise bhairahancha, load hos wa nahos.',
      voice: 'आइरन लस किन चौबीस घण्टा? ट्रान्सफर्मर सप्लाईमा जोडिएको जति बेला कोर म्याग्नेटाइज भइरहन्छ, लोड होस् वा नहोस्।',
      lines: [br('Why count iron loss for 24 h?', <Pts items={[<>The core is magnetised whenever the transformer is energised</>, <>Cu loss counts only for the hours and fraction of load</>]} />)],
    },
    {
      say: 'Input kWh equals output plus 24 times P i plus har period ko x squared P cu fl times ghanta. Tesaile distribution transformer kam iron loss ko banaincha.',
      voice: 'इनपुट किलोवाट आवर इक्वल्स आउटपुट प्लस चौबीस टाइम्स पी आई, प्लस हरेक पिरियडको एक्स स्क्वायर पी सी यु एफ एल टाइम्स घण्टा। त्यसैले डिस्ट्रिब्युसन ट्रान्सफर्मर कम आइरन लसको बनाइन्छ।',
      lines: [['step', <K>{String.raw`\begin{aligned} \text{Input} &= \text{Output} + 24P_i \\ &\quad + \textstyle\sum x^2P_{cu,fl}\,t \end{aligned}`}</K>]],
      ask: {
        q: 'Distribution transformer lai kam iron loss ko kina banaincha?',
        voice: 'डिस्ट्रिब्युसन ट्रान्सफर्मरलाई कम आइरन लसको किन बनाइन्छ?',
        options: ['Iron loss 24 ghanta huncha', 'Copper loss badhauna', 'Voltage badhauna'],
        answer: 0,
        why: 'Energised bhaye samma iron loss hunchha, load kam huda pani.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: eta equals output over input ra maximum ma copper loss iron loss barabar.',
      voice: 'स्मरण — इटा इक्वल्स आउटपुट ओभर इनपुट, र म्याक्सिमममा कपर लस आइरन लस बराबर।',
      lines: [['h', <>All-day (energy) efficiency</>], rem(<>η<sub>max</sub>: Cu loss equals iron loss</>)],
    },
    {
      say: 'Distribution transformer sadhai energised rahancha tara load variable huncha.',
      voice: 'डिस्ट्रिब्युसन ट्रान्सफर्मर सधैं इनर्जाइज्ड रहन्छ, तर लोड भेरिएबल हुन्छ।',
      lines: [['step', <>Always energised; variable load.</>]],
    },
    {
      say: 'All-day efficiency equals output kWh over input kWh in 24 hours.',
      voice: 'अल डे इफिसियन्सी इक्वल्स, आउटपुट किलोवाट आवर ओभर इनपुट किलोवाट आवर, इन टुएन्टी फोर आवर्स।',
      lines: [['step', tex(String.raw`\eta_{ad} = \dfrac{\text{output kWh (24 h)}}{\text{input kWh (24 h)}} \qquad \cdots(1)`)]],
    },
    {
      say: 'Iron loss 24 ghanta, copper loss load period anusar.',
      voice: 'आइरन लस चौबीस घण्टा, कपर लस लोड पिरियड अनुसार।',
      lines: [br('Loss energy', <Pts items={[<>Iron: 24 P<sub>i</sub></>, <>Copper: Σ x² P<sub>cu,fl</sub> t</>]} />)],
    },
    {
      say: 'Tesaile distribution transformer ma iron loss kam rakhna design garincha.',
      voice: 'त्यसैले डिस्ट्रिब्युसन ट्रान्सफर्मरमा आइरन लस कम राख्न डिजाइन गरिन्छ।',
      lines: [['step', <>Hence distribution transformers are designed for low iron loss.</>]],
      ask: {
        q: 'All-day efficiency kun ko ratio ho?',
        voice: 'अल डे इफिसियन्सी कुनको रेसियो हो?',
        options: ['Energy (kWh) ko', 'Power (kW) ko', 'Voltage ko'],
        answer: 0,
        why: 'Din bhari ko output energy ra input energy ko ratio.',
      },
    },
  ],
});

export const three213 = duo('Three-phase transformer connections', {
  draw: threePhaseFigure,
  viewBox: '0 0 360 236',
  tutor: [
    {
      say: 'Yaad garau: star ma V L equals root three V ph ra I L equals I ph; delta ma V L equals V ph ra I L equals root three I ph.',
      voice: 'याद गरौं — स्टारमा भी एल इक्वल्स रुट थ्री भी पी एच, र आई एल इक्वल्स आई पी एच। डेल्टामा भी एल इक्वल्स भी पी एच, र आई एल इक्वल्स रुट थ्री आई पी एच।',
      lines: [['h', <>Three-phase transformer connections</>], rem(<>Star: <K>{String.raw`V_L = \sqrt{3}V_{ph},\ I_L = I_{ph}`}</K></>, <>Delta: <K>{String.raw`V_L = V_{ph},\ I_L = \sqrt{3}I_{ph}`}</K></>)],
    },
    {
      say: 'Star-star: economical high voltage ko lagi, neutral milcha; tara unbalanced load ma samasya.',
      voice: 'स्टार स्टार — इकोनोमिकल हाई भोल्टेजको लागि, न्युट्रल मिल्छ। तर अनब्यालेन्स्ड लोडमा समस्या।',
      lines: [['step', <>(a) Y–Y: low insulation per phase, neutral available; poor with unbalanced load</>]],
    },
    {
      say: 'Delta-delta: euta transformer bigriye pani open delta ma chalna sakcha; low voltage, high current ko lagi.',
      voice: 'डेल्टा डेल्टा — एउटा ट्रान्सफर्मर बिग्रिए पनि ओपन डेल्टामा चल्न सक्छ। लो भोल्टेज, हाई करेन्टको लागि।',
      lines: [['step', <>(b) Δ–Δ: low-voltage, high-current; can run in open delta</>]],
    },
    {
      say: 'Star-delta ra delta-star ma 30 degree phase shift kina? Star ko phase voltage ra delta ko line voltage bich 30 degree ko kon huncha.',
      voice: 'स्टार डेल्टा र डेल्टा स्टारमा तीस डिग्री फेज सिफ्ट किन? स्टारको फेज भोल्टेज र डेल्टाको लाइन भोल्टेजबीच तीस डिग्रीको कोण हुन्छ।',
      lines: [br('Why a 30° shift?', <Pts items={[<>Line voltages of a star lead its phase voltages by 30°</>, <>So Y–Δ and Δ–Y outputs are shifted by 30°</>, <>They cannot be paralleled with Y–Y or Δ–Δ</>]} />)],
    },
    {
      say: 'Star-delta step-down substation ma, ra delta-star step-up generating station ra distribution ma, jaha neutral chahincha.',
      voice: 'स्टार डेल्टा स्टेप डाउन सबस्टेसनमा, र डेल्टा स्टार स्टेप अप जेनेरेटिङ स्टेसन र डिस्ट्रिब्युसनमा, जहाँ न्युट्रल चाहिन्छ।',
      lines: [['step', <Pts items={[<>(c) Y–Δ: step-down at receiving substations</>, <>(d) Δ–Y: step-up at generating stations; distribution (neutral for 3-phase 4-wire)</>]} />]],
      ask: {
        q: 'Ghar ko distribution transformer ma secondary prayah kun connection ma huncha?',
        voice: 'घरको डिस्ट्रिब्युसन ट्रान्सफर्मरमा सेकेन्डरी प्रायः कुन कनेक्सनमा हुन्छ?',
        options: ['Star (neutral sahit)', 'Delta', 'Open delta'],
        answer: 0,
        why: 'Delta-star ma secondary star bhayeko le 3-phase 4-wire ra single-phase supply milcha.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: star ma V L equals root three V ph, delta ma I L equals root three I ph.',
      voice: 'स्मरण — स्टारमा भी एल इक्वल्स रुट थ्री भी पी एच, डेल्टामा आई एल इक्वल्स रुट थ्री आई पी एच।',
      lines: [['h', <>Three-phase transformer connections (Fig. 2.7)</>], rem(<>Star: V<sub>L</sub> = √3 V<sub>ph</sub> · delta: I<sub>L</sub> = √3 I<sub>ph</sub></>)],
    },
    {
      say: 'Star-star: insulation kam, neutral available.',
      voice: 'स्टार स्टार — इन्सुलेसन कम, न्युट्रल एभेलेबल।',
      lines: [['step', <>(a) Y–Y: less insulation; neutral available.</>]],
    },
    {
      say: 'Delta-delta: open delta operation sambhav.',
      voice: 'डेल्टा डेल्टा — ओपन डेल्टा अपरेसन सम्भव।',
      lines: [['step', <>(b) Δ–Δ: open-delta operation possible.</>]],
    },
    {
      say: 'Star-delta ra delta-star ma primary ra secondary bich 30 degree phase shift huncha.',
      voice: 'स्टार डेल्टा र डेल्टा स्टारमा प्राइमरी र सेकेन्डरीबीच तीस डिग्री फेज सिफ्ट हुन्छ।',
      lines: [br('Phase shift', <Pts items={[<>Y–Δ and Δ–Y: 30° shift between primary and secondary</>]} />)],
    },
    {
      say: 'Star-delta step-down ra delta-star step-up wa distribution ma prayog huncha.',
      voice: 'स्टार डेल्टा स्टेप डाउन, र डेल्टा स्टार स्टेप अप वा डिस्ट्रिब्युसनमा प्रयोग हुन्छ।',
      lines: [['step', <>(c) Y–Δ: step-down · (d) Δ–Y: step-up and distribution.</>]],
      ask: {
        q: 'Star-delta transformer lai star-star sanga parallel kina garna mildaina?',
        voice: 'स्टार डेल्टा ट्रान्सफर्मरलाई स्टार स्टारसँग प्यारालल किन गर्न मिल्दैन?',
        options: ['30° phase shift farak huncha', 'Frequency farak', 'Turns farak'],
        answer: 0,
        why: 'Y–Δ ko output 30° shifted; parallel garda circulating current bagcha.',
      },
    },
  ],
});

/* ── 2.1 Model answer: construction (exam-style; no paper in vault/) ─ */
export const consAnswer21 = answer('Model answer: constructional details of a transformer', {
  draw: coreShellFigure,
  viewBox: '0 0 360 240',
  papers: [],
  marks: '',
  q: 'Describe the constructional details of a single-phase transformer (core type and shell type) and state the recent trends in transformer construction.',
  read: {
    say: 'Exam-style question, kinaki vault ma transformer construction ko past paper chaina: single-phase transformer ko construction, core type ra shell type, ra recent trends.',
    voice: 'एक्जाम स्टाइल क्वेस्चन, किनकि भल्टमा ट्रान्सफर्मर कन्स्ट्रक्सनको पास्ट पेपर छैन — सिंगल फेज ट्रान्सफर्मरको कन्स्ट्रक्सन, कोर टाइप र सेल टाइप, र रिसेन्ट ट्रेन्ड्स।',
  },
  points: [
    {
      carry: [<>Core: laminated silicon steel</>, <>core type / shell type</>],
      node: <><H>(a) Core and windings (Fig. 2.6)</H><Pts items={[<>Core of 0.35–0.5 mm laminated silicon steel (CRGO) to reduce eddy loss</>, <><b>Core type:</b> windings on both limbs · <b>shell type:</b> windings on the centre limb, core surrounds them</>, <>LV winding next to the core, HV outside (less insulation)</>]} /></>,
      say: 'Core 0.35 dekhi 0.5 mm ko laminated silicon steel ko huncha. Core type ma winding dubai limb ma, shell type ma centre limb ma. LV winding core najik, HV bahira.',
      voice: 'कोर जिरो पोइन्ट थ्री फाइभ देखि जिरो पोइन्ट फाइभ मिलिमिटरको ल्यामिनेटेड सिलिकन स्टिलको हुन्छ। कोर टाइपमा वाइन्डिङ दुवै लिम्बमा, सेल टाइपमा सेन्टर लिम्बमा। एल भी वाइन्डिङ कोर नजिक, एच भी बाहिर।',
    },
    {
      page: true,
      node: <><H>(b) Accessories and recent trends</H><Pts items={[<>Tank and transformer oil (cooling, insulation), conservator, breather, bushings, tap changer</>, <>Trends: amorphous-metal cores (very low core loss), cast-resin dry-type units, online monitoring of oil and temperature</>]} /></>,
      say: 'Accessories: tank ra oil, conservator, breather, bushing ra tap changer. Recent trends: amorphous core, cast-resin dry type ra online monitoring.',
      voice: 'एक्सेसरिज — ट्याङ्क र अयल, कन्जर्भेटर, ब्रिदर, बुसिङ र ट्याप चेन्जर। रिसेन्ट ट्रेन्ड्स — एमोर्फस कोर, कास्ट रेजिन ड्राई टाइप, र अनलाइन मनिटरिङ।',
      ask: {
        q: 'LV winding lai core ko najik kina rakhincha?',
        voice: 'एल भी वाइन्डिङलाई कोरको नजिक किन राखिन्छ?',
        options: ['Core ra winding bich insulation kam chahincha', 'Copper loss badhauna', 'Flux ghatauna'],
        answer: 0,
        why: 'LV le core sanga kam voltage farak rakhcha, tesaile insulation sasto.',
      },
    },
  ],
});

/* ── 2.3 Model answer: ideal transformer (2071 Magh) ───────────────── */
export const idealAnswer23 = answer('Model answer: ideal transformer on no load and on load', {
  // Both windings on the no-load point, the load on the load point (rule 74).
  draw: figAt(xfmrFigure, { 0: 0, 1: 1, 2: 1, 3: 1, 4: 2 }),
  viewBox: '0 0 360 230',
  papers: ['2071 Magh'],
  marks: '',
  q: 'Explain the working of an ideal transformer under (i) no-load and (ii) loaded conditions and derive expressions for voltage and current ratios relating to transformer turns ratio.',
  read: {
    say: 'IOE 2071 Magh: ideal transformer ko working no load ra loaded condition ma, ra voltage ra current ratio derive gara.',
    voice: 'आई ओ ई दुई हजार एकहत्तर माघ — आइडियल ट्रान्सफर्मरको वर्किङ नो लोड र लोडेड कन्डिसनमा, र भोल्टेज र करेन्ट रेसियो डेराइभ गर।',
  },
  points: [
    {
      carry: <>(i) <K>{String.raw`V_1/V_2 = N_1/N_2`}</K></>,
      node: <><H>(i) No load</H><Pts items={[<>Ideal: no winding resistance, leakage or core loss; magnetising current I<sub>μ</sub> lags V<sub>1</sub> by 90°</>, <>The same flux links both windings (Fig. 2.1)</>]} /><K>{String.raw`\begin{aligned} e_1 &= N_1\dfrac{d\phi}{dt},\ e_2 = N_2\dfrac{d\phi}{dt} \\ \therefore\ \dfrac{V_1}{V_2} &= \dfrac{E_1}{E_2} = \dfrac{N_1}{N_2} = \dfrac{1}{K} \end{aligned}`}</K></>,
      say: 'No load: ideal transformer ma loss chaina, magnetising current I mu V 1 bhanda 90 degree pachhi. Eutai flux dubai winding ma, tesaile V 1 over V 2 equals N 1 over N 2.',
      voice: 'नो लोड — आइडियल ट्रान्सफर्मरमा लस छैन, म्याग्नेटाइजिङ करेन्ट आई म्यु भी वानभन्दा नब्बे डिग्री पछि। एउटै फ्लक्स दुवै वाइन्डिङमा, त्यसैले भी वान ओभर भी टु इक्वल्स एन वान ओभर एन टु।',
    },
    {
      page: true,
      node: <><H>(ii) On load</H><Pts items={[<>Secondary current I<sub>2</sub> sets up MMF N<sub>2</sub>I<sub>2</sub>; the primary draws I<sub>1</sub> so that N<sub>1</sub>I<sub>1</sub> = N<sub>2</sub>I<sub>2</sub> and the flux is unchanged</>]} /><K>{String.raw`\begin{aligned} V_1I_1 &= V_2I_2 \\ \therefore\ \dfrac{I_1}{I_2} &= \dfrac{N_2}{N_1} = K \end{aligned}`}</K></>,
      say: 'Load ma I 2 ko MMF lai balance garna primary le I 1 linchha, N 1 I 1 equals N 2 I 2. Power barabar, tesaile I 1 over I 2 equals N 2 over N 1 equals K.',
      voice: 'लोडमा आई टुको एम एम एफलाई ब्यालेन्स गर्न प्राइमरीले आई वान लिन्छ — एन वान आई वान इक्वल्स एन टु आई टु। पावर बराबर, त्यसैले आई वान ओभर आई टु इक्वल्स एन टु ओभर एन वान इक्वल्स के।',
      ask: {
        q: 'Ideal transformer ma transformation ratio K equals?',
        voice: 'आइडियल ट्रान्सफर्मरमा ट्रान्सफर्मेसन रेसियो के इक्वल्स?',
        options: ['N2/N1', 'N1/N2', 'I2/I1'],
        answer: 0,
        why: 'K = N2/N1 = V2/V1 = I1/I2.',
      },
    },
  ],
});

/* ── 2.5 Model answer: on load and no load with phasors (2068 Magh Q2a) */
export const loadAnswer25 = answer('Model answer: transformer on no load and load, phasor diagrams', {
  // No-load phasors on point (a), the load phasors on point (b) (rule 74).
  draw: figAt(noLoadFigure, { 0: 0, 1: 1, 2: 1, 3: 1, 4: 2 }),
  viewBox: '0 0 360 230',
  papers: ['2068 Magh'],
  marks: '',
  q: 'Explain the transformer on load and no load with the phasor diagram of resistive and capacitive load.',
  read: {
    say: 'IOE 2068 Magh: transformer no load ra load ma, resistive ra capacitive load ko phasor diagram sahit.',
    voice: 'आई ओ ई दुई हजार अठसट्ठी माघ — ट्रान्सफर्मर नो लोड र लोडमा, रेजिस्टिभ र क्यापासिटिभ लोडको फेजर डायाग्राम सहित।',
  },
  points: [
    {
      carry: <>No load: <K>{String.raw`I_0 = I_w + I_\mu`}</K></>,
      node: <><H>(a) No load (Fig. 2.2)</H><Pts items={[<>Primary draws I<sub>0</sub> (2–5 % of rated): I<sub>w</sub> in phase with V<sub>1</sub> (core loss) and I<sub>μ</sub> along φ (magnetising)</>, <>E<sub>1</sub>, E<sub>2</sub> lag φ by 90°; no-load pf ≈ 0.1–0.2 lagging</>]} /></>,
      say: 'No load ma primary le I 0 linchha: I w core loss ko, V 1 sanga in phase, ra I mu magnetising, flux ko disha ma. E 1 ra E 2 flux bhanda 90 degree pachhi.',
      voice: 'नो लोडमा प्राइमरीले आई जिरो लिन्छ — आई डब्लु कोर लसको, भी वानसँग इन फेज, र आई म्यु म्याग्नेटाइजिङ, फ्लक्सको दिशामा। ई वान र ई टु फ्लक्सभन्दा नब्बे डिग्री पछि।',
    },
    {
      page: true,
      node: <><H>(b) On load</H><Pts items={[<>I<sub>2</sub> flows; the primary adds I<sub>2</sub>′ (= K I<sub>2</sub>) opposite to it: <K>{String.raw`\bar{I}_1 = \bar{I}_0 + \bar{I}_2'`}</K></>, <><b>Resistive:</b> I<sub>2</sub> in phase with V<sub>2</sub> · <b>capacitive:</b> I<sub>2</sub> leads V<sub>2</sub></>, <>Voltage equations: <K>{String.raw`\bar{V}_2 = \bar{E}_2 - \bar{I}_2\bar{Z}_2`}</K>, <K>{String.raw`\bar{V}_1 = -\bar{E}_1 + \bar{I}_1\bar{Z}_1`}</K></>]} /></>,
      say: 'Load ma I 2 bagcha ra primary le I 2 dash thapcha: I 1 equals I 0 plus I 2 dash. Resistive ma I 2 V 2 sanga in phase, capacitive ma lead garcha. V 2 equals E 2 minus I 2 Z 2.',
      voice: 'लोडमा आई टु बग्छ, र प्राइमरीले आई टु ड्यास थप्छ — आई वान इक्वल्स आई जिरो प्लस आई टु ड्यास। रेजिस्टिभमा आई टु, भी टुसँग इन फेज, क्यापासिटिभमा लिड गर्छ। भी टु इक्वल्स ई टु माइनस आई टु जेड टु।',
      ask: {
        q: 'Capacitive load ma V2 E2 bhanda kasto huna sakcha?',
        voice: 'क्यापासिटिभ लोडमा भी टु, ई टुभन्दा कस्तो हुन सक्छ?',
        options: ['Thulo', 'Sadhai sano', 'Sadhai zero'],
        answer: 0,
        why: 'Leading current ko I2X2 drop le V2 lai E2 bhanda badhi banauna sakcha (negative regulation).',
      },
    },
  ],
});

/* ── 2.8 Model answer: voltage regulation (2071 Chaitra) ────────────── */
export const regAnswer28 = answer('Model answer: voltage regulation with an inductive load', {
  // The whole circuit (the shunt branch closes the top wire) and the referred values (rule 74).
  draw: figAt(eqFigure, { 0: 1, 1: 1, 2: 1, 3: 2, 4: 2 }),
  viewBox: '0 0 360 230',
  papers: ['2071 Chaitra'],
  marks: '',
  q: 'Define voltage regulation of a transformer. Derive an expression for voltage regulation if a transformer is loaded with an inductive load.',
  read: {
    say: 'IOE 2071 Chaitra: transformer ko voltage regulation define gara, ra inductive load ma regulation ko expression derive gara.',
    voice: 'आई ओ ई दुई हजार एकहत्तर चैत — ट्रान्सफर्मरको भोल्टेज रेगुलेसन डिफाइन गर, र इन्डक्टिभ लोडमा रेगुलेसनको एक्स्प्रेसन डेराइभ गर।',
  },
  points: [
    {
      carry: <>Reg = (E<sub>2</sub> − V<sub>2</sub>)/V<sub>2</sub></>,
      node: <><H>(a) Definition</H><Pts items={[<>Voltage regulation is the change in secondary terminal voltage from no load to full load, as a fraction of the full-load voltage, with the primary voltage constant</>]} /><K>{String.raw`\%\,\text{Reg} = \dfrac{E_2 - V_2}{V_2}\times 100 \qquad \cdots(1)`}</K></>,
      say: 'Primary voltage constant rakhda no load bata full load samma secondary voltage ko parivartan, full load voltage ko bhag ma: regulation equals E 2 minus V 2 over V 2.',
      voice: 'प्राइमरी भोल्टेज कन्स्टेन्ट राख्दा, नो लोडबाट फुल लोडसम्म सेकेन्डरी भोल्टेजको परिवर्तन, फुल लोड भोल्टेजको भागमा — रेगुलेसन इक्वल्स ई टु माइनस भी टु ओभर भी टु।',
    },
    {
      page: true,
      node: <><H>(b) Inductive (lagging) load</H><Pts items={[<>Referred to the secondary: R<sub>02</sub>, X<sub>02</sub>; I<sub>2</sub> lags V<sub>2</sub> by φ</>]} /><K>{String.raw`\begin{aligned} E_2 &\approx V_2 + I_2R_{02}\cos\phi + I_2X_{02}\sin\phi && \cdots(2) \\ \therefore\ \%\,\text{Reg} &= \dfrac{I_2R_{02}\cos\phi + I_2X_{02}\sin\phi}{V_2}\times100 && \cdots(3) \end{aligned}`}</K></>,
      say: 'Secondary ma refer garda R 02 ra X 02. Lagging load ko phasor bata E 2 lagbhag V 2 plus I 2 R 02 cos phi plus I 2 X 02 sin phi. Tesaile percent regulation equals I 2 R 02 cos phi plus I 2 X 02 sin phi, over V 2, times 100.',
      voice: 'सेकेन्डरीमा रेफर गर्दा आर जिरो टु र एक्स जिरो टु। ल्यागिङ लोडको फेजरबाट, ई टु लगभग भी टु प्लस आई टु आर जिरो टु कस फाइ, प्लस आई टु एक्स जिरो टु साइन फाइ। त्यसैले प्रतिशत रेगुलेसन, इक्वल्स आई टु आर जिरो टु कस फाइ प्लस आई टु एक्स जिरो टु साइन फाइ, ओभर भी टु, टाइम्स सय।',
      ask: {
        q: 'Leading pf load ma regulation ko formula ma sin phi term ko chinha kasto huncha?',
        voice: 'लिडिङ पी एफ लोडमा रेगुलेसनको फर्मुलामा साइन फाइ टर्मको चिन्ह कस्तो हुन्छ?',
        options: ['Minus', 'Plus', 'Hataincha'],
        answer: 0,
        why: 'Leading load ma I2X02 sinφ ghataincha; regulation negative huna sakcha.',
      },
    },
  ],
});

/* ── 2.13 Model answer: three-phase connections (2075 Baisakh Q2a) ── */
export const threeAnswer213 = answer('Model answer: three-phase transformer connections and applications', {
  // Panels (a), (b) on part (a), (c), (d) on part (b): none left empty (rule 74).
  draw: figAt(threePhaseFigure, { 0: 1, 1: 1, 2: 2, 3: 2 }),
  viewBox: '0 0 360 236',
  papers: ['2075 Baisakh'],
  marks: '',
  q: 'Explain the different three phase transformer connections with neat sketch. Write their application also.',
  read: {
    say: 'IOE 2075 Baisakh: three phase transformer ka connection sketch sahit, ra tinko application.',
    voice: 'आई ओ ई दुई हजार पचहत्तर बैशाख — थ्री फेज ट्रान्सफर्मरका कनेक्सन स्केच सहित, र तिनको एप्लिकेसन।',
  },
  points: [
    {
      carry: [<>(a) Y–Y</>, <>(b) Δ–Δ</>],
      node: <><H>(a) Star–star and delta–delta (Fig. 2.7)</H><Pts items={[<><b>Y–Y:</b> phase voltage V<sub>L</sub>/√3 (less insulation), neutral available; trouble with unbalanced load and third harmonics. Use: small high-voltage units</>, <><b>Δ–Δ:</b> no phase shift; can run as open delta at 57.7 % rating if one unit fails. Use: low-voltage, large-current loads</>]} /></>,
      say: 'Star-star: phase voltage V L over root three, insulation kam, neutral milcha; unbalanced load ma samasya. Delta-delta: phase shift chaina, euta unit bigriye open delta ma 57.7 percent rating ma chalcha.',
      voice: 'स्टार स्टार — फेज भोल्टेज भी एल ओभर रुट थ्री, इन्सुलेसन कम, न्युट्रल मिल्छ। अनब्यालेन्स्ड लोडमा समस्या। डेल्टा डेल्टा — फेज सिफ्ट छैन, एउटा युनिट बिग्रिए ओपन डेल्टामा सन्ताउन्न दशमलव सात प्रतिशत रेटिङमा चल्छ।',
    },
    {
      page: true,
      node: <><H>(b) Star–delta and delta–star</H><Pts items={[<><b>Y–Δ:</b> 30° phase shift; no third-harmonic trouble. Use: step-down at the receiving end of transmission lines</>, <><b>Δ–Y:</b> 30° shift; star secondary gives a neutral for 3-phase 4-wire supply. Use: step-up at generating stations and distribution transformers</>]} /></>,
      say: 'Star-delta: 30 degree phase shift, transmission line ko receiving end ma step-down. Delta-star: 30 degree shift, secondary star ma neutral milcha; generating station ma step-up ra distribution ma.',
      voice: 'स्टार डेल्टा — तीस डिग्री फेज सिफ्ट, ट्रान्समिसन लाइनको रिसिभिङ एन्डमा स्टेप डाउन। डेल्टा स्टार — तीस डिग्री सिफ्ट, सेकेन्डरी स्टारमा न्युट्रल मिल्छ। जेनेरेटिङ स्टेसनमा स्टेप अप, र डिस्ट्रिब्युसनमा।',
      ask: {
        q: 'Open delta ma transformer bank kati percent rating ma chalna sakcha?',
        voice: 'ओपन डेल्टामा ट्रान्सफर्मर बैंक कति प्रतिशत रेटिङमा चल्न सक्छ?',
        options: ['57.7 %', '66.7 %', '100 %'],
        answer: 0,
        why: 'Open delta capacity = 1/√3 = 57.7 % of the original delta–delta rating.',
      },
    },
  ],
});

// One topic per IOE syllabus bullet of Unit 2 (rule 68).
const t21 = topic({ num: '2.1', title: 'Constructional Details, recent trends', opener: basicsCons21, derive: [cons21], picture: [consAnswer21] });
const t22 = topic({ num: '2.2', title: 'Working principle and EMF equation', opener: basics21, derive: [principle21, emf21], picture: [emfAnswer21] });
const t23 = topic({ num: '2.3', title: 'Ideal Transformer', opener: basicsIdeal23, derive: [ideal23], picture: [idealAnswer23] });
const t24 = topic({ num: '2.4', title: 'No load and load Operation', opener: basics22, derive: [noLoad22, onLoad22], picture: [fluxAnswer22] });
const t25 = topic({ num: '2.5', title: 'Operation of Transformer with load', opener: basicsLoad25, derive: [load25], picture: [loadAnswer25] });
const t26 = topic({ num: '2.6', title: 'Equivalent Circuits and Phasor Diagram', opener: basicsEq26, derive: [eqCircuit23], picture: [referAnswer23] });
const t27 = topic({ num: '2.7', title: 'Tests: Polarity Test, Open Circuit test, Short Circuit test and Equivalent Circuit Parameters', opener: basicsTests27, derive: [polarity27, tests23], picture: [ocscSolve23] });
const t28 = topic({ num: '2.8', title: 'Voltage Regulation', opener: basicsReg28, derive: [reg24], picture: [regAnswer28] });
const t29 = topic({ num: '2.9', title: 'Losses in a transformer', opener: basics23, derive: [losses29], picture: [lossAnswer24] });
const t210 = topic({ num: '2.10', title: 'Efficiency, condition for maximum efficiency and all day efficiency', opener: basics24, derive: [eff24, allDay210], picture: [effSolve24] });
const t211 = topic({ num: '2.11', title: 'Instrument Transformers: Potential Transformer (PT) and Current Transformer (CT)', opener: basicsInst211, derive: [special25], picture: [ctAnswer25] });
const t212 = topic({ num: '2.12', title: 'Auto transformer: construction, working principle and Cu saving', opener: basics25, derive: [auto25], picture: [autoAnswer25] });
const t213 = topic({ num: '2.13', title: 'Three phase Transformers', opener: basicsThree213, derive: [three213], picture: [threeAnswer213] });

export const unit2 = {
  topics: [t21, t22, t23, t24, t25, t26, t27, t28, t29, t210, t211, t212, t213],
  summary: [
    <>Mutual induction: E = 4.44 fNΦ<sub>m</sub>, E<sub>2</sub>/E<sub>1</sub> = N<sub>2</sub>/N<sub>1</sub> = K; frequency badlindaina.</>,
    <>No load: I<sub>0</sub> = √(I<sub>w</sub>² + I<sub>μ</sub>²). Load ma N<sub>1</sub>I<sub>2</sub>′ = N<sub>2</sub>I<sub>2</sub>, flux constant.</>,
    <>Equivalent circuit: R<sub>01</sub> = R<sub>1</sub> + R<sub>2</sub>/K²; OC test → R<sub>0</sub>, X<sub>0</sub> (core loss); SC test → R<sub>01</sub>, X<sub>01</sub> (Cu loss).</>,
    <>Regulation ≈ (IR cosφ ± IX sinφ)/V; η maximum when P<sub>cu</sub> = P<sub>i</sub>, at x = √(P<sub>i</sub>/P<sub>cu,fl</sub>).</>,
    <>Auto transformer: W<sub>a</sub> = (1 − K)W<sub>tw</sub>. CT secondary kahile open nagarne. Three-phase: Y/Δ connections.</>,
  ],
};
