import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './Scenes.module.css';

interface ChallengeSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const ChallengeScene: React.FC<ChallengeSceneProps> = ({ scene, onComplete, onNext }) => {
  const { questions } = scene.content;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isAllComplete = isLastQuestion && showFeedback && selectedOption === currentQuestion.correctIndex;

  const handleSelect = (index: number) => {
    if (showFeedback && selectedOption === currentQuestion.correctIndex) return;
    
    setSelectedOption(index);
    setShowFeedback(true);
    
    if (index === currentQuestion.correctIndex) {
      if (isLastQuestion) {
        onComplete();
      }
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  return (
    <div className={styles.sceneLayout}>
      <motion.div 
        className={styles.centerCard}
        style={{ textAlign: 'center' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ color: '#3B82F6', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px', fontSize: '14px' }}>
          CHALLENGE {currentQuestionIndex + 1} OF {questions.length}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className={styles.heading} style={{ fontSize: '28px', margin: '24px 0 40px' }}>
              "{currentQuestion.text}"
            </h2>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
              {currentQuestion.options.map((option: string, index: number) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === currentQuestion.correctIndex;
                const isWrongSelected = showFeedback && isSelected && !isCorrect;
                const isCorrectRevealed = showFeedback && isCorrect;

                return (
                  <motion.button
                    key={option}
                    onClick={() => handleSelect(index)}
                    disabled={showFeedback && selectedOption === currentQuestion.correctIndex}
                    style={{
                      padding: '16px 32px',
                      borderRadius: '12px',
                      border: `2px solid ${isCorrectRevealed ? '#10B981' : isWrongSelected ? '#EF4444' : isSelected ? '#3B82F6' : '#E2E8F0'}`,
                      background: isCorrectRevealed ? '#ECFDF5' : isWrongSelected ? '#FEF2F2' : isSelected ? '#EFF6FF' : 'white',
                      color: isCorrectRevealed ? '#065F46' : isWrongSelected ? '#991B1B' : isSelected ? '#1D4ED8' : '#1E293B',
                      fontSize: '18px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      flex: '1 1 calc(33.333% - 16px)',
                      minWidth: '150px'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isWrongSelected ? { x: [-5, 5, -5, 5, 0] } : {}}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>

            <div className={styles.feedbackArea} style={{ minHeight: '60px', justifyContent: 'center' }}>
              {showFeedback && selectedOption === currentQuestion.correctIndex && !isAllComplete && (
                <motion.button 
                  className={styles.continueBtn}
                  onClick={handleNextQuestion}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Next Question &rarr;
                </motion.button>
              )}

              {isAllComplete && (
                <motion.button 
                  className={styles.continueBtn}
                  onClick={onNext}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Complete Challenge &rarr;
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ChallengeScene;
