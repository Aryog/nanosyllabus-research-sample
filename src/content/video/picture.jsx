import { answer } from './kit.jsx';

/*
  Big picture model answers, written up on the board as videos (kit.jsx
  `answer`). Same marking-scheme points as the IOE model-answer cards in
  ch3/ch6/ch7/testing.jsx, compressed to what fits a whiteboard line.
*/

export const torqueAnswer = answer('Model answer: working principle ra torque equation', {
  papers: ['2073 Chaitra', '2069 Bhadra', '2082 Baishakh (ECM)'],
  marks: '[4 + 2]',
  q: 'Explain the working principle of a DC motor and derive the torque equation.',
  read: {
    say: 'IOE ko favourite question: DC motor ko working principle explain gara ani torque equation derive gara. Tin choti aaisakyo.',
    voice: 'आइओईको फेभरेट क्वेस्चन: डीसी मोटरको वर्किङ प्रिन्सिपल एक्सप्लेन गर अनि टर्क इक्वेसन डेराइभ गर। तीन चोटि आइसक्यो।',
  },
  points: [
    {
      node: <><b>Principle:</b> a current-carrying conductor in a magnetic field experiences a force F = BIl; direction by Fleming’s left-hand rule.</>,
      say: 'Pahilo point, principle: field ma current bokeko conductor le F equals B I l force paucha. Direction Fleming ko left-hand rule le.',
      voice: 'पहिलो पोइन्ट, प्रिन्सिपल: फिल्डमा करेन्ट बोकेको कन्डक्टरले एफ इक्वल्स बी आई एल फोर्स पाउँछ। डाइरेक्सन फ्लेमिङको लेफ्ट ह्यान्ड रुलले।',
    },
    {
      node: <><b>Working:</b> conductors under N carry current one way and under S the other, so every force turns the armature the same way.</>,
      say: 'Working: N muni ra S muni current ulto bagcha, tesaile sabai force le armature lai eutai tira ghumauchan.',
      voice: 'वर्किङ: एन मुनि र एस मुनि करेन्ट उल्टो बग्छ, त्यसैले सबै फोर्सले आर्मेचरलाई एउटै तिर घुमाउँछन्।',
    },
    {
      node: <><b>Commutator:</b> reverses each coil’s current at the neutral zone, so the torque stays unidirectional.</>,
      say: 'Commutator le neutral zone ma coil ko current reverse garcha, ani torque ek tira matra rahancha.',
      voice: 'कम्युटेटरले न्युट्रल जोनमा कोइलको करेन्ट रिभर्स गर्छ, अनि टर्क एकतिर मात्र रहन्छ।',
    },
    {
      node: <><b>Derivation:</b> I<sub>c</sub> = I<sub>a</sub>/A, B = Pφ/2πrl, F = BI<sub>c</sub>l, τ = F·r = PφI<sub>a</sub>/2πA per conductor.</>,
      say: 'Derivation ko chain segment 2 mai garyau: current per path, flux density, force, ani torque per conductor.',
      voice: 'डेराइभेसनको चेन सेग्मेन्ट टु मै गर्यौं: करेन्ट पर पाथ, फ्लक्स डेन्सिटी, फोर्स, अनि टर्क पर कन्डक्टर।',
    },
    {
      node: <><b>Result:</b> T<sub>a</sub> = 0.159 φZI<sub>a</sub>(P/A) N·m, so <span className="g">T<sub>a</sub> ∝ φI<sub>a</sub></span>.</>,
      say: 'Z le multiply garda result: T a equals zero point one five nine phi Z I a P over A. Yo line box gara!',
      voice: 'जेडले मल्टिप्लाइ गर्दा रिजल्ट: टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन फाइ जेड आई ए पी ओभर ए। यो लाइन बक्स गर!',
    },
    {
      node: <><b>Consequence:</b> shunt (φ constant): T<sub>a</sub> ∝ I<sub>a</sub>; series (φ ∝ I<sub>a</sub>): T<sub>a</sub> ∝ I<sub>a</sub>².</>,
      say: 'Last ma consequence: shunt ma torque Ia sanga linear, series ma Ia square sanga.',
      voice: 'लास्टमा कन्सिक्वेन्स: शन्टमा टर्क आई ए सँग लिनियर, सिरिजमा आई ए स्क्वायर सँग।',
    },
  ],
  tip: {
    node: <>N–S ko bichma armature, ⊗ ⊙ conductor ra force arrow draw gara. Exam ma English mai lekha.</>,
    say: 'Exam tip: N S ko bichma armature ra force arrow draw gara, ani English mai lekha. Full marks pakka!',
    voice: 'एक्जाम टिप: एन एसको बिचमा आर्मेचर र फोर्स एरो ड्र गर, अनि इङ्लिस मै लेख। फुल मार्क्स पक्का!',
  },
});

