import { C, K, Pts, answer, duo, solve, topic } from '../video/kit.jsx';
import { Cap, T, W, head } from '../unit4/figs.jsx';
import { motorTour } from '../unit4/basics3d.js';

/*
  Unit 3 DC Generator (IOE syllabus).
    3.1 construction, armature winding, working principle, commutator action
    3.2 EMF equation
    3.3 excitation, types, voltage build-up, characteristics
    3.4 losses, efficiency, voltage regulation
  Segment 1 uses the DC machine of Unit 4 (unit4/basics3d.js) with its
  generator parts: `engine` (prime mover) and `lamp` (load) in place of the battery.
  Recomputed: 2070 Bhadra IL 40 A, Ish 1 A, Ia 41 A, E = 250 + 41 × 0.25 =
  260.25 V, N = 60 × 4 × 260.25 / (4 × 0.05 × 300) = 1041 rpm. 2071 Magh
  Vsh = 260 V, Ish 2 A, Ia 102 A, E = 260 + 10.2 + 2 = 272.2 V. 2074 Bhadra
  IL 150, Ish 4, Ia 154 A, E 207.7 V, Cu 1185.8 + 800 W, η = 90.95 %.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
const MACHINE = ['yoke', 'poles', 'fieldCoil', 'armature', 'coil', 'commutator', 'brushes', 'shaft'];
const GEN = [...MACHINE, 'engine', 'lamp'];

/* ── Figures ─────────────────────────────────────────────────────────── */
// Fig. 3.1: 0 poles + loop · 1 rotation, e = Blv · 2 AC in the loop · 3 split-ring commutator · 4 DC output
export const genFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M20 50 H60 V150 H20 Z" />
      <W d="M160 50 H200 V150 H160 Z" />
      <T x={40} y={105} b size={15}>N</T>
      <T x={180} y={105} b size={15}>S</T>
      <W d="M80 70 L140 130 M80 70 L95 60 M140 130 L125 140" w={1.6} />
      <T x={76} y={64} a="end" i size={10}>a</T>
      <T x={146} y={140} a="start" i size={10}>b</T>
      <Cap x={110} y={208}>Fig. 3.1  Single-loop generator</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <path d="M110 30 A70 70 0 0 1 180 100" fill="none" stroke={C.chalk} strokeWidth={1} />
      {head(180, 100, 'down', 6)}
      <T x={150} y={30} i size={10}>ω (prime mover)</T>
      <T x={110} y={178} i size={10}>e = Blv sin θ</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M230 60 H350" w={0.8} />
      <path d="M230 60 C245 25 260 25 275 60 C290 95 305 95 320 60 C330 40 340 35 350 45" fill="none" stroke={C.chalk} strokeWidth={1.4} />
      <T x={290} y={110} size={10}>EMF in the loop: AC</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <path d="M100 168 A14 14 0 0 1 100 196" fill="none" stroke={C.chalk} strokeWidth={2} transform="translate(-6 -20)" />
      <path d="M100 168 A14 14 0 0 0 100 196" fill="none" stroke={C.chalk} strokeWidth={2} transform="translate(26 -20)" />
      <T x={150} y={192} a="start" size={10}>split-ring commutator</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <W d="M230 170 H350" w={0.8} />
      <path d="M230 170 C245 135 260 135 275 170 C290 135 305 135 320 170 C330 150 340 145 350 155" fill="none" stroke={C.chalk} strokeWidth={1.4} />
      <T x={290} y={188} size={10}>at the brushes: DC</T>
    </g>
  </>
);

// Fig. 3.2: 0 armature with P poles · 1 one conductor · 2 one revolution cuts PΦ · 3 Z/A conductors per path
export const emfGenFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <circle cx={150} cy={110} r={60} fill="none" stroke={C.chalk} strokeWidth={1.5} />
      {[0, 90, 180, 270].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <g key={a}>
            <rect x={150 + Math.cos(r) * 82 - 12} y={110 + Math.sin(r) * 82 - 12} width={24} height={24} fill="none" stroke={C.chalk} strokeWidth={1.2} />
            <T x={150 + Math.cos(r) * 82} y={110 + Math.sin(r) * 82 + 4} b>{i % 2 ? 'S' : 'N'}</T>
          </g>
        );
      })}
      <Cap x={150} y={218}>Fig. 3.2  P-pole armature with Z conductors</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <circle cx={150} cy={52} r={5} fill={C.board} stroke={C.chalk} strokeWidth={1.2} />
      <circle cx={150} cy={52} r={1.5} fill={C.chalk} />
      <T x={160} y={46} a="start" i size={10}>conductor</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <path d="M150 38 A72 72 0 1 1 149 38" fill="none" stroke={C.chalk} strokeWidth={0.9} strokeDasharray="4 3" />
      <T x={290} y={70} a="middle" size={10}>1 rev: flux cut = PΦ</T>
      <T x={290} y={86} a="middle" size={10}>time = 60/N s</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <T x={290} y={130} size={10}>A parallel paths</T>
      <T x={290} y={146} size={10}>Z/A conductors in series</T>
      <T x={290} y={162} size={10}>lap A = P, wave A = 2</T>
    </g>
  </>
);

// Fig. 3.3: 0 axes · 1 OCC with residual E_r · 2 field-resistance line · 3 build-up steps · 4 critical resistance (tangent)
export const occFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M40 190 H330 M40 190 V25" />
      {head(330, 190, 'right')}
      {head(40, 25, 'up')}
      <T x={326} y={206} i>If</T>
      <T x={30} y={30} a="end" i>E</T>
      <Cap y={222}>Fig. 3.3  OCC and voltage build-up of a shunt generator</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M40 178 C90 140 120 80 170 62 S280 45 320 42" w={1.6} />
      <T x={46} y={174} a="start" i size={10}>Er</T>
      <T x={320} y={36} a="end" size={10}>OCC</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M40 190 L300 58" w={1.2} />
      <T x={300} y={74} a="start" i size={10}>Rf line</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M40 178 H62 V160 H96 V128 H146 V103 H200 V76 H252" w={0.9} dash="3 2" />
      <circle cx={262} cy={77} r={3.5} fill={C.chalk} />
      <T x={268} y={92} a="start" size={10}>final voltage</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <W d="M40 190 L150 60" w={1.1} dash="6 3" />
      <T x={150} y={52} size={10}>Rc (critical)</T>
    </g>
  </>
);

// Fig. 3.4: power stages. 0 mechanical input · 1 iron + friction · 2 EIa generated · 3 Cu loss · 4 output VIL
export const genFlowFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <rect x={14} y={80} width={84} height={40} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={56} y={98} size={10}>Mechanical</T>
      <T x={56} y={112} size={10}>input</T>
      <Cap y={214}>Fig. 3.4  Power stages of a DC generator</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M98 100 H136" />
      {head(136, 100, 'right', 6)}
      <W d="M118 100 V150" w={1} />
      {head(118, 154, 'down', 6)}
      <T x={118} y={170} size={10}>iron + friction</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <rect x={138} y={80} width={84} height={40} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={180} y={98} size={10}>Generated</T>
      <T x={180} y={112} i size={10}>E Ia</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M222 100 H260" />
      {head(260, 100, 'right', 6)}
      <W d="M242 100 V150" w={1} />
      {head(242, 154, 'down', 6)}
      <T x={242} y={170} size={10}>copper losses</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <rect x={262} y={80} width={84} height={40} fill="none" stroke={C.chalk} strokeWidth={1.3} />
      <T x={304} y={98} size={10}>Output</T>
      <T x={304} y={112} i size={10}>V IL</T>
    </g>
  </>
);

/* ── 3.1 Construction, working, commutator ──────────────────────────── */
export const basics31 = duo('3.1 · Basic understanding: how does rotation make electricity?', {
  three: motorTour([
    { shot: 'engine', show: GEN, spin: 0.5, open: 0.6, focus: ['engine', 'shaft'], labels: [['engine le ghumaucha', 'engine']] },
    { shot: 'inside', open: 1, field: 1, spin: 0.4, focus: ['poles', 'field'], labels: [['N pole', 'north'], ['S pole', 'south']] },
    { field: 0.4, focus: ['armature', 'coil'], labels: [['ghumne coil', 'coil']] },
    { shot: 'wiring', field: 0.8, flow: 0.8, wiring: 'main', focus: ['coil', 'lamp', 'wires'], labels: [['bulb balyo', 'lamp']] },
    { shot: 'commutator', flow: 0.8, focus: ['commutator', 'brushes'], labels: [['commutator', 'commutator'], ['brush', 'brushes']] },
    { spin: 0.8, focus: ['commutator', 'brushes', 'lamp'], labels: [['eutai disha', 'brushes']] },
    { shot: 'whole', open: 0.2, focus: ['yoke', 'poles', 'fieldCoil'], labels: [['yoke: frame', 'yoke'], ['field coil', 'fieldCoil']] },
    { shot: 'wiring', open: 0.6, spin: 0.6, flow: 0.7, focus: null },
  ]),
  tutor: [
    {
      say: 'Hydropower ma pani le turbine ghumaucha; cycle ko dynamo ma chakka le. Generator ma engine le shaft ghumaucha.',
      voice: 'हाइड्रोपावरमा पानीले टर्बाइन घुमाउँछ, साइकलको डाइनामोमा चक्काले। जेनेरेटरमा इन्जिनले सफ्ट घुमाउँछ।',
      lines: [['h', <>3.1 · Ghumaye bijuli kasari banchha?</>], ['step', <>Engine (prime mover) le shaft ghumaucha</>]],
    },
    {
      say: 'Bhitra motor jastai duita magnet: N ra S, ra bich ma nadekhine field.',
      voice: 'भित्र मोटर जस्तै दुईटा म्याग्नेट — एन र एस, र बीचमा नदेखिने फिल्ड।',
      lines: [['step', <>Magnet: N ra S → field</>]],
    },
    {
      say: 'Shaft sanga armature ra yasko tama ko coil ghumcha, ra coil le magnet ko field kaatcha.',
      voice: 'सफ्टसँग आर्मेचर र यसको तामाको कोइल घुम्छ, र कोइलले म्याग्नेटको फिल्ड काट्छ।',
      lines: [['step', <>Coil ghumcha → field kaatcha</>]],
    },
    {
      say: 'Field kaatda coil ma bijuli induce huncha, ra bulb balcha. Motor ko ulto: ghumai dida bijuli aaucha.',
      voice: 'फिल्ड काट्दा कोइलमा बिजुली इन्ड्युस हुन्छ, र बल्ब बल्छ। मोटरको उल्टो — घुमाइ दिँदा बिजुली आउँछ।',
      lines: [['step', <>Field kaatyo → bijuli → bulb balyo</>]],
      ask: {
        q: 'Generator ma kun energy kun ma badlincha?',
        voice: 'जेनेरेटरमा कुन इनर्जी कुनमा बदलिन्छ?',
        options: ['Ghumai bata bijuli', 'Bijuli bata ghumai', 'Taato bata bijuli'],
        answer: 0,
        why: 'Generator le mechanical energy lai electrical ma badalcha.',
      },
    },
    {
      say: 'Coil bhitra ko bijuli ulto-sulto, AC huncha. Aagadi ko tukra-tukra ring commutator ra carbon brush le bahira pathaucha.',
      voice: 'कोइलभित्रको बिजुली उल्टो सुल्टो, ए सी हुन्छ। अगाडिको टुक्रा टुक्रा रिङ कम्युटेटर र कार्बन ब्रसले बाहिर पठाउँछ।',
      lines: [['step', <>Coil bhitra AC · commutator + brush le bahira</>]],
    },
    {
      say: 'Harek aadha ghumai ma commutator le jodai pharkaucha, tesaile bahira ko bijuli sadhai eutai disha: DC.',
      voice: 'हरेक आधा घुमाइमा कम्युटेटरले जोडाइ फर्काउँछ, त्यसैले बाहिरको बिजुली सधैं एउटै दिशा — डी सी।',
      lines: [['step', <>Aadha ghumai ma jodai pharkincha → bahira DC</>]],
    },
    {
      say: 'Bahira ko falam ko frame yoke ho; pole ma bereko tar field coil, jasle magnet banaucha.',
      voice: 'बाहिरको फलामको फ्रेम योक हो, पोलमा बेरेको तार फिल्ड कोइल, जसले म्याग्नेट बनाउँछ।',
      lines: [['step', <>Yoke: frame · field coil: magnet banaune tar</>]],
    },
    {
      say: 'Saransha: engine le ghumaucha, coil le field kaatcha, bijuli aaucha, ra commutator le DC banaucha.',
      voice: 'सारांश — इन्जिनले घुमाउँछ, कोइलले फिल्ड काट्छ, बिजुली आउँछ, र कम्युटेटरले डी सी बनाउँछ।',
      lines: [['idea', <>Ghumai → field kaatyo → bijuli → commutator → DC</>]],
    },
  ],
  lecturer: [
    {
      say: 'DC generator le prime mover ko mechanical energy lai DC electrical energy ma convert garcha.',
      voice: 'डी सी जेनेरेटरले प्राइम मुभरको मेकानिकल इनर्जीलाई डी सी इलेक्ट्रिकल इनर्जीमा कन्भर्ट गर्छ।',
      lines: [['h', <>3.1 · The DC generator</>], ['step', <>Prime mover → mechanical input</>]],
    },
    {
      say: 'Field system le poles bich ma magnetic field dincha.',
      voice: 'फिल्ड सिस्टमले पोल्स बीचमा म्याग्नेटिक फिल्ड दिन्छ।',
      lines: [['step', <>Field poles: N and S</>]],
    },
    {
      say: 'Armature conductors rotate hunda flux cut garchan.',
      voice: 'आर्मेचर कन्डक्टर्स रोटेट हुँदा फ्लक्स कट गर्छन्।',
      lines: [['step', <>Rotating armature conductors cut the flux</>]],
    },
    {
      say: 'Faraday ko law anusar conductors ma dynamically induced EMF aaucha ra load ma current bagcha.',
      voice: 'फाराडेको ल अनुसार कन्डक्टर्समा डाइनामिकल्ली इन्ड्युस्ड ई एम एफ आउँछ, र लोडमा करेन्ट बग्छ।',
      lines: [['step', <>Dynamically induced EMF → load current</>]],
      ask: {
        q: 'Generator ko EMF ko direction kun rule le?',
        voice: 'जेनेरेटरको ई एम एफको डाइरेक्सन कुन रुलले?',
        options: ["Fleming's right-hand rule", "Fleming's left-hand rule", 'Cork-screw rule'],
        answer: 0,
        why: 'Right hand: generator; left hand: motor.',
      },
    },
    {
      say: 'Armature ma induce bhayeko EMF alternating huncha; commutator ra brushes le tyaslai collect garchan.',
      voice: 'आर्मेचरमा इन्ड्युस भएको ई एम एफ अल्टरनेटिङ हुन्छ, कम्युटेटर र ब्रसेसले त्यसलाई कलेक्ट गर्छन्।',
      lines: [['step', <>Induced EMF is alternating; collected by commutator and brushes</>]],
    },
    {
      say: 'Commutator le harek half revolution ma connection reverse garcha, ra external circuit ma unidirectional current dincha.',
      voice: 'कम्युटेटरले हरेक हाफ रिभोल्युसनमा कनेक्सन रिभर्स गर्छ, र एक्सटर्नल सर्किटमा युनिडाइरेक्सनल करेन्ट दिन्छ।',
      lines: [['step', <>Commutator: mechanical rectifier → DC in the external circuit</>]],
    },
    {
      say: 'Yoke le mechanical support ra flux ko return path dincha; field winding le poles excite garcha.',
      voice: 'योकले मेकानिकल सपोर्ट र फ्लक्सको रिटर्न पाथ दिन्छ, फिल्ड वाइन्डिङले पोल्स एक्साइट गर्छ।',
      lines: [['step', <>Yoke: support + flux return · field winding: excitation</>]],
    },
    {
      say: 'Saransha: rotation, flux cutting, induced EMF, ra commutator le rectification.',
      voice: 'सारांश — रोटेसन, फ्लक्स कटिङ, इन्ड्युस्ड ई एम एफ, र कम्युटेटरले रेक्टिफिकेसन।',
      lines: [['idea', <>Rotation → flux cutting → induced EMF → commutation → DC</>]],
    },
  ],
});

