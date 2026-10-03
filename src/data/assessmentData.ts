import type { AssessmentItem } from '../types/assessment';
import type { PracticeQuestion, PracticeQuestionFeedbackItem } from '../types/practice';
import rubricMatrixImg from '../assets/rubric-matrix.jpg';

export const COMPLETED_INTERVIEW_SIMULATIONS: AssessmentItem[] = [
  {
    id: 'int-comp-1',
    name: 'Software Engineer Interview Simulation',
    role: 'Software Engineer',
    company: 'Google',
    source: 'Interview Library',
    hasInfoTooltip: true,
    description: 'Full-loop technical and behavioral AI simulation simulating Google L4/L5 SWE hiring rounds with live audio evaluation and coding checks.',
    chapter: 'Interview Simulation',
    topic: 'System Design & Algorithmic Problem Solving',
    selectedChapters: ['Interview Simulation', 'Google Loop'],
    selectedTopics: ['System Design', 'Behavioral Leadership', 'Algorithms'],
    totalQuestions: 5,
    completedQuestions: 5,
    durationMinutes: 45,
    timeSpentMinutes: 38,
    difficulty: 'Advance',
    assessmentType: 'Interview Simulation',
    status: 'completed',
    score: 92,
    accuracy: 92,
    completedDate: '12 Jul 2026',
    competencyScores: {
      technical: 95,
      communication: 92,
      problemSolving: 90,
      leadership: 91,
    },
    strengths: [
      'Comprehensive STAR-structured explanation of distributed cache coherence and consistency trade-offs.',
      'Demonstrated high composure with strategic 2-second pauses before complex technical answers.',
      'Clear quantitative trade-off analysis between write-heavy sharding strategies vs read latency.',
      'Strong eye-contact (98%) and optimal conversational cadence (135 words/minute).'
    ],
    improvements: [
      'Proactively clarify non-functional bandwidth constraints before sketching the relational schema.',
      'Summarize bottom-line business metrics earlier in behavioral conflict resolution stories.'
    ],
    summaryFeedback: 'Outstanding interview loop execution. Strong Hire rating recommended across technical rigor, system design trade-offs, and behavioral ownership.',
    roundsCount: 5,
    interviewerPersona: 'Sarah J. (Principal Staff SWE @ Google Cloud)'
  },
  {
    id: 'int-comp-2',
    name: 'Software Engineer Interview Simulation',
    role: 'Software Engineer',
    company: 'Google',
    source: 'Self-Created',
    hasInfoTooltip: false,
    description: 'Custom-tailored AI simulation focusing on backend distributed systems, site reliability, and resilient fault tolerance.',
    chapter: 'Interview Simulation',
    topic: 'Distributed Consensus & Fault Tolerance',
    selectedChapters: ['Interview Simulation'],
    selectedTopics: ['Distributed Systems', 'Fault Tolerance'],
    totalQuestions: 5,
    completedQuestions: 5,
    durationMinutes: 40,
    timeSpentMinutes: 35,
    difficulty: 'Advance',
    assessmentType: 'Interview Simulation',
    status: 'completed',
    score: 92,
    accuracy: 92,
    completedDate: '12 Jul 2026',
    competencyScores: {
      technical: 94,
      communication: 91,
      problemSolving: 93,
      leadership: 90,
    },
    strengths: [
      'Concise explanation of Raft vs Paxos leader election dynamics and split-brain resolution.',
      'Clear definition of SLA and SLO degradation thresholds under simulated traffic spikes.',
      'Strong structured answers without filler words or hesitation under probing questions.'
    ],
    improvements: [
      'Detail rollback mechanisms in CI/CD canary deployments with automated metrics verification.',
      'Mention disaster recovery RPO and RTO numbers explicitly during database failover discussion.'
    ],
    summaryFeedback: 'Excellent performance in self-created simulation. Highly articulate in discussing distributed consensus, zero-downtime migrations, and high availability.',
    roundsCount: 5,
    interviewerPersona: 'David K. (Systems Architect & Site Reliability Lead)'
  },
  {
    id: 'int-comp-3',
    name: 'Software Engineer Interview Simulation',
    role: 'Software Engineer',
    company: 'Google',
    source: 'Interview Library',
    hasInfoTooltip: true,
    description: 'Curated Google SWE core systems interview simulation covering concurrency, low-level OS primitives, and API reliability.',
    chapter: 'Interview Simulation',
    topic: 'Concurrency & Network Protocols',
    selectedChapters: ['Interview Simulation'],
    selectedTopics: ['Concurrency', 'Network Protocols'],
    totalQuestions: 5,
    completedQuestions: 5,
    durationMinutes: 45,
    timeSpentMinutes: 37,
    difficulty: 'Advance',
    assessmentType: 'Interview Simulation',
    status: 'completed',
    score: 92,
    accuracy: 92,
    completedDate: '12 Jul 2026',
    competencyScores: {
      technical: 96,
      communication: 93,
      problemSolving: 91,
      leadership: 89,
    },
    strengths: [
      'Solid architectural breakdown of HTTP/3 QUIC stream multiplexing and head-of-line blocking elimination.',
      'Excellent handling of unexpected system edge cases and load surges using token bucket rate limiters.',
      'Confident, professional tone and natural body language throughout all 5 rounds.'
    ],
    improvements: [
      'Elaborate more on memory footprint overhead when selecting cache eviction policies (e.g. TinyLFU vs LRU).',
      'Inquire about existing legacy systems before proposing complete architectural rewrites.'
    ],
    summaryFeedback: 'Consistently strong across all 5 rounds. Strong Hire recommendation confirmed.',
    roundsCount: 5,
    interviewerPersona: 'Sarah J. (Principal Staff SWE @ Google Cloud)'
  }
];

