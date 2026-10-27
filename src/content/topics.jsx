import { extra, recall, segments } from './video/kit.jsx';
import { characteristicsAnswer, starterAnswer, testingAnswer, torqueAnswer } from './video/picture.jsx';
import { ch1Model, fleming, howBig, whyItMoves } from './video/ch1.jsx';
import { ch2Model, commutatorAction, crossSection, emfDerivation, emfIoe, lapWave } from './video/ch2.jsx';
import { ch3Model, torqueDerivation, torqueFactors, torqueProduction } from './video/ch3.jsx';
import { ch4Model, maxPower, speedEq, story, voltagePower } from './video/ch4.jsx';
import { connections, equations, shuntLoadSpeed } from './video/ch5.jsx';
import { ch6Model, compound, series, seriesNumerical, shunt, shuntNumerical } from './video/ch6.jsx';
import { ch7Model, fourPoint, threePoint, whyStarter } from './video/ch7.jsx';
import { armatureControl, ch8Model, fieldControl, reversing, seriesControl, solveArmature, solveField, speedDerivation, threeKnobs } from './video/ch8.jsx';
import { ioeEff, losses, maxEff, powerFlow } from './video/ch9.jsx';
import { pastQuestions } from './video/past.jsx';
import { retardation, swinburne, testIntro, testingModel } from './video/testing.jsx';

/*
  The six micro-topics of IOE Electrical Machines Unit 4 (DC Motors), each about
  5 minutes, in three video segments (kit.jsx `segments`): terms and
  definitions with visuals → derivation → big picture with the topic's own old
  IOE question and solution (solve or answer videos) and a memory-map video.
  In-video questions are easy attention checks on what was just said. `extras` stay out of the main path and are
  offered after the course as Extra practice, grouped by topic.
*/

const topic = ({ num, title, extras = [], ...parts }) => ({ num, title, steps: [...segments(parts), ...extras.map(extra)] });

const t41 = topic({
  num: '4.1',
  title: 'Working principle, back EMF ra torque equation',
  terms: [torqueProduction, story],
  derive: [torqueDerivation],
  picture: [
    torqueAnswer,
    recall('Memory map: principle, back EMF ra torque', 'Torque lai Flux RA current dubai chahincha · Back EMF = motor ko aafnai brake', {
      line: 'Field ma current bokeko conductor le force paucha; ghumda armature le supply lai oppose garne Eb banaucha.',
      formulas: ['F = BIl', 'Ta = 0.159 φ Z Ia (P/A)  ⟹  Ta ∝ φIa', 'Eb = PφZN / 60A', 'Ia = (V − Eb) / Ra'],
      order: ['Ic = Ia/A', 'B = Pφ/2πrl', 'F = B·Ic·l', 'τ = F·r', '× Z'],
      remember: ['Commutator → euta pole muni ka sabai conductor eutai tira push → unidirectional torque', 'Start ma N = 0 → Eb = 0 → Ia = V/Ra huge', 'Load ↑ → N ↓ → Eb ↓ → Ia ↑ → torque ↑ (self-regulating)'],
      forget: ['Wave winding ma P/A = 1 manne (wave ma P/A = P/2).'],
    }, {
      line: { say: 'Memory map time! Ek line ma: field ma current bokeko conductor le force paucha, ani ghumda back EMF banaucha.', voice: 'मेमोरी म्याप टाइम! एक लाइनमा: फिल्डमा करेन्ट बोकेको कन्डक्टरले फोर्स पाउँछ, अनि घुम्दा ब्याक इएमएफ बनाउँछ।' },
      formulas: { say: 'Char ota formula: F equals B I l, torque equation, back EMF, ani Ia equals V minus Eb over Ra.', voice: 'चारओटा फर्मुला: एफ इक्वल्स बी आई एल, टर्क इक्वेसन, ब्याक इएमएफ, अनि आई ए इक्वल्स भी माइनस ई बी ओभर आर ए।' },
      order: { say: 'Derivation ko order: Ic, B, F, tau, ani Z le multiply.', voice: 'डेराइभेसनको अर्डर: आई सी, बी, एफ, टाउ, अनि जेडले मल्टिप्लाइ।' },
      big: { say: 'Trick: torque lai flux ra current dubai chahincha, ani back EMF motor ko aafnai brake ho.', voice: 'ट्रिक: टर्कलाई फ्लक्स र करेन्ट दुबै चाहिन्छ, अनि ब्याक इएमएफ मोटरको आफ्नै ब्रेक हो।' },
      check: { say: 'Ekchin, dhyan check.', voice: 'एकछिन, ध्यान चेक।', ask: { tag: 'Dhyan check 👀', q: 'Back EMF lai yo video ma k bhaniyo?', voice: 'ब्याक इएमएफलाई यो भिडियोमा के भनियो?', options: ['Motor ko fuel', 'Motor ko aafnai brake', 'Ek kisim ko fuse'], answer: 1, why: 'Eb le supply lai oppose garcha, tesaile current aafai limit huncha: aafnai brake.' } },
      forget: { say: 'Dherai le garne galti: wave winding ma P over A one manne. Wave ma P over two ho.', voice: 'धेरैले गर्ने गल्ती: वेभ वाइन्डिङमा पी ओभर ए वान मान्ने। वेभमा पी ओभर टु हो।' },
    }),
  ],
  extras: [ch3Model, whyItMoves, howBig, fleming, ch1Model, crossSection, commutatorAction, lapWave, emfDerivation, emfIoe, ch2Model, torqueFactors, voltagePower, maxPower, speedEq, ch4Model],
});

