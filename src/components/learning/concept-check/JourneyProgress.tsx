import React from 'react';
import styles from './JourneyProgress.module.css';

interface JourneyProgressProps {
  total: number;
  current: number;
}

const JourneyProgress: React.FC<JourneyProgressProps> = ({ total, current }) => {
  const nodes = Array.from({ length: total }, (_, i) => i);
  const progressPercent = total > 1 ? (current / (total - 1)) * 100 : 0;

  return (
    <div className={styles.container}>
      <div className={styles.title}>YOUR JOURNEY</div>
      <div className={styles.timeline}>
        <div className={styles.line}></div>
        <div className={styles.progressLine} style={{ width: `${progressPercent}%` }}></div>
        <div className={styles.nodes}>
          {nodes.map((nodeIndex) => {
            const isCompleted = nodeIndex < current;
            const isCurrent = nodeIndex === current;
            
            return (
              <div 
                key={nodeIndex}
                className={`${styles.node} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''}`}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.status}>
        {current + 1} / {total}
      </div>
    </div>
  );
};

export default JourneyProgress;
