import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { PracticeMission } from '../../../types/practice';
import { DUMMY_MISSIONS } from '../../../data/practiceData';
import styles from './PracticeMissions.module.css';
import PracticeSummary from './PracticeSummary';
import CurrentMission from './CurrentMission';
import MissionGrid from './MissionGrid';
import PastMissions from './PastMissions';

interface PracticeDashboardProps {
  onCreateMission: () => void;
  onLaunchMission: (missionId: string) => void;
  missions?: PracticeMission[];
}

const PracticeDashboard: React.FC<PracticeDashboardProps> = ({ onCreateMission, onLaunchMission, missions: propMissions }) => {
  const [missions] = useState<PracticeMission[]>(DUMMY_MISSIONS);
  const currentMissionList = propMissions || missions;

  const activeMissions = currentMissionList.filter(m => m.status === 'in-progress' || m.status === 'ready');
  const pastMissions = currentMissionList.filter(m => m.status === 'completed');
  
  const currentMission = activeMissions.length > 0 ? activeMissions[0] : null;
  
  const avgScore = pastMissions.length > 0
    ? Math.round(pastMissions.reduce((acc, m) => acc + (m.score || 0), 0) / pastMissions.length)
    : 0;

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <h2>Practice Missions</h2>
          <p>Build a custom practice mission and improve your skills.</p>
        </div>
        <button className={styles.createBtn} onClick={onCreateMission}>
          <Plus size={20} /> Create Mission
        </button>
      </div>

      <div className={styles.summarySection}>
        <PracticeSummary 
          activeCount={activeMissions.length}
          completedCount={pastMissions.length}
          averageScore={avgScore}
        />
      </div>

      {currentMission && (
        <CurrentMission 
          mission={currentMission} 
          onLaunch={onLaunchMission}
        />
      )}

      <div>
        <h3 className={styles.sectionTitle}>YOUR MISSIONS</h3>
        <MissionGrid 
          missions={activeMissions.slice(currentMission ? 1 : 0)} 
          onCreateNew={onCreateMission}
          onLaunch={onLaunchMission}
        />
      </div>

      <div>
        <h3 className={styles.sectionTitle}>PAST MISSIONS</h3>
        <PastMissions missions={pastMissions} />
      </div>
    </div>
  );
};

export default PracticeDashboard;
