import React from 'react';
import type { PracticeMission } from '../../../types/practice';
import styles from './CurrentMission.module.css';
import { ArrowRight, FileText, LayoutGrid, Zap } from 'lucide-react';

interface CurrentMissionProps {
  mission: PracticeMission;
  onLaunch: (missionId: string) => void;
}

const CurrentMission: React.FC<CurrentMissionProps> = ({ mission, onLaunch }) => {
  if (!mission) return null;

  const progressPercent = Math.round((mission.questionsCompleted / mission.totalQuestions) * 100) || 0;

  return (
    <div className={styles.container}>
      <div className={styles.backgroundEffect}></div>
      <div className={styles.rocketIllustration}>🚀</div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.badge}>CURRENT MISSION</div>
          <h3 className={styles.title}>{mission.name}</h3>
          <div className={styles.subtitle}>
            Question Understanding • Identify Question Types
          </div>
        </div>
        
        <div className={styles.progressArea}>
          <div className={styles.progressBarBg}>
            <div 
              className={styles.progressBarFill} 
              style={{ width: `${progressPercent}%` }}
            ></div>
            <div 
              className={styles.progressMarker} 
              style={{ left: `${progressPercent}%` }}
            ></div>
          </div>
          <div className={styles.progressText}>
            {mission.questionsCompleted} / {mission.totalQuestions} questions completed
          </div>
        </div>

        <div className={styles.bottomArea}>
          <div className={styles.tagsArea}>
            <div className={styles.tag}>
              <FileText size={14} /> {mission.totalQuestions} Questions
            </div>
            <div className={styles.tag}>
              <LayoutGrid size={14} /> {mission.questionTypes.join(', ')}
            </div>
            <div className={`${styles.tag} ${styles.tagOrange}`}>
              <Zap size={14} /> <span style={{ textTransform: 'capitalize' }}>{mission.difficulty}</span>
            </div>
          </div>

          <button 
            className={styles.launchBtn}
            onClick={() => onLaunch(mission.id)}
          >
            Continue Mission <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentMission;
