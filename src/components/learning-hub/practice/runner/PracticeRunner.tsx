import React, { useState, useEffect } from 'react';
import { 
  X, 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp,
  ArrowDown,
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Send, 
  BookOpen, 
  Volume2, 
  Code, 
  MessageSquare, 
  CheckCircle2,
  CheckSquare,
  Link2,
  ListOrdered,
  HelpCircle,
  Image as ImageIcon,
  ChevronDown,
  Layers
} from 'lucide-react';
import type { PracticeQuestion, PracticeQuestionFeedbackItem, ChatMessage, MatchingPair } from '../../../../types/practice';
import { PRACTICE_RUNNER_QUESTIONS } from '../../../../data/practiceRunnerData';
import audioOrbImg from '../../../../assets/audio-orb.png';
import PracticeMatchingNode from './PracticeMatchingNode';
import styles from './PracticeRunner.module.css';

const DUMMY_TEXTBOOK_PASSAGE = {
  label: 'ADDITIONAL CONTEXT',
  title: '1. A DISASTROUS DAY AT THE GABLES',
  paragraphs: [
    'It was a quiet Tuesday morning at The Gables when the first of several misfortunes began. Mrs. Harwick had just finished arranging the breakfast china when she noticed smoke curling from the kitchen doorway. The toast had burned, the kettle had boiled dry, and the morning post brought an overdue notice from the bank.',
    'By noon, the gardener reported that a storm overnight had flattened the rose trellis, and a delivery van had scraped the garden wall on its way out. Guests expected for afternoon tea telephoned to cancel, citing the weather. Mrs. Harwick, determined not to surrender the day entirely, set about repairing what she could: she aired the kitchen, swept the hall, and wrote a careful apology to the bank manager.',
    'Yet the afternoon held one more surprise. A neighbor arrived with news that the local fair had been postponed, and the prize marrow Mrs. Harwick had tended all summer would have to wait another week. She laughed despite herself, poured a fresh pot of tea, and declared that a disastrous day at The Gables was still preferable to an ordinary day anywhere else.',
    'The moral she later shared with her niece was simple: when plans unravel, composure and small acts of order restore more than panic ever can.',
    'By noon, the gardener reported that a storm overnight had flattened the rose trellis, and a delivery van had scraped the garden wall on its way out. Guests expected for afternoon tea telephoned to cancel, citing the weather. Mrs. Harwick, determined not to surrender the day entirely, set about repairing what she could: she aired the kitchen, swept the hall, and wrote a careful apology to the bank manager.',
    'Yet the afternoon held one more surprise. A neighbor arrived with news that the local fair had been postponed, and the prize marrow Mrs. Harwick had tended all summer would have to wait another week. She laughed despite herself, poured a fresh pot of tea, and declared that a disastrous day at The Gables was still preferable to an ordinary day anywhere else.',
    'The moral she later shared with her niece was simple: when plans unravel, composure and small acts of order restore more than panic ever can.',
  ],
};

interface PracticeRunnerProps {
  topicTitle?: string;
  customQuestions?: PracticeQuestion[];
  onComplete: (feedbackItems: PracticeQuestionFeedbackItem[], score: number, timeTakenMinutes: number) => void;
  onExit: () => void;
}

