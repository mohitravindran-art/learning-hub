import type { PracticeMission } from '../types/practice';

export const DUMMY_MISSIONS: PracticeMission[] = [
  {
    id: 'm1',
    name: 'Interview Warm-up',
    moduleId: 'module-1',
    topicId: 'topic-1',
    subtopicId: 'all',
    questionCount: 10,
    questionTypes: ['All'],
    difficulty: 'challenge',
    status: 'in-progress',
    createdAt: '2026-09-10T10:00:00Z',
    questionsCompleted: 3,
    totalQuestions: 10
  },
  {
    id: 'm2',
    name: 'Communication Basics',
    moduleId: 'module-1',
    topicId: 'topic-2',
    subtopicId: 'subtopic-1',
    questionCount: 15,
    questionTypes: ['MCQ', 'Text'],
    difficulty: 'warm-up',
    status: 'completed',
    createdAt: '2026-09-08T09:00:00Z',
    submittedAt: '2026-09-08T09:15:00Z',
    score: 86,
    questionsCompleted: 15,
    totalQuestions: 15
  },
  {
    id: 'm3',
    name: 'Advanced Scenarios',
    moduleId: 'module-1',
    topicId: 'topic-3',
    subtopicId: 'all',
    questionCount: 5,
    questionTypes: ['Conversational', 'MCQ'],
    difficulty: 'expert',
    status: 'completed',
    createdAt: '2026-09-05T14:00:00Z',
    submittedAt: '2026-09-05T14:20:00Z',
    score: 70,
    questionsCompleted: 5,
    totalQuestions: 5
  }
];