const t42 = topic({
  num: '4.2',
  title: 'DC motor ka types, characteristics ra applications',
  terms: [connections],
  derive: [shunt, series],
  picture: [
    compound,
    characteristicsAnswer,
    recall('Memory map: motor ka types', 'Shunt: Steady speed · Series: Strong start, Solo kahile pani hoina', {
      line: 'Field kasari jodieko cha tyo le flux decide garcha, ani flux le curve decide garcha: Ta ∝ φIa, N ∝ Eb/φ.',
      formulas: ['Shunt: IL = Ia + Ish, V = Eb + IaRa', 'Series: V = Eb + Ia(Ra + Rse)', 'Speed regulation = (N₀ − N_FL)/N_FL × 100%'],
      remember: ['Shunt: Ta ∝ Ia (line), N lagbhag constant.', 'Series: Ta ∝ Ia² (parabola), N ∝ 1/Ia (hyperbola).', 'Shunt → lathe, fan, pump · Series → traction, crane, hoist · Cumulative compound → shears, punching press'],
      forget: ['Series motor lai no load ma start garnu (speed khatarnak high).', 'Supply ko current lai nai Ia manne: shunt ma pahila Ish ghatau.'],
    }, {
      line: { say: 'Memory map! Ek line ma: field kasari jodeko cha tyo le flux decide garcha, ani flux le curve.', voice: 'मेमोरी म्याप! एक लाइनमा: फिल्ड कसरी जोडेको छ त्यसले फ्लक्स डिसाइड गर्छ, अनि फ्लक्सले कर्भ।' },
      formulas: { say: 'Formula: shunt ma IL equals Ia plus Ish, series ma Ra plus Rse, ani speed regulation.', voice: 'फर्मुला: शन्टमा आई एल इक्वल्स आई ए प्लस आई एस एच, सिरिजमा आर ए प्लस आर एस ई, अनि स्पिड रेगुलेसन।' },
      big: { say: 'Trick: Shunt matlab steady speed, series matlab strong start. Ani series lai kahile pani solo nachalau.', voice: 'ट्रिक: शन्ट मतलब स्टेडी स्पिड, सिरिज मतलब स्ट्रङ स्टार्ट। अनि सिरिजलाई कहिल्यै पनि सोलो नचलाऊ।' },
      check: { say: 'Ekchin, dhyan check.', voice: 'एकछिन, ध्यान चेक।', ask: { tag: 'Dhyan check 👀', q: 'Series motor ko speed–current curve kasto huncha bhaniyo?', voice: 'सिरिज मोटरको स्पिड करेन्ट कर्भ कस्तो हुन्छ भनियो?', options: ['Sidha line', 'Hyperbola', 'Circle'], answer: 1, why: 'N ∝ 1/Ia, tesaile rectangular hyperbola.' } },
      forget: { say: 'Galti: series lai no load ma start garnu, ani shunt ma Ish naghatai supply current lai Ia manne.', voice: 'गल्ती: सिरिजलाई नो लोडमा स्टार्ट गर्नु, अनि शन्टमा आई एस एच नघटाई सप्लाई करेन्टलाई आई ए मान्ने।' },
    }),
  ],
  extras: [ch6Model, equations, shuntLoadSpeed, shuntNumerical, seriesNumerical],
});

