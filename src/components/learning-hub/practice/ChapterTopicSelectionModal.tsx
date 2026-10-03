import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  Check, 
  Minus, 
  BookOpen, 
  Layers, 
  Lock, 
  Info, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { type ChapterData, type TopicData } from '../../../data/practicePageData';
import { useSubject } from '../../../context/SubjectContext';
import { getPracticeChaptersForSubject } from '../../../data/subjectsData';
import styles from './ChapterTopicSelectionModal.module.css';

interface ChapterTopicSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedChapterIds: string[];
  onSelectChapters: (chapterIds: string[]) => void;
  selectedTopicIds: string[];
  onSelectTopics: (topicIds: string[]) => void;
  practiceMode: 'chapter-wise' | 'topic-wise';
  onSelectPracticeMode: (mode: 'chapter-wise' | 'topic-wise') => void;
}

export const ChapterTopicSelectionModal: React.FC<ChapterTopicSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedChapterIds,
  onSelectChapters,
  selectedTopicIds,
  onSelectTopics,
  practiceMode,
  onSelectPracticeMode,
}) => {
  const { currentSubject } = useSubject();
  const chaptersData = useMemo(() => getPracticeChaptersForSubject(currentSubject), [currentSubject]);

  // First unlocked chapter is default active
  const firstUnlocked = chaptersData.find(c => !c.isLocked)?.id || chaptersData[0]?.id;
  const [activeChapterId, setActiveChapterId] = useState<string>(firstUnlocked);

  // Sync activeChapterId when currentSubject changes
  useEffect(() => {
    const first = chaptersData.find(c => !c.isLocked)?.id || chaptersData[0]?.id;
    if (first) {
      setActiveChapterId(first);
    }
  }, [currentSubject.id]);

  if (!isOpen) return null;

  // Active chapter object
  const activeChapter = chaptersData.find(c => c.id === activeChapterId) || chaptersData[0];

  // Stats calculation
  const totalUnlockedChapters = chaptersData.filter(c => !c.isLocked).length;
  const totalLockedChapters = chaptersData.length - totalUnlockedChapters;

  // Toggle chapter selection (Chapter-wise mode or checkbox on left)
  const handleToggleChapterCheckbox = (chapter: ChapterData, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (chapter.isLocked) return;

    const unlockedTopics = chapter.topics.filter(t => !t.isLocked).map(t => t.id);
    const selectedTopicsInThisChapter = chapter.topics.filter(t => !t.isLocked && selectedTopicIds.includes(t.id));
    const isFullyChecked = unlockedTopics.length > 0 && selectedTopicsInThisChapter.length === unlockedTopics.length;

    if (practiceMode === 'chapter-wise') {
      if (isFullyChecked) {
        // Deselect chapter and all its topics
        onSelectChapters(selectedChapterIds.filter(id => id !== chapter.id));
        onSelectTopics(selectedTopicIds.filter(id => !unlockedTopics.includes(id)));
      } else {
        // Select chapter and all its unlocked topics
        onSelectChapters([...selectedChapterIds.filter(id => id !== chapter.id), chapter.id]);
        const nextTopics = Array.from(new Set([...selectedTopicIds, ...unlockedTopics]));
        onSelectTopics(nextTopics);
      }
    } else {
      // Topic-wise mode: clicking chapter checkbox toggles all topics in chapter
      if (isFullyChecked) {
        // Deselect all topics in this chapter
        onSelectChapters(selectedChapterIds.filter(id => id !== chapter.id));
        onSelectTopics(selectedTopicIds.filter(id => !unlockedTopics.includes(id)));
      } else {
        // Select all unlocked topics in this chapter
        if (!selectedChapterIds.includes(chapter.id)) {
          onSelectChapters([...selectedChapterIds, chapter.id]);
        }
        const nextTopics = Array.from(new Set([...selectedTopicIds, ...unlockedTopics]));
        onSelectTopics(nextTopics);
      }
    }

    // Set this chapter as active view
    setActiveChapterId(chapter.id);
  };

  // Toggle individual topic selection (Topic-wise mode)
  const handleToggleTopic = (topic: TopicData, chapter: ChapterData) => {
    if (topic.isLocked || chapter.isLocked) return;

    if (practiceMode === 'chapter-wise') {
      // Seamlessly switch to topic-wise mode so user can customize individual topics
      onSelectPracticeMode('topic-wise');
    }

    const isTopicSelected = selectedTopicIds.includes(topic.id);

    if (isTopicSelected) {
      const nextTopics = selectedTopicIds.filter(id => id !== topic.id);
      onSelectTopics(nextTopics);

      // Check if any topics remain in this chapter
      const remainingInThisChapter = chapter.topics.filter(t => !t.isLocked && nextTopics.includes(t.id));
      if (remainingInThisChapter.length === 0) {
        onSelectChapters(selectedChapterIds.filter(id => id !== chapter.id));
      }
    } else {
      const nextTopics = [...selectedTopicIds, topic.id];
      onSelectTopics(nextTopics);

      if (!selectedChapterIds.includes(chapter.id)) {
        onSelectChapters([...selectedChapterIds, chapter.id]);
      }
    }
  };

  // Select all topics in the active chapter (for Topic-wise right panel)
  const handleSelectAllInActiveChapter = () => {
    if (!activeChapter || activeChapter.isLocked) return;
    const unlockedTopics = activeChapter.topics.filter(t => !t.isLocked).map(t => t.id);
    
    if (!selectedChapterIds.includes(activeChapter.id)) {
      onSelectChapters([...selectedChapterIds, activeChapter.id]);
    }
    const nextTopics = Array.from(new Set([...selectedTopicIds, ...unlockedTopics]));
    onSelectTopics(nextTopics);
  };

  // Deselect all topics in the active chapter
  const handleClearInActiveChapter = () => {
    if (!activeChapter || activeChapter.isLocked) return;
    const unlockedTopicIds = activeChapter.topics.filter(t => !t.isLocked).map(t => t.id);

    onSelectChapters(selectedChapterIds.filter(id => id !== activeChapter.id));
    onSelectTopics(selectedTopicIds.filter(id => !unlockedTopicIds.includes(id)));
  };

  // Select all unlocked chapters and topics across the entire curriculum
  const handleSelectAllUnlocked = () => {
    const unlockedChapters = chaptersData.filter(c => !c.isLocked);
    const chapterIds = unlockedChapters.map(c => c.id);
    const topicIds: string[] = [];
    unlockedChapters.forEach(c => {
      c.topics.filter(t => !t.isLocked).forEach(t => topicIds.push(t.id));
    });

    onSelectChapters(chapterIds);
    onSelectTopics(topicIds);
  };

  // Clear all selections
  const handleClearAll = () => {
    onSelectChapters([]);
    onSelectTopics([]);
  };

  // Switch mode handler
  const handleModeSwitch = (mode: 'chapter-wise' | 'topic-wise') => {
    onSelectPracticeMode(mode);
    if (mode === 'chapter-wise') {
      // In chapter-wise, ensure every selected chapter has all its unlocked topics selected
      const unlockedTopicIds: string[] = [];
      selectedChapterIds.forEach(chId => {
        const ch = chaptersData.find(c => c.id === chId && !c.isLocked);
        if (ch) {
          ch.topics.filter(t => !t.isLocked).forEach(t => unlockedTopicIds.push(t.id));
        }
      });
      onSelectTopics(unlockedTopicIds);
    }
  };

  // Active chapter topics info
  const activeUnlockedTopics = activeChapter ? activeChapter.topics.filter(t => !t.isLocked) : [];
  const activeSelectedTopics = activeChapter ? activeChapter.topics.filter(t => !t.isLocked && selectedTopicIds.includes(t.id)) : [];
  const isActiveFullySelected = activeUnlockedTopics.length > 0 && activeSelectedTopics.length === activeUnlockedTopics.length;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.iconCircle}>
              <BookOpen size={18} />
            </div>
            <div className={styles.headerTextCol}>
              <h2 className={styles.title}>Select Chapters & Topics</h2>
              <p className={styles.subtitle}>
                Choose chapters and topics to practice. Only unlocked content is available.
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs in Header */}
          <div className={styles.modeSegment}>
            <button
              type="button"
              className={`${styles.modeBtn} ${practiceMode === 'chapter-wise' ? styles.modeBtnActive : ''}`}
              onClick={() => handleModeSwitch('chapter-wise')}
            >
              <BookOpen size={13} />
              <span>Chapter-wise</span>
              <span className={styles.modeBadgeMini}>Auto</span>
            </button>
            <button
              type="button"
              className={`${styles.modeBtn} ${practiceMode === 'topic-wise' ? styles.modeBtnActive : ''}`}
              onClick={() => handleModeSwitch('topic-wise')}
            >
              <Layers size={13} />
              <span>Topic-wise</span>
              <span className={styles.modeBadgeMiniCustom}>Custom</span>
            </button>
          </div>

          <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        {/* Secondary Info & Actions Bar */}
        <div className={styles.infoBar}>
          <div className={styles.infoLeft}>
            <Info size={14} className={styles.infoIcon} />
            <span className={styles.infoText}>
              {practiceMode === 'chapter-wise' ? (
                <>
                  <strong>Chapter-wise:</strong> Selecting a chapter automatically includes all its unlocked topics.
                </>
              ) : (
                <>
                  <strong>Topic-wise:</strong> Select any chapter on the left, then pick individual unlocked topics on the right.
                </>
              )}
            </span>
          </div>

          <div className={styles.quickActions}>
            <button 
              type="button" 
              className={styles.quickActionBtn}
              onClick={handleSelectAllUnlocked}
            >
              Select All Unlocked
            </button>
            <span className={styles.actionSep}>•</span>
            <button 
              type="button" 
              className={styles.quickActionBtn}
              onClick={handleClearAll}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Two-Column Modal Body */}
        <div className={styles.twoColumnBody}>
          {/* Left Column: Chapters List */}
          <div className={styles.leftCol}>
            <div className={styles.columnHeader}>
              <span className={styles.columnTitle}>Chapters</span>
              <span className={styles.chapterStatsBadge}>
                {totalUnlockedChapters} Unlocked · {totalLockedChapters} Locked
              </span>
            </div>

            <div className={styles.chaptersScrollArea}>
              {chaptersData.map((chapter) => {
                const isLocked = Boolean(chapter.isLocked);
                const chNum = chapter.chapterNumber ? String(chapter.chapterNumber).padStart(2, '0') : '';
                const chapterTitle = chNum ? `Chapter ${chNum} — ${chapter.name}` : chapter.name;

                const unlockedTopics = chapter.topics.filter(t => !t.isLocked);
                const unlockedCount = unlockedTopics.length;
                const selectedInChapter = chapter.topics.filter(t => !t.isLocked && selectedTopicIds.includes(t.id));
                const selectedCount = selectedInChapter.length;

                const isFullyChecked = unlockedCount > 0 && selectedCount === unlockedCount;
                const isPartiallyChecked = selectedCount > 0 && selectedCount < unlockedCount;
                const isActive = chapter.id === activeChapterId;

                return (
                  <div
                    key={chapter.id}
                    className={`
                      ${styles.chapterItem}
                      ${isActive ? styles.chapterItemActive : ''}
                      ${isLocked ? styles.chapterItemLocked : ''}
                      ${isFullyChecked ? styles.chapterItemFullyChecked : ''}
                    `}
                    onClick={() => setActiveChapterId(chapter.id)}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Checkbox or Lock */}
                    <div 
                      className={styles.checkboxWrapper}
                      onClick={(e) => !isLocked && handleToggleChapterCheckbox(chapter, e)}
                    >
                      {isLocked ? (
                        <div className={styles.lockIconBox}>
                          <Lock size={12} className={styles.lockIcon} />
                        </div>
                      ) : (
                        <div 
                          className={`
                            ${styles.customCheckbox}
                            ${isFullyChecked ? styles.checkboxChecked : ''}
                            ${isPartiallyChecked ? styles.checkboxPartial : ''}
                          `}
                        >
                          {isFullyChecked && <Check size={11} strokeWidth={3} />}
                          {isPartiallyChecked && <Minus size={11} strokeWidth={3} />}
                        </div>
                      )}
                    </div>

                    {/* Chapter Name & Unlocked Info */}
                    <div className={styles.chapterInfoCol}>
                      <span className={`${styles.chapterName} ${isLocked ? styles.textLocked : ''}`}>
                        {chapterTitle}
                      </span>
                      <span className={styles.chapterSub}>
                        {isLocked ? (
                          <span className={styles.lockText}>Locked · Complete previous chapter</span>
                        ) : practiceMode === 'chapter-wise' ? (
                          `${unlockedCount} topics unlocked • All topics included`
                        ) : (
                          `${selectedCount}/${unlockedCount} topics selected`
                        )}
                      </span>
                    </div>

                    {/* Right Status Badge */}
                    <div className={styles.chapterRightMeta}>
                      {isLocked ? (
                        <span className={styles.lockedPill}>Locked</span>
                      ) : isFullyChecked ? (
                        <span className={styles.allTopicsPill}>
                          {practiceMode === 'chapter-wise' ? 'All Topics' : `${selectedCount}/${unlockedCount}`}
                        </span>
                      ) : isPartiallyChecked ? (
                        <span className={styles.partialTopicsPill}>
                          {selectedCount}/${unlockedCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Topics for the Active Chapter */}
          <div className={styles.rightCol}>
            {activeChapter && (
              <>
                <div className={styles.rightColHeader}>
                  <div className={styles.rightHeaderTitleCol}>
                    <span className={styles.rightColBadge}>
                      {activeChapter.chapterNumber ? `Chapter ${String(activeChapter.chapterNumber).padStart(2, '0')}` : 'Chapter'}
                    </span>
                    <h3 className={styles.rightColTitle}>{activeChapter.name}</h3>
                  </div>

                  {!activeChapter.isLocked && (
                    <div className={styles.rightColActions}>
                      {practiceMode === 'topic-wise' ? (
                        <>
                          {isActiveFullySelected ? (
                            <button
                              type="button"
                              className={styles.topicActionBtn}
                              onClick={handleClearInActiveChapter}
                            >
                              Deselect All
                            </button>
                          ) : (
                            <button
                              type="button"
                              className={styles.topicActionBtn}
                              onClick={handleSelectAllInActiveChapter}
                            >
                              Select All ({activeUnlockedTopics.length})
                            </button>
                          )}
                        </>
                      ) : (
                        <span className={styles.chapterWiseStatusPill}>
                          <CheckCircle2 size={12} />
                          <span>All Topics Included</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.topicsScrollArea}>
                  {activeChapter.isLocked ? (
                    <div className={styles.lockedStateCard}>
                      <div className={styles.lockedStateIconCircle}>
                        <Lock size={24} />
                      </div>
                      <h4 className={styles.lockedStateHeading}>Chapter Locked</h4>
                      <p className={styles.lockedStateText}>
                        {activeChapter.lockReason || 'Complete the previous chapters to unlock these topics for practice.'}
                      </p>
                    </div>
                  ) : activeChapter.topics.length === 0 ? (
                    <div className={styles.emptyState}>
                      <p>No topics available under this chapter.</p>
                    </div>
                  ) : (
                    <div className={styles.topicsList}>
                      {activeChapter.topics.map((topic) => {
                        const isTopicLocked = Boolean(topic.isLocked);
                        const isTopicSelected = selectedTopicIds.includes(topic.id) && !isTopicLocked;

                        return (
                          <div
                            key={topic.id}
                            className={`
                              ${styles.topicItemRow}
                              ${isTopicSelected ? styles.topicItemSelected : ''}
                              ${isTopicLocked ? styles.topicItemLocked : ''}
                            `}
                            onClick={() => !isTopicLocked && handleToggleTopic(topic, activeChapter)}
                            role="button"
                            tabIndex={0}
                          >
                            {/* Checkbox */}
                            <div className={styles.topicCheckboxWrapper}>
                              {isTopicLocked ? (
                                <Lock size={12} className={styles.lockIcon} />
                              ) : (
                                <div
                                  className={`
                                    ${styles.customCheckbox}
                                    ${isTopicSelected ? styles.checkboxChecked : ''}
                                  `}
                                >
                                  {isTopicSelected && <Check size={11} strokeWidth={3} />}
                                </div>
                              )}
                            </div>

                            {/* Topic Code & Title */}
                            <div className={styles.topicInfoCol}>
                              <div className={styles.topicNameLine}>
                                {topic.code && (
                                  <span className={styles.topicCodeBadge}>{topic.code}</span>
                                )}
                                <span className={`${styles.topicNameText} ${isTopicLocked ? styles.textLocked : ''}`}>
                                  {topic.name}
                                </span>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <div className={styles.topicStatusCol}>
                              {isTopicLocked ? (
                                <span className={styles.topicLockedTag}>Locked</span>
                              ) : isTopicSelected ? (
                                <span className={styles.topicIncludedTag}>
                                  <CheckCircle2 size={11} />
                                  <span>Included</span>
                                </span>
                              ) : (
                                <span className={styles.topicUnlockedTag}>Unlocked</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <div className={styles.selectionSummaryChip}>
              <Sparkles size={14} className={styles.sparkleIcon} />
              <span className={styles.summaryCountText}>
                <strong>{selectedChapterIds.length}</strong> {selectedChapterIds.length === 1 ? 'Chapter' : 'Chapters'} · <strong>{selectedTopicIds.length}</strong> {selectedTopicIds.length === 1 ? 'Topic' : 'Topics'} selected
              </span>
            </div>
            <span className={styles.currentModeIndicator}>
              {practiceMode === 'chapter-wise' ? 'Chapter-wise mode' : 'Topic-wise mode'}
            </span>
          </div>

          <div className={styles.footerRight}>
            <button 
              type="button" 
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className={styles.doneBtn}
              onClick={onClose}
            >
              <Check size={14} strokeWidth={2.5} />
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterTopicSelectionModal;
