import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './StudyCards.module.css';

interface InteractiveChoiceSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const InteractiveChoiceScene: React.FC<InteractiveChoiceSceneProps> = ({ scene, onComplete, onNext }) => {
  const { subtopic, prompt, question, options, correctId, feedbackCorrect, feedbackIncorrect } = scene.content || {};

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSubmitted(true);
    onComplete(); // Unlocks next scene button immediately upon answering
  };

  const isCorrect = selectedId === correctId;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.badgeRow}>
          <HelpCircle size={15} />
          <span>{subtopic || `INTERACTIVE PRACTICE • ${scene.title.toUpperCase()}`}</span>
        </div>

        {prompt && (
          <div className={styles.quoteBox}>
            <span className={styles.quoteMark}>“</span>
            <span>{prompt.replace(/^[“"']|[”"']$/g, '')}</span>
            <span className={styles.quoteMark}>”</span>
          </div>
        )}

        <h3 className={styles.questionPrompt}>{question || "Choose the best answer:"}</h3>

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
                  <strong>Correct!</strong> {feedbackCorrect || "Great job identifying the question type."}
                </div>
              </>
            ) : (
              <>
                <AlertCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Not quite.</strong> {feedbackIncorrect || "Review the keywords to understand the intent."}
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

export default InteractiveChoiceScene;
