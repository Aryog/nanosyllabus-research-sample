import { duo } from '../video/kit.jsx';
import { chain, part } from '../video/kit.jsx';
import { motorTour } from './basics3d.js';

/*
  Segment 1, Basic Understanding (user, 2026-11-01): about one minute per
  topic, intuition only, like for a kid. No maths, no symbols, no equations:
  what each part IS and what it DOES, seen on one 3D motor (basics3d.js), so
  the terms are already familiar when Syllabus Content derives them.
  One duo() per topic: the Tutor (default) and the Lecturer say the same
  thing in their own register, over the same plan (one entry per beat).
  Recipe and rules: .claude/skills/video-studio/references/basic-understanding.md.
*/

const MOTOR = ['yoke', 'poles', 'fieldCoil', 'armature', 'coil', 'commutator', 'brushes', 'shaft', 'fan'];
const WIRED = [...MOTOR, 'battery'];
const STARTER = [...WIRED, 'starter'];

/* ── 4.1 Working principle, back EMF, torque: what is inside a motor ──── */
export const basics41 = duo('4.1 · Basic understanding: how does a DC motor turn?', {
  three: motorTour([
    { shot: 'whole', spin: 0.35, labels: [['DC motor', [0, 3.1, 0.6]]] },
    { shot: 'inside', open: 1, spin: 0.2, field: 1, focus: ['poles', 'field'], labels: [['N pole', 'north'], ['S pole', 'south']] },
    { field: 0.3, focus: ['armature', 'shaft'], labels: [['armature', 'armature']] },
    { focus: ['coil'], labels: [['coil', 'coil']] },
    { field: 1, push: 1, spin: 0.5, focus: ['coil', 'poles'], labels: [['tala dhakka', [-2.0, -0.9, 1.8]], ['mathi dhakka', [2.0, 1.3, 1.8]]] },
    { shot: 'commutator', push: 0, spin: 0.25, focus: ['commutator', 'brushes'], labels: [['commutator', 'commutator'], ['brush', 'brushes']] },
    { spin: 0.6, focus: ['commutator', 'brushes', 'coil'] },
    { shot: 'inside', open: 1, field: 1, push: 1, spin: 0.7, focus: ['coil', 'armature'], labels: [['dherai coil, dherai dhakka', [0, 2.9, 1.4]]] },
    { shot: 'whole', open: 0, push: 0, field: 0.4, spin: 0.8, focus: null },
  ]),
  tutor: [
    {
      say: 'Fan, mixer, e-rickshaw: sabai motor le ghumchan. Aaja euta DC motor kholera herau.',
      voice: 'फ्यान, मिक्सर, ई-रिक्सा — सबै मोटरले घुम्छन्। आज एउटा डी सी मोटर खोलेर हेरौं।',
      lines: [['h', <>4.1 · Motor kasari ghumcha?</>], ['step', <>Fan, mixer, e-rickshaw: sabai bhitra DC motor</>]],
    },
    {
      say: 'Frame bhitra duita magnet: euta N, arko S. Bich ma nadekhine magnetic field.',
      voice: 'फ्रेमभित्र दुईटा म्याग्नेट — एउटा एन, अर्को एस। बीचमा नदेखिने म्याग्नेटिक फिल्ड।',
      lines: [part(<>Magnet</>, <>N ra S → bich ma field</>)],
    },
    {
      say: 'Bich ma ghumne falam ko drum: yo armature ho, motor ko ghumne bhag.',
      voice: 'बीचमा घुम्ने फलामको ड्रम — यो आर्मेचर हो, मोटरको घुम्ने भाग।',
      lines: [part(<>Armature</>, <>bich ma ghumne drum</>)],
    },
    {
      say: 'Armature ma tama ko tar bereko huncha: yo coil. Current yahi tar bata bagcha.',
      voice: 'आर्मेचरमा तामाको तार बेरेको हुन्छ — यो कोइल। करेन्ट यही तारबाट बग्छ।',
      lines: [part(<>Coil</>, <>armature ma bereko tama ko tar</>)],
    },
    {
      say: 'Current bokeko tar lai magnet le dhakelcha: euta side tala, arko mathi. Cycle ko pedal jastai, drum ghumcha.',
      voice: 'करेन्ट बोकेको तारलाई म्याग्नेटले धकेल्छ — एउटा साइड तल, अर्को माथि। साइकलको पेडल जस्तै, ड्रम घुम्छ।',
      lines: [chain(<>Magnet le tar dhakelcha: tala + mathi → ghumcha</>)],
    },
    {
      say: 'Aagadi tama ko tukra-tukra ring: commutator. Carbon ko brush le yasma current pugaucha.',
      voice: 'अगाडि तामाको टुक्रा-टुक्रा रिङ — कम्युटेटर। कार्बनको ब्रसले यसमा करेन्ट पुर्‍याउँछ।',
      lines: [['step', <>Commutator: tukra-tukra ring · brush: current dine carbon</>]],
    },
    {
      say: 'Aadha round pugda commutator le current palta dincha. Tesaile dhakka sadhai eutai tira, motor rokidaina.',
      voice: 'आधा राउन्ड पुग्दा, कम्युटेटरले करेन्ट पल्टा दिन्छ। त्यसैले धक्का सधैं एउटै तिर, मोटर रोकिँदैन।',
      lines: [chain(<>Aadha round ma current palta → dhakka eutai tira</>)],
      ask: {
        q: 'Commutator nabhaye motor lai k huncha?',
        voice: 'कम्युटेटर नभए, मोटरलाई के हुन्छ?',
        options: ['Aadha round ghumera atkincha', 'Jhan chito ghumcha', 'Kei farak pardaina'],
        answer: 0,
        why: 'Current palta nabhaye aadha round pachi dhakka ulto huncha, ra drum aghi-pachhi hallera atkincha.',
      },
    },
    {
      say: 'Armature ma euta matra hoina, dherai coil hunchan. Sabai ko dhakka jodera ghumai balio ra lagatar huncha. Magnet balio ra current dherai bhaye dhakka pani dherai.',
      voice: 'आर्मेचरमा एउटा मात्र होइन, धेरै कोइल हुन्छन्। सबैको धक्का जोडिएर घुमाइ बलियो र लगातार हुन्छ। म्याग्नेट बलियो र करेन्ट धेरै भए, धक्का पनि धेरै।',
      lines: [chain(<>Dherai coil → dhakka jodincha → balio, lagatar ghumai</>)],
    },
    {
      say: 'Yasari motor le bijuli lai ghumai ma badalcha: magnet ra current le dhakka, commutator le ek tira.',
      voice: 'यसरी मोटरले बिजुलीलाई घुमाइमा बदल्छ — म्याग्नेट र करेन्टले धक्का, कम्युटेटरले एकतिर।',
      lines: [['idea', <>Magnet + current → dhakka · commutator → ek tira ghumai</>]],
    },
  ],
  lecturer: [
    {
      say: 'DC motor le electrical energy lai ghumai ma badalcha. Pahila yasko bhitri bhag chinau.',
      voice: 'डी सी मोटरले इलेक्ट्रिकल इनर्जीलाई घुमाइमा बदल्छ। पहिला यसको भित्री भाग चिनौं।',
      lines: [['h', <>4.1 · DC motor ko bhitri banot</>], chain(<>Electrical energy → ghumai (mechanical energy)</>)],
    },
    {
      say: 'Yoke bhitra field poles chan, euta N ra arko S. Yinle armature lai magnetic field dinchan.',
      voice: 'योकभित्र फिल्ड पोल्स छन्, एउटा एन र अर्को एस। यिनले आर्मेचरलाई म्याग्नेटिक फिल्ड दिन्छन्।',
      lines: [['step', <>Field poles (N, S): magnetic field dinchan</>]],
    },
    {
      say: 'Bich ko ghumne bhag armature ho: falam ka patla pata jodera baneko drum.',
      voice: 'बीचको घुम्ने भाग आर्मेचर हो — फलामका पातला पाता जोडेर बनेको ड्रम।',
      lines: [part(<>Armature</>, <>ghumne falam ko drum</>)],
    },
    {
      say: 'Armature ka slot ma tama ka conductor rakhera armature winding, arthat coil, banaincha.',
      voice: 'आर्मेचरका स्लटमा तामाका कन्डक्टर राखेर, आर्मेचर वाइन्डिङ, अर्थात कोइल बनाइन्छ।',
      lines: [chain(<>Armature winding (coil): slot ma tama ka conductor</>)],
    },
    {
      say: 'Field ma current bokeko conductor le dhakka paucha. Duita side ma ulto dhakka le couple banaucha, ra armature ghumcha.',
      voice: 'फिल्डमा करेन्ट बोकेको कन्डक्टरले धक्का पाउँछ। दुईटा साइडमा उल्टो धक्काले कपल बनाउँछ, र आर्मेचर घुम्छ।',
      lines: [chain(<>Field + current → dhakka → couple → ghumai</>)],
    },
    {
      say: 'Shaft ko aagadi commutator cha, tama ka segment haru. Carbon brush le yasma supply jodcha.',
      voice: 'शाफ्टको अगाडि कम्युटेटर छ, तामाका सेग्मेन्टहरू। कार्बन ब्रसले यसमा सप्लाई जोड्छ।',
      lines: [['step', <>Commutator: tama ka segment · brush: carbon</>]],
    },
    {
      say: 'Coil euta pole bata arko pole ko prabhav ma pugda commutator le tesko current ulto garcha. Phalswarup armature ek tira matra ghumcha.',
      voice: 'कोइल एउटा पोलबाट अर्को पोलको प्रभावमा पुग्दा, कम्युटेटरले त्यसको करेन्ट उल्टो गर्छ। फलस्वरूप, आर्मेचर एकतिर मात्र घुम्छ।',
      lines: [chain(<>Pole badalda current ulto → ek tira ghumai</>)],
      ask: {
        q: 'DC motor ma commutator ko kaam k ho?',
        voice: 'डी सी मोटरमा कम्युटेटरको काम के हो?',
        options: ['Coil ko current ulto garera ek tira ghumai rakhnu', 'Magnet balio banaunu', 'Supply voltage badhaunu'],
        answer: 0,
        why: 'Coil arko pole ko prabhav ma pugda current ulto bhayena bhane dhakka ulto huncha; commutator le ghumai ek tira rakhcha.',
      },
    },
    {
      say: 'Armature ma dherai coil hunchan, ra sabai ko torque jodera continuous rotation huncha. Torque magnetic field ko strength ra current ma bhar parcha.',
      voice: 'आर्मेचरमा धेरै कोइल हुन्छन्, र सबैको टर्क जोडिएर कन्टिन्युअस रोटेसन हुन्छ। टर्क, म्याग्नेटिक फिल्डको स्ट्रेन्थ र करेन्टमा भर पर्छ।',
      lines: [chain(<>Many coils → torques add → continuous rotation</>)],
    },
    {
      say: 'Saransh: field ra current milera torque banauchan, ra commutator le torque lai eutai direction ma rakhcha.',
      voice: 'सारांश — फिल्ड र करेन्ट मिलेर टर्क बनाउँछन्, र कम्युटेटरले टर्कलाई एउटै डाइरेक्सनमा राख्छ।',
      lines: [['idea', <>Field + current → torque · commutator → one direction</>]],
    },
  ],
});

