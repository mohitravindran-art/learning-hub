import React from 'react';
import { X, Trophy, CheckCircle2, RotateCcw } from 'lucide-react';
import type { PracticeSetItem } from '../../../data/practicePageData';
import styles from './PracticeScoreModal.module.css';

interface PracticeScoreModalProps {
  practiceSet: PracticeSetItem | null;
  onClose: () => void;
  onRetake: (id: string) => void;
}

const PracticeScoreModal: React.FC<PracticeScoreModalProps> = ({
  practiceSet,
  onClose,
  onRetake,
}) => {
  if (!practiceSet) return null;

  const score = practiceSet.score || 90;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} type="button">
          <X size={20} />
        </button>

        <div className={styles.header}>
          <div className={styles.trophyWrapper}>
            <Trophy size={36} className={styles.trophyIcon} />
          </div>
          <h2 className={styles.title}>Practice Set Completed!</h2>
          <p className={styles.subtitle}>{practiceSet.name}</p>
          <div className={styles.metaBadge}>
            {practiceSet.chapter} • {practiceSet.topic}
          </div>
        </div>

        <div className={styles.scoreBox}>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreNumber}>{score}%</span>
            <span className={styles.scoreLabel}>Score</span>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{practiceSet.totalQuestions}</span>
              <span className={styles.statKey}>Total Questions</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{practiceSet.completedQuestions}</span>
              <span className={styles.statKey}>Answered Correctly</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{practiceSet.timeSpentMinutes || 15}m</span>
              <span className={styles.statKey}>Time Spent</span>
            </div>
          </div>
        </div>

        <div className={styles.feedbackBox}>
          <CheckCircle2 size={16} className={styles.greenCheck} />
          <span>Great performance! You demonstrated strong mastery of this communication concept.</span>
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.retakeBtn} 
            onClick={() => onRetake(practiceSet.id)}
            type="button"
          >
            <RotateCcw size={15} />
            <span>Practise Again</span>
          </button>
          <button className={styles.doneBtn} onClick={onClose} type="button">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeScoreModal;
