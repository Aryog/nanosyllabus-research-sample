import { MotorTypes } from '../../interactives/Types.jsx';
import { ConstructionExplorer, EmfCalculator, LapWave } from '../../interactives/Machine.jsx';
import { MotorLab, StartupGraph } from '../../interactives/Motor.jsx';
import { MarkGraph } from '../../interactives/Control.jsx';
import { AirGap, PowerSplit, RegulationLab, SelfRegulation, SpeedPredict } from '../../interactives/Play.jsx';
import { Callout, FlipCards, WorkedExample } from '../../interactives/Teach.jsx';
import { M, SKILL } from './shared.jsx';

/* ─────────────────────────── Lesson 4 ─────────────────────────── */
export const construction = {
  id: 'construction',
  title: 'Construction of a DC Machine',
  blurb: 'Yoke, poles, armature, commutator and brushes, plus lap and wave windings.',
  steps: [
    {
      narration: 'l4c-intro',
      body: (
        <>
          <p>
            A real DC machine is the coil-and-commutator idea, built to be strong and efficient. The <b>same machine</b> works as a{' '}
            <b>generator</b> (mechanical in → electrical out) or a <b>motor</b> (electrical in → mechanical out). Only the direction of energy flow
            changes.
          </p>
          <p>It has two main parts:</p>
          <ul className="defs">
            <li><b>Stator</b> (stationary): yoke, poles, field winding, brushes. It makes the magnetic field.</li>
            <li><b>Rotor</b> (rotating), called the <b>armature</b>: core, winding, commutator, shaft. It carries the current that makes torque.</li>
          </ul>
        </>
      ),
    },

    {
      narration: 'l4c-explore',
      task: true,
      body: <p>Here’s the cross-section of a 4-pole DC machine. Tap every part to learn what it’s made of and what it does.</p>,
      Figure: ConstructionExplorer,
    },

    {
      narration: 'l4c-sort',
      checkin: true,
      pose: 'think',
      body: <p>Sort the parts: does each one stay still (<b>stator</b>) or spin (<b>rotor</b>)?</p>,
      input: {
        type: 'sort',
        buckets: ['Stator (still)', 'Rotor (spins)'],
        items: [
          { label: 'Yoke', bucket: 0 },
          { label: 'Commutator', bucket: 1 },
          { label: 'Field winding', bucket: 0 },
          { label: 'Armature core', bucket: 1 },
          { label: 'Brushes', bucket: 0 },
          { label: 'Shaft', bucket: 1 },
          { label: 'Pole shoe', bucket: 0 },
          { label: 'Armature winding', bucket: 1 },
        ],
      },
      hint: <p>The stator makes the field. The armature is everything that turns with the shaft.</p>,
      why: <p>Stator: yoke, poles and pole shoes, field winding, brushes (they press on the commutator but don’t turn). Rotor: armature core, armature winding, commutator, shaft.</p>,
    },

    {
      narration: 'l4c-path',
      task: true,
      body: (
        <>
          <p>Follow the <b>magnetic circuit</b>, the path the main flux takes:</p>
          <div className="eq small-eq">N pole → air gap → armature core → air gap → S pole → yoke → back to N pole</div>
          <p>
            Every part of this path except the air gap is iron or steel, which has <b>low reluctance</b> (it carries flux easily). That’s why the
            air gap is kept as small as mechanically possible.
          </p>
          <Callout kind="ioe">The yoke does two jobs: <b>mechanical support</b> for the poles and the <b>return path for the flux</b>.</Callout>
        </>
      ),
      Figure: AirGap,
    },

    {
      narration: 'l4c-lam',
      task: true,
      body: (
        <>
          <p>
            The armature core spins inside the magnetic field, so its iron is magnetised first one way, then the other, many times a second. That
            causes two <b>core (iron) losses</b>. Tap each card.
          </p>
        </>
      ),
      Figure: FlipCards,
      figureProps: {
        cards: [
          { icon: '🌀', front: 'Eddy-current loss', back: 'EMFs induced in the core drive circulating currents that heat it. Cure: build the core from thin (0.35–0.5 mm) insulated laminations. Loss ∝ t².' },
          { icon: '🔁', front: 'Hysteresis loss', back: 'Energy is lost every time the iron is magnetised in reverse. Cure: use silicon steel, which has a narrow hysteresis loop.' },
          { icon: '🧱', front: 'Why not solid iron?', back: 'A solid core is one big path for eddy currents. Laminating breaks it into thin slices with high resistance.' },
          { icon: '🟫', front: 'Why mica in the commutator?', back: 'Mica insulates the copper segments from each other while withstanding heat.' },
        ],
      },
    },

    {
      narration: 'l4c-winding',
      body: (
        <>
          <p>
            The armature conductors are joined in one of two ways. What matters is the number of <b>parallel paths A</b> the current splits into
            between the brushes:
          </p>
          <ul className="defs">
            <li><b>Lap winding</b>: <M>A = P</M> (number of poles). Many paths → large current, lower voltage.</li>
            <li><b>Wave winding</b>: <M>A = 2</M>, always. Few paths, many conductors in series → higher voltage, smaller current.</li>
          </ul>
          <p>Try both windings with different numbers of poles.</p>
        </>
      ),
      Figure: LapWave,
      after: <Callout kind="ioe">Memorise: lap A = P (high current, low voltage); wave A = 2 (high voltage, low current).</Callout>,
    },

    SKILL,

    {
      narration: 'l4c-q-part',
      pose: 'think',
      body: <p>In a DC motor, which part reverses the current in each armature coil as it moves from one pole to the next?</p>,
      input: { type: 'choice', columns: 2, options: ['Commutator', 'Yoke', 'Pole shoe', 'Field winding'], answer: 0 },
      hint: <p>It’s the split copper ring on the shaft.</p>,
      why: <p>The <b>commutator</b> (with the brushes) reverses the coil current every time the coil passes a neutral position, keeping the torque in one direction.</p>,
    },

    {
      narration: 'l4c-q-yoke',
      pose: 'think',
      body: <p>Which part provides the return path for the flux between the poles, as well as mechanical support?</p>,
      input: { type: 'choice', columns: 2, options: ['Yoke', 'Armature winding', 'Brushes', 'Shaft'], answer: 0 },
      hint: <p>It’s the outer frame of the machine.</p>,
      why: <p>The <b>yoke</b> holds the poles and completes the magnetic circuit from one pole to the next.</p>,
    },

    {
      narration: 'l4c-q-lam',
      pose: 'think',
      body: <p>The armature core is made of thin laminations mainly to reduce…</p>,
      input: { type: 'choice', columns: 2, options: ['Eddy-current loss', 'Hysteresis loss', 'Copper loss', 'Friction loss'], answer: 0 },
      hint: <p>Laminations break up the paths of circulating currents.</p>,
      why: <p>Laminations reduce <b>eddy-current loss</b> (∝ thickness²). Silicon steel is what reduces hysteresis loss.</p>,
    },

    {
      narration: 'l4c-q-brush',
      pose: 'think',
      body: <p>Why are brushes usually made of carbon? (The role of the commutator and carbon brushes is asked often: IOE 2071 Chaitra, 2072 Ashwin, 2082 Bhadra.)</p>,
      input: {
        type: 'choice',
        options: ['It is self-lubricating and wears instead of the commutator', 'It is magnetic and strengthens the field', 'It has the lowest resistance of any metal', 'It insulates the segments from each other'],
        answer: 0,
      },
      hint: <p>The brushes rub on the spinning commutator all the time.</p>,
      why: <p>Carbon is soft and <b>self-lubricating</b>, so it wears away (cheap, replaceable) instead of the copper commutator, and its contact resistance helps commutation.</p>,
    },

    {
      narration: 'l4c-q-paths',
      variant: {
        body: <p>Fill in the number of parallel paths for an 8-pole machine.</p>,
        input: {
          type: 'tiles',
          inline: true,
          template: [['Lap wound: A = ', '_', '      Wave wound: A = ', '_']],
          tiles: ['1', '2', '4', '8', '16'],
          answer: ['8', '2'],
        },
        why: <p>Lap: <M>A = P = 8</M>. Wave: <M>A = 2</M> regardless of the number of poles.</p>,
      },
      pose: 'think',
      body: <p>Fill in the number of parallel paths for a 6-pole machine.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['Lap wound: A = ', '_', '      Wave wound: A = ', '_']],
        tiles: ['1', '2', '3', '6', '12'],
        answer: ['6', '2'],
      },
      hint: <p>Lap: A equals the number of poles. Wave: always the same number.</p>,
      why: <p>Lap: <M>A = P = 6</M>. Wave: <M>A = 2</M> regardless of the number of poles.</p>,
    },

    {
      narration: 'l4c-q-flash',
      flashback: true,
      pose: 'think',
      body: <p>Flashback to lesson 1: a pole shoe face of 0.05 m² carries a flux of 25 mWb. What is the flux density in the air gap?</p>,
      input: { type: 'choice', columns: 2, options: ['0.5 T', '500 T', '2 T', '1.25 T'], answer: 0 },
      hint: <p><M>B = φ / A</M>, with φ in webers.</p>,
      why: <p><M>B = 0.025 / 0.05 = 0.5 T</M>. Forgetting to convert mWb gives the impossible 500 T.</p>,
    },
  ],
};

