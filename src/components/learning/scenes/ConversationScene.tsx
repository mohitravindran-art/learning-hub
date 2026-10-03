import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChoiceCard from '../elements/ChoiceCard';
import SpeechBubble from '../elements/SpeechBubble';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './Scenes.module.css';

interface ConversationSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const ConversationScene: React.FC<ConversationSceneProps> = ({ scene, onComplete, onNext }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const { interviewerText, thoughtText, question, choices } = scene.content;

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
      
      {/* Absolute positioned speech bubbles based on the scene-2 illustration */}
      <div style={{ position: 'absolute', left: '25%', top: '35%' }}>
        <SpeechBubble text={interviewerText} position="bottom-right" delay={0.2} />
      </div>

      <div style={{ position: 'absolute', right: '35%', top: '25%' }}>
        <SpeechBubble text={thoughtText} position="bottom-left" delay={1.5} />
      </div>

      <motion.div 
        className={styles.centerCard}
        style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', padding: '24px' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
      >
        <h3 className={styles.heading} style={{ fontSize: '20px' }}>{question}</h3>

        <div className={styles.choicesGrid}>
          {choices.map((choice: any) => (
            <ChoiceCard
              key={choice.id}
              id={choice.id}
              text={choice.text}
              isCorrect={choice.isCorrect}
              isSelected={selectedId === choice.id}
              showFeedback={showFeedback}
              onClick={() => handleSelect(choice.id)}
              disabled={isCompleted && selectedId !== choice.id && !choice.isCorrect}
            />
          ))}
        </div>

        <div className={styles.feedbackArea}>
          <motion.div 
            className={styles.feedbackText}
            style={{ fontSize: '14px' }}
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
              Next &rarr;
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ConversationScene;
