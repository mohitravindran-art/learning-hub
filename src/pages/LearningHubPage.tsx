import React, { useState } from 'react';
import LearningHubHeader from '../components/layout/LearningHubHeader';
import ModuleSidebar from '../components/layout/ModuleSidebar';
import BottomLearningNav from '../components/layout/BottomLearningNav';
import MapViewport from '../components/map/MapViewport';
import LessonPlayer from '../components/learning/LessonPlayer';
import PracticeTab from '../components/learning-hub/PracticeTab';
import AssessmentsTab from '../components/learning-hub/AssessmentsTab';
import ResourcesTab from '../components/learning-hub/ResourcesTab';
import FlashcardsTab from '../components/learning-hub/FlashcardsTab';
import AnalyticsTab from '../components/learning-hub/AnalyticsTab';
import GeneratePracticeModal from '../components/learning-hub/GeneratePracticeModal';
import { SubjectProvider, useSubject } from '../context/SubjectContext';
import styles from './LearningHubPage.module.css';

const LearningHubInner: React.FC = () => {
  const { currentSubject, activeChapterId, setActiveChapterId, activeChapter } = useSubject();
  const [activeTab, setActiveTab] = useState<string>("learn");
  const [playingChapterId, setPlayingChapterId] = useState<string | null>(null);
  const [playingTopicId, setPlayingTopicId] = useState<string | undefined>(undefined);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAssessmentRunning, setIsAssessmentRunning] = useState<boolean>(false);
  const [isStudyModeActive, setIsStudyModeActive] = useState<boolean>(false);
  const [practiceTarget, setPracticeTarget] = useState<{ topicTitle: string; chapterTitle: string }>({
    topicTitle: "What is communication?",
    chapterTitle: "Chapter 01: Communication Basics",
  });

  const isFullscreenMode = isAssessmentRunning || isStudyModeActive;

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setIsSidebarOpen(true);
  };

  const handlePlayChapter = (chapterId: string, topicId?: string) => {
    setPlayingChapterId(chapterId);
    setPlayingTopicId(topicId);
  };

  const handleOpenGenerateModal = (topicTitle?: string, chapterTitle?: string) => {
    setPracticeTarget({
      topicTitle: topicTitle || activeChapter?.topics[0]?.title || "Communication Basics",
      chapterTitle: chapterTitle || `Chapter ${activeChapter?.number}: ${activeChapter?.title}`,
    });
    setIsGenerateModalOpen(true);
  };

  const handleStartPracticeFromModal = () => {
    setIsGenerateModalOpen(false);
    setActiveTab('practice');
  };

  if (playingChapterId) {
    return (
      <LessonPlayer 
        chapterId={playingChapterId} 
        initialTopicId={playingTopicId}
        onExit={() => {
          setPlayingChapterId(null);
          setPlayingTopicId(undefined);
        }} 
      />
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'learn':
        return (
          <MapViewport 
            currentChapterId={activeChapterId}
            isSidebarOpen={isSidebarOpen}
            onSelectChapter={handleSelectChapter}
            onPlayChapter={handlePlayChapter}
          />
        );
      case 'practice':
        return <PracticeTab activeTopicId={activeChapterId} />;
      case 'assessments':
        return (
          <AssessmentsTab 
            activeTopicId={activeChapterId} 
            onNavigateTab={(tab) => setActiveTab(tab)}
            onRunnerStateChange={setIsAssessmentRunning}
          />
        );
      case 'resources':
        return <ResourcesTab activeTopicId={activeChapterId} />;
      case 'flashcards':
        return (
          <FlashcardsTab 
            activeTopicId={activeChapterId} 
            onStudyModeChange={setIsStudyModeActive}
          />
        );
      case 'analytics':
        return (
          <AnalyticsTab 
            activeTopicId={activeChapterId} 
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={isFullscreenMode ? styles.fullscreenPage : styles.page}>
      {!isFullscreenMode && <LearningHubHeader />}
      
      <div className={isFullscreenMode ? styles.fullscreenMainContainer : styles.mainContainer}>
        {activeTab === 'learn' && !isFullscreenMode && (
          <ModuleSidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            activeChapterId={activeChapterId}
            onSelectChapter={handleSelectChapter}
            onPlayChapter={handlePlayChapter}
            onOpenGenerateModal={handleOpenGenerateModal}
          />
        )}
        
        <main className={`${styles.mapArea} ${activeTab !== 'learn' ? styles.solidBackground : ''} ${isFullscreenMode ? styles.fullscreenRunnerArea : ''}`}>
          {renderTabContent()}
        </main>
      </div>

      {!isFullscreenMode && (
        <BottomLearningNav 
          activeTab={activeTab} 
          onSelectTab={setActiveTab} 
          isSidebarOpen={activeTab === 'learn' && isSidebarOpen}
        />
      )}

      <GeneratePracticeModal 
        isOpen={isGenerateModalOpen} 
        onClose={() => setIsGenerateModalOpen(false)} 
        topicTitle={practiceTarget.topicTitle}
        chapterTitle={practiceTarget.chapterTitle}
        onStartPractice={handleStartPracticeFromModal}
      />
    </div>
  );
};

const LearningHubPage: React.FC = () => {
  return (
    <SubjectProvider>
      <LearningHubInner />
    </SubjectProvider>
  );
};

export default LearningHubPage;
