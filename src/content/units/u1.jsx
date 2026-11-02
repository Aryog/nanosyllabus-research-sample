import { C, K, Pts, answer, duo, figAt, solve, topic } from '../video/kit.jsx';
import { br, chain, part, rem } from '../video/kit.jsx';
import { Cap, T, W, head, cond } from '../unit4/figs.jsx';
import { magnetTour } from '../machines/models3d.js';

/*
  Unit 1 Magnetic Circuits and Induction (IOE syllabus, vault/…/Syllabus).
    one topic per bullet (rule 68): 1.1 Magnetic Circuits · 1.2 Ohm's Law ·
    1.3 Series and Parallel circuits · 1.4 Core with air gap · 1.5 B-H
    relationship · 1.6 Hysteresis with DC and AC excitation · 1.7 Hysteresis
    and eddy current loss · 1.8 Faraday's law · 1.9 Force on a conductor
  Segment 1 walks the 3D core (machines/models3d.js magnetTour); segment 2 is
  Tutor + Lecturer over one book figure per topic; segment 3 answers the real
  past questions (vault Question Bank). Caption-only (rule 38).
  Recomputed: 2069 Bhadra Hg = 795 775 AT/m, ATg = 1591.5, Hi = 198.9 AT/m,
  ATi = 19.5, total 1611.0 AT, I = 2.685 A.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
const step = (label, math) => <><span className="lbl">{label}</span><K>{math}</K></>;
const CORE = ['core', 'coil'];
const WIRED = [...CORE, 'battery'];

/* ── Figures ─────────────────────────────────────────────────────────── */
// Fig. 1.1: 0 core (l, A) · 1 coil N turns, current I · 2 flux path Φ · 3 air gap lg · 4 electric analogue
export const magCircuitFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M40 40 H250 V190 H40 Z" w={1.5} />
      <W d="M70 70 H220 V160 H70 Z" w={1.5} />
      <T x={145} y={34} i>mean length l</T>
      <W d="M222 115 H248" w={0.8} />
      <T x={262} y={102} a="start" size={10}>area A</T>
      <Cap x={150} y={214}>Fig. 1.1  Magnetic circuit with an air gap</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      {[85, 100, 115, 130, 145].map((y) => <W key={y} d={`M32 ${y} H78`} w={1.6} />)}
      <W d="M32 85 H14 M32 145 H14" />
      {head(20, 85, 'right', 6)}
      <T x={12} y={78} a="start" i>I</T>
      <T x={14} y={166} a="start" i>N turns</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M55 55 H235 V175 H55 Z" w={1} dash="4 3" />
      {head(150, 55, 'right')}
      <T x={150} y={68} i>Φ</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <rect x={218} y={108} width={36} height={14} fill={C.board} stroke="none" />
      <W d="M220 108 H252 M220 122 H252" w={1.5} />
      <T x={300} y={119} i>lg (air gap)</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <T x={300} y={150} size={10}>EMF ↔ MMF</T>
      <T x={300} y={164} size={10}>I ↔ Φ</T>
      <T x={300} y={178} size={10}>R ↔ S</T>
    </g>
  </>
);

// Fig. 1.2: 0 axes · 1 initial magnetisation curve (saturation) · 2 loop · 3 Br · 4 Hc · 5 loop area shaded
export const bhFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M30 115 H330 M180 20 V210" />
      {head(330, 115, 'right')}
      {head(180, 20, 'up')}
      <T x={326} y={130} i>H</T>
      <T x={192} y={26} i>B</T>
      <Cap y={226}>Fig. 1.2  B-H curve and hysteresis loop</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M180 115 C200 112 215 70 245 52 S290 40 300 38" w={1.5} dash="5 3" />
      <T x={300} y={30} size={10}>saturation</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M300 38 C250 40 200 60 180 75 C150 100 110 150 60 192 C110 190 160 170 180 155 C210 130 250 80 300 38" w={1.6} />
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <circle cx={180} cy={75} r={3} fill={C.chalk} />
      <T x={170} y={70} a="end" i>Br</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <circle cx={152} cy={115} r={3} fill={C.chalk} />
      <T x={146} y={130} a="end" i>−Hc</T>
    </g>
    <g className={s.on(5) + s.hl(5)}>
      <T x={95} y={60} size={10}>loop area =</T>
      <T x={95} y={74} size={10}>energy lost per</T>
      <T x={95} y={88} size={10}>cycle per m³</T>
    </g>
  </>
);

// Fig. 1.3: 0 magnet and coil (statically/dynamically) · 1 meter · 2 conductor in field, v · 3 force F, current I
export const inductionFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <rect x={20} y={95} width={30} height={26} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <rect x={50} y={95} width={30} height={26} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={35} y={113} b>N</T>
      <T x={65} y={113} b>S</T>
      <W d="M86 108 H104" w={1} />
      {head(108, 108, 'right', 6)}
      {[112, 122, 132, 142, 152].map((x) => <ellipse key={x} cx={x} cy={108} rx={4} ry={18} fill="none" stroke={C.chalk} strokeWidth={1.3} />)}
      <Cap x={90} y={214}>Fig. 1.3 (a)  Magnet moved into a coil</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M112 90 V60 H170 M152 90 V72 H170" />
      <circle cx={180} cy={66} r={11} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={180} y={70} b size={10}>G</T>
      <T x={180} y={46} i size={10}>e = −N dΦ/dt</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M215 60 H345 M215 170 H345" />
      {[240, 275, 310].map((x) => <g key={x}><W d={`M${x} 60 V170`} w={0.8} dash="3 3" />{head(x, 170, 'down', 5)}</g>)}
      <T x={350} y={120} a="start" i>B</T>
      {cond(275, 115, 'out', 9)}
      <W d="M286 128 H318" w={1.2} />
      {head(322, 128, 'right', 6)}
      <T x={322} y={145} i>v</T>
      <Cap x={280} y={214}>(b) Conductor in a field</Cap>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M275 103 V76" w={1.6} />
      {head(275, 72, 'up', 7)}
      <T x={262} y={84} a="end" i>F = BIl</T>
    </g>
  </>
);

/* ── 1.1 Magnetic circuit ────────────────────────────────────────────── */
export const basics11 = duo('1.1 · Basic understanding: does magnetism have a circuit?', {
  three: magnetTour([
    { shot: 'whole', show: CORE, labels: [['falam ko frame', 'core'], ['tar ko coil', 'coil']] },
    { shot: 'core', show: WIRED, flow: 0.6, flux: 0.7, focus: ['coil', 'battery'], labels: [['current', 'coil'], ['flux', 'flux']] },
    { focus: ['core'], labels: [['flux ko bato', 'core']] },
    { shot: 'coil', flow: 1, flux: 1, focus: ['coil'], labels: [['dherai pheri', 'coil']] },
    { shot: 'gap', air: 1, flux: 0.35, focus: ['core', 'bridge'], labels: [['hawa ko gap', 'gap']] },
    { shot: 'core', flux: 0.35, focus: ['core'], labels: [['flux ghatyo', 'flux']] },
    { air: 0, flux: 0.9, focus: null, labels: [['eutai bato: series', [0, 2.3, 0.8]]] },
    { shot: 'whole', flux: 0.9, flow: 0.6 },
  ]),
  tutor: [
    {
      say: 'Falam ko frame ma tama ko tar bereko cha. Tar ma current pathaau, frame nai magnet bancha.',
      voice: 'फलामको फ्रेममा तामाको तार बेरेको छ। तारमा करेन्ट पठाऊ, फ्रेम नै म्याग्नेट बन्छ।',
      lines: [['h', <>1.1 · Magnet ko pani circuit huncha?</>], chain(<>Falam ko frame + tar ko coil → electromagnet</>)],
    },
    {
      say: 'Battery le coil ma current pathaucha. Tyo current le nadekhine magnetic flux banaucha, jun falam bhitra ghumcha.',
      voice: 'ब्याट्रीले कोइलमा करेन्ट पठाउँछ। त्यो करेन्टले नदेखिने म्याग्नेटिक फ्लक्स बनाउँछ, जुन फलामभित्र घुम्छ।',
      lines: [chain(<>Current → coil → flux falam bhitra ghumcha</>)],
    },
    {
      say: 'Tar current ko bato ho; falam chai flux ko bato. Flux pura ghumera pheri aaucha: yahi magnetic circuit.',
      voice: 'तार करेन्टको बाटो हो, फलाम चाहिँ फ्लक्सको बाटो। फ्लक्स पूरा घुमेर फेरि आउँछ — यही म्याग्नेटिक सर्किट।',
      lines: [part(<>Magnetic circuit</>, <>flux ghumne falam ko bato</>)],
    },
    {
      say: 'Coil ma dherai pheri ra dherai current bhaye, flux lai dherai dhakka puchha. Pheri ra current, duitai le bal dincha.',
      voice: 'कोइलमा धेरै फेरा र धेरै करेन्ट भए, फ्लक्सलाई धेरै धक्का पुग्छ। फेरा र करेन्ट, दुवैले बल दिन्छ।',
      lines: [chain(<>Dherai pheri + dherai current → flux lai dherai dhakka</>)],
    },
    {
      say: 'Aba falam ma sano kaat garau. Bich ma hawa aayo, ani hawa ma flux lai jana dherai gahro huncha.',
      voice: 'अब फलाममा सानो काट गरौं। बीचमा हावा आयो, अनि हावामा फ्लक्सलाई जान धेरै गाह्रो हुन्छ।',
      lines: [['step', <>Falam: sajilo bato · hawa: gahro bato</>]],
      ask: {
        q: 'Magnetic flux lai kun bato sajilo huncha?',
        voice: 'म्याग्नेटिक फ्लक्सलाई कुन बाटो सजिलो हुन्छ?',
        options: ['Falam', 'Hawa', 'Dubai ustai'],
        answer: 0,
        why: 'Falam ma flux sajilai bagcha; hawa le dherai rokcha.',
      },
    },
    {
      say: 'Ascharya: ek-dui millimeter ko hawa ko gap le pura frame ko falam bhanda badhi rokcha. Flux ekdam ghatcha.',
      voice: 'आश्चर्य — एक दुई मिलिमिटरको हावाको ग्यापले पूरा फ्रेमको फलामभन्दा बढी रोक्छ। फ्लक्स एकदम घट्छ।',
      lines: [chain(<>Sano hawa ko gap → thulo rok → flux ghatcha</>)],
    },
    {
      say: 'Eutai bato ma falam ra hawa lagatar aaye, rok haru jodincha: series. Bato duita bhaye flux bandincha: parallel.',
      voice: 'एउटै बाटोमा फलाम र हावा लगातार आए, रोकहरू जोडिन्छ — सिरिज। बाटो दुईटा भए, फ्लक्स बाँडिन्छ — प्यारालल।',
      lines: [['step', <>Eutai bato: series · bato chhuttiye: parallel</>]],
    },
    {
      say: 'Yaad rakha: coil le dhakka dincha, falam le bato dincha, ra hawa ko gap le sabai bhanda dherai rokcha.',
      voice: 'याद राख — कोइलले धक्का दिन्छ, फलामले बाटो दिन्छ, र हावाको ग्यापले सबैभन्दा धेरै रोक्छ।',
      lines: [['idea', <>Coil: dhakka · falam: bato · hawa: thulo rok</>]],
    },
  ],
  lecturer: [
    {
      say: 'Iron core ma conductor ko winding cha. Winding ma current dida core magnetised huncha.',
      voice: 'आइरन कोरमा कन्डक्टरको वाइन्डिङ छ। वाइन्डिङमा करेन्ट दिँदा कोर म्याग्नेटाइज्ड हुन्छ।',
      lines: [['h', <>1.1 · Magnetic circuit</>], chain(<>Iron core + exciting winding → electromagnet</>)],
    },
    {
      say: 'Current le magnetic flux produce garcha, ra tyo flux core ko bato hudai close loop ma ghumcha.',
      voice: 'करेन्टले म्याग्नेटिक फ्लक्स प्रोड्युस गर्छ, र त्यो फ्लक्स कोरको बाटो हुँदै क्लोज लुपमा घुम्छ।',
      lines: [chain(<>Exciting current → flux in a closed loop through the core</>)],
    },
    {
      say: 'Flux le follow garne closed path lai magnetic circuit bhanincha, jasari current ko closed path electric circuit ho.',
      voice: 'फ्लक्सले फलो गर्ने क्लोज्ड पाथलाई म्याग्नेटिक सर्किट भनिन्छ, जसरी करेन्टको क्लोज्ड पाथ इलेक्ट्रिक सर्किट हो।',
      lines: [part(<>Magnetic circuit</>, <>the closed path of the flux</>)],
    },
    {
      say: 'Turns ra current badhaye flux badhcha. Winding le dine yo magnetic driving force nai flux ko karan ho.',
      voice: 'टर्न्स र करेन्ट बढाए फ्लक्स बढ्छ। वाइन्डिङले दिने यो म्याग्नेटिक ड्राइभिङ फोर्स नै फ्लक्सको कारण हो।',
      lines: [chain(<>More turns, more current → stronger driving force → more flux</>)],
    },
    {
      say: 'Core ma air gap kaatiyo bhane flux ko bato ma hawa aaucha. Hawa le iron bhanda dherai oppose garcha.',
      voice: 'कोरमा एयर ग्याप काटियो भने, फ्लक्सको बाटोमा हावा आउँछ। हावाले आइरनभन्दा धेरै अपोज गर्छ।',
      lines: [['step', <>Iron: easy path · air gap: strong opposition</>]],
      ask: {
        q: 'Magnetic circuit ma sabai bhanda badhi opposition kasle dincha?',
        voice: 'म्याग्नेटिक सर्किटमा सबैभन्दा बढी अपोजिसन कसले दिन्छ?',
        options: ['Air gap', 'Iron core', 'Copper winding'],
        answer: 0,
        why: 'Hawa ko permeability iron ko bhanda hajarau guna kam huncha.',
      },
    },
    {
      say: 'Sano air gap le pani pura iron path bhanda badhi oppose garna sakcha, tesaile flux dherai ghatcha.',
      voice: 'सानो एयर ग्यापले पनि पूरा आइरन पाथभन्दा बढी अपोज गर्न सक्छ, त्यसैले फ्लक्स धेरै घट्छ।',
      lines: [['step', <>A small air gap can oppose more than the whole iron path</>]],
    },
    {
      say: 'Eutai path ma iron ra air gap lagatar aaye series magnetic circuit; flux duita path ma bandiye parallel.',
      voice: 'एउटै पाथमा आइरन र एयर ग्याप लगातार आए सिरिज म्याग्नेटिक सर्किट, फ्लक्स दुईटा पाथमा बाँडिए प्यारालल।',
      lines: [['step', <>One path: series circuit · divided paths: parallel circuit</>]],
    },
    {
      say: 'Saransha: winding le driving force dincha, core le path dincha, ra air gap le sabai bhanda badhi oppose garcha.',
      voice: 'सारांश — वाइन्डिङले ड्राइभिङ फोर्स दिन्छ, कोरले पाथ दिन्छ, र एयर ग्यापले सबैभन्दा बढी अपोज गर्छ।',
      lines: [['idea', <>Winding: driving force · core: path · air gap: largest opposition</>]],
    },
  ],
});

export const ohm11 = duo("Magnetic circuit and Ohm's law for magnetic circuits", {
  draw: magCircuitFigure,
  viewBox: '0 0 360 230',
  tutor: [
    {
      say: 'Figure 1.1 ma falam ko core, mean length l ra cross-section area A. Flux yahi core ma ghumcha.',
      voice: 'फिगर वान पोइन्ट वानमा फलामको कोर, मिन लेन्थ एल, र क्रस सेक्सन एरिया ए। फ्लक्स यही कोरमा घुम्छ।',
      lines: [['h', <>Magnetic circuit</>], ['step', <>Closed path of flux Φ: core of mean length l, area A</>]],
    },
    {
      say: 'Coil ma N turns ra current I. Flux lai dhakelne bal MMF ho: N times I, unit ampere-turn.',
      voice: 'कोइलमा एन टर्न्स र करेन्ट आई। फ्लक्सलाई धकेल्ने बल एम एम एफ हो — एन टाइम्स आई, युनिट एम्पियर टर्न।',
      lines: [['eq', tex(String.raw`\text{MMF} = N I \;\; \text{(AT)}`)]],
    },
    {
      say: 'Flux lai rokne kura reluctance S. Lamo bato ma badhi, mota core ra badhi permeability ma kam.',
      voice: 'फ्लक्सलाई रोक्ने कुरा रिलक्टेन्स एस। लामो बाटोमा बढी, मोटो कोर र बढी पर्मियाबिलिटीमा कम।',
      lines: [['eq', tex(String.raw`S = \dfrac{l}{\mu_0 \mu_r A} \;\; \text{(AT/Wb)}`)]],
      ask: {
        q: 'Core ko length dobar garyo bhane reluctance k huncha?',
        voice: 'कोरको लेन्थ दोब्बर गर्‍यो भने रिलक्टेन्स के हुन्छ?',
        options: ['Dobar huncha', 'Aadha huncha', 'Ustai rahancha'],
        answer: 0,
        why: 'Reluctance length sanga sidhai badhcha: l dobar, S dobar.',
      },
    },
    {
      say: 'Ohm ko law jastai: current equals EMF over resistance; magnetic circuit ma flux equals MMF over reluctance.',
      voice: 'ओमको ल जस्तै — करेन्ट इक्वल्स ई एम एफ ओभर रेजिस्टेन्स, म्याग्नेटिक सर्किटमा फ्लक्स इक्वल्स एम एम एफ ओभर रिलक्टेन्स।',
      lines: [['eq', tex(String.raw`\begin{aligned} \Phi &= \dfrac{\text{MMF}}{S} \\ \therefore\ \Phi &= \boxed{\dfrac{NI}{l/(\mu_0\mu_r A)}} \end{aligned}`)]],
    },
    {
      say: 'Tulana: EMF ra MMF, current ra flux, resistance ra reluctance. Tara flux le energy kharcha gardaina, current le heat banaucha.',
      voice: 'तुलना — ई एम एफ र एम एम एफ, करेन्ट र फ्लक्स, रेजिस्टेन्स र रिलक्टेन्स। तर फ्लक्सले इनर्जी खर्च गर्दैन, करेन्टले हिट बनाउँछ।',
      lines: [['idea', <>EMF ↔ MMF · I ↔ Φ · R ↔ S; flux needs energy only to set up, not to keep flowing</>]],
    },
  ],
  lecturer: [
    {
      say: 'Definition: the closed path followed by magnetic flux is called a magnetic circuit, Figure 1.1.',
      voice: 'डेफिनेसन — द क्लोज्ड पाथ फलोड बाइ म्याग्नेटिक फ्लक्स इज कल्ड अ म्याग्नेटिक सर्किट, फिगर वान पोइन्ट वान।',
      lines: [['h', <>Magnetic circuit</>], ['step', <><i>The closed path followed by magnetic flux is called a magnetic circuit.</i></>]],
    },
    {
      say: 'Magneto-motive force is the cause of flux: MMF equals N I ampere-turns.',
      voice: 'म्याग्नेटो मोटिभ फोर्स इज द कज अफ फ्लक्स — एम एम एफ इक्वल्स एन आई एम्पियर टर्न्स।',
      lines: [['eq', tex(String.raw`\text{MMF} = N I \;\; \text{(AT)}`)]],
    },
    {
      say: 'Reluctance is the opposition to flux: S equals l over mu zero mu r A.',
      voice: 'रिलक्टेन्स इज द अपोजिसन टु फ्लक्स — एस इक्वल्स एल ओभर म्यु जिरो म्यु आर ए।',
      lines: [['eq', tex(String.raw`S = \dfrac{l}{\mu_0 \mu_r A} \;\; \text{(AT/Wb)}`)]],
      ask: {
        q: 'Relative permeability badhda reluctance k huncha?',
        voice: 'रिलेटिभ पर्मियाबिलिटी बढ्दा रिलक्टेन्स के हुन्छ?',
        options: ['Ghatcha', 'Badhcha', 'Ustai rahancha'],
        answer: 0,
        why: 'S = l/(μ0 μr A): μr denominator ma cha.',
      },
    },
    {
      say: "Hence Ohm's law for the magnetic circuit: flux equals MMF over reluctance.",
      voice: 'हेन्स ओम्स ल फर द म्याग्नेटिक सर्किट — फ्लक्स इक्वल्स एम एम एफ ओभर रिलक्टेन्स।',
      lines: [['eq', tex(String.raw`\begin{aligned} \Phi &= \dfrac{\text{MMF}}{S} \\ \therefore\ \Phi &= \boxed{\dfrac{NI}{l/(\mu_0\mu_r A)}} \end{aligned}`)]],
    },
    {
      say: 'Similarities: EMF and MMF, current and flux, resistance and reluctance. Difference: flux needs no energy to be maintained.',
      voice: 'सिमिलारिटिज — ई एम एफ एन्ड एम एम एफ, करेन्ट एन्ड फ्लक्स, रेजिस्टेन्स एन्ड रिलक्टेन्स। डिफरेन्स — फ्लक्स निड्स नो इनर्जी टु बी मेन्टेन्ड।',
      lines: [['step', <><Pts items={[<>EMF ↔ MMF, I ↔ Φ, R ↔ S, conductivity ↔ permeability</>, <>Current dissipates I²R; flux needs energy only to be set up</>]} /></>]],
    },
  ],
});