export const PracticeRunner: React.FC<PracticeRunnerProps> = ({
  topicTitle = 'Communication Foundations',
  customQuestions,
  onComplete,
  onExit,
}) => {
  const questions = customQuestions && customQuestions.length > 0 ? customQuestions : PRACTICE_RUNNER_QUESTIONS;
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set([1])); // default question 2 flagged like screenshot 2
  
  // View mode tab state ('both' by default)
  const [viewMode, setViewMode] = useState<'both' | 'question' | 'content'>('both');

  // Timer state (starts at 24:00)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(24 * 60);

  // User answers state across all MCQ & practice types
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({ 0: 'B' });
  const [multiSelectAnswers, setMultiSelectAnswers] = useState<Record<number, string[]>>({});
  const [trueFalseAnswers, setTrueFalseAnswers] = useState<Record<number, 'true' | 'false' | null>>({});
  const [matchingAnswers, setMatchingAnswers] = useState<Record<number, Record<string, string>>>({});
  const [dropdownAnswers, setDropdownAnswers] = useState<Record<number, string>>({});
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false);
  const [orderingAnswers, setOrderingAnswers] = useState<Record<number, string[]>>({});
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<number, string>>({});
  const [imageAnswers, setImageAnswers] = useState<Record<number, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});
  
  // Audio state
  const [audioRecording, setAudioRecording] = useState<boolean>(true);
  const [audioTime, setAudioTime] = useState<number>(2); // 0:02 like screenshot
  const [audioHasRecorded, setAudioHasRecorded] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(45);

  // Conversational state
  const [conversationalChats, setConversationalChats] = useState<Record<number, ChatMessage[]>>({
    2: questions[2]?.chatMessages || [],
  });
  const [currentChatInput, setCurrentChatInput] = useState<string>('');

  // Coding state
  const [codeAnswers, setCodeAnswers] = useState<Record<number, string>>({
    3: questions[3]?.codeData?.starterCode || `function sub(a, b) {\n  return a - b;\n}`,
  });
  const [codeConsole, setCodeConsole] = useState<string>('Ready to test. 2 test suites configured.');

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Audio recording timer effect
  useEffect(() => {
    let recInterval: any;
    if (audioRecording) {
      recInterval = setInterval(() => {
        setAudioTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(recInterval);
  }, [audioRecording]);

  const currentQ = questions[currentIndex] || questions[0];

  if (!currentQ) {
    return (
      <div className={styles.runnerOverlay}>
        <div style={{ padding: 40, textAlign: 'center', color: '#0F172A' }}>
          <h3>No questions available for this practice session.</h3>
          <button onClick={onExit} style={{ marginTop: 20, padding: '10px 20px', borderRadius: 8 }}>
            Back to Practice
          </button>
        </div>
      </div>
    );
  }

  const isFlagged = flaggedIndices.has(currentIndex);

  const toggleFlag = () => {
    setFlaggedIndices(prev => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  };

  const formatTimer = (totalSec: number) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSendChatMessage = () => {
    if (!currentChatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: currentChatInput.trim(),
      time: 'Just now',
    };
    
    setConversationalChats(prev => {
      const currentList = prev[currentIndex] || [];
      return {
        ...prev,
        [currentIndex]: [...currentList, newMsg],
      };
    });
    setCurrentChatInput('');

    // Simulate response
    setTimeout(() => {
      setConversationalChats(prev => {
        const currentList = prev[currentIndex] || [];
        return {
          ...prev,
          [currentIndex]: [
            ...currentList,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: 'Thank you for your structured response. How would you prioritize resolving the technical debt vs product roadmap timeline?',
              time: 'Just now',
            },
          ],
        };
      });
    }, 1200);
  };

  const handleFinish = () => {
    // Generate feedback items from answers
    const feedbackItems: PracticeQuestionFeedbackItem[] = questions.map((q, idx) => {
      let isCorrect = true;
      let studentAnswer: any = 'Answer recorded';
      let matchingPairsResult: MatchingPair[] | undefined = undefined;
      let orderingItemsResult: { studentOrder: string[]; correctOrder: string[] } | undefined = undefined;

      if (q.type === 'mcq' || q.type === 'single-select') {
        const chosen = mcqAnswers[idx] || q.options?.[0]?.letter || 'A';
        studentAnswer = chosen;
        const matchedOption = q.options?.find(o => o.letter === chosen || o.id === chosen);
        isCorrect = chosen === q.correctAnswer || Boolean(matchedOption && matchedOption.text === q.correctAnswer);
      } else if (q.type === 'multi-select') {
        const selectedIds = multiSelectAnswers[idx] || (Array.isArray(q.correctAnswer) ? q.correctAnswer.slice(0, 2) : []);
        const selectedTexts = selectedIds.map(id => {
          const opt = q.options?.find(o => o.id === id || o.text === id);
          return opt ? opt.text : id;
        });
        studentAnswer = selectedTexts;
        const correctArray: string[] = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
        const allCorrectSelected = correctArray.every(ca => 
          selectedTexts.includes(ca) || selectedIds.includes(ca)
        );
        const noExtraWrong = selectedTexts.every(st => 
          correctArray.includes(st)
        );
        isCorrect = allCorrectSelected && noExtraWrong && selectedTexts.length === correctArray.length;
      } else if (q.type === 'true-false') {
        const chosen = trueFalseAnswers[idx] || (q.correctAnswer ? String(q.correctAnswer).toLowerCase() : 'true');
        studentAnswer = chosen === 'true' ? 'True' : 'False';
        isCorrect = String(chosen).toLowerCase() === String(q.correctAnswer).toLowerCase();
      } else if (q.type === 'matching') {
        const currentMap = matchingAnswers[idx] || (q.correctAnswer && typeof q.correctAnswer === 'object' && !Array.isArray(q.correctAnswer) ? q.correctAnswer : { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' });
        const leftOpts = q.options?.filter(o => o.side === 'left') || [];
        const rightOpts = q.options?.filter(o => o.side === 'right') || [];
        
        matchingPairsResult = leftOpts.map(left => {
          const matchedRightId = currentMap[left.id];
          const studentRight = rightOpts.find(r => r.id === matchedRightId);
          const correctRightId = (q.correctAnswer && typeof q.correctAnswer === 'object') ? q.correctAnswer[left.id] : undefined;
          const correctRight = rightOpts.find(r => r.id === correctRightId);

          const pairCorrect = matchedRightId === correctRightId;
          return {
            prompt: left.text,
            studentMatch: studentRight ? studentRight.text : 'Not matched',
            correctMatch: correctRight ? correctRight.text : (studentRight?.text || ''),
            isCorrect: pairCorrect,
          };
        });

        studentAnswer = `${matchingPairsResult.filter(p => p.isCorrect).length} / ${matchingPairsResult.length} pairs matched`;
        isCorrect = matchingPairsResult.every(p => p.isCorrect);
      } else if (q.type === 'dropdown') {
        const chosenId = dropdownAnswers[idx] || q.options?.[0]?.id || '';
        const opt = q.options?.find(o => o.id === chosenId);
        studentAnswer = opt ? opt.text : chosenId;
        isCorrect = chosenId === q.correctAnswer || Boolean(opt && opt.text === q.correctAnswer);
      } else if (q.type === 'ordering') {
        const currentIds = orderingAnswers[idx] || q.options?.map(o => o.id) || [];
        const correctIds = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
        const studentOrderLabels = currentIds.map((id, i) => {
          const opt = q.options?.find(o => o.id === id);
          return `${i + 1}. ${opt ? opt.text : id}`;
        });
        const correctOrderLabels = correctIds.map((id: string, i: number) => {
          const opt = q.options?.find(o => o.id === id);
          return `${i + 1}. ${opt ? opt.text : id}`;
        });

        orderingItemsResult = {
          studentOrder: studentOrderLabels,
          correctOrder: correctOrderLabels.length > 0 ? correctOrderLabels : studentOrderLabels,
        };
        studentAnswer = studentOrderLabels.join(' → ');
        isCorrect = JSON.stringify(currentIds) === JSON.stringify(correctIds);
      } else if (q.type === 'scenario') {
        const chosenId = scenarioAnswers[idx] || q.options?.[1]?.id || '';
        const opt = q.options?.find(o => o.id === chosenId);
        studentAnswer = opt ? opt.text : chosenId;
        isCorrect = chosenId === q.correctAnswer || Boolean(opt && opt.text === q.correctAnswer);
      } else if (q.type === 'image') {
        const chosenId = imageAnswers[idx] || q.options?.[0]?.id || '';
        const opt = q.options?.find(o => o.id === chosenId);
        studentAnswer = opt ? opt.text : chosenId;
        isCorrect = chosenId === q.correctAnswer || Boolean(opt && opt.text === q.correctAnswer);
      } else if (q.type === 'code') {
        studentAnswer = codeAnswers[idx] || q.codeData?.starterCode;
        isCorrect = false; // demo coding comparison
      } else if (q.type === 'text') {
        studentAnswer = textAnswers[idx] || 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.';
        isCorrect = true;
      } else if (q.type === 'audio') {
        studentAnswer = 'Audio Recording (1:02)';
        isCorrect = true;
      } else if (q.type === 'conversational') {
        studentAnswer = 'Interactive conversation completed.';
        isCorrect = true;
      }

      return {
        id: `fb-${q.id}`,
        questionNumber: idx + 1,
        type: q.type,
        prompt: q.prompt,
        context: q.context,
        additionalContext: q.additionalContext,
        options: q.options,
        studentAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        resultStatus: isCorrect ? 'correct' : 'wrong',
        explanation: q.explanation,
        aiFeedback: q.aiFeedback || 'Demonstrated understanding of core concepts and structured problem-solving principles.',
        points: q.points || '1M [22]',
        bloomBadge: q.bloomBadge || '1-REMEMBER',
        image: q.image,
        matchingPairs: matchingPairsResult || q.matchingPairs,
        orderingItems: orderingItemsResult || q.orderingItems,
        codeData: q.codeData ? {
          ...q.codeData,
          studentCode: codeAnswers[idx] || q.codeData.starterCode,
        } : undefined,
        audioData: q.audioData,
        chatMessages: conversationalChats[idx] || q.chatMessages,
        chapterName: topicTitle,
        topicName: 'Comprehensive Practice',
      };
    });

    const correctCount = feedbackItems.filter(f => f.isCorrect).length;
    const finalScore = Math.round((correctCount / feedbackItems.length) * 100);
    const timeTaken = Math.max(1, Math.round((24 * 60 - timeLeftSeconds) / 60));

    onComplete(feedbackItems, finalScore, timeTaken);
  };

  const renderQuestionTypeBadge = () => {
    switch (currentQ.type) {
      case 'mcq':
      case 'single-select':
        return (
          <span className={styles.typeBadge}>
            <CheckCircle2 size={13} /> MCQ
          </span>
        );
      case 'multi-select':
        return (
          <span className={styles.typeBadge}>
            <CheckSquare size={13} /> MULTI-SELECT
          </span>
        );
      case 'true-false':
        return (
          <span className={styles.typeBadge}>
            <CheckCircle2 size={13} /> TRUE / FALSE
          </span>
        );
      case 'matching':
        return (
          <span className={styles.typeBadge}>
            <Link2 size={13} /> MATCHING
          </span>
        );
      case 'dropdown':
        return (
          <span className={styles.typeBadge}>
            <ChevronDown size={13} /> FILL IN BLANK
          </span>
        );
      case 'ordering':
        return (
          <span className={styles.typeBadge}>
            <ListOrdered size={13} /> ORDERING
          </span>
        );
      case 'scenario':
        return (
          <span className={styles.typeBadge}>
            <HelpCircle size={13} /> SCENARIO
          </span>
        );
      case 'image':
        return (
          <span className={styles.typeBadge}>
            <ImageIcon size={13} /> IMAGE MCQ
          </span>
        );
      case 'audio':
        return (
          <span className={styles.typeBadge}>
            <Volume2 size={13} /> AUDIO
          </span>
        );
      case 'conversational':
        return (
          <span className={styles.typeBadge}>
            <MessageSquare size={13} /> CONVERSATIONAL
          </span>
        );
      case 'code':
        return (
          <span className={styles.typeBadge}>
            <Code size={13} /> CODING
          </span>
        );
      case 'text':
        return (
          <span className={styles.typeBadge}>
            <BookOpen size={13} /> TEXT
          </span>
        );
      default:
        return <span className={styles.typeBadge}>{currentQ.type}</span>;
    }
  };

  const renderAnswerPanel = (isEmbedded: boolean = false) => {
    return (
      <>
        {/* 1. Single Select / MCQ Answer View (Screenshot Match) */}
        {(currentQ.type === 'mcq' || currentQ.type === 'single-select') && (
          <div className={isEmbedded ? styles.answerPanelCardEmbedded : styles.answerPanelCard}>
            {!isEmbedded && <h4 className={styles.answerTitle}>Your Answer</h4>}
            <div className={styles.mcqList}>
              {currentQ.options?.map((opt, oIdx) => {
                const letter = opt.letter || String.fromCharCode(65 + oIdx);
                const isSelected = mcqAnswers[currentIndex] === letter || mcqAnswers[currentIndex] === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={`${styles.mcqOptionCard} ${isSelected ? styles.mcqOptionCardSelected : ''}`}
                    onClick={() => setMcqAnswers(prev => ({ ...prev, [currentIndex]: letter }))}
                  >
                    <div className={`${styles.mcqLetterBadge} ${isSelected ? styles.mcqLetterBadgeSelected : ''}`}>
                      {letter}
                    </div>
                    <span className={styles.mcqText}>{opt.text}</span>
                    <div className={`${styles.mcqRadioCircle} ${isSelected ? styles.mcqRadioCircleSelected : ''}`}>
                      {isSelected && <div className={styles.mcqRadioDot} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Multi-Select Answer View */}
        {currentQ.type === 'multi-select' && (
          <div className={isEmbedded ? styles.answerPanelCardEmbedded : styles.answerPanelCard}>
            <div className={styles.answerHeaderFlex}>
              <h4 className={styles.answerTitle}>Your Selection</h4>
              <span className={styles.multiSelectHelpText}>💡 Multiple answers allowed</span>
            </div>
            <div className={styles.mcqList}>
              {currentQ.options?.map(opt => {
                const currentSelection = multiSelectAnswers[currentIndex] || [];
                const isSelected = currentSelection.includes(opt.id) || currentSelection.includes(opt.text);
                return (
                  <div
                    key={opt.id}
                    className={`${styles.multiOptionCard} ${isSelected ? styles.multiOptionCardSelected : ''}`}
                    onClick={() => {
                      const idToToggle = opt.id;
                      setMultiSelectAnswers(prev => {
                        const list = prev[currentIndex] || [];
                        const exists = list.includes(idToToggle);
                        return {
                          ...prev,
                          [currentIndex]: exists ? list.filter(i => i !== idToToggle) : [...list, idToToggle],
                        };
                      });
                    }}
                  >
                    <div className={`${styles.checkboxSquare} ${isSelected ? styles.checkboxSquareSelected : ''}`}>
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className={styles.mcqText}>{opt.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. True / False Answer View */}
        {currentQ.type === 'true-false' && (
          <div className={isEmbedded ? styles.answerPanelCardEmbedded : styles.answerPanelCard}>
            <h4 className={styles.answerTitle}>Evaluate the Statement</h4>
            <div className={styles.tfGrid}>
              <div
                className={`${styles.tfCard} ${styles.tfCardTrue} ${trueFalseAnswers[currentIndex] === 'true' ? styles.tfSelectedTrue : ''}`}
                onClick={() => setTrueFalseAnswers(prev => ({ ...prev, [currentIndex]: 'true' }))}
              >
                <div className={styles.tfIconCircleTrue}>
                  <Check size={32} strokeWidth={3} />
                </div>
                <span className={styles.tfTitle}>TRUE</span>
                <span className={styles.tfSubtitle}>Statement is accurate</span>
              </div>

              <div
                className={`${styles.tfCard} ${styles.tfCardFalse} ${trueFalseAnswers[currentIndex] === 'false' ? styles.tfSelectedFalse : ''}`}
                onClick={() => setTrueFalseAnswers(prev => ({ ...prev, [currentIndex]: 'false' }))}
              >
                <div className={styles.tfIconCircleFalse}>
                  <X size={32} strokeWidth={3} />
                </div>
                <span className={styles.tfTitle}>FALSE</span>
                <span className={styles.tfSubtitle}>Statement is inaccurate</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. Matching Pairs Node Design View */}
        {currentQ.type === 'matching' && (
          <PracticeMatchingNode
            question={currentQ}
            selectedMatches={matchingAnswers[currentIndex] || {}}
            onMatchesChange={(matches) => {
              setMatchingAnswers(prev => ({
                ...prev,
                [currentIndex]: matches,
              }));
            }}
            onReset={() => {
              setMatchingAnswers(prev => ({
                ...prev,
                [currentIndex]: {},
              }));
            }}
          />
        )}

        {/* 5. Dropdown / Fill in the Blank Answer View */}
        {currentQ.type === 'dropdown' && (() => {
          const template = currentQ.prompt.includes('[DROPDOWN]') 
            ? currentQ.prompt 
            : (currentQ.context?.includes('[DROPDOWN]') ? currentQ.context : `${currentQ.prompt} [DROPDOWN]`);
          const parts = template.split('[DROPDOWN]');
          const selectedId = dropdownAnswers[currentIndex];
          const selectedOpt = currentQ.options?.find(o => o.id === selectedId);

          return (
            <div className={isEmbedded ? styles.answerPanelCardEmbedded : styles.answerPanelCard}>
              <h4 className={styles.answerTitle}>Fill in the Blank</h4>
              
              <div className={styles.dropdownSentenceCard}>
                <span className={styles.dropdownSentencePart}>{parts[0]}</span>
                
                <div className={styles.inlineDropdownWrapper}>
                  <button
                    type="button"
                    className={`${styles.inlineDropdownTrigger} ${selectedId ? styles.inlineDropdownTriggerActive : ''}`}
                    onClick={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)}
                  >
                    <span>{selectedOpt ? selectedOpt.text : 'Select Option...'}</span>
                    <ChevronDown size={14} />
                  </button>

                  {isDropdownMenuOpen && (
                    <div className={styles.inlineDropdownMenu}>
                      {currentQ.options?.map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          className={`${styles.inlineDropdownMenuItem} ${selectedId === opt.id ? styles.inlineDropdownMenuItemActive : ''}`}
                          onClick={() => {
                            setDropdownAnswers(prev => ({ ...prev, [currentIndex]: opt.id }));
                            setIsDropdownMenuOpen(false);
                          }}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className={styles.dropdownSentencePart}>{parts[1]}</span>
              </div>
            </div>
          );
        })()}

        {/* 6. Ordering / Sequence Answer View */}
        {currentQ.type === 'ordering' && (() => {
          const currentOrderIds = orderingAnswers[currentIndex] || currentQ.options?.map(o => o.id) || [];
          const moveOrder = (idx: number, dir: 'up' | 'down') => {
            if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === currentOrderIds.length - 1)) return;
            const newArr = [...currentOrderIds];
            const target = dir === 'up' ? idx - 1 : idx + 1;
            [newArr[idx], newArr[target]] = [newArr[target], newArr[idx]];
            setOrderingAnswers(prev => ({ ...prev, [currentIndex]: newArr }));
          };

          return (
            <div className={isEmbedded ? styles.answerPanelCardEmbedded : styles.answerPanelCard}>
              <div className={styles.answerHeaderFlex}>
                <h4 className={styles.answerTitle}>Arrange in Order</h4>
                <span className={styles.multiSelectHelpText}>Use arrows to rearrange</span>
              </div>

              <div className={styles.orderingList}>
                {currentOrderIds.map((optId, oIdx) => {
                  const opt = currentQ.options?.find(o => o.id === optId);
                  if (!opt) return null;
                  return (
                    <div key={opt.id} className={styles.orderingCard}>
                      <div className={styles.orderingIndex}>{oIdx + 1}</div>
                      <span className={styles.orderingText}>{opt.text}</span>
                      <div className={styles.orderingBtnGroup}>
                        <button
                          type="button"
                          disabled={oIdx === 0}
                          className={styles.orderArrowBtn}
                          onClick={() => moveOrder(oIdx, 'up')}
                          title="Move step up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          disabled={oIdx === currentOrderIds.length - 1}
                          className={styles.orderArrowBtn}
                          onClick={() => moveOrder(oIdx, 'down')}
                          title="Move step down"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* 7. Scenario Dilemma Answer View */}
        {currentQ.type === 'scenario' && (
          <div className={isEmbedded ? styles.answerPanelCardEmbedded : styles.answerPanelCard}>
            {!isEmbedded && <h4 className={styles.answerTitle}>Select Best Response</h4>}
            {currentQ.context && (
              <div className={styles.scenarioContextCard}>
                <div className={styles.scenarioContextTitle}>
                  <HelpCircle size={14} /> Case Dilemma
                </div>
                <p className={styles.scenarioContextText}>{currentQ.context}</p>
              </div>
            )}
            <div className={styles.mcqList}>
              {currentQ.options?.map((opt, oIdx) => {
                const isSelected = scenarioAnswers[currentIndex] === opt.id;
                const letter = String.fromCharCode(65 + oIdx);
                return (
                  <div
                    key={opt.id}
                    className={`${styles.mcqOptionCard} ${isSelected ? styles.mcqOptionCardSelected : ''}`}
                    onClick={() => setScenarioAnswers(prev => ({ ...prev, [currentIndex]: opt.id }))}
                  >
                    <div className={`${styles.mcqLetterBadge} ${isSelected ? styles.mcqLetterBadgeSelected : ''}`}>
                      {letter}
                    </div>
                    <span className={styles.mcqText}>{opt.text}</span>
                    <div className={`${styles.mcqRadioCircle} ${isSelected ? styles.mcqRadioCircleSelected : ''}`}>
                      {isSelected && <div className={styles.mcqRadioDot} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 8. Image Rubric MCQ Answer View */}
        {currentQ.type === 'image' && (
          <div className={isEmbedded ? styles.answerPanelCardEmbedded : styles.answerPanelCard}>
            {!isEmbedded && <h4 className={styles.answerTitle}>Rubric Assessment</h4>}
            {currentQ.image && (
              <div className={styles.imageQuestionPreview}>
                <img src={currentQ.image} alt="Question Visual" className={styles.questionRubricImg} />
              </div>
            )}
            <div className={styles.mcqList}>
              {currentQ.options?.map((opt, oIdx) => {
                const isSelected = imageAnswers[currentIndex] === opt.id;
                const letter = String.fromCharCode(65 + oIdx);
                return (
                  <div
                    key={opt.id}
                    className={`${styles.mcqOptionCard} ${isSelected ? styles.mcqOptionCardSelected : ''}`}
                    onClick={() => setImageAnswers(prev => ({ ...prev, [currentIndex]: opt.id }))}
                  >
                    <div className={`${styles.mcqLetterBadge} ${isSelected ? styles.mcqLetterBadgeSelected : ''}`}>
                      {letter}
                    </div>
                    <span className={styles.mcqText}>{opt.text}</span>
                    <div className={`${styles.mcqRadioCircle} ${isSelected ? styles.mcqRadioCircleSelected : ''}`}>
                      {isSelected && <div className={styles.mcqRadioDot} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Audio Answer View */}
        {currentQ.type === 'audio' && (
          <div className={`${styles.audioContainer} ${isEmbedded ? styles.audioContainerEmbedded : ''}`}>
            <div className={styles.audioGlowArch} />

            {/* State A: Recording in Progress */}
            {audioRecording || !audioHasRecorded ? (
              <div className={styles.audioRecordingView}>
                <div className={styles.recordingTimer}>{formatTimer(audioTime)}</div>
                
                <div className={styles.recordingStatus}>
                  <span className={styles.pulseDot} />
                  <span>RECORDING</span>
                </div>

                <div 
                  className={styles.audioSphereWrapper} 
                  onClick={() => {
                    setAudioRecording(false);
                    setAudioHasRecorded(true);
                  }}
                  role="button"
                  tabIndex={0}
                  title="Tap to stop recording"
                >
                  <div className={styles.audioRingOuter} />
                  <div className={styles.audioRingInner} />
                  <div className={styles.audioAmbientGlow} />
                  <img 
                    src={audioOrbImg} 
                    alt="Voice Waveform Sphere" 
                    className={styles.audioOrbImg} 
                  />
                </div>

                <button 
                  className={styles.tapToStopBtn}
                  onClick={() => {
                    setAudioRecording(false);
                    setAudioHasRecorded(true);
                  }}
                  type="button"
                >
                  <strong className={styles.tapHighlight}>Tap</strong> <span className={styles.toStopText}>to stop</span>
                </button>
              </div>
            ) : (
              /* State B: Playback & Review */
              <div className={styles.audioReviewView}>
                <div className={styles.recordingTimer}>1:02</div>
                <div className={styles.listenPrompt}>
                  Listen, then <strong>Submit</strong> or <strong>Retry</strong>
                </div>

                <div 
                  className={styles.audioReviewOrbWrapper}
                  onClick={() => setAudioPlaying(!audioPlaying)}
                  role="button"
                  tabIndex={0}
                  title="Click to play / pause recording"
                >
                  <img 
                    src={audioOrbImg} 
                    alt="Review Audio Orb" 
                    className={`${styles.audioOrbImgReview} ${audioPlaying ? styles.audioOrbPlaying : ''}`} 
                  />
                  <div className={styles.audioReviewPlayOverlay}>
                    {audioPlaying ? <Pause size={28} color="#FFFFFF" /> : <Play size={28} color="#FFFFFF" fill="#FFFFFF" />}
                  </div>
                </div>

                <div className={styles.audioPlayerBar}>
                  <button 
                    className={styles.playPauseBtn} 
                    onClick={() => setAudioPlaying(!audioPlaying)}
                    type="button"
                  >
                    {audioPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                  </button>
                  <span className={styles.audioTimestamp}>
                    {audioPlaying ? '0:45 / 1:02' : '0:00 / 1:02'}
                  </span>
                  <div 
                    className={styles.audioScrubberTrack}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
                      setAudioProgress(pct);
                    }}
                  >
                    <div 
                      className={styles.audioScrubberProgress} 
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                </div>

                <div className={styles.audioActionsRow}>
                  <button 
                    className={styles.audioRetryBtn}
                    onClick={() => {
                      setAudioTime(0);
                      setAudioRecording(true);
                      setAudioHasRecorded(false);
                    }}
                    type="button"
                  >
                    <RotateCcw size={15} />
                    <span>RETRY</span>
                  </button>
                  <button 
                    className={styles.audioSubmitBtn}
                    onClick={handleNext}
                    type="button"
                  >
                    <span>SUBMIT</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Conversational Answer View */}
        {currentQ.type === 'conversational' && (
          <div className={`${styles.chatContainer} ${isEmbedded ? styles.chatContainerEmbedded : ''}`}>
            <h4 className={styles.chatHeaderTitle}>Your Response</h4>

            <div className={styles.chatIntroCard}>
              Should social media platforms be held legally responsible for the content shared by their users? Should social media platforms be held legally responsible for the content shared
            </div>

            <div className={styles.chatMessagesStream}>
              {(conversationalChats[currentIndex] || currentQ.chatMessages || []).map(msg => (
                <div 
                  key={msg.id} 
                  className={msg.sender === 'user' ? styles.userBubble : styles.botBubble}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className={styles.chatInputRow}>
              <input 
                type="text"
                className={styles.chatInput}
                placeholder="Type your Analysis..."
                value={currentChatInput}
                onChange={e => setCurrentChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendChatMessage()}
              />
              <button 
                className={styles.chatSendBtn} 
                onClick={handleSendChatMessage}
                aria-label="Send Analysis"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Coding Answer View */}
        {currentQ.type === 'code' && (
          <div className={`${styles.codeContainer} ${isEmbedded ? styles.codeContainerEmbedded : ''}`}>
            <div className={styles.codeHeaderBar}>
              <span className={styles.codeLangBadge}>
                {currentQ.codeData?.language || 'JAVASCRIPT'}
              </span>
              <button 
                className={styles.codeRunBtn}
                onClick={() => setCodeConsole('All 3 automated test suites passed successfully! Ready to submit.')}
              >
                <Play size={13} fill="#FFFFFF" />
                <span>Run Tests</span>
              </button>
            </div>

            <div className={styles.codeEditorArea}>
              <div className={styles.codeLineNumbers}>
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                className={styles.codeTextarea}
                value={codeAnswers[currentIndex] || currentQ.codeData?.starterCode || ''}
                onChange={e => setCodeAnswers(prev => ({ ...prev, [currentIndex]: e.target.value }))}
                rows={14}
                spellCheck={false}
              />
            </div>

            <div className={styles.codeOutputConsole}>
              <span>Console:</span>
              <span className={styles.consolePassed}>{codeConsole}</span>
            </div>
          </div>
        )}

        {/* Text Answer View */}
        {currentQ.type === 'text' && (
          <div className={`${styles.textContainer} ${isEmbedded ? styles.textContainerEmbedded : ''}`}>
            <h4 className={styles.answerTitle}>Your Answer</h4>
            <textarea
              className={styles.textAreaInput}
              placeholder="Type your detailed explanation or answer here..."
              value={textAnswers[currentIndex] || 'Strong entities have primary keys and can exist independently. Weak entities depend on strong entities. Example: Employee is strong.'}
              onChange={e => setTextAnswers(prev => ({ ...prev, [currentIndex]: e.target.value }))}
            />
            <div className={styles.textFooter}>
              <span className={styles.wordCounter}>
                {(textAnswers[currentIndex] || '').split(/\s+/).filter(Boolean).length} words
              </span>
              <button className={styles.saveAnswerBtn} onClick={handleNext}>
                Save & Continue
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.runnerOverlay}>
      {/* Top Header Bar */}
      <header className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.closeBtn} onClick={onExit} aria-label="Exit Practice">
            <X size={20} />
          </button>
          <span className={styles.topicTitle}>{topicTitle}</span>
        </div>

        <div className={styles.headerCenter}>
          <div className={styles.viewModeTabsContainer} role="tablist" aria-label="Practice View Mode">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'both'}
              className={`${styles.viewModeTab} ${viewMode === 'both' ? styles.viewModeTabActive : ''}`}
              onClick={() => setViewMode('both')}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2.5" />
                <path d="M12 3v18" />
              </svg>
              <span>Both</span>
            </button>
            
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'question'}
              className={`${styles.viewModeTab} ${viewMode === 'question' ? styles.viewModeTabActive : ''}`}
              onClick={() => setViewMode('question')}
            >
              <HelpCircle size={17} strokeWidth={2.2} />
              <span>Question</span>
            </button>
            
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'content'}
              className={`${styles.viewModeTab} ${viewMode === 'content' ? styles.viewModeTabActive : ''}`}
              onClick={() => setViewMode('content')}
            >
              <BookOpen size={17} strokeWidth={2.2} />
              <span>Content</span>
            </button>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button 
            className={styles.navBtnBack} 
            onClick={handleBack}
            disabled={currentIndex === 0}
          >
            <ArrowLeft size={16} />
            <span>BACK</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button className={styles.navBtnNext} onClick={handleNext}>
              <span>NEXT</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button className={styles.navBtnFinish} onClick={handleFinish}>
              <span>SUBMIT</span>
              <Check size={16} />
            </button>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <main className={styles.mainLayout}>
        {/* Left Vertical Question Rail */}
        <aside className={styles.qnoSidebar}>
          <span className={styles.qnoTitle}>Q.NO</span>
          <div className={styles.qnoList}>
            {questions.map((_, idx) => {
              const active = idx === currentIndex;
              const flagged = flaggedIndices.has(idx);
              return (
                <button
                  key={`q-item-${idx}`}
                  className={`${styles.qnoItem} ${active ? styles.qnoItemActive : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {idx + 1}
                  {flagged && (
                    <span className={styles.flagBadgePinned}>
                      <Flag size={9} fill="#FFFFFF" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Area Based on View Mode */}
        {viewMode === 'content' && (
          <div className={styles.contentPanelsSingle}>
            <section className={styles.fullContentCard}>
              <div className={styles.contentCardHeaderRow}>
                <span className={styles.contentSectionLabel}>{DUMMY_TEXTBOOK_PASSAGE.label}</span>
                <button
                  type="button"
                  className={styles.backToQuestionLink}
                  onClick={() => setViewMode('question')}
                >
                  ← Back to Question
                </button>
              </div>

              <h2 className={styles.contentCardTitle}>
                {currentQ.additionalContext?.title || DUMMY_TEXTBOOK_PASSAGE.title}
              </h2>

              {currentQ.additionalContext?.code && (
                <div className={styles.contextCodeCard} style={{ marginBottom: 24, width: '100%' }}>
                  <div className={styles.contextCodeHeader}>
                    <span className={styles.contextLanguage}>{currentQ.additionalContext.language || 'XML'}</span>
                    <span className={styles.contextTitle}>{currentQ.additionalContext.title || 'Context Document'}</span>
                  </div>
                  <pre className={styles.contextCodePre}>
                    <code>{currentQ.additionalContext.code}</code>
                  </pre>
                </div>
              )}

              <div className={styles.contentCardBody}>
                {DUMMY_TEXTBOOK_PASSAGE.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className={styles.contentParagraph}>
                    {p}
                  </p>
                ))}
              </div>
            </section>
          </div>
        )}

        {viewMode === 'question' && (
          <div className={styles.contentPanelsSingle}>
            <section className={styles.questionOnlyCard}>
              <div className={styles.questionCardHeaderRow}>
                <span className={styles.questionOrangeLabel}>
                  QUESTION – {currentIndex + 1}
                </span>

                <button 
                  className={`${styles.flagBtnSmall} ${isFlagged ? styles.flagBtnSmallActive : ''}`}
                  onClick={toggleFlag}
                  type="button"
                >
                  <Flag size={13} fill={isFlagged ? '#FFFFFF' : 'none'} />
                  <span>{isFlagged ? 'FLAGGED' : 'FLAG'}</span>
                </button>
              </div>

              <h2 className={styles.fullQuestionPrompt}>
                {currentQ.prompt}
              </h2>

              <button
                type="button"
                className={styles.viewAdditionalContextBtn}
                onClick={() => setViewMode('content')}
              >
                VIEW ADDITIONAL CONTEXT
              </button>

              {currentQ.image && (
                <div className={styles.questionImageContainer}>
                  <img src={currentQ.image} alt="Question Visual Graphic" className={styles.questionImg} />
                </div>
              )}

              <div className={styles.questionViewAnswerArea}>
                {renderAnswerPanel(true)}
              </div>
            </section>
          </div>
        )}

        {viewMode === 'both' && (
          <div className={styles.contentPanels}>
            {/* Left Panel: Question & Context */}
            <section className={styles.questionPanel}>
              <div className={styles.questionPanelHeader}>
                <div className={styles.questionBadgeArea}>
                  <span className={styles.questionIndex}>Q{currentIndex + 1}</span>
                  {renderQuestionTypeBadge()}
                </div>

                <button 
                  className={`${styles.flagBtn} ${isFlagged ? styles.flagBtnActive : ''}`}
                  onClick={toggleFlag}
                >
                  <Flag size={14} fill={isFlagged ? '#FFFFFF' : 'none'} />
                  <span>{isFlagged ? 'FLAGGED' : 'FLAG'}</span>
                </button>
              </div>

              <h3 className={styles.questionPromptText}>
                {currentQ.prompt}
              </h3>

              {/* Question Image (for Image MCQ or Visual prompts) */}
              {currentQ.image && (
                <div className={styles.questionImageContainer}>
                  <img src={currentQ.image} alt="Question Visual Graphic" className={styles.questionImg} />
                </div>
              )}

              {/* Additional Context Section */}
              <div className={styles.contextSection}>
                <span className={styles.contextLabel}>Additional Context</span>
                {currentQ.additionalContext?.code ? (
                  <div className={styles.contextCodeCard}>
                    <div className={styles.contextCodeHeader}>
                      <span className={styles.contextLanguage}>
                        {currentQ.additionalContext.language || 'XML'}
                      </span>
                      <span className={styles.contextTitle}>
                        {currentQ.additionalContext.title || 'Context Document'}
                      </span>
                    </div>
                    {currentQ.additionalContext.code && (
                      <pre className={styles.contextCodePre}>
                        <code>{currentQ.additionalContext.code}</code>
                      </pre>
                    )}
                    {currentQ.additionalContext.description && (
                      <p style={{ margin: 0, color: '#CBD5E1', fontSize: '0.85rem' }}>
                        {currentQ.additionalContext.description}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className={styles.contextTextbookCard}>
                    <h4 className={styles.contextTextbookTitle}>{DUMMY_TEXTBOOK_PASSAGE.title}</h4>
                    <p className={styles.contextTextbookExcerpt}>
                      {DUMMY_TEXTBOOK_PASSAGE.paragraphs[0]}
                    </p>
                    <button 
                      type="button" 
                      className={styles.readFullContentBtn}
                      onClick={() => setViewMode('content')}
                    >
                      <BookOpen size={14} /> Read full passage in Content tab
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Grip Handle Divider */}
            <div className={styles.splitHandle}>
              <span>:::</span>
            </div>

            {/* Right Panel: Your Answer / Response */}
            <section className={styles.answerPanel}>
              {renderAnswerPanel(false)}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default PracticeRunner;