export const characteristicsAnswer = answer('Model answer: shunt ra series characteristics', {
  papers: ['2070 Magh'],
  marks: '[8]',
  q: 'Explain the torque–armature current and speed–torque characteristics of DC shunt and DC series motors.',
  read: {
    say: 'IOE 2070 Magh, 8 marks: shunt ra series motor ko torque–current ra speed–torque characteristics explain gara.',
    voice: 'आइओई टु थाउजेन्ड सेभेन्टी माघ, एट मार्क्स: शन्ट र सिरिज मोटरको टर्क करेन्ट र स्पिड टर्क क्यारेक्टरिस्टिक्स एक्सप्लेन गर।',
  },
  points: [
    {
      node: <>Start from <b>T<sub>a</sub> ∝ φI<sub>a</sub></b> and <b>N ∝ (V − I<sub>a</sub>R<sub>a</sub>)/φ</b>.</>,
      say: 'Duita relation bata suru gara: Ta proportional to phi Ia, ani N proportional to V minus Ia Ra over phi.',
      voice: 'दुईटा रिलेसनबाट सुरु गर: टी ए प्रोपोर्सनल टु फाइ आई ए, अनि एन प्रोपोर्सनल टु भी माइनस आई ए आर ए ओभर फाइ।',
    },
    {
      node: <><b>Shunt T<sub>a</sub>–I<sub>a</sub>:</b> φ constant, so a straight line through the origin.</>,
      say: 'Shunt ma flux constant, so torque–current graph origin bata sidha line.',
      voice: 'शन्टमा फ्लक्स कन्स्टेन्ट, सो टर्क करेन्ट ग्राफ ओरिजिनबाट सिधा लाइन।',
    },
    {
      node: <><b>Shunt N–T:</b> I<sub>a</sub>R<sub>a</sub> is small, so speed falls only 5–15%: almost constant speed.</>,
      say: 'Shunt ko speed load ma thorai matra jharcha, five dekhi fifteen percent. Almost constant speed.',
      voice: 'शन्टको स्पिड लोडमा थोरै मात्र झर्छ, फाइभ देखि फिफ्टिन पर्सेन्ट। अल्मोस्ट कन्स्टेन्ट स्पिड।',
    },
    {
      node: <><b>Series T<sub>a</sub>–I<sub>a</sub>:</b> φ ∝ I<sub>a</sub>, so T<sub>a</sub> ∝ I<sub>a</sub>² (parabola), linear after saturation.</>,
      say: 'Series ma flux Ia sanga badhcha, so torque Ia square: parabola. Saturation pachi line.',
      voice: 'सिरिजमा फ्लक्स आई ए सँग बढ्छ, सो टर्क आई ए स्क्वायर: प्याराबोला। स्याचुरेसन पछि लाइन।',
    },
    {
      node: <><b>Series N–T:</b> N ∝ 1/I<sub>a</sub>, a hyperbola; dangerously high speed at no load.</>,
      say: 'Series ko speed one over Ia: hyperbola. No load ma speed khatarnak high, kahile pani no load ma start nagara.',
      voice: 'सिरिजको स्पिड वान ओभर आई ए: हाइपरबोला। नो लोडमा स्पिड खतरनाक हाइ, कहिल्यै पनि नो लोडमा स्टार्ट नगर।',
    },
    {
      node: <><b>Conclude:</b> shunt for constant-speed drives; series for traction and cranes.</>,
      say: 'Conclude gara: shunt constant speed drive ko lagi, series traction ra crane ko lagi.',
      voice: 'कन्क्लुड गर: शन्ट कन्स्टेन्ट स्पिड ड्राइभको लागि, सिरिज ट्र्याक्सन र क्रेनको लागि।',
    },
  ],
  tip: {
    node: <>Charai curve labelled axes sanga sketch gara; series T<sub>a</sub>–I<sub>a</sub> ma saturation bend mark gara.</>,
    say: 'Tip: charai curve label gareko axes sanga sketch gara. Graph bina yo answer adhuro ho.',
    voice: 'टिप: चारै कर्भ लेबल गरेको एक्सिस सँग स्केच गर। ग्राफ बिना यो आन्सर अधुरो हो।',
  },
});

