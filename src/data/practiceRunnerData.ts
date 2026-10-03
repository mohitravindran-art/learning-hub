import type { PracticeQuestion, PracticeQuestionFeedbackItem } from '../types/practice';
import rubricMatrixImg from '../assets/rubric-matrix.jpg';

export const PRACTICE_RUNNER_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q-1-mcq',
    type: 'mcq',
    prompt: 'In Android, what is the purpose of the AndroidManifest.xml file?',
    bloomBadge: '1-REMEMBER',
    points: '1M [22]',
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
      { id: 'opt-a', letter: 'A', text: 'To define the UI layout of the application' },
      { id: 'opt-b', letter: 'B', text: 'To declare essential information about the app to the Android system' },
      { id: 'opt-c', letter: 'C', text: 'To store application data persistently' },
      { id: 'opt-d', letter: 'D', text: 'To define database schemas' },
    ],
    correctAnswer: 'B',
    explanation: 'The AndroidManifest.xml file presents essential information about your app to the Android system, including components, permissions, and hardware requirements.',
    aiFeedback: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
  },
  {
    id: 'q-2-audio',
    type: 'audio',
    prompt: 'Which best describes the core concept of "Intent vs Literal Meaning"?',
    bloomBadge: '2-UNDERSTAND',
    points: '1M [22]',
    additionalContext: {
      title: 'Contextual Scenario & Speech Audio',
      description: 'Record your verbal explanation of how intent differs from literal phrasing in executive communication and cross-functional conflict resolution.',
    },
    audioData: {
      duration: '1:02',
      transcript: 'It reduces the size of the database by eliminating null values and optional attributes. In the context of relational databases, explain how normalization reduces data redundancy and improves data integrity. Which of the following best describes the main benefit of moving a database from 1NF to 3NF?',
    },
    correctAnswer: 'Clear distinction between what words literally convey and the strategic intention of the speaker.',
    explanation: 'Intent refers to the communicator\'s underlying strategic objective or emotional state, whereas literal meaning is the exact dictionary definition of the words used.',
    aiFeedback: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
  },
  {
    id: 'q-3-conv',
    type: 'conversational',
    prompt: 'In Android, what is the purpose of the AndroidManifest.xml file?',
    bloomBadge: '5-EVALUATE',
    points: '1M [22]',
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
    chatMessages: [
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Should social media platforms be held legally responsible for the content shared by their users? Should social media platforms be held legally responsible for the content shared',
        time: '11:20 AM',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: 'Absolutely! Let\'s dive into GreenThread\'s situation. To start, what do you see as the core problem Ananya Mehta and GreenThread are facing right now, based on the case description?',
        time: '11:21 AM',
      },
      {
        id: 'msg-3',
        sender: 'user',
        text: 'Hello! I\'m ready to analyze this case study. Can you guide me through it?',
        time: '11:22 AM',
      },
      {
        id: 'msg-4',
        sender: 'bot',
        text: 'Absolutely! Let\'s dive into GreenThread\'s situation. To start, what do you see as the core problem Ananya Mehta and GreenThread are facing right now, based on the case description?',
        time: '11:23 AM',
      },
      {
        id: 'msg-5',
        sender: 'user',
        text: 'Hello! I\'m ready to analyze this case study. Can you guide me through it?',
        time: '11:24 AM',
      },
    ],
    correctAnswer: 'Platforms need balanced governance balancing Section 230 safe harbors with proactive content moderation.',
    explanation: 'Conversational case studies evaluate progressive reasoning, active listening, and structured delivery in dialogue.',
    aiFeedback: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
  },
  {
    id: 'q-4-code',
    type: 'code',
    prompt: 'It reduces the size of the database by eliminating null values and optional attributes. In the context of relational databases, explain how normalization reduces data redundancy and improves data integrity. Which of the following best describes the main benefit of moving a database from 1NF to 3NF?',
    bloomBadge: '4-ANALYZE',
    points: '1M [22]',
    additionalContext: {
      language: 'JAVASCRIPT',
      title: 'Algorithm & Database Logic Context',
      code: `// Ensure hash distribution avoids collisions in hash table buckets\nfunction hashKey(key, size) { ... }`,
    },
    codeData: {
      language: 'JAVASCRIPT',
      starterCode: `function sub(a, b) {
  return a - b;
}`,
      expectedSolution: `public class Solution {
  public static int robustStringHash(String key, int tableSize) {
    long hash = 0;
    long primeMultiplier = 31; // A common prime for string hashing
    
    for (int i = 0; i < key.length(); i++) {
      hash = (hash * primeMultiplier + key.charAt(i)) % tableSize;
    }
    if (hash < 0) {
      hash += tableSize;
    }
    return (int) hash;
  }
}`,
    },
    correctAnswer: 'Complete hashing implementation with non-negative mod handling',
    explanation: 'Expected solution distributes hash values uniformly across tableSize and handles negative hash integer overflow.',
    aiFeedback: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
  },
  {
    id: 'q-5-text',
    type: 'text',
    prompt: 'It reduces the size of the database by eliminating null values and optional attributes. In the context of relational databases, explain how normalization reduces data redundancy and improves data integrity. Which of the following best describes the main benefit of moving a database from 1NF to 3NF?',
    bloomBadge: '3-APPLY',
    points: '1M [22]',
    additionalContext: {
      language: 'TEXT',
      title: 'Database Normalization Benchmark',
      description: 'Compare insertion, update, and deletion anomalies between unnormalized tables vs 3NF decomposed tables.',
    },
    correctAnswer: 'Eliminates partial and transitive dependencies, ensuring every non-key attribute depends solely on the primary key.',
    explanation: 'Moving from 1NF to 3NF removes partial dependencies (2NF) and transitive dependencies (3NF), preserving data integrity and eliminating update anomalies.',
    aiFeedback: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
  },
  {
    id: 'q-6-multi',
    type: 'multi-select',
    prompt: 'Which of the following are characteristics of behavioral interview questions? (Select all that apply)',
    bloomBadge: '2-UNDERSTAND',
    points: '1M [22]',
    options: [
      { id: 'm1', text: 'Prompt for verifiable past actions and real situations' },
      { id: 'm2', text: 'Begin with cues like "Tell me about a time when..."' },
      { id: 'm3', text: 'Ask what you would hypothetically do in an imaginary future sprint' },
      { id: 'm4', text: 'Allow the interviewer to evaluate past performance as a predictor of future success' },
    ],
    correctAnswer: [
      'Prompt for verifiable past actions and real situations',
      'Begin with cues like "Tell me about a time when..."',
      'Allow the interviewer to evaluate past performance as a predictor of future success'
    ],
    explanation: 'Behavioral questions focus on past real-world evidence, not hypothetical conjectures (which are situational).',
    aiFeedback: 'When answering multi-select behavioral questions, anchor your responses on demonstrable evidence and past track record.',
  },
  {
    id: 'q-7-tf',
    type: 'true-false',
    prompt: 'In the STAR framework, the "Action" component should ideally comprise 60% or more of your total response time.',
    bloomBadge: '3-APPLY',
    points: '1M [22]',
    correctAnswer: 'true',
    explanation: 'Correct. Interviewers evaluate candidates on personal agency and problem-solving execution. Situation and Task should be concise (20%), while Action takes 60% and Result takes 20%.',
    aiFeedback: 'Ensure you clearly emphasize what YOU did rather than speaking in vague generalities about team accomplishments.',
  },
  {
    id: 'q-8-match',
    type: 'matching',
    prompt: 'Match each interview question opening phrase with its underlying primary evaluation intent:',
    bloomBadge: '4-ANALYZE',
    points: '2M [22]',
    options: [
      { id: 'l1', text: '“Tell me about a time...”', side: 'left' },
      { id: 'l2', text: '“How would you approach...”', side: 'left' },
      { id: 'l3', text: '“Where do you see yourself in 3 years?”', side: 'left' },
      { id: 'l4', text: '“Walk me through your architecture...”', side: 'left' },
      { id: 'r1', text: 'Past Verifiable Evidence (Behavioral)', side: 'right' },
      { id: 'r2', text: 'Hypothetical Problem Solving (Situational)', side: 'right' },
      { id: 'r3', text: 'Culture Alignment & Ambition (Motivation)', side: 'right' },
      { id: 'r4', text: 'Technical Depth & Design Decisions', side: 'right' },
    ],
    matchingPairs: [
      { prompt: '“Tell me about a time...”', studentMatch: 'Past Verifiable Evidence (Behavioral)', correctMatch: 'Past Verifiable Evidence (Behavioral)', isCorrect: true },
      { prompt: '“How would you approach...”', studentMatch: 'Hypothetical Problem Solving (Situational)', correctMatch: 'Hypothetical Problem Solving (Situational)', isCorrect: true },
      { prompt: '“Where do you see yourself in 3 years?”', studentMatch: 'Culture Alignment & Ambition (Motivation)', correctMatch: 'Culture Alignment & Ambition (Motivation)', isCorrect: true },
      { prompt: '“Walk me through your architecture...”', studentMatch: 'Technical Depth & Design Decisions', correctMatch: 'Technical Depth & Design Decisions', isCorrect: true },
    ],
    correctAnswer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
    explanation: 'Matching question stems to intent enables rapid mental framing before delivering your response.',
    aiFeedback: 'Listen closely to the first 5 words an interviewer utters; they signal whether you should draw on past experience or build a live framework.',
  },
  {
    id: 'q-9-drop',
    type: 'dropdown',
    prompt: 'A question that asks a candidate how they would resolve an imaginary production outage with a hypothetical conflicting lead is classified as [DROPDOWN].',
    bloomBadge: '2-UNDERSTAND',
    points: '1M [22]',
    options: [
      { id: 'situational', text: 'Situational Question' },
      { id: 'behavioral', text: 'Behavioral Question' },
      { id: 'technical', text: 'Technical Architecture Question' },
      { id: 'motivational', text: 'Culture Fit Question' },
    ],
    correctAnswer: 'situational',
    explanation: 'Questions framed around imaginary or prospective dilemmas evaluate hypothetical problem solving and are classified as situational.',
    aiFeedback: 'Situational questions require a structured framework like PREP or Headline + Steps because you cannot rely on memory of a past event.',
  },
  {
    id: 'q-10-order',
    type: 'ordering',
    prompt: 'Arrange the 4 steps of structured verbal delivery in the recommended chronological order:',
    bloomBadge: '3-APPLY',
    points: '1M [22]',
    options: [
      { id: 'o1', text: 'Active Listening & Intent Decoding' },
      { id: 'o2', text: 'Intentional 2-Second Strategic Pause' },
      { id: 'o3', text: 'Crisp Headline / Direct Answer' },
      { id: 'o4', text: 'Structured Evidence (STAR / PREP) & Impact' },
    ],
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
    correctAnswer: ['o1', 'o2', 'o3', 'o4'],
    explanation: 'Pausing before speaking signals composure and strategic thought, enabling a confident headline delivery.',
    aiFeedback: 'Great delivery order! Never skip the pause—it prevents filler words and rambling.',
  },
  {
    id: 'q-11-scenario',
    type: 'scenario',
    prompt: 'Your interviewer challenges your metrics claim: "A 40% performance gain seems high for a 2-week sprint." How do you handle this?',
    context: 'Interviewer reaction: Skeptical eyebrow raise, leaning forward, requesting clarification.',
    bloomBadge: '4-ANALYZE',
    points: '1M [22]',
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
    id: 'q-12-image',
    type: 'image',
    prompt: 'Review the interview communication rubric below. Which tier corresponds to structured ownership?',
    image: rubricMatrixImg,
    bloomBadge: '2-UNDERSTAND',
    points: '1M [22]',
    options: [
      { id: 'i1', text: 'Tier 1: Comprehensive STAR Framing with Quantified Evidence' },
      { id: 'i2', text: 'Tier 2: General Team Description without Individual Specifics' },
      { id: 'i3', text: 'Tier 3: Theoretical Problem Description without Outcome' },
      { id: 'i4', text: 'Tier 4: Vague Speculation' },
    ],
    correctAnswer: 'i1',
    explanation: 'Tier 1 demonstrates full behavioral maturity by providing quantifiable metrics and explicit personal ownership.',
    aiFeedback: 'When an image or rubric is presented, anchor your verbal answer on the top-tier evaluation criteria.',
  },
];

