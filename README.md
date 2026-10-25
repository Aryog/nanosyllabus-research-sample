# nanosyllabus-research-sample

A Brilliant-style interactive course on **DC Motors**, aligned to the IOE (Tribhuvan University) Electrical Machines syllabus, Unit 4. Built with React + Vite.

- 10 lessons, each in the order explore → explain → worked example → Skill check, using IOE past-paper questions
- Sparky, the mascot, speaks each line using ElevenLabs audio generated ahead of time, with captions
- Retry queue for questions you missed, mid-lesson quick checks, flashbacks to earlier lessons, and an optional extra-practice set

## Run

```bash
npm install
npm run dev
```

## Voice lines

Put `ELEVENLABS_API_KEY=...` in `.env` (gitignored). After you edit `src/content/narration.js`, run:

```bash
npm run audio   # only regenerates lines that changed → public/audio/
```

## Content agents

`.claude/agents/` defines three Claude Code agents: `content-quality`, `presentation-quality` and `question-pacing`. The `/lesson-studio` skill runs all three in parallel. `scripts/vault-sync.sh` pulls the cleaned IOE source material into `vault/` (gitignored).