export const gap11 = duo('Derivation: series magnetic circuit with air gap', {
  draw: magCircuitFigure,
  viewBox: '0 0 360 230',
  tutor: [
    {
      say: 'Figure 1.1 ma core ma air gap l g cha. Flux pahila iron, ani hawa, dubai bata series ma jancha.',
      voice: 'फिगर वान पोइन्ट वानमा कोरमा एयर ग्याप एल जी छ। फ्लक्स पहिला आइरन, अनि हावा, दुवैबाट सिरिजमा जान्छ।',
      lines: [['h', <>Core with an air gap</>], ['step', <>Iron path l<sub>i</sub> and air gap l<sub>g</sub> in series</>]],
    },
    {
      say: 'Series ma resistance jodinchan, tyastai reluctance pani jodinchan.',
      voice: 'सिरिजमा रेजिस्टेन्स जोडिन्छन्, त्यस्तै रिलक्टेन्स पनि जोडिन्छन्।',
      lines: [['eq', tex(String.raw`\begin{aligned} S &= S_i + S_g \\ &= \dfrac{l_i}{\mu_0\mu_r A} + \dfrac{l_g}{\mu_0 A} \end{aligned}`)]],
    },
    {
      say: 'Numerical ma part-part AT nikalcha: H equals B over mu. Iron ma mu r le bhag, hawa ma mu r ek.',
      voice: 'न्युमेरिकलमा पार्ट पार्ट ए टी निकाल्छ — एच इक्वल्स बी ओभर म्यु। आइरनमा म्यु आरले भाग, हावामा म्यु आर एक।',
      lines: [['eq', tex(String.raw`\begin{aligned} H_i &= \dfrac{B}{\mu_0\mu_r} \\ H_g &= \dfrac{B}{\mu_0} \end{aligned}`)]],
    },
    {
      say: 'Total AT equals H i l i plus H g l g. Current I equals total AT over N.',
      voice: 'टोटल ए टी इक्वल्स एच आई एल आई प्लस एच जी एल जी। करेन्ट आई इक्वल्स टोटल ए टी ओभर एन।',
      lines: [['eq', tex(String.raw`\boxed{NI = H_i l_i + H_g l_g}`)]],
      ask: {
        q: 'Mu r 4000 bhaye, eutai length ko air gap ko AT iron ko kati guna huncha?',
        voice: 'म्यु आर चार हजार भए, एउटै लेन्थको एयर ग्यापको ए टी आइरनको कति गुना हुन्छ?',
        options: ['4000 guna', '40 guna', 'Utti nai'],
        answer: 0,
        why: 'H g / H i = μr = 4000.',
      },
    },
    {
      say: 'Parallel circuit ma flux bandincha: phi equals phi 1 plus phi 2. Eutai MMF le dubai parallel path chalaucha.',
      voice: 'प्यारालल सर्किटमा फ्लक्स बाँडिन्छ — फाइ इक्वल्स फाइ वान प्लस फाइ टु। एउटै एम एम एफले दुवै प्यारालल पाथ चलाउँछ।',
      lines: [['idea', <>Parallel: <K>{String.raw`\Phi = \Phi_1 + \Phi_2`}</K>; the same AT acts across each parallel path</>]],
    },
  ],
  lecturer: [
    {
      say: 'Consider a core with an iron path l i and an air gap l g in series, Figure 1.1.',
      voice: 'कन्सिडर अ कोर विद एन आइरन पाथ एल आई एन्ड एन एयर ग्याप एल जी इन सिरिज, फिगर वान पोइन्ट वान।',
      lines: [['h', <>Series magnetic circuit with an air gap</>], ['step', <>Let the iron path be l<sub>i</sub>, the air gap l<sub>g</sub>, the area A.</>]],
    },
    {
      say: 'The reluctances in series add.',
      voice: 'द रिलक्टेन्सेस इन सिरिज एड।',
      lines: [['eq', tex(String.raw`\begin{aligned} S &= S_i + S_g \\ &= \dfrac{l_i}{\mu_0\mu_r A} + \dfrac{l_g}{\mu_0 A} \end{aligned}`)]],
    },
    {
      say: 'With flux density B, the field strengths in the iron and in the gap are as follows.',
      voice: 'विद फ्लक्स डेन्सिटी बी, द फिल्ड स्ट्रेन्थ्स इन द आइरन एन्ड इन द ग्याप आर एज फलोज।',
      lines: [['eq', tex(String.raw`\begin{aligned} H_i &= \dfrac{B}{\mu_0\mu_r} \\ H_g &= \dfrac{B}{\mu_0} \end{aligned}`)]],
    },
    {
      say: 'Total ampere-turns are the sum over the parts; hence the exciting current.',
      voice: 'टोटल एम्पियर टर्न्स आर द सम ओभर द पार्ट्स, हेन्स द एक्साइटिङ करेन्ट।',
      lines: [['eq', tex(String.raw`\boxed{NI = H_i l_i + H_g l_g}`)]],
      ask: {
        q: 'Air gap ko field strength H g kasari nikalcha?',
        voice: 'एयर ग्यापको फिल्ड स्ट्रेन्थ एच जी कसरी निकालिन्छ?',
        options: ['B / μ0', 'B / (μ0 μr)', 'B × μ0'],
        answer: 0,
        why: 'Hawa ko μr = 1, tesaile H g = B/μ0.',
      },
    },
    {
      say: 'In a parallel circuit the flux divides, and the same MMF acts across each parallel path.',
      voice: 'इन अ प्यारालल सर्किट द फ्लक्स डिभाइड्स, एन्ड द सेम एम एम एफ एक्ट्स एक्रस इच प्यारालल पाथ।',
      lines: [['step', <><Pts items={[<>Parallel: <K>{String.raw`\Phi = \Phi_1 + \Phi_2`}</K></>, <>Total AT = AT of the common path + AT of one parallel path</>]} /></>]],
    },
  ],
});

export const ohmAnswer11 = answer("Model answer: magnetic circuit and Ohm's law", {
  draw: figAt(magCircuitFigure, { 0: 1, 1: 2, 2: 2, 4: 4 }),
  viewBox: '0 0 360 230',
  papers: ['2073 Bhadra'],
  q: "Define Magnetic Circuit and hence list out the similarities between Magnetic and Electric Circuits. Deduce Ohm's law for magnetic circuit.",
  read: {
    say: "IOE 2073 Bhadra: define magnetic circuit and hence list out the similarities between magnetic and electric circuits. Deduce Ohm's law for magnetic circuit.",
    voice: 'आई ओ ई दुई हजार त्रिहत्तर भदौ — डिफाइन म्याग्नेटिक सर्किट एन्ड हेन्स लिस्ट आउट द सिमिलारिटिज बिट्विन म्याग्नेटिक एन्ड इलेक्ट्रिक सर्किट्स। डिड्युस ओम्स ल फर म्याग्नेटिक सर्किट।',
  },
  points: [
    {
      node: <><H>Magnetic circuit</H><Pts items={[<>The closed path followed by magnetic flux is called a magnetic circuit (Fig. 1.1).</>]} /></>,
      say: 'Definition: the closed path followed by magnetic flux is called a magnetic circuit.',
      voice: 'डेफिनेसन — द क्लोज्ड पाथ फलोड बाइ म्याग्नेटिक फ्लक्स इज कल्ड अ म्याग्नेटिक सर्किट।',
    },
    {
      node: <><H>Ohm’s law for magnetic circuit</H>Let a coil of N turns carry current I on a core of length l, area A.<K>{String.raw`\begin{aligned} \text{MMF} &= NI \\ B &= \mu_0\mu_r H \\ &= \mu_0\mu_r \dfrac{NI}{l} \end{aligned}`}</K></>,
      say: 'Let N turns carry I on a core of length l and area A. MMF equals N I, and B equals mu zero mu r N I over l.',
      voice: 'लेट एन टर्न्स क्यारी आई अन अ कोर अफ लेन्थ एल एन्ड एरिया ए। एम एम एफ इक्वल्स एन आई, एन्ड बी इक्वल्स म्यु जिरो म्यु आर एन आई ओभर एल।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} \Phi &= BA \\ &= \dfrac{NI}{l/(\mu_0\mu_r A)} \\ \therefore\ \Phi &= \dfrac{\text{MMF}}{S} \end{aligned}`}</K>where <K>{String.raw`S = l/(\mu_0\mu_r A)`}</K> is the reluctance.</>,
      say: 'Flux equals B A, equals N I over l by mu zero mu r A. Therefore flux equals MMF over reluctance, which is Ohm’s law for the magnetic circuit.',
      voice: 'फ्लक्स इक्वल्स बी ए, इक्वल्स एन आई ओभर एल बाइ म्यु जिरो म्यु आर ए। देयरफोर, फ्लक्स इक्वल्स एम एम एफ ओभर रिलक्टेन्स, ह्विच इज ओम्स ल फर द म्याग्नेटिक सर्किट।',
    },
    {
      page: true,
      node: <><H>Similarities</H><Pts items={[<>MMF (AT) ↔ EMF (V)</>, <>Flux Φ (Wb) ↔ current I (A)</>, <>Reluctance S ↔ resistance R; permeance ↔ conductance</>, <>Permeability μ ↔ conductivity σ</>]} /></>,
      say: 'Similarities: MMF and EMF, flux and current, reluctance and resistance, permeance and conductance, permeability and conductivity.',
      voice: 'सिमिलारिटिज — एम एम एफ एन्ड ई एम एफ, फ्लक्स एन्ड करेन्ट, रिलक्टेन्स एन्ड रेजिस्टेन्स, पर्मियन्स एन्ड कन्डक्टेन्स, पर्मियाबिलिटी एन्ड कन्डक्टिभिटी।',
      ask: {
        q: 'Electric circuit ko resistance sanga magnetic circuit ko kun quantity milcha?',
        voice: 'इलेक्ट्रिक सर्किटको रेजिस्टेन्ससँग म्याग्नेटिक सर्किटको कुन क्वान्टिटी मिल्छ?',
        options: ['Reluctance', 'Permeance', 'Flux'],
        answer: 0,
        why: 'Resistance le current rokcha, reluctance le flux rokcha.',
      },
    },
    {
      node: <><Pts items={[<>Both obey series and parallel laws (S and R add in series)</>, <>Difference: current dissipates energy I²R; flux needs energy only to be set up</>]} /></>,
      say: 'Both follow series and parallel laws. But current dissipates energy, while flux needs energy only to be set up.',
      voice: 'बोथ फलो सिरिज एन्ड प्यारालल लज। बट करेन्ट डिसिपेट्स इनर्जी, ह्वाइल फ्लक्स निड्स इनर्जी ओन्ली टु बी सेट अप।',
    },
  ],
});