export const construction31 = duo('Construction of a DC generator', {
  draw: genFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Yoke: cast iron wa rolled steel ko bahira ko frame. Machine lai thamcha ra flux ko return path dincha.',
      voice: 'योक — कास्ट आइरन वा रोल्ड स्टिलको बाहिरको फ्रेम। मेसिनलाई थाम्छ, र फ्लक्सको रिटर्न पाथ दिन्छ।',
      lines: [['h', <>Construction of a DC machine</>], ['step', <>Yoke: frame, mechanical support, flux return path</>]],
    },
    {
      say: 'Pole core ra pole shoe: pole shoe chauda huncha, flux lai airgap ma phailaucha. Pole ma field winding.',
      voice: 'पोल कोर र पोल सु — पोल सु चौडा हुन्छ, फ्लक्सलाई एयर ग्यापमा फैलाउँछ। पोलमा फिल्ड वाइन्डिङ।',
      lines: [['step', <>Poles: core + shoe (spreads flux); field winding excites them</>]],
    },
    {
      say: 'Armature core laminated silicon steel ko, slot bhayeko. Slot ma armature winding basincha, jasma EMF induce huncha.',
      voice: 'आर्मेचर कोर ल्यामिनेटेड सिलिकन स्टिलको, स्लट भएको। स्लटमा आर्मेचर वाइन्डिङ बसिन्छ, जसमा ई एम एफ इन्ड्युस हुन्छ।',
      lines: [['step', <>Armature: laminated slotted core + winding (EMF is induced here)</>]],
      ask: {
        q: 'Armature core laminated kina banaincha?',
        voice: 'आर्मेचर कोर ल्यामिनेटेड किन बनाइन्छ?',
        options: ['Eddy current loss ghatauna', 'Weight badhauna', 'Speed badhauna'],
        answer: 0,
        why: 'Armature core field ma ghumcha: flux badlincha, eddy current banna khojcha.',
      },
    },
    {
      say: 'Commutator: hard-drawn copper ka segments, bich ma mica insulation. Yo mechanical rectifier ho.',
      voice: 'कम्युटेटर — हार्ड ड्रन कपरका सेग्मेन्ट्स, बीचमा माइका इन्सुलेसन। यो मेकानिकल रेक्टिफायर हो।',
      lines: [['step', <>Commutator: copper segments insulated by mica (mechanical rectifier)</>]],
    },
    {
      say: 'Brushes: carbon ka, spring le commutator ma thichincha; ghumne commutator bata current bahira lyauchha. Bearing ra shaft le ghumaucha.',
      voice: 'ब्रसेस — कार्बनका, स्प्रिङले कम्युटेटरमा थिचिन्छ, घुम्ने कम्युटेटरबाट करेन्ट बाहिर ल्याउँछ। बेयरिङ र सफ्टले घुमाउँछ।',
      lines: [['idea', <>Brushes: carbon, spring-pressed, collect current · bearings and shaft</>]],
    },
  ],
  lecturer: [
    {
      say: 'Yoke: the outer frame of cast iron or steel; it gives mechanical support and carries the flux return path.',
      voice: 'योक — द आउटर फ्रेम अफ कास्ट आइरन अर स्टिल, इट गिभ्स मेकानिकल सपोर्ट एन्ड क्यारिज द फ्लक्स रिटर्न पाथ।',
      lines: [['h', <>Construction</>], ['step', <>Yoke: support, flux return path</>]],
    },
    {
      say: 'Poles: pole core and pole shoe; the shoe spreads the flux and supports the field winding.',
      voice: 'पोल्स — पोल कोर एन्ड पोल सु, द सु स्प्रेड्स द फ्लक्स एन्ड सपोर्ट्स द फिल्ड वाइन्डिङ।',
      lines: [['step', <>Pole core and shoe; field winding</>]],
    },
    {
      say: 'Armature: a laminated, slotted silicon-steel core carrying the armature winding.',
      voice: 'आर्मेचर — अ ल्यामिनेटेड, स्लटेड सिलिकन स्टिल कोर क्यारिङ द आर्मेचर वाइन्डिङ।',
      lines: [['step', <>Armature core (laminated, slotted) and winding</>]],
      ask: {
        q: 'Commutator segments bich ma kun insulation hunchha?',
        voice: 'कम्युटेटर सेग्मेन्ट्स बीचमा कुन इन्सुलेसन हुन्छ?',
        options: ['Mica', 'Paper', 'Rubber'],
        answer: 0,
        why: 'Mica le taato sahancha ra copper segments alag rakhcha.',
      },
    },
    {
      say: 'Commutator: copper segments insulated by mica; it rectifies the alternating EMF of the armature.',
      voice: 'कम्युटेटर — कपर सेग्मेन्ट्स इन्सुलेटेड बाइ माइका, इट रेक्टिफाइज द अल्टरनेटिङ ई एम एफ अफ द आर्मेचर।',
      lines: [['step', <>Commutator: copper segments + mica, rectifies</>]],
    },
    {
      say: 'Brushes of carbon collect the current from the commutator; bearings support the shaft.',
      voice: 'ब्रसेस अफ कार्बन कलेक्ट द करेन्ट फ्रम द कम्युटेटर, बेयरिङ्स सपोर्ट द सफ्ट।',
      lines: [['step', <><Pts items={[<>Brushes (carbon): collect current</>, <>Bearings and shaft</>]} /></>]],
    },
  ],
});

export const working31 = duo('Working principle and commutator action', {
  draw: genFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Figure 3.1: N ra S bich ma ek loop a b. Prime mover le loop lai omega le ghumaucha.',
      voice: 'फिगर थ्री पोइन्ट वान — एन र एस बीचमा एक लुप ए बी। प्राइम मुभरले लुपलाई ओमेगाले घुमाउँछ।',
      lines: [['h', <>Working principle</>], ['step', <>Loop ab rotated in the field by a prime mover</>]],
    },
    {
      say: 'Conductor le flux kaatda e equals B l v sin theta. Theta 90 ma maximum, 0 ma zero.',
      voice: 'कन्डक्टरले फ्लक्स काट्दा ई इक्वल्स बी एल भी साइन थिटा। थिटा नाइन्टीमा म्याक्सिमम, जिरोमा जिरो।',
      lines: [['eq', tex(String.raw`e = Blv\sin\theta`)]],
    },
    {
      say: 'Aadha ghumai pachi a ra b ko thau saatincha, tesaile loop ko EMF ulto: loop ma AC.',
      voice: 'आधा घुमाइपछि ए र बीको ठाउँ साटिन्छ, त्यसैले लुपको ई एम एफ उल्टो — लुपमा ए सी।',
      lines: [['step', <>Every half turn the sides interchange → EMF in the loop is AC</>]],
      ask: {
        q: 'Loop field lines ko parallel chalda EMF kati?',
        voice: 'लुप फिल्ड लाइन्सको प्यारालल चल्दा ई एम एफ कति?',
        options: ['Zero', 'Maximum', 'Aadha'],
        answer: 0,
        why: 'θ = 0: sin θ = 0, flux kaatdaina.',
      },
    },
    {
      say: 'Split-ring commutator ka dui tukra loop ka dui chheu ma jodincha. Brush fixed, ring ghumcha.',
      voice: 'स्प्लिट रिङ कम्युटेटरका दुई टुक्रा लुपका दुई छेउमा जोडिन्छ। ब्रस फिक्स्ड, रिङ घुम्छ।',
      lines: [['step', <>Split ring: each half joined to one end of the loop; brushes fixed</>]],
    },
    {
      say: 'Jun bela EMF ulto huncha, tyahi bela brush le arko tukra chhuncha. Bahira sadhai eutai disha: commutator action.',
      voice: 'जुन बेला ई एम एफ उल्टो हुन्छ, त्यही बेला ब्रसले अर्को टुक्रा छुन्छ। बाहिर सधैं एउटै दिशा — कम्युटेटर एक्सन।',
      lines: [['idea', <>EMF reverses exactly when the brush moves to the other segment → unidirectional (DC) output</>]],
    },
  ],
  lecturer: [
    {
      say: 'Working principle: a conductor moving in a magnetic field has an EMF induced in it, Faraday’s law, Figure 3.1.',
      voice: 'वर्किङ प्रिन्सिपल — अ कन्डक्टर मुभिङ इन अ म्याग्नेटिक फिल्ड ह्याज एन ई एम एफ इन्ड्युस्ड इन इट, फाराडेज ल, फिगर थ्री पोइन्ट वान।',
      lines: [['h', <>Working principle and commutator action</>], ['step', <>Rotating loop in a field: dynamically induced EMF</>]],
    },
    {
      say: 'The EMF in each side is B l v sin theta.',
      voice: 'द ई एम एफ इन इच साइड इज बी एल भी साइन थिटा।',
      lines: [['eq', tex(String.raw`e = Blv\sin\theta`)]],
    },
    {
      say: 'As the sides interchange every half revolution, the EMF in the loop is alternating.',
      voice: 'एज द साइड्स इन्टरचेन्ज एभ्री हाफ रिभोल्युसन, द ई एम एफ इन द लुप इज अल्टरनेटिङ।',
      lines: [['step', <>The EMF in the loop is alternating</>]],
      ask: {
        q: 'Slip rings le output kasto dincha?',
        voice: 'स्लिप रिङ्सले आउटपुट कस्तो दिन्छ?',
        options: ['AC', 'DC', 'Zero'],
        answer: 0,
        why: 'Slip ring ko connection kahile pharkidaina: loop ko AC nai bahira.',
      },
    },
    {
      say: 'With a split-ring commutator, each segment is joined to one end of the loop and the brushes are stationary.',
      voice: 'विद अ स्प्लिट रिङ कम्युटेटर, इच सेग्मेन्ट इज ज्वाइन्ड टु वान एन्ड अफ द लुप एन्ड द ब्रसेस आर स्टेसनरी।',
      lines: [['step', <>Split-ring commutator, stationary brushes</>]],
    },
    {
      say: 'The connections reverse exactly when the EMF reverses, so the external current is unidirectional. This is commutator action.',
      voice: 'द कनेक्सन्स रिभर्स एक्जाक्ट्ली ह्वेन द ई एम एफ रिभर्सेज, सो द एक्सटर्नल करेन्ट इज युनिडाइरेक्सनल। दिस इज कम्युटेटर एक्सन।',
      lines: [['step', <>Connections reverse with the EMF → unidirectional output: commutator action</>]],
    },
  ],
});

