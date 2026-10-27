import { topics } from './topics.jsx';
import { recap } from './video/past.jsx';

/*
  The DC Motors course as one video-first journey through the six micro-topics
  of IOE Electrical Machines Unit 4 (topics.jsx), in syllabus order, about
  5 minutes each. Every topic is Intuitive Learning → Academic Learning →
  Memorization with its own IOE past questions; questions pause the video.
  The journey ends with a recap video. Surplus videos and numericals are the
  optional Extra practice set after the course.

  src/content/video/chN.jsx and testing.jsx are the bank of videos and model
  answers the topics are built from.
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
        <li>Direction ulto garna armature WA field, euta matra ulto gara.</li>
        <li>Variable loss = constant loss huda η maximum. Swinburne’s test le constant loss nikalcha; retardation test le rotational loss.</li>
      </ol>
    </>
  ),
};

export const journey = {
  id: 'dc-motors-journey',
  title: 'DC Motors',
  doneTitle: 'Course sakiyo! 🎉',
  chapters: topics.map((t) => t.title),
  nums: topics.map((t) => t.num),
  steps: [
    ...topics.flatMap((t) => [
      { interstitial: { title: t.title, badge: 'chapter', icon: t.num, kicker: `Unit 4 · ${t.num} · ~5 min` } },
      ...t.steps.map((s) => (s.interstitial ? s : { ...s, chapter: `${t.num} · ${t.title}` })),
    ]),
    { ...recap, chapter: 'Dohoryau' },
    summary,
  ],
};
