import React, { useState, useEffect } from 'react';
import type { ConceptCheckQuestion } from '../../../data/lessons/questionUnderstanding';
import styles from './ConceptCheckEngine.module.css';
import QuestionRenderer from './QuestionRenderer';
import { X, ArrowRight, ArrowLeft, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { useListen } from '../audio/ListenContext';

interface ConceptCheckEngineProps {
  topicTitle: string;
  questions: ConceptCheckQuestion[];
  onComplete: () => void;
  onExit: () => void;
}

type Phase = 'question' | 'feedback' | 'completion' | 'review';

// Educational hints, hidden intent & keyword cues for each question
const questionMetadata: Record<string, { intent: string; cues: string[] }> = {
  'cc-1': {
    intent: "The interviewer wants verifiable evidence of how you resolve interpersonal friction in real workplace settings.",
    cues: ["Past Experience", "Verifiable Track Record", "STAR Framework"]
  },
  'cc-2': {
    intent: "Testing your ability to recognize prospective 'what-if' problems versus retrospective past stories.",
    cues: ["“What would you do if...”", "“How would you handle...”", "Hypothetical Dilemma"]
  },
  'cc-3': {
    intent: "Validating your fundamental understanding of situational vs behavioral boundaries.",
    cues: ["Future Hypothetical", "Critical Thinking", "Not Past Actions"]
  },
  'cc-4': {
    intent: "Evaluating rapid verbal cue recognition to trigger matching answering frameworks instantly.",
    cues: ["Rapid Categorization", "4 Core Categories", "Framework Trigger"]
  },
  'cc-5': {
    intent: "Confirming mastery of situational questioning goals: examining problem-solving logic under uncertainty.",
    cues: ["Future Scenarios", "Risk Analysis", "Structured Logic"]
  },
  'cc-6': {
    intent: "Ensuring you know why structured storytelling (STAR) is critical for behavioral questions.",
    cues: ["STAR Method", "60% Personal Action", "Quantified Results"]
  },
  'cc-7': {
    intent: "Assessing maturity and collaboration: seeking data, evaluating trade-offs, and constructive dialogue.",
    cues: ["Trade-off Analysis", "Objective Data", "Collaborative De-escalation"]
  },
  'cc-8': {
    intent: "Testing chronological execution from the moment a question is spoken to delivery.",
    cues: ["1. Listen → 2. Categorize → 3. Framework → 4. Deliver"]
  },
  'cc-9': {
    intent: "Mapping answering strategies along the Real vs Hypothetical and Past vs Future spectrum.",
    cues: ["Quadrant A", "Verifiable Track Record", "STAR Evidence"]
  },
  'cc-10': {
    intent: "Assessing career ambition, self-reflection, and alignment with company trajectory.",
    cues: ["Personal Motivation", "Professional Growth", "Long-term Fit"]
  }
};

const ConceptCheckEngine: React.FC<ConceptCheckEngineProps> = ({ topicTitle, questions, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [checkedResults, setCheckedResults] = useState<Record<number, boolean>>({});

  const { isListening, stopListening } = useListen();

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex] ?? null;

  // Stop any active audio narration upon entering concept check
  useEffect(() => {
    if (isListening) {
      stopListening();
    }
  }, [isListening, stopListening]);

  const handleExit = () => {
    stopListening();
    onExit();
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  const meta = questionMetadata[currentQuestion.id] || {
    intent: "Assessing core question understanding and framework selection.",
    cues: ["Interview Framework", "Intent Decoding"]
  };

  const checkIsCorrect = (q: ConceptCheckQuestion, answer: any): boolean => {
    if (answer === null || answer === undefined) return false;
    if (q.type === 'multi-select') {
      if (!Array.isArray(answer)) return false;
      const sortedAns = [...answer].sort();
      const sortedCorr = [...(q.correctAnswer as string[])].sort();
      return JSON.stringify(sortedAns) === JSON.stringify(sortedCorr);
    }
    if (q.type === 'matching') {
      if (typeof answer !== 'object') return false;
      const expected = q.correctAnswer as Record<string, string>;
      return Object.keys(expected).every(k => answer[k] === expected[k]);
    }
    if (q.type === 'ordering') {
      if (!Array.isArray(answer)) return false;
      return JSON.stringify(answer) === JSON.stringify(q.correctAnswer);
    }
    return answer === q.correctAnswer;
  };

  const getCorrectAnswerText = (q: ConceptCheckQuestion): string => {
    if (q.type === 'true-false') {
      return q.correctAnswer === 'true' ? 'TRUE' : 'FALSE';
    }
    if (q.type === 'multi-select' && Array.isArray(q.correctAnswer)) {
      return q.options?.filter(o => q.correctAnswer.includes(o.id)).map(o => o.text).join(' & ') || '';
    }
    if (q.type === 'matching') {
      return 'All 4 prompt stems matched to their respective categories';
    }
    if (q.type === 'ordering') {
      return '1. Listen → 2. Identify Category → 3. Framework → 4. Deliver';
    }
    if (q.type === 'likert') {
      return '5 (Strongly Agree)';
    }
    const match = q.options?.find(o => o.id === q.correctAnswer);
    return match ? match.text : String(q.correctAnswer);
  };

  const handleSelectAnswer = (ans: any) => {
    if (phase === 'feedback' || phase === 'review') return;
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: ans
    }));
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      const isRight = checkIsCorrect(currentQuestion, selectedAnswer);
      setCheckedResults(prev => ({
        ...prev,
        [currentIndex]: isRight
      }));
      setPhase('feedback');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setPhase(checkedResults[nextIdx] !== undefined ? 'feedback' : 'question');
    } else {
      setPhase('completion');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      if (phase !== 'review') {
        setPhase(checkedResults[prevIdx] !== undefined ? 'feedback' : 'question');
      }
    }
  };

  const handleJumpToQuestion = (targetIdx: number) => {
    if (targetIdx >= 0 && targetIdx < questions.length) {
      setCurrentIndex(targetIdx);
      if (phase !== 'review') {
        setPhase(checkedResults[targetIdx] !== undefined ? 'feedback' : 'question');
      }
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setCheckedResults({});
    setCurrentIndex(0);
    setPhase('question');
  };

  const handleInlineRetry = () => {
    // Allows specific questions (like matching) to break out of feedback mode and try again
    setPhase('question');
    setCheckedResults(prev => {
      const next = { ...prev };
      delete next[currentIndex];
      return next;
    });
  };

  // Calculate score safely
  const rawScore = Object.values(checkedResults).filter(Boolean).length;
  const score = Math.min(rawScore, questions.length);
  const accuracy = Math.min(Math.round((score / questions.length) * 100) || 0, 100);
  const passed = accuracy >= 80;

  // Type labels map with colors
  const typeBadgeConfig: Record<string, { label: string; color: string; bg: string }> = {
    'single-select': { label: 'Single Select', color: '#2563EB', bg: '#EFF6FF' },
    'multi-select': { label: 'Multi Select', color: '#7C3AED', bg: '#F5F3FF' },
    'true-false': { label: 'True / False', color: '#059669', bg: '#ECFDF5' },
    'matching': { label: 'Matching / Pairing', color: '#D97706', bg: '#FFFBEB' },
    'dropdown': { label: 'Inline Dropdown', color: '#0284C7', bg: '#F0F9FF' },
    'likert': { label: 'Likert Scale (1–5)', color: '#E11D48', bg: '#FFF1F2' },
    'scenario': { label: 'Scenario Based', color: '#4F46E5', bg: '#EEF2FF' },
    'ordering': { label: 'Ordering / Sequencing', color: '#EA580C', bg: '#FFF7ED' },
    'image': { label: 'Framework Matrix', color: '#0D9488', bg: '#F0FDFA' }
  };

  const badgeInfo = typeBadgeConfig[currentQuestion.type] || { label: 'Question', color: '#2563EB', bg: '#EFF6FF' };
  const isCurrentCorrect = checkedResults[currentIndex] ?? false;
  
  let hasAnswerSelected = false;
  if (selectedAnswer !== null) {
    if (currentQuestion.type === 'matching') {
      const leftCount = currentQuestion.options?.filter(o => o.side === 'left').length || 0;
      hasAnswerSelected = typeof selectedAnswer === 'object' && Object.keys(selectedAnswer).length === leftCount;
    } else {
      hasAnswerSelected = (!Array.isArray(selectedAnswer) || selectedAnswer.length > 0) &&
        (typeof selectedAnswer !== 'object' || Object.keys(selectedAnswer).length > 0);
    }
  }

  // Result / Completion Screen
  if (phase === 'completion') {
    return (
      <div className={styles.overlay}>
        <div className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <button className={styles.exitButton} onClick={handleExit}>
              <X size={15} /> Exit
            </button>
            <div className={styles.topicTitle}>{topicTitle} • Assessment Summary</div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.resultModal}>
            <div className={styles.resultBadge}>
              {passed ? 'TOPIC MASTERY VERIFIED' : 'ASSESSMENT COMPLETED'}
            </div>
            <h2 className={styles.resultTitle}>{topicTitle}</h2>

            <p className={styles.resultMessage}>
              {passed 
                ? "You have demonstrated consistent understanding across all core question types and answering frameworks." 
                : "You have completed the scenario evaluation. Review any missed concepts or re-attempt to solidify your understanding."}
            </p>

            <div className={styles.scoreBanner}>
              <div className={styles.scoreItem}>
                <div className={styles.scoreItemLabel}>Score</div>
                <div className={styles.scoreValue}>{score} / {questions.length}</div>
              </div>
              <div className={styles.scoreDivider} />
              <div className={styles.scoreItem}>
                <div className={styles.scoreItemLabel}>Accuracy</div>
                <div className={styles.scorePercent}>{accuracy}%</div>
              </div>
              <div className={styles.scoreDivider} />
              <div className={styles.scoreItem}>
                <div className={styles.scoreItemLabel}>Outcome</div>
                <div className={styles.scoreStatus} style={{ color: passed ? '#059669' : '#D97706' }}>
                  {passed ? 'Mastery Achieved' : 'Review Recommended'}
                </div>
              </div>
            </div>

            <div className={styles.resultActions}>
              {passed ? (
                <>
                  <button 
                    className={styles.reviewBtn} 
                    onClick={() => {
                      setCurrentIndex(0);
                      setPhase('review');
                    }}
                  >
                    Review All Questions
                  </button>
                  <button className={styles.nextTopicBtn} onClick={onComplete}>
                    Next Topic <ArrowRight size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className={styles.reviewBtn} 
                    onClick={() => {
                      setCurrentIndex(0);
                      setPhase('review');
                    }}
                  >
                    Review Missed Questions
                  </button>
                  <button className={styles.retryBtn} onClick={handleRetry}>
                    <RotateCcw size={16} /> Retry Assessment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Assessment Screen (Two-Panel Layout with Human-Crafted Textbook Design)
  return (
    <div className={styles.overlay}>
      {/* Top Header */}
      <div className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.exitButton} onClick={handleExit}>
            <X size={15} /> Exit
          </button>
          <div className={styles.topicTitle}>{topicTitle} • Concept Check</div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.progressLabel}>
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className={styles.headerDots}>
            {questions.map((_, idx) => (
              <button 
                key={idx} 
                type="button"
                onClick={() => handleJumpToQuestion(idx)}
                className={`${styles.hDot} ${idx === currentIndex ? styles.hDotActive : ''} ${checkedResults[idx] !== undefined ? styles.hDotCompleted : ''}`} 
                title={`Go to Question ${idx + 1}`}
                aria-label={`Go to Question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area: Wide Two-Panel Layout */}
      <div className={styles.mainContent}>
        <div className={styles.twoPanelContainer}>
          
          {/* Left Panel: Question Context & Additional Content */}
          <div className={styles.leftPanel}>
            <div className={styles.panelBadgeRow}>
              <div className={styles.panelBadge}>
                <span>QUESTION – {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1}</span>
              </div>
              <span className={styles.modeBadge}>
                {phase === 'review' ? 'REVIEW MODE' : 'ASSESSMENT'}
              </span>
            </div>

            {/* Prominent Question / Scenario Statement */}
            {currentQuestion.context && (
              <div className={styles.contextQuoteBox}>
                <p className={styles.quoteText}>{currentQuestion.context}</p>
              </div>
            )}

            {/* Framework Matrix Diagram for Question 9 */}
            {currentQuestion.type === 'image' && (
              <div className={styles.matrixContainer}>
                <div className={styles.matrixHeader}>
                  <span>Interview Answering Framework Matrix</span>
                </div>
                <div className={styles.matrixGrid}>
                  <div className={`${styles.matrixCard} ${styles.matrixCardA}`}>
                    <div className={styles.matrixLabel}>Quadrant A</div>
                    <div className={styles.matrixTitle}>Past Evidence & Track Record</div>
                    <div className={styles.matrixDesc}>STAR Framework • Verifiable Actions & Results</div>
                  </div>
                  <div className={`${styles.matrixCard} ${styles.matrixCardB}`}>
                    <div className={styles.matrixLabel}>Quadrant B</div>
                    <div className={styles.matrixTitle}>Future Hypothetical Scenarios</div>
                    <div className={styles.matrixDesc}>Step-by-Step Logic • Risk & Trade-off Mitigation</div>
                  </div>
                  <div className={`${styles.matrixCard} ${styles.matrixCardC}`}>
                    <div className={styles.matrixLabel}>Quadrant C</div>
                    <div className={styles.matrixTitle}>Personal & Cultural Fit</div>
                    <div className={styles.matrixDesc}>Career Goals • Alignment & Work Values</div>
                  </div>
                  <div className={`${styles.matrixCard} ${styles.matrixCardD}`}>
                    <div className={styles.matrixLabel}>Quadrant D</div>
                    <div className={styles.matrixTitle}>Technical & Domain Depth</div>
                    <div className={styles.matrixDesc}>Architecture • Code • System Design Opinions</div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Content: Recruiter Intent & Clues */}
            <div className={styles.extraContentBox}>
              <div className={styles.extraHeader}>
                <span>Interviewer's Hidden Intent:</span>
              </div>
              <p className={styles.extraText}>{meta.intent}</p>
              
              <div className={styles.cuesTagRow}>
                <span className={styles.cuesLabel}>Keywords:</span>
                {meta.cues.map((cue, idx) => (
                  <span key={idx} className={styles.cueTag}>{cue}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Response Interaction */}
          <div className={styles.rightPanel}>
            <div className={styles.typeBadgeRow}>
              <div 
                className={styles.typeBadge}
                style={{ color: badgeInfo.color, background: badgeInfo.bg, borderColor: badgeInfo.color }}
              >
                {badgeInfo.label}
              </div>
              {phase === 'review' && (
                <div className={styles.statusIndicator} style={{ color: isCurrentCorrect ? '#10B981' : '#EF4444' }}>
                  {isCurrentCorrect ? '✓ Correct Answer' : '✕ Incorrect Answer'}
                </div>
              )}
            </div>

            <h3 className={styles.actionPrompt}>{currentQuestion.prompt}</h3>

            <div className={styles.interactionArea}>
              <QuestionRenderer 
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                onSelect={handleSelectAnswer}
                disabled={phase === 'feedback' || phase === 'review'}
                onInlineRetry={handleInlineRetry}
              />
            </div>

            {/* Compact Inline Feedback Banner */}
            {(phase === 'feedback' || phase === 'review') && (
              <div className={`${styles.feedbackBanner} ${isCurrentCorrect ? styles.feedbackBannerCorrect : styles.feedbackBannerIncorrect}`}>
                <div className={styles.feedbackHeader}>
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 size={20} color="#10B981" />
                      <span>Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={20} color="#EF4444" />
                      <span>Not quite</span>
                    </>
                  )}
                </div>
                <p className={styles.feedbackText}>{currentQuestion.explanation}</p>
                {!isCurrentCorrect && (
                  <div className={styles.correctAnswerRow}>
                    Correct answer: {getCorrectAnswerText(currentQuestion)}
                  </div>
                )}
                {phase === 'feedback' && (
                  <button 
                    className={styles.inlineRetryBtn}
                    type="button"
                    onClick={handleInlineRetry}
                  >
                    <RotateCcw size={14} /> Change / Re-attempt Answer
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Nav Bar (No Listen Option, Full Previous Question Navigation) */}
      <div className={styles.bottomNav}>
        <div className={styles.navLeft}>
          <button 
            className={styles.prevBtn} 
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ArrowLeft size={16} /> PREVIOUS QUESTION
          </button>
        </div>

        <div className={styles.navRight}>
          {phase === 'question' && (
            <button 
              className={styles.checkBtn}
              type="button"
              onClick={handleCheckAnswer}
              disabled={!hasAnswerSelected}
            >
              Check Answer <ArrowRight size={16} />
            </button>
          )}

          {(phase === 'feedback' || phase === 'review') && (
            <button 
              className={styles.nextBtn}
              type="button"
              onClick={phase === 'review' && currentIndex === questions.length - 1 ? () => setPhase('completion') : handleNext}
            >
              {currentIndex === questions.length - 1 
                ? (phase === 'review' ? 'Back to Results' : 'Submit Concept Check') 
                : 'NEXT QUESTION'} 
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptCheckEngine;