export const winding31 = duo('Armature winding: lap and wave', {
  draw: emfGenFigure,
  viewBox: '0 0 360 225',
  tutor: [
    {
      say: 'Armature ka conductors lai jodne dui tarika: lap ra wave. Jodne tarika le parallel paths A tay garcha.',
      voice: 'आर्मेचरका कन्डक्टर्सलाई जोड्ने दुई तरिका — ल्याप र वेभ। जोड्ने तरिकाले प्यारालल पाथ्स ए तय गर्छ।',
      lines: [['h', <>Armature winding</>], ['step', <>Lap and wave; the connection decides the number of parallel paths A</>]],
    },
    {
      say: 'Lap winding: coil ko antya chheu chheu ko commutator segment ma; coils ek-arka mathi khapteka. A equals P.',
      voice: 'ल्याप वाइन्डिङ — कोइलको अन्त्य छेउछेउको कम्युटेटर सेग्मेन्टमा, कोइलहरू एक अर्कामाथि खप्टेका। ए इक्वल्स पी।',
      lines: [['step', <>Lap: coil ends to adjacent segments; <b>A = P</b> → large current, low voltage</>]],
    },
    {
      say: 'Wave winding: coil aghi badhdai pole-pole hudai wave jasto jancha. P jati bhaye pani A equals 2.',
      voice: 'वेभ वाइन्डिङ — कोइल अघि बढ्दै पोल पोल हुँदै वेभ जस्तो जान्छ। पी जति भए पनि ए इक्वल्स टु।',
      lines: [['step', <>Wave: progresses round the armature like a wave; <b>A = 2</b> → high voltage, low current</>]],
      ask: {
        q: '6-pole lap winding ma kati parallel paths?',
        voice: 'सिक्स पोल ल्याप वाइन्डिङमा कति प्यारालल पाथ्स?',
        options: ['6', '2', '3'],
        answer: 0,
        why: 'Lap: A = P = 6.',
      },
    },
    {
      say: 'Lap ma dherai path, tesaile thulo current, sano voltage. Wave ma kam path, thulo voltage, sano current.',
      voice: 'ल्यापमा धेरै पाथ, त्यसैले ठूलो करेन्ट, सानो भोल्टेज। वेभमा कम पाथ, ठूलो भोल्टेज, सानो करेन्ट।',
      lines: [['step', <>Lap: heavy-current, low-voltage machines · wave: high-voltage, low-current</>]],
    },
    {
      say: 'Lap ma path haru ko EMF farak bhaye circulating current aaucha, tesaile equaliser rings lagaincha.',
      voice: 'ल्यापमा पाथहरूको ई एम एफ फरक भए सर्कुलेटिङ करेन्ट आउँछ, त्यसैले इक्वलाइजर रिङ्स लगाइन्छ।',
      lines: [['idea', <>Lap needs equaliser rings (unequal path EMFs); wave needs none, only 2 brushes essential</>]],
    },
  ],
  lecturer: [
    {
      say: 'Armature windings are of two types, lap and wave; they differ in the number of parallel paths A.',
      voice: 'आर्मेचर वाइन्डिङ्स आर अफ टु टाइप्स, ल्याप एन्ड वेभ, देय डिफर इन द नम्बर अफ प्यारालल पाथ्स ए।',
      lines: [['h', <>Types of armature winding</>], ['step', <>Lap and wave windings</>]],
    },
    {
      say: 'Lap winding: the ends of each coil go to adjacent segments; A equals P.',
      voice: 'ल्याप वाइन्डिङ — द एन्ड्स अफ इच कोइल गो टु एडजासेन्ट सेग्मेन्ट्स, ए इक्वल्स पी।',
      lines: [['step', <>Lap: A = P</>]],
    },
    {
      say: 'Wave winding: the coils progress round the armature in waves; A equals 2 for any number of poles.',
      voice: 'वेभ वाइन्डिङ — द कोइल्स प्रोग्रेस राउन्ड द आर्मेचर इन वेभ्स, ए इक्वल्स टु फर एनी नम्बर अफ पोल्स।',
      lines: [['step', <>Wave: A = 2</>]],
      ask: {
        q: 'High voltage, low current machine ko lagi kun winding?',
        voice: 'हाई भोल्टेज, लो करेन्ट मेसिनको लागि कुन वाइन्डिङ?',
        options: ['Wave', 'Lap', 'Dubai ustai'],
        answer: 0,
        why: 'Wave: A = 2, dherai conductors series ma.',
      },
    },
    {
      say: 'Lap suits large-current, low-voltage machines; wave suits high-voltage, low-current machines.',
      voice: 'ल्याप सुट्स लार्ज करेन्ट, लो भोल्टेज मेसिन्स, वेभ सुट्स हाई भोल्टेज, लो करेन्ट मेसिन्स।',
      lines: [['step', <>Lap: large current · wave: high voltage</>]],
    },
    {
      say: 'Lap windings need equaliser rings; wave windings need only two brushes.',
      voice: 'ल्याप वाइन्डिङ्स निड इक्वलाइजर रिङ्स, वेभ वाइन्डिङ्स निड ओन्ली टु ब्रसेस।',
      lines: [['step', <>Lap: equaliser rings · wave: two brushes suffice</>]],
    },
  ],
});

export const constructionAnswer31 = answer('Model answer: construction and working of a DC generator', {
  draw: genFigure,
  viewBox: '0 0 360 220',
  papers: ['2071 Bhadra', '2072 Ashwin', '2071 Magh'],
  q: 'Describe the construction and working principle of a dc generator with neat diagram.',
  read: {
    say: 'IOE ma tin choti: describe the construction and working principle of a dc generator with neat diagram.',
    voice: 'आई ओ ईमा तीन चोटि — डिस्क्राइब द कन्स्ट्रक्सन एन्ड वर्किङ प्रिन्सिपल अफ अ डी सी जेनेरेटर विद निट डायग्राम।',
  },
  points: [
    {
      node: <><H>Construction</H><Pts items={[<><b>Yoke:</b> outer frame; support and flux return path</>, <><b>Poles:</b> core and shoe, carrying the field winding</>, <><b>Armature:</b> laminated slotted core with the armature winding</>]} /></>,
      say: 'Construction: the yoke is the outer frame and flux return; the poles have a core and shoe carrying the field winding; the armature is a laminated slotted core with the winding.',
      voice: 'कन्स्ट्रक्सन — द योक इज द आउटर फ्रेम एन्ड फ्लक्स रिटर्न, द पोल्स ह्याभ अ कोर एन्ड सु क्यारिङ द फिल्ड वाइन्डिङ, द आर्मेचर इज अ ल्यामिनेटेड स्लटेड कोर विद द वाइन्डिङ।',
    },
    {
      node: <><Pts items={[<><b>Commutator:</b> copper segments insulated by mica; rectifies</>, <><b>Brushes:</b> carbon, collect the current</>, <><b>Shaft and bearings</b></>]} /></>,
      say: 'The commutator has copper segments insulated by mica and rectifies; carbon brushes collect the current; the shaft rides on bearings.',
      voice: 'द कम्युटेटर ह्याज कपर सेग्मेन्ट्स इन्सुलेटेड बाइ माइका एन्ड रेक्टिफाइज, कार्बन ब्रसेस कलेक्ट द करेन्ट, द सफ्ट राइड्स अन बेयरिङ्स।',
    },
    {
      page: true,
      node: <><H>Working principle</H><Pts items={[<>Based on Faraday’s law: a conductor cutting flux has an EMF <K>{String.raw`e = Blv\sin\theta`}</K> induced (Fig. 3.1)</>, <>The prime mover rotates the armature; the EMF in each coil alternates every half turn</>]} /></>,
      say: 'Working: by Faraday’s law, a conductor cutting flux has an EMF B l v sin theta. The prime mover rotates the armature, and the EMF in each coil alternates every half turn.',
      voice: 'वर्किङ — बाइ फाराडेज ल, अ कन्डक्टर कटिङ फ्लक्स ह्याज एन ई एम एफ बी एल भी साइन थिटा। द प्राइम मुभर रोटेट्स द आर्मेचर, एन्ड द ई एम एफ इन इच कोइल अल्टरनेट्स एभ्री हाफ टर्न।',
    },
    {
      node: <><Pts items={[<>The commutator reverses the coil connections as the EMF reverses</>, <>∴ the brushes deliver a unidirectional (DC) voltage; direction by Fleming’s right-hand rule</>]} /></>,
      say: 'The commutator reverses the connections as the EMF reverses, so the brushes deliver a DC voltage. Direction by Fleming’s right-hand rule.',
      voice: 'द कम्युटेटर रिभर्सेज द कनेक्सन्स एज द ई एम एफ रिभर्सेज, सो द ब्रसेस डेलिभर अ डी सी भोल्टेज। डाइरेक्सन बाइ फ्लेमिङ्स राइट ह्यान्ड रुल।',
      ask: {
        q: 'Commutator lai kun device bhanincha?',
        voice: 'कम्युटेटरलाई कुन डिभाइस भनिन्छ?',
        options: ['Mechanical rectifier', 'Transformer', 'Inverter'],
        answer: 0,
        why: 'Armature ko AC lai bahira DC banaucha.',
      },
    },
  ],
});

export const windingAnswer31 = answer('Model answer: types of armature winding', {
  draw: emfGenFigure,
  viewBox: '0 0 360 225',
  papers: ['2071 (Old Back)'],
  q: 'Discuss the types of armature winding in dc machine in brief.',
  read: {
    say: 'IOE 2071 old back: discuss the types of armature winding in dc machine in brief.',
    voice: 'आई ओ ई दुई हजार एकहत्तर ओल्ड ब्याक — डिस्कस द टाइप्स अफ आर्मेचर वाइन्डिङ इन डी सी मेसिन इन ब्रिफ।',
  },
  points: [
    {
      node: <><H>Lap winding</H><Pts items={[<>Each coil’s ends go to adjacent commutator segments; coils overlap (lap)</>, <>Parallel paths A = P; brushes = P</>]} /></>,
      say: 'Lap winding: each coil’s ends go to adjacent segments and the coils overlap. Parallel paths A equals P, with P brushes.',
      voice: 'ल्याप वाइन्डिङ — इच कोइल्स एन्ड्स गो टु एडजासेन्ट सेग्मेन्ट्स एन्ड द कोइल्स ओभरल्याप। प्यारालल पाथ्स ए इक्वल्स पी, विद पी ब्रसेस।',
    },
    {
      node: <><Pts items={[<>Suited to large current, low voltage</>, <>Needs equaliser rings to avoid circulating currents</>]} /></>,
      say: 'It suits large current and low voltage, and needs equaliser rings.',
      voice: 'इट सुट्स लार्ज करेन्ट एन्ड लो भोल्टेज, एन्ड निड्स इक्वलाइजर रिङ्स।',
    },
    {
      page: true,
      node: <><H>Wave winding</H><Pts items={[<>Coils progress round the armature in a wave under successive poles</>, <>A = 2 for any P; two brushes are enough</>, <>Suited to high voltage, low current; no equalisers needed</>]} /></>,
      say: 'Wave winding: the coils progress round the armature in a wave. A equals 2 for any P, two brushes are enough. It suits high voltage and low current, without equalisers.',
      voice: 'वेभ वाइन्डिङ — द कोइल्स प्रोग्रेस राउन्ड द आर्मेचर इन अ वेभ। ए इक्वल्स टु फर एनी पी, टु ब्रसेस आर इनफ। इट सुट्स हाई भोल्टेज एन्ड लो करेन्ट, विदआउट इक्वलाइजर्स।',
      ask: {
        q: '4-pole wave winding ma parallel paths kati?',
        voice: 'फोर पोल वेभ वाइन्डिङमा प्यारालल पाथ्स कति?',
        options: ['2', '4', '8'],
        answer: 0,
        why: 'Wave: A = 2 jahile pani.',
      },
    },
    {
      node: <><H>Effect on EMF</H><K>{String.raw`E = \dfrac{P\phi ZN}{60A}`}</K>For the same machine, wave (A = 2) gives P/2 times the EMF of lap (A = P).</>,
      say: 'Effect on EMF: E equals P phi Z N over 60 A, so the wave winding gives P over 2 times the lap EMF.',
      voice: 'इफेक्ट अन ई एम एफ — ई इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए, सो द वेभ वाइन्डिङ गिभ्स पी ओभर टु टाइम्स द ल्याप ई एम एफ।',
    },
  ],
});

