import React from 'react';
import { ClipboardCheck, History, Filter, ArrowUpDown } from 'lucide-react';
import type { AssessmentTabType } from '../../../types/assessment';
import styles from './AssessmentTabsBar.module.css';

interface AssessmentTabsBarProps {
  activeTab: AssessmentTabType;
  onSelectTab: (tab: AssessmentTabType) => void;
  currentCount: number;
  historyCount: number;
  filterValue: string;
  onSelectFilter: (filter: string) => void;
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
}

export const AssessmentTabsBar: React.FC<AssessmentTabsBarProps> = ({
  activeTab,
  onSelectTab,
  currentCount,
  historyCount,
  filterValue,
  onSelectFilter,
  sortBy,
  onSelectSortBy,
}) => {
  return (
    <div className={styles.tabsBar}>
      {/* Primary Tab Buttons */}
      <div className={styles.tabGroup}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'current' ? styles.tabBtnActive : ''}`}
          onClick={() => onSelectTab('current')}
        >
          <ClipboardCheck size={17} className={styles.tabIcon} />
          <span>Current Assessments</span>
          <span className={`${styles.countBadge} ${activeTab === 'current' ? styles.countBadgeActive : ''}`}>
            {currentCount}
          </span>
        </button>

        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'history' ? styles.tabBtnActive : ''}`}
          onClick={() => onSelectTab('history')}
        >
          <History size={17} className={styles.tabIcon} />
          <span>Assessment History</span>
          <span className={`${styles.countBadge} ${activeTab === 'history' ? styles.countBadgeActive : ''}`}>
            {historyCount}
          </span>
        </button>
      </div>

      {/* Compact Right Filters (No view switcher) */}
      <div className={styles.controlsGroup}>
        {/* Status Filter */}
        <div className={styles.filterWrapper}>
          <Filter size={13} className={styles.filterIcon} />
          <select 
            className={styles.controlSelect}
            value={filterValue}
            onChange={(e) => onSelectFilter(e.target.value)}
            aria-label="Filter assessments by status"
          >
            <option value="all">All Status</option>
            {activeTab === 'current' ? (
              <>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="upcoming">Upcoming</option>
              </>
            ) : (
              <>
                <option value="completed">Completed</option>
                <option value="high-score">Score &gt; 90%</option>
              </>
            )}
          </select>
        </div>

        {/* Sort Filter */}
        <div className={styles.sortWrapper}>
          <ArrowUpDown size={13} className={styles.sortIcon} />
          <select 
            className={styles.controlSelect}
            value={sortBy}
            onChange={(e) => onSelectSortBy(e.target.value)}
            aria-label="Sort assessments"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AssessmentTabsBar;
