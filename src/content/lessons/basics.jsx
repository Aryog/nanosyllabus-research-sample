import { DotCross, FieldExplorer, GripRule, MagnetQuestion, MotorTeaser, OerstedWire } from '../../interactives/Magnetism.jsx';
import { FlemingAxes, ForceOnWire, TorqueGraph } from '../../interactives/Force.jsx';
import { LoopSim, LoopTorque } from '../../interactives/Loop.jsx';
import { Callout, FlipCards, WorkedExample } from '../../interactives/Teach.jsx';
import { M, SKILL } from './shared.jsx';

/* ─────────────────────────── Lesson 1 ─────────────────────────── */
export const magnets = {
  id: 'magnets',
  title: 'Magnets & Fields',
  blurb: 'Fields, flux, flux density and a wire that acts like a magnet.',
  steps: [
    {
      narration: 'l1-intro',
      body: (
        <>
          <p>Fans, drills, lifts, trains and electric cars all rely on the same machine: the <b>DC motor</b>.</p>
          <p>It turns electrical energy (a steady DC current) into mechanical energy (a steady rotation). Switch this one on.</p>
        </>
      ),
      Figure: MotorTeaser,
      after: <p className="muted center">To see how it works, we start with magnets.</p>,
    },

    {
      narration: 'l1-field',
      task: true,
      body: (
        <>
          <p>A magnet fills the space around it with a <b>magnetic field</b>. You can’t see it, but a compass needle feels it and turns to line up with it.</p>
          <p>Drag the compass to each of the three glowing spots and watch the needle.</p>
        </>
      ),
      Figure: FieldExplorer,
    },

    {
      narration: 'l1-field-lines',
      body: (
        <>
          <p>We draw the field as <b>magnetic lines of force</b> (field lines). Their rules:</p>
          <ul className="defs">
            <li>Outside a magnet they run <b>from N to S</b>, and inside the magnet from S back to N, forming closed loops.</li>
            <li>A compass needle always lies along a line, with its N end pointing the way of the arrows.</li>
            <li>Lines never cross. Where they are crowded, the field is strong.</li>
          </ul>
        </>
      ),
      Figure: FieldExplorer,
      figureProps: { showLines: true },
    },

    {
      narration: 'l1-flux',
      task: true,
      body: (
        <>
          <p>Engineers measure the field with two quantities:</p>
          <ul className="defs">
            <li><b>Magnetic flux φ</b>: the total “amount” of field passing through an area. Unit: weber (Wb).</li>
            <li><b>Flux density B</b>: flux per square metre, <M>B = φ / A</M>. Unit: tesla (T = Wb/m²).</li>
          </ul>
          <p>In a DC machine, φ means the <b>flux per pole</b>. You’ll see it in every machine equation.</p>
        </>
      ),
      Figure: WorkedExample,
      figureProps: {
        given: <>A pole face of area 0.04 m² carries a flux of 20 mWb. Find B.</>,
        steps: [
          <>Write what you know: φ = 20 mWb = 0.020 Wb, A = 0.04 m².</>,
          <>Use <M>B = φ / A</M>.</>,
          <><M>B = 0.020 / 0.04 = 0.5 T</M>. This is a typical air-gap flux density for a DC machine.</>,
        ],
      },
    },

    {
      narration: 'l1-notation',
      task: true,
      body: (
        <>
          <p>Soon we’ll look <b>straight down a wire</b>, so the current flows either toward you or away from you. How do we draw that on a flat screen?</p>
          <p>Picture the current as an arrow. Flip it both ways and see what your eye would see.</p>
        </>
      ),
      Figure: DotCross,
      after: (
        <Callout kind="remember">
          <b>⊙</b> (dot) = current coming <b>out of</b> the screen, toward you. <b>⊗</b> (cross) = current going <b>into</b> the screen, away from you.
        </Callout>
      ),
    },

    {
      narration: 'l1-oersted',
      task: true,
      body: (
        <>
          <p>In 1820 Hans Christian Ørsted found that a <b>current-carrying wire makes its own magnetic field</b>.</p>
          <p>
            Here we look down a wire with compasses around it. With the current off they all point to <b>Earth’s north</b> (the small arrow).
            Switch the current on, <b>⊙ out</b> and <b>⊗ in</b>, and watch them swing.
          </p>
        </>
      ),
      Figure: OerstedWire,
      after: <p className="muted">The field forms circles around the wire. Reversing the current reverses the circles.</p>,
    },

    {
      narration: 'l1-grip',
      task: true,
      body: (
        <>
          <p>
            Which way do the circles go? You don’t need to memorise it. Use the <b>right-hand grip rule</b>: grip the wire with your right
            hand, <b>thumb along the current</b>. Your <b>curled fingers</b> show the direction of the field.
          </p>
          <p>Pick a current direction, make your prediction, then check it. Do both directions.</p>
        </>
      ),
      Figure: GripRule,
      after: (
        <Callout kind="ioe">
          IOE papers draw conductors as ⊙ and ⊗ (in armature slots, for example). Don’t memorise “clockwise” or “counterclockwise”: picture
          your thumb and your fingers will give you the answer.
        </Callout>
      ),
    },

    SKILL,

    {
      narration: 'l1-q-field',
      pose: 'think',
      body: <p>A compass is placed directly above the middle of the bar magnet, at the <b>?</b>. Which way does its N end point?</p>,
      Figure: MagnetQuestion,
      input: { type: 'choice', columns: 2, options: ['← toward the S end', '→ toward the N end', '↑ away from the magnet', '↓ toward the magnet'], answer: 0 },
      hint: <p>Outside the magnet, field lines go from N to S. Picture the line that arcs over the top.</p>,
      why: <p>The line leaves N (right), arcs over the top and enters S (left). Directly above the middle it points <b>toward S</b>.</p>,
    },

    {
      narration: 'l1-q-wire',
      pose: 'think',
      body: <p>The current flows <b>into</b> the screen (⊗). A compass is placed directly <b>above</b> the wire, at the <b>?</b>. Which way does its N end point?</p>,
      Figure: OerstedWire,
      figureProps: { mode: 'question', fixedDir: -1 },
      input: { type: 'choice', columns: 2, options: ['→ Right', '← Left', '↑ Away from the wire', '↓ Toward the wire'], answer: 0 },
      hint: <p>First use the grip rule to find which way the circles go. Then follow a circle over the top of the wire.</p>,
      why: (
        <p>
          Thumb into the screen → the field circles <b>clockwise</b>. Going clockwise over the top of the circle, you move to the <b>right</b>, so
          the compass points right. Field lines go <b>around</b> a wire, never straight out from it.
        </p>
      ),
    },

    {
      narration: 'l1-q-flux',
      pose: 'think',
      body: <p>A pole of area 0.06 m² carries a flux of 30 mWb. Fill in the blanks.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['B = ', '_', ' Wb ÷ 0.06 m² = ', '_', ' T']],
        tiles: ['0.03', '30', '0.5', '5', '1.8'],
        answer: ['0.03', '0.5'],
      },
      hint: <p>Convert mWb to Wb first (÷ 1000), then divide by the area.</p>,
      why: <p><M>30 mWb = 0.03 Wb</M>, so <M>B = 0.03 / 0.06 = 0.5 T</M>.</p>,
    },

    {
      narration: 'l1-q-ioe',
      pose: 'think',
      body: (
        <p>
          <b>IOE 2075 Baisakh, Q2(b) (adapted):</b> a mild-steel ring has a cross-sectional area of 6 cm², and the flux density in its air gap is 1 T.
          Fill in the flux.
        </p>
      ),
      input: {
        type: 'tiles',
        inline: true,
        template: [['A = 6 cm² = ', '_', ' m²,  φ = B × A = ', '_', ' mWb']],
        tiles: ['0.06', '0.0006', '0.006', '0.6', '6', '60'],
        answer: ['0.0006', '0.6'],
      },
      hint: <p>1 cm² = 10⁻⁴ m². Then rearrange B = φ/A to φ = B × A.</p>,
      why: <p><M>A = 6 × 10⁻⁴ = 0.0006 m²</M>, so <M>φ = 1 × 0.0006 = 0.0006 Wb = 0.6 mWb</M>.</p>,
    },

    {
      narration: 'l1-q-phi',
      retryOf: 'l1-q-flux',
      practice: true,
      pose: 'think',
      body: <p>The flux density at a pole face of area 0.025 m² is 0.8 T. What is the flux per pole?</p>,
      input: { type: 'choice', columns: 2, options: ['20 mWb', '32 mWb', '0.03 mWb', '2 mWb'], answer: 0 },
      hint: <p>Rearrange <M>B = φ / A</M> to <M>φ = B × A</M>, then convert Wb to mWb (× 1000).</p>,
      why: <p><M>φ = 0.8 × 0.025 = 0.02 Wb = 20 mWb</M>.</p>,
    },
  ],
};

