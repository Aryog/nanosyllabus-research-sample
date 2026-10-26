import { D, M, solve, video } from './kit.jsx';

/*
  Past Questions: real IOE numericals the chapters did not already use, solved
  on the whiteboard one at a time (read → data → find → idea → steps → answer →
  trap), mixed across patterns and ordered easy → hard. Each pauses once to let
  the learner predict the key step. Then a recap video that quizzes every
  chapter once more (spaced retrieval).
*/

export const pastQuestions = [
  solve({
    title: 'Shunt motor: speed when the load rises',
    paper: '2075 Baishakh',
    read: 'A 1.25 kilowatt, 250 volt DC shunt motor on no load runs at 1000 rpm. Armature resistance 0.2 ohm, shunt field 250 ohm. Find the speed when it is loaded and draws 50 amperes.',
    question: <>A <D>1.25 kW</D>, <D>250 V</D> DC shunt motor on no load runs at <D>1000 rpm</D>. <D>Ra = 0.2 Ω</D>, <D>Rsh = 250 Ω</D>. Find its speed when loaded and drawing <D>50 A</D>. (The 1.25 kW is read as the no-load input.)</>,
    given: [
      { node: <>V = 250 V, Ra = 0.2 Ω, Rsh = 250 Ω</>, say: 'V is 250 volts, Ra 0.2 ohm, Rsh 250 ohm' },
      { node: <>No load: input 1.25 kW ⟹ IL₀ = 1250/250 = 5 A, N₀ = 1000 rpm</>, say: 'at no load it takes 1.25 kilowatts, so the line current is 1250 over 250, which is 5 amperes, at 1000 rpm' },
      { node: <>Loaded: IL = 50 A, N = ?</>, say: 'loaded, the line current is 50 amperes' },
    ],
    find: { node: <>speed N at 50 A</>, say: 'They want the speed at 50 amperes.' },
    idea: { node: <>Shunt ⟹ φ fixed ⟹ N₂/N₁ = Eb₂/Eb₁</>, say: 'Shunt motor, so the flux stays constant. Then speed is simply proportional to the back EMF.' },
    steps: [
      { node: <>Ish = 250/250 = <b>1 A</b></>, say: 'First the field current: 250 over 250 is 1 ampere.' },
      {
        node: <>Ia₀ = 5 − 1 = 4 A,  Ia = 50 − 1 = <b>49 A</b></>,
        say: 'Subtract it from both line currents.',
        ask: { tag: 'Predict the step', q: 'The 5 A and 50 A are line currents. What is the loaded armature current?', options: ['49 A', '50 A', '51 A'], answer: 0, why: 'In a shunt motor IL = Ia + Ish, so Ia = 50 − 1 = 49 A.' },
      },
      { node: <>Eb₀ = 250 − 4 × 0.2 = 249.2 V</>, say: 'Back EMF at no load: 250 minus 4 times 0.2, which is 249.2 volts.' },
      { node: <>Eb = 250 − 49 × 0.2 = 240.2 V</>, say: 'Loaded: 250 minus 49 times 0.2, which is 240.2 volts.' },
      { node: <>N = 1000 × 240.2 / 249.2</>, say: 'Speed scales with back EMF: 1000 times 240.2 over 249.2.' },
    ],
    answer: { node: <>N ≈ 964 rpm</>, say: 'About 964 rpm. A shunt motor slows only a little under load.' },
    trap: { node: <>Trap: taking Eb₀ = V = 250 V (ignoring the no-load IaRa drop) gives 960.8 rpm. Use Eb₀ = 249.2 V.</>, say: 'The trap: taking the no-load back EMF as the full 250 volts gives 960.8 rpm. Work out Eb at no load too.' },
  }),

  solve({
    title: 'Series motor: extra resistance, same current',
    paper: '2070 Bhadra',
    read: 'A DC series motor with 1 ohm between its terminals runs at 1000 rpm on 250 volts, taking 20 amperes. Find its speed with 6 ohms added in series, taking the same current.',
    question: <>A DC series motor of resistance <D>1 Ω</D> between terminals runs at <D>1000 rpm</D> at <D>250 V</D> with a current of <D>20 A</D>. Find its speed when connected in series with a <D>6 Ω</D> resistance, taking the same current.</>,
    given: [
      { node: <>V = 250 V, R = 1 Ω, I = 20 A, N₁ = 1000 rpm</>, say: '250 volts, 1 ohm, 20 amperes, 1000 rpm' },
      { node: <>Added: 6 Ω in series, same 20 A</>, say: 'then 6 ohms added, same current' },
    ],
    find: { node: <>N₂</>, say: 'Find the new speed.' },
    idea: { node: <>Same I ⟹ same series flux ⟹ N₂/N₁ = Eb₂/Eb₁</>, say: 'In a series motor the flux follows the current. Same current means same flux, so speed follows back EMF.' },
    steps: [
      { node: <>Eb₁ = 250 − 20 × 1 = 230 V</>, say: 'Before: 250 minus 20 times 1 is 230 volts.' },
      {
        node: <>Eb₂ = 250 − 20 × (1 + 6) = 110 V</>,
        say: 'After: the resistance is now 7 ohms in total.',
        ask: { tag: 'Predict the step', q: 'What total resistance does the 20 A flow through now?', options: ['7 Ω', '6 Ω', '5 Ω'], answer: 0, why: 'The motor’s own 1 Ω plus the added 6 Ω.' },
      },
      { node: <>N₂ = 1000 × 110 / 230</>, say: 'So the speed is 1000 times 110 over 230.' },
    ],
    answer: { node: <>N₂ ≈ 478 rpm</>, say: 'About 478 rpm.' },
    trap: { node: <>Only the 6 Ω added is wrong: use 1 + 6 = 7 Ω.</>, say: 'Remember to add the motor’s own resistance to the extra one.' },
  }),

  solve({
    title: 'Shunt motor: added resistance and less load',
    paper: '2073 Bhadra',
    marks: '8 marks',
    read: 'A 240 volt DC shunt motor, armature resistance 0.4 ohm, field 120 ohm, runs at 1500 rpm drawing 54 amperes. 0.1 ohm is added in series with the armature and the load torque is reduced by 20 percent. Find the new speed.',
    question: <>A <D>240 V</D> DC shunt motor has <D>Ra = 0.4 Ω</D> and <D>Rsh = 120 Ω</D>. It runs at <D>1500 rpm</D> drawing <D>54 A</D>. A <D>0.1 Ω</D> resistance is added in series with the armature and the load torque is reduced by <D>20%</D>. Calculate the new speed.</>,
    given: [
      { node: <>V = 240 V, Ra = 0.4 Ω, Rsh = 120 Ω</>, say: '240 volts, Ra 0.4, Rsh 120' },
      { node: <>IL₁ = 54 A, N₁ = 1500 rpm</>, say: '54 amperes at 1500 rpm' },
      { node: <>+0.1 Ω in armature, torque × 0.8</>, say: 'then 0.1 ohm added, and torque down 20 percent' },
    ],
    find: { node: <>N₂</>, say: 'Find the new speed.' },
    idea: { node: <>φ fixed ⟹ Ta ∝ Ia ⟹ Ia₂ = 0.8 Ia₁</>, say: 'Shunt motor, flux fixed, so torque is proportional to armature current. Twenty percent less torque means twenty percent less current.' },
    steps: [
      { node: <>Ish = 240/120 = 2 A,  Ia₁ = 54 − 2 = 52 A</>, say: 'Field current 2 amperes, so Ia one is 52 amperes.' },
      { node: <>Eb₁ = 240 − 52 × 0.4 = 219.2 V</>, say: 'Eb one: 240 minus 52 times 0.4, 219.2 volts.' },
      {
        node: <>Ia₂ = 0.8 × 52 = 41.6 A</>,
        say: 'Now the new armature current.',
        ask: { tag: 'Predict the step', q: 'Load torque falls by 20% with constant flux. The new Ia is…', options: ['41.6 A', '52 A', '43.2 A'], answer: 0, why: 'Ta ∝ Ia, so Ia₂ = 0.8 × 52 = 41.6 A. (43.2 A comes from wrongly using the 54 A line current.)' },
      },
      { node: <>Eb₂ = 240 − 41.6 × (0.4 + 0.1) = 219.2 V</>, say: 'Eb two: 240 minus 41.6 times 0.5, also 219.2 volts.' },
      { node: <>N₂ = 1500 × 219.2/219.2</>, say: 'The two back EMFs are equal.' },
    ],
    answer: { node: <>N₂ = 1500 rpm (unchanged)</>, say: 'So the speed stays at 1500 rpm. The extra resistance exactly cancels the lighter load.' },
    trap: { node: <>Don’t assume the speed must drop. Calculate both Eb values.</>, say: 'Never guess the direction. Work out both back EMFs.' },
  }),

  solve({
    title: 'Shunt motor: one resistor, two loads',
    paper: '2071 Magh',
    marks: '4 + 4 marks',
    read: 'A 240 volt shunt motor, armature 0.4 ohm, field 120 ohm, draws 27 amperes at half load and runs at 600 rpm. 1 ohm is put in series with the armature. Find the speed at half-load torque, and at full-load torque.',
    question: <>A <D>240 V</D> DC shunt motor has <D>Ra = 0.4 Ω</D>, <D>Rsh = 120 Ω</D>. It draws <D>27 A</D> at <D>half load</D> at <D>600 rpm</D>. <D>1 Ω</D> is connected in series with the armature. Find the new speed (i) at half-load torque, (ii) at full-load torque.</>,
    given: [
      { node: <>V = 240 V, Ra = 0.4 Ω, Rsh = 120 Ω</>, say: '240 volts, Ra 0.4, Rsh 120' },
      { node: <>Half load: IL = 27 A, N₁ = 600 rpm</>, say: '27 amperes at 600 rpm, half load' },
      { node: <>Added R = 1 Ω</>, say: 'and 1 ohm added' },
    ],
    find: { node: <>N at half-load and at full-load torque</>, say: 'Two speeds: one at half-load torque, one at full-load torque.' },
    idea: { node: <>φ fixed: full-load torque ⟹ Ia doubles</>, say: 'Flux is fixed, so full-load torque needs twice the half-load armature current.' },
    steps: [
      { node: <>Ia = 27 − 2 = 25 A,  Eb₁ = 240 − 25 × 0.4 = 230 V</>, say: 'Ia is 25 amperes, and Eb one is 230 volts.' },
      { node: <>(i) Eb = 240 − 25 × 1.4 = 205 V → N = 600 × 205/230</>, say: 'Case one, same 25 amperes through 1.4 ohms: Eb is 205 volts.' },
      {
        node: <>(ii) Ia = 2 × 25 = 50 A,  Eb = 240 − 50 × 1.4 = 170 V</>,
        say: 'Case two, full-load torque.',
        ask: { tag: 'Predict the step', q: 'At full-load torque (twice half-load), what is Ia?', options: ['50 A', '54 A', '25 A'], answer: 0, why: 'Ta ∝ Ia with fixed φ, so Ia doubles from 25 A to 50 A. Doubling the 27 A line current (54 A) is the trap.' },
      },
      { node: <>N = 600 × 170/230</>, say: 'Then speed is 600 times 170 over 230.' },
    ],
    answer: { node: <>(i) ≈ 534.8 rpm  ·  (ii) ≈ 443.5 rpm</>, say: 'About 534.8 rpm at half-load torque and 443.5 rpm at full-load torque.' },
    trap: { node: <>Double the armature current (25 → 50 A), not the line current.</>, say: 'Double the armature current, not the line current.' },
  }),

  solve({
    title: 'Generator efficiency',
    paper: '2083 Baishakh (ECM)',
    marks: '5 marks',
    read: 'A shunt generator supplies 96 amperes at 200 volts. Armature 0.1 ohm, field 50 ohm, iron and friction losses 2500 watts. Find the EMF generated and the commercial efficiency.',
    question: <>A shunt generator supplies <D>96 A</D> at <D>200 V</D>. The armature and shunt field resistances are <D>0.1 Ω</D> and <D>50 Ω</D>. Iron and friction losses are <D>2500 W</D>. Find (a) the EMF generated, (b) the commercial efficiency.</>,
    given: [
      { node: <>IL = 96 A, V = 200 V</>, say: '96 amperes at 200 volts' },
      { node: <>Ra = 0.1 Ω, Rsh = 50 Ω, iron + friction = 2500 W</>, say: 'Ra 0.1, Rsh 50, and 2500 watts of iron and friction' },
    ],
    find: { node: <>E and η</>, say: 'Find the EMF and the efficiency.' },
    idea: { node: <>Generator: Ia = IL + Ish · η = output / (output + all losses)</>, say: 'In a generator the armature feeds both the load and the field. Efficiency is output over output plus every loss.' },
    steps: [
      { node: <>Ish = 200/50 = 4 A,  Ia = 96 + 4 = 100 A</>, say: 'Field current 4 amperes, so the armature carries 100.' },
      { node: <>E = 200 + 100 × 0.1 = 210 V</>, say: 'EMF is terminal voltage plus the armature drop: 210 volts.' },
      {
        node: <>Losses = 100² × 0.1 + 200 × 4 + 2500 = 1000 + 800 + 2500 = 4300 W</>,
        say: 'Now add up every loss.',
        ask: { tag: 'Predict the step', q: 'Which losses must you add?', options: ['Armature Cu + field Cu + iron & friction', 'Only iron & friction', 'Only armature Cu'], answer: 0, why: 'All three: 1000 W + 800 W + 2500 W = 4300 W.' },
      },
      { node: <>η = 19200 / (19200 + 4300)</>, say: 'Output is 200 times 96, 19200 watts.' },
    ],
    answer: { node: <>E = 210 V  ·  η ≈ 81.7%</>, say: 'EMF 210 volts, efficiency about 81.7 percent.' },
    trap: { node: <>Forgetting the field loss gives 84.6%.</>, say: 'Forget the field copper loss and you get 84.6 percent, which is wrong.' },
  }),

  solve({
    title: 'Pump load: torque ∝ speed²',
    paper: '2068 Bhadra',
    read: 'A 200 volt shunt motor drives a centrifugal pump whose torque is proportional to the square of speed. It draws 50 amperes at 1000 rpm. Armature 0.1 ohm, field 100 ohm. What resistance in the armature circuit reduces the speed to 800 rpm?',
    question: <>A <D>200 V</D> DC shunt motor drives a centrifugal pump where <D>torque ∝ speed²</D>. It draws <D>50 A</D> at <D>1000 rpm</D>. <D>Ra = 0.1 Ω</D>, <D>Rsh = 100 Ω</D>. What resistance must be inserted in the armature circuit to reduce the speed to <D>800 rpm</D>?</>,
    given: [
      { node: <>V = 200 V, Ra = 0.1 Ω, Rsh = 100 Ω</>, say: '200 volts, Ra 0.1, Rsh 100' },
      { node: <>IL₁ = 50 A at N₁ = 1000 rpm → N₂ = 800 rpm</>, say: '50 amperes at 1000, down to 800 rpm' },
      { node: <>Load torque ∝ N²</>, say: 'and torque goes as speed squared' },
    ],
    find: { node: <>extra armature resistance R</>, say: 'Find the extra armature resistance.' },
    idea: { node: <>Ta ∝ Ia (φ fixed) and Ta ∝ N² ⟹ Ia ∝ N²</>, say: 'Flux is fixed, so armature current follows torque, and torque follows speed squared.' },
    steps: [
      { node: <>Ish = 2 A,  Ia₁ = 48 A,  Eb₁ = 200 − 48 × 0.1 = 195.2 V</>, say: 'Ia one is 48 amperes and Eb one is 195.2 volts.' },
      {
        node: <>Ia₂ = 48 × (800/1000)² = 30.72 A</>,
        say: 'The pump needs less torque at lower speed.',
        ask: { tag: 'Predict the step', q: 'Torque ∝ N². At 800 rpm, the armature current becomes…', options: ['48 × 0.8² = 30.72 A', '48 × 0.8 = 38.4 A', '48 A (same)'], answer: 0, why: 'Ia ∝ T ∝ N², so Ia₂ = 48 × 0.64 = 30.72 A.' },
      },
      { node: <>Eb₂ = 195.2 × 0.8 = 156.16 V</>, say: 'Eb is proportional to speed: 156.16 volts.' },
      { node: <>0.1 + R = (200 − 156.16)/30.72 = 1.427 Ω</>, say: 'Total armature resistance is 200 minus 156.16, over 30.72.' },
    ],
    answer: { node: <>R ≈ 1.33 Ω</>, say: 'Subtract Ra: about 1.33 ohms.' },
    trap: { node: <>With a constant-torque load (2072 Ashwin) Ia stays 48 A and R ≈ 0.81 Ω.</>, say: 'Compare: with constant torque the answer would be 0.81 ohm. Read the load type carefully.' },
  }),

  solve({
    title: 'Series motor: half the torque',
    paper: '2065 Chaitra',
    read: 'A 220 volt DC series motor runs at 800 rpm taking 100 amperes. Total resistance 0.1 ohm. Assuming no saturation, at what speed does it run when developing half the torque?',
    question: <>A <D>220 V</D> DC series motor is running at <D>800 rpm</D> and draws <D>100 A</D>. Total resistance is <D>0.1 Ω</D>. Calculate the speed when developing <D>half the torque</D> (unsaturated).</>,
    given: [
      { node: <>V = 220 V, R = 0.1 Ω</>, say: '220 volts, total resistance 0.1 ohm' },
      { node: <>I₁ = 100 A, N₁ = 800 rpm, T₂ = T₁/2</>, say: '100 amperes at 800 rpm, then half the torque' },
    ],
    find: { node: <>N₂</>, say: 'Find the new speed.' },
    idea: { node: <>Series, unsaturated: φ ∝ I ⟹ T ∝ I² and N ∝ Eb/I</>, say: 'In a series motor flux follows current, so torque goes as current squared, and speed as back EMF over current.' },
    steps: [
      {
        node: <>I₂ = 100/√2 = 70.7 A</>,
        say: 'Half the torque.',
        ask: { tag: 'Predict the step', q: 'T ∝ I². Half the torque needs a current of…', options: ['100/√2 ≈ 70.7 A', '50 A', '25 A'], answer: 0, why: 'I₂² = I₁²/2, so I₂ = 100/√2 ≈ 70.7 A. Halving the current would quarter the torque.' },
      },
      { node: <>Eb₁ = 220 − 100 × 0.1 = 210 V,  Eb₂ = 220 − 70.7 × 0.1 = 212.9 V</>, say: 'Back EMFs: 210 volts and 212.9 volts.' },
      { node: <>N₂ = 800 × (212.9/210) × (100/70.7)</>, say: 'Speed: 800 times the Eb ratio, times the flux ratio 100 over 70.7.' },
    ],
    answer: { node: <>N₂ ≈ 1147 rpm</>, say: 'About 1147 rpm. Less load, so the series motor speeds up a lot.' },
    trap: { node: <>Ignoring the change in Eb gives 1131 rpm.</>, say: 'Ignoring the change in back EMF gives 1131 rpm.' },
  }),

  solve({
    title: 'Shunt motor: resistance plus lighter load',
    paper: '2081 Ashwin (ECM)',
    marks: '6 marks',
    read: 'A 240 volt shunt motor, armature 0.4 ohm, field 120 ohm, draws 30 amperes at half load and runs at 1400 rpm. 1.2 ohms are added in series with the armature and the load torque decreases by 20 percent. Find the new speed.',
    question: <>A <D>240 V</D> DC shunt motor has <D>Ra = 0.4 Ω</D>, <D>Rsh = 120 Ω</D>. It draws <D>30 A</D> at half load at <D>1400 rpm</D>. A <D>1.2 Ω</D> resistance is added in series with the armature and the load torque is decreased by <D>20%</D>. Calculate the new speed.</>,
    given: [
      { node: <>V = 240 V, Ra = 0.4 Ω, Rsh = 120 Ω</>, say: '240 volts, 0.4 and 120 ohms' },
      { node: <>IL₁ = 30 A, N₁ = 1400 rpm</>, say: '30 amperes at 1400 rpm' },
      { node: <>+1.2 Ω, torque × 0.8</>, say: 'then 1.2 ohms added and 20 percent less torque' },
    ],
    find: { node: <>N₂</>, say: 'Find the new speed.' },
    idea: { node: <>Same recipe as 2073 Bhadra: Ia₂ = 0.8 Ia₁, then Eb ratio</>, say: 'This is the same pattern as 2073 Bhadra. Shunt, fixed flux: cut the armature current by 20 percent, then compare back EMFs.' },
    steps: [
      { node: <>Ia₁ = 30 − 2 = 28 A,  Eb₁ = 240 − 28 × 0.4 = 228.8 V</>, say: 'Ia one is 28 amperes, Eb one is 228.8 volts.' },
      { node: <>Ia₂ = 0.8 × 28 = 22.4 A</>, say: 'Ia two is 22.4 amperes.' },
      {
        node: <>Eb₂ = 240 − 22.4 × (0.4 + 1.2) = 204.16 V</>,
        say: 'Now the new back EMF.',
        ask: { tag: 'Predict the step', q: 'Through what resistance does Ia₂ flow now?', options: ['1.6 Ω', '1.2 Ω', '0.4 Ω'], answer: 0, why: 'Ra plus the added resistance: 0.4 + 1.2 = 1.6 Ω.' },
      },
      { node: <>N₂ = 1400 × 204.16/228.8</>, say: 'Speed is 1400 times 204.16 over 228.8.' },
    ],
    answer: { node: <>N₂ ≈ 1249 rpm</>, say: 'About 1249 rpm.' },
  }),

  solve({
    title: 'Series motor: resistance for a new speed and current',
    paper: '2078 Poush',
    read: 'A 240 volt series motor has total resistance 0.2 ohm. At 1800 rpm it draws 40 amperes. What resistance must be added in series to limit the speed to 2400 rpm when the current is 10 amperes?',
    question: <>A <D>240 V</D> DC series motor has a total resistance of <D>0.2 Ω</D>. At <D>1800 rpm</D> it draws <D>40 A</D>. Find the resistance to be added in series to limit the speed to <D>2400 rpm</D> when the line current is <D>10 A</D>.</>,
    given: [
      { node: <>V = 240 V, R = 0.2 Ω</>, say: '240 volts, 0.2 ohm' },
      { node: <>I₁ = 40 A, N₁ = 1800 rpm → I₂ = 10 A, N₂ = 2400 rpm</>, say: '40 amperes at 1800 rpm, then 10 amperes at 2400 rpm' },
    ],
    find: { node: <>added resistance R</>, say: 'Find the extra series resistance.' },
    idea: { node: <>Series: N ∝ Eb/I ⟹ Eb₂ = Eb₁ × (N₂/N₁) × (I₂/I₁)</>, say: 'For a series motor speed goes as back EMF over current. Rearrange to find the back EMF we need.' },
    steps: [
      { node: <>Eb₁ = 240 − 40 × 0.2 = 232 V</>, say: 'Eb one is 232 volts.' },
      {
        node: <>Eb₂ = 232 × (2400/1800) × (10/40) = 77.33 V</>,
        say: 'Now the back EMF needed.',
        ask: { tag: 'Predict the step', q: 'Eb₂ = 232 × (2400/1800) × (I₂/I₁). Which current ratio?', options: ['10/40', '40/10', '1 (same flux)'], answer: 0, why: 'N ∝ Eb/I, so Eb ∝ N × I. Eb₂ = 232 × (4/3) × (1/4) = 77.33 V.' },
      },
      { node: <>0.2 + R = (240 − 77.33)/10 = 16.27 Ω</>, say: 'The total resistance is 240 minus 77.33, over 10.' },
    ],
    answer: { node: <>R ≈ 16.07 Ω</>, say: 'Subtract the motor’s 0.2 ohm: about 16.07 ohms.' },
    trap: { node: <>Not subtracting the motor’s own 0.2 Ω gives 16.27 Ω.</>, say: 'Remember the motor already has 0.2 ohm of its own.' },
  }),

  solve({
    title: 'Boss question: series field diverter',
    paper: '2074 Bhadra',
    read: 'A 500 volt DC series motor runs at 500 rpm taking 60 amperes. Field 0.3 ohm, armature 0.2 ohm. Find the diverter resistance across the series field to raise the speed to 600 rpm, with load torque constant and no saturation.',
    question: <>A <D>500 V</D> DC series motor runs at <D>500 rpm</D> and takes <D>60 A</D>. Field resistance <D>0.3 Ω</D>, armature <D>0.2 Ω</D>. Find the resistance to be shunted across the series field so the speed rises to <D>600 rpm</D>, with <D>load torque constant</D>. Neglect saturation.</>,
    given: [
      { node: <>V = 500 V, Rse = 0.3 Ω, Ra = 0.2 Ω</>, say: '500 volts, field 0.3, armature 0.2' },
      { node: <>I₁ = 60 A, N₁ = 500 rpm → N₂ = 600 rpm, T constant</>, say: '60 amperes at 500 rpm, then 600 rpm at the same torque' },
    ],
    find: { node: <>diverter resistance Rd</>, say: 'Find the diverter resistance.' },
    idea: { node: <>Let k = fraction of Ia in the field: φ ∝ kIa, T ∝ kIa²</>, say: 'Call k the fraction of armature current that still goes through the field. Then flux is k Ia, and torque is k Ia squared.' },
    steps: [
      { node: <>Constant torque: k·Ia₂² = 60² ⟹ Ia₂ = 60/√k</>, say: 'Constant torque gives Ia two equals 60 over root k.' },
      { node: <>Eb₁ = 500 − 60 × 0.5 = 470 V,  Eb₂ = 500 − Ia₂(0.2 + 0.3k)</>, say: 'The field now drops only k times its old voltage.' },
      {
        node: <>600/500 = (Eb₂/470) × (60 / (k·Ia₂))</>,
        say: 'Write the speed ratio.',
        ask: { tag: 'Predict the step', q: 'Speed ratio for a series motor is (Eb₂/Eb₁) × (φ₁/φ₂). Here φ₂ ∝ …', options: ['k × Ia₂', 'Ia₂', 'k'], answer: 0, why: 'Only the fraction k of Ia₂ flows in the field, so φ₂ ∝ kIa₂ while φ₁ ∝ 60.' },
      },
      { node: <>Solving: k ≈ 0.696, Ia₂ ≈ 71.9 A, Eb₂ ≈ 470.6 V</>, say: 'Solving numerically, k is about 0.696, and Ia two about 71.9 amperes.' },
      { node: <>Rd·(1 − k)Ia₂ = 0.3·kIa₂ ⟹ Rd = 0.3k/(1 − k)</>, say: 'The diverter and the field share the same voltage, which gives Rd equals 0.3 k over 1 minus k.' },
    ],
    answer: { node: <>Rd ≈ 0.69 Ω</>, say: 'About 0.69 ohm. That is the hardest series-motor question IOE has set.' },
    trap: { node: <>The current is not 60 A after diverting: torque constant means kIa² stays fixed.</>, say: 'The trap is keeping the current at 60 amperes. It must rise to keep the torque.' },
  }),
].map((s) => ({ ...s, chapter: 'Past Questions' }));

