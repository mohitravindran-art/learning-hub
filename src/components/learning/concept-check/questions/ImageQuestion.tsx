import React from 'react';
import type { ConceptCheckQuestion } from '../../../../data/lessons/questionUnderstanding';
import styles from './SingleSelect.module.css';

interface ImageQuestionProps {
  question: ConceptCheckQuestion;
  selectedAnswer: string;
  onSelect: (answer: string) => void;
  disabled?: boolean;
}

const ImageQuestion: React.FC<ImageQuestionProps> = ({ question, selectedAnswer, onSelect, disabled }) => {
  return (
    <div className={styles.container}>
      <div className={styles.optionsList}>
        {question.options?.map(opt => {
          const isSelected = selectedAnswer === opt.id;
          
          return (
            <div 
              key={opt.id}
              className={`${styles.optionCard} ${isSelected ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
              onClick={() => !disabled && onSelect(opt.id)}
            >
              <div className={styles.radioGroup}>
                <div className={styles.radio}>
                  {isSelected && <div className={styles.radioInner} />}
                </div>
              </div>
              <div className={styles.optionText}>{opt.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageQuestion;
