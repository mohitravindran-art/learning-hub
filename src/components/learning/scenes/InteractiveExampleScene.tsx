import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../elements/Avatar';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './Scenes.module.css';

interface InteractiveExampleSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const InteractiveExampleScene: React.FC<InteractiveExampleSceneProps> = ({ scene, onComplete, onNext }) => {
  const { question, hotspots } = scene.content;
  
  const [visitedSpots, setVisitedSpots] = useState<Set<string>>(new Set());
  const [activeSpot, setActiveSpot] = useState<string | null>(null);

  const isCompleted = visitedSpots.size === hotspots.length;

  const handleSpotClick = (id: string) => {
    setActiveSpot(id);
    const newVisited = new Set(visitedSpots);
    newVisited.add(id);
    setVisitedSpots(newVisited);
    
    if (newVisited.size === hotspots.length) {
      onComplete();
    }
  };

  const activeInfo = hotspots.find((h: any) => h.id === activeSpot)?.info;

  return (
    <div className={styles.sceneLayout}>
      <Avatar src={scene.avatar!} position="left" delay={0.2} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <motion.div 
          className={styles.centerCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className={styles.heading} style={{ textAlign: 'center', marginBottom: '32px' }}>
            "{question}"
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {hotspots.map((spot: any, index: number) => {
              const isVisited = visitedSpots.has(spot.id);
              const isActive = activeSpot === spot.id;
              
              return (
                <motion.button
                  key={spot.id}
                  onClick={() => handleSpotClick(spot.id)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '30px',
                    border: `2px solid ${isActive ? '#3B82F6' : isVisited ? '#10B981' : '#CBD5E1'}`,
                    background: isActive ? '#EFF6FF' : isVisited ? '#ECFDF5' : 'white',
                    color: isActive ? '#1D4ED8' : isVisited ? '#065F46' : '#475569',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                >
                  {spot.label}
                  {isVisited && <span style={{ marginLeft: '8px' }}>✓</span>}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeInfo && (
              <motion.div
                key={activeSpot}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '24px' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                style={{
                  background: '#F8FAFC',
                  padding: '20px',
                  borderRadius: '12px',
                  borderLeft: '4px solid #3B82F6',
                  color: '#1E293B',
                  fontSize: '16px',
                  lineHeight: 1.5
                }}
              >
                {activeInfo}
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.feedbackArea} style={{ borderTop: 'none', minHeight: '40px', justifyContent: 'flex-end' }}>
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
    </div>
  );
};

export default InteractiveExampleScene;
