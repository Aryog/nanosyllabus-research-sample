import { video } from './kit.jsx';

/*
  Segment 1 openers: one short video per micro-topic that ties the terms to a
  single everyday example before the real definitions. Light, not jokey: one
  analogy per idea, at most one emoji per board.
*/

const check = (q, voice, options, answer, why) => ({
  say: 'Ekchin, dhyan check.',
  voice: 'एकछिन, ध्यान चेक।',
  ask: { tag: 'Dhyan check 👀', q, voice, options, answer, why },
});

export const vibe41 = video('DC motor hamro dherai najik cha', {
  beats: [
    { say: 'Phone vibrate huda bhitra euta sano DC motor ghumcha. Fan, lift ra electric car ma pani yei principle cha.', voice: 'फोन भाइब्रेट हुँदा भित्र एउटा सानो डीसी मोटर घुम्छ। फ्यान, लिफ्ट र इलेक्ट्रिक कारमा पनि यही प्रिन्सिपल छ।' },
    { say: 'Magnetic field bhitra current bokeko taar rakhyo bhane, taar lai dhakka lagcha. Tyo dhakka nai force ho.', voice: 'म्याग्नेटिक फिल्ड भित्र करेन्ट बोकेको तार राख्यो भने, तारलाई धक्का लाग्छ। त्यो धक्का नै फोर्स हो।' },
    { say: 'Back EMF treadmill jastai: jati chhito daudincha, teti ulto push badhcha. Motor jati chhito ghumcha, current teti nai ghatcha.', voice: 'ब्याक इएमएफ ट्रेडमिल जस्तै: जति छिटो दौडिन्छ, त्यति उल्टो पुस बढ्छ। मोटर जति छिटो घुम्छ, करेन्ट त्यति नै घट्छ।' },
    check('Phone vibrate garaune chij k ho bhaniyo?', 'फोन भाइब्रेट गराउने चिज के हो भनियो?', ['Speaker', 'Sano DC motor', 'Battery matra'], 1, 'Phone bhitra sano DC motor ghumera vibration dincha.'),
  ],
  board: [
    { at: 0, kind: 'h', node: <>DC motor: kaha kaha?</> },
    { at: 0, kind: 'step', node: <>Phone vibration · fan · lift · electric car</> },
    { at: 1, kind: 'step', node: <>Field + current bokeko taar → force (dhakka)</> },
    { at: 2, kind: 'step', node: <>Back EMF ≈ treadmill ko ulto push: speed ↑ → current ↓</> },
  ],
});

export const vibe42 = video('Kun motor kasto swabhav ko?', {
  beats: [
    { say: 'Shunt motor ko speed load thapda pani lagbhag same rahancha, jasari cruise control ma car ko speed.', voice: 'शन्ट मोटरको स्पिड लोड थप्दा पनि लगभग उही रहन्छ, जसरी क्रुज कन्ट्रोलमा कारको स्पिड।' },
    { say: 'Series motor le start mai dherai torque dincha, tesaile crane ra train ma use huncha. Tara load bina chalayo bhane speed khatarnak badhcha.', voice: 'सिरिज मोटरले स्टार्टमै धेरै टर्क दिन्छ, त्यसैले क्रेन र ट्रेनमा युज हुन्छ। तर लोड बिना चलायो भने स्पिड खतरनाक बढ्छ।' },
    { say: 'Compound motor ma dubai field huncha, tesaile dubai ko guna ali ali milcha.', voice: 'कम्पाउन्ड मोटरमा दुवै फिल्ड हुन्छ, त्यसैले दुवैको गुण अलि अलि मिल्छ।' },
    check('Load bina chalauda kun motor ko speed khatarnak badhcha?', 'लोड बिना चलाउँदा कुन मोटरको स्पिड खतरनाक बढ्छ?', ['Shunt', 'Compound', 'Series'], 2, 'Series motor no load ma dangerously fast huncha.'),
  ],
  board: [
    { at: 0, kind: 'h', node: <>Tin type, tin swabhav</> },
    { at: 0, kind: 'step', node: <>Shunt → speed steady (cruise control jastai)</> },
    { at: 1, kind: 'step', node: <>Series → dherai starting torque · crane, train</> },
    { at: 1, kind: 'trap', node: <>Series lai load bina nachalau</> },
    { at: 2, kind: 'step', node: <>Compound → dubai ko mix</> },
  ],
});

export const vibe43 = video('Charger kina taato huncha?', {
  beats: [
    { say: 'Phone charge garda charger taato huncha. Tyo taap nai loss ho: power jun kaam ma lagena.', voice: 'फोन चार्ज गर्दा चार्जर तातो हुन्छ। त्यो ताप नै लस हो: पावर जुन काममा लागेन।' },
    { say: 'Kehi loss subscription jasto fixed hunchan: load hos ya nahos, lagi rahancha. Yinlai constant loss bhanincha.', voice: 'केही लस सब्स्क्रिप्सन जस्तो फिक्स्ड हुन्छन्: लोड होस् या नहोस्, लागि रहन्छ। यिनलाई कन्स्टेन्ट लस भनिन्छ।' },
    { say: 'Kehi chai mobile data bill jasto: jati use, teti badhcha. Current badhyo bhane copper loss badhcha.', voice: 'केही चाहिँ मोबाइल डाटा बिल जस्तो: जति युज, त्यति बढ्छ। करेन्ट बढ्यो भने कपर लस बढ्छ।' },
    check('Load anusar change nahune loss lai k bhaniyo?', 'लोड अनुसार चेन्ज नहुने लसलाई के भनियो?', ['Constant loss', 'Variable loss', 'Kunai pani hoina'], 0, 'Constant loss load jati bhaye pani lagbhag same rahancha.'),
  ],
  board: [
    { at: 0, kind: 'h', node: <>Power kata harayo?</> },
    { at: 0, kind: 'step', node: <>Taato charger = loss (kaam nalageko power)</> },
    { at: 1, kind: 'step', node: <>Constant loss = fixed subscription jastai</> },
    { at: 2, kind: 'step', node: <>Variable loss = data bill jastai, use anusar</> },
  ],
});

