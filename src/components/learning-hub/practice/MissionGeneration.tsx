import React, { useEffect, useState } from 'react';
import styles from './MissionGeneration.module.css';
import { CheckCircle2, Circle, Lightbulb } from 'lucide-react';

interface MissionGenerationProps {
  onComplete: () => void;
}

const steps = [
  'Selecting concepts...',
  'Creating questions...',
  'Balancing difficulty...',
  'Preparing your challenge...'
];

const MissionGeneration: React.FC<MissionGenerationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800); // slightly slower to let user read
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Building Your Mission</h2>
        <p className={styles.subtitle}>Our AI is creating your personalised practice questions.</p>
        
        <div className={styles.illustrationBox}>
          <div className={styles.rocket}>🚀</div>
          <div className={styles.stars}>✨</div>
        </div>
        
        <div className={styles.steps}>
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            
            return (
              <div 
                key={index} 
                className={`${styles.step} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
              >
                <div className={styles.stepIcon}>
                  {isCompleted ? (
                    <CheckCircle2 size={24} color="#10B981" />
                  ) : isActive ? (
                    <div className={styles.activeIcon}>
                      <div className={styles.activeInner}></div>
                    </div>
                  ) : (
                    <Circle size={24} color="#CBD5E1" />
                  )}
                </div>
                <span>{step}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.tipBox}>
          <Lightbulb size={24} color="#F59E0B" />
          <div className={styles.tipText}>
            This will just take a few seconds.<br/>
            Good practice leads to great progress!
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionGeneration;