/* ── 3.2 EMF equation ────────────────────────────────────────────────── */
export const basics32 = duo('3.2 · Basic understanding: what sets a generator’s voltage?', {
  three: motorTour([
    { shot: 'wiring', show: GEN, open: 0.6, spin: 0.3, field: 0.7, flow: 0.3, focus: ['lamp'], labels: [['bistarai: madhuro', 'lamp']] },
    { spin: 0.9, flow: 0.9, focus: ['lamp', 'armature'], labels: [['chito: ujyalo', 'lamp']] },
    { shot: 'inside', open: 1, spin: 0.6, field: 1, flow: 0.7, focus: ['poles', 'field'], labels: [['balio magnet', 'poles']] },
    { field: 0.2, flow: 0.25, focus: ['poles', 'field'], labels: [['kamjor magnet', 'poles']] },
    { field: 0.8, flow: 0.7, focus: ['coil'], labels: [['dherai tar', 'coil']] },
    { shot: 'commutator', focus: ['commutator', 'coil'], labels: [['tar kasari jodne', 'commutator']] },
    { shot: 'whole', focus: ['poles'], labels: [['dherai pole', 'poles']] },
    { shot: 'wiring', open: 0.6, spin: 0.7, flow: 0.7, focus: null },
  ]),
  tutor: [
    {
      say: 'Cycle ko dynamo: bistarai chalaye batti madhuro, chito chalaye ujyalo. Generator ma pani tyastai.',
      voice: 'साइकलको डाइनामो — बिस्तारै चलाए बत्ती मधुरो, छिटो चलाए उज्यालो। जेनेरेटरमा पनि त्यस्तै।',
      lines: [['h', <>3.2 · Voltage kasle badhaucha?</>], ['step', <>Bistarai → madhuro</>]],
    },
    {
      say: 'Chito ghumaye coil le eksekend ma dherai field kaatcha, ra voltage badhcha.',
      voice: 'छिटो घुमाए कोइलले एक सेकेन्डमा धेरै फिल्ड काट्छ, र भोल्टेज बढ्छ।',
      lines: [['step', <>Chito ghumai → dherai voltage</>]],
      ask: {
        q: 'Speed dobar garda generator ko voltage kati?',
        voice: 'स्पिड दोब्बर गर्दा जेनेरेटरको भोल्टेज कति?',
        options: ['Dobar', 'Aadha', 'Char guna'],
        answer: 0,
        why: 'Eksekend ma dobar field kaatcha: voltage dobar.',
      },
    },
    {
      say: 'Magnet balio bhaye pani voltage badhcha: eutai ghumai ma dherai field kaatincha.',
      voice: 'म्याग्नेट बलियो भए पनि भोल्टेज बढ्छ — एउटै घुमाइमा धेरै फिल्ड काटिन्छ।',
      lines: [['step', <>Balio magnet → dherai voltage</>]],
    },
    {
      say: 'Magnet kamjor garyo bhane batti madhuro hunchha.',
      voice: 'म्याग्नेट कमजोर गर्‍यो भने बत्ती मधुरो हुन्छ।',
      lines: [['step', <>Kamjor magnet → kam voltage</>]],
    },
    {
      say: 'Armature ma dherai tar ka tukra bhaye, dherai thau ma voltage banchha ra jodincha.',
      voice: 'आर्मेचरमा धेरै तारका टुक्रा भए, धेरै ठाउँमा भोल्टेज बन्छ, र जोडिन्छ।',
      lines: [['step', <>Dherai tar → dherai voltage jodincha</>]],
    },
    {
      say: 'Tar haru line ma jode voltage jodincha; dherai bato ma bandiye voltage kam tara current dherai.',
      voice: 'तारहरू लाइनमा जोडे भोल्टेज जोडिन्छ, धेरै बाटोमा बाँडिए भोल्टेज कम तर करेन्ट धेरै।',
      lines: [['step', <>Line ma jode: dherai voltage · bato bandiye: dherai current</>]],
    },
    {
      say: 'Dherai pole bhaye eutai ghumai ma coil le dherai choti field kaatcha.',
      voice: 'धेरै पोल भए एउटै घुमाइमा कोइलले धेरै चोटि फिल्ड काट्छ।',
      lines: [['step', <>Dherai pole → dherai choti kaatcha</>]],
    },
    {
      say: 'Saransha: speed, magnet ko bal, tar ko sankhya ra pole le voltage badhaucha; bato bandiye ghataucha.',
      voice: 'सारांश — स्पिड, म्याग्नेटको बल, तारको संख्या, र पोलले भोल्टेज बढाउँछ, बाटो बाँडिए घटाउँछ।',
      lines: [['idea', <>Speed, magnet, tar, pole → voltage badhcha · dherai bato → ghatcha</>]],
    },
  ],
  lecturer: [
    {
      say: 'Kam speed ma generator ko terminal voltage kam huncha.',
      voice: 'कम स्पिडमा जेनेरेटरको टर्मिनल भोल्टेज कम हुन्छ।',
      lines: [['h', <>3.2 · What decides the generated EMF</>], ['step', <>Low speed → low EMF</>]],
    },
    {
      say: 'Speed badhda flux cutting ko rate badhcha ra EMF badhcha.',
      voice: 'स्पिड बढ्दा फ्लक्स कटिङको रेट बढ्छ, र ई एम एफ बढ्छ।',
      lines: [['step', <>EMF rises with speed</>]],
      ask: {
        q: 'Generated EMF ra speed ko sambandha kasto?',
        voice: 'जेनेरेटेड ई एम एफ र स्पिडको सम्बन्ध कस्तो?',
        options: ['Directly proportional', 'Inversely proportional', 'Sambandha chaina'],
        answer: 0,
        why: 'Flux cut per second speed sanga badhcha.',
      },
    },
    {
      say: 'Flux per pole badhda pani EMF badhcha.',
      voice: 'फ्लक्स पर पोल बढ्दा पनि ई एम एफ बढ्छ।',
      lines: [['step', <>EMF rises with flux per pole</>]],
    },
    {
      say: 'Flux ghataye EMF ghatcha.',
      voice: 'फ्लक्स घटाए ई एम एफ घट्छ।',
      lines: [['step', <>Weaker field → lower EMF</>]],
    },
    {
      say: 'Armature conductors ko sankhya badhda EMF badhcha.',
      voice: 'आर्मेचर कन्डक्टर्सको संख्या बढ्दा ई एम एफ बढ्छ।',
      lines: [['step', <>More conductors → more EMF</>]],
    },
    {
      say: 'Conductors series ma jodiyeka path ko EMF nai output; parallel paths badhaye EMF ghatcha.',
      voice: 'कन्डक्टर्स सिरिजमा जोडिएका पाथको ई एम एफ नै आउटपुट, प्यारालल पाथ्स बढाए ई एम एफ घट्छ।',
      lines: [['step', <>More parallel paths → lower EMF, higher current</>]],
    },
    {
      say: 'Poles ko sankhya badhaye pratyek revolution ma badhi flux cut huncha.',
      voice: 'पोल्सको संख्या बढाए प्रत्येक रिभोल्युसनमा बढी फ्लक्स कट हुन्छ।',
      lines: [['step', <>More poles → more flux cut per revolution</>]],
    },
    {
      say: 'Saransha: EMF speed, flux, conductors ra poles sanga badhcha, ra parallel paths sanga ghatcha.',
      voice: 'सारांश — ई एम एफ स्पिड, फ्लक्स, कन्डक्टर्स, र पोल्ससँग बढ्छ, र प्यारालल पाथ्ससँग घट्छ।',
      lines: [['idea', <>EMF rises with speed, flux, conductors, poles · falls with parallel paths</>]],
    },
  ],
});

export const emf32 = duo('Derivation: EMF equation of a DC generator', {
  draw: emfGenFigure,
  viewBox: '0 0 360 225',
  tutor: [
    {
      say: 'Figure 3.2: P poles, flux per pole phi, Z conductors, speed N rpm, A parallel paths.',
      voice: 'फिगर थ्री पोइन्ट टु — पी पोल्स, फ्लक्स पर पोल फाइ, जेड कन्डक्टर्स, स्पिड एन आर पी एम, ए प्यारालल पाथ्स।',
      lines: [['h', <>EMF equation</>], ['step', <>Let P, φ (Wb), Z, N (rpm), A</>]],
    },
    {
      say: 'Euta conductor le ek revolution ma P poles ko flux kaatcha: P phi. Tyo samaya 60 over N second.',
      voice: 'एउटा कन्डक्टरले एक रिभोल्युसनमा पी पोल्सको फ्लक्स काट्छ — पी फाइ। त्यो समय सिक्स्टी ओभर एन सेकेन्ड।',
      lines: [['eq', tex(String.raw`d\Phi = P\phi, \quad dt = \dfrac{60}{N}`)]],
    },
    {
      say: 'Faraday: euta conductor ko EMF equals d phi by d t, equals P phi N over 60.',
      voice: 'फाराडे — एउटा कन्डक्टरको ई एम एफ इक्वल्स डी फाइ बाइ डी टी, इक्वल्स पी फाइ एन ओभर सिक्स्टी।',
      lines: [['eq', tex(String.raw`\begin{aligned} e &= \dfrac{d\Phi}{dt} \\ &= \dfrac{P\phi N}{60} \end{aligned}`)]],
    },
    {
      say: 'Euta path ma Z over A conductors series ma. Path ko EMF nai generator ko EMF.',
      voice: 'एउटा पाथमा जेड ओभर ए कन्डक्टर्स सिरिजमा। पाथको ई एम एफ नै जेनेरेटरको ई एम एफ।',
      lines: [['eq', tex(String.raw`\begin{aligned} E &= e\times\dfrac{Z}{A} \\ \therefore\ E &= \boxed{\dfrac{P\phi ZN}{60A}} \end{aligned}`)]],
      ask: {
        q: 'Lap bata wave (4-pole) ma badalda EMF kati guna?',
        voice: 'ल्यापबाट वेभ, फोर पोलमा बदल्दा ई एम एफ कति गुना?',
        options: ['2 guna', 'Aadha', 'Ustai'],
        answer: 0,
        why: 'Lap A = 4, wave A = 2: EMF ∝ 1/A, tesaile dobar.',
      },
    },
    {
      say: 'Eutai machine ma P, Z, A fixed, tesaile E phi N sanga proportional. Lap ma A equals P, wave ma A equals 2.',
      voice: 'एउटै मेसिनमा पी, जेड, ए फिक्स्ड, त्यसैले ई फाइ एनसँग प्रपोर्सनल। ल्यापमा ए इक्वल्स पी, वेभमा ए इक्वल्स टु।',
      lines: [['idea', <><K>{String.raw`E \propto \phi N`}</K> for a given machine; lap A = P, wave A = 2</>]],
    },
  ],
  lecturer: [
    {
      say: 'Let P be the number of poles, phi the flux per pole, Z the conductors, N the speed in rpm and A the parallel paths, Figure 3.2.',
      voice: 'लेट पी बी द नम्बर अफ पोल्स, फाइ द फ्लक्स पर पोल, जेड द कन्डक्टर्स, एन द स्पिड इन आर पी एम, एन्ड ए द प्यारालल पाथ्स, फिगर थ्री पोइन्ट टु।',
      lines: [['h', <>EMF equation of a DC generator</>], ['step', <>Let P, φ, Z, N, A</>]],
    },
    {
      say: 'In one revolution a conductor cuts P phi webers in 60 over N seconds.',
      voice: 'इन वान रिभोल्युसन अ कन्डक्टर कट्स पी फाइ वेबर्स इन सिक्स्टी ओभर एन सेकेन्ड्स।',
      lines: [['eq', tex(String.raw`d\Phi = P\phi, \quad dt = \dfrac{60}{N}`)]],
    },
    {
      say: 'EMF per conductor equals P phi N over 60.',
      voice: 'ई एम एफ पर कन्डक्टर इक्वल्स पी फाइ एन ओभर सिक्स्टी।',
      lines: [['eq', tex(String.raw`\begin{aligned} e &= \dfrac{d\Phi}{dt} \\ &= \dfrac{P\phi N}{60} \end{aligned}`)]],
    },
    {
      say: 'Each path has Z over A conductors in series; hence E equals P phi Z N over 60 A.',
      voice: 'इच पाथ ह्याज जेड ओभर ए कन्डक्टर्स इन सिरिज, हेन्स ई इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए।',
      lines: [['eq', tex(String.raw`\begin{aligned} E &= e\times\dfrac{Z}{A} \\ \therefore\ E &= \boxed{\dfrac{P\phi ZN}{60A}} \end{aligned}`)]],
      ask: {
        q: 'EMF equation ma A le k janaucha?',
        voice: 'ई एम एफ इक्वेसनमा ए ले के जनाउँछ?',
        options: ['Parallel paths', 'Armature area', 'Ampere'],
        answer: 0,
        why: 'A = number of parallel paths in the armature.',
      },
    },
    {
      say: 'For a given machine E is proportional to phi N; A equals P for lap and 2 for wave.',
      voice: 'फर अ गिभन मेसिन ई इज प्रपोर्सनल टु फाइ एन, ए इक्वल्स पी फर ल्याप एन्ड टु फर वेभ।',
      lines: [['step', <><K>{String.raw`E \propto \phi N`}</K>; lap A = P, wave A = 2</>]],
    },
  ],
});

export const emfAnswer32 = answer('Model answer: EMF equation of a DC generator', {
  draw: emfGenFigure,
  viewBox: '0 0 360 225',
  papers: ['2070 Bhadra', '2078 Baishakh', '2071 Bhadra', '2068 Bhadra', '2066 Magh'],
  q: 'Derive an emf equation for a dc generator.',
  read: {
    say: 'IOE ma paanch choti: derive an emf equation for a dc generator.',
    voice: 'आई ओ ईमा पाँच चोटि — डिराइभ एन ई एम एफ इक्वेसन फर अ डी सी जेनेरेटर।',
  },
  points: [
    {
      node: <><H>Let</H><Pts items={[<>P = number of poles, φ = flux per pole (Wb)</>, <>Z = total armature conductors, N = speed (rpm)</>, <>A = parallel paths (lap A = P, wave A = 2)</>]} /></>,
      say: 'Let P be the poles, phi the flux per pole, Z the conductors, N the speed in rpm, and A the parallel paths.',
      voice: 'लेट पी बी द पोल्स, फाइ द फ्लक्स पर पोल, जेड द कन्डक्टर्स, एन द स्पिड इन आर पी एम, एन्ड ए द प्यारालल पाथ्स।',
    },
    {
      node: <><Pts items={[<>Flux cut by one conductor in one revolution: dΦ = Pφ</>, <>Time for one revolution: dt = 60/N s</>]} /><K>{String.raw`\begin{aligned} e &= \dfrac{d\Phi}{dt} \\ &= \dfrac{P\phi N}{60} \end{aligned}`}</K></>,
      say: 'In one revolution a conductor cuts P phi in 60 over N seconds, so EMF per conductor equals P phi N over 60.',
      voice: 'इन वान रिभोल्युसन अ कन्डक्टर कट्स पी फाइ इन सिक्स्टी ओभर एन सेकेन्ड्स, सो ई एम एफ पर कन्डक्टर इक्वल्स पी फाइ एन ओभर सिक्स्टी।',
    },
    {
      page: true,
      node: <><Pts items={[<>Conductors in series per path = Z/A; the generated EMF is the EMF of one path</>]} /><K>{String.raw`\begin{aligned} E &= \dfrac{P\phi N}{60}\times\dfrac{Z}{A} \\ \therefore\ E &= \boxed{\dfrac{P\phi ZN}{60A}\unit{volt}} \end{aligned}`}</K></>,
      say: 'Each path has Z over A conductors in series. Therefore E equals P phi Z N over 60 A volt.',
      voice: 'इच पाथ ह्याज जेड ओभर ए कन्डक्टर्स इन सिरिज। देयरफोर ई इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए भोल्ट।',
    },
    {
      node: <><Pts items={[<>Lap: <K>{String.raw`E = \phi ZN/60`}</K>; wave: <K>{String.raw`E = P\phi ZN/120`}</K></>, <>For a given machine, <K>{String.raw`E = k\phi N`}</K></>]} /></>,
      say: 'For lap, E equals phi Z N over 60; for wave, P phi Z N over 120. For a given machine, E equals k phi N.',
      voice: 'फर ल्याप, ई इक्वल्स फाइ जेड एन ओभर सिक्स्टी, फर वेभ, पी फाइ जेड एन ओभर वान ट्वेन्टी। फर अ गिभन मेसिन, ई इक्वल्स के फाइ एन।',
      ask: {
        q: 'Lap winding ma EMF equation kasto huncha?',
        voice: 'ल्याप वाइन्डिङमा ई एम एफ इक्वेसन कस्तो हुन्छ?',
        options: ['φZN/60', 'PφZN/120', 'φZN/120'],
        answer: 0,
        why: 'Lap A = P: P cancel huncha.',
      },
    },
  ],
});