/* ─────────────────────────── Lesson 5 ─────────────────────────── */
export const backemf = {
  id: 'backemf',
  title: 'Back EMF & Voltage Equation',
  blurb: 'Eb = PφZN/60A, V = Eb + IaRa, the power equation and the maximum-power condition.',
  steps: [
    {
      narration: 'l4-lab',
      task: true,
      body: (
        <>
          <p>Welcome to the motor lab, a real-unit model of a small DC motor.</p>
          <p>Challenge: get it spinning faster than <b>1500 rpm</b>. Try everything, even settings that seem like they’d make it weaker.</p>
        </>
      ),
      Figure: MotorLab,
      figureProps: { goalRpm: 1500 },
    },

    {
      narration: 'l4-backemf',
      task: true,
      body: (
        <>
          <p>
            Did a <b>weaker</b> magnet or <b>fewer</b> turns make it faster? That’s because the spinning armature conductors are cutting flux, so
            an EMF is induced in them, just like in a generator.
          </p>
          <p>
            By Lenz’s law this EMF <b>opposes</b> the supply voltage, so it’s called the <b>back EMF</b> or counter EMF, <M>Eb</M>. Flip the switch and
            watch the current.
          </p>
        </>
      ),
      Figure: StartupGraph,
      after: (
        <p className="muted">
          At the start, N = 0 so Eb = 0 and a big current rushes in. As the motor speeds up, Eb grows and the current falls.
        </p>
      ),
    },

    {
      narration: 'l5-derive',
      task: true,
      body: <p>How big is the back EMF? Let’s derive the <b>EMF equation</b> step by step.</p>,
      Figure: WorkedExample,
      figureProps: {
        title: 'Derivation',
        given: <>P poles, φ Wb per pole, Z armature conductors, A parallel paths, speed N rpm.</>,
        steps: [
          <>In one revolution, a conductor passes all P poles, so it cuts a flux of <M>P·φ</M> webers.</>,
          <>One revolution takes <M>60/N</M> seconds.</>,
          <>EMF per conductor = flux cut ÷ time = <M>Pφ ÷ (60/N) = PφN/60</M> volts (Faraday’s law).</>,
          <>Each parallel path has <M>Z/A</M> conductors in series, and the EMF of the machine is the EMF of one path.</>,
          <><M>Eb = (PφN/60) × (Z/A) = PφZN / 60A</M>. For a given machine, P, Z and A are fixed, so <M>Eb = kφN</M>, i.e. <M>Eb ∝ φN</M>.</>,
        ],
      },
    },

    {
      narration: 'l5-calc',
      body: <p>Play with the EMF equation. Notice that switching from wave to lap divides the EMF by P/2, and that Eb is proportional to both φ and N.</p>,
      Figure: EmfCalculator,
      after: <Callout kind="ioe">Always convert φ to webers (mWb ÷ 1000) and use A = P for lap, A = 2 for wave.</Callout>,
    },

    {
      narration: 'l5-voltage',
      task: true,
      body: (
        <>
          <p>The supply V must push current Ia through the armature <b>against</b> Eb and through the armature resistance Ra:</p>
          <div className="eq"><M>V = Eb + Ia·Ra</M>  ⟹  <M>Ia = (V − Eb) / Ra</M></div>
          <p>This makes a DC motor <b>self-regulating</b>. See what happens when the load increases:</p>
        </>
      ),
      Figure: SelfRegulation,
    },

    {
      narration: 'l4-q-calc',
      checkin: true,
      variant: {
        body: <p>A 24 V motor with a 0.5 Ω armature runs with a back EMF of 22 V. Fill in the blanks.</p>,
        input: {
          type: 'tiles',
          inline: true,
          template: [['Ia·Ra = ', '_', ' V,'], ['so Ia = ', '_', ' A.']],
          tiles: ['1', '2', '4', '22', '24', '48'],
          answer: ['2', '4'],
        },
        why: <p><M>24 − 22 = 2 V</M>, so <M>Ia = 2/0.5 = 4 A</M>, compared with 48 A at standstill.</p>,
      },
      pose: 'think',
      body: <p>A 12 V motor with a 2 Ω armature runs with a back EMF of 10 V. Fill in the blanks.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['Ia·Ra = ', '_', ' V,'], ['so Ia = ', '_', ' A.']],
        tiles: ['1', '2', '5', '6', '10', '12'],
        answer: ['2', '1'],
      },
      hint: <p>V = Eb + IaRa. Whatever Eb doesn’t use is left for IaRa.</p>,
      why: <p><M>12 − 10 = 2 V</M>, so <M>Ia = 2/2 = 1 A</M>, compared with 6 A at standstill.</p>,
    },

    {
      narration: 'l5-power',
      body: (
        <>
          <p>Multiply the voltage equation by Ia to get the <b>power equation</b>:</p>
          <div className="eq"><M>V·Ia = Eb·Ia + Ia²·Ra</M></div>
          <ul className="defs">
            <li><M>V·Ia</M>: electrical power supplied to the armature</li>
            <li><M>Ia²·Ra</M>: copper loss in the armature (wasted as heat)</li>
            <li><M>Eb·Ia</M>: power converted to mechanical form, the <b>gross mechanical power developed, Pm</b></li>
          </ul>
          <Callout kind="remember">Eb·Ia is the electrical power that disappears “into” the back EMF. That is exactly the mechanical power the armature develops.</Callout>
        </>
      ),
      Figure: PowerSplit,
    },

    {
      narration: 'l5-maxpower',
      task: true,
      body: <p>When is the mechanical power Pm biggest? Differentiate it.</p>,
      Figure: WorkedExample,
      figureProps: {
        title: 'Condition for maximum power',
        steps: [
          <><M>Pm = V·Ia − Ia²·Ra</M></>,
          <>For a maximum, <M>dPm/dIa = V − 2·Ia·Ra = 0</M></>,
          <>So <M>Ia·Ra = V/2</M>, and therefore <M>Eb = V − IaRa = V/2</M>.</>,
          <>Maximum power is developed when <b>Eb = V/2</b>. But then half the armature input is lost as heat (efficiency 50% at best) and the current is huge, so motors are <b>never run at this condition</b> in practice.</>,
        ],
      },
    },

    SKILL,

    {
      narration: 'l4-q-start',
      pose: 'think',
      body: <p>When does a DC motor draw the most armature current? (“Why does a DC motor draw a high current at starting?” appears in IOE 2079 Jestha, 2068 Magh and 2066 Magh.)</p>,
      input: {
        type: 'choice',
        options: ['The instant it is switched on', 'When it reaches top speed', 'It draws the same current all the time', 'Just after it is switched off'],
        answer: 0,
      },
      hint: <p><M>Ia = (V − Eb)/Ra</M>. When is Eb smallest?</p>,
      why: <p>At standstill Eb = 0, so <M>Ia = V/Ra</M>, its largest possible value.</p>,
    },

    {
      narration: 'l5-q-emf',
      pose: 'think',
      body: <p>A 4-pole, lap-wound DC motor has 720 armature conductors and a flux of 25 mWb per pole. It runs at 1000 rpm. Fill in the blanks.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['A = ', '_', ', so Eb = 4 × 0.025 × 720 × 1000 / (60 × A) = ', '_', ' V']],
        tiles: ['2', '4', '150', '300', '600'],
        answer: ['4', '300'],
      },
      hint: <p>Lap winding: A = P. Then compute PφZN/60A.</p>,
      why: <p><M>Eb = 4 × 0.025 × 720 × 1000 / (60 × 4) = 72000 / 240 = 300 V</M>. If it were wave wound (A = 2) it would be 600 V.</p>,
    },

    {
      narration: 'l5-q-ioe2',
      pose: 'think',
      body: (
        <p>
          <b>IOE 2071 Magh (2 + 4 marks), 2078 Poush:</b> “What is back EMF? How does it play an important role in a DC motor?” Which statement best
          describes its role?
        </p>
      ),
      input: {
        type: 'choice',
        options: [
          'It limits the armature current, so the motor draws just the current its load needs',
          'It adds to the supply voltage so the motor can run faster',
          'It supplies the current that magnetises the field poles',
          'It reverses the coil current every half turn',
        ],
        answer: 0,
      },
      hint: <p>Look at Ia = (V − Eb)/Ra. What happens to Ia as the load changes the speed?</p>,
      why: (
        <p>
          Eb <b>opposes</b> V, so <M>Ia = (V − Eb)/Ra</M> stays small when running. When the load rises, the speed and Eb fall a little and Ia rises
          to match: back EMF makes the motor <b>self-regulating</b> and protects the armature. At start Eb = 0, which is why a starter is needed.
        </p>
      ),
    },

    {
      narration: 'l5-q-pm',
      variant: {
        body: <p>A 230 V DC motor has an armature resistance of 0.25 Ω and takes an armature current of 40 A. Fill in the blanks.</p>,
        input: {
          type: 'tiles',
          inline: true,
          template: [['Eb = 230 − 40 × 0.25 = ', '_', ' V'], ['Mechanical power developed Pm = Eb·Ia = ', '_', ' kW']],
          tiles: ['220', '210', '240', '8.8', '9.2', '0.4'],
          answer: ['220', '8.8'],
        },
        why: <p><M>Eb = 230 − 10 = 220 V</M>, <M>Pm = 220 × 40 = 8800 W = 8.8 kW</M>. The armature copper loss is 40² × 0.25 = 400 W.</p>,
      },
      pose: 'think',
      body: <p>A 220 V DC motor has an armature resistance of 0.5 Ω and takes an armature current of 40 A. Fill in the blanks.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['Eb = 220 − 40 × 0.5 = ', '_', ' V'], ['Mechanical power developed Pm = Eb·Ia = ', '_', ' kW']],
        tiles: ['180', '200', '240', '8', '8.8', '0.8'],
        answer: ['200', '8'],
      },
      hint: <p>Use V = Eb + IaRa, then Pm = Eb × Ia.</p>,
      why: <p><M>Eb = 220 − 20 = 200 V</M>, <M>Pm = 200 × 40 = 8000 W = 8 kW</M>. The armature copper loss is 40² × 0.5 = 800 W.</p>,
    },

    {
      narration: 'l5-q-max',
      variant: {
        body: (
          <p>
            For a motor with V = 240 V and Ra = 0.6 Ω, here is <M>Pm = V·Ia − Ia²Ra</M>. Mark the armature current where the mechanical power is{' '}
            <b>maximum</b>.
          </p>
        ),
        figureProps: {
          fn: (I) => 240 * I - 0.6 * I * I,
          xMax: 400,
          yMax: 26000,
          xTicks: [0, 100, 200, 300, 400],
          yTicks: [0, 10000, 20000],
          snap: 10,
          answer: 200,
          title: 'Mechanical power developed, Pm',
          xLabel: 'Armature current Ia (A)',
          fmtX: (x) => `${x} A`,
          fmtY: (y) => `${(y / 1000).toFixed(1)} kW`,
        },
        input: { type: 'figure', complete: (v) => v != null, correct: (v) => v.x === 200, reveal: () => ({ x: 200 }) },
        hint: <p>Maximum power when Eb = V/2, i.e. IaRa = 120 V.</p>,
        why: <p><M>Ia = V/(2Ra) = 240/1.2 = 200 A</M>, where Eb = 120 V = V/2 and Pm = 24 kW, at 50% armature efficiency.</p>,
      },
      pose: 'think',
      body: (
        <p>
          For a motor with V = 220 V and Ra = 0.5 Ω, here is <M>Pm = V·Ia − Ia²Ra</M>. Mark the armature current where the mechanical power is{' '}
          <b>maximum</b>.
        </p>
      ),
      Figure: MarkGraph,
      figureProps: {
        fn: (I) => 220 * I - 0.5 * I * I,
        xMax: 440,
        yMax: 26000,
        xTicks: [0, 110, 220, 330, 440],
        yTicks: [0, 10000, 20000],
        snap: 10,
        answer: 220,
        title: 'Mechanical power developed, Pm',
        xLabel: 'Armature current Ia (A)',
        fmtX: (x) => `${x} A`,
        fmtY: (y) => `${(y / 1000).toFixed(1)} kW`,
      },
      input: { type: 'figure', complete: (v) => v != null, correct: (v) => v.x === 220, reveal: () => ({ x: 220 }) },
      hint: <p>Maximum power when Eb = V/2, i.e. IaRa = 110 V.</p>,
      why: <p><M>Ia = V/(2Ra) = 220/1 = 220 A</M>, where Eb = 110 V = V/2 and Pm = 24.2 kW, at 50% armature efficiency.</p>,
    },

    {
      narration: 'l5-q-flash',
      flashback: true,
      pose: 'think',
      body: <p>Flashback to construction: the EMF equation needs A. How many parallel paths does a 6-pole <b>wave-wound</b> armature have?</p>,
      input: { type: 'choice', columns: 2, options: ['2', '6', '3', '12'], answer: 0 },
      hint: <p>Lap: A = P. Wave: always the same number.</p>,
      why: <p>Wave winding always has <M>A = 2</M>. Only lap winding has <M>A = P</M>.</p>,
    },

    {
      narration: 'l5-q-ioe',
      retryOf: 'l5-q-emf',
      practice: true,
      pose: 'think',
      body: (
        <p>
          <b>IOE 2078 Poush, Q3(b) (also 2070 Bhadra):</b> the EMF equation works the same for a generator. A 4-pole, <b>lap-wound</b> machine with 300
          conductors and 50 mWb per pole must generate E = 260.25 V. Find its speed, and the speed if it were wave wound.
        </p>
      ),
      input: {
        type: 'tiles',
        inline: true,
        template: [['N = 60·A·E / (PφZ) = 60 × ', '_', ' × 260.25 / (4 × 0.05 × 300) = ', '_', ' rpm'], ['Wave wound: N = ', '_', ' rpm']],
        tiles: ['2', '4', '520.5', '1041', '2082', '260.25'],
        answer: ['4', '1041', '520.5'],
      },
      hint: <p>Rearrange E = PφZN/60A for N. Lap: A = P. Wave: A = 2.</p>,
      why: (
        <p>
          Lap: <M>N = 60 × 4 × 260.25 / 60 = 1041 rpm</M>. Wave (A = 2) puts twice as many conductors in series per path, so it needs only half the
          speed: <M>520.5 rpm</M>. (In the exam, E = 260.25 V comes from the long-shunt circuit: IL = 40 A, Ish = 1 A, Ia = 41 A, E = 250 + 41 × 0.25.)
        </p>
      ),
    },

    {
      narration: 'l4-q-jam',
      retryOf: 'l4-q-start',
      practice: true,
      pose: 'think',
      body: <p>A running motor gets jammed so it can’t turn, but the supply stays on. Why does it quickly burn out?</p>,
      input: {
        type: 'choice',
        options: ['With no rotation there is no back EMF, so a huge current flows', 'The magnet heats up when it isn’t moving', 'Friction from the jam heats the coil', 'The commutator stops reversing the current'],
        answer: 0,
      },
      hint: <p>What normally limits the armature current?</p>,
      why: <p>Jammed, N = 0, so Eb = 0 and <M>Ia = V/Ra</M> flows continuously. The heating <M>Ia²Ra</M> is enormous, which is why motors need overload protection.</p>,
    },
  ],
};

