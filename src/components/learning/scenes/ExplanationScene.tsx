import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Avatar from '../elements/Avatar';
import ChoiceCard from '../elements/ChoiceCard';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './Scenes.module.css';

interface ExplanationSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const ExplanationScene: React.FC<ExplanationSceneProps> = ({ scene, onComplete, onNext }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const { heading, body, interactionPrompt, choices } = scene.content;

  useEffect(() => {
    if (!choices || choices.length === 0) {
      setIsCompleted(true);
      onComplete();
    }
  }, [choices, onComplete]);

  const handleSelect = (id: string) => {
    if (isCompleted) return;
    
    setSelectedId(id);
    setShowFeedback(true);
    
    const choice = choices.find((c: any) => c.id === id);
    if (choice?.isCorrect) {
      setIsCompleted(true);
      onComplete();
    }
  };

  const getFeedbackText = () => {
    if (!selectedId) return "";
    const choice = choices.find((c: any) => c.id === selectedId);
    return choice?.feedback || "";
  };

  return (
    <div className={styles.sceneLayout}>
      <Avatar src={scene.avatar!} position="left" delay={0.2} />
      
      <motion.div 
        className={styles.centerCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{body}</p>
        
        {interactionPrompt && (
          <div className={styles.interactionPrompt}>
            "{interactionPrompt}"
          </div>
        )}

        {choices && choices.length > 0 && (
          <div className={styles.choicesGrid}>
            {choices.map((choice: any, index: number) => (
              <motion.div 
                key={choice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
              >
                <ChoiceCard
                  id={choice.id}
                  text={choice.text}
                  isCorrect={choice.isCorrect}
                  isSelected={selectedId === choice.id}
                  showFeedback={showFeedback}
                  onClick={() => handleSelect(choice.id)}
                  disabled={isCompleted && selectedId !== choice.id && !choice.isCorrect}
                />
              </motion.div>
            ))}
          </div>
        )}

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
              Continue &rarr;
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ExplanationScene;
