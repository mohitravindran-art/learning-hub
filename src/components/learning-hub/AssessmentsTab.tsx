import React, { useState } from 'react';
import { 
  Plus, 
  Hand, 
  TrendingUp, 
  Trophy, 
  PlayCircle, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import type { AssessmentItem } from '../../types/assessment';
import type { PracticeQuestionFeedbackItem } from '../../types/practice';
import { 
  INITIAL_CURRENT_ASSESSMENTS, 
  INITIAL_ASSESSMENT_HISTORY 
} from '../../data/assessmentData';
import AssessmentTable from './assessment/AssessmentTable';
import AssessmentAccessModal from './assessment/AssessmentAccessModal';
import AssessmentFeedbackPage from './assessment/AssessmentFeedbackPage';
import AssessmentRunner from './assessment/AssessmentRunner';
import AssessmentSubmitModal from './assessment/AssessmentSubmitModal';
import CreateInterviewModal from './assessment/CreateInterviewModal';
import styles from './AssessmentsTab.module.css';

interface TabProps {
  activeTopicId?: string;
  onNavigateTab?: (tabName: string) => void;
}

export const AssessmentsTab: React.FC<TabProps> = ({ onNavigateTab }) => {
  // Datasets matching Screenshots 1 & 2
  const [currentAssessments, setCurrentAssessments] = useState<AssessmentItem[]>(INITIAL_CURRENT_ASSESSMENTS);
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentItem[]>(INITIAL_ASSESSMENT_HISTORY);

  // Tab Selection: 'current' vs 'history' matching Screenshots 1 & 2
  const [activeSubTab, setActiveSubTab] = useState<'current' | 'history'>('current');

  // Modal & Screen states
  const [accessModalAssessment, setAccessModalAssessment] = useState<AssessmentItem | null>(null);
  const [activeFeedbackAssessment, setActiveFeedbackAssessment] = useState<AssessmentItem | null>(null);
  const [activeRunnerAssessment, setActiveRunnerAssessment] = useState<AssessmentItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // Handle action click from Table
  const handleAction = (id: string, action: 'start' | 'continue' | 'feedback' | 'details') => {
    if (action === 'feedback') {
      const target = assessmentHistory.find(a => a.id === id) || currentAssessments.find(a => a.id === id);
      if (target) {
        setActiveFeedbackAssessment(target);
      }
      return;
    }

    if (action === 'start' || action === 'continue') {
      const target = currentAssessments.find(a => a.id === id) || assessmentHistory.find(a => a.id === id);
      if (target) {
        // Open the Practice-styled System Check / Media Permission popup first
        setAccessModalAssessment(target);
      }
    }
  };

  // Launch runner once permissions / system check are confirmed
  const handleStartRunnerFromAccessModal = () => {
    if (!accessModalAssessment) return;
    const target = accessModalAssessment;
    setAccessModalAssessment(null);
    setActiveRunnerAssessment(target);
  };

  // Confirm submit from runner
  const handleConfirmSubmit = () => {
    if (!activeRunnerAssessment) return;

    const completedItem: AssessmentItem = {
      ...activeRunnerAssessment,
      status: 'completed',
      completedQuestions: activeRunnerAssessment.totalQuestions,
      score: 92,
      accuracy: 92,
      completedDate: 'Today, Just now',
    };

    // Move to history
    setCurrentAssessments(prev => prev.filter(i => i.id !== activeRunnerAssessment.id));
    setAssessmentHistory(prev => [completedItem, ...prev]);
    setIsSubmitModalOpen(false);
    setActiveRunnerAssessment(null);
    setActiveFeedbackAssessment(completedItem);
  };

  // Create new assessment
  const handleCreateAssessment = (newItem: AssessmentItem) => {
    setCurrentAssessments(prev => [newItem, ...prev]);
    setIsCreateModalOpen(false);
    setActiveSubTab('current');
  };

  // 1. RENDER FEEDBACK PAGE (Matches Screenshot 3)
  if (activeFeedbackAssessment) {
    return (
      <div className={styles.fullPageContainer}>
        <div className={styles.tabContainer}>
          <AssessmentFeedbackPage 
            assessment={activeFeedbackAssessment}
            score={activeFeedbackAssessment.score || 90}
            accuracy={activeFeedbackAssessment.accuracy || 90}
            timeTakenMinutes={activeFeedbackAssessment.timeSpentMinutes || 27}
            onBack={() => setActiveFeedbackAssessment(null)}
            onRetake={() => {
              setActiveFeedbackAssessment(null);
              setAccessModalAssessment(activeFeedbackAssessment);
            }}
          />
        </div>
      </div>
    );
  }

  // 2. RENDER LIVE RUNNER FLOW
  if (activeRunnerAssessment) {
    return (
      <div className={styles.fullPageContainer}>
        <AssessmentRunner 
          assessment={activeRunnerAssessment}
          onExit={() => setActiveRunnerAssessment(null)}
          onSubmit={() => setIsSubmitModalOpen(true)}
          onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        />
        <AssessmentSubmitModal 
          isOpen={isSubmitModalOpen}
          totalQuestions={activeRunnerAssessment.totalQuestions}
          answeredCount={activeRunnerAssessment.totalQuestions}
          unansweredIndices={[]}
          onReviewAnswers={() => setIsSubmitModalOpen(false)}
          onConfirmSubmit={handleConfirmSubmit}
          onCancel={() => setIsSubmitModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className={styles.tabContainer}>
      {/* 1. VIBRANT BLUE HERO CARD (Matches Screenshot 1 & 2) */}
      <section className={styles.heroCard}>
        {/* Left Assessment 3D Graphic Badge (Guaranteed sharp render, no broken image) */}
        <div className={styles.heroGraphicBox}>
          <div className={styles.heroSvgBadge}>
            <svg 
              viewBox="0 0 160 100" 
              className={styles.heroSvg} 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Assessments Illustration"
            >
              <defs>
                <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient id="sheetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F1F5F9" />
                </linearGradient>
                <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" floodColor="#0F172A" />
                </filter>
              </defs>
              {/* Back card */}
              <rect x="25" y="16" width="110" height="74" rx="10" fill="#3B82F6" opacity="0.4" transform="rotate(-4 80 50)" />
              {/* Main Sheet */}
              <rect x="34" y="12" width="92" height="76" rx="8" fill="url(#sheetGrad)" filter="url(#shadow3d)" />
              {/* Header Clip */}
              <rect x="65" y="8" width="30" height="9" rx="4.5" fill="#0F172A" />
              {/* Sheet lines */}
              <rect x="46" y="28" width="45" height="5" rx="2.5" fill="#0052FF" />
              <rect x="46" y="38" width="68" height="4" rx="2" fill="#CBD5E1" />
              <rect x="46" y="47" width="56" height="4" rx="2" fill="#CBD5E1" />
              <rect x="46" y="56" width="62" height="4" rx="2" fill="#CBD5E1" />
              {/* Checkmark circle badge */}
              <circle cx="106" cy="68" r="14" fill="#10B981" filter="url(#shadow3d)" />
              <path d="M100 68 L104 72 L113 63" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Middle Title & Description */}
        <div className={styles.heroTextContent}>
          <h1 className={styles.heroTitle}>Assessments</h1>
          <p className={styles.heroSubtitle}>
            Assessments help students evaluate their understanding, demonstrate mastery, and track progress over time.
          </p>
        </div>

        {/* Right Single Orange Action Button: CREATE ASSESSMENT + */}
        <div className={styles.heroActions}>
          <button 
            type="button"
            className={styles.createBtn}
            onClick={() => setIsCreateModalOpen(true)}
          >
            <span>CREATE ASSESSMENT</span>
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>
      </section>

      {/* 2. STAT METRICS CARDS ROW (Matches Screenshot 1 & 2) */}
      <section className={styles.statsCardRow}>
        {/* Stat 1: Completed Assessments */}
        <div className={styles.statCard}>
          <div className={styles.statLeft}>
            <span className={styles.statLabel}>Completed Assessments</span>
            <span className={styles.statValue}>3</span>
          </div>
          <div className={`${styles.statIconBadge} ${styles.badgeBlue}`}>
            <Hand size={22} className={styles.iconInside} />
          </div>
        </div>

        {/* Stat 2: Avg Score */}
        <div className={styles.statCard}>
          <div className={styles.statLeft}>
            <span className={styles.statLabel}>Avg Score</span>
            <span className={styles.statValue}>90%</span>
          </div>
          <div className={`${styles.statIconBadge} ${styles.badgeAmber}`}>
            <TrendingUp size={22} className={styles.iconInside} />
          </div>
        </div>

        {/* Stat 3: Current Assessments */}
        <div className={styles.statCard}>
          <div className={styles.statLeft}>
            <span className={styles.statLabel}>Current Assessments</span>
            <span className={styles.statValue}>3</span>
          </div>
          <div className={`${styles.statIconBadge} ${styles.badgePurple}`}>
            <Trophy size={22} className={styles.iconInside} />
          </div>
        </div>
      </section>

      {/* 3. CENTERED TOGGLE PILLS: CURRENT ASSESSMENTS VS ASSESSMENT HISTORY */}
      <div className={styles.toggleRow}>
        <div className={styles.toggleContainer}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${activeSubTab === 'current' ? styles.toggleBtnActive : ''}`}
            onClick={() => setActiveSubTab('current')}
          >
            <PlayCircle size={15} />
            <span>CURRENT ASSESSMENTS</span>
          </button>

          <button
            type="button"
            className={`${styles.toggleBtn} ${activeSubTab === 'history' ? styles.toggleBtnActive : ''}`}
            onClick={() => setActiveSubTab('history')}
          >
            <CheckCircle2 size={15} />
            <span>ASSESSMENT HISTORY</span>
          </button>
        </div>
      </div>

      {/* 4. THE 9-COLUMN ASSESSMENTS TABLE (Matches Screenshot 1 & 2) */}
      <AssessmentTable 
        assessments={activeSubTab === 'current' ? currentAssessments : assessmentHistory}
        onAction={handleAction}
        isHistory={activeSubTab === 'history'}
      />

      {/* 5. MEDIA PERMISSIONS / SYSTEM CHECK POPUP (Taken from Practice) */}
      <AssessmentAccessModal 
        isOpen={Boolean(accessModalAssessment)}
        assessment={accessModalAssessment}
        onClose={() => setAccessModalAssessment(null)}
        onAllowAndContinue={handleStartRunnerFromAccessModal}
      />

      {/* 6. CREATE ASSESSMENT MODAL */}
      <CreateInterviewModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateAssessment}
      />
    </div>
  );
};

export default AssessmentsTab;

