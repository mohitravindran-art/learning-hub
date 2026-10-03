import type { PracticeQuestionFeedbackItem } from '../types/practice';
import { generateFeedbackQuestions } from './practiceFeedbackData';

export interface TopicData {
  id: string;
  code?: string;
  name: string;
  isLocked?: boolean;
}

export interface ChapterData {
  id: string;
  chapterNumber?: number;
  name: string;
  isLocked?: boolean;
  lockReason?: string;
  topics: TopicData[];
}

export const CHAPTERS_DATA: ChapterData[] = [
  {
    id: 'question-understanding',
    chapterNumber: 1,
    name: 'Question Understanding',
    isLocked: false,
    topics: [
      { id: 'real-intent', code: '1.1', name: 'What is the real intent?', isLocked: false },
      { id: 'identify-question-types', code: '1.2', name: 'Identify question types', isLocked: false },
    ],
  },
  {
    id: 'thinking-before-speaking',
    chapterNumber: 2,
    name: 'Thinking Before Speaking',
    isLocked: false,
    topics: [
      { id: 'active-listening', code: '2.1', name: 'Active listening', isLocked: false },
      { id: 'pause-and-process', code: '2.2', name: 'Pause and process', isLocked: false },
      { id: 'organize-thoughts', code: '2.3', name: 'Organize your thoughts', isLocked: false },
    ],
  },
  {
    id: 'confidence-delivery',
    chapterNumber: 3,
    name: 'Confidence & Delivery',
    isLocked: false,
    topics: [
      { id: 'voice-modulation', code: '3.1', name: 'Voice modulation', isLocked: false },
      { id: 'body-language', code: '3.2', name: 'Body language', isLocked: false },
      { id: 'speaking-with-confidence', code: '3.3', name: 'Speaking with confidence', isLocked: false },
    ],
  },
  {
    id: 'handling-difficult-questions',
    chapterNumber: 4,
    name: 'Handling Difficult Questions',
    isLocked: true,
    lockReason: 'Complete the previous chapter to unlock',
    topics: [
      { id: 'difficult-questions', code: '4.1', name: 'Difficult questions', isLocked: true },
      { id: 'staying-calm', code: '4.2', name: 'Staying calm', isLocked: true },
    ],
  },
  {
    id: 'advanced-interview-scenarios',
    chapterNumber: 5,
    name: 'Advanced Interview Scenarios',
    isLocked: true,
    lockReason: 'Complete the previous chapter to unlock',
    topics: [
      { id: 'stress-testing', code: '5.1', name: 'Stress testing & curveballs', isLocked: true },
      { id: 'executive-presentation', code: '5.2', name: 'Executive presentation', isLocked: true },
    ],
  },
];


export type PracticeLevelType = 'warm-up' | 'challenge' | 'expert';

export interface PracticeLevelConfig {
  id: PracticeLevelType;
  title: string;
  description: string;
  questionCount: number;
}

export const PRACTICE_LEVELS: PracticeLevelConfig[] = [
  {
    id: 'warm-up',
    title: 'Warm-up',
    description: 'Build confidence with simpler questions',
    questionCount: 5,
  },
  {
    id: 'challenge',
    title: 'Challenge',
    description: 'Test your understanding',
    questionCount: 10,
  },
  {
    id: 'expert',
    title: 'Expert',
    description: 'Push yourself further',
    questionCount: 15,
  },
];

export const QUESTION_FORMATS = [
  'ALL',
  'MCQ',
  'TEXT',
  'AUDIO',
  'CODE',
  'CONVERSATIONAL',
] as const;

export type QuestionFormatType = (typeof QUESTION_FORMATS)[number];

export interface PracticeSetItem {
  id: string;
  name: string;
  selectedChapters: string[];
  selectedTopics: string[];
  chapter: string;
  topic: string;
  iconType: 'document' | 'message' | 'user' | 'code' | 'star' | 'video';
  tags: string[];
  totalQuestions: number;
  completedQuestions: number;
  score?: number;
  accuracy?: number;
  status: 'not-started' | 'in-progress' | 'completed';
  level: PracticeLevelType;
  practiceLevel: PracticeLevelType;
  questionFormats: QuestionFormatType[];
  createdAt: string;
  submittedAt?: string;
  timeSpentMinutes?: number;
  questions?: PracticeQuestionFeedbackItem[];
}

