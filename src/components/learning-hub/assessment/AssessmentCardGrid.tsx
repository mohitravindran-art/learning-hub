import React from 'react';
import { ClipboardList, Award } from 'lucide-react';
import AssessmentCard from './AssessmentCard';
import type { AssessmentItem } from '../../../types/assessment';
import styles from './AssessmentCardGrid.module.css';

interface AssessmentCardGridProps {
  assessments: AssessmentItem[];
  onAction: (id: string, action: 'start' | 'continue' | 'feedback') => void;
  isHistory?: boolean;
}

export const AssessmentCardGrid: React.FC<AssessmentCardGridProps> = ({
  assessments,
  onAction,
  isHistory = false,
}) => {
  if (assessments.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        {isHistory ? (
          <>
            <div className={styles.emptyIconCircle}>
              <Award size={36} className={styles.emptyIcon} />
            </div>
            <h3 className={styles.emptyTitle}>No Assessment History Yet</h3>
            <p className={styles.emptyText}>
              You haven't completed any assessments yet. Complete your first assessment to see your verified results, scores, and question-wise feedback here.
            </p>
          </>
        ) : (
          <>
            <div className={styles.emptyIconCircle}>
              <ClipboardList size={36} className={styles.emptyIcon} />
            </div>
            <h3 className={styles.emptyTitle}>No Assessments Available Yet</h3>
            <p className={styles.emptyText}>
              Your upcoming and assigned assessments will appear here. Check back soon or practice with self-generated question sets in the Practice tab.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>
            {isHistory ? 'Assessment History' : 'Current & Upcoming Assessments'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isHistory 
              ? 'Review your past assessment attempts, overall performance rubrics, and detailed AI feedback.' 
              : 'Select an assessment below to launch your proctored evaluation or resume an active session.'}
          </p>
        </div>
        <span className={styles.countBadge}>
          {assessments.length} {assessments.length === 1 ? 'Assessment' : 'Assessments'}
        </span>
      </div>

      <div className={styles.grid}>
        {assessments.map((item) => (
          <AssessmentCard 
            key={item.id} 
            assessment={item} 
            onAction={onAction}
            isHistory={isHistory}
          />
        ))}
      </div>
    </div>
  );
};

export default AssessmentCardGrid;