export const IN_PROGRESS_INTERVIEW_SIMULATIONS: AssessmentItem[] = [
  {
    id: 'int-prog-1',
    name: 'Software Engineer Interview Simulation',
    role: 'Software Engineer',
    company: 'Google',
    source: 'Interview Library',
    hasInfoTooltip: true,
    description: 'Google L4/L5 Systems & Algorithms loop. 2 of 5 interview rounds completed.',
    chapter: 'Interview Simulation',
    topic: 'System Design & Algorithms',
    selectedChapters: ['Interview Simulation'],
    selectedTopics: ['System Design', 'Algorithms'],
    totalQuestions: 5,
    completedQuestions: 2,
    durationMinutes: 45,
    difficulty: 'Advance',
    assessmentType: 'Interview Simulation',
    status: 'in-progress',
    scheduledDate: 'Started Today, 10:15 AM',
  },
  {
    id: 'int-prog-2',
    name: 'Software Engineer Interview Simulation',
    role: 'Software Engineer',
    company: 'Google',
    source: 'Self-Created',
    hasInfoTooltip: false,
    description: 'Custom full-stack architecture and scaling round. 1 of 5 interview rounds completed.',
    chapter: 'Interview Simulation',
    topic: 'Full Stack Scalability',
    selectedChapters: ['Interview Simulation'],
    selectedTopics: ['Micro-frontends', 'Distributed Backend'],
    totalQuestions: 5,
    completedQuestions: 1,
    durationMinutes: 50,
    difficulty: 'Advance',
    assessmentType: 'Interview Simulation',
    status: 'in-progress',
    scheduledDate: 'Started Yesterday, 04:30 PM',
  }
];

export const INTERVIEW_LIBRARY_OPTIONS = [
  {
    id: 'lib-1',
    role: 'Software Engineer',
    company: 'Google',
    title: 'Google SWE Core Systems & Algorithmic Loop',
    rounds: 5,
    difficulty: 'Advance',
    timeMinutes: 45,
    tags: ['Distributed Systems', 'System Design', 'Behavioral STAR'],
    icon: '⚡',
    description: 'Simulates the rigorous technical and behavioral loop used for L4/L5 engineers at Google Mountain View.'
  },
  {
    id: 'lib-2',
    role: 'Senior SDE',
    company: 'Amazon',
    title: 'Amazon SDE II - Leadership Principles & System Scaling',
    rounds: 5,
    difficulty: 'Advance',
    timeMinutes: 50,
    tags: ['Customer Obsession', 'Ownership', 'High Concurrency'],
    icon: '📦',
    description: 'Deep dive into Amazon Leadership Principles (Customer Obsession, Bias for Action) paired with scalable DynamoDB designs.'
  },
  {
    id: 'lib-3',
    role: 'Frontend Architect',
    company: 'Meta',
    title: 'Meta Frontend Lead - Architecture & UI Performance',
    rounds: 4,
    difficulty: 'Advance',
    timeMinutes: 45,
    tags: ['React Internals', 'Web Vitals', 'State Management'],
    icon: '🌐',
    description: 'Evaluates virtual DOM diffing, component memory leak prevention, hydration performance, and large-scale state trees.'
  },
  {
    id: 'lib-4',
    role: 'Infrastructure Engineer',
    company: 'Stripe',
    title: 'Stripe API Architect - Payments Infrastructure & Concurrency',
    rounds: 4,
    difficulty: 'Advance',
    timeMinutes: 40,
    tags: ['Idempotency', 'Distributed Transactions', 'PCI DSS'],
    icon: '💳',
    description: 'Focused on double-spend prevention, idempotent webhooks, distributed locks with Redis/Zookeeper, and zero downtime.'
  },
  {
    id: 'lib-5',
    role: 'Platform Engineer',
    company: 'Netflix',
    title: 'Netflix Platform Reliability & Chaos Engineering',
    rounds: 4,
    difficulty: 'Advance',
    timeMinutes: 45,
    tags: ['Chaos Mesh', 'Fault Injection', 'Global CDN'],
    icon: '🎬',
    description: 'Probes resilience engineering, automated circuit breakers, gRPC service meshes, and regional multi-cloud failover.'
  },
  {
    id: 'lib-6',
    role: 'Systems Engineer',
    company: 'Apple',
    title: 'Apple Core OS & High-Performance Foundations',
    rounds: 4,
    difficulty: 'Advance',
    timeMinutes: 45,
    tags: ['Memory Management', 'Mach Kernel', 'Swift Concurrency'],
    icon: '🍏',
    description: 'Tests deep knowledge of memory allocators, cache lines, Swift actors, grand central dispatch, and battery efficiency.'
  },
];


export const INITIAL_CURRENT_ASSESSMENTS: AssessmentItem[] = [
  {
    id: 'as-1',
    name: 'Question Understanding Assessment',
    description: 'Comprehensive evaluation of interviewer intent decoding, behavioral vs situational question categorization, and answer structure.',
    chapter: '2 Chapters',
    topic: '3 Topics',
    selectedChapters: ['Chapter 01 — Question Understanding', 'Chapter 02 — Thinking Before Speaking'],
    selectedTopics: ['Identify Question Types', 'Understanding Intent', 'Active Listening'],
    totalQuestions: 20,
    completedQuestions: 8,
    durationMinutes: 30,
    difficulty: 'Standard',
    assessmentType: 'Comprehensive',
    status: 'in-progress',
    scheduledDate: 'Tomorrow, 11:30 AM',
    iconType: 'document',
    hasInfoTooltip: true,
  },
  {
    id: 'as-2',
    name: 'Verbal Delivery Assessment',
    description: 'Timed oral and scenario-based assessment evaluating silence tolerance, 2-second strategic pauses, and PREP/STAR frameworks.',
    chapter: '2 Chapters',
    topic: '3 Topics',
    selectedChapters: ['Chapter 02 — Thinking Before Speaking', 'Chapter 03 — Confidence & Delivery'],
    selectedTopics: ['Voice Responses', 'Strategic Pauses', 'Handling Difficult Questions'],
    totalQuestions: 15,
    completedQuestions: 0,
    durationMinutes: 25,
    difficulty: 'Challenge',
    assessmentType: 'Proctored',
    status: 'upcoming',
    scheduledDate: '02 Oct 2026',
    iconType: 'video',
    hasInfoTooltip: true,
  },
  {
    id: 'as-3',
    name: 'Digital Safety & Ethics Assessment',
    description: 'Diagnostic assessment covering digital workplace security, phishing detection, confidentiality boundaries, and ethical problem solving.',
    chapter: '2 Chapters',
    topic: '3 Topics',
    selectedChapters: ['Chapter 04 — Digital Safety', 'Chapter 06 — Ethical Choices'],
    selectedTopics: ['Password Security', 'Phishing & Scams', 'Workplace Privacy'],
    totalQuestions: 15,
    completedQuestions: 0,
    durationMinutes: 25,
    difficulty: 'Standard',
    assessmentType: 'Diagnostic',
    status: 'upcoming',
    scheduledDate: '05 Oct 2026',
    iconType: 'code',
    hasInfoTooltip: true,
  },
];

