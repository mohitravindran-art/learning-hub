import React from 'react';
import styles from './Tabs.module.css';
import analyticsStyles from './AnalyticsTab.module.css';
import { CheckCircle, Target, ClipboardList, TrendingUp } from 'lucide-react';

interface TabProps {
  activeTopicId: string;
}

const AnalyticsTab: React.FC<TabProps> = ({ activeTopicId: _activeTopicId }) => {
  const performanceData = [
    { type: 'MCQ', score: 81, color: 'success' },
    { type: 'Audio', score: 63, color: 'warning' },
    { type: 'Code', score: 58, color: 'warning' },
    { type: 'Text', score: 40, color: 'danger' }
  ];

  return (
    <div className={styles.tabContainer}>
      <h2 className={styles.header}>Your Learning Analytics</h2>
      <p className={styles.supportingText}>Track your progress and see how you're improving.</p>

      <div className={analyticsStyles.container}>
        <div className={analyticsStyles.summaryGrid}>
          <div className={analyticsStyles.summaryCard}>
            <div className={analyticsStyles.summaryTitle}>Concept Checks Completed</div>
            <div className={analyticsStyles.summaryValue}>60 <CheckCircle size={32} /></div>
          </div>
          <div className={analyticsStyles.summaryCard}>
            <div className={analyticsStyles.summaryTitle}>Practice Questions Completed</div>
            <div className={analyticsStyles.summaryValue}>124 <Target size={32} /></div>
          </div>
          <div className={analyticsStyles.summaryCard}>
            <div className={analyticsStyles.summaryTitle}>Assessments Completed</div>
            <div className={analyticsStyles.summaryValue}>08 <ClipboardList size={32} /></div>
          </div>
          <div className={analyticsStyles.summaryCard}>
            <div className={analyticsStyles.summaryTitle}>Overall Accuracy</div>
            <div className={analyticsStyles.summaryValue}>78% <TrendingUp size={32} /></div>
          </div>
        </div>

        <div className={analyticsStyles.mainGrid}>
          <div className={analyticsStyles.panel}>
            <div className={analyticsStyles.panelTitle}>Performance by Question Type</div>
            {performanceData.map(item => (
              <div key={item.type} className={analyticsStyles.performanceItem}>
                <div className={analyticsStyles.performanceHeader}>
                  <span>{item.type}</span>
                  <span className={analyticsStyles.performanceValue}>{item.score}%</span>
                </div>
                <div className={analyticsStyles.barContainer}>
                  <div 
                    className={`${analyticsStyles.barFill} ${analyticsStyles[item.color]}`} 
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className={analyticsStyles.panel}>
            <div className={analyticsStyles.panelTitle}>Learning Activity Trend</div>
            <div className={analyticsStyles.chartPlaceholder}>
              [ Trend Chart Placeholder ]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