export const starterAnswer = answer('Model answer: starter ko necessity ra 3-point starter', {
  papers: ['2075 Baisakh', '2074 Bhadra', '2073 Bhadra', '2070 Bhadra', '2068 Magh', '2066 Magh', '2083 Baishakh (ECM)'],
  marks: '[2 + 6]',
  q: 'Why is a starter needed for a DC motor? Describe the working of a 3-point starter with a neat diagram.',
  read: {
    say: 'IOE ko all-time hit, saat choti aayo: starter kina chahincha, ani 3-point starter ko working diagram sanga.',
    voice: 'आइओईको अल टाइम हिट, सात चोटि आयो: स्टार्टर किन चाहिन्छ, अनि थ्री पोइन्ट स्टार्टरको वर्किङ डायग्राम सँग।',
  },
  points: [
    {
      node: <><b>Necessity:</b> at start N = 0, so E<sub>b</sub> = 0 and I<sub>a</sub> = V/R<sub>a</sub> (220/0.5 = 440 A), 15–25× rated: it damages the commutator, brushes and winding.</>,
      say: 'Necessity: start ma back EMF zero, so current V over Ra, rated ko pandhra dekhi pachis guna. Commutator ra winding jalcha.',
      voice: 'नेसेसिटी: स्टार्टमा ब्याक इएमएफ जिरो, सो करेन्ट भी ओभर आर ए, रेटेडको पन्ध्र देखि पच्चिस गुना। कम्युटेटर र वाइन्डिङ जल्छ।',
    },
    {
      node: <><b>Diagram:</b> terminals L, F, A; resistance studs; handle with spring; OLR in the line; brass arc → NVC → field.</>,
      say: 'Diagram ma L, F, A terminal, resistance studs, spring bhako handle, OLR ra NVC. Yo diagram nai six marks ho.',
      voice: 'डायग्राममा एल, एफ, ए टर्मिनल, रेजिस्टेन्स स्टड्स, स्प्रिङ भएको ह्यान्डल, ओएलआर र एनभीसी। यो डायग्राम नै सिक्स मार्क्स हो।',
    },
    {
      node: <><b>Starting:</b> handle to stud 1, so full R is in series with the armature and the field gets full voltage; move stud by stud as E<sub>b</sub> rises.</>,
      say: 'Starting: handle stud one ma, full resistance armature sanga series ma. Speed badhdai jada stud by stud sara.',
      voice: 'स्टार्टिङ: ह्यान्डल स्टड वानमा, फुल रेजिस्टेन्स आर्मेचर सँग सिरिजमा। स्पिड बढ्दै जाँदा स्टड बाइ स्टड सार।',
    },
    {
      node: <><b>NVC:</b> in series with the field, holds the handle at RUN; if the supply fails, the spring returns the handle to OFF.</>,
      say: 'NVC field sanga series ma. Supply gayo bhane magnet chhodcha, spring le handle OFF ma pharkaucha.',
      voice: 'एनभीसी फिल्ड सँग सिरिजमा। सप्लाई गयो भने म्याग्नेट छोड्छ, स्प्रिङले ह्यान्डल अफमा फर्काउँछ।',
    },
    {
      node: <><b>OLR:</b> in series with the line; on overload it shorts the NVC, so the handle goes OFF.</>,
      say: 'OLR line sanga series ma. Overload huda NVC short garcha, ani handle OFF.',
      voice: 'ओएलआर लाइन सँग सिरिजमा। ओभरलोड हुँदा एनभीसी सर्ट गर्छ, अनि ह्यान्डल अफ।',
    },
    {
      node: <><b>Drawback:</b> field weakening also weakens the NVC, so the handle can release; the 4-point starter fixes this.</>,
      say: 'Drawback: field weaken garda NVC pani kamjor, handle aafai chhodcha. Tesko solution 4-point starter.',
      voice: 'ड्रब्याक: फिल्ड वीकन गर्दा एनभीसी पनि कमजोर, ह्यान्डल आफै छोड्छ। त्यसको सोलुसन फोर पोइन्ट स्टार्टर।',
    },
  ],
  tip: {
    node: <>L, F, A, studs, brass arc, NVC, OLR ra spring clearly label gara.</>,
    say: 'Tip: diagram ma harek part label gara. Label chhutyo bhane marks katcha.',
    voice: 'टिप: डायग्राममा हरेक पार्ट लेबल गर। लेबल छुट्यो भने मार्क्स काट्छ।',
  },
});