const t43 = topic({
  num: '4.3',
  title: 'Losses ra efficiency',
  terms: [losses],
  derive: [maxEff],
  picture: [
    ioeEff,
    recall('Memory map: losses ra efficiency', 'Variable loss = Constant loss huda Maximum η', {
      line: 'Input = output + losses; losses constant ra variable ma bandincha.',
      formulas: ['η = Output / (Output + losses)', 'Max η: I²Ra = Wc', 'I(max η) = √(Wc / Ra)'],
      order: ['η = 1 − Wc/VI − IRa/V', 'dη/dI = 0', 'Wc/I² = Ra', 'I²Ra = Wc'],
      remember: ['Constant: iron + mechanical + shunt field. Variable: Ia²Ra, series field, brush drop.', 'Silicon steel → kam hysteresis · Laminations → kam eddy current.'],
      forget: ['Field copper loss (V·Ish) birsanu.', 'Generator ma Ia = IL + Ish, IL matra hoina.'],
    }, {
      line: { say: 'Memory map! Input barabar output plus losses, ani losses constant ra variable ma bandincha.', voice: 'मेमोरी म्याप! इनपुट बराबर आउटपुट प्लस लसेस, अनि लसेस कन्स्टेन्ट र भेरियबलमा बाँडिन्छ।' },
      formulas: { say: 'Formula: efficiency, maximum efficiency condition I square Ra equals Wc, ani tesko current.', voice: 'फर्मुला: इफिसियन्सी, म्याक्सिमम इफिसियन्सी कन्डिसन आई स्क्वायर आर ए इक्वल्स डब्लु सी, अनि त्यसको करेन्ट।' },
      order: { say: 'Derivation ko order: eta lekha, d eta by d I zero rakha, ani I square Ra equals Wc.', voice: 'डेराइभेसनको अर्डर: इटा लेख, डी इटा बाइ डी आई जिरो राख, अनि आई स्क्वायर आर ए इक्वल्स डब्लु सी।' },
      big: { say: 'Trick: variable loss constant loss barabar bhayo bhane maximum efficiency.', voice: 'ट्रिक: भेरियबल लस कन्स्टेन्ट लस बराबर भयो भने म्याक्सिमम इफिसियन्सी।' },
      check: { say: 'Ekchin, dhyan check.', voice: 'एकछिन, ध्यान चेक।', ask: { tag: 'Dhyan check 👀', q: 'Maximum efficiency kahile huncha bhaniyo?', voice: 'म्याक्सिमम इफिसियन्सी कहिले हुन्छ भनियो?', options: ['Output = input huda', 'Current zero huda', 'Variable loss = constant loss huda'], answer: 2, why: 'I²Ra = Wc huda η maximum.' } },
      forget: { say: 'Galti: field copper loss birsanu, ani generator ma Ia lai IL matra manne.', voice: 'गल्ती: फिल्ड कपर लस बिर्सनु, अनि जेनेरेटरमा आई एलाई आई एल मात्र मान्ने।' },
    }),
  ],
  extras: [powerFlow],
});

