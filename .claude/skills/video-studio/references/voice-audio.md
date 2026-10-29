# Voice and audio

## How a line becomes sound

```
beat ──beatText()──▶ "voice + ask.voice" ──spoken()──▶ speakable text ──voiceKey()──▶ 8-hex FNV-1a key
                                                                                  └─▶ public/audio/scene/<key>.mp3
video beats ──videoKey()──▶ key of everything the video says ──▶ public/videos/<key>.mp4
```

- The player plays `<key>.mp3` per beat and waits on a question between clips. If a clip is missing, the dev server returns 404 (unless `TTS_LIVE=1`) and the player falls back to the caption alone.
- `public/audio/scene/manifest.json` maps key → version tag. A tag that ends in `e` means evened; one that ends in `we` means cut from a whole take (also evened). `r` marks Robust delivery. Browsers drop older takes by tag.

## Recording a whole take (the only way to record)

`npm run audio:scenes -- <topic> --whole` makes one ElevenLabs request per video (`/with-timestamps`, eleven_v3, `language_code: ne`, mp3 128k). Then `scripts/whole-take.mjs`:
1. Normalises loudness once for the take (`loudnorm I=-16 TP=-1.5 LRA=11`).
2. Cuts each line at the midpoint of the pause between lines, using the per-character timings. It fails loudly if the timings don't cover the text.
3. Trims silence at both ends of each clip, then adds the same 120 ms lead and 250 ms tail.
4. Tags the clips `…we`.

A video is skipped when all of its lines are already whole-take clips on disk. `--redo` forces a new take. `--main` leaves out practice videos (but a topic counts as voiced only with its practice videos too).

## Flags of `npm run audio:scenes`

| Flag | Does | Credits |
|---|---|---|
| `<topic …>` | limits to topics (4.1 …) | — |
| `--dry` | prints the count (combine with `--whole` for the whole-take count) | 0 |
| `--whole` | one take per video, cut into clips | yes |
| `--even` | evens old line-by-line clips in place | 0 |
| `--redo` | re-records clips that exist | yes |
| `--main` | main path only | — |
| *(none)* | line by line. **Don't use it** (rule 27) | yes |

Running it without `--dry` and without topics records the **whole course**. Never do that.

## House rules: voice, credits and video files

25. ElevenLabs costs 1 credit per character, and the key's balance can't be queried. **Before recording, estimate the characters (`npm run audio:scenes -- <topic> --whole --dry`) and ask the user.** Record only the modules the user approved (so far 4.1 and 4.2). A topic counts as fully voiced only when its practice videos are voiced too: a topic covers main path and practice alike (`--main` for the main path only).
26. The dev server never spends credits by itself: its recorder is off unless `TTS_LIVE=1` is in `.env`. Record on purpose, one approved topic at a time: `npm run audio:scenes -- <topic> --whole` (estimate with `--dry`). Preview unrecorded content with `vite preview`.
27. **Every video is recorded as one whole take** (`npm run audio:scenes -- <topic> --whole`): one ElevenLabs request per video, so the voice keeps a single flow and tone. `scripts/whole-take.mjs` then cuts it into line clips in the middle of the pause between lines, so questions still wait between clips. Never record a video line by line again; the user found chunked takes uneven. Loudness is set to −16 LUFS once per take, the pace is left as read, and every clip gets the same short pause at each end; manifest tags end in `we`. The voice is Jessica on eleven_v3 Nepali with **Robust** delivery (stability 1.0, the `VOICE` setting); keep it identical in `generate-scene-audio.mjs` and the dev plugin `tts-plugin.mjs`. Older line-by-line clips can only be evened (`--even`); re-record them as whole takes.
28. Editing a line's `say`/`voice` changes its clip key, so the line must be recorded again; keep unchanged lines byte-identical so their clips are reused. (Because recording is per video, one edited line means a new take for the whole video.)
28b. Resting points: in the Devanagari `voice` (never the roman caption), split long sentences in two, put a comma after openers ("अब,", "सो,", "अनि"), put a short dash pause "—" before a formula, definition or key term, and read formulas in chunks ("टी ए इक्वल्स — पी फाइ जेड आई ए, ओभर टु पाइ ए"). No "…" (it sounds hesitant).

## Account facts

- The key is in `.env` as `ELEVENLABS_API_KEY` (gitignored). It started with about 10k credits and has no voice-list permission, so the balance can't be checked by the API.
- Voice `cgSgspJ2msm6clMCkdW9` (Jessica, female); override with `ELEVENLABS_SCENE_VOICE_ID`.
- Plan concurrency is 2 requests. A 429 is retried; a 401 or quota error stops the run.

## Cost estimate, then ask

1. `node .claude/skills/video-studio/scripts/status.mjs <topic>` shows the lines missing, the line-by-line clips and the credits needed for whole takes.
2. `npm run audio:scenes -- <topic> --whole --dry` gives the exact number.
3. Tell the user: "<topic>: N videos, C characters ≈ C credits. Record?" Wait for a yes.

## After recording

- Re-run `status.mjs <topic>`: every line should show as whole, and none missing.
- Spot-check pace: speech near 14 characters/s is normal. Below 8 or above 19 means a bad cut (`ffprobe` the clip, or listen).
- Loudness check: `ffmpeg -i clip.mp3 -af ebur128 -f null - 2>&1 | grep " I:"` should read about −16 LUFS.
- Then render (render-and-qa.md).

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `timings cover X of Y chars` | ElevenLabs normalised the text. Re-run that video; if it keeps failing, simplify symbols in `voice`. |
| A clip clipped mid-word | the pause between lines is too short: end the previous line with "।" or split it. |
| The voice reads a symbol oddly | add it to `SPOKEN` in `voice.js` (this re-keys every line using it). |
| Old clips not used after an edit | expected: the key changed. Record the video again. |
| Clips sound uneven across videos | line-by-line clips are mixed in: `status.mjs` shows them; re-take as whole videos. |
