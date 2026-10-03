import React, { useEffect } from 'react';
import { BookmarkCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './StudyCards.module.css';

interface KeyTakeawaysSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const KeyTakeawaysScene: React.FC<KeyTakeawaysSceneProps> = ({ scene, onComplete, onNext }) => {
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  const { subtopic, heading, points } = scene.content || {};

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.badgeRow}>
          <BookmarkCheck size={15} />
          <span>{subtopic || `KEY TAKEAWAYS • ${scene.title.toUpperCase()}`}</span>
        </div>

        <h2 className={styles.cardTitle}>{heading || "Key Takeaways"}</h2>
        <p className={styles.cardBody}>
          Before testing your knowledge in the Concept Check, keep these core principles top of mind:
        </p>

        <div className={styles.takeawayCardList}>
          {points && points.map((point: string, idx: number) => (
            <div key={idx} className={styles.takeawayItem}>
              <div className={styles.takeawayIcon}>
                <CheckCircle2 size={16} />
              </div>
              <div className={styles.takeawayItemText}>
                {point}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onNext}
            style={{
              background: '#2563EB',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Review Complete <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyTakeawaysScene;
