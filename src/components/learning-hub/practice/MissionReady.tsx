import React from 'react';
import styles from './MissionReady.module.css';

interface MissionReadyProps {
  missionName: string;
  questionCount: number;
  onLaunch: () => void;
  onBack: () => void;
}

const MissionReady: React.FC<MissionReadyProps> = ({ missionName, questionCount, onLaunch, onBack }) => {
  return (
    <div className={styles.container}>
      <div className={styles.successHeader}>
        <div className={styles.iconCircle}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className={styles.title}>Mission Ready!</h2>
        <p className={styles.subtitle}>Your practice mission has been created successfully.</p>
      </div>

      <div className={styles.missionCard}>
        <div className={styles.missionHeader}>
          <div className={styles.rocketBox}>🚀</div>
          <div className={styles.missionTitleBox}>
            <h3 className={styles.missionTitle}>{missionName}</h3>
            <div className={styles.missionPath}>Question Understanding • Identify Question Types</div>
          </div>
        </div>
        <div className={styles.missionTags}>
          <div className={styles.tag}>
            <span className={styles.tagIcon}>📄</span> {questionCount} Questions
          </div>
          <div className={styles.tag}>
            <span className={styles.tagIcon}>🔀</span> Mixed Format
          </div>
          <div className={styles.tag}>
            <span className={styles.tagIcon}>🏆</span> Challenge Level
          </div>
        </div>
      </div>
      
      <div className={styles.actions}>
        <button className={styles.backBtn} onClick={onBack}>
          Back to Missions
        </button>
        <button className={styles.launchBtn} onClick={onLaunch}>
          Launch Mission &rarr;
        </button>
      </div>
    </div>
  );
};

export default MissionReady;
