import React from 'react';
import type { ConceptCheckQuestion } from '../../../../data/lessons/questionUnderstanding';
import styles from './SingleSelect.module.css';

interface ScenarioProps {
  question: ConceptCheckQuestion;
  selectedAnswer: any;
  onSelect: (answer: any) => void;
  disabled?: boolean;
}

const Scenario: React.FC<ScenarioProps> = ({ question, selectedAnswer, onSelect, disabled }) => {
  return (
    <div className={styles.container}>
      <div className={styles.optionsList}>
        {question.options?.map((option) => {
          const isSelected = selectedAnswer === option.id;
          
          return (
            <div 
              key={option.id}
              className={`${styles.optionCard} ${isSelected ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
              onClick={() => !disabled && onSelect(option.id)}
            >
              <div className={styles.radioGroup}>
                <div className={styles.radio}>
                  {isSelected && <div className={styles.radioInner} />}
                </div>
              </div>
              <div className={styles.optionText}>{option.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scenario;
