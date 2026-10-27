import { Arrow, C, Conductor, Pole, model, video } from './kit.jsx';

/* Chapter 2 · Construction & commutator action (Syllabus Unit 3: constructional details, armature winding, commutator action, EMF equation). */

const CX = 150;
const CY = 115;
const slots = Array.from({ length: 12 }, (_, i) => (i * Math.PI * 2) / 12 + Math.PI / 12);

// Arc segment of the commutator ring (end view), angles in radians.
function arc(cx, cy, r, a0, a1) {
  const p = (a) => `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
  return `M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}`;
}

// Leader label shown on one beat only.
function Label({ s, k, x, y, tx, ty, text, sub }) {
  return (
    <g className={s.on(k, k)}>
      <line x1={x} y1={y} x2={tx - 4} y2={ty - 4} stroke={C.yellow} strokeWidth={1.2} />
      <text x={tx} y={ty} fontSize={13} fontWeight={700} fill={C.yellow}>{text}</text>
      {sub && <text x={tx} y={ty + 15} fontSize={11} fill={C.dim}>{sub}</text>}
    </g>
  );
}

export const crossSection = video('DC machine bhitra k cha?', {
  viewBox: '0 0 400 230',
  beats: [
    { say: 'Yo two-pole DC machine ko cross-section ho. Bahira ko frame chai yoke. Yesle sabai kura hold garcha ra flux lai euta pole bata arko pole samma lancha.', voice: 'यो टु पोल डीसी मेसिनको क्रस सेक्सन हो। बाहिरको फ्रेम चाहिँ योक। यसले सबै कुरा होल्ड गर्छ र फ्लक्सलाई एउटा पोलबाट अर्को पोलसम्म लान्छ।' },
    { say: 'Yoke ma bolt gareko chai poles. Tuppo ko chaudai pole shoe le flux lai armature mathi barabar spread garcha, ra field coils lai support garcha.', voice: 'योकमा बोल्ट गरेको चाहिँ पोल्स। टुप्पोको चौडा पोल सुले फ्लक्सलाई आर्मेचर माथि बराबर स्प्रेड गर्छ, र फिल्ड कोइल्सलाई सपोर्ट गर्छ।' },
    { say: 'Har pole ko waripari field winding huncha. Tesma DC current bagda pole magnetise huncha ra flux banaucha, phi per pole.', voice: 'हर पोलको वरिपरि फिल्ड वाइन्डिङ हुन्छ। तेसमा डीसी करेन्ट बग्दा पोल म्याग्नेटाइज हुन्छ र फ्लक्स बनाउँछ, फाइ पर पोल।' },
    { say: 'Bich ma armature core cha, jun part ghumcha. Yo silicon steel ko patala laminations le baneko huncha.', voice: 'बिचमा आर्मेचर कोर छ, जुन पार्ट घुम्छ। यो सिलिकन स्टिलको पातला लेमिनेसन्सले बनेको हुन्छ।' },
    {
      say: 'Tyo duita choice kina ta?',
      voice: 'त्यो दुईटा च्वाइस किन त?',
      ask: {
        tag: 'Quick check',
        q: 'Armature core kina laminated huncha, ra kina silicon steel ko banaincha?',
        voice: 'आर्मेचर कोर किन लेमिनेटेड हुन्छ, र किन सिलिकन स्टिलको बनाइन्छ?',
        options: [
          'Laminations le eddy-current loss ghataucha; silicon steel le hysteresis loss ghataucha',
          'Laminations le hysteresis loss ghataucha; silicon steel le eddy-current loss ghataucha',
          'Duitai le armature halka banaucha matra',
        ],
        answer: 0,
        why: 'Patala insulated sheets le eddy-current ko path todcha (loss ∝ thickness²). Silicon steel ko hysteresis loop sanguro huncha, tesaile hysteresis loss kam.',
      },
    },
    { say: 'Core ko waripari ka slots ma armature conductors baschan. Tiniharu jodera coils bancha, ani tyo coils nai armature winding ho.', voice: 'कोरको वरिपरिका स्लट्समा आर्मेचर कन्डक्टर्स बस्छन्। तिनीहरू जोडेर कोइल्स बन्छ, अनि त्यो कोइल्स नै आर्मेचर वाइन्डिङ हो।' },
    { say: 'Tyahi shaft ma commutator cha: copper segments, ek arka bata patalo mica le insulated, ra har segment coil ko end sanga jodieko.', voice: 'त्यही स्याफ्टमा कम्युटेटर छ: कपर सेग्मेन्ट्स, एक अर्काबाट पातलो माइकाले इन्सुलेटेड, र हर सेग्मेन्ट कोइलको एन्डसँग जोडिएको।' },
    { say: 'Last ma, fixed carbon brushes commutator ma thichieka hunchan. Yinle ghumne armature winding lai bahira ko circuit sanga connect garchan.', voice: 'लास्टमा, फिक्स्ड कार्बन ब्रसेस कम्युटेटरमा थिचिएका हुन्छन्। यिनले घुम्ने आर्मेचर वाइन्डिङलाई बाहिरको सर्किटसँग कनेक्ट गर्छन्।' },
  ],
  draw: (s) => {
    const part = (k) => (s.beat === k ? 'hl' : '');
    return (
      <>
        <circle cx={CX} cy={CY} r={100} fill="none" stroke={C.dim} strokeWidth={14} className={part(0)} />
        <g className={part(1)}>
          <rect x={132} y={22} width={36} height={34} fill={C.north} opacity={0.85} />
          <rect x={110} y={54} width={80} height={11} rx={5} fill={C.north} />
          <rect x={132} y={174} width={36} height={34} fill={C.south} opacity={0.85} />
          <rect x={110} y={165} width={80} height={11} rx={5} fill={C.south} />
          <text x={150} y={46} textAnchor="middle" fontSize={14} fontWeight={800}>N</text>
          <text x={150} y={198} textAnchor="middle" fontSize={14} fontWeight={800}>S</text>
        </g>
        <g className={part(2)}>
          {[[118, 26], [170, 26], [118, 178], [170, 178]].map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={12} height={26} rx={2} fill={C.orange} opacity={0.9} />
          ))}
        </g>
        <circle cx={CX} cy={CY} r={44} fill="#343a40" stroke={C.chalk} strokeWidth={1.5} className={part(3) || part(4)} />
        <g className={part(5)}>
          {slots.map((a, i) => (
            <circle key={i} cx={CX + 37 * Math.cos(a)} cy={CY + 37 * Math.sin(a)} r={4.2} fill={C.orange} />
          ))}
        </g>
        <circle cx={CX} cy={CY} r={7} fill={C.dim} />

        <g className={s.on(6)}>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={arc(345, 150, 22, (i * Math.PI) / 2 + 0.12, ((i + 1) * Math.PI) / 2 - 0.12)} fill="none" stroke="#e8590c" strokeWidth={9} className={part(6)} />
          ))}
          <circle cx={345} cy={150} r={6} fill={C.dim} />
          <text x={345} y={194} textAnchor="middle" fontSize={11} fill={C.dim}>commutator (end bata herda)</text>
        </g>
        <g className={s.on(7) + s.hl(7)}>
          <rect x={311} y={144} width={11} height={12} fill={C.chalk} />
          <rect x={368} y={144} width={11} height={12} fill={C.chalk} />
          <text x={303} y={136} fontSize={10} fill={C.dim}>+</text>
          <text x={382} y={136} fontSize={10} fill={C.dim}>−</text>
        </g>

        <Label s={s} k={0} x={244} y={80} tx={262} ty={40} text="Yoke" sub="cast iron / steel ko frame" />
        <Label s={s} k={1} x={190} y={60} tx={262} ty={40} text="Pole + pole shoe" sub="flux spread garcha" />
        <Label s={s} k={2} x={182} y={40} tx={262} ty={40} text="Field winding" sub="DC current → flux φ" />
        <Label s={s} k={3} x={180} y={100} tx={262} ty={40} text="Armature core" sub="laminated silicon steel" />
        <Label s={s} k={4} x={180} y={100} tx={262} ty={40} text="Armature core" sub="laminated silicon steel" />
        <Label s={s} k={5} x={184} y={108} tx={262} ty={40} text="Slots ma conductors" sub="= armature winding" />
        <Label s={s} k={6} x={330} y={132} tx={262} ty={40} text="Commutator" sub="copper segments + mica" />
        <Label s={s} k={7} x={316} y={142} tx={262} ty={40} text="Carbon brushes" sub="fixed, commutator ma thichincha" />
      </>
    );
  },
});

// Coil end-on between the poles; angle in degrees measured counter-clockwise on screen.
function CoilAt({ deg, a = 'in', b = 'out', forces, plain }) {
  const r = 58;
  const t = (-deg * Math.PI) / 180;
  const p1 = [180 + r * Math.cos(t + Math.PI), 110 + r * Math.sin(t + Math.PI)];
  const p2 = [180 + r * Math.cos(t), 110 + r * Math.sin(t)];
  return (
    <g>
      <line x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} stroke={C.dim} strokeWidth={2} strokeDasharray="5 4" />
      <circle cx={180} cy={110} r={4} fill={C.dim} />
      {plain ? (
        <>
          <circle cx={p1[0]} cy={p1[1]} r={10} fill={C.orange} />
          <circle cx={p2[0]} cy={p2[1]} r={10} fill={C.orange} />
        </>
      ) : (
        <>
          <Conductor x={p1[0]} y={p1[1]} dir={a} />
          <Conductor x={p2[0]} y={p2[1]} dir={b} />
        </>
      )}
      {forces && (
        <>
          <Arrow x1={p1[0]} y1={p1[1] + 14} x2={p1[0]} y2={p1[1] + 46} color={C.green} w={3} />
          <Arrow x1={p2[0]} y1={p2[1] - 14} x2={p2[0]} y2={p2[1] - 46} color={C.green} w={3} />
        </>
      )}
    </g>
  );
}

export const commutatorAction = video('Commutator action: kina ghumi rahancha', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'Euta matra coil poles ko bich ma flat cha. Current N najik ko side ma bhitra jancha ra S najik ko side bata bahira aaucha.', voice: 'एउटा मात्र कोइल पोल्सको बिचमा फ्ल्याट छ। करेन्ट एन नजिकको साइडमा भित्र जान्छ र एस नजिकको साइडबाट बाहिर आउँछ।' },
    { say: 'N najik ko side tala push huncha, S najik ko side mathi. Duita force le coil lai counter-clockwise twist garcha. Yaha torque sabai bhanda dherai.', voice: 'एन नजिकको साइड तल पुस हुन्छ, एस नजिकको साइड माथि। दुईटा फोर्सले कोइललाई काउन्टर क्लकवाइज ट्विस्ट गर्छ। यहाँ टर्क सबैभन्दा धेरै।' },
    { say: 'Aba coil thadai ubhiyo. Force aajhai tala ra mathi nai cha, tara sidha axle bata pass huncha. Lever arm chaina, so torque zero. Yo ho dead spot.', voice: 'अब कोइल ठाडै उभियो। फोर्स अझै तल र माथि नै छ, तर सिधा एक्सलबाट पास हुन्छ। लिभर आर्म छैन, सो टर्क जिरो। यो हो डेड स्पट।' },
    { say: 'Current kahile switch nabhako bhaye, coil upright bhanda agadi jancha ani tyahi force le pachadi twist garcha. Hallincha ani rokincha.', voice: 'करेन्ट कहिल्यै स्विच नभएको भए, कोइल अपराइट भन्दा अगाडि जान्छ अनि त्यही फोर्सले पछाडि ट्विस्ट गर्छ। हल्लिन्छ अनि रोकिन्छ।' },
    { say: 'Solution chai commutator: coil sangai ghumne split ring, ra duita fixed brushes. Coil upright pass garne bittikai brushes le segment swap garchan ra coil current reverse huncha.', voice: 'सोलुसन चाहिँ कम्युटेटर: कोइलसँगै घुम्ने स्प्लिट रिङ, र दुईटा फिक्स्ड ब्रसेस। कोइल अपराइट पास गर्ने बित्तिकै ब्रसेसले सेग्मेन्ट स्वाप गर्छन् र कोइल करेन्ट रिभर्स हुन्छ।' },
    { say: 'Aba jun side N najik cha, tyasma sadhai current bhitra jancha ra tala push huncha. Torque kahile reverse hudaina, so coil eutai direction ma ghumi rahancha. Dami ho ni ta.', voice: 'अब जुन साइड एन नजिक छ, त्यसमा सधैं करेन्ट भित्र जान्छ र तल पुस हुन्छ। टर्क कहिल्यै रिभर्स हुँदैन, सो कोइल एउटै डाइरेक्सनमा घुमिरहन्छ। दामी हो नि त।' },
    {
      say: 'Switch kati choti huncha, gana.',
      voice: 'स्विच कति चोटि हुन्छ, गन।',
      ask: {
        tag: 'Quick check',
        q: 'Two-segment commutator ma, euta revolution ma coil current kati choti reverse huncha?',
        voice: 'टु सेग्मेन्ट कम्युटेटरमा, एउटा रिभोलुसनमा कोइल करेन्ट कति चोटि रिभर्स हुन्छ?',
        options: ['Dui choti', 'Ek choti', 'Char choti', 'Kahile pani hudaina'],
        answer: 0,
        why: 'Coil euta turn ma dui choti upright pass garcha, 90° ra 270° ma, ani har choti current reverse huncha.',
      },
    },
    { say: 'Real machine ma armature bhari slots ma dherai coils hunchan. Jun bela pani dherai jaso coil best angle najik hunchan, so torque smooth huncha, dead spot nai hudaina.', voice: 'रियल मेसिनमा आर्मेचर भरि स्लट्समा धेरै कोइल्स हुन्छन्। जुन बेला पनि धेरैजसो कोइल बेस्ट एङ्गल नजिक हुन्छन्, सो टर्क स्मुथ हुन्छ, डेड स्पट नै हुँदैन।' },
  ],
  draw: (s) => (
    <>
      <Pole x={14} y={40} label="N" color={C.north} />
      <Pole x={302} y={40} label="S" color={C.south} />
      {[70, 150].map((y) => (
        <Arrow key={y} x1={62} y1={y} x2={298} y2={y} color={C.blue} w={1.2} className="sc on" dash="3 6" />
      ))}
      <g className={s.on(0, 1)}>
        <CoilAt deg={0} forces={s.at(1)} />
      </g>
      <g className={s.on(1, 1)}>
        <path d="M180 40 A70 70 0 0 0 110 110" fill="none" stroke={C.yellow} strokeWidth={2} />
        <polygon points="110,110 104,98 118,100" fill={C.yellow} />
        <text x={190} y={36} fontSize={13} fill={C.yellow} fontWeight={700}>max torque</text>
      </g>
      <g className={s.on(2, 2) + s.hl(2)}>
        <CoilAt deg={90} />
        <Arrow x1={180} y1={66} x2={180} y2={20} color={C.green} w={3} />
        <Arrow x1={180} y1={154} x2={180} y2={200} color={C.green} w={3} />
        <text x={200} y={30} fontSize={13} fill={C.yellow} fontWeight={700}>torque = 0</text>
      </g>
      <g className={s.on(3, 3)}>
        <CoilAt deg={110} />
        <text x={196} y={210} fontSize={13} fill={C.red} fontWeight={700}>pachadi tanincha ↺</text>
      </g>
      <g className={s.on(4, 4)}>
        <CoilAt deg={90} plain />
        {[0, 1].map((i) => (
          <path key={i} d={arc(180, 110, 20, i * Math.PI + 0.25, (i + 1) * Math.PI - 0.25)} fill="none" stroke="#e8590c" strokeWidth={8} />
        ))}
        <rect x={150} y={104} width={9} height={12} fill={C.chalk} />
        <rect x={201} y={104} width={9} height={12} fill={C.chalk} />
        <text x={180} y={212} textAnchor="middle" fontSize={12} fill={C.yellow}>split ring + brushes le coil current reverse garcha</text>
      </g>
      <g className={s.on(5, 6)}>
        <g className="spin-c" style={{ transformOrigin: '180px 110px', animationDirection: 'reverse' }}>
          <CoilAt deg={0} plain />
        </g>
        <text x={66} y={26} fontSize={12} fill={C.chalk}>N najik: sadhai ⊗ → tala</text>
        <text x={200} y={212} fontSize={12} fill={C.chalk}>S najik: sadhai ⊙ → mathi</text>
      </g>
      <g className={s.on(7)}>
        <circle cx={180} cy={110} r={62} fill="#343a40" stroke={C.chalk} strokeWidth={1.5} />
        {slots.map((a, i) => (
          <circle key={i} cx={180 + 52 * Math.cos(a)} cy={110 + 52 * Math.sin(a)} r={6} fill={C.orange} />
        ))}
        <text x={180} y={115} textAnchor="middle" fontSize={13} fill={C.chalk}>dherai coils</text>
      </g>
    </>
  ),
});

export const lapWave = video('Lap ra wave windings', {
  beats: [
    { say: 'Armature conductors yesari jodincha ki brushes ko bich ma current kei parallel paths ma split huncha. Tyo number lai A bhanchau.', voice: 'आर्मेचर कन्डक्टर्स यसरी जोडिन्छ कि ब्रसेसको बिचमा करेन्ट केही प्यारालल पाथ्समा स्प्लिट हुन्छ। त्यो नम्बरलाई ए भन्छौं।' },
    { say: 'Lap winding ma A equals P, matlab poles ko number. Dherai paths, so thulo current ra kam voltage ko lagi sahi.', voice: 'ल्याप वाइन्डिङमा ए इक्वल्स पी, मतलब पोल्सको नम्बर। धेरै पाथ्स, सो ठूलो करेन्ट र कम भोल्टेजको लागि सही।' },
    { say: 'Wave winding ma A sadhai two, poles jati sukai hos. Per path series ma dherai conductors, so voltage badhi ra current kam.', voice: 'वेभ वाइन्डिङमा ए सधैं टु, पोल्स जतिसुकै होस्। पर पाथ सिरिजमा धेरै कन्डक्टर्स, सो भोल्टेज बढी र करेन्ट कम।' },
    { say: 'Armature current I a sabai paths ma barabar baadincha, so har conductor ma I a divided by A bagcha.', voice: 'आर्मेचर करेन्ट आई ए सबै पाथ्समा बराबर बाँडिन्छ, सो हर कन्डक्टरमा आई ए डिभाइडेड बाई ए बग्छ।' },
    {
      say: 'Ekchoti try gara.',
      voice: 'एकचोटि ट्राई गर।',
      ask: {
        tag: 'Quick check',
        q: '4-pole, lap-wound armature ma Ia = 40 A cha. Har conductor ma kati current bagcha?',
        voice: 'फोर पोल, ल्याप वाउन्ड आर्मेचरमा आई ए इक्वल्स फोर्टी एम्पियर छ। हर कन्डक्टरमा कति करेन्ट बग्छ?',
        options: ['10 A', '20 A', '40 A', '160 A'],
        answer: 0,
        why: 'Lap: A = P = 4, so har conductor ma 40 ÷ 4 = 10 A.',
      },
    },
    { say: 'Tyahi machine lai wave ma wind gara, A two huncha, so har conductor ma twenty ampere.', voice: 'त्यही मेसिनलाई वेभमा वाइन्ड गर, ए टु हुन्छ, सो हर कन्डक्टरमा ट्वेन्टी एम्पियर।' },
    { say: 'IOE 2070 Magh ra 2069 Bhadra ma exactly yahi sodheko cha, wave-wound generator ko lagi: har armature conductor ma current nikala.', voice: 'आइओई टु थाउजेन्ड सेभेन्टी माघ र टु थाउजेन्ड सिक्स्टी नाइन भदौमा एक्ज्याक्ट्ली यही सोधेको छ, वेभ वाउन्ड जेनेरेटरको लागि: हर आर्मेचर कन्डक्टरमा करेन्ट निकाल।' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Parallel paths, A</> },
    { at: 1, kind: 'step', node: <><span className="y">Lap</span>: A = P → dherai paths, high current, low voltage</> },
    { at: 2, kind: 'step', node: <><span className="bl">Wave</span>: A = 2 (sadhai) → high voltage, low current</> },
    { at: 3, kind: 'eq', node: <>I<sub>c</sub> = I<sub>a</sub> / A</> },
    { at: 5, kind: 'step', node: <>Wave, tyahi machine: I<sub>c</sub> = 40 / 2 = <span className="y">20 A</span></> },
    { at: 6, kind: 'note', node: <>IOE 2070 Magh · 2069 Bhadra: wave-wound shunt generator ma “current per conductor”.</> },
  ],
});

export const emfDerivation = video('Derivation: EMF equation', {
  tall: true,
  beats: [
    { say: 'La EMF equation derive garau. P poles, phi weber per pole, Z armature conductors, A parallel paths, ra speed N r p m ma.', voice: 'ल ई एम एफ इक्वेसन डिराइभ गरौं। पी पोल्स, फाइ वेबर पर पोल, जेड आर्मेचर कन्डक्टर्स, ए प्यारालल पाथ्स, र स्पिड एन आर पी एममा।' },
    { say: 'Euta revolution ma conductor sabai P poles muni bata pass huncha, so total P phi weber flux cut garcha.', voice: 'एउटा रिभोलुसनमा कन्डक्टर सबै पी पोल्स मुनिबाट पास हुन्छ, सो टोटल पी फाइ वेबर फ्लक्स कट गर्छ।' },
    { say: 'Euta revolution lai sixty over N second lagcha.', voice: 'एउटा रिभोलुसनलाई सिक्स्टी ओभर एन सेकेन्ड लाग्छ।' },
    {
      say: 'Aba Faraday ko law lagau: EMF equals flux cut divided by time.',
      voice: 'अब फाराडेको ल लगाऊ: ई एम एफ इक्वल्स फ्लक्स कट डिभाइडेड बाई टाइम।',
      ask: {
        tag: 'Derivation ko bich ma',
        q: 'So euta conductor ma induce hune EMF…',
        voice: 'सो एउटा कन्डक्टरमा इन्ड्युस हुने ई एम एफ…',
        options: ['PφN / 60', '60Pφ / N', 'Pφ / N', 'φN / 60'],
        answer: 0,
        why: 'e = Pφ ÷ (60/N) = PφN/60 volts.',
      },
    },
    { say: 'EMF per conductor P phi N over sixty volt ho.', voice: 'ई एम एफ पर कन्डक्टर पी फाइ एन ओभर सिक्स्टी भोल्ट हो।' },
    { say: 'Har parallel path ma Z over A conductors series ma hunchan, ani machine ko EMF bhaneko euta path ko EMF nai ho.', voice: 'हर प्यारालल पाथमा जेड ओभर ए कन्डक्टर्स सिरिजमा हुन्छन्, अनि मेसिनको ई एम एफ भनेको एउटा पाथको ई एम एफ नै हो।' },
    { say: 'Multiply gara: E equals P phi Z N over sixty A. Yahi equation le motor ko back EMF pani dincha.', voice: 'मल्टिप्लाई गर: ई इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए। यही इक्वेसनले मोटरको ब्याक ई एम एफ पनि दिन्छ।' },
    { say: 'Euta given machine ma P, Z ra A fixed hunchan, so E equals k phi N. EMF chai flux times speed sanga proportional huncha.', voice: 'एउटा गिभेन मेसिनमा पी, जेड र ए फिक्स्ड हुन्छन्, सो ई इक्वल्स के फाइ एन। ई एम एफ चाहिँ फ्लक्स टाइम्स स्पिडसँग प्रपोर्सनल हुन्छ।' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>EMF equation</> },
    { at: 0, kind: 'note', node: <>P poles · φ Wb/pole · Z conductors · A paths · N rpm</> },
    { at: 1, kind: 'step', node: <>Euta revolution ma cut hune flux: dΦ = <span className="y">Pφ</span> Wb</> },
    { at: 2, kind: 'step', node: <>Euta revolution ko time: dt = <span className="y">60 / N</span> s</> },
    { at: 4, kind: 'step', node: <>EMF per conductor: e = dΦ/dt = Pφ ÷ (60/N) = <span className="y">PφN / 60</span> V</> },
    { at: 5, kind: 'step', node: <>Per path series ma conductors: <span className="y">Z / A</span></> },
    { at: 6, kind: 'eq', node: <>E = (PφN/60) × (Z/A) = PφZN / 60A</> },
    { at: 7, kind: 'step', node: <>Given machine ma: E = kφN ⟹ <span className="g">E ∝ φN</span></> },
  ],
});

export const emfIoe = video('IOE 2078 Poush Q3(b): EMF equation use garau', {
  beats: [
    { say: 'Real IOE question. 4-pole, lap-wound machine ma 300 conductors cha, fifty slots of six, ra fifty milliweber per pole. Yesle 260.25 volt generate garnu parcha. Speed nikala.', voice: 'रियल आइओई क्वेस्चन। फोर पोल, ल्याप वाउन्ड मेसिनमा थ्री हन्ड्रेड कन्डक्टर्स छ, फिफ्टी स्लट्स अफ सिक्स, र फिफ्टी मिलिवेबर पर पोल। यसले टु हन्ड्रेड सिक्स्टी पोइन्ट टु फाइभ भोल्ट जेनेरेट गर्नुपर्छ। स्पिड निकाल।' },
    { say: 'EMF equation lai speed ko lagi rearrange gara: N equals sixty A E over P phi Z.', voice: 'ई एम एफ इक्वेसनलाई स्पिडको लागि रिअरेन्ज गर: एन इक्वल्स सिक्स्टी ए ई ओभर पी फाइ जेड।' },
    {
      say: 'Pahila, paths ko number.',
      voice: 'पहिला, पाथ्सको नम्बर।',
      ask: {
        tag: 'IOE 2078 Poush · 2070 Bhadra',
        q: 'Yo lap-wound, 4-pole armature ko lagi A = ?',
        voice: 'यो ल्याप वाउन्ड, फोर पोल आर्मेचरको लागि ए इक्वल्स कति?',
        options: ['4', '2', '1', '300'],
        answer: 0,
        why: 'Lap winding: A = P = 4.',
      },
    },
    { say: 'N equals sixty times four times 260.25, over four times 0.05 times 300. Tyo bhayo 62,460 over sixty: 1041 r p m.', voice: 'एन इक्वल्स सिक्स्टी टाइम्स फोर टाइम्स टु हन्ड्रेड सिक्स्टी पोइन्ट टु फाइभ, ओभर फोर टाइम्स जिरो पोइन्ट जिरो फाइभ टाइम्स थ्री हन्ड्रेड। त्यो भयो सिक्स्टी टु थाउजेन्ड फोर हन्ड्रेड सिक्स्टी ओभर सिक्स्टी: टेन फोर्टी वान आर पी एम।' },
    {
      say: 'Paper le yo pani sodhcha: wave wound bhako bhaye ni?',
      voice: 'पेपरले यो पनि सोध्छ: वेभ वाउन्ड भएको भए नि?',
      ask: {
        tag: 'IOE 2078 Poush · 2070 Bhadra',
        q: 'Tyahi machine, wave wound. Kun speed le tyahi 260.25 V dincha?',
        voice: 'त्यही मेसिन, वेभ वाउन्ड। कुन स्पिडले त्यही टु हन्ड्रेड सिक्स्टी पोइन्ट टु फाइभ भोल्ट दिन्छ?',
        options: ['520.5 rpm', '1041 rpm', '2082 rpm', '260.25 rpm'],
        answer: 0,
        why: 'Wave: A = 2, so N = 60 × 2 × 260.25 / 60 = 520.5 rpm. Per path series ma dobbar conductors, so speed aadha.',
      },
    },
    { say: '260.25 volt kaha bata aayo? Yo long-shunt generator ho: forty ampere load, one ampere shunt, forty-one armature bata, so E chai 250 plus 41 times 0.25.', voice: 'टु हन्ड्रेड सिक्स्टी पोइन्ट टु फाइभ भोल्ट कहाँबाट आयो? यो लङ शन्ट जेनेरेटर हो: फोर्टी एम्पियर लोड, वान एम्पियर शन्ट, फोर्टी वान आर्मेचरबाट, सो ई चाहिँ टु फिफ्टी प्लस फोर्टी वान टाइम्स जिरो पोइन्ट टु फाइभ।' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>4-pole lap · Z = 300 · φ = 50 mWb · E = 260.25 V</> },
    { at: 1, kind: 'eq', node: <>N = 60·A·E / (P·φ·Z)</> },
    { at: 3, kind: 'step', node: <>N = 60 × 4 × 260.25 / (4 × 0.05 × 300) = 62 460 / 60 = <span className="y">1041 rpm</span></> },
    { at: 4, kind: 'step', node: <>Wave (A = 2): N = <span className="y">520.5 rpm</span></> },
    { at: 5, kind: 'note', node: <>Circuit bata: I<sub>L</sub> = 10 kW / 250 V = 40 A, I<sub>sh</sub> = 1 A, I<sub>a</sub> = 41 A, E = 250 + 41 × (0.1 + 0.15) = 260.25 V</> },
  ],
});

// IOE model answer for this chapter.
export const ch2Model = model({
  q: 'DC machine ma commutator ra carbon brushes ko function explain gara.',
  papers: ['2071 Chaitra', '2072 Ashwin', '2081 Ashwin (ECM)', '2082 Bhadra (ECM)'],
  marks: '3–5 marks',
  points: [
    <><b>Commutator, construction:</b> hard-drawn copper segments ko cylinder, ek arka bata patalo mica le insulated, shaft ma mount gareko. Har segment armature coils ko end sanga jodieko huncha.</>,
    <><b>Motor ma commutator:</b> coil neutral zone pass garda tyo coil ko current reverse garcha, so euta pole muni ka conductors ma sadhai same direction ma current bagcha ra torque unidirectional rahancha.</>,
    <><b>Generator ma commutator:</b> coils ma induce bhako alternating EMF lai brushes ma unidirectional (DC) voltage ma convert garcha. Exam ma lekha: “a mechanical rectifier”.</>,
    <><b>Brushes:</b> brush holder ko spring le commutator ma thicheko stationary contacts. Yinle ghumne armature ra external circuit ko bich ma current bokchan.</>,
    <><b>Carbon kina:</b> yo self-lubricating ra copper bhanda naram huncha, so commutator ko satta brush khiyincha, ani yesko contact resistance le sparkless commutation ma help garcha.</>,
  ],
  tip: 'Duita brush sahit split ring draw gara, ani segments, mica ra brushes label gara. Diagram le marks dilaucha, bro. Exam ma English mai lekha.',
});
