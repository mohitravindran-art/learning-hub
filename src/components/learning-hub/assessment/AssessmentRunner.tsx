import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Check, 
  ListOrdered, 
  Code as CodeIcon, 
  HelpCircle, 
  CheckSquare, 
  Layers, 
  Send, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronDown, 
  FileText,
  Video,
  Award
} from 'lucide-react';
import type { AssessmentItem } from '../../../types/assessment';
import type { PracticeQuestion, PracticeQuestionFeedbackItem, ChatMessage } from '../../../types/practice';
import { ASSESSMENT_RUNNER_QUESTIONS } from '../../../data/assessmentData';
import { PracticeMatchingNode } from '../practice/runner/PracticeMatchingNode';
import audioOrbImg from '../../../assets/audio-orb.png';
import avatarImg from '../../../assets/learning-hub/avatar.png';
import styles from './AssessmentRunner.module.css';

interface AssessmentRunnerProps {
  assessment: AssessmentItem;
  onExit: () => void;
  onSubmit: (feedbackItems: PracticeQuestionFeedbackItem[], score: number, timeTakenMinutes: number) => void;
  onOpenSubmitModal: () => void;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({
  assessment,
  onExit,
  onSubmit,
  onOpenSubmitModal,
}) => {
  const questions: PracticeQuestion[] = assessment.questions && assessment.questions.length > 0 
    ? (assessment.questions as unknown as PracticeQuestion[]) 
    : ASSESSMENT_RUNNER_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set([1])); // Q2 flagged by default to match screenshot Frame 1000008091

  // Timer countdown: 24:00 (1440 seconds)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(assessment.durationMinutes * 60);

