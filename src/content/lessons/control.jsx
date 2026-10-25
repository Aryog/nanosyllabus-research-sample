import { Characteristics, MotorTypes } from '../../interactives/Types.jsx';
import { PowerFlow, SpeedControl, StarterSim } from '../../interactives/Control.jsx';
import { SpeedTargets, StartResistor, ThreeVsFour } from '../../interactives/Play.jsx';
import { Callout, FlipCards, WorkedExample } from '../../interactives/Teach.jsx';
import { M, SKILL } from './shared.jsx';

/* ─────────────────────────── Lesson 7 ─────────────────────────── */
export const types = {
  id: 'types',
  title: 'Types & Characteristics',
  blurb: 'Shunt, series and compound motors: how they’re connected and how they behave.',
  steps: [
    {
      narration: 'l7-intro',
      body: (
        <>
          <p>
            DC motors are classified by <b>how the field winding gets its current</b> (the excitation). It changes everything: how torque grows with
            load, how much the speed drops, and what the motor is good for.
          </p>
          <ul className="defs">
            <li><b>Separately excited</b>: field fed from its own supply.</li>
            <li><b>Self-excited</b>: field fed from the same supply as the armature, either <b>shunt</b> (parallel), <b>series</b>, or <b>compound</b> (both).</li>
          </ul>
        </>
      ),
    },

    {
      narration: 'l7-types',
      task: true,
      body: (
        <p>
          Open each connection and follow the currents. Notice that a <b>shunt</b> field has many turns of thin wire (high resistance, small Ish), and a{' '}
          <b>series</b> field has a few turns of thick wire (low resistance, carries the full Ia).
        </p>
      ),
      Figure: MotorTypes,
    },

    {
      narration: 'l7-shunt',
      body: (
        <>
          <p>
            <b>Shunt motor.</b> φ is constant, so <M>Ta ∝ Ia</M> (a straight line) and <M>N ∝ (V − IaRa)</M>, which falls only a little as the load
            rises. Drag the load slider.
          </p>
        </>
      ),
      Figure: Characteristics,
      figureProps: { only: 'shunt' },
      after: <Callout kind="remember">The shunt motor is a nearly <b>constant-speed</b> motor with moderate starting torque.</Callout>,
    },

    {
      narration: 'l7-series',
      body: (
        <p>
          <b>Series motor.</b> φ ∝ Ia, so <M>Ta ∝ Ia²</M> at light loads (huge starting torque), and <M>N ∝ 1/Ia</M>: the speed rockets as the load is
          removed. Drag the load slider all the way down.
        </p>
      ),
      Figure: Characteristics,
      figureProps: { only: 'series' },
      after: (
        <Callout kind="ioe">
          A series motor must <b>never be started or run without load</b> (and never belt-driven, since a belt can slip off). At no load Ia and φ are tiny, so the speed
          becomes dangerously high.
        </Callout>
      ),
    },

    {
      narration: 'l7-q-noload',
      checkin: true,
      pose: 'think',
      body: <p>Why must a DC series motor never be started at no load? (IOE 2067 Mangsir, 2065 Chaitra; 2068 Bhadra asks you to judge “DC series motor should always be started at no load”: false.)</p>,
      input: {
        type: 'choice',
        options: ['Its speed would become dangerously high', 'It would not produce any torque', 'Its field would burn out', 'It would run backwards'],
        answer: 0,
      },
      hint: <p>For a series motor, φ ∝ Ia and N ∝ Eb/φ.</p>,
      why: <p>At no load Ia is tiny, so φ is tiny and <M>N ∝ 1/φ</M> becomes huge. The armature can burst from centrifugal force.</p>,
    },

    {
      narration: 'l7-compound',
      body: (
        <p>
          <b>Cumulative compound motor.</b> The series flux <b>adds</b> to the shunt flux. You get good starting torque like a series motor, but a
          safe, definite no-load speed like a shunt motor. (In a <i>differential</i> compound the fluxes oppose. It’s rarely used because it’s unstable.)
        </p>
      ),
      Figure: Characteristics,
      figureProps: { only: 'compound' },
    },

    {
      narration: 'l7-compare',
      task: true,
      body: <p>Compare all three on the same axes. Switch between them at the same load current.</p>,
      Figure: Characteristics,
    },

    {
      narration: 'l7-apps',
      task: true,
      body: <p>Each characteristic suits different jobs. Tap each card.</p>,
      Figure: FlipCards,
      figureProps: {
        cards: [
          { icon: '🛠️', front: 'Shunt', back: 'Constant speed: lathes, drilling machines, fans, blowers, centrifugal pumps, conveyors.' },
          { icon: '🚃', front: 'Series', back: 'High starting torque: electric traction (trains, trams), cranes, hoists, trolleys.' },
          { icon: '🏭', front: 'Cumulative compound', back: 'Sudden heavy loads: presses, shears, punching and rolling mills, elevators.' },
          { icon: '🔬', front: 'Separately excited', back: 'Precise, wide speed control: Ward-Leonard drives, test benches.' },
        ],
      },
    },

    {
      narration: 'l7-sort',
      checkin: true,
      pose: 'think',
      body: <p>Now you choose. Sort each job into the motor that suits it best.</p>,
      input: {
        type: 'sort',
        buckets: ['Shunt', 'Series', 'Compound'],
        items: [
          { label: 'Lathe', bucket: 0 },
          { label: 'Electric train', bucket: 1 },
          { label: 'Punching press', bucket: 2 },
          { label: 'Centrifugal pump', bucket: 0 },
          { label: 'Crane hoist', bucket: 1 },
          { label: 'Rolling mill', bucket: 2 },
          { label: 'Fan / blower', bucket: 0 },
          { label: 'Tram', bucket: 1 },
        ],
      },
      hint: <p>Constant speed → shunt. Huge starting torque → series. Sudden heavy loads → compound.</p>,
      why: <p>Shunt: lathe, pump, fan (steady speed). Series: train, tram, crane hoist (high starting torque, always loaded). Compound: punching press, rolling mill (sudden heavy loads).</p>,
    },

    SKILL,

    {
      narration: 'l7-q-torque',
      pose: 'think',
      body: <p>Before magnetic saturation, the torque of a DC series motor is proportional to…</p>,
      input: { type: 'choice', columns: 2, options: ['Ia²', 'Ia', '1/Ia', '√Ia'], answer: 0 },
      hint: <p>Ta ∝ φ·Ia, and in a series motor φ ∝ Ia.</p>,
      why: <p><M>Ta ∝ φIa ∝ Ia·Ia = Ia²</M>. After saturation φ is constant and Ta ∝ Ia.</p>,
    },

    {
      narration: 'l7-q-ioe',
      pose: 'think',
      body: (
        <p>
          <b>IOE 2067 Mangsir:</b> “Identify a suitable DC motor for each application.” Paper making needs a steady speed; shearing and punching need
          bursts of high torque, with a flywheel and a safe no-load speed.
        </p>
      ),
      input: {
        type: 'tiles',
        inline: true,
        template: [['Electric traction: ', '_'], ['Paper making: ', '_'], ['Shearing and punching: ', '_']],
        tiles: ['series', 'shunt', 'cumulative compound', 'differential compound'],
        answer: ['series', 'shunt', 'cumulative compound'],
      },
      hint: <p>Match the need: huge starting torque, nearly constant speed, or heavy sudden loads with a definite no-load speed.</p>,
      why: (
        <p>
          Traction needs very high starting torque: <b>series</b>. Paper making needs nearly constant speed: <b>shunt</b>. Shears and punches take sudden
          heavy loads and run light in between: <b>cumulative compound</b>. Differential compound is unstable and is rarely used.
        </p>
      ),
    },

    {
      narration: 'l7-q-long',
      pose: 'think',
      body: <p>In a <b>long-shunt</b> compound motor, the series field winding carries…</p>,
      input: { type: 'choice', options: ['The armature current Ia', 'The line current IL', 'The shunt field current Ish', 'No current at no load'], answer: 0 },
      hint: <p>In long shunt, the shunt field is connected across both the series field and the armature.</p>,
      why: <p>The series field is in series with the armature, so <M>Ise = Ia</M>. In short shunt it carries the line current IL.</p>,
    },

    {
      narration: 'l7-q-shunt',
      variant: {
        body: <p>A 220 V shunt motor has Rsh = 110 Ω and Ra = 0.2 Ω. It takes a line current of 52 A. Fill in the blanks.</p>,
        input: {
          type: 'tiles',
          inline: true,
          template: [['Ish = ', '_', ' A,  Ia = ', '_', ' A,'], ['Eb = 220 − Ia × 0.2 = ', '_', ' V']],
          tiles: ['2', '50', '52', '209.6', '210', '220'],
          answer: ['2', '50', '210'],
        },
        why: <p><M>Ish = 220/110 = 2 A</M>, <M>Ia = 52 − 2 = 50 A</M>, <M>Eb = 220 − 50 × 0.2 = 210 V</M>. Using IL instead of Ia gives 209.6 V.</p>,
      },
      pose: 'think',
      body: <p>A 250 V shunt motor has Rsh = 250 Ω and Ra = 0.25 Ω. It takes a line current of 41 A. Fill in the blanks.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['Ish = ', '_', ' A,  Ia = ', '_', ' A,'], ['Eb = 250 − Ia × 0.25 = ', '_', ' V']],
        tiles: ['1', '40', '41', '239.75', '240', '250'],
        answer: ['1', '40', '240'],
      },
      hint: <p>Ish = V/Rsh, then Ia = IL − Ish.</p>,
      why: <p><M>Ish = 250/250 = 1 A</M>, <M>Ia = 41 − 1 = 40 A</M>, <M>Eb = 250 − 40 × 0.25 = 240 V</M>.</p>,
    },

    {
      narration: 'l7-q-flash',
      flashback: true,
      pose: 'think',
      body: <p>Flashback to the speed equation: in any DC motor, the speed N is proportional to…</p>,
      input: { type: 'choice', columns: 2, options: ['Eb / φ', 'φ / Eb', 'Eb × φ', 'Ia × φ'], answer: 0 },
      hint: <p>Rearrange <M>Eb = kφN</M> for N.</p>,
      why: <p><M>N ∝ Eb/φ</M>. That is why a series motor, whose φ collapses at no load, races away.</p>,
    },

    {
      narration: 'l7-q-app',
      retryOf: 'l7-q-ioe',
      practice: true,
      pose: 'think',
      body: <p>Which motor is best suited for an electric train or a crane?</p>,
      input: { type: 'choice', columns: 2, options: ['DC series motor', 'DC shunt motor', 'Differential compound motor', 'Any of them equally'], answer: 0 },
      hint: <p>These loads need a very high starting torque.</p>,
      why: <p>The <b>series motor</b>’s <M>Ta ∝ Ia²</M> gives the very high starting torque traction and hoisting need, and it is always coupled to its load.</p>,
    },

    {
      narration: 'l4c-q-ioe',
      practice: true,
      pose: 'think',
      body: (
        <p>
          <b>IOE 2070 Magh, 2069 Bhadra:</b> a 4-pole DC shunt <b>generator</b> with a <b>wave-wound</b> armature delivers 3 kW at 120 V. Its shunt field is
          60 Ω. (As a generator, the armature feeds both the load and its own field: <M>Ia = IL + Ish</M>.) Fill in the blanks.
        </p>
      ),
      input: {
        type: 'tiles',
        inline: true,
        template: [['IL = 3000/120 = ', '_', ' A,  Ish = 120/60 = 2 A,  Ia = ', '_', ' A'], ['Current in each armature conductor = Ia/A = ', '_', ' A']],
        tiles: ['23', '25', '27', '6.75', '13.5', '27.5'],
        answer: ['25', '27', '13.5'],
      },
      hint: <p>Find IL from P = V·IL, add the field current, then divide by the number of parallel paths (wave: A = 2).</p>,
      why: (
        <p>
          <M>IL = 25 A</M>, <M>Ia = 25 + 2 = 27 A</M>. Wave winding has <M>A = 2</M> paths, so each conductor carries <M>27/2 = 13.5 A</M>. (The full
          question also asks for the generated EMF: with Ra = 0.2 Ω and 1 V drop per brush, <M>E = 120 + 27 × 0.2 + 2 = 127.4 V</M>.)
        </p>
      ),
    },
  ],
};