export const gapSolve11 = solve({
  title: 'IOE 2069 Bhadra: current needed with an air gap',
  paper: '2069 Bhadra',
  paperVoice: 'दुई हजार उनान्सत्तरी भदौ',
  question: 'A magnetic circuit consists of a circular iron core having mean length of 10 cm and cross-sectional area of 100 mm². The air gap is 2 mm and the core has 600 turns of winding. Calculate the magnitude of current to be passed through the winding to produce air gap flux of 1 Tesla. Given μr = 4000.',
  read: 'Mean length 10 cm, area 100 mm square, air gap 2 mm, 600 turns, gap flux density 1 tesla, mu r 4000. Current kati?',
  readVoice: 'मिन लेन्थ दस सेन्टिमिटर, एरिया सय मिलिमिटर स्क्वायर, एयर ग्याप दुई मिलिमिटर, छ सय टर्न्स, ग्याप फ्लक्स डेन्सिटी एक टेस्ला, म्यु आर चार हजार। करेन्ट कति?',
  given: [
    { node: <>l = 10 cm, so l<sub>i</sub> = 0.1 − 0.002 = 0.098 m; l<sub>g</sub> = 0.002 m</>, say: 'Iron length 0.098 meter, gap 0.002 meter', voice: 'आइरन लेन्थ जिरो पोइन्ट जिरो नाइन एट मिटर, ग्याप जिरो पोइन्ट जिरो जिरो टु मिटर' },
    { node: <>B = 1 T (same in iron and gap, no fringing), N = 600, μ<sub>r</sub> = 4000</>, say: 'B 1 tesla, N 600, mu r 4000', voice: 'बी एक टेस्ला, एन छ सय, म्यु आर चार हजार' },
  ],
  find: { node: <>exciting current I</>, say: 'Nikalnu parne: exciting current I.', voice: 'निकाल्नु पर्ने — एक्साइटिङ करेन्ट आई।' },
  idea: { node: <>Series circuit: <K>{String.raw`NI = H_i l_i + H_g l_g`}</K></>, say: 'Method: series circuit, total AT equals iron AT plus gap AT.', voice: 'मेथड — सिरिज सर्किट, टोटल ए टी इक्वल्स आइरन ए टी प्लस ग्याप ए टी।' },
  steps: [
    {
      node: <K>{String.raw`\begin{aligned} H_g &= \dfrac{B}{\mu_0} \\ &= \dfrac{1}{4\pi\times10^{-7}} \\ &= 795\,775\ \text{AT/m} \\ AT_g &= 795\,775 \times 0.002 \\ &= 1591.5 \end{aligned}`}</K>,
      say: 'H g equals 1 over 4 pi into 10 to the minus 7, equals 795,775. Gap AT equals 1591.5.',
      voice: 'एच जी इक्वल्स वान ओभर फोर पाइ इन्टु टेन टु द माइनस सेभेन, इक्वल्स सात लाख पन्चानब्बे हजार सात सय पचहत्तर। ग्याप ए टी इक्वल्स पन्ध्र सय एकानब्बे दशमलव पाँच।',
    },
    {
      node: <K>{String.raw`\begin{aligned} H_i &= \dfrac{B}{\mu_0\mu_r} \\ &= 198.9\ \text{AT/m} \\ AT_i &= 198.9 \times 0.098 \\ &= 19.5 \end{aligned}`}</K>,
      say: 'H i equals B over mu zero mu r, 198.9. Iron AT equals 19.5.',
      voice: 'एच आई इक्वल्स बी ओभर म्यु जिरो म्यु आर, एक सय अन्ठानब्बे दशमलव नौ। आइरन ए टी इक्वल्स उन्नाइस दशमलव पाँच।',
      ask: {
        q: 'Yo circuit ma kun bhag le dherai AT khancha?',
        voice: 'यो सर्किटमा कुन भागले धेरै ए टी खान्छ?',
        options: ['Air gap', 'Iron core', 'Dubai barabar'],
        answer: 0,
        why: '1591.5 AT gap ma, 19.5 AT matra iron ma.',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} NI &= 1591.5 + 19.5 \\ &= 1611.0 \\ I &= \dfrac{1611.0}{600} \end{aligned}`}</K>,
      say: 'Total AT 1611. I equals 1611 over 600.',
      voice: 'टोटल ए टी सोह्र सय एघार। आई इक्वल्स सोह्र सय एघार ओभर छ सय।',
    },
  ],
  answer: { node: <K>{String.raw`\boxed{I = 2.685\ \text{A}}`}</K>, say: 'Answer: I equals 2.685 ampere.', voice: 'आन्सर — आई इक्वल्स टु पोइन्ट सिक्स एट फाइभ एम्पियर।' },
  trap: { node: <>Trap: B in the gap uses μ<sub>0</sub> only (μ<sub>r</sub> = 1 for air).</>, say: 'Trap: gap ma mu r ek, mu zero matra.', voice: 'ट्र्याप — ग्यापमा म्यु आर एक, म्यु जिरो मात्र।' },
});

/* ── 1.2 B-H curve, hysteresis, eddy current ─────────────────────────── */
export const basics12 = duo('1.7 · Basic understanding: why does the iron core heat up?', {
  three: magnetTour([
    { shot: 'core', show: [...CORE, 'domains'], align: 0, focus: ['domains'], labels: [['sano-sano magnet', 'domains']] },
    { show: [...WIRED, 'domains'], flow: 0.6, flux: 0.5, align: 0.6, focus: ['domains', 'coil'], labels: [['lain lagdai', 'domains']] },
    { flow: 1, flux: 1, align: 1, focus: ['domains'], labels: [['sabai milyo', 'domains']] },
    { flow: 0, flux: 0.25, align: 0.65, focus: ['domains'], labels: [['kehi baki', 'domains']] },
    { flow: 0.8, flux: 0.8, align: 1, heat: { core: 0.6 }, focus: ['core'], labels: [['ulto-sulto: taato', 'core']] },
    { shot: 'whole', show: [...WIRED, 'domains', 'eddy'], heat: { core: 0.8 }, eddy: 1, focus: ['eddy'], labels: [['bhaugaro current', 'eddy']] },
    { shot: 'sheets', show: [...WIRED, 'sheets'], heat: {}, eddy: 0, focus: ['sheets'], labels: [['patla pata', 'sheets']] },
    { shot: 'whole', show: [...WIRED, 'domains', 'sheets'], flux: 0.8, align: 1, focus: null },
  ]),
  tutor: [
    {
      say: 'Falam bhitra karodau sano-sano magnet hunchan. Sadharan bela tiniharu jata-tatai pharkiyeka hunchan.',
      voice: 'फलामभित्र करोडौं सानो सानो म्याग्नेट हुन्छन्। साधारण बेला तिनीहरू जता ततै फर्किएका हुन्छन्।',
      lines: [['h', <>1.7 · Falam kina taato huncha?</>], chain(<>Falam bhitra sano magnet: jata-tatai</>)],
    },
    {
      say: 'Coil ma current dida ti sano magnet eutai disha tira pharkina thalchan, ra falam magnet bancha.',
      voice: 'कोइलमा करेन्ट दिँदा ती सानो म्याग्नेट एउटै दिशातिर फर्किन थाल्छन्, र फलाम म्याग्नेट बन्छ।',
      lines: [chain(<>Current → sano magnet lain lagchan → falam magnet</>)],
    },
    {
      say: 'Sabai milepachi current badhaye pani magnet jhan balio hudaina. Falam bharisakyo: yesai lai saturation bhanchan.',
      voice: 'सबै मिलेपछि करेन्ट बढाए पनि म्याग्नेट झन् बलियो हुँदैन। फलाम भरिसक्यो — यसैलाई स्याचुरेसन भन्छन्।',
      lines: [chain(<>Sabai milyo → aru badhdaina: saturation</>)],
    },
    {
      say: 'Current banda garda pani kehi magnet milirahanchan. Falam ma ali magnet baki rahancha: falam le samjhancha.',
      voice: 'करेन्ट बन्द गर्दा पनि केही म्याग्नेट मिलिरहन्छन्। फलाममा अलि म्याग्नेट बाँकी रहन्छ — फलामले सम्झन्छ।',
      lines: [chain(<>Current off → ali magnet baki: falam ko samjhana</>)],
      ask: {
        q: 'Current banda garepachi falam ma k huncha?',
        voice: 'करेन्ट बन्द गरेपछि फलाममा के हुन्छ?',
        options: ['Ali magnet baki rahancha', 'Turunta pura sakincha', 'Jhan balio huncha'],
        answer: 0,
        why: 'Kehi sano magnet milirahanchan, tesaile ali magnetism baki rahancha.',
      },
    },
    {
      say: 'AC ma current eksekend ma pachas choti ulto pharkincha. Sano magnet haru pani ulto-sulto ghumda ghasincha, ra falam taato huncha.',
      voice: 'ए सीमा करेन्ट एक सेकेन्डमा पचास चोटि उल्टो फर्किन्छ। सानो म्याग्नेटहरू पनि उल्टो सुल्टो घुम्दा घसिन्छ, र फलाम तातो हुन्छ।',
      lines: [chain(<>Ulto-sulto ghumda ghasincha → taato: hysteresis loss</>)],
    },
    {
      say: 'Badlirahne flux le falam bhitrai sano bhaugaro jasto current ghumaucha. Yo current le pani falam taato banaucha.',
      voice: 'बदलिरहने फ्लक्सले फलामभित्रै सानो भौँगारो जस्तो करेन्ट घुमाउँछ। यो करेन्टले पनि फलाम तातो बनाउँछ।',
      lines: [chain(<>Falam bhitra bhaugaro current → taato: eddy current loss</>)],
    },
    {
      say: 'Upaya: thick falam ko satta patla pata, bich ma insulation. Bhaugaro current lai ghumne thau nai hudaina.',
      voice: 'उपाय — थिक फलामको सट्टा पातलो पाता, बीचमा इन्सुलेसन। भौँगारो करेन्टलाई घुम्ने ठाउँ नै हुँदैन।',
      lines: [chain(<>Patla insulated pata (lamination) → bhaugaro ghatcha</>)],
    },
    {
      say: 'Saransha: sano magnet milda falam magnet bancha; ulto-sulto ra bhaugaro le taato banaucha; patla pata le bachaucha.',
      voice: 'सारांश — सानो म्याग्नेट मिल्दा फलाम म्याग्नेट बन्छ, उल्टो सुल्टो र भौँगारोले तातो बनाउँछ, पातलो पाताले बचाउँछ।',
      lines: [['idea', <>Milne → magnet · ulto-sulto + bhaugaro → taato · patla pata → kam taato</>]],
    },
  ],
  lecturer: [
    {
      say: 'Ferromagnetic material ma magnetic domains hunchan. Unmagnetised awastha ma tiniharu random direction ma hunchan.',
      voice: 'फेरोम्याग्नेटिक म्याटेरियलमा म्याग्नेटिक डोमेन्स हुन्छन्। अनम्याग्नेटाइज्ड अवस्थामा तिनीहरू र्‍यान्डम डाइरेक्सनमा हुन्छन्।',
      lines: [['h', <>1.7 · Magnetisation of iron</>], part(<>Ferromagnetic material</>, <>domains in random directions</>)],
    },
    {
      say: 'Magnetising current badhaudai jada domains applied field ko direction ma align hunchan.',
      voice: 'म्याग्नेटाइजिङ करेन्ट बढाउँदै जाँदा डोमेन्स एप्लाइड फिल्डको डाइरेक्सनमा एलाइन हुन्छन्।',
      lines: [chain(<>Magnetising current ↑ → domains align with the field</>)],
    },
    {
      say: 'Sabai domains align bhayepachi aru current le flux density lagbhag badhdaina: saturation.',
      voice: 'सबै डोमेन्स एलाइन भएपछि, अरू करेन्टले फ्लक्स डेन्सिटी लगभग बढ्दैन — स्याचुरेसन।',
      lines: [chain(<>All domains aligned → saturation</>)],
    },
    {
      say: 'Current zero garda pani kehi domains aligned rahanchan; core ma residual magnetism rahancha.',
      voice: 'करेन्ट जिरो गर्दा पनि केही डोमेन्स एलाइन्ड रहन्छन्, कोरमा रेसिड्युअल म्याग्नेटिज्म रहन्छ।',
      lines: [chain(<>Current removed → residual magnetism remains</>)],
      ask: {
        q: 'Current hataye pachi pani core ma baki rahane magnetism lai k bhanincha?',
        voice: 'करेन्ट हटाएपछि पनि कोरमा बाँकी रहने म्याग्नेटिज्मलाई के भनिन्छ?',
        options: ['Residual magnetism', 'Saturation', 'Eddy current'],
        answer: 0,
        why: 'Kehi domains aligned nai rahanchan: residual magnetism.',
      },
    },
    {
      say: 'AC excitation ma domains har cycle ulto pharkinchan; tyo molecular friction heat ma janchha: hysteresis loss.',
      voice: 'ए सी एक्साइटेसनमा डोमेन्स हरेक साइकल उल्टो फर्किन्छन्, त्यो मोलिक्युलर फ्रिक्सन हिटमा जान्छ — हिस्टेरेसिस लस।',
      lines: [chain(<>Reversal every cycle → molecular friction → hysteresis loss</>)],
    },
    {
      say: 'Changing flux le core bhitra circulating currents induce garcha: eddy currents, ra tiniharu le heat banaucha.',
      voice: 'चेन्जिङ फ्लक्सले कोरभित्र सर्कुलेटिङ करेन्ट्स इन्ड्युस गर्छ — एडी करेन्ट्स, र तिनीहरूले हिट बनाउँछ।',
      lines: [chain(<>Changing flux → circulating eddy currents → eddy current loss</>)],
    },
    {
      say: 'Core lai patla insulated laminations bata banauda eddy current ko path saano huncha ra loss ghatcha.',
      voice: 'कोरलाई पातलो इन्सुलेटेड ल्यामिनेसन्सबाट बनाउँदा एडी करेन्टको पाथ सानो हुन्छ, र लस घट्छ।',
      lines: [chain(<>Thin insulated laminations → eddy loss reduced</>)],
    },
    {
      say: 'Saransha: domains align bhayera magnetisation, reversal le hysteresis loss, ra circulating current le eddy loss.',
      voice: 'सारांश — डोमेन्स एलाइन भएर म्याग्नेटाइजेसन, रिभर्सलले हिस्टेरेसिस लस, र सर्कुलेटिङ करेन्टले एडी लस।',
      lines: [['idea', <>Alignment → magnetisation · reversal → hysteresis loss · circulating current → eddy loss</>]],
    },
  ],
});

export const bh12 = duo('B-H curve and hysteresis loop', {
  draw: bhFigure,
  viewBox: '0 0 360 235',
  tutor: [
    {
      say: 'Figure 1.2 ma x-axis ma H, magnetising force; y-axis ma B, flux density. H current sanga badhcha.',
      voice: 'फिगर वान पोइन्ट टुमा एक्स एक्सिसमा एच, म्याग्नेटाइजिङ फोर्स, वाई एक्सिसमा बी, फ्लक्स डेन्सिटी। एच करेन्टसँग बढ्छ।',
      lines: [['h', <>B-H curve</>], ['eq', tex(String.raw`B = \mu_0\mu_r H, \quad H = \dfrac{NI}{l}`)]],
    },
    {
      say: 'Suru ma B chito badhcha, ani curve dhalkincha: saturation. Yo magnetisation curve ho.',
      voice: 'सुरुमा बी छिटो बढ्छ, अनि कर्भ ढल्किन्छ — स्याचुरेसन। यो म्याग्नेटाइजेसन कर्भ हो।',
      lines: [['step', <>Initial curve: B rises fast, then bends → saturation (μ<sub>r</sub> not constant)</>]],
    },
    {
      say: 'H ghataudai zero ma lyau, B zero hudaina: B r baki rahancha. Yo residual flux density ho, retentivity.',
      voice: 'एच घटाउँदै जिरोमा ल्याऊ, बी जिरो हुँदैन — बी आर बाँकी रहन्छ। यो रेसिड्युअल फ्लक्स डेन्सिटी हो, रिटेन्टिभिटी।',
      lines: [['step', <>H → 0 but B = B<sub>r</sub> (residual flux density, retentivity)</>]],
    },
    {
      say: 'B lai zero banauna ulto H chahincha: minus H c, coercive force. Ani pura cycle le loop banaucha.',
      voice: 'बीलाई जिरो बनाउन उल्टो एच चाहिन्छ — माइनस एच सी, कोअर्सिभ फोर्स। अनि पूरा साइकलले लुप बनाउँछ।',
      lines: [['step', <>B = 0 needs −H<sub>c</sub> (coercive force) → closed loop: B lags H</>]],
      ask: {
        q: 'B lai zero banauna chahine ulto H lai k bhanincha?',
        voice: 'बीलाई जिरो बनाउन चाहिने उल्टो एचलाई के भनिन्छ?',
        options: ['Coercive force', 'Retentivity', 'Saturation'],
        answer: 0,
        why: 'Residual flux hataune ulto H coercive force H c ho.',
      },
    },
    {
      say: 'DC excitation ma core eutai disha ma magnetise huncha, loop banna paudaina. AC ma har cycle pura loop, tesaile loss.',
      voice: 'डी सी एक्साइटेसनमा कोर एउटै दिशामा म्याग्नेटाइज हुन्छ, लुप बन्न पाउँदैन। ए सीमा हरेक साइकल पूरा लुप, त्यसैले लस।',
      lines: [['idea', <>DC: one direction, no loop traced · AC: one full loop per cycle → hysteresis loss. Narrow loop = soft iron for machines.</>]],
    },
  ],
  lecturer: [
    {
      say: 'The B-H curve shows flux density B against magnetising force H, Figure 1.2.',
      voice: 'द बी एच कर्भ सोज फ्लक्स डेन्सिटी बी अगेन्स्ट म्याग्नेटाइजिङ फोर्स एच, फिगर वान पोइन्ट टु।',
      lines: [['h', <>Magnetisation characteristic</>], ['eq', tex(String.raw`B = \mu_0\mu_r H, \quad H = \dfrac{NI}{l}`)]],
    },
    {
      say: 'Initially B increases rapidly; at high H the curve flattens, the core is saturated.',
      voice: 'इनिसियल्ली बी इन्क्रिजेज र्‍यापिड्ली, एट हाइ एच द कर्भ फ्ल्याटन्स, द कोर इज स्याचुरेटेड।',
      lines: [['step', <>Initial magnetisation curve; saturation at high H; μ<sub>r</sub> varies with H</>]],
    },
    {
      say: 'When H is reduced to zero, B equals B r, the residual flux density or retentivity.',
      voice: 'ह्वेन एच इज रिड्युस्ड टु जिरो, बी इक्वल्स बी आर, द रेसिड्युअल फ्लक्स डेन्सिटी अर रिटेन्टिभिटी।',
      lines: [['step', <>At H = 0, B = B<sub>r</sub> (retentivity)</>]],
    },
    {
      say: 'A reverse field minus H c, the coercive force, reduces B to zero. One cycle traces the hysteresis loop; B lags behind H.',
      voice: 'अ रिभर्स फिल्ड माइनस एच सी, द कोअर्सिभ फोर्स, रिड्युसेज बी टु जिरो। वान साइकल ट्रेसेज द हिस्टेरेसिस लुप, बी ल्याग्स बिहाइन्ड एच।',
      lines: [['step', <>At B = 0, H = −H<sub>c</sub> (coercivity); the lagging of B behind H is hysteresis</>]],
      ask: {
        q: 'Hysteresis ko artha k ho?',
        voice: 'हिस्टेरेसिसको अर्थ के हो?',
        options: ['B le H lai pachyaunu (lag)', 'B ra H sangai badhnu', 'Flux zero hunu'],
        answer: 0,
        why: 'Hysteresis = B ko H bhanda pachhadi parne gun.',
      },
    },
    {
      say: 'With DC excitation the core is magnetised in one direction only; with AC a full loop is traced every cycle, causing loss.',
      voice: 'विद डी सी एक्साइटेसन द कोर इज म्याग्नेटाइज्ड इन वान डाइरेक्सन ओन्ली, विद ए सी अ फुल लुप इज ट्रेस्ड एभ्री साइकल, कजिङ लस।',
      lines: [['step', <><Pts items={[<>DC excitation: no reversal, no loop traced</>, <>AC excitation: one loop per cycle → hysteresis loss; machines use soft (narrow-loop) silicon steel</>]} /></>]],
    },
  ],
});

export const loss12 = duo('Derivation: hysteresis loss and eddy current loss', {
  draw: bhFigure,
  viewBox: '0 0 360 235',
  tutor: [
    {
      say: 'Coil ma voltage v le current i pathaucha, ra core ma flux badlinchha. Dt samaya ma energy v i dt.',
      voice: 'कोइलमा भोल्टेज भीले करेन्ट आई पठाउँछ, र कोरमा फ्लक्स बदलिन्छ। डी टी समयमा इनर्जी भी आई डी टी।',
      lines: [['h', <>Hysteresis loss = loop area</>], ['eq', tex(String.raw`dW = v\,i\,dt, \quad v = N A \dfrac{dB}{dt}`)]],
    },
    {
      say: 'i equals H l over N rakhau. N kattincha: d W equals A l times H d B. A l nai core ko volume V.',
      voice: 'आई इक्वल्स एच एल ओभर एन राखौं। एन कटिन्छ — डी डब्लु इक्वल्स ए एल टाइम्स एच डी बी। ए एल नै कोरको भोल्युम भी।',
      lines: [['eq', tex(String.raw`\begin{aligned} dW &= \underbrace{N A \dfrac{dB}{dt}}_{v}\cdot\underbrace{\dfrac{Hl}{N}}_{i}\,dt \\ &= (Al)\,H\,dB \end{aligned}`)]],
    },
    {
      say: 'Euta cycle ma jodda H d B ko integral nai loop ko area. Tesaile per cycle per meter cube energy equals loop area.',
      voice: 'एउटा साइकलमा जोड्दा एच डी बीको इन्टिग्रल नै लुपको एरिया। त्यसैले पर साइकल पर मिटर क्युब इनर्जी इक्वल्स लुप एरिया।',
      lines: [['eq', tex(String.raw`\begin{aligned} \dfrac{W}{V} &= \oint H\,dB \\ &= \boxed{\text{area of the loop}} \end{aligned}`)]],
      ask: {
        q: 'Core ko volume dobar bhaye hysteresis loss kati huncha?',
        voice: 'कोरको भोल्युम दोब्बर भए हिस्टेरेसिस लस कति हुन्छ?',
        options: ['Dobar', 'Aadha', 'Ustai'],
        answer: 0,
        why: 'W = V × loop area: volume sanga sidhai badhcha.',
      },
    },
    {
      say: 'Second ma f cycle hunchan. Steinmetz le loop area lai eta B max ko 1.6 power bhane: P h equals eta B max 1.6 f V.',
      voice: 'सेकेन्डमा एफ साइकल हुन्छन्। स्टाइनमेट्जले लुप एरियालाई इटा बी म्याक्सको वान पोइन्ट सिक्स पावर भने — पी एच इक्वल्स इटा बी म्याक्स वान पोइन्ट सिक्स एफ भी।',
      lines: [['eq', tex(String.raw`\boxed{P_h = \eta\, B_{max}^{1.6} f\, V\unit{watt}}`)]],
    },
    {
      say: 'Eddy current loss lamination ko motai t ko square sanga badhcha: P e equals k e B m square f square t square V. Tesaile patla pata.',
      voice: 'एडी करेन्ट लस ल्यामिनेसनको मोटाइ टीको स्क्वायरसँग बढ्छ — पी ई इक्वल्स के ई बी एम स्क्वायर एफ स्क्वायर टी स्क्वायर भी। त्यसैले पातलो पाता।',
      lines: [['eq', tex(String.raw`\boxed{P_e = k_e B_m^2 f^2 t^2 V}`)]],
    },
  ],
  lecturer: [
    {
      say: 'Let a coil of N turns on a core of length l and area A carry current i. Energy supplied in time dt is v i dt.',
      voice: 'लेट अ कोइल अफ एन टर्न्स अन अ कोर अफ लेन्थ एल एन्ड एरिया ए क्यारी करेन्ट आई। इनर्जी सप्लाइड इन टाइम डी टी इज भी आई डी टी।',
      lines: [['h', <>Energy per cycle = area of hysteresis loop</>], ['eq', tex(String.raw`dW = v\,i\,dt, \quad v = N A \dfrac{dB}{dt}`)]],
    },
    {
      say: 'Substituting i equals H l over N, d W equals A l H d B.',
      voice: 'सब्स्टिट्युटिङ आई इक्वल्स एच एल ओभर एन, डी डब्लु इक्वल्स ए एल एच डी बी।',
      lines: [['eq', tex(String.raw`\begin{aligned} dW &= \underbrace{N A \dfrac{dB}{dt}}_{v}\cdot\underbrace{\dfrac{Hl}{N}}_{i}\,dt \\ &= (Al)\,H\,dB \end{aligned}`)]],
    },
    {
      say: 'Over one cycle, energy per unit volume equals the closed integral of H d B, the area of the loop.',
      voice: 'ओभर वान साइकल, इनर्जी पर युनिट भोल्युम इक्वल्स द क्लोज्ड इन्टिग्रल अफ एच डी बी, द एरिया अफ द लुप।',
      lines: [['eq', tex(String.raw`\begin{aligned} \dfrac{W}{V} &= \oint H\,dB \\ &= \boxed{\text{area of the loop}} \end{aligned}`)]],
      ask: {
        q: 'Hysteresis loss frequency sanga kasari badlincha?',
        voice: 'हिस्टेरेसिस लस फ्रिक्वेन्सीसँग कसरी बदलिन्छ?',
        options: ['f sanga sidhai', 'f square sanga', 'f sanga badlindaina'],
        answer: 0,
        why: 'Each cycle traces one loop: P h ∝ f.',
      },
    },
    {
      say: "Steinmetz's empirical law: P h equals eta B max to the 1.6, f V, where eta is the hysteresis coefficient.",
      voice: 'स्टाइनमेट्जस इम्पिरिकल ल — पी एच इक्वल्स इटा बी म्याक्स टु द वान पोइन्ट सिक्स, एफ भी, ह्वेयर इटा इज द हिस्टेरेसिस कोएफिसियन्ट।',
      lines: [['eq', tex(String.raw`\boxed{P_h = \eta\, B_{max}^{1.6} f\, V\unit{watt}}`)]],
    },
    {
      say: 'Eddy current loss: P e equals k e B m square f square t square V; it is reduced by thin laminations.',
      voice: 'एडी करेन्ट लस — पी ई इक्वल्स के ई बी एम स्क्वायर एफ स्क्वायर टी स्क्वायर भी, इट इज रिड्युस्ड बाइ थिन ल्यामिनेसन्स।',
      lines: [['eq', tex(String.raw`\boxed{P_e = k_e B_m^2 f^2 t^2 V}`)]],
    },
  ],
});

export const loopAnswer12 = answer('Model answer: hysteresis and the area of the loop', {
  draw: bhFigure,
  viewBox: '0 0 360 235',
  papers: ['2065 Chaitra'],
  q: 'Explain the magnetic hysteresis and show that energy spent per cycle per unit volume is equal to the area of hysteresis loop.',
  read: {
    say: 'IOE 2065 Chaitra: explain the magnetic hysteresis and show that energy spent per cycle per unit volume is equal to the area of hysteresis loop.',
    voice: 'आई ओ ई दुई हजार पैंसट्ठी चैत — एक्सप्लेन द म्याग्नेटिक हिस्टेरेसिस एन्ड सो दयाट इनर्जी स्पेन्ट पर साइकल पर युनिट भोल्युम इज इक्वल टु द एरिया अफ हिस्टेरेसिस लुप।',
  },
  points: [
    {
      node: <><H>Magnetic hysteresis</H><Pts items={[<>The lagging of flux density B behind magnetising force H when a material is taken through a cycle of magnetisation (Fig. 1.2).</>]} /></>,
      say: 'Hysteresis: the lagging of flux density B behind magnetising force H, when the material is taken through a cycle of magnetisation.',
      voice: 'हिस्टेरेसिस — द ल्यागिङ अफ फ्लक्स डेन्सिटी बी बिहाइन्ड म्याग्नेटाइजिङ फोर्स एच, ह्वेन द म्याटेरियल इज टेकन थ्रु अ साइकल अफ म्याग्नेटाइजेसन।',
    },
    {
      node: <><Pts items={[<>H ↑: B rises to saturation · H → 0: B = B<sub>r</sub> (retentivity)</>, <>H = −H<sub>c</sub> (coercive force): B = 0 · reverse and back: a closed loop</>]} /></>,
      say: 'H badhda B saturation samma; H zero garda B r baki; minus H c ma B zero; ulto ra pheri, closed loop.',
      voice: 'एच बढ्दा बी स्याचुरेसनसम्म, एच जिरो गर्दा बी आर बाँकी, माइनस एच सीमा बी जिरो, उल्टो र फेरि, क्लोज्ड लुप।',
    },
    {
      page: true,
      node: <><H>Energy per cycle</H>Let N turns, core length l, area A, current i.<K>{String.raw`\begin{aligned} v &= NA\dfrac{dB}{dt}, \quad i = \dfrac{Hl}{N} \\ dW &= v\,i\,dt \\ &= (Al)\,H\,dB \end{aligned}`}</K></>,
      say: 'Let N turns, length l, area A. v equals N A d B by d t, i equals H l over N. Hence d W equals A l H d B.',
      voice: 'लेट एन टर्न्स, लेन्थ एल, एरिया ए। भी इक्वल्स एन ए डी बी बाइ डी टी, आई इक्वल्स एच एल ओभर एन। हेन्स डी डब्लु इक्वल्स ए एल एच डी बी।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} W &= Al\oint H\,dB \\ \therefore\ \dfrac{W}{Al} &= \oint H\,dB \end{aligned}`}</K></>,
      say: 'Integrating over one cycle, W equals A l times the closed integral of H d B. Therefore W over A l equals the closed integral of H d B.',
      voice: 'इन्टिग्रेटिङ ओभर वान साइकल, डब्लु इक्वल्स ए एल टाइम्स द क्लोज्ड इन्टिग्रल अफ एच डी बी। देयरफोर डब्लु ओभर ए एल इक्वल्स द क्लोज्ड इन्टिग्रल अफ एच डी बी।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} \text{Energy per cycle per m}^3 &= \oint H\,dB \\ &= \boxed{\text{area of the B-H loop}} \end{aligned}`}</K>Hence proved.</>,
      say: 'A l is the volume, so energy per cycle per unit volume equals the area of the B H loop. Hence proved.',
      voice: 'ए एल इज द भोल्युम, सो इनर्जी पर साइकल पर युनिट भोल्युम इक्वल्स द एरिया अफ द बी एच लुप। हेन्स प्रुभ्ड।',
      ask: {
        q: 'Transformer core ko lagi kasto loop bhayeko material ramro?',
        voice: 'ट्रान्सफर्मर कोरको लागि कस्तो लुप भएको म्याटेरियल राम्रो?',
        options: ['Sano (narrow) loop', 'Thulo (wide) loop', 'Loop ko farak pardaina'],
        answer: 0,
        why: 'Loop area = loss per cycle: sano loop, kam loss.',
      },
    },
  ],
});