/* ─────────────────────────── Lesson 2 ─────────────────────────── */
export const force = {
  id: 'force',
  title: 'The Motor Principle',
  blurb: 'Why a current in a magnetic field must move: F = BIl and Fleming’s left-hand rule.',
  steps: [
    {
      narration: 'l2-intro',
      body: (
        <>
          <p>A current has a field and a magnet has a field. Put a current-carrying conductor <b>between magnet poles</b> and the two fields interact.</p>
          <p>
            On one side of the wire the fields add (strong field), on the other they cancel (weak field). The wire is pushed from the strong side
            toward the weak side.
          </p>
          <Callout kind="ioe">
            <b>Motor principle</b> (often asked to “state”): <i>when a current-carrying conductor is placed in a magnetic field, it experiences a
            mechanical force</i>, of magnitude <M>F = BIl</M>, whose direction is given by Fleming’s left-hand rule.
          </Callout>
        </>
      ),
    },

    {
      narration: 'l2-force',
      task: true,
      body: (
        <>
          <p>For a conductor at right angles to the field:</p>
          <div className="eq"><M>F = B · I · l</M></div>
          <ul className="defs">
            <li><b>B</b> flux density (T) · <b>I</b> current (A) · <b>l</b> active length inside the field (m) · <b>F</b> in newtons</li>
          </ul>
          <p>Tune the sliders until the wire feels exactly <b>1.00 N</b>.</p>
        </>
      ),
      Figure: ForceOnWire,
      figureProps: { mode: 'sliders', target: 1 },
    },

    {
      narration: 'l2-worked',
      task: true,
      body: (
        <>
          <p>
            If the conductor makes an angle θ with the field, only the part of the field <b>perpendicular</b> to it pushes: <M>F = BIl sin θ</M>.
            At θ = 90° the force is biggest; along the field (θ = 0°) there’s no force at all.
          </p>
        </>
      ),
      Figure: WorkedExample,
      figureProps: {
        given: <>A 0.25 m conductor carries 10 A in a 0.6 T field. Find the force when it is (a) perpendicular to the field, (b) at 30° to it.</>,
        steps: [
          <>(a) θ = 90°, sin 90° = 1: <M>F = 0.6 × 10 × 0.25 = 1.5 N</M></>,
          <>(b) θ = 30°, sin 30° = 0.5: <M>F = 1.5 × 0.5 = 0.75 N</M></>,
          <>So in a motor, the conductors are always placed <b>at right angles</b> to the flux, to get the most force.</>,
        ],
      },
    },

    {
      narration: 'l2-flip',
      task: true,
      body: (
        <>
          <p>The force is always at right angles to <b>both</b> the field and the current.</p>
          <p>Flip the magnets, then reverse the current. Watch the force arrow each time.</p>
        </>
      ),
      Figure: ForceOnWire,
      figureProps: { mode: 'directions' },
      after: (
        <p className="muted">
          Start: field to the right (B →) and current out of the screen (⊙) push the wire <b>up</b>. Each flip reverses the force. Flip both and the
          force goes back to where it started.
        </p>
      ),
    },

    {
      narration: 'l2-fleming',
      task: true,
      body: (
        <>
          <p>
            <b>Fleming’s left-hand rule</b> (for motors): stretch the thumb, first finger and second finger of your <b>left</b> hand at right angles
            to each other. Tap each card.
          </p>
        </>
      ),
      Figure: FlipCards,
      figureProps: {
        cards: [
          { icon: '☝️', front: 'First finger', back: 'Field (N → S)' },
          { icon: '✌️', front: 'seCond finger', back: 'Current (+ → −)' },
          { icon: '👍', front: 'thuMb', back: 'Motion (force on conductor)' },
          { icon: '✋', front: 'Right hand?', back: 'Fleming’s RIGHT-hand rule is for generators (induced EMF). Motors use the LEFT hand.' },
        ],
      },
      after: <FlemingAxes />,
    },

    SKILL,

    {
      narration: 'l2-q-ioe',
      pose: 'think',
      body: (
        <p>
          <b>IOE 2073 Chaitra and 2069 Bhadra</b> both ask you to “explain the working principle of a DC motor”. Which statement is that principle?
        </p>
      ),
      input: {
        type: 'choice',
        options: [
          'A current-carrying conductor placed in a magnetic field experiences a mechanical force',
          'A conductor moving through a magnetic field has an EMF induced in it',
          'A changing current in one coil induces an EMF in a nearby coil',
          'Unlike magnetic poles repel each other',
        ],
        answer: 0,
      },
      hint: <p>A motor turns electrical input into motion. Which statement starts with a current and ends with a force?</p>,
      why: (
        <p>
          The motor principle is the <b>force on a current-carrying conductor</b>, <M>F = BIl</M>, with direction from Fleming’s left-hand rule. The second
          option is the generator principle, and the third is mutual induction (the transformer).
        </p>
      ),
    },

    {
      narration: 'l2-q-scale',
      pose: 'think',
      body: <p>You <b>double</b> the current and <b>halve</b> the flux density. What happens to the force on the conductor?</p>,
      input: { type: 'choice', options: ['It doubles', 'It halves', 'It stays the same', 'It becomes four times bigger'], answer: 2 },
      hint: <p>F = B·I·l. Multiply I by 2 and B by ½.</p>,
      why: <p><M>(2I)(½B)l = BIl</M>. The changes cancel, so the force <b>stays the same</b>.</p>,
    },

    {
      narration: 'l2-q-calc',
      variant: {
        body: <p>A 0.2 m conductor carries 6 A at right angles to a 0.5 T field. Fill in the blanks.</p>,
        input: {
          type: 'tiles',
          inline: true,
          template: [['F = ', '_', ' T × ', '_', ' A × 0.2 m'], ['so the force is ', '_', ' N.']],
          tiles: ['0.06', '0.6', '0.5', '6', '5'],
          answer: ['0.5', '6', '0.6'],
        },
        hint: <p>Put B and I in the blanks, then multiply 0.5 × 6 × 0.2.</p>,
        why: <p><M>F = 0.5 × 6 × 0.2 = 0.6 N</M>.</p>,
      },
      pose: 'think',
      body: <p>A 0.1 m conductor carries 4 A at right angles to a 0.5 T field. Fill in the blanks.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['F = ', '_', ' T × ', '_', ' A × 0.1 m'], ['so the force is ', '_', ' N.']],
        tiles: ['0.02', '0.2', '0.5', '2', '4'],
        answer: ['0.5', '4', '0.2'],
      },
      hint: <p>Put B and I in the blanks, then multiply 0.5 × 4 × 0.1.</p>,
      why: <p><M>F = 0.5 × 4 × 0.1 = 0.2 N</M>.</p>,
    },

    {
      narration: 'l2-q-flip',
      pose: 'think',
      body: <p>The magnets are flipped (field points <b>left</b>) <b>and</b> the current flows <b>into</b> the screen. Which way is the wire pushed?</p>,
      Figure: ForceOnWire,
      figureProps: { mode: 'question', config: { flip: true, cur: -1 } },
      input: { type: 'choice', columns: 2, options: ['Up ↑', 'Down ↓', 'Left ←', 'Right →'], answer: 0 },
      hint: <p>Each flip reverses the force once. What do two reversals do?</p>,
      why: <p>Field right + current out → up. Flipping the field gives down; reversing the current flips it back to <b>up</b>.</p>,
    },

    {
      narration: 'l2-q-angle',
      variant: {
        body: <p>A 0.5 m conductor carrying 8 A lies at <b>30°</b> to a 0.6 T field. What is the force on it?</p>,
        input: { type: 'choice', columns: 2, options: ['1.2 N', '2.4 N', '2.08 N', '0.6 N'], answer: 0 },
        why: <p><M>F = 0.6 × 8 × 0.5 × sin 30° = 2.4 × 0.5 = 1.2 N</M>. (2.08 N comes from using cos 30° by mistake.)</p>,
      },
      pose: 'think',
      body: <p>A 0.5 m conductor carrying 5 A lies at <b>30°</b> to a 0.8 T field. What is the force on it?</p>,
      input: { type: 'choice', columns: 2, options: ['2 N', '1 N', '1.73 N', '0 N'], answer: 1 },
      hint: <p>Use F = BIl sin θ, with sin 30° = 0.5.</p>,
      why: <p><M>F = 0.8 × 5 × 0.5 × sin 30° = 2 × 0.5 = 1 N</M>.</p>,
    },
  ],
};

