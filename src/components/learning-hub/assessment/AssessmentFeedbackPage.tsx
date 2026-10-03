import React, { useState } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Play, 
  Pause, 
  Copy, 
  Maximize2,
  Volume2, 
  Code as CodeIcon, 
  MessageSquare, 
  FileText,
  CheckSquare,
  Link2,
  ListOrdered,
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';
import type { AssessmentItem } from '../../../types/assessment';
import type { PracticeQuestionFeedbackItem } from '../../../types/practice';
import { generateAssessmentFeedbackItems } from '../../../data/assessmentData';
import styles from './AssessmentFeedbackPage.module.css';

interface AssessmentFeedbackPageProps {
  assessment: AssessmentItem;
  feedbackItems?: PracticeQuestionFeedbackItem[];
  score?: number;
  accuracy?: number;
  timeTakenMinutes?: number;
  onBack: () => void;
  onRetake?: () => void;
}

export const AssessmentFeedbackPage: React.FC<AssessmentFeedbackPageProps> = ({
  assessment,
  feedbackItems,
  score = assessment.score || 90,
  accuracy = assessment.accuracy || 90,
  timeTakenMinutes = assessment.timeSpentMinutes || 27,
  onBack,
  onRetake,
}) => {
  const items = feedbackItems && feedbackItems.length > 0 
    ? feedbackItems 
    : generateAssessmentFeedbackItems(assessment);

  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set(items.map((_, i) => i)));
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'wrong'>('all');
  const [audioPlayingId, setAudioPlayingId] = useState<string | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedCards(new Set(items.map((_, i) => i)));
  };

  const collapseAll = () => {
    setExpandedCards(new Set());
  };

  const copyCode = (codeText?: string) => {
    if (codeText && navigator.clipboard) {
      navigator.clipboard.writeText(codeText);
    }
  };

  const correctCount = items.filter(i => i.isCorrect).length;
  const incorrectCount = items.length - correctCount;

  const filteredItems = items.filter(item => {
    if (filterType === 'correct') return item.isCorrect;
    if (filterType === 'wrong') return !item.isCorrect;
    return true;
  });

  return (
    <div className={styles.pageContainer}>
      {/* 1. TOP BAR ROW */}
      <div className={styles.topBar}>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Assessments</span>
        </button>

        {onRetake && (
          <button type="button" className={styles.retakeBtn} onClick={onRetake}>
            <RotateCcw size={15} />
            <span>Retake Assessment</span>
          </button>
        )}
      </div>

      {/* 2. OVERALL RESULT BANNER (Matches Screenshot 3) */}
      <div className={styles.resultBanner}>
        <div className={styles.bannerHeaderRow}>
          <div className={styles.bannerInfoLeft}>
            <span className={styles.bannerTag}>ASSESSMENT FEEDBACK</span>
            <h1 className={styles.assessmentName}>{assessment.name}</h1>
            <div className={styles.metaRow}>
              <span className={styles.completedPill}>Completed</span>
              <span className={styles.metaDot}>&bull;</span>
              <span className={styles.metaText}>{assessment.totalQuestions || 20} Questions</span>
              <span className={styles.metaDot}>&bull;</span>
              <span className={styles.metaText}>{correctCount} Correct</span>
              <span className={styles.metaDot}>&bull;</span>
              <span className={styles.metaText}>{score}% Score</span>
              <span className={styles.metaDot}>&bull;</span>
              <span className={styles.metaText}>{timeTakenMinutes} min</span>
              <span className={styles.metaDot}>&bull;</span>
              <span className={styles.metaText}>Completed: {assessment.completedDate || '28 Sep 2026'}</span>
            </div>
          </div>

          {/* Deep blue glowing overall score badge */}
          <div className={styles.scoreCircle}>
            <span className={styles.scorePercent}>{score}%</span>
            <span className={styles.scoreSubLabel}>OVERALL SCORE</span>
          </div>
        </div>

        {/* 4-Metric Strip */}
        <div className={styles.metricsStrip}>
          <div className={styles.metricCell}>
            <span className={styles.metricVal}>{correctCount} / {assessment.totalQuestions || 20}</span>
            <span className={styles.metricLbl}>CORRECT ANSWERS</span>
          </div>
          <div className={styles.stripDivider} />
          <div className={styles.metricCell}>
            <span className={styles.metricVal}>{accuracy}%</span>
            <span className={styles.metricLbl}>ACCURACY</span>
          </div>
          <div className={styles.stripDivider} />
          <div className={styles.metricCell}>
            <span className={styles.metricVal}>{timeTakenMinutes} min</span>
            <span className={styles.metricLbl}>TIME TAKEN</span>
          </div>
          <div className={styles.stripDivider} />
          <div className={styles.metricCell}>
            <span className={styles.metricVal}>{assessment.totalQuestions || 20}</span>
            <span className={styles.metricLbl}>QUESTIONS</span>
          </div>
        </div>
      </div>

      {/* 3. QUESTION-WISE FEEDBACK HEADING ROW */}
      <div className={styles.sectionHeadingRow}>
        <div>
          <h2 className={styles.sectionHeading}>Question-wise Feedback</h2>
          <p className={styles.sectionSub}>Detailed explanations, candidate action evaluations, and rubric breakdowns.</p>
        </div>

        <div className={styles.filterExpandControls}>
          <div className={styles.pillFilterGroup}>
            <button
              type="button"
              className={`${styles.filterPill} ${filterType === 'all' ? styles.filterPillActive : ''}`}
              onClick={() => setFilterType('all')}
            >
              All ({items.length})
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${filterType === 'correct' ? styles.filterPillActive : ''}`}
              onClick={() => setFilterType('correct')}
            >
              Correct ({correctCount})
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${filterType === 'wrong' ? styles.filterPillActive : ''}`}
              onClick={() => setFilterType('wrong')}
            >
              Needs Review ({incorrectCount})
            </button>
          </div>

          <div className={styles.expandAllButtons}>
            <button type="button" className={styles.expandTextBtn} onClick={expandAll}>Expand All</button>
            <span>&bull;</span>
            <button type="button" className={styles.expandTextBtn} onClick={collapseAll}>Collapse All</button>
          </div>
        </div>
      </div>

      {/* 4. QUESTIONS FEEDBACK LIST */}
      <div className={styles.questionsList}>
        {filteredItems.map((q, idx) => {
          const isExpanded = expandedCards.has(idx);

          return (
            <div key={q.id || idx} className={styles.questionCard}>
              {/* Question Header Bar */}
              <div className={styles.cardHeader} onClick={() => toggleExpand(idx)}>
                <div className={styles.headerLeftArea}>
                  <span className={styles.qIndexBadge}>Question {q.questionNumber || idx + 1}</span>
                  {q.bloomBadge && <span className={styles.bloomBadge}>{q.bloomBadge}</span>}
                  {q.points && <span className={styles.pointsBadge}>{q.points}</span>}
                </div>

                <div className={styles.headerRightArea}>
                  <span className={q.isCorrect ? styles.statusPillRight : styles.statusPillWrong}>
                    {q.isCorrect ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                    <span>{q.isCorrect ? 'CORRECT' : 'INCORRECT'}</span>
                  </span>
                  <button type="button" className={styles.toggleCaretBtn} aria-label="Toggle card">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Question Prompt */}
              <div className={styles.promptArea}>
                <h3 className={styles.promptHeading}>{q.prompt}</h3>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className={styles.cardBody}>
                  {/* Additional Context or Code Snippet */}
                  {q.additionalContext?.code && (
                    <div className={styles.contextContainer}>
                      <span className={styles.contextSubtitle}>Additional Context ({q.additionalContext.language || 'XML'})</span>
                      <pre className={styles.codePre}>
                        <code>{q.additionalContext.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Case Context for Scenario */}
                  {q.context && (
                    <div className={styles.scenarioContextCallout}>
                      <span className={styles.scenarioCalloutBadge}>CASE CONTEXT</span>
                      <p className={styles.scenarioCalloutText}>{q.context}</p>
                    </div>
                  )}

                  {/* Question Type: MCQ & Scenario */}
                  {(q.type === 'mcq' || q.type === 'single-select' || q.type === 'scenario') && q.options && (
                    <div className={styles.optionsFeedbackList}>
                      {q.options.map((opt, optIdx) => {
                        const letter = opt.letter || String.fromCharCode(65 + optIdx);
                        const isStudentAnswer = q.studentAnswer === opt.id || q.studentAnswer === opt.text || q.studentAnswer === letter;
                        const isCorrectAnswer = q.correctAnswer === opt.id || q.correctAnswer === opt.text || q.correctAnswer === letter;

                        return (
                          <div 
                            key={opt.id || optIdx}
                            className={`${styles.optionFeedbackCard} ${isCorrectAnswer ? styles.optionCorrect : (isStudentAnswer ? styles.optionWrong : '')}`}
                          >
                            <div className={styles.optionLeft}>
                              <div className={`${styles.letterBadge} ${isCorrectAnswer ? styles.letterCorrect : (isStudentAnswer ? styles.letterWrong : '')}`}>
                                {letter}
                              </div>
                              <span className={styles.optionText}>{opt.text}</span>
                            </div>

                            {/* Badge matching Screenshot 3 */}
                            {isCorrectAnswer && isStudentAnswer && (
                              <span className={styles.statusPillRight}>
                                <Check size={11} strokeWidth={3} />
                                <span>YOUR CHOICE</span>
                              </span>
                            )}
                            {isCorrectAnswer && !isStudentAnswer && (
                              <span className={styles.statusPillRight}>
                                <Check size={11} strokeWidth={3} />
                                <span>CORRECT ANSWER</span>
                              </span>
                            )}
                            {!isCorrectAnswer && isStudentAnswer && (
                              <span className={styles.statusPillWrong}>
                                <X size={11} strokeWidth={3} />
                                <span>YOUR CHOICE</span>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Question Type: Multi-Select */}
                  {q.type === 'multi-select' && q.options && (() => {
                    const studentArr = Array.isArray(q.studentAnswer) ? q.studentAnswer : [q.studentAnswer];
                    const correctArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];

                    return (
                      <div className={styles.optionsFeedbackList}>
                        {q.options.map(opt => {
                          const isSelected = studentArr.some((s: string) => s === opt.id || s === opt.text);
                          const isCorrect = correctArr.some((c: string) => c === opt.id || c === opt.text);

                          return (
                            <div 
                              key={opt.id}
                              className={`${styles.optionFeedbackCard} ${isSelected && isCorrect ? styles.optionCorrect : (isSelected && !isCorrect ? styles.optionWrong : '')}`}
                            >
                              <div className={styles.optionLeft}>
                                <div className={`${styles.checkboxBadge} ${isSelected ? styles.checkboxActive : ''}`}>
                                  {isSelected && <Check size={12} strokeWidth={3} />}
                                </div>
                                <span className={styles.optionText}>{opt.text}</span>
                              </div>

                              {isSelected && isCorrect && (
                                <span className={styles.statusPillRight}>
                                  <Check size={11} strokeWidth={3} />
                                  <span>YOUR CHOICE</span>
                                </span>
                              )}
                              {isSelected && !isCorrect && (
                                <span className={styles.statusPillWrong}>
                                  <X size={11} strokeWidth={3} />
                                  <span>YOUR CHOICE</span>
                                </span>
                              )}
                              {!isSelected && isCorrect && (
                                <span className={styles.statusPillMissed}>
                                  <span>MISSED ANSWER</span>
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Question Type: True / False */}
                  {q.type === 'true-false' && (
                    <div className={styles.tfFeedbackRow}>
                      <div className={`${styles.tfFeedbackBox} ${String(q.correctAnswer).toLowerCase() === 'true' ? styles.optionCorrect : ''}`}>
                        <div>
                          <strong className={styles.tfTitle}>TRUE</strong>
                          <span className={styles.tfDesc}>{String(q.correctAnswer).toLowerCase() === 'true' ? 'Verified Statement' : ''}</span>
                        </div>
                        {String(q.studentAnswer).toLowerCase() === 'true' && (
                          <span className={styles.statusPillRight}>
                            <Check size={10} strokeWidth={3} />
                            <span>YOUR CHOICE</span>
                          </span>
                        )}
                      </div>
                      <div className={`${styles.tfFeedbackBox} ${String(q.correctAnswer).toLowerCase() === 'false' ? styles.optionCorrect : ''}`}>
                        <div>
                          <strong className={styles.tfTitle}>FALSE</strong>
                          <span className={styles.tfDesc}>{String(q.correctAnswer).toLowerCase() === 'false' ? 'Statement is Inaccurate' : ''}</span>
                        </div>
                        {String(q.studentAnswer).toLowerCase() === 'false' && (
                          <span className={styles.statusPillRight}>
                            <Check size={10} strokeWidth={3} />
                            <span>YOUR CHOICE</span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Question Type: Matching Pairs */}
                  {q.type === 'matching' && q.matchingPairs && (
                    <div className={styles.matchingFeedbackList}>
                      {q.matchingPairs.map((pair, pIdx) => (
                        <div key={pIdx} className={styles.matchingFeedbackCard}>
                          <div className={styles.matchingPrompt}>
                            <span className={styles.matchingIndex}>{pIdx + 1}</span>
                            <span>{pair.prompt}</span>
                          </div>
                          <span className={styles.matchingArrow}>➔</span>
                          <div className={styles.matchingResult}>
                            <span className={styles.matchedVal}>{pair.studentMatch}</span>
                          </div>
                          <span className={styles.statusPillRight}>
                            <Check size={10} strokeWidth={3} />
                            <span>MATCHED</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Question Type: Ordering */}
                  {q.type === 'ordering' && (
                    <div className={styles.orderingWrapper}>
                      <span className={styles.orderingColHeading}>Your Submitted Sequence</span>
                      <div className={styles.orderingStack}>
                        {(q.orderingItems?.studentOrder || ['1. Active Listening & Intent Decoding', '2. Intentional 2-Second Strategic Pause', '3. Crisp Headline / Direct Answer', '4. Structured Evidence (STAR / PREP) & Impact']).map((step, sIdx) => (
                          <div key={sIdx} className={styles.orderingCardCorrect}>
                            <div className={styles.orderPosNum}>{sIdx + 1}</div>
                            <span className={styles.orderStepText}>{step.replace(/^\d+\.\s*/, '')}</span>
                            <span className={styles.statusPillRight}>
                              <Check size={10} strokeWidth={3} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question Type: Code */}
                  {q.type === 'code' && (
                    <div className={styles.codeFeedbackContainer}>
                      <div className={styles.codeHeaderRow}>
                        <span className={styles.codeBlockHeader}>Your Solution | {q.codeData?.language || 'JAVASCRIPT'}</span>
                        <button 
                          type="button" 
                          className={styles.copyBtn} 
                          onClick={() => copyCode(q.codeData?.studentCode || 'function solution() { ... }')}
                        >
                          <Copy size={13} />
                          <span>Copy</span>
                        </button>
                      </div>
                      <pre className={styles.codePre}>
                        <code>{q.codeData?.studentCode || 'function solution() { ... }'}</code>
                      </pre>
                    </div>
                  )}

                  {/* Question Type: Text */}
                  {q.type === 'text' && (
                    <div className={styles.textResponseBox}>
                      <span className={styles.textResponseLabel}>Your Submitted Response:</span>
                      <p className={styles.textResponseContent}>{q.studentAnswer}</p>
                    </div>
                  )}

                  {/* Question Type: Audio */}
                  {q.type === 'audio' && (
                    <div className={styles.audioFeedbackBox}>
                      <div className={styles.audioPlayerRow}>
                        <button 
                          type="button" 
                          className={styles.audioPlayBtn}
                          onClick={() => setAudioPlayingId(audioPlayingId === q.id ? null : q.id)}
                        >
                          {audioPlayingId === q.id ? <Pause size={14} /> : <Play size={14} fill="#FFFFFF" />}
                        </button>
                        <span className={styles.audioTimerText}>0:45</span>
                        <div className={styles.audioWaveTrack}>
                          <div className={styles.audioWaveFill} style={{ width: '45%' }} />
                        </div>
                        <span className={styles.audioTimerText}>1:02</span>
                      </div>
                      {q.audioData?.transcript && (
                        <div className={styles.transcriptBox}>
                          <span className={styles.transcriptLabel}>Audio Transcript:</span>
                          <p className={styles.transcriptText}>{q.audioData.transcript}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Question Type: Image Rubric */}
                  {q.type === 'image' && q.image && (
                    <div className={styles.imageFeedbackContainer}>
                      <div className={styles.rubricImgBox}>
                        <img src={q.image} alt="Rubric Evaluation Visual" className={styles.feedbackRubricImg} />
                      </div>
                    </div>
                  )}

                  {/* 5. AI EVALUATOR FEEDBACK (Matches Screenshot 3) */}
                  <div className={styles.aiFeedbackCard}>
                    <div className={styles.aiHeader}>
                      <Sparkles size={14} className={styles.sparkleIcon} />
                      <span>AI EVALUATOR FEEDBACK</span>
                    </div>
                    <p className={styles.aiFeedbackText}>
                      {q.aiFeedback || q.explanation || 'Your answer correctly identifies the core principles and evaluation criteria.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentFeedbackPage;

