import React from 'react';
import type { ConceptCheckQuestion } from '../../../../data/lessons/questionUnderstanding';
import styles from './TrueFalse.module.css';
import { Check, X } from 'lucide-react';

interface TrueFalseProps {
  question: ConceptCheckQuestion;
  selectedAnswer: any;
  onSelect: (answer: any) => void;
  disabled?: boolean;
}

const TrueFalse: React.FC<TrueFalseProps> = ({ selectedAnswer, onSelect, disabled }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardsGrid}>
        <div 
          className={`${styles.card} ${styles.trueCard} ${selectedAnswer === 'true' ? styles.selectedTrue : ''} ${disabled ? styles.disabled : ''}`}
          onClick={() => !disabled && onSelect('true')}
        >
          <div className={styles.iconCircle}>
            <Check size={36} strokeWidth={3} />
          </div>
          <div className={styles.cardTitle}>TRUE</div>
          <div className={styles.cardSubtitle}>Statement is accurate</div>
        </div>

        <div 
          className={`${styles.card} ${styles.falseCard} ${selectedAnswer === 'false' ? styles.selectedFalse : ''} ${disabled ? styles.disabled : ''}`}
          onClick={() => !disabled && onSelect('false')}
        >
          <div className={styles.iconCircle}>
            <X size={36} strokeWidth={3} />
          </div>
          <div className={styles.cardTitle}>FALSE</div>
          <div className={styles.cardSubtitle}>Statement is inaccurate</div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalse;
