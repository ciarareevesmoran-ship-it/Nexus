import { Atom, FlaskConical, Globe, Landmark, Users, Calculator, BookOpen, TrendingUp } from 'lucide-react';

export const SUBJECTS = [
  { id: 'physics', name: 'Physics', icon: Atom, description: 'The laws that govern our universe', color: 'bg-blue-50 text-blue-700' },
  { id: 'chemistry', name: 'Chemistry', icon: FlaskConical, description: 'Matter, reactions, and molecular worlds', color: 'bg-emerald-50 text-emerald-700' },
  { id: 'geography', name: 'Geography', icon: Globe, description: 'Earth, landscapes, and spatial systems', color: 'bg-amber-50 text-amber-700' },
  { id: 'history', name: 'History', icon: Landmark, description: 'Events that shaped civilisations', color: 'bg-rose-50 text-rose-700' },
  { id: 'social-science', name: 'Social Science', icon: Users, description: 'Society, culture, and human behaviour', color: 'bg-violet-50 text-violet-700' },
  { id: 'mathematics', name: 'Mathematics', icon: Calculator, description: 'Numbers, patterns, and abstract structures', color: 'bg-indigo-50 text-indigo-700' },
  { id: 'philosophy', name: 'Philosophy', icon: BookOpen, description: 'Ideas, ethics, and ways of thinking', color: 'bg-orange-50 text-orange-700' },
  { id: 'economics', name: 'Economics', icon: TrendingUp, description: 'Markets, trade, and resource allocation', color: 'bg-teal-50 text-teal-700' },
];

export const LIVE_CASES = [
  {
    id: 'arctic',
    title: 'The Arctic',
    subjects: ['Social Science', 'Geology'],
    description: 'Explore how melting ice is reshaping geopolitics, ecosystems, and indigenous communities.',
    image: 'https://images.unsplash.com/photo-1517783999520-f068d7431571?w=600&q=80',
  },
  {
    id: 'israel-palestine',
    title: 'Israel & Palestine',
    subjects: ['History', 'Political Science'],
    description: 'Understand decades of conflict through historical, political, and humanitarian lenses.',
    image: 'https://images.unsplash.com/photo-1547483238-2cbf881a559f?w=600&q=80',
  },
  {
    id: 'green-transition',
    title: 'The Green Transition',
    subjects: ['Economics', 'Chemistry'],
    description: 'How the world is transitioning from fossil fuels to sustainable energy systems.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80',
  },
];

