import { topics as unit4 } from '../topics.jsx';
import { journey as dcMotor } from '../journey.jsx';
import { unit1 } from './u1.jsx';
import { unit2 } from './u2.jsx';
import { unit3 } from './u3.jsx';
import { unit5 } from './u5.jsx';
import { unit6 } from './u6.jsx';
import { unit7 } from './u7.jsx';

/*
  The whole IOE Electrical Machines subject (vault/…/Electrical Machines/
  Syllabus), seven units, each a journey of micro-topics in the same three
  segments as Unit 4: Basic Understanding (one 3D minute, no maths) →
  Syllabus Content (Tutor + Lecturer, the maths) → Model Answer (the real
  past IOE questions, Lecturer). Only Unit 4.1 is voiced; every other topic
  is caption-only (skill rule 38).

  A unit file exports { topics, summary } where topics come from kit.jsx
  `topic()`. Routes: /electrical-machines/<slug>[/lesson/<n>].
*/

const M = ({ children }) => <span className="math">{children}</span>;

const journeyOf = (u) => ({
  id: `em-${u.slug}`,
  title: u.title,
  doneTitle: `Unit ${u.num} sakiyo!`,
  chapters: u.topics.map((t) => t.title),
  nums: u.topics.map((t) => t.num),
  steps: [
    ...u.topics.flatMap((t) => [
      { interstitial: { title: t.title, badge: 'chapter', icon: t.num, kicker: `Unit ${u.num} · ${t.num} · ~5 min` } },
      ...t.steps.map((s) => (s.interstitial ? s : { ...s, chapter: `${t.num} · ${t.title}` })),
    ]),
    {
      pose: 'dab',
      body: (
        <>
          <h2>{u.title}: dohoryau</h2>
          <ol className="summary">
            {u.summary.map((line, i) => (
              <li key={i}>{typeof line === 'string' ? <>{line}</> : line}</li>
            ))}
          </ol>
        </>
      ),
    },
  ],
});

const UNITS = [
  { num: 1, slug: 'magnetic-circuits', title: 'Magnetic Circuits and Induction', icon: '🧲', ...unit1 },
  { num: 2, slug: 'transformer', title: 'Transformer', icon: '🔌', ...unit2 },
  { num: 3, slug: 'dc-generator', title: 'DC Generator', icon: '⚙️', ...unit3 },
  { num: 4, slug: 'dc-motor', title: 'DC Motor', icon: '⚡', topics: unit4, journey: dcMotor },
  { num: 5, slug: 'induction-machines', title: 'Three Phase Induction Machines', icon: '🌀', ...unit5 },
  { num: 6, slug: 'synchronous-machines', title: 'Three Phase Synchronous Machines', icon: '🔄', ...unit6 },
  { num: 7, slug: 'fractional-kw-motors', title: 'Fractional Kilowatt Motors', icon: '🔧', ...unit7 },
];

export const units = UNITS.map((u) => ({ ...u, journey: u.journey ?? journeyOf(u) }));
export { M };
