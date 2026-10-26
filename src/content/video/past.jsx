import { D, solve, video } from './kit.jsx';

/*
  Past Questions: real IOE numericals the chapters did not already use, solved
  on the whiteboard one at a time (read → data → find → idea → steps → answer →
  trap), mixed across patterns and ordered easy → hard. Each pauses once to let
  the learner predict the key step. Then a recap video that quizzes every
  chapter once more (spaced retrieval).
  Narration is Gen-Z Nepali (romanized `say`, Devanagari `voice`); the
  `question` prop stays the real English IOE paper text.
*/

export const pastQuestions = [
  solve({
    title: 'Shunt motor: load badhda speed kati?',
    paper: '2075 Baishakh',
    paperVoice: 'टु थाउजेन्ड सेभेन्टी फाइभ बैशाख',
    read: 'Euta 1.25 kilowatt, 250 volt ko DC shunt motor no load ma 1000 rpm ma ghumcha. Armature resistance 0.2 ohm, shunt field 250 ohm. Load halepachi 50 ampere tanda speed kati huncha, nikalnu cha.',
    readVoice: 'एउटा वान पोइन्ट टु फाइभ किलोवाट, टु हन्ड्रेड फिफ्टी भोल्टको डीसी शन्ट मोटर नो लोडमा थाउजेन्ड आर पी एममा घुम्छ। आर्मेचर रेजिस्टेन्स जिरो पोइन्ट टु ओम, शन्ट फिल्ड टु हन्ड्रेड फिफ्टी ओम। लोड हालेपछि फिफ्टी एम्पियर तान्दा स्पिड कति हुन्छ, निकाल्नु छ।',
    question: <>A <D>1.25 kW</D>, <D>250 V</D> DC shunt motor on no load runs at <D>1000 rpm</D>. <D>Ra = 0.2 Ω</D>, <D>Rsh = 250 Ω</D>. Find its speed when loaded and drawing <D>50 A</D>. (The 1.25 kW is read as the no-load input.)</>,
    given: [
      { node: <>V = 250 V, Ra = 0.2 Ω, Rsh = 250 Ω</>, say: 'V 250 volt, Ra 0.2 ohm, Rsh 250 ohm', voice: 'भी टु हन्ड्रेड फिफ्टी भोल्ट, आर ए जिरो पोइन्ट टु ओम, आर एस एच टु हन्ड्रेड फिफ्टी ओम' },
      { node: <>No load ma: input 1.25 kW ⟹ IL₀ = 1250/250 = 5 A, N₀ = 1000 rpm</>, say: 'no load ma 1.25 kilowatt linchha, tesaile line current 1250 over 250, matlab 5 ampere, 1000 rpm ma', voice: 'नो लोडमा वान पोइन्ट टु फाइभ किलोवाट लिन्छ, तेसैले लाइन करेन्ट ट्वेल्भ हन्ड्रेड फिफ्टी ओभर टु हन्ड्रेड फिफ्टी, मतलब फाइभ एम्पियर, थाउजेन्ड आर पी एममा' },
      { node: <>Load ma: IL = 50 A, N = ?</>, say: 'load ma line current 50 ampere', voice: 'लोडमा लाइन करेन्ट फिफ्टी एम्पियर' },
    ],
    find: { node: <>50 A ma speed N</>, say: '50 ampere ma speed kati, tyo chahiyo.', voice: 'फिफ्टी एम्पियरमा स्पिड कति, त्यो चाहियो।' },
    idea: { node: <>Shunt ⟹ φ fixed ⟹ N₂/N₁ = Eb₂/Eb₁</>, say: 'Shunt motor ho, so flux constant rahancha. Ani speed simply back EMF ko proportional huncha, simple cha.', voice: 'शन्ट मोटर हो, सो फ्लक्स कन्स्टेन्ट रहन्छ। अनि स्पिड सिम्प्ली ब्याक ई एम एफको प्रोपोर्सनल हुन्छ, सिम्पल छ।' },
    steps: [
      { node: <>Ish = 250/250 = <b>1 A</b></>, say: 'Pahila field current: 250 over 250, 1 ampere.', voice: 'पहिला फिल्ड करेन्ट: टु हन्ड्रेड फिफ्टी ओभर टु हन्ड्रेड फिफ्टी, वान एम्पियर।' },
      {
        node: <>Ia₀ = 5 − 1 = 4 A,  Ia = 50 − 1 = <b>49 A</b></>,
        say: 'Aba yeslai duitai line current bata ghatau.',
        voice: 'अब यसलाई दुईटै लाइन करेन्टबाट घटाऊ।',
        ask: { tag: 'Step predict gara', q: '5 A ra 50 A chai line current hun. Load ma armature current kati?', voice: 'फाइभ एम्पियर र फिफ्टी एम्पियर चाहिँ लाइन करेन्ट हुन्। लोडमा आर्मेचर करेन्ट कति?', options: ['49 A', '50 A', '51 A'], answer: 0, why: 'Shunt motor ma IL = Ia + Ish, tesaile Ia = 50 − 1 = 49 A.' },
      },
      { node: <>Eb₀ = 250 − 4 × 0.2 = 249.2 V</>, say: 'No load ma back EMF: 250 minus 4 times 0.2, matlab 249.2 volt.', voice: 'नो लोडमा ब्याक ई एम एफ: टु हन्ड्रेड फिफ्टी माइनस फोर टाइम्स जिरो पोइन्ट टु, मतलब टु हन्ड्रेड फोर्टी नाइन पोइन्ट टु भोल्ट।' },
      { node: <>Eb = 250 − 49 × 0.2 = 240.2 V</>, say: 'Load ma: 250 minus 49 times 0.2, matlab 240.2 volt.', voice: 'लोडमा: टु हन्ड्रेड फिफ्टी माइनस फोर्टी नाइन टाइम्स जिरो पोइन्ट टु, मतलब टु हन्ड्रेड फोर्टी पोइन्ट टु भोल्ट।' },
      { node: <>N = 1000 × 240.2 / 249.2</>, say: 'Speed back EMF sangai scale huncha: 1000 times 240.2 over 249.2.', voice: 'स्पिड ब्याक ई एम एफसँगै स्केल हुन्छ: थाउजेन्ड टाइम्स टु हन्ड्रेड फोर्टी पोइन्ट टु ओभर टु हन्ड्रेड फोर्टी नाइन पोइन्ट टु।' },
    ],
    answer: { node: <>N ≈ 964 rpm</>, say: 'Lagbhag 964 rpm. Shunt motor load ma ali matra slow huncha.', voice: 'लगभग नाइन हन्ड्रेड सिक्स्टी फोर आर पी एम। शन्ट मोटर लोडमा अलि मात्र स्लो हुन्छ।' },
    trap: { node: <>Trap: Eb₀ = V = 250 V liyo bhane (no-load IaRa drop bhulera) 960.8 rpm aaucha. Eb₀ = 249.2 V use gara.</>, say: 'Trap yo ho: no load ko back EMF pura 250 volt liyo bhane 960.8 rpm aaucha. No load ma pani Eb nikala hai.', voice: 'ट्र्याप यो हो: नो लोडको ब्याक ई एम एफ पुरा टु हन्ड्रेड फिफ्टी भोल्ट लियो भने नाइन हन्ड्रेड सिक्स्टी पोइन्ट एट आर पी एम आउँछ। नो लोडमा पनि ई बी निकाल है।' },
  }),

  solve({
    title: 'Series motor: thap resistance, uhi current',
    paper: '2070 Bhadra',
    paperVoice: 'टु थाउजेन्ड सेभेन्टी भदौ',
    read: 'Terminal bich 1 ohm bhako DC series motor 250 volt ma 20 ampere lidai 1000 rpm ma ghumcha. Series ma 6 ohm thapda, uhi current lida, speed kati huncha?',
    readVoice: 'टर्मिनल बीच वान ओम भएको डीसी सिरिज मोटर टु हन्ड्रेड फिफ्टी भोल्टमा ट्वेन्टी एम्पियर लिँदै थाउजेन्ड आर पी एममा घुम्छ। सिरिजमा सिक्स ओम थप्दा, उही करेन्ट लिँदा, स्पिड कति हुन्छ?',
    question: <>A DC series motor of resistance <D>1 Ω</D> between terminals runs at <D>1000 rpm</D> at <D>250 V</D> with a current of <D>20 A</D>. Find its speed when connected in series with a <D>6 Ω</D> resistance, taking the same current.</>,
    given: [
      { node: <>V = 250 V, R = 1 Ω, I = 20 A, N₁ = 1000 rpm</>, say: '250 volt, 1 ohm, 20 ampere, 1000 rpm', voice: 'टु हन्ड्रेड फिफ्टी भोल्ट, वान ओम, ट्वेन्टी एम्पियर, थाउजेन्ड आर पी एम' },
      { node: <>Thapeko: 6 Ω series ma, uhi 20 A</>, say: 'ani 6 ohm thapeko, current uhi', voice: 'अनि सिक्स ओम थपेको, करेन्ट उही' },
    ],
    find: { node: <>N₂</>, say: 'Naya speed nikala.', voice: 'नयाँ स्पिड निकाल।' },
    idea: { node: <>Same I ⟹ same series flux ⟹ N₂/N₁ = Eb₂/Eb₁</>, say: 'Series motor ma flux le current follow garcha. Uhi current bhaneko uhi flux, tesaile speed le back EMF follow garcha.', voice: 'सिरिज मोटरमा फ्लक्सले करेन्ट फलो गर्छ। उही करेन्ट भनेको उही फ्लक्स, तेसैले स्पिडले ब्याक ई एम एफ फलो गर्छ।' },
    steps: [
      { node: <>Eb₁ = 250 − 20 × 1 = 230 V</>, say: 'Pahila: 250 minus 20 times 1, 230 volt.', voice: 'पहिला: टु हन्ड्रेड फिफ्टी माइनस ट्वेन्टी टाइम्स वान, टु हन्ड्रेड थर्टी भोल्ट।' },
      {
        node: <>Eb₂ = 250 − 20 × (1 + 6) = 110 V</>,
        say: 'Pachi: aba total resistance 7 ohm bhayo.',
        voice: 'पछि: अब टोटल रेजिस्टेन्स सेभेन ओम भयो।',
        ask: { tag: 'Step predict gara', q: 'Aba 20 A kati total resistance bata bagcha?', voice: 'अब ट्वेन्टी एम्पियर कति टोटल रेजिस्टेन्सबाट बग्छ?', options: ['7 Ω', '6 Ω', '5 Ω'], answer: 0, why: 'Motor kai aafno 1 Ω plus thapeko 6 Ω.' },
      },
      { node: <>N₂ = 1000 × 110 / 230</>, say: 'Tesaile speed 1000 times 110 over 230.', voice: 'तेसैले स्पिड थाउजेन्ड टाइम्स वान हन्ड्रेड टेन ओभर टु हन्ड्रेड थर्टी।' },
    ],
    answer: { node: <>N₂ ≈ 478 rpm</>, say: 'Lagbhag 478 rpm.', voice: 'लगभग फोर हन्ड्रेड सेभेन्टी एट आर पी एम।' },
    trap: { node: <>6 Ω matra liyo bhane galat: 1 + 6 = 7 Ω use gara.</>, say: 'Yaad gara, motor ko aafnai resistance pani thap ma jodnu parcha.', voice: 'याद गर, मोटरको आफ्नै रेजिस्टेन्स पनि थपमा जोड्नु पर्छ।' },
  }),

  solve({
    title: 'Shunt motor: thap resistance ra kam load',
    paper: '2073 Bhadra',
    paperVoice: 'टु थाउजेन्ड सेभेन्टी थ्री भदौ',
    marks: '8 marks',
    read: '240 volt ko DC shunt motor, armature resistance 0.4 ohm, field 120 ohm, 54 ampere tanda 1500 rpm ma ghumcha. Armature sanga series ma 0.1 ohm thapincha ra load torque 20 percent ghatcha. Naya speed nikala.',
    readVoice: 'टु फोर्टी भोल्टको डीसी शन्ट मोटर, आर्मेचर रेजिस्टेन्स जिरो पोइन्ट फोर ओम, फिल्ड वान ट्वेन्टी ओम, फिफ्टी फोर एम्पियर तान्दा फिफ्टीन हन्ड्रेड आर पी एममा घुम्छ। आर्मेचरसँग सिरिजमा जिरो पोइन्ट वान ओम थपिन्छ र लोड टर्क ट्वेन्टी पर्सेन्ट घट्छ। नयाँ स्पिड निकाल।',
    question: <>A <D>240 V</D> DC shunt motor has <D>Ra = 0.4 Ω</D> and <D>Rsh = 120 Ω</D>. It runs at <D>1500 rpm</D> drawing <D>54 A</D>. A <D>0.1 Ω</D> resistance is added in series with the armature and the load torque is reduced by <D>20%</D>. Calculate the new speed.</>,
    given: [
      { node: <>V = 240 V, Ra = 0.4 Ω, Rsh = 120 Ω</>, say: '240 volt, Ra 0.4, Rsh 120', voice: 'टु फोर्टी भोल्ट, आर ए जिरो पोइन्ट फोर, आर एस एच वान ट्वेन्टी' },
      { node: <>IL₁ = 54 A, N₁ = 1500 rpm</>, say: '54 ampere ma 1500 rpm', voice: 'फिफ्टी फोर एम्पियरमा फिफ्टीन हन्ड्रेड आर पी एम' },
      { node: <>+0.1 Ω armature ma, torque × 0.8</>, say: 'ani 0.1 ohm thapeko, torque 20 percent ghateko', voice: 'अनि जिरो पोइन्ट वान ओम थपेको, टर्क ट्वेन्टी पर्सेन्ट घटेको' },
    ],
    find: { node: <>N₂</>, say: 'Naya speed nikala.', voice: 'नयाँ स्पिड निकाल।' },
    idea: { node: <>φ fixed ⟹ Ta ∝ Ia ⟹ Ia₂ = 0.8 Ia₁</>, say: 'Shunt motor, flux fixed, tesaile torque armature current ko proportional. Twenty percent kam torque bhaneko twenty percent kam current.', voice: 'शन्ट मोटर, फ्लक्स फिक्स्ड, तेसैले टर्क आर्मेचर करेन्टको प्रोपोर्सनल। ट्वेन्टी पर्सेन्ट कम टर्क भनेको ट्वेन्टी पर्सेन्ट कम करेन्ट।' },
    steps: [
      { node: <>Ish = 240/120 = 2 A,  Ia₁ = 54 − 2 = 52 A</>, say: 'Field current 2 ampere, tesaile Ia one 52 ampere.', voice: 'फिल्ड करेन्ट टु एम्पियर, तेसैले आई ए वान फिफ्टी टु एम्पियर।' },
      { node: <>Eb₁ = 240 − 52 × 0.4 = 219.2 V</>, say: 'Eb one: 240 minus 52 times 0.4, 219.2 volt.', voice: 'ई बी वान: टु फोर्टी माइनस फिफ्टी टु टाइम्स जिरो पोइन्ट फोर, टु हन्ड्रेड नाइन्टीन पोइन्ट टु भोल्ट।' },
      {
        node: <>Ia₂ = 0.8 × 52 = 41.6 A</>,
        say: 'Aba naya armature current.',
        voice: 'अब नयाँ आर्मेचर करेन्ट।',
        ask: { tag: 'Step predict gara', q: 'Constant flux ma load torque 20% ghatyo. Naya Ia kati…', voice: 'कन्स्टेन्ट फ्लक्समा लोड टर्क ट्वेन्टी पर्सेन्ट घट्यो। नयाँ आई ए कति?', options: ['41.6 A', '52 A', '43.2 A'], answer: 0, why: 'Ta ∝ Ia, tesaile Ia₂ = 0.8 × 52 = 41.6 A. (43.2 A chai galti le 54 A line current use garda aaucha.)' },
      },
      { node: <>Eb₂ = 240 − 41.6 × (0.4 + 0.1) = 219.2 V</>, say: 'Eb two: 240 minus 41.6 times 0.5, yo pani 219.2 volt.', voice: 'ई बी टु: टु फोर्टी माइनस फोर्टी वान पोइन्ट सिक्स टाइम्स जिरो पोइन्ट फाइभ, यो पनि टु हन्ड्रेड नाइन्टीन पोइन्ट टु भोल्ट।' },
      { node: <>N₂ = 1500 × 219.2/219.2</>, say: 'Duitai back EMF barabar bhayo.', voice: 'दुईटै ब्याक ई एम एफ बराबर भयो।' },
    ],
    answer: { node: <>N₂ = 1500 rpm (change bhayena)</>, say: 'Tesaile speed 1500 rpm mai rahancha. Thap resistance le halka load lai ekdam cancel garcha.', voice: 'तेसैले स्पिड फिफ्टीन हन्ड्रेड आर पी एममै रहन्छ। थप रेजिस्टेन्सले हल्का लोडलाई एकदम क्यान्सल गर्छ।' },
    trap: { node: <>Speed ghatnai parcha bhanera assume nagara. Duitai Eb calculate gara.</>, say: 'Direction kahile pani guess nagara bro. Duitai back EMF nikala.', voice: 'डाइरेक्सन कहिल्यै पनि गेस नगर ब्रो। दुईटै ब्याक ई एम एफ निकाल।' },
  }),

  solve({
    title: 'Shunt motor: euta resistor, duita load',
    paper: '2071 Magh',
    paperVoice: 'टु थाउजेन्ड सेभेन्टी वान माघ',
    marks: '4 + 4 marks',
    read: '240 volt ko shunt motor, armature 0.4 ohm, field 120 ohm, half load ma 27 ampere tancha ra 600 rpm ma ghumcha. Armature sanga series ma 1 ohm rakhincha. Half-load torque ma ra full-load torque ma speed nikala.',
    readVoice: 'टु फोर्टी भोल्टको शन्ट मोटर, आर्मेचर जिरो पोइन्ट फोर ओम, फिल्ड वान ट्वेन्टी ओम, हाफ लोडमा ट्वेन्टी सेभेन एम्पियर तान्छ र सिक्स हन्ड्रेड आर पी एममा घुम्छ। आर्मेचरसँग सिरिजमा वान ओम राखिन्छ। हाफ लोड टर्कमा र फुल लोड टर्कमा स्पिड निकाल।',
    question: <>A <D>240 V</D> DC shunt motor has <D>Ra = 0.4 Ω</D>, <D>Rsh = 120 Ω</D>. It draws <D>27 A</D> at <D>half load</D> at <D>600 rpm</D>. <D>1 Ω</D> is connected in series with the armature. Find the new speed (i) at half-load torque, (ii) at full-load torque.</>,
    given: [
      { node: <>V = 240 V, Ra = 0.4 Ω, Rsh = 120 Ω</>, say: '240 volt, Ra 0.4, Rsh 120', voice: 'टु फोर्टी भोल्ट, आर ए जिरो पोइन्ट फोर, आर एस एच वान ट्वेन्टी' },
      { node: <>Half load ma: IL = 27 A, N₁ = 600 rpm</>, say: 'half load ma 27 ampere, 600 rpm', voice: 'हाफ लोडमा ट्वेन्टी सेभेन एम्पियर, सिक्स हन्ड्रेड आर पी एम' },
      { node: <>Thapeko R = 1 Ω</>, say: 'ani 1 ohm thapeko', voice: 'अनि वान ओम थपेको' },
    ],
    find: { node: <>half-load ra full-load torque ma N</>, say: 'Duita speed: euta half-load torque ma, arko full-load torque ma.', voice: 'दुईटा स्पिड: एउटा हाफ लोड टर्कमा, अर्को फुल लोड टर्कमा।' },
    idea: { node: <>φ fixed: full-load torque ⟹ Ia double huncha</>, say: 'Flux fixed cha, tesaile full-load torque lai half-load ko double armature current chahincha.', voice: 'फ्लक्स फिक्स्ड छ, तेसैले फुल लोड टर्कलाई हाफ लोडको डबल आर्मेचर करेन्ट चाहिन्छ।' },
    steps: [
      { node: <>Ia = 27 − 2 = 25 A,  Eb₁ = 240 − 25 × 0.4 = 230 V</>, say: 'Ia 25 ampere, ani Eb one 230 volt.', voice: 'आई ए ट्वेन्टी फाइभ एम्पियर, अनि ई बी वान टु हन्ड्रेड थर्टी भोल्ट।' },
      { node: <>(i) Eb = 240 − 25 × 1.4 = 205 V → N = 600 × 205/230</>, say: 'Case one, uhi 25 ampere 1.4 ohm bata: Eb 205 volt.', voice: 'केस वान, उही ट्वेन्टी फाइभ एम्पियर वान पोइन्ट फोर ओमबाट: ई बी टु हन्ड्रेड फाइभ भोल्ट।' },
      {
        node: <>(ii) Ia = 2 × 25 = 50 A,  Eb = 240 − 50 × 1.4 = 170 V</>,
        say: 'Case two, full-load torque.',
        voice: 'केस टु, फुल लोड टर्क।',
        ask: { tag: 'Step predict gara', q: 'Full-load torque ma (half-load ko double), Ia kati?', voice: 'फुल लोड टर्कमा, हाफ लोडको डबल, आई ए कति?', options: ['50 A', '54 A', '25 A'], answer: 0, why: 'Fixed φ ma Ta ∝ Ia, tesaile Ia 25 A bata 50 A huncha. 27 A line current double garnu (54 A) chai trap ho.' },
      },
      { node: <>N = 600 × 170/230</>, say: 'Ani speed 600 times 170 over 230.', voice: 'अनि स्पिड सिक्स हन्ड्रेड टाइम्स वान हन्ड्रेड सेभेन्टी ओभर टु हन्ड्रेड थर्टी।' },
    ],
    answer: { node: <>(i) ≈ 534.8 rpm  ·  (ii) ≈ 443.5 rpm</>, say: 'Half-load torque ma lagbhag 534.8 rpm, full-load torque ma 443.5 rpm.', voice: 'हाफ लोड टर्कमा लगभग फाइभ हन्ड्रेड थर्टी फोर पोइन्ट एट आर पी एम, फुल लोड टर्कमा फोर हन्ड्रेड फोर्टी थ्री पोइन्ट फाइभ आर पी एम।' },
    trap: { node: <>Armature current double gara (25 → 50 A), line current haina.</>, say: 'Armature current double gara, line current haina hai.', voice: 'आर्मेचर करेन्ट डबल गर, लाइन करेन्ट होइन है।' },
  }),

  solve({
    title: 'Generator ko efficiency',
    paper: '2083 Baishakh (ECM)',
    paperVoice: 'टु थाउजेन्ड एटी थ्री बैशाख, ई सी एम',
    marks: '5 marks',
    read: 'Euta shunt generator le 200 volt ma 96 ampere supply garcha. Armature 0.1 ohm, field 50 ohm, iron ra friction losses 2500 watt. Generated EMF ra commercial efficiency nikala.',
    readVoice: 'एउटा शन्ट जेनेरेटरले टु हन्ड्रेड भोल्टमा नाइन्टी सिक्स एम्पियर सप्लाई गर्छ। आर्मेचर जिरो पोइन्ट वान ओम, फिल्ड फिफ्टी ओम, आइरन र फ्रिक्सन लसेस ट्वेन्टी फाइभ हन्ड्रेड वाट। जेनेरेटेड ई एम एफ र कमर्सियल इफिसियन्सी निकाल।',
    question: <>A shunt generator supplies <D>96 A</D> at <D>200 V</D>. The armature and shunt field resistances are <D>0.1 Ω</D> and <D>50 Ω</D>. Iron and friction losses are <D>2500 W</D>. Find (a) the EMF generated, (b) the commercial efficiency.</>,
    given: [
      { node: <>IL = 96 A, V = 200 V</>, say: '200 volt ma 96 ampere', voice: 'टु हन्ड्रेड भोल्टमा नाइन्टी सिक्स एम्पियर' },
      { node: <>Ra = 0.1 Ω, Rsh = 50 Ω, iron + friction = 2500 W</>, say: 'Ra 0.1, Rsh 50, ani iron ra friction 2500 watt', voice: 'आर ए जिरो पोइन्ट वान, आर एस एच फिफ्टी, अनि आइरन र फ्रिक्सन ट्वेन्टी फाइभ हन्ड्रेड वाट' },
    ],
    find: { node: <>E ra η</>, say: 'EMF ra efficiency nikala.', voice: 'ई एम एफ र इफिसियन्सी निकाल।' },
    idea: { node: <>Generator: Ia = IL + Ish · η = output / (output + sabai losses)</>, say: 'Generator ma armature le load ra field duitai lai feed garcha. Efficiency bhaneko output over output plus sabai loss.', voice: 'जेनेरेटरमा आर्मेचरले लोड र फिल्ड दुईटैलाई फिड गर्छ। इफिसियन्सी भनेको आउटपुट ओभर आउटपुट प्लस सबै लस।' },
    steps: [
      { node: <>Ish = 200/50 = 4 A,  Ia = 96 + 4 = 100 A</>, say: 'Field current 4 ampere, tesaile armature ma 100 ampere.', voice: 'फिल्ड करेन्ट फोर एम्पियर, तेसैले आर्मेचरमा वान हन्ड्रेड एम्पियर।' },
      { node: <>E = 200 + 100 × 0.1 = 210 V</>, say: 'EMF bhaneko terminal voltage plus armature drop: 210 volt.', voice: 'ई एम एफ भनेको टर्मिनल भोल्टेज प्लस आर्मेचर ड्रप: टु हन्ड्रेड टेन भोल्ट।' },
      {
        node: <>Losses = 100² × 0.1 + 200 × 4 + 2500 = 1000 + 800 + 2500 = 4300 W</>,
        say: 'Aba sabai loss jodau.',
        voice: 'अब सबै लस जोडौं।',
        ask: { tag: 'Step predict gara', q: 'Kun kun losses jodnu parcha?', voice: 'कुन कुन लसेस जोड्नु पर्छ?', options: ['Armature Cu + field Cu + iron & friction', 'Iron & friction matra', 'Armature Cu matra'], answer: 0, why: 'Tinai ota: 1000 W + 800 W + 2500 W = 4300 W.' },
      },
      { node: <>η = 19200 / (19200 + 4300)</>, say: 'Output 200 times 96, 19200 watt.', voice: 'आउटपुट टु हन्ड्रेड टाइम्स नाइन्टी सिक्स, नाइन्टीन थाउजेन्ड टु हन्ड्रेड वाट।' },
    ],
    answer: { node: <>E = 210 V  ·  η ≈ 81.7%</>, say: 'EMF 210 volt, efficiency lagbhag 81.7 percent.', voice: 'ई एम एफ टु हन्ड्रेड टेन भोल्ट, इफिसियन्सी लगभग एटी वान पोइन्ट सेभेन पर्सेन्ट।' },
    trap: { node: <>Field loss bhulyo bhane 84.6% aaucha.</>, say: 'Field copper loss bhulyo bhane 84.6 percent aaucha, jun galat ho.', voice: 'फिल्ड कपर लस भुल्यो भने एटी फोर पोइन्ट सिक्स पर्सेन्ट आउँछ, जुन गलत हो।' },
  }),

  solve({
    title: 'Pump load: torque ∝ speed²',
    paper: '2068 Bhadra',
    paperVoice: 'टु थाउजेन्ड सिक्स्टी एट भदौ',
    read: '200 volt ko shunt motor le centrifugal pump chalaucha, jasko torque speed ko square ko proportional cha. 1000 rpm ma 50 ampere tancha. Armature 0.1 ohm, field 100 ohm. Speed 800 rpm ma jharna armature circuit ma kati resistance chahincha?',
    readVoice: 'टु हन्ड्रेड भोल्टको शन्ट मोटरले सेन्ट्रिफ्युगल पम्प चलाउँछ, जसको टर्क स्पिडको स्क्वायरको प्रोपोर्सनल छ। थाउजेन्ड आर पी एममा फिफ्टी एम्पियर तान्छ। आर्मेचर जिरो पोइन्ट वान ओम, फिल्ड वान हन्ड्रेड ओम। स्पिड एट हन्ड्रेड आर पी एममा झार्न आर्मेचर सर्किटमा कति रेजिस्टेन्स चाहिन्छ?',
    question: <>A <D>200 V</D> DC shunt motor drives a centrifugal pump where <D>torque ∝ speed²</D>. It draws <D>50 A</D> at <D>1000 rpm</D>. <D>Ra = 0.1 Ω</D>, <D>Rsh = 100 Ω</D>. What resistance must be inserted in the armature circuit to reduce the speed to <D>800 rpm</D>?</>,
    given: [
      { node: <>V = 200 V, Ra = 0.1 Ω, Rsh = 100 Ω</>, say: '200 volt, Ra 0.1, Rsh 100', voice: 'टु हन्ड्रेड भोल्ट, आर ए जिरो पोइन्ट वान, आर एस एच वान हन्ड्रेड' },
      { node: <>IL₁ = 50 A at N₁ = 1000 rpm → N₂ = 800 rpm</>, say: '1000 rpm ma 50 ampere, 800 rpm samma jharne', voice: 'थाउजेन्ड आर पी एममा फिफ्टी एम्पियर, एट हन्ड्रेड आर पी एमसम्म झार्ने' },
      { node: <>Load torque ∝ N²</>, say: 'ani torque speed squared anusar', voice: 'अनि टर्क स्पिड स्क्वायर्ड अनुसार' },
    ],
    find: { node: <>thap armature resistance R</>, say: 'Thap armature resistance nikala.', voice: 'थप आर्मेचर रेजिस्टेन्स निकाल।' },
    idea: { node: <>Ta ∝ Ia (φ fixed) ra Ta ∝ N² ⟹ Ia ∝ N²</>, say: 'Flux fixed cha, tesaile armature current le torque follow garcha, ani torque le speed squared follow garcha.', voice: 'फ्लक्स फिक्स्ड छ, तेसैले आर्मेचर करेन्टले टर्क फलो गर्छ, अनि टर्कले स्पिड स्क्वायर्ड फलो गर्छ।' },
    steps: [
      { node: <>Ish = 2 A,  Ia₁ = 48 A,  Eb₁ = 200 − 48 × 0.1 = 195.2 V</>, say: 'Ia one 48 ampere ra Eb one 195.2 volt.', voice: 'आई ए वान फोर्टी एट एम्पियर र ई बी वान वान हन्ड्रेड नाइन्टी फाइभ पोइन्ट टु भोल्ट।' },
      {
        node: <>Ia₂ = 48 × (800/1000)² = 30.72 A</>,
        say: 'Kam speed ma pump lai kam torque chahincha.',
        voice: 'कम स्पिडमा पम्पलाई कम टर्क चाहिन्छ।',
        ask: { tag: 'Step predict gara', q: 'Torque ∝ N². 800 rpm ma armature current kati huncha…', voice: 'टर्क प्रोपोर्सनल टु एन स्क्वायर्ड। एट हन्ड्रेड आर पी एममा आर्मेचर करेन्ट कति हुन्छ?', options: ['48 × 0.8² = 30.72 A', '48 × 0.8 = 38.4 A', '48 A (uhi)'], answer: 0, why: 'Ia ∝ T ∝ N², tesaile Ia₂ = 48 × 0.64 = 30.72 A.' },
      },
      { node: <>Eb₂ = 195.2 × 0.8 = 156.16 V</>, say: 'Eb speed ko proportional: 156.16 volt.', voice: 'ई बी स्पिडको प्रोपोर्सनल: वान हन्ड्रेड फिफ्टी सिक्स पोइन्ट वान सिक्स भोल्ट।' },
      { node: <>0.1 + R = (200 − 156.16)/30.72 = 1.427 Ω</>, say: 'Total armature resistance: 200 minus 156.16, over 30.72.', voice: 'टोटल आर्मेचर रेजिस्टेन्स: टु हन्ड्रेड माइनस वान हन्ड्रेड फिफ्टी सिक्स पोइन्ट वान सिक्स, ओभर थर्टी पोइन्ट सेभेन टु।' },
    ],
    answer: { node: <>R ≈ 1.33 Ω</>, say: 'Ra ghatau: lagbhag 1.33 ohm.', voice: 'आर ए घटाऊ: लगभग वान पोइन्ट थ्री थ्री ओम।' },
    trap: { node: <>Constant-torque load ma (2072 Ashwin) Ia 48 A nai rahancha ra R ≈ 0.81 Ω.</>, say: 'Compare gara: constant torque bhaye answer 0.81 ohm hunthyo. Load type dhyan dera padha.', voice: 'कम्पेयर गर: कन्स्टेन्ट टर्क भए आन्सर जिरो पोइन्ट एट वान ओम हुन्थ्यो। लोड टाइप ध्यान दिएर पढ।' },
  }),

  solve({
    title: 'Series motor: aadha torque',
    paper: '2065 Chaitra',
    paperVoice: 'टु थाउजेन्ड सिक्स्टी फाइभ चैत',
    read: '220 volt ko DC series motor 100 ampere lidai 800 rpm ma ghumcha. Total resistance 0.1 ohm. Saturation chaina bhanera, aadha torque dida kati speed ma ghumcha?',
    readVoice: 'टु ट्वेन्टी भोल्टको डीसी सिरिज मोटर वान हन्ड्रेड एम्पियर लिँदै एट हन्ड्रेड आर पी एममा घुम्छ। टोटल रेजिस्टेन्स जिरो पोइन्ट वान ओम। स्याचुरेसन छैन भनेर, आधा टर्क दिँदा कति स्पिडमा घुम्छ?',
    question: <>A <D>220 V</D> DC series motor is running at <D>800 rpm</D> and draws <D>100 A</D>. Total resistance is <D>0.1 Ω</D>. Calculate the speed when developing <D>half the torque</D> (unsaturated).</>,
    given: [
      { node: <>V = 220 V, R = 0.1 Ω</>, say: '220 volt, total resistance 0.1 ohm', voice: 'टु ट्वेन्टी भोल्ट, टोटल रेजिस्टेन्स जिरो पोइन्ट वान ओम' },
      { node: <>I₁ = 100 A, N₁ = 800 rpm, T₂ = T₁/2</>, say: '800 rpm ma 100 ampere, ani aadha torque', voice: 'एट हन्ड्रेड आर पी एममा वान हन्ड्रेड एम्पियर, अनि आधा टर्क' },
    ],
    find: { node: <>N₂</>, say: 'Naya speed nikala.', voice: 'नयाँ स्पिड निकाल।' },
    idea: { node: <>Series, unsaturated: φ ∝ I ⟹ T ∝ I² ra N ∝ Eb/I</>, say: 'Series motor ma flux le current follow garcha, tesaile torque current squared anusar, ra speed back EMF over current anusar.', voice: 'सिरिज मोटरमा फ्लक्सले करेन्ट फलो गर्छ, तेसैले टर्क करेन्ट स्क्वायर्ड अनुसार, र स्पिड ब्याक ई एम एफ ओभर करेन्ट अनुसार।' },
    steps: [
      {
        node: <>I₂ = 100/√2 = 70.7 A</>,
        say: 'Aadha torque.',
        voice: 'आधा टर्क।',
        ask: { tag: 'Step predict gara', q: 'T ∝ I². Aadha torque ko lagi current kati chahincha…', voice: 'टी प्रोपोर्सनल टु आई स्क्वायर्ड। आधा टर्कको लागि करेन्ट कति चाहिन्छ?', options: ['100/√2 ≈ 70.7 A', '50 A', '25 A'], answer: 0, why: 'I₂² = I₁²/2, tesaile I₂ = 100/√2 ≈ 70.7 A. Current aadha garyo bhane torque chai ek chauthai huncha.' },
      },
      { node: <>Eb₁ = 220 − 100 × 0.1 = 210 V,  Eb₂ = 220 − 70.7 × 0.1 = 212.9 V</>, say: 'Back EMF haru: 210 volt ra 212.9 volt.', voice: 'ब्याक ई एम एफहरू: टु हन्ड्रेड टेन भोल्ट र टु हन्ड्रेड ट्वेल्भ पोइन्ट नाइन भोल्ट।' },
      { node: <>N₂ = 800 × (212.9/210) × (100/70.7)</>, say: 'Speed: 800 times Eb ratio, times flux ratio 100 over 70.7.', voice: 'स्पिड: एट हन्ड्रेड टाइम्स ई बी रेसियो, टाइम्स फ्लक्स रेसियो वान हन्ड्रेड ओभर सेभेन्टी पोइन्ट सेभेन।' },
    ],
    answer: { node: <>N₂ ≈ 1147 rpm</>, say: 'Lagbhag 1147 rpm. Load kam, tesaile series motor dherai fast huncha.', voice: 'लगभग इलेभेन हन्ड्रेड फोर्टी सेभेन आर पी एम। लोड कम, तेसैले सिरिज मोटर धेरै फास्ट हुन्छ।' },
    trap: { node: <>Eb ko change ignore garyo bhane 1131 rpm aaucha.</>, say: 'Back EMF ko change ignore garyo bhane 1131 rpm aaucha.', voice: 'ब्याक ई एम एफको चेन्ज इग्नोर गर्‍यो भने इलेभेन हन्ड्रेड थर्टी वान आर पी एम आउँछ।' },
  }),

  solve({
    title: 'Shunt motor: resistance plus halka load',
    paper: '2081 Ashwin (ECM)',
    paperVoice: 'टु थाउजेन्ड एटी वान असोज, ई सी एम',
    marks: '6 marks',
    read: '240 volt ko shunt motor, armature 0.4 ohm, field 120 ohm, half load ma 30 ampere tancha ra 1400 rpm ma ghumcha. Armature sanga series ma 1.2 ohm thapincha ra load torque 20 percent ghatcha. Naya speed nikala.',
    readVoice: 'टु फोर्टी भोल्टको शन्ट मोटर, आर्मेचर जिरो पोइन्ट फोर ओम, फिल्ड वान ट्वेन्टी ओम, हाफ लोडमा थर्टी एम्पियर तान्छ र फोर्टीन हन्ड्रेड आर पी एममा घुम्छ। आर्मेचरसँग सिरिजमा वान पोइन्ट टु ओम थपिन्छ र लोड टर्क ट्वेन्टी पर्सेन्ट घट्छ। नयाँ स्पिड निकाल।',
    question: <>A <D>240 V</D> DC shunt motor has <D>Ra = 0.4 Ω</D>, <D>Rsh = 120 Ω</D>. It draws <D>30 A</D> at half load at <D>1400 rpm</D>. A <D>1.2 Ω</D> resistance is added in series with the armature and the load torque is decreased by <D>20%</D>. Calculate the new speed.</>,
    given: [
      { node: <>V = 240 V, Ra = 0.4 Ω, Rsh = 120 Ω</>, say: '240 volt, 0.4 ra 120 ohm', voice: 'टु फोर्टी भोल्ट, जिरो पोइन्ट फोर र वान ट्वेन्टी ओम' },
      { node: <>IL₁ = 30 A, N₁ = 1400 rpm</>, say: '1400 rpm ma 30 ampere', voice: 'फोर्टीन हन्ड्रेड आर पी एममा थर्टी एम्पियर' },
      { node: <>+1.2 Ω, torque × 0.8</>, say: 'ani 1.2 ohm thapeko ra 20 percent kam torque', voice: 'अनि वान पोइन्ट टु ओम थपेको र ट्वेन्टी पर्सेन्ट कम टर्क' },
    ],
    find: { node: <>N₂</>, say: 'Naya speed nikala.', voice: 'नयाँ स्पिड निकाल।' },
    idea: { node: <>2073 Bhadra kai recipe: Ia₂ = 0.8 Ia₁, ani Eb ratio</>, say: 'Yo 2073 Bhadra kai pattern ho. Shunt, fixed flux: armature current 20 percent ghatau, ani back EMF compare gara.', voice: 'यो टु थाउजेन्ड सेभेन्टी थ्री भदौकै प्याटर्न हो। शन्ट, फिक्स्ड फ्लक्स: आर्मेचर करेन्ट ट्वेन्टी पर्सेन्ट घटाऊ, अनि ब्याक ई एम एफ कम्पेयर गर।' },
    steps: [
      { node: <>Ia₁ = 30 − 2 = 28 A,  Eb₁ = 240 − 28 × 0.4 = 228.8 V</>, say: 'Ia one 28 ampere, Eb one 228.8 volt.', voice: 'आई ए वान ट्वेन्टी एट एम्पियर, ई बी वान टु हन्ड्रेड ट्वेन्टी एट पोइन्ट एट भोल्ट।' },
      { node: <>Ia₂ = 0.8 × 28 = 22.4 A</>, say: 'Ia two 22.4 ampere.', voice: 'आई ए टु ट्वेन्टी टु पोइन्ट फोर एम्पियर।' },
      {
        node: <>Eb₂ = 240 − 22.4 × (0.4 + 1.2) = 204.16 V</>,
        say: 'Aba naya back EMF.',
        voice: 'अब नयाँ ब्याक ई एम एफ।',
        ask: { tag: 'Step predict gara', q: 'Aba Ia₂ kati resistance bata bagcha?', voice: 'अब आई ए टु कति रेजिस्टेन्सबाट बग्छ?', options: ['1.6 Ω', '1.2 Ω', '0.4 Ω'], answer: 0, why: 'Ra plus thapeko resistance: 0.4 + 1.2 = 1.6 Ω.' },
      },
      { node: <>N₂ = 1400 × 204.16/228.8</>, say: 'Speed 1400 times 204.16 over 228.8.', voice: 'स्पिड फोर्टीन हन्ड्रेड टाइम्स टु हन्ड्रेड फोर पोइन्ट वान सिक्स ओभर टु हन्ड्रेड ट्वेन्टी एट पोइन्ट एट।' },
    ],
    answer: { node: <>N₂ ≈ 1249 rpm</>, say: 'Lagbhag 1249 rpm.', voice: 'लगभग ट्वेल्भ हन्ड्रेड फोर्टी नाइन आर पी एम।' },
  }),

  solve({
    title: 'Series motor: naya speed ra current ko lagi resistance',
    paper: '2078 Poush',
    paperVoice: 'टु थाउजेन्ड सेभेन्टी एट पुस',
    read: '240 volt ko series motor ko total resistance 0.2 ohm cha. 1800 rpm ma 40 ampere tancha. Current 10 ampere huda speed 2400 rpm ma limit garna series ma kati resistance thapnu parcha?',
    readVoice: 'टु फोर्टी भोल्टको सिरिज मोटरको टोटल रेजिस्टेन्स जिरो पोइन्ट टु ओम छ। एटीन हन्ड्रेड आर पी एममा फोर्टी एम्पियर तान्छ। करेन्ट टेन एम्पियर हुँदा स्पिड ट्वेन्टी फोर हन्ड्रेड आर पी एममा लिमिट गर्न सिरिजमा कति रेजिस्टेन्स थप्नु पर्छ?',
    question: <>A <D>240 V</D> DC series motor has a total resistance of <D>0.2 Ω</D>. At <D>1800 rpm</D> it draws <D>40 A</D>. Find the resistance to be added in series to limit the speed to <D>2400 rpm</D> when the line current is <D>10 A</D>.</>,
    given: [
      { node: <>V = 240 V, R = 0.2 Ω</>, say: '240 volt, 0.2 ohm', voice: 'टु फोर्टी भोल्ट, जिरो पोइन्ट टु ओम' },
      { node: <>I₁ = 40 A, N₁ = 1800 rpm → I₂ = 10 A, N₂ = 2400 rpm</>, say: '1800 rpm ma 40 ampere, ani 2400 rpm ma 10 ampere', voice: 'एटीन हन्ड्रेड आर पी एममा फोर्टी एम्पियर, अनि ट्वेन्टी फोर हन्ड्रेड आर पी एममा टेन एम्पियर' },
    ],
    find: { node: <>thapnu parne resistance R</>, say: 'Thap series resistance nikala.', voice: 'थप सिरिज रेजिस्टेन्स निकाल।' },
    idea: { node: <>Series: N ∝ Eb/I ⟹ Eb₂ = Eb₁ × (N₂/N₁) × (I₂/I₁)</>, say: 'Series motor ma speed back EMF over current anusar jancha. Rearrange garera chahine back EMF nikalau.', voice: 'सिरिज मोटरमा स्पिड ब्याक ई एम एफ ओभर करेन्ट अनुसार जान्छ। रिअरेन्ज गरेर चाहिने ब्याक ई एम एफ निकालौं।' },
    steps: [
      { node: <>Eb₁ = 240 − 40 × 0.2 = 232 V</>, say: 'Eb one 232 volt.', voice: 'ई बी वान टु हन्ड्रेड थर्टी टु भोल्ट।' },
      {
        node: <>Eb₂ = 232 × (2400/1800) × (10/40) = 77.33 V</>,
        say: 'Aba chahine back EMF.',
        voice: 'अब चाहिने ब्याक ई एम एफ।',
        ask: { tag: 'Step predict gara', q: 'Eb₂ = 232 × (2400/1800) × (I₂/I₁). Kun current ratio?', voice: 'ई बी टु इक्वल्स टु थर्टी टु टाइम्स ट्वेन्टी फोर हन्ड्रेड ओभर एटीन हन्ड्रेड टाइम्स आई टु ओभर आई वान। कुन करेन्ट रेसियो?', options: ['10/40', '40/10', '1 (uhi flux)'], answer: 0, why: 'N ∝ Eb/I, tesaile Eb ∝ N × I. Eb₂ = 232 × (4/3) × (1/4) = 77.33 V.' },
      },
      { node: <>0.2 + R = (240 − 77.33)/10 = 16.27 Ω</>, say: 'Total resistance 240 minus 77.33, over 10.', voice: 'टोटल रेजिस्टेन्स टु फोर्टी माइनस सेभेन्टी सेभेन पोइन्ट थ्री थ्री, ओभर टेन।' },
    ],
    answer: { node: <>R ≈ 16.07 Ω</>, say: 'Motor ko 0.2 ohm ghatau: lagbhag 16.07 ohm.', voice: 'मोटरको जिरो पोइन्ट टु ओम घटाऊ: लगभग सिक्स्टीन पोइन्ट जिरो सेभेन ओम।' },
    trap: { node: <>Motor kai 0.2 Ω naghatayo bhane 16.27 Ω aaucha.</>, say: 'Yaad gara, motor ma pahile dekhi nai aafnai 0.2 ohm cha.', voice: 'याद गर, मोटरमा पहिलेदेखि नै आफ्नै जिरो पोइन्ट टु ओम छ।' },
  }),

  solve({
    title: 'Boss question: series field diverter',
    paper: '2074 Bhadra',
    paperVoice: 'टु थाउजेन्ड सेभेन्टी फोर भदौ',
    read: '500 volt ko DC series motor 60 ampere lidai 500 rpm ma ghumcha. Field 0.3 ohm, armature 0.2 ohm. Load torque constant ra saturation chaina bhanera, speed 600 rpm puryauna series field across kati diverter resistance chahincha?',
    readVoice: 'फाइभ हन्ड्रेड भोल्टको डीसी सिरिज मोटर सिक्स्टी एम्पियर लिँदै फाइभ हन्ड्रेड आर पी एममा घुम्छ। फिल्ड जिरो पोइन्ट थ्री ओम, आर्मेचर जिरो पोइन्ट टु ओम। लोड टर्क कन्स्टेन्ट र स्याचुरेसन छैन भनेर, स्पिड सिक्स हन्ड्रेड आर पी एम पुर्‍याउन सिरिज फिल्ड अक्रस कति डाइभर्टर रेजिस्टेन्स चाहिन्छ?',
    question: <>A <D>500 V</D> DC series motor runs at <D>500 rpm</D> and takes <D>60 A</D>. Field resistance <D>0.3 Ω</D>, armature <D>0.2 Ω</D>. Find the resistance to be shunted across the series field so the speed rises to <D>600 rpm</D>, with <D>load torque constant</D>. Neglect saturation.</>,
    given: [
      { node: <>V = 500 V, Rse = 0.3 Ω, Ra = 0.2 Ω</>, say: '500 volt, field 0.3, armature 0.2', voice: 'फाइभ हन्ड्रेड भोल्ट, फिल्ड जिरो पोइन्ट थ्री, आर्मेचर जिरो पोइन्ट टु' },
      { node: <>I₁ = 60 A, N₁ = 500 rpm → N₂ = 600 rpm, T constant</>, say: '500 rpm ma 60 ampere, ani uhi torque ma 600 rpm', voice: 'फाइभ हन्ड्रेड आर पी एममा सिक्स्टी एम्पियर, अनि उही टर्कमा सिक्स हन्ड्रेड आर पी एम' },
    ],
    find: { node: <>diverter resistance Rd</>, say: 'Diverter resistance nikala.', voice: 'डाइभर्टर रेजिस्टेन्स निकाल।' },
    idea: { node: <>k = field ma jane Ia ko fraction: φ ∝ kIa, T ∝ kIa²</>, say: 'Armature current ko jati fraction aajhai field bata jancha, tyo k bhanau. Ani flux k Ia, ra torque k Ia squared.', voice: 'आर्मेचर करेन्टको जति फ्र्याक्सन अझै फिल्डबाट जान्छ, त्यो के भनौं। अनि फ्लक्स के आई ए, र टर्क के आई ए स्क्वायर्ड।' },
    steps: [
      { node: <>Constant torque: k·Ia₂² = 60² ⟹ Ia₂ = 60/√k</>, say: 'Constant torque le dincha Ia two equals 60 over root k.', voice: 'कन्स्टेन्ट टर्कले दिन्छ आई ए टु इक्वल्स सिक्स्टी ओभर रुट के।' },
      { node: <>Eb₁ = 500 − 60 × 0.5 = 470 V,  Eb₂ = 500 − Ia₂(0.2 + 0.3k)</>, say: 'Aba field ma purano voltage ko k guna matra drop huncha.', voice: 'अब फिल्डमा पुरानो भोल्टेजको के गुणा मात्र ड्रप हुन्छ।' },
      {
        node: <>600/500 = (Eb₂/470) × (60 / (k·Ia₂))</>,
        say: 'Speed ratio lekha.',
        voice: 'स्पिड रेसियो लेख।',
        ask: { tag: 'Step predict gara', q: 'Series motor ko speed ratio (Eb₂/Eb₁) × (φ₁/φ₂) ho. Yaha φ₂ ∝ …', voice: 'सिरिज मोटरको स्पिड रेसियो ई बी टु ओभर ई बी वान, टाइम्स फाइ वान ओभर फाइ टु हो। यहाँ फाइ टु केसँग प्रोपोर्सनल?', options: ['k × Ia₂', 'Ia₂', 'k'], answer: 0, why: 'Ia₂ ko k fraction matra field ma bagcha, tesaile φ₂ ∝ kIa₂, jaba ki φ₁ ∝ 60.' },
      },
      { node: <>Solve garda: k ≈ 0.696, Ia₂ ≈ 71.9 A, Eb₂ ≈ 470.6 V</>, say: 'Numerically solve garda k lagbhag 0.696, ra Ia two lagbhag 71.9 ampere.', voice: 'न्युमेरिकल्ली सल्भ गर्दा के लगभग जिरो पोइन्ट सिक्स नाइन सिक्स, र आई ए टु लगभग सेभेन्टी वान पोइन्ट नाइन एम्पियर।' },
      { node: <>Rd·(1 − k)Ia₂ = 0.3·kIa₂ ⟹ Rd = 0.3k/(1 − k)</>, say: 'Diverter ra field ma uhi voltage huncha, tesbata Rd equals 0.3 k over 1 minus k aaucha.', voice: 'डाइभर्टर र फिल्डमा उही भोल्टेज हुन्छ, त्यसबाट आर डी इक्वल्स जिरो पोइन्ट थ्री के ओभर वान माइनस के आउँछ।' },
    ],
    answer: { node: <>Rd ≈ 0.69 Ω</>, say: 'Lagbhag 0.69 ohm. IOE le sodheko sabai bhanda gaaro series-motor question yahi ho.', voice: 'लगभग जिरो पोइन्ट सिक्स नाइन ओम। आइओईले सोधेको सबैभन्दा गाह्रो सिरिज मोटर क्वेस्चन यही हो।' },
    trap: { node: <>Divert pachi current 60 A hoina: torque constant bhaneko kIa² fixed rahancha.</>, say: 'Trap bhaneko current 60 ampere mai rakhnu ho. Torque rakhna current badhnai parcha.', voice: 'ट्र्याप भनेको करेन्ट सिक्स्टी एम्पियरमै राख्नु हो। टर्क राख्न करेन्ट बढ्नै पर्छ।' },
  }),
].map((s) => ({ ...s, chapter: 'Past Questions' }));

