import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, AlertCircle, ArrowRight, User, UserCheck, Sparkles, Lightbulb } from 'lucide-react';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import avatarImg from '../../../assets/learning-hub/avatar.png';
import styles from './StudyCards.module.css';

interface ConversationActivitySceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const ConversationActivityScene: React.FC<ConversationActivitySceneProps> = ({ scene, onComplete, onNext }) => {
  const { subtopic, dialogue, prompt, instruction, options, correctId, feedbackCorrect, feedbackIncorrect } = scene.content || {};

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSubmitted(true);
    onComplete();
  };

  const isCorrect = selectedId === correctId;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.wideLayout}>
        {/* Main Conversation Interactive Card */}
        <div className={styles.mainStudyCard}>
          <div className={styles.badgeRow}>
            <div className={styles.badgeLeft}>
              <MessageSquare size={15} />
              <span>{subtopic || "INTERACTIVE CONVERSATION ACTIVITY"}</span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#7C3AED', background: '#F5F3FF', padding: '4px 10px', borderRadius: '999px' }}>
              LISTEN → THINK → CHOOSE
            </span>
          </div>

          <h2 className={styles.cardTitle} style={{ fontSize: '24px', marginBottom: '18px' }}>
            Real-Life Interview Dialogue
          </h2>

          {/* Two-Character Conversation Dialogue Stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {dialogue && dialogue.map((line: any, idx: number) => {
              const isInterviewer = line.speaker === 'interviewer';

              return (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    background: isInterviewer ? '#F8FAFC' : (line.isThought ? '#EFF6FF' : '#F0FDF4'),
                    border: `1.5px solid ${isInterviewer ? '#E2E8F0' : (line.isThought ? '#BFDBFE' : '#BBF7D0')}`,
                    borderRadius: '16px',
                    padding: '16px 20px',
                    alignSelf: isInterviewer ? 'flex-start' : 'flex-end',
                    maxWidth: '92%'
                  }}
                >
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: isInterviewer ? '#0F172A' : (line.isThought ? '#2563EB' : '#16A34A'),
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {isInterviewer ? <UserCheck size={20} /> : <User size={20} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: isInterviewer ? '#475569' : (line.isThought ? '#2563EB' : '#16A34A'), textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {line.speakerName}
                      </span>
                      {line.isThought && (
                        <span style={{ fontSize: '11px', color: '#64748B', fontStyle: 'italic' }}>(Internal reflection)</span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: '16.5px', fontWeight: 600, color: '#0F172A', lineHeight: 1.45 }}>
                      {line.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Question Section */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
              {instruction || "Interpret the conversation above:"}
            </div>
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>
              {prompt}
            </h3>

            <div className={styles.optionsContainer}>
              {options && options.map((opt: { id: string; text: string }) => {
                const isSelected = selectedId === opt.id;
                let btnClass = styles.optionBtn;

                if (submitted) {
                  if (opt.id === correctId) {
                    btnClass += ` ${styles.optionBtnCorrect}`;
                  } else if (isSelected) {
                    btnClass += ` ${styles.optionBtnIncorrect}`;
                  }
                } else if (isSelected) {
                  btnClass += ` ${styles.optionBtnSelected}`;
                }

                return (
                  <button
                    key={opt.id}
                    className={btnClass}
                    onClick={() => handleSelect(opt.id)}
                  >
                    <span>{opt.text}</span>
                    {submitted && opt.id === correctId && <CheckCircle2 size={20} color="#10B981" />}
                    {submitted && isSelected && opt.id !== correctId && <AlertCircle size={20} color="#EF4444" />}
                  </button>
                );
              })}
            </div>

            {/* Inline Feedback Banner */}
            {submitted && (
              <div className={`${styles.feedbackBanner} ${isCorrect ? styles.feedbackSuccess : styles.feedbackError}`}>
                {isCorrect ? (
                  <>
                    <CheckCircle2 size={22} style={{ flexShrink: 0, marginTop: 2 }} color="#065F46" />
                    <div>
                      <strong style={{ fontSize: '15.5px' }}>Correct!</strong>
                      <p style={{ margin: '4px 0 0 0' }}>{feedbackCorrect}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle size={22} style={{ flexShrink: 0, marginTop: 2 }} color="#991B1B" />
                    <div>
                      <strong style={{ fontSize: '15.5px' }}>Not quite.</strong>
                      <p style={{ margin: '4px 0 0 0' }}>{feedbackIncorrect}</p>
                    </div>
                  </>
                )}
              </div>
            )}

            {submitted && (
              <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={onNext}
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '15px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                  }}
                >
                  Continue Learning <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationActivityScene;