export const INITIAL_ASSESSMENT_HISTORY: AssessmentItem[] = [
  {
    id: 'ash-1',
    name: 'Communication Foundations',
    description: 'Official evaluation assessing behavioral questioning mastery, PREP framework delivery, and strategic pause implementation.',
    chapter: '2 Chapters',
    topic: '3 Topics',
    selectedChapters: ['Chapter 01 — Communication Basics', 'Chapter 02 — Speaking Clearly'],
    selectedTopics: ['Communication Process', 'Structuring Messages', 'Tone and Clarity'],
    totalQuestions: 20,
    completedQuestions: 20,
    durationMinutes: 30,
    timeSpentMinutes: 27,
    difficulty: 'Standard',
    assessmentType: 'Proctored',
    status: 'completed',
    score: 90,
    accuracy: 90,
    scheduledDate: '28 Sep 2026',
    completedDate: '28 Sep 2026',
    iconType: 'document',
    hasInfoTooltip: true,
  },
  {
    id: 'ash-2',
    name: 'Software Engineer Assessment',
    description: 'Advanced technical assessment covering algorithms, system design trade-offs, concurrency models, and cloud persistence.',
    chapter: '2 Chapters',
    topic: '4 Topics',
    selectedChapters: ['Data Structures & Algorithms', 'System Architecture'],
    selectedTopics: ['Dynamic Programming', 'Relational Normalization', 'Distributed Caching', 'API Design'],
    totalQuestions: 20,
    completedQuestions: 20,
    durationMinutes: 35,
    timeSpentMinutes: 25,
    difficulty: 'Advance',
    assessmentType: 'Technical',
    status: 'completed',
    score: 92,
    accuracy: 92,
    scheduledDate: '12 Jul 2026',
    completedDate: '12 Jul 2026',
    iconType: 'code',
    hasInfoTooltip: true,
  },
  {
    id: 'ash-3',
    name: 'Critical Thinking & Problem Solving Assessment',
    description: 'Comprehensive evaluation of root cause identification, evidence evaluation, assumption spotting, and structured decision trees.',
    chapter: '2 Chapters',
    topic: '3 Topics',
    selectedChapters: ['Chapter 01 — Understanding Problems', 'Chapter 02 — Breaking Problems Down'],
    selectedTopics: ['Problem Decomposition', 'Root Cause Analysis', 'Evidence & Assumptions'],
    totalQuestions: 18,
    completedQuestions: 18,
    durationMinutes: 30,
    timeSpentMinutes: 22,
    difficulty: 'Standard',
    assessmentType: 'Analytical',
    status: 'completed',
    score: 88,
    accuracy: 88,
    scheduledDate: '15 Aug 2026',
    completedDate: '15 Aug 2026',
    iconType: 'document',
    hasInfoTooltip: true,
  },
];

/**
 * 10 Production-Ready Questions for Assessment Module
 * Matches screenshot Frame 1000008091 for Question 1
 */
