import React from 'react';
import type { ConceptCheckQuestion } from '../../../../data/lessons/questionUnderstanding';
import styles from './QuestionStyles.module.css';

interface LikertProps {
  question: ConceptCheckQuestion;
  selectedAnswer: string;
  onSelect: (answer: string) => void;
  disabled?: boolean;
}

const Likert: React.FC<LikertProps> = ({ selectedAnswer, onSelect, disabled }) => {
  const likertOptions = [
    { id: '1', label: 'Strongly Disagree' },
    { id: '2', label: 'Disagree' },
    { id: '3', label: 'Neutral' },
    { id: '4', label: 'Agree' },
    { id: '5', label: 'Strongly Agree' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.likertScale}>
        {likertOptions.map(opt => (
          <div 
            key={opt.id}
            className={`${styles.likertItem} ${selectedAnswer === opt.id ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
            onClick={() => !disabled && onSelect(opt.id)}
          >
            <div className={styles.likertBox}>{opt.id}</div>
            <div className={styles.likertLabel}>{opt.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Likert;
