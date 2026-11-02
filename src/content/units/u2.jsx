import { C, K, Pts, answer, duo, figAt, solve, topic } from '../video/kit.jsx';
import { Cap, CoilV, ResH, T, W, head } from '../unit4/figs.jsx';
import { transformerTour } from '../machines/models3d.js';

/*
  Unit 2 Transformer (IOE syllabus).
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
export const basics21 = duo('2.1 · Basic understanding: how does a transformer change voltage?', {
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
      lines: [['h', <>2.1 · Transformer le voltage kasari badalcha?</>], ['step', <>Charger, pole ko box: sabai ma transformer</>]],
    },
    {
      say: 'Bich ma patla falam ko pata thupareko core. Yahi falam magnet ko bato ho.',
      voice: 'बीचमा पातलो फलामको पाता थुपारेको कोर। यही फलाम म्याग्नेटको बाटो हो।',
      lines: [['step', <>Core: patla falam ko pata, magnet ko bato</>]],
    },
    {
      say: 'Euta coil AC supply ma jodincha: primary coil. AC current ulto-sulto bagcha.',
      voice: 'एउटा कोइल ए सी सप्लाईमा जोडिन्छ — प्राइमरी कोइल। ए सी करेन्ट उल्टो सुल्टो बग्छ।',
      lines: [['step', <>Primary coil: AC supply ma</>]],
    },
    {
      say: 'Tyo current le core ma flux banaucha, ra flux pani ulto-sulto badlirahancha.',
      voice: 'त्यो करेन्टले कोरमा फ्लक्स बनाउँछ, र फ्लक्स पनि उल्टो सुल्टो बदलिरहन्छ।',
      lines: [['step', <>Badlirahne flux core bhari ghumcha</>]],
    },
    {
      say: 'Arko coil le tyo badlirahne flux paucha ra yasma bijuli aaucha. Dui coil chhuidainan, tara bulb balcha!',
      voice: 'अर्को कोइलले त्यो बदलिरहने फ्लक्स पाउँछ, र यसमा बिजुली आउँछ। दुई कोइल छुँदैनन्, तर बल्ब बल्छ!',
      lines: [['step', <>Secondary coil: nachhoi bijuli aaucha</>]],
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
      lines: [['step', <>Dherai pheri → dherai voltage (step-up / step-down)</>]],
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
      lines: [['h', <>2.1 · The transformer</>], ['step', <>A static device: AC power from one circuit to another at the same frequency</>]],
    },
    {
      say: 'Core silicon steel ko laminations bata baneko huncha, flux lai low reluctance path dina.',
      voice: 'कोर सिलिकन स्टिलको ल्यामिनेसन्सबाट बनेको हुन्छ, फ्लक्सलाई लो रिलक्टेन्स पाथ दिन।',
      lines: [['step', <>Core: laminated silicon steel, a low-reluctance path</>]],
    },
    {
      say: 'Supply sanga jodiyeko winding primary winding ho; yasma alternating current bagcha.',
      voice: 'सप्लाईसँग जोडिएको वाइन्डिङ प्राइमरी वाइन्डिङ हो, यसमा अल्टरनेटिङ करेन्ट बग्छ।',
      lines: [['step', <>Primary winding: connected to the AC supply</>]],
    },
    {
      say: 'Primary current le core ma alternating flux set up garcha.',
      voice: 'प्राइमरी करेन्टले कोरमा अल्टरनेटिङ फ्लक्स सेट अप गर्छ।',
      lines: [['step', <>Alternating flux set up in the core</>]],
    },
    {
      say: 'Yo flux secondary winding sanga link huncha, ra mutual induction le secondary ma EMF induce huncha.',
      voice: 'यो फ्लक्स सेकेन्डरी वाइन्डिङसँग लिङ्क हुन्छ, र म्युचुअल इन्डक्सनले सेकेन्डरीमा ई एम एफ इन्ड्युस हुन्छ।',
      lines: [['step', <>Mutual induction: EMF induced in the secondary</>]],
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

export const principle21 = duo('Construction and working principle of a transformer', {
  draw: xfmrFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Figure 2.1: laminated silicon steel ko core. Lamination le eddy loss, silicon steel le hysteresis loss ghataucha.',
      voice: 'फिगर टु पोइन्ट वान — ल्यामिनेटेड सिलिकन स्टिलको कोर। ल्यामिनेसनले एडी लस, सिलिकन स्टिलले हिस्टेरेसिस लस घटाउँछ।',
      lines: [['h', <>Construction</>], ['step', <>Core: laminated silicon steel (CRGO); core type and shell type</>]],
    },
    {
      say: 'Primary winding N 1 turns, supply V 1 ma. Copper winding, enamel le insulated.',
      voice: 'प्राइमरी वाइन्डिङ एन वान टर्न्स, सप्लाई भी वानमा। कपर वाइन्डिङ, इनामेलले इन्सुलेटेड।',
      lines: [['step', <>Primary N<sub>1</sub> on V<sub>1</sub>; secondary N<sub>2</sub> to the load; copper, insulated</>]],
    },
    {
      say: 'V 1 le magnetising current pathaucha, ra core ma alternating flux phi m banaucha.',
      voice: 'भी वानले म्याग्नेटाइजिङ करेन्ट पठाउँछ, र कोरमा अल्टरनेटिङ फ्लक्स फाइ एम बनाउँछ।',
      lines: [['eq', tex(String.raw`\Phi = \Phi_m \sin \omega t`)]],
    },
    {
      say: 'Yo flux dubai winding sanga link huncha. Secondary ma mutual induction le E 2 induce huncha, ani load ma current.',
      voice: 'यो फ्लक्स दुवै वाइन्डिङसँग लिङ्क हुन्छ। सेकेन्डरीमा म्युचुअल इन्डक्सनले ई टु इन्ड्युस हुन्छ, अनि लोडमा करेन्ट।',
      lines: [['step', <>Mutual induction: <K>{String.raw`e_2 = -N_2\,d\Phi/dt`}</K> → load current</>]],
      ask: {
        q: 'Transformer DC ma kina chaldaina?',
        voice: 'ट्रान्सफर्मर डी सीमा किन चल्दैन?',
        options: ['DC le flux badaldaina', 'DC ko voltage kam huncha', 'Core paglincha'],
        answer: 0,
        why: 'Constant flux ma dΦ/dt = 0, tesaile secondary ma EMF aaudaina.',
      },
    },
    {
      say: 'Thulo transformer ma conservator, breather, tank, oil ra bushings pani hunchan. Naya trend: amorphous core ra dry type.',
      voice: 'ठूलो ट्रान्सफर्मरमा कन्जर्भेटर, ब्रिदर, ट्याङ्क, आयल, र बुसिङ्स पनि हुन्छन्। नयाँ ट्रेन्ड — एमोर्फस कोर र ड्राई टाइप।',
      lines: [['idea', <>Tank, oil, conservator, breather, bushings · trends: amorphous core, dry-type, smart monitoring</>]],
    },
  ],
  lecturer: [
    {
      say: 'Construction: the core is built of laminated silicon steel, in core type or shell type, Figure 2.1.',
      voice: 'कन्स्ट्रक्सन — द कोर इज बिल्ट अफ ल्यामिनेटेड सिलिकन स्टिल, इन कोर टाइप अर सेल टाइप, फिगर टु पोइन्ट वान।',
      lines: [['h', <>Construction and working principle</>], ['step', <>Core: laminated silicon steel; core type or shell type</>]],
    },
    {
      say: 'The primary winding of N 1 turns is connected to V 1, and the secondary of N 2 turns to the load.',
      voice: 'द प्राइमरी वाइन्डिङ अफ एन वान टर्न्स इज कनेक्टेड टु भी वान, एन्ड द सेकेन्डरी अफ एन टु टर्न्स टु द लोड।',
      lines: [['step', <>Primary N<sub>1</sub> on V<sub>1</sub>; secondary N<sub>2</sub> to the load</>]],
    },
    {
      say: 'Working: V 1 drives a magnetising current that sets up an alternating flux phi m sin omega t.',
      voice: 'वर्किङ — भी वान ड्राइभ्स अ म्याग्नेटाइजिङ करेन्ट दयाट सेट्स अप एन अल्टरनेटिङ फ्लक्स फाइ एम साइन ओमेगा टी।',
      lines: [['eq', tex(String.raw`\Phi = \Phi_m \sin \omega t`)]],
    },
    {
      say: 'The flux links the secondary; by mutual induction an EMF e 2 is induced and current flows in the load.',
      voice: 'द फ्लक्स लिङ्क्स द सेकेन्डरी, बाइ म्युचुअल इन्डक्सन एन ई एम एफ ई टु इज इन्ड्युस्ड एन्ड करेन्ट फ्लोज इन द लोड।',
      lines: [['step', <>Mutual induction: <K>{String.raw`e_2 = -N_2\,d\Phi/dt`}</K></>]],
      ask: {
        q: 'Transformer le kun quantity badaldaina?',
        voice: 'ट्रान्सफर्मरले कुन क्वान्टिटी बदल्दैन?',
        options: ['Frequency', 'Voltage', 'Current'],
        answer: 0,
        why: 'Secondary ko EMF ko frequency flux ko jastai, supply ko frequency nai.',
      },
    },
    {
      say: 'Accessories: tank, oil, conservator, breather and bushings. Recent trends: amorphous cores and dry-type units.',
      voice: 'एक्सेसोरिज — ट्याङ्क, आयल, कन्जर्भेटर, ब्रिदर, एन्ड बुसिङ्स। रिसेन्ट ट्रेन्ड्स — एमोर्फस कोर्स एन्ड ड्राई टाइप युनिट्स।',
      lines: [['step', <><Pts items={[<>Accessories: tank, oil, conservator, breather, bushings</>, <>Trends: amorphous cores, dry-type, on-line monitoring</>]} /></>]],
    },
  ],
});

export const emf21 = duo('Derivation: EMF equation of a transformer', {
  draw: xfmrFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Flux phi equals phi m sin omega t. Primary ma N 1 turns cha.',
      voice: 'फ्लक्स फाइ इक्वल्स फाइ एम साइन ओमेगा टी। प्राइमरीमा एन वान टर्न्स छ।',
      lines: [['h', <>EMF equation</>], ['eq', tex(String.raw`\Phi = \Phi_m \sin \omega t`)]],
    },
    {
      say: 'Faraday: e 1 equals minus N 1 d phi by d t. Differentiate garda cos aaucha.',
      voice: 'फाराडे — ई वान इक्वल्स माइनस एन वान डी फाइ बाइ डी टी। डिफरेन्सियट गर्दा कस आउँछ।',
      lines: [['eq', tex(String.raw`\begin{aligned} e_1 &= -N_1\dfrac{d\Phi}{dt} \\ &= -N_1\omega\Phi_m\cos\omega t \end{aligned}`)]],
    },
    {
      say: 'Maximum value N 1 omega phi m, ra omega equals 2 pi f. RMS chai maximum over root 2.',
      voice: 'म्याक्सिमम भ्यालु एन वान ओमेगा फाइ एम, र ओमेगा इक्वल्स टु पाइ एफ। आर एम एस चाहिँ म्याक्सिमम ओभर रुट टु।',
      lines: [['eq', tex(String.raw`\begin{aligned} E_{1m} &= N_1 (2\pi f)\Phi_m \\ E_1 &= \dfrac{E_{1m}}{\sqrt 2} \end{aligned}`)]],
    },
    {
      say: '2 pi over root 2 equals 4.44. Tesaile E 1 equals 4.44 f N 1 phi m. Secondary ko lagi N 2.',
      voice: 'टु पाइ ओभर रुट टु इक्वल्स फोर पोइन्ट फोर फोर। त्यसैले ई वान इक्वल्स फोर पोइन्ट फोर फोर एफ एन वान फाइ एम। सेकेन्डरीको लागि एन टु।',
      lines: [['eq', tex(String.raw`\boxed{E_1 = 4.44 f N_1 \Phi_m}, \quad \boxed{E_2 = 4.44 f N_2 \Phi_m}`)]],
      ask: {
        q: 'Frequency dobar garda, eutai voltage ko lagi flux kati chahincha?',
        voice: 'फ्रिक्वेन्सी दोब्बर गर्दा, एउटै भोल्टेजको लागि फ्लक्स कति चाहिन्छ?',
        options: ['Aadha', 'Dobar', 'Ustai'],
        answer: 0,
        why: 'E = 4.44 f N Φm: f dobar, eutai E ko lagi Φm aadha.',
      },
    },
    {
      say: 'Duita equation bhag garda: E 2 over E 1 equals N 2 over N 1 equals K, transformation ratio.',
      voice: 'दुईटा इक्वेसन भाग गर्दा — ई टु ओभर ई वान इक्वल्स एन टु ओभर एन वान इक्वल्स के, ट्रान्सफर्मेसन रेसियो।',
      lines: [['idea', <>Turns ratio: <K>{String.raw`\begin{aligned} \dfrac{E_2}{E_1} &= \dfrac{N_2}{N_1} \\ &= K \end{aligned}`}</K>; K &gt; 1 step-up, K &lt; 1 step-down</>]],
    },
  ],
  lecturer: [
    {
      say: 'Let the flux be phi m sin omega t, linking N 1 primary turns.',
      voice: 'लेट द फ्लक्स बी फाइ एम साइन ओमेगा टी, लिङ्किङ एन वान प्राइमरी टर्न्स।',
      lines: [['h', <>EMF equation of a transformer</>], ['eq', tex(String.raw`\Phi = \Phi_m \sin \omega t`)]],
    },
    {
      say: 'By Faraday’s law, e 1 equals minus N 1 omega phi m cos omega t.',
      voice: 'बाइ फाराडेज ल, ई वान इक्वल्स माइनस एन वान ओमेगा फाइ एम कस ओमेगा टी।',
      lines: [['eq', tex(String.raw`\begin{aligned} e_1 &= -N_1\dfrac{d\Phi}{dt} \\ &= -N_1\omega\Phi_m\cos\omega t \end{aligned}`)]],
    },
    {
      say: 'The maximum is 2 pi f N 1 phi m, and the RMS value is the maximum over root two.',
      voice: 'द म्याक्सिमम इज टु पाइ एफ एन वान फाइ एम, एन्ड द आर एम एस भ्यालु इज द म्याक्सिमम ओभर रुट टु।',
      lines: [['eq', tex(String.raw`\begin{aligned} E_{1m} &= N_1 (2\pi f)\Phi_m \\ E_1 &= \dfrac{E_{1m}}{\sqrt 2} \end{aligned}`)]],
    },
    {
      say: 'Hence E 1 equals 4.44 f N 1 phi m, and similarly E 2 equals 4.44 f N 2 phi m.',
      voice: 'हेन्स ई वान इक्वल्स फोर पोइन्ट फोर फोर एफ एन वान फाइ एम, एन्ड सिमिलर्ली ई टु इक्वल्स फोर पोइन्ट फोर फोर एफ एन टु फाइ एम।',
      lines: [['eq', tex(String.raw`\boxed{E_1 = 4.44 f N_1 \Phi_m}, \quad \boxed{E_2 = 4.44 f N_2 \Phi_m}`)]],
      ask: {
        q: 'EMF equation ma 4.44 kasari aaucha?',
        voice: 'ई एम एफ इक्वेसनमा फोर पोइन्ट फोर फोर कसरी आउँछ?',
        options: ['2π/√2', '√2 × π', '2/π'],
        answer: 0,
        why: 'E rms = 2πfNΦm/√2 = 4.44 fNΦm.',
      },
    },
    {
      say: 'Dividing, E 2 over E 1 equals N 2 over N 1 equals K, the transformation ratio.',
      voice: 'डिभाइडिङ, ई टु ओभर ई वान इक्वल्स एन टु ओभर एन वान इक्वल्स के, द ट्रान्सफर्मेसन रेसियो।',
      lines: [['step', <>Transformation ratio <K>{String.raw`\begin{aligned} K &= \dfrac{E_2}{E_1} \\ &= \dfrac{N_2}{N_1} \end{aligned}`}</K>; K &gt; 1 step-up, K &lt; 1 step-down</>]],
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
export const basics22 = duo('2.2 · Basic understanding: what happens when a transformer is loaded?', {
  three: transformerTour([
    { shot: 'whole', show: FED, focus: ['core', 'primary', 'secondary'], labels: [['ideal: kei loss chaina', [0, 2.3, 0.6]]] },
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
      lines: [['h', <>2.2 · Load lagauda k huncha?</>], ['step', <>Ideal: kunai loss chaina, sabai flux dubai coil ma</>]],
    },
    {
      say: 'Secondary ma kei jodeko chaina. Tara pani primary le sano current lincha.',
      voice: 'सेकेन्डरीमा केही जोडेको छैन। तर पनि प्राइमरीले सानो करेन्ट लिन्छ।',
      lines: [['step', <>No load: primary ma sano current</>]],
    },
    {
      say: 'Tyo sano current ko kaam core ma flux banaunu matra ho. Yahi no-load current.',
      voice: 'त्यो सानो करेन्टको काम कोरमा फ्लक्स बनाउनु मात्र हो। यही नो लोड करेन्ट।',
      lines: [['step', <>Sano current → flux banaune matra (no-load current)</>]],
    },
    {
      say: 'Aba bulb jodau. Secondary ma current bagcha, bulb balcha.',
      voice: 'अब बल्ब जोडौं। सेकेन्डरीमा करेन्ट बग्छ, बल्ब बल्छ।',
      lines: [['step', <>Load jodyo → secondary current</>]],
    },
    {
      say: 'Ani primary le aafai badhi current tancha, kasaile nabhani. Kina?',
      voice: 'अनि प्राइमरीले आफैं बढी करेन्ट तान्छ, कसैले नभनी। किन?',
      lines: [['step', <>Primary current aafai badhcha</>]],
    },
    {
      say: 'Secondary current le ulto magnet banaucha. Primary ko thap current le tyo ulto magnet cancel garcha, tesaile core ko flux ustai rahancha.',
      voice: 'सेकेन्डरी करेन्टले उल्टो म्याग्नेट बनाउँछ। प्राइमरीको थप करेन्टले त्यो उल्टो म्याग्नेट क्यान्सिल गर्छ, त्यसैले कोरको फ्लक्स उस्तै रहन्छ।',
      lines: [['step', <>Secondary ko ulto magnet ↔ primary ko thap current → flux ustai</>]],
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
      lines: [['step', <>Load ↑ → primary power ↑: aafai milaucha</>]],
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
      lines: [['h', <>2.2 · No load and on load</>], ['step', <>Ideal: no resistance, no leakage, no core loss</>]],
    },
    {
      say: 'Secondary open huda primary le no-load current matra lincha.',
      voice: 'सेकेन्डरी ओपन हुँदा प्राइमरीले नो लोड करेन्ट मात्र लिन्छ।',
      lines: [['step', <>Secondary open: primary draws only the no-load current</>]],
    },
    {
      say: 'No-load current le core lai magnetise garcha ra mutual flux set up garcha.',
      voice: 'नो लोड करेन्टले कोरलाई म्याग्नेटाइज गर्छ, र म्युचुअल फ्लक्स सेट अप गर्छ।',
      lines: [['step', <>No-load current magnetises the core (mutual flux)</>]],
    },
    {
      say: 'Load connect garda secondary current I 2 bagcha.',
      voice: 'लोड कनेक्ट गर्दा सेकेन्डरी करेन्ट आई टु बग्छ।',
      lines: [['step', <>Load connected: secondary current I<sub>2</sub> flows</>]],
    },
    {
      say: 'Primary le thap load component current automatically draw garcha.',
      voice: 'प्राइमरीले थप लोड कम्पोनेन्ट करेन्ट अटोम्याटिकल्ली ड्र गर्छ।',
      lines: [['step', <>The primary draws an extra load component automatically</>]],
    },
    {
      say: 'Secondary MMF le core flux ghataune prayas garcha; primary ko load component ko MMF le tyo balance garcha, ra flux constant rahancha.',
      voice: 'सेकेन्डरी एम एम एफले कोर फ्लक्स घटाउने प्रयास गर्छ, प्राइमरीको लोड कम्पोनेन्टको एम एम एफले त्यो ब्यालेन्स गर्छ, र फ्लक्स कन्स्टेन्ट रहन्छ।',
      lines: [['step', <>Secondary MMF balanced by primary load MMF → constant flux</>]],
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
        voice: 'नो लोड करेन्टको कुन कम्पोनेन्टले फ्लक्स बनाउँछ?',
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
export const basics23 = duo('2.3 · Basic understanding: what does a real transformer lose?', {
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
      lines: [['h', <>2.3 · Real transformer ma k-k harauncha?</>], ['step', <>Real: kehi bijuli bato mai harauncha</>]],
    },
    {
      say: 'Tama ko tar ma pani resistance huncha, current bagda tar taato huncha.',
      voice: 'तामाको तारमा पनि रेजिस्टेन्स हुन्छ, करेन्ट बग्दा तार तातो हुन्छ।',
      lines: [['step', <>Tar ko resistance → taato</>]],
    },
    {
      say: 'Sabai flux arko coil samma pugdaina; kehi flux coil ko bahira chuhincha. Yo chuheko flux pani bato rokcha.',
      voice: 'सबै फ्लक्स अर्को कोइलसम्म पुग्दैन, केही फ्लक्स कोइलको बाहिर चुहिन्छ। यो चुहेको फ्लक्स पनि बाटो रोक्छ।',
      lines: [['step', <>Chuheko flux (leakage) → voltage ghatcha</>]],
    },
    {
      say: 'Core pani taato huncha, ra flux banauna sano current sadhai chahincha.',
      voice: 'कोर पनि तातो हुन्छ, र फ्लक्स बनाउन सानो करेन्ट सधैं चाहिन्छ।',
      lines: [['step', <>Core taato + flux ko current sadhai</>]],
    },
    {
      say: 'Engineer haru yo sabai lai kagaj ma resistance ra coil ko sano circuit jasto kornchan: yahi equivalent circuit.',
      voice: 'इन्जिनियरहरू यो सबैलाई कागजमा रेजिस्टेन्स र कोइलको सानो सर्किट जस्तो कोर्छन् — यही इक्विभ्यालेन्ट सर्किट।',
      lines: [['step', <>Sabai loss → kagaj ko sano circuit (equivalent circuit)</>]],
    },
    {
      say: 'Pahilo test: secondary khulla rakhera pura voltage dine. Current sano, tar taato hudaina; naapeko loss sabai core ko.',
      voice: 'पहिलो टेस्ट — सेकेन्डरी खुल्ला राखेर पूरा भोल्टेज दिने। करेन्ट सानो, तार तातो हुँदैन, नापेको लस सबै कोरको।',
      lines: [['step', <>Secondary khulla, pura voltage → core ko loss (OC test)</>]],
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
      lines: [['step', <>Secondary short, sano voltage → tar ko loss (SC test)</>]],
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
      lines: [['h', <>2.3 · The practical transformer</>], ['step', <>Resistance, leakage flux and core loss</>]],
    },
    {
      say: 'Winding resistance R 1 ra R 2 ma copper loss huncha.',
      voice: 'वाइन्डिङ रेजिस्टेन्स आर वान र आर टु मा कपर लस हुन्छ।',
      lines: [['step', <>Winding resistances → copper loss</>]],
    },
    {
      say: 'Leakage flux le leakage reactance X 1 ra X 2 dincha.',
      voice: 'लिकेज फ्लक्सले लिकेज रियाक्टेन्स एक्स वान र एक्स टु दिन्छ।',
      lines: [['step', <>Leakage flux → leakage reactances</>]],
    },
    {
      say: 'Core loss ra magnetising current lai shunt branch R 0 ra X 0 le represent garincha.',
      voice: 'कोर लस र म्याग्नेटाइजिङ करेन्टलाई सन्ट ब्रान्च आर जिरो र एक्स जिरोले रिप्रिजेन्ट गरिन्छ।',
      lines: [['step', <>Core loss and magnetising current → shunt branch</>]],
    },
    {
      say: 'Yi sabai elements milayera banaeko circuit nai equivalent circuit ho.',
      voice: 'यी सबै एलिमेन्ट्स मिलाएर बनाएको सर्किट नै इक्विभ्यालेन्ट सर्किट हो।',
      lines: [['step', <>All elements together: the equivalent circuit</>]],
    },
    {
      say: 'Open circuit test: secondary open, rated voltage; reading le core loss ra shunt branch dincha.',
      voice: 'ओपन सर्किट टेस्ट — सेकेन्डरी ओपन, रेटेड भोल्टेज, रिडिङले कोर लस र सन्ट ब्रान्च दिन्छ।',
      lines: [['step', <>OC test: rated voltage, secondary open → core loss, shunt branch</>]],
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
      lines: [['step', <>SC test: low voltage, rated current → copper loss, series parameters</>]],
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
      say: 'cos phi 0 equals 80 over 200, 0.4. I w equals 0.32 ampere, I mu equals 0.7332 ampere.',
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
export const basics24 = duo('2.4 · Basic understanding: how efficient is a transformer?', {
  three: transformerTour([
    { shot: 'load', show: LOADED, flux: 1, flow: 0.4, flow2: 0.4, focus: ['lamp'], labels: [['halka load', 'lamp']] },
    { flow: 1, flow2: 1, focus: ['lamp', 'secondary'], labels: [['voltage ali jharyo', 'lamp']] },
    { shot: 'core', heat: { core: 0.6 }, focus: ['core'], labels: [['core: sadhai eutai', 'core']] },
    { shot: 'whole', heat: { core: 0.6, primary: 0.8, secondary: 0.8 }, focus: ['primary', 'secondary'], labels: [['tar: load sanga badhcha', 'secondary']] },
    { shot: 'whole', focus: null, labels: [['aaune vs jane', [0, 2.3, 0.6]]] },
    { heat: { core: 0.6, primary: 0.6, secondary: 0.6 }, focus: ['core', 'primary'], labels: [['dubai barabar: best', [0, 2.3, 0.6]]] },
    { shot: 'tank', show: [...LOADED, 'tank', 'bushings'], flow: 0.3, flow2: 0.3, heat: { core: 0.6 }, focus: ['tank'], labels: [['24 ghanta on', 'tank']] },
    { shot: 'whole', show: LOADED, heat: {}, focus: null },
  ]),
  tutor: [
    {
      say: 'Ghar ko pole transformer ma beluka sabai ko batti balcha. Halka load ma bulb ko voltage thik cha.',
      voice: 'घरको पोल ट्रान्सफर्मरमा बेलुका सबैको बत्ती बल्छ। हल्का लोडमा बल्बको भोल्टेज ठिक छ।',
      lines: [['h', <>2.4 · Transformer kati ramro kaam garcha?</>], ['step', <>Halka load: voltage thik</>]],
    },
    {
      say: 'Load dherai bhayo bhane secondary ko voltage alikati jharcha. Kati jharyo bhanne naap: regulation.',
      voice: 'लोड धेरै भयो भने सेकेन्डरीको भोल्टेज अलिकति झर्छ। कति झर्‍यो भन्ने नाप — रेगुलेसन।',
      lines: [['step', <>Load dherai → voltage ali jharcha (regulation)</>]],
    },
    {
      say: 'Core ko taato load jati bhaye pani lagbhag eutai: sadhai eutai loss.',
      voice: 'कोरको तातो लोड जति भए पनि लगभग एउटै — सधैं एउटै लस।',
      lines: [['step', <>Core loss: load sanga badlindaina</>]],
    },
    {
      say: 'Tar ko taato chai load sanga chito badhcha: dobar load, char guna taato.',
      voice: 'तारको तातो चाहिँ लोडसँग छिटो बढ्छ — दोब्बर लोड, चार गुना तातो।',
      lines: [['step', <>Tar ko loss: dobar load → char guna</>]],
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
      lines: [['step', <>Efficiency: aayeko madhye kaam ma gayeko (98 % +)</>]],
    },
    {
      say: 'Ascharya: sabai bhanda ramro efficiency full load ma hoina, jaba tar ko loss ra core ko loss barabar huncha.',
      voice: 'आश्चर्य — सबैभन्दा राम्रो इफिसियन्सी फुल लोडमा होइन, जब तारको लस र कोरको लस बराबर हुन्छ।',
      lines: [['step', <>Best efficiency: tar ko loss ra core ko loss barabar</>]],
    },
    {
      say: 'Pole ko transformer din-raat on huncha, raati load kam. Tesaile pura din ko energy hisab garne: all-day efficiency.',
      voice: 'पोलको ट्रान्सफर्मर दिनरात अन हुन्छ, राति लोड कम। त्यसैले पूरा दिनको इनर्जी हिसाब गर्ने — अल डे इफिसियन्सी।',
      lines: [['step', <>24 ghanta on → pura din ko hisab (all-day efficiency)</>]],
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
      lines: [['h', <>2.4 · Performance of a transformer</>], ['step', <>Light load: terminal voltage nearly the no-load voltage</>]],
    },
    {
      say: 'Load badhda internal impedance ma drop hunchha ra terminal voltage ghatcha: voltage regulation.',
      voice: 'लोड बढ्दा इन्टरनल इम्पिडेन्समा ड्रप हुन्छ, र टर्मिनल भोल्टेज घट्छ — भोल्टेज रेगुलेसन।',
      lines: [['step', <>Load ↑ → internal drop → voltage regulation</>]],
    },
    {
      say: 'Core loss load ma depend gardaina: constant loss.',
      voice: 'कोर लस लोडमा डिपेन्ड गर्दैन — कन्स्टेन्ट लस।',
      lines: [['step', <>Core (iron) loss: constant</>]],
    },
    {
      say: 'Copper loss load current ko square sanga badhcha: variable loss.',
      voice: 'कपर लस लोड करेन्टको स्क्वायरसँग बढ्छ — भेरिएबल लस।',
      lines: [['step', <>Copper loss: grows with the square of load, variable</>]],
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
      lines: [['step', <>Efficiency: output over input, above 98 %</>]],
    },
    {
      say: 'Maximum efficiency copper loss ra core loss barabar huda huncha.',
      voice: 'म्याक्सिमम इफिसियन्सी कपर लस र कोर लस बराबर हुँदा हुन्छ।',
      lines: [['step', <>Maximum efficiency when copper loss equals core loss</>]],
    },
    {
      say: 'Distribution transformer 24 ghanta energised huncha; tesko lagi all-day efficiency energy ma nikalincha.',
      voice: 'डिस्ट्रिब्युसन ट्रान्सफर्मर चौबीस घण्टा इनर्जाइज्ड हुन्छ, त्यसको लागि अल डे इफिसियन्सी इनर्जीमा निकालिन्छ।',
      lines: [['step', <>Distribution transformer: all-day (energy) efficiency</>]],
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
export const basics25 = duo('2.5 · Basic understanding: auto, instrument and three-phase transformers', {
  three: transformerTour([
    { shot: 'primary', show: ['core', 'primary', 'source', 'tap'], flow: 0.6, flux: 1, tap: 0.5, focus: ['primary', 'tap'], labels: [['euta coil', 'primary'], ['tap', 'tap']] },
    { tap: 0.9, tapMs: 2000, focus: ['tap'], labels: [['tap sarauda voltage', 'tap']] },
    { tap: 0.5, focus: ['primary'], labels: [['tama bachyo', 'primary']] },
    { shot: 'whole', show: LOADED, flow: 1, flow2: 0.3, tap: 0.5, focus: ['primary', 'source'], labels: [['thulo current', 'primary'], ['sano naap', 'lamp']] },
    { focus: ['secondary'], flow2: 0.3, labels: [['kahile khulla nachhoda', 'secondary']] },
    { focus: ['secondary', 'lamp'], flow: 0.6, flow2: 0.6, labels: [['thulo voltage → sano', 'lamp']] },
    { shot: 'core', show: ['core3', 'coils3'], flux: 0, flow: 0, flow2: 0, focus: ['core3', 'coils3'], labels: [['tin khutta', 'core3'], ['R Y B', 'coils3']] },
    { shot: 'whole', show: ['core3', 'coils3'], focus: null },
  ]),
  tutor: [
    {
      say: 'Yo transformer ma euta matra coil cha, bich ma euta tap. Supply pura coil ma, load chai coil ko ek bhag bata.',
      voice: 'यो ट्रान्सफर्मरमा एउटा मात्र कोइल छ, बीचमा एउटा ट्याप। सप्लाई पूरा कोइलमा, लोड चाहिँ कोइलको एक भागबाट।',
      lines: [['h', <>2.5 · Euta coil, CT ra tin phase</>], ['step', <>Auto transformer: euta coil, bich ma tap</>]],
    },
    {
      say: 'Tap sarauda output voltage badlincha. Ghar ko stabiliser ra lab ko variac yahi ho.',
      voice: 'ट्याप सराउँदा आउटपुट भोल्टेज बदलिन्छ। घरको स्टेबिलाइजर र ल्याबको भेरियाक यही हो।',
      lines: [['step', <>Tap sarayo → voltage badlincha (variac, stabiliser)</>]],
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
      lines: [['step', <>CT: thulo current → sano current, meter ko lagi</>]],
    },
    {
      say: 'CT ko secondary kahile khulla nachhoda. Khulla bhaye core ma bhayankar flux bancha, ra khatarnak thulo voltage aaucha.',
      voice: 'सी टीको सेकेन्डरी कहिल्यै खुल्ला नछोड। खुल्ला भए कोरमा भयंकर फ्लक्स बन्छ, र खतरनाक ठूलो भोल्टेज आउँछ।',
      lines: [['step', <>CT secondary khulla → thulo flux → khatarnak voltage</>]],
    },
    {
      say: 'PT chai thulo voltage lai sano voltage ma jharcha, voltmeter ko lagi.',
      voice: 'पी टी चाहिँ ठूलो भोल्टेजलाई सानो भोल्टेजमा झार्छ, भोल्टमिटरको लागि।',
      lines: [['step', <>PT: thulo voltage → sano voltage</>]],
    },
    {
      say: 'Pawar house bata tin phase bijuli aaucha. Tin khutta bhayeko core ma R, Y ra B ka coil: three-phase transformer.',
      voice: 'पावरहाउसबाट तीन फेज बिजुली आउँछ। तीन खुट्टा भएको कोरमा आर, वाई, र बी का कोइल — थ्री फेज ट्रान्सफर्मर।',
      lines: [['step', <>Tin khutta ko core + R Y B coil → three-phase</>]],
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
      lines: [['h', <>2.5 · Special transformers</>], ['step', <>Auto transformer: a single winding with a common part</>]],
    },
    {
      say: 'Tapping position badlera variable output voltage paincha: variac.',
      voice: 'ट्यापिङ पोजिसन बदलेर भेरिएबल आउटपुट भोल्टेज पाइन्छ — भेरियाक।',
      lines: [['step', <>Movable tap → variable voltage (variac)</>]],
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
      lines: [['step', <>CT: large line current → small standard current</>]],
    },
    {
      say: 'CT ko secondary open garnu hudaina; burden bina primary current sabai magnetising bancha ra high voltage induce huncha.',
      voice: 'सी टीको सेकेन्डरी ओपन गर्नु हुँदैन, बर्डन बिना प्राइमरी करेन्ट सबै म्याग्नेटाइजिङ बन्छ, र हाई भोल्टेज इन्ड्युस हुन्छ।',
      lines: [['step', <>CT secondary must never be open-circuited</>]],
    },
    {
      say: 'Potential transformer le high voltage lai measurement ko lagi low voltage ma jharcha.',
      voice: 'पोटेन्सियल ट्रान्सफर्मरले हाई भोल्टेजलाई मेजरमेन्टको लागि लो भोल्टेजमा झार्छ।',
      lines: [['step', <>PT: high voltage → measurable low voltage</>]],
    },
    {
      say: 'Three-phase transformer ma tin limb ko core ma pratyek phase ko winding hunchha.',
      voice: 'थ्री फेज ट्रान्सफर्मरमा तीन लिम्बको कोरमा प्रत्येक फेजको वाइन्डिङ हुन्छ।',
      lines: [['step', <>Three-phase: three-limb core, one phase per limb</>]],
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

const t21 = topic({ num: '2.1', title: 'Constructional Details, recent trends · Working principle and EMF equation', opener: basics21, derive: [principle21, emf21], picture: [emfAnswer21] });
const t22 = topic({ num: '2.2', title: 'Ideal Transformer · No load and load Operation · Operation of Transformer with load', opener: basics22, derive: [noLoad22, onLoad22], picture: [fluxAnswer22] });
const t23 = topic({ num: '2.3', title: 'Equivalent Circuits and Phasor Diagram · Tests: Polarity Test, Open Circuit test, Short Circuit test and Equivalent Circuit Parameters', opener: basics23, derive: [eqCircuit23, tests23], picture: [referAnswer23, ocscSolve23] });
const t24 = topic({ num: '2.4', title: 'Voltage Regulation · Losses in a transformer · Efficiency, condition for maximum efficiency and all day efficiency', opener: basics24, derive: [reg24, eff24], picture: [lossAnswer24, effSolve24] });
const t25 = topic({ num: '2.5', title: 'Instrument Transformers: Potential Transformer (PT) and Current Transformer (CT) · Auto transformer: construction, working principle and Cu saving · Three phase Transformers', opener: basics25, derive: [auto25, special25], picture: [autoAnswer25, ctAnswer25] });

export const unit2 = {
  topics: [t21, t22, t23, t24, t25],
  summary: [
    <>Mutual induction: E = 4.44 fNΦ<sub>m</sub>, E<sub>2</sub>/E<sub>1</sub> = N<sub>2</sub>/N<sub>1</sub> = K; frequency badlindaina.</>,
    <>No load: I<sub>0</sub> = √(I<sub>w</sub>² + I<sub>μ</sub>²). Load ma N<sub>1</sub>I<sub>2</sub>′ = N<sub>2</sub>I<sub>2</sub>, flux constant.</>,
    <>Equivalent circuit: R<sub>01</sub> = R<sub>1</sub> + R<sub>2</sub>/K²; OC test → R<sub>0</sub>, X<sub>0</sub> (core loss); SC test → R<sub>01</sub>, X<sub>01</sub> (Cu loss).</>,
    <>Regulation ≈ (IR cosφ ± IX sinφ)/V; η maximum when P<sub>cu</sub> = P<sub>i</sub>, at x = √(P<sub>i</sub>/P<sub>cu,fl</sub>).</>,
    <>Auto transformer: W<sub>a</sub> = (1 − K)W<sub>tw</sub>. CT secondary kahile open nagarne. Three-phase: Y/Δ connections.</>,
  ],
};
