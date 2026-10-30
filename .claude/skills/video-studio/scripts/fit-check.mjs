// Layout check (rules 15, 16, 39): visits every beat of every main-path video
// of a topic, in every role, at several screen sizes, and reports text that is
// cut off, hidden under the caption or the POV chip, overlapping other text,
// or spilling out of its board column. Needs `vite preview` on :4182.
//
//   node .claude/skills/video-studio/scripts/fit-check.mjs 4.1 [--roles tutor,senior] [--sizes 1280x760,390x844] [--screens 6,7]
//
// Exit code 1 when anything is found. Never spends credits.

import { readdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadCourse, root } from './journey.mjs';

const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(`--${k}`) ? args[args.indexOf(`--${k}`) + 1] : d);
const topic = args.find((a) => /^\d+\.\d+$/.test(a));
if (!topic) {
  console.error('usage: fit-check.mjs <topic> [--roles a,b] [--sizes WxH,…] [--screens n,…]');
  process.exit(2);
}
const base = opt('url', 'http://localhost:4182/').replace(/\/?$/, '/');
const { POVS } = await import(pathToFileURL(path.join(root, 'src/content/pov.js')).href);
const roles = opt('roles', POVS.map((p) => p.id).join(',')).split(',');
const sizes = opt('sizes', '1280x760,1440x860,1024x700,390x844').split(',').map((s) => s.split('x').map(Number));
const only = opt('screens', '') ? opt('screens', '').split(',').map(Number) : null;

const { videos } = await loadCourse();
const screens = [...new Set(videos.filter((v) => v.topic === topic && v.n != null && !v.pov).map((v) => v.n))].filter((n) => !only || only.includes(n));
const titleOf = Object.fromEntries(videos.filter((v) => v.n != null && !v.pov).map((v) => [v.n, v.title]));

const cache = path.join(os.homedir(), '.cache/ms-playwright');
let chrome;
for (const d of (await readdir(cache).catch(() => [])).filter((d) => d.startsWith('chromium-')).sort().reverse()) {
  chrome = path.join(cache, d, 'chrome-linux64', 'chrome');
  break;
}
const { chromium } = await import('playwright-core');

// Runs in the page: what is wrong with the frame right now.
const inspect = () => {
  const R = (el) => el.getBoundingClientRect();
  const area = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  const short = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50);
  const stage = R(document.querySelector('.scene-stage'));
  if (document.querySelector('.scene-screen.asking')) return ['question card open (beat not checked)'];
  const capEl = document.querySelector('.scene-caption');
  const cap = capEl && R(capEl).width > 0 ? R(capEl) : null;
  const chipEl = document.querySelector('.scene-look');
  const chip = chipEl ? R(chipEl) : null;
  const issues = [];
  // On phones the drawing and the board are stacked and the camera follows the
  // beat: only what is in focus (the new line, the parts brought in or
  // highlighted) must be fully in frame; the rest may slide off like a scroll.
  const narrow = innerWidth < 901;
  const focused = (el) => !narrow || !!el.closest('.board-line.hl, .hl, .now');
  // Board lines that are on screen.
  const inks = [...document.querySelectorAll('.board-line.on .ink')].filter((el) => getComputedStyle(el.closest('.board-line')).opacity > 0.05);
  const boxes = inks.map((el) => ({ el, r: R(el) })).filter((b) => b.r.width > 2 && b.r.height > 2);
  for (const { el, r } of boxes) {
    if (focused(el) && (r.left < stage.left - 2 || r.right > stage.right + 2 || r.top < stage.top - 2 || r.bottom > stage.bottom + 2)) issues.push(`cut by the frame: "${short(el)}"`);
    if (focused(el) && cap && area(r, cap) > 20) issues.push(`under the caption: "${short(el)}"`);
    if (chip && area(r, chip) > 20) issues.push(`under the POV chip: "${short(el)}"`);
    const col = el.closest('.board-col');
    if (col) {
      const c = R(col);
      if (r.right > c.right + 6 || r.left < c.left - 6) issues.push(`spills out of its column: "${short(el)}"`);
    }
  }
  for (let i = 0; i < boxes.length; i++)
    for (let j = i + 1; j < boxes.length; j++) if (area(boxes[i].r, boxes[j].r) > 30) issues.push(`lines overlap: "${short(boxes[i].el)}" × "${short(boxes[j].el)}"`);
  // Drawing labels that are on screen.
  const shown = (t) => {
    for (let e = t; e && e.tagName !== 'svg'; e = e.parentElement) if (getComputedStyle(e).opacity < 0.05 || getComputedStyle(e).display === 'none') return false;
    return true;
  };
  // Meter numbers cross-fade in place on purpose (.val-in/.val-out).
  const texts = [...document.querySelectorAll('.scene-svg text:not(.val-in):not(.val-out)')].filter(shown).map((el) => ({ el, r: R(el) })).filter((b) => b.r.width > 1);
  for (const { el, r } of texts) {
    if (focused(el) && (r.left < stage.left - 2 || r.right > stage.right + 2 || r.top < stage.top - 2 || r.bottom > stage.bottom + 2)) issues.push(`label cut by the frame: "${short(el)}"`);
    if (cap && area(r, cap) > 20) issues.push(`label under the caption: "${short(el)}"`);
  }
  for (let i = 0; i < texts.length; i++)
    for (let j = i + 1; j < texts.length; j++) {
      const a = area(texts[i].r, texts[j].r);
      if (a > 0.25 * Math.min(texts[i].r.width * texts[i].r.height, texts[j].r.width * texts[j].r.height) && a > 12) issues.push(`labels overlap: "${short(texts[i].el)}" × "${short(texts[j].el)}"`);
    }
  if (cap && (cap.left < R(document.querySelector('.scene-screen')).left - 1 || cap.right > R(document.querySelector('.scene-screen')).right + 1)) issues.push('caption wider than the picture');
  return issues;
};

