import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import styles from './Elements.module.css';

interface ChoiceCardProps {
  id: string;
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
  showFeedback: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({
  text,
  isCorrect,
  isSelected,
  showFeedback,
  onClick,
  disabled
}) => {
  const isWrongSelected = showFeedback && isSelected && !isCorrect;
  const isCorrectSelected = showFeedback && isSelected && isCorrect;
  const isCorrectRevealed = showFeedback && !isSelected && isCorrect; // if they got it wrong, reveal correct

  return (
    <motion.button
      className={clsx(
        styles.choiceCard,
        isWrongSelected && styles.choiceWrong,
        (isCorrectSelected || isCorrectRevealed) && styles.choiceCorrect,
        disabled && !isSelected && !isCorrectRevealed && styles.choiceDisabled
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      animate={
        isWrongSelected ? { x: [-5, 5, -5, 5, 0] } : {}
      }
      transition={{ duration: 0.3 }}
    >
      <div className={styles.choiceContent}>
        <span className={styles.choiceText}>{text}</span>
        {isCorrectSelected && <Check className={styles.choiceIcon} size={20} />}
        {isWrongSelected && <X className={styles.choiceIcon} size={20} />}
      </div>
    </motion.button>
  );
};

export default ChoiceCard;
