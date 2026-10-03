import React from 'react';
import type { PracticeMission } from '../../../types/practice';
import styles from './PastMissions.module.css';

interface PastMissionsProps {
  missions: PracticeMission[];
}

const PastMissions: React.FC<PastMissionsProps> = ({ missions }) => {
  if (!missions || missions.length === 0) return null;

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Practice Mission</th>
            <th>Date Created</th>
            <th>Date Submitted</th>
            <th>Questions</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {missions.map(mission => {
            const createdDate = new Date(mission.createdAt).toLocaleDateString();
            const submittedDate = mission.submittedAt 
              ? new Date(mission.submittedAt).toLocaleDateString() 
              : '-';
              
            return (
              <tr key={mission.id}>
                <td className={styles.missionName}>{mission.name}</td>
                <td>{createdDate}</td>
                <td>{submittedDate}</td>
                <td>{mission.totalQuestions}</td>
                <td className={styles.score}>{mission.score !== undefined ? `${mission.score}%` : '-'}</td>
                <td>
                  <button className={styles.actionBtn}>
                    VIEW SCORE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PastMissions;
