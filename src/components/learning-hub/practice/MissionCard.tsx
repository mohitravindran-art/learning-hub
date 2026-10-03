import React from 'react';
import type { PracticeMission } from '../../../types/practice';
import styles from './MissionCard.module.css';
import { FileText, LayoutGrid, ArrowRight } from 'lucide-react';

interface MissionCardProps {
  mission: PracticeMission;
  onLaunch: (missionId: string) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, onLaunch }) => {
  const isCompleted = mission.status === 'completed';
  const isNotStarted = mission.status === 'ready' && mission.questionsCompleted === 0;
  
  const progressPercent = Math.round((mission.questionsCompleted / mission.totalQuestions) * 100) || 0;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconBox} style={{ backgroundColor: isCompleted ? '#DCFCE7' : '#F1F5F9' }}>
          <div className={styles.icon}>{isCompleted ? '🎯' : '🚀'}</div>
        </div>
        <div className={styles.headerText}>
          <h4 className={styles.title}>{mission.name}</h4>
          <div className={styles.subtitle}>{mission.questionTypes.includes('Conversational') ? 'Confidence & Delivery' : 'Structured Thinking'}</div>
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.detailRow}>
          <FileText size={16} className={styles.detailIcon} /> 
          <span className={styles.detailText}>{mission.totalQuestions} Questions</span>
        </div>
        <div className={styles.detailRow}>
          <LayoutGrid size={16} className={styles.detailIcon} /> 
          <span className={styles.detailText}>{mission.questionTypes.join(' + ')}</span>
        </div>
      </div>
      
      <div className={styles.cardFooter}>
        <div className={styles.progressArea}>
          {isNotStarted ? (
            <div className={styles.notStarted}>- Not Started</div>
          ) : (
            <>
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className={styles.progressText}>
                {mission.questionsCompleted} / {mission.totalQuestions}
              </div>
            </>
          )}
        </div>
        <button 
          className={styles.actionBtn}
          onClick={() => onLaunch(mission.id)}
        >
          {isCompleted ? 'VIEW SCORE' : 'Launch '} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default MissionCard;