export const ASSESSMENT_RUNNER_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'aq-1-android',
    type: 'mcq',
    prompt: 'In Android, what is the purpose of the AndroidManifest.xml file?',
    bloomBadge: '1-REMEMBER',
    points: '2 MARKS',
    additionalContext: {
      language: 'XML',
      title: 'Sample AndroidManifest.xml structure',
      code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.myapp">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">

        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
    },
    options: [
      { id: 'a', text: 'To define the UI layout of the application' },
      { id: 'b', text: 'To declare essential information about the app to the Android system' },
      { id: 'c', text: 'To store application data persistently' },
      { id: 'd', text: 'To define database schemas' },
    ],
    correctAnswer: 'b',
    explanation: 'The AndroidManifest.xml file presents essential information about your app to the Android system, which the system must have before it can run any of the app’s code (including declaring components, hardware features, and required permissions).',
    aiFeedback: 'Great recall! Remember that UI layouts are defined in res/layout XML files, while data persistence is handled via Room, SharedPreferences, or SQLite.',
  },
  {
    id: 'aq-2-scenario',
    type: 'scenario',
    prompt: 'Your interviewer challenges your metrics claim: "A 40% performance gain seems high for a 2-week sprint." How do you handle this?',
    bloomBadge: '4-ANALYZE',
    points: '2 MARKS',
    context: 'Interviewer reaction: Skeptical eyebrow raise, leaning forward, requesting clarification.',
    options: [
      { id: 's1', text: 'Defend assertively and state that management verified the benchmarks.' },
      { id: 's2', text: 'Acknowledge skepticism calmly, state the baseline, and explain the bottleneck that was eliminated.' },
      { id: 's3', text: 'Change the topic to another successful project to avoid argument.' },
      { id: 's4', text: 'Back down immediately and suggest the metric might be inaccurate.' },
    ],
    correctAnswer: 's2',
    explanation: 'Composed acknowledgment followed by explaining the physical mechanism of optimization demonstrates technical maturity under scrutiny.',
    aiFeedback: 'Interviewers often probe aggressively to see how you react under pressure. Remaining collaborative and data-grounded is key.',
  },
  {
    id: 'aq-3-matching',
    type: 'matching',
    prompt: 'Match each verbal delivery technique to its primary strategic interview outcome:',
    bloomBadge: '3-APPLY',
    points: '2 MARKS',
    options: [
      { id: 'l1', text: 'Intentional 2-Second Strategic Pause', side: 'left' },
      { id: 'l2', text: 'PREP Framework Delivery', side: 'left' },
      { id: 'l3', text: 'First-Person "I" Attribution', side: 'left' },
      { id: 'l4', text: 'STAR Quantified Metric Outcome', side: 'left' },
      { id: 'r1', text: 'Eliminates filler words & signals composure', side: 'right' },
      { id: 'r2', text: 'Concise 45-second direct opinion structure', side: 'right' },
      { id: 'r3', text: 'Explicit individual contribution clarity', side: 'right' },
      { id: 'r4', text: 'Verifiable business impact evidence', side: 'right' },
    ],
    correctAnswer: [
      'Intentional 2-Second Strategic Pause:Eliminates filler words & signals composure',
      'PREP Framework Delivery:Concise 45-second direct opinion structure',
      'First-Person "I" Attribution:Explicit individual contribution clarity',
      'STAR Quantified Metric Outcome:Verifiable business impact evidence',
    ],
    explanation: 'Each technique directly targets a standard behavioral evaluation pitfall (rambling, dilution of ownership, and unverified claims).',
    aiFeedback: 'All pairs matched accurately! Mastering these four techniques ensures crisp delivery in high-stakes interviews.',
  },
  {
    id: 'aq-4-code',
    type: 'code',
    prompt: 'Implement a collision-resistant polynomial string hashing function with a prime multiplier of 31 and modulo arithmetic:',
    bloomBadge: '4-ANALYZE',
    points: '3 MARKS',
    codeData: {
      language: 'JAVASCRIPT',
      starterCode: `function hashString(key, tableSize) {
  // Implement polynomial hash
  let hash = 0;
  const prime = 31;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * prime + key.charCodeAt(i)) % tableSize;
  }
  return hash;
}`,
      expectedSolution: `function hashString(key, tableSize) {
  let hash = 0;
  const prime = 31;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * prime + key.charCodeAt(i)) % tableSize;
  }
  return (hash < 0 ? hash + tableSize : hash);
}`,
    },
    correctAnswer: 'Correct polynomial hash implementation with negative check',
    explanation: 'Polynomial accumulation with prime multiplier distributes ascii values uniformly across buckets.',
    aiFeedback: 'Good algorithmic structure. Ensure negative wrap-around is handled when integer overflow occurs.',
  },
  {
    id: 'aq-5-multi',
    type: 'multi-select',
    prompt: 'Which speech habits undermine executive presence in behavioral interview settings? (Select all that apply)',
    bloomBadge: '2-UNDERSTAND',
    points: '2 MARKS',
    options: [
      { id: 'm1', text: 'Frequent filler words ("like", "you know", "um")' },
      { id: 'm2', text: 'Using silent 2-second pauses to organize thoughts' },
      { id: 'm3', text: 'Upspeaking (ending affirmative statements on rising pitch)' },
      { id: 'm4', text: 'Speaking in an unbroken rush without checking interviewer reactions' },
    ],
    correctAnswer: ['m1', 'm3', 'm4'],
    explanation: 'Intentional silence signals composure and command, whereas filler words, upspeaking, and rushed delivery convey anxiety.',
    aiFeedback: 'Excellent distinction. Pauses demonstrate confidence; never rush to fill dead air.',
  },
  {
    id: 'aq-6-truefalse',
    type: 'true-false',
    prompt: 'Saying "We built the distributed queue" rather than specifying "I designed the schema and partitioned the Kafka topics" is preferred in behavioral interviews.',
    bloomBadge: '2-UNDERSTAND',
    points: '1 MARK',
    correctAnswer: 'false',
    explanation: 'False. While acknowledging team effort is healthy, overusing "We" prevents the interviewer from evaluating your individual contribution. Use "I" for your direct actions.',
    aiFeedback: 'Correct! Interviewers evaluate individual capability, so take clear personal ownership of your direct contributions.',
  },
  {
    id: 'aq-7-dropdown',
    type: 'dropdown',
    prompt: 'A question asking a candidate how they would resolve an imaginary production outage with a conflicting tech lead is classified as a [DROPDOWN].',
    bloomBadge: '2-UNDERSTAND',
    points: '1 MARK',
    context: 'Context: Hypothetical future dilemma rather than past historical event.',
    options: [
      { id: 'situational', text: 'Situational Question' },
      { id: 'behavioral', text: 'Behavioral Question' },
      { id: 'technical', text: 'Technical Architecture Question' },
      { id: 'fit', text: 'Culture Fit Question' },
    ],
    correctAnswer: 'situational',
    explanation: 'Questions framed around prospective dilemmas or hypothetical future situations are classified as Situational questions.',
    aiFeedback: 'Spot on! Remember: "Tell me about a time you did X" is behavioral; "What would you do if X happens" is situational.',
  },
  {
    id: 'aq-8-ordering',
    type: 'ordering',
    prompt: 'Arrange the 4 steps of structured verbal delivery in the recommended chronological order:',
    bloomBadge: '3-APPLY',
    points: '2 MARKS',
    options: [
      { id: 'step1', text: 'Active Listening & Intent Decoding' },
      { id: 'step2', text: 'Intentional 2-Second Strategic Pause' },
      { id: 'step3', text: 'Crisp Headline / Direct Answer' },
      { id: 'step4', text: 'Structured Evidence (STAR / PREP) & Impact' },
    ],
    correctAnswer: ['step1', 'step2', 'step3', 'step4'],
    explanation: 'Always decode the question first, pause to outline your response, give the headline immediately, then deliver supporting evidence.',
    aiFeedback: 'Great delivery order! Never skip the pause—it prevents filler words and rambling.',
  },
  {
    id: 'aq-9-text',
    type: 'text',
    prompt: 'In the context of relational databases, explain how moving from 1NF to 3NF eliminates data redundancy and update anomalies.',
    bloomBadge: '4-ANALYZE',
    points: '3 MARKS',
    correctAnswer: 'Moving from 1NF to 3NF removes partial key dependencies (2NF) and transitive functional dependencies (3NF), ensuring non-key attributes depend solely on the primary key.',
    explanation: 'Isolating non-prime attributes into dedicated relations prevents deletion and update anomalies.',
    aiFeedback: 'Strong entities have primary keys and exist independently. Cleanly isolated relations preserve referential integrity.',
  },
  {
    id: 'aq-10-image',
    type: 'image',
    prompt: 'Review the interview communication rubric below. Which tier corresponds to structured ownership and quantifiable metric evidence?',
    bloomBadge: '2-UNDERSTAND',
    points: '2 MARKS',
    image: rubricMatrixImg,
    options: [
      { id: 'tier1', text: 'Tier 1: Comprehensive STAR Framing with Quantified Evidence' },
      { id: 'tier2', text: 'Tier 2: General Team Description without Individual Specifics' },
      { id: 'tier3', text: 'Tier 3: Theoretical Problem Description without Outcome' },
      { id: 'tier4', text: 'Tier 4: Vague Speculation' },
    ],
    correctAnswer: 'tier1',
    explanation: 'Tier 1 demonstrates full behavioral maturity by providing quantifiable metrics and explicit personal ownership.',
    aiFeedback: 'When an image or rubric is presented, anchor your verbal answer on the top-tier evaluation criteria.',
  },
];