export const speedSolve32 = solve({
  title: 'IOE 2070 Bhadra: speed of a long-shunt generator',
  paper: '2070 Bhadra',
  paperVoice: 'दुई हजार सत्तरी भदौ',
  question: 'A 4 pole, 250 V long shunt dc compound generator supplies a load of 10 kW at the rated voltage. The armature, series and shunt field resistances are 0.1 Ω, 0.15 Ω and 250 Ω respectively. The armature is lap wound with 300 conductors. If the flux per pole is 50 mWb, calculate the speed of the generator.',
  read: '4 pole, 250 volt long shunt compound, load 10 kilowatt. Ra 0.1, series 0.15, shunt 250 ohm. Lap, 300 conductors, flux 50 milliweber. Speed?',
  readVoice: 'फोर पोल, दुई सय पचास भोल्ट लङ सन्ट कम्पाउन्ड, लोड दस किलोवाट। आर ए जिरो पोइन्ट वान, सिरिज जिरो पोइन्ट वान फाइभ, सन्ट दुई सय पचास ओम। ल्याप, तीन सय कन्डक्टर्स, फ्लक्स पचास मिलिवेबर। स्पिड?',
  given: [
    { node: <>V = 250 V, P<sub>out</sub> = 10 kW, P = 4, lap (A = 4), Z = 300, φ = 0.05 Wb</>, say: 'V 250, output 10 kW, P 4, lap so A 4, Z 300, phi 0.05', voice: 'भी दुई सय पचास, आउटपुट दस किलोवाट, पी फोर, ल्याप त्यसैले ए फोर, जेड तीन सय, फाइ जिरो पोइन्ट जिरो फाइभ' },
    { node: <>R<sub>a</sub> = 0.1 Ω, R<sub>se</sub> = 0.15 Ω, R<sub>sh</sub> = 250 Ω (long shunt: series field in the armature path)</>, say: 'Ra 0.1, Rse 0.15, Rsh 250; long shunt ma series field armature sangai', voice: 'आर ए जिरो पोइन्ट वान, आर एस ई जिरो पोइन्ट वान फाइभ, आर एस एच दुई सय पचास, लङ सन्टमा सिरिज फिल्ड आर्मेचरसँगै' },
  ],
  find: { node: <>speed N</>, say: 'Nikalnu parne: speed N.', voice: 'निकाल्नु पर्ने — स्पिड एन।' },
  idea: { node: <>Find I<sub>a</sub>, then <K>{String.raw`E = V + I_a(R_a + R_{se})`}</K>, then <K>{String.raw`N = \dfrac{60AE}{P\phi Z}`}</K></>, say: 'Method: I a, ani E equals V plus I a into R a plus R se, ani N.', voice: 'मेथड — आई ए, अनि ई इक्वल्स भी प्लस आई ए इन्टु आर ए प्लस आर एस ई, अनि एन।' },
  steps: [
    {
      node: <K>{String.raw`\begin{aligned} I_L &= \dfrac{10\,000}{250} \\ &= 40\ \text{A} \\ I_{sh} &= \dfrac{250}{250} \\ &= 1\ \text{A} \\ I_a &= 40 + 1 \\ &= 41\ \text{A} \end{aligned}`}</K>,
      say: 'I L equals 40 ampere, I sh equals 1 ampere, I a equals 41 ampere.',
      voice: 'आई एल इक्वल्स चालीस एम्पियर, आई एस एच इक्वल्स वान एम्पियर, आई ए इक्वल्स एकचालीस एम्पियर।',
    },
    {
      node: <K>{String.raw`\begin{aligned} E &= 250 + 41\,(0.1 + 0.15) \\ &= 260.25\ \text{V} \end{aligned}`}</K>,
      say: 'E equals 250 plus 41 into 0.25, equals 260.25 volt.',
      voice: 'ई इक्वल्स दुई सय पचास प्लस एकचालीस इन्टु जिरो पोइन्ट टु फाइभ, इक्वल्स दुई सय साठी दशमलव दुई पाँच भोल्ट।',
      ask: {
        q: 'Long shunt ma series field ko current kati?',
        voice: 'लङ सन्टमा सिरिज फिल्डको करेन्ट कति?',
        options: ['Ia = 41 A', 'IL = 40 A', 'Ish = 1 A'],
        answer: 0,
        why: 'Long shunt: series field armature sanga series ma, current Ia.',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} N &= \dfrac{60AE}{P\phi Z} \\ &= \dfrac{60\times4\times260.25}{4\times0.05\times300} \end{aligned}`}</K>,
      say: 'N equals 60 A E over P phi Z, equals 60 into 4 into 260.25, over 4 into 0.05 into 300.',
      voice: 'एन इक्वल्स सिक्स्टी ए ई ओभर पी फाइ जेड, इक्वल्स सिक्स्टी इन्टु फोर इन्टु दुई सय साठी दशमलव दुई पाँच, ओभर फोर इन्टु जिरो पोइन्ट जिरो फाइभ इन्टु तीन सय।',
    },
  ],
  answer: { node: <K>{String.raw`\boxed{N = 1041\ \text{rpm}}`}</K>, say: 'Answer: N equals 1041 rpm.', voice: 'आन्सर — एन इक्वल्स एक हजार एकचालीस आर पी एम।' },
  trap: { node: <>Trap: in a long shunt the series field carries I<sub>a</sub>, so its drop is I<sub>a</sub>R<sub>se</sub>, not I<sub>L</sub>R<sub>se</sub>.</>, say: 'Trap: long shunt ma series drop I a R se, I L hoina.', voice: 'ट्र्याप — लङ सन्टमा सिरिज ड्रप आई ए आर एस ई, आई एल होइन।' },
});

/* ── 3.3 Excitation, types, build-up, characteristics ───────────────── */
export const basics33 = duo('3.3 · Basic understanding: how does a generator excite its own field?', {
  three: motorTour([
    { shot: 'wiring', show: [...GEN.filter((p) => p !== 'lamp'), 'battery'], open: 0.7, spin: 0.6, field: 0.8, wiring: 'shunt', flow: 0.5, focus: ['battery', 'fieldCoil'], labels: [['chhuttai battery', 'battery']] },
    { show: GEN, wiring: 'shunt', field: 0.8, flow: 0.6, focus: ['fieldCoil', 'wires'], labels: [['aafno bijuli aafai', 'fieldCoil']] },
    { shot: 'inside', field: 0.1, flow: 0.1, focus: ['poles'], labels: [['ali baki magnet', 'poles']] },
    { shot: 'wiring', field: 0.45, flow: 0.4, focus: ['fieldCoil', 'lamp'], labels: [['ali bijuli → ali magnet', 'fieldCoil']] },
    { field: 1, flow: 0.9, focus: ['lamp', 'fieldCoil'], labels: [['badhdai badhdai', 'lamp']] },
    { field: 0.1, flow: 0.1, focus: ['fieldCoil'], labels: [['dherai rok: badhdaina', 'fieldCoil']] },
    { wiring: 'series', field: 0.8, flow: 0.8, focus: ['fieldCoil', 'lamp'], labels: [['series: load chahincha', 'lamp']] },
    { wiring: 'compound', field: 0.9, flow: 0.8, focus: null, labels: [['compound', [0.2, 3.4, 1.0]]] },
  ]),
  tutor: [
    {
      say: 'Generator ko magnet field coil ho, jaslai current chahincha. Chhuttai battery bata diye separately excited.',
      voice: 'जेनेरेटरको म्याग्नेट फिल्ड कोइल हो, जसलाई करेन्ट चाहिन्छ। छुट्टै ब्याट्रीबाट दिए सेपरेट्ली एक्साइटेड।',
      lines: [['h', <>3.3 · Aafno magnet aafai?</>], ['step', <>Chhuttai battery bata field: separately excited</>]],
    },
    {
      say: 'Tara generator le aafai bijuli banaucha, tesaile aafno field coil lai aafai bijuli dina sakcha: self-excited.',
      voice: 'तर जेनेरेटरले आफैं बिजुली बनाउँछ, त्यसैले आफ्नो फिल्ड कोइललाई आफैं बिजुली दिन सक्छ — सेल्फ एक्साइटेड।',
      lines: [['step', <>Aafno bijuli aafno field ma: self-excited</>]],
    },
    {
      say: 'Suru ma current chaina, tara pole ma ali purano magnet baki huncha. Tyahi le ali-ali bijuli suru garcha.',
      voice: 'सुरुमा करेन्ट छैन, तर पोलमा अलि पुरानो म्याग्नेट बाँकी हुन्छ। त्यही ले अलि अलि बिजुली सुरु गर्छ।',
      lines: [['step', <>Suru: pole ma ali baki magnet → ali bijuli</>]],
    },
    {
      say: 'Tyo ali bijuli field coil ma janchha, magnet ali balio huncha, ani jhan bijuli: chakra chalcha.',
      voice: 'त्यो अलि बिजुली फिल्ड कोइलमा जान्छ, म्याग्नेट अलि बलियो हुन्छ, अनि झन् बिजुली — चक्र चल्छ।',
      lines: [['step', <>Ali bijuli → balio magnet → jhan bijuli (chakra)</>]],
    },
    {
      say: 'Badhdai badhdai magnet bharincha ra voltage eutai thau ma rokincha. Yo voltage build-up ho.',
      voice: 'बढ्दै बढ्दै म्याग्नेट भरिन्छ, र भोल्टेज एउटै ठाउँमा रोकिन्छ। यो भोल्टेज बिल्ड अप हो।',
      lines: [['step', <>Badhdai badhdai → eutai thau ma rokincha (build-up)</>]],
    },
    {
      say: 'Ascharya: field coil ko bato ma dherai rok bhaye chakra suru nai hudaina. Tyo seema lai critical resistance bhanchan.',
      voice: 'आश्चर्य — फिल्ड कोइलको बाटोमा धेरै रोक भए चक्र सुरु नै हुँदैन। त्यो सीमालाई क्रिटिकल रेजिस्टेन्स भन्छन्।',
      lines: [['step', <>Field ko bato ma dherai rok → build-up hudaina (critical resistance)</>]],
      ask: {
        q: 'Self-excited generator ko build-up kasle suru garcha?',
        voice: 'सेल्फ एक्साइटेड जेनेरेटरको बिल्ड अप कसले सुरु गर्छ?',
        options: ['Pole ko baki magnet', 'Battery', 'Load'],
        answer: 0,
        why: 'Residual magnetism le suru ko sano voltage dincha.',
      },
    },
    {
      say: 'Series generator ma field coil load ko line mai cha, tesaile load nabhaye current nai bagdaina.',
      voice: 'सिरिज जेनेरेटरमा फिल्ड कोइल लोडको लाइनमै छ, त्यसैले लोड नभए करेन्ट नै बग्दैन।',
      lines: [['step', <>Series: field load ko line ma → load chahincha</>]],
    },
    {
      say: 'Saransha: separately ma battery, self-excited ma aafai; baki magnet le suru, chakra le badhaucha; compound ma dubai coil.',
      voice: 'सारांश — सेपरेट्लीमा ब्याट्री, सेल्फ एक्साइटेडमा आफैं, बाँकी म्याग्नेटले सुरु, चक्रले बढाउँछ, कम्पाउन्डमा दुवै कोइल।',
      lines: [['idea', <>Separate: battery · self: aafai · baki magnet → chakra → build-up · compound: dubai</>]],
    },
  ],
  lecturer: [
    {
      say: 'Field winding lai external DC source bata excite garincha bhane separately excited generator.',
      voice: 'फिल्ड वाइन्डिङलाई एक्सटर्नल डी सी सोर्सबाट एक्साइट गरिन्छ भने सेपरेट्ली एक्साइटेड जेनेरेटर।',
      lines: [['h', <>3.3 · Excitation</>], ['step', <>Separately excited: field from an external source</>]],
    },
    {
      say: 'Self-excited generator ma aafnai output le field excite garcha: shunt, series wa compound.',
      voice: 'सेल्फ एक्साइटेड जेनेरेटरमा आफ्नै आउटपुटले फिल्ड एक्साइट गर्छ — सन्ट, सिरिज, वा कम्पाउन्ड।',
      lines: [['step', <>Self-excited: field from its own output</>]],
    },
    {
      say: 'Start ma poles ko residual magnetism le sano EMF induce garcha.',
      voice: 'स्टार्टमा पोल्सको रेसिड्युअल म्याग्नेटिज्मले सानो ई एम एफ इन्ड्युस गर्छ।',
      lines: [['step', <>Residual magnetism → small initial EMF</>]],
    },
    {
      say: 'Yo EMF le field current dincha, flux badhcha, ra EMF badhcha: cumulative process.',
      voice: 'यो ई एम एफले फिल्ड करेन्ट दिन्छ, फ्लक्स बढ्छ, र ई एम एफ बढ्छ — क्युमुलेटिभ प्रोसेस।',
      lines: [['step', <>EMF → field current → flux → more EMF</>]],
    },
    {
      say: 'Saturation le garda voltage OCC ra field resistance line ko intersection ma stable huncha.',
      voice: 'स्याचुरेसनले गर्दा भोल्टेज ओ सी सी र फिल्ड रेजिस्टेन्स लाइनको इन्टरसेक्सनमा स्टेबल हुन्छ।',
      lines: [['step', <>Settles where the field-resistance line meets the OCC</>]],
    },
    {
      say: 'Field resistance critical value bhanda badhi bhaye voltage build up hudaina.',
      voice: 'फिल्ड रेजिस्टेन्स क्रिटिकल भ्यालुभन्दा बढी भए भोल्टेज बिल्ड अप हुँदैन।',
      lines: [['step', <>Field resistance above critical → no build-up</>]],
      ask: {
        q: 'Voltage build-up ko lagi field resistance kasto hunu parcha?',
        voice: 'भोल्टेज बिल्ड अपको लागि फिल्ड रेजिस्टेन्स कस्तो हुनु पर्छ?',
        options: ['Critical bhanda kam', 'Critical bhanda badhi', 'Infinite'],
        answer: 0,
        why: 'Rf > Rc bhaye resistance line OCC lai kaatdaina.',
      },
    },
    {
      say: 'Series generator ma field load sanga series ma, tesaile load bina build-up hudaina.',
      voice: 'सिरिज जेनेरेटरमा फिल्ड लोडसँग सिरिजमा, त्यसैले लोड बिना बिल्ड अप हुँदैन।',
      lines: [['step', <>Series generator: builds up only with a load</>]],
    },
    {
      say: 'Saransha: excitation separate wa self; build-up residual magnetism ra critical resistance ma depend; compound ma shunt ra series dubai.',
      voice: 'सारांश — एक्साइटेसन सेपरेट वा सेल्फ, बिल्ड अप रेसिड्युअल म्याग्नेटिज्म र क्रिटिकल रेजिस्टेन्समा डिपेन्ड, कम्पाउन्डमा सन्ट र सिरिज दुवै।',
      lines: [['idea', <>Separate or self · build-up needs residual flux and R<sub>f</sub> below critical · compound: both fields</>]],
    },
  ],
});

export const types33 = duo('Excitation and types: current and voltage equations', {
  draw: occFigure,
  viewBox: '0 0 360 232',
  tutor: [
    {
      say: 'Separately excited: field alag source bata. Armature current equals load current: I a equals I L.',
      voice: 'सेपरेट्ली एक्साइटेड — फिल्ड अलग सोर्सबाट। आर्मेचर करेन्ट इक्वल्स लोड करेन्ट — आई ए इक्वल्स आई एल।',
      lines: [['h', <>Types of DC generator</>], ['eq', tex(String.raw`\text{Separate: } I_a = I_L, \quad E = V + I_aR_a + V_b`)]],
    },
    {
      say: 'Shunt: field armature ko parallel ma. I sh equals V over R sh, ra I a equals I L plus I sh.',
      voice: 'सन्ट — फिल्ड आर्मेचरको प्यारालल मा। आई एस एच इक्वल्स भी ओभर आर एस एच, र आई ए इक्वल्स आई एल प्लस आई एस एच।',
      lines: [['eq', tex(String.raw`\begin{aligned} \text{Shunt: } I_{sh} &= \dfrac{V}{R_{sh}} \\ I_a &= I_L + I_{sh} \\ E &= V + I_aR_a \end{aligned}`)]],
    },
    {
      say: 'Series: field armature ra load sanga series ma. Sabai current eutai: I a equals I se equals I L.',
      voice: 'सिरिज — फिल्ड आर्मेचर र लोडसँग सिरिजमा। सबै करेन्ट एउटै — आई ए इक्वल्स आई एस ई इक्वल्स आई एल।',
      lines: [['eq', tex(String.raw`\text{Series: } I_a = I_L, \quad E = V + I_a(R_a + R_{se})`)]],
      ask: {
        q: 'Shunt generator ma armature current kati?',
        voice: 'सन्ट जेनेरेटरमा आर्मेचर करेन्ट कति?',
        options: ['IL + Ish', 'IL − Ish', 'IL matra'],
        answer: 0,
        why: 'Armature le load ra shunt field dubai lai current dincha.',
      },
    },
    {
      say: 'Long shunt: shunt field armature ra series field dubai ko across. Short shunt: armature ko matra across.',
      voice: 'लङ सन्ट — सन्ट फिल्ड आर्मेचर र सिरिज फिल्ड दुवैको एक्रस। सर्ट सन्ट — आर्मेचरको मात्र एक्रस।',
      lines: [['eq', tex(String.raw`\begin{aligned} \text{Long: } E &= V + I_a(R_a + R_{se}), \quad I_{sh} = V/R_{sh} \\ \text{Short: } E &= V + I_LR_{se} + I_aR_a, \quad I_{sh} = \dfrac{V + I_LR_{se}}{R_{sh}} \end{aligned}`)]],
    },
    {
      say: 'Brush drop pani jodne: E ma 2 volt jasto, prashna ma diyeko anusar.',
      voice: 'ब्रस ड्रप पनि जोड्ने — ई मा टु भोल्ट जस्तो, प्रश्नमा दिएको अनुसार।',
      lines: [['idea', <>Add the brush drop V<sub>b</sub> (e.g. 1 V per brush × 2) to E</>]],
    },
  ],
  lecturer: [
    {
      say: 'Separately excited generator: I a equals I L, and E equals V plus I a R a plus brush drop.',
      voice: 'सेपरेट्ली एक्साइटेड जेनेरेटर — आई ए इक्वल्स आई एल, एन्ड ई इक्वल्स भी प्लस आई ए आर ए प्लस ब्रस ड्रप।',
      lines: [['h', <>Voltage and current equations</>], ['eq', tex(String.raw`\text{Separate: } I_a = I_L, \quad E = V + I_aR_a + V_b`)]],
    },
    {
      say: 'Shunt generator: I sh equals V over R sh, I a equals I L plus I sh, E equals V plus I a R a.',
      voice: 'सन्ट जेनेरेटर — आई एस एच इक्वल्स भी ओभर आर एस एच, आई ए इक्वल्स आई एल प्लस आई एस एच, ई इक्वल्स भी प्लस आई ए आर ए।',
      lines: [['eq', tex(String.raw`\begin{aligned} \text{Shunt: } I_{sh} &= \dfrac{V}{R_{sh}} \\ I_a &= I_L + I_{sh} \\ E &= V + I_aR_a \end{aligned}`)]],
    },
    {
      say: 'Series generator: I a equals I L, E equals V plus I a into R a plus R se.',
      voice: 'सिरिज जेनेरेटर — आई ए इक्वल्स आई एल, ई इक्वल्स भी प्लस आई ए इन्टु आर ए प्लस आर एस ई।',
      lines: [['eq', tex(String.raw`\text{Series: } I_a = I_L, \quad E = V + I_a(R_a + R_{se})`)]],
      ask: {
        q: 'Short shunt ma shunt field ko voltage kati?',
        voice: 'सर्ट सन्टमा सन्ट फिल्डको भोल्टेज कति?',
        options: ['V + IL Rse', 'V', 'V − Ia Ra'],
        answer: 0,
        why: 'Short shunt: shunt field armature ko across, series drop pachhi.',
      },
    },
    {
      say: 'Compound: long shunt and short shunt equations as follows.',
      voice: 'कम्पाउन्ड — लङ सन्ट एन्ड सर्ट सन्ट इक्वेसन्स एज फलोज।',
      lines: [['eq', tex(String.raw`\begin{aligned} \text{Long: } E &= V + I_a(R_a + R_{se}), \quad I_{sh} = V/R_{sh} \\ \text{Short: } E &= V + I_LR_{se} + I_aR_a, \quad I_{sh} = \dfrac{V + I_LR_{se}}{R_{sh}} \end{aligned}`)]],
    },
    {
      say: 'In every case the brush contact drop is added to E.',
      voice: 'इन एभ्री केस द ब्रस कन्ट्याक्ट ड्रप इज एडेड टु ई।',
      lines: [['step', <>Brush contact drop V<sub>b</sub> added to E</>]],
    },
  ],
});

export const buildup33 = duo('Derivation: voltage build-up, critical resistance and characteristics', {
  draw: occFigure,
  viewBox: '0 0 360 232',
  tutor: [
    {
      say: 'Figure 3.3: OCC, open circuit characteristic: E versus I f, constant speed ma. Residual flux le suru ma E r.',
      voice: 'फिगर थ्री पोइन्ट थ्री — ओ सी सी, ओपन सर्किट क्यारेक्टरिस्टिक — ई भर्सस आई एफ, कन्स्टेन्ट स्पिडमा। रेसिड्युअल फ्लक्सले सुरुमा ई आर।',
      lines: [['h', <>Voltage build-up</>], ['step', <>OCC: E against I<sub>f</sub> at constant speed; starts at E<sub>r</sub> (residual)</>]],
    },
    {
      say: 'Field circuit ko line: V equals I f R f, slope R f. Yo sidha rekha origin bata.',
      voice: 'फिल्ड सर्किटको लाइन — भी इक्वल्स आई एफ आर एफ, स्लोप आर एफ। यो सिधा रेखा ओरिजिनबाट।',
      lines: [['eq', tex(String.raw`V = I_f R_f \quad (\text{slope } R_f)`)]],
    },
    {
      say: 'E r le I f dincha, I f le badhi E, feri badhi I f: staircase jasto, intersection samma.',
      voice: 'ई आरले आई एफ दिन्छ, आई एफले बढी ई, फेरि बढी आई एफ — स्टेयरकेस जस्तो, इन्टरसेक्सनसम्म।',
      lines: [['step', <>Staircase build-up until the R<sub>f</sub> line meets the OCC</>]],
    },
    {
      say: 'R f badhaye line thadho huncha. OCC ko suru ko tangent jastai bhaye R c, critical resistance; tyo bhanda badhi bhaye build-up hudaina.',
      voice: 'आर एफ बढाए लाइन ठाडो हुन्छ। ओ सी सीको सुरुको ट्यान्जेन्ट जस्तै भए आर सी, क्रिटिकल रेजिस्टेन्स, त्यो भन्दा बढी भए बिल्ड अप हुँदैन।',
      lines: [['step', <>R<sub>c</sub> = slope of the OCC tangent at the origin; need R<sub>f</sub> &lt; R<sub>c</sub>. Critical speed: the speed at which R<sub>f</sub> becomes critical.</>]],
      ask: {
        q: 'Speed ghatauda critical resistance k huncha?',
        voice: 'स्पिड घटाउँदा क्रिटिकल रेजिस्टेन्स के हुन्छ?',
        options: ['Ghatcha', 'Badhcha', 'Ustai'],
        answer: 0,
        why: 'Kam speed ma OCC tala jharcha, tangent ko slope ghatcha.',
      },
    },
    {
      say: 'Load characteristic: shunt ma load badhda V ali ghatcha; series ma load sanga V badhcha; compound ma dubai milera lagbhag flat.',
      voice: 'लोड क्यारेक्टरिस्टिक — सन्टमा लोड बढ्दा भी अलि घट्छ, सिरिजमा लोडसँग भी बढ्छ, कम्पाउन्डमा दुवै मिलेर लगभग फ्ल्याट।',
      lines: [['idea', <>Load curves: shunt V drops slightly · series V rises with load · cumulative compound: flat / over-compounded</>]],
    },
  ],
  lecturer: [
    {
      say: 'The OCC is E against I f at constant speed; due to residual flux it starts at E r, Figure 3.3.',
      voice: 'द ओ सी सी इज ई अगेन्स्ट आई एफ एट कन्स्टेन्ट स्पिड, ड्यु टु रेसिड्युअल फ्लक्स इट स्टार्ट्स एट ई आर, फिगर थ्री पोइन्ट थ्री।',
      lines: [['h', <>Build-up and characteristics</>], ['step', <>OCC at constant speed, from E<sub>r</sub></>]],
    },
    {
      say: 'The field-resistance line V equals I f R f passes through the origin with slope R f.',
      voice: 'द फिल्ड रेजिस्टेन्स लाइन भी इक्वल्स आई एफ आर एफ पासेज थ्रु द ओरिजिन विद स्लोप आर एफ।',
      lines: [['eq', tex(String.raw`V = I_f R_f \quad (\text{slope } R_f)`)]],
    },
    {
      say: 'The EMF builds up cumulatively and settles at the intersection of the line and the OCC.',
      voice: 'द ई एम एफ बिल्ड्स अप क्युमुलेटिभ्ली एन्ड सेटल्स एट द इन्टरसेक्सन अफ द लाइन एन्ड द ओ सी सी।',
      lines: [['step', <>Cumulative build-up to the intersection</>]],
    },
    {
      say: 'Critical resistance is the slope of the tangent to the OCC at the origin; critical speed is the speed at which the given R f is critical.',
      voice: 'क्रिटिकल रेजिस्टेन्स इज द स्लोप अफ द ट्यान्जेन्ट टु द ओ सी सी एट द ओरिजिन, क्रिटिकल स्पिड इज द स्पिड एट ह्विच द गिभन आर एफ इज क्रिटिकल।',
      lines: [['step', <>R<sub>c</sub>: tangent slope at origin · critical speed: where R<sub>f</sub> becomes critical</>]],
      ask: {
        q: 'Residual magnetism nabhaye shunt generator ma k huncha?',
        voice: 'रेसिड्युअल म्याग्नेटिज्म नभए सन्ट जेनेरेटरमा के हुन्छ?',
        options: ['Voltage build up hudaina', 'Voltage ulto aaucha', 'Speed badhcha'],
        answer: 0,
        why: 'Suru ko sano EMF nai chaina.',
      },
    },
    {
      say: 'Load characteristics: shunt droops, series rises with load, and cumulative compound is nearly flat.',
      voice: 'लोड क्यारेक्टरिस्टिक्स — सन्ट ड्रुप्स, सिरिज राइजेज विद लोड, एन्ड क्युमुलेटिभ कम्पाउन्ड इज नियर्ली फ्ल्याट।',
      lines: [['step', <><Pts items={[<>Shunt: V droops with load</>, <>Series: V rises with load</>, <>Cumulative compound: nearly flat</>]} /></>]],
    },
  ],
});

export const buildupAnswer33 = answer('Model answer: voltage build-up in a shunt generator', {
  draw: occFigure,
  viewBox: '0 0 360 232',
  papers: ['2073 Bhadra', '2074 Bhadra', '2065 Chaitra', '2071 Chaitra'],
  marks: '[4 + 2 + 2]',
  q: 'Explain voltage build up process in a dc shunt generator and define its critical resistance and critical speed.',
  read: {
    say: 'IOE ma char choti: explain voltage build up process in a dc shunt generator and define its critical resistance and critical speed. Build-up char marks, dui-dui definitions.',
    voice: 'आई ओ ईमा चार चोटि — एक्सप्लेन भोल्टेज बिल्ड अप प्रोसेस इन अ डी सी सन्ट जेनेरेटर एन्ड डिफाइन इट्स क्रिटिकल रेजिस्टेन्स एन्ड क्रिटिकल स्पिड। बिल्ड अप चार मार्क्स, दुई दुई डेफिनेसन्स।',
  },
  points: [
    {
      node: <><H>(a) Voltage build-up [4]</H><Pts items={[<>The poles keep residual magnetism; on rotation a small EMF E<sub>r</sub> is induced (Fig. 3.3)</>, <>E<sub>r</sub> drives a small field current, which (if aiding) raises the flux and hence the EMF</>]} /></>,
      say: 'Build-up: the poles keep residual magnetism, so on rotation a small EMF E r is induced. It drives a small field current which, if aiding, raises the flux and the EMF.',
      voice: 'बिल्ड अप — द पोल्स किप रेसिड्युअल म्याग्नेटिज्म, सो अन रोटेसन अ स्मल ई एम एफ ई आर इज इन्ड्युस्ड। इट ड्राइभ्स अ स्मल फिल्ड करेन्ट ह्विच, इफ एडिङ, रेजेज द फ्लक्स एन्ड द ई एम एफ।',
    },
    {
      node: <><Pts items={[<>The process is cumulative (staircase) and stops where the field-resistance line <K>{String.raw`V = I_fR_f`}</K> cuts the OCC</>, <>Conditions: residual flux; field connected to aid it; R<sub>f</sub> &lt; R<sub>c</sub>; speed above critical</>]} /></>,
      say: 'The process is cumulative and stops where the field resistance line cuts the OCC. Conditions: residual flux, field aiding it, R f below critical, and speed above critical.',
      voice: 'द प्रोसेस इज क्युमुलेटिभ एन्ड स्टप्स ह्वेयर द फिल्ड रेजिस्टेन्स लाइन कट्स द ओ सी सी। कन्डिसन्स — रेसिड्युअल फ्लक्स, फिल्ड एडिङ इट, आर एफ बिलो क्रिटिकल, एन्ड स्पिड एबभ क्रिटिकल।',
    },
    {
      page: true,
      node: <><H>(b) Critical resistance [2]</H><Pts items={[<>The value of field-circuit resistance above which the generator fails to build up; equal to the slope of the tangent to the OCC at the origin (R<sub>c</sub> in Fig. 3.3)</>]} /></>,
      say: 'Critical resistance: the field-circuit resistance above which the generator fails to build up; the slope of the tangent to the OCC at the origin.',
      voice: 'क्रिटिकल रेजिस्टेन्स — द फिल्ड सर्किट रेजिस्टेन्स एबभ ह्विच द जेनेरेटर फेल्स टु बिल्ड अप, द स्लोप अफ द ट्यान्जेन्ट टु द ओ सी सी एट द ओरिजिन।',
    },
    {
      node: <><H>(c) Critical speed [2]</H><Pts items={[<>The speed at which the given field resistance becomes the critical resistance; below it the voltage does not build up</>, <><K>{String.raw`N_c = N\times\dfrac{R_f}{R_c}`}</K></>]} /></>,
      say: 'Critical speed: the speed at which the given field resistance becomes critical; below it there is no build-up. N c equals N times R f over R c.',
      voice: 'क्रिटिकल स्पिड — द स्पिड एट ह्विच द गिभन फिल्ड रेजिस्टेन्स बिकम्स क्रिटिकल, बिलो इट देयर इज नो बिल्ड अप। एन सी इक्वल्स एन टाइम्स आर एफ ओभर आर सी।',
      ask: {
        q: 'Shunt generator lai load bina start kina garne?',
        voice: 'सन्ट जेनेरेटरलाई लोड बिना स्टार्ट किन गर्ने?',
        options: ['Load le field current khosera build-up rokcha', 'Load le speed badhaucha', 'Load bina EMF aaudaina'],
        answer: 0,
        why: 'Load le terminal voltage jharcha ra field current kam huncha.',
      },
    },
  ],
});

export const shortShuntSolve33 = solve({
  title: 'IOE 2071 Magh: EMF of a short-shunt compound generator',
  paper: '2071 Magh',
  paperVoice: 'दुई हजार एकहत्तर माघ',
  question: 'A short shunt compound generator supplies a load current of 100 A at 250 V. The generator has the following winding resistances: shunt field 130 Ω, armature 0.1 Ω and the series field 0.1 Ω. Find the emf generated and the armature current, if the brush drop is 1 V per brush.',
  read: 'Short shunt, load 100 ampere, 250 volt. Shunt 130, armature 0.1, series 0.1 ohm, brush drop 1 volt per brush. EMF ra armature current?',
  readVoice: 'सर्ट सन्ट, लोड एक सय एम्पियर, दुई सय पचास भोल्ट। सन्ट एक सय तीस, आर्मेचर जिरो पोइन्ट वान, सिरिज जिरो पोइन्ट वान ओम, ब्रस ड्रप एक भोल्ट पर ब्रस। ई एम एफ र आर्मेचर करेन्ट?',
  given: [
    { node: <>I<sub>L</sub> = 100 A, V = 250 V, R<sub>sh</sub> = 130 Ω, R<sub>a</sub> = 0.1 Ω, R<sub>se</sub> = 0.1 Ω</>, say: 'IL 100, V 250, Rsh 130, Ra 0.1, Rse 0.1', voice: 'आई एल एक सय, भी दुई सय पचास, आर एस एच एक सय तीस, आर ए जिरो पोइन्ट वान, आर एस ई जिरो पोइन्ट वान' },
    { node: <>Brush drop: 1 V × 2 brushes = 2 V</>, say: 'Brush drop jamma 2 volt', voice: 'ब्रस ड्रप जम्मा दुई भोल्ट' },
  ],
  find: { node: <>E and I<sub>a</sub></>, say: 'Nikalnu parne: E ra I a.', voice: 'निकाल्नु पर्ने — ई र आई ए।' },
  idea: { node: <>Short shunt: series field carries I<sub>L</sub>; shunt field across the armature</>, say: 'Method: short shunt ma series field ma I L, shunt field armature ko across.', voice: 'मेथड — सर्ट सन्टमा सिरिज फिल्डमा आई एल, सन्ट फिल्ड आर्मेचरको एक्रस।' },
  steps: [
    {
      node: <K>{String.raw`\begin{aligned} V_{se} &= I_LR_{se} \\ &= 100\times0.1 \\ &= 10\ \text{V} \\ V_{sh} &= 250 + 10 \\ &= 260\ \text{V} \end{aligned}`}</K>,
      say: 'Series drop 10 volt, tesaile shunt field ko voltage 260 volt.',
      voice: 'सिरिज ड्रप दस भोल्ट, त्यसैले सन्ट फिल्डको भोल्टेज दुई सय साठी भोल्ट।',
    },
    {
      node: <K>{String.raw`\begin{aligned} I_{sh} &= \dfrac{260}{130} \\ &= 2\ \text{A} \\ I_a &= 100 + 2 \\ &= 102\ \text{A} \end{aligned}`}</K>,
      say: 'I sh equals 2 ampere, I a equals 102 ampere.',
      voice: 'आई एस एच इक्वल्स टु एम्पियर, आई ए इक्वल्स एक सय दुई एम्पियर।',
      ask: {
        q: 'Short shunt ma shunt field kun voltage ma jodiyeko huncha?',
        voice: 'सर्ट सन्टमा सन्ट फिल्ड कुन भोल्टेजमा जोडिएको हुन्छ?',
        options: ['V + IL Rse', 'V', 'E'],
        answer: 0,
        why: 'Shunt field armature ko across, series field ko drop pachhi.',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} E &= V_{sh} + I_aR_a + V_b \\ &= 260 + 102\times0.1 + 2 \end{aligned}`}</K>,
      say: 'E equals 260 plus 10.2 plus 2.',
      voice: 'ई इक्वल्स दुई सय साठी प्लस दस दशमलव दुई प्लस दुई।',
    },
  ],
  answer: { node: <K>{String.raw`\boxed{E = 272.2\ \text{V}, \quad I_a = 102\ \text{A}}`}</K>, say: 'Answer: E equals 272.2 volt, I a equals 102 ampere.', voice: 'आन्सर — ई इक्वल्स दुई सय बहत्तर दशमलव दुई भोल्ट, आई ए इक्वल्स एक सय दुई एम्पियर।' },
  trap: { node: <>Trap: brush drop is 1 V per brush, so 2 V in all.</>, say: 'Trap: per brush 1 volt, dui brush, jamma 2 volt.', voice: 'ट्र्याप — पर ब्रस एक भोल्ट, दुई ब्रस, जम्मा दुई भोल्ट।' },
});

