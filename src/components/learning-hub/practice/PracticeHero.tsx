import React from 'react';
import { Play } from 'lucide-react';
import styles from './PracticeHero.module.css';
import practiceIllustration from '../../../assets/practice-illustration.jpg';

interface PracticeHeroProps {
  onHowItWorks: () => void;
}

const PracticeHero: React.FC<PracticeHeroProps> = ({ onHowItWorks }) => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.left}>
        <h1 className={styles.title}>Practice</h1>
        <p className={styles.subtitle}>
          Choose a topic, set your preferences and practise with AI-generated questions.
        </p>
      </div>

      <div className={styles.right}>
        <button 
          className={styles.howItWorksBtn}
          onClick={onHowItWorks}
          type="button"
        >
          <span className={styles.playIconCircle}>
            <Play size={10} fill="currentColor" />
          </span>
          <span>How it works?</span>
        </button>

        <div className={styles.mascotArea}>
          <div className={styles.speechBubble}>
            Practice regularly to build confidence and improve your skills!
            <div className={styles.speechTail} />
          </div>
          <div className={styles.avatarWrapper}>
            <img 
              src={practiceIllustration} 
              alt="Learning Mascot" 
              className={styles.mascotImg}
            />
            <span className={styles.sparkle1}>✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeHero;
