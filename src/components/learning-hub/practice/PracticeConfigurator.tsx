import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Sprout, 
  BarChart2, 
  Flame, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  Layers, 
  Edit3
} from 'lucide-react';
import { 
  PRACTICE_LEVELS, 
  QUESTION_FORMATS, 
  type PracticeLevelType, 
  type QuestionFormatType 
} from '../../../data/practicePageData';
import { useSubject } from '../../../context/SubjectContext';
import { getPracticeChaptersForSubject } from '../../../data/subjectsData';
import ChapterTopicSelectionModal from './ChapterTopicSelectionModal';
import styles from './PracticeConfigurator.module.css';

export type PracticeModeType = 'chapter-wise' | 'topic-wise';

interface PracticeConfiguratorProps {
  selectedChapterIds: string[];
  onSelectChapters: (ids: string[]) => void;
  selectedTopicIds: string[];
  onSelectTopics: (ids: string[]) => void;
  selectedLevel: PracticeLevelType;
  onSelectLevel: (level: PracticeLevelType) => void;
  selectedFormat: QuestionFormatType;
  onSelectFormat: (format: QuestionFormatType) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
  practiceMode?: PracticeModeType;
  onSelectPracticeMode?: (mode: PracticeModeType) => void;
}

const PracticeConfigurator: React.FC<PracticeConfiguratorProps> = ({
  selectedChapterIds,
  onSelectChapters,
  selectedTopicIds,
  onSelectTopics,
  selectedLevel,
  onSelectLevel,
  selectedFormat,
  onSelectFormat,
  onGenerate,
  isGenerating = false,
  practiceMode: controlledMode,
  onSelectPracticeMode,
}) => {
  const { currentSubject } = useSubject();
  const chaptersData = useMemo(() => getPracticeChaptersForSubject(currentSubject), [currentSubject]);

  const [internalMode, setInternalMode] = useState<PracticeModeType>('chapter-wise');
  const mode = controlledMode ?? internalMode;

  // Single clean unified popup for selecting and viewing chapters & topics
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);

  // Selected level config
  const selectedLevelConfig = PRACTICE_LEVELS.find(l => l.id === selectedLevel) || PRACTICE_LEVELS[0];

  // Mode switcher handler
  const handleSetMode = (newMode: PracticeModeType) => {
    if (onSelectPracticeMode) {
      onSelectPracticeMode(newMode);
    } else {
      setInternalMode(newMode);
    }

    // In chapter-wise mode: all unlocked topics in selected chapters are automatically included
    if (newMode === 'chapter-wise') {
      const allUnlockedTopicsInSelectedChapters: string[] = [];
      selectedChapterIds.forEach(chId => {
        const chapter = chaptersData.find(c => c.id === chId);
        if (chapter && !chapter.isLocked) {
          chapter.topics.forEach(t => {
            if (!t.isLocked) allUnlockedTopicsInSelectedChapters.push(t.id);
          });
        }
      });

      // If no chapters selected, select first unlocked chapter
      if (selectedChapterIds.length === 0) {
        const firstUnlocked = chaptersData.find(c => !c.isLocked) || chaptersData[0];
        if (firstUnlocked) {
          onSelectChapters([firstUnlocked.id]);
          onSelectTopics(firstUnlocked.topics.filter(t => !t.isLocked).map(t => t.id));
        }
      } else {
        onSelectTopics(allUnlockedTopicsInSelectedChapters);
      }
    }
  };

  // Calculate trigger display text
  const getTriggerDisplayLabel = () => {
    if (selectedChapterIds.length === 0) {
      return 'Select Chapters & Topics';
    }
    if (selectedChapterIds.length === 1) {
      const ch = chaptersData.find(c => c.id === selectedChapterIds[0]);
      const chNum = ch?.chapterNumber ? String(ch.chapterNumber).padStart(2, '0') : '01';
      const topicsInChapter = ch?.topics.filter(t => selectedTopicIds.includes(t.id)).length || 0;
      return `Ch ${chNum} — ${ch?.name || 'Chapter'} (${topicsInChapter} ${topicsInChapter === 1 ? 'Topic' : 'Topics'})`;
    }
    return `${selectedChapterIds.length} Chapters · ${selectedTopicIds.length} Topics`;
  };

  const isReadyToGenerate = selectedChapterIds.length > 0 && selectedTopicIds.length > 0;

  return (
    <div className={styles.configContainer}>
      {/* 4 Clean Modular Cards Grid with Generate Practice Fitted Neatly */}
      <div className={styles.cardsGrid}>

        {/* Card 1: Practice Mode */}
        <div className={styles.miniCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardStepBadge}>1</span>
            <span className={styles.cardTitle}>Practice Mode</span>
          </div>

          <div className={styles.modeOptionsCol}>
            {/* Option 1: Chapter-wise */}
            <div 
              className={`${styles.modeOption} ${mode === 'chapter-wise' ? styles.modeOptionActive : ''}`}
              onClick={() => handleSetMode('chapter-wise')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.modeOptionLeft}>
                <div className={`${styles.modeIconCircle} ${mode === 'chapter-wise' ? styles.modeIconCircleActive : ''}`}>
                  <BookOpen size={13} />
                </div>
                <div className={styles.modeTextCol}>
                  <div className={styles.modeTitleRow}>
                    <span className={styles.modeName}>Chapter-wise</span>
                    <span className={styles.modeBadge}>All Topics</span>
                  </div>
                  <span className={styles.modeSub}>All unlocked topics included</span>
                </div>
              </div>
              <div className={`${styles.radioMini} ${mode === 'chapter-wise' ? styles.radioMiniActive : ''}`}>
                {mode === 'chapter-wise' && <div className={styles.radioMiniDot} />}
              </div>
            </div>

            {/* Option 2: Topic-wise */}
            <div 
              className={`${styles.modeOption} ${mode === 'topic-wise' ? styles.modeOptionActive : ''}`}
              onClick={() => handleSetMode('topic-wise')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.modeOptionLeft}>
                <div className={`${styles.modeIconCircle} ${mode === 'topic-wise' ? styles.modeIconCircleActive : ''}`}>
                  <Layers size={13} />
                </div>
                <div className={styles.modeTextCol}>
                  <div className={styles.modeTitleRow}>
                    <span className={styles.modeName}>Topic-wise</span>
                    <span className={styles.modeBadgeCustom}>Custom</span>
                  </div>
                  <span className={styles.modeSub}>Choose specific topics</span>
                </div>
              </div>
              <div className={`${styles.radioMini} ${mode === 'topic-wise' ? styles.radioMiniActive : ''}`}>
                {mode === 'topic-wise' && <div className={styles.radioMiniDot} />}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Chapter & Topics Multi-Select Trigger (Opens Clean 2-Column Popup) */}
        <div className={styles.miniCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardStepBadge}>2</span>
            <span className={styles.cardTitle}>Chapter & Topics</span>
            {mode === 'chapter-wise' ? (
              <span className={styles.autoSelectTag}>Auto-Selected</span>
            ) : (
              <span className={styles.customSelectTag}>Custom</span>
            )}
          </div>

          <div className={styles.dropdownsCol}>
            {/* Clean Interactive Trigger Button */}
            <div 
              className={styles.chapterTriggerCard}
              onClick={() => setIsSelectionModalOpen(true)}
              role="button"
              tabIndex={0}
              title="Click to open popup and select chapters and topics"
            >
              <div className={styles.triggerCardLeft}>
                <div className={styles.triggerIconCircle}>
                  <BookOpen size={14} />
                </div>
                <div className={styles.triggerTextCol}>
                  <div className={styles.triggerTitle}>
                    {getTriggerDisplayLabel()}
                  </div>
                  <div className={styles.triggerSub}>
                    {selectedChapterIds.length === 0 ? (
                      'Click to select chapters & topics'
                    ) : mode === 'chapter-wise' ? (
                      'All unlocked topics included • Click to change'
                    ) : (
                      'Custom topics selected • Click to customize'
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.triggerCardRight}>
                {selectedChapterIds.length > 0 && (
                  <span className={styles.triggerChCountBadge}>
                    {selectedChapterIds.length} {selectedChapterIds.length === 1 ? 'Ch' : 'Chs'}
                  </span>
                )}
                <div className={styles.triggerSelectBtn}>
                  <Edit3 size={11} />
                  <span>Select</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Level & Format */}
        <div className={styles.miniCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardStepBadge}>3</span>
            <span className={styles.cardTitle}>Level & Format</span>
          </div>

          <div className={styles.configControlsCol}>
            {/* Difficulty Level Segmented Buttons */}
            <div className={styles.levelSegmented}>
              {PRACTICE_LEVELS.map(level => {
                const isSelected = selectedLevel === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    className={`${styles.levelPill} ${isSelected ? styles.levelPillActive : ''}`}
                    onClick={() => onSelectLevel(level.id)}
                    title={level.description}
                  >
                    {level.id === 'warm-up' && <Sprout size={12} className={styles.levelIcon} />}
                    {level.id === 'challenge' && <BarChart2 size={12} className={styles.levelIcon} />}
                    {level.id === 'expert' && <Flame size={12} className={styles.levelIcon} />}
                    <span className={styles.levelPillTitle}>{level.title}</span>
                    <span className={styles.levelPillCount}>({level.questionCount})</span>
                  </button>
                );
              })}
            </div>

            {/* Question Format Mini-Pills */}
            <div className={styles.formatPillsRow}>
              {QUESTION_FORMATS.map(format => {
                const isSelected = selectedFormat === format;
                return (
                  <button
                    key={format}
                    className={`${styles.formatPill} ${isSelected ? styles.formatPillActive : ''}`}
                    onClick={() => onSelectFormat(format)}
                    type="button"
                  >
                    {format}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 4: Generate Practice (Neatly Integrated Action Card - Replaces Redundant Bottom Line) */}
        <div className={styles.actionCard}>
          <div className={styles.cardHeader}>
            <span className={styles.actionStepBadge}>
              <Sparkles size={11} className={styles.actionSparkleIcon} />
            </span>
            <span className={styles.cardTitle}>Generate Practice</span>
            <span className={styles.actionSelectionPill}>
              {selectedChapterIds.length} Chs · {selectedTopicIds.length} Topics
            </span>
          </div>

          <div className={styles.actionCardBody}>
            <button 
              className={styles.generateBtnMain}
              onClick={onGenerate}
              disabled={isGenerating || !isReadyToGenerate}
              type="button"
              title={isReadyToGenerate ? "Start your customized practice mission" : "Select unlocked chapters & topics first"}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={14} className={styles.spinIcon} />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate Practice</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            <div className={styles.actionSubtextRow}>
              <span className={styles.actionLevelTag}>
                {selectedLevelConfig.questionCount} {selectedLevelConfig.title} Qs
              </span>
              <span className={styles.actionSubDot}>•</span>
              <span className={styles.actionFormatTag}>
                {selectedFormat} Format
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Clean 2-Column Popup for Chapters & Topics Selection */}
      <ChapterTopicSelectionModal 
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        selectedChapterIds={selectedChapterIds}
        onSelectChapters={onSelectChapters}
        selectedTopicIds={selectedTopicIds}
        onSelectTopics={onSelectTopics}
        practiceMode={mode}
        onSelectPracticeMode={handleSetMode}
      />
    </div>
  );
};

export default PracticeConfigurator;