/* Recap video: every chapter's key idea, quizzed once more. */
export const recap = video('Pura DC motor 3 minute ma', {
  beats: [
    { say: 'Last ekchoti sabai kura feri herau, wire ko push dekhi efficiency samma.', voice: 'लास्ट एकचोटि सबै कुरा फेरि हेरौं, वायरको पुश देखि इफिसियन्सीसम्म।' },
    { say: 'Field ma rakheko current-carrying conductor le F equals B I l force feel garcha, direction left-hand rule le.', voice: 'फिल्डमा राखेको करेन्ट क्यारिङ कन्डक्टरले एफ इक्वल्स बी आई एल फोर्स फिल गर्छ, डाइरेक्सन लेफ्ट ह्यान्ड रुलले।' },
    { say: 'Commutator le har half turn ma coil ko current reverse garcha, tesaile torque kahile pani reverse hudaina.', voice: 'कम्युटेटरले हरेक हाफ टर्नमा कोइलको करेन्ट रिभर्स गर्छ, तेसैले टर्क कहिल्यै पनि रिभर्स हुँदैन।' },
    {
      say: 'Quick recall.',
      voice: 'क्विक रिकल।',
      ask: { tag: 'Recall', q: 'Armature torque Ta kasko proportional huncha…', voice: 'आर्मेचर टर्क टी ए कसको प्रोपोर्सनल हुन्छ?', options: ['φ × Ia', 'φ / Ia', 'Eb × Ra', 'N × φ'], answer: 0, why: 'Ta = 0.159 φ Z Ia (P/A), tesaile Ta ∝ φIa.' },
    },
    { say: 'Ghumne conductor le back EMF generate garcha, Eb equals P phi Z N over 60 A, ani V equals Eb plus Ia Ra.', voice: 'घुम्ने कन्डक्टरले ब्याक ई एम एफ जेनेरेट गर्छ, ई बी इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए, अनि भी इक्वल्स ई बी प्लस आई ए आर ए।' },
    {
      say: 'Feri recall.',
      voice: 'फेरि रिकल।',
      ask: { tag: 'Recall', q: 'Motor lai starter kina chahincha?', voice: 'मोटरलाई स्टार्टर किन चाहिन्छ?', options: ['Standstill ma Eb = 0, tesaile Ia = V/Ra ekdam thulo', 'Motor reverse garna', 'Field baliyo banauna', 'Iron loss ghataauna'], answer: 0, why: 'Speed chaina, back EMF chaina: sano Ra le matra current limit garcha.' },
    },
    { say: 'Speed V minus Ia Ra over phi ko proportional. Base speed bhanda mathi jana field weak gara; tala jana armature resistance thapa.', voice: 'स्पिड भी माइनस आई ए आर ए ओभर फाइको प्रोपोर्सनल। बेस स्पिडभन्दा माथि जान फिल्ड वीक गर; तल जान आर्मेचर रेजिस्टेन्स थप।' },
    {
      say: 'Ani motor types ko lagi.',
      voice: 'अनि मोटर टाइप्सको लागि।',
      ask: { tag: 'Recall', q: 'Kun motor kahile pani load bina chalaunu hudaina?', voice: 'कुन मोटर कहिल्यै पनि लोड बिना चलाउनु हुँदैन?', options: ['Series', 'Shunt', 'Cumulative compound', 'Separately excited'], answer: 0, why: 'Series motor ma φ ∝ Ia, tesaile no load ma φ collapse huncha ra N ∝ 1/φ le run away garcha.' },
    },
    { say: 'Last ma, variable copper loss ra constant losses barabar huda efficiency maximum huncha. Pura chapter yahi ho, sahi ho.', voice: 'लास्टमा, भेरियेबल कपर लस र कन्स्टेन्ट लसेस बराबर हुँदा इफिसियन्सी म्याक्सिमम हुन्छ। पुरा च्याप्टर यही हो, सही हो।' },
  ],
  board: [
    { at: 1, kind: 'step', node: <>Force: <span className="y">F = BIl</span> · left hand F-B-I</> },
    { at: 2, kind: 'step', node: <>Commutator → <span className="y">unidirectional torque</span></> },
    { at: 3, kind: 'step', node: <>Torque: <span className="y">Ta = 0.159 φ Z Ia (P/A) = 9.55 Eb Ia / N</span></> },
    { at: 4, kind: 'step', node: <>Back EMF: <span className="y">Eb = PφZN / 60A</span> · <span className="y">V = Eb + IaRa</span></> },
    { at: 5, kind: 'step', node: <>Starting: rokeko bela Ia = V/Ra → 3-point / 4-point starter (NVC, OLR)</> },
    { at: 6, kind: 'step', node: <>Speed: <span className="y">N ∝ (V − IaRa)/φ</span> · field ↑ base bhanda mathi, armature ↓ base bhanda tala</> },
    { at: 7, kind: 'step', node: <>Shunt: speed steady · Series: Ta ∝ Ia², no load ma kahile pani haina · Compound: bich ma</> },
    { at: 8, kind: 'step', node: <>η max: <span className="y">Ia²Ra = Wc</span> huda</> },
  ],
});
