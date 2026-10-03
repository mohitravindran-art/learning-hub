import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './StudyCards.module.css';

interface TopicCompleteSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const TopicCompleteScene: React.FC<TopicCompleteSceneProps> = ({ scene, onComplete, onNext }) => {
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  const { heading, subtitle, points, ctaText } = scene.content || {};

  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.card} ${styles.completeCard}`}>
        <div className={styles.trophyCircle}>
          🎯
        </div>

        <div className={styles.badgeRow} style={{ justifyContent: 'center', marginBottom: '8px' }}>
          <span>TOPIC COMPLETE</span>
        </div>

        <h2 className={styles.cardTitle} style={{ fontSize: '24px', marginBottom: '8px', textAlign: 'center' }}>
          {heading || "TOPIC COMPLETE"}
        </h2>
        <p className={styles.cardBody} style={{ textAlign: 'center', maxWidth: '500px', marginBottom: '16px' }}>
          {subtitle || "You've completed the learning material for Question Understanding."}
        </p>

        {points && points.length > 0 && (
          <div className={styles.accomplishmentList}>
            {points.map((pt: string, idx: number) => (
              <div key={idx} className={styles.accomplishmentItem}>
                <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0 }} />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        )}

        <button className={styles.startCcBtn} onClick={onNext}>
          <span>{ctaText || "Start Concept Check →"}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TopicCompleteScene;