/**
 * Generate historical feedback items for assessment review
 */
export function generateAssessmentFeedbackItems(assessment: AssessmentItem): PracticeQuestionFeedbackItem[] {
  return [
    {
      id: 'fb-aq-1',
      questionNumber: 1,
      type: 'mcq',
      prompt: 'In Android, what is the purpose of the AndroidManifest.xml file?',
      bloomBadge: '1-REMEMBER',
      points: '2 MARKS',
      options: [
        { id: 'a', letter: 'A', text: 'To define the UI layout of the application' },
        { id: 'b', letter: 'B', text: 'To declare essential information about the app to the Android system' },
        { id: 'c', letter: 'C', text: 'To store application data persistently' },
        { id: 'd', letter: 'D', text: 'To define database schemas' },
      ],
      studentAnswer: 'b',
      correctAnswer: 'b',
      isCorrect: true,
      resultStatus: 'correct',
      explanation: 'The AndroidManifest.xml file presents essential information about your app to the Android system.',
      aiFeedback: 'Great recall! UI layouts are in res/layout, and data persistence uses Room or SQLite.',
      chapterName: assessment.chapter,
      topicName: assessment.topic,
    },
    {
      id: 'fb-aq-2',
      questionNumber: 2,
      type: 'scenario',
      prompt: 'Your interviewer challenges your metrics claim: "A 40% performance gain seems high for a 2-week sprint." How do you handle this?',
      bloomBadge: '4-ANALYZE',
      points: '2 MARKS',
      context: 'Interviewer reaction: Skeptical eyebrow raise, leaning forward, requesting clarification.',
      options: [
        { id: 's1', text: 'Defend assertively and state that management verified the benchmarks.' },
        { id: 's2', text: 'Acknowledge skepticism calmly, state the baseline, and explain the bottleneck that was eliminated.' },
        { id: 's3', text: 'Change the topic to another successful project to avoid argument.' },
        { id: 's4', text: 'Back down immediately and suggest the metric might be inaccurate.' },
      ],
      studentAnswer: 'Acknowledge skepticism calmly, state the baseline, and explain the bottleneck that was eliminated.',
      correctAnswer: 's2',
      isCorrect: true,
      resultStatus: 'correct',
      explanation: 'Composed acknowledgment followed by explaining the physical mechanism of optimization demonstrates technical maturity under scrutiny.',
      aiFeedback: 'Interviewers often probe aggressively to see how you react under pressure. Remaining collaborative and data-grounded is key.',
      chapterName: assessment.chapter,
      topicName: assessment.topic,
    },
    {
      id: 'fb-aq-3',
      questionNumber: 3,
      type: 'matching',
      prompt: 'Match each verbal delivery technique to its primary strategic interview outcome:',
      bloomBadge: '3-APPLY',
      points: '2 MARKS',
      matchingPairs: [
        {
          prompt: 'Intentional 2-Second Strategic Pause',
          studentMatch: 'Eliminates filler words & signals composure',
          correctMatch: 'Eliminates filler words & signals composure',
          isCorrect: true,
        },
        {
          prompt: 'PREP Framework Delivery',
          studentMatch: 'Concise 45-second direct opinion structure',
          correctMatch: 'Concise 45-second direct opinion structure',
          isCorrect: true,
        },
        {
          prompt: 'First-Person "I" Attribution',
          studentMatch: 'Explicit individual contribution clarity',
          correctMatch: 'Explicit individual contribution clarity',
          isCorrect: true,
        },
        {
          prompt: 'STAR Quantified Metric Outcome',
          studentMatch: 'Verifiable business impact evidence',
          correctMatch: 'Verifiable business impact evidence',
          isCorrect: true,
        },
      ],
      studentAnswer: 'All 4 pairs matched correctly.',
      correctAnswer: 'All 4 pairs matched correctly.',
      isCorrect: true,
      resultStatus: 'correct',
      explanation: 'Each technique directly targets a standard behavioral evaluation pitfall.',
      aiFeedback: 'All pairs matched accurately! Mastering these four techniques ensures crisp delivery in high-stakes interviews.',
      chapterName: assessment.chapter,
      topicName: assessment.topic,
    },
    {
      id: 'fb-aq-4',
      questionNumber: 4,
      type: 'code',
      prompt: 'Implement a collision-resistant polynomial string hashing function with a prime multiplier of 31 and modulo arithmetic:',
      bloomBadge: '4-ANALYZE',
      points: '3 MARKS',
      codeData: {
        language: 'JAVASCRIPT',
        studentCode: `function hashString(key, tableSize) {\n  let hash = 0;\n  const prime = 31;\n  for (let i = 0; i < key.length; i++) {\n    hash = (hash * prime + key.charCodeAt(i)) % tableSize;\n  }\n  return hash < 0 ? hash + tableSize : hash;\n}`,
        expectedSolution: `function hashString(key, tableSize) {\n  let hash = 0;\n  const prime = 31;\n  for (let i = 0; i < key.length; i++) {\n    hash = (hash * prime + key.charCodeAt(i)) % tableSize;\n  }\n  return hash < 0 ? hash + tableSize : hash;\n}`,
      },
      studentAnswer: 'Complete hash function with negative wrap-around guard.',
      correctAnswer: 'Complete hash function with negative wrap-around guard.',
      isCorrect: true,
      resultStatus: 'correct',
      explanation: 'Polynomial accumulation with prime multiplier distributes ascii values uniformly.',
      aiFeedback: 'Clean and optimal solution. Modulo arithmetic ensures hashes remain within bounds.',
      chapterName: assessment.chapter,
      topicName: assessment.topic,
    },
    {
      id: 'fb-aq-5',
      questionNumber: 5,
      type: 'multi-select',
      prompt: 'Which speech habits undermine executive presence in behavioral interview settings? (Select all that apply)',
      bloomBadge: '2-UNDERSTAND',
      points: '2 MARKS',
      options: [
        { id: 'm1', text: 'Frequent filler words ("like", "you know", "um")' },
        { id: 'm2', text: 'Using silent 2-second pauses to organize thoughts' },
        { id: 'm3', text: 'Upspeaking (ending affirmative statements on rising pitch)' },
        { id: 'm4', text: 'Speaking in an unbroken rush without checking interviewer reactions' },
      ],
      studentAnswer: [
        'Frequent filler words ("like", "you know", "um")',
        'Upspeaking (ending affirmative statements on rising pitch)',
        'Speaking in an unbroken rush without checking interviewer reactions',
      ],
      correctAnswer: [
        'Frequent filler words ("like", "you know", "um")',
        'Upspeaking (ending affirmative statements on rising pitch)',
        'Speaking in an unbroken rush without checking interviewer reactions',
      ],
      isCorrect: true,
      resultStatus: 'correct',
      explanation: 'Intentional silence signals composure, whereas filler words, upspeaking, and rushed delivery convey anxiety.',
      aiFeedback: 'Excellent distinction. Pauses demonstrate confidence; never rush to fill dead air.',
      chapterName: assessment.chapter,
      topicName: assessment.topic,
    },
    {
      id: 'fb-aq-6',
      questionNumber: 6,
      type: 'true-false',
      prompt: 'Saying "We built the distributed queue" rather than specifying "I designed the schema and partitioned the Kafka topics" is preferred in behavioral interviews.',
      bloomBadge: '2-UNDERSTAND',
      points: '1 MARK',
      studentAnswer: 'false',
      correctAnswer: 'false',
      isCorrect: true,
      resultStatus: 'correct',
      explanation: 'False. While acknowledging team effort is healthy, overusing "We" makes it impossible to evaluate your individual contribution.',
      aiFeedback: 'Correct! Interviewers evaluate individual capability, so take clear personal ownership of your direct contributions.',
      chapterName: assessment.chapter,
      topicName: assessment.topic,
    },
    {
      id: 'fb-aq-7',
      questionNumber: 7,
      type: 'dropdown',
      prompt: 'A question asking a candidate how they would resolve an imaginary production outage with a conflicting tech lead is classified as a [DROPDOWN].',
      bloomBadge: '2-UNDERSTAND',
      points: '1 MARK',
      context: 'Context: Hypothetical future dilemma rather than past historical event.',
      options: [
        { id: 'situational', text: 'Situational Question' },
        { id: 'behavioral', text: 'Behavioral Question' },
        { id: 'technical', text: 'Technical Architecture Question' },
        { id: 'fit', text: 'Culture Fit Question' },
      ],
      studentAnswer: 'Situational Question',
      correctAnswer: 'Situational Question',
      isCorrect: true,
      resultStatus: 'correct',
      explanation: 'Questions framed around prospective dilemmas or hypothetical future situations are classified as Situational questions.',
      aiFeedback: 'Spot on! Remember: "Tell me about a time you did X" is behavioral; "What would you do if X happens" is situational.',
      chapterName: assessment.chapter,
      topicName: assessment.topic,
    },
    {
      id: 'fb-aq-8',
      questionNumber: 8,
      type: 'ordering',
      prompt: 'Arrange the 4 steps of structured verbal delivery in the recommended chronological order:',
      bloomBadge: '3-APPLY',
      points: '2 MARKS',
      orderingItems: {
        studentOrder: [
          '1. Active Listening & Intent Decoding',
          '2. Intentional 2-Second Strategic Pause',
          '3. Crisp Headline / Direct Answer',
          '4. Structured Evidence (STAR / PREP) & Impact',
        ],
        correctOrder: [
          '1. Active Listening & Intent Decoding',
          '2. Intentional 2-Second Strategic Pause',
          '3. Crisp Headline / Direct Answer',
          '4. Structured Evidence (STAR / PREP) & Impact',
        ],
      },
      studentAnswer: 'Active Listening → Strategic Pause → Direct Answer → Structured Evidence',
      correctAnswer: 'Active Listening → Strategic Pause → Direct Answer → Structured Evidence',
      isCorrect: true,
      resultStatus: 'correct',
      explanation: 'Always decode the question first, pause to outline your response, give the headline immediately, then deliver supporting evidence.',
      aiFeedback: 'Great delivery order! Never skip the pause—it prevents filler words and rambling.',
      chapterName: assessment.chapter,
      topicName: assessment.topic,
    },
    {
      id: 'fb-aq-9',
      questionNumber: 9,
      type: 'text',
      prompt: 'In the context of relational databases, explain how moving from 1NF to 3NF eliminates data redundancy and update anomalies.',
      bloomBadge: '4-ANALYZE',
      points: '3 MARKS',
      studentAnswer: 'Moving from 1NF to 3NF removes partial key dependencies in 2NF and transitive dependencies in 3NF. This ensures every non-prime attribute depends directly and solely on the primary key, eliminating duplicate records and anomaly errors.',
      correctAnswer: 'Moving from 1NF to 3NF removes partial key dependencies (2NF) and transitive functional dependencies (3NF), ensuring non-key attributes depend solely on the primary key.',
      isCorrect: true,
      resultStatus: 'correct',
      explanation: 'Isolating non-prime attributes into dedicated relations prevents deletion and update anomalies.',
      aiFeedback: 'Strong entities have primary keys and exist independently. Cleanly isolated relations preserve referential integrity.',
      chapterName: assessment.chapter,
      topicName: assessment.topic,
    },
    {
      id: 'fb-aq-10',
      questionNumber: 10,
      type: 'image',
      prompt: 'Review the interview communication rubric below. Which tier corresponds to structured ownership and quantifiable metric evidence?',
      bloomBadge: '2-UNDERSTAND',
      points: '2 MARKS',
      image: rubricMatrixImg,
      options: [
        { id: 'tier1', text: 'Tier 1: Comprehensive STAR Framing with Quantified Evidence' },
        { id: 'tier2', text: 'Tier 2: General Team Description without Individual Specifics' },
        { id: 'tier3', text: 'Tier 3: Theoretical Problem Description without Outcome' },
        { id: 'tier4', text: 'Tier 4: Vague Speculation' },
      ],
      studentAnswer: 'Tier 1: Comprehensive STAR Framing with Quantified Evidence',
      correctAnswer: 'Tier 1: Comprehensive STAR Framing with Quantified Evidence',
      isCorrect: true,
      resultStatus: 'correct',
      explanation: 'Tier 1 demonstrates full behavioral maturity by providing quantifiable metrics and explicit personal ownership.',
      aiFeedback: 'When an image or rubric is presented, anchor your verbal answer on the top-tier evaluation criteria.',
      chapterName: assessment.chapter,
      topicName: assessment.topic,
    },
  ];
}

