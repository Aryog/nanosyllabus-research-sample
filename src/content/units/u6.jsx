import { C, K, Pts, answer, duo, solve, topic } from '../video/kit.jsx';
import { Cap, T, W, head } from '../unit4/figs.jsx';
import { syncTour } from '../machines/models3d.js';

/*
  Unit 6 Three Phase Synchronous Machines (IOE syllabus).
    6.1 alternator construction, rotor types, exciter, working principle
    6.2 EMF equation, pitch factor, distribution factor
    6.3 armature reaction, alternator on load, phasor diagram
    6.4 synchronous motor: principle, starting, excitation and pf control
  Segment 1 walks the 3D synchronous machine (machines/models3d.js syncTour).
  Recomputed (2073 Chaitra / 2070 Bhadra): Vph = 6600/√3 = 3810.5 V,
  I = 1200e3/(√3 × 6600) = 104.97 A; lagging IZs = 411.5 + j478.7,
  E = 4222.0 + j478.7, |E| = 4249.1 V; leading IZs = −344.3 + j529.1,
  V = 344.3 + √(4249.1² − 529.1²) = 4560.3 V/phase = 7898.7 V line.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
const SM = ['frame', 'stator', 'winding', 'salient', 'fieldCoil', 'shaft'];
const ROUND = ['frame', 'stator', 'winding', 'round', 'shaft'];
const GENSET = [...SM, 'sliprings', 'exciter', 'turbine', 'lamps'];
const MOTOR = [...SM, 'sliprings', 'supply'];

/* ── Figures ─────────────────────────────────────────────────────────── */
// Fig. 6.1: 0 salient-pole rotor · 1 cylindrical rotor · 2 speed and use · 3 f = PN/120
export const rotorFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <circle cx={90} cy={100} r={30} fill="none" stroke={C.chalk} strokeWidth={1.4} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x = 90 + Math.cos(a) * 46;
        const y = 100 + Math.sin(a) * 46;
        return <g key={i}><rect x={x - 9} y={y - 9} width={18} height={18} fill="none" stroke={C.chalk} strokeWidth={1.2} transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`} /><T x={x} y={y + 4} size={9}>{i % 2 ? 'S' : 'N'}</T></g>;
      })}
      <T x={90} y={172} size={10}>(a) salient pole</T>
      <Cap y={214}>Fig. 6.1  Types of rotor</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <rect x={210} y={78} width={120} height={44} rx={8} fill="none" stroke={C.chalk} strokeWidth={1.4} />
      {[228, 246, 294, 312].map((x) => <W key={x} d={`M${x} 82 V118`} w={0.9} />)}
      <T x={270} y={104} size={9}>pole</T>
      <T x={270} y={172} size={10}>(b) cylindrical</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <T x={90} y={186} size={9}>many poles, large D, short; low speed (hydro)</T>
      <T x={270} y={186} size={9}>2 or 4 poles, small D, long; high speed (steam)</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <T x={270} y={44} size={12} i>f = PN / 120</T>
    </g>
  </>
);

// Fig. 6.2: 0 full-pitch coil · 1 short pitch by α · 2 slot EMFs β apart · 3 vector sum vs arithmetic sum
export const factorFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M30 150 H200" w={0.8} />
      <W d="M40 150 V70 H160 V150" w={1.2} dash="5 3" />
      <T x={100} y={62} size={10}>full pitch = 180° electrical</T>
      <Cap y={214}>Fig. 6.2  Pitch and distribution of a winding</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M40 150 V90 H135 V150" w={1.6} />
      <W d="M135 160 H160" w={1} />
      <T x={148} y={176} i size={10}>α</T>
      <T x={88} y={84} size={10}>short pitch (180° − α)</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      {[0, 1, 2].map((k) => {
        const a = (-90 + 20 * k) * (Math.PI / 180);
        const x0 = 230 + k * 32;
        const y0 = 170 - k * 12;
        return <g key={k}><W d={`M${x0} ${y0} L${x0 + 34 * Math.cos(a + Math.PI / 2 - 0.35 * k)} ${y0 - 34}`} w={1.4} /></g>;
      })}
      <T x={300} y={112} i size={10}>β (slot angle)</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M230 170 L330 115" w={1.6} dash="4 2" />
      <T x={300} y={190} size={9}>vector sum &lt; arithmetic sum</T>
    </g>
  </>
);

// Fig. 6.3: alternator phasor (lagging pf). 0 V · 1 I at φ · 2 IRa · 3 IXs · 4 E
export const altPhasorFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M40 160 H220" w={1.6} />
      {head(220, 160, 'right')}
      <T x={214} y={176} i>V</T>
      <Cap x={180} y={214}>Fig. 6.3  Phasor diagram of an alternator (lagging pf)</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M40 160 L140 200" w={1.2} />
      {head(140, 200, 'right', 5)}
      <T x={146} y={206} a="start" i size={10}>I</T>
      <T x={78} y={180} i size={10}>φ</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M220 160 L250 172" w={1.4} />
      <T x={252} y={186} a="start" i size={10}>IRa</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M250 172 L282 92" w={1.4} />
      <T x={290} y={130} a="start" i size={10}>IXs</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <W d="M40 160 L282 92" w={1.8} />
      {head(282, 92, 'right', 6)}
      <T x={150} y={112} i>E</T>
      <T x={92} y={150} i size={10}>δ</T>
    </g>
  </>
);

// Fig. 6.4: V-curves. 0 axes · 1 no-load curve · 2 higher-load curve · 3 lagging / leading regions · 4 unity-pf locus
export const vCurveFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M40 190 H330 M40 190 V30" />
      {head(330, 190, 'right')}
      {head(40, 30, 'up')}
      <T x={326} y={206} i>If</T>
      <T x={30} y={34} a="end" i>Ia</T>
      <Cap y={222}>Fig. 6.4  V-curves of a synchronous motor</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <path d="M70 60 Q170 250 290 60" fill="none" stroke={C.chalk} strokeWidth={1.4} />
      <T x={292} y={56} a="start" size={9}>no load</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <path d="M80 40 Q190 210 300 40" fill="none" stroke={C.chalk} strokeWidth={1.4} />
      <T x={302} y={38} a="start" size={9}>full load</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <T x={95} y={120} size={10}>under-excited</T>
      <T x={95} y={134} size={10}>lagging pf</T>
      <T x={260} y={120} size={10}>over-excited</T>
      <T x={260} y={134} size={10}>leading pf</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <W d="M170 155 L190 125" w={1} dash="4 3" />
      <T x={196} y={150} a="start" size={9}>unity pf (minimum Ia)</T>
    </g>
  </>
);

/* ── 6.1 Construction, rotor types, working ─────────────────────────── */
export const basics61 = duo('6.1 · Basic understanding: powerhouse ko generator bhitra k cha?', {
  three: syncTour([
    { shot: 'back', show: GENSET, spin: 0.35, field: 0.8, lamp: 0.8, focus: ['turbine', 'shaft'], labels: [['pani le turbine', 'turbine']] },
    { shot: 'front', spin: 0.2, field: 1, lamp: 0.6, focus: ['salient', 'fieldCoil'], labels: [['rotor: magnet', 'salient']] },
    { spin: 0.35, focus: ['winding', 'stator'], labels: [['stator: nachalne coil', 'winding']] },
    { shot: 'lamps', spin: 0.4, lamp: 1, focus: ['winding', 'lamps'], labels: [['tin phase bijuli', 'lamps']] },
    { shot: 'exciter', focus: ['sliprings', 'brushes'], labels: [['slip ring: sano DC', 'sliprings']] },
    { focus: ['exciter'], labels: [['exciter', 'exciter']] },
    { shot: 'front', show: [...ROUND, 'turbine', 'lamps'], spin: 0.9, field: 1, lamp: 1, focus: ['round'], labels: [['chito: round rotor', 'round']] },
    { shot: 'wide', show: GENSET, spin: 0.35, focus: null },
  ]),
  tutor: [
    {
      say: 'Kulekhani ko powerhouse ma pani le turbine ghumaucha, ra turbine le thulo generator. Yo synchronous generator wa alternator ho.',
      voice: 'कुलेखानीको पावरहाउसमा पानीले टर्बाइन घुमाउँछ, र टर्बाइनले ठूलो जेनेरेटर। यो सिन्क्रोनस जेनेरेटर वा अल्टरनेटर हो।',
      lines: [['h', <>6.1 · Powerhouse ko generator bhitra?</>], ['step', <>Pani → turbine → alternator</>]],
    },
    {
      say: 'DC generator ko ulto: alternator ma magnet ghumcha. Rotor ma pole ra field coil, DC le magnet banaucha.',
      voice: 'डी सी जेनेरेटरको उल्टो — अल्टरनेटरमा म्याग्नेट घुम्छ। रोटरमा पोल र फिल्ड कोइल, डी सीले म्याग्नेट बनाउँछ।',
      lines: [['step', <>Rotor: ghumne magnet (field)</>]],
    },
    {
      say: 'Bahira ko stator ma tin phase ka coil, chupchap basthan. Ghumne magnet le tini lai kaatcha.',
      voice: 'बाहिरको स्टेटरमा तीन फेजका कोइल, चुपचाप बस्छन्। घुम्ने म्याग्नेटले तिनीलाई काट्छ।',
      lines: [['step', <>Stator: nachalne tin phase coil (armature)</>]],
    },
    {
      say: 'Yasari tin phase AC bijuli sidhai nachalne coil bata niklancha. Thulo current lai ghumne contact chahina.',
      voice: 'यसरी तीन फेज ए सी बिजुली सिधै नचल्ने कोइलबाट निक्लन्छ। ठूलो करेन्टलाई घुम्ने कन्ट्याक्ट चाहिँदैन।',
      lines: [['step', <>Thulo bijuli nachalne coil bata → surakshit</>]],
      ask: {
        q: 'Alternator ma armature kina stationary rakhincha?',
        voice: 'अल्टरनेटरमा आर्मेचर किन स्टेसनरी राखिन्छ?',
        options: ['Thulo current ra voltage sajilai bahira nikalna', 'Rotor halka banauna matra', 'Frequency badhauna'],
        answer: 0,
        why: 'High voltage, thulo current sidhai fixed terminals bata; slip ring ma sano DC matra.',
      },
    },
    {
      say: 'Rotor ko magnet ko lagi sano DC chahincha: slip ring ra brush bata pathaincha.',
      voice: 'रोटरको म्याग्नेटको लागि सानो डी सी चाहिन्छ — स्लिप रिङ र ब्रसबाट पठाइन्छ।',
      lines: [['step', <>Slip ring + brush: rotor ma sano DC</>]],
    },
    {
      say: 'Tyo DC shaft mai jodiyeko sano DC generator le dincha: exciter.',
      voice: 'त्यो डी सी सफ्टमै जोडिएको सानो डी सी जेनेरेटरले दिन्छ — एक्साइटर।',
      lines: [['step', <>Exciter: shaft ma sano DC generator</>]],
    },
    {
      say: 'Pani ko turbine bistarai ghumcha, tesaile dherai pole bhayeko chauda rotor. Steam turbine chito, tesaile lamo chikno round rotor.',
      voice: 'पानीको टर्बाइन बिस्तारै घुम्छ, त्यसैले धेरै पोल भएको चौडा रोटर। स्टिम टर्बाइन छिटो, त्यसैले लामो चिल्लो राउन्ड रोटर।',
      lines: [['step', <>Bistarai: salient (dherai pole) · chito: round rotor</>]],
    },
    {
      say: 'Saransha: rotor ma ghumne magnet, stator ma nachalne coil, exciter le magnet ko DC, ra speed anusar rotor ko aakar.',
      voice: 'सारांश — रोटरमा घुम्ने म्याग्नेट, स्टेटरमा नचल्ने कोइल, एक्साइटरले म्याग्नेटको डी सी, र स्पिड अनुसार रोटरको आकार।',
      lines: [['idea', <>Ghumne magnet · nachalne coil · exciter · salient wa round</>]],
    },
  ],
  lecturer: [
    {
      say: 'Hydro station ma turbine le synchronous generator chalaucha.',
      voice: 'हाइड्रो स्टेसनमा टर्बाइनले सिन्क्रोनस जेनेरेटर चलाउँछ।',
      lines: [['h', <>6.1 · The alternator</>], ['step', <>Prime mover: hydro or steam turbine</>]],
    },
    {
      say: 'Rotor ma DC excited field poles hunchan; yo rotating field system ho.',
      voice: 'रोटरमा डी सी एक्साइटेड फिल्ड पोल्स हुन्छन्, यो रोटेटिङ फिल्ड सिस्टम हो।',
      lines: [['step', <>Rotor: DC-excited field poles (rotating field)</>]],
    },
    {
      say: 'Stator slots ma three-phase armature winding huncha: stationary armature.',
      voice: 'स्टेटर स्लट्समा थ्री फेज आर्मेचर वाइन्डिङ हुन्छ — स्टेसनरी आर्मेचर।',
      lines: [['step', <>Stator: three-phase armature (stationary)</>]],
    },
    {
      say: 'Rotating field le armature conductors cut garcha ra three-phase EMF induce huncha; output fixed terminals bata linchha.',
      voice: 'रोटेटिङ फिल्डले आर्मेचर कन्डक्टर्स कट गर्छ, र थ्री फेज ई एम एफ इन्ड्युस हुन्छ, आउटपुट फिक्स्ड टर्मिनल्सबाट लिइन्छ।',
      lines: [['step', <>Three-phase EMF taken from fixed terminals</>]],
      ask: {
        q: 'Alternator ma slip rings le kun current bokchan?',
        voice: 'अल्टरनेटरमा स्लिप रिङ्सले कुन करेन्ट बोक्छन्?',
        options: ['Sano DC field current', 'Thulo AC output', 'Dubai'],
        answer: 0,
        why: 'Output stator bata; slip ring ma excitation matra.',
      },
    },
    {
      say: 'Field current slip rings ra brushes bata rotor ma pugcha.',
      voice: 'फिल्ड करेन्ट स्लिप रिङ्स र ब्रसेसबाट रोटरमा पुग्छ।',
      lines: [['step', <>Field current via slip rings and brushes</>]],
    },
    {
      say: 'Excitation shaft-mounted DC exciter wa brushless exciter le dincha.',
      voice: 'एक्साइटेसन सफ्ट माउन्टेड डी सी एक्साइटर वा ब्रसलेस एक्साइटरले दिन्छ।',
      lines: [['step', <>Exciter: DC or brushless, on the shaft</>]],
    },
    {
      say: 'Low speed ko lagi salient pole rotor, high speed ko lagi cylindrical rotor.',
      voice: 'लो स्पिडको लागि सेलियन्ट पोल रोटर, हाई स्पिडको लागि सिलिन्ड्रिकल रोटर।',
      lines: [['step', <>Salient pole: low speed · cylindrical: high speed</>]],
    },
    {
      say: 'Saransha: rotating field, stationary armature, exciter, ra speed anusar rotor type.',
      voice: 'सारांश — रोटेटिङ फिल्ड, स्टेसनरी आर्मेचर, एक्साइटर, र स्पिड अनुसार रोटर टाइप।',
      lines: [['idea', <>Rotating field · stationary armature · exciter · rotor type by speed</>]],
    },
  ],
});

export const construction61 = duo('Alternator ko construction ra rotor ka types', {
  draw: rotorFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Figure 6.1 a: salient pole rotor, pole bahira niskeka, dherai pole, chauda ra chhoto. Hydro ko bistarai turbine ko lagi.',
      voice: 'फिगर सिक्स पोइन्ट वान ए — सेलियन्ट पोल रोटर, पोल बाहिर निस्केका, धेरै पोल, चौडा र छोटो। हाइड्रोको बिस्तारै टर्बाइनको लागि।',
      lines: [['h', <>Alternator construction</>], ['step', <>Salient pole: projecting poles, many, large diameter, short axial length</>]],
    },
    {
      say: 'Figure 6.1 b: cylindrical rotor, chikno, 2 wa 4 pole, sano diameter ra lamo. Chito steam turbine ko lagi.',
      voice: 'फिगर सिक्स पोइन्ट वान बी — सिलिन्ड्रिकल रोटर, चिल्लो, टु वा फोर पोल, सानो डायमिटर र लामो। छिटो स्टिम टर्बाइनको लागि।',
      lines: [['step', <>Cylindrical (non-salient): smooth, 2 or 4 poles, small diameter, long</>]],
    },
    {
      say: 'Chito ghumda thulo diameter le centrifugal force khatarnak huncha, tesaile turbo-alternator ko rotor sano diameter ko.',
      voice: 'छिटो घुम्दा ठूलो डायमिटरले सेन्ट्रिफ्युगल फोर्स खतरनाक हुन्छ, त्यसैले टर्बो अल्टरनेटरको रोटर सानो डायमिटरको।',
      lines: [['step', <>High speed → centrifugal stress limits the diameter</>]],
      ask: {
        q: '3000 rpm, 50 Hz alternator ma kati pole?',
        voice: 'तीन हजार आर पी एम, फिफ्टी हर्ट्ज अल्टरनेटरमा कति पोल?',
        options: ['2', '4', '24'],
        answer: 0,
        why: 'P = 120f/N = 6000/3000 = 2.',
      },
    },
    {
      say: 'Stator: laminated core, slots ma three-phase winding, star ma. Damper bars pole face ma hunting rokcha.',
      voice: 'स्टेटर — ल्यामिनेटेड कोर, स्लट्समा थ्री फेज वाइन्डिङ, स्टारमा। ड्याम्पर बार्स पोल फेसमा हन्टिङ रोक्छ।',
      lines: [['step', <>Stator: laminated slotted core, 3-phase star winding · damper bars on pole faces</>]],
    },
    {
      say: 'Frequency rotor ko speed ra poles le: f equals P N over 120. Yahi synchronous speed.',
      voice: 'फ्रिक्वेन्सी रोटरको स्पिड र पोल्सले — एफ इक्वल्स पी एन ओभर वान ट्वेन्टी। यही सिन्क्रोनस स्पिड।',
      lines: [['eq', tex(String.raw`\boxed{f = \dfrac{PN}{120}}`)]],
    },
  ],
  lecturer: [
    {
      say: 'Salient pole rotor, Figure 6.1 a: projecting poles, large diameter, short length; used with low-speed hydro turbines.',
      voice: 'सेलियन्ट पोल रोटर, फिगर सिक्स पोइन्ट वान ए — प्रोजेक्टिङ पोल्स, लार्ज डायमिटर, सर्ट लेन्थ, युज्ड विद लो स्पिड हाइड्रो टर्बाइन्स।',
      lines: [['h', <>Constructional details</>], ['step', <>Salient pole: projecting poles, low speed</>]],
    },
    {
      say: 'Cylindrical rotor, Figure 6.1 b: smooth, two or four poles, small diameter, long; used with steam turbines.',
      voice: 'सिलिन्ड्रिकल रोटर, फिगर सिक्स पोइन्ट वान बी — स्मुथ, टु अर फोर पोल्स, स्मल डायमिटर, लङ, युज्ड विद स्टिम टर्बाइन्स।',
      lines: [['step', <>Cylindrical: smooth, high speed</>]],
    },
    {
      say: 'At high speed, centrifugal stress limits the rotor diameter.',
      voice: 'एट हाई स्पिड, सेन्ट्रिफ्युगल स्ट्रेस लिमिट्स द रोटर डायमिटर।',
      lines: [['step', <>Centrifugal stress limits the diameter</>]],
      ask: {
        q: 'Hydro alternator ma kun rotor prayog hunchha?',
        voice: 'हाइड्रो अल्टरनेटरमा कुन रोटर प्रयोग हुन्छ?',
        options: ['Salient pole', 'Cylindrical', 'Squirrel cage'],
        answer: 0,
        why: 'Bistarai speed: dherai pole chahincha.',
      },
    },
    {
      say: 'The stator carries a three-phase star-connected armature; damper bars on the pole faces damp hunting.',
      voice: 'द स्टेटर क्यारिज अ थ्री फेज स्टार कनेक्टेड आर्मेचर, ड्याम्पर बार्स अन द पोल फेसेज ड्याम्प हन्टिङ।',
      lines: [['step', <>Stator armature (star); damper winding</>]],
    },
    {
      say: 'The frequency is f equals P N over 120.',
      voice: 'द फ्रिक्वेन्सी इज एफ इक्वल्स पी एन ओभर वान ट्वेन्टी।',
      lines: [['eq', tex(String.raw`\boxed{f = \dfrac{PN}{120}}`)]],
    },
  ],
});

export const working61 = duo('Alternator ko working principle ra exciter', {
  draw: rotorFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Exciter le DC dincha, slip ring bata rotor ko field winding ma: rotor magnet bancha.',
      voice: 'एक्साइटरले डी सी दिन्छ, स्लिप रिङबाट रोटरको फिल्ड वाइन्डिङमा — रोटर म्याग्नेट बन्छ।',
      lines: [['h', <>Working principle</>], ['step', <>Exciter → slip rings → field winding → rotor poles</>]],
    },
    {
      say: 'Prime mover le rotor N rpm ma ghumaucha. Rotor ko flux stator conductors lai kaatcha.',
      voice: 'प्राइम मुभरले रोटर एन आर पी एममा घुमाउँछ। रोटरको फ्लक्स स्टेटर कन्डक्टर्सलाई काट्छ।',
      lines: [['step', <>Rotor driven at N rpm; its flux cuts the stator conductors</>]],
    },
    {
      say: 'Faraday le stator ma EMF induce huncha. N ra S palo-palo aauda EMF alternating.',
      voice: 'फाराडेले स्टेटरमा ई एम एफ इन्ड्युस हुन्छ। एन र एस पालो पालो आउँदा ई एम एफ अल्टरनेटिङ।',
      lines: [['step', <>EMF induced (Faraday); N and S in turn → alternating</>]],
    },
    {
      say: 'Tin winding 120 degree farak, tesaile tin EMF 120 degree farak: balanced three-phase.',
      voice: 'तीन वाइन्डिङ वान ट्वेन्टी डिग्री फरक, त्यसैले तीन ई एम एफ वान ट्वेन्टी डिग्री फरक — ब्यालेन्स्ड थ्री फेज।',
      lines: [['step', <>Windings 120° apart → balanced three-phase EMFs</>]],
      ask: {
        q: 'Euta pole pair pass huda EMF ko kati cycle?',
        voice: 'एउटा पोल पेयर पास हुँदा ई एम एफको कति साइकल?',
        options: ['1 cycle', '2 cycle', 'Aadha cycle'],
        answer: 0,
        why: 'N ra S, ek pair = ek cycle: f = PN/120.',
      },
    },
    {
      say: 'Rotating field ko phaida: kam insulation chahine rotor, halka slip ring ma sano DC, ra stator ko winding ramrari cool garna milcha.',
      voice: 'रोटेटिङ फिल्डको फाइदा — कम इन्सुलेसन चाहिने रोटर, हल्का स्लिप रिङमा सानो डी सी, र स्टेटरको वाइन्डिङ राम्ररी कुल गर्न मिल्छ।',
      lines: [['idea', <>Rotating field: low-voltage DC on slip rings; HV armature fixed, better insulated and cooled</>]],
    },
  ],
  lecturer: [
    {
      say: 'The exciter supplies DC through slip rings to the field winding, magnetising the rotor poles.',
      voice: 'द एक्साइटर सप्लाइज डी सी थ्रु स्लिप रिङ्स टु द फिल्ड वाइन्डिङ, म्याग्नेटाइजिङ द रोटर पोल्स।',
      lines: [['h', <>Working principle</>], ['step', <>DC excitation via slip rings</>]],
    },
    {
      say: 'The prime mover drives the rotor; its flux cuts the stationary armature conductors.',
      voice: 'द प्राइम मुभर ड्राइभ्स द रोटर, इट्स फ्लक्स कट्स द स्टेसनरी आर्मेचर कन्डक्टर्स।',
      lines: [['step', <>Rotating flux cuts the armature</>]],
    },
    {
      say: 'By Faraday’s law an alternating EMF is induced in each phase.',
      voice: 'बाइ फाराडेज ल एन अल्टरनेटिङ ई एम एफ इज इन्ड्युस्ड इन इच फेज।',
      lines: [['step', <>Alternating EMF in each phase</>]],
    },
    {
      say: 'The three phase windings, displaced 120 electrical degrees, give a balanced three-phase supply.',
      voice: 'द थ्री फेज वाइन्डिङ्स, डिस्प्लेस्ड वान ट्वेन्टी इलेक्ट्रिकल डिग्रिज, गिभ अ ब्यालेन्स्ड थ्री फेज सप्लाई।',
      lines: [['step', <>Balanced three-phase output</>]],
      ask: {
        q: '6-pole alternator 50 Hz dina kati speed ma ghumnu parcha?',
        voice: 'सिक्स पोल अल्टरनेटर फिफ्टी हर्ट्ज दिन कति स्पिडमा घुम्नु पर्छ?',
        options: ['1000 rpm', '1500 rpm', '3000 rpm'],
        answer: 0,
        why: 'N = 120f/P = 6000/6 = 1000 rpm.',
      },
    },
    {
      say: 'Advantages of the rotating field: only low-voltage DC on slip rings, and the high-voltage armature is fixed and easily insulated and cooled.',
      voice: 'एडभान्टेजेज अफ द रोटेटिङ फिल्ड — ओन्ली लो भोल्टेज डी सी अन स्लिप रिङ्स, एन्ड द हाई भोल्टेज आर्मेचर इज फिक्स्ड एन्ड इजिली इन्सुलेटेड एन्ड कुल्ड।',
      lines: [['step', <>Rotating field: LV DC on slip rings; fixed HV armature</>]],
    },
  ],
});

export const rotatingAnswer61 = answer('Model answer: rotating field ra stationary armature ka phaida', {
  draw: rotorFigure,
  viewBox: '0 0 360 222',
  papers: ['2071 Magh'],
  q: 'What are the advantages of rotating magnetic system and stationary armature system in ac machine?',
  read: {
    say: 'IOE 2071 Magh: what are the advantages of rotating magnetic system and stationary armature system in ac machine?',
    voice: 'आई ओ ई दुई हजार एकहत्तर माघ — ह्वाट आर द एडभान्टेजेज अफ रोटेटिङ म्याग्नेटिक सिस्टम एन्ड स्टेसनरी आर्मेचर सिस्टम इन ए सी मेसिन?',
  },
  points: [
    {
      node: <><H>Advantages</H><Pts items={[<><b>Output from fixed terminals:</b> the high-voltage, high-current armature output is taken directly, without sliding contacts</>, <><b>Easy insulation:</b> the stationary HV armature (11–33 kV) is easier to insulate than a rotating one</>]} /></>,
      say: 'The high-voltage, high-current output is taken from fixed terminals without sliding contacts, and the stationary high-voltage armature is easier to insulate.',
      voice: 'द हाई भोल्टेज, हाई करेन्ट आउटपुट इज टेकन फ्रम फिक्स्ड टर्मिनल्स विदआउट स्लाइडिङ कन्ट्याक्ट्स, एन्ड द स्टेसनरी हाई भोल्टेज आर्मेचर इज इजियर टु इन्सुलेट।',
    },
    {
      node: <><Pts items={[<><b>Small slip-ring duty:</b> only low-voltage DC excitation (≈ 125–600 V) passes through two slip rings</>, <><b>Lighter rotor:</b> the field winding is lighter, so higher speeds are possible</>]} /></>,
      say: 'Only a low-voltage DC excitation passes through two slip rings, and the lighter field winding on the rotor allows higher speeds.',
      voice: 'ओन्ली अ लो भोल्टेज डी सी एक्साइटेसन पासेज थ्रु टु स्लिप रिङ्स, एन्ड द लाइटर फिल्ड वाइन्डिङ अन द रोटर अलाउज हाइयर स्पिड्स।',
    },
    {
      node: <><Pts items={[<><b>Better cooling:</b> the armature, where most heat is produced, is on the stator and is easily cooled</>, <><b>More space:</b> the larger stator gives room for more conductors and insulation; three-phase needs only 3 output leads instead of 3 slip rings</>]} /></>,
      say: 'The armature, where most heat is produced, is on the stator and easily cooled; the larger stator has room for more conductors and insulation.',
      voice: 'द आर्मेचर, ह्वेयर मोस्ट हिट इज प्रोड्युस्ड, इज अन द स्टेटर एन्ड इजिली कुल्ड, द लार्जर स्टेटर ह्याज रुम फर मोर कन्डक्टर्स एन्ड इन्सुलेसन।',
      ask: {
        q: 'Alternator ma slip rings kati chahincha?',
        voice: 'अल्टरनेटरमा स्लिप रिङ्स कति चाहिन्छ?',
        options: ['2 (DC field ko lagi)', '3 (output ko lagi)', '6'],
        answer: 0,
        why: 'Rotor ma DC field matra: + ra − ko dui ring.',
      },
    },
  ],
});

export const salientAnswer61 = answer('Model answer: salient pole ra cylindrical rotor ko suitability', {
  draw: rotorFigure,
  viewBox: '0 0 360 222',
  papers: ['2067 Mangsir'],
  q: 'Salient pole alternators are suitable for low speed whereas cylindrical pole alternators for high speed.',
  read: {
    say: 'IOE 2067 Mangsir, justify: salient pole alternators are suitable for low speed whereas cylindrical pole alternators for high speed.',
    voice: 'आई ओ ई दुई हजार सतसट्ठी मंसिर, जस्टिफाइ — सेलियन्ट पोल अल्टरनेटर्स आर सुटेबल फर लो स्पिड ह्वेयरएज सिलिन्ड्रिकल पोल अल्टरनेटर्स फर हाई स्पिड।',
  },
  points: [
    {
      node: <><H>Speed and poles</H><K>{String.raw`\begin{aligned} f &= \dfrac{PN}{120} \;\Rightarrow\; P \\ &= \dfrac{120f}{N} \end{aligned}`}</K>For fixed f = 50 Hz, low N needs many poles; high N needs few (2 or 4).</>,
      say: 'From f equals P N over 120, for 50 hertz a low speed needs many poles and a high speed needs only two or four.',
      voice: 'फ्रम एफ इक्वल्स पी एन ओभर वान ट्वेन्टी, फर फिफ्टी हर्ट्ज अ लो स्पिड निड्स मेनी पोल्स एन्ड अ हाई स्पिड निड्स ओन्ली टु अर फोर।',
    },
    {
      node: <><H>Salient pole (low speed)</H><Pts items={[<>Many projecting poles fit only on a large-diameter rotor of short length (Fig. 6.1a)</>, <>At low speed (hydro, 100–1000 rpm) the windage and centrifugal stress are acceptable</>]} /></>,
      say: 'Salient pole: many projecting poles need a large diameter and short length. At low hydro speeds the windage and centrifugal stress are acceptable.',
      voice: 'सेलियन्ट पोल — मेनी प्रोजेक्टिङ पोल्स निड अ लार्ज डायमिटर एन्ड सर्ट लेन्थ। एट लो हाइड्रो स्पिड्स द विन्डेज एन्ड सेन्ट्रिफ्युगल स्ट्रेस आर एक्सेप्टेबल।',
    },
    {
      node: <><H>Cylindrical (high speed)</H><Pts items={[<>At 1500–3000 rpm projecting poles would cause large windage loss, noise and centrifugal stress</>, <>A smooth, small-diameter, long rotor is mechanically strong and gives a better (sinusoidal) EMF (Fig. 6.1b)</>]} /></>,
      say: 'Cylindrical: at 1500 to 3000 rpm projecting poles would cause windage loss, noise and stress. A smooth, small-diameter, long rotor is strong and gives a better EMF wave.',
      voice: 'सिलिन्ड्रिकल — एट पन्ध्र सय टु तीन हजार आर पी एम प्रोजेक्टिङ पोल्स वुड कज विन्डेज लस, नोइज, एन्ड स्ट्रेस। अ स्मुथ, स्मल डायमिटर, लङ रोटर इज स्ट्रङ एन्ड गिभ्स अ बेटर ई एम एफ वेभ।',
      ask: {
        q: 'Turbo-alternator ko rotor lamo ra patlo kina?',
        voice: 'टर्बो अल्टरनेटरको रोटर लामो र पातलो किन?',
        options: ['Centrifugal stress ghatauna', 'Dherai pole rakhna', 'Speed ghatauna'],
        answer: 0,
        why: 'Chito speed ma thulo diameter khatarnak.',
      },
    },
  ],
});

/* ── 6.2 EMF equation, pitch and distribution factors ───────────────── */
export const basics62 = duo('6.2 · Basic understanding: coil chhariyera rakhda voltage kina ali ghatcha?', {
  three: syncTour([
    { shot: 'front', show: [...SM, 'lamps'], spin: 0.35, field: 1, lamp: 0.8, focus: ['salient', 'winding'], labels: [['magnet coil ko agadi', 'winding']] },
    { spin: 0.8, lamp: 1, focus: ['salient'], labels: [['chito: dherai cycle', 'salient']] },
    { spin: 0.4, focus: ['fieldCoil'], labels: [['balio magnet: dherai voltage', 'fieldCoil']] },
    { focus: ['winding'], labels: [['dherai pheri: dherai voltage', 'winding']] },
    { shot: 'inside', focus: ['winding', 'stator'], labels: [['coil chhariyeka', 'winding']] },
    { focus: ['winding'], labels: [['dhakka ek-sathai hoina', 'winding']] },
    { focus: ['winding', 'salient'], labels: [['chhoto coil: chikno wave', 'winding']] },
    { shot: 'front', spin: 0.4, focus: null },
  ]),
  tutor: [
    {
      say: 'Rotor ko magnet stator ko coil agadi pass huncha, ra coil ma voltage aaucha.',
      voice: 'रोटरको म्याग्नेट स्टेटरको कोइल अगाडि पास हुन्छ, र कोइलमा भोल्टेज आउँछ।',
      lines: [['h', <>6.2 · Coil chhariyeda voltage kina ghatcha?</>], ['step', <>Magnet pass → coil ma voltage</>]],
    },
    {
      say: 'Chito ghumaye eksekend ma dherai cycle: frequency ra voltage dubai badhcha.',
      voice: 'छिटो घुमाए एक सेकेन्डमा धेरै साइकल — फ्रिक्वेन्सी र भोल्टेज दुवै बढ्छ।',
      lines: [['step', <>Chito → dherai cycle (frequency) + voltage</>]],
    },
    {
      say: 'Magnet balio, field current badhaye, voltage badhcha.',
      voice: 'म्याग्नेट बलियो, फिल्ड करेन्ट बढाए, भोल्टेज बढ्छ।',
      lines: [['step', <>Balio magnet → dherai voltage</>]],
    },
    {
      say: 'Coil ma dherai pheri bhaye pheri pheri ko voltage jodincha.',
      voice: 'कोइलमा धेरै फेरा भए फेरा फेराको भोल्टेज जोडिन्छ।',
      lines: [['step', <>Dherai pheri → dherai voltage</>]],
    },
    {
      say: 'Tara euta phase ko coil euta slot ma hoina, dherai slot ma chhariyeka hunchan.',
      voice: 'तर एउटा फेजको कोइल एउटा स्लटमा होइन, धेरै स्लटमा छरिएका हुन्छन्।',
      lines: [['step', <>Euta phase ko coil dherai slot ma chhariyeko</>]],
    },
    {
      say: 'Magnet ek-ek slot ma ali farak samaya ma pugcha, tesaile tini ko dhakka ek-sathai hudaina, ra jamma ali kam huncha.',
      voice: 'म्याग्नेट एक एक स्लटमा अलि फरक समयमा पुग्छ, त्यसैले तिनीको धक्का एकसाथै हुँदैन, र जम्मा अलि कम हुन्छ।',
      lines: [['step', <>Ek-sathai hoina → jamma ali kam (distribution)</>]],
      ask: {
        q: 'Chhariyeka coil ko voltage jamma garda kina ali kam huncha?',
        voice: 'छरिएका कोइलको भोल्टेज जम्मा गर्दा किन अलि कम हुन्छ?',
        options: ['Ek-sathai peak ma pugdainan', 'Tar paglincha', 'Magnet kamjor huncha'],
        answer: 0,
        why: 'Slot farak: EMF haru phase ma farak, vector sum sano.',
      },
    },
    {
      say: 'Coil ali chhoto banaye pani voltage ali ghatcha, tara wave chikno ra tama bachcha.',
      voice: 'कोइल अलि छोटो बनाए पनि भोल्टेज अलि घट्छ, तर वेभ चिल्लो र तामा बच्छ।',
      lines: [['step', <>Chhoto coil → ali kam voltage, tara chikno wave</>]],
    },
    {
      say: 'Saransha: speed, magnet ra pheri le voltage badhcha; chhariyeko ra chhoto coil le ali ghataucha tara wave ramro.',
      voice: 'सारांश — स्पिड, म्याग्नेट, र फेराले भोल्टेज बढ्छ, छरिएको र छोटो कोइलले अलि घटाउँछ तर वेभ राम्रो।',
      lines: [['idea', <>Speed + magnet + pheri → voltage · chhariyeko + chhoto → ali kam, chikno wave</>]],
    },
  ],
  lecturer: [
    {
      say: 'Rotor flux stator coils pass garda EMF induce huncha.',
      voice: 'रोटर फ्लक्स स्टेटर कोइल्स पास गर्दा ई एम एफ इन्ड्युस हुन्छ।',
      lines: [['h', <>6.2 · Factors affecting the EMF</>], ['step', <>Rotor flux passing the coils → EMF</>]],
    },
    {
      say: 'Speed badhda frequency ra EMF dubai badhchan.',
      voice: 'स्पिड बढ्दा फ्रिक्वेन्सी र ई एम एफ दुवै बढ्छन्।',
      lines: [['step', <>Speed → frequency and EMF</>]],
    },
    {
      say: 'Field current le flux per pole ra EMF badhcha.',
      voice: 'फिल्ड करेन्टले फ्लक्स पर पोल र ई एम एफ बढ्छ।',
      lines: [['step', <>Field current → flux → EMF</>]],
    },
    {
      say: 'Turns per phase badhaye EMF badhcha.',
      voice: 'टर्न्स पर फेज बढाए ई एम एफ बढ्छ।',
      lines: [['step', <>Turns per phase → EMF</>]],
    },
    {
      say: 'Pratyek phase ko winding dherai slots ma distributed huncha.',
      voice: 'प्रत्येक फेजको वाइन्डिङ धेरै स्लट्समा डिस्ट्रिब्युटेड हुन्छ।',
      lines: [['step', <>Distributed winding over several slots</>]],
    },
    {
      say: 'Slot EMFs phase ma displaced hunchan; phasor sum arithmetic sum bhanda kam: distribution factor.',
      voice: 'स्लट ई एम एफ्स फेजमा डिस्प्लेस्ड हुन्छन्, फेजर सम एरिथमेटिक सम भन्दा कम — डिस्ट्रिब्युसन फ्याक्टर।',
      lines: [['step', <>Phasor sum less than arithmetic sum: distribution factor</>]],
      ask: {
        q: 'Distribution factor ko value kati samma huncha?',
        voice: 'डिस्ट्रिब्युसन फ्याक्टरको भ्यालु कतिसम्म हुन्छ?',
        options: ['1 bhanda kam', '1 bhanda badhi', 'Sadhai zero'],
        answer: 0,
        why: 'Vector sum arithmetic sum bhanda thulo hudaina.',
      },
    },
    {
      say: 'Short-pitched coil le EMF alikati ghataucha tara harmonics ra copper ghataucha: pitch factor.',
      voice: 'सर्ट पिच्ड कोइलले ई एम एफ अलिकति घटाउँछ तर हार्मोनिक्स र कपर घटाउँछ — पिच फ्याक्टर।',
      lines: [['step', <>Short pitch: pitch factor; fewer harmonics, less copper</>]],
    },
    {
      say: 'Saransha: EMF frequency, flux ra turns sanga badhcha, ra pitch ra distribution factors le ali ghataucha.',
      voice: 'सारांश — ई एम एफ फ्रिक्वेन्सी, फ्लक्स, र टर्न्ससँग बढ्छ, र पिच र डिस्ट्रिब्युसन फ्याक्टर्सले अलि घटाउँछ।',
      lines: [['idea', <>EMF rises with frequency, flux and turns · reduced slightly by pitch and distribution factors</>]],
    },
  ],
});

export const factors62 = duo('Pitch factor ra distribution factor', {
  draw: factorFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Figure 6.2: full-pitch coil ko dui side 180 electrical degree tadha: dubai EMF sidhai jodincha.',
      voice: 'फिगर सिक्स पोइन्ट टु — फुल पिच कोइलको दुई साइड एक सय असी इलेक्ट्रिकल डिग्री टाढा — दुवै ई एम एफ सिधै जोडिन्छ।',
      lines: [['h', <>Winding factors</>], ['step', <>Full pitch: coil span = 180° electrical</>]],
    },
    {
      say: 'Coil alpha le chhoto bhaye dui side ko EMF alpha le farak: resultant ali kam. K p equals cos alpha over 2.',
      voice: 'कोइल अल्फाले छोटो भए दुई साइडको ई एम एफ अल्फाले फरक — रिजल्टेन्ट अलि कम। के पी इक्वल्स कस अल्फा ओभर टु।',
      lines: [['eq', tex(String.raw`\boxed{K_p = \cos\dfrac{\alpha}{2}}`)]],
      ask: {
        q: 'Coil 30° le chhoto bhaye pitch factor kati?',
        voice: 'कोइल थर्टी डिग्रीले छोटो भए पिच फ्याक्टर कति?',
        options: ['cos 15° = 0.966', 'cos 30° = 0.866', '1'],
        answer: 0,
        why: 'Kp = cos(α/2) = cos 15°.',
      },
    },
    {
      say: 'Distribution: m slots per pole per phase, slot angle beta equals 180 over slots per pole.',
      voice: 'डिस्ट्रिब्युसन — एम स्लट्स पर पोल पर फेज, स्लट एङ्गल बिटा इक्वल्स एक सय असी ओभर स्लट्स पर पोल।',
      lines: [['step', <>m = slots per pole per phase, β = 180°/(slots per pole)</>]],
    },
    {
      say: 'm ota slot EMF beta beta farak; vector sum over arithmetic sum: K d equals sin m beta over 2, over m sin beta over 2.',
      voice: 'एम ओटा स्लट ई एम एफ बिटा बिटा फरक, भेक्टर सम ओभर एरिथमेटिक सम — के डी इक्वल्स साइन एम बिटा ओभर टु, ओभर एम साइन बिटा ओभर टु।',
      lines: [['eq', tex(String.raw`\boxed{K_d = \dfrac{\sin(m\beta/2)}{m\sin(\beta/2)}}`)]],
    },
    {
      say: 'Dubai factors ek bhanda kam, tara harmonics ghatcha ra EMF sine wave jasto. Winding factor K w equals K p K d.',
      voice: 'दुवै फ्याक्टर्स एक भन्दा कम, तर हार्मोनिक्स घट्छ, र ई एम एफ साइन वेभ जस्तो। वाइन्डिङ फ्याक्टर के डब्लु इक्वल्स के पी के डी।',
      lines: [['idea', <>K<sub>w</sub> = K<sub>p</sub>K<sub>d</sub> &lt; 1; harmonics reduced, EMF nearly sinusoidal</>]],
    },
  ],
  lecturer: [
    {
      say: 'A full-pitch coil spans 180 electrical degrees and its side EMFs add arithmetically, Figure 6.2.',
      voice: 'अ फुल पिच कोइल स्प्यान्स एक सय असी इलेक्ट्रिकल डिग्रिज एन्ड इट्स साइड ई एम एफ्स एड एरिथमेटिकल्ली, फिगर सिक्स पोइन्ट टु।',
      lines: [['h', <>Pitch and distribution factors</>], ['step', <>Full pitch: 180° electrical</>]],
    },
    {
      say: 'For a coil short-pitched by alpha, the pitch factor is cos alpha over 2.',
      voice: 'फर अ कोइल सर्ट पिच्ड बाइ अल्फा, द पिच फ्याक्टर इज कस अल्फा ओभर टु।',
      lines: [['eq', tex(String.raw`\boxed{K_p = \cos\dfrac{\alpha}{2}}`)]],
      ask: {
        q: 'Full-pitch coil ko pitch factor kati?',
        voice: 'फुल पिच कोइलको पिच फ्याक्टर कति?',
        options: ['1', '0', '0.5'],
        answer: 0,
        why: 'α = 0: cos 0 = 1.',
      },
    },
    {
      say: 'Let m be the slots per pole per phase and beta the slot angle.',
      voice: 'लेट एम बी द स्लट्स पर पोल पर फेज एन्ड बिटा द स्लट एङ्गल।',
      lines: [['step', <>Let m, β = 180°/(slots per pole)</>]],
    },
    {
      say: 'The distribution factor is the vector sum over the arithmetic sum of the m slot EMFs.',
      voice: 'द डिस्ट्रिब्युसन फ्याक्टर इज द भेक्टर सम ओभर द एरिथमेटिक सम अफ द एम स्लट ई एम एफ्स।',
      lines: [['eq', tex(String.raw`\boxed{K_d = \dfrac{\sin(m\beta/2)}{m\sin(\beta/2)}}`)]],
    },
    {
      say: 'The winding factor is K p times K d, less than one, but harmonics are reduced.',
      voice: 'द वाइन्डिङ फ्याक्टर इज के पी टाइम्स के डी, लेस दयान वान, बट हार्मोनिक्स आर रिड्युस्ड।',
      lines: [['step', <>K<sub>w</sub> = K<sub>p</sub>K<sub>d</sub> &lt; 1; better waveform</>]],
    },
  ],
});

export const emf62 = duo('Derivation: alternator ko EMF equation', {
  draw: factorFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Let P poles, phi flux per pole, N rpm, ra phase ma T turns, Z equals 2 T conductors.',
      voice: 'लेट पी पोल्स, फाइ फ्लक्स पर पोल, एन आर पी एम, र फेजमा टी टर्न्स, जेड इक्वल्स टु टी कन्डक्टर्स।',
      lines: [['h', <>EMF equation of an alternator</>], ['step', <>Let P, φ, N, T turns per phase (Z = 2T conductors)</>]],
    },
    {
      say: 'Euta conductor le ek revolution ma P phi kaatcha, 60 over N second ma. Average EMF P phi N over 60.',
      voice: 'एउटा कन्डक्टरले एक रिभोल्युसनमा पी फाइ काट्छ, सिक्स्टी ओभर एन सेकेन्डमा। एभरेज ई एम एफ पी फाइ एन ओभर सिक्स्टी।',
      lines: [['eq', tex(String.raw`\begin{aligned} e_{av} &= \dfrac{P\phi N}{60} \\ &= 2f\phi \quad \Big(f = \tfrac{PN}{120}\Big) \end{aligned}`)]],
    },
    {
      say: 'Euta turn ma dui conductor: 4 f phi. RMS ko lagi form factor 1.11 le gun: 4.44 f phi.',
      voice: 'एउटा टर्नमा दुई कन्डक्टर — फोर एफ फाइ। आर एम एसको लागि फर्म फ्याक्टर वान पोइन्ट वान वानले गुन — फोर पोइन्ट फोर फोर एफ फाइ।',
      lines: [['eq', tex(String.raw`\begin{aligned} E_{turn} &= 1.11\times 4f\phi \\ &= 4.44 f\phi \end{aligned}`)]],
    },
    {
      say: 'T turns ko lagi 4.44 f phi T. Pitch ra distribution factor le gun garda pura equation.',
      voice: 'टी टर्न्सको लागि फोर पोइन्ट फोर फोर एफ फाइ टी। पिच र डिस्ट्रिब्युसन फ्याक्टरले गुन गर्दा पूरा इक्वेसन।',
      lines: [['eq', tex(String.raw`\boxed{E_{ph} = 4.44\,K_pK_d\,f\,\phi\,T}`)]],
      ask: {
        q: 'Transformer ko EMF equation sanga yo kasari farak?',
        voice: 'ट्रान्सफर्मरको ई एम एफ इक्वेसनसँग यो कसरी फरक?',
        options: ['Kp ra Kd thapiyeko', 'Frequency hatayeko', '4.44 ko satta 2.22'],
        answer: 0,
        why: 'Alternator ko winding distributed ra short-pitched huncha.',
      },
    },
    {
      say: 'Star ma line EMF equals root 3 E ph.',
      voice: 'स्टारमा लाइन ई एम एफ इक्वल्स रुट थ्री ई पी एच।',
      lines: [['idea', <>Star connection: <K>{String.raw`E_L = \sqrt3\,E_{ph}`}</K></>]],
    },
  ],
  lecturer: [
    {
      say: 'Let P be the poles, phi the flux per pole, N the speed and T the turns per phase.',
      voice: 'लेट पी बी द पोल्स, फाइ द फ्लक्स पर पोल, एन द स्पिड, एन्ड टी द टर्न्स पर फेज।',
      lines: [['h', <>EMF equation</>], ['step', <>Let P, φ, N, T per phase</>]],
    },
    {
      say: 'The average EMF per conductor is P phi N over 60, which equals 2 f phi.',
      voice: 'द एभरेज ई एम एफ पर कन्डक्टर इज पी फाइ एन ओभर सिक्स्टी, ह्विच इक्वल्स टु एफ फाइ।',
      lines: [['eq', tex(String.raw`\begin{aligned} e_{av} &= \dfrac{P\phi N}{60} \\ &= 2f\phi \quad \Big(f = \tfrac{PN}{120}\Big) \end{aligned}`)]],
    },
    {
      say: 'Per turn, the RMS EMF with form factor 1.11 is 4.44 f phi.',
      voice: 'पर टर्न, द आर एम एस ई एम एफ विद फर्म फ्याक्टर वान पोइन्ट वान वान इज फोर पोइन्ट फोर फोर एफ फाइ।',
      lines: [['eq', tex(String.raw`\begin{aligned} E_{turn} &= 1.11\times 4f\phi \\ &= 4.44 f\phi \end{aligned}`)]],
    },
    {
      say: 'For T turns with the pitch and distribution factors, E ph equals 4.44 K p K d f phi T.',
      voice: 'फर टी टर्न्स विद द पिच एन्ड डिस्ट्रिब्युसन फ्याक्टर्स, ई पी एच इक्वल्स फोर पोइन्ट फोर फोर के पी के डी एफ फाइ टी।',
      lines: [['eq', tex(String.raw`\boxed{E_{ph} = 4.44\,K_pK_d\,f\,\phi\,T}`)]],
      ask: {
        q: 'EMF equation ma 1.11 kun factor ho?',
        voice: 'ई एम एफ इक्वेसनमा वान पोइन्ट वान वान कुन फ्याक्टर हो?',
        options: ['Form factor', 'Pitch factor', 'Power factor'],
        answer: 0,
        why: 'Sine wave: rms/average = 1.11.',
      },
    },
    {
      say: 'For a star connection the line EMF is root 3 times the phase EMF.',
      voice: 'फर अ स्टार कनेक्सन द लाइन ई एम एफ इज रुट थ्री टाइम्स द फेज ई एम एफ।',
      lines: [['step', <>Star: <K>{String.raw`E_L = \sqrt3\,E_{ph}`}</K></>]],
    },
  ],
});

export const emfAnswer62 = answer('Model answer: alternator ko EMF equation', {
  draw: factorFigure,
  viewBox: '0 0 360 222',
  papers: ['2078 Baishakh'],
  q: 'Derive emf equation of an alternator.',
  read: {
    say: 'IOE 2078 Baishakh: derive emf equation of an alternator.',
    voice: 'आई ओ ई दुई हजार अठहत्तर वैशाख — डिराइभ ई एम एफ इक्वेसन अफ एन अल्टरनेटर।',
  },
  points: [
    {
      node: <><H>Let</H><Pts items={[<>P = poles, φ = flux per pole (Wb), N = speed (rpm)</>, <>Z = conductors per phase, T = Z/2 turns per phase; f = PN/120</>]} /></>,
      say: 'Let P be the poles, phi the flux per pole, N the speed, Z the conductors per phase, and T equal Z over 2 the turns per phase.',
      voice: 'लेट पी बी द पोल्स, फाइ द फ्लक्स पर पोल, एन द स्पिड, जेड द कन्डक्टर्स पर फेज, एन्ड टी इक्वल जेड ओभर टु द टर्न्स पर फेज।',
    },
    {
      node: <><Pts items={[<>Flux cut by one conductor per revolution = Pφ in 60/N s</>]} /><K>{String.raw`\begin{aligned} e_{av} &= \dfrac{P\phi N}{60} \\ &= 2f\phi\ \text{(per conductor)} \end{aligned}`}</K></>,
      say: 'One conductor cuts P phi per revolution in 60 over N seconds, so the average EMF per conductor is 2 f phi.',
      voice: 'वान कन्डक्टर कट्स पी फाइ पर रिभोल्युसन इन सिक्स्टी ओभर एन सेकेन्ड्स, सो द एभरेज ई एम एफ पर कन्डक्टर इज टु एफ फाइ।',
    },
    {
      page: true,
      node: <><K>{String.raw`\begin{aligned} E_{av,ph} &= 2f\phi Z \\ &= 4f\phi T \\ E_{ph} &= 1.11\times4f\phi T \\ &= 4.44\,f\phi T \end{aligned}`}</K>(form factor 1.11 for a sine wave)</>,
      say: 'Per phase the average EMF is 4 f phi T; with form factor 1.11, the RMS EMF is 4.44 f phi T.',
      voice: 'पर फेज द एभरेज ई एम एफ इज फोर एफ फाइ टी, विद फर्म फ्याक्टर वान पोइन्ट वान वान, द आर एम एस ई एम एफ इज फोर पोइन्ट फोर फोर एफ फाइ टी।',
    },
    {
      node: <><H>With winding factors</H><K>{String.raw`\boxed{E_{ph} = 4.44\,K_pK_d\,f\,\phi\,T}`}</K><K>{String.raw`K_p = \cos\tfrac{\alpha}{2}, \quad K_d = \dfrac{\sin(m\beta/2)}{m\sin(\beta/2)}`}</K></>,
      say: 'With the pitch factor cos alpha over 2 and the distribution factor sin m beta over 2 by m sin beta over 2, E ph equals 4.44 K p K d f phi T.',
      voice: 'विद द पिच फ्याक्टर कस अल्फा ओभर टु एन्ड द डिस्ट्रिब्युसन फ्याक्टर साइन एम बिटा ओभर टु बाइ एम साइन बिटा ओभर टु, ई पी एच इक्वल्स फोर पोइन्ट फोर फोर के पी के डी एफ फाइ टी।',
      ask: {
        q: '4-pole alternator 1500 rpm ma kati frequency dincha?',
        voice: 'फोर पोल अल्टरनेटर पन्ध्र सय आर पी एममा कति फ्रिक्वेन्सी दिन्छ?',
        options: ['50 Hz', '60 Hz', '25 Hz'],
        answer: 0,
        why: 'f = PN/120 = 4 × 1500/120 = 50 Hz.',
      },
    },
  ],
});

/* ── 6.3 Armature reaction, alternator on load ───────────────────────── */
export const basics63 = duo('6.3 · Basic understanding: load anusar alternator ko voltage kina badlincha?', {
  three: syncTour([
    { shot: 'lamps', show: GENSET, spin: 0.4, field: 1, lamp: 0, focus: ['lamps'], labels: [['no load', 'lamps']] },
    { lamp: 1, focus: ['winding', 'lamps'], labels: [['load: stator ma current', 'winding']] },
    { shot: 'front', focus: ['winding'], labels: [['stator ko aafnai magnet', 'winding']] },
    { focus: ['winding', 'salient'], labels: [['bulb: chheu bata', 'salient']] },
    { field: 0.55, lamp: 0.6, focus: ['salient', 'fieldCoil'], labels: [['motor: kamjor banaucha', 'fieldCoil']] },
    { field: 1, lamp: 1, focus: ['salient', 'fieldCoil'], labels: [['capacitor: balio banaucha', 'fieldCoil']] },
    { shot: 'exciter', field: 0.9, focus: ['exciter', 'sliprings'], labels: [['field current milaune', 'exciter']] },
    { shot: 'wide', field: 1, lamp: 1, focus: null },
  ]),
  tutor: [
    {
      say: 'No load ma bulb haru off, stator ma current chaina. Voltage rotor ko magnet le matra tay garcha.',
      voice: 'नो लोडमा बल्बहरू अफ, स्टेटरमा करेन्ट छैन। भोल्टेज रोटरको म्याग्नेटले मात्र तय गर्छ।',
      lines: [['h', <>6.3 · Load anusar voltage kina badlincha?</>], ['step', <>No load: rotor ko magnet le matra voltage</>]],
    },
    {
      say: 'Load lagaye stator ka coil ma current bagcha.',
      voice: 'लोड लगाए स्टेटरका कोइलमा करेन्ट बग्छ।',
      lines: [['step', <>Load → stator ma current</>]],
    },
    {
      say: 'Tyo current le stator ma aafnai magnet banaucha. Yo magnet rotor ko magnet lai chalaucha: armature reaction.',
      voice: 'त्यो करेन्टले स्टेटरमा आफ्नै म्याग्नेट बनाउँछ। यो म्याग्नेट रोटरको म्याग्नेटलाई चलाउँछ — आर्मेचर रियाक्सन।',
      lines: [['step', <>Stator ko aafnai magnet → armature reaction</>]],
    },
    {
      say: 'Bulb jasto load ma stator ko magnet rotor ko magnet ko chheu bata lagcha: magnet bango huncha, tara kamjor hudaina.',
      voice: 'बल्ब जस्तो लोडमा स्टेटरको म्याग्नेट रोटरको म्याग्नेटको छेउबाट लाग्छ — म्याग्नेट बाङ्गो हुन्छ, तर कमजोर हुँदैन।',
      lines: [['step', <>Bulb (resistive): chheu bata → bango (cross-magnetising)</>]],
    },
    {
      say: 'Motor, fan jasto load ma stator ko magnet rotor ko ulto lagcha: magnet kamjor, voltage jharcha.',
      voice: 'मोटर, फ्यान जस्तो लोडमा स्टेटरको म्याग्नेट रोटरको उल्टो लाग्छ — म्याग्नेट कमजोर, भोल्टेज झर्छ।',
      lines: [['step', <>Motor (inductive): ulto → kamjor → voltage jharcha</>]],
    },
    {
      say: 'Ascharya: capacitor load ma stator ko magnet le rotor lai saath dincha: voltage no load bhanda pani badhcha!',
      voice: 'आश्चर्य — क्यापासिटर लोडमा स्टेटरको म्याग्नेटले रोटरलाई साथ दिन्छ — भोल्टेज नो लोडभन्दा पनि बढ्छ!',
      lines: [['step', <>Capacitor (leading): saath dincha → voltage badhcha</>]],
      ask: {
        q: 'Capacitive load ma alternator ko terminal voltage k huna sakcha?',
        voice: 'क्यापासिटिभ लोडमा अल्टरनेटरको टर्मिनल भोल्टेज के हुन सक्छ?',
        options: ['No-load voltage bhanda badhi', 'Sadhai kam', 'Zero'],
        answer: 0,
        why: 'Leading current ko armature reaction le field lai balio banaucha.',
      },
    },
    {
      say: 'Powerhouse ma voltage ustai rakhna exciter ko field current load anusar milaincha.',
      voice: 'पावरहाउसमा भोल्टेज उस्तै राख्न एक्साइटरको फिल्ड करेन्ट लोड अनुसार मिलाइन्छ।',
      lines: [['step', <>Voltage ustai rakhna: field current milaune</>]],
    },
    {
      say: 'Saransha: load ko current le aafnai magnet; bulb ma bango, motor ma kamjor, capacitor ma balio.',
      voice: 'सारांश — लोडको करेन्टले आफ्नै म्याग्नेट, बल्बमा बाङ्गो, मोटरमा कमजोर, क्यापासिटरमा बलियो।',
      lines: [['idea', <>Bulb: bango · motor: kamjor (voltage ↓) · capacitor: balio (voltage ↑)</>]],
    },
  ],
  lecturer: [
    {
      say: 'No load ma armature current zero; terminal voltage excitation EMF barabar.',
      voice: 'नो लोडमा आर्मेचर करेन्ट जिरो, टर्मिनल भोल्टेज एक्साइटेसन ई एम एफ बराबर।',
      lines: [['h', <>6.3 · Armature reaction</>], ['step', <>No load: V equals the excitation EMF</>]],
    },
    {
      say: 'Load ma armature current bagcha.',
      voice: 'लोडमा आर्मेचर करेन्ट बग्छ।',
      lines: [['step', <>On load: armature current flows</>]],
    },
    {
      say: 'Armature current ko flux le main field flux ma parne asar lai armature reaction bhanincha.',
      voice: 'आर्मेचर करेन्टको फ्लक्सले मेन फिल्ड फ्लक्समा पर्ने असरलाई आर्मेचर रियाक्सन भनिन्छ।',
      lines: [['step', <>Effect of armature flux on main flux: armature reaction</>]],
    },
    {
      say: 'Unity pf ma armature reaction cross-magnetising huncha; flux distort huncha.',
      voice: 'युनिटी पी एफमा आर्मेचर रियाक्सन क्रस म्याग्नेटाइजिङ हुन्छ, फ्लक्स डिस्टर्ट हुन्छ।',
      lines: [['step', <>Unity pf: cross-magnetising</>]],
    },
    {
      say: 'Lagging pf ma demagnetising; terminal voltage ghatcha.',
      voice: 'ल्यागिङ पी एफमा डिम्याग्नेटाइजिङ, टर्मिनल भोल्टेज घट्छ।',
      lines: [['step', <>Lagging pf: demagnetising, V falls</>]],
    },
    {
      say: 'Leading pf ma magnetising; terminal voltage excitation EMF bhanda badhi huna sakcha.',
      voice: 'लिडिङ पी एफमा म्याग्नेटाइजिङ, टर्मिनल भोल्टेज एक्साइटेसन ई एम एफभन्दा बढी हुन सक्छ।',
      lines: [['step', <>Leading pf: magnetising, V may exceed E</>]],
      ask: {
        q: 'Lagging pf ma armature reaction ko nature k?',
        voice: 'ल्यागिङ पी एफमा आर्मेचर रियाक्सनको नेचर के?',
        options: ['Demagnetising', 'Magnetising', 'Cross-magnetising'],
        answer: 0,
        why: 'Zero pf lagging ma armature MMF main field ko thik ulto.',
      },
    },
    {
      say: 'Constant terminal voltage ko lagi excitation adjust garincha.',
      voice: 'कन्स्टेन्ट टर्मिनल भोल्टेजको लागि एक्साइटेसन एडजस्ट गरिन्छ।',
      lines: [['step', <>Excitation adjusted to hold V constant</>]],
    },
    {
      say: 'Saransha: armature reaction ko asar pf ma depend garcha: cross, demagnetising wa magnetising.',
      voice: 'सारांश — आर्मेचर रियाक्सनको असर पी एफमा डिपेन्ड गर्छ — क्रस, डिम्याग्नेटाइजिङ, वा म्याग्नेटाइजिङ।',
      lines: [['idea', <>Unity: cross · lagging: demagnetising · leading: magnetising</>]],
    },
  ],
});

export const ar63 = duo('Armature reaction: unity, lagging ra leading pf', {
  draw: altPhasorFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Armature current ko MMF le main field MMF ma parne asar: armature reaction. Asar current ko phase ma depend.',
      voice: 'आर्मेचर करेन्टको एम एम एफले मेन फिल्ड एम एम एफमा पर्ने असर — आर्मेचर रियाक्सन। असर करेन्टको फेजमा डिपेन्ड।',
      lines: [['h', <>Armature reaction</>], ['step', <>Effect of the armature MMF on the main-field MMF, set by the pf</>]],
    },
    {
      say: 'Unity pf: current E sanga in phase; armature flux main flux sanga 90 degree: cross-magnetising, flux distort.',
      voice: 'युनिटी पी एफ — करेन्ट ई सँग इन फेज, आर्मेचर फ्लक्स मेन फ्लक्ससँग नाइन्टी डिग्री — क्रस म्याग्नेटाइजिङ, फ्लक्स डिस्टर्ट।',
      lines: [['step', <>Unity pf: armature flux at 90° to the main flux → cross-magnetising</>]],
    },
    {
      say: 'Zero pf lagging: current 90 degree pachhi; armature flux main flux ko ulto: demagnetising, voltage ghatcha.',
      voice: 'जिरो पी एफ ल्यागिङ — करेन्ट नाइन्टी डिग्री पछि, आर्मेचर फ्लक्स मेन फ्लक्सको उल्टो — डिम्याग्नेटाइजिङ, भोल्टेज घट्छ।',
      lines: [['step', <>Zero pf lagging: directly opposes → demagnetising, V ↓</>]],
      ask: {
        q: 'Inductive load ma alternator ko field current kina badhaunu parcha?',
        voice: 'इन्डक्टिभ लोडमा अल्टरनेटरको फिल्ड करेन्ट किन बढाउनु पर्छ?',
        options: ['Demagnetising armature reaction le flux ghataucha', 'Frequency ghatcha', 'Speed badhcha'],
        answer: 0,
        why: 'Ghateko flux pura garna excitation badhaune.',
      },
    },
    {
      say: 'Zero pf leading: current 90 degree aghi; armature flux main flux sanga: magnetising, voltage badhcha.',
      voice: 'जिरो पी एफ लिडिङ — करेन्ट नाइन्टी डिग्री अघि, आर्मेचर फ्लक्स मेन फ्लक्ससँग — म्याग्नेटाइजिङ, भोल्टेज बढ्छ।',
      lines: [['step', <>Zero pf leading: aids → magnetising, V ↑</>]],
    },
    {
      say: 'Yo asar lai reactance X a le dekhaincha; leakage X l sanga jodda synchronous reactance X s.',
      voice: 'यो असरलाई रियाक्टेन्स एक्स एले देखाइन्छ, लिकेज एक्स एल सँग जोड्दा सिन्क्रोनस रियाक्टेन्स एक्स एस।',
      lines: [['eq', tex(String.raw`\boxed{X_s = X_l + X_a}, \quad Z_s = R_a + jX_s`)]],
    },
  ],
  lecturer: [
    {
      say: 'Armature reaction is the effect of the armature flux on the main field flux; it depends on the load power factor.',
      voice: 'आर्मेचर रियाक्सन इज द इफेक्ट अफ द आर्मेचर फ्लक्स अन द मेन फिल्ड फ्लक्स, इट डिपेन्ड्स अन द लोड पावर फ्याक्टर।',
      lines: [['h', <>Armature reaction at different power factors</>], ['step', <>Depends on load pf</>]],
    },
    {
      say: 'At unity power factor the armature flux is perpendicular to the main flux: cross-magnetising.',
      voice: 'एट युनिटी पावर फ्याक्टर द आर्मेचर फ्लक्स इज पर्पेन्डिकुलर टु द मेन फ्लक्स — क्रस म्याग्नेटाइजिङ।',
      lines: [['step', <>Unity pf: cross-magnetising</>]],
    },
    {
      say: 'At zero power factor lagging it directly opposes the main flux: demagnetising.',
      voice: 'एट जिरो पावर फ्याक्टर ल्यागिङ इट डाइरेक्ट्ली अपोजेज द मेन फ्लक्स — डिम्याग्नेटाइजिङ।',
      lines: [['step', <>Zero pf lagging: demagnetising</>]],
      ask: {
        q: 'Leading pf ma armature reaction le terminal voltage lai k garcha?',
        voice: 'लिडिङ पी एफमा आर्मेचर रियाक्सनले टर्मिनल भोल्टेजलाई के गर्छ?',
        options: ['Badhaucha', 'Ghataucha', 'Asar gardaina'],
        answer: 0,
        why: 'Magnetising effect.',
      },
    },
    {
      say: 'At zero power factor leading it aids the main flux: magnetising.',
      voice: 'एट जिरो पावर फ्याक्टर लिडिङ इट एड्स द मेन फ्लक्स — म्याग्नेटाइजिङ।',
      lines: [['step', <>Zero pf leading: magnetising</>]],
    },
    {
      say: 'The effect is represented by a reactance X a; with leakage X l it gives the synchronous reactance X s.',
      voice: 'द इफेक्ट इज रिप्रिजेन्टेड बाइ अ रियाक्टेन्स एक्स ए, विद लिकेज एक्स एल इट गिभ्स द सिन्क्रोनस रियाक्टेन्स एक्स एस।',
      lines: [['eq', tex(String.raw`\boxed{X_s = X_l + X_a}, \quad Z_s = R_a + jX_s`)]],
    },
  ],
});

export const load63 = duo('Derivation: alternator on load ko phasor ra regulation', {
  draw: altPhasorFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Figure 6.3: V reference, current I phi angle le lag.',
      voice: 'फिगर सिक्स पोइन्ट थ्री — भी रेफरेन्स, करेन्ट आई फाइ एङ्गलले ल्याग।',
      lines: [['h', <>Alternator on load</>], ['step', <>V reference; I lags by φ</>]],
    },
    {
      say: 'E equals V plus I R a plus j I X s: I R a I sanga, I X s I bhanda 90 degree aghi.',
      voice: 'ई इक्वल्स भी प्लस आई आर ए प्लस जे आई एक्स एस — आई आर ए आई सँग, आई एक्स एस आई भन्दा नाइन्टी डिग्री अघि।',
      lines: [['eq', tex(String.raw`\boxed{\vec E = \vec V + \vec I(R_a + jX_s)}`)]],
    },
    {
      say: 'Lagging pf ma magnitude: E equals root of V cos phi plus I R a square, plus V sin phi plus I X s square.',
      voice: 'ल्यागिङ पी एफमा म्याग्निच्युड — ई इक्वल्स रुट अफ भी कस फाइ प्लस आई आर ए स्क्वायर, प्लस भी साइन फाइ प्लस आई एक्स एस स्क्वायर।',
      lines: [['eq', tex(String.raw`E = \sqrt{(V\cos\varphi + IR_a)^2 + (V\sin\varphi \pm IX_s)^2}`)]],
      ask: {
        q: 'Leading pf ma formula ma kun chinh pharkincha?',
        voice: 'लिडिङ पी एफमा फर्मुलामा कुन चिन्ह फर्किन्छ?',
        options: ['V sinφ − I Xs', 'V cosφ − I Ra', 'Kunai pani hoina'],
        answer: 0,
        why: 'Leading: sin φ negative, tesaile IXs term ghatcha.',
      },
    },
    {
      say: 'E ra V bich ko angle delta, load angle.',
      voice: 'ई र भी बीचको एङ्गल डेल्टा, लोड एङ्गल।',
      lines: [['step', <>δ: load (power) angle between E and V</>]],
    },
    {
      say: 'Regulation equals E minus V over V. Lagging ma positive, leading ma negative huna sakcha.',
      voice: 'रेगुलेसन इक्वल्स ई माइनस भी ओभर भी। ल्यागिङमा पोजिटिभ, लिडिङमा नेगेटिभ हुन सक्छ।',
      lines: [['eq', tex(String.raw`\%\,\text{Reg} = \dfrac{E - V}{V}\times100`)]],
    },
  ],
  lecturer: [
    {
      say: 'Taking V as reference with I lagging by phi, Figure 6.3.',
      voice: 'टेकिङ भी एज रेफरेन्स विद आई ल्यागिङ बाइ फाइ, फिगर सिक्स पोइन्ट थ्री।',
      lines: [['h', <>Phasor diagram on load</>], ['step', <>V reference, I lags by φ</>]],
    },
    {
      say: 'The excitation EMF is E equals V plus I into R a plus j X s.',
      voice: 'द एक्साइटेसन ई एम एफ इज ई इक्वल्स भी प्लस आई इन्टु आर ए प्लस जे एक्स एस।',
      lines: [['eq', tex(String.raw`\boxed{\vec E = \vec V + \vec I(R_a + jX_s)}`)]],
    },
    {
      say: 'Resolving along and perpendicular to V gives the magnitude.',
      voice: 'रिजल्भिङ एलङ एन्ड पर्पेन्डिकुलर टु भी गिभ्स द म्याग्निच्युड।',
      lines: [['eq', tex(String.raw`E = \sqrt{(V\cos\varphi + IR_a)^2 + (V\sin\varphi \pm IX_s)^2}`)]],
      ask: {
        q: 'Synchronous reactance ma kun dui reactance jodincha?',
        voice: 'सिन्क्रोनस रियाक्टेन्समा कुन दुई रियाक्टेन्स जोडिन्छ?',
        options: ['Leakage ra armature reaction', 'Magnetising ra capacitive', 'Field ra damper'],
        answer: 0,
        why: 'Xs = Xl + Xa.',
      },
    },
    {
      say: 'The angle between E and V is the load angle delta.',
      voice: 'द एङ्गल बिट्विन ई एन्ड भी इज द लोड एङ्गल डेल्टा।',
      lines: [['step', <>δ: load angle</>]],
    },
    {
      say: 'Voltage regulation is E minus V over V.',
      voice: 'भोल्टेज रेगुलेसन इज ई माइनस भी ओभर भी।',
      lines: [['eq', tex(String.raw`\%\,\text{Reg} = \dfrac{E - V}{V}\times100`)]],
    },
  ],
});

export const arAnswer63 = answer('Model answer: synchronous generator ma armature reaction', {
  draw: altPhasorFigure,
  viewBox: '0 0 360 222',
  papers: ['2069 Bhadra', '2073 Chaitra', '2078 Poush'],
  q: 'Explain the armature reaction in a synchronous generator for resistive, inductive and capacitive loading with necessary diagram',
  read: {
    say: 'IOE ma tin choti: explain the armature reaction in a synchronous generator for resistive, inductive and capacitive loading with necessary diagram.',
    voice: 'आई ओ ईमा तीन चोटि — एक्सप्लेन द आर्मेचर रियाक्सन इन अ सिन्क्रोनस जेनेरेटर फर रेजिस्टिभ, इन्डक्टिभ, एन्ड क्यापासिटिभ लोडिङ विद नेसेसरी डायग्राम।',
  },
  points: [
    {
      node: <><H>Armature reaction</H><Pts items={[<>The effect of the armature (stator) flux, set up by load current, on the main field flux</>, <>Its nature depends on the phase angle between armature current I and excitation EMF E</>]} /></>,
      say: 'Armature reaction is the effect of the armature flux, set up by the load current, on the main field flux. Its nature depends on the phase of I relative to E.',
      voice: 'आर्मेचर रियाक्सन इज द इफेक्ट अफ द आर्मेचर फ्लक्स, सेट अप बाइ द लोड करेन्ट, अन द मेन फिल्ड फ्लक्स। इट्स नेचर डिपेन्ड्स अन द फेज अफ आई रिलेटिभ टु ई।',
    },
    {
      node: <><H>(i) Resistive (unity pf)</H><Pts items={[<>I in phase with E; armature MMF lies 90° to the field axis</>, <><b>Cross-magnetising:</b> flux distorted, strengthened at one pole tip and weakened at the other; little change in magnitude</>]} /></>,
      say: 'Resistive load: I is in phase with E, so the armature MMF is 90 degrees to the field. It is cross-magnetising: the flux is distorted but its magnitude hardly changes.',
      voice: 'रेजिस्टिभ लोड — आई इज इन फेज विद ई, सो द आर्मेचर एम एम एफ इज नाइन्टी डिग्रिज टु द फिल्ड। इट इज क्रस म्याग्नेटाइजिङ — द फ्लक्स इज डिस्टर्टेड बट इट्स म्याग्निच्युड हार्ड्ली चेन्जेज।',
    },
    {
      page: true,
      node: <><H>(ii) Inductive (zero pf lagging)</H><Pts items={[<>I lags E by 90°; armature MMF directly opposes the field MMF</>, <><b>Demagnetising:</b> net flux and terminal voltage fall; more excitation is needed</>]} /></>,
      say: 'Inductive load: I lags E by 90 degrees, so the armature MMF directly opposes the field. It is demagnetising; the flux and terminal voltage fall.',
      voice: 'इन्डक्टिभ लोड — आई ल्याग्स ई बाइ नाइन्टी डिग्रिज, सो द आर्मेचर एम एम एफ डाइरेक्ट्ली अपोजेज द फिल्ड। इट इज डिम्याग्नेटाइजिङ, द फ्लक्स एन्ड टर्मिनल भोल्टेज फल।',
    },
    {
      node: <><H>(iii) Capacitive (zero pf leading)</H><Pts items={[<>I leads E by 90°; armature MMF aids the field MMF</>, <><b>Magnetising:</b> net flux rises; terminal voltage may exceed E (negative regulation)</>]} /></>,
      say: 'Capacitive load: I leads E by 90 degrees, so the armature MMF aids the field. It is magnetising; the terminal voltage may exceed E.',
      voice: 'क्यापासिटिभ लोड — आई लिड्स ई बाइ नाइन्टी डिग्रिज, सो द आर्मेचर एम एम एफ एड्स द फिल्ड। इट इज म्याग्नेटाइजिङ, द टर्मिनल भोल्टेज मे एक्सिड ई।',
      ask: {
        q: 'Capacitive load ma voltage regulation kasto huna sakcha?',
        voice: 'क्यापासिटिभ लोडमा भोल्टेज रेगुलेसन कस्तो हुन सक्छ?',
        options: ['Negative', 'Sadhai positive', 'Zero matra'],
        answer: 0,
        why: 'V > E bhaye (E − V)/V negative.',
      },
    },
    {
      node: <><H>Representation</H><Pts items={[<>Armature reaction is modelled by a reactance X<sub>a</sub>; with leakage X<sub>l</sub>: <K>{String.raw`X_s = X_l + X_a`}</K></>, <><K>{String.raw`\vec E = \vec V + \vec I(R_a + jX_s)`}</K> (Fig. 6.3)</>]} /></>,
      say: 'It is modelled by a reactance X a; with leakage, X s equals X l plus X a, and E equals V plus I into R a plus j X s.',
      voice: 'इट इज मोडल्ड बाइ अ रियाक्टेन्स एक्स ए, विद लिकेज, एक्स एस इक्वल्स एक्स एल प्लस एक्स ए, एन्ड ई इक्वल्स भी प्लस आई इन्टु आर ए प्लस जे एक्स एस।',
    },
  ],
});

export const loadSolve63 = solve({
  title: 'IOE 2073 Chaitra: same excitation ma leading pf ko voltage',
  paper: '2073 Chaitra',
  paperVoice: 'दुई हजार त्रिहत्तर चैत',
  question: 'A 1200 kVA, 6600 V, 3-phase star connected stator of a synchronous generator has a armature resistance of 0.4 Ω/phase and synchronous reactance of 6 Ω/phase. The generator delivers full load current at pf of 0.8 lagging at normal rated voltage. Calculate the terminal voltage for the same excitation and load current at 0.8 pf leading.',
  read: '1200 kVA, 6600 volt star. Ra 0.4, Xs 6 ohm per phase. Full load 0.8 lagging ma rated voltage. Eutai excitation ra current ma 0.8 leading ko terminal voltage?',
  readVoice: 'बाह्र सय के भी ए, छ हजार छ सय भोल्ट स्टार। आर ए जिरो पोइन्ट फोर, एक्स एस सिक्स ओम पर फेज। फुल लोड जिरो पोइन्ट एट ल्यागिङमा रेटेड भोल्टेज। एउटै एक्साइटेसन र करेन्टमा जिरो पोइन्ट एट लिडिङको टर्मिनल भोल्टेज?',
  given: [
    { node: <>V<sub>ph</sub> = 6600/√3 = 3810.5 V; I = 1200 000/(√3 × 6600) = 104.97 A</>, say: 'V ph 3810.5 volt, I 104.97 ampere', voice: 'भी पी एच अठतीस सय दस दशमलव पाँच भोल्ट, आई एक सय चार दशमलव नौ सात एम्पियर' },
    { node: <>Z<sub>s</sub> = 0.4 + j6 Ω per phase; cos φ = 0.8</>, say: 'Zs 0.4 plus j 6, pf 0.8', voice: 'जेड एस जिरो पोइन्ट फोर प्लस जे सिक्स, पी एफ जिरो पोइन्ट एट' },
  ],
  find: { node: <>V<sub>ph</sub> (and line) at 0.8 leading with the same E</>, say: 'Nikalnu parne: leading ma terminal voltage.', voice: 'निकाल्नु पर्ने — लिडिङमा टर्मिनल भोल्टेज।' },
  idea: { node: <>Find |E| at lagging; keep |E|; solve <K>{String.raw`|V + IZ_s| = E`}</K> at leading</>, say: 'Method: lagging bata E, ani tyahi E le leading ko V.', voice: 'मेथड — ल्यागिङबाट ई, अनि त्यही ईले लिडिङको भी।' },
  steps: [
    {
      node: <K>{String.raw`\begin{aligned} IZ_s &= 104.97(0.8 - j0.6)(0.4 + j6) \\ &= 411.5 + j478.7 \end{aligned}`}</K>,
      say: 'Lagging: I Z s equals 411.5 plus j 478.7.',
      voice: 'ल्यागिङ — आई जेड एस इक्वल्स चार सय एघार दशमलव पाँच प्लस जे चार सय अठहत्तर दशमलव सात।',
    },
    {
      node: <K>{String.raw`\begin{aligned} \vec E &= 3810.5 + 411.5 + j478.7 \\ |E| &= 4249.1\ \text{V/phase} \end{aligned}`}</K>,
      say: 'E equals 4222 plus j 478.7, magnitude 4249.1 volt per phase.',
      voice: 'ई इक्वल्स बयालीस सय बाइस प्लस जे चार सय अठहत्तर दशमलव सात, म्याग्निच्युड बयालीस सय उनन्चास दशमलव एक भोल्ट पर फेज।',
    },
    {
      node: <K>{String.raw`\begin{aligned} IZ_s &= 104.97(0.8 + j0.6)(0.4 + j6) \\ &= -344.3 + j529.1 \end{aligned}`}</K>,
      say: 'Leading: I Z s equals minus 344.3 plus j 529.1.',
      voice: 'लिडिङ — आई जेड एस इक्वल्स माइनस तीन सय चवालीस दशमलव तीन प्लस जे पाँच सय उनन्तीस दशमलव एक।',
      ask: {
        q: 'Leading pf ma I Zs ko real part kina negative?',
        voice: 'लिडिङ पी एफमा आई जेड एस को रियल पार्ट किन नेगेटिभ?',
        options: ['j0.6 × j6 = −3.6 le', 'Ra negative bhayera', 'Current ulto bhayera'],
        answer: 0,
        why: '(0.8 + j0.6)(0.4 + j6) = 0.32 − 3.6 + j(4.8 + 0.24).',
      },
    },
    {
      node: <K>{String.raw`\begin{aligned} (V - 344.3)^2 + 529.1^2 &= 4249.1^2 \\ V &= 344.3 + 4216.0 \\ &= 4560.3\ \text{V/phase} \end{aligned}`}</K>,
      say: 'V minus 344.3 square plus 529.1 square equals 4249.1 square, so V equals 4560.3 volt per phase.',
      voice: 'भी माइनस तीन सय चवालीस दशमलव तीन स्क्वायर प्लस पाँच सय उनन्तीस दशमलव एक स्क्वायर इक्वल्स बयालीस सय उनन्चास दशमलव एक स्क्वायर, सो भी इक्वल्स पैंतालीस सय साठी दशमलव तीन भोल्ट पर फेज।',
    },
  ],
  answer: { node: <K>{String.raw`\begin{aligned} V_{ph} &= \boxed{4560.3\ \text{V}} \\ V_L &= \boxed{7898.7\ \text{V}} \end{aligned}`}</K>, say: 'Answer: 4560.3 volt per phase, 7898.7 volt line: rated bhanda badhi, leading le.', voice: 'आन्सर — पैंतालीस सय साठी दशमलव तीन भोल्ट पर फेज, सतहत्तर सय अन्ठानब्बे दशमलव सात भोल्ट लाइन — रेटेड भन्दा बढी, लिडिङले।' },
  trap: { node: <>Trap: use per-phase values (star: V<sub>ph</sub> = V<sub>L</sub>/√3); the same excitation means the same |E|.</>, say: 'Trap: per phase ma garne; same excitation bhaneko same E.', voice: 'ट्र्याप — पर फेजमा गर्ने, सेम एक्साइटेसन भनेको सेम ई।' },
});

/* ── 6.4 Synchronous motor ────────────────────────────────────────────── */
export const basics64 = duo('6.4 · Basic understanding: synchronous motor aafai kina start hudaina?', {
  three: syncTour([
    { shot: 'front', show: MOTOR, field: 1, rmf: 0.6, spin: 0, flow: 0.7, focus: ['winding', 'supply'], labels: [['stator: ghumne magnet', 'winding']] },
    { focus: ['salient', 'fieldCoil'], labels: [['rotor: DC magnet', 'salient']] },
    { spin: 0, focus: ['salient'], labels: [['dherai chito: samatna sakdaina', 'salient']] },
    { show: [...MOTOR, 'damper'], spin: 0.5, spinMs: 3500, focus: ['damper'], labels: [['damper bar', 'damper']] },
    { spin: 0.6, rmf: 0.6, focus: ['salient', 'winding'], labels: [['lock: eutai speed', 'salient']] },
    { shot: 'exciter', spin: 0.6, field: 0.5, focus: ['sliprings', 'fieldCoil'], labels: [['kam field: lagging', 'fieldCoil']] },
    { field: 1, focus: ['fieldCoil'], labels: [['badhi field: leading', 'fieldCoil']] },
    { shot: 'wide', spin: 0.6, focus: null },
  ]),
  tutor: [
    {
      say: 'Synchronous motor ko stator induction motor jastai: tin phase le ghumne magnet banaucha.',
      voice: 'सिन्क्रोनस मोटरको स्टेटर इन्डक्सन मोटर जस्तै — तीन फेजले घुम्ने म्याग्नेट बनाउँछ।',
      lines: [['h', <>6.4 · Aafai kina start hudaina?</>], ['step', <>Stator: tin phase → ghumne magnet</>]],
    },
    {
      say: 'Rotor ma DC le banaeko balio magnet. Dui magnet ek-arka lai samatchan.',
      voice: 'रोटरमा डी सीले बनाएको बलियो म्याग्नेट। दुई म्याग्नेट एक अर्कालाई समात्छन्।',
      lines: [['step', <>Rotor: DC magnet</>]],
    },
    {
      say: 'Tara start ma stator ko magnet eksekend ma pachas choti ghumcha. Gahro rotor le samatna bhyaudaina: eta-uta tanincha matra.',
      voice: 'तर स्टार्टमा स्टेटरको म्याग्नेट एक सेकेन्डमा पचास चोटि घुम्छ। गह्रौं रोटरले समात्न भ्याउँदैन — यता उता तानिन्छ मात्र।',
      lines: [['step', <>Start: magnet dherai chito → rotor samatna sakdaina</>]],
      ask: {
        q: 'Synchronous motor aafai start kina hudaina?',
        voice: 'सिन्क्रोनस मोटर आफैं स्टार्ट किन हुँदैन?',
        options: ['Rotor ko inertia le chito ghumne field samatna sakdaina', 'Rotor ma magnet hudaina', 'Supply DC huncha'],
        answer: 0,
        why: 'Average torque zero: aadha cycle eta, aadha uta.',
      },
    },
    {
      say: 'Upaya: pole ma damper bar, cage jastai. Induction motor jastai rotor ghumna thalcha.',
      voice: 'उपाय — पोलमा ड्याम्पर बार, केज जस्तै। इन्डक्सन मोटर जस्तै रोटर घुम्न थाल्छ।',
      lines: [['step', <>Damper bar → induction motor jastai start</>]],
    },
    {
      say: 'Speed najik pugepachi DC dida rotor ko magnet stator ko magnet sanga lock huncha, ra thik eutai speed ma ghumcha.',
      voice: 'स्पिड नजिक पुगेपछि डी सी दिँदा रोटरको म्याग्नेट स्टेटरको म्याग्नेटसँग लक हुन्छ, र ठिक एउटै स्पिडमा घुम्छ।',
      lines: [['step', <>DC dida lock → thik synchronous speed</>]],
    },
    {
      say: 'Field current kam bhaye motor le supply bata magnet ko lagi current magcha: lagging, induction motor jastai.',
      voice: 'फिल्ड करेन्ट कम भए मोटरले सप्लाईबाट म्याग्नेटको लागि करेन्ट माग्छ — ल्यागिङ, इन्डक्सन मोटर जस्तै।',
      lines: [['step', <>Kam field → lagging pf</>]],
    },
    {
      say: 'Field current badhaye ulto: motor le supply lai current dincha, capacitor jastai: leading. Factory ko pf sudharcha!',
      voice: 'फिल्ड करेन्ट बढाए उल्टो — मोटरले सप्लाईलाई करेन्ट दिन्छ, क्यापासिटर जस्तै — लिडिङ। फ्याक्ट्रीको पी एफ सुधार्छ!',
      lines: [['step', <>Badhi field → leading pf (capacitor jastai)</>]],
    },
    {
      say: 'Saransha: start ma damper le ghumaucha, DC le lock garcha, speed fixed, ra field current le pf milaucha.',
      voice: 'सारांश — स्टार्टमा ड्याम्परले घुमाउँछ, डी सीले लक गर्छ, स्पिड फिक्स्ड, र फिल्ड करेन्टले पी एफ मिलाउँछ।',
      lines: [['idea', <>Damper → start · DC → lock · speed fixed · field → pf</>]],
    },
  ],
  lecturer: [
    {
      say: 'Stator ko three-phase supply le synchronous speed ma RMF banaucha.',
      voice: 'स्टेटरको थ्री फेज सप्लाईले सिन्क्रोनस स्पिडमा आर एम एफ बनाउँछ।',
      lines: [['h', <>6.4 · Synchronous motor</>], ['step', <>Stator RMF at synchronous speed</>]],
    },
    {
      say: 'Rotor poles DC le excite gariyeka hunchan.',
      voice: 'रोटर पोल्स डी सीले एक्साइट गरिएका हुन्छन्।',
      lines: [['step', <>DC-excited rotor poles</>]],
    },
    {
      say: 'Standstill ma RMF le rotor pole lai alternately aakarshan ra pratikarshan garcha; average torque zero, tesaile motor self-starting hudaina.',
      voice: 'स्ट्यान्डस्टिलमा आर एम एफले रोटर पोललाई अल्टरनेट्ली आकर्षण र प्रतिकर्षण गर्छ, एभरेज टर्क जिरो, त्यसैले मोटर सेल्फ स्टार्टिङ हुँदैन।',
      lines: [['step', <>At standstill average torque is zero: not self-starting</>]],
      ask: {
        q: 'Standstill ma synchronous motor ko average torque kati?',
        voice: 'स्ट्यान्डस्टिलमा सिन्क्रोनस मोटरको एभरेज टर्क कति?',
        options: ['Zero', 'Maximum', 'Rated'],
        answer: 0,
        why: 'Aadha cycle eta, aadha uta.',
      },
    },
    {
      say: 'Damper winding le motor induction motor jastai start garcha.',
      voice: 'ड्याम्पर वाइन्डिङले मोटर इन्डक्सन मोटर जस्तै स्टार्ट गर्छ।',
      lines: [['step', <>Damper winding: induction-motor starting</>]],
    },
    {
      say: 'Near synchronous speed ma DC excitation dida rotor pull into step huncha.',
      voice: 'नियर सिन्क्रोनस स्पिडमा डी सी एक्साइटेसन दिँदा रोटर पुल इन्टु स्टेप हुन्छ।',
      lines: [['step', <>DC applied near N<sub>s</sub>: pulls into synchronism</>]],
    },
    {
      say: 'Under-excitation ma motor lagging current lincha.',
      voice: 'अन्डर एक्साइटेसनमा मोटर ल्यागिङ करेन्ट लिन्छ।',
      lines: [['step', <>Under-excited: lagging pf</>]],
    },
    {
      say: 'Over-excitation ma leading current lincha; yasari synchronous condenser ko rup ma pf improve garcha.',
      voice: 'ओभर एक्साइटेसनमा लिडिङ करेन्ट लिन्छ, यसरी सिन्क्रोनस कन्डेन्सरको रूपमा पी एफ इम्प्रुभ गर्छ।',
      lines: [['step', <>Over-excited: leading pf (synchronous condenser)</>]],
    },
    {
      say: 'Saransha: not self-starting, damper bata start, constant speed, ra excitation le pf control.',
      voice: 'सारांश — नट सेल्फ स्टार्टिङ, ड्याम्परबाट स्टार्ट, कन्स्टेन्ट स्पिड, र एक्साइटेसनले पी एफ कन्ट्रोल।',
      lines: [['idea', <>Not self-starting · damper start · constant speed · pf by excitation</>]],
    },
  ],
});

export const start64 = duo('Synchronous motor ko principle ra starting methods', {
  draw: vCurveFigure,
  viewBox: '0 0 360 232',
  tutor: [
    {
      say: 'Principle: stator ko RMF ra rotor ko DC poles magnetic locking garchan; rotor thik N s ma ghumcha.',
      voice: 'प्रिन्सिपल — स्टेटरको आर एम एफ र रोटरको डी सी पोल्स म्याग्नेटिक लकिङ गर्छन्, रोटर ठिक एन एसमा घुम्छ।',
      lines: [['h', <>Synchronous motor</>], ['eq', tex(String.raw`\begin{aligned} N &= N_s \\ &= \dfrac{120f}{P}\ \text{(at every load)} \end{aligned}`)]],
    },
    {
      say: 'Standstill ma RMF le aadha cycle ma N lai tancha, aadha ma dhakelcha: average torque zero, not self-starting.',
      voice: 'स्ट्यान्डस्टिलमा आर एम एफले आधा साइकलमा एनलाई तान्छ, आधामा धकेल्छ — एभरेज टर्क जिरो, नट सेल्फ स्टार्टिङ।',
      lines: [['step', <>At rest: torque alternates every half cycle → average zero</>]],
    },
    {
      say: 'Starting method ek: damper winding. Pole face ma short gareko bars ma induction le torque, N s najik pugcha.',
      voice: 'स्टार्टिङ मेथड एक — ड्याम्पर वाइन्डिङ। पोल फेसमा सर्ट गरेको बार्समा इन्डक्सनले टर्क, एन एस नजिक पुग्छ।',
      lines: [['step', <>(i) Damper winding: starts as an induction motor; then DC field switched on → pulls into step</>]],
      ask: {
        q: 'Synchronous speed ma damper bars ma current kati?',
        voice: 'सिन्क्रोनस स्पिडमा ड्याम्पर बार्समा करेन्ट कति?',
        options: ['Zero (relative motion chaina)', 'Maximum', 'Rated'],
        answer: 0,
        why: 'Sync ma bars le flux kaatdainan; hunting ma matra current.',
      },
    },
    {
      say: 'Method dui: separate pony motor le N s samma ghumaune. Tin: slip-ring rotor ko induction motor jastai start.',
      voice: 'मेथड दुई — सेपरेट पोनी मोटरले एन एससम्म घुमाउने। तीन — स्लिप रिङ रोटरको इन्डक्सन मोटर जस्तै स्टार्ट।',
      lines: [['step', <>(ii) Pony (auxiliary) motor · (iii) slip-ring induction start · (iv) variable-frequency supply</>]],
    },
    {
      say: 'Starting ma field winding lai resistance bata short rakhincha, natra induced high voltage le insulation bigarcha.',
      voice: 'स्टार्टिङमा फिल्ड वाइन्डिङलाई रेजिस्टेन्सबाट सर्ट राखिन्छ, नत्र इन्ड्युस्ड हाई भोल्टेजले इन्सुलेसन बिगार्छ।',
      lines: [['idea', <>Field winding shorted through a resistance during starting (avoids high induced voltage)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Principle: magnetic locking between the stator RMF and the DC rotor poles; the speed is N s at all loads.',
      voice: 'प्रिन्सिपल — म्याग्नेटिक लकिङ बिट्विन द स्टेटर आर एम एफ एन्ड द डी सी रोटर पोल्स, द स्पिड इज एन एस एट अल लोड्स।',
      lines: [['h', <>Principle and starting</>], ['eq', tex(String.raw`\begin{aligned} N &= N_s \\ &= \dfrac{120f}{P}\ \text{(at every load)} \end{aligned}`)]],
    },
    {
      say: 'At standstill the torque alternates and its average is zero; the motor is not self-starting.',
      voice: 'एट स्ट्यान्डस्टिल द टर्क अल्टरनेट्स एन्ड इट्स एभरेज इज जिरो, द मोटर इज नट सेल्फ स्टार्टिङ।',
      lines: [['step', <>Not self-starting (zero average torque)</>]],
    },
    {
      say: 'Damper winding: the motor starts as an induction motor; near N s the DC field pulls it into synchronism.',
      voice: 'ड्याम्पर वाइन्डिङ — द मोटर स्टार्ट्स एज एन इन्डक्सन मोटर, नियर एन एस द डी सी फिल्ड पुल्स इट इन्टु सिन्क्रोनिज्म।',
      lines: [['step', <>(i) Damper winding (induction start)</>]],
      ask: {
        q: 'Damper winding ko arko kaam k?',
        voice: 'ड्याम्पर वाइन्डिङको अर्को काम के?',
        options: ['Hunting damp garnu', 'Speed badhaunu', 'Pf ghataunu'],
        answer: 0,
        why: 'Speed oscillate bhaye bars ma current le oscillation rokcha.',
      },
    },
    {
      say: 'Other methods: a pony motor, a slip-ring induction start, or a variable-frequency supply.',
      voice: 'अदर मेथड्स — अ पोनी मोटर, अ स्लिप रिङ इन्डक्सन स्टार्ट, अर अ भेरिएबल फ्रिक्वेन्सी सप्लाई।',
      lines: [['step', <>(ii) pony motor · (iii) slip-ring start · (iv) VFD</>]],
    },
    {
      say: 'During starting the field winding is shorted through a resistance.',
      voice: 'ड्युरिङ स्टार्टिङ द फिल्ड वाइन्डिङ इज सर्टेड थ्रु अ रेजिस्टेन्स।',
      lines: [['step', <>Field shorted through a resistance while starting</>]],
    },
  ],
});

export const excitation64 = duo('Derivation: excitation ko asar, V-curves ra hunting', {
  draw: vCurveFigure,
  viewBox: '0 0 360 232',
  tutor: [
    {
      say: 'Motor ko equation: V equals E plus I into R a plus j X s. Load ra V constant, tara E field current le badlincha.',
      voice: 'मोटरको इक्वेसन — भी इक्वल्स ई प्लस आई इन्टु आर ए प्लस जे एक्स एस। लोड र भी कन्स्टेन्ट, तर ई फिल्ड करेन्टले बदलिन्छ।',
      lines: [['h', <>Effect of excitation</>], ['eq', tex(String.raw`\vec V = \vec E + \vec I(R_a + jX_s)`)]],
    },
    {
      say: 'Power V I cos phi constant: excitation badalda I cos phi ustai, tara I ra phi badlinchan.',
      voice: 'पावर भी आई कस फाइ कन्स्टेन्ट — एक्साइटेसन बदल्दा आई कस फाइ उस्तै, तर आई र फाइ बदलिन्छन्।',
      lines: [['step', <>Constant load: I cos φ constant; I and φ change with excitation</>]],
    },
    {
      say: 'E less than V, under-excited: lagging. E barabar normal: unity, minimum current. E greater than V, over-excited: leading.',
      voice: 'ई लेस दयान भी, अन्डर एक्साइटेड — ल्यागिङ। ई बराबर नर्मल — युनिटी, मिनिमम करेन्ट। ई ग्रेटर दयान भी, ओभर एक्साइटेड — लिडिङ।',
      lines: [['step', <>Under-excited: lagging · normal: unity pf, minimum I · over-excited: leading</>]],
      ask: {
        q: 'Synchronous motor capacitor jastai kahile bancha?',
        voice: 'सिन्क्रोनस मोटर क्यापासिटर जस्तै कहिले बन्छ?',
        options: ['Over-excited huda', 'Under-excited huda', 'No load ma matra'],
        answer: 0,
        why: 'Over-excitation: leading current, reactive power dincha.',
      },
    },
    {
      say: 'Figure 6.4: I a versus I f ko graph V jasto: V-curve. Pf versus I f ulto V: inverted V-curve.',
      voice: 'फिगर सिक्स पोइन्ट फोर — आई ए भर्सस आई एफको ग्राफ भी जस्तो — भी कर्भ। पी एफ भर्सस आई एफ उल्टो भी — इन्भर्टेड भी कर्भ।',
      lines: [['step', <>V-curves: I<sub>a</sub> vs I<sub>f</sub> · inverted V-curves: pf vs I<sub>f</sub> (one per load)</>]],
    },
    {
      say: 'Achanak load badalda rotor naya angle tira oscillate garcha: hunting. Damper winding le yo damp garcha.',
      voice: 'अचानक लोड बदल्दा रोटर नयाँ एङ्गलतिर अस्सिलेट गर्छ — हन्टिङ। ड्याम्पर वाइन्डिङले यो ड्याम्प गर्छ।',
      lines: [['idea', <>Hunting: rotor oscillates about the new load angle after a sudden change; damped by the damper winding</>]],
    },
  ],
  lecturer: [
    {
      say: 'For the motor, V equals E plus I into R a plus j X s.',
      voice: 'फर द मोटर, भी इक्वल्स ई प्लस आई इन्टु आर ए प्लस जे एक्स एस।',
      lines: [['h', <>Effect of excitation and V-curves</>], ['eq', tex(String.raw`\vec V = \vec E + \vec I(R_a + jX_s)`)]],
    },
    {
      say: 'At constant load and voltage, I cos phi is constant while excitation changes I and phi.',
      voice: 'एट कन्स्टेन्ट लोड एन्ड भोल्टेज, आई कस फाइ इज कन्स्टेन्ट ह्वाइल एक्साइटेसन चेन्जेज आई एन्ड फाइ।',
      lines: [['step', <>I cos φ constant at constant load</>]],
    },
    {
      say: 'Under-excited: lagging; normal: unity and minimum current; over-excited: leading.',
      voice: 'अन्डर एक्साइटेड — ल्यागिङ, नर्मल — युनिटी एन्ड मिनिमम करेन्ट, ओभर एक्साइटेड — लिडिङ।',
      lines: [['step', <>Under: lagging · normal: unity · over: leading</>]],
      ask: {
        q: 'V-curve ko tallo bindu ma pf kati?',
        voice: 'भी कर्भको तल्लो बिन्दुमा पी एफ कति?',
        options: ['Unity', 'Zero lagging', 'Zero leading'],
        answer: 0,
        why: 'Minimum armature current unity pf ma.',
      },
    },
    {
      say: 'The plot of I a against I f is the V-curve; pf against I f is the inverted V-curve, Figure 6.4.',
      voice: 'द प्लट अफ आई ए अगेन्स्ट आई एफ इज द भी कर्भ, पी एफ अगेन्स्ट आई एफ इज द इन्भर्टेड भी कर्भ, फिगर सिक्स पोइन्ट फोर।',
      lines: [['step', <>V-curves and inverted V-curves</>]],
    },
    {
      say: 'Hunting is the oscillation of the rotor about its new load angle; the damper winding damps it.',
      voice: 'हन्टिङ इज द अस्सिलेसन अफ द रोटर अबाउट इट्स न्यु लोड एङ्गल, द ड्याम्पर वाइन्डिङ ड्याम्प्स इट।',
      lines: [['step', <>Hunting, damped by the damper winding</>]],
    },
  ],
});

export const startAnswer64 = answer('Model answer: synchronous motor self-starting kina hudaina ra damper starting', {
  draw: vCurveFigure,
  viewBox: '0 0 360 232',
  papers: ['2070 Magh', '2068 Magh', '2065 Chaitra'],
  q: 'Explain why synchronous motor is not self starting? Explain the starting method using damper winding.',
  read: {
    say: 'IOE ma tin choti: explain why synchronous motor is not self starting. Explain the starting method using damper winding.',
    voice: 'आई ओ ईमा तीन चोटि — एक्सप्लेन ह्वाई सिन्क्रोनस मोटर इज नट सेल्फ स्टार्टिङ। एक्सप्लेन द स्टार्टिङ मेथड युजिङ ड्याम्पर वाइन्डिङ।',
  },
  points: [
    {
      node: <><H>Not self-starting</H><Pts items={[<>The stator RMF rotates at N<sub>s</sub> (e.g. 1500 rpm) the moment supply is on; the DC rotor poles are at rest</>, <>When an N pole of the RMF passes a rotor S pole they attract; half a cycle later a like pole repels</>]} /></>,
      say: 'At switch-on the stator RMF rotates at N s while the rotor is at rest. When unlike poles pass they attract; half a cycle later like poles repel.',
      voice: 'एट स्विच अन द स्टेटर आर एम एफ रोटेट्स एट एन एस ह्वाइल द रोटर इज एट रेस्ट। ह्वेन अनलाइक पोल्स पास देय अट्र्याक्ट, हाफ अ साइकल लेटर लाइक पोल्स रिपेल।',
    },
    {
      node: <><Pts items={[<>The torque reverses every half cycle (1/100 s at 50 Hz); owing to inertia the rotor cannot follow</>, <>∴ average torque is zero: the synchronous motor is not self-starting</>]} /></>,
      say: 'The torque reverses every half cycle, and owing to its inertia the rotor cannot follow. Therefore the average torque is zero and the motor is not self-starting.',
      voice: 'द टर्क रिभर्सेज एभ्री हाफ साइकल, एन्ड ओइङ टु इट्स इनर्सिया द रोटर क्यान नट फलो। देयरफोर द एभरेज टर्क इज जिरो एन्ड द मोटर इज नट सेल्फ स्टार्टिङ।',
    },
    {
      page: true,
      node: <><H>Starting with damper winding</H><Pts items={[<>Copper bars in the pole faces, shorted by end rings, form a squirrel cage</>, <>Field winding open from DC, shorted through a resistance; supply switched on</>, <>RMF induces currents in the bars → the motor starts and runs up as an induction motor</>]} /></>,
      say: 'Damper bars in the pole faces, shorted by end rings, form a cage. With the field shorted through a resistance, the supply is switched on, and the motor runs up as an induction motor.',
      voice: 'ड्याम्पर बार्स इन द पोल फेसेज, सर्टेड बाइ एन्ड रिङ्स, फर्म अ केज। विद द फिल्ड सर्टेड थ्रु अ रेजिस्टेन्स, द सप्लाई इज स्विच्ड अन, एन्ड द मोटर रन्स अप एज एन इन्डक्सन मोटर।',
    },
    {
      node: <><Pts items={[<>Near N<sub>s</sub> (slip ≈ 2–5 %), DC excitation is applied to the field</>, <>The rotor poles lock with the RMF and pull into synchronism; at N<sub>s</sub> the damper carries no current</>, <>Afterwards the damper winding also damps hunting</>]} /></>,
      say: 'Near N s, DC excitation is applied and the rotor pulls into synchronism. At N s the damper carries no current, and afterwards it damps hunting.',
      voice: 'नियर एन एस, डी सी एक्साइटेसन इज एप्लाइड एन्ड द रोटर पुल्स इन्टु सिन्क्रोनिज्म। एट एन एस द ड्याम्पर क्यारिज नो करेन्ट, एन्ड आफ्टरवर्ड्स इट ड्याम्प्स हन्टिङ।',
      ask: {
        q: 'DC excitation kahile dine?',
        voice: 'डी सी एक्साइटेसन कहिले दिने?',
        options: ['Speed Ns najik pugepachi', 'Supply dinu bhanda agadi', 'Kahile pani nadine'],
        answer: 0,
        why: 'Kam slip ma matra poles lock huna sakchan.',
      },
    },
  ],
});

export const excitationAnswer64 = answer('Model answer: synchronous motor ma excitation ko asar', {
  draw: vCurveFigure,
  viewBox: '0 0 360 232',
  papers: ['2070 Bhadra', '2072 Ashwin', '2075 Baishakh', '2071 Chaitra'],
  q: 'With the help of phasor diagrams, explain the effect of excitation in a 3-phase synchronous motor.',
  read: {
    say: 'IOE ma char choti: with the help of phasor diagrams, explain the effect of excitation in a 3-phase synchronous motor.',
    voice: 'आई ओ ईमा चार चोटि — विद द हेल्प अफ फेजर डायग्राम्स, एक्सप्लेन द इफेक्ट अफ एक्साइटेसन इन अ थ्री फेज सिन्क्रोनस मोटर।',
  },
  points: [
    {
      node: <><H>Basis</H><K>{String.raw`\vec V = \vec E_b + \vec I Z_s, \quad Z_s \approx jX_s`}</K><Pts items={[<>Load and V constant → input power VI cos φ constant → I cos φ constant</>, <>Excitation changes only the magnitude of E<sub>b</sub></>]} /></>,
      say: 'V equals E b plus I Z s. With load and voltage constant, I cos phi is constant, and the excitation changes only the magnitude of E b.',
      voice: 'भी इक्वल्स ई बी प्लस आई जेड एस। विद लोड एन्ड भोल्टेज कन्स्टेन्ट, आई कस फाइ इज कन्स्टेन्ट, एन्ड द एक्साइटेसन चेन्जेज ओन्ली द म्याग्निच्युड अफ ई बी।',
    },
    {
      node: <><H>(i) Under-excited, E<sub>b</sub> &lt; V</H><Pts items={[<>The resultant I X<sub>s</sub> makes I lag V: lagging pf, larger I</>, <>The motor draws magnetising (reactive) power from the supply</>]} /></>,
      say: 'Under-excited, E b less than V: the phasor I X s makes I lag V. The power factor is lagging and the current larger.',
      voice: 'अन्डर एक्साइटेड, ई बी लेस दयान भी — द फेजर आई एक्स एस मेक्स आई ल्याग भी। द पावर फ्याक्टर इज ल्यागिङ एन्ड द करेन्ट लार्जर।',
    },
    {
      page: true,
      node: <><H>(ii) Normal excitation</H><Pts items={[<>I in phase with V: unity pf, minimum armature current</>]} /><H>(iii) Over-excited, E<sub>b</sub> &gt; V</H><Pts items={[<>I leads V: leading pf, larger I; the motor supplies reactive power</>, <>Used as a synchronous condenser for pf correction</>]} /></>,
      say: 'Normal excitation: I is in phase with V, unity power factor and minimum current. Over-excited, E b greater than V: I leads V, and the motor supplies reactive power, as a synchronous condenser.',
      voice: 'नर्मल एक्साइटेसन — आई इज इन फेज विद भी, युनिटी पावर फ्याक्टर एन्ड मिनिमम करेन्ट। ओभर एक्साइटेड, ई बी ग्रेटर दयान भी — आई लिड्स भी, एन्ड द मोटर सप्लाइज रियाक्टिभ पावर, एज अ सिन्क्रोनस कन्डेन्सर।',
    },
    {
      node: <><H>V-curves (Fig. 6.4)</H><Pts items={[<>I<sub>a</sub> against I<sub>f</sub> at constant load is V-shaped; its minimum is at unity pf</>, <>Higher load → the V-curve shifts up and to the right; pf against I<sub>f</sub> is an inverted V</>]} /></>,
      say: 'V-curves: I a against I f at constant load is V-shaped with its minimum at unity pf; at higher load the curve moves up. Power factor against I f is an inverted V.',
      voice: 'भी कर्भ्स — आई ए अगेन्स्ट आई एफ एट कन्स्टेन्ट लोड इज भी सेप्ड विद इट्स मिनिमम एट युनिटी पी एफ, एट हाइयर लोड द कर्भ मुभ्स अप। पावर फ्याक्टर अगेन्स्ट आई एफ इज एन इन्भर्टेड भी।',
      ask: {
        q: 'Field current badhaudai jada armature current pahila k huncha?',
        voice: 'फिल्ड करेन्ट बढाउँदै जाँदा आर्मेचर करेन्ट पहिला के हुन्छ?',
        options: ['Ghatcha, ani badhcha', 'Sadhai badhcha', 'Ustai rahancha'],
        answer: 0,
        why: 'Lagging bata unity samma ghatcha, ani leading ma badhcha: V.',
      },
    },
  ],
});

const t61 = topic({ num: '6.1', title: 'Alternator: construction, rotor types ra working', opener: basics61, derive: [construction61, working61], picture: [rotatingAnswer61, salientAnswer61] });
const t62 = topic({ num: '6.2', title: 'Alternator EMF equation, pitch ra distribution factor', opener: basics62, derive: [factors62, emf62], picture: [emfAnswer62] });
const t63 = topic({ num: '6.3', title: 'Armature reaction ra alternator on load', opener: basics63, derive: [ar63, load63], picture: [arAnswer63, loadSolve63] });
const t64 = topic({ num: '6.4', title: 'Synchronous motor: principle, starting ra excitation', opener: basics64, derive: [start64, excitation64], picture: [startAnswer64, excitationAnswer64] });

export const unit6 = {
  topics: [t61, t62, t63, t64],
  summary: [
    <>Alternator: rotating DC field, stationary armature; f = PN/120; salient (low speed) wa cylindrical (high speed).</>,
    <>E<sub>ph</sub> = 4.44K<sub>p</sub>K<sub>d</sub>fφT; K<sub>p</sub> = cos(α/2), K<sub>d</sub> = sin(mβ/2)/(m sin(β/2)).</>,
    <>Armature reaction: unity pf cross, lagging demagnetising, leading magnetising; E = V + I(R<sub>a</sub> + jX<sub>s</sub>).</>,
    <>Synchronous motor: not self-starting; damper winding le start, DC le lock.</>,
    <>Excitation: under → lagging, normal → unity (minimum I), over → leading (synchronous condenser); V-curves.</>,
  ],
};