/* Recap video: every chapter's key idea, quizzed once more. */
export const recap = video('The whole DC motor in 3 minutes', {
  beats: [
    { say: 'One last run through everything, from the push on a wire to efficiency.' },
    { say: 'A current-carrying conductor in a field feels F equals B I l, direction by the left-hand rule.' },
    { say: 'The commutator reverses each coil’s current every half turn, so the torque never reverses.' },
    {
      say: 'Quick recall.',
      ask: { tag: 'Recall', q: 'Armature torque Ta is proportional to…', options: ['φ × Ia', 'φ / Ia', 'Eb × Ra', 'N × φ'], answer: 0, why: 'Ta = 0.159 φ Z Ia (P/A), so Ta ∝ φIa.' },
    },
    { say: 'Spinning conductors generate a back EMF, Eb equals P phi Z N over 60 A, and V equals Eb plus Ia Ra.' },
    {
      say: 'Recall again.',
      ask: { tag: 'Recall', q: 'Why does a motor need a starter?', options: ['At standstill Eb = 0, so Ia = V/Ra is huge', 'To reverse the motor', 'To strengthen the field', 'To reduce iron loss'], answer: 0, why: 'No speed, no back EMF: only the small Ra limits the current.' },
    },
    { say: 'Speed is proportional to V minus Ia Ra, over phi. Weaken the field to go above base speed; add armature resistance to go below it.' },
    {
      say: 'And for the motor types.',
      ask: { tag: 'Recall', q: 'Which motor must never run without load?', options: ['Series', 'Shunt', 'Cumulative compound', 'Separately excited'], answer: 0, why: 'In a series motor φ ∝ Ia, so at no load φ collapses and N ∝ 1/φ runs away.' },
    },
    { say: 'Finally, efficiency is maximum when the variable copper loss equals the constant losses. That is the whole chapter.' },
  ],
  board: [
    { at: 1, kind: 'step', node: <>Force: <span className="y">F = BIl</span> · left hand F-B-I</> },
    { at: 2, kind: 'step', node: <>Commutator → <span className="y">unidirectional torque</span></> },
    { at: 3, kind: 'step', node: <>Torque: <span className="y">Ta = 0.159 φ Z Ia (P/A) = 9.55 Eb Ia / N</span></> },
    { at: 4, kind: 'step', node: <>Back EMF: <span className="y">Eb = PφZN / 60A</span> · <span className="y">V = Eb + IaRa</span></> },
    { at: 5, kind: 'step', node: <>Starting: Ia = V/Ra at rest → 3-point / 4-point starter (NVC, OLR)</> },
    { at: 6, kind: 'step', node: <>Speed: <span className="y">N ∝ (V − IaRa)/φ</span> · field ↑ above base, armature ↓ below base</> },
    { at: 7, kind: 'step', node: <>Shunt: steady speed · Series: Ta ∝ Ia², never at no load · Compound: in between</> },
    { at: 8, kind: 'step', node: <>η max when <span className="y">Ia²Ra = Wc</span></> },
  ],
});
void M;
