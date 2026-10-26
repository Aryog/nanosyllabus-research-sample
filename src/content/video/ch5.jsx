import { Armature, Arrow, C, Coil, Source, hook, video } from './kit.jsx';

/* Chapter 5 · Types of DC motor (Syllabus Unit 4: Method of excitation, Types of DC motor). */

const W = ({ d, color = C.chalk }) => <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />;
const Lbl = ({ x, y, children, color = C.orange, anchor = 'start' }) => (
  <text x={x} y={y} fontSize={12.5} fontWeight={700} fill={color} textAnchor={anchor}>{children}</text>
);
const Title = ({ children }) => <text x={180} y={22} textAnchor="middle" fontSize={15} fontWeight={800} fill={C.yellow}>{children}</text>;

// Supply on the left between rails y = 50 (+) and y = 190 (−), rails run to x = xEnd.
function Rails({ xEnd = 320, gapFrom, gapTo }) {
  return (
    <g>
      <W d="M40 50 V113 M40 127 V190" />
      <Source x={40} y={120} label="V" />
      {gapFrom ? <W d={`M40 50 H${gapFrom} M${gapTo} 50 H${xEnd}`} /> : <W d={`M40 50 H${xEnd}`} />}
      <W d={`M40 190 H${xEnd}`} />
    </g>
  );
}

const connections = video('How the field gets its current', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'DC motors are named by how the field winding gets its current. First, separately excited: the field has its own supply, independent of the armature.' },
    { say: 'Shunt motor: the field is connected in parallel with the armature, straight across the supply. The line current splits into Ia and Ish.' },
    {
      say: 'The shunt field sits across the full supply voltage.',
      ask: {
        tag: 'Pause and think',
        q: 'To keep the shunt field current small, the shunt field is wound with…',
        options: ['many turns of thin wire (high resistance)', 'a few turns of thick wire (low resistance)', 'a single copper bar'],
        answer: 0,
        why: 'Across full V, it needs a high resistance so Ish is only a few percent of the line current. Many turns still give plenty of ampere-turns.',
      },
    },
    { say: 'Series motor: the field is in series with the armature, so one current flows through both. It is a few turns of thick wire, with very low resistance.' },
    {
      say: 'Follow the current.',
      ask: {
        tag: 'Quick check',
        q: 'In a series motor, the load current doubles. The field current…',
        options: ['doubles too', 'halves', 'stays the same'],
        answer: 0,
        why: 'It is the same current. That is why series-motor flux, below saturation, is proportional to Ia.',
      },
    },
    { say: 'Compound motors have both fields. Long shunt: the shunt field is across both the series field and the armature.' },
    {
      say: 'Look where the series field is.',
      ask: {
        tag: 'Quick check',
        q: 'In a long-shunt compound motor, the series field carries…',
        options: ['the armature current Ia', 'the line current IL', 'the shunt field current Ish'],
        answer: 0,
        why: 'The series field is in series with the armature only, so Ise = Ia. The shunt branch takes off before it.',
      },
    },
    { say: 'Short shunt: the shunt field is across the armature only, so the series field carries the full line current.' },
  ],
  draw: (s) => (
    <>
      <g className={s.on(0, 0)}>
        <Title>Separately excited</Title>
        <Rails xEnd={130} />
        <W d="M130 50 V96 M130 144 V190" />
        <Armature x={130} y={120} r={22} />
        <Lbl x={140} y={76}>Ia</Lbl>
        <W d="M230 70 H300 V113 M300 127 V170 H230 V145 M230 70 V85" color={C.dim} />
        <Source x={300} y={120} label="" />
        <Coil x={230} y={85} len={60} turns={5} vertical />
        <Lbl x={250} y={64} color={C.orange}>If (own supply)</Lbl>
      </g>

      <g className={s.on(1, 2)}>
        <Title>Shunt</Title>
        <Rails xEnd={250} />
        <W d="M140 50 V96 M140 144 V190" />
        <Armature x={140} y={120} r={22} />
        <W d="M250 50 V90 M250 150 V190" color={C.orange} />
        <Coil x={250} y={90} len={60} turns={7} vertical label="Rsh (thin)" />
        <Arrow x1={52} y1={42} x2={100} y2={42} color={C.yellow} w={2} />
        <Lbl x={60} y={36} color={C.yellow}>IL</Lbl>
        <Lbl x={150} y={78}>Ia</Lbl>
        <Lbl x={258} y={78}>Ish</Lbl>
      </g>

      <g className={s.on(3, 4)}>
        <Title>Series</Title>
        <Rails xEnd={240} gapFrom={90} gapTo={170} />
        <Coil x={90} y={50} len={80} turns={3} label="Rse (thick)" />
        <W d="M240 50 V96 M240 144 V190" />
        <Armature x={240} y={120} r={22} />
        <Arrow x1={180} y1={42} x2={226} y2={42} color={C.yellow} w={2} />
        <Lbl x={250} y={78} color={C.yellow}>I = Ia = Ise</Lbl>
      </g>

      <g className={s.on(5, 6)}>
        <Title>Long-shunt compound</Title>
        <Rails xEnd={290} gapFrom={150} gapTo={220} />
        <W d="M95 50 V92 M95 148 V190" color={C.orange} />
        <Coil x={95} y={92} len={56} turns={6} vertical />
        <Lbl x={104} y={80}>Ish</Lbl>
        <Coil x={150} y={50} len={70} turns={3} />
        <Lbl x={185} y={26 + 46} anchor="middle">Ise = Ia</Lbl>
        <W d="M290 50 V96 M290 144 V190" />
        <Armature x={290} y={120} r={22} />
        <Lbl x={54} y={36} color={C.yellow}>IL</Lbl>
      </g>

      <g className={s.on(7)}>
        <Title>Short-shunt compound</Title>
        <Rails xEnd={290} gapFrom={70} gapTo={140} />
        <Coil x={70} y={50} len={70} turns={3} />
        <Lbl x={105} y={72} anchor="middle">Ise = IL</Lbl>
        <W d="M195 50 V92 M195 148 V190" color={C.orange} />
        <Coil x={195} y={92} len={56} turns={6} vertical />
        <Lbl x={204} y={80}>Ish</Lbl>
        <W d="M290 50 V96 M290 144 V190" />
        <Armature x={290} y={120} r={22} />
        <Lbl x={298} y={78}>Ia</Lbl>
      </g>
    </>
  ),
});