/* ── 4.2 Types: how the field coil is connected ──────────────────────── */
export const basics42 = duo('4.3 · Basic understanding: how is the field winding connected?', {
  three: motorTour([
    { shot: 'inside', open: 1, spin: 0.3, field: 0.6, focus: ['fieldCoil', 'poles'], labels: [['field coil', 'fieldCoil']] },
    { shot: 'wiring', show: WIRED, open: 0.7, wiring: 'main', flow: 0.5, focus: ['battery', 'wires'], labels: [['armature ko bato', 'wires']] },
    { wiring: 'shunt', flow: 0.6, focus: ['fieldCoil', 'wires'], labels: [['shunt: chhuttai bato', [0.2, 3.4, 0.4]]] },
    { spin: 0.5, field: 0.7, focus: ['armature', 'fan'], labels: [['speed lagbhag eutai', 'fan']] },
    { wiring: 'series', flow: 0.8, focus: ['fieldCoil', 'wires'], labels: [['series: eutai line', [0.2, 3.4, 1.4]]] },
    { shot: 'inside', field: 1, push: 1, spin: 0.35, focus: ['poles', 'coil'], labels: [['thulo dhakka', [0, 2.9, 1.4]]] },
    { push: 0, field: 0.15, spin: 1, focus: ['armature', 'fan'], labels: [['khatarnak speed', 'fan']] },
    { shot: 'wiring', wiring: 'compound', field: 0.8, spin: 0.5, flow: 0.6, focus: ['fieldCoil', 'wires'], labels: [['compound: dubai', [0.2, 3.4, 1.0]]] },
  ]),
  tutor: [
    {
      say: 'Motor ko magnet chumbak dhunga hoina; pole ma tar bereko electromagnet ho. Tyo tar lai field coil bhanchan.',
      voice: 'मोटरको म्याग्नेट चुम्बक ढुङ्गा होइन — पोलमा तार बेरेको इलेक्ट्रोम्याग्नेट हो। त्यो तारलाई फिल्ड कोइल भन्छन्।',
      lines: [['h', <>4.3 · Field coil kasari jodne?</>], part(<>Field coil</>, <>pole ma bereko tar → magnet</>)],
    },
    {
      say: 'Field coil lai current kaha bata dine? Yahi jodne tarika le motor ko type chhutincha.',
      voice: 'फिल्ड कोइललाई करेन्ट कहाँबाट दिने? यही जोड्ने तरिकाले मोटरको टाइप छुटिन्छ।',
      lines: [chain(<>Jodne tarika → motor ko type</>)],
    },
    {
      say: 'Shunt motor ma field coil le battery bata aafnai chhuttai bato lincha, armature ko chheu-chheu.',
      voice: 'शन्ट मोटरमा फिल्ड कोइलले ब्याट्रीबाट आफ्नै छुट्टै बाटो लिन्छ, आर्मेचरको छेउछेउ।',
      lines: [part(<>Shunt</>, <>field coil ko chhuttai bato (parallel)</>)],
    },
    {
      say: 'Tesaile magnet sadhai ustai balio, ra load badhda pani speed lagbhag eutai. Ceiling fan ra lathe ma yahi motor.',
      voice: 'त्यसैले म्याग्नेट सधैं उस्तै बलियो, र लोड बढ्दा पनि स्पिड लगभग एउटै। सिलिङ फ्यान र लेथमा यही मोटर।',
      lines: [chain(<>Magnet ustai → speed lagbhag eutai (fan, lathe)</>)],
    },
    {
      say: 'Series motor ma eutai line: sabai current pahila field coil, ani armature bata jancha.',
      voice: 'सिरिज मोटरमा एउटै लाइन — सबै करेन्ट पहिला फिल्ड कोइल, अनि आर्मेचरबाट जान्छ।',
      lines: [part(<>Series</>, <>eutai line ma field coil + armature</>)],
    },
    {
      say: 'Load badhda current badhcha, magnet pani balio huncha: suru ma bhayankar dhakka. Crane ra electric train ma yahi.',
      voice: 'लोड बढ्दा करेन्ट बढ्छ, म्याग्नेट पनि बलियो हुन्छ — सुरुमा भयंकर धक्का। क्रेन र इलेक्ट्रिक ट्रेनमा यही।',
      lines: [chain(<>Load badhda magnet balio → thulo dhakka (crane, train)</>)],
    },
    {
      say: 'Tara load hatayo bhane current ghatcha, magnet kamjor, ra motor jhan-jhan chito bhagcha.',
      voice: 'तर लोड हटायो भने करेन्ट घट्छ, म्याग्नेट कमजोर, र मोटर झन्-झन् छिटो भाग्छ।',
      lines: [chain(<>Load bina → magnet kamjor → khatarnak speed</>)],
      ask: {
        q: 'Series motor lai load bina kina chalaunu hudaina?',
        voice: 'सिरिज मोटरलाई लोड बिना किन चलाउनु हुँदैन?',
        options: ['Speed khatarnak badhcha', 'Motor ghumdai ghumdaina', 'Magnet dherai balio huncha'],
        answer: 0,
        why: 'Load bina current thorai, magnet kamjor, ani motor jhan-jhan chito bhagcha.',
      },
    },
    {
      say: 'Compound motor ma dubai coil huncha, euta shunt ra euta series. Dubai ko guna milcha.',
      voice: 'कम्पाउन्ड मोटरमा दुवै कोइल हुन्छ, एउटा शन्ट र एउटा सिरिज। दुवैको गुण मिल्छ।',
      lines: [['idea', <>Compound: shunt + series, dubai ko guna</>]],
    },
  ],
  lecturer: [
    {
      say: 'Field poles ma tar bereko huncha, jaslai field winding bhanincha. Yasma current bagda pole electromagnet banchha.',
      voice: 'फिल्ड पोल्समा तार बेरेको हुन्छ, जसलाई फिल्ड वाइन्डिङ भनिन्छ। यसमा करेन्ट बग्दा, पोल इलेक्ट्रोम्याग्नेट बन्छ।',
      lines: [['h', <>4.3 · Excitation: field winding ko connection</>], part(<>Field winding</>, <>pole lai electromagnet banauncha</>)],
    },
    {
      say: 'Field winding lai current dine tarika lai excitation bhanincha. Yasaile motor ko type chhutincha.',
      voice: 'फिल्ड वाइन्डिङलाई करेन्ट दिने तरिकालाई एक्साइटेसन भनिन्छ। यसैले मोटरको टाइप छुटिन्छ।',
      lines: [chain(<>Excitation → motor ko type</>)],
    },
    {
      say: 'Shunt motor ma field winding armature sanga parallel ma jodincha, supply bata chhuttai bato.',
      voice: 'शन्ट मोटरमा फिल्ड वाइन्डिङ, आर्मेचरसँग प्यारालल मा जोडिन्छ — सप्लाईबाट छुट्टै बाटो।',
      lines: [part(<>Shunt</>, <>field winding parallel ma</>)],
    },
    {
      say: 'Tesaile flux lagbhag constant rahancha, ra load badhda pani speed thorai matra ghatcha.',
      voice: 'त्यसैले फ्लक्स लगभग कन्स्टेन्ट रहन्छ, र लोड बढ्दा पनि स्पिड थोरै मात्र घट्छ।',
      lines: [chain(<>Flux constant → speed lagbhag constant</>)],
    },
    {
      say: 'Series motor ma field winding armature sanga series ma huncha, tesaile armature ko sabai current field bata bagcha.',
      voice: 'सिरिज मोटरमा फिल्ड वाइन्डिङ आर्मेचरसँग सिरिजमा हुन्छ, त्यसैले आर्मेचरको सबै करेन्ट फिल्डबाट बग्छ।',
      lines: [part(<>Series</>, <>field winding series ma</>)],
    },
    {
      say: 'Load badhda current ra flux dubai badhchan, ra starting ma dherai thulo torque aaucha.',
      voice: 'लोड बढ्दा करेन्ट र फ्लक्स दुवै बढ्छन्, र स्टार्टिङमा धेरै ठूलो टर्क आउँछ।',
      lines: [chain(<>Load badhda flux badhcha → thulo starting torque</>)],
    },
    {
      say: 'No load ma current ra flux dherai ghatchan, ra speed khatarnak rupma badhcha.',
      voice: 'नो लोडमा करेन्ट र फ्लक्स धेरै घट्छन्, र स्पिड खतरनाक रूपमा बढ्छ।',
      lines: [chain(<>No load → flux thorai → dangerous speed</>)],
      ask: {
        q: 'Series motor lai no load ma kina start garinna?',
        voice: 'सिरिज मोटरलाई नो लोडमा किन स्टार्ट गरिन्न?',
        options: ['Flux ghatera speed khatarnak badhcha', 'Torque dherai thulo hunchha', 'Field winding jalcha'],
        answer: 0,
        why: 'No load ma current thorai, flux thorai, ra speed khatarnak rupma badhcha.',
      },
    },
    {
      say: 'Compound motor ma shunt ra series dubai winding hunchan, ra dubai ko guna milcha.',
      voice: 'कम्पाउन्ड मोटरमा शन्ट र सिरिज दुवै वाइन्डिङ हुन्छन्, र दुवैको गुण मिल्छ।',
      lines: [['idea', <>Compound: shunt + series winding</>]],
    },
  ],
});