const t44 = topic({
  num: '4.4',
  title: 'Starting: 3-point ra 4-point starter',
  terms: [threePoint, fourPoint],
  derive: [whyStarter],
  picture: [
    starterAnswer,
    recall('Memory map: starters', 'NVC = No Volts → handle ghar jancha (OFF) · OLR = Over Load → Release', {
      line: 'Start ma Eb = 0, tesaile current V/Ra huge; starter le R thapera limit garcha.',
      formulas: ['I_start = V / (Ra + R)', 'R_starter = V / I_start − Ra'],
      remember: ['3 points: L (line), F (field), A (armature).', '4-point: NVC lai field circuit bata alag, aafnai supply terminal.', 'SABAI resistance bhitra ra FULL field sanga start gara.'],
      forget: ['3-point ma field weaken garda NVC le handle chodna sakcha.', '4-point ma field open bhaye pani handle chhodina.'],
    }, {
      line: { say: 'Memory map! Start ma Eb zero, so current huge. Starter le resistance thapera limit garcha.', voice: 'मेमोरी म्याप! स्टार्टमा ई बी जिरो, सो करेन्ट ह्युज। स्टार्टरले रेजिस्टेन्स थपेर लिमिट गर्छ।' },
      formulas: { say: 'Formula: starting current V over Ra plus R, ani starter resistance tesbata nikal.', voice: 'फर्मुला: स्टार्टिङ करेन्ट भी ओभर आर ए प्लस आर, अनि स्टार्टर रेजिस्टेन्स त्यसबाट निकाल।' },
      big: { say: 'Trick: NVC matlab No Volts, handle ghar jancha. OLR matlab Over Load, Release.', voice: 'ट्रिक: एनभीसी मतलब नो भोल्ट्स, ह्यान्डल घर जान्छ। ओएलआर मतलब ओभर लोड, रिलिज।' },
      check: { say: 'Ekchin, dhyan check.', voice: 'एकछिन, ध्यान चेक।', ask: { tag: 'Dhyan check 👀', q: 'NVC ko full form k bhaniyo?', voice: 'एनभीसीको फुल फर्म के भनियो?', options: ['No-volt coil', 'New voltage control', 'Null value circuit'], answer: 0, why: 'NVC = no-volt coil: supply gaye handle OFF.' } },
      forget: { say: 'Galti: 3-point ma field weaken garda NVC le handle chhodna sakcha bhanne birsanu. 4-point ma chai chhodina.', voice: 'गल्ती: थ्री पोइन्टमा फिल्ड वीकन गर्दा एनभीसीले ह्यान्डल छोड्न सक्छ भन्ने बिर्सनु। फोर पोइन्टमा चाहिँ छोड्दैन।' },
    }),
  ],
  extras: [ch7Model],
});

const t45 = topic({
  num: '4.5',
  title: 'Speed control: series, shunt ra direction reverse',
  terms: [threeKnobs, fieldControl, armatureControl, reversing],
  derive: [speedDerivation],
  picture: [
    seriesControl,
    recall('Memory map: speed control', 'Field → Faster (base bhanda mathi) · Armature → slower (base bhanda tala)', {
      line: 'Speed control bhaneko N ∝ (V − IaRa)/φ ko euta term change garnu ho; direction chai φ wa Ia euta ulto garera.',
      formulas: ['N ∝ (V − IaRa)/φ', 'N₂/N₁ = (Eb₂/Eb₁)(φ₁/φ₂)', 'Constant torque: φ₁Ia₁ = φ₂Ia₂'],
      remember: ['Shunt: field rheostat (mathi), armature R (tala), Ward-Leonard (smooth, zero samma).', 'Series: diverter/tapped field (mathi), series R (tala).', 'Reverse: armature WA field, euta matra; practice ma armature.'],
      forget: ['Field weaken garda Ia same rakhnu (constant torque ma badhcha).', 'Supply polarity swap le direction badalcha bhanne (dubai ulto → uhi direction).'],
    }, {
      line: { say: 'Memory map! Speed control bhaneko N proportional formula ko euta term change garnu. Direction chai phi wa Ia euta ulto.', voice: 'मेमोरी म्याप! स्पिड कन्ट्रोल भनेको एन प्रोपोर्सनल फर्मुलाको एउटा टर्म चेन्ज गर्नु। डाइरेक्सन चाहिँ फाइ वा आई ए एउटा उल्टो।' },
      formulas: { say: 'Formula: N proportional V minus Ia Ra over phi, speed ratio, ani constant torque condition.', voice: 'फर्मुला: एन प्रोपोर्सनल भी माइनस आई ए आर ए ओभर फाइ, स्पिड रेसियो, अनि कन्स्टेन्ट टर्क कन्डिसन।' },
      big: { say: 'Trick: Field le Faster, base bhanda mathi. Armature le slower, base bhanda tala.', voice: 'ट्रिक: फिल्डले फास्टर, बेस भन्दा माथि। आर्मेचरले स्लोअर, बेस भन्दा तल।' },
      check: { say: 'Ekchin, dhyan check.', voice: 'एकछिन, ध्यान चेक।', ask: { tag: 'Dhyan check 👀', q: 'Base speed bhanda mathi lana kun method bhaniyo?', voice: 'बेस स्पिड भन्दा माथि लान कुन मेथड भनियो?', options: ['Armature control', 'Field control', 'Dubai hoina'], answer: 1, why: 'Field weaken → φ ↓ → N ↑.' } },
      forget: { say: 'Galti: field weaken garda Ia same rakhnu, ani supply polarity swap le direction badalcha bhanne. Dubai ulto bhaye direction uhi.', voice: 'गल्ती: फिल्ड वीकन गर्दा आई ए उही राख्नु, अनि सप्लाई पोलारिटी स्वापले डाइरेक्सन बदलिन्छ भन्ने। दुबै उल्टो भए डाइरेक्सन उही।' },
    }),
  ],
  extras: [solveField, solveArmature, ch8Model, ...pastQuestions],
});

