import { K, Pts, answer, duo, figAt } from '../video/kit.jsx';
import { fourPointFigure, startFigure, threePointFigure } from './figs.jsx';

/*
  4.4 Starting: 3-point and 4-point starters. Tutor (default) and Lecturer
  over the book figures (Fig. 7 starting circuit, Figs. 8–9 starters). Big
  picture: the starter question asked seven times, [2 + 6], point-wise.
  Recomputed: 220 V, Ra = 0.5 Ω → 440 A direct; limit 40 A → R = 220/40 − 0.5
  = 5 Ω; at 20 A on the full R, Eb = 220 − 20 × 5.5 = 110 V.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
// threePointFigure / fourPointFigure: 0 starter · 1 handle on stud 1 ·
// 2 handle at run, held · 3 NVC · 4 OLR contacts.

export const opener44 = duo('4.4 ma k padhne?', {
  draw: startFigure,
  viewBox: '0 0 360 206',
  tutor: [
    {
      say: 'Unit 4.4: DC motor ko starting, ra 3-point ra 4-point starter.',
      voice: 'युनिट फोर पोइन्ट फोर — डीसी मोटरको स्टार्टिङ, र थ्री पोइन्ट र फोर पोइन्ट स्टार्टर।',
      lines: [['h', <>4.4</>], ['step', <>Starting: 3-point ra 4-point starter</>]],
    },
    {
      say: 'Pahila, start ma current kina khatarnak thulo huncha, ra starter le tyo kasari rokcha.',
      voice: 'पहिला, स्टार्टमा करेन्ट किन खतरनाक ठूलो हुन्छ, र स्टार्टरले त्यो कसरी रोक्छ।',
      lines: [['step', <>1. Starting current ra starter resistance</>]],
    },
    {
      say: 'Tyaspachi 3-point starter ko bhitri banot ra protection, ani 4-point le kun kamjori hataucha.',
      voice: 'त्यसपछि, थ्री पोइन्ट स्टार्टरको भित्री बनोट र प्रोटेक्सन, अनि फोर पोइन्टले कुन कमजोरी हटाउँछ।',
      lines: [['step', <>2. 3-point starter: NVC, OLR · 3. 4-point starter</>]],
    },
    {
      say: 'Antim ma IOE ma saat choti aayeko question: necessity of starter ra 3-point starter ko working.',
      voice: 'अन्तिममा, आइओईमा सात चोटि आएको क्वेस्चन — नेसेसिटी अफ स्टार्टर, र थ्री पोइन्ट स्टार्टरको वर्किङ।',
      lines: [['hook', <>IOE: necessity of starter + 3-point starter [2 + 6], asked 7 times</>]],
    },
  ],
  lecturer: [
    {
      say: 'Unit 4.4: starting of DC motors, three-point and four-point starters.',
      voice: 'युनिट फोर पोइन्ट फोर — स्टार्टिङ अफ डीसी मोटर्स, थ्री पोइन्ट एन्ड फोर पोइन्ट स्टार्टर्स।',
      lines: [['h', <>Unit 4.4</>], ['step', <>Starting of DC motors</>]],
    },
    {
      say: 'Pahilo: necessity of a starter, ra starting resistance.',
      voice: 'पहिलो — नेसेसिटी अफ अ स्टार्टर, र स्टार्टिङ रेजिस्टेन्स।',
      lines: [['step', <><H>1. Necessity of a starter</H>starting current, starting resistance</>]],
    },
    {
      say: 'Dosro: three-point starter ra four-point starter ko construction ra working.',
      voice: 'दोस्रो — थ्री पोइन्ट स्टार्टर, र फोर पोइन्ट स्टार्टरको कन्स्ट्रक्सन र वर्किङ।',
      lines: [['step', <><H>2. Starters</H>3-point and 4-point: construction and working</>]],
    },
    {
      say: 'Big picture ma saat choti sodhiyeko starter question ko model answer.',
      voice: 'बिग पिक्चरमा, सात चोटि सोधिएको स्टार्टर क्वेस्चनको मोडल आन्सर।',
      lines: [['hook', <>IOE: 2075 Baisakh [2 + 6] and six other papers</>]],
    },
  ],
});

/* ── Terms: why a starter ────────────────────────────────────────────── */
export const need44 = duo('Derivation: starter kina chahincha', {
  draw: startFigure,
  viewBox: '0 0 360 206',
  tutor: [
    {
      say: 'Running motor ma I a equals V minus E b, over R a. E b le nai current lai sano rakhcha.',
      voice: 'रनिङ मोटरमा, आई ए इक्वल्स भी माइनस ई बी, ओभर आर ए। ई बीले नै करेन्टलाई सानो राख्छ।',
      lines: [['h', <>Why a starter</>], ['step', tex(String.raw`I_a = \dfrac{V - E_b}{R_a}`)]],
    },
    {
      say: 'Tara start garne bela motor ghumeko chaina, N zero. Tesaile E b pani zero.',
      voice: 'तर स्टार्ट गर्ने बेला मोटर घुमेको छैन, एन जिरो। त्यसैले ई बी पनि जिरो।',
      lines: [['step', <>At start: N = 0 → E<sub>b</sub> = 0 → <K>{String.raw`I_a = V/R_a`}</K></>]],
      ask: {
        q: '220 V supply, R a 0.5 ohm: direct start garda current kati?',
        voice: 'टु ट्वेन्टी भोल्ट सप्लाई, आर ए जिरो पोइन्ट फाइभ ओम — डाइरेक्ट स्टार्ट गर्दा करेन्ट कति?',
        options: ['440 A', '220 A', '20 A'],
        answer: 0,
        why: 'E b = 0 → I a = 220 / 0.5 = 440 A, rated current ko dherai guna.',
      },
    },
    {
      say: 'Yati thulo current le winding jalcha, commutator ma sparking huncha, ra supply ko voltage nai jharcha. Tesaile armature sanga series ma resistance R rakhincha.',
      voice: 'यति ठूलो करेन्टले वाइन्डिङ जल्छ, कम्युटेटरमा स्पार्किङ हुन्छ, र सप्लाईको भोल्टेज नै झर्छ। त्यसैले, आर्मेचरसँग सिरिजमा रेजिस्टेन्स आर राखिन्छ।',
      lines: [['step', <>Huge current → burnt winding, sparking, supply dip → add R in series</>]],
    },
    {
      say: 'Aba starting current V over R a plus R. Motor ghumdai jada E b badhcha, ani R bistarai hatauna milcha. Yahi kaam starter garcha.',
      voice: 'अब स्टार्टिङ करेन्ट — भी ओभर आर ए प्लस आर। मोटर घुम्दै जाँदा ई बी बढ्छ, अनि आर बिस्तारै हटाउन मिल्छ। यही काम स्टार्टर गर्छ।',
      lines: [['idea', <>Starter: R in at start, cut out step by step as E<sub>b</sub> builds up</>]],
    },
  ],
  lecturer: [
    {
      say: 'Armature current I a equals V minus E b, over R a.',
      voice: 'आर्मेचर करेन्ट — आई ए इक्वल्स, भी माइनस ई बी, ओभर आर ए।',
      lines: [['h', <>Necessity of a starter (Fig. 7)</>], ['step', <><K>{String.raw`I_a = \dfrac{V - E_b}{R_a} \qquad \cdots(1)`}</K></>]],
    },
    {
      say: 'At starting N equals zero, tesaile E b zero, ra I a equals V over R a.',
      voice: 'एट स्टार्टिङ, एन इक्वल्स जिरो, त्यसैले ई बी जिरो, र आई ए इक्वल्स भी ओभर आर ए।',
      lines: [['step', <><Pts items={[<>At starting N = 0, ∴ E<sub>b</sub> = 0 and <K>{String.raw`I_a = V/R_a`}</K></>]} /></>]],
      ask: {
        q: 'Start ma DC motor le kina dherai current lincha?',
        voice: 'स्टार्टमा डीसी मोटरले किन धेरै करेन्ट लिन्छ?',
        options: ['E b zero ra R a sano huncha', 'Flux zero huncha', 'Load thulo huncha'],
        answer: 0,
        why: 'N = 0 → E b = 0; R a sano bhayeko le V/R a thulo.',
      },
    },
    {
      say: 'R a dherai sano bhayeko le yo current rated ko bis guna bhanda badhi huna sakcha, jasle winding, commutator ra supply bigarcha.',
      voice: 'आर ए धेरै सानो भएकोले, यो करेन्ट रेटेडको बीस गुनाभन्दा बढी हुन सक्छ, जसले वाइन्डिङ, कम्युटेटर र सप्लाई बिगार्छ।',
      lines: [['step', <><Pts items={[<>R<sub>a</sub> is very small, so I<sub>a</sub> may exceed 20 × rated</>, <>It damages the winding and commutator and disturbs the supply</>]} /></>]],
    },
    {
      say: 'Hence a starting resistance is connected in series with the armature, ra speed badhdai jada stud-stud gardai hataincha.',
      voice: 'हेन्स अ स्टार्टिङ रेजिस्टेन्स इज कनेक्टेड इन सिरिज विद द आर्मेचर, र स्पिड बढ्दै जाँदा स्टड स्टड गर्दै हटाइन्छ।',
      lines: [['step', <><Pts items={[<>Hence a starting resistance R is connected in series with the armature</>, <><K>{String.raw`I_{st} = \dfrac{V}{R_a + R}`}</K>; R is cut out as E<sub>b</sub> builds up</>]} /></>]],
    },
  ],
});

