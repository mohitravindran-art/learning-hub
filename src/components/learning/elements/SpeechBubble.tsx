import React from 'react';
import { motion } from 'framer-motion';
import styles from './Elements.module.css';

interface SpeechBubbleProps {
  text: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ 
  text, 
  position = 'top-right',
  delay = 0 
}) => {
  return (
    <motion.div 
      className={`${styles.speechBubble} ${styles[position]}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay, type: "spring", bounce: 0.4 }}
    >
      <p>{text}</p>
    </motion.div>
  );
};

export default SpeechBubble;