/* ── 4.3 Losses and efficiency: where the energy leaks ──────────────── */
export const basics43 = duo('4.7 · Basic understanding: where does the energy go?', {
  three: motorTour([
    { shot: 'whole', spin: 0.6 },
    { shot: 'inside', open: 1, focus: ['coil', 'fieldCoil'], heat: { coil: 1, fieldCoil: 0.7 }, labels: [['copper loss', 'coil']] },
    { field: 0.6, focus: ['armature'], heat: { armature: 1 }, labels: [['iron loss', 'armature']] },
    { shot: 'commutator', field: 0, focus: ['brushes', 'shaft', 'fan'], heat: { brushes: 0.8 }, labels: [['ghasrine thau', 'brushes'], ['hawa', [1.8, 1.4, -1.6]]] },
    { shot: 'inside', focus: null, heat: { coil: 1, fieldCoil: 0.7, armature: 0.5, brushes: 0.5 }, labels: [['load sanga badhcha', 'coil'], ['ustai rahancha', 'armature']] },
    { shot: 'whole', open: 0, spin: 0.8, heat: {}, labels: [['kaam ma pugne bhag', 'fan']] },
    { shot: 'inside', open: 1, heat: { coil: 0.6, fieldCoil: 0.4, armature: 0.6, brushes: 0.4 } },
  ]),
  tutor: [
    {
      say: 'Battery le diyeko sabai energy ghumai ma pugdaina; kehi bato mai taato bhayera harauncha. Kaha-kaha?',
      voice: 'ब्याट्रीले दिएको सबै इनर्जी घुमाइमा पुग्दैन — केही बाटोमै तातो भएर हराउँछ। कहाँ-कहाँ?',
      lines: [['h', <>4.7 · Energy kaha harauncha?</>], chain(<>Diyeko energy → ghumai + taato (loss)</>)],
    },
    {
      say: 'Coil ma current bagda tar taato huncha, heater ko tar jastai. Yo copper loss.',
      voice: 'कोइलमा करेन्ट बग्दा तार तातो हुन्छ, हिटरको तार जस्तै। यो कपर लस।',
      lines: [part(<>Copper loss</>, <>coil ko tar taato</>)],
    },
    {
      say: 'Ghumne falam ko core pani taato huncha: falam bar-bar chumbak bandai chhoddai garcha. Yo iron loss.',
      voice: 'घुम्ने फलामको कोर पनि तातो हुन्छ — फलाम बारम्बार चुम्बक बन्दै छोड्दै गर्छ। यो आइरन लस।',
      lines: [part(<>Iron loss</>, <>ghumne falam ko core taato</>)],
    },
    {
      say: 'Brush ra bearing ghasrine thau ma friction, ra hawa le fan lai rokcha. Yo mechanical loss.',
      voice: 'ब्रस र बेयरिङ घस्रिने ठाउँमा फ्रिक्सन, र हावाले फ्यानलाई रोक्छ। यो मेकानिकल लस।',
      lines: [part(<>Mechanical loss</>, <>friction + hawa</>)],
    },
    {
      say: 'Copper loss load sanga badhcha; iron ra mechanical loss lagbhag ustai rahancha.',
      voice: 'कपर लस लोडसँग बढ्छ — आइरन र मेकानिकल लस लगभग उस्तै रहन्छ।',
      lines: [['step', <>Load sanga badhne: copper · ustai: iron + mechanical</>]],
      ask: {
        q: 'Load badhda kun loss badhcha?',
        voice: 'लोड बढ्दा कुन लस बढ्छ?',
        options: ['Copper loss', 'Iron loss', 'Hawa ko loss'],
        answer: 0,
        why: 'Load badhda current badhcha, ra current le tar taato parne copper loss badhcha.',
      },
    },
    {
      say: 'Efficiency bhaneko diyeko energy ko kati bhag ghumai ma pugyo. Jati kam loss, uti ramro motor.',
      voice: 'इफिसियन्सी भनेको दिएको इनर्जीको कति भाग घुमाइमा पुग्यो। जति कम लस, उति राम्रो मोटर।',
      lines: [part(<>Efficiency</>, <>kati bhag kaam ma pugyo</>)],
    },
    {
      say: 'Sabai bhanda ramro efficiency tyo load ma huncha jaha badhne loss ra nabadhne loss barabar hunchan.',
      voice: 'सबैभन्दा राम्रो इफिसियन्सी त्यो लोडमा हुन्छ, जहाँ बढ्ने लस र नबढ्ने लस बराबर हुन्छन्।',
      lines: [['idea', <>Badhne ra nabadhne loss barabar → sabai bhanda ramro</>]],
    },
  ],
  lecturer: [
    {
      say: 'Motor lai diyeko input ko sabai bhag output ma pugdaina; bich ma heat bhayera jane bhag losses hun.',
      voice: 'मोटरलाई दिएको इनपुटको सबै भाग आउटपुटमा पुग्दैन — बीचमा हिट भएर जाने भाग लसेस हुन्।',
      lines: [['h', <>4.7 · Losses: energy kaha jancha?</>], chain(<>Input → output + losses (heat)</>)],
    },
    {
      say: 'Armature ra field winding ko resistance ma current bagda heat huncha. Yo copper loss ho.',
      voice: 'आर्मेचर र फिल्ड वाइन्डिङको रेजिस्टेन्समा करेन्ट बग्दा हिट हुन्छ। यो कपर लस हो।',
      lines: [part(<>Copper loss</>, <>winding ko resistance ma heat</>)],
    },
    {
      say: 'Ghumne armature core ma hysteresis ra eddy current le heat banchha. Yo iron loss ho.',
      voice: 'घुम्ने आर्मेचर कोरमा हिस्टेरेसिस र एडी करेन्टले हिट बन्छ। यो आइरन लस हो।',
      lines: [part(<>Iron loss</>, <>hysteresis + eddy current (core)</>)],
    },
    {
      say: 'Bearing ra brush ko friction ra hawa ko rokawat mechanical loss hun.',
      voice: 'बेयरिङ र ब्रसको फ्रिक्सन, र हावाको रोकावट मेकानिकल लस हुन्।',
      lines: [part(<>Mechanical loss</>, <>friction + windage</>)],
    },
    {
      say: 'Copper loss load sanga badlincha; iron ra mechanical loss lagbhag constant rahanchan.',
      voice: 'कपर लस लोडसँग बदलिन्छ — आइरन र मेकानिकल लस लगभग कन्स्टेन्ट रहन्छन्।',
      lines: [['step', <>Variable: copper · constant: iron + mechanical</>]],
      ask: {
        q: 'Kun loss lai variable loss bhanincha?',
        voice: 'कुन लसलाई भेरिएबल लस भनिन्छ?',
        options: ['Copper loss', 'Iron loss', 'Mechanical loss'],
        answer: 0,
        why: 'Copper loss current sanga, arthat load sanga badlincha.',
      },
    },
    {
      say: 'Output ra input ko anupat efficiency ho. Losses jati kam, efficiency uti badhi.',
      voice: 'आउटपुट र इनपुटको अनुपात इफिसियन्सी हो। लसेस जति कम, इफिसियन्सी उति बढी।',
      lines: [part(<>Efficiency</>, <>output ra input ko anupat</>)],
    },
    {
      say: 'Variable loss ra constant loss barabar bhayeko load ma efficiency maximum huncha.',
      voice: 'भेरिएबल लस र कन्स्टेन्ट लस बराबर भएको लोडमा इफिसियन्सी म्याक्सिमम हुन्छ।',
      lines: [['idea', <>Variable ra constant loss barabar → maximum efficiency</>]],
    },
  ],
});