/* ── 3.4 Losses, efficiency, regulation ──────────────────────────────── */
export const basics34 = duo('3.4 · Basic understanding: does all the engine’s power reach the load?', {
  three: motorTour([
    { shot: 'engine', show: GEN, open: 0.6, spin: 0.7, field: 0.8, flow: 0.7, focus: ['engine'], labels: [['engine ko power', 'engine']] },
    { shot: 'side', heat: { fan: 0 }, focus: ['shaft', 'brushes'], labels: [['ghasai ra hawa', 'brushes']] },
    { shot: 'inside', open: 1, heat: { armature: 0.6 }, focus: ['armature'], labels: [['falam taato', 'armature']] },
    { heat: { armature: 0.6, coil: 0.8, fieldCoil: 0.6 }, focus: ['coil', 'fieldCoil'], labels: [['tar taato', 'coil']] },
    { shot: 'wiring', open: 0.6, heat: {}, focus: ['lamp'], labels: [['bulb samma pugeko', 'lamp']] },
    { flow: 1, focus: ['lamp'], labels: [['load badhyo: voltage jharyo', 'lamp']] },
    { flow: 0.8, focus: ['coil', 'lamp'], heat: { coil: 0.5 }, labels: [['best: dui loss barabar', [0.2, 3.4, 1.0]]] },
    { shot: 'whole', open: 0.4, heat: {}, focus: null },
  ]),
  tutor: [
    {
      say: 'Engine le shaft ma power dincha. Tara sabai power bulb samma pugdaina.',
      voice: 'इन्जिनले सफ्टमा पावर दिन्छ। तर सबै पावर बल्बसम्म पुग्दैन।',
      lines: [['h', <>3.4 · Engine ko power sabai bulb ma?</>], ['step', <>Engine ko power → kehi bato mai harauncha</>]],
    },
    {
      say: 'Bearing ra brush ko ghasai, ani ghumda hawa sanga ko ladai: yo mechanical loss.',
      voice: 'बेयरिङ र ब्रसको घसाइ, अनि घुम्दा हावासँगको लडाइँ — यो मेकानिकल लस।',
      lines: [['step', <>Ghasai + hawa → mechanical loss</>]],
    },
    {
      say: 'Ghumne falam ma magnet ulto-sulto huncha ra falam taato huncha: iron loss.',
      voice: 'घुम्ने फलाममा म्याग्नेट उल्टो सुल्टो हुन्छ, र फलाम तातो हुन्छ — आइरन लस।',
      lines: [['step', <>Falam taato → iron loss</>]],
    },
    {
      say: 'Tar ma current bagda tar taato: copper loss. Load badhda yo chito badhcha.',
      voice: 'तारमा करेन्ट बग्दा तार तातो — कपर लस। लोड बढ्दा यो छिटो बढ्छ।',
      lines: [['step', <>Tar taato → copper loss (load sanga badhcha)</>]],
      ask: {
        q: 'Load badhda kun loss sabai bhanda chito badhcha?',
        voice: 'लोड बढ्दा कुन लस सबैभन्दा छिटो बढ्छ?',
        options: ['Copper loss', 'Iron loss', 'Mechanical loss'],
        answer: 0,
        why: 'Copper loss current ko square sanga badhcha.',
      },
    },
    {
      say: 'Bulb samma pugeko power over engine ko power: yahi efficiency.',
      voice: 'बल्बसम्म पुगेको पावर ओभर इन्जिनको पावर — यही इफिसियन्सी।',
      lines: [['step', <>Bulb ma pugeko ÷ engine ko power → efficiency</>]],
    },
    {
      say: 'Dherai bulb balda generator ko voltage alikati jharcha. Kati jharyo bhanne naap: voltage regulation.',
      voice: 'धेरै बल्ब बल्दा जेनेरेटरको भोल्टेज अलिकति झर्छ। कति झर्‍यो भन्ने नाप — भोल्टेज रेगुलेसन।',
      lines: [['step', <>Load badhyo → voltage jharyo (regulation)</>]],
    },
    {
      say: 'Transformer jastai, best efficiency tar ko loss ra fixed loss barabar huda.',
      voice: 'ट्रान्सफर्मर जस्तै, बेस्ट इफिसियन्सी तारको लस र फिक्स्ड लस बराबर हुँदा।',
      lines: [['step', <>Best: badhne loss ra fixed loss barabar</>]],
    },
    {
      say: 'Saransha: ghasai, falam ra tar ma loss; bachyo tyo output; voltage ali jharcha; dui loss barabar huda best.',
      voice: 'सारांश — घसाइ, फलाम, र तारमा लस, बच्यो त्यो आउटपुट, भोल्टेज अलि झर्छ, दुई लस बराबर हुँदा बेस्ट।',
      lines: [['idea', <>Ghasai + falam + tar → loss · bachyo → output · barabar → best</>]],
    },
  ],
  lecturer: [
    {
      say: 'Prime mover le mechanical input dincha, tara sabai electrical output ma badlindaina.',
      voice: 'प्राइम मुभरले मेकानिकल इनपुट दिन्छ, तर सबै इलेक्ट्रिकल आउटपुटमा बदलिँदैन।',
      lines: [['h', <>3.4 · Losses and efficiency</>], ['step', <>Mechanical input; part of it is lost</>]],
    },
    {
      say: 'Mechanical losses: bearing friction, brush friction ra windage.',
      voice: 'मेकानिकल लसेस — बेयरिङ फ्रिक्सन, ब्रस फ्रिक्सन, र विन्डेज।',
      lines: [['step', <>Mechanical losses: friction, windage</>]],
    },
    {
      say: 'Iron losses: armature core ma hysteresis ra eddy current loss.',
      voice: 'आइरन लसेस — आर्मेचर कोरमा हिस्टेरेसिस र एडी करेन्ट लस।',
      lines: [['step', <>Iron losses in the armature core</>]],
    },
    {
      say: 'Copper losses: armature ra field windings ma; load sanga badhchan.',
      voice: 'कपर लसेस — आर्मेचर र फिल्ड वाइन्डिङ्समा, लोडसँग बढ्छन्।',
      lines: [['step', <>Copper losses in the windings, vary with load</>]],
      ask: {
        q: 'Shunt generator ma kun loss lai constant manincha?',
        voice: 'सन्ट जेनेरेटरमा कुन लसलाई कन्स्टेन्ट मानिन्छ?',
        options: ['Iron + mechanical + shunt Cu', 'Armature Cu', 'Brush drop matra'],
        answer: 0,
        why: 'Speed ra flux lagbhag constant huda yi badlidainan.',
      },
    },
    {
      say: 'Commercial efficiency electrical output ra mechanical input ko ratio ho.',
      voice: 'कमर्सियल इफिसियन्सी इलेक्ट्रिकल आउटपुट र मेकानिकल इनपुटको रेसियो हो।',
      lines: [['step', <>Commercial efficiency: output over mechanical input</>]],
    },
    {
      say: 'Load badhda terminal voltage ghatcha; yo change voltage regulation le naapcha.',
      voice: 'लोड बढ्दा टर्मिनल भोल्टेज घट्छ, यो चेन्ज भोल्टेज रेगुलेसनले नाप्छ।',
      lines: [['step', <>Voltage falls with load: voltage regulation</>]],
    },
    {
      say: 'Maximum efficiency variable loss constant loss barabar huda huncha.',
      voice: 'म्याक्सिमम इफिसियन्सी भेरिएबल लस कन्स्टेन्ट लस बराबर हुँदा हुन्छ।',
      lines: [['step', <>Maximum efficiency when variable loss equals constant loss</>]],
    },
    {
      say: 'Saransha: mechanical, iron ra copper losses; tin efficiencies; regulation; maximum efficiency condition.',
      voice: 'सारांश — मेकानिकल, आइरन, र कपर लसेस, तीन इफिसियन्सिज, रेगुलेसन, म्याक्सिमम इफिसियन्सी कन्डिसन।',
      lines: [['idea', <>Losses · efficiencies · regulation · maximum when variable loss equals constant loss</>]],
    },
  ],
});