export interface InterviewRoundDetail {
  id: string;
  roundNumber: number;
  category: 'System Design' | 'Behavioral (STAR)' | 'Algorithms & Data Structures' | 'Resilience & Distributed Systems' | 'Engineering Leadership';
  prompt: string;
  interviewerAvatarUrl?: string;
  interviewerName: string;
  interviewerRole: string;
  candidateResponseTranscript: string;
  audioDuration: string;
  score: number;
  scoreLabel: string;
  keyStrengths: string[];
  growthTips: string[];
  aiAnalysis: string;
  rubricCriterion: {
    name: string;
    score: number;
    feedback: string;
  }[];
}

export function generateInterviewDetailRounds(assessment: AssessmentItem): InterviewRoundDetail[] {
  return [
    {
      id: 'round-1',
      roundNumber: 1,
      category: 'System Design',
      prompt: 'Design a globally distributed URL shortening service handling 100M daily writes with sub-10ms read latency. How do you ensure high availability and prevent single points of failure?',
      interviewerName: 'Sarah J.',
      interviewerRole: 'Principal Staff SWE, Google Cloud',
      audioDuration: '6m 42s',
      score: 95,
      scoreLabel: 'Exceptional (L5+ Level)',
      candidateResponseTranscript: `First, I clarified our write-to-read ratio at 1:10, estimating 1.15k writes/sec and 11.5k reads/sec, meaning throughput is easily manageable with horizontal API gateways. For URL tokenization, I selected Base62 encoding over 7 characters giving 3.5 trillion unique slugs. To eliminate single points of failure in distributed ID generation, I avoided auto-increment DB IDs and instead used a distributed Snowflake ID generator with dedicated worker IDs and epoch timestamps. For storage, I paired MongoDB/Cassandra for geo-partitioned document storage with Redis Cluster for LRU caching popular links with a 99.8% cache hit ratio. Data replication across three GCP regions uses active-passive multi-region failover.`,
      keyStrengths: [
        'Accurately derived QPS and storage sizing requirements upfront.',
        'Selected 7-character Base62 encoding with clear collision avoidance justification.',
        'Structured the architecture into API layer, Distributed ID generator, and Geo-replicated Cache.'
      ],
      growthTips: [
        'Mention Bloom Filters explicitly to reject lookups for non-existent URLs before querying the cache.'
      ],
      aiAnalysis: 'Outstanding architectural clarity. The candidate articulated trade-offs between consistency and latency with remarkable fluency, citing concrete operational numbers.',
      rubricCriterion: [
        { name: 'Requirement Clarification & Sizing', score: 98, feedback: 'Proactively derived quantitative constraints before designing.' },
        { name: 'High-Level Architecture & Components', score: 96, feedback: 'Clean separation of concerns with geo-distributed failover.' },
        { name: 'Deep Dive & Bottleneck Resolution', score: 92, feedback: 'Strong rationale for Snowflake ID generation over auto-increment.' }
      ]
    },
    {
      id: 'round-2',
      roundNumber: 2,
      category: 'Behavioral (STAR)',
      prompt: 'Tell me about a situation where you had a critical technical disagreement with a senior engineer or architect regarding a production design. How did you resolve it?',
      interviewerName: 'Sarah J.',
      interviewerRole: 'Principal Staff SWE, Google Cloud',
      audioDuration: '4m 18s',
      score: 92,
      scoreLabel: 'Strong Hire (STAR Mastered)',
      candidateResponseTranscript: `In my previous project, we were designing a real-time event streaming pipeline. A senior architect advocated for a synchronous REST polling pattern to save upfront operational overhead, whereas I proposed an asynchronous Kafka event-driven pipeline. Recognizing that arguing hypothetically wouldn't align us, I drafted a quick 2-day proof-of-concept benchmark measuring end-to-end latency under 5x projected peak load. The benchmarks clearly demonstrated that polling triggered cascade timeouts at 3,000 concurrent sockets, whereas Kafka maintained under 45ms P99 latency. I presented the empirical data in an objective, blame-free retrospective. The architect appreciated the evidence-first methodology and approved the Kafka implementation, which subsequently ran with 99.99% uptime.`,
      keyStrengths: [
        'Perfect adherence to the Situation, Task, Action, Result (STAR) structure.',
        'Substituted opinions with objective empirical benchmarking data.',
        'Demonstrated high emotional intelligence and collaborative respect for senior peers.'
      ],
      growthTips: [
        'State the business impact or financial savings of preventing production downtime earlier.'
      ],
      aiAnalysis: 'The candidate showcased exemplary interpersonal maturity, focusing on collaborative verification through data rather than ego-driven debate.',
      rubricCriterion: [
        { name: 'STAR Framework Fidelity', score: 95, feedback: 'Crisp structure from background context to concrete metrics.' },
        { name: 'Conflict Resolution & Empathy', score: 94, feedback: 'Objective empirical benchmark approach avoided friction.' },
        { name: 'Business & Team Impact', score: 88, feedback: 'Good mention of 99.99% uptime; could add cost ROI.' }
      ]
    },
    {
      id: 'round-3',
      roundNumber: 3,
      category: 'Algorithms & Data Structures',
      prompt: 'How would you design a thread-safe LRU Cache that achieves concurrent reads without blocking other readers, while guaranteeing strict O(1) eviction under memory pressure?',
      interviewerName: 'Liam T.',
      interviewerRole: 'Dev Lead & Staff Systems Engineer',
      audioDuration: '5m 30s',
      score: 94,
      scoreLabel: 'Exceptional Technical Depth',
      candidateResponseTranscript: `A classic LRU combines a doubly linked list with a hash map. However, in a multi-threaded scenario, naive synchronized methods serialize access and create significant thread contention. To solve this, I decoupled the read path from the node-reordering path using a ring buffer of read events processed by a background worker, or a concurrent hash map with fine-grained bucket locks (striped locks). For eviction, we maintain a doubly linked list protected by a mutex only when capacity exceeds thresholds, utilizing lock-free hazard pointers or RCU (Read-Copy-Update) semantics to allow concurrent readers to safely traverse without locks.`,
      keyStrengths: [
        'Identified the lock contention bottleneck in naive synchronized LRU caches immediately.',
        'Proposed lock striping and asynchronous event ring buffers (similar to Caffeine Cache).',
        'Accurately analyzed memory barriers and atomic operations.'
      ],
      growthTips: [
        'Mention amortized time complexity when background ring buffer batches write operations.'
      ],
      aiAnalysis: 'Superb systems-level understanding. Comparing naive mutexes against modern high-throughput cache designs (like Guava/Caffeine) demonstrated elite domain mastery.',
      rubricCriterion: [
        { name: 'Algorithmic Correctness', score: 96, feedback: 'Flawless O(1) operational complexity.' },
        { name: 'Concurrency Primitives', score: 94, feedback: 'Deep knowledge of striped locking and atomic operations.' },
        { name: 'Optimization Trade-offs', score: 92, feedback: 'Clear understanding of cache hit throughput vs eviction accuracy.' }
      ]
    },
    {
      id: 'round-4',
      roundNumber: 4,
      category: 'Resilience & Distributed Systems',
      prompt: 'Suppose a downstream payment processing gateway experiences sudden 4000ms latency spikes during Black Friday. How do you prevent thread starvation and cascading failures in upstream client-facing services?',
      interviewerName: 'David K.',
      interviewerRole: 'Systems Architect & Site Reliability Lead',
      audioDuration: '5m 12s',
      score: 90,
      scoreLabel: 'Advanced SRE Competence',
      candidateResponseTranscript: `To prevent thread pool exhaustion and cascading failures, we implement a defense-in-depth resilience pattern: 1) Circuit Breakers (e.g. Resilience4j) configured with a failure/latency threshold that trips open after 50% slow calls over a 10-call sliding window. 2) Strict timeouts: Setting socket and connection timeouts at 1200ms rather than default unbounded values. 3) Bulkheads: Isolating the payment processing thread pool from user browsing and checkout cart services so slow payment calls cannot exhaust worker threads for the rest of the app. 4) Graceful Fallbacks: Queuing asynchronous orders into an idempotent dead-letter message broker to process once downstream health recovers.`,
      keyStrengths: [
        'Outlined Circuit Breakers, Bulkheads, and Strict Timeouts cohesively.',
        'Addressed thread pool isolation using bulkhead patterns.',
        'Proposed asynchronous recovery via idempotent durable message queues.'
      ],
      growthTips: [
        'Specify how exponential backoff with full jitter prevents thundering herd problem on gateway recovery.'
      ],
      aiAnalysis: 'Solid distributed systems resilience architecture. The candidate highlighted practical production battle-tested patterns (bulkheads, timeouts, circuit breakers).',
      rubricCriterion: [
        { name: 'Fault Tolerance Strategies', score: 92, feedback: 'Comprehensive multi-tier isolation.' },
        { name: 'Cascading Failure Prevention', score: 91, feedback: 'Bulkhead thread pool isolation explained clearly.' },
        { name: 'Recovery & Backoff', score: 87, feedback: 'Could emphasize jittered exponential backoffs.' }
      ]
    },
    {
      id: 'round-5',
      roundNumber: 5,
      category: 'Engineering Leadership',
      prompt: 'How do you prioritize technical debt refactoring when non-technical product managers are pushing hard for urgent customer-facing feature releases?',
      interviewerName: 'Sarah J.',
      interviewerRole: 'Principal Staff SWE, Google Cloud',
      audioDuration: '4m 45s',
      score: 89,
      scoreLabel: 'Strong Leadership Maturity',
      candidateResponseTranscript: `I never frame tech debt as pure engineering indulgence; instead, I translate technical debt directly into business currency—namely velocity, developer cycle time, and customer churn risk. For example, I show product managers that adding a feature to an unrefactored spaghetti module takes 3 sprints with a 25% defect rate, whereas a 1-sprint refactor reduces subsequent feature build times to 0.5 sprints with 0 regressions. In our quarterly planning, I advocate for an agreed 80/20 capacity allocation—80% customer roadmap and 20% stability/refactoring—with clear SLAs on addressing critical reliability hotspots.`,
      keyStrengths: [
        'Framed technical debt in terms of business velocity, risk, and feature cycle time.',
        'Recommended an institutionalized 80/20 capacity allocation model.',
        'Demonstrated strong collaboration and partnership with product leadership.'
      ],
      growthTips: [
        'Mention automated code health metrics (e.g. cyclomatic complexity, test coverage trends) as objective dashboards.'
      ],
      aiAnalysis: 'Strong strategic thinking. Bridging the gap between engineering quality and business value is the hallmark of a senior technical leader.',
      rubricCriterion: [
        { name: 'Stakeholder Communication', score: 92, feedback: 'Articulates engineering needs in business language.' },
        { name: 'Process & Capacity Planning', score: 88, feedback: 'Pragmatic 80/20 allocation strategy.' },
        { name: 'Risk Management', score: 88, feedback: 'Clear linkage between technical debt and customer defect rates.' }
      ]
    }
  ];
}