export const SUBJECT_TOPICS = {
  physics: [
    { id: 'mechanics', name: 'Mechanics', description: 'Motion, forces, and energy' },
    { id: 'thermodynamics', name: 'Thermodynamics', description: 'Heat, temperature, and entropy' },
    { id: 'electromagnetism', name: 'Electromagnetism', description: 'Electric and magnetic fields' },
    { id: 'quantum', name: 'Quantum Physics', description: 'The physics of the very small' },
  ],
  chemistry: [
    { id: 'atomic-structure', name: 'Atomic Structure', description: 'Atoms, subatomic particles, and electron configuration' },
    { id: 'periodic-table', name: 'The Periodic Table', description: 'Organisation of elements and periodic trends' },
    { id: 'chemical-bonding', name: 'Chemical Bonding', description: 'Ionic, covalent, metallic bonds and molecular geometry' },
    { id: 'reactions-stoichiometry', name: 'Chemical Reactions & Stoichiometry', description: 'Reaction types, balancing equations, and the mole' },
    { id: 'states-of-matter', name: 'States of Matter', description: 'Solids, liquids, gases, phase changes, and diagrams' },
    { id: 'gas-laws', name: 'Gas Laws', description: 'Ideal gas behaviour and real gas deviations' },
    { id: 'thermochemistry', name: 'Thermodynamics & Thermochemistry', description: 'Energy, enthalpy, entropy, and Gibbs free energy' },
    { id: 'chemical-kinetics', name: 'Chemical Kinetics', description: 'Reaction rates, rate laws, and activation energy' },
    { id: 'equilibrium', name: 'Chemical Equilibrium', description: 'Equilibrium constants and Le Chatelier\'s principle' },
    { id: 'acid-base', name: 'Acid-Base Chemistry', description: 'Acids, bases, pH, buffers, and titrations' },
    { id: 'electrochemistry', name: 'Electrochemistry', description: 'Redox reactions, galvanic cells, and electrolysis' },
    { id: 'solutions', name: 'Solutions & Colligative Properties', description: 'Concentration, solubility, and colligative effects' },
    { id: 'organic-chemistry', name: 'Organic Chemistry', description: 'Hydrocarbons, functional groups, and isomerism' },
    { id: 'nuclear-chemistry', name: 'Nuclear Chemistry', description: 'Radioactivity, decay, fission, and fusion' },
    { id: 'advanced-thermodynamics', name: 'Advanced Thermodynamics', description: 'Third law, coupled reactions, and free energy' },
  ],
  geography: [
    { id: 'geology', name: 'Geology', description: 'Rocks, minerals, and Earth\'s structure' },
    { id: 'cartography', name: 'Cartography', description: 'Mapmaking and spatial representation' },
    { id: 'climate', name: 'Climate Systems', description: 'Weather patterns and climate change' },
    { id: 'human-geo', name: 'Human Geography', description: 'Population, migration, and urbanisation' },
  ],
  history: [
    { id: 'ancient', name: 'Ancient History', description: 'Civilisations of the ancient world' },
    { id: 'medieval', name: 'Medieval History', description: 'The Middle Ages and feudal societies' },
    { id: 'modern', name: 'Modern History', description: 'The world from 1500 to today' },
    { id: 'world-wars', name: 'World Wars', description: 'The great conflicts of the 20th century' },
  ],
  'social-science': [
    { id: 'sociology', name: 'Sociology', description: 'Social structures and institutions' },
    { id: 'psychology', name: 'Psychology', description: 'Mind, behaviour, and mental processes' },
    { id: 'anthropology', name: 'Anthropology', description: 'Human cultures and evolution' },
    { id: 'political-science', name: 'Political Science', description: 'Power, governance, and policy' },
  ],
  mathematics: [
    { id: 'algebra', name: 'Algebra', description: 'Equations, variables, and abstract structures' },
    { id: 'calculus', name: 'Calculus', description: 'Rates of change and accumulation' },
    { id: 'statistics', name: 'Statistics', description: 'Data, probability, and inference' },
    { id: 'geometry', name: 'Geometry', description: 'Shapes, space, and spatial reasoning' },
  ],
  philosophy: [
    { id: 'ethics', name: 'Ethics', description: 'Right, wrong, and moral reasoning' },
    { id: 'logic', name: 'Logic', description: 'Reasoning, arguments, and proof' },
    { id: 'epistemology', name: 'Epistemology', description: 'The nature and scope of knowledge' },
    { id: 'metaphysics', name: 'Metaphysics', description: 'Reality, existence, and being' },
  ],
  economics: [
    { id: 'micro', name: 'Microeconomics', description: 'Individual markets and decision-making' },
    { id: 'macro', name: 'Macroeconomics', description: 'National economies and global trade' },
    { id: 'development', name: 'Development Economics', description: 'Growth, poverty, and inequality' },
    { id: 'behavioural', name: 'Behavioural Economics', description: 'Psychology meets economic choice' },
  ],
};

