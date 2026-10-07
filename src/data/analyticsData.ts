export interface QuestionTypePerformance {
  type: string;
  count: number;
  accuracy: number;
  color: string;
  iconName: 'mcq' | 'audio' | 'code' | 'text';
}

export interface DifficultyAccuracy {
  level: string;
  attempted: number;
  accuracy: number;
  color: string;
}

export interface SectionAnalytics {
  attempts: number;
  donutPercentage: number;
  correctPct: number;
  wrongPct: number;
  skippedPct: number;
  byQuestionType: QuestionTypePerformance[];
  byDifficulty: DifficultyAccuracy[];
}

export interface TopicAnalyticsItem {
  id: string;
  module: string;
  chapter: string;
  topicName: string;
  practiceAttempts: number;
  assessmentAttempts: number;
  conceptCheckStatus: 'Completed' | 'In Progress';
  practice: SectionAnalytics;
  assessments: SectionAnalytics;
}

export interface AnalyticsSummaryStats {
  conceptChecksCompleted: number;
  practiceMissionsCompleted: number;
  practiceProblemsCompleted: number;
}

export const INITIAL_ANALYTICS_SUMMARY: AnalyticsSummaryStats = {
  conceptChecksCompleted: 60,
  practiceMissionsCompleted: 78,
  practiceProblemsCompleted: 24,
};

