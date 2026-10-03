import React from 'react';
import type { ConceptCheckQuestion } from '../../../../data/lessons/questionUnderstanding';
import styles from './MultiSelect.module.css';
import { Check } from 'lucide-react';

interface MultiSelectProps {
  question: ConceptCheckQuestion;
  selectedAnswer: string[];
  onSelect: (answer: string[]) => void;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ question, selectedAnswer, onSelect, disabled }) => {
  const currentSelection = selectedAnswer || [];

  const handleToggle = (id: string) => {
    if (disabled) return;
    if (currentSelection.includes(id)) {
      onSelect(currentSelection.filter(item => item !== id));
    } else {
      onSelect([...currentSelection, id]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.optionsList}>
        {question.options?.map((option) => {
          const isSelected = currentSelection.includes(option.id);
          
          return (
            <div 
              key={option.id}
              className={`${styles.optionCard} ${isSelected ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
              onClick={() => handleToggle(option.id)}
            >
              <div className={styles.checkbox}>
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
              <div className={styles.optionText}>{option.text}</div>
            </div>
          );
        })}
      </div>
      
      <div className={styles.helperArea}>
        <span>💡 Select all options that apply (multiple answers allowed)</span>
      </div>
    </div>
  );
};

export default MultiSelect;
