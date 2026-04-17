import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { FlaskConical, CheckCircle, Loader2, AlertCircle, Play, Eye } from 'lucide-react';

// Full chemistry content map: subtopic order 1–15, head_topic, and source content per section
const CHEMISTRY_SECTIONS = [
  // SUBTOPIC 1: ATOMIC STRUCTURE — Foundations of Matter
  { full_course_order: 1, main_topic: 'Atomic Structure', head_topic: 'Foundations of Matter', section_number: '1.1', section_title: 'The Atom — Fundamental Concepts', concise_definition: 'Matter is composed of atoms. An atom is the smallest unit of an element that retains the chemical properties of that element. Every atom consists of a nucleus containing protons and neutrons, and electrons occupying the space around the nucleus. The atomic number (Z) = number of protons. The mass number (A) = protons + neutrons. In a neutral atom, electrons = protons. Ions are atoms that have gained or lost electrons — cations (lost electrons, positive charge) and anions (gained electrons, negative charge).' },
  { full_course_order: 1, main_topic: 'Atomic Structure', head_topic: 'Foundations of Matter', section_number: '1.2', section_title: 'Isotopes', concise_definition: 'Isotopes are atoms of the same element (same Z) that differ in their number of neutrons (different A). Atomic mass is the weighted average of all naturally occurring isotopes. Example: Carbon-12 (98.9%), Carbon-13 (1.1%), Carbon-14 (radioactive, used in radiocarbon dating). Formula: Atomic mass = Σ(fractional abundance × isotope mass).' },
  { full_course_order: 1, main_topic: 'Atomic Structure', head_topic: 'Foundations of Matter', section_number: '1.3', section_title: 'Atomic Models — Historical Development', concise_definition: 'Dalton (1803): indivisible solid spheres. Thomson (1897): plum pudding model with electrons. Rutherford (1911): tiny dense nucleus, mostly empty space. Bohr (1913): quantized electron orbits, predicts hydrogen spectrum. Quantum mechanical model (~1926): wave functions and orbitals — probabilistic regions of high electron density based on Heisenberg uncertainty principle.' },
  { full_course_order: 1, main_topic: 'Atomic Structure', head_topic: 'Foundations of Matter', section_number: '1.4', section_title: 'Quantum Numbers and Electron Configuration', concise_definition: 'Four quantum numbers describe each electron: n (principal, energy level), l (angular momentum, orbital shape), ml (magnetic, orbital orientation), ms (spin, +½ or −½). Pauli Exclusion Principle: no two electrons share all four quantum numbers. Aufbau principle: fill lowest energy first. Hund\'s rule: one electron per degenerate orbital before pairing. Filling order: 1s→2s→2p→3s→3p→4s→3d→4p...' },
  { full_course_order: 1, main_topic: 'Atomic Structure', head_topic: 'Foundations of Matter', section_number: '1.5', section_title: 'Electromagnetic Radiation and Atomic Spectra', concise_definition: 'Light travels as waves: wavelength (λ), frequency (ν), c = λν = 3.00×10⁸ m/s. Planck\'s equation: E = hν. When electrons transition between energy levels, photons are emitted or absorbed. Each element produces a unique emission spectrum. Hydrogen series: Lyman (UV, to n=1), Balmer (visible, to n=2), Paschen (IR, to n=3).' },

  // SUBTOPIC 2: THE PERIODIC TABLE — Foundations of Matter
  { full_course_order: 2, main_topic: 'The Periodic Table', head_topic: 'Foundations of Matter', section_number: '2.1', section_title: 'Structure and Organisation', concise_definition: 'Elements organised by increasing atomic number. Periods (rows) 1–7: period number = highest n of valence electrons. Groups (columns) 1–18: same group = same valence electrons = similar chemistry. Blocks: s-block (Groups 1–2), p-block (Groups 13–18), d-block (transition metals), f-block (lanthanides/actinides). Categories: metals, nonmetals, metalloids, noble gases.' },
  { full_course_order: 2, main_topic: 'The Periodic Table', head_topic: 'Foundations of Matter', section_number: '2.2', section_title: 'Periodic Trends', concise_definition: 'Atomic radius: decreases across period (increased nuclear charge), increases down group (more shells). Ionisation energy: increases across period, decreases down group. Electron affinity: generally more negative across period; halogens most negative. Electronegativity (Pauling scale): F = 4.0 highest; increases across period, decreases down group. Metallic character: opposite to electronegativity trend.' },
  { full_course_order: 2, main_topic: 'The Periodic Table', head_topic: 'Foundations of Matter', section_number: '2.3', section_title: 'Key Element Groups', concise_definition: 'Group 1 (alkali metals): soft, react vigorously with water, form +1 ions, reactivity increases down group. Group 2 (alkaline earth metals): harder, form +2 ions. Group 17 (halogens): diatomic, strong oxidisers, form −1 ions, reactivity decreases down group. Group 18 (noble gases): full valence shells, extremely low reactivity. Transition metals: multiple oxidation states, coloured compounds, catalytic activity.' },

  // SUBTOPIC 3: CHEMICAL BONDING — Bonding & Reactions
  { full_course_order: 3, main_topic: 'Chemical Bonding', head_topic: 'Bonding & Reactions', section_number: '3.1', section_title: 'The Nature of Chemical Bonds', concise_definition: 'Atoms bond to achieve lower potential energy. Lewis dot structures represent valence electrons. Octet rule: most main-group atoms achieve stability with 8 electrons. Exceptions: electron-deficient (BF₃), odd-electron radicals (NO), expanded octets (PCl₅, SF₆).' },
  { full_course_order: 3, main_topic: 'Chemical Bonding', head_topic: 'Bonding & Reactions', section_number: '3.2', section_title: 'Ionic Bonding', concise_definition: 'Forms between atoms with large ΔEN (>~1.7), typically metal + nonmetal. Electron transfer creates cation and anion. Properties: crystalline solids, high melting points, conduct electricity when dissolved or molten, brittle, soluble in polar solvents. Lattice energy: energy released forming ionic solid from gaseous ions; increases with higher ionic charges and smaller radii.' },
  { full_course_order: 3, main_topic: 'Chemical Bonding', head_topic: 'Bonding & Reactions', section_number: '3.3', section_title: 'Covalent Bonding', concise_definition: 'Forms between atoms with similar electronegativities through electron pair sharing. Bond order: single (1), double (2), triple (3). Higher bond order = greater bond energy and shorter bond length. Polar vs nonpolar: ΔEN determines electron sharing equality. Lewis structure procedure involves counting valence electrons, distributing lone pairs, completing octets, and minimising formal charges. Resonance: hybrid of equivalent Lewis structures.' },
  { full_course_order: 3, main_topic: 'Chemical Bonding', head_topic: 'Bonding & Reactions', section_number: '3.4', section_title: 'VSEPR Theory — Molecular Geometry', concise_definition: 'Electron pairs around central atom arrange to minimise repulsion. Repulsion order: lone pair–lone pair > lone pair–bonding > bonding–bonding. Geometries: linear (180°), trigonal planar (120°), tetrahedral (109.5°), trigonal pyramidal (<109.5°), bent (<120° or <109.5°), trigonal bipyramidal (90°/120°), octahedral (90°). Examples: CO₂ linear, H₂O bent, NH₃ trigonal pyramidal, CH₄ tetrahedral.' },
  { full_course_order: 3, main_topic: 'Chemical Bonding', head_topic: 'Bonding & Reactions', section_number: '3.5', section_title: 'Molecular Polarity', concise_definition: 'A molecule is polar if it has polar bonds AND asymmetric geometry so dipoles don\'t cancel. CO₂: polar bonds, linear, nonpolar. H₂O: polar bonds, bent, polar. CCl₄: polar bonds, symmetric tetrahedral, nonpolar. CHCl₃: asymmetric tetrahedral, polar.' },
  { full_course_order: 3, main_topic: 'Chemical Bonding', head_topic: 'Bonding & Reactions', section_number: '3.6', section_title: 'Hybridisation', concise_definition: 'Mixing of atomic orbitals to form new equivalent bonding orbitals. sp: linear (180°), sp²: trigonal planar (120°), sp³: tetrahedral (109.5°), sp³d: trigonal bipyramidal, sp³d²: octahedral. Sigma (σ) bonds: head-on overlap, all single bonds. Pi (π) bonds: lateral overlap, found in double (1π) and triple bonds (2π). π bonds restrict rotation — basis of cis/trans isomerism.' },
  { full_course_order: 3, main_topic: 'Chemical Bonding', head_topic: 'Bonding & Reactions', section_number: '3.7', section_title: 'Intermolecular Forces', concise_definition: 'Weaker than covalent/ionic bonds; govern physical properties. London dispersion (LDF): all molecules, from temporary dipoles, increases with molar mass. Dipole-dipole: between polar molecules. Hydrogen bonding: H bonded to N, O, or F attracted to lone pair on N, O, F — explains water\'s anomalously high boiling point and DNA base pairing. Ion-dipole: ions in polar solvents. Strength: ion-dipole > H-bonding > dipole-dipole > LDF.' },
  { full_course_order: 3, main_topic: 'Chemical Bonding', head_topic: 'Bonding & Reactions', section_number: '3.8', section_title: 'Metallic Bonding', concise_definition: 'Valence electrons delocalised across lattice of metal cations (electron sea model). Explains: electrical conductivity (free electrons carry charge), thermal conductivity, malleability and ductility (lattice shifts without breaking bond), metallic lustre (electrons absorb and re-emit light).' },

  // SUBTOPIC 4: CHEMICAL REACTIONS & STOICHIOMETRY — Bonding & Reactions
  { full_course_order: 4, main_topic: 'Chemical Reactions & Stoichiometry', head_topic: 'Bonding & Reactions', section_number: '4.1', section_title: 'Chemical Reactions — Basics', concise_definition: 'A chemical reaction converts reactants to products through bond breaking and forming. Indicators: colour change, gas, precipitate, temperature change, light. Types: synthesis (A+B→AB), decomposition (AB→A+B), single displacement, double displacement (metathesis), combustion (hydrocarbon+O₂→CO₂+H₂O), acid-base neutralisation, redox.' },
  { full_course_order: 4, main_topic: 'Chemical Reactions & Stoichiometry', head_topic: 'Bonding & Reactions', section_number: '4.2', section_title: 'Balancing Chemical Equations', concise_definition: 'Law of conservation of mass: atoms cannot be created or destroyed. Balancing procedure: write correct formulas, count atoms each side, add whole-number coefficients (never change subscripts), balance atoms in fewest compounds first, balance H and O last, use smallest whole-number ratios.' },
  { full_course_order: 4, main_topic: 'Chemical Reactions & Stoichiometry', head_topic: 'Bonding & Reactions', section_number: '4.3', section_title: 'The Mole Concept', concise_definition: 'Mole = 6.022×10²³ entities (Avogadro\'s number). Molar mass (g/mol) numerically equals atomic/molecular mass in amu. Conversions: moles = mass/molar mass; particles = moles × Nₐ; at STP, 1 mol ideal gas = 22.4 L.' },
  { full_course_order: 4, main_topic: 'Chemical Reactions & Stoichiometry', head_topic: 'Bonding & Reactions', section_number: '4.4', section_title: 'Stoichiometry', concise_definition: 'Uses balanced equations to relate amounts of reactants and products. Steps: balance equation, convert to moles, apply mole ratio, convert to desired unit. Limiting reagent: reactant consumed first; determines theoretical yield. Percent yield = (actual/theoretical) × 100%. Percent composition = (element molar mass in formula / formula molar mass) × 100%.' },
  { full_course_order: 4, main_topic: 'Chemical Reactions & Stoichiometry', head_topic: 'Bonding & Reactions', section_number: '4.5', section_title: 'Empirical and Molecular Formulas', concise_definition: 'Empirical formula: simplest whole-number ratio of atoms. Molecular formula: actual atom count; may be multiple of empirical formula. Finding empirical formula: assume 100g, convert % to grams to moles, divide by smallest, round to integers. Molecular formula = n × empirical, where n = molar mass / empirical formula mass.' },
  { full_course_order: 4, main_topic: 'Chemical Reactions & Stoichiometry', head_topic: 'Bonding & Reactions', section_number: '4.6', section_title: 'Solution Stoichiometry', concise_definition: 'Molarity (M) = moles solute / litres solution. Dilution: M₁V₁ = M₂V₂ (moles conserved). Net ionic equations: separate soluble ionic compounds into ions, cancel spectator ions, write only species undergoing change. Example: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s).' },

  // SUBTOPIC 5: STATES OF MATTER — Foundations of Matter
  { full_course_order: 5, main_topic: 'States of Matter', head_topic: 'Foundations of Matter', section_number: '5.1', section_title: 'The Three Classic States', concise_definition: 'Solid: closely packed particles, definite shape and volume, vibrate in place. Liquid: mobile particles, definite volume, no definite shape. Gas: far apart, no definite shape or volume, highly compressible. Plasma: fourth state, ionised gas at very high temperatures (stars, lightning).' },
  { full_course_order: 5, main_topic: 'States of Matter', head_topic: 'Foundations of Matter', section_number: '5.2', section_title: 'Phase Changes and Heating Curves', concise_definition: 'Phase changes occur at constant temperature. Melting/freezing: solid↔liquid. Vaporisation/condensation: liquid↔gas. Sublimation/deposition: solid↔gas. Enthalpy of vaporisation > enthalpy of fusion. Heating curve: temperature constant during phase change (plateau) as energy breaks intermolecular forces rather than increasing kinetic energy.' },
  { full_course_order: 5, main_topic: 'States of Matter', head_topic: 'Foundations of Matter', section_number: '5.3', section_title: 'Vapour Pressure and Boiling Point', concise_definition: 'Vapour pressure: pressure of vapour in equilibrium with liquid; increases with temperature. Liquid boils when vapour pressure = external pressure. Normal boiling point: vapour pressure = 1 atm. Clausius-Clapeyron: ln(P₂/P₁) = −(ΔHvap/R)(1/T₂ − 1/T₁). Higher IMFs → lower vapour pressure → higher boiling point.' },
  { full_course_order: 5, main_topic: 'States of Matter', head_topic: 'Foundations of Matter', section_number: '5.4', section_title: 'Types of Crystalline Solids', concise_definition: 'Ionic: cations/anions, electrostatic forces, hard, brittle, high mp, conducts when molten (NaCl, MgO). Metallic: metal cations in electron sea, malleable, conducts (Fe, Cu). Molecular: molecules held by IMFs, soft, low-moderate mp (H₂O, sugar). Network covalent: atoms bonded covalently, very hard, very high mp, poor conductor (diamond, quartz).' },
  { full_course_order: 5, main_topic: 'States of Matter', head_topic: 'Foundations of Matter', section_number: '5.5', section_title: 'Phase Diagrams', concise_definition: 'Shows stable phase(s) at given temperature and pressure. Triple point: all three phases coexist. Critical point: above Tc and Pc, liquid/gas are indistinguishable (supercritical fluid). Water\'s solid-liquid line has negative slope (ice is less dense than liquid water — unusual). Water triple point: 0.01°C, 611.7 Pa.' },

  // SUBTOPIC 6: GAS LAWS — Foundations of Matter
  { full_course_order: 6, main_topic: 'Gas Laws', head_topic: 'Foundations of Matter', section_number: '6.1', section_title: 'Ideal Gas Behaviour', concise_definition: 'Ideal gas: negligible particle volume, no IMFs, elastic collisions only. Kinetic Molecular Theory: particles in constant random motion; KE proportional to absolute temperature. KE_avg = (3/2)kT. Root mean square speed: v_rms = √(3RT/M). Heavier molecules move slower at same temperature. Real gases approximate ideal at low pressure and high temperature.' },
  { full_course_order: 6, main_topic: 'Gas Laws', head_topic: 'Foundations of Matter', section_number: '6.2', section_title: 'The Gas Laws', concise_definition: 'Boyle\'s Law: P₁V₁ = P₂V₂ (constant T, n). Charles\'s Law: V₁/T₁ = V₂/T₂ (constant P, n). Gay-Lussac\'s Law: P₁/T₁ = P₂/T₂. Avogadro\'s Law: V₁/n₁ = V₂/n₂. Combined: P₁V₁/T₁ = P₂V₂/T₂. Ideal Gas Law: PV = nRT (R = 0.08206 L·atm/mol·K). STP: 0°C, 1 atm → 22.4 L/mol. SATP: 25°C, 1 bar → 24.8 L/mol.' },
  { full_course_order: 6, main_topic: 'Gas Laws', head_topic: 'Foundations of Matter', section_number: '6.3', section_title: "Dalton's Law of Partial Pressures", concise_definition: 'In a gas mixture, each gas exerts pressure independently. P_total = P₁ + P₂ + P₃ + ... Partial pressure: P_i = χ_i × P_total (χ = mole fraction). Application: when collecting gas over water, P_gas = P_total − P_H₂O (water vapour must be subtracted).' },
  { full_course_order: 6, main_topic: 'Gas Laws', head_topic: 'Foundations of Matter', section_number: '6.4', section_title: "Graham's Law of Effusion/Diffusion", concise_definition: 'Effusion: gas escaping through a small hole. Diffusion: spreading of gas. Rate₁/Rate₂ = √(M₂/M₁). Lighter gases move faster. Used to estimate molar mass by comparing rates to a known gas.' },
  { full_course_order: 6, main_topic: 'Gas Laws', head_topic: 'Foundations of Matter', section_number: '6.5', section_title: 'Real Gases and Deviations from Ideal Behaviour', concise_definition: 'Real gases deviate because particles have finite volume (matters at high pressure) and IMFs exist (matters at low temperature). Van der Waals equation: (P + an²/V²)(V − nb) = nRT. a corrects for IMFs, b corrects for particle volume. Most deviation: polar gases at low T and high P.' },

  // SUBTOPIC 7: THERMODYNAMICS — Energy, Rates & Equilibrium
  { full_course_order: 7, main_topic: 'Thermodynamics & Thermochemistry', head_topic: 'Energy, Rates & Equilibrium', section_number: '7.1', section_title: 'Energy, Heat, and Work', concise_definition: 'Internal energy (U): total kinetic + potential energy. Heat (q): energy transferred by temperature difference; q>0 endothermic, q<0 exothermic. Work (w) = −PΔV; expansion means system does work. First Law: ΔU = q + w (energy conserved).' },
  { full_course_order: 7, main_topic: 'Thermodynamics & Thermochemistry', head_topic: 'Energy, Rates & Equilibrium', section_number: '7.2', section_title: 'Enthalpy', concise_definition: 'H = U + PV. At constant pressure: ΔH = q_p. Endothermic: ΔH > 0; exothermic: ΔH < 0. Standard enthalpy of formation (ΔH°f): enthalpy for forming 1 mol compound from elements in standard states. Hess\'s Law: ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants). Calorimetry: q = mcΔT; for water c = 4.184 J/g·°C.' },
  { full_course_order: 7, main_topic: 'Thermodynamics & Thermochemistry', head_topic: 'Energy, Rates & Equilibrium', section_number: '7.3', section_title: 'Entropy', concise_definition: 'Entropy (S): measure of energy dispersal / number of microstates. Increases with temperature, phase change solid→gas, dissolving, more moles of gas, larger molecules. Third Law: S = 0 for perfect crystal at 0 K. Second Law: entropy of universe increases in any spontaneous process. ΔS°rxn = ΣS°(products) − ΣS°(reactants).' },
  { full_course_order: 7, main_topic: 'Thermodynamics & Thermochemistry', head_topic: 'Energy, Rates & Equilibrium', section_number: '7.4', section_title: 'Gibbs Free Energy', concise_definition: 'ΔG = ΔH − TΔS. ΔG < 0: spontaneous; ΔG > 0: nonspontaneous; ΔG = 0: equilibrium. ΔG°rxn = ΣΔG°f(products) − ΣΔG°f(reactants). Relationship to K: ΔG° = −RT ln K. Non-standard: ΔG = ΔG° + RT ln Q. Spontaneity depends on both ΔH and ΔS, with temperature determining which dominates when signs conflict.' },

  // SUBTOPIC 8: CHEMICAL KINETICS — Energy, Rates & Equilibrium
  { full_course_order: 8, main_topic: 'Chemical Kinetics', head_topic: 'Energy, Rates & Equilibrium', section_number: '8.1', section_title: 'Reaction Rates', concise_definition: 'Rate = change in concentration per unit time. For aA+bB→cC+dD: rate = −(1/a)Δ[A]/Δt. Factors: concentration (more collisions), temperature (more energetic collisions), surface area (for solids), catalysts (lower Ea), nature of reactants.' },
  { full_course_order: 8, main_topic: 'Chemical Kinetics', head_topic: 'Energy, Rates & Equilibrium', section_number: '8.2', section_title: 'Rate Laws', concise_definition: 'Rate = k[A]^m[B]^n. k = rate constant (temperature-dependent). Orders m, n determined experimentally, not from stoichiometry. Zeroth order: [A]t = [A]₀ − kt. First order: ln[A]t = ln[A]₀ − kt, t½ = 0.693/k (concentration-independent). Second order: 1/[A]t = 1/[A]₀ + kt, t½ = 1/(k[A]₀).' },
  { full_course_order: 8, main_topic: 'Chemical Kinetics', head_topic: 'Energy, Rates & Equilibrium', section_number: '8.3', section_title: 'Temperature and the Arrhenius Equation', concise_definition: 'k = Ae^(−Ea/RT). A = frequency factor, Ea = activation energy. ln k = ln A − Ea/RT. Two temperatures: ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂). Plot ln k vs. 1/T gives straight line with slope = −Ea/R. Rate constants increase exponentially with temperature.' },
  { full_course_order: 8, main_topic: 'Chemical Kinetics', head_topic: 'Energy, Rates & Equilibrium', section_number: '8.4', section_title: 'Reaction Mechanisms', concise_definition: 'Mechanism = sequence of elementary steps. Each step has molecularity: unimolecular (rate = k[A]), bimolecular (rate = k[A][B]), termolecular (rare). Intermediates: produced and consumed within mechanism, not in overall equation. Rate-determining step (RDS): slowest step controls overall rate. Mechanism must: (1) sum to overall equation, (2) match experimental rate law.' },
  { full_course_order: 8, main_topic: 'Chemical Kinetics', head_topic: 'Energy, Rates & Equilibrium', section_number: '8.5', section_title: 'Catalysis', concise_definition: 'Catalyst provides lower-Ea alternative pathway; not consumed overall. Lowers Ea equally for forward and reverse. Does not change ΔH, ΔG, or equilibrium position. Homogeneous: same phase as reactants (H⁺ in solution). Heterogeneous: different phase (Pt/Pd in catalytic converters, Fe in Haber-Bosch). Enzymes: biological catalysts with specific active sites; Michaelis-Menten kinetics.' },

  // SUBTOPIC 9: CHEMICAL EQUILIBRIUM — Energy, Rates & Equilibrium
  { full_course_order: 9, main_topic: 'Chemical Equilibrium', head_topic: 'Energy, Rates & Equilibrium', section_number: '9.1', section_title: 'The Concept of Equilibrium', concise_definition: 'In a closed system, reversible reactions reach dynamic equilibrium when forward rate = reverse rate. At equilibrium: concentrations are constant (not necessarily equal), both forward and reverse reactions continue, macroscopic properties are constant.' },
  { full_course_order: 9, main_topic: 'Chemical Equilibrium', head_topic: 'Energy, Rates & Equilibrium', section_number: '9.2', section_title: 'The Equilibrium Constant (K)', concise_definition: 'For aA+bB⇌cC+dD: Kc = [C]^c[D]^d/[A]^a[B]^b. Kp uses partial pressures; Kp = Kc(RT)^Δn. K>>1: products favoured; K<<1: reactants favoured. Rules: reverse reaction K_new=1/K; multiply by n: K_new=K^n; add reactions: K_total=K₁×K₂. Pure solids and liquids excluded from K expressions.' },
  { full_course_order: 9, main_topic: 'Chemical Equilibrium', head_topic: 'Energy, Rates & Equilibrium', section_number: '9.3', section_title: 'Reaction Quotient (Q) and Predicting Direction', concise_definition: 'Q has same form as K but uses current (non-equilibrium) concentrations. Q < K: reaction shifts toward products. Q > K: reaction shifts toward reactants. Q = K: system at equilibrium.' },
  { full_course_order: 9, main_topic: 'Chemical Equilibrium', head_topic: 'Energy, Rates & Equilibrium', section_number: '9.4', section_title: "Le Chatelier's Principle", concise_definition: 'When equilibrium is disturbed, system shifts to partially counteract the disturbance. Concentration: add reactant → shift right; remove product → shift right. Pressure (gases): increase pressure → shift toward fewer moles of gas. Temperature: increase T → shift toward endothermic direction (K changes). Catalyst: no shift, equilibrium reached faster, K unchanged.' },
  { full_course_order: 9, main_topic: 'Chemical Equilibrium', head_topic: 'Energy, Rates & Equilibrium', section_number: '9.5', section_title: 'Equilibrium Calculations — ICE Tables', concise_definition: 'ICE = Initial, Change, Equilibrium. Set up table with all species. Change row uses stoichiometric ratios with variable x. Substitute equilibrium expressions into K expression. Solve for x. Validate: x must give positive concentrations and satisfy K.' },

  // SUBTOPIC 10: ACID-BASE — Energy, Rates & Equilibrium
  { full_course_order: 10, main_topic: 'Acid-Base Chemistry', head_topic: 'Energy, Rates & Equilibrium', section_number: '10.1', section_title: 'Definitions of Acids and Bases', concise_definition: 'Arrhenius: acid produces H⁺, base produces OH⁻ in water. Brønsted-Lowry: acid = proton donor, base = proton acceptor; conjugate pairs (HA/A⁻, BH⁺/B). Lewis: acid = electron pair acceptor, base = electron pair donor; applies without proton transfer (BF₃+NH₃→F₃B-NH₃).' },
  { full_course_order: 10, main_topic: 'Acid-Base Chemistry', head_topic: 'Energy, Rates & Equilibrium', section_number: '10.2', section_title: 'Strong and Weak Acids/Bases', concise_definition: 'Strong acids (HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄, HClO₃): completely dissociate. Strong bases (Group 1 hydroxides, Ca(OH)₂, Ba(OH)₂): completely dissociate. Weak acids: partial dissociation, Ka = [H₃O⁺][A⁻]/[HA]; larger Ka = stronger. pKa = −log Ka. Weak bases: Kb. Ka × Kb = Kw = 10⁻¹⁴; pKa + pKb = 14.' },
  { full_course_order: 10, main_topic: 'Acid-Base Chemistry', head_topic: 'Energy, Rates & Equilibrium', section_number: '10.3', section_title: 'pH, pOH, and the Water Constant', concise_definition: 'Kw = [H₃O⁺][OH⁻] = 1.0×10⁻¹⁴ at 25°C. pH = −log[H₃O⁺]. pOH = −log[OH⁻]. pH + pOH = 14. Acidic: pH < 7, neutral: pH = 7, basic: pH > 7. Weak acid pH: [H₃O⁺] ≈ √(Ka × C) when C/Ka > 100. Percent dissociation should be <5% for approximation validity.' },
  { full_course_order: 10, main_topic: 'Acid-Base Chemistry', head_topic: 'Energy, Rates & Equilibrium', section_number: '10.4', section_title: 'Buffer Solutions', concise_definition: 'Buffer: resists pH change on adding small amounts of acid/base. Composition: weak acid + conjugate base (or weak base + conjugate acid). Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]). Most effective when pH ≈ pKa and [A⁻]/[HA] between 0.1–10. Buffer capacity greater at higher concentrations. Blood maintained at ~7.4 by bicarbonate buffer system.' },
  { full_course_order: 10, main_topic: 'Acid-Base Chemistry', head_topic: 'Energy, Rates & Equilibrium', section_number: '10.5', section_title: 'Acid-Base Titrations', concise_definition: 'Titration: add titrant of known concentration to analyte. Equivalence point: stoichiometric moles of acid = moles base (not necessarily pH 7). Strong-strong: equivalence at pH 7. Weak acid-strong base: equivalence pH > 7 (conjugate base is basic). Half-equivalence point: pH = pKa. Indicators: phenolphthalein (pH 8.2–10), methyl orange (pH 3.1–4.4).' },
  { full_course_order: 10, main_topic: 'Acid-Base Chemistry', head_topic: 'Energy, Rates & Equilibrium', section_number: '10.6', section_title: 'Salt Hydrolysis and Polyprotic Acids', concise_definition: 'Salt hydrolysis: strong acid + strong base → neutral; weak acid + strong base → basic; strong acid + weak base → acidic. Polyprotic acids donate >1 proton with Ka₁ >> Ka₂ >> Ka₃. H₃PO₄: Ka₁=7.5×10⁻³, Ka₂=6.2×10⁻⁸, Ka₃=4.8×10⁻¹³. pH dominated by first dissociation.' },

  // SUBTOPIC 11: ELECTROCHEMISTRY — Applied Chemistry
  { full_course_order: 11, main_topic: 'Electrochemistry', head_topic: 'Applied Chemistry', section_number: '11.1', section_title: 'Oxidation-Reduction (Redox) Reactions', concise_definition: 'Oxidation: loss of electrons (increase in oxidation state). Reduction: gain of electrons (decrease). OIL RIG mnemonic. Reducing agent is oxidised; oxidising agent is reduced. Oxidation state rules: elements = 0; O usually −2; H usually +1; F always −1; sum = 0 or ion charge. Half-reaction method: split, balance atoms, balance O (add H₂O), balance H (add H⁺), balance charge (add e⁻), multiply to cancel electrons.' },
  { full_course_order: 11, main_topic: 'Electrochemistry', head_topic: 'Applied Chemistry', section_number: '11.2', section_title: 'Galvanic (Voltaic) Cells', concise_definition: 'Galvanic cell: spontaneous redox → electrical energy. Anode: oxidation, negative terminal. Cathode: reduction, positive terminal. Salt bridge: maintains electrical neutrality. AnOx RedCat mnemonic. E°cell = E°cathode − E°anode. Reference: Standard Hydrogen Electrode (SHE), E° = 0V. Positive E°cell → spontaneous. ΔG° = −nFE°cell. E° = (0.0592/n) log K at 25°C.' },
  { full_course_order: 11, main_topic: 'Electrochemistry', head_topic: 'Applied Chemistry', section_number: '11.3', section_title: 'The Nernst Equation', concise_definition: 'For non-standard conditions: E = E° − (0.0592/n) log Q at 25°C. At equilibrium: E = 0, Q = K. Concentration cells: same electrode/solution, different concentrations; E° = 0 but E ≠ 0. Cell operates until concentrations equalise.' },
  { full_course_order: 11, main_topic: 'Electrochemistry', head_topic: 'Applied Chemistry', section_number: '11.4', section_title: 'Electrolytic Cells', concise_definition: 'Electrolytic cell: electrical energy drives nonspontaneous redox. External power source forces current. Cathode: reduction (connected to negative terminal). Anode: oxidation. Electrolysis of water: cathode produces H₂, anode produces O₂. Electroplating: metal deposited at cathode. Faraday\'s law: m = (I×t×M)/(n×F).' },
  { full_course_order: 11, main_topic: 'Electrochemistry', head_topic: 'Applied Chemistry', section_number: '11.5', section_title: 'Batteries and Fuel Cells', concise_definition: 'Lead-acid (car battery): Pb anode, PbO₂ cathode, H₂SO₄ electrolyte, 2V/cell, rechargeable. Lithium-ion: ~3.7V, high energy density, rechargeable. Alkaline: Zn/MnO₂, ~1.5V. Fuel cells: H₂ + ½O₂ → H₂O + electrical energy; ~60% efficient vs ~35% combustion; continuous if fuel supplied.' },

  // SUBTOPIC 12: SOLUTIONS — Applied Chemistry
  { full_course_order: 12, main_topic: 'Solutions & Colligative Properties', head_topic: 'Applied Chemistry', section_number: '12.1', section_title: 'Solutions — Types and Terminology', concise_definition: 'Solution: homogeneous mixture. Solvent: largest component. Solute: dissolved component. Types: gas-gas (air), gas-liquid (carbonated water), liquid-liquid (ethanol/water), solid-liquid (NaCl/water), solid-solid (alloys). Like dissolves like: polar solvents dissolve polar/ionic solutes; nonpolar dissolves nonpolar. Dissolution: lattice energy must be overcome by hydration energy.' },
  { full_course_order: 12, main_topic: 'Solutions & Colligative Properties', head_topic: 'Applied Chemistry', section_number: '12.2', section_title: 'Concentration Units', concise_definition: 'Molarity (M): mol/L solution (temperature-dependent). Molality (m): mol/kg solvent (temperature-independent; used for colligative properties). Mole fraction (χ): mol component/total mol (unitless). Mass percent: (mass solute/mass solution)×100%. ppm: mg solute/kg solution for trace concentrations.' },
  { full_course_order: 12, main_topic: 'Solutions & Colligative Properties', head_topic: 'Applied Chemistry', section_number: '12.3', section_title: 'Colligative Properties', concise_definition: 'Depend only on number of particles, not identity. Vapour pressure lowering (Raoult): P_solvent = χ_solvent × P°_solvent. Boiling point elevation: ΔTb = Kb×m×i (Kb water = 0.512°C/m). Freezing point depression: ΔTf = Kf×m×i (Kf water = 1.86°C/m). Osmotic pressure: π = iMRT. i = van\'t Hoff factor (particles per formula unit).' },
  { full_course_order: 12, main_topic: 'Solutions & Colligative Properties', head_topic: 'Applied Chemistry', section_number: '12.4', section_title: "Henry's Law and Solubility Product", concise_definition: "Henry's Law: C_gas = k_H × P_gas; gas solubility proportional to pressure. Higher temperature decreases gas solubility. Ksp: equilibrium constant for dissolving sparingly soluble compound. For MₐXb: Ksp = [M^b+]^a[X^a-]^b. Common ion effect: common ion decreases solubility. Complex ion formation can dramatically increase solubility." },

  // SUBTOPIC 13: ORGANIC CHEMISTRY — Applied Chemistry
  { full_course_order: 13, main_topic: 'Organic Chemistry', head_topic: 'Applied Chemistry', section_number: '13.1', section_title: 'Introduction to Organic Chemistry', concise_definition: 'Organic chemistry: study of carbon-containing compounds. Carbon: tetravalent, bonds with C/H/O/N/S/halogens, forms chains, rings, branched structures. sp³ (tetrahedral), sp² (planar), sp (linear). Enormous diversity from chain length, branching, ring formation, functional groups, and stereochemistry. Hydrocarbons: only C and H.' },
  { full_course_order: 13, main_topic: 'Organic Chemistry', head_topic: 'Applied Chemistry', section_number: '13.2', section_title: 'Hydrocarbons', concise_definition: 'Alkanes: CₙH₂ₙ₊₂, sp³, C–C single bonds, undergo substitution and combustion. Cycloalkanes: CₙH₂ₙ, cyclohexane chair conformation. Alkenes: CₙH₂ₙ, C=C double bond (sp²), addition reactions, Markovnikov\'s rule. Alkynes: CₙH₂ₙ₋₂, C≡C triple bond (sp), addition reactions. Benzene: C₆H₆, delocalised π electrons, aromatic (Hückel rule: 4n+2 π electrons), undergoes EAS reactions.' },
  { full_course_order: 13, main_topic: 'Organic Chemistry', head_topic: 'Applied Chemistry', section_number: '13.3', section_title: 'Functional Groups', concise_definition: 'Haloalkanes: C–X bond, polar, nucleophilic substitution (Sₙ1/Sₙ2) and elimination (E1/E2). Alcohols: R–OH, H-bonding, oxidation and dehydration reactions. Ethers: R–O–R\', poor H-bond donor, unreactive solvents. Aldehydes: R–CHO, easily oxidised, Tollens\'/Benedict\'s test positive. Ketones: R–CO–R\', resistant to oxidation. Carboxylic acids: R–COOH, weak acids, esterification. Esters: pleasant odours, Fischer esterification. Amines: Lewis bases. Amides: peptide bonds in proteins.' },
  { full_course_order: 13, main_topic: 'Organic Chemistry', head_topic: 'Applied Chemistry', section_number: '13.4', section_title: 'Isomerism', concise_definition: 'Constitutional isomers: same formula, different connectivity (n-butane vs isobutane). Stereoisomers: same connectivity, different spatial arrangement. Geometric (cis/trans): restricted rotation about C=C; E/Z notation uses CIP priority rules. Optical isomers (enantiomers): non-superimposable mirror images; arise from chiral centres (4 different substituents); rotate polarised light. Racemic mixture: 50:50 enantiomers, optically inactive. Diastereomers: stereoisomers that aren\'t mirror images.' },
  { full_course_order: 13, main_topic: 'Organic Chemistry', head_topic: 'Applied Chemistry', section_number: '13.5', section_title: 'Polymers', concise_definition: 'Addition polymerisation: monomers with double bonds add together (polyethylene, PVC, polystyrene, Teflon). Condensation polymerisation: monomers join with loss of small molecule, usually H₂O (polyesters from diol+diacid; nylon from diamine+diacid). Biological polymers: proteins (amino acids, peptide bonds), nucleic acids (nucleotides, phosphodiester bonds), polysaccharides (monosaccharides, glycosidic bonds).' },

  // SUBTOPIC 14: NUCLEAR CHEMISTRY — Applied Chemistry
  { full_course_order: 14, main_topic: 'Nuclear Chemistry', head_topic: 'Applied Chemistry', section_number: '14.1', section_title: 'Radioactivity and Nuclear Decay', concise_definition: 'Nucleus unstable if: n/p ratio too high or too low, Z > 83. Alpha (α): emits ⁴₂He, Z−2, A−4, stopped by paper. Beta-minus (β⁻): neutron→proton+e⁻, Z+1, A unchanged, stopped by aluminium. Beta-plus (β⁺): proton→neutron+e⁺. Electron capture: same result as β⁺. Gamma (γ): high-energy photon, no Z/A change, requires lead/concrete. Nuclear equations: mass numbers and atomic numbers conserved.' },
  { full_course_order: 14, main_topic: 'Nuclear Chemistry', head_topic: 'Applied Chemistry', section_number: '14.2', section_title: 'Half-Life and Radioactive Decay Kinetics', concise_definition: 'Nuclear decay is first-order: N(t) = N₀·e^(−λt). Half-life: t½ = 0.693/λ. Radiocarbon dating: ¹⁴C (t½ = 5,730 yr), living organisms maintain constant ¹⁴C/¹²C, after death ¹⁴C decays. Also: ²³⁸U→²⁰⁶Pb (t½ = 4.5×10⁹ yr), ⁴⁰K→⁴⁰Ar (t½ = 1.25×10⁹ yr).' },
  { full_course_order: 14, main_topic: 'Nuclear Chemistry', head_topic: 'Applied Chemistry', section_number: '14.3', section_title: 'Nuclear Reactions — Fission and Fusion', concise_definition: 'Fission: heavy nucleus splits (²³⁵U+n→Kr+Ba+3n+energy); chain reaction requires critical mass; reactors use moderator and control rods. Fusion: light nuclei combine (²H+³H→⁴He+n+17.6 MeV); powers the sun; requires ~10⁷–10⁸ K; not yet sustained commercially. E = mc²; mass defect converted to binding energy; binding energy per nucleon peaks at ⁵⁶Fe.' },
  { full_course_order: 14, main_topic: 'Nuclear Chemistry', head_topic: 'Applied Chemistry', section_number: '14.4', section_title: 'Applications of Nuclear Chemistry', concise_definition: 'PET imaging: β⁺ emitters (¹⁸F-FDG). SPECT: γ emitters (⁹⁹ᵐTc). MRI: NMR of ¹H (not nuclear decay). Radiation therapy: γ from ⁶⁰Co or proton beams to damage cancer DNA. Units: Becquerel (1 decay/s), Gray (1 J/kg absorbed), Sievert (dose equivalent accounting for biological effectiveness).' },

  // SUBTOPIC 15: ADVANCED THERMODYNAMICS — Energy, Rates & Equilibrium
  { full_course_order: 15, main_topic: 'Advanced Thermodynamics', head_topic: 'Energy, Rates & Equilibrium', section_number: '15.1', section_title: 'Third Law and Absolute Entropy', concise_definition: 'Third Law (Nernst\'s theorem): entropy of perfect crystal at 0 K is zero. This gives absolute reference for entropy. Standard molar entropies S° (at 298 K, 1 bar) are tabulated. Unlike ΔH°f and ΔG°f, S° for elements is not zero.' },
  { full_course_order: 15, main_topic: 'Advanced Thermodynamics', head_topic: 'Energy, Rates & Equilibrium', section_number: '15.2', section_title: 'Spontaneity and Free Energy at Non-Standard Conditions', concise_definition: 'ΔG = ΔG° + RT ln Q. When Q < K: ΔG < 0, spontaneous toward products. When Q > K: ΔG > 0, spontaneous toward reactants. At equilibrium ΔG = 0: ΔG° = −RT ln K. Maximum useful work = −ΔG. Minimum work to drive nonspontaneous process = ΔG.' },
  { full_course_order: 15, main_topic: 'Advanced Thermodynamics', head_topic: 'Energy, Rates & Equilibrium', section_number: '15.3', section_title: 'Coupled Reactions', concise_definition: 'Thermodynamically unfavourable reactions (ΔG > 0) driven by coupling to favourable ones (ΔG < 0) so overall ΔG < 0. Biological example: ATP hydrolysis (ΔG° ≈ −30 kJ/mol) coupled to biosynthetic reactions needing energy input. ATP is the energetic currency of living cells.' },
];

