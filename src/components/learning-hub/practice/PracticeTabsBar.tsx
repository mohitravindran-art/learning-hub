import React from 'react';
import { FileText, Clock, LayoutGrid, List, ChevronDown } from 'lucide-react';
import styles from './PracticeTabsBar.module.css';

interface PracticeTabsBarProps {
  activeTab: 'sets' | 'history';
  onSelectTab: (tab: 'sets' | 'history') => void;
  viewMode: 'cards' | 'table';
  onSelectViewMode: (mode: 'cards' | 'table') => void;
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
  setsCount?: number;
  historyCount?: number;
}

const PracticeTabsBar: React.FC<PracticeTabsBarProps> = ({
  activeTab,
  onSelectTab,
  viewMode,
  onSelectViewMode,
  sortBy,
  onSelectSortBy,
  setsCount,
  historyCount,
}) => {
  return (
    <div className={styles.tabsBar}>
      {/* Left Tabs */}
      <div className={styles.tabGroup}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'sets' ? styles.tabBtnActive : ''}`}
          onClick={() => onSelectTab('sets')}
          type="button"
        >
          <FileText size={18} />
          <span>Your Practice Sets</span>
          {setsCount !== undefined && (
            <span className={`${styles.countBadge} ${activeTab === 'sets' ? styles.countBadgeActive : ''}`}>
              {setsCount}
            </span>
          )}
        </button>

        <button
          className={`${styles.tabBtn} ${activeTab === 'history' ? styles.tabBtnActive : ''}`}
          onClick={() => onSelectTab('history')}
          type="button"
        >
          <Clock size={18} />
          <span>Practice History</span>
          {historyCount !== undefined && (
            <span className={`${styles.countBadge} ${activeTab === 'history' ? styles.countBadgeActive : ''}`}>
              {historyCount}
            </span>
          )}
        </button>
      </div>

      {/* Right Controls */}
      <div className={styles.controlsGroup}>
        <div className={styles.viewAsWrapper}>
          <span className={styles.viewAsLabel}>View as:</span>
          <div className={styles.viewToggleGroup}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'cards' ? styles.viewBtnActive : ''}`}
              onClick={() => onSelectViewMode('cards')}
              title="Cards view"
              type="button"
            >
              <LayoutGrid size={15} />
              <span>Cards</span>
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'table' ? styles.viewBtnActive : ''}`}
              onClick={() => onSelectViewMode('table')}
              title="Table view"
              type="button"
            >
              <List size={15} />
              <span>Table</span>
            </button>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className={styles.sortWrapper}>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => onSelectSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="progress">Highest Progress</option>
          </select>
          <ChevronDown size={14} className={styles.sortChevron} />
        </div>
      </div>
    </div>
  );
};

export default PracticeTabsBar;
