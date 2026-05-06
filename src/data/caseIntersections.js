// Curated intersection themes for specific subject pairs.
// Key format: sorted subject IDs joined by '|' (e.g., 'economics|philosophy').
// Each theme defines a 5-module learning path with subject, topic, and subtopic references.

export const CASE_INTERSECTIONS = {
  'economics|philosophy': [
    {
      id: 'ethics-of-markets',
      title: 'The Ethics of Markets',
      description: 'Is the free market morally justified? Can efficiency and fairness coexist?',
      tags: ['Microeconomics', 'Ethics'],
      image: null,
      modules: [
        {
          title: 'Economic Foundations: Markets & Supply and Demand',
          description: 'How prices emerge from the interaction of buyers and sellers.',
          subject: 'economics',
          topic: 'micro',
          subtopic: 'micro-markets',
        },
        {
          title: 'Philosophical Foundations: Normative Ethics',
          description: 'The major ethical frameworks — consequentialism, deontology, and virtue ethics.',
          subject: 'philosophy',
          topic: 'ethics',
          subtopic: 'ethics-normative',
        },
        {
          title: 'Applied Ethics: Real-World Moral Dilemmas',
          description: 'Ethical frameworks applied to contested real-world cases — healthcare, labour, and contested goods.',
          subject: 'philosophy',
          topic: 'ethics',
          subtopic: 'ethics-applied',
        },
        {
          title: 'Case Analysis: Markets in Morally Contested Goods',
          description: 'Should kidneys, votes, and care work be bought and sold?',
          subject: null,
          topic: null,
          subtopic: null,
        },
        {
          title: 'Synthesis: Designing Better Markets',
          description: 'What ethics demands of economic institutions — and what economists can offer ethics.',
          subject: null,
          topic: null,
          subtopic: null,
        },
      ],
    },
    {
      id: 'rational-choice',
      title: 'Rational Choice & Its Discontents',
      description: 'Do people actually reason the way economic models assume? Behavioural economics meets philosophy of mind.',
      tags: ['Behavioural Economics', 'Epistemology'],
      image: null,
      modules: [
        {
          title: 'Economic Foundations: Cognitive Biases and Heuristics',
          description: 'The mental shortcuts that systematically distort our economic decisions.',
          subject: 'economics',
          topic: 'behavioural',
          subtopic: 'beh-biases',
        },
        {
          title: 'Philosophical Foundations: The Limits of Knowledge',
          description: 'Scepticism, uncertainty, and the boundaries of what we can know.',
          subject: 'philosophy',
          topic: 'epistemology',
          subtopic: 'epist-limits',
        },
        {
          title: 'Nudge Theory: Engineering Better Choices',
          description: 'How small environmental changes steer behaviour — and what this means for freedom and policy.',
          subject: 'economics',
          topic: 'behavioural',
          subtopic: 'beh-nudge-theory',
        },
        {
          title: 'Case Analysis: Nudges, Defaults, and Choice Architecture',
          description: 'How small environmental changes steer behaviour — and what this means for freedom.',
          subject: null,
          topic: null,
          subtopic: null,
        },
        {
          title: 'Synthesis: Rethinking Economic Agency',
          description: 'What a more realistic model of human reasoning means for economics and policy.',
          subject: null,
          topic: null,
          subtopic: null,
        },
      ],
    },
    {
      id: 'justice-and-distribution',
      title: 'Justice and Distribution',
      description: 'What do we owe each other economically? Rawls, Nozick, and the debate over inequality.',
      tags: ['Development Economics', 'Applied Ethics'],
      image: null,
      modules: [
        {
          title: 'Economic Foundations: Inequality and Its Consequences',
          description: 'Why economic gaps persist, how we measure them, and why they matter.',
          subject: 'economics',
          topic: 'development',
          subtopic: 'dev-inequality',
        },
        {
          title: 'Philosophical Foundations: Applied Ethics',
          description: 'Using ethical frameworks to reason about real-world dilemmas including distributive justice.',
          subject: 'philosophy',
          topic: 'ethics',
          subtopic: 'ethics-applied',
        },
        {
          title: 'Global Poverty: Development at the Frontier',
          description: 'How poverty persists, what interventions work, and what justice demands of wealthy nations.',
          subject: 'economics',
          topic: 'development',
          subtopic: 'dev-global-poverty',
        },
        {
          title: 'Case Analysis: Wealth Taxes, Inheritance, and the Welfare State',
          description: 'Policies for redistribution through the lens of competing theories of justice.',
          subject: null,
          topic: null,
          subtopic: null,
        },
        {
          title: 'Synthesis: What Would a Just Economy Look Like?',
          description: 'Drawing together economic realities and philosophical principles to sketch an ideal.',
          subject: null,
          topic: null,
          subtopic: null,
        },
      ],
    },
    {
      id: 'knowledge-and-models',
      title: 'Knowledge, Uncertainty, and Economic Models',
      description: 'What can we really know about economic systems? Epistemology meets macroeconomics.',
      tags: ['Macroeconomics', 'Epistemology'],
      image: null,
      modules: [
        {
          title: 'Economic Foundations: What Is Macroeconomics?',
          description: 'The study of whole economies and why aggregate behaviour differs from individual behaviour.',
          subject: 'economics',
          topic: 'macro',
          subtopic: 'macro-intro',
        },
        {
          title: 'Philosophical Foundations: Knowledge, Belief, and Justification',
          description: 'What distinguishes genuine knowledge from mere belief — and what makes a model reliable.',
          subject: 'philosophy',
          topic: 'epistemology',
          subtopic: 'epist-knowledge-justified',
        },
        {
          title: 'The Limits of Knowledge',
          description: 'Scepticism, radical uncertainty, and the hard boundaries of what any model can know.',
          subject: 'philosophy',
          topic: 'epistemology',
          subtopic: 'epist-limits',
        },
        {
          title: 'Case Analysis: The 2008 Financial Crisis as Epistemic Failure',
          description: 'How overconfidence in models — treating uncertainty as risk — produced catastrophic error.',
          subject: null,
          topic: null,
          subtopic: null,
        },
        {
          title: 'Synthesis: Humble Economics',
          description: 'What a philosophically honest economics looks like — and how to act under genuine uncertainty.',
          subject: null,
          topic: null,
          subtopic: null,
        },
      ],
    },
  ],
};

// Given two subject IDs, return the intersection themes for that pair (order-independent).
export function getIntersectionThemes(subjectId1, subjectId2) {
  const key = [subjectId1, subjectId2].sort().join('|');
  return CASE_INTERSECTIONS[key] || null;
}
