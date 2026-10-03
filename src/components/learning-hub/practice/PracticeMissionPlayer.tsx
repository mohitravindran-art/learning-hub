import React from 'react';
import ConceptCheckEngine from '../../learning/concept-check/ConceptCheckEngine';
import type { PracticeMission } from '../../../types/practice';
import { questionUnderstandingLesson } from '../../../data/lessons/questionUnderstanding';

interface PracticeMissionPlayerProps {
  mission: PracticeMission;
  onComplete: () => void;
  onClose: () => void;
}

const PracticeMissionPlayer: React.FC<PracticeMissionPlayerProps> = ({ mission, onComplete, onClose }) => {
  // Use the conceptCheck questions from questionUnderstandingLesson as our dummy mission questions.
  // In a real app, these would be fetched based on the mission config.
  const questions = questionUnderstandingLesson.conceptCheck.slice(0, mission.questionCount);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, backgroundColor: '#0B1120' }}>
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1000 }}>
        <button 
          onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
        >
          Exit Mission
        </button>
      </div>
      
      {/* Reusing the existing ConceptCheckEngine as requested */}
      <ConceptCheckEngine 
        topicTitle={mission.name}
        questions={questions}
        onComplete={onComplete}
        onExit={onClose}
      />
    </div>
  );
};

export default PracticeMissionPlayer;