export const reduceAnswer12 = answer('Model answer: reducing hysteresis and eddy current losses', {
  papers: ['2067 Mangsir'],
  q: 'What are hysteresis and eddy current losses? What are their significance in the operation of electric machine? Write down different methods to reduce them.',
  read: {
    say: 'IOE 2067 Mangsir: what are hysteresis and eddy current losses? What are their significance in the operation of electric machine? Write down different methods to reduce them.',
    voice: 'आई ओ ई दुई हजार सतसट्ठी मंसिर — ह्वाट आर हिस्टेरेसिस एन्ड एडी करेन्ट लसेस? ह्वाट आर देयर सिग्निफिकेन्स इन द अपरेसन अफ इलेक्ट्रिक मेसिन? राइट डाउन डिफरेन्ट मेथड्स टु रिड्युस देम।',
  },
  points: [
    {
      node: <><H>Hysteresis loss</H><Pts items={[<>Energy lost as heat when the core is magnetised in alternate directions; <K>{String.raw`P_h = \eta B_{max}^{1.6} f V`}</K></>]} /></>,
      say: 'Hysteresis loss: energy lost as heat when the core is magnetised in alternate directions; P h equals eta B max 1.6 f V.',
      voice: 'हिस्टेरेसिस लस — इनर्जी लस्ट एज हिट ह्वेन द कोर इज म्याग्नेटाइज्ड इन अल्टरनेट डाइरेक्सन्स, पी एच इक्वल्स इटा बी म्याक्स वान पोइन्ट सिक्स एफ भी।',
    },
    {
      node: <><H>Eddy current loss</H><Pts items={[<>Changing flux induces circulating currents in the core itself; their I²R heat is <K>{String.raw`P_e = k_e B_m^2 f^2 t^2 V`}</K></>]} /></>,
      say: 'Eddy current loss: changing flux induces circulating currents in the core; their heat is P e equals k e B m square f square t square V.',
      voice: 'एडी करेन्ट लस — चेन्जिङ फ्लक्स इन्ड्युसेज सर्कुलेटिङ करेन्ट्स इन द कोर, देयर हिट इज पी ई इक्वल्स के ई बी एम स्क्वायर एफ स्क्वायर टी स्क्वायर भी।',
    },
    {
      node: <><H>Significance</H><Pts items={[<>Together the core (iron) loss: lowers efficiency, heats the core, needs cooling</>, <>Nearly constant with load in transformers and shunt machines</>]} /></>,
      say: 'Significance: together they are the iron loss; they lower efficiency, heat the core and need cooling. They stay nearly constant with load.',
      voice: 'सिग्निफिकेन्स — टुगेदर देय आर द आइरन लस, देय लोअर इफिसियन्सी, हिट द कोर, एन्ड निड कुलिङ। देय स्टे नियर्ली कन्स्टेन्ट विद लोड।',
    },
    {
      page: true,
      node: <><H>Methods to reduce</H><Pts items={[<>Hysteresis: soft magnetic material with a narrow loop, e.g. silicon steel, CRGO</>, <>Eddy current: thin laminations insulated by varnish; high-resistivity (silicon) steel</>, <>Both: lower B<sub>max</sub> by design (larger core area)</>]} /></>,
      say: 'Reduce: for hysteresis, a narrow-loop soft material such as silicon steel. For eddy current, thin insulated laminations and high-resistivity steel. Both fall with lower B max.',
      voice: 'रिड्युस — फर हिस्टेरेसिस, अ न्यारो लुप सफ्ट म्याटेरियल सच एज सिलिकन स्टिल। फर एडी करेन्ट, थिन इन्सुलेटेड ल्यामिनेसन्स एन्ड हाइ रेजिस्टिभिटी स्टिल। बोथ फल विद लोअर बी म्याक्स।',
      ask: {
        q: 'Lamination ko motai aadha garyo bhane eddy current loss kati huncha?',
        voice: 'ल्यामिनेसनको मोटाइ आधा गर्‍यो भने एडी करेन्ट लस कति हुन्छ?',
        options: ['Ek chauthai', 'Aadha', 'Ustai'],
        answer: 0,
        why: 'P e ∝ t²: (1/2)² = 1/4.',
      },
    },
  ],
});