/* ─────────────────────────── Lesson 3 ─────────────────────────── */
export const spin = {
  id: 'spin',
  title: 'From Push to Spin',
  blurb: 'A coil in a field, torque, the dead spot, and why we need a commutator.',
  steps: [
    {
      narration: 'l3-loop',
      body: (
        <>
          <p>
            Bend the conductor into a <b>coil</b>. Current goes out of the screen on one side (⊙) and back in on the other (⊗). The two sides feel
            equal and <b>opposite</b> forces, and together they twist the coil about its axle. That twist is a <b>torque</b>.
          </p>
          <p>Drag the coil around and watch the torque meter.</p>
        </>
      ),
      Figure: LoopTorque,
      after: (
        <p className="muted">
          The forces never change size, but their <b>lever arm</b> (dashed orange) does. Torque = force × perpendicular distance from the axle.
        </p>
      ),
    },

    {
      narration: 'l3-zero',
      task: true,
      body: <p>Rotate the coil to a position where the torque is <b>zero</b>.</p>,
      Figure: LoopTorque,
      figureProps: { goal: 'zero' },
    },

    {
      narration: 'l3-torque-eq',
      task: true,
      body: (
        <>
          <p>
            For a coil of <b>N</b> turns, area <b>A</b> (length l × width w), carrying current <b>I</b>, with its plane at angle θ to the field, each
            side feels <M>F = NBIl</M> with lever arm <M>(w/2) cos θ</M>. Two sides give:
          </p>
          <div className="eq"><M>τ = N·B·I·A·cos θ</M></div>
          <p className="muted">Maximum when the coil plane is along the field (θ = 0°), zero when it stands across the field (θ = 90°).</p>
        </>
      ),
      Figure: WorkedExample,
      figureProps: {
        given: <>A 50-turn coil, 0.1 m × 0.05 m, carries 4 A in a 0.5 T field. Find the maximum torque and the torque at θ = 60°.</>,
        steps: [
          <>Area: <M>A = 0.1 × 0.05 = 0.005 m²</M></>,
          <>Maximum (cos 0° = 1): <M>τ = 50 × 0.5 × 4 × 0.005 = 0.5 N·m</M></>,
          <>At 60° (cos 60° = 0.5): <M>τ = 0.5 × 0.5 = 0.25 N·m</M></>,
        ],
      },
    },

    {
      narration: 'l3-q-graph',
      checkin: true,
      pose: 'think',
      body: (
        <p>
          Here is the torque on a single coil as it turns, plotted against θ. A negative value means the torque twists the coil the other way. Mark
          the <b>first</b> angle after 0° where the coil feels <b>no</b> torque.
        </p>
      ),
      Figure: TorqueGraph,
      input: { type: 'figure', complete: (v) => v != null, correct: (v) => v.a === 90 || v.a === 270, reveal: () => ({ a: 90 }) },
      hint: <p>Zero torque is where the curve crosses the 0 line.</p>,
      why: <p><M>τ = NBIA cos θ</M> is zero at <b>90°</b>, when the coil stands across the field and the forces have no lever arm.</p>,
    },

    {
      narration: 'l3-stuck',
      task: true,
      body: <p>Let’s see if one coil can keep turning on its own. It starts flat, at maximum torque. Press <b>Release</b>.</p>,
      Figure: LoopSim,
      figureProps: { goal: 'settle' },
    },

    {
      narration: 'l3-why-stuck',
      body: (
        <>
          <p>It swung past upright, rocked back and forth, and stopped. Here’s why:</p>
          <ul className="defs">
            <li>The ⊙ side is <b>always</b> pushed up and the ⊗ side <b>always</b> down.</li>
            <li>Before upright, that twists the coil forward. After upright, the same forces twist it <b>backward</b>.</li>
            <li>So the coil just oscillates about the upright position (the <b>neutral position</b>) until friction stops it there.</li>
          </ul>
          <p>To keep it turning, the current in the coil must <b>reverse every half turn</b>.</p>
        </>
      ),
      Figure: LoopTorque,
    },

    {
      narration: 'l3-commutator',
      task: true,
      body: (
        <>
          <p>
            A <b>commutator</b> does the reversing automatically. It’s a copper ring split into segments that turns with the coil. Two fixed carbon{' '}
            <b>brushes</b> press on it. As the coil passes upright, each brush slides onto the other segment, so the coil current reverses.
          </p>
          <p>The commutator is on. Release the coil and let it make three full turns.</p>
        </>
      ),
      Figure: LoopSim,
      figureProps: { commutatorAvailable: true, startCommutator: true, goal: 'spin' },
      after: (
        <p className="muted">
          Watch the side next to the N pole: whichever side is there, its current always flows the same way, so it is always pushed the same way.
          The torque never reverses. This is called <b>unidirectional torque</b>.
        </p>
      ),
    },

    {
      narration: 'l3-many-coils',
      body: (
        <>
          <p>A single coil still has two weaknesses: its torque pulses from maximum to zero twice per turn, and if it stops exactly upright it can’t start again.</p>
          <p>
            Real machines put <b>many coils</b> in slots all around the armature, each connected to its own pair of commutator segments. At every
            instant most coils are near their best angle, so the torque is <b>smooth</b> and there’s no dead spot.
          </p>
          <Callout kind="remember">More coils and more commutator segments give a smoother torque (and, in a generator, a smoother DC voltage).</Callout>
        </>
      ),
    },

    SKILL,

    {
      narration: 'l3-q-stuck',
      pose: 'think',
      body: <p>Without a commutator, a single coil rocks and stops. Why?</p>,
      input: {
        type: 'choice',
        options: ['Friction always beats the magnetic force', 'Past upright, the same forces twist it backwards', 'The magnet loses strength', 'The current stops once it moves'],
        answer: 1,
      },
      hint: <p>Do the force directions on each side ever change without a commutator?</p>,
      why: <p>Each side’s force keeps the same direction, so after upright the torque reverses and pulls the coil back.</p>,
    },

    {
      narration: 'l3-q-twice',
      pose: 'think',
      body: <p>Fill in the blanks about a two-segment commutator.</p>,
      input: {
        type: 'tiles',
        inline: true,
        template: [['The coil current reverses ', '_', ' times per revolution, each time the coil is ', '_', '.']],
        tiles: ['1', '2', '4', 'flat', 'upright'],
        answer: ['2', 'upright'],
      },
      hint: <p>How many times does the coil pass upright in one full turn?</p>,
      why: <p>It passes upright at 90° and 270°, so the current reverses <b>twice per revolution</b>.</p>,
    },

    {
      narration: 'l3-q-coils',
      pose: 'think',
      body: <p>Why does a practical DC motor use many coils and many commutator segments?</p>,
      input: {
        type: 'choice',
        options: ['To give a smooth, steady torque with no dead spot', 'To make the motor spin in both directions at once', 'To remove the need for brushes', 'To reduce the flux needed'],
        answer: 0,
      },
      hint: <p>Think about the torque curve of one coil: it drops to zero twice per turn.</p>,
      why: <p>With coils spread around the armature, some are always near maximum torque, so the total torque is nearly constant and the motor can self-start from any position.</p>,
    },

    {
      narration: 'l3-q-ioe',
      pose: 'think',
      body: (
        <p>
          <b>IOE 2079 Jestha:</b> “How is unidirectional torque produced in a DC machine when the armature is supplied from a DC source?” Pick the
          best answer.
        </p>
      ),
      input: {
        type: 'choice',
        options: [
          'The commutator reverses each coil’s current as it moves to the next pole, so conductors under a given pole always carry current the same way',
          'The DC supply reverses its polarity every half turn',
          'The field winding reverses its polarity every half turn',
          'The brushes rotate with the armature and keep the coil current fixed',
        ],
        answer: 0,
      },
      hint: <p>The supply and the poles stay fixed. Which part switches the coil current?</p>,
      why: (
        <p>
          The <b>commutator and brushes</b> reverse the current in each coil as it passes the neutral position. Every conductor under a N pole carries
          current one way and every conductor under a S pole the other way, so all the forces turn the armature in the same direction.
        </p>
      ),
    },

    {
      narration: 'l3-q-tau',
      pose: 'think',
      body: <p>A 100-turn coil, 0.08 m × 0.05 m, carries 2 A in a 0.4 T field. Its plane is at <b>60°</b> to the field. What torque acts on it?</p>,
      input: { type: 'choice', columns: 2, options: ['0.16 N·m', '0.32 N·m', '0.28 N·m', '0.016 N·m'], answer: 0 },
      hint: <p>Find A = l × w first, then use <M>τ = N·B·I·A·cos θ</M> with cos 60° = 0.5.</p>,
      why: <p><M>A = 0.004 m²</M>, <M>NBIA = 100 × 0.4 × 2 × 0.004 = 0.32 N·m</M> (the maximum), and at 60° <M>τ = 0.32 × 0.5 = 0.16 N·m</M>. Using sin 60° by mistake gives 0.28 N·m.</p>,
      variant: {
        body: <p>A 200-turn coil, 0.1 m × 0.04 m, carries 1.5 A in a 0.5 T field. Its plane is at <b>30°</b> to the field. What torque acts on it?</p>,
        input: { type: 'choice', columns: 2, options: ['0.52 N·m', '0.30 N·m', '0.60 N·m', '0.052 N·m'], answer: 0 },
        hint: <p>Find A = l × w first, then use <M>τ = N·B·I·A·cos θ</M> with cos 30° ≈ 0.866.</p>,
        why: <p><M>A = 0.004 m²</M>, <M>NBIA = 200 × 0.5 × 1.5 × 0.004 = 0.6 N·m</M>, and at 30° <M>τ = 0.6 × 0.866 ≈ 0.52 N·m</M>. Using sin 30° gives 0.30 N·m.</p>,
      },
    },

    {
      narration: 'l3-q-flash',
      flashback: true,
      pose: 'think',
      body: <p>Flashback to the motor principle: each side of a coil is 0.2 m long and carries 5 A at right angles to a 0.4 T field. What force acts on each side?</p>,
      input: { type: 'choice', columns: 2, options: ['0.4 N', '0.04 N', '4 N', '0.8 N'], answer: 0 },
      hint: <p>Use <M>F = BIl</M> for one side.</p>,
      why: <p><M>F = 0.4 × 5 × 0.2 = 0.4 N</M> on each side, in opposite directions. That pair of forces is what makes the torque.</p>,
      variant: {
        body: <p>Flashback to the motor principle: each side of a coil is 0.25 m long and carries 4 A at right angles to a 0.6 T field. What force acts on each side?</p>,
        input: { type: 'choice', columns: 2, options: ['0.6 N', '0.06 N', '6 N', '1.2 N'], answer: 0 },
        why: <p><M>F = 0.6 × 4 × 0.25 = 0.6 N</M> on each side, in opposite directions.</p>,
      },
    },
  ],
};