export const eff34 = duo('Derivation: power stages, efficiency and regulation', {
  draw: genFlowFigure,
  viewBox: '0 0 360 225',
  tutor: [
    {
      say: 'Figure 3.4: mechanical input bata iron ra friction loss ghataye armature ma E I a generate huncha.',
      voice: 'फिगर थ्री पोइन्ट फोर — मेकानिकल इनपुटबाट आइरन र फ्रिक्सन लस घटाए आर्मेचरमा ई आई ए जेनेरेट हुन्छ।',
      lines: [['h', <>Power stages</>], ['step', <>Mechanical input − (iron + friction) = generated power E I<sub>a</sub></>]],
    },
    {
      say: 'E I a bata copper losses ghataye output V I L.',
      voice: 'ई आई ए बाट कपर लसेस घटाए आउटपुट भी आई एल।',
      lines: [['step', <>E I<sub>a</sub> − copper losses = output V I<sub>L</sub></>]],
    },
    {
      say: 'Tin efficiency: mechanical, electrical ra commercial, jun overall ho.',
      voice: 'तीन इफिसियन्सी — मेकानिकल, इलेक्ट्रिकल, र कमर्सियल, जुन ओभरअल हो।',
      lines: [['eq', tex(String.raw`\begin{aligned} \eta_m &= \dfrac{EI_a}{\text{input}}, \quad \eta_e = \dfrac{VI_L}{EI_a} \\ \eta_c &= \dfrac{VI_L}{\text{input}} \\ &= \eta_m\,\eta_e \end{aligned}`)]],
      ask: {
        q: 'Commercial efficiency kasko product?',
        voice: 'कमर्सियल इफिसियन्सी कसको प्रडक्ट?',
        options: ['ηm × ηe', 'ηm + ηe', 'ηe / ηm'],
        answer: 0,
        why: '(EIa/input)(VIL/EIa) = VIL/input.',
      },
    },
    {
      say: 'Variable loss I a square R a, constant loss W c. Maximum efficiency: I a square R a equals W c.',
      voice: 'भेरिएबल लस आई ए स्क्वायर आर ए, कन्स्टेन्ट लस डब्लु सी। म्याक्सिमम इफिसियन्सी — आई ए स्क्वायर आर ए इक्वल्स डब्लु सी।',
      lines: [['eq', tex(String.raw`\begin{aligned} I_a^2R_a &= \boxed{W_c} \\ \therefore\ I_a &= \sqrt{W_c/R_a} \end{aligned}`)]],
    },
    {
      say: 'Voltage regulation equals no-load voltage minus full-load voltage, over full-load voltage.',
      voice: 'भोल्टेज रेगुलेसन इक्वल्स नो लोड भोल्टेज माइनस फुल लोड भोल्टेज, ओभर फुल लोड भोल्टेज।',
      lines: [['eq', tex(String.raw`\%\,\text{VR} = \dfrac{V_{nl} - V_{fl}}{V_{fl}}\times100`)]],
    },
  ],
  lecturer: [
    {
      say: 'Power stages: from the mechanical input, iron and friction losses leave the generated power E I a, Figure 3.4.',
      voice: 'पावर स्टेजेज — फ्रम द मेकानिकल इनपुट, आइरन एन्ड फ्रिक्सन लसेस लिभ द जेनेरेटेड पावर ई आई ए, फिगर थ्री पोइन्ट फोर।',
      lines: [['h', <>Power stages and efficiency</>], ['step', <>Input − (iron + friction) = E I<sub>a</sub></>]],
    },
    {
      say: 'From E I a, copper losses leave the output V I L.',
      voice: 'फ्रम ई आई ए, कपर लसेस लिभ द आउटपुट भी आई एल।',
      lines: [['step', <>E I<sub>a</sub> − Cu losses = V I<sub>L</sub></>]],
    },
    {
      say: 'Mechanical, electrical and commercial efficiencies are defined as follows.',
      voice: 'मेकानिकल, इलेक्ट्रिकल, एन्ड कमर्सियल इफिसियन्सिज आर डिफाइन्ड एज फलोज।',
      lines: [['eq', tex(String.raw`\begin{aligned} \eta_m &= \dfrac{EI_a}{\text{input}}, \quad \eta_e = \dfrac{VI_L}{EI_a} \\ \eta_c &= \dfrac{VI_L}{\text{input}} \\ &= \eta_m\,\eta_e \end{aligned}`)]],
      ask: {
        q: 'Electrical efficiency ma kun loss matra parcha?',
        voice: 'इलेक्ट्रिकल इफिसियन्सीमा कुन लस मात्र पर्छ?',
        options: ['Copper losses', 'Iron losses', 'Friction'],
        answer: 0,
        why: 'EIa bata VIL samma copper losses matra.',
      },
    },
    {
      say: 'Efficiency is maximum when the variable loss equals the constant loss.',
      voice: 'इफिसियन्सी इज म्याक्सिमम ह्वेन द भेरिएबल लस इक्वल्स द कन्स्टेन्ट लस।',
      lines: [['eq', tex(String.raw`\begin{aligned} I_a^2R_a &= \boxed{W_c} \\ \therefore\ I_a &= \sqrt{W_c/R_a} \end{aligned}`)]],
    },
    {
      say: 'Voltage regulation is the change from no load to full load as a percentage of full-load voltage.',
      voice: 'भोल्टेज रेगुलेसन इज द चेन्ज फ्रम नो लोड टु फुल लोड एज अ पर्सेन्टेज अफ फुल लोड भोल्टेज।',
      lines: [['eq', tex(String.raw`\%\,\text{VR} = \dfrac{V_{nl} - V_{fl}}{V_{fl}}\times100`)]],
    },
  ],
});