const t46 = topic({
  num: '4.6',
  title: 'Testing: Retardation test ra Swinburne’s test',
  terms: [testIntro],
  derive: [swinburne, retardation],
  picture: [
    testingAnswer,
    recall('Memory map: testing', 'Swinburne = Still (no load) · Retardation = Run down', {
      line: 'Load nahali losses napera efficiency nikalne: no-load input (Swinburne) wa slow hune rate (retardation).',
      formulas: ['Swinburne: Wc = V·I₀ − Ia₀²Ra,  Ia₀ = I₀ − Ish', 'Motor η = (V·IL − Wc − Ia²Ra) / V·IL', 'Retardation: W = (2π/60)² J N dN/dt', 'W = W′ · t₂ / (t₁ − t₂)'],
      remember: ['Swinburne: shunt machine, rated V ra N, no load.', 'Retardation: rated bhanda mathi chalau, armature OFF, field ON; N lai armature voltage le padha.'],
      forget: ['Swinburne series motor ma garnu (no load ma race garcha).', 'Swinburne le load ma iron loss ko change ignore garcha.'],
    }, {
      line: { say: 'Memory map! Load nahali losses napne: no-load input Swinburne, slow hune rate retardation.', voice: 'मेमोरी म्याप! लोड नहाली लसेस नाप्ने: नो लोड इनपुट स्विनबर्न, स्लो हुने रेट रिटार्डेसन।' },
      formulas: { say: 'Formula: Swinburne ko Wc, motor ko efficiency, ani retardation ka duita formula.', voice: 'फर्मुला: स्विनबर्नको डब्लु सी, मोटरको इफिसियन्सी, अनि रिटार्डेसनका दुईटा फर्मुला।' },
      big: { say: 'Trick: Swinburne matlab Still, no load. Retardation matlab Run down.', voice: 'ट्रिक: स्विनबर्न मतलब स्टिल, नो लोड। रिटार्डेसन मतलब रन डाउन।' },
      check: { say: 'Ekchin, dhyan check.', voice: 'एकछिन, ध्यान चेक।', ask: { tag: 'Dhyan check 👀', q: 'Swinburne test kun motor ma garna mildaina bhaniyo?', voice: 'स्विनबर्न टेस्ट कुन मोटरमा गर्न मिल्दैन भनियो?', options: ['Shunt motor', 'Series motor', 'Dubai ma mildaina'], answer: 1, why: 'Series motor no load ma race garcha.' } },
      forget: { say: 'Galti: Swinburne series motor ma garnu, ani load ma iron loss change hune kura birsanu.', voice: 'गल्ती: स्विनबर्न सिरिज मोटरमा गर्नु, अनि लोडमा आइरन लस चेन्ज हुने कुरा बिर्सनु।' },
    }),
  ],
  extras: [testingModel],
});

export const topics = [t41, t42, t43, t44, t45, t46];