const SAMPLE_SECTION = CHEMISTRY_SECTIONS[0]; // 1.1 Atom — Fundamental Concepts

export default function ContentGenerator() {
  const [sampleResult, setSampleResult] = useState(null);
  const [sampleLoading, setSampleLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: CHEMISTRY_SECTIONS.length, errors: [] });
  const [done, setDone] = useState(false);

  const generateForSection = async (section) => {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are an expert chemistry educator writing for a beginner-to-intermediate level learning platform called Nexus.

Given the following concise source definition for a chemistry section, generate rich educational content.

Section: ${section.section_number} — ${section.section_title}
Topic: ${section.main_topic}
Source definition: ${section.concise_definition}

Generate:
1. expanded_explanation: Write exactly 4 sections, each with a subheading followed by a paragraph of 2–4 sentences. Use plain, clear language. Be scientifically precise. Format each section as "SUBHEADING\nParagraph text." Follow this exact structure:
   - Subheading: "What is an atom?" — Paragraph: What atoms are and that they are the building blocks of matter.
   - Subheading: "The nucleus: protons and neutrons" — Paragraph: Describe protons (positive charge) and neutrons (no charge) in the nucleus. Introduce the atomic number (Z) as the number of protons, which defines the element's identity.
   - Subheading: "Electrons, neutral atoms, and ions" — Paragraph: Describe electrons and their charge. Explain that in a neutral atom, the number of electrons equals the number of protons, so their charges cancel out and the atom has no overall electrical charge. Explain ions: cations (lost electrons, positive) and anions (gained electrons, negative).
   - Subheading: "Mass number and isotopes" — Paragraph: Define mass number (A = protons + neutrons). Give carbon-12 as an example. Briefly explain isotopes as atoms of the same element with different numbers of neutrons.

   Scientific accuracy rules (strictly enforce):
   - Say "almost everything you can touch, see, or feel is made up of atoms" — never "everything"
   - Say electrons "have much less mass than protons and neutrons" — never "much smaller"
   - Say "their charges cancel out and the atom has no overall electrical charge" — never "maintains stability"
   - If mentioning cooking: "atoms rearranging into new molecules, such as when proteins and sugars react to brown food"
   - If mentioning rust: "atoms reacting and forming a new compound, iron oxide" — as a separate example from cooking

2. key_takeaways: 4–6 concise bullet points summarising the most important concepts a student must remember.
3. real_world_examples: 3–4 concrete, relatable real-world applications or examples that make the concept tangible.
4. related_terms: 6–10 important vocabulary terms related to this section (just the terms, no definitions).`,
      response_json_schema: {
        type: 'object',
        properties: {
          expanded_explanation: { type: 'string' },
          key_takeaways: { type: 'array', items: { type: 'string' } },
          real_world_examples: { type: 'array', items: { type: 'string' } },
          related_terms: { type: 'array', items: { type: 'string' } },
        },
      },
    });
    return result;
  };

  const handleSample = async () => {
    setSampleLoading(true);
    setSampleResult(null);
    const ai = await generateForSection(SAMPLE_SECTION);
    setSampleResult(ai);
    setSampleLoading(false);
  };

  const handleRunAll = async () => {
    setGenerating(true);
    setDone(false);
    setProgress({ done: 0, total: CHEMISTRY_SECTIONS.length, errors: [] });

    for (let i = 0; i < CHEMISTRY_SECTIONS.length; i++) {
      const section = CHEMISTRY_SECTIONS[i];
      try {
        const ai = await generateForSection(section);
        await base44.entities.LearningContent.create({
          subject: 'Chemistry',
          main_topic: section.main_topic,
          head_topic: section.head_topic,
          full_course_order: section.full_course_order,
          section_number: section.section_number,
          section_title: section.section_title,
          concise_definition: section.concise_definition,
          expanded_explanation: ai.expanded_explanation,
          key_takeaways: ai.key_takeaways,
          real_world_examples: ai.real_world_examples,
          related_terms: ai.related_terms,
          difficulty: 'intermediate',
        });
        setProgress(prev => ({ ...prev, done: i + 1 }));
      } catch (e) {
        setProgress(prev => ({
          ...prev,
          done: i + 1,
          errors: [...prev.errors, `${section.section_number} ${section.section_title}: ${e.message}`],
        }));
      }
    }

    setGenerating(false);
    setDone(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <FlaskConical className="w-6 h-6 text-primary" />
        <h1 className="font-serif text-2xl font-bold text-foreground">Chemistry Content Generator</h1>
      </div>
      <p className="text-muted-foreground mb-8 text-sm">
        {CHEMISTRY_SECTIONS.length} sections across 15 subtopics. Generate a sample first, then approve and run the full batch.
      </p>

      {/* Step 1: Sample */}
      <div className="border border-border rounded-xl p-6 mb-6 bg-card">
        <h2 className="font-serif text-lg font-bold text-foreground mb-1">Step 1 — Preview a Sample Record</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Generates content for <strong>1.1 — The Atom: Fundamental Concepts</strong> using AI so you can review quality before running the full batch.
        </p>
        <Button onClick={handleSample} disabled={sampleLoading || generating} className="flex items-center gap-2">
          {sampleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
          {sampleLoading ? 'Generating sample...' : 'Generate Sample'}
        </Button>

        {sampleResult && (
          <div className="mt-6 space-y-4 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-2">Expanded Explanation</p>
              <div className="space-y-4">
                {sampleResult.expanded_explanation.split('\n\n').map((block, i) => {
                  const lines = block.split('\n');
                  const isSubheading = lines.length > 1;
                  return isSubheading ? (
                    <div key={i}>
                      <p className="font-semibold text-foreground text-sm mb-1">{lines[0]}</p>
                      <p className="text-muted-foreground leading-relaxed">{lines.slice(1).join(' ')}</p>
                    </div>
                  ) : (
                    <p key={i} className="text-muted-foreground leading-relaxed">{block}</p>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Key Takeaways</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {sampleResult.key_takeaways?.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Real-World Examples</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {sampleResult.real_world_examples?.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Related Terms</p>
              <div className="flex flex-wrap gap-2">
                {sampleResult.related_terms?.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Full Run */}
      <div className="border border-border rounded-xl p-6 bg-card">
        <h2 className="font-serif text-lg font-bold text-foreground mb-1">Step 2 — Run Full Generation</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Generates and saves all <strong>{CHEMISTRY_SECTIONS.length} sections</strong> to the LearningContent database. This will take several minutes.
        </p>

        {!generating && !done && (
          <Button onClick={handleRunAll} disabled={sampleLoading} className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Run Full Generation ({CHEMISTRY_SECTIONS.length} sections)
          </Button>
        )}

        {(generating || done) && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {done ? 'Complete!' : `Processing ${progress.done + 1} of ${progress.total}...`}
              </span>
              <span className="font-medium text-foreground">{progress.done}/{progress.total}</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(progress.done / progress.total) * 100}%` }}
              />
            </div>
            {done && (
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium mt-2">
                <CheckCircle className="w-4 h-4" />
                All {progress.total - progress.errors.length} sections saved successfully.
              </div>
            )}
            {progress.errors.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-destructive font-medium flex items-center gap-1 mb-1">
                  <AlertCircle className="w-4 h-4" /> {progress.errors.length} error(s):
                </p>
                <ul className="text-xs text-destructive list-disc list-inside space-y-0.5">
                  {progress.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}