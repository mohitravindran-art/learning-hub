import type { PracticeQuestionFeedbackItem } from '../types/practice';
import { SCREENSHOT_FEEDBACK_ITEMS } from './practiceRunnerData';
import rubricMatrixImg from '../assets/rubric-matrix.jpg';

export const SAMPLE_FEEDBACK_QUESTIONS: PracticeQuestionFeedbackItem[] = [
  ...SCREENSHOT_FEEDBACK_ITEMS,
  {
    id: 'q-1',
    questionNumber: 6,
    type: 'single-select',
    prompt: 'What type of interview question is: "Tell me about a time you had to resolve an unexpected conflict with a cross-functional teammate"?',
    context: 'Context: The candidate was asked to share a specific past work dilemma.',

    options: [
      { id: 'beh', text: 'Behavioral' },
      { id: 'sit', text: 'Situational' },
      { id: 'tech', text: 'Technical' },
      { id: 'mot', text: 'Motivation & Fit' },
    ],
    studentAnswer: 'Behavioral',
    correctAnswer: 'Behavioral',
    isCorrect: true,
    explanation: 'Correct. The phrase "Tell me about a time..." prompts for verifiable evidence of past experiences and actions, which is the hallmark of behavioral questions.',
    chapterName: 'Question Understanding',
    topicName: 'Identify Question Types',
  },
  {
    id: 'q-2',
    questionNumber: 2,
    type: 'multi-select',
    prompt: 'Which of the following are situational questions? (Select all that apply)',
    context: 'Situational questions assess prospective problem-solving under uncertainty.',
    options: [
      { id: 'optA', text: 'Option A: "How would you handle a critical production bug discovered 10 minutes before a company-wide demo?"' },
      { id: 'optB', text: 'Option B: "Tell me about a project where you missed your milestone deadline."' },
      { id: 'optC', text: 'Option C: "What steps would you take if your tech lead and product manager had opposite priorities?"' },
      { id: 'optD', text: 'Option D: "Describe your past experience optimizing SQL query performance."' },
    ],
    studentAnswer: [
      'Option A: "How would you handle a critical production bug discovered 10 minutes before a company-wide demo?"',
      'Option B: "Tell me about a project where you missed your milestone deadline."',
    ],
    correctAnswer: [
      'Option A: "How would you handle a critical production bug discovered 10 minutes before a company-wide demo?"',
      'Option C: "What steps would you take if your tech lead and product manager had opposite priorities?"',
    ],
    isCorrect: false,
    explanation: 'Option A and Option C are situational because they pose hypothetical future scenarios asking "How would you handle..." or "What steps would you take...". Option B and Option D ask about past verifiable experiences, making them behavioral.',
    chapterName: 'Question Understanding',
    topicName: 'What is the real intent?',
  },
  {
    id: 'q-3',
    questionNumber: 3,
    type: 'true-false',
    prompt: 'In the STAR framework, the "Action" component should ideally comprise 60% or more of your total speaking time.',
    context: 'STAR = Situation, Task, Action, Result.',
    studentAnswer: 'True',
    correctAnswer: 'True',
    isCorrect: true,
    explanation: 'Correct. Interviewers evaluate candidates on personal agency and problem-solving execution. Situation and Task should be concise (20%), while Action takes 60% and Result takes 20%.',
    chapterName: 'Structuring Your Answer',
    topicName: 'Action Steps & Ownership',
  },
  {
    id: 'q-4',
    questionNumber: 4,
    type: 'matching',
    prompt: 'Match each interview opening phrase with its corresponding core question intent:',
    matchingPairs: [
      {
        prompt: '“Tell me about a time...”',
        studentMatch: 'Past Verifiable Evidence (Behavioral)',
        correctMatch: 'Past Verifiable Evidence (Behavioral)',
        isCorrect: true,
      },
      {
        prompt: '“How would you approach...”',
        studentMatch: 'Hypothetical Problem Solving (Situational)',
        correctMatch: 'Hypothetical Problem Solving (Situational)',
        isCorrect: true,
      },
      {
        prompt: '“Where do you see yourself in 3 years?”',
        studentMatch: 'Culture Alignment & Ambition (Motivation)',
        correctMatch: 'Culture Alignment & Ambition (Motivation)',
        isCorrect: true,
      },
      {
        prompt: '“Walk me through how you designed...”',
        studentMatch: 'Depth & Architecture (Technical)',
        correctMatch: 'Depth & Architecture (Technical)',
        isCorrect: true,
      },
    ],
    studentAnswer: 'All pairs matched correctly',
    correctAnswer: 'All pairs matched correctly',
    isCorrect: true,
    explanation: 'All matches are correct! Identifying verbal cues within the first 5 seconds allows you to select the optimal mental answering structure before speaking.',
    chapterName: 'Question Understanding',
    topicName: 'Identify Question Types',
  },
  {
    id: 'q-5',
    questionNumber: 5,
    type: 'ordering',
    prompt: 'Arrange the 4 steps of effective verbal delivery in the recommended chronological order:',
    orderingItems: {
      studentOrder: [
        '1. Listen actively & decode the question\'s true intent',
        '2. Take an intentional 2-second pause to structure thoughts',
        '3. State a crisp, direct headline sentence',
        '4. Provide structured evidence (STAR / PREP) and quantify impact',
      ],
      correctOrder: [
        '1. Listen actively & decode the question\'s true intent',
        '2. Take an intentional 2-second pause to structure thoughts',
        '3. State a crisp, direct headline sentence',
        '4. Provide structured evidence (STAR / PREP) and quantify impact',
      ],
    },
    studentAnswer: '1 → 2 → 3 → 4',
    correctAnswer: '1 → 2 → 3 → 4',
    isCorrect: true,
    explanation: 'Excellent sequencing! An intentional pause signals composure and strategic thought, preventing rambling before delivering your headline message.',
    chapterName: 'Thinking Before Speaking',
    topicName: 'Pause Before Answering',
  },
  {
    id: 'q-6',
    questionNumber: 6,
    type: 'scenario',
    prompt: 'Your interviewer seems unconvinced after you describe your metrics. What is the most effective immediate follow-up response?',
    context: 'Interviewer: "A 40% reduction in turnaround time sounds unusually high for a two-week sprint."',
    options: [
      { id: 'sc1', text: 'Defend yourself assertively and argue that the numbers came directly from management.' },
      { id: 'sc2', text: 'Acknowledge their skepticism calmly, present the baseline metric, and explain the bottleneck that was removed.' },
      { id: 'sc3', text: 'Quickly change the subject to another project to avoid further debate.' },
      { id: 'sc4', text: 'Concede that the number might have been an estimate and apologize.' },
    ],
    studentAnswer: 'Acknowledge their skepticism calmly, present the baseline metric, and explain the bottleneck that was removed.',
    correctAnswer: 'Acknowledge their skepticism calmly, present the baseline metric, and explain the bottleneck that was removed.',
    isCorrect: true,
    explanation: 'Correct! When interviewers pressure-test claims, composed transparency and explaining the underlying mechanisms build significant trust.',
    chapterName: 'Confidence & Delivery',
    topicName: 'Handling Difficult Questions',
  },
  {
    id: 'q-7',
    questionNumber: 7,
    type: 'single-select',
    prompt: 'What is the interviewer evaluating when asking: "What was your biggest professional failure?"',
    options: [
      { id: 'f1', text: 'Whether you make careless mistakes under deadlines.' },
      { id: 'f2', text: 'Your degree of personal accountability, self-awareness, and capacity to learn from mistakes.' },
      { id: 'f3', text: 'How effectively you deflect responsibility onto team members.' },
      { id: 'f4', text: 'If you have a flawless track record without any career setbacks.' },
    ],
    studentAnswer: 'Your degree of personal accountability, self-awareness, and capacity to learn from mistakes.',
    correctAnswer: 'Your degree of personal accountability, self-awareness, and capacity to learn from mistakes.',
    isCorrect: true,
    explanation: 'The real intent behind failure questions is never to disqualify you for having made a mistake, but to gauge maturity, ownership, and resilience.',
    chapterName: 'Question Understanding',
    topicName: 'What is the real intent?',
  },
  {
    id: 'q-8',
    questionNumber: 8,
    type: 'multi-select',
    prompt: 'Which verbal delivery habits weaken executive presence during interview conversations? (Select all that apply)',
    options: [
      { id: 'habA', text: 'Frequent filler words ("like", "you know", "um")' },
      { id: 'habB', text: 'Using silent 2-second pauses to organize your thoughts' },
      { id: 'habC', text: 'Upspeaking (ending affirmative statements on rising pitch like questions)' },
      { id: 'habD', text: 'Speaking in an unbroken rush without pausing for interviewer reactions' },
    ],
    studentAnswer: [
      'Frequent filler words ("like", "you know", "um")',
      'Upspeaking (ending affirmative statements on rising pitch like questions)',
      'Speaking in an unbroken rush without pausing for interviewer reactions',
    ],
    correctAnswer: [
      'Frequent filler words ("like", "you know", "um")',
      'Upspeaking (ending affirmative statements on rising pitch like questions)',
      'Speaking in an unbroken rush without pausing for interviewer reactions',
    ],
    isCorrect: true,
    explanation: 'Correct! Intentional silence and pauses actually convey confidence and command. Fillers, upspeaking, and rushed speech signal anxiety.',
    chapterName: 'Thinking Before Speaking',
    topicName: 'Voice Responses',
  },
  {
    id: 'q-9',
    questionNumber: 9,
    type: 'true-false',
    prompt: 'Saying "We built the distributed queue" rather than specifying "I designed the schema and partitioned the Kafka topics" is preferred in behavioral interviews.',
    studentAnswer: 'True',
    correctAnswer: 'False',
    isCorrect: false,
    explanation: 'Incorrect. While acknowledging team effort is healthy, overusing "We" makes it impossible for the interviewer to evaluate YOUR individual contribution. Use "I" for your direct actions.',
    chapterName: 'Structuring Your Answer',
    topicName: 'Action Steps & Ownership',
  },
  {
    id: 'q-10',
    questionNumber: 10,
    type: 'single-select',
    prompt: 'Which framework is best suited for providing a concise, 45-second direct answer to an opinion-based or philosophy question?',
    options: [
      { id: 'star', text: 'STAR Method (Situation, Task, Action, Result)' },
      { id: 'prep', text: 'PREP Framework (Point, Reason, Example, Point)' },
      { id: 'car', text: 'CAR Method (Challenge, Action, Result)' },
      { id: 'fivew', text: '5 Ws & 1 H (Who, What, When, Where, Why, How)' },
    ],
    studentAnswer: 'PREP Framework (Point, Reason, Example, Point)',
    correctAnswer: 'PREP Framework (Point, Reason, Example, Point)',
    isCorrect: true,
    explanation: 'Correct! The PREP framework provides a structured format for delivering opinions or core beliefs without rambling.',
    chapterName: 'Structuring Your Answer',
    topicName: 'Organizing Thoughts',
  },
  {
    id: 'q-11-fb-drop',
    questionNumber: 11,
    type: 'dropdown',
    prompt: 'A question asking a candidate how they would resolve an imaginary production outage with a conflicting tech lead is classified as [DROPDOWN].',
    options: [
      { id: 'situational', text: 'Situational Question' },
      { id: 'behavioral', text: 'Behavioral Question' },
      { id: 'technical', text: 'Technical Architecture Question' },
      { id: 'fit', text: 'Culture Fit Question' },
    ],
    studentAnswer: 'Situational Question',
    correctAnswer: 'Situational Question',
    isCorrect: true,
    explanation: 'Correct! Questions framed around prospective dilemmas or hypothetical situations evaluate situational problem solving.',
    chapterName: 'Question Understanding',
    topicName: 'Identify Question Types',
  },
  {
    id: 'q-12-fb-img',
    questionNumber: 12,
    type: 'image',
    prompt: 'Review the interview communication rubric below. Which tier corresponds to structured ownership?',
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
    explanation: 'Correct! Tier 1 demonstrates full behavioral maturity by providing quantifiable metrics and explicit personal ownership.',
    chapterName: 'Confidence & Delivery',
    topicName: 'Voice Responses',
  },
];

