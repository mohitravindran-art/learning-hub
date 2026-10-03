import React, { useState } from 'react';
import clsx from 'clsx';
import { ArrowLeft, CheckCircle2, Circle, Lock, Play, Sparkles, X } from 'lucide-react';
import { useSubject } from '../../context/SubjectContext';
import type { Topic } from '../../data/subjectsData';
import styles from './ModuleSidebar.module.css';

interface ModuleSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  onPlayChapter: (chapterId: string, topicId?: string) => void;
  onOpenGenerateModal?: (topicTitle: string, chapterTitle?: string) => void;
}

const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  isOpen,
  onClose,
  activeChapterId,
  onPlayChapter,
  onOpenGenerateModal
}) => {
  const { currentSubject } = useSubject();
  const activeChapter = currentSubject.chapters.find(c => c.id === activeChapterId) || currentSubject.chapters[0];
  const isChapterLocked = activeChapter.status === 'locked';

  const [prevSubjectId, setPrevSubjectId] = useState(currentSubject.id);
  const [prevChapterId, setPrevChapterId] = useState(activeChapterId);
  const [topics, setTopics] = useState<Topic[]>(activeChapter.topics);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(
    activeChapter.topics.find(t => t.status === 'current')?.id || activeChapter.topics[0]?.id || null
  );

  if (prevSubjectId !== currentSubject.id || prevChapterId !== activeChapterId) {
    setPrevSubjectId(currentSubject.id);
    setPrevChapterId(activeChapterId);
    setTopics(activeChapter.topics);
    setExpandedTopicId(
      activeChapter.topics.find(t => t.status === 'current')?.id || activeChapter.topics[0]?.id || null
    );
  }

  const completedInActiveChapter = topics.filter(t => t.status === 'completed').length;
  const chapterTotalTopics = topics.length;
  const chapterPercentage = Math.round((completedInActiveChapter / chapterTotalTopics) * 100) || 0;

  const handleToggleTopic = (topicId: string, isLocked: boolean) => {
    if (isLocked) return;
    setExpandedTopicId(prev => (prev === topicId ? null : topicId));
  };

  return (
    <aside className={clsx(styles.sidebar, isOpen && styles.sidebarOpen)}>
      <div className={styles.sidebarInner}>
        <div className={styles.topBar}>
          <button className={styles.backLink} onClick={onClose} type="button">
            <ArrowLeft size={16} />
            <span>Back to Courses</span>
          </button>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close sidebar" type="button">
            <X size={18} />
          </button>
        </div>

        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>
              Chapter {String(activeChapter.number).padStart(2, '0')} {activeChapter.title}
            </h1>
            {isChapterLocked && (
              <span className={styles.chapterLockedBadge}>
                <Lock size={12} /> Locked
              </span>
            )}
          </div>
          <p className={styles.subtitle}>
            {isChapterLocked ? 'This chapter is locked. Complete previous chapters to unlock.' : activeChapter.description}
          </p>

          {!isChapterLocked && (
            <button 
              className={styles.startChapterBtn} 
              onClick={() => onPlayChapter(activeChapter.id)}
              type="button"
              style={{
                marginTop: '16px',
                width: '100%',
                background: 'white',
                color: '#0F172A',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Play size={16} fill="#0F172A" />
              <span>Start Chapter</span>
            </button>
          )}
        </div>

        <div className={clsx(styles.progressSection, isChapterLocked && styles.progressSectionLocked)}>
          <div className={styles.progressCircleContainer}>
            {isChapterLocked ? (
              <div className={styles.lockedCircle}>
                <Lock size={18} className={styles.lockedCircleIcon} />
              </div>
            ) : (
              <svg className={styles.progressCircle} viewBox="0 0 36 36">
                <path
                  className={styles.circleBg}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={styles.circlePath}
                  strokeDasharray={`${chapterPercentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className={styles.percentage}>{chapterPercentage}%</text>
              </svg>
            )}
          </div>
          <div className={styles.progressText}>
            <div className={styles.progressTitle}>
              {isChapterLocked ? 'Chapter Locked' : 'Chapter Progress'}
            </div>
            <div className={styles.progressSubtitle}>
              {isChapterLocked 
                ? `0 of ${chapterTotalTopics} topics completed • Locked` 
                : `${completedInActiveChapter} of ${chapterTotalTopics} topics completed`}
            </div>
          </div>
        </div>

        <div className={styles.contentLabel}>CHAPTER CONTENT</div>

        {/* List of Topics under this Chapter */}
        <div className={styles.topicList}>
          {topics.map((topic) => {
            const isExpanded = topic.id === expandedTopicId;
            const isLocked = topic.status === 'locked' || isChapterLocked;
            const isCompleted = topic.status === 'completed';
            const isCurrent = topic.status === 'current';

            return (
              <div key={topic.id} className={styles.topicWrapper}>
                <button 
                  className={clsx(styles.topicHeader, isExpanded && styles.activeTopicHeader)}
                  onClick={() => handleToggleTopic(topic.id, isLocked)}
                  type="button"
                >
                  <div className={styles.topicHeaderLeft}>
                    {isCompleted && <CheckCircle2 size={16} className={styles.iconCompleted} />}
                    {isCurrent && <CheckCircle2 size={16} className={styles.iconCompleted} />}
                    {topic.status === 'unlocked' && <Circle size={16} className={styles.iconUnlocked} />}
                    {isLocked && <Lock size={14} className={styles.iconLocked} />}
                    <span className={styles.topicNumber}>
                      {topic.number} {isExpanded ? '•' : ''}
                    </span>
                    <span className={styles.topicTitle}>{topic.title}</span>
                  </div>
                  <div className={styles.topicHeaderRight}>
                    {isLocked && <Lock size={14} className={styles.topicLockIcon} />}
                    {!isLocked && <span className={styles.chevron}>{isExpanded ? '▲' : '▼'}</span>}
                  </div>
                </button>

                {isExpanded && !isLocked && (
                  <div className={styles.expandedTopicContent}>
                    {/* Clean Sub-topics list under this topic */}
                    {topic.subtopics && topic.subtopics.length > 0 && (
                      <div className={styles.subtopicList}>
                        {topic.subtopics.map(st => {
                          const isSubCompleted = st.status === 'completed';
                          const isSubCurrent = st.status === 'current';
                          const isSubLocked = st.status === 'locked';

                          return (
                            <div 
                              key={st.id}
                              className={clsx(
                                styles.subtopicItem,
                                isSubCurrent && styles.subtopicItemActive,
                                isSubLocked && styles.subtopicItemLocked
                              )}
                              onClick={() => {
                                if (!isSubLocked) {
                                  onPlayChapter(activeChapter.id, topic.id);
                                }
                              }}
                              role="button"
                              tabIndex={isSubLocked ? -1 : 0}
                            >
                              {isSubCompleted && <CheckCircle2 size={14} className={styles.iconCompleted} />}
                              {isSubCurrent && <CheckCircle2 size={14} className={styles.iconCompleted} />}
                              {st.status === 'unlocked' && <Circle size={14} className={styles.iconUnlocked} />}
                              {isSubLocked && <Lock size={12} className={styles.iconLocked} />}
                              <span className={styles.subtopicNumber}>{st.number}</span>
                              <span className={styles.subtopicTitle}>{st.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Proper Button for Generate Practice */}
                    <div className={styles.generatePracticeWrapper}>
                      <button 
                        className={styles.generatePracticeBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenGenerateModal) {
                            onOpenGenerateModal(topic.title, activeChapter.title);
                          }
                        }}
                        type="button"
                        title={`Generate AI practice questions for ${topic.title}`}
                      >
                        <Sparkles size={15} />
                        <span>Generate Practice</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.footerPromo}>
          <div className={styles.promoIcon}>🏆</div>
          <div className={styles.promoContent}>
            <div className={styles.promoTitle}>Keep Going!</div>
            <div className={styles.promoDesc}>Complete more topics to unlock real-world opportunities.</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ModuleSidebar;