/* ── Terms: three-point starter ──────────────────────────────────────── */
export const three44 = duo('3-point starter', {
  draw: threePointFigure,
  viewBox: '0 0 370 280',
  tutor: [
    {
      say: '3-point starter ma tin terminal chan: L line tira, F field tira, ra A armature tira. Starting resistance stud haru ko bich ma cha.',
      voice: 'थ्री पोइन्ट स्टार्टरमा तीन टर्मिनल छन् — एल लाइनतिर, एफ फिल्डतिर, र ए आर्मेचरतिर। स्टार्टिङ रेजिस्टेन्स, स्टडहरूको बीचमा छ।',
      lines: [['h', <>Three-point starter</>], ['step', <>Terminals L, F, A · starting resistance between the studs</>]],
    },
    {
      say: 'Handle pahilo stud ma lagda pura resistance armature sanga series ma huncha, ra field lai brass arc bata pura voltage milcha.',
      voice: 'ह्यान्डल पहिलो स्टडमा लाग्दा, पूरा रेजिस्टेन्स आर्मेचरसँग सिरिजमा हुन्छ, र फिल्डलाई ब्रास आर्कबाट पूरा भोल्टेज मिल्छ।',
      lines: [['step', <>Handle on stud 1: full R with the armature; field gets full V through the brass arc</>]],
      ask: {
        q: 'Start ma field lai pura voltage kina dinu parcha?',
        voice: 'स्टार्टमा फिल्डलाई पूरा भोल्टेज किन दिनुपर्छ?',
        options: ['Badhi flux le badhi starting torque dincha', 'Current badhauna', 'Speed badhauna'],
        answer: 0,
        why: 'T a ∝ φ I a; start ma φ pura bhaye limited current mai ramro torque aaucha.',
      },
    },
    {
      say: 'Motor ghumdai jada handle stud-stud gardai sardai jaancha. Antim stud ma resistance sabai hatcha, ani NVC le handle lai tyahi samaatcha.',
      voice: 'मोटर घुम्दै जाँदा, ह्यान्डल स्टड स्टड गर्दै सर्दै जान्छ। अन्तिम स्टडमा रेजिस्टेन्स सबै हट्छ, अनि एन भी सीले ह्यान्डललाई त्यहीं समात्छ।',
      lines: [['step', <>Handle moved stud by stud → R cut out → held at RUN by the NVC</>]],
    },
    {
      say: 'NVC bhaneko no-volt coil: supply janda wa field circuit tutda yo coil kamjor huncha, ra spring le handle OFF ma farkaucha.',
      voice: 'एन भी सी भनेको नो भोल्ट कोइल — सप्लाई जाँदा वा फिल्ड सर्किट टुट्दा, यो कोइल कमजोर हुन्छ, र स्प्रिङले ह्यान्डल अफमा फर्काउँछ।',
      lines: [['step', <>NVC: supply fails or field opens → coil releases → spring returns handle to OFF</>]],
    },
    {
      say: 'OLR bhaneko overload release: current dherai badhda yesle NVC lai short garcha, ra handle OFF ma farkancha.',
      voice: 'ओ एल आर भनेको ओभरलोड रिलिज — करेन्ट धेरै बढ्दा, यसले एन भी सीलाई सर्ट गर्छ, र ह्यान्डल अफमा फर्कन्छ।',
      lines: [['step', <>OLR: overload → contacts short the NVC → handle returns to OFF</>]],
    },
  ],
  lecturer: [
    {
      say: 'Construction, Figure 8: L, F ra A tin terminal, studs ko bich starting resistance, handle, brass arc, NVC ra OLR.',
      voice: 'कन्स्ट्रक्सन, फिगर एट — एल, एफ र ए तीन टर्मिनल, स्टडहरूको बीच स्टार्टिङ रेजिस्टेन्स, ह्यान्डल, ब्रास आर्क, एन भी सी, र ओ एल आर।',
      lines: [['h', <>Three-point starter (Fig. 8)</>], ['step', <><Pts items={[<>Terminals L (line), F (field), A (armature)</>, <>Starting resistance on studs, handle, brass arc, NVC, OLR</>]} /></>]],
    },
    {
      say: 'Starting: handle first stud ma, armature sanga full resistance, ra field lai brass arc bata full voltage.',
      voice: 'स्टार्टिङ — ह्यान्डल फर्स्ट स्टडमा, आर्मेचरसँग फुल रेजिस्टेन्स, र फिल्डलाई ब्रास आर्कबाट फुल भोल्टेज।',
      lines: [['step', <><Pts items={[<>Handle on stud 1: full R in the armature circuit</>, <>Field gets full V through the brass arc → maximum starting torque</>]} /></>]],
    },
    {
      say: 'Running: speed badhdai jada handle sarincha, resistance cut out huncha, ra RUN position ma NVC le handle hold garcha.',
      voice: 'रनिङ — स्पिड बढ्दै जाँदा ह्यान्डल सारिन्छ, रेजिस्टेन्स कट आउट हुन्छ, र रन पोजिसनमा एन भी सीले ह्यान्डल होल्ड गर्छ।',
      lines: [['step', <><Pts items={[<>As speed rises the handle is moved; R is cut out</>, <>At RUN the NVC holds the handle</>]} /></>]],
    },
    {
      say: 'No-volt coil: supply fail bhaye wa field open bhaye NVC de-energise huncha, ra spring le handle OFF ma lyaucha.',
      voice: 'नो भोल्ट कोइल — सप्लाई फेल भए वा फिल्ड ओपन भए, एन भी सी डिइनर्जाइज हुन्छ, र स्प्रिङले ह्यान्डल अफमा ल्याउँछ।',
      lines: [['step', <><Pts items={[<>NVC: on supply failure or open field, it releases the handle to OFF</>]} /></>]],
      ask: {
        q: '3-point starter ma NVC field circuit sanga kasari jodiyeko huncha?',
        voice: 'थ्री पोइन्ट स्टार्टरमा, एन भी सी फिल्ड सर्किटसँग कसरी जोडिएको हुन्छ?',
        options: ['Series ma', 'Parallel ma', 'Jodiyeko hudaina'],
        answer: 0,
        why: 'NVC field current bokcha; field tutyo bhane NVC le handle chhodcha.',
      },
    },
    {
      say: 'Overload release: overload ma OLR ko contacts le NVC short garchan, ra motor disconnect huncha.',
      voice: 'ओभरलोड रिलिज — ओभरलोडमा ओ एल आरको कन्ट्याक्ट्सले एन भी सी सर्ट गर्छन्, र मोटर डिस्कनेक्ट हुन्छ।',
      lines: [['step', <><Pts items={[<>OLR: on overload its contacts short the NVC; the motor is disconnected</>]} /></>]],
    },
  ],
});