export const effSolve34 = solve({
  title: 'IOE 2074 Bhadra: efficiency of a shunt generator',
  paper: '2074 Bhadra',
  paperVoice: 'दुई हजार चौहत्तर भदौ',
  question: 'A dc shunt generator gives full load output of 30 kW at a terminal voltage of 200 V. The armature and shunt field resistances are 0.05 ohm and 50 ohm respectively. The iron and friction losses are 1000 W. Calculate: (i) generated emf; (ii) copper losses; (iii) efficiency.',
  read: 'Shunt generator, output 30 kilowatt at 200 volt. Ra 0.05, Rsh 50 ohm. Iron ra friction 1000 watt. EMF, copper loss, efficiency.',
  readVoice: 'सन्ट जेनेरेटर, आउटपुट तीस किलोवाट एट दुई सय भोल्ट। आर ए जिरो पोइन्ट जिरो फाइभ, आर एस एच पचास ओम। आइरन र फ्रिक्सन एक हजार वाट। ई एम एफ, कपर लस, इफिसियन्सी।',
  given: [
    { node: <>Output 30 kW, V = 200 V, R<sub>a</sub> = 0.05 Ω, R<sub>sh</sub> = 50 Ω, iron + friction = 1000 W</>, say: 'Output 30 kW, V 200, Ra 0.05, Rsh 50, iron plus friction 1000 W', voice: 'आउटपुट तीस किलोवाट, भी दुई सय, आर ए जिरो पोइन्ट जिरो फाइभ, आर एस एच पचास, आइरन प्लस फ्रिक्सन एक हजार वाट' },
  ],
  find: { node: <>E, copper losses, η</>, say: 'Nikalnu parne: E, copper loss, efficiency.', voice: 'निकाल्नु पर्ने — ई, कपर लस, इफिसियन्सी।' },
  idea: { node: <>Currents → E = V + I<sub>a</sub>R<sub>a</sub> → losses → <K>{String.raw`\eta = \dfrac{\text{output}}{\text{output} + \text{losses}}`}</K></>, say: 'Method: current haru, E, losses, ani efficiency.', voice: 'मेथड — करेन्टहरू, ई, लसेस, अनि इफिसियन्सी।' },
  steps: [
    {
      node: <K>{String.raw`\begin{aligned} I_L &= \dfrac{30\,000}{200} \\ &= 150\ \text{A} \\ I_{sh} &= \dfrac{200}{50} \\ &= 4\ \text{A} \\ I_a &= 154\ \text{A} \end{aligned}`}</K>,
      say: 'I L 150, I sh 4, I a 154 ampere.',
      voice: 'आई एल एक सय पचास, आई एस एच फोर, आई ए एक सय चवन्न एम्पियर।',
    },
    {
      node: <K>{String.raw`\begin{aligned} E &= 200 + 154\times0.05 \\ &= 207.7\ \text{V} \end{aligned}`}</K>,
      say: 'E equals 200 plus 7.7, 207.7 volt.',
      voice: 'ई इक्वल्स दुई सय प्लस सात दशमलव सात, दुई सय सात दशमलव सात भोल्ट।',
    },
    {
      node: <K>{String.raw`\begin{aligned} P_{cu,a} &= 154^2\times0.05 \\ &= 1185.8\ \text{W} \\ P_{cu,sh} &= 200\times4 \\ &= 800\ \text{W} \\ P_{cu} &= 1985.8\ \text{W} \end{aligned}`}</K>,
      say: 'Armature copper 1185.8, shunt copper 800, total 1985.8 watt.',
      voice: 'आर्मेचर कपर एघार सय पचासी दशमलव आठ, सन्ट कपर आठ सय, टोटल उन्नाइस सय पचासी दशमलव आठ वाट।',
      ask: {
        q: 'Shunt field copper loss kasari nikalne?',
        voice: 'सन्ट फिल्ड कपर लस कसरी निकाल्ने?',
        options: ['V × Ish', 'Ia² Rsh', 'E × Ish'],
        answer: 0,
        why: 'Shunt field V ma: Ish²Rsh = V Ish = 800 W.',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} \eta &= \dfrac{30\,000}{30\,000 + 1985.8 + 1000} \\ &= \dfrac{30\,000}{32\,985.8} \end{aligned}`}</K>,
      say: 'Efficiency equals 30,000 over 32,985.8.',
      voice: 'इफिसियन्सी इक्वल्स तीस हजार ओभर बत्तीस हजार नौ सय पचासी दशमलव आठ।',
    },
  ],
  answer: { node: <K>{String.raw`\boxed{E = 207.7\ \text{V}, \quad P_{cu} = 1985.8\ \text{W}, \quad \eta = 90.95\,\%}`}</K>, say: 'Answer: E 207.7 volt, copper loss 1985.8 watt, efficiency 90.95 percent.', voice: 'आन्सर — ई दुई सय सात दशमलव सात भोल्ट, कपर लस उन्नाइस सय पचासी दशमलव आठ वाट, इफिसियन्सी नब्बे दशमलव नौ पाँच प्रतिशत।' },
  trap: { node: <>Trap: the field current comes from the armature: I<sub>a</sub> = I<sub>L</sub> + I<sub>sh</sub>, not I<sub>L</sub>.</>, say: 'Trap: generator ma I a equals I L plus I sh.', voice: 'ट्र्याप — जेनेरेटरमा आई ए इक्वल्स आई एल प्लस आई एस एच।' },
});

const t31 = topic({ num: '3.1', title: 'Constructional Details and Armature Winding · Working principle and Commutator Action', opener: basics31, derive: [construction31, working31, winding31], picture: [constructionAnswer31, windingAnswer31] });
const t32 = topic({ num: '3.2', title: 'EMF equation', opener: basics32, derive: [emf32], picture: [emfAnswer32, speedSolve32] });
const t33 = topic({ num: '3.3', title: 'Method of excitation: separately and self excited, Types of DC Generator · Characteristics of series, shunt and compound generator', opener: basics33, derive: [types33, buildup33], picture: [buildupAnswer33, shortShuntSolve33] });
const t34 = topic({ num: '3.4', title: 'Losses in DC generators · Efficiency and Voltage Regulation', opener: basics34, derive: [eff34], picture: [effSolve34] });

export const unit3 = {
  topics: [t31, t32, t33, t34],
  summary: [
    <>Generator: conductor le flux kaatcha, e = Blv sinθ; commutator le armature ko AC lai DC banaucha.</>,
    <>E = PφZN/60A; lap A = P, wave A = 2; E ∝ φN.</>,
    <>Shunt: I<sub>a</sub> = I<sub>L</sub> + I<sub>sh</sub>, E = V + I<sub>a</sub>R<sub>a</sub>; long/short shunt compound ma series drop farak.</>,
    <>Build-up: residual flux + R<sub>f</sub> &lt; R<sub>c</sub> + speed &gt; critical speed.</>,
    <>η<sub>c</sub> = η<sub>m</sub>η<sub>e</sub>; maximum when I<sub>a</sub>²R<sub>a</sub> = W<sub>c</sub>; VR = (V<sub>nl</sub> − V<sub>fl</sub>)/V<sub>fl</sub>.</>,
  ],
};