/**
 * Default feedback dataset that directly mirrors Screenshot 1
 */
export const SCREENSHOT_FEEDBACK_ITEMS: PracticeQuestionFeedbackItem[] = [
  {
    id: 'fb-1',
    questionNumber: 1,
    type: 'mcq',
    prompt: 'Which normal form eliminates transitive dependencies?',
    bloomBadge: '1-REMEMBER',
    points: '1M [22]',
    options: [
      { id: 'o1', letter: 'A', text: 'First Normal Form (1NF)' },
      { id: 'o2', letter: 'B', text: 'Second Normal Form (2NF)' },
      { id: 'o3', letter: 'C', text: 'Third Normal Form (3NF)' },
      { id: 'o4', letter: 'D', text: 'Boyce-Codd Normal Form (BCNF)' },
    ],
    studentAnswer: 'C',
    correctAnswer: 'C',
    isCorrect: true,
    resultStatus: 'correct',
    explanation: '3NF requires that the relation is in 2NF and no non-prime attribute is transitively dependent on the primary key.',
    aiFeedback: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
    chapterName: 'Database Foundations',
    topicName: 'Relational Normalization',
  },
  {
    id: 'fb-2',
    questionNumber: 2,
    type: 'text',
    prompt: 'It reduces the size of the database by eliminating null values and optional attributes. In the context of relational databases, explain how normalization reduces data redundancy and improves data integrity. Which of the following best describes the main benefit of moving a database from 1NF to 3NF?',
    bloomBadge: '2-UNDERSTAND',
    points: '1M [22]',
    studentAnswer: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
    correctAnswer: 'Moving from 1NF to 3NF removes functional and transitive dependencies, preventing update and deletion anomalies.',
    isCorrect: true,
    resultStatus: 'correct',
    explanation: 'Correct explanation identifying how entities and dependency isolation reduce redundancy.',
    aiFeedback: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
    chapterName: 'Database Foundations',
    topicName: 'Relational Normalization',
  },
  {
    id: 'fb-3',
    questionNumber: 3,
    type: 'audio',
    prompt: 'It reduces the size of the database by eliminating null values and optional attributes. In the context of relational databases, explain how normalization reduces data redundancy and improves data integrity. Which of the following best describes the main benefit of moving a database from 1NF to 3NF?',
    bloomBadge: '3-APPLY',
    points: '1M [22]',
    audioData: {
      duration: '1:02',
      transcript: 'It reduces the size of the database by eliminating null values and optional attributes. In the context of relational databases, explain how normalization reduces data redundancy and improves data integrity. Which of the following best describes the main benefit of moving a database from 1NF to 3NF?',
    },
    studentAnswer: 'Audio Recording (1:02)',
    correctAnswer: 'Spoken explanation of transitive dependencies and normalization benefits.',
    isCorrect: true,
    resultStatus: 'correct',
    explanation: 'Clear articulation, appropriate pacing, and correct technical definitions.',
    aiFeedback: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
    chapterName: 'Database Foundations',
    topicName: 'Relational Normalization',
  },
  {
    id: 'fb-4',
    questionNumber: 4,
    type: 'code',
    prompt: 'It reduces the size of the database by eliminating null values and optional attributes. In the context of relational databases, explain how normalization reduces data redundancy and improves data integrity. Which of the following best describes the main benefit of moving a database from 1NF to 3NF?',
    bloomBadge: '4-ANALYZE',
    points: '1M [22]',
    codeData: {
      language: 'JAVASCRIPT',
      studentCode: `function sub(a, b) {
  return a - b;
}`,
      expectedSolution: `public class Solution {
  public static int robustStringHash(String key, int tableSize) {
    long hash = 0;
    long primeMultiplier = 31; // A common prime for string hashing
    
    for (int i = 0; i < key.length(); i++) {
      hash = (hash * primeMultiplier + key.charAt(i)) % tableSize;
    }
    if (hash < 0) {
      hash += tableSize;
    }
    return (int) hash;
  }
}`,
    },
    studentAnswer: 'function sub(a, b) { return a - b; }',
    correctAnswer: 'Complete hashing implementation',
    isCorrect: false,
    resultStatus: 'wrong',
    explanation: 'The submitted function only performs subtraction and does not implement the requested hashing and table distribution algorithm.',
    aiFeedback: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
    chapterName: 'Database Foundations',
    topicName: 'Relational Normalization',
  },
  {
    id: 'fb-5',
    questionNumber: 5,
    type: 'conversational',
    prompt: 'In Android, what is the purpose of the AndroidManifest.xml file? Analyze the platform liability case study.',
    bloomBadge: '5-EVALUATE',
    points: '1M [22]',
    chatMessages: [
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Should social media platforms be held legally responsible for the content shared by their users? Should social media platforms be held legally responsible for the content shared',
        time: '11:20 AM',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: 'Absolutely! Let\'s dive into GreenThread\'s situation. To start, what do you see as the core problem Ananya Mehta and GreenThread are facing right now, based on the case description?',
        time: '11:21 AM',
      },
      {
        id: 'msg-3',
        sender: 'user',
        text: 'Hello! I\'m ready to analyze this case study. Can you guide me through it?',
        time: '11:22 AM',
      },
      {
        id: 'msg-4',
        sender: 'bot',
        text: 'Absolutely! Let\'s dive into GreenThread\'s situation. To start, what do you see as the core problem Ananya Mehta and GreenThread are facing right now, based on the case description?',
        time: '11:23 AM',
      },
      {
        id: 'msg-5',
        sender: 'user',
        text: 'Hello! I\'m ready to analyze this case study. Can you guide me through it?',
        time: '11:24 AM',
      },
    ],
    studentAnswer: 'Interactive conversation completed with 2 analytical responses.',
    correctAnswer: 'Comprehensive analysis of intermediary liability vs editorial responsibility.',
    isCorrect: true,
    resultStatus: 'correct',
    explanation: 'Engaged constructively with the prompt, demonstrated active listening, and structured responses logically.',
    aiFeedback: 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.',
    chapterName: 'Communication Foundations',
    topicName: 'Case Study Analysis',
  },
];
