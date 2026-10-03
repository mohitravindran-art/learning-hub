import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Headphones } from 'lucide-react';
import LessonHeader, { type HeaderTab } from './LessonHeader';
import SceneRenderer from './SceneRenderer';
import ConceptCheckEngine from './concept-check/ConceptCheckEngine';
import TopicFlashcardsView from './flashcards/TopicFlashcardsView';
import TopicResourcesView from './resources/TopicResourcesView';
import { ListenProvider, useListen } from './audio/ListenContext';
import ListenPlayerBar from './audio/ListenPlayerBar';
import { questionUnderstandingLesson } from '../../data/lessons/questionUnderstanding';
import { useSubject } from '../../context/SubjectContext';
import styles from './LessonPlayer.module.css';

interface LessonPlayerProps {
  chapterId: string;
  initialTopicId?: string;
  isReview?: boolean;
  onExit: () => void;
}

type PlayerPhase = 'intro' | 'learning' | 'study-complete' | 'concept-check';

const LessonPlayerInner: React.FC<LessonPlayerProps> = ({ chapterId, initialTopicId, isReview = false, onExit }) => {
  const { currentSubject, completeTopic } = useSubject();
  const chapter = currentSubject.chapters.find(c => c.id === chapterId) || currentSubject.chapters[0];
  
  // Find initial topic index: match initialTopicId if supplied, else first current or unlocked topic
  const computedInitialIndex = useMemo(() => {
    if (initialTopicId) {
      const idx = chapter.topics.findIndex(t => t.id === initialTopicId);
      if (idx !== -1) return idx;
    }
    const curIdx = chapter.topics.findIndex(t => t.status === 'current' || t.status === 'unlocked');
    return Math.max(0, curIdx);
  }, [chapter.topics, initialTopicId]);
  
  const [currentTopicIndex, setCurrentTopicIndex] = useState(computedInitialIndex);
  
  // The actual lesson data is mocked to questionUnderstandingLesson for now
  const lesson = questionUnderstandingLesson; 
  
  const currentTopic = chapter.topics[currentTopicIndex] || chapter.topics[0];
  
  const { isListening, startListening, stopListening, pauseListening, togglePlayPause } = useListen();
  
  const [phase, setPhase] = useState<PlayerPhase>('intro');
  const [headerTab, setHeaderTab] = useState<HeaderTab>('learn');
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [completedScenes, setCompletedScenes] = useState<Set<number>>(new Set());

  // Handle tab change between LEARN, FLASHCARDS, RESOURCES
  const handleTabChange = useCallback((tab: HeaderTab) => {
    if (tab !== 'learn' && isListening) {
      pauseListening();
    }
    setHeaderTab(tab);
  }, [isListening, pauseListening]);

  // Clean up audio on exit
  const handleExit = useCallback(() => {
    stopListening();
    onExit();
  }, [stopListening, onExit]);

  const handleNextTopic = useCallback(() => {
    if (currentTopic) {
      completeTopic(currentSubject.id, chapter.id, currentTopic.id);
    }

    if (currentTopicIndex < chapter.topics.length - 1) {
      setCurrentTopicIndex(prev => prev + 1);
      setPhase('intro');
      setCurrentSceneIndex(0);
      setCompletedScenes(new Set());
    } else {
      handleExit();
    }
  }, [currentTopicIndex, chapter.topics.length, currentTopic, currentSubject.id, chapter.id, completeTopic, handleExit]);

  const handleSceneComplete = useCallback(() => {
    setCompletedScenes(prev => {
      const next = new Set(prev);
      next.add(currentSceneIndex);
      return next;
    });
  }, [currentSceneIndex]);

  const handleNext = useCallback(() => {
    if (currentSceneIndex < lesson.scenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      // Transition to dedicated study-complete screen before concept check
      setPhase('study-complete');
    }
  }, [currentSceneIndex, lesson.scenes.length]);

  const handlePrev = useCallback(() => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
    }
  }, [currentSceneIndex]);

  const currentScene = lesson.scenes[currentSceneIndex];
  
  // Interaction check for advancing
  const canAdvance = isReview || completedScenes.has(currentSceneIndex) || 
    ['explanation', 'content', 'comparison', 'scenario', 'summary', 'audio', 'topic-complete', 'key-takeaways'].includes(currentScene.type);

  // Keyboard navigation & Listen mode shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (phase === 'intro') {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          setPhase('learning');
        } else if (e.key === 'Escape') {
          handleExit();
        }
        return;
      }

      if (phase === 'study-complete') {
        if (e.key === 'Enter' || e.key === 'ArrowRight') {
          e.preventDefault();
          setPhase('concept-check');
        } else if (e.key === 'Escape') {
          handleExit();
        }
        return;
      }

      if (phase === 'learning') {
        if (e.key === ' ' && isListening) {
          e.preventDefault();
          togglePlayPause();
        } else if (e.key === 'Escape') {
          if (isListening) {
            stopListening();
          } else {
            handleExit();
          }
        } else if (e.key === 'ArrowRight' && !isListening) {
          if (canAdvance) {
            handleNext();
          }
        } else if (e.key === 'ArrowLeft' && !isListening) {
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, canAdvance, isListening, togglePlayPause, stopListening, handleNext, handlePrev, handleExit]);

  // Contextual Topic Navigation: Flashcards & Resources
  if (headerTab === 'flashcards') {
    return (
      <div className={styles.playerContainer}>
        <LessonHeader 
          topicTitle={chapter.title}
          lessonTitle={currentTopic.title}
          activeTab="flashcards"
          onTabChange={handleTabChange}
          onExit={handleExit}
        />
        <TopicFlashcardsView topicId={lesson.topicId} />
      </div>
    );
  }

  if (headerTab === 'resources') {
    return (
      <div className={styles.playerContainer}>
        <LessonHeader 
          topicTitle={chapter.title}
          lessonTitle={currentTopic.title}
          activeTab="resources"
          onTabChange={handleTabChange}
          onExit={handleExit}
        />
        <TopicResourcesView topicId={lesson.topicId} />
      </div>
    );
  }

  // 1. Rich Topic Intro Screen: Executive Briefing
  if (phase === 'intro') {
    return (
      <div 
        className={styles.introContainer}
        style={{ backgroundImage: `url("${currentSubject.backgroundImage}")` }}
      >
        <div className={styles.introBackdrop} />

        {/* Pinned Top Header */}
        <div className={styles.introHeaderWrapper}>
          <LessonHeader 
            topicTitle={chapter.title}
            lessonTitle={currentTopic.title}
            activeTab={headerTab}
            onTabChange={handleTabChange}
            onExit={handleExit}
          />
        </div>

        {/* Scrollable Briefing Content */}
        <main className={styles.introScrollArea}>
          <div className={styles.introBriefingContainer}>
            
            {/* Top Meta Bar */}
            <div className={styles.briefingTopBar}>
              <div className={styles.briefingPill}>
                <span className={styles.pulsingDot} />
                <span>TOPIC {currentTopic.number || '02'} · EXECUTIVE BRIEFING</span>
              </div>
            </div>

            {/* Split 2-Column Grid */}
            <div className={styles.briefingGrid}>
              
              {/* LEFT COLUMN: Overview & Objectives */}
              <div className={styles.briefingColLeft}>
                <div className={styles.heroSection}>
                  <h1 className={styles.briefingTitle}>{currentTopic.title}</h1>
                  <p className={styles.briefingTopicDesc}>
                    {currentTopic.description || "Master core categorization techniques to recognize questions in real-time and deliver structured responses."}
                  </p>
                </div>

                {/* Why It Matters Callout */}
                <div className={styles.whyItMattersBox}>
                  <div className={styles.whyHeader}>
                    <span>KEY PREMISE & VALUE</span>
                  </div>
                  <p className={styles.whyText}>{lesson.whyItMatters}</p>
                </div>

                {/* Key Learning Objectives */}
                <div className={styles.objectivesSection}>
                  <div className={styles.sectionHeaderLine}>
                    <span className={styles.sectionHeaderLabel}>Key Learning Objectives</span>
                    <span className={styles.objectiveCountBadge}>{lesson.whatYouWillLearn.length} Core Skills</span>
                  </div>
                  <div className={styles.objectivesGrid}>
                    {lesson.whatYouWillLearn.map((item, idx) => (
                      <div key={idx} className={styles.objectiveCard}>
                        <span className={styles.objectiveNumber}>{String(idx + 1).padStart(2, '0')}</span>
                        <span className={styles.objectiveText}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Framework Preview & Quick Launch */}
              <div className={styles.briefingColRight}>
                
                {/* Core Framework Preview */}
                <div className={styles.frameworkCard}>
                  <div className={styles.frameworkHeader}>
                    <div className={styles.frameworkBadge}>
                      <span>CORE FRAMEWORK PREVIEW</span>
                    </div>
                    <span className={styles.frameworkTag}>Real-World Case</span>
                  </div>

                  <div className={styles.frameworkPrompt}>
                    <p className={styles.frameworkQuestionText}>
                      {lesson.introExample.question}
                    </p>
                  </div>

                  <div className={styles.comparisonBox}>
                    <div className={styles.comparisonRowSurface}>
                      <div className={styles.comparisonBadgeSurface}>
                        <span>SURFACE TRAP</span>
                      </div>
                      <p className={styles.comparisonBodyText}>{lesson.introExample.surfaceMeaning}</p>
                    </div>

                    <div className={styles.comparisonRowIntent}>
                      <div className={styles.comparisonBadgeIntent}>
                        <span>INTERVIEWER'S REAL INTENT</span>
                      </div>
                      <p className={styles.comparisonBodyText}>{lesson.introExample.realIntent}</p>
                    </div>
                  </div>
                </div>

                {/* Ready to Begin Card */}
                <div className={styles.launchCard}>
                  <div className={styles.launchTextGroup}>
                    <h3 className={styles.launchTitle}>Ready to begin your study?</h3>
                    <p className={styles.launchDesc}>
                      Step through the lesson with audio narration, interactive scenarios, and instant practice.
                    </p>
                  </div>
                  <button 
                    className={styles.primaryLaunchBtn}
                    onClick={() => setPhase('learning')}
                    type="button"
                  >
                    <span>Begin Topic Study</span>
                    <ArrowRight size={18} />
                  </button>
                  <div className={styles.launchFootnote}>
                    <span>Shortcut: Press <kbd className={styles.kbd}>Enter</kbd> or <kbd className={styles.kbd}>Space</kbd></span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </main>

        {/* Pinned Persistent Bottom Navigation Bar */}
        <footer className={styles.introBottomNav}>
          <div className={styles.introBottomLeft}>
            <span className={styles.topicBreadcrumbBadge}>
              Topic {currentTopic.number || 2}: {currentTopic.title}
            </span>
            <span className={styles.moduleOverviewText}>
              Step 1 of 3: Topic Briefing · Next: Interactive Study
            </span>
          </div>
          <div className={styles.introBottomRight}>
            <button 
              className={styles.introGoForwardBtn}
              onClick={() => setPhase('learning')}
              type="button"
            >
              <span>Begin Topic Study</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </footer>

      </div>
    );
  }

  // 2. Milestone Transition Screen before Concept Check
  if (phase === 'study-complete') {
    return (
      <div 
        className={styles.introContainer}
        style={{ backgroundImage: `url("${currentSubject.backgroundImage}")` }}
      >
        <div className={styles.introBackdrop} />

        <div className={styles.introHeaderWrapper}>
          <LessonHeader 
            topicTitle={chapter.title}
            lessonTitle={currentTopic.title}
            activeTab={headerTab}
            onTabChange={handleTabChange}
            onExit={handleExit}
          />
        </div>

        <main className={styles.introScrollArea}>
          <div className={styles.milestoneContainer}>
            <div className={styles.celebrateCard}>
              <div className={styles.celebrateBadge}>MILESTONE · STUDY COMPLETED</div>
              
              <h1 className={styles.celebrateTitle}>Ready for the Concept Check?</h1>
              
              <p className={styles.celebrateSubtitle}>
                You've completed the core study material and conversational practice. Now verify what you've learned through 10 scenario-based challenge questions.
              </p>

              <div className={styles.topicsCoveredSection}>
                <span className={styles.sectionHeaderLabel}>Key Concepts Covered</span>
                <div className={styles.conceptList}>
                  {lesson.accomplishments?.map((pt: string, idx: number) => (
                    <div key={idx} className={styles.conceptRow}>
                      <span className={styles.conceptIndex}>{String(idx + 1).padStart(2, '0')}</span>
                      <span className={styles.conceptText}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.briefingBar}>
                <div className={styles.briefingItem}>
                  <span className={styles.briefingNumber}>10</span>
                  <span className={styles.briefingLabel}>Questions</span>
                </div>
                <div className={styles.briefingDivider} />
                <div className={styles.briefingItem}>
                  <span className={styles.briefingNumber}>Self-paced</span>
                  <span className={styles.briefingLabel}>Untimed Check</span>
                </div>
                <div className={styles.briefingDivider} />
                <div className={styles.briefingItem}>
                  <span className={styles.briefingNumber}>Instant</span>
                  <span className={styles.briefingLabel}>Detailed Feedback</span>
                </div>
              </div>

              <div className={styles.celebrateActions}>
                <button 
                  className={styles.reviewScenesBtn}
                  onClick={() => {
                    setCurrentSceneIndex(0);
                    setPhase('learning');
                  }}
                  type="button"
                >
                  Review Study Material
                </button>

                <button 
                  className={styles.startConceptCheckBtn} 
                  onClick={() => setPhase('concept-check')}
                  type="button"
                >
                  Start Concept Check →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 3. Concept Check Assessment Phase
  if (phase === 'concept-check') {
    return (
      <ConceptCheckEngine 
        topicTitle={currentTopic.title}
        questions={lesson.conceptCheck}
        onComplete={handleNextTopic} 
        onExit={handleExit}
      />
    );
  }

  // 4. Learning Phase (Textbook & Interactive Scenes)
  return (
    <div className={styles.playerContainer}>
      <LessonHeader 
        topicTitle={chapter.title}
        lessonTitle={currentTopic.title}
        activeTab={headerTab}
        onTabChange={handleTabChange}
        onExit={handleExit}
      />
      
      <div className={styles.mainLayout}>
        <main className={styles.sceneArea}>
          <SceneRenderer 
            scene={currentScene} 
            onComplete={handleSceneComplete}
            onNext={handleNext}
          />
        </main>
      </div>

      {/* Bottom Nav Bar with Listen Mode Audio Player */}
      <div className={styles.bottomNav}>
        {isListening ? (
          <ListenPlayerBar />
        ) : (
          <button 
            className={styles.listenBtn} 
            onClick={startListening}
            type="button"
            aria-label="Listen to current study material"
          >
            <Headphones size={18} />
            <span>LISTEN</span>
          </button>
        )}
        
        <div className={styles.navControls}>
          <button 
            className={styles.prevBtn} 
            onClick={handlePrev}
            disabled={currentSceneIndex === 0}
            type="button"
          >
            <ArrowLeft size={16} /> PREVIOUS SCENE
          </button>
          
          <div className={styles.progressDots}>
             {lesson.scenes.map((_, i) => (
                <div key={i} className={`${styles.dot} ${i === currentSceneIndex ? styles.activeDot : ''} ${i < currentSceneIndex ? styles.completedDot : ''}`} />
             ))}
          </div>

          <button 
            className={styles.nextBtn} 
            onClick={handleNext}
            disabled={!canAdvance && currentSceneIndex < lesson.scenes.length - 1}
            type="button"
          >
            {currentSceneIndex === lesson.scenes.length - 1 ? 'COMPLETE STUDY' : 'NEXT SCENE'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const LessonPlayer: React.FC<LessonPlayerProps> = (props) => {
  return (
    <ListenProvider>
      <LessonPlayerInner {...props} />
    </ListenProvider>
  );
};

export default LessonPlayer;