export const INITIAL_PRACTICE_SETS: PracticeSetItem[] = [
  {
    id: 'ps-1',
    name: 'Interview Warm-up',
    selectedChapters: ['Question Understanding'],
    selectedTopics: ['Identify Question Types'],
    chapter: 'Question Understanding',
    topic: 'Identify Question Types',
    iconType: 'document',
    tags: ['10 Questions', 'All Formats', 'Challenge'],
    totalQuestions: 10,
    completedQuestions: 3,
    status: 'in-progress',
    level: 'challenge',
    practiceLevel: 'challenge',
    questionFormats: ['ALL'],
    createdAt: '2026-09-15T10:30:00Z',
  },
  {
    id: 'ps-2',
    name: 'Communication Basics',
    selectedChapters: ['Thinking Before Speaking'],
    selectedTopics: ['Active Listening', 'Voice Responses'],
    chapter: 'Thinking Before Speaking',
    topic: '2 Topics',
    iconType: 'message',
    tags: ['15 Questions', 'MCQ + Text', 'Warm-up'],
    totalQuestions: 15,
    completedQuestions: 15,
    score: 93,
    accuracy: 93,
    status: 'completed',
    level: 'warm-up',
    practiceLevel: 'warm-up',
    questionFormats: ['MCQ', 'TEXT'],
    createdAt: '2026-09-14T09:15:00Z',
    submittedAt: '2026-09-14T09:35:00Z',
    timeSpentMinutes: 20,
    questions: generateFeedbackQuestions(15, 93, ['Thinking Before Speaking'], ['Active Listening', 'Voice Responses']),
  },
  {
    id: 'ps-3',
    name: 'Real Interview Scenarios',
    selectedChapters: ['Confidence & Delivery'],
    selectedTopics: ['Handling Difficult Questions'],
    chapter: 'Confidence & Delivery',
    topic: 'Handling Difficult Questions',
    iconType: 'user',
    tags: ['10 Questions', 'Conversational', 'Challenge'],
    totalQuestions: 10,
    completedQuestions: 0,
    status: 'not-started',
    level: 'challenge',
    practiceLevel: 'challenge',
    questionFormats: ['CONVERSATIONAL'],
    createdAt: '2026-09-13T14:20:00Z',
  },
  {
    id: 'ps-4',
    name: 'Technical Communication',
    selectedChapters: ['Structuring Your Answer'],
    selectedTopics: ['Organizing Thoughts', 'Situation & Task Framing'],
    chapter: 'Structuring Your Answer',
    topic: '2 Topics',
    iconType: 'code',
    tags: ['12 Questions', 'Code + Text', 'Challenge'],
    totalQuestions: 12,
    completedQuestions: 7,
    status: 'in-progress',
    level: 'challenge',
    practiceLevel: 'challenge',
    questionFormats: ['CODE', 'TEXT'],
    createdAt: '2026-09-12T16:45:00Z',
  },
  {
    id: 'ps-5',
    name: 'Quick Practice',
    selectedChapters: ['Question Understanding', 'Thinking Before Speaking'],
    selectedTopics: ['Identify Question Types', 'What is the real intent?', 'Active Listening'],
    chapter: '2 Chapters',
    topic: '3 Topics',
    iconType: 'star',
    tags: ['5 Questions', 'All Formats', 'Warm-up'],
    totalQuestions: 5,
    completedQuestions: 5,
    score: 80,
    accuracy: 80,
    status: 'completed',
    level: 'warm-up',
    practiceLevel: 'warm-up',
    questionFormats: ['ALL'],
    createdAt: '2026-09-11T11:00:00Z',
    submittedAt: '2026-09-11T11:08:00Z',
    timeSpentMinutes: 8,
    questions: generateFeedbackQuestions(
      5,
      80,
      ['Question Understanding', 'Thinking Before Speaking'],
      ['Identify Question Types', 'What is the real intent?', 'Active Listening']
    ),
  },
  {
    id: 'ps-6',
    name: 'Behavioural Examples',
    selectedChapters: ['Question Understanding'],
    selectedTopics: ['Real Interview Examples'],
    chapter: 'Question Understanding',
    topic: 'Real Interview Examples',
    iconType: 'document',
    tags: ['10 Questions', 'Text', 'Challenge'],
    totalQuestions: 10,
    completedQuestions: 0,
    status: 'not-started',
    level: 'challenge',
    practiceLevel: 'challenge',
    questionFormats: ['TEXT'],
    createdAt: '2026-09-10T08:30:00Z',
  },
  {
    id: 'ps-7',
    name: 'Mixed Practice',
    selectedChapters: ['Confidence & Delivery', 'Structuring Your Answer'],
    selectedTopics: ['Handling Difficult Questions', 'Sound Confident', 'Action Steps & Ownership'],
    chapter: '2 Chapters',
    topic: '3 Topics',
    iconType: 'message',
    tags: ['20 Questions', 'All Formats', 'Expert'],
    totalQuestions: 20,
    completedQuestions: 8,
    status: 'in-progress',
    level: 'expert',
    practiceLevel: 'expert',
    questionFormats: ['ALL'],
    createdAt: '2026-09-09T17:10:00Z',
  },
  {
    id: 'ps-8',
    name: 'Audio Practice',
    selectedChapters: ['Thinking Before Speaking'],
    selectedTopics: ['Voice Responses'],
    chapter: 'Thinking Before Speaking',
    topic: 'Voice Responses',
    iconType: 'video',
    tags: ['10 Questions', 'Audio', 'Challenge'],
    totalQuestions: 10,
    completedQuestions: 10,
    score: 80,
    accuracy: 80,
    status: 'completed',
    level: 'challenge',
    practiceLevel: 'challenge',
    questionFormats: ['AUDIO'],
    createdAt: '2026-09-08T13:40:00Z',
    submittedAt: '2026-09-08T13:58:00Z',
    timeSpentMinutes: 18,
    questions: generateFeedbackQuestions(10, 80, ['Thinking Before Speaking'], ['Voice Responses']),
  },
];
