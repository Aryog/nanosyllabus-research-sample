// IOE Electrical Machines syllabus (vault/…/Electrical Machines/Syllabus). Only
// Unit 4, DC Motor, is built so far: its micro-topics are the journey in
// topics.jsx. The other units are listed so the learner sees where it sits.
export const syllabus = {
  subject: 'Electrical Machines',
  units: [
    {
      num: 1,
      title: 'Magnetic Circuits and Induction',
      icon: '🧲',
      topics: ['Magnetic circuits, Ohm’s law', 'Series and parallel circuits', 'Core with air gap', 'B-H curve', 'Hysteresis and eddy current loss', 'Faraday’s law', 'Force on a conductor'],
    },
    {
      num: 2,
      title: 'Transformer',
      icon: '🔌',
      topics: ['Construction', 'EMF equation', 'Ideal transformer', 'No load and load', 'Equivalent circuit and phasors', 'OC and SC tests', 'Voltage regulation', 'Losses and efficiency', 'PT and CT', 'Auto transformer', 'Three phase transformers'],
    },
    {
      num: 3,
      title: 'DC Generator',
      icon: '⚙️',
      topics: ['Construction and armature winding', 'Commutator action', 'EMF equation', 'Excitation and types', 'Characteristics', 'Losses', 'Efficiency and regulation'],
    },
    { num: 4, title: 'DC Motor', icon: '⚡', live: true },
    {
      num: 5,
      title: 'Three Phase Induction Machines',
      icon: '🌀',
      topics: ['Construction and types', 'Rotating magnetic field', 'Slip and rotor frequency', 'Torque equation', 'Torque-slip curve', 'Induction generator', 'Power stages'],
    },
    {
      num: 6,
      title: 'Three Phase Synchronous Machines',
      icon: '🔄',
      topics: ['Alternator construction', 'EMF equation, pitch and distribution factor', 'Armature reaction', 'Alternator on load', 'Synchronous motor', 'Starting methods', 'Excitation and power factor'],
    },
    {
      num: 7,
      title: 'Fractional Kilowatt Motors',
      icon: '🔧',
      topics: ['Single phase induction motor', 'Double field revolving theory', 'Split phase, capacitor motors', 'Reluctance start', 'Universal motor', 'Stepper, Schrage, servo motors'],
    },
  ],
};
