import React from 'react';
import avatarImg from '../../../assets/learning-hub/avatar.png';
import styles from './ConceptCheckCoach.module.css';

interface ConceptCheckCoachProps {
  title?: string;
  message: string;
}

const ConceptCheckCoach: React.FC<ConceptCheckCoachProps> = ({ title, message }) => {
  if (!message) return null;

  return (
    <div className={styles.coachContainer}>
      <div className={styles.speechBubble}>
        {title && (
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
            {title}
          </div>
        )}
        <div className={styles.messageContent}>
          {message}
        </div>
        <div className={styles.bubbleTail}></div>
      </div>
      <img 
        src={avatarImg} 
        alt="Coach Avatar" 
        className={styles.avatarImage} 
      />
    </div>
  );
};

export default ConceptCheckCoach;