const equations = video('One connection, one set of equations', {
  beats: [
    { say: 'Every IOE numerical starts by writing the right current and voltage equations for the connection. Here they are, one type at a time.' },
    { say: 'Shunt: the field current is V over Rsh. The line current is Ia plus Ish. And V equals Eb plus Ia Ra.' },
    { say: 'Series: one current flows everywhere, so V equals Eb plus Ia times Ra plus Rse.' },
    { say: 'Long shunt: the series field carries Ia. So V equals Eb plus Ia times Ra plus Rse, and IL equals Ia plus Ish.' },
    { say: 'Short shunt: the series field carries the line current. So V equals Eb plus Ia Ra plus IL Rse.' },
    {
      say: 'Now a real exam trap.',
      ask: {
        tag: 'IOE 2071 Magh Q4(b)',
        q: 'A DC shunt motor takes 60 A from a 230 V supply. Rsh = 115 Ω. What is the armature current?',
        options: ['58 A', '60 A', '62 A', '2 A'],
        answer: 0,
        why: 'Ish = 230/115 = 2 A, and the 60 A “taken from the supply” is the line current, so Ia = 60 − 2 = 58 A.',
      },
    },
    { say: 'With Ra equal to 0.2 ohm, the back EMF is 230 minus 58 times 0.2, which is 218.4 volts. We finish this question in the next chapter.' },
    { say: 'The trap: the current taken from the supply is the line current. Always subtract Ish before you use V equals Eb plus Ia Ra.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Current & voltage equations</> },
    { at: 1, kind: 'step', node: <><b>Shunt</b>: Ish = V/Rsh · IL = Ia + Ish · V = Eb + IaRa</> },
    { at: 2, kind: 'step', node: <><b>Series</b>: I = Ia = Ise · V = Eb + Ia(Ra + Rse)</> },
    { at: 3, kind: 'step', node: <><b>Long shunt</b>: Ise = Ia · IL = Ia + Ish · V = Eb + Ia(Ra + Rse)</> },
    { at: 4, kind: 'step', node: <><b>Short shunt</b>: Ise = IL · Ish = (V − IL·Rse)/Rsh · V = Eb + IaRa + IL·Rse</> },
    { at: 6, kind: 'eq', node: <>Ish = 2 A → Ia = 58 A → Eb = 230 − 58 × 0.2 = 218.4 V</> },
    { at: 7, kind: 'note', node: <>Trap: “current taken from the supply” = IL. Subtract Ish first.</> },
  ],
});

export const ch5 = {
  title: 'Types of DC motor',
  syllabus: 'Unit 4 · Method of excitation, types of DC motor',
  steps: [
    connections,
    equations,
    hook('Shunt = Side by side · Series = Single file', [
      'Shunt field: parallel with the armature, many turns of thin wire, Ish = V/Rsh.',
      'Series field: in line with the armature, few turns of thick wire, carries Ia.',
      'Long shunt: Ise = Ia. Short shunt: Ise = IL.',
    ]),
  ],
};
