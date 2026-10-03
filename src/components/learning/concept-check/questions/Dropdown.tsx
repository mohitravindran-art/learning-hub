import React, { useState } from 'react';
import type { ConceptCheckQuestion } from '../../../../data/lessons/questionUnderstanding';
import styles from './Dropdown.module.css';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  question: ConceptCheckQuestion;
  selectedAnswer: any;
  onSelect: (answer: any) => void;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ question, selectedAnswer, onSelect, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const sentenceTemplate = question.context?.includes('[DROPDOWN]') 
    ? question.context 
    : (question.prompt?.includes('[DROPDOWN]') ? question.prompt : "A question asking about hypothetical future scenarios is classified as [DROPDOWN].");

  const parts = sentenceTemplate.split('[DROPDOWN]');
  const selectedOption = question.options?.find(o => o.id === selectedAnswer);

  return (
    <div className={styles.container}>
      <div className={styles.sentenceBox}>
        {parts[0] && (
          <span className={styles.sentenceText}>{parts[0]}</span>
        )}
        
        <div className={styles.dropdownWrapper}>
          <button 
            type="button"
            className={`${styles.dropdownTrigger} ${selectedAnswer ? styles.hasSelection : ''} ${disabled ? styles.disabled : ''}`}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            <span>{selectedOption ? selectedOption.text : 'Select answer...'}</span>
            <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.open : ''}`} />
          </button>
          
          {isOpen && !disabled && (
            <div className={styles.dropdownMenu}>
              {question.options?.map(option => (
                <div 
                  key={option.id}
                  className={`${styles.dropdownItem} ${selectedAnswer === option.id ? styles.selectedItem : ''}`}
                  onClick={() => {
                    onSelect(option.id);
                    setIsOpen(false);
                  }}
                >
                  {option.text}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {parts[1] && (
          <span className={styles.sentenceText}>{parts[1]}</span>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
