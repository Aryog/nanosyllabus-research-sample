// Every line Sparky says, in Nepali. Each entry is [romanized caption, Devanagari speech]:
// the caption is shown in the bubble; the Devanagari is what ElevenLabs (eleven_v3,
// language_code "ne") reads, since it pronounces Devanagari far better than romanized
// text. Technical terms stay English, the way IOE students actually say them.
// Keep lines short: the bubble is a nudge, the lesson text does the teaching.
// After editing: npm run audio → public/audio/<id>.mp3

const lines = {
  welcome: ['DC Motor ma swagat chha.', 'डीसी मोटरमा स्वागत छ।'],
  'skill-check': ['Skill check.', 'स्किल चेक।'],

  // Lesson 1 — Magnets & fields
  'l1-intro': ['DC Motor ma swagat chha. Ke le chij ghumauchha, herau.', 'डीसी मोटरमा स्वागत छ। केले चीज घुमाउँछ, हेरौं।'],
  'l1-field': ['Compass lai harek chamkine thau ma tannuhos.', 'कम्पासलाई हरेक चम्किने ठाउँमा तान्नुहोस्।'],
  'l1-field-lines': ['Yi curve haru field line hun.', 'यी कर्भहरू फिल्ड लाइन हुन्।'],
  'l1-flux': ['Flux bhaneko matra ho. Flux density bhaneko kati khadiyeko chha.', 'फ्लक्स भनेको मात्रा हो। फ्लक्स डेन्सिटी भनेको कति खाँदिएको छ।'],
  'l1-notation': ['Dot ki cross? Euta teer sochnuhos.', 'डट कि क्रस? एउटा तीर सोच्नुहोस्।'],
  'l1-oersted': ['Aba current on garnuhos. Dubai tira garera hernuhos.', 'अब करेन्ट अन गर्नुहोस्। दुवैतिर गरेर हेर्नुहोस्।'],
  'l1-grip': ['Daya haat le taar samatnuhos. Pahila anuman garnuhos.', 'दायाँ हातले तार समात्नुहोस्। पहिला अनुमान गर्नुहोस्।'],
  'l1-q-field': ['Compass kata dekhauchha hola?', 'कम्पास कता देखाउँछ होला?'],
  'l1-q-wire': ['Pahila grip rule, ani circle pachhyaunuhos.', 'पहिला ग्रिप रुल, अनि सर्कल पछ्याउनुहोस्।'],
  'l1-q-flux': ['Unit ma dhyan dinuhos.', 'युनिटमा ध्यान दिनुहोस्।'],
  'l1-q-ioe': ['Yo prashna sacchai IOE paper bata ho.', 'यो प्रश्न साँच्चै आइओई पेपरबाट हो।'],

  // Lesson 2 — Motor principle
  'l2-intro': ['Yo motor principle ho.', 'यो मोटर प्रिन्सिपल हो।'],
  'l2-force': ['Force thik ek newton banauna saknuhunchha?', 'फोर्स ठीक एक न्युटन बनाउन सक्नुहुन्छ?'],
  'l2-worked': ['Angle le pharak parchha. Euta hal garau.', 'एङ्गलले फरक पार्छ। एउटा हल गरौं।'],
  'l2-flip': ['Aba magnet paltaunuhos. Ani current ulto garnuhos.', 'अब म्याग्नेट पल्टाउनुहोस्। अनि करेन्ट उल्टो गर्नुहोस्।'],
  'l2-fleming': ['Baya haat uthaunuhos.', 'बायाँ हात उठाउनुहोस्।'],
  'l2-q-scale': ['Formula bare sochnuhos.', 'फर्मुलाबारे सोच्नुहोस्।'],
  'l2-q-calc': ['Aba alikati hisab.', 'अब अलिकति हिसाब।'],
  'l2-q-flip': ['Yespali dubai paltiyeka chhan.', 'यसपालि दुवै पल्टिएका छन्।'],
  'l2-q-angle': ['Angle nabirsanuhos.', 'एङ्गल नबिर्सनुहोस्।'],
  'l2-q-ioe': ['IOE ma yo dherai sodhinchha. Principle bhannuhos.', 'आइओईमा यो धेरै सोधिन्छ। प्रिन्सिपल भन्नुहोस्।'],

  // Lesson 3 — From push to spin
  'l3-loop': ['Taar lai coil banaunuhos.', 'तारलाई कोइल बनाउनुहोस्।'],
  'l3-zero': ['Kunai twist nabhayeko thau khojnuhos.', 'कुनै ट्विस्ट नभएको ठाउँ खोज्नुहोस्।'],
  'l3-torque-eq': ['Coil ma lagne torque yo ho.', 'कोइलमा लाग्ने टर्क यो हो।'],
  'l3-stuck': ['Chhodnuhos. Sadhai ghumchha ta?', 'छोड्नुहोस्। सधैं घुम्छ त?'],
  'l3-why-stuck': ['Hmm, adkiyo. Kina, herau.', 'हम्म, अड्कियो। किन, हेरौं।'],
  'l3-commutator': ['Yasko upaya: commutator.', 'यसको उपाय: कम्युटेटर।'],
  'l3-many-coils': ['Sacchai ko motor ma dherai coil hunchhan.', 'साँच्चैको मोटरमा धेरै कोइल हुन्छन्।'],
  'l3-q-graph': ['Zero torque bhayeko thau mark garnuhos.', 'जिरो टर्क भएको ठाउँ मार्क गर्नुहोस्।'],
  'l3-q-stuck': ['Kina rokiyo?', 'किन रोकियो?'],
  'l3-q-twice': ['Kati choti paltiyo, gannuhos.', 'कति चोटि पल्टियो, गन्नुहोस्।'],
  'l3-q-coils': ['Kina yati dherai coil?', 'किन यति धेरै कोइल?'],
  'l3-q-ioe': ['Torque kahile pani ulto hudaina, kina?', 'टर्क कहिल्यै पनि उल्टो हुँदैन, किन?'],

  // Lesson 4 — Construction
  'l4c-intro': ['Aba sacchai ko DC machine kholau.', 'अब साँच्चैको डीसी मेसिन खोलौं।'],
  'l4c-explore': ['Harek part ma thichnuhos.', 'हरेक पार्टमा थिच्नुहोस्।'],
  'l4c-sort': ['Sthir ki ghumne? Part chhuttyaunuhos.', 'स्थिर कि घुम्ने? पार्ट छुट्याउनुहोस्।'],
  'l4c-path': ['Flux ko bato pachhyaunuhos.', 'फ्लक्सको बाटो पछ्याउनुहोस्।'],
  'l4c-lam': ['Core kina yati patlo kaatiyeko?', 'कोर किन यति पातलो काटिएको?'],
  'l4c-winding': ['Lap ki wave? Path gannuhos.', 'ल्याप कि वेभ? पाथ गन्नुहोस्।'],
  'l4c-q-part': ['Switching kun part le garchha?', 'स्विचिङ कुन पार्टले गर्छ?'],
  'l4c-q-lam': ['Lamination bare sochnuhos.', 'लेमिनेसनबारे सोच्नुहोस्।'],
  'l4c-q-paths': ['Chha pole. Kati path?', 'छ पोल। कति पाथ?'],
  'l4c-q-brush': ['Kina carbon?', 'किन कार्बन?'],
  'l4c-q-yoke': ['Loop kun part le banda garchha?', 'लुप कुन पार्टले बन्द गर्छ?'],
  'l4c-q-ioe': ['Wave wound. Current lai dui bhag garnuhos.', 'वेभ वाउन्ड। करेन्टलाई दुई भाग गर्नुहोस्।'],

  // Lesson 5 — Back EMF & voltage equation
  'l4-lab': ['1,500 rpm bhanda mathi laijanuhos.', 'पन्ध्र सय आरपीएमभन्दा माथि लैजानुहोस्।'],
  'l4-backemf': ['Switch thichnuhos. Current hernuhos.', 'स्विच थिच्नुहोस्। करेन्ट हेर्नुहोस्।'],
  'l5-derive': ['EMF equation nikalau.', 'इएमएफ इक्वेसन निकालौं।'],
  'l5-calc': ['EMF equation chalayera hernuhos.', 'इएमएफ इक्वेसन चलाएर हेर्नुहोस्।'],
  'l5-voltage': ['Motor le chahine jati matra linchha.', 'मोटरले चाहिने जति मात्र लिन्छ।'],
  'l5-power': ['Current le guna garnuhos.', 'करेन्टले गुणा गर्नुहोस्।'],
  'l5-maxpower': ['Power kahile sabai bhanda thulo hunchha?', 'पावर कहिले सबैभन्दा ठूलो हुन्छ?'],
  'l4-q-start': ['Current kahile sabai bhanda thulo?', 'करेन्ट कहिले सबैभन्दा ठूलो?'],
  'l5-q-emf': ['Lap wound. A hernuhos.', 'ल्याप वाउन्ड। ए हेर्नुहोस्।'],
  'l5-q-pm': ['Pahila back EMF, ani power.', 'पहिला ब्याक इएमएफ, अनि पावर।'],
  'l4-q-calc': ['Aba number rakhau.', 'अब नम्बर राखौं।'],
  'l5-q-max': ['Peak khojnuhos.', 'पिक खोज्नुहोस्।'],
  'l4-q-jam': ['Motor adkiyo.', 'मोटर अड्कियो।'],
  'l5-q-ioe': ['EMF equation ulto chalaunuhos.', 'इएमएफ इक्वेसन उल्टो चलाउनुहोस्।'],
  'l5-q-ioe2': ['Back EMF kina mahatwapurna chha?', 'ब्याक इएमएफ किन महत्वपूर्ण छ?'],

  // Lesson 6 — Torque & speed
  'l6-derive': ['Aba torque equation.', 'अब टर्क इक्वेसन।'],
  'l6-power': ['Power ra speed bata chhoto upaya.', 'पावर र स्पिडबाट छोटो उपाय।'],
  'l6-excite': ['Field le current kata bata paunchha?', 'फिल्डले करेन्ट कताबाट पाउँछ?'],
  'l6-prop': ['Torque field ma bhar parchha.', 'टर्क फिल्डमा भर पर्छ।'],
  'l6-speed': ['Speed bhaneko back EMF bhag flux.', 'स्पिड भनेको ब्याक इएमएफ भाग फ्लक्स।'],
  'l6-reg': ['Speed kati sthir chha?', 'स्पिड कति स्थिर छ?'],
  'l6-q-torque': ['Yespali wave wound.', 'यसपालि वेभ वाउन्ड।'],
  'l6-q-speed': ['Dui back EMF tulana garnuhos.', 'दुई ब्याक इएमएफ तुलना गर्नुहोस्।'],
  'l6-q-shaft': ['9.55 prayog garnuhos.', 'नौ दशमलव पाँच पाँच प्रयोग गर्नुहोस्।'],
  'l6-q-field': ['Field khulyo bhane ke hunchha?', 'फिल्ड खुल्यो भने के हुन्छ?'],
  'l6-q-reg': ['Denominator ma dhyan dinuhos.', 'डिनोमिनेटरमा ध्यान दिनुहोस्।'],
  'l4-q-speed': ['Field baliyo. Chhito ki dhilo?', 'फिल्ड बलियो। छिटो कि ढिलो?'],
  'l6-q-ioe': ['Pahila line current, ani armature current.', 'पहिला लाइन करेन्ट, अनि आर्मेचर करेन्ट।'],
  'l6-q-ioe2': ['Series motor. Flux pani badalinchha.', 'सिरिज मोटर। फ्लक्स पनि बदलिन्छ।'],

  // Lesson 7 — Types & characteristics
  'l7-intro': ['Sabai kura field ko connection ma chha.', 'सबै कुरा फिल्डको कनेक्सनमा छ।'],
  'l7-types': ['Harek connection kholnuhos.', 'हरेक कनेक्सन खोल्नुहोस्।'],
  'l7-shunt': ['Sthir shunt motor.', 'स्थिर सन्ट मोटर।'],
  'l7-series': ['Aba chanchal series motor.', 'अब चञ्चल सिरिज मोटर।'],
  'l7-compound': ['Dubai ko ramro guna.', 'दुवैको राम्रो गुण।'],
  'l7-compare': ['Tinai lai tulana garnuhos.', 'तीनैलाई तुलना गर्नुहोस्।'],
  'l7-apps': ['Kun kaam ma kun motor?', 'कुन काममा कुन मोटर?'],
  'l7-sort': ['Harek kaam lai motor sanga milaunuhos.', 'हरेक कामलाई मोटरसँग मिलाउनुहोस्।'],
  'l7-q-shunt': ['Line current chhuttyaunuhos.', 'लाइन करेन्ट छुट्याउनुहोस्।'],
  'l7-q-noload': ['No load ma kina kahile pani nachalaune?', 'नो लोडमा किन कहिल्यै नचलाउने?'],
  'l7-q-torque': ['Series motor ko torque.', 'सिरिज मोटरको टर्क।'],
  'l7-q-app': ['Sahi motor channuhos.', 'सही मोटर छान्नुहोस्।'],
  'l7-q-long': ['Long shunt. Kun current?', 'लङ सन्ट। कुन करेन्ट?'],
  'l7-q-ioe': ['IOE ko prashna: kaam ra motor milaunuhos.', 'आइओईको प्रश्न: काम र मोटर मिलाउनुहोस्।'],

  // Lesson 8 — Starting
  'l8-why': ['Sidhai on garna kina mildaina?', 'सिधै अन गर्न किन मिल्दैन?'],
  'l8-starter': ['Ek ek stud gardai speed badhaunuhos.', 'एक एक स्टड गर्दै स्पिड बढाउनुहोस्।'],
  'l8-protect': ['Protection haru chinau.', 'प्रोटेक्सनहरू चिनौं।'],
  'l8-order': ['Starting ka step kram ma rakhnuhos.', 'स्टार्टिङका स्टेप क्रममा राख्नुहोस्।'],
  'l8-four': ['Aba four point starter.', 'अब फोर पोइन्ट स्टार्टर।'],
  'l8-q-starter': ['Starter ko size nikalnuhos.', 'स्टार्टरको साइज निकाल्नुहोस्।'],
  'l8-q-nvc': ['No volt coil le ke garchha?', 'नो भोल्ट कोइलले के गर्छ?'],
  'l8-q-four': ['Three point ki four point?', 'थ्री पोइन्ट कि फोर पोइन्ट?'],
  'l8s-q-flash': ['Flashback: speed badhda Ia lai ke hunchha?', 'फ्ल्यासब्याक: स्पिड बढ्दा आई ए लाई के हुन्छ?'],

  // Lesson 9 — Speed control & braking
  'l8-speed': ['Speed control garne tin tarika.', 'स्पिड कन्ट्रोल गर्ने तीन तरिका।'],
  'l8-targets': ['Harek target speed pugnuhos.', 'हरेक टार्गेट स्पिड पुग्नुहोस्।'],
  'l8-methods': ['Tin tarika tulana garnuhos.', 'तीन तरिका तुलना गर्नुहोस्।'],
  'l8-brake': ['Aba braking.', 'अब ब्रेकिङ।'],
  'l8-q-field': ['Base speed bhanda mathi ki tala?', 'बेस स्पिडभन्दा माथि कि तल?'],
  'l8-q-res': ['Thap resistance nikalnuhos.', 'थप रेजिस्टेन्स निकाल्नुहोस्।'],
  'l8-q-brake': ['Kun le energy pharkauchha?', 'कुनले इनर्जी फर्काउँछ?'],
  'l8-q-ioe': ['Constant torque bhaneko constant current.', 'कन्स्टेन्ट टर्क भनेको कन्स्टेन्ट करेन्ट।'],
  'l8-q-ioe2': ['Field aadha garnuhos. Ke hunchha?', 'फिल्ड आधा गर्नुहोस्। के हुन्छ?'],
  'l8-q-ioe3': ['Ustai current, ustai flux.', 'उस्तै करेन्ट, उस्तै फ्लक्स।'],

  // Lesson 10 — Losses & efficiency
  'l9-losses': ['Power kata janchha?', 'पावर कता जान्छ?'],
  'l9-flow': ['Power flow pachhyaunuhos.', 'पावर फ्लो पछ्याउनुहोस्।'],
  'l9-sort': ['Constant ki variable? Loss chhuttyaunuhos.', 'कन्स्टेन्ट कि भेरिएबल? लस छुट्याउनुहोस्।'],
  'l9-maxeff': ['Sabai bhanda ramro efficiency khojnuhos.', 'सबैभन्दा राम्रो इफिसिएन्सी खोज्नुहोस्।'],
  'l9-swinburne': ['Yo Swinburne test ho.', 'यो स्विनबर्न टेस्ट हो।'],
  'l9-q-eddy': ['Silicon steel le kun loss ghatauchha?', 'सिलिकन स्टिलले कुन लस घटाउँछ?'],
  'l9-q-max': ['Efficiency kahile sabai bhanda badhi?', 'इफिसिएन्सी कहिले सबैभन्दा बढी?'],
  'l9-q-swin': ['Test step step garnuhos.', 'टेस्ट स्टेप स्टेप गर्नुहोस्।'],
  'l9-q-const': ['Kun loss sthir rahanchhan?', 'कुन लस स्थिर रहन्छन्?'],
  'l9-q-series': ['Series motor ma kina hudaina?', 'सिरिज मोटरमा किन हुँदैन?'],
  'l9-q-ioe': ['Sabai loss jodnuhos.', 'सबै लस जोड्नुहोस्।'],
  'l9-q-ioe2': ['Field loss nabirsanuhos.', 'फिल्ड लस नबिर्सनुहोस्।'],
  'l4-done': ['Bro, DC motor ta sakiyo! Dami.', 'ब्रो, डीसी मोटर त सकियो! दामी।'],

  // Feedback — calm, not cheerleading
  'fb-correct-1': ['Sahi.', 'सही।'],
  'fb-correct-2': ['Ekdam thik.', 'एकदम ठीक।'],
  'fb-correct-3': ['Ramro, sahi ho.', 'राम्रो, सही हो।'],
  'fb-task': ['Ramro, bujhnubhayo.', 'राम्रो, बुझ्नुभयो।'],
  'fb-wrong-1': ['Thik bhayena. Ekpatak pheri hernuhos.', 'ठीक भएन। एकपटक फेरि हेर्नुहोस्।'],
  'fb-wrong-2': ['Najik hunuhunchha. Pheri sochnuhos.', 'नजिक हुनुहुन्छ। फेरि सोच्नुहोस्।'],
  'fb-reveal': ['Yo hint le sahayog garchha.', 'यो हिन्टले सहयोग गर्छ।'],
  'fb-answer': ['Yo uttar ho. Kina bhanera padhnuhos, ani agadi badhnuhos.', 'यो उत्तर हो। किन भनेर पढ्नुहोस्, अनि अगाडि बढ्नुहोस्।'],
  'lesson-done': ['Lesson sakiyo.', 'लेसन सकियो।'],

  // Journey: Past Questions block
  'past-questions': ['La aba real IOE past questions. Chill, sangai solve garchau.', 'ल अब रियल आइओई पास्ट क्वेस्चन्स। चिल, सँगै सल्भ गर्छौं।'],
  'pq-2073-bhadra': ['Duitai Eb tulana garnuhos.', 'दुवै इबी तुलना गर्नुहोस्।'],
  'pq-2081-ashwin': ['Pahila field current ghataunuhos.', 'पहिला फिल्ड करेन्ट घटाउनुहोस्।'],
  'pq-2065-chaitra': ['Series motor ma torque current ko square ho.', 'सिरिज मोटरमा टर्क करेन्टको स्क्वायर हो।'],

  // Question pacing: review retries, practice, flashbacks
  review: ['Tyo pheri ekchoti gari herau.', 'त्यो फेरि एकचोटि गरी हेरौं।'],
  practice: ['Thap abhyas.', 'थप अभ्यास।'],
  'l3-q-tau': ['Pahila area nikalnuhos.', 'पहिला एरिया निकाल्नुहोस्।'],
  'l1-q-phi': ['Aba ulto garera hernuhos.', 'अब उल्टो गरेर हेर्नुहोस्।'],
  'l3-q-flash': ['Flashback: taar ma lagne force.', 'फ्ल्यासब्याक: तारमा लाग्ने फोर्स।'],
  'l4c-q-flash': ['Flashback: flux density.', 'फ्ल्यासब्याक: फ्लक्स डेन्सिटी।'],
  'l5-q-flash': ['Flashback: parallel path gannuhos.', 'फ्ल्यासब्याक: प्यारालल पाथ गन्नुहोस्।'],
  'l6-q-flash': ['Flashback: back EMF ke le nirdharan garchha?', 'फ्ल्यासब्याक: ब्याक इएमएफ केले निर्धारण गर्छ?'],
  'l7-q-flash': ['Flashback: speed ke le nirdharan garchha?', 'फ्ल्यासब्याक: स्पिड केले निर्धारण गर्छ?'],
  'l8-q-flash': ['Flashback: yo kun motor ho?', 'फ्ल्यासब्याक: यो कुन मोटर हो?'],
};

/** Romanized Nepali captions shown in Sparky's bubble. */
export const narration = Object.fromEntries(Object.entries(lines).map(([id, [roman]]) => [id, roman]));
/** Devanagari text sent to the TTS (and to the browser fallback voice). */
export const speech = Object.fromEntries(Object.entries(lines).map(([id, [, deva]]) => [id, deva]));

export const CORRECT_LINES = ['fb-correct-1', 'fb-correct-2', 'fb-correct-3'];
export const WRONG_LINES = ['fb-wrong-1', 'fb-wrong-2'];
