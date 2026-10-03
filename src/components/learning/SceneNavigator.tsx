import React from 'react';
import clsx from 'clsx';
import { Check, Lock } from 'lucide-react';
import type { SceneData } from '../../data/lessons/questionUnderstanding';
import styles from './SceneNavigator.module.css';

interface SceneNavigatorProps {
  scenes: SceneData[];
  currentIndex: number;
  completedScenes: Set<number>;
  onSelectScene: (index: number) => void;
}

const SceneNavigator: React.FC<SceneNavigatorProps> = ({
  scenes,
  currentIndex,
  completedScenes,
  onSelectScene
}) => {
  return (
    <nav className={styles.navigator}>
      <h3 className={styles.title}>SCENES</h3>
      
      <div className={styles.sceneList}>
        {scenes.map((scene, index) => {
          const isCurrent = index === currentIndex;
          const isCompleted = completedScenes.has(index);
          // A scene is locked if it's not the first scene and the previous scene is not completed
          const isLocked = index > 0 && !completedScenes.has(index - 1) && !isCurrent && !isCompleted;

          return (
            <button
              key={scene.id}
              className={clsx(
                styles.sceneBtn,
                isCurrent && styles.active,
                isLocked && styles.locked
              )}
              onClick={() => {
                if (!isLocked) onSelectScene(index);
              }}
              disabled={isLocked}
            >
              <div className={styles.sceneNumber}>
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <div className={styles.sceneInfo}>
                <span className={styles.sceneTitle}>{scene.title}</span>
                {isCurrent && <span className={styles.currentLabel}>CURRENT</span>}
              </div>

              <div className={styles.statusIcon}>
                {isCompleted && !isCurrent && <Check size={14} className={styles.checkIcon} />}
                {isLocked && <Lock size={14} className={styles.lockIcon} />}
                {!isCompleted && !isLocked && !isCurrent && <div className={styles.circleIcon} />}
                {isCurrent && <div className={styles.activeDot} />}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SceneNavigator;