export const vibe44 = video('Motor lai pani warm-up chahincha', {
  beats: [
    { say: 'Chiso jiu le sidhai sprint garyo bhane chot lagcha. Motor ko pani start ma current dherai thulo huncha.', voice: 'चिसो जिउले सिधै स्प्रिन्ट गर्यो भने चोट लाग्छ। मोटरको पनि स्टार्टमा करेन्ट धेरै ठूलो हुन्छ।' },
    { say: 'Starter le warm-up jastai kaam garcha: resistance bistarai hataudai, speed bistarai badhaucha.', voice: 'स्टार्टरले वार्म अप जस्तै काम गर्छ: रेजिस्टेन्स बिस्तारै हटाउँदै, स्पिड बिस्तारै बढाउँछ।' },
    { say: 'Supply gayo bhane NVC le handle lai aafai OFF ma pharkaucha, jasle current feri aauda motor jhatka sanga start hudaina.', voice: 'सप्लाई गयो भने एनभीसीले ह्यान्डललाई आफै अफमा फर्काउँछ, जसले करेन्ट फेरि आउँदा मोटर झट्का सँग स्टार्ट हुँदैन।' },
    check('Starter lai kun sanga dajaiyo?', 'स्टार्टरलाई कुन सँग दाँजियो?', ['Subscription', 'Warm-up', 'Cruise control'], 1, 'Starter le current bistarai badhauna dincha, warm-up jastai.'),
  ],
  board: [
    { at: 0, kind: 'h', node: <>Start garda saavdhan</> },
    { at: 0, kind: 'step', node: <>Start ma current dherai thulo</> },
    { at: 1, kind: 'step', node: <>Starter = warm-up: R bistarai hataune</> },
    { at: 2, kind: 'step', node: <>NVC: supply gaye handle OFF</> },
  ],
});

export const vibe45 = video('Speed control bike ko gear jastai', {
  beats: [
    { say: 'Bike ma gear badlera speed milaucham. Motor ma pani speed milaune tin tarika chan.', voice: 'बाइकमा गियर बदलेर स्पिड मिलाउँछौं। मोटरमा पनि स्पिड मिलाउने तीन तरिका छन्।' },
    { say: 'Field weaken garda top gear jastai: speed badhcha tara torque ghatcha. Armature ma resistance thapda speed ghatcha.', voice: 'फिल्ड वीकन गर्दा टप गियर जस्तै: स्पिड बढ्छ तर टर्क घट्छ। आर्मेचरमा रेजिस्टेन्स थप्दा स्पिड घट्छ।' },
    { say: 'Direction ulto garna field wa armature, euta matra ulto gara. Dubai ulto garyo bhane direction uhi rahancha.', voice: 'डाइरेक्सन उल्टो गर्न फिल्ड वा आर्मेचर, एउटा मात्र उल्टो गर। दुवै उल्टो गर्यो भने डाइरेक्सन उही रहन्छ।' },
    check('Top gear jastai kun method bhaniyo?', 'टप गियर जस्तै कुन मेथड भनियो?', ['Armature resistance', 'Field weaken', 'Supply off'], 1, 'Field weaken → φ ↓ → speed ↑, top gear jastai.'),
  ],
  board: [
    { at: 0, kind: 'h', node: <>Speed milaune tarika</> },
    { at: 1, kind: 'step', node: <>Field weaken → speed ↑, torque ↓ (top gear)</> },
    { at: 1, kind: 'step', node: <>Armature R → speed ↓</> },
    { at: 2, kind: 'step', node: <>Reverse: euta matra ulto (dubai ulto = uhi direction)</> },
  ],
});

export const vibe46 = video('Load nahali machine jaanchne', {
  beats: [
    { say: 'Phone ko battery kati khapat huncha bhanera idle ma rakhera hercham. Swinburne test pani yestai: motor lai no load ma chalaucham.', voice: 'फोनको ब्याट्री कति खपत हुन्छ भनेर आइडलमा राखेर हेर्छौं। स्विनबर्न टेस्ट पनि यस्तै: मोटरलाई नो लोडमा चलाउँछौं।' },
    { say: 'Retardation test cycle ko pedal chhodera hernu jastai: kati chhito rokincha, tyo bata friction ra losses thaha huncha.', voice: 'रिटार्डेसन टेस्ट साइकलको प्याडल छोडेर हेर्नु जस्तै: कति छिटो रोकिन्छ, त्यसबाट फ्रिक्सन र लसेस थाहा हुन्छ।' },
    check('Pedal chhodera herne jastai kun test?', 'प्याडल छोडेर हेर्ने जस्तै कुन टेस्ट?', ['Retardation test', 'Swinburne test', 'Short circuit test'], 0, 'Retardation test ma supply off garera machine slow hune rate herincha.'),
  ],
  board: [
    { at: 0, kind: 'h', node: <>Load bina testing</> },
    { at: 0, kind: 'step', node: <>Swinburne = idle battery check jastai (no load)</> },
    { at: 1, kind: 'step', node: <>Retardation = pedal chhodera rokine samaya</> },
  ],
});
