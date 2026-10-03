import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './StudyCards.module.css';

interface ScenarioSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const ScenarioScene: React.FC<ScenarioSceneProps> = ({ scene, onComplete, onNext }) => {
  const { subtopic, interviewerText, thoughtText, question, options, correctId, feedbackCorrect, feedbackIncorrect } = scene.content || {};

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSubmitted(true);
    onComplete();
  };

  const isCorrect = selectedId === correctId;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.badgeRow}>
          <MessageSquare size={15} />
          <span>{subtopic || `INTERACTIVE SCENARIO • ${scene.title.toUpperCase()}`}</span>
        </div>

        {interviewerText && (
          <div className={styles.scenarioInterviewer}>
            <div className={styles.interviewerAvatar}>
              <UserCheck size={22} />
            </div>
            <div className={styles.interviewerBubble}>
              <div className={styles.interviewerLabel}>Interviewer Asks:</div>
              <div className={styles.interviewerSpeech}>{interviewerText}</div>
              {thoughtText && (
                <div className={styles.interviewerThought}>
                  💡 <strong>Candidate reflection:</strong> {thoughtText}
                </div>
              )}
            </div>
          </div>
        )}

        <h3 className={styles.questionPrompt}>
          {question || "How should you classify this interview question?"}
        </h3>

        <div className={styles.optionsContainer}>
          {options && options.map((opt: { id: string; text: string }) => {
            const isThisSelected = selectedId === opt.id;
            let btnClass = styles.optionBtn;

            if (submitted) {
              if (opt.id === correctId) {
                btnClass += ` ${styles.optionBtnCorrect}`;
              } else if (isThisSelected) {
                btnClass += ` ${styles.optionBtnIncorrect}`;
              }
            } else if (isThisSelected) {
              btnClass += ` ${styles.optionBtnSelected}`;
            }

            return (
              <button
                key={opt.id}
                className={btnClass}
                onClick={() => handleSelect(opt.id)}
              >
                <span>{opt.text}</span>
                {submitted && opt.id === correctId && <CheckCircle2 size={18} color="#10B981" />}
                {submitted && isThisSelected && opt.id !== correctId && <AlertCircle size={18} color="#EF4444" />}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className={`${styles.feedbackBanner} ${isCorrect ? styles.feedbackSuccess : styles.feedbackError}`}>
            {isCorrect ? (
              <>
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Spot on!</strong> {feedbackCorrect || "Great observation."}
                </div>
              </>
            ) : (
              <>
                <AlertCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Not quite.</strong> {feedbackIncorrect || "Think about past versus future."}
                </div>
              </>
            )}
          </div>
        )}

        {submitted && (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={onNext}
              style={{
                background: '#2563EB',
                color: 'white',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioScene;
