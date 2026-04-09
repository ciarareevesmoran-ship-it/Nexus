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
    { id: 'organic', name: 'Organic Chemistry', description: 'Carbon-based compounds and reactions' },
    { id: 'inorganic', name: 'Inorganic Chemistry', description: 'Metals, minerals, and non-carbon chemistry' },
    { id: 'physical', name: 'Physical Chemistry', description: 'Energy changes in chemical reactions' },
    { id: 'biochemistry', name: 'Biochemistry', description: 'Chemistry of living organisms' },
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