import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './Scenes.module.css';
import { Play, Pause } from 'lucide-react';

interface AudioSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const AudioScene: React.FC<AudioSceneProps> = ({ scene, onComplete, onNext }) => {
  const { heading, body, interactionPrompt, choices } = scene.content;
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Simulate audio playback
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
        setHasListened(true);
      }, 3000); // 3 seconds mock audio
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const choice = choices?.find((c: any) => c.id === id);
    if (choice?.isCorrect) {
      onComplete();
    }
  };

  const isCorrect = selectedId ? choices?.find((c: any) => c.id === selectedId)?.isCorrect : false;

  return (
    <div className={styles.sceneLayout}>
      <motion.div 
        className={styles.centerCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.heading}>{heading}</h2>
        {body && <p className={styles.subheading}>{body}</p>}

        <div className={styles.audioPlayer}>
          <button 
            className={styles.playBtn}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <div className={styles.waveform} style={{ opacity: isPlaying ? 1 : 0.5 }}></div>
        </div>

        {hasListened && choices && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {interactionPrompt && <div className={styles.interactionPrompt}>{interactionPrompt}</div>}
            
            <div className={styles.choicesGrid}>
              {choices.map((choice: any) => (
                <button
                  key={choice.id}
                  className={`${styles.continueBtn} ${selectedId === choice.id ? (choice.isCorrect ? styles.betterResponse : styles.weakResponse) : ''}`}
                  style={{ background: selectedId === choice.id ? 'transparent' : '#F8FAFC', color: '#1E293B', border: '1px solid #E2E8F0' }}
                  onClick={() => handleSelect(choice.id)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className={styles.feedbackArea}>
          <div className={styles.feedbackText}>
            {selectedId && choices?.find((c: any) => c.id === selectedId)?.feedback}
          </div>
          {(!choices || isCorrect) && (
            <motion.button 
              className={styles.continueBtn}
              onClick={onNext}
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

export default AudioScene;
