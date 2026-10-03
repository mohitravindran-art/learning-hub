import React, { useState, useMemo, useEffect } from 'react';
import PracticeHero from './practice/PracticeHero';
import PracticeConfigurator from './practice/PracticeConfigurator';
import PracticeTabsBar from './practice/PracticeTabsBar';
import PracticeCardGrid from './practice/PracticeCardGrid';
import PracticeTable from './practice/PracticeTable';
import PracticeHistoryView from './practice/PracticeHistoryView';
import PracticeFeedbackPage from './practice/PracticeFeedbackPage';
import PracticeRunner from './practice/runner/PracticeRunner';
import HowItWorksModal from './practice/HowItWorksModal';
import SystemCheckModal from './practice/SystemCheckModal';
import { 
  PRACTICE_LEVELS, 
  INITIAL_PRACTICE_SETS,
  type PracticeLevelType, 
  type QuestionFormatType,
  type PracticeSetItem 
} from '../../data/practicePageData';
import { useSubject } from '../../context/SubjectContext';
import { getPracticeChaptersForSubject } from '../../data/subjectsData';
import { generateFeedbackQuestions } from '../../data/practiceFeedbackData';
import styles from './PracticeTab.module.css';

interface PracticeTabProps {
  activeTopicId?: string;
}

const PracticeTab: React.FC<PracticeTabProps> = () => {
  const { currentSubject } = useSubject();
  const chaptersData = useMemo(() => getPracticeChaptersForSubject(currentSubject), [currentSubject]);

  // Multi-select Chapter and Topic State
  const [selectedChapterIds, setSelectedChapterIds] = useState<string[]>(['comm-ch-1']);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([
    'comm-t-1', 
    'comm-t-2'
  ]);
  const [selectedLevel, setSelectedLevel] = useState<PracticeLevelType>('warm-up');
  const [selectedFormat, setSelectedFormat] = useState<QuestionFormatType>('ALL');
  const [practiceMode, setPracticeMode] = useState<'chapter-wise' | 'topic-wise'>('chapter-wise');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Sync selected chapters/topics when subject changes
  useEffect(() => {
    const firstUnlocked = chaptersData.find(c => !c.isLocked) || chaptersData[0];
    if (firstUnlocked) {
      setSelectedChapterIds([firstUnlocked.id]);
      const unlockedTopicIds = firstUnlocked.topics.filter(t => !t.isLocked).map(t => t.id);
      setSelectedTopicIds(unlockedTopicIds);
    }
  }, [currentSubject.id]);

  // View & Tab State
  const [activeTab, setActiveTab] = useState<'sets' | 'history'>('sets');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Modal & Dedicated Feedback Page State
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);
  const [isSystemCheckOpen, setIsSystemCheckOpen] = useState<boolean>(false);
  const [pendingStartSetId, setPendingStartSetId] = useState<string | null>(null);
  const [viewingFeedbackSetId, setViewingFeedbackSetId] = useState<string | null>(null);
  const [activeRunningSetId, setActiveRunningSetId] = useState<string | null>(null);

  // Practice Sets Dataset
  const [practiceSets, setPracticeSets] = useState<PracticeSetItem[]>(INITIAL_PRACTICE_SETS);


  // Generate Practice Set Handler
  const handleGenerate = () => {
    if (selectedChapterIds.length === 0 || selectedTopicIds.length === 0) return;
    setIsGenerating(true);

    setTimeout(() => {
      // Resolve chapter and topic names
      const chapterNames: string[] = [];
      selectedChapterIds.forEach(cId => {
        const found = chaptersData.find(c => c.id === cId);
        if (found) chapterNames.push(found.name);
      });

      const topicNames: string[] = [];
      chaptersData.forEach(c => {
        c.topics.forEach(t => {
          if (selectedTopicIds.includes(t.id)) {
            topicNames.push(t.name);
          }
        });
      });

      const currentLevelConfig = PRACTICE_LEVELS.find(l => l.id === selectedLevel) || PRACTICE_LEVELS[0];

      // Formulate compact names and display titles
      const setName = practiceMode === 'chapter-wise'
        ? chapterNames.length > 1
          ? `${chapterNames.length} Chapters Practice`
          : `${chapterNames[0] || 'Chapter'} Practice`
        : topicNames.length === 1 
          ? `${topicNames[0]} Set` 
          : chapterNames.length > 1
            ? `${chapterNames.length} Chapters Practice`
            : `${chapterNames[0] || 'Custom'} Practice`;

      const chapterDisplay = chapterNames.length === 1 
        ? chapterNames[0] 
        : `${chapterNames.length} Chapters`;

      const topicDisplay = topicNames.length === 1 
        ? topicNames[0] 
        : `${topicNames.length} Topics`;

      const newSet: PracticeSetItem = {
        id: `ps-${Date.now()}`,
        name: setName,
        selectedChapters: chapterNames,
        selectedTopics: topicNames,
        chapter: chapterDisplay,
        topic: topicDisplay,
        iconType: selectedFormat === 'CODE' ? 'code' : selectedFormat === 'AUDIO' ? 'video' : 'document',
        tags: [
          `${currentLevelConfig.questionCount} Questions`,
          practiceMode === 'chapter-wise' ? 'Chapter-wise' : 'Topic-wise',
          selectedFormat === 'ALL' ? 'All Formats' : selectedFormat,
          currentLevelConfig.title,
        ],
        totalQuestions: currentLevelConfig.questionCount,
        completedQuestions: 0,
        status: 'not-started',
        level: selectedLevel,
        practiceLevel: selectedLevel,
        questionFormats: [selectedFormat],
        createdAt: new Date().toISOString(),
        // Pre-create persistent questions for consistency
        questions: generateFeedbackQuestions(
          currentLevelConfig.questionCount,
          80,
          chapterNames,
          topicNames
        ),
      };

      setPracticeSets(prev => [newSet, ...prev]);
      setIsGenerating(false);
      setActiveTab('sets');
    }, 650);
  };

  // Action Handler (Start / Continue / Feedback)
  const handleAction = (id: string, actionType: 'start' | 'continue' | 'feedback' | 'score') => {
    const targetSet = practiceSets.find(s => s.id === id);
    if (!targetSet) return;

    if (actionType === 'feedback' || actionType === 'score') {
      // Open dedicated feedback page
      setViewingFeedbackSetId(id);
    } else if (actionType === 'start' || actionType === 'continue') {
      // Prompt for audio permission / system check just before practice starts
      setPendingStartSetId(id);
      setIsSystemCheckOpen(true);
    }
  };

  const handleConfirmStart = () => {
    if (pendingStartSetId) {
      setActiveRunningSetId(pendingStartSetId);
      setPendingStartSetId(null);
    }
    setIsSystemCheckOpen(false);
  };

  const handleDelete = (id: string) => {
    setPracticeSets(prev => prev.filter(s => s.id !== id));
    if (viewingFeedbackSetId === id) {
      setViewingFeedbackSetId(null);
    }
    if (activeRunningSetId === id) {
      setActiveRunningSetId(null);
    }
  };

  const handleRetake = (id: string) => {
    setPracticeSets(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'in-progress',
          completedQuestions: 0,
        };
      }
      return s;
    }));
    setViewingFeedbackSetId(null);
    setPendingStartSetId(id);
    setIsSystemCheckOpen(true);
  };

  // Active practice sets (excludes finished/completed practices)
  const activePracticeSets = useMemo(() => {
    return practiceSets.filter(s => s.status !== 'completed');
  }, [practiceSets]);

  // Finished / completed practice sets (shown exclusively in Practice History)
  const completedSets = useMemo(() => {
    return practiceSets.filter(s => s.status === 'completed');
  }, [practiceSets]);

  // Sorting for Active Practice Sets (excludes finished)
  const sortedSets = useMemo(() => {
    const list = [...activePracticeSets];
    if (sortBy === 'newest') {
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    if (sortBy === 'oldest') {
      return list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    if (sortBy === 'progress') {
      return list.sort((a, b) => (b.completedQuestions / b.totalQuestions) - (a.completedQuestions / a.totalQuestions));
    }
    return list;
  }, [activePracticeSets, sortBy]);

  // If a practice set is actively being practiced, display the full PracticeRunner
  const activeRunningSet = useMemo(() => {
    if (!activeRunningSetId) return null;
    return practiceSets.find(s => s.id === activeRunningSetId) || null;
  }, [activeRunningSetId, practiceSets]);

  // If a practice set is opened for feedback, display the dedicated full PracticeFeedbackPage
  const activeFeedbackSet = useMemo(() => {
    if (!viewingFeedbackSetId) return null;
    return practiceSets.find(s => s.id === viewingFeedbackSetId) || null;
  }, [viewingFeedbackSetId, practiceSets]);

  if (activeRunningSet) {
    return (
      <PracticeRunner 
        topicTitle={activeRunningSet.name}
        onComplete={(feedbackItems, score, timeTakenMinutes) => {
          setPracticeSets(prev => prev.map(s => {
            if (s.id === activeRunningSetId) {
              return {
                ...s,
                status: 'completed',
                completedQuestions: s.totalQuestions,
                score,
                accuracy: score,
                timeSpentMinutes: timeTakenMinutes,
                submittedAt: new Date().toISOString(),
                questions: feedbackItems,
              };
            }
            return s;
          }));
          const doneId = activeRunningSetId;
          setActiveRunningSetId(null);
          setViewingFeedbackSetId(doneId);
        }}
        onExit={() => setActiveRunningSetId(null)}
      />
    );
  }

  if (activeFeedbackSet) {

    return (
      <div className={styles.pageContainer}>
        <div className={styles.innerContent}>
          <PracticeFeedbackPage 
            practiceSet={activeFeedbackSet}
            onBack={() => setViewingFeedbackSetId(null)}
            onRetry={handleRetake}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.innerContent}>
        {/* Top Hero Section */}
        <PracticeHero onHowItWorks={() => setIsHowItWorksOpen(true)} />

        {/* Practice Configurator Section */}
        <PracticeConfigurator 
          selectedChapterIds={selectedChapterIds}
          onSelectChapters={setSelectedChapterIds}
          selectedTopicIds={selectedTopicIds}
          onSelectTopics={setSelectedTopicIds}
          selectedLevel={selectedLevel}
          onSelectLevel={setSelectedLevel}
          selectedFormat={selectedFormat}
          onSelectFormat={setSelectedFormat}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          practiceMode={practiceMode}
          onSelectPracticeMode={setPracticeMode}
        />

        {/* Tabs Bar & View Switcher */}
        <PracticeTabsBar 
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          viewMode={viewMode}
          onSelectViewMode={setViewMode}
          sortBy={sortBy}
          onSelectSortBy={setSortBy}
          setsCount={activePracticeSets.length}
          historyCount={completedSets.length}
        />

        {/* Main Content Area */}
        {activeTab === 'sets' ? (
          viewMode === 'cards' ? (
            <PracticeCardGrid 
              practiceSets={sortedSets} 
              onAction={handleAction} 
              onDelete={handleDelete}
            />
          ) : (
            <PracticeTable 
              practiceSets={sortedSets} 
              onAction={handleAction} 
            />
          )
        ) : (
          <PracticeHistoryView 
            completedSets={completedSets} 
            onViewScore={(id) => handleAction(id, 'feedback')}
          />
        )}
      </div>

      {/* Modals */}
      <HowItWorksModal 
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      <SystemCheckModal 
        isOpen={isSystemCheckOpen}
        onClose={() => {
          setIsSystemCheckOpen(false);
          setPendingStartSetId(null);
        }}
        onStart={handleConfirmStart}
      />
    </div>
  );
};

export default PracticeTab;
