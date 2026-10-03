import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import scene2Img from '../../../assets/learning-hub/scene-2.png';
import scene1Img from '../../../assets/learning-hub/scene-1.png';
import styles from './IllustratedScenarioScene.module.css';

import { useListen } from '../audio/ListenContext';

interface IllustratedScenarioSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const IllustratedScenarioScene: React.FC<IllustratedScenarioSceneProps> = ({
  scene,
  onComplete,
  onNext,
}) => {
  const content = scene.content || {};
  const { activeElementId, loadScene, isListening, notifyInteractionComplete } = useListen();

  // Load narration for current scene
  React.useEffect(() => {
    loadScene(scene, isListening);
  }, [scene, loadScene, isListening]);

  // Extract text for bubbles, handling both scenario and dialogue schemas
  let interviewerText = content.interviewerText;
  let thoughtText = content.thoughtText;

  if (!interviewerText && content.dialogue) {
    const intLine = content.dialogue.find((d: any) => d.speaker === 'interviewer');
    if (intLine) interviewerText = intLine.text;
  }

  if (!thoughtText && content.dialogue) {
    const candLine = content.dialogue.find((d: any) => d.speaker === 'candidate');
    if (candLine) thoughtText = candLine.text;
  }

  const subtopic = content.subtopic || 'INTERACTIVE SCENARIO • INTERVIEW SIMULATION';
  const question = content.question || content.prompt || 'How should you classify this interview question?';
  const options = content.options || [];
  const correctId = content.correctId;
  const feedbackCorrect = content.feedbackCorrect || 'Correct! Great observation.';
  const feedbackIncorrect = content.feedbackIncorrect || 'Review the phrasing to identify the core intent.';

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSubmitted(true);
    onComplete();

    // If Listen mode is active, narrate the explanation feedback!
    if (isListening) {
      const feedback = id === correctId 
        ? `Correct! ${feedbackCorrect}` 
        : `Not quite. ${feedbackIncorrect}`;
      notifyInteractionComplete(feedback);
    }
  };

  const isCorrect = selectedId === correctId;
  const bgImage = scene.backgroundAsset === 'scene-1' ? scene1Img : scene2Img;

  const isInterviewerActive = activeElementId === 'interviewer-bubble';
  const isCandidateActive = activeElementId === 'candidate-bubble';
  const isQuestionActive = activeElementId === 'question-card';

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url("${bgImage}")` }}
    >
      {/* 1. Interviewer Speech Bubble (Left) */}
      {interviewerText && (
        <div 
          className={styles.interviewerBubbleWrapper}
          data-listen-id="interviewer-bubble"
        >
          <div className={`${styles.speechBubble} ${isInterviewerActive ? styles.speechBubbleActiveInterviewer : ''}`}>
            {interviewerText.replace(/^[“"']|[”"']$/g, '')}
            <div className={styles.speechBubbleTail} />
          </div>
          <div className={styles.interviewerBadgeRow}>
            <div className={styles.badgeCircleI}>I</div>
            <span className={styles.badgeLabel}>Interviewer asks:</span>
          </div>
        </div>
      )}

      {/* 2. Candidate Thought Bubble (Right) */}
      {thoughtText && (
        <div 
          className={styles.candidateBubbleWrapper}
          data-listen-id="candidate-bubble"
        >
          <div className={`${styles.speechBubble} ${isCandidateActive ? styles.speechBubbleActiveCandidate : ''}`}>
            {thoughtText.replace(/^[“"']|[”"']$/g, '')}
            <div className={styles.candidateBubbleTail} />
          </div>
          <div className={styles.candidateBadgeRow}>
            <span className={styles.badgeLabel}>Candidate thinks:</span>
            <div className={styles.badgeCircleC}>C</div>
          </div>
        </div>
      )}

      {/* 3. Center Interactive Question Card */}
      <div 
        className={`${styles.centerQuestionCard} ${isQuestionActive ? styles.centerQuestionCardActive : ''}`}
        data-listen-id="question-card"
      >
        <div className={styles.cardTag}>
          <span className={styles.tagSquareIcon} />
          <span>{subtopic}</span>
        </div>

        <h2 className={styles.cardHeading}>{question}</h2>

        <div className={styles.optionsList}>
          {options.map((opt: { id: string; text: string }) => {
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
                type="button"
              >
                <span>{opt.text}</span>
                {submitted && opt.id === correctId && (
                  <CheckCircle2 size={18} color="#10B981" />
                )}
                {submitted && isThisSelected && opt.id !== correctId && (
                  <AlertCircle size={18} color="#EF4444" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Banner */}
        {submitted && (
          <div
            className={`${styles.feedbackBanner} ${
              isCorrect ? styles.feedbackSuccess : styles.feedbackError
            }`}
            data-listen-id="feedback-banner"
          >
            {isCorrect ? (
              <>
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 2 }} color="#10B981" />
                <div>
                  <strong style={{ fontSize: '14.5px', color: '#065F46' }}>Correct!</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#047857' }}>{feedbackCorrect}</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} color="#EF4444" />
                <div>
                  <strong style={{ fontSize: '14.5px', color: '#991B1B' }}>Not quite.</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#B91C1C' }}>{feedbackIncorrect}</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Continue Button */}
        {submitted && (
          <button
            className={styles.continueBtn}
            onClick={onNext}
            type="button"
          >
            {isListening ? 'Continue Listening' : 'Continue Learning'} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default IllustratedScenarioScene;
