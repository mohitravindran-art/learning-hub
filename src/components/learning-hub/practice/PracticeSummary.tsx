import React from 'react';
import { User, CheckCircle2, Trophy } from 'lucide-react';
import styles from './PracticeMissions.module.css';

interface PracticeSummaryProps {
  activeCount: number;
  completedCount: number;
  averageScore: number;
}

const PracticeSummary: React.FC<PracticeSummaryProps> = ({ activeCount, completedCount, averageScore }) => {
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryCard}>
        <div className={styles.summaryIconBox} style={{ backgroundColor: '#E0F2FE', color: '#0EA5E9' }}>
          <User size={24} strokeWidth={2.5} />
        </div>
        <div className={styles.summaryContent}>
          <div className={styles.summaryValue}>{activeCount}</div>
          <div className={styles.summaryLabel}>Active Missions</div>
        </div>
      </div>
      
      <div className={styles.summaryCard}>
        <div className={styles.summaryIconBox} style={{ backgroundColor: '#DCFCE7', color: '#22C55E' }}>
          <CheckCircle2 size={24} strokeWidth={2.5} />
        </div>
        <div className={styles.summaryContent}>
          <div className={styles.summaryValue}>{completedCount}</div>
          <div className={styles.summaryLabel}>Completed Missions</div>
        </div>
      </div>
      
      <div className={styles.summaryCard}>
        <div className={styles.summaryIconBox} style={{ backgroundColor: '#FEF3C7', color: '#F59E0B' }}>
          <Trophy size={24} strokeWidth={2.5} />
        </div>
        <div className={styles.summaryContent}>
          <div className={styles.summaryValue}>{averageScore}%</div>
          <div className={styles.summaryLabel}>Average Score</div>
        </div>
      </div>
    </div>
  );
};

export default PracticeSummary;
