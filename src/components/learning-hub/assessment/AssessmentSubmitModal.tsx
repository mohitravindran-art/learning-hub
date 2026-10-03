import React from 'react';
import { HelpCircle, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import styles from './AssessmentSubmitModal.module.css';

interface AssessmentSubmitModalProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  unansweredIndices: number[];
  onReviewAnswers: () => void;
  onConfirmSubmit: () => void;
  onCancel: () => void;
}

export const AssessmentSubmitModal: React.FC<AssessmentSubmitModalProps> = ({
  isOpen,
  totalQuestions,
  answeredCount,
  unansweredIndices,
  onReviewAnswers,
  onConfirmSubmit,
  onCancel,
}) => {
  if (!isOpen) return null;

  const hasUnanswered = unansweredIndices.length > 0;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div 
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.iconCircle}>
          {hasUnanswered ? (
            <AlertTriangle size={32} className={styles.warnIcon} />
          ) : (
            <CheckCircle2 size={32} className={styles.checkIcon} />
          )}
        </div>

        <h3 className={styles.modalTitle}>Ready to submit?</h3>

        <p className={styles.modalMessage}>
          You have answered <strong>{answeredCount}</strong> of <strong>{totalQuestions}</strong> questions. 
          You can review your answers before submitting.
        </p>

        {hasUnanswered && (
          <div className={styles.unansweredNotice}>
            <AlertTriangle size={16} className={styles.noticeIcon} />
            <div className={styles.noticeContent}>
              <span className={styles.noticeBold}>You have {unansweredCount} unanswered questions:</span>
              <span className={styles.noticeNumbers}>
                {unansweredIndices.map(i => `Q${i + 1}`).join(', ')}
              </span>
            </div>
          </div>
        )}

        <div className={styles.btnStack}>
          <button 
            type="button" 
            className={styles.btnPrimarySubmit}
            onClick={onConfirmSubmit}
          >
            <span>Submit Assessment</span>
            <ArrowRight size={15} />
          </button>

          <button 
            type="button" 
            className={styles.btnReview}
            onClick={onReviewAnswers}
          >
            Review Answers
          </button>

          <button 
            type="button" 
            className={styles.btnCancel}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSubmitModal;