const browser = await chromium.launch({ executablePath: chrome, args: ['--enable-unsafe-swiftshader'] });
const found = [];
let checked = 0;
await Promise.all(
  sizes.map(async ([w, h]) => {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    // Big picture is always the Lecturer (one pass per theme); elsewhere each
    // role, and the Lecturer in both themes.
    const runs = [];
    for (const n of screens) {
      const bigPicture = videos.find((v) => v.n === n && !v.pov)?.step.segment?.startsWith('3/3');
      for (const role of bigPicture ? ['lecturer'] : roles) for (const theme of role === 'lecturer' ? ['white', 'blue'] : ['white']) runs.push([n, role, theme]);
    }
    for (const [n, role, theme] of runs) {
      {
        const page = await ctx.newPage();
        await page.addInitScript(([r, t]) => {
          for (const n of [1, 2, 3]) localStorage.setItem(`dcm-pov-${n}`, JSON.stringify(r));
          localStorage.setItem('dcm-lecturer-theme', JSON.stringify(t));
        }, [role, theme]);
        await page.goto(`${base}electrical-machines/dc-motor/lesson/${n}`, { waitUntil: 'networkidle' });
        await page.waitForFunction(() => window.__scene, null, { timeout: 15000 }).catch(() => null);
        const beats = await page.evaluate(() => window.__scene?.beats ?? 0);
        for (let k = 0; k < beats; k++) {
          // A beat with a question is checked just before its card opens.
          let msgs = [];
          for (const frac of [0.85, 0.5, 0.2]) {
            await page.evaluate(([kk, f]) => window.__scene.show(kk, f), [k, frac]);
            await page.waitForTimeout(1300); // camera glide and entrances settle
            msgs = await page.evaluate(inspect);
            if (!msgs[0]?.startsWith('question card open')) break;
          }
          for (const msg of msgs) found.push(`${w}x${h} · screen ${n} "${titleOf[n]}" [${role}${role === 'lecturer' ? `, ${theme}` : ''}] beat ${k}: ${msg}`);
          checked++;
        }
        await page.close();
      }
    }
    await ctx.close();
  }),
);
await browser.close();

const uniq = [...new Set(found)];
console.log(uniq.join('\n'));
console.log(`\n${topic}: ${checked} frames checked (${screens.length} screens, roles and Lecturer themes, ${sizes.length} sizes): ${uniq.length} problem(s).`);
process.exit(uniq.length ? 1 : 0);