/* ── 4.4 Starters: why a motor needs a gentle start ──────────────────── */
export const basics44 = duo('4.5 · Basic understanding: why does a motor need a starter?', {
  three: motorTour([
    { shot: 'wiring', show: WIRED, open: 0.7, spin: 0, flow: 0 },
    { flow: 1, focus: ['wires', 'battery', 'coil'], labels: [['dherai current', 'wires']] },
    { shot: 'commutator', heat: { coil: 1 }, spark: 1, focus: ['coil', 'brushes', 'commutator'], labels: [['spark', 'brushes']] },
    { shot: 'starter', show: STARTER, wiring: 'none', heat: {}, spark: 0, flow: 0, stud: 1, focus: ['starter'], labels: [['handle', 'handle'], ['resistance', 'studs']] },
    { stud: 5, studMs: 2600, spin: 0.7, focus: ['starter', 'armature'] },
    { focus: ['nvc'], labels: [['No-Volt Coil', 'nvc']] },
    { focus: ['olr'], stud: 0, studMs: 400, spin: 0.1, labels: [['Overload Release', 'olr']] },
    { focus: ['starter'], spin: 0 },
  ]),
  tutor: [
    {
      say: 'Thulo motor lai ek-dam switch thichera suru garyo bhane k huncha? Herau.',
      voice: 'ठूलो मोटरलाई एकदम स्विच थिचेर सुरु गर्‍यो भने के हुन्छ? हेरौं।',
      lines: [['h', <>4.5 · Starter kina chahincha?</>], chain(<>Ek-dam switch on → k huncha?</>)],
    },
    {
      say: 'Rokiyeko motor le ulto dhakka dina sakdaina, ra coil ko resistance ekdam sano. Current baadh jastai ekai choti pascha.',
      voice: 'रोकिएको मोटरले उल्टो धक्का दिन सक्दैन, र कोइलको रेजिस्टेन्स एकदम सानो। करेन्ट बाढी जस्तै एकैचोटि पस्छ।',
      lines: [chain(<>Ulto dhakka chaina → current baadh jastai</>)],
    },
    {
      say: 'Yo current le coil taato parcha, brush ma spark aaucha, ra fuse udcha.',
      voice: 'यो करेन्टले कोइल तातो पार्छ, ब्रसमा स्पार्क आउँछ, र फ्युज उड्छ।',
      lines: [['step', <>Coil taato · brush ma spark · fuse udcha</>]],
    },
    {
      say: 'Starter bhaneko current bistarai chhodne dhoka ho: resistance ka khudkila ra hat le ghumaune handle.',
      voice: 'स्टार्टर भनेको करेन्ट बिस्तारै छोड्ने ढोका हो — रेजिस्टेन्सका खुड्किला, र हातले घुमाउने ह्यान्डल।',
      lines: [part(<>Starter</>, <>resistance ka khudkila + handle</>)],
    },
    {
      say: 'Handle ek-ek stud sardai jada resistance ghatcha ra speed badhcha. Ulto dhakka le aafai current thamcha.',
      voice: 'ह्यान्डल एक-एक स्टड सर्दै जाँदा रेजिस्टेन्स घट्छ, र स्पिड बढ्छ। उल्टो धक्काले आफैं करेन्ट थाम्छ।',
      lines: [chain(<>Stud sardai → resistance ghatcha → speed badhcha</>)],
    },
    {
      say: 'Antim stud ma handle lai sano electromagnet le samaucha: yo No-Volt Coil. Bijuli gayo bhane handle aafai off ma farkancha.',
      voice: 'अन्तिम स्टडमा ह्यान्डललाई सानो इलेक्ट्रोम्याग्नेटले समाउँछ — यो नो भोल्ट कोइल। बिजुली गयो भने ह्यान्डल आफैं अफमा फर्कन्छ।',
      lines: [part(<>NVC</>, <>handle samaucha, bijuli gaye chhodcha</>)],
      ask: {
        q: 'Bijuli gayo bhane starter ko handle lai k huncha?',
        voice: 'बिजुली गयो भने स्टार्टरको ह्यान्डललाई के हुन्छ?',
        options: ['Off ma farkancha', 'Antim stud mai baschha', 'Bich ma atkincha'],
        answer: 0,
        why: 'Bijuli gaye No-Volt Coil ko magnet harauncha, ra spring le handle off ma farkaucha.',
      },
    },
    {
      say: 'Dherai load bhaye Overload Release le No-Volt Coil ko current kaatcha, ra handle off ma farkancha. Motor jogincha.',
      voice: 'धेरै लोड भए ओभरलोड रिलिजले नो भोल्ट कोइलको करेन्ट काट्छ, र ह्यान्डल अफमा फर्कन्छ। मोटर जोगिन्छ।',
      lines: [part(<>OLR</>, <>dherai current ma handle off</>)],
    },
    {
      say: '3-point ra 4-point starter dubai yahi kaam garchan; farak chai NVC kasari jodiyeko cha bhanne matra.',
      voice: 'थ्री पोइन्ट र फोर पोइन्ट स्टार्टर दुवै यही काम गर्छन् — फरक चाहिं एन भी सी कसरी जोडिएको छ भन्ने मात्र।',
      lines: [['idea', <>3-point ra 4-point: NVC jodne tarika matra farak</>]],
    },
  ],
  lecturer: [
    {
      say: 'DC motor lai supply ma sidhai jodda k huncha bhanne bujhera starter ko aawashyakta herau.',
      voice: 'डी सी मोटरलाई सप्लाईमा सिधै जोड्दा के हुन्छ भन्ने बुझेर, स्टार्टरको आवश्यकता हेरौं।',
      lines: [['h', <>4.5 · Starter ko aawashyakta</>], ['step', <>Supply ma sidhai jodda k huncha?</>]],
    },
    {
      say: 'Start ma armature rokiyeko huncha, back EMF hudaina, ra armature resistance sano huncha. Tesaile current dherai thulo.',
      voice: 'स्टार्टमा आर्मेचर रोकिएको हुन्छ, ब्याक ई एम एफ हुँदैन, र आर्मेचर रेजिस्टेन्स सानो हुन्छ। त्यसैले करेन्ट धेरै ठूलो।',
      lines: [chain(<>Back EMF chaina + sano resistance → thulo current</>)],
    },
    {
      say: 'Yo current le winding jalna sakcha, commutator ma sparking huncha, ra fuse udcha.',
      voice: 'यो करेन्टले वाइन्डिङ जल्न सक्छ, कम्युटेटरमा स्पार्किङ हुन्छ, र फ्युज उड्छ।',
      lines: [['step', <>Winding damage · sparking · fuse</>]],
    },
    {
      say: 'Starter ma armature sanga series ma variable resistance huncha, studs ra handle sahit.',
      voice: 'स्टार्टरमा आर्मेचरसँग सिरिजमा भेरिएबल रेजिस्टेन्स हुन्छ, स्टड्स र ह्यान्डल सहित।',
      lines: [part(<>Starter</>, <>series resistance, studs + handle</>)],
    },
    {
      say: 'Handle stud-stud sardai jada resistance cut-out huncha, speed ra back EMF badhchan, ra current simit rahancha.',
      voice: 'ह्यान्डल स्टड-स्टड सर्दै जाँदा रेजिस्टेन्स कट आउट हुन्छ, स्पिड र ब्याक ई एम एफ बढ्छन्, र करेन्ट सीमित रहन्छ।',
      lines: [chain(<>Resistance cut-out → back EMF badhcha → current simit</>)],
    },
    {
      say: 'Run position ma No-Volt Coil le handle samaucha. Supply fail bhaye spring le handle off ma farkaucha.',
      voice: 'रन पोजिसनमा नो भोल्ट कोइलले ह्यान्डल समाउँछ। सप्लाई फेल भए, स्प्रिङले ह्यान्डल अफमा फर्काउँछ।',
      lines: [chain(<>NVC: run ma handle samaucha · supply fail → off</>)],
      ask: {
        q: 'Starter ma No-Volt Coil ko kaam k ho?',
        voice: 'स्टार्टरमा नो भोल्ट कोइलको काम के हो?',
        options: ['Supply fail bhaye handle off ma farkaunu', 'Speed badhaunu', 'Resistance badhaunu'],
        answer: 0,
        why: 'Supply chhalunjel NVC le handle samaucha; supply gaye spring le handle off ma farkaucha.',
      },
    },
    {
      say: 'Overload huda Overload Release le No-Volt Coil short garcha, ra handle off ma farkancha.',
      voice: 'ओभरलोड हुँदा ओभरलोड रिलिजले नो भोल्ट कोइल सर्ट गर्छ, र ह्यान्डल अफमा फर्कन्छ।',
      lines: [part(<>OLR</>, <>overload ma handle off</>)],
    },
    {
      say: '3-point ra 4-point starter ko kaam eutai; farak NVC ko connection ma matra cha.',
      voice: 'थ्री पोइन्ट र फोर पोइन्ट स्टार्टरको काम एउटै — फरक एन भी सीको कनेक्सनमा मात्र छ।',
      lines: [['idea', <>3-point vs 4-point: NVC ko connection matra farak</>]],
    },
  ],
});

