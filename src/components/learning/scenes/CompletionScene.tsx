import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './Scenes.module.css';

interface CompletionSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void; // Actually the "Return to Map" or "Take Concept Check" action
}

const CompletionScene: React.FC<CompletionSceneProps> = ({ scene, onComplete, onNext }) => {
  const { heading, subheading, concepts } = scene.content;

  // Auto-complete the scene when they land on it
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return (
    <div className={styles.sceneLayout}>
      <motion.div 
        className={styles.centerCard}
        style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}
        >
          <CheckCircle size={64} color="#10B981" />
        </motion.div>

        <h2 className={styles.heading} style={{ fontSize: '36px', marginBottom: '16px' }}>{heading}</h2>
        <p className={styles.subheading} style={{ marginBottom: '32px' }}>{subheading}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '48px', textAlign: 'left' }}>
          {concepts.map((concept: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
              style={{
                background: '#F1F5F9',
                padding: '16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontWeight: 600,
                color: '#334155'
              }}
            >
              <span style={{ color: '#3B82F6' }}>•</span>
              {concept}
            </motion.div>
          ))}
        </div>

        <motion.button 
          className={styles.continueBtn}
          style={{ width: '100%', padding: '16px', fontSize: '18px' }}
          onClick={onNext}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Take Concept Check &rarr;
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CompletionScene;
