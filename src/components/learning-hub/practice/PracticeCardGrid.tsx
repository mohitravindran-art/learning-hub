import React from 'react';
import PracticeCard from './PracticeCard';
import type { PracticeSetItem } from '../../../data/practicePageData';
import styles from './PracticeCardGrid.module.css';

interface PracticeCardGridProps {
  practiceSets: PracticeSetItem[];
  onAction: (id: string, actionType: 'start' | 'continue' | 'feedback' | 'score') => void;
  onDelete?: (id: string) => void;
}

const PracticeCardGrid: React.FC<PracticeCardGridProps> = ({
  practiceSets,
  onAction,
  onDelete,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.title}>Your Practice Sets</h3>
        <p className={styles.subtitle}>Active and in-progress practice sets. Finished practices are stored in Practice History.</p>
      </div>

      {practiceSets.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No active practice sets. Generate a new set above or view your completed sets in Practice History!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {practiceSets.map((set) => (
            <PracticeCard 
              key={set.id}
              practiceSet={set}
              onAction={onAction}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PracticeCardGrid;