export const testingAnswer = answer('Model answer: Swinburne ra retardation test', {
  papers: [],
  marks: 'Exam-style',
  q: 'Explain Swinburne’s test and the retardation test for finding the losses of a DC machine. State the merits and demerits of Swinburne’s test.',
  read: {
    say: 'Exam-style question: Swinburne test ra retardation test explain gara, ani Swinburne ko merits ra demerits lekha.',
    voice: 'एक्जाम स्टाइल क्वेस्चन: स्विनबर्न टेस्ट र रिटार्डेसन टेस्ट एक्सप्लेन गर, अनि स्विनबर्नको मेरिट्स र डिमेरिट्स लेख।',
  },
  points: [
    {
      node: <><b>Swinburne:</b> shunt machine at no load, rated V and N; W<sub>c</sub> = V·I₀ − I<sub>a0</sub>²R<sub>a</sub>, with I<sub>a0</sub> = I₀ − I<sub>sh</sub>.</>,
      say: 'Swinburne: shunt machine lai no load ma rated voltage ra speed ma chalau. Input bata armature copper loss ghatau, constant loss aaucha.',
      voice: 'स्विनबर्न: शन्ट मेसिनलाई नो लोडमा रेटेड भोल्टेज र स्पिडमा चलाऊ। इनपुटबाट आर्मेचर कपर लस घटाऊ, कन्स्टेन्ट लस आउँछ।',
    },
    {
      node: <><b>η at any load:</b> motor η = (V·I<sub>L</sub> − W<sub>c</sub> − I<sub>a</sub>²R<sub>a</sub>) / V·I<sub>L</sub>.</>,
      say: 'Ani jun sukai load ko efficiency: input bata constant loss ra Ia square Ra ghatau, input le bhaag gara.',
      voice: 'अनि जुन सुकै लोडको इफिसियन्सी: इनपुटबाट कन्स्टेन्ट लस र आई ए स्क्वायर आर ए घटाऊ, इनपुटले भाग गर।',
    },
    {
      node: <><b>Merits:</b> economical; η can be predetermined at any load.</>,
      say: 'Merits: sasto, thorai power chahincha, ani load nahali efficiency thaha huncha.',
      voice: 'मेरिट्स: सस्तो, थोरै पावर चाहिन्छ, अनि लोड नहाली इफिसियन्सी थाहा हुन्छ।',
    },
    {
      node: <><b>Demerits:</b> ignores the change in iron loss on load; not for series motors; full-load heating and commutation are not tested.</>,
      say: 'Demerits: load ma iron loss ko change ignore huncha, series motor ma garna mildaina, full load ko heating test hudaina.',
      voice: 'डिमेरिट्स: लोडमा आइरन लसको चेन्ज इग्नोर हुन्छ, सिरिज मोटरमा गर्न मिल्दैन, फुल लोडको हिटिङ टेस्ट हुँदैन।',
    },
    {
      node: <><b>Retardation:</b> run above rated speed, switch off the armature (field on); W = (2π/60)² J N dN/dt.</>,
      say: 'Retardation: rated bhanda mathi chalau, armature off gara, field on rakha. Slow hune rate bata rotational loss.',
      voice: 'रिटार्डेसन: रेटेड भन्दा माथि चलाऊ, आर्मेचर अफ गर, फिल्ड अन राख। स्लो हुने रेटबाट रोटेसनल लस।',
    },
    {
      node: <><b>Without J:</b> repeat with an extra load W′: W = W′·t₂ / (t₁ − t₂).</>,
      say: 'J thaha chaina bhane extra load W dash rakhera feri gara: W equals W dash t two over t one minus t two.',
      voice: 'जे थाहा छैन भने एक्स्ट्रा लोड डब्लु ड्यास राखेर फेरि गर: डब्लु इक्वल्स डब्लु ड्यास टी टु ओभर टी वान माइनस टी टु।',
    },
  ],
  tip: {
    node: <>Swinburne ko circuit draw gara: ammeter line ma, field ma ammeter ra rheostat, armature ma voltmeter.</>,
    say: 'Tip: Swinburne ko circuit draw garna nabirsa. Exam ma English mai lekha.',
    voice: 'टिप: स्विनबर्नको सर्किट ड्र गर्न नबिर्स। एक्जाममा इङ्लिस मै लेख।',
  },
});
