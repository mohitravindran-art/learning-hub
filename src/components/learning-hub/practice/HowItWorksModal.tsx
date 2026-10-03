import React from 'react';
import { X, Sparkles } from 'lucide-react';
import styles from './HowItWorksModal.module.css';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} type="button">
          <X size={20} />
        </button>

        <div className={styles.header}>
          <div className={styles.iconCircle}>
            <Sparkles size={24} className={styles.sparkleIcon} />
          </div>
          <h2 className={styles.title}>How AI Practice Works</h2>
          <p className={styles.subtitle}>
            Personalized, interactive practice sessions tailored to your interview readiness.
          </p>
        </div>

        <div className={styles.steps}>
          <div className={styles.stepItem}>
            <div className={styles.stepNum}>1</div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>Pick Your Focus</h4>
              <p className={styles.stepDesc}>
                Select the chapter, topic, and optional subtopic you want to strengthen.
              </p>
            </div>
          </div>

          <div className={styles.stepItem}>
            <div className={styles.stepNum}>2</div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>Set Level & Format</h4>
              <p className={styles.stepDesc}>
                Choose between Warm-up (5 Qs), Challenge (10 Qs), or Expert (15 Qs), plus question types like MCQ, Audio, or Conversational.
              </p>
            </div>
          </div>

          <div className={styles.stepItem}>
            <div className={styles.stepNum}>3</div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>AI Generates Real Scenarios</h4>
              <p className={styles.stepDesc}>
                Our AI model dynamically writes realistic questions and contextual scenarios based on your selections.
              </p>
            </div>
          </div>

          <div className={styles.stepItem}>
            <div className={styles.stepNum}>4</div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>Track Score & Progress</h4>
              <p className={styles.stepDesc}>
                Submit your answers to get comprehensive feedback, instant scores, and build your practice history.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.gotItBtn} onClick={onClose} type="button">
            Got it, Let's Practise!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksModal;