/* ── 1.3 Faraday's law, induced EMF, force on conductor ──────────────── */
export const basics13 = duo('1.8 · Basic understanding: how does a moving magnet make electricity?', {
  three: magnetTour([
    { shot: 'right', show: ['magnet', 'loop', 'meter'], move: 0, focus: ['magnet', 'loop'], labels: [['magnet', 'magnet'], ['tar ko loop', 'loop']] },
    { move: 0, focus: ['meter'], labels: [['meter: shant', 'meter']] },
    { move: 1, focus: ['magnet', 'meter'], labels: [['chalaayo: sui hallyo', 'meter']] },
    { move: 1, focus: ['meter'], labels: [['bhitra ra bahira: ulto', 'meter']] },
    { shot: 'top', show: [...WIRED, 'coil2', 'lamp'], flow: 0.8, flux: 0.9, lamp: 1, focus: ['coil2', 'lamp'], labels: [['nachhoi bijuli', 'lamp']] },
    { shot: 'right', show: ['poles', 'rod'], flow: 0, flux: 0, lamp: 0, push: 0, focus: ['rod', 'poles'], labels: [['magnet ko bich ma rod', 'rod']] },
    { push: 1, focus: ['rod'], labels: [['current: dhakka', 'force']] },
    { shot: 'wide', show: [...WIRED, 'coil2', 'lamp', 'magnet', 'loop', 'meter'], flow: 0.6, flux: 0.8, lamp: 1, move: 1, push: 0, focus: null },
  ]),
  tutor: [
    {
      say: 'Euta magnet ra tar ko loop. Loop ko tar meter ma jodiyeko cha. Battery chaina.',
      voice: 'एउटा म्याग्नेट र तारको लुप। लुपको तार मिटरमा जोडिएको छ। ब्याट्री छैन।',
      lines: [['h', <>1.8 · Magnet chalaye bijuli kasari?</>], ['step', <>Magnet + tar ko loop + meter, battery chaina</>]],
    },
    {
      say: 'Magnet loop ko mukh ma chupchap cha bhane meter ko sui pani chupchap. Kehi hudaina.',
      voice: 'म्याग्नेट लुपको मुखमा चुपचाप छ भने मिटरको सुई पनि चुपचाप। केही हुँदैन।',
      lines: [chain(<>Magnet chupchap → sui chupchap</>)],
    },
    {
      say: 'Aba magnet bhitra-bahira chalau. Sui halliyo! Tar ma bijuli aayo, battery bina.',
      voice: 'अब म्याग्नेट भित्र बाहिर चलाऊ। सुई हल्लियो! तारमा बिजुली आयो, ब्याट्री बिना।',
      lines: [chain(<>Magnet chalyo → loop ma bijuli (induced EMF)</>)],
      ask: {
        q: 'Loop ma bijuli kahile aaucha?',
        voice: 'लुपमा बिजुली कहिले आउँछ?',
        options: ['Magnet chalda', 'Magnet chupchap huda', 'Kahile pani aaudaina'],
        answer: 0,
        why: 'Loop bhitra ko magnet ko bal badlida matra bijuli aaucha.',
      },
    },
    {
      say: 'Bhitra lagda sui eta, bahira tanda uta. Jati chito chalayo, utti thulo hallai. Badlai nai mukhya kura ho.',
      voice: 'भित्र लाग्दा सुई यता, बाहिर तान्दा उता। जति छिटो चलायो, उति ठूलो हल्लाइ। बदलाइ नै मुख्य कुरा हो।',
      lines: [chain(<>Chito badlai → thulo bijuli · ulto chal → ulto disha</>)],
    },
    {
      say: 'Kehi pani nachalai pani hunchha: pahilo coil ma AC le falam ma magnet badlirahancha, dosro coil ko bulb balcha. Yo transformer ko kura.',
      voice: 'केही पनि नचलाई पनि हुन्छ — पहिलो कोइलमा ए सीले फलाममा म्याग्नेट बदलिरहन्छ, दोस्रो कोइलको बल्ब बल्छ। यो ट्रान्सफर्मरको कुरा।',
      lines: [chain(<>Kehi nachali, magnet matra badlincha → static (transformer)</>)],
    },
    {
      say: 'Ulto kura pani huncha: magnet ko bich ma tama ko rod rakhau.',
      voice: 'उल्टो कुरा पनि हुन्छ — म्याग्नेटको बीचमा तामाको रड राखौं।',
      lines: [['step', <>Magnet ko bich ma tama ko rod</>]],
    },
    {
      say: 'Rod ma current pathaau: rod lai dhakka lagcha ra rod sarcha. Yahi dhakka le motor ghumaucha.',
      voice: 'रडमा करेन्ट पठाऊ — रडलाई धक्का लाग्छ, र रड सर्छ। यही धक्काले मोटर घुमाउँछ।',
      lines: [chain(<>Current + magnet → dhakka (motor ko bal)</>)],
    },
    {
      say: 'Saransha: magnet ra tar ma badlai bhaye bijuli; magnet ma current bokeko tar rakhe dhakka. Generator ra motor yahi dui kura.',
      voice: 'सारांश — म्याग्नेट र तारमा बदलाइ भए बिजुली, म्याग्नेटमा करेन्ट बोकेको तार राखे धक्का। जेनेरेटर र मोटर यही दुई कुरा।',
      lines: [['idea', <>Badlai → bijuli (generator, transformer) · current + magnet → dhakka (motor)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Euta bar magnet, euta coil, ra coil sanga jodiyeko galvanometer. Circuit ma kunai source chaina.',
      voice: 'एउटा बार म्याग्नेट, एउटा कोइल, र कोइलसँग जोडिएको ग्याल्भानोमिटर। सर्किटमा कुनै सोर्स छैन।',
      lines: [['h', <>1.8 · Electromagnetic induction</>], ['step', <>Bar magnet, coil, galvanometer; no source in the circuit</>]],
    },
    {
      say: 'Magnet stationary huda coil sanga linked flux constant huncha; galvanometer le kei dekhaudaina.',
      voice: 'म्याग्नेट स्टेसनरी हुँदा कोइलसँग लिङ्क्ड फ्लक्स कन्स्टेन्ट हुन्छ, ग्याल्भानोमिटरले केही देखाउँदैन।',
      lines: [part(<>Stationary magnet</>, <>constant flux linkage → no deflection</>)],
    },
    {
      say: 'Magnet move garda flux linkage change huncha ra coil ma EMF induce huncha: galvanometer deflect huncha.',
      voice: 'म्याग्नेट मुभ गर्दा फ्लक्स लिङ्केज चेन्ज हुन्छ, र कोइलमा ई एम एफ इन्ड्युस हुन्छ — ग्याल्भानोमिटर डिफ्लेक्ट हुन्छ।',
      lines: [chain(<>Changing flux linkage → induced EMF</>)],
      ask: {
        q: 'Coil ma EMF induce hune awashyak sart k ho?',
        voice: 'कोइलमा ई एम एफ इन्ड्युस हुने आवश्यक सर्त के हो?',
        options: ['Flux linkage change hunu', 'Thulo magnet hunu', 'Coil ma battery hunu'],
        answer: 0,
        why: 'Faraday: flux linkage change bhaye matra EMF induce huncha.',
      },
    },
    {
      say: 'Change ko rate badhda EMF badhcha; motion ulto bhaye EMF ko polarity ulto huncha.',
      voice: 'चेन्जको रेट बढ्दा ई एम एफ बढ्छ, मोसन उल्टो भए ई एम एफको पोलारिटी उल्टो हुन्छ।',
      lines: [chain(<>Faster change → larger EMF · reversed motion → reversed polarity</>)],
    },
    {
      say: 'Conductor ra field stationary rahera flux matra alternate bhaye statically induced EMF: transformer ma yahi huncha.',
      voice: 'कन्डक्टर र फिल्ड स्टेसनरी रहेर फ्लक्स मात्र अल्टरनेट भए स्टाटिकल्ली इन्ड्युस्ड ई एम एफ — ट्रान्सफर्मरमा यही हुन्छ।',
      lines: [chain(<>No motion, alternating flux → statically induced EMF (transformer)</>)],
    },
    {
      say: 'Aba magnetic field ma current-carrying conductor rakhincha.',
      voice: 'अब म्याग्नेटिक फिल्डमा करेन्ट क्यारिङ कन्डक्टर राखिन्छ।',
      lines: [['step', <>A current-carrying conductor in a magnetic field</>]],
    },
    {
      say: 'Conductor ma mechanical force lagcha ra conductor move huncha: yo motor action ho.',
      voice: 'कन्डक्टरमा मेकानिकल फोर्स लाग्छ, र कन्डक्टर मुभ हुन्छ — यो मोटर एक्सन हो।',
      lines: [chain(<>Force on the conductor → motor action</>)],
    },
    {
      say: 'Saransha: changing flux linkage le EMF dincha, ra field ma current le force dincha. Sabai machines yahi dui principle ma chalchan.',
      voice: 'सारांश — चेन्जिङ फ्लक्स लिङ्केजले ई एम एफ दिन्छ, र फिल्डमा करेन्टले फोर्स दिन्छ। सबै मेसिन्स यही दुई प्रिन्सिपलमा चल्छन्।',
      lines: [['idea', <>Changing flux linkage → EMF · current in a field → force: the two principles of all machines</>]],
    },
  ],
});

export const faraday13 = duo("Faraday's laws and statically/dynamically induced EMF", {
  draw: inductionFigure,
  viewBox: '0 0 370 225',
  tutor: [
    {
      say: 'Figure 1.3 a: magnet coil tira sarcha. Pahilo law: coil sanga linked flux badlida coil ma EMF induce huncha.',
      voice: 'फिगर वान पोइन्ट थ्री ए — म्याग्नेट कोइलतिर सर्छ। पहिलो ल — कोइलसँग लिङ्क्ड फ्लक्स बदलिँदा कोइलमा ई एम एफ इन्ड्युस हुन्छ।',
      lines: [['h', <>Faraday’s laws</>], ['step', <>First law: a change in flux linkage induces an EMF</>]],
    },
    {
      say: 'Dosro law: EMF ko size flux linkage badlinne rate barabar. Lenz ko law le minus sign dincha: EMF le aafno karan lai oppose garcha.',
      voice: 'दोस्रो ल — ई एम एफको साइज फ्लक्स लिङ्केज बदलिने रेट बराबर। लेन्जको लले माइनस साइन दिन्छ — ई एम एफले आफ्नो कारणलाई अपोज गर्छ।',
      lines: [['eq', tex(String.raw`\boxed{e = -N\dfrac{d\Phi}{dt}}`)]],
      ask: {
        q: 'Equation ma minus sign kun law bata aaucha?',
        voice: 'इक्वेसनमा माइनस साइन कुन लबाट आउँछ?',
        options: ["Lenz's law", "Ohm's law", "Ampere's law"],
        answer: 0,
        why: 'Lenz: induced EMF le flux ko change lai oppose garcha.',
      },
    },
    {
      say: 'Kehi pani nachalai flux matra badliyo bhane statically induced EMF. Transformer ma yahi.',
      voice: 'केही पनि नचलाई फ्लक्स मात्र बदलियो भने स्टाटिकल्ली इन्ड्युस्ड ई एम एफ। ट्रान्सफर्मरमा यही।',
      lines: [['step', <>Statically induced: conductor and field still, flux alternates (transformer)</>]],
    },
    {
      say: 'Yesko dui type: aafnai current badlida aafai ma self-induced; arko coil ko current le mutually induced.',
      voice: 'यसको दुई टाइप — आफ्नै करेन्ट बदलिँदा आफैंमा सेल्फ इन्ड्युस्ड, अर्को कोइलको करेन्टले म्युचुअल्ली इन्ड्युस्ड।',
      lines: [['eq', tex(String.raw`e_{self} = -L\dfrac{di}{dt}, \quad e_{mutual} = -M\dfrac{di_1}{dt}`)]],
    },
    {
      say: 'Conductor wa field chalera flux kaatiyo bhane dynamically induced EMF. Generator ma yahi.',
      voice: 'कन्डक्टर वा फिल्ड चलेर फ्लक्स काटियो भने डाइनामिकल्ली इन्ड्युस्ड ई एम एफ। जेनेरेटरमा यही।',
      lines: [['idea', <>Dynamically induced: conductor (or field) moves and cuts flux, <K>{String.raw`e = Blv\sin\theta`}</K> (generator)</>]],
    },
  ],
  lecturer: [
    {
      say: "Faraday's first law: whenever the flux linked with a coil changes, an EMF is induced in it, Figure 1.3 a.",
      voice: 'फाराडेज फर्स्ट ल — ह्वेनएभर द फ्लक्स लिङ्क्ड विद अ कोइल चेन्जेज, एन ई एम एफ इज इन्ड्युस्ड इन इट, फिगर वान पोइन्ट थ्री ए।',
      lines: [['h', <>Faraday’s laws of electromagnetic induction</>], ['step', <><i>First law: whenever the flux linked with a coil changes, an EMF is induced in it.</i></>]],
    },
    {
      say: 'Second law: the magnitude of the induced EMF equals the rate of change of flux linkage. With Lenz’s law, e equals minus N d phi by d t.',
      voice: 'सेकेन्ड ल — द म्याग्निच्युड अफ द इन्ड्युस्ड ई एम एफ इक्वल्स द रेट अफ चेन्ज अफ फ्लक्स लिङ्केज। विद लेन्जेस ल, ई इक्वल्स माइनस एन डी फाइ बाइ डी टी।',
      lines: [['eq', tex(String.raw`\boxed{e = -N\dfrac{d\Phi}{dt}}`)]],
      ask: {
        q: 'Flux linkage ko rate dobar bhaye induced EMF kati huncha?',
        voice: 'फ्लक्स लिङ्केजको रेट दोब्बर भए इन्ड्युस्ड ई एम एफ कति हुन्छ?',
        options: ['Dobar', 'Aadha', 'Char guna'],
        answer: 0,
        why: 'Second law: e ∝ dΦ/dt.',
      },
    },
    {
      say: 'Statically induced EMF: the conductor and field are stationary and the flux changes, as in a transformer.',
      voice: 'स्टाटिकल्ली इन्ड्युस्ड ई एम एफ — द कन्डक्टर एन्ड फिल्ड आर स्टेसनरी एन्ड द फ्लक्स चेन्जेज, एज इन अ ट्रान्सफर्मर।',
      lines: [['step', <>Statically induced: no motion; the flux alternates (transformer)</>]],
    },
    {
      say: 'It is self-induced when a coil’s own current changes, and mutually induced when a neighbouring coil’s current changes.',
      voice: 'इट इज सेल्फ इन्ड्युस्ड ह्वेन अ कोइल्स ओन करेन्ट चेन्जेज, एन्ड म्युचुअल्ली इन्ड्युस्ड ह्वेन अ नेबरिङ कोइल्स करेन्ट चेन्जेज।',
      lines: [['eq', tex(String.raw`e_{self} = -L\dfrac{di}{dt}, \quad e_{mutual} = -M\dfrac{di_1}{dt}`)]],
    },
    {
      say: 'Dynamically induced EMF: the conductor moves and cuts the flux, as in a generator.',
      voice: 'डाइनामिकल्ली इन्ड्युस्ड ई एम एफ — द कन्डक्टर मुभ्स एन्ड कट्स द फ्लक्स, एज इन अ जेनेरेटर।',
      lines: [['step', <>Dynamically induced: the conductor moves and cuts flux, <K>{String.raw`e = Blv\sin\theta`}</K> (generator)</>]],
    },
  ],
});

export const blv13 = duo('Derivation: e = Blv sinθ and F = BIl sinθ', {
  draw: inductionFigure,
  viewBox: '0 0 370 225',
  tutor: [
    {
      say: 'Figure 1.3 b: length l ko conductor, field B ma, velocity v le chalcha.',
      voice: 'फिगर वान पोइन्ट थ्री बी — लेन्थ एलको कन्डक्टर, फिल्ड बीमा, भेलोसिटी भीले चल्छ।',
      lines: [['h', <>Dynamically induced EMF</>], ['step', <>Conductor of length l moves with velocity v across B</>]],
    },
    {
      say: 'd t samaya ma conductor d x sarcha, ra l times d x area ko flux kaatcha: d phi equals B l d x.',
      voice: 'डी टी समयमा कन्डक्टर डी एक्स सर्छ, र एल टाइम्स डी एक्स एरियाको फ्लक्स काट्छ — डी फाइ इक्वल्स बी एल डी एक्स।',
      lines: [['eq', tex(String.raw`d\Phi = B \underbrace{(l\,dx)}_{\text{area swept}}`)]],
    },
    {
      say: 'Faraday le e equals d phi by d t, equals B l d x by d t. d x by d t nai v.',
      voice: 'फाराडेले ई इक्वल्स डी फाइ बाइ डी टी, इक्वल्स बी एल डी एक्स बाइ डी टी। डी एक्स बाइ डी टी नै भी।',
      lines: [['eq', tex(String.raw`\begin{aligned} e &= \dfrac{d\Phi}{dt} \\ &= Bl\underbrace{\dfrac{dx}{dt}}_{v} \\ &= Blv \end{aligned}`)]],
    },
    {
      say: 'Field sanga theta angle ma chale v sin theta matra le flux kaatcha: e equals B l v sin theta. Direction Fleming ko right hand rule le.',
      voice: 'फिल्डसँग थिटा एङ्गलमा चले भी साइन थिटा मात्रले फ्लक्स काट्छ — ई इक्वल्स बी एल भी साइन थिटा। डाइरेक्सन फ्लेमिङको राइट ह्यान्ड रुलले।',
      lines: [['eq', tex(String.raw`\boxed{e = Blv\sin\theta}`)]],
      ask: {
        q: 'Conductor field ko parallel chalyo bhane EMF kati?',
        voice: 'कन्डक्टर फिल्डको प्यारालल चल्यो भने ई एम एफ कति?',
        options: ['Zero', 'Maximum', 'Aadha'],
        answer: 0,
        why: 'Parallel: θ = 0, sin 0 = 0, flux kaatdaina.',
      },
    },
    {
      say: 'Ulto: current I bokeko conductor field ma rakhda force F equals B I l sin theta. Direction Fleming ko left hand rule le.',
      voice: 'उल्टो — करेन्ट आई बोकेको कन्डक्टर फिल्डमा राख्दा फोर्स एफ इक्वल्स बी आई एल साइन थिटा। डाइरेक्सन फ्लेमिङको लेफ्ट ह्यान्ड रुलले।',
      lines: [['eq', tex(String.raw`\boxed{F = BIl\sin\theta\unit{newton}}`)]],
    },
  ],
  lecturer: [
    {
      say: 'Let a conductor of length l move with velocity v perpendicular to a field B, Figure 1.3 b.',
      voice: 'लेट अ कन्डक्टर अफ लेन्थ एल मुभ विद भेलोसिटी भी पर्पेन्डिकुलर टु अ फिल्ड बी, फिगर वान पोइन्ट थ्री बी।',
      lines: [['h', <>Dynamically induced EMF and force</>], ['step', <>Let a conductor of length l move with velocity v across a field B.</>]],
    },
    {
      say: 'In time d t it moves d x and sweeps area l d x; flux cut d phi equals B l d x.',
      voice: 'इन टाइम डी टी इट मुभ्स डी एक्स एन्ड स्विप्स एरिया एल डी एक्स, फ्लक्स कट डी फाइ इक्वल्स बी एल डी एक्स।',
      lines: [['eq', tex(String.raw`d\Phi = B \underbrace{(l\,dx)}_{\text{area swept}}`)]],
    },
    {
      say: 'By Faraday’s law, e equals d phi by d t, which equals B l v.',
      voice: 'बाइ फाराडेज ल, ई इक्वल्स डी फाइ बाइ डी टी, ह्विच इक्वल्स बी एल भी।',
      lines: [['eq', tex(String.raw`\begin{aligned} e &= \dfrac{d\Phi}{dt} \\ &= Bl\underbrace{\dfrac{dx}{dt}}_{v} \\ &= Blv \end{aligned}`)]],
    },
    {
      say: 'If the motion makes angle theta with the field, e equals B l v sin theta; direction by Fleming’s right-hand rule.',
      voice: 'इफ द मोसन मेक्स एङ्गल थिटा विद द फिल्ड, ई इक्वल्स बी एल भी साइन थिटा, डाइरेक्सन बाइ फ्लेमिङ्स राइट ह्यान्ड रुल।',
      lines: [['eq', tex(String.raw`\boxed{e = Blv\sin\theta}`)]],
      ask: {
        q: 'Generator ko EMF ko direction kun rule le dincha?',
        voice: 'जेनेरेटरको ई एम एफको डाइरेक्सन कुन रुलले दिन्छ?',
        options: ["Fleming's right-hand rule", "Fleming's left-hand rule", "Lenz's law matra"],
        answer: 0,
        why: 'Right hand: generator; left hand: motor.',
      },
    },
    {
      say: 'A conductor carrying current I in the field experiences force F equals B I l sin theta; direction by Fleming’s left-hand rule.',
      voice: 'अ कन्डक्टर क्यारिङ करेन्ट आई इन द फिल्ड एक्सपिरियन्सेज फोर्स एफ इक्वल्स बी आई एल साइन थिटा, डाइरेक्सन बाइ फ्लेमिङ्स लेफ्ट ह्यान्ड रुल।',
      lines: [['eq', tex(String.raw`\boxed{F = BIl\sin\theta\unit{newton}}`)]],
    },
  ],
});

export const faradayAnswer13 = answer("Model answer: Faraday's laws and types of induced EMF", {
  draw: inductionFigure,
  viewBox: '0 0 370 225',
  papers: ['2071 Magh'],
  q: "State Faraday's laws of electromagnetic induction. Distinguish between statically induced emf and dynamically induced emf.",
  read: {
    say: "IOE 2071 Magh: state Faraday's laws of electromagnetic induction. Distinguish between statically induced emf and dynamically induced emf.",
    voice: 'आई ओ ई दुई हजार एकहत्तर माघ — स्टेट फाराडेज लज अफ इलेक्ट्रोम्याग्नेटिक इन्डक्सन। डिस्टिङ्ग्विस बिट्विन स्टाटिकल्ली इन्ड्युस्ड ई एम एफ एन्ड डाइनामिकल्ली इन्ड्युस्ड ई एम एफ।',
  },
  points: [
    {
      node: <><H>Faraday’s laws</H><Pts items={[<><b>First law:</b> whenever the magnetic flux linked with a circuit changes, an EMF is induced in it.</>, <><b>Second law:</b> the magnitude of the induced EMF equals the rate of change of flux linkage.</>]} /></>,
      say: 'First law: whenever the flux linked with a circuit changes, an EMF is induced. Second law: its magnitude equals the rate of change of flux linkage.',
      voice: 'फर्स्ट ल — ह्वेनएभर द फ्लक्स लिङ्क्ड विद अ सर्किट चेन्जेज, एन ई एम एफ इज इन्ड्युस्ड। सेकेन्ड ल — इट्स म्याग्निच्युड इक्वल्स द रेट अफ चेन्ज अफ फ्लक्स लिङ्केज।',
    },
    {
      node: <><K>{String.raw`\boxed{e = -N\dfrac{d\Phi}{dt}}`}</K>The minus sign is Lenz’s law: the EMF opposes the change that causes it.</>,
      say: 'e equals minus N d phi by d t; the minus sign is Lenz’s law.',
      voice: 'ई इक्वल्स माइनस एन डी फाइ बाइ डी टी, द माइनस साइन इज लेन्जेस ल।',
    },
    {
      page: true,
      node: <><H>Statically induced EMF</H><Pts items={[<>Conductor and field both stationary; the flux itself alternates</>, <>Self-induced <K>{String.raw`e = -L\,di/dt`}</K>; mutually induced <K>{String.raw`e = -M\,di_1/dt`}</K></>, <>Example: transformer</>]} /></>,
      say: 'Statically induced: conductor and field stationary, the flux alternates. Self-induced, e equals minus L d i by d t; mutually induced, minus M d i 1 by d t. Example: transformer.',
      voice: 'स्टाटिकल्ली इन्ड्युस्ड — कन्डक्टर एन्ड फिल्ड स्टेसनरी, द फ्लक्स अल्टरनेट्स। सेल्फ इन्ड्युस्ड, ई इक्वल्स माइनस एल डी आई बाइ डी टी, म्युचुअल्ली इन्ड्युस्ड, माइनस एम डी आई वान बाइ डी टी। एक्जाम्पल — ट्रान्सफर्मर।',
    },
    {
      node: <><H>Dynamically induced EMF</H><Pts items={[<>Conductor (or field) moves and cuts a steady flux</>, <><K>{String.raw`e = Blv\sin\theta`}</K>, direction by Fleming’s right-hand rule</>, <>Example: DC generator, alternator</>]} /></>,
      say: 'Dynamically induced: the conductor moves and cuts a steady flux; e equals B l v sin theta, direction by Fleming’s right-hand rule. Example: generator.',
      voice: 'डाइनामिकल्ली इन्ड्युस्ड — द कन्डक्टर मुभ्स एन्ड कट्स अ स्टेडी फ्लक्स, ई इक्वल्स बी एल भी साइन थिटा, डाइरेक्सन बाइ फ्लेमिङ्स राइट ह्यान्ड रुल। एक्जाम्पल — जेनेरेटर।',
      ask: {
        q: 'Transformer ma kun EMF induce huncha?',
        voice: 'ट्रान्सफर्मरमा कुन ई एम एफ इन्ड्युस हुन्छ?',
        options: ['Statically induced', 'Dynamically induced', 'Dubai hudaina'],
        answer: 0,
        why: 'Transformer ma kei ghumdaina; flux matra alternate huncha.',
      },
    },
  ],
});


/* ── Fig. 1.4: a parallel (three-limb) magnetic circuit ────────────── */
// 0 core: centre limb and two side limbs · 1 coil on the centre limb · 2 Φ
// in the centre, Φ/2 in each side limb · 3 the electric analogue
export const parallelFigure = (s) => (
  <>
    <g className={s.on(0) + s.hl(0)}>
      <W d="M30 30 H250 V190 H30 Z" w={1.4} />
      <W d="M58 58 H124 V162 H58 Z" w={1.2} />
      <W d="M156 58 H222 V162 H156 Z" w={1.2} />
      <T x={140} y={22} i size={9.5}>centre limb (l<tspan dy="0.3em" style={{ fontSize: '0.72em' }}>c</tspan><tspan dy="-0.3em" />)</T>
      <T x={30} y={208} i size={9.5} a="start">side limbs (l<tspan dy="0.3em" style={{ fontSize: '0.72em' }}>s</tspan><tspan dy="-0.3em" />)</T>
      <Cap x={140} y={228}>Fig. 1.4  Parallel magnetic circuit</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      {[80, 92, 104, 116, 128, 140].map((y) => <W key={y} d={`M118 ${y} H162`} w={1.1} />)}
      <T x={140} y={152} i size={10}>N, I</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M140 150 V70" w={1} />
      {head(140, 66, 'up', 6)}
      <T x={146} y={52} i size={10} a="start">Φ</T>
      <W d="M44 70 V150" w={1} />
      {head(44, 154, 'down', 6)}
      <T x={50} y={112} i size={10} a="start">Φ/2</T>
      <W d="M236 70 V150" w={1} />
      {head(236, 154, 'down', 6)}
      <T x={230} y={112} i size={10} a="end">Φ/2</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <circle cx={290} cy={110} r={10} fill="none" stroke={C.chalk} strokeWidth={1.1} />
      <T x={290} y={114} size={9}>NI</T>
      <W d="M290 100 V70 H320 M290 120 V150 H320 M320 70 V84 M320 136 V150" w={1} />
      <rect x={314} y={84} width={12} height={52} fill="none" stroke={C.chalk} strokeWidth={1} />
      <T x={340} y={114} i size={9}>S</T>
      <T x={305} y={170} size={8.5}>Sc + (Ss ∥ Ss)</T>
    </g>
  </>
);

/* ── 1.2 Ohm's law for magnetic circuits ─────────────────────────────── */
export const basicsOhm12 = duo("1.2 · Basic understanding: what pushes flux, and what holds it back?", {
  three: magnetTour([
    { shot: 'core', show: WIRED, flow: 0.4, flux: 0.4, focus: ['coil', 'battery'], labels: [['dhakka: turns × current', 'coil']] },
    { flow: 1, flux: 0.9, focus: ['coil'], labels: [['dherai dhakka, dherai flux', 'flux']] },
    { focus: ['core'], labels: [['falam: sajilo bato', 'core']] },
    { shot: 'gap', air: 1, flux: 0.35, focus: ['core', 'bridge'], labels: [['hawa: thulo rokawat', 'gap']] },
    { shot: 'whole', air: 0, flux: 0.9, focus: null },
  ]),
  tutor: [
    {
      say: 'Coil ko turns ra current milera flux lai dhakelchan. Yo dhakka lai MMF bhanchan.',
      voice: 'कोइलको टर्न्स र करेन्ट मिलेर फ्लक्सलाई धकेल्छन्। यो धक्कालाई एम एम एफ भन्छन्।',
      lines: [['h', <>1.2 · Flux ko dhakka ra rokawat</>], part(<>MMF</>, <>turns ra current ko dhakka</>)],
    },
    {
      say: 'Current badhayo bhane dhakka badhcha ra flux pani badhcha, battery le current badhaye jastai.',
      voice: 'करेन्ट बढायो भने धक्का बढ्छ, र फ्लक्स पनि बढ्छ — ब्याट्रीले करेन्ट बढाए जस्तै।',
      lines: [chain(<>Dhakka badhyo → flux badhyo</>)],
    },
    {
      say: 'Flux ko bato le pani rokcha. Yo rokawat lai reluctance bhanchan. Falam ma rokawat dherai kam.',
      voice: 'फ्लक्सको बाटोले पनि रोक्छ। यो रोकावटलाई रिलक्टेन्स भन्छन्। फलाममा रोकावट धेरै कम।',
      lines: [part(<>Reluctance</>, <>flux ko bato ko rokawat</>)],
    },
    {
      say: 'Hawa ko gap ma rokawat dherai thulo, tesaile ustai dhakka ma flux ghatcha.',
      voice: 'हावाको ग्यापमा रोकावट धेरै ठूलो, त्यसैले उस्तै धक्कामा फ्लक्स घट्छ।',
      lines: [chain(<>Thulo rokawat → kam flux</>)],
      ask: {
        q: 'Magnetic circuit ma reluctance badhyo bhane flux lai k huncha?',
        voice: 'म्याग्नेटिक सर्किटमा रिलक्टेन्स बढ्यो भने फ्लक्सलाई के हुन्छ?',
        options: ['Ghatcha', 'Badhcha', 'Farak pardaina'],
        answer: 0,
        why: 'Flux dhakka (MMF) bhag rokawat (reluctance) jati huncha.',
      },
    },
    {
      say: 'Saransh: flux equal dhakka bhag rokawat, jastai current equal voltage bhag resistance. Yahi magnetic circuit ko Ohm ko niyam.',
      voice: 'सारांश — फ्लक्स भनेको धक्का भाग रोकावट, जस्तै करेन्ट भनेको भोल्टेज भाग रेजिस्टेन्स। यही म्याग्नेटिक सर्किटको ओमको नियम।',
      lines: [['idea', <>Flux: dhakka bhag rokawat (like current: voltage bhag resistance)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Coil ko N turns ma current I bagda MMF banchha; yasle flux banauncha.',
      voice: 'कोइलको एन टर्न्समा करेन्ट आई बग्दा एम एम एफ बन्छ। यसले फ्लक्स बनाउँछ।',
      lines: [['h', <>1.2 · Ohm’s law for magnetic circuits</>], part(<>MMF</>, <>the driving force, turns times current</>)],
    },
    {
      say: 'MMF badhda flux pani badhcha.',
      voice: 'एम एम एफ बढ्दा फ्लक्स पनि बढ्छ।',
      lines: [chain(<>More MMF → more flux</>)],
    },
    {
      say: 'Flux ko path le opposition dincha, jaslai reluctance bhanincha; iron ko reluctance kam huncha.',
      voice: 'फ्लक्सको पाथले अपोजिसन दिन्छ, जसलाई रिलक्टेन्स भनिन्छ। आइरनको रिलक्टेन्स कम हुन्छ।',
      lines: [part(<>Reluctance</>, <>opposition of the path to flux</>)],
    },
    {
      say: 'Air gap ko reluctance iron bhanda dherai guna badhi huncha.',
      voice: 'एयर ग्यापको रिलक्टेन्स, आइरनभन्दा धेरै गुणा बढी हुन्छ।',
      lines: [chain(<>Air gap: very high reluctance → less flux</>)],
      ask: {
        q: 'Magnetic circuit ma electric resistance ko samaan quantity kun ho?',
        voice: 'म्याग्नेटिक सर्किटमा इलेक्ट्रिक रेजिस्टेन्सको समान क्वान्टिटी कुन हो?',
        options: ['Reluctance', 'Flux', 'MMF'],
        answer: 0,
        why: 'Flux ↔ current, MMF ↔ EMF, reluctance ↔ resistance.',
      },
    },
    {
      say: 'Saransh: flux MMF ko anupat ma ra reluctance ko ulto anupat ma huncha.',
      voice: 'सारांश — फ्लक्स एम एम एफको अनुपातमा, र रिलक्टेन्सको उल्टो अनुपातमा हुन्छ।',
      lines: [['idea', <>Flux grows with MMF and falls with reluctance</>]],
    },
  ],
});

export const reluctance12 = duo("Ohm's law for magnetic circuits: reluctance and permeance", {
  draw: magCircuitFigure,
  viewBox: '0 0 360 230',
  tutor: [
    {
      say: 'Yaad garau: electric circuit ma current equals EMF bhag resistance, ra R equals rho l over a. Magnetic circuit ma pani yastai niyam cha.',
      voice: 'याद गरौं — इलेक्ट्रिक सर्किटमा करेन्ट इक्वल्स ई एम एफ भाग रेजिस्टेन्स, र आर इक्वल्स रो एल ओभर ए। म्याग्नेटिक सर्किटमा पनि यस्तै नियम छ।',
      lines: [['h', <>Ohm’s law for magnetic circuits</>], rem(<K>{String.raw`I = \dfrac{E}{R}`}</K>, <K>{String.raw`R = \dfrac{\rho\, l}{a}`}</K>)],
    },
    {
      say: 'Maanau core ko mean length l, cross-section area A, ra relative permeability mu r. Coil ma N turns ra current I.',
      voice: 'मानौं कोरको मिन लेन्थ एल, क्रस सेक्सन एरिया ए, र रिलेटिभ पर्मियाबिलिटी म्यु आर। कोइलमा एन टर्न्स र करेन्ट आई।',
      lines: [['step', <>Let l = mean length (m), A = area (m²), μ<sub>r</sub> = relative permeability, N turns carrying I</>, undefined, { carry: <>l, A, μ<sub>r</sub>, N, I</> }]],
    },
    {
      say: 'H equals N I over l, ra B equals mu zero mu r H. Flux phi equals B A.',
      voice: 'एच इक्वल्स एन आई ओभर एल, र बी इक्वल्स म्यु जिरो म्यु आर एच। फ्लक्स फाइ इक्वल्स बी ए।',
      lines: [['step', <K>{String.raw`\begin{aligned} H &= \dfrac{NI}{l} \\ B &= \mu_0\mu_r H \\ \phi &= B A \end{aligned}`}</K>]],
    },
    {
      say: 'H kina N I over l? Ampere ko circuital law: bato bhari H times l jodda bhitra ko jamma current N I aaucha.',
      voice: 'एच किन एन आई ओभर एल? एम्पियरको सर्किटल ल — बाटोभरि एच टाइम्स एल जोड्दा, भित्रको जम्मा करेन्ट एन आई आउँछ।',
      lines: [br('Why H = NI/l?', <><Pts items={[<>Ampere’s circuital law round the core path</>, <>N turns each carry I → enclosed current NI</>]} />{tex(String.raw`\oint H\,dl = H l = NI`)}</>)],
    },
    {
      page: true,
      say: 'Main line: phi equals mu zero mu r A N I over l, arthat N I over l over mu zero mu r A. Yahi magnetic Ohm ko niyam: phi equals MMF over S.',
      voice: 'मेन लाइन — फाइ इक्वल्स म्यु जिरो म्यु आर ए एन आई ओभर एल, अर्थात एन आई ओभर, एल ओभर म्यु जिरो म्यु आर ए। यही म्याग्नेटिक ओमको नियम — फाइ इक्वल्स एम एम एफ ओभर एस।',
      lines: [['step', step('Flux', String.raw`\begin{aligned} \phi &= \mu_0\mu_r A\,\dfrac{NI}{l} \\ &= \dfrac{NI}{\;l/(\mu_0\mu_r A)\;} \end{aligned}`)], ['eq', tex(String.raw`\phi = \dfrac{\text{MMF}}{S} \unit{weber}`)]],
    },
    {
      say: 'Reluctance S equals l over mu zero mu r A, AT per weber ma. Permeance P chai reluctance ko ulto: P equals one over S, weber per AT.',
      voice: 'रिलक्टेन्स एस इक्वल्स एल ओभर म्यु जिरो म्यु आर ए, ए टी पर वेबरमा। पर्मियन्स पी चाहिं रिलक्टेन्सको उल्टो — पी इक्वल्स वान ओभर एस, वेबर पर ए टी।',
      lines: [['step', <K>{String.raw`\begin{aligned} S &= \dfrac{l}{\mu_0\mu_r A} \unit{AT/Wb} \\ P &= \dfrac{1}{S} \unit{Wb/AT} \end{aligned}`}</K>]],
      ask: {
        q: 'Core ko length dui guna garda reluctance kati huncha?',
        voice: 'कोरको लेन्थ दुई गुणा गर्दा रिलक्टेन्स कति हुन्छ?',
        options: ['Dui guna', 'Aadha', 'Same'],
        answer: 0,
        why: 'S = l/(μ0μrA): S length sanga sidha proportional.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: electric circuit ma I equals E over R, ra R equals rho l over a.',
      voice: 'स्मरण — इलेक्ट्रिक सर्किटमा आई इक्वल्स ई ओभर आर, र आर इक्वल्स रो एल ओभर ए।',
      lines: [['h', <>Reluctance and permeance</>], rem(<K>{String.raw`I = E/R,\ R = \rho l/a`}</K>)],
    },
    {
      say: 'Let: l mean length, A area, mu r relative permeability, ra N turn ma current I.',
      voice: 'लेट — एल मिन लेन्थ, ए एरिया, म्यु आर रिलेटिभ पर्मियाबिलिटी, र एन टर्नमा करेन्ट आई।',
      lines: [['step', <>Let l = mean length, A = cross-section, μ<sub>r</sub> = relative permeability, N turns, current I.</>, undefined, { carry: <>l, A, μ<sub>r</sub>, N, I</> }]],
    },
    {
      say: 'H equals N I over l equation ek, B equals mu zero mu r H equation dui, ra phi equals B A equation tin.',
      voice: 'एच इक्वल्स एन आई ओभर एल इक्वेसन वान, बी इक्वल्स म्यु जिरो म्यु आर एच इक्वेसन टु, र फाइ इक्वल्स बी ए इक्वेसन थ्री।',
      lines: [['step', <K>{String.raw`\begin{aligned} H &= \dfrac{NI}{l} && \cdots(1) \\ B &= \mu_0\mu_r H && \cdots(2) \\ \phi &= BA && \cdots(3) \end{aligned}`}</K>]],
    },
    {
      say: 'Equation ek Ampere ko circuital law bata aaucha.',
      voice: 'इक्वेसन वान एम्पियरको सर्किटल लबाट आउँछ।',
      lines: [br('Equation (1)', <>{tex(String.raw`\oint H\,dl = NI \Rightarrow H = NI/l`)}</>)],
    },
    {
      page: true,
      say: 'Ek, dui ra tin bata phi equals N I over l over mu zero mu r A, arthat phi equals MMF over S.',
      voice: 'वान, टु र थ्रीबाट फाइ इक्वल्स एन आई ओभर, एल ओभर म्यु जिरो म्यु आर ए — अर्थात फाइ इक्वल्स एम एम एफ ओभर एस।',
      lines: [['step', <>From (1), (2) and (3),{tex(String.raw`\begin{aligned} \phi &= \dfrac{NI}{l/(\mu_0\mu_r A)} && \\ &= \dfrac{\text{MMF}}{S} && \cdots(4) \end{aligned}`)}</>]],
    },
    {
      say: 'Reluctance S equals l over mu zero mu r A ra permeance P equals one over S.',
      voice: 'रिलक्टेन्स एस इक्वल्स एल ओभर म्यु जिरो म्यु आर ए, र पर्मियन्स पी इक्वल्स वान ओभर एस।',
      lines: [['step', <K>{String.raw`\begin{aligned} S &= \dfrac{l}{\mu_0\mu_r A} \unit{AT/Wb} && \cdots(5) \\ P &= \dfrac{1}{S} \unit{Wb/AT} && \cdots(6) \end{aligned}`}</K>]],
      ask: {
        q: 'Permeance ra reluctance bich ko sambandha k ho?',
        voice: 'पर्मियन्स र रिलक्टेन्सबीचको सम्बन्ध के हो?',
        options: ['P = 1/S', 'P = S', 'P = S²'],
        answer: 0,
        why: 'Permeance reluctance ko reciprocal ho, jastai conductance resistance ko.',
      },
    },
  ],
});

/* ── 1.3 Series and parallel magnetic circuits ───────────────────────── */
export const basicsSeries13 = duo('1.3 · Basic understanding: what if flux has one path, or two?', {
  draw: parallelFigure,
  viewBox: '0 0 360 236',
  tutor: [
    {
      say: 'Flux ko bato eutai bhaye, falam ra hawa sabai ek pachhi arko parcha. Yaslai series bhanchan, jastai eutai tar ma lagatar bulb.',
      voice: 'फ्लक्सको बाटो एउटै भए, फलाम र हावा सबै एकपछि अर्को पर्छ। यसलाई सिरिज भन्छन्, जस्तै एउटै तारमा लगातार बल्ब।',
      lines: [['h', <>1.3 · Eutai bato ki dui bato?</>], part(<>Series</>, <>eutai bato, rokawat jodincha</>)],
    },
    {
      say: 'Bich ko khutta ma coil bereko cha. Flux bich bata mathi gayera dubai side tira bandincha.',
      voice: 'बीचको खुट्टामा कोइल बेरेको छ। फ्लक्स बीचबाट माथि गएर दुवै साइडतिर बाँडिन्छ।',
      lines: [part(<>Parallel</>, <>flux dui bato ma bandincha</>)],
    },
    {
      say: 'Dubai side ustai bhaye flux aadha-aadha jancha, jastai pani ko pipe dui bhag ma phutda.',
      voice: 'दुवै साइड उस्तै भए फ्लक्स आधा आधा जान्छ, जस्तै पानीको पाइप दुई भागमा फुट्दा।',
      lines: [chain(<>Ustai side → flux aadha-aadha</>)],
      ask: {
        q: 'Dubai side limb ustai bhaye bich ko flux kasari bandincha?',
        voice: 'दुवै साइड लिम्ब उस्तै भए बीचको फ्लक्स कसरी बाँडिन्छ?',
        options: ['Aadha-aadha', 'Sabai euta side ma', 'Bandidaina'],
        answer: 0,
        why: 'Barabar rokawat ko dui bato ma flux barabar bandincha.',
      },
    },
    {
      say: 'Yo pura circuit lai electric circuit jastai lekhna sakincha: euta rokawat series ma, dui rokawat parallel ma.',
      voice: 'यो पूरा सर्किटलाई इलेक्ट्रिक सर्किट जस्तै लेख्न सकिन्छ — एउटा रोकावट सिरिजमा, दुई रोकावट प्याराललमा।',
      lines: [chain(<>Bich ko rokawat series ma, side ka dui parallel ma</>)],
    },
    {
      say: 'Saransh: series ma rokawat jodincha, parallel ma flux bandincha.',
      voice: 'सारांश — सिरिजमा रोकावट जोडिन्छ, प्याराललमा फ्लक्स बाँडिन्छ।',
      lines: [['idea', <>Series: rokawat jodincha · parallel: flux bandincha</>]],
    },
  ],
  lecturer: [
    {
      say: 'Series magnetic circuit ma sabai bhag eutai flux path ma hunchan, ra reluctance jodincha.',
      voice: 'सिरिज म्याग्नेटिक सर्किटमा सबै भाग एउटै फ्लक्स पाथमा हुन्छन्, र रिलक्टेन्स जोडिन्छ।',
      lines: [['h', <>1.3 · Series and parallel magnetic circuits</>], part(<>Series</>, <>one flux path, reluctances add</>)],
    },
    {
      say: 'Parallel magnetic circuit ma flux dui wa badhi path ma bandincha; yaha centre limb ma coil cha.',
      voice: 'प्यारालल म्याग्नेटिक सर्किटमा फ्लक्स दुई वा बढी पाथमा बाँडिन्छ। यहाँ सेन्टर लिम्बमा कोइल छ।',
      lines: [part(<>Parallel</>, <>flux divides between paths</>)],
    },
    {
      say: 'Side limbs symmetrical bhaye har side ma flux aadha huncha.',
      voice: 'साइड लिम्ब्स सिमेट्रिकल भए, हरेक साइडमा फ्लक्स आधा हुन्छ।',
      lines: [chain(<>Symmetrical limbs → half the flux in each</>)],
      ask: {
        q: 'Parallel magnetic circuit ma kun quantity bandincha?',
        voice: 'प्यारालल म्याग्नेटिक सर्किटमा कुन क्वान्टिटी बाँडिन्छ?',
        options: ['Flux', 'MMF', 'Turns'],
        answer: 0,
        why: 'Jastai parallel ma current bandincha, magnetic parallel ma flux bandincha.',
      },
    },
    {
      say: 'Electric analogue ma centre limb ko reluctance series ma ra dui side limb parallel ma parchhan.',
      voice: 'इलेक्ट्रिक एनालगमा, सेन्टर लिम्बको रिलक्टेन्स सिरिजमा, र दुई साइड लिम्ब प्याराललमा पर्छन्।',
      lines: [chain(<>Analogue: centre in series with the two sides in parallel</>)],
    },
    {
      say: 'Saransh: series ma reluctance jodincha, parallel ma flux bandincha.',
      voice: 'सारांश — सिरिजमा रिलक्टेन्स जोडिन्छ, प्याराललमा फ्लक्स बाँडिन्छ।',
      lines: [['idea', <>Series: reluctances add · parallel: flux divides</>]],
    },
  ],
});

export const series13 = duo('Series and parallel magnetic circuits', {
  draw: parallelFigure,
  viewBox: '0 0 360 236',
  tutor: [
    {
      say: 'Yaad garau: phi equals MMF over S, ra electric circuit ma series resistance jodincha ra parallel ma current bandincha.',
      voice: 'याद गरौं — फाइ इक्वल्स एम एम एफ ओभर एस, र इलेक्ट्रिक सर्किटमा सिरिज रेजिस्टेन्स जोडिन्छ, र प्याराललमा करेन्ट बाँडिन्छ।',
      lines: [['h', <>Series and parallel magnetic circuits</>], rem(<K>{String.raw`\phi = \dfrac{\text{MMF}}{S}`}</K>, <>Series R add · parallel currents divide</>)],
    },
    {
      say: 'Series circuit: eutai flux phi sabai bhag bata jancha, tesaile jamma reluctance S1 plus S2 plus ityadi. Jamma AT equals har bhag ko H l ko jod.',
      voice: 'सिरिज सर्किट — एउटै फ्लक्स फाइ सबै भागबाट जान्छ, त्यसैले जम्मा रिलक्टेन्स एस वान प्लस एस टु प्लस इत्यादि। जम्मा ए टी इक्वल्स हरेक भागको एच एलको जोड।',
      lines: [['step', step('Series circuit', String.raw`\begin{aligned} S &= S_1 + S_2 + \cdots \\ NI &= H_1l_1 + H_2l_2 + \cdots \end{aligned}`), undefined, { carry: <>Series: <K>{String.raw`NI = \textstyle\sum Hl`}</K></> }]],
    },
    {
      say: 'Parallel circuit: centre limb ko flux phi dui side ma bandincha: phi equals phi 1 plus phi 2. Symmetrical bhaye har side ma phi over two.',
      voice: 'प्यारालल सर्किट — सेन्टर लिम्बको फ्लक्स फाइ दुई साइडमा बाँडिन्छ — फाइ इक्वल्स फाइ वान प्लस फाइ टु। सिमेट्रिकल भए हरेक साइडमा फाइ ओभर टु।',
      lines: [['step', step('Parallel circuit (Fig. 1.4)', String.raw`\begin{aligned} \phi &= \phi_1 + \phi_2 \\ \phi_1 &= \phi_2 = \phi/2 \end{aligned}`)]],
    },
    {
      say: 'Side limb ko AT kina eutai patak matra? Dui side limb parallel ma chan, tesaile dubai ma ustai MMF lagcha, jastai parallel resistor ma ustai voltage.',
      voice: 'साइड लिम्बको ए टी किन एउटै पटक मात्र? दुई साइड लिम्ब प्याराललमा छन्, त्यसैले दुवैमा उस्तै एम एम एफ लाग्छ, जस्तै प्यारालल रेजिस्टरमा उस्तै भोल्टेज।',
      lines: [br('Why count one side limb only?', <Pts items={[<>The two side limbs are in parallel</>, <>Parallel paths share the same MMF (like the same voltage across parallel resistors)</>, <>So the loop is centre limb + one side limb</>]} />)],
    },
    {
      say: 'Main line: jamma AT equals centre limb ko H c l c plus euta side limb ko H s l s.',
      voice: 'मेन लाइन — जम्मा ए टी इक्वल्स, सेन्टर लिम्बको एच सी एल सी प्लस, एउटा साइड लिम्बको एच एस एल एस।',
      lines: [['eq', tex(String.raw`NI = H_c l_c + H_s l_s \unit{ampere-turn}`)]],
      ask: {
        q: 'Symmetrical parallel circuit ma side limb ko flux density centre ko kati huncha (area barabar bhaye)?',
        voice: 'सिमेट्रिकल प्यारालल सर्किटमा, साइड लिम्बको फ्लक्स डेन्सिटी सेन्टरको कति हुन्छ, एरिया बराबर भए?',
        options: ['Aadha', 'Dui guna', 'Barabar'],
        answer: 0,
        why: 'Side limb ma φ/2 matra, area same bhaye B pani aadha.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: phi equals MMF over S; series ma resistance jodincha, parallel ma current bandincha.',
      voice: 'स्मरण — फाइ इक्वल्स एम एम एफ ओभर एस। सिरिजमा रेजिस्टेन्स जोडिन्छ, प्याराललमा करेन्ट बाँडिन्छ।',
      lines: [['h', <>Series and parallel magnetic circuits</>], rem(<K>{String.raw`\phi = \text{MMF}/S`}</K>)],
    },
    {
      say: 'Series circuit ma total reluctance sabai reluctance ko jod ho, ra total AT har part ko H l ko jod.',
      voice: 'सिरिज सर्किटमा टोटल रिलक्टेन्स सबै रिलक्टेन्सको जोड हो, र टोटल ए टी हरेक पार्टको एच एलको जोड।',
      lines: [['step', <><H>(i) Series circuit</H><K>{String.raw`\begin{aligned} S &= S_1 + S_2 + \cdots && \cdots(1) \\ NI &= \textstyle\sum H\,l && \cdots(2) \end{aligned}`}</K></>, undefined, { carry: <>(2) <K>{String.raw`NI = \textstyle\sum Hl`}</K></> }]],
    },
    {
      say: 'Parallel circuit ma flux bandincha: phi equals phi 1 plus phi 2, ra symmetrical bhaye phi over two har side ma.',
      voice: 'प्यारालल सर्किटमा फ्लक्स बाँडिन्छ — फाइ इक्वल्स फाइ वान प्लस फाइ टु, र सिमेट्रिकल भए फाइ ओभर टु हरेक साइडमा।',
      lines: [['step', <><H>(ii) Parallel circuit (Fig. 1.4)</H><K>{String.raw`\begin{aligned} \phi &= \phi_1 + \phi_2 && \cdots(3) \\ \phi_1 &= \phi_2 = \phi/2 && \end{aligned}`}</K></>]],
    },
    {
      say: 'Parallel path ma MMF ustai huncha, tesaile euta side limb matra ganincha.',
      voice: 'प्यारालल पाथमा एम एम एफ उस्तै हुन्छ, त्यसैले एउटा साइड लिम्ब मात्र गनिन्छ।',
      lines: [br('One side limb', <Pts items={[<>Parallel limbs have equal MMF across them</>]} />)],
    },
    {
      say: 'Tesaile N I equals H c l c plus H s l s.',
      voice: 'त्यसैले एन आई इक्वल्स, एच सी एल सी प्लस एच एस एल एस।',
      lines: [['step', tex(String.raw`\therefore\ \boxed{NI = H_c l_c + H_s l_s} \qquad \cdots(4)`)]],
      ask: {
        q: 'Parallel magnetic circuit ma dui parallel limb ma kun quantity barabar huncha?',
        voice: 'प्यारालल म्याग्नेटिक सर्किटमा दुई प्यारालल लिम्बमा कुन क्वान्टिटी बराबर हुन्छ?',
        options: ['MMF', 'Current', 'Turns'],
        answer: 0,
        why: 'Parallel resistors ma voltage barabar jastai, parallel limbs ma MMF barabar.',
      },
    },
  ],
});

/* ── 1.4 Core with air gap ─────────────────────────────────────────── */
export const basicsGap14 = duo('1.4 · Basic understanding: why does a tiny air gap matter so much?', {
  three: magnetTour([
    { shot: 'core', show: WIRED, flow: 0.6, flux: 0.9, focus: ['core'], labels: [['pura falam: dherai flux', 'flux']] },
    { shot: 'gap', air: 1, flux: 0.3, focus: ['bridge', 'core'], labels: [['sano gap', 'gap']] },
    { flux: 0.3, focus: ['core'], labels: [['flux dherai ghatyo', 'flux']] },
    { shot: 'coil', flow: 1, flux: 0.8, focus: ['coil', 'battery'], labels: [['dherai current chahiyo', 'coil']] },
    { shot: 'whole', air: 1, flux: 0.8, focus: null },
  ]),
  tutor: [
    {
      say: 'Pura falam ko bato ma flux sajilai bagcha.',
      voice: 'पूरा फलामको बाटोमा फ्लक्स सजिलै बग्छ।',
      lines: [['h', <>1.4 · Sano gap, thulo asar</>], part(<>Falam ko core</>, <>flux sajilai</>)],
    },
    {
      say: 'Aba core ma euta sano hawa ko gap katau. Gap sano bhaye pani hawa ko rokawat falam bhanda hajarau guna.',
      voice: 'अब कोरमा एउटा सानो हावाको ग्याप काटौं। ग्याप सानो भए पनि हावाको रोकावट फलामभन्दा हजारौं गुणा।',
      lines: [part(<>Air gap</>, <>sano tara thulo rokawat</>)],
    },
    {
      say: 'Tesaile ustai current ma flux dherai ghatcha.',
      voice: 'त्यसैले उस्तै करेन्टमा फ्लक्स धेरै घट्छ।',
      lines: [chain(<>Gap → rokawat badhyo → flux ghatyo</>)],
    },
    {
      say: 'Flux pharkauna dherai current chahincha; dherai jaso dhakka gap mai kharcha huncha.',
      voice: 'फ्लक्स फर्काउन धेरै करेन्ट चाहिन्छ। धेरैजसो धक्का ग्यापमै खर्च हुन्छ।',
      lines: [chain(<>Flux pharkauna → dherai current, dhakka gap mai</>)],
      ask: {
        q: 'Air gap bhayeko core ma dherai jaso MMF kaha kharcha huncha?',
        voice: 'एयर ग्याप भएको कोरमा धेरैजसो एम एम एफ कहाँ खर्च हुन्छ?',
        options: ['Air gap ma', 'Falam ma', 'Coil ma'],
        answer: 0,
        why: 'Hawa ko permeability falam bhanda hajarau guna kam, tesaile gap ko rokawat thulo.',
      },
    },
    {
      say: 'Saransh: sano gap le pani thulo rokawat dincha, tesaile machine ma gap sakbhar sano rakhincha.',
      voice: 'सारांश — सानो ग्यापले पनि ठूलो रोकावट दिन्छ, त्यसैले मेसिनमा ग्याप सकभर सानो राखिन्छ।',
      lines: [['idea', <>Sano gap, thulo rokawat → gap sakbhar sano</>]],
    },
  ],
  lecturer: [
    {
      say: 'Pura iron core ko reluctance kam huncha.',
      voice: 'पूरा आइरन कोरको रिलक्टेन्स कम हुन्छ।',
      lines: [['h', <>1.4 · Core with air gap</>], part(<>Iron core</>, <>low reluctance</>)],
    },
    {
      say: 'Air gap ko permeability mu zero matra huncha, tesaile yasko reluctance iron bhanda dherai guna badhi.',
      voice: 'एयर ग्यापको पर्मियाबिलिटी म्यु जिरो मात्र हुन्छ, त्यसैले यसको रिलक्टेन्स आइरनभन्दा धेरै गुणा बढी।',
      lines: [part(<>Air gap</>, <>μ<sub>r</sub> of air is one: very high reluctance</>)],
    },
    {
      say: 'Ustai MMF ma flux ghatcha.',
      voice: 'उस्तै एम एम एफमा फ्लक्स घट्छ।',
      lines: [chain(<>Same MMF → much less flux</>)],
    },
    {
      say: 'Ustai flux ko lagi badhi AT chahincha, jasko dherai jaso bhag gap ma lagcha.',
      voice: 'उस्तै फ्लक्सको लागि बढी ए टी चाहिन्छ, जसको धेरैजसो भाग ग्यापमा लाग्छ।',
      lines: [chain(<>Same flux → more AT, mostly for the gap</>)],
      ask: {
        q: 'Air gap ma relative permeability kati huncha?',
        voice: 'एयर ग्यापमा रिलेटिभ पर्मियाबिलिटी कति हुन्छ?',
        options: ['1', '4000', '0'],
        answer: 0,
        why: 'Air ko μr = 1; tesaile gap ma H = B/μ0.',
      },
    },
    {
      say: 'Saransh: machine ma air gap sakbhar sano rakhincha.',
      voice: 'सारांश — मेसिनमा एयर ग्याप सकभर सानो राखिन्छ।',
      lines: [['idea', <>Air gap kept as small as possible</>]],
    },
  ],
});

/* ── 1.5 B-H relationship (magnetization characteristics) ──────────── */
export const basicsBh15 = duo('1.5 · Basic understanding: why does iron stop getting more magnetic?', {
  three: magnetTour([
    { shot: 'core', show: [...CORE, 'domains'], align: 0, focus: ['domains'], labels: [['sano-sano magnet', 'domains']] },
    { show: [...WIRED, 'domains'], flow: 0.4, flux: 0.4, align: 0.4, focus: ['domains', 'coil'], labels: [['kehi milyo', 'domains']] },
    { flow: 0.8, flux: 0.85, align: 0.9, focus: ['domains'], labels: [['chhito badhyo', 'domains']] },
    { flow: 1, flux: 1, align: 1, focus: ['domains'], labels: [['sabai milyo: saturation', 'domains']] },
    { shot: 'whole', focus: null },
  ]),
  tutor: [
    {
      say: 'Falam bhitra sano-sano magnet hunchan, jun suru ma jata-tatai pharkiyeka hunchan.',
      voice: 'फलामभित्र सानो सानो म्याग्नेट हुन्छन्, जुन सुरुमा जता ततै फर्किएका हुन्छन्।',
      lines: [['h', <>1.5 · Falam ko magnet kahile pugcha?</>], part(<>Domain</>, <>falam bhitra ko sano magnet</>)],
    },
    {
      say: 'Coil ma thorai current pathaye kehi magnet eutai disha ma milchan.',
      voice: 'कोइलमा थोरै करेन्ट पठाए केही म्याग्नेट एउटै दिशामा मिल्छन्।',
      lines: [chain(<>Thorai current → kehi milyo</>)],
    },
    {
      say: 'Current badhaudai jada dherai magnet chhito milchan, ra flux chhito badhcha.',
      voice: 'करेन्ट बढाउँदै जाँदा धेरै म्याग्नेट छिटो मिल्छन्, र फ्लक्स छिटो बढ्छ।',
      lines: [chain(<>Current badhyo → dherai milyo → flux chhito badhyo</>)],
    },
    {
      say: 'Sabai mile pachhi current badhaye pani flux thorai matra badhcha. Yaslai saturation bhanchan.',
      voice: 'सबै मिलेपछि करेन्ट बढाए पनि फ्लक्स थोरै मात्र बढ्छ। यसलाई स्याचुरेसन भन्छन्।',
      lines: [part(<>Saturation</>, <>sabai milyo, flux aru badhdaina</>)],
      ask: {
        q: 'Saturation pachhi current badhaye flux lai k huncha?',
        voice: 'स्याचुरेसनपछि करेन्ट बढाए फ्लक्सलाई के हुन्छ?',
        options: ['Thorai matra badhcha', 'Dherai chhito badhcha', 'Zero huncha'],
        answer: 0,
        why: 'Sabai domain milisakeka hunchan, aru milne baki chaina.',
      },
    },
    {
      say: 'Saransh: suru ma bistarai, ani chhito, ani saturation ma rokincha: yahi B-H curve ko aakar.',
      voice: 'सारांश — सुरुमा बिस्तारै, अनि छिटो, अनि स्याचुरेसनमा रोकिन्छ — यही बी एच कर्भको आकार।',
      lines: [['idea', <>Bistarai → chhito → saturation: magnetisation curve ko aakar</>]],
    },
  ],
  lecturer: [
    {
      say: 'Ferromagnetic material ma domains hunchan, jun unmagnetised awastha ma random hunchan.',
      voice: 'फेरोम्याग्नेटिक मटेरियलमा डोमेन्स हुन्छन्, जुन अनम्याग्नेटाइज्ड अवस्थामा र्यान्डम हुन्छन्।',
      lines: [['h', <>1.5 · Magnetization characteristic</>], part(<>Domains</>, <>random when unmagnetised</>)],
    },
    {
      say: 'Kam H ma thorai domain align hunchan, ra B bistarai badhcha.',
      voice: 'कम एचमा थोरै डोमेन अलाइन हुन्छन्, र बी बिस्तारै बढ्छ।',
      lines: [chain(<>Low H → few domains aligned → B rises slowly</>)],
    },
    {
      say: 'Madhyam H ma dherai domain chhito align hunchan, ra B chhito badhcha.',
      voice: 'मध्यम एचमा धेरै डोमेन छिटो अलाइन हुन्छन्, र बी छिटो बढ्छ।',
      lines: [chain(<>Medium H → rapid alignment → steep rise of B</>)],
    },
    {
      say: 'Sabai domain align bhaye pachhi B thorai matra badhcha: saturation.',
      voice: 'सबै डोमेन अलाइन भएपछि बी थोरै मात्र बढ्छ — स्याचुरेसन।',
      lines: [part(<>Saturation</>, <>all domains aligned; B hardly rises</>)],
      ask: {
        q: 'Saturation region ma permeability lai k huncha?',
        voice: 'स्याचुरेसन रिजनमा पर्मियाबिलिटीलाई के हुन्छ?',
        options: ['Ghatcha', 'Badhcha', 'Constant rahancha'],
        answer: 0,
        why: 'μ = B/H; H badhda B thorai matra badhcha, tesaile μ ghatcha.',
      },
    },
    {
      say: 'Saransh: B-H curve non-linear huncha, tesaile iron ko mu r constant hudaina.',
      voice: 'सारांश — बी एच कर्भ नन लिनियर हुन्छ, त्यसैले आइरनको म्यु आर कन्स्टेन्ट हुँदैन।',
      lines: [['idea', <>Non-linear curve: μ<sub>r</sub> of iron is not constant</>]],
    },
  ],
});

/* ── 1.6 Hysteresis with DC and AC excitation ─────────────────────── */
export const basicsHyst16 = duo('1.6 · Basic understanding: why does iron remember its magnetism?', {
  three: magnetTour([
    { shot: 'core', show: [...WIRED, 'domains'], flow: 1, flux: 1, align: 1, focus: ['domains'], labels: [['DC: sabai milyo', 'domains']] },
    { flow: 0, flux: 0.25, align: 0.65, focus: ['domains'], labels: [['current hatayo: kehi baki', 'domains']] },
    { flow: 0.8, flux: 0.8, align: 1, heat: { core: 0.4 }, focus: ['domains', 'coil'], labels: [['AC: ulto-sulto', 'coil']] },
    { heat: { core: 0.8 }, focus: ['core'], labels: [['har chakkar ma taato', 'core']] },
    { shot: 'whole', heat: {}, focus: null },
  ]),
  tutor: [
    {
      say: 'DC current le falam ka sabai sano magnet eutai disha ma milaucha.',
      voice: 'डी सी करेन्टले फलामका सबै सानो म्याग्नेट एउटै दिशामा मिलाउँछ।',
      lines: [['h', <>1.6 · Falam le magnet samjhancha</>], part(<>DC excitation</>, <>eutai disha, sthir</>)],
    },
    {
      say: 'Current hataye pani kehi magnet milirahanchan. Falam le aafno magnet alikati samjhancha.',
      voice: 'करेन्ट हटाए पनि केही म्याग्नेट मिलिरहन्छन्। फलामले आफ्नो म्याग्नेट अलिकति सम्झन्छ।',
      lines: [part(<>Retentivity</>, <>current bina pani kehi magnet baki</>)],
    },
    {
      say: 'AC ma current second ma pachas choti ulto-sulto huncha, ra sano magnet pani har choti pharkinchan.',
      voice: 'ए सीमा करेन्ट सेकेन्डमा पचास चोटि उल्टोसुल्टो हुन्छ, र सानो म्याग्नेट पनि हरेक चोटि फर्किन्छन्।',
      lines: [chain(<>AC → magnet har choti pharkincha</>)],
    },
    {
      say: 'Har choti pharkauna kehi energy kharcha huncha ra falam taato huncha. DC ma yo loss hudaina.',
      voice: 'हरेक चोटि फर्काउन केही इनर्जी खर्च हुन्छ, र फलाम तातो हुन्छ। डी सीमा यो लस हुँदैन।',
      lines: [chain(<>Pharkauda energy kharcha → taato (AC ma matra)</>)],
      ask: {
        q: 'Hysteresis loss kun excitation ma huncha?',
        voice: 'हिस्टेरेसिस लस कुन एक्साइटेसनमा हुन्छ?',
        options: ['AC (ulto-sulto)', 'Sthir DC', 'Dubai ma hudaina'],
        answer: 0,
        why: 'Magnet pharkirahne bela matra energy kharcha huncha.',
      },
    },
    {
      say: 'Saransh: DC ma falam eutai thau ma basch, AC ma har chakkar ma loop ghumcha ra loss huncha.',
      voice: 'सारांश — डी सीमा फलाम एउटै ठाउँमा बस्छ, ए सीमा हरेक चक्करमा लुप घुम्छ, र लस हुन्छ।',
      lines: [['idea', <>DC: eutai thau · AC: har chakkar ma loop → loss</>]],
    },
  ],
  lecturer: [
    {
      say: 'DC excitation ma core eutai operating point ma magnetise huncha.',
      voice: 'डी सी एक्साइटेसनमा कोर एउटै अपरेटिङ पोइन्टमा म्याग्नेटाइज हुन्छ।',
      lines: [['h', <>1.6 · Hysteresis with DC and AC excitation</>], part(<>DC excitation</>, <>one fixed operating point</>)],
    },
    {
      say: 'Excitation hataye pani residual flux density B r rahancha.',
      voice: 'एक्साइटेसन हटाए पनि रेसिड्युअल फ्लक्स डेन्सिटी बी आर रहन्छ।',
      lines: [part(<>Residual magnetism</>, <>some flux remains when the field is removed</>)],
    },
    {
      say: 'AC excitation ma H har cycle ma positive ra negative huncha, ra B le hysteresis loop trace garcha.',
      voice: 'ए सी एक्साइटेसनमा एच हरेक साइकलमा पोजिटिभ र नेगेटिभ हुन्छ, र बीले हिस्टेरेसिस लुप ट्रेस गर्छ।',
      lines: [chain(<>AC → the loop is traced every cycle</>)],
      ask: {
        q: 'AC excitation ma core le har cycle ma k trace garcha?',
        voice: 'ए सी एक्साइटेसनमा कोरले हरेक साइकलमा के ट्रेस गर्छ?',
        options: ['Hysteresis loop', 'Straight line', 'Sine curve matra'],
        answer: 0,
        why: 'B le H lai lag garcha, tesaile magnetise ra demagnetise garda loop banchha.',
      },
    },
    {
      say: 'Loop ko area anusar har cycle ma energy loss huncha; DC ma yo loss hudaina.',
      voice: 'लुपको एरिया अनुसार हरेक साइकलमा इनर्जी लस हुन्छ। डी सीमा यो लस हुँदैन।',
      lines: [chain(<>Loop area → energy lost each cycle (none with steady DC)</>)],
    },
    {
      say: 'Saransh: DC le eutai point, AC le loop ra hysteresis loss.',
      voice: 'सारांश — डी सीले एउटै पोइन्ट, ए सीले लुप र हिस्टेरेसिस लस।',
      lines: [['idea', <>DC: one point · AC: loop and hysteresis loss</>]],
    },
  ],
});

export const hyst16 = duo('Hysteresis with DC and AC excitation', {
  draw: bhFigure,
  viewBox: '0 0 360 235',
  tutor: [
    {
      say: 'Yaad garau: B-H curve ma saturation huncha, ra B equals mu H, jaha mu constant hudaina.',
      voice: 'याद गरौं — बी एच कर्भमा स्याचुरेसन हुन्छ, र बी इक्वल्स म्यु एच, जहाँ म्यु कन्स्टेन्ट हुँदैन।',
      lines: [['h', <>Hysteresis with DC and AC excitation</>], rem(<>B-H curve saturates; <K>{String.raw`B = \mu H`}</K> with μ not constant</>)],
    },
    {
      say: 'DC excitation: H badhaudai lagda B initial magnetisation curve ma chadhcha ra eutai point ma rokincha.',
      voice: 'डी सी एक्साइटेसन — एच बढाउँदै लग्दा बी इनिसियल म्याग्नेटाइजेसन कर्भमा चढ्छ, र एउटै पोइन्टमा रोकिन्छ।',
      lines: [['step', <>DC: B rises along the initial curve to one operating point and stays there</>]],
    },
    {
      say: 'H zero garda B zero hudaina; bachi rahane B r lai residual flux density bhanchan. Yaslai zero garna ulto H c chahincha: coercive force.',
      voice: 'एच जिरो गर्दा बी जिरो हुँदैन। बाँकी रहने बी आरलाई रेसिड्युअल फ्लक्स डेन्सिटी भन्छन्। यसलाई जिरो गर्न उल्टो एच सी चाहिन्छ — कोअर्सिभ फोर्स।',
      lines: [['step', <Pts items={[<>H = 0 leaves B<sub>r</sub> (residual flux density, retentivity)</>, <>−H<sub>c</sub> (coercive force) brings B to zero</>]} />, undefined, { carry: <>B<sub>r</sub> at H = 0 · −H<sub>c</sub> makes B = 0</> }]],
    },
    {
      say: 'B kina H bhanda pachhi parcha? Domain lai pharkauna friction jasto rokawat huncha, tesaile B le H lai lag garcha: yahi hysteresis.',
      voice: 'बी किन एचभन्दा पछि पर्छ? डोमेनलाई फर्काउन घर्षण जस्तो रोकावट हुन्छ, त्यसैले बीले एचलाई ल्याग गर्छ — यही हिस्टेरेसिस।',
      lines: [br('Why does B lag H?', <Pts items={[<>Domains resist turning back (like friction)</>, <>So B lags behind H: hysteresis (“lagging behind”)</>]} />)],
    },
    {
      say: 'Main line: AC excitation ma H plus H max dekhi minus H max samma ghumcha, ra har cycle ma B le pura loop trace garcha.',
      voice: 'मेन लाइन — ए सी एक्साइटेसनमा एच, प्लस एच म्याक्सदेखि माइनस एच म्याक्ससम्म घुम्छ, र हरेक साइकलमा बीले पूरा लुप ट्रेस गर्छ।',
      lines: [['step', <>AC: H swings between +H<sub>max</sub> and −H<sub>max</sub>; B traces the whole loop every cycle</>]],
    },
    {
      say: 'Loop ko area equals per cycle per unit volume ko energy loss. f cycle per second ma, hysteresis loss P h equals area times V times f.',
      voice: 'लुपको एरिया इक्वल्स पर साइकल पर युनिट भोल्युमको इनर्जी लस। एफ साइकल पर सेकेन्डमा, हिस्टेरेसिस लस पी एच इक्वल्स एरिया टाइम्स भी टाइम्स एफ।',
      lines: [['eq', tex(String.raw`P_h = (\text{loop area})\,V f \unit{watt}`)]],
      ask: {
        q: 'Steady DC excitation ma hysteresis loss kati huncha?',
        voice: 'स्टेडी डी सी एक्साइटेसनमा हिस्टेरेसिस लस कति हुन्छ?',
        options: ['Zero', 'Loop area times f', 'Saturation ma maximum'],
        answer: 0,
        why: 'DC ma loop trace hudaina (f = 0), tesaile Ph = 0.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: B-H curve non-linear huncha ra saturation aaucha.',
      voice: 'स्मरण — बी एच कर्भ नन लिनियर हुन्छ, र स्याचुरेसन आउँछ।',
      lines: [['h', <>Hysteresis with DC and AC excitation (Fig. 1.2)</>], rem(<>Non-linear B-H curve with saturation</>)],
    },
    {
      say: 'DC excitation ma B initial curve ma eutai point samma pugcha.',
      voice: 'डी सी एक्साइटेसनमा बी इनिसियल कर्भमा एउटै पोइन्टसम्म पुग्छ।',
      lines: [['step', <>(i) DC: one operating point on the initial magnetisation curve.</>]],
    },
    {
      say: 'H zero garda B r rahancha ra B zero garna coercive force H c chahincha.',
      voice: 'एच जिरो गर्दा बी आर रहन्छ, र बी जिरो गर्न कोअर्सिभ फोर्स एच सी चाहिन्छ।',
      lines: [['step', <>Residual flux density B<sub>r</sub> at H = 0; coercive force H<sub>c</sub> to reduce B to zero.</>, undefined, { carry: <>B<sub>r</sub>, H<sub>c</sub></> }]],
    },
    {
      say: 'Hysteresis bhaneko B le H lai lag garnu ho.',
      voice: 'हिस्टेरेसिस भनेको बीले एचलाई ल्याग गर्नु हो।',
      lines: [br('Hysteresis', <Pts items={[<>Lagging of B behind H</>, <>Due to domain friction in the material</>]} />)],
    },
    {
      say: 'AC excitation ma B le har cycle ma hysteresis loop trace garcha.',
      voice: 'ए सी एक्साइटेसनमा बीले हरेक साइकलमा हिस्टेरेसिस लुप ट्रेस गर्छ।',
      lines: [['step', <>(ii) AC: the complete loop is traced once per cycle.</>]],
    },
    {
      say: 'Loss per cycle per unit volume loop ko area barabar; tesaile P h equals loop area times V f.',
      voice: 'लस पर साइकल पर युनिट भोल्युम, लुपको एरिया बराबर। त्यसैले पी एच इक्वल्स लुप एरिया टाइम्स भी एफ।',
      lines: [['step', tex(String.raw`\therefore\ \boxed{P_h = (\text{loop area})\,V f} \unit{watt}`)]],
      ask: {
        q: 'Hysteresis loss frequency sanga kasto sambandha rakhcha?',
        voice: 'हिस्टेरेसिस लस फ्रिक्वेन्सीसँग कस्तो सम्बन्ध राख्छ?',
        options: ['Sidha proportional', 'Ulto proportional', 'Sambandha chaina'],
        answer: 0,
        why: 'Har cycle ma eutai loop, f cycles per second → Ph ∝ f.',
      },
    },
  ],
});

/* ── 1.9 Force on a current-carrying conductor ─────────────────────── */
export const basicsForce19 = duo('1.9 · Basic understanding: why does a wire jump in a magnet?', {
  three: magnetTour([
    { shot: 'right', show: ['poles', 'rod'], push: 0, focus: ['rod', 'poles'], labels: [['magnet ko bich ma rod', 'rod']] },
    { push: 1, focus: ['rod'], labels: [['current: dhakka', 'force']] },
    { push: 1, focus: ['poles'], labels: [['balio magnet: badhi dhakka', 'poles']] },
    { push: 1, focus: ['rod'], labels: [['badhi current: badhi dhakka', 'rod']] },
    { shot: 'wide', push: 1, focus: null },
  ]),
  tutor: [
    {
      say: 'Magnet ko N ra S ko bich ma tama ko rod jhundyau.',
      voice: 'म्याग्नेटको एन र एसको बीचमा तामाको रड झुन्ड्याऔं।',
      lines: [['h', <>1.9 · Magnet ma tar kina uphrancha?</>], part(<>Rod</>, <>magnet ko bich ma tama</>)],
    },
    {
      say: 'Rod ma current pathaune bittikai rod dhakelincha. Current ra magnet ko field milera dhakka dinchan.',
      voice: 'रडमा करेन्ट पठाउनेबित्तिकै रड धकेलिन्छ। करेन्ट र म्याग्नेटको फिल्ड मिलेर धक्का दिन्छन्।',
      lines: [chain(<>Current + magnet → dhakka</>)],
    },
    {
      say: 'Magnet balio bhaye dhakka badhi.',
      voice: 'म्याग्नेट बलियो भए धक्का बढी।',
      lines: [chain(<>Balio magnet → badhi dhakka</>)],
    },
    {
      say: 'Current badhi ra rod lamo bhaye pani dhakka badhcha. Current ulto garyo bhane dhakka ulto.',
      voice: 'करेन्ट बढी र रड लामो भए पनि धक्का बढ्छ। करेन्ट उल्टो गर्‍यो भने धक्का उल्टो।',
      lines: [chain(<>Badhi current, lamo rod → badhi dhakka · ulto current → ulto dhakka</>)],
      ask: {
        q: 'Rod ko current ulto garda dhakka lai k huncha?',
        voice: 'रडको करेन्ट उल्टो गर्दा धक्कालाई के हुन्छ?',
        options: ['Ulto disha ma huncha', 'Same rahancha', 'Zero huncha'],
        answer: 0,
        why: 'Dhakka ko disha current ra field dubai ko disha ma bhar parcha.',
      },
    },
    {
      say: 'Saransh: magnet, current ra length milera dhakka; yahi motor ko mul siddhanta.',
      voice: 'सारांश — म्याग्नेट, करेन्ट र लेन्थ मिलेर धक्का। यही मोटरको मूल सिद्धान्त।',
      lines: [['idea', <>Magnet × current × length → dhakka: motor ko mul siddhanta</>]],
    },
  ],
  lecturer: [
    {
      say: 'Magnetic field ma l length ko conductor rakhiyeko cha.',
      voice: 'म्याग्नेटिक फिल्डमा एल लेन्थको कन्डक्टर राखिएको छ।',
      lines: [['h', <>1.9 · Force on a current-carrying conductor</>], part(<>Conductor</>, <>in a magnetic field</>)],
    },
    {
      say: 'Yasma current bagda mechanical force anubhav huncha.',
      voice: 'यसमा करेन्ट बग्दा मेकानिकल फोर्स अनुभव हुन्छ।',
      lines: [chain(<>Current in a field → mechanical force</>)],
    },
    {
      say: 'Force flux density sanga badhcha.',
      voice: 'फोर्स फ्लक्स डेन्सिटीसँग बढ्छ।',
      lines: [chain(<>Stronger field → larger force</>)],
    },
    {
      say: 'Force current ra length sanga pani badhcha, ra direction Fleming ko left-hand rule le dincha.',
      voice: 'फोर्स करेन्ट र लेन्थसँग पनि बढ्छ, र डाइरेक्सन फ्लेमिङको लेफ्ट ह्यान्ड रुलले दिन्छ।',
      lines: [chain(<>Grows with current and length; direction by Fleming’s left-hand rule</>)],
      ask: {
        q: 'Current-carrying conductor ma force ko direction kun rule le dincha?',
        voice: 'करेन्ट क्यारिङ कन्डक्टरमा फोर्सको डाइरेक्सन कुन रुलले दिन्छ?',
        options: ["Fleming's left-hand rule", "Fleming's right-hand rule", "Lenz's law"],
        answer: 0,
        why: 'Left-hand rule motor action ko lagi, right-hand rule generator action ko lagi.',
      },
    },
    {
      say: 'Saransh: field, current ra length le force nirdharan garchan.',
      voice: 'सारांश — फिल्ड, करेन्ट र लेन्थले फोर्स निर्धारण गर्छन्।',
      lines: [['idea', <>Field, current and length decide the force</>]],
    },
  ],
});

/* ── 1.2 Model answer: reluctance and permeance (2073 Chaitra Q1a) ──── */
export const relAnswer12 = answer('Model answer: reluctance and permeance', {
  draw: magCircuitFigure,
  viewBox: '0 0 360 230',
  papers: ['2073 Chaitra'],
  marks: '',
  q: 'What are reluctance and permeance in the magnetic circuits? Derive their expressions in any type of magnetic circuits.',
  read: {
    say: 'IOE 2073 Chaitra: magnetic circuit ma reluctance ra permeance k hun, ra tinka expression derive gara.',
    voice: 'आई ओ ई दुई हजार त्रिहत्तर चैत — म्याग्नेटिक सर्किटमा रिलक्टेन्स र पर्मियन्स के हुन्, र तिनका एक्स्प्रेसन डेराइभ गर।',
  },
  points: [
    {
      carry: <>(a) S: opposition to flux · P = 1/S</>,
      node: <><H>(a) Definitions</H><Pts items={[<><b>Reluctance S:</b> the opposition offered by a magnetic circuit to the flux; S = MMF/φ (AT/Wb)</>, <><b>Permeance P:</b> the ease with which flux is set up; P = 1/S (Wb/AT)</>]} /></>,
      say: 'Reluctance: magnetic circuit le flux lai dine opposition, S equals MMF over phi, AT per weber. Permeance: flux sajilai banne gun, P equals one over S, weber per AT.',
      voice: 'रिलक्टेन्स — म्याग्नेटिक सर्किटले फ्लक्सलाई दिने अपोजिसन, एस इक्वल्स एम एम एफ ओभर फाइ, ए टी पर वेबर। पर्मियन्स — फ्लक्स सजिलै बन्ने गुण, पी इक्वल्स वान ओभर एस, वेबर पर ए टी।',
    },
    {
      page: true,
      node: <><H>(b) Derivation</H><Pts items={[<>Let a core of mean length l, area A, permeability μ<sub>0</sub>μ<sub>r</sub>, wound with N turns carrying I</>]} /><K>{String.raw`\begin{aligned} H &= \dfrac{NI}{l} && \cdots(1) \\ \phi &= BA = \mu_0\mu_r A\dfrac{NI}{l} && \cdots(2) \end{aligned}`}</K></>,
      say: 'Maanau core ko mean length l, area A, permeability mu zero mu r, ra N turn ma current I. Ampere ko law le H equals N I over l, ra phi equals B A equals mu zero mu r A N I over l.',
      voice: 'मानौं कोरको मिन लेन्थ एल, एरिया ए, पर्मियाबिलिटी म्यु जिरो म्यु आर, र एन टर्नमा करेन्ट आई। एम्पियरको लले एच इक्वल्स एन आई ओभर एल, र फाइ इक्वल्स बी ए इक्वल्स म्यु जिरो म्यु आर ए एन आई ओभर एल।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} \phi &= \dfrac{NI}{l/(\mu_0\mu_r A)} && \\ \therefore\ S &= \dfrac{l}{\mu_0\mu_r A}\ \text{AT/Wb} && \cdots(3) \\ P &= \dfrac{\mu_0\mu_r A}{l}\ \text{Wb/AT} && \cdots(4) \end{aligned}`}</K><Pts items={[<>For a circuit of several parts: <K>{String.raw`S = \textstyle\sum \dfrac{l_i}{\mu_0\mu_{ri}A_i}`}</K> (series); permeances add in parallel</>]} /></>,
      say: 'Tesaile S equals l over mu zero mu r A ra P equals mu zero mu r A over l. Kunai pani circuit ma series bhag ka reluctance jodincha, ra parallel ma permeance jodincha.',
      voice: 'त्यसैले एस इक्वल्स एल ओभर म्यु जिरो म्यु आर ए, र पी इक्वल्स म्यु जिरो म्यु आर ए ओभर एल। कुनै पनि सर्किटमा सिरिज भागका रिलक्टेन्स जोडिन्छ, र प्याराललमा पर्मियन्स जोडिन्छ।',
      ask: {
        q: 'Reluctance ko SI unit k ho?',
        voice: 'रिलक्टेन्सको एस आई युनिट के हो?',
        options: ['AT/Wb', 'Wb/AT', 'Tesla'],
        answer: 0,
        why: 'S = MMF/φ, MMF AT ma ra φ Wb ma.',
      },
    },
  ],
});

/* ── 1.3 Model answer: parallel circuit (2073 Chaitra Q1b, method) ─── */
// The paper's figure (limb lengths and areas) is not in vault/; the answer
// gives the method the question asks for, without inventing dimensions.
export const parAnswer13 = answer('Model answer: ampere-turns for a parallel magnetic circuit (method)', {
  draw: parallelFigure,
  viewBox: '0 0 360 236',
  papers: ['2073 Chaitra'],
  marks: '',
  q: 'For the magnetic circuit shown, calculate the ampere-turns (MMF) required to establish a flux of 0.75 Wb in the central limb, given μr = 4000 for the iron core.',
  read: {
    say: 'IOE 2073 Chaitra: central limb ma 0.75 weber flux banauna kati AT chahincha, mu r 4000. Paper ko figure ko dimension vault ma chaina, tesaile method lekhchhau.',
    voice: 'आई ओ ई दुई हजार त्रिहत्तर चैत — सेन्ट्रल लिम्बमा जिरो पोइन्ट सेभेन फाइभ वेबर फ्लक्स बनाउन कति ए टी चाहिन्छ, म्यु आर चार हजार। पेपरको फिगरको डाइमेन्सन भल्टमा छैन, त्यसैले मेथड लेख्छौं।',
  },
  points: [
    {
      carry: <>Centre: φ · each side: φ/2</>,
      node: <><H>Step 1: fluxes (Fig. 1.4)</H><Pts items={[<>Centre limb carries φ = 0.75 Wb; each side limb carries φ/2 (symmetrical)</>, <><K>{String.raw`B_c = \phi/A_c`}</K>, <K>{String.raw`B_s = \phi/(2A_s)`}</K></>]} /></>,
      say: 'Pahilo: centre limb ma phi, har side limb ma phi over two. B c equals phi over A c, ra B s equals phi over two A s.',
      voice: 'पहिलो — सेन्टर लिम्बमा फाइ, हरेक साइड लिम्बमा फाइ ओभर टु। बी सी इक्वल्स फाइ ओभर ए सी, र बी एस इक्वल्स फाइ ओभर टु ए एस।',
    },
    {
      node: <><H>Step 2: H in each part</H><K>{String.raw`\begin{aligned} H_c &= \dfrac{B_c}{\mu_0\mu_r} \\ H_s &= \dfrac{B_s}{\mu_0\mu_r} \end{aligned}`}</K></>,
      say: 'Dosro: H c equals B c over mu zero mu r, ra H s equals B s over mu zero mu r, mu r 4000.',
      voice: 'दोस्रो — एच सी इक्वल्स बी सी ओभर म्यु जिरो म्यु आर, र एच एस इक्वल्स बी एस ओभर म्यु जिरो म्यु आर, म्यु आर चार हजार।',
    },
    {
      node: <><H>Step 3: total ampere-turns</H><K>{String.raw`\boxed{NI = H_c l_c + H_s l_s}`}</K><Pts items={[<>The two side limbs are in parallel (equal MMF), so only one is counted</>, <>Put l<sub>c</sub>, l<sub>s</sub>, A<sub>c</sub>, A<sub>s</sub> from the figure</>]} /></>,
      say: 'Tesro: jamma AT equals H c l c plus H s l s. Dui side limb parallel ma bhayeko le euta matra ganincha. Figure bata l c, l s, A c ra A s rakhnu parcha.',
      voice: 'तेस्रो — जम्मा ए टी इक्वल्स, एच सी एल सी प्लस एच एस एल एस। दुई साइड लिम्ब प्याराललमा भएकोले एउटा मात्र गनिन्छ। फिगरबाट एल सी, एल एस, ए सी र ए एस राख्नुपर्छ।',
      ask: {
        q: 'Symmetrical parallel circuit ma total AT nikalda kati ota side limb ganincha?',
        voice: 'सिमेट्रिकल प्यारालल सर्किटमा टोटल ए टी निकाल्दा कति ओटा साइड लिम्ब गनिन्छ?',
        options: ['Euta', 'Dui ota', 'Kunai pani hoina'],
        answer: 0,
        why: 'Parallel limbs ma MMF barabar; loop centre + euta side ho.',
      },
    },
  ],
});

/* ── 1.5 Numerical: ring with air gap from magnetization data ──────── */
// 2068 Magh Q1(b) [8]. A = π(0.015)² = 7.0686e-4 m²; B = 0.75e-3/A = 1.0610 T;
// H (interpolated 800–1000) = 978.9 AT/m; li = 0.799 m → 782.2 AT;
// Hg = B/μ0 = 844 343 AT/m → 844.3 AT; total 1626.5 AT; I = 2.711 A.
export const bhSolve15 = solve({
  title: 'IOE 2068 Magh: current for a ring with an air gap, from magnetization data',
  paper: '2068 Magh',
  paperVoice: 'दुई हजार अठसट्ठी माघ',
  marks: '[8]',
  question: 'A cast steel ring has a circular cross section of 3 cm in diameter and mean circumference of 80 cm. A 1 mm air-gap is cut in the ring which is wound with a coil of 600 turns. Estimate the current required to establish a flux of 0.75 mWb in the air-gap. Magnetization data: H (AT/m) 200, 400, 600, 800, 1000, 1200, 1400, 1600; B (T) 0.1, 0.32, 0.6, 0.9, 1.08, 1.18, 1.27, 1.32.',
  read: 'Cast steel ring, diameter 3 cm, mean circumference 80 cm, air gap 1 mm, 600 turns, gap flux 0.75 milliweber, ra B-H data diyeko cha. Current kati?',
  readVoice: 'कास्ट स्टिल रिङ, डायामिटर तीन सेन्टिमिटर, मिन सर्कमफरेन्स असी सेन्टिमिटर, एयर ग्याप एक मिलिमिटर, छ सय टर्न्स, ग्याप फ्लक्स जिरो पोइन्ट सेभेन फाइभ मिलिवेबर, र बी एच डाटा दिएको छ। करेन्ट कति?',
  given: [
    { node: <>d = 3 cm → A = π(0.015)² = 7.069 × 10⁻⁴ m²</>, say: 'Area 7.069 into 10 to the minus 4 meter square', voice: 'एरिया सेभेन पोइन्ट जिरो सिक्स नाइन इन्टु टेन टु द माइनस फोर मिटर स्क्वायर' },
    { node: <>l<sub>i</sub> = 0.80 − 0.001 = 0.799 m · l<sub>g</sub> = 0.001 m · N = 600 · φ = 0.75 mWb</>, say: 'Iron length 0.799 meter, gap 0.001 meter, N 600, flux 0.75 milliweber', voice: 'आइरन लेन्थ जिरो पोइन्ट सेभेन नाइन नाइन मिटर, ग्याप जिरो पोइन्ट जिरो जिरो वान मिटर, एन छ सय, फ्लक्स जिरो पोइन्ट सेभेन फाइभ मिलिवेबर' },
  ],
  find: { node: <>exciting current I</>, say: 'Nikalnu parne: exciting current I.', voice: 'निकाल्नु पर्ने — एक्साइटिङ करेन्ट आई।' },
  idea: { node: <>B from φ/A; H<sub>iron</sub> from the B-H data (not μ<sub>r</sub>); <K>{String.raw`NI = H_il_i + H_gl_g`}</K></>, say: 'Method: B equals phi over A; iron ko H B-H data bata padhne, ani total AT jodne.', voice: 'मेथड — बी इक्वल्स फाइ ओभर ए। आइरनको एच बी एच डाटाबाट पढ्ने, अनि टोटल ए टी जोड्ने।' },
  steps: [
    {
      carry: <><K>{String.raw`B = 1.061\ \text{T}`}</K></>,
      node: <K>{String.raw`\begin{aligned} B &= \dfrac{\phi}{A} \\ &= \dfrac{0.75\times10^{-3}}{7.069\times10^{-4}} \\ &= 1.061\ \text{T} \end{aligned}`}</K>,
      say: 'B equals phi over A, arthat 1.061 tesla, iron ra gap dubai ma (fringing neglected).',
      voice: 'बी इक्वल्स फाइ ओभर ए — अर्थात वान पोइन्ट जिरो सिक्स वान टेस्ला, आइरन र ग्याप दुवैमा, फ्रिन्जिङ नेग्लेक्ट गरेर।',
    },
    {
      carry: <><K>{String.raw`AT_i = 782.2`}</K></>,
      node: <K>{String.raw`\begin{aligned} H_i &= 800 + \dfrac{1.061-0.9}{1.08-0.9}\times200 \\ &= 978.9\ \text{AT/m} \\ AT_i &= 978.9\times0.799 \\ &= 782.2 \end{aligned}`}</K>,
      say: '1.061 tesla 0.9 ra 1.08 ko bich ma parcha, tesaile H interpolate garda 978.9 AT per meter. Iron AT equals 782.2.',
      voice: 'वान पोइन्ट जिरो सिक्स वान टेस्ला, जिरो पोइन्ट नाइन र वान पोइन्ट जिरो एटको बीचमा पर्छ, त्यसैले एच इन्टरपोलेट गर्दा नौ सय अठहत्तर दशमलव नौ ए टी पर मिटर। आइरन ए टी इक्वल्स सात सय बयासी दशमलव दुई।',
      ask: {
        q: 'Cast steel ko H nikalna yo question ma kun tarika prayog garincha?',
        voice: 'कास्ट स्टिलको एच निकाल्न यो क्वेस्चनमा कुन तरिका प्रयोग गरिन्छ?',
        options: ['B-H data bata interpolate', 'H = B/μ0', 'μr = 4000 maanera'],
        answer: 0,
        why: 'μr diyeko chaina; magnetization data bata B = 1.061 T ko H padhincha.',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} H_g &= \dfrac{B}{\mu_0} \\ &= 844\,343\ \text{AT/m} \\ AT_g &= 844\,343\times0.001 \\ &= 844.3 \end{aligned}`}</K>,
      say: 'Gap ma H g equals B over mu zero, 844,343; gap AT equals 844.3.',
      voice: 'ग्यापमा एच जी इक्वल्स बी ओभर म्यु जिरो, आठ लाख चवालीस हजार तीन सय त्रिचालीस। ग्याप ए टी इक्वल्स आठ सय चवालीस दशमलव तीन।',
    },
    {
      node: <K>{String.raw`\begin{aligned} NI &= 782.2 + 844.3 \\ &= 1626.5 \\ I &= \dfrac{1626.5}{600} \end{aligned}`}</K>,
      say: 'Total AT 1626.5. I equals 1626.5 over 600.',
      voice: 'टोटल ए टी सोह्र सय छब्बीस दशमलव पाँच। आई इक्वल्स सोह्र सय छब्बीस दशमलव पाँच ओभर छ सय।',
    },
  ],
  answer: { node: <K>{String.raw`\boxed{I = 2.71\ \text{A}}`}</K>, say: 'Answer: I equals 2.71 ampere.', voice: 'आन्सर — आई इक्वल्स टु पोइन्ट सेभेन वान एम्पियर।' },
  trap: { node: <>Trap: read H for iron from the data; μ<sub>r</sub> is not constant on a B-H curve.</>, say: 'Trap: iron ko H data bata padhne; B-H curve ma mu r constant hudaina.', voice: 'ट्र्याप — आइरनको एच डाटाबाट पढ्ने, बी एच कर्भमा म्यु आर कन्स्टेन्ट हुँदैन।' },
});

/* ── 1.9 Model answer: torque from the force on conductors (2079 Jestha) */
// No question on force on a conductor alone in vault/; the closest real one.
export const forceAnswer19 = answer('Model answer: torque from the force on current-carrying conductors', {
  draw: figAt(inductionFigure, { 2: 1, 3: 1 }),
  viewBox: '0 0 370 225',
  papers: ['2079 Jestha'],
  marks: '',
  q: 'How is unidirectional torque produced in a DC machine when the armature is supplied from DC and the field by DC current? What factors affect the torque?',
  read: {
    say: 'IOE 2079 Jestha: DC machine ma unidirectional torque kasari banchha, ra torque lai kun factor le asar garcha.',
    voice: 'आई ओ ई दुई हजार उनासी जेठ — डी सी मेसिनमा युनिडाइरेक्सनल टर्क कसरी बन्छ, र टर्कलाई कुन फ्याक्टरले असर गर्छ।',
  },
  points: [
    {
      carry: <>F = BIl on each conductor</>,
      node: <><H>(a) Force on a conductor (Fig. 1.3)</H><Pts items={[<>A conductor of length l carrying I in a field B experiences <K>{String.raw`F = BIl\sin\theta`}</K> newton</>, <>Direction by Fleming’s left-hand rule</>]} /></>,
      say: 'B field ma l length ra I current bhayeko conductor ma F equals B I l sin theta newton force lagcha, direction Fleming ko left-hand rule le.',
      voice: 'बी फिल्डमा एल लेन्थ र आई करेन्ट भएको कन्डक्टरमा, एफ इक्वल्स बी आई एल साइन थिटा न्युटन फोर्स लाग्छ, डाइरेक्सन फ्लेमिङको लेफ्ट ह्यान्ड रुलले।',
    },
    {
      node: <><H>(b) Unidirectional torque</H><Pts items={[<>Conductors under N carry current one way, those under S the other way: forces form a couple</>, <>The commutator reverses each coil’s current as it crosses the MNA, so the couple keeps one direction</>]} /></>,
      say: 'N pole ko prabhav ma conductor ko current euta disha, S pole ko prabhav ma arko disha, tesaile forces le couple banaucha. Commutator le MNA ma coil ko current palta dincha, ra torque eutai disha ma rahancha.',
      voice: 'एन पोलको प्रभावमा कन्डक्टरको करेन्ट एउटा दिशा, एस पोलको प्रभावमा अर्को दिशा, त्यसैले फोर्सले कपल बनाउँछ। कम्युटेटरले एम एन एमा कोइलको करेन्ट पल्टाइदिन्छ, र टर्क एउटै दिशामा रहन्छ।',
    },
    {
      page: true,
      node: <><H>(c) Factors affecting torque</H><K>{String.raw`T_a = 0.159\,\phi Z I_a\left(\dfrac{P}{A}\right) \unit{newton-metre}`}</K><Pts items={[<>Flux per pole φ and armature current I<sub>a</sub> (for a given machine <K>{String.raw`T_a \propto \phi I_a`}</K>)</>, <>Design constants: poles P, conductors Z, parallel paths A</>]} /></>,
      say: 'Torque T a equals 0.159 phi Z I a, P over A. Given machine ma torque flux ra armature current ma bhar parcha; P, Z ra A design constant hun.',
      voice: 'टर्क — टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, पी ओभर ए। गिभन मेसिनमा टर्क, फ्लक्स र आर्मेचर करेन्टमा भर पर्छ। पी, जेड र ए डिजाइन कन्स्टेन्ट हुन्।',
      ask: {
        q: 'Given DC machine ma torque kun dui quantity ma bhar parcha?',
        voice: 'गिभन डी सी मेसिनमा टर्क कुन दुई क्वान्टिटीमा भर पर्छ?',
        options: ['Flux ra armature current', 'Speed ra voltage', 'Resistance ra speed'],
        answer: 0,
        why: 'Ta ∝ φ Ia; P, Z, A fixed.',
      },
    },
  ],
});

// One topic per IOE syllabus bullet of Unit 1 (rule 68).
const t11 = topic({ num: '1.1', title: 'Magnetic Circuits', opener: basics11, derive: [ohm11], picture: [ohmAnswer11] });
const t12 = topic({ num: '1.2', title: "Ohm's Law for Magnetic Circuits", opener: basicsOhm12, derive: [reluctance12], picture: [relAnswer12] });
const t13 = topic({ num: '1.3', title: 'Series and Parallel magnetic circuits', opener: basicsSeries13, derive: [series13], picture: [parAnswer13] });
const t14 = topic({ num: '1.4', title: 'Core with air gap', opener: basicsGap14, derive: [gap11], picture: [gapSolve11] });
const t15 = topic({ num: '1.5', title: 'B-H relationship (Magnetization Characteristics)', opener: basicsBh15, derive: [bh12], picture: [bhSolve15] });
const t16 = topic({ num: '1.6', title: 'Hysteresis with DC and AC excitation', opener: basicsHyst16, derive: [hyst16], picture: [loopAnswer12] });
const t17 = topic({ num: '1.7', title: 'Hysteresis Loss and Eddy Current Loss', opener: basics12, derive: [loss12], picture: [reduceAnswer12] });
const t18 = topic({ num: '1.8', title: "Faraday's Law of Electromagnetic Induction, Statically and Dynamically Induced EMF", opener: basics13, derive: [faraday13], picture: [faradayAnswer13] });
const t19 = topic({ num: '1.9', title: 'Force on Current Carrying Conductor', opener: basicsForce19, derive: [blv13], picture: [forceAnswer19] });

export const unit1 = {
  topics: [t11, t12, t13, t14, t15, t16, t17, t18, t19],
  summary: [
    <>Magnetic circuit: flux ko closed path. <span className="math">Φ = MMF/S</span>, MMF = NI, S = l/(μ0μrA).</>,
    <>Series circuit: reluctance jodincha; air gap le sabai bhanda dherai AT khancha. Parallel: flux bandincha.</>,
    <>B-H curve: saturation, retentivity B<sub>r</sub>, coercive force H<sub>c</sub>; loop ko area = energy per cycle per m³.</>,
    <>P<sub>h</sub> = ηB<sub>max</sub><sup>1.6</sup>fV; P<sub>e</sub> = k<sub>e</sub>B<sub>m</sub>²f²t²V; silicon steel ra lamination le ghataucha.</>,
    <>Faraday: e = −N dΦ/dt. Static (transformer) ra dynamic (generator, e = Blv sinθ). Force F = BIl sinθ (motor).</>,
  ],
};