export const TOPIC_SUBTOPICS = {
  geology: [
    { id: 'exogenic', name: 'Exogenic Processes', description: 'Weathering, erosion, and surface changes' },
    { id: 'endogenic', name: 'Endogenic Processes', description: 'Volcanic activity and mountain building' },
    { id: 'plate-tectonics', name: 'Plate Tectonics', description: 'Movement of Earth\'s crustal plates' },
    { id: 'rock-types', name: 'Rock Types', description: 'Igneous, sedimentary, and metamorphic rocks' },
  ],
  mechanics: [
    { id: 'kinematics', name: 'Kinematics', description: 'Describing motion without forces' },
    { id: 'dynamics', name: 'Dynamics', description: 'Forces and Newton\'s laws' },
    { id: 'energy', name: 'Energy & Work', description: 'Conservation of energy and power' },
    { id: 'momentum', name: 'Momentum', description: 'Impulse, collisions, and conservation' },
  ],
  'atomic-structure': [
    { id: 'atom-fundamentals', name: '1.1 The Atom — Fundamental Concepts', description: 'Protons, neutrons, electrons, atomic number, ions' },
    { id: 'isotopes', name: '1.2 Isotopes', description: 'Isotopes, atomic mass, and weighted averages' },
    { id: 'atomic-models', name: '1.3 Atomic Models', description: 'Historical development from Dalton to quantum mechanics' },
    { id: 'quantum-numbers', name: '1.4 Quantum Numbers & Electron Configuration', description: 'Quantum numbers, Aufbau, Hund\'s rule, Pauli exclusion' },
    { id: 'em-radiation', name: '1.5 Electromagnetic Radiation & Atomic Spectra', description: 'Light, photons, Planck\'s equation, emission spectra' },
  ],
  'periodic-table': [
    { id: 'pt-structure', name: '2.1 Structure and Organisation', description: 'Periods, groups, blocks, and element categories' },
    { id: 'periodic-trends', name: '2.2 Periodic Trends', description: 'Atomic radius, ionisation energy, electronegativity' },
    { id: 'element-groups', name: '2.3 Key Element Groups', description: 'Alkali metals, halogens, noble gases, transition metals' },
  ],
  'chemical-bonding': [
    { id: 'bond-nature', name: '3.1 The Nature of Chemical Bonds', description: 'Lewis dot structures, octet rule, and bond formation' },
    { id: 'ionic-bonding', name: '3.2 Ionic Bonding', description: 'Electron transfer, lattice energy, ionic properties' },
    { id: 'covalent-bonding', name: '3.3 Covalent Bonding', description: 'Shared electrons, Lewis structures, resonance' },
    { id: 'vsepr', name: '3.4 VSEPR Theory — Molecular Geometry', description: 'Electron pair repulsion and molecular shapes' },
    { id: 'molecular-polarity', name: '3.5 Molecular Polarity', description: 'Dipole moments and polar vs. nonpolar molecules' },
    { id: 'hybridization', name: '3.6 Hybridisation', description: 'sp, sp², sp³ hybridisation, sigma and pi bonds' },
    { id: 'imf', name: '3.7 Intermolecular Forces', description: 'London dispersion, dipole-dipole, hydrogen bonding' },
    { id: 'metallic-bonding', name: '3.8 Metallic Bonding', description: 'Electron sea model and metallic properties' },
  ],
  'reactions-stoichiometry': [
    { id: 'reaction-basics', name: '4.1 Chemical Reactions — Basics', description: 'Reaction types: synthesis, decomposition, combustion' },
    { id: 'balancing', name: '4.2 Balancing Chemical Equations', description: 'Law of conservation of mass and balancing procedure' },
    { id: 'mole-concept', name: '4.3 The Mole Concept', description: 'Avogadro\'s number, molar mass, mole conversions' },
    { id: 'stoichiometry', name: '4.4 Stoichiometry', description: 'Mole ratios, limiting reagent, percent yield' },
    { id: 'empirical-molecular', name: '4.5 Empirical and Molecular Formulas', description: 'Determining formulas from percent composition' },
    { id: 'solution-stoichiometry', name: '4.6 Solution Stoichiometry', description: 'Molarity, dilution, and net ionic equations' },
  ],
  'states-of-matter': [
    { id: 'three-states', name: '5.1 The Three Classic States', description: 'Solids, liquids, gases — properties and particle behaviour' },
    { id: 'phase-changes', name: '5.2 Phase Changes and Heating Curves', description: 'Melting, boiling, enthalpy of fusion and vaporisation' },
    { id: 'vapor-pressure', name: '5.3 Vapour Pressure and Boiling Point', description: 'Clausius-Clapeyron equation and normal boiling point' },
    { id: 'crystalline-solids', name: '5.4 Types of Crystalline Solids', description: 'Ionic, metallic, molecular, and network covalent solids' },
    { id: 'phase-diagrams', name: '5.5 Phase Diagrams', description: 'Triple point, critical point, and solid-liquid lines' },
  ],
  'gas-laws': [
    { id: 'ideal-gas', name: '6.1 Ideal Gas Behaviour', description: 'Kinetic molecular theory and ideal gas assumptions' },
    { id: 'gas-law-equations', name: '6.2 The Gas Laws', description: 'Boyle, Charles, Gay-Lussac, Avogadro, and ideal gas law' },
    { id: 'dalton-law', name: '6.3 Dalton\'s Law of Partial Pressures', description: 'Partial pressures and mole fractions in gas mixtures' },
    { id: 'graham-law', name: '6.4 Graham\'s Law of Effusion/Diffusion', description: 'Rates of effusion relative to molar mass' },
    { id: 'real-gases', name: '6.5 Real Gases and Deviations', description: 'Van der Waals equation and non-ideal behaviour' },
  ],
  'thermochemistry': [
    { id: 'energy-heat-work', name: '7.1 Energy, Heat, and Work', description: 'Internal energy, first law of thermodynamics' },
    { id: 'enthalpy', name: '7.2 Enthalpy', description: 'ΔH, Hess\'s law, bond enthalpies, calorimetry' },
    { id: 'entropy', name: '7.3 Entropy', description: 'Second and third laws, entropy changes in reactions' },
    { id: 'gibbs', name: '7.4 Gibbs Free Energy', description: 'ΔG = ΔH − TΔS, spontaneity, and equilibrium constant' },
  ],
  'chemical-kinetics': [
    { id: 'reaction-rates', name: '8.1 Reaction Rates', description: 'Rate definition, concentration, temperature, surface area' },
    { id: 'rate-laws', name: '8.2 Rate Laws', description: 'Rate constant, reaction orders, integrated rate laws' },
    { id: 'arrhenius', name: '8.3 Temperature and the Arrhenius Equation', description: 'Activation energy, frequency factor, temperature dependence' },
    { id: 'mechanisms', name: '8.4 Reaction Mechanisms', description: 'Elementary steps, intermediates, rate-determining step' },
    { id: 'catalysis', name: '8.5 Catalysis', description: 'Homogeneous, heterogeneous catalysis, and enzymes' },
  ],
  'equilibrium': [
    { id: 'equilibrium-concept', name: '9.1 The Concept of Equilibrium', description: 'Dynamic equilibrium and its macroscopic properties' },
    { id: 'equilibrium-constant', name: '9.2 The Equilibrium Constant (K)', description: 'Kc, Kp, and rules for manipulating K' },
    { id: 'reaction-quotient', name: '9.3 Reaction Quotient (Q)', description: 'Predicting direction of reaction using Q vs. K' },
    { id: 'le-chatelier', name: '9.4 Le Chatelier\'s Principle', description: 'Effect of concentration, pressure, and temperature changes' },
    { id: 'ice-tables', name: '9.5 Equilibrium Calculations — ICE Tables', description: 'Initial, change, equilibrium approach to solving K problems' },
  ],
  'acid-base': [
    { id: 'acid-base-definitions', name: '10.1 Definitions of Acids and Bases', description: 'Arrhenius, Brønsted-Lowry, and Lewis definitions' },
    { id: 'strong-weak', name: '10.2 Strong and Weak Acids/Bases', description: 'Ka, Kb, pKa, and degree of dissociation' },
    { id: 'ph-scale', name: '10.3 pH, pOH, and the Water Constant', description: 'Kw, pH calculations for strong and weak acids' },
    { id: 'buffers', name: '10.4 Buffer Solutions', description: 'Henderson-Hasselbalch equation and buffer capacity' },
    { id: 'titrations', name: '10.5 Acid-Base Titrations', description: 'Equivalence point, titration curves, and indicators' },
    { id: 'salt-hydrolysis', name: '10.6 Salt Hydrolysis and Polyprotic Acids', description: 'Salt hydrolysis prediction and successive Ka values' },
  ],
  'electrochemistry': [
    { id: 'redox', name: '11.1 Oxidation-Reduction (Redox) Reactions', description: 'Oxidation states, half-reaction method of balancing' },
    { id: 'galvanic-cells', name: '11.2 Galvanic (Voltaic) Cells', description: 'Cell potential, standard reduction potentials, ΔG relation' },
    { id: 'nernst', name: '11.3 The Nernst Equation', description: 'Non-standard conditions and concentration cells' },
    { id: 'electrolytic-cells', name: '11.4 Electrolytic Cells', description: 'Electrolysis, electroplating, and Faraday\'s laws' },
    { id: 'batteries', name: '11.5 Batteries and Fuel Cells', description: 'Lead-acid, lithium-ion, alkaline batteries, and fuel cells' },
  ],
  'solutions': [
    { id: 'solution-types', name: '12.1 Solutions — Types and Terminology', description: 'Solvent, solute, like-dissolves-like, and dissolution' },
    { id: 'concentration', name: '12.2 Concentration Units', description: 'Molarity, molality, mole fraction, and mass percent' },
    { id: 'colligative', name: '12.3 Colligative Properties', description: 'Vapour pressure, boiling point elevation, osmotic pressure' },
    { id: 'henry-ksp', name: '12.4 Henry\'s Law & Solubility Product', description: 'Gas solubility, Ksp, common ion effect' },
  ],
  'organic-chemistry': [
    { id: 'organic-intro', name: '13.1 Introduction to Organic Chemistry', description: 'Carbon\'s properties and the diversity of organic compounds' },
    { id: 'hydrocarbons', name: '13.2 Hydrocarbons', description: 'Alkanes, alkenes, alkynes, and aromatic compounds' },
    { id: 'functional-groups', name: '13.3 Functional Groups', description: 'Alcohols, aldehydes, ketones, acids, esters, amines' },
    { id: 'isomerism', name: '13.4 Isomerism', description: 'Constitutional, geometric (cis/trans), and optical isomers' },
    { id: 'polymers', name: '13.5 Polymers', description: 'Addition and condensation polymerisation, biopolymers' },
  ],
  'nuclear-chemistry': [
    { id: 'radioactivity', name: '14.1 Radioactivity and Nuclear Decay', description: 'Alpha, beta, gamma decay and nuclear equations' },
    { id: 'half-life', name: '14.2 Half-Life and Decay Kinetics', description: 'First-order decay, radiocarbon dating, radiometric methods' },
    { id: 'fission-fusion', name: '14.3 Fission and Fusion', description: 'Chain reactions, mass-energy equivalence, binding energy' },
    { id: 'nuclear-applications', name: '14.4 Applications of Nuclear Chemistry', description: 'Medical imaging, radiation therapy, and radiation units' },
  ],
  'advanced-thermodynamics': [
    { id: 'third-law', name: '15.1 Third Law and Absolute Entropy', description: 'Nernst\'s theorem and standard molar entropies' },
    { id: 'non-standard', name: '15.2 Spontaneity at Non-Standard Conditions', description: 'ΔG = ΔG° + RT ln Q and maximum useful work' },
    { id: 'coupled-reactions', name: '15.3 Coupled Reactions', description: 'Driving unfavourable reactions using ATP and free energy coupling' },
  ],
};

// Generic subtopics for topics not explicitly defined
export function getSubtopics(topicId) {
  if (TOPIC_SUBTOPICS[topicId]) return TOPIC_SUBTOPICS[topicId];
  return [
    { id: 'intro', name: 'Introduction', description: 'Fundamental concepts and overview' },
    { id: 'core', name: 'Core Principles', description: 'Key theories and frameworks' },
    { id: 'applications', name: 'Applications', description: 'Real-world uses and examples' },
    { id: 'advanced', name: 'Advanced Topics', description: 'Deeper exploration and research frontiers' },
  ];
}