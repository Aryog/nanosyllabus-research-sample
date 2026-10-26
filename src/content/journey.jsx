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
import { losses } from './lessons/control.jsx';

/*
  The DC Motors course as one video-first journey, in IOE syllabus order:
  Unit 1 (force on a conductor) and Unit 3 (construction, commutator, EMF
  equation) as groundwork, then every bullet of Unit 4 (DC Motor).

  Each chapter (src/content/video/chN.jsx) is mostly self-playing videos with
  questions that pause the video, one IOE model answer and one memory hook.
  The journey ends with interleaved IOE past numericals and a recap video.
*/

const summary = losses.steps.find((s) => s.narration === 'l4-done');

const chapters = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9];

export const journey = {
  id: 'dc-motors-journey',
  title: 'DC Motors',
  doneTitle: 'Course complete!',
  chapters: chapters.map((c) => c.title),
  steps: [
    ...chapters.flatMap((c, i) => [
      { interstitial: { title: c.title, badge: 'chapter', icon: i + 1, kicker: c.syllabus } },
      ...c.steps.map((s) => ({ ...s, chapter: `Chapter ${i + 1} · ${c.title}` })),
    ]),
    { interstitial: { title: 'Past Questions', badge: 'check', kicker: 'Real IOE numericals, 2065–2083' }, narration: 'past-questions' },
    ...pastQuestions,
    { ...recap, chapter: 'Recap' },
    summary,
  ],
};
