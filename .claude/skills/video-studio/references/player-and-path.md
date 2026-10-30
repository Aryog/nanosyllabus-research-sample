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

37. **Video page like a video site.** On a topic's video, the player sits left and an *Up next* list sits right (stacked under it below 1100 px): the topic's videos grouped by segment, each with a 16:9 thumbnail (blue for segments 1–2, white for 3), its number, its running time (from its lines) and its state (Ahile herdai · ✓ Herisakyau · Click garera hera · locked). Open ones are clickable, like the progress-bar ticks.

Extra practice (`extras`) is offered after the course, grouped by topic.

- **POV is kept per segment** (`dcm-pov-1`, `dcm-pov-2`, `dcm-pov-3`): Terms opens on the Engineer, Derivation on the **Tutor**, Big picture on the Lecturer (locked), until the viewer changes that segment. The Lecturer's theme defaults to **Blue** (`dcm-lecturer-theme`, White on request).

