export interface PracticeMission {
  id: string;
  name: string;
  moduleId: string;
  topicId: string;
  subtopicId: string | 'all';
  questionCount: number;
  questionTypes: string[];
  difficulty: 'warm-up' | 'challenge' | 'expert';
  status: 'draft' | 'ready' | 'in-progress' | 'completed' | 'abandoned';
  createdAt: string;
  submittedAt?: string;
  score?: number;
  questionsCompleted: number;
  totalQuestions: number;
}

export type QuestionType = 
  | 'mcq'
  | 'text'
  | 'audio'
  | 'code'
  | 'conversational'
  | 'single-select'
  | 'multi-select'
  | 'true-false'
  | 'matching'
  | 'ordering'
  | 'scenario'
  | 'dropdown'
  | 'image';

export interface CodeEditorContent {
  language: string;
  starterCode?: string;
  studentCode?: string;
  expectedSolution?: string;
}

export interface AudioContent {
  audioUrl?: string;
  duration?: string;
  transcript?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time?: string;
}

export interface AdditionalContextData {
  language?: string;
  title?: string;
  code?: string;
  description?: string;
}

export interface PracticeQuestion {
  id: string;
  type: QuestionType;
  context?: string;
  additionalContext?: AdditionalContextData;
  prompt: string;
  options?: { id: string; text: string; letter?: string; side?: 'left' | 'right'; image?: string }[];
  correctAnswer: any;
  explanation: string;
  aiFeedback?: string;
  difficulty?: 'warm-up' | 'challenge' | 'expert';
  topicId?: string;
  subtopicId?: string;
  points?: string;
  bloomBadge?: string;
  codeData?: CodeEditorContent;
  audioData?: AudioContent;
  chatMessages?: ChatMessage[];
  image?: string;
  matchingPairs?: MatchingPair[];
  orderingItems?: {
    studentOrder: string[];
    correctOrder: string[];
  };
}

export const PRACTICE_DIFFICULTIES = ['warm-up', 'challenge', 'expert'] as const;

export type FeedbackQuestionType = QuestionType;

export interface MatchingPair {
  prompt: string;
  studentMatch: string;
  correctMatch: string;
  isCorrect: boolean;
}

export interface PracticeQuestionFeedbackItem {
  id: string;
  questionNumber: number;
  type: FeedbackQuestionType;
  prompt: string;
  context?: string;
  additionalContext?: AdditionalContextData;
  options?: { id: string; text: string; letter?: string; side?: 'left' | 'right'; image?: string }[];
  studentAnswer: any;
  correctAnswer: any;
  isCorrect: boolean;
  resultStatus?: 'correct' | 'wrong' | 'partial';
  explanation: string;
  aiFeedback?: string;
  points?: string;
  bloomBadge?: string;
  image?: string;
  matchingPairs?: MatchingPair[];
  orderingItems?: {
    studentOrder: string[];
    correctOrder: string[];
  };
  codeData?: CodeEditorContent;
  audioData?: AudioContent;
  chatMessages?: ChatMessage[];
  chapterName?: string;
  topicName?: string;
}

