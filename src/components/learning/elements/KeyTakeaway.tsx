import React from 'react';
import styles from './KeyTakeaway.module.css';
import { Target } from 'lucide-react';

interface KeyTakeawayProps {
  children: React.ReactNode;
  title?: string;
}

const KeyTakeaway: React.FC<KeyTakeawayProps> = ({ children, title = 'KEY TAKEAWAY' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Target size={18} />
        {title}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default KeyTakeaway;