/* ── Terms: four-point starter ───────────────────────────────────────── */
export const four44 = duo('4-point starter', {
  draw: fourPointFigure,
  viewBox: '0 0 370 280',
  tutor: [
    {
      say: '3-point starter ma NVC field sanga series ma cha. Speed badhauna field rheostat le field current dherai ghatayo bhane NVC kamjor huncha.',
      voice: 'थ्री पोइन्ट स्टार्टरमा, एन भी सी फिल्डसँग सिरिजमा छ। स्पिड बढाउन फिल्ड रियोस्टेटले फिल्ड करेन्ट धेरै घटायो भने, एन भी सी कमजोर हुन्छ।',
      lines: [['h', <>Four-point starter</>], ['trap', <>3-point drawback: weak field current → NVC releases the handle → motor stops</>]],
    },
    {
      say: 'Ani handle aafai OFF ma farkancha, jaba hami speed control matra gardai thiyau. Yo kamjori 4-point le hataucha.',
      voice: 'अनि ह्यान्डल आफैं अफमा फर्कन्छ, जब हामी स्पिड कन्ट्रोल मात्र गर्दै थियौं। यो कमजोरी फोर पोइन्टले हटाउँछ।',
      lines: [['step', <>Unwanted stops during field control</>]],
    },
    {
      say: '4-point starter ma NVC field bata chhutyaayera, protective resistance R sanga line ko across chhuttai jodincha. Yesko chautho terminal hunchha.',
      voice: 'फोर पोइन्ट स्टार्टरमा, एन भी सी फिल्डबाट छुट्याएर, प्रोटेक्टिभ रेजिस्टेन्स आरसँग लाइनको अक्रस छुट्टै जोडिन्छ। यसको चौथो टर्मिनल हुन्छ।',
      lines: [['step', <>4-point: NVC + R across the line, separate from the field</>]],
    },
    {
      say: 'Aba NVC ko current field current ma bhar pardaina, tesaile field control garda pani handle RUN mai rahancha. NVC ra OLR ko protection bhane utti nai.',
      voice: 'अब एन भी सीको करेन्ट, फिल्ड करेन्टमा भर पर्दैन। त्यसैले, फिल्ड कन्ट्रोल गर्दा पनि ह्यान्डल रनमै रहन्छ। एन भी सी र ओ एल आरको प्रोटेक्सन भने उत्तिनै।',
      lines: [['idea', <>NVC current independent of the field → field control without tripping</>]],
      ask: {
        q: '4-point starter le 3-point ko kun kamjori hataucha?',
        voice: 'फोर पोइन्ट स्टार्टरले थ्री पोइन्टको कुन कमजोरी हटाउँछ?',
        options: ['Field control garda NVC trip hune', 'Starting current thulo hune', 'OLR nahune'],
        answer: 0,
        why: 'NVC line ko across chhuttai bhayeko le field current ghatda pani NVC ko current utti nai.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Limitation of three-point starter: NVC field sanga series ma bhayeko le field weaken garda NVC release huna sakcha.',
      voice: 'लिमिटेसन अफ थ्री पोइन्ट स्टार्टर — एन भी सी फिल्डसँग सिरिजमा भएकोले, फिल्ड विकन गर्दा एन भी सी रिलिज हुन सक्छ।',
      lines: [['h', <>Four-point starter (Fig. 9)</>], ['step', <><Pts items={[<>3-point: NVC is in series with the field</>, <>Field weakening for speed control may release the NVC</>]} /></>]],
    },
    {
      say: 'Phalswarup motor bina karan disconnect huncha.',
      voice: 'फलस्वरूप, मोटर बिना कारण डिस्कनेक्ट हुन्छ।',
      lines: [['step', <><Pts items={[<>∴ the motor is disconnected unnecessarily</>]} /></>]],
    },
    {
      say: 'Four-point starter ma NVC protective resistance R sanga line ko across, field circuit bata independent jodincha.',
      voice: 'फोर पोइन्ट स्टार्टरमा, एन भी सी प्रोटेक्टिभ रेजिस्टेन्स आरसँग लाइनको अक्रस, फिल्ड सर्किटबाट इन्डिपेन्डेन्ट जोडिन्छ।',
      lines: [['step', <><Pts items={[<>NVC with protective R is connected across the line (fourth terminal)</>, <>It is independent of the field circuit</>]} /></>]],
    },
    {
      say: 'Hence field control is possible without releasing the handle. Starting ra overload protection three-point jastai.',
      voice: 'हेन्स फिल्ड कन्ट्रोल इज पसिबल विदाउट रिलिजिङ द ह्यान्डल। स्टार्टिङ र ओभरलोड प्रोटेक्सन, थ्री पोइन्ट जस्तै।',
      lines: [['step', <><Pts items={[<>Field control is possible without releasing the handle</>, <>Starting and OLR action as in the 3-point starter</>]} /></>]],
      ask: {
        q: '4-point starter ma NVC kasari jodiyeko huncha?',
        voice: 'फोर पोइन्ट स्टार्टरमा एन भी सी कसरी जोडिएको हुन्छ?',
        options: ['Protective R sanga line ko across', 'Field sanga series ma', 'Armature sanga series ma'],
        answer: 0,
        why: 'Chautho terminal bata NVC line ko across jodincha, field bata chhuttai.',
      },
    },
  ],
});

/* ── Derivation: starting current and starter resistance ─────────────── */
export const starterR44 = duo('Derivation: starting current ra starter resistance', {
  draw: startFigure,
  viewBox: '0 0 360 206',
  tutor: [
    {
      say: 'Voltage equation bata suru garau: V equals E b plus I a R a. Start ma E b zero.',
      voice: 'भोल्टेज इक्वेसनबाट सुरु गरौं — भी इक्वल्स ई बी प्लस आई ए आर ए। स्टार्टमा ई बी जिरो।',
      lines: [['h', <>Starting current and starter resistance</>], ['step', tex(String.raw`\begin{aligned} V &= E_b + I_aR_a \\ E_b &= 0 \ \text{(start)} \end{aligned}`)]],
    },
    {
      say: 'Tesaile direct start ma I st equals V over R a. 220 volt ra 0.5 ohm ma 440 ampere.',
      voice: 'त्यसैले डाइरेक्ट स्टार्टमा, आई एस टी इक्वल्स भी ओभर आर ए। टु ट्वेन्टी भोल्ट र जिरो पोइन्ट फाइभ ओममा, फोर हन्ड्रेड फोर्टी एम्पियर।',
      lines: [['step', tex(String.raw`\begin{aligned} I_{st} &= \dfrac{V}{R_a} \\ &= \dfrac{220}{0.5} \\ &= 440\ \text{A} \end{aligned}`)]],
    },
    {
      say: 'Starter resistance R jodda I st equals V over R a plus R. Hami current lai, maanau, 40 ampere ma rokna chahanchau.',
      voice: 'स्टार्टर रेजिस्टेन्स आर जोड्दा, आई एस टी इक्वल्स भी ओभर आर ए प्लस आर। हामी करेन्टलाई, मानौं, फोर्टी एम्पियरमा रोक्न चाहन्छौं।',
      lines: [['step', tex(String.raw`I_{st} = \dfrac{V}{R_a + R}`)]],
    },
    {
      say: 'R ko lagi milauda R equals V over I st minus R a. 220 over 40 minus 0.5, arthat 5 ohm.',
      voice: 'आरको लागि मिलाउँदा — आर इक्वल्स भी ओभर आई एस टी, माइनस आर ए। टु ट्वेन्टी ओभर फोर्टी माइनस जिरो पोइन्ट फाइभ, अर्थात फाइभ ओम।',
      lines: [['eq', tex(String.raw`\begin{aligned} R &= \dfrac{V}{I_{st}} - R_a \\ &= \dfrac{220}{40} - 0.5 \\ &= 5\ \Omega \end{aligned}`)]],
      ask: {
        q: 'Same motor ma starting current 55 A ma limit garna R kati?',
        voice: 'सेम मोटरमा स्टार्टिङ करेन्ट फिफ्टी फाइभ एम्पियरमा लिमिट गर्न, आर कति?',
        options: ['3.5 Ω', '4 Ω', '5 Ω'],
        answer: 0,
        why: 'R = 220/55 − 0.5 = 4 − 0.5 = 3.5 Ω.',
      },
    },
    {
      say: 'Motor ghumdai jada E b badhcha. Pura R ma current 20 ampere samma jharda E b 110 volt pugcha; ani euta stud ko R hataincha.',
      voice: 'मोटर घुम्दै जाँदा ई बी बढ्छ। पूरा आरमा करेन्ट ट्वेन्टी एम्पियरसम्म झर्दा, ई बी वान हन्ड्रेड टेन भोल्ट पुग्छ — अनि एउटा स्टडको आर हटाइन्छ।',
      lines: [['step', tex(String.raw`\begin{aligned} E_b &= V - I_a(R_a + R) \\ &= 220 - 20(5.5) \\ &= 110\ \text{V} \end{aligned}`)]],
    },
  ],
  lecturer: [
    {
      say: 'Voltage equation V equals E b plus I a R a. At starting E b equals zero.',
      voice: 'भोल्टेज इक्वेसन — भी इक्वल्स ई बी प्लस आई ए आर ए। एट स्टार्टिङ, ई बी इक्वल्स जिरो।',
      lines: [['h', <>Starting current and starter resistance</>], ['step', <><K>{String.raw`V = E_b + I_aR_a \qquad \cdots(1)`}</K><Pts items={[<>At starting, E<sub>b</sub> = 0</>]} /></>]],
    },
    {
      say: 'Direct-on-line starting current I st equals V over R a, example 440 ampere.',
      voice: 'डाइरेक्ट अन लाइन स्टार्टिङ करेन्ट — आई एस टी इक्वल्स भी ओभर आर ए, उदाहरण फोर हन्ड्रेड फोर्टी एम्पियर।',
      lines: [['step', <><K>{String.raw`\begin{aligned} I_{st} &= \dfrac{V}{R_a} && \cdots(2) \\ &= \dfrac{220}{0.5} && \\ &= 440\ \text{A} && \end{aligned}`}</K></>]],
    },
    {
      say: 'With starting resistance R, I st equals V over R a plus R.',
      voice: 'विद स्टार्टिङ रेजिस्टेन्स आर — आई एस टी इक्वल्स, भी ओभर आर ए प्लस आर।',
      lines: [['step', <><K>{String.raw`I_{st} = \dfrac{V}{R_a + R} \qquad \cdots(3)`}</K></>]],
    },
    {
      say: 'Required resistance R equals V over I st minus R a. Forty ampere ko lagi R equals 5 ohm.',
      voice: 'रिक्वायर्ड रेजिस्टेन्स — आर इक्वल्स भी ओभर आई एस टी, माइनस आर ए। फोर्टी एम्पियरको लागि, आर इक्वल्स फाइभ ओम।',
      lines: [['step', <><K>{String.raw`\begin{aligned} R &= \dfrac{V}{I_{st}} - R_a && \cdots(4) \\ &= \dfrac{220}{40} - 0.5 && \\ &= 5\ \Omega && \end{aligned}`}</K></>]],
      ask: {
        q: 'Starting resistance ko formula kun ho?',
        voice: 'स्टार्टिङ रेजिस्टेन्सको फर्मुला कुन हो?',
        options: ['R = V/Ist − Ra', 'R = V × Ist', 'R = Ra − V/Ist'],
        answer: 0,
        why: 'Equation 3 bata R a + R = V/I st, tesaile R = V/I st − R a.',
      },
    },
    {
      say: 'Speed badhda E b badhcha. Example ma 20 ampere ma E b 110 volt; tyaspachi resistance step by step cut out garincha.',
      voice: 'स्पिड बढ्दा ई बी बढ्छ। उदाहरणमा ट्वेन्टी एम्पियरमा ई बी वान हन्ड्रेड टेन भोल्ट; त्यसपछि रेजिस्टेन्स स्टेप बाई स्टेप कट आउट गरिन्छ।',
      lines: [['step', <><K>{String.raw`\begin{aligned} E_b &= V - I_a(R_a + R) && \\ &= 220 - 20(5.5) && \\ &= 110\ \text{V} && \end{aligned}`}</K><Pts items={[<>R is then cut out step by step</>]} /></>]],
    },
  ],
});

/* ── Big picture: necessity of a starter and the 3-point starter ─────── */
export const starterAnswer44 = answer('Model answer: starter ko necessity ra 3-point starter', {
  draw: figAt(threePointFigure, { 0: 0, 1: 3, 2: 4, 3: 5, 4: 6 }),
  viewBox: '0 0 370 280',
  papers: ['2075 Baisakh', '2074 Bhadra', '2073 Bhadra', '2070 Bhadra', '2068 Magh', '2066 Magh', '2083 Baishakh (ECM)'],
  marks: '[2 + 6]',
  q: 'What is the necessity of a starter? Explain the working of a 3-point starter with a neat diagram.',
  read: {
    say: 'IOE ma saat choti sodhiyeko: what is the necessity of a starter? Explain the working of a 3-point starter with a neat diagram. Necessity dui marks, starter cha marks.',
    voice: 'आइओईमा सात चोटि सोधिएको — ह्वाट इज द नेसेसिटी अफ अ स्टार्टर? एक्सप्लेन द वर्किङ अफ अ थ्री पोइन्ट स्टार्टर विद अ निट डायग्राम। नेसेसिटी दुई मार्क्स, स्टार्टर छ मार्क्स।',
  },
  points: [
    {
      node: <><H>(a) Necessity of a starter [2]</H><Pts items={[<><K>{String.raw`I_a = \dfrac{V - E_b}{R_a}`}</K>; at start N = 0, ∴ E<sub>b</sub> = 0</>, <><K>{String.raw`I_a = V/R_a`}</K> is very large (R<sub>a</sub> is small)</>]} /></>,
      say: 'Necessity: I a equals V minus E b, over R a. Start ma N zero bhayeko le E b zero, ra I a equals V over R a dherai thulo huncha.',
      voice: 'नेसेसिटी — आई ए इक्वल्स, भी माइनस ई बी, ओभर आर ए। स्टार्टमा एन जिरो भएकोले ई बी जिरो, र आई ए इक्वल्स भी ओभर आर ए, धेरै ठूलो हुन्छ।',
    },
    {
      node: <><Pts items={[<>It damages the winding and commutator</>, <>∴ a starter adds resistance in series at start and cuts it out as E<sub>b</sub> builds up</>]} /></>,
      say: 'Yo current le winding ra commutator bigarcha. Tesaile starter le start ma series resistance jodcha, ra E b badhdai jada hataucha.',
      voice: 'यो करेन्टले वाइन्डिङ र कम्युटेटर बिगार्छ। त्यसैले, स्टार्टरले स्टार्टमा सिरिज रेजिस्टेन्स जोड्छ, र ई बी बढ्दै जाँदा हटाउँछ।',
    },
    {
      page: true,
      node: <><H>(b) Three-point starter [6]</H><Pts items={[<>Construction (Fig. 8): terminals L, F, A; resistance on studs; handle; brass arc; NVC; OLR</>]} /></>,
      say: 'Three-point starter, Figure 8: L, F ra A terminal, studs ma starting resistance, handle, brass arc, NVC ra OLR.',
      voice: 'थ्री पोइन्ट स्टार्टर, फिगर एट — एल, एफ र ए टर्मिनल, स्टडहरूमा स्टार्टिङ रेजिस्टेन्स, ह्यान्डल, ब्रास आर्क, एन भी सी, र ओ एल आर।',
    },
    {
      node: <><Pts items={[<><b>Starting:</b> handle on stud 1 → full R in the armature, full V across the field</>]} /></>,
      say: 'Starting: handle pahilo stud ma, armature ma pura resistance, ra field ma pura voltage.',
      voice: 'स्टार्टिङ — ह्यान्डल पहिलो स्टडमा, आर्मेचरमा पूरा रेजिस्टेन्स, र फिल्डमा पूरा भोल्टेज।',
    },
    {
      node: <><Pts items={[<><b>Running:</b> as speed rises the handle is moved stud by stud, R is cut out, and at RUN the NVC holds it</>]} /></>,
      say: 'Running: speed badhdai jada handle stud-stud sarincha, resistance hatcha, ra RUN ma NVC le handle samaatcha.',
      voice: 'रनिङ — स्पिड बढ्दै जाँदा ह्यान्डल स्टड स्टड सारिन्छ, रेजिस्टेन्स हट्छ, र रनमा एन भी सीले ह्यान्डल समात्छ।',
    },
    {
      node: <><Pts items={[<><b>NVC:</b> in series with the field; on supply failure or open field it releases the handle to OFF</>]} /></>,
      say: 'NVC field sanga series ma huncha. Supply fail wa field open bhaye handle OFF ma farkancha.',
      voice: 'एन भी सी, फिल्डसँग सिरिजमा हुन्छ। सप्लाई फेल वा फिल्ड ओपन भए, ह्यान्डल अफमा फर्कन्छ।',
      ask: {
        q: 'Field circuit open bhayo bhane 3-point starter ma k huncha?',
        voice: 'फिल्ड सर्किट ओपन भयो भने, थ्री पोइन्ट स्टार्टरमा के हुन्छ?',
        options: ['NVC release bhayera handle OFF ma jaancha', 'Motor ko speed ghatcha', 'Kei pani hudaina'],
        answer: 0,
        why: 'NVC field sanga series ma: field current zero bhaye NVC le handle chhodcha, ra motor runaway hudaina.',
      },
    },
    {
      node: <><Pts items={[<><b>OLR:</b> on overload its contacts short the NVC, the handle returns to OFF</>, <>Drawback: field weakening may trip the NVC (overcome by the 4-point starter)</>]} /></>,
      say: 'OLR: overload ma yesko contacts le NVC short garchan ra handle OFF ma aaucha. Kamjori: field weaken garda NVC trip huna sakcha, jun 4-point le hataucha.',
      voice: 'ओ एल आर — ओभरलोडमा यसको कन्ट्याक्ट्सले एन भी सी सर्ट गर्छन्, र ह्यान्डल अफमा आउँछ। कमजोरी — फिल्ड विकन गर्दा एन भी सी ट्रिप हुन सक्छ, जुन फोर पोइन्टले हटाउँछ।',
    },
  ],
});
