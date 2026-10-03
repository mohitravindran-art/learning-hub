import React, { useState } from 'react';
import styles from './CreateMissionModal.module.css';
import MissionGeneration from './MissionGeneration';
import MissionReady from './MissionReady';

interface CreateMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (config: any) => void;
  onLaunch: () => void;
}

type ModalState = 'config' | 'generating' | 'ready';

const CreateMissionModal: React.FC<CreateMissionModalProps> = ({ isOpen, onClose, onGenerate, onLaunch }) => {
  const [missionName, setMissionName] = useState('');
  const [module, setModule] = useState('Universal Communication');
  const [topic, setTopic] = useState('Question Understanding');
  const [subtopic, setSubtopic] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [formats, setFormats] = useState<string[]>(['ALL']);
  const [challengeLevel, setChallengeLevel] = useState('CHALLENGE');
  const [modalState, setModalState] = useState<ModalState>('config');

  if (!isOpen) return null;

  const handleFormatToggle = (format: string) => {
    if (format === 'ALL') {
      setFormats(['ALL']);
      return;
    }
    
    let newFormats = formats.filter(f => f !== 'ALL');
    if (newFormats.includes(format)) {
      newFormats = newFormats.filter(f => f !== format);
    } else {
      newFormats.push(format);
    }
    
    if (newFormats.length === 0) newFormats = ['ALL'];
    setFormats(newFormats);
  };

  const handleGenerateClick = () => {
    setModalState('generating');
    onGenerate({
      name: missionName || 'Custom Mission',
      module,
      topic,
      subtopic,
      questionCount,
      formats,
      challengeLevel
    });
  };

  const handleClose = () => {
    setModalState('config'); // Reset on close
    onClose();
  };

  const handleLaunch = () => {
    setModalState('config');
    onLaunch();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {modalState === 'config' && (
          <>
            <div className={styles.header}>
              <div>
                <h2 className={styles.title}>Create Practice Mission</h2>
                <p className={styles.subtitle}>Choose what you want to practise and we'll build your mission.</p>
              </div>
              <button className={styles.closeBtn} onClick={handleClose}>&times;</button>
            </div>

            <div className={styles.body}>
              <div className={styles.formSection}>
                <div className={styles.stepIndicator}>1</div>
                <div className={styles.formGroup}>
                  <label>Mission Details</label>
                  <p className={styles.helperText}>Mission Name (Optional)</p>
                  <input 
                    type="text" 
                    placeholder="e.g. Interview Warm-up"
                    value={missionName}
                    onChange={e => setMissionName(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.stepIndicator}>2</div>
                <div className={styles.formGroup}>
                  <label>Select Content</label>
                  <div className={styles.selectGroup}>
                    <span className={styles.selectLabel}>Module</span>
                    <select value={module} onChange={e => setModule(e.target.value)} className={styles.select}>
                      <option value="Universal Communication">Universal Communication</option>
                    </select>
                  </div>
                  <div className={styles.selectGroup}>
                    <span className={styles.selectLabel}>Topic</span>
                    <select value={topic} onChange={e => setTopic(e.target.value)} className={styles.select}>
                      <option value="Question Understanding">Question Understanding</option>
                      <option value="Thinking Before Speaking">Thinking Before Speaking</option>
                      <option value="Structuring Your Answer">Structuring Your Answer</option>
                    </select>
                  </div>
                  <div className={styles.selectGroup}>
                    <span className={styles.selectLabel}>Subtopic</span>
                    <select value={subtopic} onChange={e => setSubtopic(e.target.value)} className={styles.select}>
                      <option value="all">All Subtopics</option>
                      <option value="Identify question types">Identify question types</option>
                      <option value="Handle multi-part questions">Handle multi-part questions</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.stepIndicator}>3</div>
                <div className={styles.formGroup}>
                  <label>Number of Questions</label>
                  <div className={styles.cardsGrid}>
                    {[5, 10, 15, 20].map(num => (
                      <div 
                        key={num}
                        className={`${styles.selectableCard} ${questionCount === num ? styles.selected : ''}`}
                        onClick={() => setQuestionCount(num)}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.stepIndicator}>4</div>
                <div className={styles.formGroup}>
                  <label>Question Format</label>
                  <div className={styles.pillsGrid}>
                    {['ALL', 'MCQ', 'TEXT', 'AUDIO', 'CODE', 'CONVERSATIONAL'].map(fmt => (
                      <div 
                        key={fmt}
                        className={`${styles.pill} ${formats.includes(fmt) ? styles.pillSelected : ''}`}
                        onClick={() => handleFormatToggle(fmt)}
                      >
                        {fmt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.stepIndicator}>5</div>
                <div className={styles.formGroup}>
                  <label>Challenge Level</label>
                  <div className={styles.challengeGrid}>
                    <div 
                      className={`${styles.challengeCard} ${challengeLevel === 'WARM-UP' ? styles.challengeSelected : ''}`}
                      onClick={() => setChallengeLevel('WARM-UP')}
                    >
                      <h4>Warm-up</h4>
                      <p>Build confidence</p>
                    </div>
                    <div 
                      className={`${styles.challengeCard} ${challengeLevel === 'CHALLENGE' ? styles.challengeSelected : ''}`}
                      onClick={() => setChallengeLevel('CHALLENGE')}
                    >
                      <h4>Challenge</h4>
                      <p>Test your understanding</p>
                    </div>
                    <div 
                      className={`${styles.challengeCard} ${challengeLevel === 'EXPERT' ? styles.challengeSelected : ''}`}
                      onClick={() => setChallengeLevel('EXPERT')}
                    >
                      <h4>Expert</h4>
                      <p>Push yourself further</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.footerInner}>
                <div className={styles.targetIcon}>🎯</div>
                <div className={styles.footerContent}>
                  <h4 className={styles.footerTitle}>Mission Ready</h4>
                  <p className={styles.footerSubtitle}>We'll generate {questionCount} questions on:</p>
                  <ul className={styles.footerList}>
                    <li>• {module}</li>
                    <li>• {topic}</li>
                    <li>• {formats.join(', ')} • <span style={{ textTransform: 'capitalize' }}>{challengeLevel.toLowerCase()}</span></li>
                  </ul>
                </div>
                <div className={styles.footerActions}>
                  <button className={styles.cancelBtn} onClick={handleClose}>Cancel</button>
                  <button className={styles.generateBtn} onClick={handleGenerateClick}>Generate Mission &rarr;</button>
                </div>
              </div>
            </div>
          </>
        )}

        {modalState === 'generating' && (
          <MissionGeneration onComplete={() => setModalState('ready')} />
        )}

        {modalState === 'ready' && (
          <MissionReady 
            missionName={missionName || 'Custom Mission'}
            questionCount={questionCount}
            onLaunch={handleLaunch}
            onBack={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default CreateMissionModal;
