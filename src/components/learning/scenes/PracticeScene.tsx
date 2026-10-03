import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChoiceCard from '../elements/ChoiceCard';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './Scenes.module.css';

interface PracticeSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const PracticeScene: React.FC<PracticeSceneProps> = ({ scene, onComplete, onNext }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const { scenario, question, choices } = scene.content;

  const handleSelect = (index: number) => {
    if (isCompleted) return;
    
    setSelectedId(index);
    setShowFeedback(true);
    
    const choice = choices[index];
    if (choice?.isCorrect) {
      setIsCompleted(true);
      onComplete();
    }
  };

  const getFeedbackText = () => {
    if (selectedId === null) return "";
    return choices[selectedId]?.feedback || "";
  };

  return (
    <div className={styles.sceneLayout}>
      <motion.div 
        className={styles.centerCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ background: '#F1F5F9', padding: '24px', borderRadius: '12px', marginBottom: '32px' }}>
          <p style={{ color: '#64748B', fontSize: '14px', fontWeight: 700, letterSpacing: '1px', marginBottom: '12px', marginTop: 0 }}>
            INTERVIEW SCENARIO
          </p>
          <h2 style={{ margin: 0, fontSize: '24px', color: '#0F172A', fontStyle: 'italic' }}>
            "{scenario}"
          </h2>
        </div>

        <h3 style={{ fontSize: '18px', color: '#1E293B', marginBottom: '20px' }}>{question}</h3>

        <div className={styles.choicesGrid}>
          {choices.map((choice: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
            >
              <ChoiceCard
                id={String(index)}
                text={choice.text}
                isCorrect={choice.isCorrect}
                isSelected={selectedId === index}
                showFeedback={showFeedback}
                onClick={() => handleSelect(index)}
                disabled={isCompleted && selectedId !== index && !choice.isCorrect}
              />
            </motion.div>
          ))}
        </div>

        <div className={styles.feedbackArea}>
          <motion.div 
            className={styles.feedbackText}
            initial={{ opacity: 0 }}
            animate={{ opacity: showFeedback ? 1 : 0 }}
          >
            {getFeedbackText()}
          </motion.div>

          {isCompleted && (
            <motion.button 
              className={styles.continueBtn}
              onClick={onNext}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Finish &rarr;
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PracticeScene;