/* ── 4.5 Speed control: three knobs, and turning it the other way ────── */
export const basics45 = duo('4.6 · Basic understanding: how is the speed changed?', {
  three: motorTour([
    { shot: 'whole', show: WIRED, spin: 0.5, flow: 0.4, labels: [['voltage', 'battery'], ['magnet', 'north'], ['resistance', 'wires']], gap: 1200 },
    { shot: 'wiring', back: 1, focus: ['battery', 'wires', 'armature'], labels: [['battery ko dhakka', [-3.5, -0.6, 2.0]], ['ulto dhakka', [-3.5, -2.1, 2.0]]] },
    { shot: 'inside', open: 1, back: 0, field: 0.15, spin: 1, focus: ['poles', 'fieldCoil'], labels: [['kamjor magnet', 'north'], ['chito', 'fan']] },
    { labels: [['field control', 'fieldCoil']] },
    { field: 0.8, spin: 0.2, focus: ['armature', 'coil'], labels: [['armature control', 'armature']] },
    { shot: 'wiring', open: 0.6, spin: 0.75, flow: 0.8, focus: ['battery'], labels: [['badhi voltage', 'battery']] },
    { shot: 'inside', open: 1, spin: -0.5, flow: 0.4, focus: ['armature', 'fieldCoil'], labels: [['ulto ghumai', [0, 2.9, 1.4]]] },
  ]),
  tutor: [
    {
      say: 'Motor ko speed tin kura le badlincha: supply voltage, magnet ko bal, ra armature sanga jodeko resistance.',
      voice: 'मोटरको स्पिड तीन कुराले बदलिन्छ — सप्लाई भोल्टेज, म्याग्नेटको बल, र आर्मेचरसँग जोडेको रेजिस्टेन्स।',
      lines: [['h', <>4.6 · Speed kasari badalne?</>], ['step', <>Voltage · magnet ko bal · resistance</>]],
    },
    {
      say: 'Ghumda motor le ulto dhakka dincha. Speed tyo bela thamincha jaba ulto dhakka battery ko dhakka jattikai huncha.',
      voice: 'घुम्दा मोटरले उल्टो धक्का दिन्छ। स्पिड त्यो बेला थामिन्छ, जब उल्टो धक्का ब्याट्रीको धक्का जत्तिकै हुन्छ।',
      lines: [chain(<>Ulto dhakka battery ko jattikai → speed thamincha</>)],
    },
    {
      say: 'Magnet kamjor banau: ulto dhakka banauna motor lai jhan chito ghumnu parcha. Field ghatda speed badhcha!',
      voice: 'म्याग्नेट कमजोर बनाऔं — उल्टो धक्का बनाउन मोटरलाई झन् छिटो घुम्नु पर्छ। फिल्ड घट्दा स्पिड बढ्छ!',
      lines: [chain(<>Magnet kamjor → jhan chito</>)],
      ask: {
        q: 'Magnet kamjor banauda motor ko speed k huncha?',
        voice: 'म्याग्नेट कमजोर बनाउँदा मोटरको स्पिड के हुन्छ?',
        options: ['Badhcha', 'Ghatcha', 'Ustai rahancha'],
        answer: 0,
        why: 'Kamjor magnet ma utti nai ulto dhakka banauna motor jhan chito ghumnu parcha.',
      },
    },
    {
      say: 'Field coil sanga resistance jodera magnet kamjor parincha. Yo field control: normal speed bhanda mathi.',
      voice: 'फिल्ड कोइलसँग रेजिस्टेन्स जोडेर म्याग्नेट कमजोर पारिन्छ। यो फिल्ड कन्ट्रोल — नर्मल स्पिडभन्दा माथि।',
      lines: [part(<>Field control</>, <>normal bhanda mathi</>)],
    },
    {
      say: 'Armature sanga resistance jodda armature samma kam voltage pugcha, ra speed ghatcha. Yo armature control: normal bhanda tala.',
      voice: 'आर्मेचरसँग रेजिस्टेन्स जोड्दा, आर्मेचरसम्म कम भोल्टेज पुग्छ, र स्पिड घट्छ। यो आर्मेचर कन्ट्रोल — नर्मलभन्दा तल।',
      lines: [part(<>Armature control</>, <>normal bhanda tala</>)],
    },
    {
      say: 'Supply voltage nai badalnu pani euta bato ho: badhi voltage, badhi speed.',
      voice: 'सप्लाई भोल्टेज नै बदल्नु पनि एउटा बाटो हो — बढी भोल्टेज, बढी स्पिड।',
      lines: [chain(<>Voltage badhi → speed badhi</>)],
    },
    {
      say: 'Ulto ghumauna armature wa field, kunai euta ko current ulto gara. Dubai ulto garyo bhane direction ustai rahancha.',
      voice: 'उल्टो घुमाउन आर्मेचर वा फिल्ड, कुनै एउटाको करेन्ट उल्टो गर। दुवै उल्टो गर्‍यो भने डाइरेक्सन उस्तै रहन्छ।',
      lines: [['idea', <>Euta ulto → ulto ghumcha · dubai ulto → ustai</>]],
    },
  ],
  lecturer: [
    {
      say: 'DC motor ko speed supply voltage, flux ra armature circuit ko resistance mathi nirbhar garcha.',
      voice: 'डी सी मोटरको स्पिड सप्लाई भोल्टेज, फ्लक्स, र आर्मेचर सर्किटको रेजिस्टेन्समाथि निर्भर गर्छ।',
      lines: [['h', <>4.6 · Speed control ka tin upaya</>], ['step', <>Voltage · flux · armature resistance</>]],
    },
    {
      say: 'Ghumda back EMF supply voltage ko najik pugcha, ra tyahi bindu ma speed sthir huncha.',
      voice: 'घुम्दा ब्याक ई एम एफ सप्लाई भोल्टेजको नजिक पुग्छ, र त्यही बिन्दुमा स्पिड स्थिर हुन्छ।',
      lines: [chain(<>Back EMF supply jattikai → speed sthir</>)],
    },
    {
      say: 'Flux ghatda utti back EMF banauna armature jhan chito ghumnu parcha, tesaile speed badhcha.',
      voice: 'फ्लक्स घट्दा उत्ति ब्याक ई एम एफ बनाउन, आर्मेचर झन् छिटो घुम्नु पर्छ। त्यसैले स्पिड बढ्छ।',
      lines: [['step', <>Flux ghatda speed badhcha</>]],
      ask: {
        q: 'DC shunt motor ko flux ghataunda speed k huncha?',
        voice: 'डी सी शन्ट मोटरको फ्लक्स घटाउँदा स्पिड के हुन्छ?',
        options: ['Badhcha', 'Ghatcha', 'Ustai rahancha'],
        answer: 0,
        why: 'Utti back EMF banauna kam flux ma badhi speed chahincha.',
      },
    },
    {
      say: 'Field winding sanga series ma rheostat jodera flux ghataincha. Yo flux control: rated speed bhanda mathi.',
      voice: 'फिल्ड वाइन्डिङसँग सिरिजमा रियोस्ट्याट जोडेर फ्लक्स घटाइन्छ। यो फ्लक्स कन्ट्रोल — रेटेड स्पिडभन्दा माथि।',
      lines: [part(<>Flux control</>, <>rated speed bhanda mathi</>)],
    },
    {
      say: 'Armature sanga series resistance jodda armature voltage ghatcha, ra speed ghatcha. Yo rheostatic control: rated bhanda tala.',
      voice: 'आर्मेचरसँग सिरिज रेजिस्टेन्स जोड्दा आर्मेचर भोल्टेज घट्छ, र स्पिड घट्छ। यो रियोस्ट्याटिक कन्ट्रोल — रेटेडभन्दा तल।',
      lines: [chain(<>Armature (rheostatic) control: rated bhanda tala</>)],
    },
    {
      say: 'Supply voltage badalera pani speed control garincha: voltage badhda speed badhcha.',
      voice: 'सप्लाई भोल्टेज बदलेर पनि स्पिड कन्ट्रोल गरिन्छ — भोल्टेज बढ्दा स्पिड बढ्छ।',
      lines: [part(<>Voltage control</>, <>voltage badhi → speed badhi</>)],
    },
    {
      say: 'Direction ulto garna armature wa field kunai euta ko current reverse garincha, dubai hoina.',
      voice: 'डाइरेक्सन उल्टो गर्न आर्मेचर वा फिल्ड, कुनै एउटाको करेन्ट रिभर्स गरिन्छ, दुवै होइन।',
      lines: [['idea', <>Reversing: armature wa field, euta matra reverse</>]],
    },
  ],
});