/* ─────────────────────────── Lesson 8 ─────────────────────────── */
export const starting = {
  id: 'starting',
  title: 'Starting DC Motors',
  blurb: 'Why a motor needs a starter: 3-point and 4-point starters, NVC and OLR.',
  steps: [
    {
      narration: 'l8-why',
      task: true,
      body: <p>Remember: at standstill there is no back EMF. Let’s see why that makes starting dangerous.</p>,
      Figure: StartResistor,
      after: <p className="muted">220 V motor, Ra = 0.5 Ω, full-load current 20 A. A starter adds R at start, then cuts it out step by step as the speed (and Eb) builds up.</p>,
    },

    {
      narration: 'l8-starter',
      task: true,
      body: (
        <>
          <p>
            This is a <b>3-point starter</b>, named for its terminals L (line), F (field) and A (armature). Move the handle stud by stud to bring the
            motor up to the <b>RUN</b> position.
          </p>
          <p>
            The <b>overload release (OLR)</b> trips above 40 A. If you move too fast, the current spikes and the handle springs back. Wait for the
            current to fall before each step.
          </p>
        </>
      ),
      Figure: StarterSim,
      after: <p className="muted">Once you reach RUN, try the supply-failure and overload buttons to see the protections act.</p>,
    },

    {
      narration: 'l8-protect',
      task: true,
      body: <p>The starter has two protective devices. Tap each card.</p>,
      Figure: FlipCards,
      figureProps: {
        cards: [
          { icon: '🧲', front: 'No-volt coil (NVC)', back: 'Electromagnet in series with the field. It holds the handle at RUN. If the supply fails or the field circuit opens, it loses magnetism and a spring returns the handle to OFF, so the motor can’t restart without a starter or run away with no field.' },
          { icon: '🔥', front: 'Overload release (OLR)', back: 'Electromagnet in series with the line. On excessive current it lifts an iron piece that short-circuits the NVC, releasing the handle to OFF.' },
          { icon: '🟡', front: 'Brass arc', back: 'Keeps the field connected to the line at every stud, so the motor starts with full field and maximum torque per amp.' },
        ],
      },
    },

    {
      narration: 'l8-order',
      checkin: true,
      pose: 'think',
      body: <p>Put the steps for starting a shunt motor with a 3-point starter in order.</p>,
      input: {
        type: 'order',
        items: [
          'Check the handle is at OFF, then close the main switch',
          'Move to stud 1: all starting resistance in, full field',
          'Wait while the motor speeds up, Eb builds and Ia falls',
          'Move stud by stud, cutting out resistance',
          'At RUN the NVC holds the handle; no resistance left',
        ],
      },
      hint: <p>Resistance must be fully in at the start and fully out at RUN. Speed (and Eb) has to build before each cut.</p>,
      why: <p>Start from OFF with all the resistance in, let Eb build so Ia falls, cut out resistance stud by stud, and finish at RUN where the NVC holds the handle.</p>,
    },

    {
      narration: 'l8-four',
      body: (
        <>
          <p>
            <b>Drawback of the 3-point starter:</b> the NVC is in series with the shunt field. If you weaken the field with a rheostat to raise the speed,
            the NVC current also falls, and the handle may release unexpectedly.
          </p>
          <p>
            <b>4-point starter:</b> the NVC is taken out of the field circuit and connected <b>directly across the supply</b> (with a protecting
            resistance) through a fourth terminal. Field control no longer affects the NVC.
          </p>
          <Callout kind="ioe">
            The 3-point starter is unsuitable for wide speed control by field weakening; the 4-point starter fixes this. Its catch: an open field no longer
            releases the handle.
          </Callout>
        </>
      ),
      task: true,
      Figure: ThreeVsFour,
    },

    SKILL,

    {
      narration: 'l8-q-nvc',
      pose: 'think',
      body: <p>In a 3-point starter, the no-volt coil (NVC)…</p>,
      input: {
        type: 'choice',
        options: ['holds the handle at RUN and releases it on supply failure or an open field', 'limits the starting current', 'trips the motor on overload by itself', 'reverses the motor for braking'],
        answer: 0,
      },
      hint: <p>What happens to the handle when the power goes off?</p>,
      why: <p>The NVC holds the handle against a spring. If the supply fails (or the field opens), it loses magnetism and the handle returns to OFF.</p>,
    },

    {
      narration: 'l8-q-four',
      pose: 'think',
      body: <p>The main advantage of a 4-point starter over a 3-point starter is that…</p>,
      input: {
        type: 'choice',
        options: ['changing the field current for speed control does not affect the NVC', 'it needs no starting resistance', 'it also works as a brake', 'it protects against an open field circuit better'],
        answer: 0,
      },
      hint: <p>Where is the NVC connected in each starter?</p>,
      why: <p>In the 4-point starter, the NVC is across the supply, independent of the field circuit, so field-weakening speed control works safely.</p>,
    },

    {
      narration: 'l8-q-starter',
      variant: {
        body: <p>A 240 V DC motor has Ra = 0.5 Ω and a full-load current of 20 A. The starting current must be limited to 1.5 times full load. Fill in the blanks.</p>,
        input: {
          type: 'tiles',
          inline: true,
          template: [['Without a starter: Ia = 240/0.5 = ', '_', ' A'], ['Starter resistance = 240/30 − 0.5 = ', '_', ' Ω']],
          tiles: ['30', '120', '480', '7.5', '8', '8.5'],
          answer: ['480', '7.5'],
        },
        hint: <p>Total resistance needed = V ÷ (1.5 × 20 A). Subtract Ra to get the starter part.</p>,
        why: <p><M>Ia = 240/0.5 = 480 A</M>. Total R = 240/30 = 8 Ω, so the starter adds <M>8 − 0.5 = 7.5 Ω</M>.</p>,
      },
      pose: 'think',
      body: <p>A 220 V DC motor has Ra = 0.4 Ω and a full-load current of 25 A. The starting current must be limited to twice full load. Fill in the blanks.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['Without a starter: Ia = 220/0.4 = ', '_', ' A'], ['Starter resistance = 220/50 − 0.4 = ', '_', ' Ω']],
        tiles: ['50', '88', '550', '4', '4.4', '8.4'],
        answer: ['550', '4'],
      },
      hint: <p>Total resistance needed = V ÷ (2 × 25 A). Subtract Ra to get the starter part.</p>,
      why: <p><M>Ia = 220/0.4 = 550 A</M>. Total R = 220/50 = 4.4 Ω, so the starter adds <M>4.4 − 0.4 = 4 Ω</M>.</p>,
    },

    {
      narration: 'l8s-q-flash',
      flashback: true,
      pose: 'think',
      body: <p>Flashback to back EMF: as a motor speeds up from rest on a fixed supply, its armature current…</p>,
      input: {
        type: 'choice',
        options: ['falls, because the back EMF rises with speed', 'rises, because the motor is doing more work', 'stays the same the whole time', 'reverses once the motor reaches full speed'],
        answer: 0,
      },
      hint: <p><M>Ia = (V − Eb)/Ra</M>, and <M>Eb ∝ N</M>.</p>,
      why: <p>As N rises, Eb rises and <M>Ia = (V − Eb)/Ra</M> falls. That is why a starter can cut out its resistance step by step as the motor speeds up.</p>,
    },
  ],
};

