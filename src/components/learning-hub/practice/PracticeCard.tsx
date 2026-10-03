import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  MessageSquare, 
  User, 
  Code, 
  Star, 
  Video, 
  MoreVertical, 
  ArrowRight, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import type { PracticeSetItem } from '../../../data/practicePageData';
import styles from './PracticeCard.module.css';

interface PracticeCardProps {
  practiceSet: PracticeSetItem;
  onAction: (id: string, actionType: 'start' | 'continue' | 'feedback' | 'score') => void;
  onDelete?: (id: string) => void;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ practiceSet, onAction, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const percentage = Math.round((practiceSet.completedQuestions / practiceSet.totalQuestions) * 100);

  const renderIcon = () => {
    switch (practiceSet.iconType) {
      case 'document':
        return <div className={`${styles.iconBadge} ${styles.iconBlue}`}><FileText size={18} /></div>;
      case 'message':
        return <div className={`${styles.iconBadge} ${styles.iconGreen}`}><MessageSquare size={18} /></div>;
      case 'user':
        return <div className={`${styles.iconBadge} ${styles.iconPurple}`}><User size={18} /></div>;
      case 'code':
        return <div className={`${styles.iconBadge} ${styles.iconRed}`}><Code size={18} /></div>;
      case 'star':
        return <div className={`${styles.iconBadge} ${styles.iconOrange}`}><Star size={18} /></div>;
      case 'video':
        return <div className={`${styles.iconBadge} ${styles.iconVideo}`}><Video size={18} /></div>;
      default:
        return <div className={`${styles.iconBadge} ${styles.iconBlue}`}><FileText size={18} /></div>;
    }
  };

  const handleMainAction = () => {
    if (practiceSet.status === 'completed') {
      onAction(practiceSet.id, 'feedback');
    } else if (practiceSet.status === 'in-progress') {
      onAction(practiceSet.id, 'continue');
    } else {
      onAction(practiceSet.id, 'start');
    }
  };

  const chapterCount = practiceSet.selectedChapters?.length || (practiceSet.chapter.includes('Chapters') ? parseInt(practiceSet.chapter) : 1);
  const topicCount = practiceSet.selectedTopics?.length || (practiceSet.topic.includes('Topics') ? parseInt(practiceSet.topic) : 1);

  const renderCompactPath = () => {
    if (chapterCount > 1 && topicCount > 1) {
      return `${chapterCount} Chapters • ${topicCount} Topics`;
    }
    if (chapterCount > 1) {
      return `${chapterCount} Chapters • ${practiceSet.topic}`;
    }
    if (topicCount > 1) {
      return `${practiceSet.chapter} • ${topicCount} Topics`;
    }
    return `${practiceSet.chapter} • ${practiceSet.topic}`;
  };

  return (
    <div className={styles.card}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          {renderIcon()}
          <div className={styles.titleArea}>
            <h4 className={styles.title}>{practiceSet.name}</h4>
            <span className={styles.pathText}>
              {renderCompactPath()}
            </span>
          </div>
        </div>

        {/* 3 dots menu */}
        <div className={styles.menuContainer} ref={menuRef}>
          <button 
            className={styles.menuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="More options"
            type="button"
          >
            <MoreVertical size={16} />
          </button>

          {isMenuOpen && (
            <div className={styles.dropdownMenu}>
              {practiceSet.status === 'in-progress' && (
                <button 
                  className={styles.menuItem} 
                  onClick={() => { setIsMenuOpen(false); onAction(practiceSet.id, 'continue'); }}
                >
                  Continue Practice
                </button>
              )}
              {practiceSet.status === 'completed' && (
                <>
                  <button 
                    className={styles.menuItem} 
                    onClick={() => { setIsMenuOpen(false); onAction(practiceSet.id, 'feedback'); }}
                  >
                    View Feedback
                  </button>
                </>
              )}
              {practiceSet.status === 'not-started' && (
                <button 
                  className={styles.menuItem} 
                  onClick={() => { setIsMenuOpen(false); onAction(practiceSet.id, 'start'); }}
                >
                  Start Practice
                </button>
              )}
              <button 
                className={styles.menuItem} 
                onClick={() => { setIsMenuOpen(false); alert('Renaming set...'); }}
              >
                Rename
              </button>
              {onDelete && (
                <button 
                  className={`${styles.menuItem} ${styles.menuItemDanger}`}
                  onClick={() => { setIsMenuOpen(false); onDelete(practiceSet.id); }}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tags Row */}
      <div className={styles.tagsRow}>
        {practiceSet.tags.map((tag, idx) => (
          <span key={idx} className={styles.tagPill}>{tag}</span>
        ))}
      </div>

      {/* Progress or Status Area */}
      <div className={styles.statusArea}>
        {practiceSet.status === 'in-progress' && (
          <>
            <div className={styles.progressHeader}>
              <span className={styles.progressText}>
                {practiceSet.completedQuestions} / {practiceSet.totalQuestions} completed
              </span>
              <span className={styles.percentageText}>{percentage}%</span>
            </div>
            <div className={styles.progressBarBg}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${percentage}%` }}
              />
            </div>
          </>
        )}

        {practiceSet.status === 'completed' && (
          <>
            <div className={styles.progressHeader}>
              <span className={styles.completedStatusText}>
                <CheckCircle2 size={15} className={styles.greenCheck} />
                {practiceSet.score ? `Completed • ${practiceSet.score}%` : `${practiceSet.completedQuestions} / ${practiceSet.totalQuestions} completed`}
              </span>
              <span className={styles.percentageTextGreen}>100%</span>
            </div>
            <div className={styles.progressBarBg}>
              <div 
                className={styles.progressBarFillGreen} 
                style={{ width: '100%' }}
              />
            </div>
          </>
        )}

        {practiceSet.status === 'not-started' && (
          <div className={styles.notStartedWrapper}>
            <Clock size={14} className={styles.clockIcon} />
            <span className={styles.notStartedText}>Not started</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className={styles.actionWrapper}>
        {practiceSet.status === 'completed' ? (
          <button 
            className={styles.scoreBtn} 
            onClick={handleMainAction}
            type="button"
          >
            View Feedback
          </button>
        ) : practiceSet.status === 'in-progress' ? (
          <button 
            className={styles.primaryBtn} 
            onClick={handleMainAction}
            type="button"
          >
            <span>Continue</span>
            <ArrowRight size={15} />
          </button>
        ) : (
          <button 
            className={styles.primaryBtn} 
            onClick={handleMainAction}
            type="button"
          >
            <span>Start Practice</span>
            <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeCard;
