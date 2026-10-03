import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Pause, 
  Copy, 
  Maximize2, 
  Check, 
  X,
  RotateCcw, 
  BookOpen, 
  Volume2, 
  Code, 
  MessageSquare, 
  FileText,
  CheckCircle2,
  CheckSquare,
  Link2,
  ListOrdered,
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';
import type { PracticeSetItem } from '../../../data/practicePageData';
import type { PracticeQuestionFeedbackItem } from '../../../types/practice';
import { SCREENSHOT_FEEDBACK_ITEMS } from '../../../data/practiceRunnerData';
import styles from './PracticeFeedbackPage.module.css';

interface PracticeFeedbackPageProps {
  practiceSet: PracticeSetItem;
  onBack: () => void;
  onRetry: (id: string) => void;
}

export const PracticeFeedbackPage: React.FC<PracticeFeedbackPageProps> = ({
  practiceSet,
  onBack,
  onRetry,
}) => {
  const [activeAttempt, setActiveAttempt] = useState<string>('ATTEMPT 1');
  const [isAttemptMenuOpen, setIsAttemptMenuOpen] = useState<boolean>(false);
  const [openContextIds, setOpenContextIds] = useState<Set<string>>(new Set());
  const [audioPlayingId, setAudioPlayingId] = useState<string | null>(null);


  // Use persistent questions on practice set if available, otherwise display SCREENSHOT_FEEDBACK_ITEMS
  const questions: PracticeQuestionFeedbackItem[] = React.useMemo(() => {
    if (practiceSet.questions && practiceSet.questions.length > 0) {
      return practiceSet.questions;
    }
    return SCREENSHOT_FEEDBACK_ITEMS;
  }, [practiceSet]);

  const toggleContext = (id: string) => {
    setOpenContextIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyCode = (codeText?: string) => {
    if (codeText) {
      navigator.clipboard?.writeText(codeText);
    }
  };

  const renderQuestionIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Volume2 size={18} />;
      case 'code':
        return <Code size={18} />;
      case 'conversational':
        return <MessageSquare size={18} />;
      case 'text':
        return <FileText size={18} />;
      case 'multi-select':
        return <CheckSquare size={18} />;
      case 'true-false':
        return <CheckCircle2 size={18} />;
      case 'matching':
        return <Link2 size={18} />;
      case 'dropdown':
        return <ChevronDown size={18} />;
      case 'ordering':
        return <ListOrdered size={18} />;
      case 'scenario':
        return <HelpCircle size={18} />;
      case 'image':
        return <ImageIcon size={18} />;
      default:
        return <BookOpen size={18} />;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Top Bar Row */}
        <div className={styles.topBarRow}>
          <button className={styles.backTopicBtn} onClick={onBack}>
            <ArrowLeft size={18} />
            <span>{practiceSet.name || 'Topic Name'}</span>
          </button>

          <div style={{ position: 'relative' }}>
            <button 
              className={styles.attemptDropdownBtn}
              onClick={() => setIsAttemptMenuOpen(!isAttemptMenuOpen)}
            >
              <span>{activeAttempt}</span>
              <ChevronDown size={14} />
            </button>
            {isAttemptMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 6,
                background: '#1A284A',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                padding: '4px 0',
                zIndex: 30,
                minWidth: 120,
              }}>
                {['ATTEMPT 1', 'ATTEMPT 2'].map(att => (
                  <button
                    key={att}
                    onClick={() => {
                      setActiveAttempt(att);
                      setIsAttemptMenuOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      color: activeAttempt === att ? '#38BDF8' : '#FFFFFF',
                      padding: '8px 14px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    {att}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dark Navy Stats Bar (Screenshot 1) */}
        <div className={styles.statsSummaryBar}>
          <div className={styles.statsLeft}>
            <div className={styles.statItem}>
              <span>Total Score:</span>
              <strong>{practiceSet.score || 86}%</strong>
            </div>

            <span className={styles.statsDivider}>|</span>

            <div className={styles.statItem}>
              <span>Time Taken:</span>
              <strong>{practiceSet.timeSpentMinutes || 26} Min</strong>
            </div>
          </div>

          <div className={styles.statsBadgesRight}>
            <span className={styles.badgePillCorrect}>
              <Check size={12} strokeWidth={3} />
              <span>20 CORRECT</span>
            </span>
            <span className={styles.badgePillWrong}>
              <span>15 WRONG</span>
            </span>
            <span className={styles.badgePillPartial}>
              <span>12 PARTIALLY RIGHT</span>
            </span>
          </div>
        </div>

        {/* Questions List */}
        <div className={styles.questionsList}>
          {questions.map((q, idx) => {
            const isContextOpen = openContextIds.has(q.id);

            return (
              <div key={q.id || idx} className={styles.questionCard}>
                {/* Header */}
                <div className={styles.cardHeaderRow}>
                  <div className={styles.cardHeaderLeft}>
                    <span className={styles.qIconBox}>
                      {renderQuestionIcon(q.type)}
                    </span>
                    <span className={styles.qNumberTitle}>
                      Question {q.questionNumber || idx + 1}
                    </span>
                    {q.bloomBadge && (
                      <span className={styles.bloomTag}>{q.bloomBadge}</span>
                    )}
                  </div>

                  <span className={styles.pointsBadge}>
                    <span>🪙</span>
                    <span>{q.points || '1M [22]'}</span>
                  </span>
                </div>

                {/* Prompt */}
                <p className={styles.questionPrompt}>{q.prompt}</p>

                {/* Collapsible Context */}
                <div>
                  <button 
                    className={styles.viewContextBtn}
                    onClick={() => toggleContext(q.id)}
                  >
                    <span>VIEW ADDITIONAL CONTEXT</span>
                    {isContextOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>

                  {isContextOpen && (
                    <div className={styles.contextBox}>
                      <pre className={styles.contextBoxPre}>
                        <code>
                          {q.additionalContext?.code || 
                           q.additionalContext?.description || 
                           q.context || 
                           'Context details loaded from syllabus and question specifications.'}
                        </code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Question Type: Single Select / MCQ */}
                {(q.type === 'mcq' || q.type === 'single-select') && q.options && (
                  <div className={styles.mcqFeedbackList}>
                    {q.options.map((opt, optIdx) => {
                      const letter = opt.letter || String.fromCharCode(65 + optIdx);
                      const isCorrectAnswer = letter === q.correctAnswer || opt.text === q.correctAnswer || opt.id === q.correctAnswer;
                      const isStudentAnswer = letter === q.studentAnswer || opt.text === q.studentAnswer || opt.id === q.studentAnswer;

                      return (
                        <div 
                          key={opt.id || optIdx}
                          className={`${styles.mcqFeedbackOption} ${isCorrectAnswer ? styles.mcqOptionCorrect : ''} ${!isCorrectAnswer && isStudentAnswer ? styles.mcqOptionWrongSelection : ''}`}
                        >
                          <div className={styles.mcqOptionLeft}>
                            <div className={`${styles.mcqOptionLetterBadge} ${isCorrectAnswer ? styles.letterBadgeCorrect : ''} ${!isCorrectAnswer && isStudentAnswer ? styles.letterBadgeWrong : ''}`}>
                              {letter}
                            </div>
                            <span className={styles.mcqOptionText}>{opt.text}</span>
                          </div>

                          {isCorrectAnswer && (
                            <span className={styles.statusPillRight}>
                              <Check size={11} strokeWidth={3} />
                              <span>RIGHT</span>
                            </span>
                          )}

                          {!isCorrectAnswer && isStudentAnswer && (
                            <span className={styles.statusPillWrong}>
                              <X size={11} strokeWidth={3} />
                              <span>WRONG</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Question Type: Text (Question 2) */}
                {q.type === 'text' && (
                  <div>
                    <div className={styles.studentAnswerHeader}>
                      <span className={styles.studentAnswerLabel}>Student Answer:</span>
                      <span className={styles.statusPillRight}>
                        <Check size={11} strokeWidth={3} />
                        <span>RIGHT</span>
                      </span>
                    </div>

                    <div className={styles.textStudentAnswerBox}>
                      <span>
                        {typeof q.studentAnswer === 'string' 
                          ? q.studentAnswer 
                          : 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Question Type: Audio (Question 3) */}
                {q.type === 'audio' && (
                  <div>
                    <div className={styles.studentAnswerHeader}>
                      <span className={styles.studentAnswerLabel}>Student Answer:</span>
                      <span className={styles.statusPillRight}>
                        <Check size={11} strokeWidth={3} />
                        <span>RIGHT</span>
                      </span>
                    </div>

                    <div className={styles.audioAnswerBox}>
                      <button 
                        className={styles.audioPlayBtn}
                        onClick={() => setAudioPlayingId(audioPlayingId === q.id ? null : q.id)}
                      >
                        {audioPlayingId === q.id ? <Pause size={15} /> : <Play size={15} fill="#FFFFFF" />}
                      </button>
                      <span className={styles.audioTimeText}>0:45</span>
                      <div className={styles.audioScrubberLine}>
                        <div className={styles.audioScrubberFill} style={{ width: '45%' }} />
                      </div>
                      <span className={styles.audioTimeText}>1:02</span>
                    </div>

                    <div className={styles.transcriptContainer}>
                      <span className={styles.transcriptLabel}>Student Answer Transcript:</span>
                      <div className={styles.transcriptText}>
                        {q.audioData?.transcript || 
                         'It reduces the size of the database by eliminating null values and optional attributes. In the context of relational databases, explain how normalization reduces data redundancy and improves data integrity.'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Question Type: Coding (Question 4) */}
                {q.type === 'code' && (
                  <div>
                    <div className={styles.studentAnswerHeader}>
                      <span className={styles.studentAnswerLabel}>Student Answer:</span>
                      <span className={styles.statusPillWrong}>
                        <span>WRONG</span>
                      </span>
                    </div>

                    <div className={styles.codingEditorsGrid}>
                      {/* Left: Your Answer */}
                      <div className={styles.codePanel}>
                        <div className={styles.codePanelTopBar}>
                          <span className={styles.codePanelTitle}>Your Answer | JAVASCRIPT</span>
                          <div className={styles.codePanelIcons}>
                            <Copy 
                              size={14} 
                              onClick={() => copyCode(q.codeData?.studentCode || 'function sub(a, b) {\n  return a - b;\n}')} 
                            />
                            <Maximize2 size={14} />
                          </div>
                        </div>
                        <div className={styles.codePanelContent}>
                          <div className={styles.codePanelLineNums}>
                            1<br/>2<br/>3
                          </div>
                          <pre className={styles.codePanelPre}>
                            <code>
                              {q.codeData?.studentCode || `function sub(a,b) {\n  return a - b;\n}`}
                            </code>
                          </pre>
                        </div>
                      </div>

                      {/* Right: Expected Solution */}
                      <div className={styles.codePanel}>
                        <div className={styles.codePanelTopBar}>
                          <span className={styles.codePanelTitle}>Expected Solution | JAVASCRIPT</span>
                          <div className={styles.codePanelIcons}>
                            <Copy 
                              size={14} 
                              onClick={() => copyCode(q.codeData?.expectedSolution)} 
                            />
                            <Maximize2 size={14} />
                          </div>
                        </div>
                        <div className={styles.codePanelContent}>
                          <div className={styles.codePanelLineNums}>
                            {Array.from({ length: 14 }).map((_, i) => (
                              <div key={i}>{i + 1}</div>
                            ))}
                          </div>
                          <pre className={styles.codePanelPre}>
                            <code>
                              {q.codeData?.expectedSolution || `public class Solution {
  public static int robustStringHash(String key, int tableSize) {
    long hash = 0;
    long primeMultiplier = 31; // A common prime for string hashing
    
    for (int i = 0; i < key.length(); i++) {
      hash = (hash * primeMultiplier + key.charAt(i)) % tableSize;
    }
    if (hash < 0) {
      hash += tableSize;
    }
    return (int) hash;
  }
}`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Question Type: Conversational (Question 5) */}
                {q.type === 'conversational' && (
                  <div>
                    <div className={styles.studentAnswerHeader}>
                      <span className={styles.studentAnswerLabel}>Student Conversation:</span>
                      <span className={styles.statusPillRight}>
                        <Check size={11} strokeWidth={3} />
                        <span>RIGHT</span>
                      </span>
                    </div>

                    <div className={styles.conversationalTranscriptBox}>
                      {(q.chatMessages || []).map(msg => (
                        <div 
                          key={msg.id} 
                          className={msg.sender === 'user' ? styles.chatBubbleUser : styles.chatBubbleBot}
                        >
                          {msg.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question Type: Multi-Select */}
                {q.type === 'multi-select' && q.options && (() => {
                  const studentArr = Array.isArray(q.studentAnswer) ? q.studentAnswer : [q.studentAnswer];
                  const correctArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];

                  return (
                    <div>
                      <div className={styles.studentAnswerHeader}>
                        <span className={styles.studentAnswerLabel}>Selected Options:</span>
                        <span className={q.isCorrect ? styles.statusPillRight : styles.statusPillWrong}>
                          {q.isCorrect ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                          <span>{q.isCorrect ? 'ALL CORRECT' : 'INCORRECT'}</span>
                        </span>
                      </div>

                      <div className={styles.multiFeedbackList}>
                        {q.options.map((opt) => {
                          const isSelectedByStudent = studentArr.some((s: string) => s === opt.id || s === opt.text);
                          const isActuallyCorrect = correctArr.some((c: string) => c === opt.id || c === opt.text);

                          let optionStyle = styles.multiFeedbackNeutral;
                          let badge = null;

                          if (isSelectedByStudent && isActuallyCorrect) {
                            optionStyle = styles.multiFeedbackCorrect;
                            badge = (
                              <span className={styles.statusPillRight}>
                                <Check size={11} strokeWidth={3} />
                                <span>CORRECT SELECTION</span>
                              </span>
                            );
                          } else if (isSelectedByStudent && !isActuallyCorrect) {
                            optionStyle = styles.multiFeedbackWrong;
                            badge = (
                              <span className={styles.statusPillWrong}>
                                <X size={11} strokeWidth={3} />
                                <span>WRONG SELECTION</span>
                              </span>
                            );
                          } else if (!isSelectedByStudent && isActuallyCorrect) {
                            optionStyle = styles.multiFeedbackMissed;
                            badge = (
                              <span className={styles.statusPillMissed}>
                                <span>MISSED ANSWER</span>
                              </span>
                            );
                          }

                          return (
                            <div key={opt.id} className={`${styles.multiFeedbackCard} ${optionStyle}`}>
                              <div className={styles.multiFeedbackLeft}>
                                <div className={`${styles.multiCheckboxIcon} ${isSelectedByStudent ? styles.multiCheckboxChecked : ''}`}>
                                  {isSelectedByStudent && <Check size={12} strokeWidth={3} />}
                                </div>
                                <span className={styles.multiOptionText}>{opt.text}</span>
                              </div>
                              {badge}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Question Type: True / False */}
                {q.type === 'true-false' && (() => {
                  const studentAnsStr = String(q.studentAnswer || '').toLowerCase();
                  const correctAnsStr = String(q.correctAnswer || '').toLowerCase();
                  const isStudentTrue = studentAnsStr === 'true';
                  const isCorrectTrue = correctAnsStr === 'true';

                  return (
                    <div>
                      <div className={styles.studentAnswerHeader}>
                        <span className={styles.studentAnswerLabel}>
                          Your Verdict: <strong>{isStudentTrue ? 'TRUE' : 'FALSE'}</strong>
                        </span>
                        <span className={q.isCorrect ? styles.statusPillRight : styles.statusPillWrong}>
                          {q.isCorrect ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                          <span>{q.isCorrect ? 'RIGHT' : 'WRONG'}</span>
                        </span>
                      </div>

                      <div className={styles.tfFeedbackGrid}>
                        {/* TRUE card */}
                        <div className={`${styles.tfFeedbackCard} ${isCorrectTrue ? styles.tfFeedbackCardCorrect : (isStudentTrue && !isCorrectTrue ? styles.tfFeedbackCardWrong : '')}`}>
                          <div className={styles.tfFeedbackIconArea}>
                            <Check size={26} color={isCorrectTrue ? '#10B981' : '#64748B'} strokeWidth={3} />
                          </div>
                          <div className={styles.tfFeedbackInfo}>
                            <span className={styles.tfFeedbackTitle}>TRUE</span>
                            <span className={styles.tfFeedbackDesc}>Statement is accurate</span>
                          </div>
                          {isCorrectTrue && (
                            <span className={styles.statusPillRight}>
                              <Check size={11} strokeWidth={3} />
                              <span>CORRECT ANSWER</span>
                            </span>
                          )}
                          {isStudentTrue && !isCorrectTrue && (
                            <span className={styles.statusPillWrong}>
                              <X size={11} strokeWidth={3} />
                              <span>YOUR CHOICE (WRONG)</span>
                            </span>
                          )}
                        </div>

                        {/* FALSE card */}
                        <div className={`${styles.tfFeedbackCard} ${!isCorrectTrue ? styles.tfFeedbackCardCorrect : (!isStudentTrue && isCorrectTrue ? styles.tfFeedbackCardWrong : '')}`}>
                          <div className={styles.tfFeedbackIconArea}>
                            <X size={26} color={!isCorrectTrue ? '#10B981' : '#64748B'} strokeWidth={3} />
                          </div>
                          <div className={styles.tfFeedbackInfo}>
                            <span className={styles.tfFeedbackTitle}>FALSE</span>
                            <span className={styles.tfFeedbackDesc}>Statement is inaccurate</span>
                          </div>
                          {!isCorrectTrue && (
                            <span className={styles.statusPillRight}>
                              <Check size={11} strokeWidth={3} />
                              <span>CORRECT ANSWER</span>
                            </span>
                          )}
                          {!isStudentTrue && isCorrectTrue && (
                            <span className={styles.statusPillWrong}>
                              <X size={11} strokeWidth={3} />
                              <span>YOUR CHOICE (WRONG)</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Question Type: Matching Pairs */}
                {q.type === 'matching' && (
                  <div>
                    <div className={styles.studentAnswerHeader}>
                      <span className={styles.studentAnswerLabel}>Matched Pairs Breakdown:</span>
                      <span className={q.isCorrect ? styles.statusPillRight : styles.statusPillWrong}>
                        {q.isCorrect ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                        <span>{q.isCorrect ? 'ALL MATCHED' : 'INCOMPLETE'}</span>
                      </span>
                    </div>

                    <div className={styles.matchingFeedbackList}>
                      {(q.matchingPairs || []).map((pair, pIdx) => (
                        <div 
                          key={pIdx}
                          className={`${styles.matchingPairCard} ${pair.isCorrect ? styles.matchingPairCardCorrect : styles.matchingPairCardWrong}`}
                        >
                          <div className={styles.matchingPairPrompt}>
                            <span className={styles.matchingPairIndex}>{pIdx + 1}</span>
                            <span className={styles.matchingPairText}>{pair.prompt}</span>
                          </div>

                          <div className={styles.matchingPairArrow}>➔</div>

                          <div className={styles.matchingPairResult}>
                            <div className={styles.matchingPairStudentRow}>
                              <span className={styles.matchSubLabel}>Your Match:</span>
                              <strong className={pair.isCorrect ? styles.matchTextCorrect : styles.matchTextWrong}>
                                {pair.studentMatch}
                              </strong>
                            </div>
                            {!pair.isCorrect && (
                              <div className={styles.matchingPairCorrectRow}>
                                <span className={styles.matchSubLabel}>Expected:</span>
                                <strong className={styles.matchTextExpected}>{pair.correctMatch}</strong>
                              </div>
                            )}
                          </div>

                          <div className={styles.matchingPairStatusBadge}>
                            {pair.isCorrect ? (
                              <span className={styles.statusPillRight}>
                                <Check size={11} strokeWidth={3} />
                                <span>RIGHT</span>
                              </span>
                            ) : (
                              <span className={styles.statusPillWrong}>
                                <X size={11} strokeWidth={3} />
                                <span>WRONG</span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question Type: Dropdown / Fill in Blank */}
                {q.type === 'dropdown' && (() => {
                  const sentenceTemplate = q.prompt.includes('[DROPDOWN]')
                    ? q.prompt
                    : (q.context?.includes('[DROPDOWN]') ? q.context : `${q.prompt} [DROPDOWN]`);
                  const parts = sentenceTemplate.split('[DROPDOWN]');

                  return (
                    <div>
                      <div className={styles.studentAnswerHeader}>
                        <span className={styles.studentAnswerLabel}>Completed Statement:</span>
                        <span className={q.isCorrect ? styles.statusPillRight : styles.statusPillWrong}>
                          {q.isCorrect ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                          <span>{q.isCorrect ? 'RIGHT' : 'WRONG'}</span>
                        </span>
                      </div>

                      <div className={styles.dropdownFeedbackCard}>
                        <span className={styles.dropdownSentenceText}>{parts[0]}</span>
                        
                        {q.isCorrect ? (
                          <span className={styles.dropdownBlankPillCorrect}>
                            <Check size={12} strokeWidth={3} />
                            <span>{String(q.studentAnswer)}</span>
                          </span>
                        ) : (
                          <span className={styles.dropdownBlankGroup}>
                            <span className={styles.dropdownBlankPillWrong}>
                              <X size={12} strokeWidth={3} />
                              <span>{String(q.studentAnswer)}</span>
                            </span>
                            <span className={styles.dropdownExpectedPill}>
                              <span>Expected: {String(q.correctAnswer)}</span>
                            </span>
                          </span>
                        )}

                        <span className={styles.dropdownSentenceText}>{parts[1]}</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Question Type: Ordering */}
                {q.type === 'ordering' && (
                  <div>
                    <div className={styles.studentAnswerHeader}>
                      <span className={styles.studentAnswerLabel}>Sequence Verification:</span>
                      <span className={q.isCorrect ? styles.statusPillRight : styles.statusPillWrong}>
                        {q.isCorrect ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                        <span>{q.isCorrect ? 'RIGHT SEQUENCE' : 'WRONG SEQUENCE'}</span>
                      </span>
                    </div>

                    <div className={`${styles.orderingFeedbackWrapper} ${q.isCorrect || !q.orderingItems?.correctOrder ? styles.orderingFeedbackWrapperSingle : ''}`}>
                      <div className={styles.orderingCol}>
                        <span className={styles.orderingColHeading}>Your Submitted Sequence</span>
                        <div className={styles.orderingCardsStack}>
                          {(q.orderingItems?.studentOrder || []).map((step, sIdx) => {
                            const isPosCorrect = q.orderingItems?.correctOrder && q.orderingItems.correctOrder[sIdx] === step;
                            return (
                              <div 
                                key={sIdx}
                                className={`${styles.orderingFeedbackCard} ${isPosCorrect ? styles.orderCardPosCorrect : styles.orderCardPosWrong}`}
                              >
                                <div className={styles.orderPosNum}>{sIdx + 1}</div>
                                <span className={styles.orderStepText}>{step.replace(/^\d+\.\s*/, '')}</span>
                                {isPosCorrect ? (
                                  <span className={styles.statusPillRight}>
                                    <Check size={10} strokeWidth={3} />
                                  </span>
                                ) : (
                                  <span className={styles.statusPillWrong}>
                                    <X size={10} strokeWidth={3} />
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {!q.isCorrect && q.orderingItems?.correctOrder && (
                        <div className={styles.orderingCol}>
                          <span className={styles.orderingColHeading}>Recommended Sequence</span>
                          <div className={styles.orderingCardsStack}>
                            {q.orderingItems.correctOrder.map((step, sIdx) => (
                              <div key={sIdx} className={`${styles.orderingFeedbackCard} ${styles.orderCardExpected}`}>
                                <div className={styles.orderPosNumExpected}>{sIdx + 1}</div>
                                <span className={styles.orderStepText}>{step.replace(/^\d+\.\s*/, '')}</span>
                                <span className={styles.statusPillRight}>
                                  <Check size={10} strokeWidth={3} />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Question Type: Scenario */}
                {q.type === 'scenario' && (
                  <div>
                    <div className={styles.studentAnswerHeader}>
                      <span className={styles.studentAnswerLabel}>Candidate Action Assessment:</span>
                      <span className={q.isCorrect ? styles.statusPillRight : styles.statusPillWrong}>
                        {q.isCorrect ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                        <span>{q.isCorrect ? 'RIGHT' : 'WRONG'}</span>
                      </span>
                    </div>

                    {q.context && (
                      <div className={styles.scenarioContextCallout}>
                        <span className={styles.scenarioCalloutBadge}>CASE CONTEXT</span>
                        <p className={styles.scenarioCalloutText}>{q.context}</p>
                      </div>
                    )}

                    <div className={styles.mcqFeedbackList}>
                      {q.options?.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx);
                        const isSelected = q.studentAnswer === opt.id || q.studentAnswer === opt.text;
                        const isOptimal = q.correctAnswer === opt.id || q.correctAnswer === opt.text;

                        return (
                          <div
                            key={opt.id}
                            className={`${styles.mcqFeedbackOption} ${isOptimal ? styles.mcqOptionCorrect : (isSelected ? styles.mcqOptionWrongSelection : '')}`}
                          >
                            <div className={styles.mcqOptionLeft}>
                              <div className={`${styles.mcqOptionLetterBadge} ${isOptimal ? styles.letterBadgeCorrect : (isSelected ? styles.letterBadgeWrong : '')}`}>
                                {letter}
                              </div>
                              <span className={styles.mcqOptionText}>{opt.text}</span>
                            </div>

                            {isOptimal && (
                              <span className={styles.statusPillRight}>
                                <Check size={11} strokeWidth={3} />
                                <span>{isSelected ? 'YOUR CHOICE' : 'OPTIMAL CHOICE'}</span>
                              </span>
                            )}
                            {!isOptimal && isSelected && (
                              <span className={styles.statusPillWrong}>
                                <X size={11} strokeWidth={3} />
                                <span>YOUR CHOICE</span>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Question Type: Image MCQ */}
                {q.type === 'image' && (
                  <div>
                    <div className={styles.studentAnswerHeader}>
                      <span className={styles.studentAnswerLabel}>Rubric Evaluation:</span>
                      <span className={q.isCorrect ? styles.statusPillRight : styles.statusPillWrong}>
                        {q.isCorrect ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                        <span>{q.isCorrect ? 'RIGHT' : 'WRONG'}</span>
                      </span>
                    </div>

                    {q.image && (
                      <div className={styles.feedbackImageContainer}>
                        <img src={q.image} alt="Rubric Evaluation Visual" className={styles.feedbackRubricImg} />
                      </div>
                    )}

                    <div className={styles.mcqFeedbackList}>
                      {q.options?.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx);
                        const isSelected = q.studentAnswer === opt.id || q.studentAnswer === opt.text;
                        const isCorrectChoice = q.correctAnswer === opt.id || q.correctAnswer === opt.text;

                        return (
                          <div
                            key={opt.id}
                            className={`${styles.mcqFeedbackOption} ${isCorrectChoice ? styles.mcqOptionCorrect : (isSelected ? styles.mcqOptionWrongSelection : '')}`}
                          >
                            <div className={styles.mcqOptionLeft}>
                              <div className={`${styles.mcqOptionLetterBadge} ${isCorrectChoice ? styles.letterBadgeCorrect : (isSelected ? styles.letterBadgeWrong : '')}`}>
                                {letter}
                              </div>
                              <span className={styles.mcqOptionText}>{opt.text}</span>
                            </div>

                            {isCorrectChoice && (
                              <span className={styles.statusPillRight}>
                                <Check size={11} strokeWidth={3} />
                                <span>RIGHT</span>
                              </span>
                            )}
                            {!isCorrectChoice && isSelected && (
                              <span className={styles.statusPillWrong}>
                                <X size={11} strokeWidth={3} />
                                <span>WRONG</span>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Fallback for other question types */}
                {!['mcq', 'single-select', 'multi-select', 'true-false', 'matching', 'dropdown', 'ordering', 'scenario', 'image', 'text', 'audio', 'code', 'conversational'].includes(q.type) && (
                  <div>
                    <div className={styles.studentAnswerHeader}>
                      <span className={styles.studentAnswerLabel}>Student Answer:</span>
                      <span className={q.isCorrect ? styles.statusPillRight : styles.statusPillWrong}>
                        {q.isCorrect ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                        <span>{q.isCorrect ? 'RIGHT' : 'WRONG'}</span>
                      </span>
                    </div>

                    <div className={q.isCorrect ? styles.textStudentAnswerBox : `${styles.textStudentAnswerBox} ${styles.textStudentAnswerBoxWrong}`}>
                      <span>
                        {typeof q.studentAnswer === 'string' 
                          ? q.studentAnswer 
                          : JSON.stringify(q.studentAnswer)}
                      </span>
                    </div>
                  </div>
                )}

                {/* AI Feedback Section (Soft cool blue) */}
                <div className={styles.aiFeedbackSection}>
                  <span className={styles.aiFeedbackTitle}>AI Feedback</span>
                  <div className={styles.aiFeedbackCard}>
                    {q.aiFeedback || q.explanation || 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Action: Retake */}
        <div className={styles.footerActionRow}>
          <button 
            className={styles.retakeBtn}
            onClick={() => onRetry(practiceSet.id)}
          >
            <RotateCcw size={16} />
            <span>Practice Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeFeedbackPage;
