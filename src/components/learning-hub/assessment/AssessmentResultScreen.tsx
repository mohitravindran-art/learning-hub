import React from 'react';
import { Award, CheckCircle2, Clock, ArrowRight, ArrowLeft, Target, HelpCircle } from 'lucide-react';
import type { AssessmentItem } from '../../../types/assessment';
import styles from './AssessmentResultScreen.module.css';

interface AssessmentResultScreenProps {
  assessment: AssessmentItem;
  score: number;
  accuracy: number;
  totalQuestions: number;
  attemptedQuestions: number;
  correctQuestions: number;
  timeTakenMinutes: number;
  onViewFeedback: () => void;
  onBackToAssessments: () => void;
}

export const AssessmentResultScreen: React.FC<AssessmentResultScreenProps> = ({
  assessment,
  score,
  accuracy,
  totalQuestions,
  attemptedQuestions,
  correctQuestions,
  timeTakenMinutes,
  onViewFeedback,
  onBackToAssessments,
}) => {
  const isPassed = score >= 75;

  return (
    <div className={styles.screenContainer}>
      <div className={styles.resultCard}>
        {/* Celebration Trophy / Icon */}
        <div className={`${styles.trophyCircle} ${isPassed ? styles.trophyGreen : styles.trophyBlue}`}>
          <Award size={48} className={styles.trophyIcon} />
        </div>

        <div className={styles.statusPill}>
          <CheckCircle2 size={13} />
          <span>{isPassed ? 'Assessment Passed' : 'Assessment Completed'}</span>
        </div>

        <h1 className={styles.resultTitle}>Assessment Complete</h1>
        <p className={styles.resultSubtitle}>
          You have successfully submitted your answers for <strong>{assessment.name}</strong>.
        </p>

        {/* Big Score Summary */}
        <div className={styles.scoreHeroBox}>
          <div className={styles.scoreMain}>
            <span className={styles.scoreNumber}>{score}%</span>
            <span className={styles.scoreLabel}>Total Score</span>
          </div>
          <div className={styles.scoreHeroDivider} />
          <div className={styles.accuracyMain}>
            <span className={styles.accuracyNumber}>{accuracy}%</span>
            <span className={styles.scoreLabel}>Overall Accuracy</span>
          </div>
        </div>

        {/* Detailed Metrics Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIconBox}>
              <Target size={18} className={styles.statIconBlue} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statVal}>{attemptedQuestions} / {totalQuestions}</span>
              <span className={styles.statLabel}>Questions Attempted</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconBox}>
              <CheckCircle2 size={18} className={styles.statIconGreen} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statVal}>{correctQuestions} Correct</span>
              <span className={styles.statLabel}>Verified Answers</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconBox}>
              <Clock size={18} className={styles.statIconOrange} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statVal}>{timeTakenMinutes} min</span>
              <span className={styles.statLabel}>Time Taken</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconBox}>
              <HelpCircle size={18} className={styles.statIconPurple} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statVal}>{totalQuestions - correctQuestions} Needs Review</span>
              <span className={styles.statLabel}>Opportunities</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actionsRow}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onBackToAssessments}
          >
            <ArrowLeft size={16} />
            <span>Back to Assessments</span>
          </button>

          <button
            type="button"
            className={styles.btnPrimary}
            onClick={onViewFeedback}
          >
            <span>View Feedback</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResultScreen;
