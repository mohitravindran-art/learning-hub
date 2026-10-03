import React, { useState } from 'react';
import styles from './QuestionHint.module.css';

interface QuestionHintProps {
  hint: string;
}

const QuestionHint: React.FC<QuestionHintProps> = ({ hint }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!hint) return null;

  return (
    <div className={styles.hintContainer}>
      <button 
        className={styles.hintToggle} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.icon}>💡</span>
        <span className={styles.text}>{isOpen ? 'Hide hint' : 'Need a hint?'}</span>
      </button>
      
      {isOpen && (
        <div className={styles.hintContent}>
          {hint}
        </div>
      )}
    </div>
  );
};

export default QuestionHint;
