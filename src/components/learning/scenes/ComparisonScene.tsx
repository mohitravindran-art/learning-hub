import React, { useState, useEffect } from 'react';
import { Columns2, Target, History, Sparkles } from 'lucide-react';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './StudyCards.module.css';

interface ComparisonSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const ComparisonScene: React.FC<ComparisonSceneProps> = ({ scene, onComplete }) => {
  const [activeSide, setActiveSide] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    onComplete();
  }, [onComplete]);

  const { subtopic, heading, leftTitle, leftBody, rightTitle, rightBody, takeaway } = scene.content || {};

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.badgeRow}>
          <Columns2 size={15} />
          <span>{subtopic || `SIDE-BY-SIDE COMPARISON • ${scene.title.toUpperCase()}`}</span>
        </div>

        <h2 className={styles.cardTitle}>{heading || "Behavioral vs. Situational Comparison"}</h2>

        <div className={styles.comparisonGrid}>
          <div 
            className={`${styles.comparisonCol} ${activeSide === 'left' || activeSide === null ? styles.comparisonColHighlight : ''}`}
            onClick={() => setActiveSide('left')}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.comparisonHeader}>
              <History size={18} color="#2563EB" />
              <span>{leftTitle || "BEHAVIORAL (Past Experience)"}</span>
            </div>
            <p className={styles.comparisonBody}>{leftBody}</p>
          </div>

          <div 
            className={`${styles.comparisonCol} ${activeSide === 'right' ? styles.comparisonColHighlight : ''}`}
            onClick={() => setActiveSide('right')}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.comparisonHeader}>
              <Sparkles size={18} color="#7C3AED" />
              <span>{rightTitle || "SITUATIONAL (Future Hypothetical)"}</span>
            </div>
            <p className={styles.comparisonBody}>{rightBody}</p>
          </div>
        </div>

        {takeaway && (
          <div className={styles.takeawayBox}>
            <div className={styles.takeawayLabel}>
              <Target size={14} /> KEY TAKEAWAY
            </div>
            <p className={styles.takeawayText}>{takeaway}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonScene;
