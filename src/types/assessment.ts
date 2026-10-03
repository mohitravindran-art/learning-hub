import type { PracticeQuestion, PracticeQuestionFeedbackItem } from './practice';

export type AssessmentStatus = 'not-started' | 'in-progress' | 'completed' | 'upcoming';
export type AssessmentDifficulty = 'Advance' | 'Intermediate' | 'Standard' | 'Challenge' | 'Foundation';
export type AssessmentType = 'Comprehensive' | 'Proctored' | 'Module Exam' | 'Diagnostic' | 'Interview Simulation' | 'Technical' | 'Analytical';
export type AssessmentSource = 'Interview Library' | 'Self-Created';

export interface AssessmentItem {
  id: string;
  name: string;
  role?: string;
  company?: string;
  source?: AssessmentSource;
  hasInfoTooltip?: boolean;
  description: string;
  chapter: string;
  topic: string;
  selectedChapters: string[];
  selectedTopics: string[];
  totalQuestions: number;
  completedQuestions: number;
  durationMinutes: number;
  difficulty: AssessmentDifficulty;
  assessmentType: AssessmentType;
  status: AssessmentStatus;
  scheduledDate?: string;
  completedDate?: string;
  score?: number;
  accuracy?: number;
  timeSpentMinutes?: number;
  questions?: PracticeQuestionFeedbackItem[];
  iconType?: 'android' | 'code' | 'document' | 'video' | 'message';
  competencyScores?: {
    technical: number;
    communication: number;
    problemSolving: number;
    leadership: number;
  };
  strengths?: string[];
  improvements?: string[];
  summaryFeedback?: string;
  roundsCount?: number;
  interviewerPersona?: string;
}

export type AssessmentViewMode = 'cards' | 'table';
export type AssessmentTabType = 'in-progress' | 'completed' | 'current' | 'history';
export type AssessmentFilterType = 'all' | 'in-progress' | 'not-started';
export type AssessmentHistoryFilterType = 'all' | 'passed' | 'review';

