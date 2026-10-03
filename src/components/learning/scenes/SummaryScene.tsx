import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './Scenes.module.css';
import { Target } from 'lucide-react';

interface SummarySceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const SummaryScene: React.FC<SummarySceneProps> = ({ scene, onComplete, onNext }) => {
  const { heading, body, ctaText } = scene.content;

  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return (
    <div className={styles.sceneLayout}>
      <motion.div 
        className={styles.centerCard}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.summaryContainer}>
          <div className={styles.targetIcon}>
            <Target size={40} />
          </div>
          
          <h2 className={styles.summaryTitle}>{heading}</h2>
          <p className={styles.summaryText}>{body}</p>

          <button 
            className={styles.startConceptCheckBtn}
            onClick={onNext}
          >
            {ctaText || 'START CONCEPT CHECK \u2192'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SummaryScene;