/**
 * Generates a persistent set of question feedback items for a given practice set.
 */
export function generateFeedbackQuestions(
  totalCount: number,
  targetScore: number = 80,
  chapters: string[] = ['Question Understanding'],
  topics: string[] = ['Identify Question Types']
): PracticeQuestionFeedbackItem[] {
  const primaryChapter = chapters[0] || 'Question Understanding';
  const primaryTopic = topics[0] || 'Identify Question Types';

  const questions: PracticeQuestionFeedbackItem[] = [];
  const correctCount = Math.round((targetScore / 100) * totalCount);

  for (let i = 0; i < totalCount; i++) {
    const template = SAMPLE_FEEDBACK_QUESTIONS[i % SAMPLE_FEEDBACK_QUESTIONS.length];
    const shouldBeCorrect = i < correctCount;

    // Clone template with accurate metadata
    const questionItem: PracticeQuestionFeedbackItem = {
      ...template,
      id: `q-${i + 1}-${Date.now()}`,
      questionNumber: i + 1,
      chapterName: chapters[i % chapters.length] || primaryChapter,
      topicName: topics[i % topics.length] || primaryTopic,
      isCorrect: shouldBeCorrect,
    };

    // If template was naturally incorrect or correct, adapt answer
    if (!shouldBeCorrect && template.isCorrect) {
      if (template.type === 'single-select' || template.type === 'scenario') {
        const wrongOption = template.options?.find(o => o.text !== template.correctAnswer) || { text: 'Alternative choice' };
        questionItem.studentAnswer = wrongOption.text;
      } else if (template.type === 'true-false') {
        questionItem.studentAnswer = template.correctAnswer === 'True' ? 'False' : 'True';
      }
    } else if (shouldBeCorrect && !template.isCorrect) {
      questionItem.studentAnswer = template.correctAnswer;
    }

    questions.push(questionItem);
  }

  return questions;
}