/* ── 4.6 Testing: finding the losses without loading the motor ──────── */
export const basics46 = duo('Basic understanding: how is a motor tested without load?', {
  three: motorTour([
    { shot: 'whole', spin: 0.5 },
    { shot: 'wiring', show: WIRED, open: 0.6, flow: 0.5, focus: ['battery', 'wires', 'armature', 'brushes'], heat: { armature: 0.6, brushes: 0.5, coil: 0.3 }, labels: [['sabai power → losses', [-1.0, 2.9, 1.4]]] },
    { focus: ['battery'], labels: [['input napne', 'battery']] },
    { shot: 'inside', open: 1, focus: ['armature', 'brushes', 'fan'], heat: { armature: 0.8, brushes: 0.6 }, labels: [['nabadhne losses', 'armature']] },
    { shot: 'whole', open: 0, show: MOTOR, focus: null, heat: {}, spin: 0.9, labels: [['supply kaat', [0, 3.1, 0.6]]] },
    { shot: 'side', spin: 0, spinMs: 6500, focus: ['brushes', 'fan'], heat: { brushes: 0.5 }, labels: [['friction', 'brushes'], ['hawa', [1.8, 1.4, -1.6]]] },
    { shot: 'whole', heat: {}, focus: null },
  ]),
  tutor: [
    {
      say: 'Thulo motor lai pura load lagayera test garna mahango ra garo. Load bina nai losses napne tarika chahiyo.',
      voice: 'ठूलो मोटरलाई पूरा लोड लगाएर टेस्ट गर्न महँगो र गाह्रो। लोड बिना नै लसेस नाप्ने तरिका चाहियो।',
      lines: [['h', <>Load bina motor kasari jachne?</>], chain(<>Pura load ma test: mahango ra garo</>)],
    },
    {
      say: 'Load bina chalda bahira kunai kaam hudaina, tesaile motor le liyeko sabai power losses mai jancha.',
      voice: 'लोड बिना चल्दा बाहिर कुनै काम हुँदैन, त्यसैले मोटरले लिएको सबै पावर लसेसमै जान्छ।',
      lines: [part(<>Load bina</>, <>liyeko sabai power → losses</>)],
    },
    {
      say: 'Swinburne’s test ma motor lai purai voltage ma load bina chalaincha, ra input power napincha.',
      voice: 'स्विनबर्न्स टेस्टमा मोटरलाई पूरै भोल्टेजमा लोड बिना चलाइन्छ, र इनपुट पावर नापिन्छ।',
      lines: [part(<>Swinburne</>, <>load bina chalau, input napa</>)],
    },
    {
      say: 'Yo input nai nabadhne losses ho: iron ra mechanical. Copper loss hisab garera thapda jun sukai load ko efficiency aaucha.',
      voice: 'यो इनपुट नै नबढ्ने लसेस हो — आइरन र मेकानिकल। कपर लस हिसाब गरेर थप्दा, जुनसुकै लोडको इफिसियन्सी आउँछ।',
      lines: [chain(<>Input → nabadhne losses · copper loss hisab le</>)],
    },
    {
      say: 'Retardation test ma motor lai chito ghumayera supply kaatincha.',
      voice: 'रिटार्डेसन टेस्टमा मोटरलाई छिटो घुमाएर सप्लाई काटिन्छ।',
      lines: [part(<>Retardation</>, <>chito ghumau, supply kaata</>)],
    },
    {
      say: 'Ani motor cycle ko chakka jastai bistarai rokincha. Jati chito rokincha, uti dherai ghumda hune loss.',
      voice: 'अनि मोटर साइकलको चक्का जस्तै बिस्तारै रोकिन्छ। जति छिटो रोकिन्छ, उति धेरै घुम्दा हुने लस।',
      lines: [chain(<>Chito rokiyo → dherai loss</>)],
      ask: {
        q: 'Supply kaatepachi motor dherai chito rokiyo bhane k bujhincha?',
        voice: 'सप्लाई काटेपछि मोटर धेरै छिटो रोकियो भने के बुझिन्छ?',
        options: ['Ghumda hune loss dherai cha', 'Loss ekdam kam cha', 'Supply voltage badhi thiyo'],
        answer: 0,
        why: 'Friction ra hawa le ghumai khanchan; jati dherai loss, uti chito rokincha.',
      },
    },
    {
      say: 'Dubai test ma load chahidaina, ra losses bata efficiency nikalincha.',
      voice: 'दुवै टेस्टमा लोड चाहिँदैन, र लसेसबाट इफिसियन्सी निकालिन्छ।',
      lines: [['idea', <>Dubai test: load bina losses → efficiency</>]],
    },
  ],
  lecturer: [
    {
      say: 'Thulo machine lai full load ma test garna dherai energy ra mahango load chahincha. Tesaile indirect test garincha.',
      voice: 'ठूलो मेसिनलाई फुल लोडमा टेस्ट गर्न धेरै इनर्जी र महँगो लोड चाहिन्छ। त्यसैले इनडाइरेक्ट टेस्ट गरिन्छ।',
      lines: [['h', <>Indirect testing</>], chain(<>Full load test: dherai energy, mahango</>)],
    },
    {
      say: 'No load ma output shunya huncha, tesaile motor ko input power sabai losses ma kharcha huncha.',
      voice: 'नो लोडमा आउटपुट शून्य हुन्छ, त्यसैले मोटरको इनपुट पावर सबै लसेसमा खर्च हुन्छ।',
      lines: [part(<>No load</>, <>input → losses matra</>)],
    },
    {
      say: 'Swinburne’s test ma motor lai rated voltage ma no load ma chalayera input power napincha.',
      voice: 'स्विनबर्न्स टेस्टमा मोटरलाई रेटेड भोल्टेजमा नो लोडमा चलाएर इनपुट पावर नापिन्छ।',
      lines: [part(<>Swinburne</>, <>rated voltage, no load, input napne</>)],
    },
    {
      say: 'Yo input constant losses dincha. Copper loss calculate garera thapda kunai pani load ko efficiency nikalincha.',
      voice: 'यो इनपुटले कन्स्टेन्ट लसेस दिन्छ। कपर लस क्याल्कुलेट गरेर थप्दा, कुनै पनि लोडको इफिसियन्सी निकालिन्छ।',
      lines: [chain(<>Constant losses + calculated copper loss → efficiency</>)],
    },
    {
      say: 'Retardation test ma motor lai rated speed bhanda mathi ghumayera supply disconnect garincha.',
      voice: 'रिटार्डेसन टेस्टमा मोटरलाई रेटेड स्पिडभन्दा माथि घुमाएर सप्लाई डिस्कनेक्ट गरिन्छ।',
      lines: [part(<>Retardation</>, <>speed badhau, supply disconnect</>)],
    },
    {
      say: 'Armature friction ra windage le bistarai slow down huncha. Slow hune dar rotational losses mathi nirbhar garcha.',
      voice: 'आर्मेचर फ्रिक्सन र विन्डेजले बिस्तारै स्लो डाउन हुन्छ। स्लो हुने दर रोटेसनल लसेसमाथि निर्भर गर्छ।',
      lines: [chain(<>Slow hune dar → rotational losses</>)],
      ask: {
        q: 'Retardation test le kun losses nikalcha?',
        voice: 'रिटार्डेसन टेस्टले कुन लसेस निकाल्छ?',
        options: ['Rotational losses', 'Copper loss matra', 'Brush contact loss matra'],
        answer: 0,
        why: 'Supply kaatepachi friction, windage ra iron loss le matra speed ghataucha: tyo rotational loss ho.',
      },
    },
    {
      say: 'Dubai indirect test ma load chahidaina, ra losses bata efficiency nikalincha.',
      voice: 'दुवै इनडाइरेक्ट टेस्टमा लोड चाहिँदैन, र लसेसबाट इफिसियन्सी निकालिन्छ।',
      lines: [['idea', <>Indirect tests: load bina losses → efficiency</>]],
    },
  ],
});