  // Student answer state across question formats
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({ 0: 'b' });
  const [multiAnswers, setMultiAnswers] = useState<Record<number, string[]>>({});
  const [trueFalseAnswers, setTrueFalseAnswers] = useState<Record<number, 'true' | 'false' | null>>({});
  const [matchingAnswers, setMatchingAnswers] = useState<Record<number, Record<string, string>>>({});
  const [dropdownAnswers, setDropdownAnswers] = useState<Record<number, string>>({});
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false);
  const [orderingAnswers, setOrderingAnswers] = useState<Record<number, string[]>>({});
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<number, string>>({ 1: 's2' });
  const [imageAnswers, setImageAnswers] = useState<Record<number, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});

  // Audio recording state
  const [audioRecording, setAudioRecording] = useState<boolean>(false);
  const [audioTime, setAudioTime] = useState<number>(0);

  // Live Camera preview stream ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  // Start live webcam for proctoring in top right
  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCam = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 160, height: 120 },
            audio: false,
          });
          setCameraStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (e) {
        console.warn('Proctored camera note:', e);
      }
    };
    startCam();

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format timer MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex] || questions[0];
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

  const isQuestionAnswered = (idx: number): boolean => {
    const q = questions[idx];
    if (!q) return false;
    if (q.type === 'mcq' || q.type === 'single-select') return Boolean(mcqAnswers[idx]);
    if (q.type === 'scenario') return Boolean(scenarioAnswers[idx]);
    if (q.type === 'image') return Boolean(imageAnswers[idx]);
    if (q.type === 'multi-select') return Boolean(multiAnswers[idx] && multiAnswers[idx].length > 0);
    if (q.type === 'true-false') return trueFalseAnswers[idx] !== undefined && trueFalseAnswers[idx] !== null;
    if (q.type === 'matching') return Boolean(matchingAnswers[idx] && Object.keys(matchingAnswers[idx]).length > 0);
    if (q.type === 'dropdown') return Boolean(dropdownAnswers[idx]);
    if (q.type === 'ordering') return Boolean(orderingAnswers[idx] && orderingAnswers[idx].length > 0);
    if (q.type === 'text') return Boolean(textAnswers[idx] && textAnswers[idx].trim().length > 0);
    return false;
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onOpenSubmitModal();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Bloom badge formatting
  const renderBloomTag = () => {
    const badge = currentQ.bloomBadge || '1-REMEMBER';
    return <span className={styles.bloomTag}>{badge}</span>;
  };

  // Format type badge
  const renderTypeBadge = () => {
    switch (currentQ.type) {
      case 'mcq':
      case 'single-select':
        return (
          <span className={styles.typeBadgeMcq}>
            <CheckSquare size={13} />
            <span>MCQ</span>
          </span>
        );
      case 'scenario':
        return (
          <span className={styles.typeBadgeScenario}>
            <Layers size={13} />
            <span>SCENARIO</span>
          </span>
        );
      case 'matching':
        return (
          <span className={styles.typeBadgeMatching}>
            <ListOrdered size={13} />
            <span>MATCHING</span>
          </span>
        );
      case 'code':
        return (
          <span className={styles.typeBadgeCode}>
            <CodeIcon size={13} />
            <span>CODE</span>
          </span>
        );
      case 'multi-select':
        return (
          <span className={styles.typeBadgeMulti}>
            <CheckSquare size={13} />
            <span>MULTI SELECT</span>
          </span>
        );
      case 'image':
        return (
          <span className={styles.typeBadgeImage}>
            <FileText size={13} />
            <span>RUBRIC IMAGE</span>
          </span>
        );
      default:
        return (
          <span className={styles.typeBadgeDefault}>
            <HelpCircle size={13} />
            <span>QUESTION</span>
          </span>
        );
    }
  };

  return (
    <div className={styles.runnerContainer}>
      {/* ================= TOP HEADER BAR ================= */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onExit}
            aria-label="Exit assessment"
          >
            <X size={18} />
          </button>
          <h2 className={styles.assessmentTitle}>{assessment.name}</h2>
        </div>

        {/* Center Countdown Timer */}
        <div className={styles.timerBadge}>
          <Clock size={16} className={styles.timerIcon} />
          <span className={styles.timerText}>{formatTime(timeLeftSeconds)}</span>
        </div>

        {/* Right Area: Live Proctored Camera & Nav Buttons */}
        <div className={styles.topBarRight}>
          {/* Live Camera Video Preview Widget */}
          <div className={styles.cameraPreviewBox} title="Live Proctored Video Verification">
            {cameraStream ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={styles.cameraVideo} 
              />
            ) : (
              <img 
                src={avatarImg} 
                alt="Student Camera" 
                className={styles.cameraFallbackImg} 
              />
            )}
            <div className={styles.cameraStatusDot} />
          </div>

          {/* BACK Button */}
          <button 
            type="button" 
            className={styles.btnBack}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ArrowLeft size={15} />
            <span>BACK</span>
          </button>

          {/* NEXT / SUBMIT Button */}
          <button 
            type="button" 
            className={currentIndex === questions.length - 1 ? styles.btnSubmitFinal : styles.btnNext}
            onClick={handleNext}
          >
            <span>{currentIndex === questions.length - 1 ? 'SUBMIT' : 'NEXT'}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT SPLIT ================= */}
      <div className={styles.mainLayout}>
        {/* Left Vertical Question Number Rail */}
        <aside className={styles.railSidebar}>
          <div className={styles.railHeader}>Q.NO</div>
          <div className={styles.railScrollArea}>
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const isAns = isQuestionAnswered(idx);
              const isFlag = flaggedIndices.has(idx);

              return (
                <button
                  key={q.id || idx}
                  type="button"
                  className={`${styles.railCircle} ${isCurrent ? styles.railCircleActive : (isAns ? styles.railCircleAnswered : '')}`}
                  onClick={() => setCurrentIndex(idx)}
                  title={`Question ${idx + 1}`}
                >
                  <span>{idx + 1}</span>
                  {/* Flagged Yellow Dot Badge on Top Right */}
                  {isFlag && <span className={styles.railFlagDot} />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center: Question Card */}
        <div className={styles.questionPanel}>
          {/* Metadata Row: Q number, format tag, marks, bloom, and Flagged button */}
          <div className={styles.questionMetaBar}>
            <div className={styles.metaTagsLeft}>
              <span className={styles.qNumLabel}>Q{currentIndex + 1}</span>
              {renderTypeBadge()}
              <span className={styles.marksTag}>{currentQ.points || '2 MARKS'}</span>
              {renderBloomTag()}
            </div>

            {/* FLAGGED Button */}
            <button
              type="button"
              className={`${styles.flagBtn} ${isFlagged ? styles.flagBtnActive : ''}`}
              onClick={toggleFlag}
            >
              <Flag size={13} fill={isFlagged ? 'currentColor' : 'none'} />
              <span>{isFlagged ? 'FLAGGED' : 'FLAG'}</span>
            </button>
          </div>

          {/* Question Text */}
          <h3 className={styles.questionPrompt}>{currentQ.prompt}</h3>

          {/* Context / Code / Passage Section */}
          {currentQ.additionalContext && (
            <div className={styles.contextContainer}>
              <h4 className={styles.contextSubtitle}>Additional Context</h4>
              <div className={styles.codeSnippetBox}>
                <div className={styles.codeTopBar}>
                  <span className={styles.codeLang}>{currentQ.additionalContext.language || 'XML'}</span>
                  <span className={styles.codeSnippetTitle}>{currentQ.additionalContext.title}</span>
                </div>
                <pre className={styles.codePre}>
                  <code>{currentQ.additionalContext.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Case Context for Scenario */}
          {currentQ.context && (
            <div className={styles.scenarioContextCard}>
              <span className={styles.caseBadge}>CASE CONTEXT</span>
              <p className={styles.caseText}>{currentQ.context}</p>
            </div>
          )}

          {/* Image for Rubric MCQ */}
          {currentQ.image && (
            <div className={styles.imageViewerContainer}>
              <h4 className={styles.contextSubtitle}>Evaluation Visual / Rubric</h4>
              <div className={styles.rubricImgBox}>
                <img src={currentQ.image} alt="Assessment Rubric Matrix" className={styles.rubricImg} />
              </div>
            </div>
          )}
        </div>

        {/* Right: Answer Interaction Card */}
        <div className={styles.answerPanel}>
          <div className={styles.answerHeader}>
            <h4 className={styles.answerHeading}>Your Answer</h4>
            <span className={styles.answerHint}>Select or record your response</span>
          </div>

          <div className={styles.answerBody}>
            {/* 1. MCQ & Scenario Single Select */}
            {(currentQ.type === 'mcq' || currentQ.type === 'single-select' || currentQ.type === 'scenario' || currentQ.type === 'image') && currentQ.options && (
              <div className={styles.mcqOptionsList}>
                {currentQ.options.map((opt, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const isSelected = currentQ.type === 'scenario' 
                    ? scenarioAnswers[currentIndex] === opt.id || scenarioAnswers[currentIndex] === opt.text
                    : currentQ.type === 'image'
                      ? imageAnswers[currentIndex] === opt.id || imageAnswers[currentIndex] === opt.text
                      : mcqAnswers[currentIndex] === opt.id || mcqAnswers[currentIndex] === letter;

                  const handleSelect = () => {
                    if (currentQ.type === 'scenario') {
                      setScenarioAnswers(prev => ({ ...prev, [currentIndex]: opt.id }));
                    } else if (currentQ.type === 'image') {
                      setImageAnswers(prev => ({ ...prev, [currentIndex]: opt.id }));
                    } else {
                      setMcqAnswers(prev => ({ ...prev, [currentIndex]: letter }));
                    }
                  };

                  return (
                    <div
                      key={opt.id}
                      className={`${styles.mcqOptionCard} ${isSelected ? styles.mcqOptionSelected : ''}`}
                      onClick={handleSelect}
                    >
                      <div className={`${styles.optionLetterBadge} ${isSelected ? styles.optionLetterSelected : ''}`}>
                        {letter}
                      </div>
                      <span className={styles.optionText}>{opt.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. Multi-Select */}
            {currentQ.type === 'multi-select' && currentQ.options && (
              <div className={styles.mcqOptionsList}>
                {currentQ.options.map((opt, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const currentSelected = multiAnswers[currentIndex] || [];
                  const isSelected = currentSelected.includes(opt.id) || currentSelected.includes(opt.text);

                  const toggleMulti = () => {
                    setMultiAnswers(prev => {
                      const list = prev[currentIndex] || [];
                      const next = isSelected 
                        ? list.filter(id => id !== opt.id && id !== opt.text)
                        : [...list, opt.id];
                      return { ...prev, [currentIndex]: next };
                    });
                  };

                  return (
                    <div
                      key={opt.id}
                      className={`${styles.mcqOptionCard} ${isSelected ? styles.mcqOptionSelected : ''}`}
                      onClick={toggleMulti}
                    >
                      <div className={`${styles.multiCheckbox} ${isSelected ? styles.multiCheckboxActive : ''}`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className={styles.optionText}>{opt.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 3. True / False */}
            {currentQ.type === 'true-false' && (
              <div className={styles.tfGrid}>
                <div
                  className={`${styles.tfCard} ${trueFalseAnswers[currentIndex] === 'true' ? styles.tfSelected : ''}`}
                  onClick={() => setTrueFalseAnswers(prev => ({ ...prev, [currentIndex]: 'true' }))}
                >
                  <span className={styles.tfTitle}>TRUE</span>
                  <span className={styles.tfDesc}>Statement is accurate</span>
                </div>
                <div
                  className={`${styles.tfCard} ${trueFalseAnswers[currentIndex] === 'false' ? styles.tfSelected : ''}`}
                  onClick={() => setTrueFalseAnswers(prev => ({ ...prev, [currentIndex]: 'false' }))}
                >
                  <span className={styles.tfTitle}>FALSE</span>
                  <span className={styles.tfDesc}>Statement is inaccurate</span>
                </div>
              </div>
            )}

            {/* 4. Interactive Matching Nodes */}
            {currentQ.type === 'matching' && (
              <div className={styles.matchingContainer}>
                <PracticeMatchingNode
                  question={currentQ}
                  selectedMatches={matchingAnswers[currentIndex] || {}}
                  onMatchesChange={(matches) => {
                    setMatchingAnswers(prev => ({ ...prev, [currentIndex]: matches }));
                  }}
                  onReset={() => {
                    setMatchingAnswers(prev => ({ ...prev, [currentIndex]: {} }));
                  }}
                />
              </div>
            )}

            {/* 5. Dropdown Selection */}
            {currentQ.type === 'dropdown' && currentQ.options && (
              <div className={styles.dropdownArea}>
                <p className={styles.dropdownSentence}>
                  Select the most appropriate term for the highlighted blank:
                </p>
                <div className={styles.dropdownSelectBox}>
                  <select 
                    className={styles.dropdownSelect}
                    value={dropdownAnswers[currentIndex] || ''}
                    onChange={(e) => setDropdownAnswers(prev => ({ ...prev, [currentIndex]: e.target.value }))}
                  >
                    <option value="">-- Choose Option --</option>
                    {currentQ.options.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.text}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* 6. Ordering / Reordering */}
            {currentQ.type === 'ordering' && currentQ.options && (
              <div className={styles.orderingStack}>
                <span className={styles.orderingHint}>Arrange in chronological sequence:</span>
                {(orderingAnswers[currentIndex] || currentQ.options.map(o => o.text)).map((step, sIdx) => (
                  <div key={sIdx} className={styles.orderingCard}>
                    <div className={styles.orderPosNum}>{sIdx + 1}</div>
                    <span className={styles.orderText}>{step}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 7. Code Input */}
            {currentQ.type === 'code' && (
              <div className={styles.codeEditorArea}>
                <div className={styles.editorTopBar}>
                  <span>JAVASCRIPT EDITOR</span>
                  <span>Line Numbers Enabled</span>
                </div>
                <textarea
                  className={styles.codeTextarea}
                  defaultValue={currentQ.codeData?.starterCode || `function solution() {\n  // Code here\n}`}
                  rows={8}
                />
              </div>
            )}

            {/* 8. Text Input */}
            {currentQ.type === 'text' && (
              <div className={styles.textAreaBox}>
                <textarea
                  className={styles.studentTextarea}
                  placeholder="Type your structured explanation here (150-300 words recommended)..."
                  value={textAnswers[currentIndex] || ''}
                  onChange={(e) => setTextAnswers(prev => ({ ...prev, [currentIndex]: e.target.value }))}
                  rows={9}
                />
                <div className={styles.textareaFooter}>
                  <span>Words: {(textAnswers[currentIndex] || '').trim().split(/\s+/).filter(Boolean).length}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentRunner;