export const INITIAL_TOPIC_ANALYTICS: TopicAnalyticsItem[] = [
  {
    id: 'topic-1',
    module: 'Universal Communication',
    chapter: 'Question Understanding',
    topicName: 'Binary Trees',
    practiceAttempts: 124,
    assessmentAttempts: 124,
    conceptCheckStatus: 'Completed',
    practice: {
      attempts: 124,
      donutPercentage: 72,
      correctPct: 35,
      wrongPct: 45,
      skippedPct: 20,
      byQuestionType: [
        { type: 'MCQ', count: 78, accuracy: 81, color: '#10B981', iconName: 'mcq' },
        { type: 'AUDIO', count: 24, accuracy: 63, color: '#F59E0B', iconName: 'audio' },
        { type: 'CODE', count: 12, accuracy: 58, color: '#F59E0B', iconName: 'code' },
        { type: 'TEXT', count: 10, accuracy: 40, color: '#EF4444', iconName: 'text' },
      ],
      byDifficulty: [
        { level: 'Easy', attempted: 42, accuracy: 88, color: '#16A34A' },
        { level: 'Medium', attempted: 42, accuracy: 88, color: '#F59E0B' },
        { level: 'Hard', attempted: 42, accuracy: 88, color: '#EF4444' },
      ],
    },
    assessments: {
      attempts: 124,
      donutPercentage: 72,
      correctPct: 35,
      wrongPct: 45,
      skippedPct: 20,
      byQuestionType: [
        { type: 'MCQ', count: 78, accuracy: 81, color: '#10B981', iconName: 'mcq' },
        { type: 'AUDIO', count: 24, accuracy: 63, color: '#F59E0B', iconName: 'audio' },
        { type: 'CODE', count: 12, accuracy: 58, color: '#F59E0B', iconName: 'code' },
        { type: 'TEXT', count: 10, accuracy: 40, color: '#EF4444', iconName: 'text' },
      ],
      byDifficulty: [
        { level: 'Easy', attempted: 42, accuracy: 88, color: '#16A34A' },
        { level: 'Medium', attempted: 42, accuracy: 88, color: '#F59E0B' },
        { level: 'Hard', attempted: 42, accuracy: 88, color: '#EF4444' },
      ],
    },
  },
  {
    id: 'topic-2',
    module: 'Universal Communication',
    chapter: 'Question Understanding',
    topicName: 'Binary Trees',
    practiceAttempts: 124,
    assessmentAttempts: 124,
    conceptCheckStatus: 'Completed',
    practice: {
      attempts: 110,
      donutPercentage: 75,
      correctPct: 40,
      wrongPct: 42,
      skippedPct: 18,
      byQuestionType: [
        { type: 'MCQ', count: 70, accuracy: 84, color: '#10B981', iconName: 'mcq' },
        { type: 'AUDIO', count: 20, accuracy: 65, color: '#F59E0B', iconName: 'audio' },
        { type: 'CODE', count: 12, accuracy: 60, color: '#F59E0B', iconName: 'code' },
        { type: 'TEXT', count: 8, accuracy: 45, color: '#EF4444', iconName: 'text' },
      ],
      byDifficulty: [
        { level: 'Easy', attempted: 38, accuracy: 90, color: '#16A34A' },
        { level: 'Medium', attempted: 40, accuracy: 82, color: '#F59E0B' },
        { level: 'Hard', attempted: 32, accuracy: 76, color: '#EF4444' },
      ],
    },
    assessments: {
      attempts: 98,
      donutPercentage: 70,
      correctPct: 34,
      wrongPct: 46,
      skippedPct: 20,
      byQuestionType: [
        { type: 'MCQ', count: 62, accuracy: 80, color: '#10B981', iconName: 'mcq' },
        { type: 'AUDIO', count: 18, accuracy: 60, color: '#F59E0B', iconName: 'audio' },
        { type: 'CODE', count: 10, accuracy: 55, color: '#F59E0B', iconName: 'code' },
        { type: 'TEXT', count: 8, accuracy: 38, color: '#EF4444', iconName: 'text' },
      ],
      byDifficulty: [
        { level: 'Easy', attempted: 34, accuracy: 86, color: '#16A34A' },
        { level: 'Medium', attempted: 34, accuracy: 80, color: '#F59E0B' },
        { level: 'Hard', attempted: 30, accuracy: 72, color: '#EF4444' },
      ],
    },
  },
  {
    id: 'topic-3',
    module: 'Universal Communication',
    chapter: 'Question Understanding',
    topicName: 'Binary Trees',
    practiceAttempts: 124,
    assessmentAttempts: 124,
    conceptCheckStatus: 'Completed',
    practice: {
      attempts: 95,
      donutPercentage: 68,
      correctPct: 32,
      wrongPct: 48,
      skippedPct: 20,
      byQuestionType: [
        { type: 'MCQ', count: 60, accuracy: 78, color: '#10B981', iconName: 'mcq' },
        { type: 'AUDIO', count: 15, accuracy: 60, color: '#F59E0B', iconName: 'audio' },
        { type: 'CODE', count: 12, accuracy: 52, color: '#F59E0B', iconName: 'code' },
        { type: 'TEXT', count: 8, accuracy: 36, color: '#EF4444', iconName: 'text' },
      ],
      byDifficulty: [
        { level: 'Easy', attempted: 32, accuracy: 84, color: '#16A34A' },
        { level: 'Medium', attempted: 33, accuracy: 78, color: '#F59E0B' },
        { level: 'Hard', attempted: 30, accuracy: 70, color: '#EF4444' },
      ],
    },
    assessments: {
      attempts: 90,
      donutPercentage: 69,
      correctPct: 33,
      wrongPct: 47,
      skippedPct: 20,
      byQuestionType: [
        { type: 'MCQ', count: 56, accuracy: 79, color: '#10B981', iconName: 'mcq' },
        { type: 'AUDIO', count: 16, accuracy: 58, color: '#F59E0B', iconName: 'audio' },
        { type: 'CODE', count: 10, accuracy: 50, color: '#F59E0B', iconName: 'code' },
        { type: 'TEXT', count: 8, accuracy: 35, color: '#EF4444', iconName: 'text' },
      ],
      byDifficulty: [
        { level: 'Easy', attempted: 30, accuracy: 85, color: '#16A34A' },
        { level: 'Medium', attempted: 32, accuracy: 76, color: '#F59E0B' },
        { level: 'Hard', attempted: 28, accuracy: 68, color: '#EF4444' },
      ],
    },
  },
];