/* ── 4.2 Back EMF: the motor pushes back (IOE Unit 4, bullet 2) ───────── */
export const basicsBackEmf = duo('4.2 · Basic understanding: why does a running motor push back?', {
  three: motorTour([
    { shot: 'wiring', show: WIRED, open: 0.6, wiring: 'main', flow: 0.5, spin: 0.5, focus: ['battery', 'wires'], labels: [['battery ko dhakka', [-3.5, -0.6, 2.0]]] },
    { spin: 0.8, back: 1, focus: ['armature', 'battery'], labels: [['ulto dhakka', [-3.5, -2.1, 2.0]]] },
    { flow: 0.25, focus: ['wires'], labels: [['current thorai', 'wires']] },
    { spin: 0.45, spinMs: 2500, back: 0.5, flow: 0.7, push: 1, focus: ['armature', 'fan'], labels: [['load badhyo', 'fan']] },
    { push: 0, spin: 0.7, flow: 0.5, back: 0.8, focus: ['fan'], labels: [['kaam: ghumai', 'fan']] },
    { spin: 0, spinMs: 400, back: 0, flow: 1, heat: { coil: 0.8 }, focus: ['coil', 'wires'], labels: [['suru: dherai current', [0, 2.9, 1.4]]] },
    { shot: 'starter', show: STARTER, heat: {}, flow: 0, wiring: 'none', spin: 0.2, stud: 3, studMs: 2500, focus: ['starter'], labels: [['starter', 'starter']] },
    { shot: 'whole', show: MOTOR, stud: 0, spin: 0.7, focus: null },
  ]),
  tutor: [
    {
      say: 'Battery le current lai armature tira dhakelcha. Current ra magnet milera motor ghumcha.',
      voice: 'ब्याट्रीले करेन्टलाई आर्मेचरतिर धकेल्छ। करेन्ट र म्याग्नेट मिलेर मोटर घुम्छ।',
      lines: [['h', <>4.2 · Ghumne motor ulto kina dhakelcha?</>], part(<>Battery</>, <>current lai agadi dhakelcha</>)],
    },
    {
      say: 'Tara ghumdai gareko motor aafai sano generator jastai huncha, ra battery lai ulto dhakelcha. Yo ulto dhakka nai back EMF.',
      voice: 'तर घुम्दै गरेको मोटर आफैं सानो जेनेरेटर जस्तै हुन्छ, र ब्याट्रीलाई उल्टो धकेल्छ। यो उल्टो धक्का नै ब्याक ई एम एफ।',
      lines: [part(<>Back EMF</>, <>ghumne motor ko ulto dhakka</>)],
    },
    {
      say: 'Dui dhakka ek arka ko ulto bhayeko le bachi rahane dhakka sano huncha, ra chito ghumda current thorai matra bagcha.',
      voice: 'दुई धक्का एक अर्काको उल्टो भएकोले, बाँकी रहने धक्का सानो हुन्छ, र छिटो घुम्दा करेन्ट थोरै मात्र बग्छ।',
      lines: [chain(<>Chito ghumai → thulo ulto dhakka → current thorai</>)],
    },
    {
      say: 'Load badhyo bhane motor alik dhilo huncha, ulto dhakka ghatcha, current badhcha, ra dhakka pani badhcha. Motor le aafai milaucha.',
      voice: 'लोड बढ्यो भने मोटर अलि ढिलो हुन्छ, उल्टो धक्का घट्छ, करेन्ट बढ्छ, र धक्का पनि बढ्छ। मोटरले आफैं मिलाउँछ।',
      lines: [chain(<>Load badhyo → dhilo → ulto dhakka ghatyo → current badhyo</>)],
      ask: {
        q: 'Load badhda DC motor ko current kina badhcha?',
        voice: 'लोड बढ्दा डी सी मोटरको करेन्ट किन बढ्छ?',
        options: ['Motor dhilo bhayera ulto dhakka ghatcha', 'Battery ko voltage badhcha', 'Magnet kamjor huncha'],
        answer: 0,
        why: 'Dhilo ghumda back EMF ghatcha, tesaile battery ko dhakka le badhi current pathaucha.',
      },
    },
    {
      say: 'Yahi ulto dhakka ko viruddha battery le gareko kaam nai shaft ko ghumai ma badalincha.',
      voice: 'यही उल्टो धक्काको विरुद्ध ब्याट्रीले गरेको काम नै, साफ्टको घुमाइमा बदलिन्छ।',
      lines: [chain(<>Ulto dhakka viruddha kaam → shaft ko ghumai</>)],
    },
    {
      say: 'Suru ma motor rokiyeko huncha, ulto dhakka hudaina. Current ekai choti dherai bagcha ra coil taato huncha.',
      voice: 'सुरुमा मोटर रोकिएको हुन्छ, उल्टो धक्का हुँदैन। करेन्ट एकैचोटि धेरै बग्छ, र कोइल तातो हुन्छ।',
      lines: [chain(<>Suru: rokiyeko → ulto dhakka chaina → dherai current</>)],
    },
    {
      say: 'Yesaile suru ma starter le current lai bistarai badhaucha, jaba samma ulto dhakka bandaina.',
      voice: 'यसैले सुरुमा स्टार्टरले करेन्टलाई बिस्तारै बढाउँछ, जबसम्म उल्टो धक्का बन्दैन।',
      lines: [part(<>Starter</>, <>suru ko current bistarai badhaucha</>)],
    },
    {
      say: 'Saransh: back EMF le current milaucha, load anusar motor lai aafai sambhalcha, ra suru ma yo nabhayeko le starter chahincha.',
      voice: 'सारांश — ब्याक ई एम एफले करेन्ट मिलाउँछ, लोड अनुसार मोटरलाई आफैं सम्हाल्छ, र सुरुमा यो नभएकोले स्टार्टर चाहिन्छ।',
      lines: [['idea', <>Back EMF: current milaucha · load anusar aafai · suru ma chaina → starter</>]],
    },
  ],
  lecturer: [
    {
      say: 'Supply voltage le armature ma current pathaucha, ra current ra field milera torque banchha.',
      voice: 'सप्लाई भोल्टेजले आर्मेचरमा करेन्ट पठाउँछ, र करेन्ट र फिल्ड मिलेर टर्क बन्छ।',
      lines: [['h', <>4.2 · Back EMF</>], part(<>Supply</>, <>armature ma current pathaucha</>)],
    },
    {
      say: 'Armature ghumda tesko conductor le flux cut garchan, ra supply ko ulto EMF induce huncha. Yahi back EMF ho.',
      voice: 'आर्मेचर घुम्दा त्यसको कन्डक्टरले फ्लक्स कट गर्छन्, र सप्लाईको उल्टो ई एम एफ इन्ड्युस हुन्छ। यही ब्याक ई एम एफ हो।',
      lines: [part(<>Back EMF</>, <>rotation le induce bhayeko ulto EMF</>)],
    },
    {
      say: 'Back EMF supply lai oppose garcha, tesaile running condition ma armature current sano rahancha.',
      voice: 'ब्याक ई एम एफ सप्लाईलाई अपोज गर्छ, त्यसैले रनिङ कन्डिसनमा आर्मेचर करेन्ट सानो रहन्छ।',
      lines: [chain(<>High speed → large back EMF → small current</>)],
    },
    {
      say: 'Load badhda speed ghatcha, back EMF ghatcha, current ra torque badhchan: motor self-regulating huncha.',
      voice: 'लोड बढ्दा स्पिड घट्छ, ब्याक ई एम एफ घट्छ, करेन्ट र टर्क बढ्छन् — मोटर सेल्फ रेगुलेटिङ हुन्छ।',
      lines: [chain(<>Load up → speed down → back EMF down → current up</>)],
      ask: {
        q: 'Back EMF le DC motor lai kasto banaucha?',
        voice: 'ब्याक ई एम एफले डी सी मोटरलाई कस्तो बनाउँछ?',
        options: ['Self-regulating', 'Self-starting matra', 'Constant current'],
        answer: 0,
        why: 'Load badhda back EMF ghatera current ra torque aafai badhcha.',
      },
    },
    {
      say: 'Back EMF ko viruddha supply le gareko kaam nai mechanical power ma rupantaran huncha.',
      voice: 'ब्याक ई एम एफको विरुद्ध सप्लाईले गरेको काम नै, मेकानिकल पावरमा रूपान्तरण हुन्छ।',
      lines: [chain(<>Work against back EMF → mechanical power</>)],
    },
    {
      say: 'Starting ma armature sthir huncha, back EMF hudaina, ra current dherai thulo hunchha.',
      voice: 'स्टार्टिङमा आर्मेचर स्थिर हुन्छ, ब्याक ई एम एफ हुँदैन, र करेन्ट धेरै ठूलो हुन्छ।',
      lines: [chain(<>At rest → no back EMF → very large current</>)],
    },
    {
      say: 'Tesaile starter le suru ma current seemit garcha.',
      voice: 'त्यसैले स्टार्टरले सुरुमा करेन्ट सीमित गर्छ।',
      lines: [part(<>Starter</>, <>limits the starting current</>)],
    },
    {
      say: 'Saransh: back EMF le current niyantran garcha, motor lai self-regulating banaucha, ra starting ma yo nahune bhayeko le starter chahincha.',
      voice: 'सारांश — ब्याक ई एम एफले करेन्ट नियन्त्रण गर्छ, मोटरलाई सेल्फ रेगुलेटिङ बनाउँछ, र स्टार्टिङमा यो नहुने भएकोले स्टार्टर चाहिन्छ।',
      lines: [['idea', <>Back EMF: limits current · self-regulation · none at start → starter</>]],
    },
  ],
});

