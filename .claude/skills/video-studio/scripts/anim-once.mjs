// Animation-once test (motion rule M16): plays a main-path screen in a real
// browser and lists every element whose entrance/draw/write animation started
// more than once, or was cancelled and restarted (the old double write).
// Loops (pulse, flow, spin) are ignored. Needs `vite preview` on :4182.
//
//   node .claude/skills/video-studio/scripts/anim-once.mjs <screen n> [--pov tutor] [--secs 40] [--url http://localhost:4182/]
//
// Exit code 1 when anything animates twice.

import { readdir } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(`--${k}`) ? args[args.indexOf(`--${k}`) + 1] : d);
const n = args.find((a) => /^\d+$/.test(a));
if (!n) {
  console.error('usage: anim-once.mjs <screen n> [--pov role] [--secs 40]');
  process.exit(2);
}
const pov = opt('pov', 'auto');
const secs = +opt('secs', 40);
const base = opt('url', 'http://localhost:4182/').replace(/\/?$/, '/');
const cache = path.join(os.homedir(), '.cache/ms-playwright');
let chrome;
for (const d of (await readdir(cache).catch(() => [])).filter((d) => d.startsWith('chromium-')).sort().reverse()) {
  chrome = path.join(cache, d, 'chrome-linux64', 'chrome');
  break;
}
const { chromium } = await import('playwright-core');
const browser = await chromium.launch({ executablePath: chrome, args: ['--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 760 } });
await page.addInitScript((role) => {
  for (const n of [1, 2, 3]) localStorage.setItem(`dcm-pov-${n}`, JSON.stringify(role));
  window.__anims = [];
  const ids = new WeakMap();
  let id = 0;
  for (const ev of ['animationstart', 'animationcancel'])
    document.addEventListener(ev, (e) => {
      if (!ids.has(e.target)) ids.set(e.target, ++id);
      window.__anims.push({ ev: e.type, el: ids.get(e.target), name: e.animationName, cls: String(e.target.getAttribute?.('class') ?? e.target.tagName).slice(0, 60), beat: document.querySelector('.scene')?.className.match(/beat-(\d+)/)?.[1] });
    }, true);
}, pov);
await page.goto(`${base}electrical-machines/dc-motor/lesson/${n}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(secs * 1000);
const all = await page.evaluate(() => window.__anims);
await browser.close();

// Loops, and the hand (hidden on screen, rule 39), are not entrances.
const LOOP = /pulse|flow|spin|tipbob|wave|blink|dash|handin|handtap|bob/;
const starts = all.filter((a) => a.ev === 'animationstart' && !LOOP.test(a.name));
const cancels = all.filter((a) => a.ev === 'animationcancel' && !LOOP.test(a.name));
const by = {};
for (const s of starts) (by[`${s.el}|${s.name}`] ??= []).push(s);
const twice = Object.values(by).filter((l) => l.length > 1);
console.log(`screen ${n} [${pov}], ${secs}s: ${starts.length} animations, ${twice.length} started twice, ${cancels.length} cancelled`);
for (const l of twice.slice(0, 15)) console.log(`  ✗ ${l[0].name} on .${l[0].cls} (beats ${l.map((s) => s.beat).join(',')})`);
for (const c of cancels.slice(0, 15)) console.log(`  ✗ cancelled ${c.name} on .${c.cls} (beat ${c.beat})`);
process.exit(twice.length || cancels.length ? 1 : 0);