/* ─────────────────────────── Lesson 9 ─────────────────────────── */
export const control = {
  id: 'control',
  title: 'Speed Control & Braking',
  blurb: 'Flux, armature-resistance and voltage control, and electric braking.',
  steps: [
    {
      narration: 'l8-speed',
      task: true,
      body: (
        <>
          <p>
            From <M>N ∝ (V − Ia·Ra) / φ</M>, there are three handles on speed: <b>φ</b>, the <b>resistance</b> in the armature circuit, and the{' '}
            <b>voltage</b> applied to the armature. Try each method on a shunt motor driving a constant-torque load.
          </p>
          <ul className="defs">
            <li>
              <b>Base speed</b>: the speed at rated voltage with full field and no extra armature resistance. The field is already at full strength
              there, so φ can only be weakened.
            </li>
            <li>
              <b>Constant-torque load</b>: <M>Ta ∝ φ·Ia</M> must stay the same. With φ fixed, Ia stays fixed; weaken φ and Ia must rise to match.
            </li>
          </ul>
        </>
      ),
      Figure: SpeedControl,
    },

    {
      narration: 'l8-targets',
      task: true,
      body: <p>Same motor, same load. Hit each target speed using only the method named. Base speed is 1050 rpm.</p>,
      Figure: SpeedTargets,
    },

    {
      narration: 'l8-methods',
      task: true,
      body: <p>Here’s how the three methods compare. Tap each card.</p>,
      Figure: FlipCards,
      figureProps: {
        cards: [
          { icon: '🧲', front: 'Flux (field) control', back: 'Rheostat in the shunt field weakens φ → speed rises ABOVE base speed. Cheap and efficient (small field current). Limited by commutation and mechanical strength.' },
          { icon: '🔥', front: 'Armature resistance (rheostatic) control', back: 'Resistance in series with the armature → speed BELOW base speed. Simple, but wasteful (Ia²R heat) and the speed changes a lot with load.' },
          { icon: '🎚️', front: 'Armature voltage (Ward-Leonard) control', back: 'A motor-generator set supplies a variable voltage → smooth control from zero to base speed, in both directions. Excellent, but costly.' },
        ],
      },
      after: (
        <Callout kind="ioe">
          <b>Series motors</b> use the same two ideas. Field control: a <b>diverter</b> resistance across the series field (or a <b>tapped</b> field)
          weakens φ and raises the speed. Armature control: a resistance in series with the motor lowers the speed.
        </Callout>
      ),
    },

    {
      narration: 'l8-brake',
      task: true,
      body: <p>Stopping a motor quickly is called <b>electric braking</b>. There are three methods. Tap each card.</p>,
      Figure: FlipCards,
      figureProps: {
        cards: [
          { icon: '🔄', front: 'Plugging (reverse current)', back: 'Reverse the armature connections. V and Eb now add, giving a strong reverse torque. A resistance limits the current. Must be disconnected at zero speed, or it starts reversing.' },
          { icon: '♨️', front: 'Rheostatic (dynamic)', back: 'Disconnect the armature from the supply and connect it across a resistor. The machine runs as a generator and its energy is burnt as heat.' },
          { icon: '🔋', front: 'Regenerative', back: 'When the load drives the motor faster than normal (a train going downhill), Eb > V, the machine becomes a generator and feeds energy BACK to the supply.' },
        ],
      },
    },

    SKILL,

    {
      narration: 'l8-q-field',
      pose: 'think',
      body: <p>Field (flux) control of a DC shunt motor gives speeds…</p>,
      input: { type: 'choice', columns: 2, options: ['Above base speed', 'Below base speed', 'Only exactly base speed', 'Zero to base, both directions'], answer: 0 },
      hint: <p>Field control can only weaken φ (the field is already at full strength at base speed).</p>,
      why: <p>Reducing φ raises speed, since <M>N ∝ 1/φ</M>, so flux control works <b>above base speed</b>. Armature control works below it.</p>,
    },

    {
      narration: 'l8-q-res',
      pose: 'think',
      body: (
        <p>
          A 220 V shunt motor (Ra = 0.5 Ω) runs at 1000 rpm taking Ia = 40 A. What extra armature resistance reduces the speed to 800 rpm at the same
          load torque (same Ia)?
        </p>
      ),
      input: { type: 'choice', columns: 2, options: ['1 Ω', '1.5 Ω', '0.5 Ω', '2 Ω'], answer: 0 },
      hint: <p>Eb₁ = 220 − 40×0.5. Eb₂ = Eb₁ × 800/1000. Then 220 − Eb₂ = 40 × (0.5 + R).</p>,
      why: <p><M>Eb₁ = 200 V</M>, <M>Eb₂ = 160 V</M>, so <M>40(0.5 + R) = 60</M>, giving <M>0.5 + R = 1.5</M> and <M>R = 1 Ω</M>. It wastes 40² × 1 = 1.6 kW.</p>,
    },

    {
      narration: 'l8-q-brake',
      pose: 'think',
      body: <p>Which braking method returns energy to the supply?</p>,
      input: { type: 'choice', columns: 2, options: ['Regenerative braking', 'Plugging', 'Rheostatic braking', 'Mechanical braking'], answer: 0 },
      hint: <p>When does the machine act as a generator connected to the supply?</p>,
      why: <p>In <b>regenerative braking</b>, Eb &gt; V, so current flows back into the supply. Plugging and rheostatic braking waste the energy as heat.</p>,
    },

    {
      narration: 'l8-q-ioe2',
      pose: 'think',
      body: (
        <p>
          <b>IOE 2075 Baishakh:</b> a 250 V DC shunt motor (Ra = 0.25 Ω, Rsh = 250 Ω) takes an armature current of 20 A at 1500 rpm. A 250 Ω
          resistance is added in series with the field, keeping the load torque constant. Assuming φ ∝ field current, find the new speed.
        </p>
      ),
      input: { type: 'choice', columns: 2, options: ['≈ 2939 rpm', '≈ 3000 rpm', '≈ 1469 rpm', '≈ 750 rpm'], answer: 0 },
      hint: <p>The field current halves, so φ halves. Constant torque (Ta ∝ φIa) means Ia doubles to 40 A. Then N₂ = N₁ × (Eb₂/Eb₁) × (φ₁/φ₂).</p>,
      why: (
        <p>
          <M>Eb₁ = 250 − 20 × 0.25 = 245 V</M>, <M>Eb₂ = 250 − 40 × 0.25 = 240 V</M>, so <M>N₂ = 1500 × (240/245) × 2 ≈ 2939 rpm</M>. Field weakening
          raises the speed above base speed.
        </p>
      ),
    },

    {
      narration: 'l8-q-ioe3',
      pose: 'think',
      body: (
        <p>
          <b>IOE 2075 Baisakh (Electrical Machine I), Q4(b), 8 marks:</b> a 200 V DC series motor runs at 800 rpm taking 15 A. Ra = 0.6 Ω and Rse =
          0.4 Ω. At what speed will it run with a 5 Ω resistance in series, taking the same current at the same voltage?
        </p>
      ),
      input: { type: 'choice', columns: 2, options: ['≈ 476 rpm', '≈ 1345 rpm', '≈ 800 rpm', '≈ 667 rpm'], answer: 0 },
      hint: <p>Same current means the same series flux, so N₂/N₁ = Eb₂/Eb₁. Total resistance goes from 1 Ω to 6 Ω.</p>,
      why: (
        <p>
          <M>Eb₁ = 200 − 15 × 1 = 185 V</M>, <M>Eb₂ = 200 − 15 × 6 = 110 V</M>, so <M>N₂ = 800 × 110/185 ≈ 476 rpm</M>. (IOE 2070 Bhadra is the same
          idea: 1 Ω motor, 1000 rpm at 250 V and 20 A, with 6 Ω added → about 478 rpm.)
        </p>
      ),
    },

    {
      narration: 'l8-q-flash',
      flashback: true,
      pose: 'think',
      body: <p>Flashback to motor types: which motor has a very high starting torque but must never be started or run without load?</p>,
      input: { type: 'choice', columns: 2, options: ['DC series motor', 'DC shunt motor', 'Cumulative compound motor', 'Separately excited motor'], answer: 0 },
      hint: <p>Which motor has <M>Ta ∝ Ia²</M> and <M>N ∝ 1/Ia</M>?</p>,
      why: <p>The <b>series motor</b>: its flux grows with Ia, giving huge starting torque, but at no load φ is tiny and the speed runs away.</p>,
    },

    {
      narration: 'l8-q-ioe',
      retryOf: 'l8-q-res',
      practice: true,
      pose: 'think',
      body: (
        <p>
          <b>IOE 2072 Ashwin:</b> a 200 V DC shunt motor drives a <b>constant-torque</b> load. It draws 50 A at 1000 rpm. Ra = 0.1 Ω, Rsh = 100 Ω. What
          resistance must be inserted in the armature circuit to reduce the speed to 800 rpm?
        </p>
      ),
      input: {
        type: 'tiles',
        inline: true,
        template: [['Ish = 2 A,  Ia = ', '_', ' A,  Eb₁ = 200 − Ia × 0.1 = ', '_', ' V'], ['Eb₂ = 0.8 × Eb₁ = 156.16 V,  R = (200 − 156.16)/48 − 0.1 ≈ ', '_', ' Ω']],
        tiles: ['48', '50', '195', '195.2', '0.81', '0.91', '1.33'],
        answer: ['48', '195.2', '0.81'],
      },
      hint: <p>Constant torque and constant φ mean Ia stays the same. Eb is proportional to speed, so Eb₂ = Eb₁ × 800/1000.</p>,
      why: (
        <p>
          <M>Ia = 50 − 2 = 48 A</M>, <M>Eb₁ = 195.2 V</M>, <M>Eb₂ = 156.16 V</M>, so <M>Ra + R = 43.84/48 = 0.913 Ω</M> and <M>R ≈ 0.81 Ω</M>. (IOE 2068
          Bhadra asks the same for a pump whose torque ∝ N²: then Ia₂ = 48 × 0.8² = 30.72 A and R ≈ 1.33 Ω.)
        </p>
      ),
    },
  ],
};

