import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SceneData } from '../../data/lessons/questionUnderstanding';
import styles from './SceneRenderer.module.css';

import ContentScene from './scenes/ContentScene';
import IllustratedScenarioScene from './scenes/IllustratedScenarioScene';
import ComparisonScene from './scenes/ComparisonScene';
import KeyTakeawaysScene from './scenes/KeyTakeawaysScene';
import TopicCompleteScene from './scenes/TopicCompleteScene';

interface SceneRendererProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({ scene, onComplete, onNext }) => {
  const isIllustrated = scene.type === 'scenario' || scene.type === 'conversation' || Boolean(scene.backgroundAsset);

  const renderSceneContent = () => {
    switch (scene.type) {
      case 'scenario':
      case 'conversation':
      case 'interactive-choice':
        return <IllustratedScenarioScene scene={scene} onComplete={onComplete} onNext={onNext} />;
      case 'explanation':
      case 'content':
        return <ContentScene scene={scene} onComplete={onComplete} onNext={onNext} />;
      case 'comparison':
        return <ComparisonScene scene={scene} onComplete={onComplete} onNext={onNext} />;
      case 'key-takeaways':
        return <KeyTakeawaysScene scene={scene} onComplete={onComplete} onNext={onNext} />;
      case 'topic-complete':
      case 'completion':
        return <TopicCompleteScene scene={scene} onComplete={onComplete} onNext={onNext} />;
      default:
        return <ContentScene scene={scene} onComplete={onComplete} onNext={onNext} />;
    }
  };

  return (
    <div className={styles.sceneContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`${styles.sceneWrapper} ${isIllustrated ? styles.fullBleedWrapper : ''}`}
        >
          <div className={isIllustrated ? styles.fullBleedContentContainer : styles.contentContainer}>
            {renderSceneContent()}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SceneRenderer;
