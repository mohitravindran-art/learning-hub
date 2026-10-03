import React from 'react';
import type { PracticeMission } from '../../../types/practice';
import MissionCard from './MissionCard';
import styles from './MissionGrid.module.css';

interface MissionGridProps {
  missions: PracticeMission[];
  onCreateNew: () => void;
  onLaunch: (missionId: string) => void;
}

const MissionGrid: React.FC<MissionGridProps> = ({ missions, onCreateNew, onLaunch }) => {
  return (
    <div className={styles.grid}>
      {missions.map(mission => (
        <MissionCard 
          key={mission.id} 
          mission={mission} 
          onLaunch={onLaunch} 
        />
      ))}
      
      <div className={styles.createCard} onClick={onCreateNew}>
        <div className={styles.createIcon}>+</div>
        <div className={styles.createText}>Create New<br/>Mission</div>
        <div className={styles.createSubtext}>Generate custom questions<br/>and start practising.</div>
      </div>
    </div>
  );
};

export default MissionGrid;