/* ─────────────────────────── Lesson 6 ─────────────────────────── */
export const torque = {
  id: 'torque',
  title: 'Torque & Speed Equations',
  blurb: 'Ta = 0.159φZIa(P/A), shaft torque, N ∝ Eb/φ and speed regulation.',
  steps: [
    {
      narration: 'l6-derive',
      task: true,
      body: <p>Now the second key equation: the <b>armature torque</b>. We build it from the force on one conductor.</p>,
      Figure: WorkedExample,
      figureProps: {
        title: 'Derivation',
        given: <>Armature radius r, active length l, P poles, φ per pole, Z conductors, A paths, armature current Ia.</>,
        steps: [
          <>Current in each conductor: <M>Ic = Ia / A</M>.</>,
          <>Flux density under a pole: total flux Pφ spread over the armature surface 2πrl, so <M>B = Pφ / (2πrl)</M>.</>,
          <>Force on one conductor: <M>F = B·Ic·l = (Pφ/2πrl)(Ia/A)·l</M>. Torque from it: <M>F·r = PφIa / (2πA)</M>.</>,
          <>All Z conductors add up: <M>Ta = PφZIa / (2πA)</M>.</>,
          <>Since <M>1/2π = 0.159</M>: <b><M>Ta = 0.159·φ·Z·Ia·(P/A)</M> N·m</b>. For a given machine, <M>Ta ∝ φ·Ia</M>.</>,
        ],
      },
    },

    {
      narration: 'l6-power',
      body: (
        <>
          <p>There’s a second, often faster, form. The mechanical power developed is <M>Eb·Ia = Ta·ω</M>, with <M>ω = 2πN/60</M>:</p>
          <div className="eq"><M>Ta = 60·Eb·Ia / (2πN) = 9.55 · Eb·Ia / N</M></div>
          <p>
            Not all of Ta reaches the load. Some is used up overcoming iron and friction losses (the <b>lost torque</b>). What’s left is the{' '}
            <b>shaft torque</b>:
          </p>
          <div className="eq"><M>Tsh = 9.55 · Output / N</M>    <M>Ta − Tsh = lost torque</M></div>
          <Callout kind="ioe">Use 9.55 × power ÷ rpm whenever the question gives power and speed. It saves you converting to rad/s.</Callout>
        </>
      ),
    },

    {
      narration: 'l6-excite',
      task: true,
      body: (
        <>
          <p>
            Torque and speed both depend on φ, so first: <b>where does the field winding get its current?</b> Two connections appear in almost every
            IOE numerical. (Lesson 7 covers all the types.)
          </p>
          <ul className="defs">
            <li>
              <b>Shunt</b>: the field is connected <b>across the supply</b>, in parallel with the armature. It draws <M>Ish = V / Rsh</M>, so the line
              current splits: <M>IL = Ia + Ish</M>. With V fixed, Ish and φ stay constant. (If Ish is cut, the poles keep only a weak{' '}
              <b>residual flux</b>, the small magnetism left in their iron.)
            </li>
            <li>
              <b>Series</b>: the field is <b>in series</b> with the armature, so it carries the full Ia. Then <M>φ ∝ Ia</M> (until the iron saturates)
              and <M>V = Eb + Ia(Ra + Rse)</M>.
            </li>
          </ul>
          <p>Open both circuits and follow the currents.</p>
        </>
      ),
      Figure: MotorTypes,
      figureProps: { only: ['shunt', 'series'] },
      after: <Callout kind="ioe">In shunt-motor questions the current “taken from the supply” is the line current IL. Subtract Ish first to get Ia.</Callout>,
    },

    {
      narration: 'l6-prop',
      task: true,
      body: <p>Since <M>Ta ∝ φ·Ia</M>, how torque grows with current depends on where the field winding gets its current. Tap each card.</p>,
      Figure: FlipCards,
      figureProps: {
        cards: [
          { icon: '🟰', front: 'Shunt motor', back: 'φ is constant (fixed field current), so Ta ∝ Ia: a straight line.' },
          { icon: '📈', front: 'Series motor (before saturation)', back: 'Field current = Ia, so φ ∝ Ia and Ta ∝ Ia². Huge starting torque.' },
          { icon: '📏', front: 'Series motor (after saturation)', back: 'The iron saturates, φ stops growing, and Ta ∝ Ia again.' },
          { icon: '⚖️', front: 'Compound motor', back: 'In between: a constant shunt flux plus a series flux that grows with load.' },
        ],
      },
    },

    {
      narration: 'l6-speed',
      task: true,
      body: (
        <>
          <p>Rearrange the EMF equation for speed:</p>
          <div className="eq"><M>N = 60A·Eb / (PφZ)</M>  ⟹  <M>N ∝ Eb / φ = (V − IaRa) / φ</M></div>
          <p>Comparing two operating conditions of the same motor:</p>
          <div className="eq"><M>N₂ / N₁ = (Eb₂ / Eb₁) × (φ₁ / φ₂)</M></div>
          <ul className="defs">
            <li><b>Shunt</b>: φ constant, so <M>φ₁/φ₂ = 1</M> and <M>N₂/N₁ = Eb₂/Eb₁</M>.</li>
            <li><b>Series</b> (no saturation): <M>φ ∝ Ia</M>, so <M>φ₁/φ₂ = Ia₁/Ia₂</M>.</li>
            <li>At <b>no load</b> Ia is tiny, so <M>IaRa</M> is tiny and <M>Eb ≈ V</M>.</li>
          </ul>
        </>
      ),
      Figure: SpeedPredict,
    },

    {
      narration: 'l4-q-speed',
      checkin: true,
      pose: 'think',
      body: <p>A motor runs freely with no load. You make its field <b>stronger</b> but keep the same supply voltage. The motor…</p>,
      input: {
        type: 'choice',
        options: ['speeds up, because the force is bigger', 'slows down to a new, lower speed', 'stays at exactly the same speed', 'stalls completely'],
        answer: 1,
      },
      hint: <p>N ∝ Eb/φ, and at no load Eb ≈ V.</p>,
      why: <p>With Eb ≈ V fixed, a bigger φ means a <b>lower</b> N. Strengthening the field slows the motor (but lets it deliver more torque per amp).</p>,
    },

    {
      narration: 'l6-reg',
      task: true,
      Figure: RegulationLab,
      body: (
        <>
          <p><b>Speed regulation</b> measures how much the speed falls from no load to full load:</p>
          <div className="eq"><M>% Speed regulation = (N₀ − N_fl) / N_fl × 100</M></div>
          <p>
            A shunt motor has small regulation (about 5–15%), so it’s good for constant-speed drives. A series motor’s speed changes enormously
            with load, so its regulation is very poor.
          </p>
          <Callout kind="remember">Watch out: divide by the <b>full-load</b> speed, not the no-load speed.</Callout>
        </>
      ),
    },

    SKILL,

    {
      narration: 'l6-q-torque',
      variant: {
        body: <p>A 6-pole, lap-wound motor has 600 conductors, a flux of 25 mWb per pole and an armature current of 60 A. Find the armature torque.</p>,
        input: { type: 'choice', columns: 2, options: ['≈ 143 N·m', '≈ 429 N·m', '≈ 47.7 N·m', '≈ 286 N·m'], answer: 0 },
        hint: <p>Lap: A = P, so P/A = 1. Use Ta = 0.159 φ Z Ia (P/A).</p>,
        why: <p><M>Ta = 0.159 × 0.025 × 600 × 60 × (6/6) ≈ 143 N·m</M>. Taking A = 2 by mistake gives 429 N·m.</p>,
      },
      pose: 'think',
      body: <p>A 4-pole, wave-wound motor has 500 conductors, a flux of 20 mWb per pole and an armature current of 50 A. Find the armature torque.</p>,
      input: { type: 'choice', columns: 2, options: ['≈ 39.8 N·m', '≈ 79.6 N·m', '≈ 159 N·m', '≈ 318 N·m'], answer: 2 },
      hint: <p>Wave: A = 2. Use Ta = 0.159 φ Z Ia (P/A).</p>,
      why: <p><M>Ta = 0.159 × 0.02 × 500 × 50 × (4/2) ≈ 159 N·m</M>.</p>,
    },

    {
      narration: 'l6-q-shaft',
      variant: {
        body: <p>A motor delivers 15 kW at its shaft while running at 1200 rpm. Fill in the shaft torque.</p>,
        input: {
          type: 'tiles',
          inline: true,
          template: [['Tsh = 9.55 × ', '_', ' W ÷ 1200 rpm = ', '_', ' N·m']],
          tiles: ['15', '15000', '11.9', '119.4', '1194'],
          answer: ['15000', '119.4'],
        },
        hint: <p>Use the power in watts: 15 kW = 15000 W.</p>,
        why: <p><M>Tsh = 9.55 × 15000 / 1200 ≈ 119.4 N·m</M>.</p>,
      },
      pose: 'think',
      body: <p>A motor delivers 10 kW at its shaft while running at 1000 rpm. Fill in the shaft torque.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['Tsh = 9.55 × ', '_', ' W ÷ 1000 rpm = ', '_', ' N·m']],
        tiles: ['10', '10000', '9.55', '95.5', '955'],
        answer: ['10000', '95.5'],
      },
      hint: <p>Use the power in watts: 10 kW = 10000 W.</p>,
      why: <p><M>Tsh = 9.55 × 10000 / 1000 = 95.5 N·m</M>.</p>,
    },

    {
      narration: 'l6-q-field',
      pose: 'think',
      body: <p>The field circuit of a running, lightly loaded DC shunt motor suddenly opens. What happens?</p>,
      input: {
        type: 'choice',
        options: ['The speed rises dangerously, since N ∝ 1/φ and only residual flux is left', 'The motor stops immediately', 'The speed stays the same', 'The motor reverses direction'],
        answer: 0,
      },
      hint: <p>Look at N ∝ Eb/φ. What happens as φ → 0?</p>,
      why: <p>With only residual flux, the motor must spin extremely fast to build enough Eb. It can <b>run away</b>, which is why starters release when the field circuit fails.</p>,
    },

    {
      narration: 'l6-q-reg',
      variant: {
        body: <p>A shunt motor runs at 1500 rpm at no load and 1440 rpm at full load. Its speed regulation is…</p>,
        input: { type: 'choice', columns: 2, options: ['4.17%', '4%', '6%', '41.7%'], answer: 0 },
        why: <p><M>(1500 − 1440)/1440 × 100 ≈ 4.17%</M>. Dividing by 1500 instead (4%) is the classic mistake.</p>,
      },
      pose: 'think',
      body: <p>A shunt motor runs at 1050 rpm at no load and 1000 rpm at full load. Its speed regulation is…</p>,
      input: { type: 'choice', columns: 2, options: ['5%', '4.76%', '50%', '10.5%'], answer: 0 },
      hint: <p>(N₀ − N_fl) / N_fl × 100</p>,
      why: <p><M>(1050 − 1000)/1000 × 100 = 5%</M>. Dividing by 1050 instead (4.76%) is the classic mistake.</p>,
    },

    {
      narration: 'l6-q-speed',
      pose: 'think',
      body: <p>A 220 V shunt motor with Ra = 0.4 Ω runs at 1000 rpm with Ia = 25 A. At what speed will it run when Ia = 50 A (flux constant)?</p>,
      input: { type: 'choice', columns: 2, options: ['≈ 952 rpm', '≈ 1000 rpm', '≈ 1050 rpm', '≈ 500 rpm'], answer: 0 },
      hint: <p>Eb₁ = 220 − 25×0.4, Eb₂ = 220 − 50×0.4, then N₂ = N₁ × Eb₂/Eb₁.</p>,
      why: <p><M>Eb₁ = 210 V</M>, <M>Eb₂ = 200 V</M>, so <M>N₂ = 1000 × 200/210 ≈ 952 rpm</M>.</p>,
    },

    {
      narration: 'l6-q-flash',
      flashback: true,
      pose: 'think',
      body: <p>Flashback to back EMF: for a given machine (P, Z and A fixed), the back EMF Eb is proportional to…</p>,
      input: { type: 'choice', columns: 2, options: ['φ × N', 'φ / N', 'N / φ', 'Ia × Ra'], answer: 0 },
      hint: <p>Look at <M>Eb = PφZN / 60A</M>. Which quantities are left once P, Z and A are fixed?</p>,
      why: <p><M>Eb = kφN</M>, so <M>Eb ∝ φN</M>. Rearranged, that is this lesson’s speed equation <M>N ∝ Eb/φ</M>.</p>,
    },

    {
      narration: 'l6-q-ioe',
      retryOf: 'l6-q-speed',
      practice: true,
      pose: 'think',
      body: (
        <p>
          <b>IOE 2071 Magh, Q4(b), 6 marks:</b> a DC shunt motor runs at 600 rpm taking 60 A from a 230 V supply. Ra = 0.2 Ω and Rsh = 115 Ω. Find the
          speed when the armature current is 30 A.
        </p>
      ),
      input: {
        type: 'tiles',
        inline: true,
        template: [['Ish = 230/115 = ', '_', ' A,  Ia₁ = ', '_', ' A'], ['Eb₁ = 218.4 V,  Eb₂ = 224 V,  N₂ = 600 × 224/218.4 ≈ ', '_', ' rpm']],
        tiles: ['2', '58', '60', '585', '600', '615.4'],
        answer: ['2', '58', '615.4'],
      },
      hint: <p>The 60 A is the line current. Subtract the field current to get Ia₁, then use N₂ = N₁ × Eb₂/Eb₁ (φ constant).</p>,
      why: (
        <p>
          <M>Ish = 2 A</M>, <M>Ia₁ = 58 A</M>, <M>Eb₁ = 230 − 58 × 0.2 = 218.4 V</M>, <M>Eb₂ = 230 − 30 × 0.2 = 224 V</M>, so{' '}
          <M>N₂ = 600 × 224/218.4 ≈ 615.4 rpm</M>. Less current, slightly higher speed.
        </p>
      ),
    },

    {
      narration: 'l6-q-ioe2',
      practice: true,
      pose: 'think',
      body: (
        <p>
          <b>IOE 2069 Bhadra and 2066 Magh, 8 marks:</b> a 220 V DC series motor (Ra = 0.06 Ω, Rse = 0.04 Ω) draws 25 A at 1200 rpm. Assuming no
          saturation, what current does it draw at 800 rpm?
        </p>
      ),
      input: { type: 'choice', columns: 2, options: ['≈ 37.3 A', '≈ 16.7 A', '≈ 25 A', '≈ 56.3 A'], answer: 0 },
      hint: (
        <p>
          Series motor: φ ∝ I, so <M>N₂/N₁ = (Eb₂/Eb₁) × (I₁/I₂)</M>. Here Eb₁ = 220 − 25 × 0.1 = 217.5 V and Eb₂ = 220 − 0.1·I₂.
        </p>
      ),
      why: (
        <p>
          <M>800/1200 = [(220 − 0.1 I₂)/217.5] × (25/I₂)</M> ⟹ <M>145 I₂ = 5500 − 2.5 I₂</M> ⟹ <M>I₂ = 5500/147.5 ≈ 37.3 A</M>. A slower series motor
          is carrying more load, so it draws more current.
        </p>
      ),
    },
  ],
};
