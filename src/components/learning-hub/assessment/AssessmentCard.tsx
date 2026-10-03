import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Video, 
  Code, 
  MessageSquare, 
  Smartphone, 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Layers, 
  Info 
} from 'lucide-react';
import type { AssessmentItem } from '../../../types/assessment';
import styles from './AssessmentCard.module.css';

interface AssessmentCardProps {
  assessment: AssessmentItem;
  onAction: (id: string, action: 'start' | 'continue' | 'feedback') => void;
  isHistory?: boolean;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  assessment,
  onAction,
  isHistory = false,
}) => {
  const [showChapterPopover, setShowChapterPopover] = useState(false);
  const [showTopicPopover, setShowTopicPopover] = useState(false);

  const percentage = assessment.totalQuestions > 0 
    ? Math.round((assessment.completedQuestions / assessment.totalQuestions) * 100)
    : 0;

  const renderIcon = () => {
    switch (assessment.iconType) {
      case 'android':
        return <div className={`${styles.iconBadge} ${styles.iconAndroid}`}><Smartphone size={18} /></div>;
      case 'video':
        return <div className={`${styles.iconBadge} ${styles.iconVideo}`}><Video size={18} /></div>;
      case 'code':
        return <div className={`${styles.iconBadge} ${styles.iconCode}`}><Code size={18} /></div>;
      case 'message':
        return <div className={`${styles.iconBadge} ${styles.iconMessage}`}><MessageSquare size={18} /></div>;
      default:
        return <div className={`${styles.iconBadge} ${styles.iconDoc}`}><FileText size={18} /></div>;
    }
  };

  const getStatusBadge = () => {
    switch (assessment.status) {
      case 'not-started':
        return <span className={`${styles.statusBadge} ${styles.statusNotStarted}`}>Not Started</span>;
      case 'in-progress':
        return <span className={`${styles.statusBadge} ${styles.statusInProgress}`}>In Progress</span>;
      case 'upcoming':
        return <span className={`${styles.statusBadge} ${styles.statusUpcoming}`}>Upcoming</span>;
      case 'completed':
        return (
          <span className={`${styles.statusBadge} ${styles.statusCompleted}`}>
            <CheckCircle2 size={12} />
            <span>Completed</span>
          </span>
        );
      default:
        return null;
    }
  };

  const isMultiChapter = assessment.selectedChapters && assessment.selectedChapters.length > 1;
  const isMultiTopic = assessment.selectedTopics && assessment.selectedTopics.length > 1;

  const chapterDisplay = isMultiChapter 
    ? `${assessment.selectedChapters.length} Chapters` 
    : assessment.chapter;

  const topicDisplay = isMultiTopic 
    ? `${assessment.selectedTopics.length} Topics` 
    : assessment.topic;

  const handleActionClick = () => {
    if (isHistory || assessment.status === 'completed') {
      onAction(assessment.id, 'feedback');
    } else if (assessment.status === 'in-progress') {
      onAction(assessment.id, 'continue');
    } else {
      onAction(assessment.id, 'start');
    }
  };

  return (
    <div className={styles.card}>
      {/* Top Header */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          {renderIcon()}
          <div className={styles.titleArea}>
            <div className={styles.nameRow}>
              <h3 className={styles.assessmentName}>{assessment.name}</h3>
            </div>
            
            {/* Chapters & Topics Popover Triggers */}
            <div className={styles.metaRow}>
              {/* Chapter */}
              <div 
                className={styles.popoverAnchor}
                onMouseEnter={() => isMultiChapter && setShowChapterPopover(true)}
                onMouseLeave={() => setShowChapterPopover(false)}
              >
                <span className={isMultiChapter ? styles.multiLabelBadge : styles.singleLabel}>
                  <span>{chapterDisplay}</span>
                  {isMultiChapter && <Info size={11} className={styles.infoIcon} />}
                </span>

                {isMultiChapter && showChapterPopover && (
                  <div className={styles.popoverDropdown}>
                    <div className={styles.popoverTitle}>Included Chapters ({assessment.selectedChapters.length})</div>
                    <ul className={styles.popoverList}>
                      {assessment.selectedChapters.map((ch, idx) => (
                        <li key={idx}>{ch}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <span className={styles.dotSeparator}>•</span>

              {/* Topic */}
              <div 
                className={styles.popoverAnchor}
                onMouseEnter={() => isMultiTopic && setShowTopicPopover(true)}
                onMouseLeave={() => setShowTopicPopover(false)}
              >
                <span className={isMultiTopic ? styles.multiLabelBadge : styles.singleLabel}>
                  <span>{topicDisplay}</span>
                  {isMultiTopic && <Info size={11} className={styles.infoIcon} />}
                </span>

                {isMultiTopic && showTopicPopover && (
                  <div className={styles.popoverDropdown}>
                    <div className={styles.popoverTitle}>Included Topics ({assessment.selectedTopics.length})</div>
                    <ul className={styles.popoverList}>
                      {assessment.selectedTopics.map((top, idx) => (
                        <li key={idx}>{top}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div>{getStatusBadge()}</div>
      </div>

      {/* Description */}
      <p className={styles.descriptionText}>{assessment.description}</p>

      {/* Meta Specs Chips */}
      <div className={styles.specsGrid}>
        <div className={styles.specChip}>
          <HelpCircle size={13} className={styles.specIcon} />
          <span>{assessment.totalQuestions} Questions</span>
        </div>
        <div className={styles.specChip}>
          <Clock size={13} className={styles.specIcon} />
          <span>{assessment.durationMinutes} min</span>
        </div>
        <div className={styles.specChip}>
          <ShieldCheck size={13} className={styles.specIcon} />
          <span>{assessment.assessmentType}</span>
        </div>
        <div className={styles.specChip}>
          <span className={styles.levelDot} />
          <span>{assessment.difficulty}</span>
        </div>
      </div>

      {/* Mid Section: Progress Bar or History Results */}
      {!isHistory && assessment.status === 'in-progress' && (
        <div className={styles.progressContainer}>
          <div className={styles.progressTextRow}>
            <span>Progress: {assessment.completedQuestions} / {assessment.totalQuestions} answered</span>
            <span className={styles.progressPercent}>{percentage}%</span>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: `${percentage}%` }} />
          </div>
        </div>
      )}

      {/* History Metrics Box */}
      {isHistory && (
        <div className={styles.historyMetricsBox}>
          <div className={styles.historyMetric}>
            <span className={styles.historyMetricLabel}>Score</span>
            <span className={styles.historyMetricScore}>{assessment.score}%</span>
          </div>
          <div className={styles.historyDivider} />
          <div className={styles.historyMetric}>
            <span className={styles.historyMetricLabel}>Accuracy</span>
            <span className={styles.historyMetricVal}>{assessment.accuracy}%</span>
          </div>
          <div className={styles.historyDivider} />
          <div className={styles.historyMetric}>
            <span className={styles.historyMetricLabel}>Time Taken</span>
            <span className={styles.historyMetricVal}>{assessment.timeSpentMinutes || 20} min</span>
          </div>
        </div>
      )}

      {/* Footer Info & Action Button */}
      <div className={styles.cardFooter}>
        <div className={styles.footerDate}>
          <Calendar size={13} className={styles.dateIcon} />
          <span>
            {isHistory 
              ? `Completed: ${assessment.completedDate || '28/09/2026'}` 
              : `Scheduled: ${assessment.scheduledDate || 'Flexible'}`}
          </span>
        </div>

        <button 
          type="button"
          className={`${styles.actionBtn} ${isHistory || assessment.status === 'completed' ? styles.btnFeedback : styles.btnPrimary}`}
          onClick={handleActionClick}
        >
          {isHistory || assessment.status === 'completed' ? (
            <>
              <span>View Feedback</span>
              <ArrowRight size={15} />
            </>
          ) : assessment.status === 'in-progress' ? (
            <>
              <span>Continue Assessment</span>
              <ArrowRight size={15} />
            </>
          ) : (
            <>
              <span>Start Assessment</span>
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AssessmentCard;
