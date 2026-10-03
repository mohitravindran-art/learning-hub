import React from 'react';
import styles from './FeedbackPanel.module.css';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface FeedbackPanelProps {
  isCorrect: boolean;
  explanation?: string;
  onNext: () => void;
  onRetry: () => void;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ isCorrect, explanation, onNext, onRetry }) => {
  if (isCorrect) {
    return (
      <div className={`${styles.container} ${styles.correct}`}>
        <div className={styles.header}>
          <CheckCircle2 size={32} className={styles.iconCorrect} />
          <div className={styles.title}>Correct!</div>
        </div>
        <div className={styles.explanation}>
          {explanation || "Great job, you understood the concept perfectly."}
        </div>
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={onNext}>
            Next Question <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles.incorrect}`}>
      <div className={styles.header}>
        <XCircle size={32} className={styles.iconIncorrect} />
        <div className={styles.title}>Not Quite</div>
      </div>
      <div className={styles.explanation}>
        {explanation || "That wasn't quite right. Review the question and try a different approach."}
      </div>
      
      <div className={styles.actions}>
        <button className={styles.secondaryBtn} onClick={onRetry}>Try Again</button>
      </div>
    </div>
  );
};

export default FeedbackPanel;
