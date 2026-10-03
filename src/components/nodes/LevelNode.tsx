import React, { useState } from 'react';
import clsx from 'clsx';
import { Check, Lock, Play } from 'lucide-react';
import type { Chapter } from '../../data/subjectsData';
import styles from './LevelNode.module.css';

interface LevelNodeProps {
  chapter: Chapter;
  isActive: boolean;
  onClick: () => void;
  onPlay: () => void;
}

const LevelNode: React.FC<LevelNodeProps> = ({ chapter, isActive, onClick, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const showCard = isActive || isHovered;
  const isChapterLocked = chapter.status === 'locked';
  const isChapterCompleted = chapter.status === 'completed';
  const isChapterUnlocked = chapter.status === 'unlocked';

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay();
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    // Prevent map from capturing pointer when clicking on the node
    e.stopPropagation();
  };

  return (
    <div 
      className={clsx(
        styles.nodeContainer, 
        styles[chapter.status],
        isChapterLocked && styles.locked, 
        isActive && styles.activeNode
      )}
      onClick={handleContainerClick}
      onPointerDown={handlePointerDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-interactive="true"
    >
      <div className={styles.nodeBase}>
        {isChapterCompleted && <div className={styles.iconBadge}><Check size={16} /></div>}
        {isChapterLocked && <div className={styles.iconBadge}><Lock size={16} /></div>}
        {isChapterUnlocked && <div className={clsx(styles.iconBadge, styles.currentBadge)}><Play size={12} fill="white" /></div>}
        <span className={styles.nodeNumber}>{chapter.number}</span>
      </div>

      {isActive && <div className={styles.pulseRing} />}

      <div 
        className={clsx(styles.cardWrapper, showCard && styles.cardVisible)}
        data-interactive="true"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={clsx(styles.playBadge, isChapterLocked && styles.lockedBadge)}>
              {isChapterLocked ? (
                <Lock size={15} color="white" />
              ) : (
                <Play size={14} fill="white" color="white" />
              )}
            </div>
            <div className={styles.cardTopText}>
              <span className={styles.chapterLabel}>
                {isChapterLocked ? (
                  <span className={styles.lockedTag}>
                    <Lock size={10} /> Chapter {chapter.number} • Locked
                  </span>
                ) : (
                  `Chapter ${String(chapter.number).padStart(2, '0')}`
                )}
              </span>
              <h3 className={styles.cardTitle}>
                {chapter.title}
              </h3>
            </div>
          </div>
          
          {isChapterLocked ? (
            <div className={styles.lockedActionContainer}>
              <button 
                className={styles.lockedResumeBtn} 
                disabled
                type="button"
              >
                <Lock size={13} />
                <span>Locked</span>
              </button>
              <span className={styles.lockedHint}>
                Complete Chapter {Math.max(1, chapter.number - 1)} to unlock
              </span>
            </div>
          ) : (
            <button 
              className={styles.startResumeBtn} 
              onClick={handlePlay}
              type="button"
            >
              <Play size={13} fill="white" color="white" />
              <span>Start Chapter</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelNode;
