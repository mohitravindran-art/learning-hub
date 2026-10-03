import React, { useState } from 'react';
import { X, Target, Sparkles, Layout, Clock, BookOpen, BarChart2, Zap } from 'lucide-react';
import styles from './GeneratePracticeModal.module.css';
import practiceIllustration from '../../assets/practice-illustration.jpg';

interface GeneratePracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle?: string;
  chapterTitle?: string;
  onStartPractice?: (topicTitle: string, config: { numQuestions: number; format: string; difficulty: string }) => void;
}

const GeneratePracticeModal: React.FC<GeneratePracticeModalProps> = ({ 
  isOpen, 
  onClose, 
  topicTitle = "Identify question types",
  chapterTitle = "Chapter 01: Question Understanding",
  onStartPractice
}) => {
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [questionFormat, setQuestionFormat] = useState<string>('ALL');
  const [difficultyLevel, setDifficultyLevel] = useState<string>('Warm-up');

  if (!isOpen) return null;

  const numOptions = [
    { value: 5, label: 'Quick Practice' },
    { value: 10, label: 'Standard Set' },
    { value: 15, label: 'In-Depth Practice' },
    { value: 20, label: 'Extended Set' },
  ];

  const formatOptions = ['ALL', 'MCQ', 'TEXT', 'AUDIO', 'CODE', 'CONVERSATIONAL'];

  const difficultyOptions = [
    { id: 'Warm-up', title: 'Warm-up', desc: 'Simple questions that build understanding', icon: <Target size={18} className={styles.diffIconGreen} /> },
    { id: 'Standard', title: 'Standard', desc: 'Normal questions that test understanding', icon: <BarChart2 size={18} className={styles.diffIconBlue} /> },
    { id: 'Challenge', title: 'Challenge', desc: 'More difficult questions that require deeper thinking', icon: <Zap size={18} className={styles.diffIconRed} /> },
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.leftContent}>
            <h2 className={styles.leftTitle}>Create Your Practice Set</h2>
            <p className={styles.leftSubtitle}>
              Practice set generated specifically for <strong>{topicTitle}</strong> to help you achieve mastery.
            </p>
            
            <ul className={styles.featureList}>
              <li>
                <div className={styles.featureIcon} style={{backgroundColor: '#E5F6EE', color: '#0CA96A'}}><Target size={16} /></div>
                <span>Focused on: <strong>{topicTitle}</strong></span>
              </li>
              <li>
                <div className={styles.featureIcon} style={{backgroundColor: '#E6EEFF', color: '#2B6EE6'}}><Sparkles size={16} /></div>
                <span>AI-generated topic questions</span>
              </li>
              <li>
                <div className={styles.featureIcon} style={{backgroundColor: '#EFE7FF', color: '#7E42FF'}}><Layout size={16} /></div>
                <span>MCQ, Audio, Coding, Text & Chat formats</span>
              </li>
              <li>
                <div className={styles.featureIcon} style={{backgroundColor: '#FFF4E5', color: '#F2994A'}}><Clock size={16} /></div>
                <span>Master one topic at a time</span>
              </li>
            </ul>
          </div>
          
          <div className={styles.illustrationArea}>
            <div className={styles.speechBubble}>
              Tailored practice questions for {topicTitle}!
            </div>
            <img src={practiceIllustration} alt="Practice" className={styles.illustration} />
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>

          <div className={styles.rightHeader}>
            <div className={styles.breadcrumb}>
              <BookOpen size={14} /> {chapterTitle} <span className={styles.dot}>•</span> <span>Topic: {topicTitle}</span>
            </div>
            <h1 className={styles.mainTitle}>Generate Practice: {topicTitle}</h1>
            <p className={styles.mainDesc}>AI will generate an interactive practice set tailored exclusively to this topic.</p>
          </div>

          <div className={styles.formSection}>
            <div className={styles.stepGroup}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>1</div>
                <div>
                  <h3 className={styles.stepTitle}>Number of Questions</h3>
                  <p className={styles.stepDesc}>Choose how many questions you want to practise.</p>
                </div>
              </div>
              <div className={styles.cardsRow} style={{ marginTop: '12px' }}>
                <select 
                  className={styles.questionSelect}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0F172A',
                    backgroundColor: '#F8FAFC',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                  <option value={20}>20 Questions</option>
                </select>
              </div>
            </div>

            <div className={styles.stepGroup}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>2</div>
                <div>
                  <h3 className={styles.stepTitle}>Question Format</h3>
                  <p className={styles.stepDesc}>Select the types of questions you want to include.</p>
                </div>
              </div>
              <div className={styles.pillRow}>
                {formatOptions.map(fmt => (
                  <button 
                    key={fmt}
                    className={`${styles.pillSelect} ${questionFormat === fmt ? styles.activePill : ''}`}
                    onClick={() => setQuestionFormat(fmt)}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.stepGroup}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>3</div>
                <div>
                  <h3 className={styles.stepTitle}>Difficulty Level</h3>
                  <p className={styles.stepDesc}>Choose the challenge level for your practice questions.</p>
                </div>
              </div>
              <div className={styles.cardsRowDiff}>
                {difficultyOptions.map(opt => (
                  <button 
                    key={opt.id}
                    className={`${styles.cardDiff} ${difficultyLevel === opt.id ? styles.activeCardDiff : ''}`}
                    onClick={() => setDifficultyLevel(opt.id)}
                  >
                    <div className={styles.cardDiffHeader}>
                      {opt.icon}
                      <span className={styles.cardDiffTitle}>{opt.title}</span>
                    </div>
                    <span className={styles.cardDiffDesc}>{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className={styles.summaryBox}>
            <div className={styles.summaryIcon}>i</div>
            <div className={styles.summaryText}>
              <strong>Single-Topic Practice Set</strong><br/>
              Generating <strong>{numQuestions} questions</strong> focused on <strong>{topicTitle}</strong> with <strong>{questionFormat === 'ALL' ? 'all formats' : questionFormat}</strong> at <strong>{difficultyLevel}</strong> level.
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
            <button 
              className={styles.btnAdd}
              onClick={() => {
                if (onStartPractice) {
                  onStartPractice(topicTitle, { numQuestions, format: questionFormat, difficulty: difficultyLevel });
                }
                onClose();
              }}
            >
              <BookOpen size={16} /> Add to Practice
            </button>
            <button 
              className={styles.btnStart}
              onClick={() => {
                if (onStartPractice) {
                  onStartPractice(topicTitle, { numQuestions, format: questionFormat, difficulty: difficultyLevel });
                }
                onClose();
              }}
            >
              <div className={styles.playIconWrapper}><div className={styles.playTriangle}></div></div> Start Practice
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default GeneratePracticeModal;
