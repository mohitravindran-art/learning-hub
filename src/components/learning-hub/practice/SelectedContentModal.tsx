import React, { useMemo } from 'react';
import { X, Check, BookOpen, Layers, Edit3, Sparkles } from 'lucide-react';
import { type ChapterData, type TopicData } from '../../../data/practicePageData';
import { useSubject } from '../../../context/SubjectContext';
import { getPracticeChaptersForSubject } from '../../../data/subjectsData';
import styles from './SelectedContentModal.module.css';

interface SelectedContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditSelection: () => void;
  selectedChapterIds: string[];
  selectedTopicIds: string[];
  practiceMode: 'chapter-wise' | 'topic-wise';
}

export const SelectedContentModal: React.FC<SelectedContentModalProps> = ({
  isOpen,
  onClose,
  onEditSelection,
  selectedChapterIds,
  selectedTopicIds,
  practiceMode
}) => {
  const { currentSubject } = useSubject();
  const chaptersData = useMemo(() => getPracticeChaptersForSubject(currentSubject), [currentSubject]);

  if (!isOpen) return null;

  // Resolve selected chapters and their selected topics
  const chaptersWithTopics = selectedChapterIds
    .map(chId => {
      const chapter = chaptersData.find(c => c.id === chId);
      if (!chapter) return null;

      const topics = chapter.topics.filter(t => selectedTopicIds.includes(t.id));
      if (topics.length === 0) return null;

      return {
        chapter,
        topics
      };
    })
    .filter((item): item is { chapter: ChapterData; topics: TopicData[] } => item !== null);

  const totalTopicsCount = chaptersWithTopics.reduce((acc, curr) => acc + curr.topics.length, 0);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.iconCircle}>
              <Sparkles size={18} className={styles.sparkleIcon} />
            </div>
            <div>
              <h2 className={styles.title}>Selected Practice Content</h2>
              <div className={styles.badgesRow}>
                <span className={styles.countBadge}>
                  {chaptersWithTopics.length} {chaptersWithTopics.length === 1 ? 'Chapter' : 'Chapters'} · {totalTopicsCount} {totalTopicsCount === 1 ? 'Topic' : 'Topics'}
                </span>
                <span className={styles.modeBadge}>
                  {practiceMode === 'chapter-wise' ? 'Chapter-wise' : 'Topic-wise'}
                </span>
              </div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className={styles.body}>
          {chaptersWithTopics.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No chapters or topics currently selected.</p>
            </div>
          ) : (
            <div className={styles.chaptersList}>
              {chaptersWithTopics.map(({ chapter, topics }) => {
                const chNum = chapter.chapterNumber ? String(chapter.chapterNumber).padStart(2, '0') : '';
                const chapterTitle = chNum ? `Chapter ${chNum} — ${chapter.name}` : chapter.name;

                return (
                  <div key={chapter.id} className={styles.chapterGroup}>
                    <div className={styles.chapterHeader}>
                      <BookOpen size={15} className={styles.chapterIcon} />
                      <span className={styles.chapterTitleText}>{chapterTitle}</span>
                      <span className={styles.topicCountPill}>
                        {topics.length} {topics.length === 1 ? 'topic' : 'topics'}
                      </span>
                    </div>

                    <div className={styles.topicsList}>
                      {topics.map(topic => (
                        <div key={topic.id} className={styles.topicItem}>
                          <div className={styles.checkCircle}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span className={styles.topicNameText}>
                            {topic.code ? <strong className={styles.codeText}>{topic.code} </strong> : null}
                            {topic.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button 
            type="button" 
            className={styles.editBtn}
            onClick={() => {
              onClose();
              onEditSelection();
            }}
          >
            <Edit3 size={14} />
            <span>Edit Selection</span>
          </button>

          <button 
            type="button" 
            className={styles.doneBtn}
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedContentModal;