/* ── 4.4 Performance characteristics: how speed and torque follow load ── */
export const basicsChars = duo('4.4 · Basic understanding: how do speed and torque change with load?', {
  three: motorTour([
    { shot: 'wiring', show: WIRED, open: 0.6, wiring: 'shunt', flow: 0.4, field: 0.7, spin: 0.7, focus: ['fieldCoil', 'wires'], labels: [['shunt motor', [0.2, 3.4, 0.4]]] },
    { flow: 0.7, push: 0.6, spin: 0.62, spinMs: 2000, focus: ['armature', 'fan'], labels: [['speed thorai ghatyo', 'fan']] },
    { push: 0.9, flow: 0.9, focus: ['coil'], labels: [['current badhyo, dhakka badhyo', [0, 2.9, 1.4]]] },
    { wiring: 'series', field: 0.4, push: 0.4, spin: 0.5, flow: 0.5, focus: ['fieldCoil', 'wires'], labels: [['series motor', [0.2, 3.4, 1.4]]] },
    { field: 1, push: 1, spin: 0.25, spinMs: 2000, flow: 1, focus: ['poles', 'coil'], labels: [['dherai load: thulo dhakka', [0, 2.9, 1.4]]] },
    { field: 0.15, push: 0.1, spin: 1, spinMs: 2500, flow: 0.15, focus: ['armature', 'fan'], labels: [['load kam: dherai speed', 'fan']] },
    { wiring: 'compound', field: 0.7, push: 0.6, spin: 0.55, flow: 0.6, focus: ['fieldCoil', 'wires'], labels: [['compound: bich ko', [0.2, 3.4, 1.0]]] },
    { shot: 'whole', show: MOTOR, push: 0, spin: 0.6, focus: null },
  ]),
  tutor: [
    {
      say: 'Characteristic bhaneko load badaldai jada motor ko speed ra dhakka kasari badalchan bhanne kura. Pahila shunt motor herau.',
      voice: 'क्यारेक्टरिस्टिक भनेको, लोड बदल्दै जाँदा मोटरको स्पिड र धक्का कसरी बदलिन्छन् भन्ने कुरा। पहिला शन्ट मोटर हेरौं।',
      lines: [['h', <>4.4 · Load anusar speed ra dhakka</>], part(<>Characteristic</>, <>load anusar speed ra dhakka</>)],
    },
    {
      say: 'Shunt motor ma magnet ko bal ustai rahancha. Load badhda speed thorai matra ghatcha.',
      voice: 'शन्ट मोटरमा म्याग्नेटको बल उस्तै रहन्छ। लोड बढ्दा स्पिड थोरै मात्र घट्छ।',
      lines: [chain(<>Shunt: magnet ustai → load badhda speed thorai ghatcha</>)],
    },
    {
      say: 'Jati current badhcha, utai anupat ma dhakka pani badhcha. Fan, lathe jasta lagbhag eutai speed chahine kaam ma ramro.',
      voice: 'जति करेन्ट बढ्छ, उत्तिकै अनुपातमा धक्का पनि बढ्छ। फ्यान, लेथ जस्ता लगभग एउटै स्पिड चाहिने काममा राम्रो।',
      lines: [chain(<>Current badhyo → dhakka utai badhyo (fan, lathe)</>)],
    },
    {
      say: 'Aba series motor. Yasma magnet ko bal current anusar badalcha.',
      voice: 'अब सिरिज मोटर। यसमा म्याग्नेटको बल करेन्ट अनुसार बदलिन्छ।',
      lines: [part(<>Series</>, <>magnet ko bal current anusar</>)],
    },
    {
      say: 'Dherai load ma current ra magnet dubai balio, tesaile dhakka dherai thulo tara speed kam. Crane ra train ma yahi chahincha.',
      voice: 'धेरै लोडमा करेन्ट र म्याग्नेट दुवै बलियो, त्यसैले धक्का धेरै ठूलो तर स्पिड कम। क्रेन र ट्रेनमा यही चाहिन्छ।',
      lines: [chain(<>Dherai load → thulo dhakka, kam speed (crane, train)</>)],
    },
    {
      say: 'Load kam bhaye magnet kamjor, ra speed dherai badhcha. Load bina chalaunu khatarnak cha.',
      voice: 'लोड कम भए म्याग्नेट कमजोर, र स्पिड धेरै बढ्छ। लोड बिना चलाउनु खतरनाक छ।',
      lines: [chain(<>Load kam → magnet kamjor → speed dherai (load bina khatara)</>)],
      ask: {
        q: 'Kun motor lai load bina chalaunu khatarnak cha?',
        voice: 'कुन मोटरलाई लोड बिना चलाउनु खतरनाक छ?',
        options: ['Series motor', 'Shunt motor', 'Dubai ma farak chaina'],
        answer: 0,
        why: 'Series motor ma load bina current ra magnet kamjor huncha, ani speed khatarnak badhcha.',
      },
    },
    {
      say: 'Compound motor dubai ko bich ma parcha: suru ko dhakka ramro, ra load bina pani speed seemit.',
      voice: 'कम्पाउन्ड मोटर दुवैको बीचमा पर्छ — सुरुको धक्का राम्रो, र लोड बिना पनि स्पिड सीमित।',
      lines: [part(<>Compound</>, <>shunt ra series ko bich</>)],
    },
    {
      say: 'Saransh: shunt lagbhag eutai speed, series thulo dhakka tara load bina khatara, compound dubai ko bich.',
      voice: 'सारांश — शन्ट लगभग एउटै स्पिड, सिरिज ठूलो धक्का तर लोड बिना खतरा, कम्पाउन्ड दुवैको बीच।',
      lines: [['idea', <>Shunt: eutai speed · series: thulo dhakka · compound: bich</>]],
    },
  ],
  lecturer: [
    {
      say: 'Performance characteristic le load anusar speed ra torque kasari badalcha bhanera dekhaucha. Suru ma shunt motor.',
      voice: 'पर्फर्मेन्स क्यारेक्टरिस्टिकले, लोड अनुसार स्पिड र टर्क कसरी बदलिन्छ भनेर देखाउँछ। सुरुमा शन्ट मोटर।',
      lines: [['h', <>4.4 · Performance characteristics</>], part(<>Characteristic</>, <>speed and torque against load</>)],
    },
    {
      say: 'Shunt motor ma flux lagbhag constant huncha, tesaile load badhda speed thorai matra ghatcha.',
      voice: 'शन्ट मोटरमा फ्लक्स लगभग कन्स्टेन्ट हुन्छ, त्यसैले लोड बढ्दा स्पिड थोरै मात्र घट्छ।',
      lines: [chain(<>Shunt: flux constant → speed falls slightly with load</>)],
    },
    {
      say: 'Torque armature current sanga sidha badhcha. Yasaile shunt motor lathe, fan, ra paper machine ma prayog huncha.',
      voice: 'टर्क आर्मेचर करेन्टसँग सिधा बढ्छ। यसैले शन्ट मोटर लेथ, फ्यान, र पेपर मेसिनमा प्रयोग हुन्छ।',
      lines: [chain(<>Torque grows directly with current (lathe, fan, paper machine)</>)],
    },
    {
      say: 'Series motor ma field current nai armature current ho, tesaile flux load anusar badalcha.',
      voice: 'सिरिज मोटरमा फिल्ड करेन्ट नै आर्मेचर करेन्ट हो, त्यसैले फ्लक्स लोड अनुसार बदलिन्छ।',
      lines: [part(<>Series</>, <>flux changes with load current</>)],
    },
    {
      say: 'Bhari load ma current ra flux dubai thulo, tesaile starting torque dherai ucho ra speed kam: traction ra crane ko lagi upayukta.',
      voice: 'भारी लोडमा करेन्ट र फ्लक्स दुवै ठूलो, त्यसैले स्टार्टिङ टर्क धेरै उच्च र स्पिड कम — ट्र्याक्सन र क्रेनको लागि उपयुक्त।',
      lines: [chain(<>Heavy load → very high torque, low speed (traction, cranes)</>)],
    },
    {
      say: 'Halka load ma flux ghatcha ra speed dherai badhcha; series motor kahile pani load bina start garnu hudaina.',
      voice: 'हल्का लोडमा फ्लक्स घट्छ र स्पिड धेरै बढ्छ। सिरिज मोटर कहिल्यै पनि लोड बिना स्टार्ट गर्नु हुँदैन।',
      lines: [chain(<>Light load → weak flux → dangerous speed (never start on no load)</>)],
      ask: {
        q: 'Series motor lai kahile pani load bina kina start garnu hudaina?',
        voice: 'सिरिज मोटरलाई कहिल्यै पनि लोड बिना किन स्टार्ट गर्नु हुँदैन?',
        options: ['Flux kam bhayera speed khatarnak badhcha', 'Starting torque zero huncha', 'Current zero huncha'],
        answer: 0,
        why: 'No load ma current ra flux dherai kam, speed flux ko ulto anupat ma badhcha.',
      },
    },
    {
      say: 'Compound motor ko characteristic shunt ra series ko bich ma huncha.',
      voice: 'कम्पाउन्ड मोटरको क्यारेक्टरिस्टिक, शन्ट र सिरिजको बीचमा हुन्छ।',
      lines: [part(<>Compound</>, <>between shunt and series</>)],
    },
    {
      say: 'Saransh: shunt constant speed, series high starting torque, compound dubai ko bich.',
      voice: 'सारांश — शन्ट कन्स्टेन्ट स्पिड, सिरिज हाई स्टार्टिङ टर्क, कम्पाउन्ड दुवैको बीच।',
      lines: [['idea', <>Shunt: near-constant speed · series: high starting torque · compound: between</>]],
    },
  ],
});
