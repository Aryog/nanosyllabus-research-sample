# Player and unit path

The player (`src/video/Scene.jsx`) runs a video; the lesson player
(`src/components/LessonPlayer.jsx`) strings the steps of a topic together; the
unit path (`src/App.jsx`) shows the topics.

Routes: `/` syllabus · `/electrical-machines/dc-motor` unit path · `/electrical-machines/dc-motor/lesson/:n` main-path screen n (`?render` = offline render mode: questions answer themselves, voice is logged to `window.__render`).

Local preferences: `dcm-rate` speed, `dcm-cc` captions, `dcm-muted`, `dcm-look` picture look (rule 30).

## House rules: player

14. Default speed is 1× (pref key `dcm-rate`). Space, or a click on the picture, plays and pauses (a drag, like turning a 3D picture, is not a click).
13. (scripting.md) Rewatch before answering, auto-continue after 2 s (`AUTO_GO`), re-ask on rewind, XP only on the first try.
15, 17, 18. Camera, pause and focus: animation.md.
29. The download button saves the offline-rendered MP4 (render-and-qa.md); it only shows when the manifest has the video.

## House rules: unit path and flow

22. One bubble per micro-topic, with a three-part bar for its segments.
23. Every tick in the lesson's top progress bar has a hover card (no browser `title`): topic · segment · Video n/m, the screen's real title, and its state (▶ Ahile yaha cha · ✓ Herisakyau · Click garera jau · 🔒 Aghi badhepachi khulcha).
24. Segments run straight into each other inside the player, with no trip back to the path. Only after all three segments does the last screen say **Finish ✓**; then Sparky hops on the path to the next topic's bubble and waits there (no auto-enter).

37. **One video per segment, chapters inside (YouTube-style).** Each segment (Terms, Derivation, Big picture) plays as one video: its videos are chapters that run straight on into each other (no end screen, no countdown, XP toast only at the segment's end). The seek bar, the time (`0:39 / 3:37`) and the question dots span the whole segment, with a break between chapters, a hover tip (time + chapter title) and a chapter button after the time (`2/4 · title ›`, just `2/4 ›` below 900 px). That button opens the chapter list as a small panel **inside the video, at its left above the bar** (still, title, start time; any chapter opens); the chapters are never listed in the sidebar. A seek into another chapter opens it at that moment (`onChapter(j, ms)` → `startAt`). On phones the bar takes its own full row. The *Up next* list beside the player (stacked below 1100 px) has one card per segment with a still, its total length, its chapter count and its state (no chapter rows there). Stills are real frames (`Thumb` in Scene.jsx: the figure at its last beat, or the heading when there is none) in the viewer's theme, so Big picture is blue like its video, never a numbered placeholder. Lengths come from `videoMs` (real clip lengths once known), the same as the bar.

Extra practice (`extras`) is offered after the course, grouped by topic.

- **POV is kept per segment** (`dcm-pov-1`, `dcm-pov-2`, `dcm-pov-3`): Terms and Derivation open on the **Tutor**, Big picture on the Lecturer (locked), until the viewer changes that segment. The Lecturer's theme defaults to **Blue** (`dcm-lecturer-theme`, White on request).