/* ─────────────────────────── Lesson 10 ─────────────────────────── */
export const losses = {
  id: 'losses',
  title: 'Losses, Efficiency & Testing',
  blurb: 'Where the power goes, maximum efficiency, and Swinburne’s test.',
  steps: [
    {
      narration: 'l9-losses',
      task: true,
      body: <p>Not all the input power becomes shaft power. The losses in a DC machine fall into four groups. Tap each card.</p>,
      Figure: FlipCards,
      figureProps: {
        cards: [
          { icon: '🔥', front: 'Copper (electrical) losses', back: 'Armature Ia²Ra, shunt field V·Ish (or Ish²Rsh), series field Ise²Rse, and brush contact loss. These vary with load.' },
          { icon: '🧲', front: 'Iron (core) losses', back: 'Hysteresis Wh = kh·Bmax^1.6·f·(core volume) and eddy current We = ke·Bmax²·f²·t²·(core volume), where f = PN/120 is how often the armature iron is re-magnetised and t is the lamination thickness. Roughly constant at constant speed and flux.' },
          { icon: '⚙️', front: 'Mechanical losses', back: 'Bearing friction, brush friction and windage (air resistance). Roughly constant at constant speed.' },
          { icon: '❓', front: 'Stray losses', back: 'Iron + mechanical losses together are called stray (rotational) losses. For a shunt motor, constant losses = stray losses + shunt field Cu loss.' },
        ],
      },
    },

    {
      narration: 'l9-flow',
      body: (
        <>
          <p>Follow the <b>power flow</b> in a 220 V shunt motor (Ish = 2 A, Ra = 0.5 Ω, stray loss 400 W). Move the load and watch each slice change.</p>
          <div className="eq small-eq">Input V·IL → − field Cu → − armature Cu → Eb·Ia (gross) → − iron & mechanical → Output</div>
        </>
      ),
      Figure: PowerFlow,
      figureProps: { showEfficiency: false },
      after: (
        <p className="muted">
          Efficiency <M>η = Output / Input = Output / (Output + Total losses)</M>. This works for a generator too: there the input is the mechanical
          power and the output is <M>V·IL</M>.
        </p>
      ),
    },

    {
      narration: 'l9-sort',
      checkin: true,
      pose: 'think',
      body: <p>For a shunt motor at constant speed, which losses stay <b>constant</b> and which <b>vary</b> with load?</p>,
      input: {
        type: 'sort',
        buckets: ['Constant', 'Variable'],
        items: [
          { label: 'Hysteresis', bucket: 0 },
          { label: 'Armature Cu loss Ia²Ra', bucket: 1 },
          { label: 'Bearing friction', bucket: 0 },
          { label: 'Shunt field Cu loss', bucket: 0 },
          { label: 'Series field Cu loss', bucket: 1 },
          { label: 'Eddy current', bucket: 0 },
          { label: 'Brush contact loss', bucket: 1 },
          { label: 'Windage', bucket: 0 },
        ],
      },
      hint: <p>Ask: does it depend on the armature (load) current, or only on speed, flux and the supply voltage?</p>,
      why: <p>Iron (hysteresis, eddy), mechanical (friction, windage) and shunt field loss depend on speed, flux and V, so they are constant. Anything carrying Ia (armature, series field, brush contact) varies with load.</p>,
    },

    {
      narration: 'l9-maxeff',
      task: true,
      body: (
        <>
          <p>
            Losses come in two kinds: <b>constant losses Wc</b> (iron + mechanical + shunt field) and <b>variable losses</b> <M>Ia²Ra</M>. At light load
            Wc dominates; at heavy load the copper loss does.
          </p>
          <p>Find the load where efficiency is highest.</p>
        </>
      ),
      Figure: PowerFlow,
      after: (
        <Callout kind="ioe">
          Condition for maximum efficiency: <b>variable loss = constant loss</b>, i.e. <M>Ia²Ra = Wc</M>, so <M>Ia = √(Wc/Ra)</M>.
        </Callout>
      ),
    },

    {
      narration: 'l9-swinburne',
      task: true,
      body: (
        <>
          <p>
            <b>Swinburne’s test</b> (no-load test) finds the constant losses without loading the machine. Run it as a motor at no load, at rated voltage
            and speed, and measure the input.
          </p>
        </>
      ),
      Figure: WorkedExample,
      figureProps: {
        given: <>A 220 V shunt machine takes 6 A at no load. Rsh = 110 Ω, Ra = 0.5 Ω.</>,
        steps: [
          <>No-load input, with <M>I₀</M> the no-load line current: <M>V × I₀ = 220 × 6 = 1320 W</M>. At no load all of it is losses.</>,
          <><M>Ish = 220/110 = 2 A</M>, so the no-load armature current is <M>Ia₀ = 6 − 2 = 4 A</M>.</>,
          <>No-load armature Cu loss: <M>Ia₀²Ra = 4² × 0.5 = 8 W</M>.</>,
          <>Constant losses <M>Wc = 1320 − 8 = 1312 W</M>. With Wc known, the efficiency at <b>any</b> load can be calculated.</>,
          <>Pros: simple, cheap (needs little power). Cons: it can’t be used on series motors (they’d run away at no load), and it ignores the change in iron loss under load.</>,
        ],
      },
    },

    SKILL,

    {
      narration: 'l9-q-max',
      pose: 'think',
      body: <p>A DC machine has maximum efficiency when…</p>,
      input: {
        type: 'choice',
        options: ['variable (copper) loss equals constant loss', 'copper loss is zero', 'iron loss is twice the copper loss', 'it runs at no load'],
        answer: 0,
      },
      hint: <p>Recall the slider: where did the efficiency curve peak?</p>,
      why: <p>Efficiency peaks when <M>Ia²Ra = Wc</M>.</p>,
    },

    {
      narration: 'l9-q-eddy',
      pose: 'think',
      body: <p>Which loss is reduced by using silicon steel for the armature core?</p>,
      input: { type: 'choice', columns: 2, options: ['Hysteresis loss', 'Eddy-current loss', 'Copper loss', 'Windage loss'], answer: 0 },
      hint: <p>Laminations fight eddy currents. What does the material itself fight?</p>,
      why: <p>Silicon steel has a narrow hysteresis loop, so it reduces <b>hysteresis loss</b>. Laminations reduce eddy-current loss.</p>,
    },

    {
      narration: 'l9-q-const',
      pose: 'think',
      body: <p>For a DC shunt motor running at roughly constant speed, which group is treated as constant loss?</p>,
      input: {
        type: 'choice',
        options: ['Iron + mechanical + shunt field copper loss', 'Armature copper loss only', 'Armature + series field copper loss', 'Brush contact loss only'],
        answer: 0,
      },
      hint: <p>Which losses don’t depend on the armature current?</p>,
      why: <p>Iron and mechanical losses depend on speed and flux (nearly constant), and the shunt field current is constant. Only Ia²Ra varies with load.</p>,
    },

    {
      narration: 'l9-q-swin',
      variant: {
        body: <p>In Swinburne’s test, a 250 V shunt motor takes 5 A at no load. Rsh = 125 Ω, Ra = 0.4 Ω. Fill in the blanks.</p>,
        input: {
          type: 'tiles',
          inline: true,
          template: [['Input = ', '_', ' W,  Ia₀²Ra = ', '_', ' W'], ['Constant losses = ', '_', ' W']],
          tiles: ['1250', '3.6', '10', '1246.4', '1240', '625'],
          answer: ['1250', '3.6', '1246.4'],
        },
        hint: <p>Ia₀ = I₀ − Ish = 5 − 250/125 = 3 A.</p>,
        why: <p><M>250 × 5 = 1250 W</M>, <M>3² × 0.4 = 3.6 W</M>, so <M>Wc = 1246.4 W</M>.</p>,
      },
      pose: 'think',
      body: <p>In Swinburne’s test, a 220 V shunt motor takes 6 A at no load. Rsh = 110 Ω, Ra = 0.5 Ω. Fill in the blanks.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['Input = ', '_', ' W,  Ia₀²Ra = ', '_', ' W'], ['Constant losses = ', '_', ' W']],
        tiles: ['1320', '8', '18', '1312', '1302', '440'],
        answer: ['1320', '8', '1312'],
      },
      hint: <p>Ia₀ = I₀ − Ish = 6 − 2 = 4 A.</p>,
      why: <p><M>220 × 6 = 1320 W</M>, <M>4² × 0.5 = 8 W</M>, so <M>Wc = 1312 W</M>. Maximum efficiency would then be at <M>Ia = √(1312/0.5) ≈ 51 A</M>.</p>,
    },

    {
      narration: 'l9-q-ioe',
      pose: 'think',
      body: (
        <p>
          <b>IOE 2074 Bhadra:</b> a DC shunt generator gives a full-load output of 30 kW at 200 V. Ra = 0.05 Ω, Rsh = 50 Ω, and the iron and friction
          losses are 1000 W. (In a generator, <M>Ia = IL + Ish</M>.) Fill in the blanks.
        </p>
      ),
      input: {
        type: 'tiles',
        inline: true,
        template: [['IL = 150 A,  Ish = 4 A,  Ia = ', '_', ' A,  armature Cu loss = ', '_', ' W'], ['Field Cu = 800 W,  η = 30000 / (30000 + all losses) ≈ ', '_', ' %']],
        tiles: ['146', '154', '1065.8', '1185.8', '90.9', '93.8'],
        answer: ['154', '1185.8', '90.9'],
      },
      hint: <p>Armature Cu loss = Ia²Ra. Total losses = armature Cu + field Cu + iron and friction.</p>,
      why: (
        <p>
          <M>Ia = 154 A</M>, <M>Ia²Ra = 154² × 0.05 = 1185.8 W</M>. Total losses <M>= 1185.8 + 800 + 1000 = 2985.8 W</M>, so{' '}
          <M>η = 30000/32985.8 ≈ 90.9%</M>. The generated EMF is <M>200 + 154 × 0.05 = 207.7 V</M>.
        </p>
      ),
    },

    {
      narration: 'l9-q-series',
      flashback: true,
      pose: 'think',
      body: <p>Why can’t Swinburne’s test be performed on a DC series motor?</p>,
      input: {
        type: 'choice',
        options: ['It must run at no load, where a series motor races dangerously', 'Series motors have no constant losses', 'Series motors cannot run on DC', 'The test needs a shunt field to measure'],
        answer: 0,
      },
      hint: <p>What did we learn about series motors at no load?</p>,
      why: <p>The test runs the machine at <b>no load</b>. A series motor would reach a dangerously high speed.</p>,
    },

    {
      narration: 'l4-done',
      pose: 'dab',
      body: (
        <>
          <h2>The DC motor, start to finish</h2>
          <ol className="summary">
            <li>Motor principle: a current-carrying conductor in a field feels <M>F = BIl</M> (Fleming’s left-hand rule).</li>
            <li>A commutator reverses the coil current every half turn, so the torque stays one-directional.</li>
            <li>Back EMF: <M>Eb = PφZN/60A</M>; voltage equation <M>V = Eb + IaRa</M>; Pm = EbIa, max when Eb = V/2.</li>
            <li>Torque: <M>Ta = 0.159φZIa(P/A) = 9.55EbIa/N</M>; speed <M>N ∝ (V − IaRa)/φ</M>.</li>
            <li>Shunt: constant speed. Series: Ta ∝ Ia², never at no load. Compound: in between.</li>
            <li>Starters limit the starting current (3-point / 4-point, NVC and OLR). Speed is controlled by flux, resistance or voltage.</li>
            <li>η is maximum when variable loss = constant loss; Swinburne’s test finds the constant losses.</li>
          </ol>
        </>
      ),
    },

    {
      narration: 'l9-q-ioe2',
      retryOf: 'l9-q-ioe',
      practice: true,
      pose: 'think',
      body: (
        <p>
          <b>IOE 2083 Baishakh (Electrical Circuits and Machines), 5 marks:</b> a shunt generator supplies 96 A at 200 V. Ra = 0.1 Ω, Rsh = 50 Ω, and the
          iron and friction losses are 2500 W. Its <b>commercial efficiency</b> (output ÷ input) is about…
        </p>
      ),
      input: { type: 'choice', columns: 2, options: ['81.7%', '84.6%', '91.4%', '95.7%'], answer: 0 },
      hint: <p>Ish = 4 A, so Ia = 100 A. Add up all three losses: armature Cu, field Cu, iron and friction.</p>,
      why: (
        <p>
          Output <M>= 200 × 96 = 19200 W</M>. Losses: <M>100² × 0.1 = 1000 W</M>, <M>200 × 4 = 800 W</M>, plus 2500 W, total 4300 W. So{' '}
          <M>η = 19200/23500 ≈ 81.7%</M>. Forgetting the field loss gives 84.6%. (The EMF is <M>200 + 100 × 0.1 = 210 V</M>.)
        </p>
      ),
    },
  ],
};
