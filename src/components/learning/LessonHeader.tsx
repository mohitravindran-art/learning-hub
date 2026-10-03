import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Lock, X, BookOpen, Layers, Library } from 'lucide-react';
import { useSubject } from '../../context/SubjectContext';
import styles from './LessonHeader.module.css';

export type HeaderTab = 'learn' | 'flashcards' | 'resources';

interface LessonHeaderProps {
  topicTitle: string;
  lessonTitle: string;
  activeTab?: HeaderTab;
  onTabChange?: (tab: HeaderTab) => void;
  onExit: () => void;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ 
  topicTitle, 
  lessonTitle, 
  activeTab = 'learn',
  onTabChange,
  onExit 
}) => {
  const { currentSubject } = useSubject();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Automatically expand the current chapter
    const currentChapter = currentSubject.chapters.find(c => c.title === topicTitle);
    if (currentChapter && !expandedChapters.includes(currentChapter.id)) {
      setExpandedChapters([currentChapter.id]);
    }
  }, [topicTitle, currentSubject]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleChapter = (chapterId: string, status: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === 'locked') return; // Cannot expand locked chapters
    
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleJump = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app this would call onJump(topicId) up to LearningHubPage
    // For now we'll just close it, as we might not have the full routing wired up.
    setIsOpen(false);
    // window.location.reload(); // Simple way to 'jump' if we had url routing, but we have React state
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.exitBtn} onClick={onExit} aria-label="Exit">
          <X size={20} />
        </button>
        
        <div className={styles.dropdownContainer} ref={dropdownRef}>
          <div 
            className={styles.titlesClickable} 
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={styles.topicRow}>
              <span className={styles.topic}>{topicTitle}</span>
              {isOpen ? <ChevronUp size={16} className={styles.chevron} /> : <ChevronDown size={16} className={styles.chevron} />}
            </div>
            <div className={styles.subtopic}>{lessonTitle}</div>
          </div>

          {isOpen && (
            <div className={styles.quickJumpDropdown}>
              <div className={styles.qjHeader}>
                <span className={styles.qjTitle}>↩ Quick Jumps</span>
              </div>
              <div className={styles.qjContent}>
                {currentSubject.chapters.map(chapter => {
                  const isLocked = chapter.status === 'locked';
                  const isExpanded = expandedChapters.includes(chapter.id);
                  const isCurrentChapter = chapter.title === topicTitle;
                  
                  return (
                    <div key={chapter.id} className={styles.qjChapterContainer}>
                      <div 
                        className={`${styles.qjChapter} ${isCurrentChapter ? styles.qjChapterActive : ''} ${isLocked ? styles.qjChapterLocked : ''}`}
                        onClick={(e) => toggleChapter(chapter.id, chapter.status, e)}
                      >
                        <div className={styles.qjChapterLeft}>
                          {isLocked ? <Lock size={14} className={styles.qjLock} /> : <span className={styles.qjChapterIcon}>▣</span>}
                          <span>Chapter {String(chapter.number).padStart(2, '0')}: {chapter.title}</span>
                        </div>
                        {!isLocked && (
                          <div className={styles.qjChapterRight}>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </div>
                        )}
                      </div>

                      {isExpanded && !isLocked && (
                        <div className={styles.qjTopicsList}>
                          {chapter.topics.map(topic => {
                            const isCurrentTopic = topic.title === lessonTitle;
                            return (
                              <div 
                                key={topic.id}
                                className={`${styles.qjTopic} ${isCurrentTopic ? styles.qjTopicActive : ''}`}
                                onClick={(e) => handleJump(topic.id, e)}
                              >
                                {isCurrentTopic && <span className={styles.qjTopicCurrentIndicator}>← current</span>}
                                Topic {topic.number}: {topic.title}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.right}>
        <button 
          className={`${styles.navBtn} ${activeTab === 'learn' ? styles.activeNav : ''}`}
          onClick={() => onTabChange && onTabChange('learn')}
          type="button"
        >
          <BookOpen size={16} /> LEARN
        </button>
        <button 
          className={`${styles.navBtn} ${activeTab === 'flashcards' ? styles.activeNav : ''}`}
          onClick={() => onTabChange && onTabChange('flashcards')}
          type="button"
        >
          <Layers size={16} /> FLASHCARDS
        </button>
        <button 
          className={`${styles.navBtn} ${activeTab === 'resources' ? styles.activeNav : ''}`}
          onClick={() => onTabChange && onTabChange('resources')}
          type="button"
        >
          <Library size={16} /> RESOURCES
        </button>
      </div>
    </header>
  );
};

export default LessonHeader;
