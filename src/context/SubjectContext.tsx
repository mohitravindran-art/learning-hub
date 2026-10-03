import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  SUBJECTS_DATA, 
  type Subject, 
  type Chapter, 
  type Topic 
} from '../data/subjectsData';

interface SubjectContextType {
  subjects: Subject[];
  currentSubjectId: string;
  currentSubject: Subject;
  setCurrentSubjectId: (id: string) => void;
  activeChapterId: string;
  setActiveChapterId: (id: string) => void;
  activeChapter: Chapter;
  completeTopic: (subjectId: string, chapterId: string, topicId: string) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const SubjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>(SUBJECTS_DATA);
  const [currentSubjectId, setCurrentSubjectIdState] = useState<string>('universal-communication');

  // Derive current subject
  const currentSubject = useMemo(() => {
    return subjects.find(s => s.id === currentSubjectId) || subjects[0];
  }, [subjects, currentSubjectId]);

  // Active chapter state within current subject
  const [activeChapterId, setActiveChapterId] = useState<string>(() => {
    return currentSubject.currentChapterId || currentSubject.chapters[0].id;
  });

  // Switch subject handler: also switches active chapter to that subject's current/first chapter
  const setCurrentSubjectId = (id: string) => {
    const targetSubject = subjects.find(s => s.id === id);
    if (targetSubject) {
      setCurrentSubjectIdState(id);
      // Auto-focus on that subject's active or first unlocked chapter
      const targetChapterId = targetSubject.currentChapterId || 
        targetSubject.chapters.find(c => c.status === 'unlocked' || c.status === 'completed')?.id || 
        targetSubject.chapters[0].id;
      setActiveChapterId(targetChapterId);
    }
  };

  // Derive active chapter
  const activeChapter = useMemo(() => {
    return currentSubject.chapters.find(c => c.id === activeChapterId) || currentSubject.chapters[0];
  }, [currentSubject, activeChapterId]);

  // Complete topic and unlock next topic / chapter
  const completeTopic = (subjectId: string, chapterId: string, topicId: string) => {
    setSubjects(prevSubjects => {
      return prevSubjects.map(sub => {
        if (sub.id !== subjectId) return sub;

        const updatedChapters = sub.chapters.map(ch => {
          if (ch.id !== chapterId) return ch;

          const topicIndex = ch.topics.findIndex(t => t.id === topicId);
          if (topicIndex === -1) return ch;

          const updatedTopics = ch.topics.map((t, idx) => {
            if (idx === topicIndex) {
              return {
                ...t,
                status: 'completed' as const,
                conceptCheckCompleted: true,
              };
            }
            // Unlock next topic if previous is completed
            if (idx === topicIndex + 1 && t.status === 'locked') {
              return {
                ...t,
                status: 'unlocked' as const,
              };
            }
            return t;
          });

          // Check if all topics in this chapter are completed
          const allCompleted = updatedTopics.every(t => t.status === 'completed');
          const completedCount = updatedTopics.filter(t => t.status === 'completed').length;
          const progress = Math.round((completedCount / updatedTopics.length) * 100);

          return {
            ...ch,
            status: allCompleted ? ('completed' as const) : ch.status,
            progress,
            topics: updatedTopics,
          };
        });

        // If a chapter was just completed, unlock next chapter
        const completedChIndex = updatedChapters.findIndex(c => c.id === chapterId && c.status === 'completed');
        if (completedChIndex !== -1 && completedChIndex + 1 < updatedChapters.length) {
          if (updatedChapters[completedChIndex + 1].status === 'locked') {
            updatedChapters[completedChIndex + 1] = {
              ...updatedChapters[completedChIndex + 1],
              status: 'unlocked' as const,
              topics: updatedChapters[completedChIndex + 1].topics.map((t, idx) => 
                idx === 0 ? { ...t, status: 'unlocked' as const } : t
              ),
            };
          }
        }

        const overallProgress = Math.round(
          updatedChapters.reduce((acc, c) => acc + c.progress, 0) / updatedChapters.length
        );

        return {
          ...sub,
          progress: overallProgress,
          chapters: updatedChapters,
        };
      });
    });
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        currentSubjectId,
        currentSubject,
        setCurrentSubjectId,
        activeChapterId,
        setActiveChapterId,
        activeChapter,
        completeTopic,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = (): SubjectContextType => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubject must be used within a SubjectProvider');
  }
  return context;
};

export default SubjectContext;
