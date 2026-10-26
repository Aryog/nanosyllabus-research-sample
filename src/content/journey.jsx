import { ch1 } from './video/ch1.jsx';
import { ch2 } from './video/ch2.jsx';
import { ch3 } from './video/ch3.jsx';
import { ch4 } from './video/ch4.jsx';
import { ch5 } from './video/ch5.jsx';
import { ch6 } from './video/ch6.jsx';
import { ch7 } from './video/ch7.jsx';
import { ch8 } from './video/ch8.jsx';
import { ch9 } from './video/ch9.jsx';
import { pastQuestions, recap } from './video/past.jsx';

/*
  The DC Motors course as one video-first journey, in IOE syllabus order:
  Unit 1 (force on a conductor) and Unit 3 (construction, commutator, EMF
  equation) as groundwork, then every bullet of Unit 4 (DC Motor).

  Each chapter (src/content/video/chN.jsx) is mostly self-playing videos with
  questions that pause the video, one IOE model answer and one memory hook.
  The journey ends with interleaved IOE past numericals and a recap video.
*/

const M = ({ children }) => <span className="math">{children}</span>;

const summary = {
  narration: 'l4-done',
  pose: 'dab',
  body: (
    <>
      <h2>DC motor, suru dekhi antya samma</h2>
      <ol className="summary">
        <li>Motor principle: field ma rakheko current-carrying conductor le <M>F = BIl</M> force paucha (Fleming’s left-hand rule).</li>
        <li>Commutator le har half turn ma coil ko current ulto pharcha, tyesaile torque eutai direction ma rahancha.</li>
        <li>Back EMF: <M>Eb = PφZN/60A</M>; voltage equation <M>V = Eb + IaRa</M>; Pm = EbIa, Eb = V/2 huda maximum.</li>
        <li>Torque: <M>Ta = 0.159φZIa(P/A) = 9.55EbIa/N</M>; speed <M>N ∝ (V − IaRa)/φ</M>.</li>
        <li>Shunt: speed constant jasto. Series: Ta ∝ Ia², no load ma kahile pani na chalau. Compound: dubai ko bich ma.</li>
        <li>Starter le starting current limit garcha (3-point / 4-point, NVC ra OLR). Speed chai flux, resistance wa voltage le control huncha.</li>
        <li>Variable loss = constant loss huda η maximum; Swinburne’s test le constant loss nikalcha.</li>
      </ol>
    </>
  ),
};

const chapters = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9];

export const journey = {
  id: 'dc-motors-journey',
  title: 'DC Motors',
  doneTitle: 'Course sakiyo! 🎉',
  chapters: chapters.map((c) => c.title),
  steps: [
    ...chapters.flatMap((c, i) => [
      { interstitial: { title: c.title, badge: 'chapter', icon: i + 1, kicker: c.syllabus } },
      ...c.steps.map((s) => ({ ...s, chapter: `Chapter ${i + 1} · ${c.title}` })),
    ]),
    { interstitial: { title: 'Past Questions', badge: 'check', kicker: 'Real IOE numerical haru, 2065–2083' }, narration: 'past-questions' },
    ...pastQuestions,
    { ...recap, chapter: 'Dohoryau' },
    summary,
  ],
};
