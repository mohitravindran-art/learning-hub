import React, { useState } from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Calendar, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  Volume2, 
  Mic, 
  Eye, 
  ChevronRight,
  ExternalLink,
  Info
} from 'lucide-react';
import type { AssessmentItem } from '../../../types/assessment';
import { generateInterviewDetailRounds, type InterviewRoundDetail } from '../../../data/assessmentData';
import styles from './AssessmentDetailsModal.module.css';

interface AssessmentDetailsModalProps {
  assessment: AssessmentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRetake?: (assessment: AssessmentItem) => void;
}

export const AssessmentDetailsModal: React.FC<AssessmentDetailsModalProps> = ({
  assessment,
  isOpen,
  onClose,
  onRetake
}) => {
  if (!isOpen || !assessment) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'transcripts' | 'proctor'>('overview');
  const [selectedRoundIndex, setSelectedRoundIndex] = useState<number>(0);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const rounds: InterviewRoundDetail[] = generateInterviewDetailRounds(assessment);
  const currentRound = rounds[selectedRoundIndex] || rounds[0];

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const competencies = assessment.competencyScores || {
    technical: 95,
    communication: 92,
    problemSolving: 90,
    leadership: 91
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* Top Sticky Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.tagRow}>
              <span className={assessment.source === 'Self-Created' ? styles.sourceSelf : styles.sourceLibrary}>
                {assessment.source || 'Interview Library'}
              </span>
              <span className={styles.difficultyBadge}>{assessment.difficulty || 'Advance'}</span>
              <span className={styles.verifiedBadge}>
                <ShieldCheck size={14} className={styles.shieldIcon} /> AI Proctored & Verified
              </span>
            </div>
            <h1 className={styles.roleTitle}>
              {assessment.role || 'Software Engineer'}
              <span className={styles.companyName}>@ {assessment.company || 'Google'}</span>
            </h1>
            <div className={styles.metaRow}>
              <span><Calendar size={14} /> Completed: {assessment.completedDate || '12 Jul 2026'}</span>
              <span><Clock size={14} /> Duration: {assessment.timeSpentMinutes || 38} mins</span>
              <span><Award size={14} /> Rounds: 5/5 Completed</span>
            </div>
          </div>

          <div className={styles.headerActions}>
            <button className={styles.secondaryBtn} onClick={handleDownloadPdf} title="Export Report">
              <Download size={16} />
              <span>Export PDF</span>
            </button>
            {onRetake && (
              <button className={styles.retakeBtn} onClick={() => onRetake(assessment)}>
                <RotateCcw size={16} />
                <span>Retake</span>
              </button>
            )}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className={styles.tabsBar}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Sparkles size={16} />
            <span>Executive Performance Overview</span>
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'transcripts' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('transcripts')}
          >
            <Mic size={16} />
            <span>Interview Transcripts & Rubrics ({rounds.length})</span>
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'proctor' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('proctor')}
          >
            <Eye size={16} />
            <span>Behavioral & Proctor Metrics</span>
          </button>
        </div>

        {/* Modal Scrollable Content Area */}
        <div className={styles.contentBody}>
          {activeTab === 'overview' && (
            <div className={styles.overviewSection}>
              {/* Score Highlight Banner */}
              <div className={styles.verdictBanner}>
                <div className={styles.scoreDial}>
                  <span className={styles.dialScore}>{assessment.score || 92}%</span>
                  <span className={styles.dialLabel}>Overall Score</span>
                </div>
                <div className={styles.verdictContent}>
                  <div className={styles.verdictHeader}>
                    <span className={styles.hireBadge}>STRONG HIRE RECOMMENDED</span>
                    <span className={styles.percentileBadge}>Top 4% Candidate Pool</span>
                  </div>
                  <p className={styles.verdictDescription}>
                    {assessment.summaryFeedback || 
                      'Outstanding interview loop execution. Strong Hire rating recommended across technical depth, system design trade-offs, and behavioral ownership. Demonstrated remarkable composure and structured delivery throughout.'}
                  </p>
                </div>
              </div>

              {/* 4 Competency Score Dimensions */}
              <div className={styles.competencyGrid}>
                <div className={styles.competencyCard}>
                  <div className={styles.compHeader}>
                    <span className={styles.compName}>Technical Mastery & Systems</span>
                    <span className={styles.compVal}>{competencies.technical}%</span>
                  </div>
                  <div className={styles.compTrack}>
                    <div className={styles.compFill} style={{ width: `${competencies.technical}%`, backgroundColor: '#10B981' }}></div>
                  </div>
                  <span className={styles.compNote}>Exceptional depth in distributed ID generation & cache coherence.</span>
                </div>

                <div className={styles.competencyCard}>
                  <div className={styles.compHeader}>
                    <span className={styles.compName}>Structured Communication</span>
                    <span className={styles.compVal}>{competencies.communication}%</span>
                  </div>
                  <div className={styles.compTrack}>
                    <div className={styles.compFill} style={{ width: `${competencies.communication}%`, backgroundColor: '#3B82F6' }}></div>
                  </div>
                  <span className={styles.compNote}>Seamless STAR framework execution with concise metric summaries.</span>
                </div>

                <div className={styles.competencyCard}>
                  <div className={styles.compHeader}>
                    <span className={styles.compName}>Algorithmic Problem Solving</span>
                    <span className={styles.compVal}>{competencies.problemSolving}%</span>
                  </div>
                  <div className={styles.compTrack}>
                    <div className={styles.compFill} style={{ width: `${competencies.problemSolving}%`, backgroundColor: '#8B5CF6' }}></div>
                  </div>
                  <span className={styles.compNote}>Optimal O(1) eviction concurrency design and zero edge-case misses.</span>
                </div>

                <div className={styles.competencyCard}>
                  <div className={styles.compHeader}>
                    <span className={styles.compName}>Pressure Composure & Leadership</span>
                    <span className={styles.compVal}>{competencies.leadership}%</span>
                  </div>
                  <div className={styles.compTrack}>
                    <div className={styles.compFill} style={{ width: `${competencies.leadership}%`, backgroundColor: '#F59E0B' }}></div>
                  </div>
                  <span className={styles.compNote}>Utilized intentional 2-second strategic pauses; zero filler words.</span>
                </div>
              </div>

              {/* Strengths & Improvements Columns */}
              <div className={styles.twoColumnGrid}>
                <div className={styles.strengthsCard}>
                  <div className={styles.columnTitle}>
                    <CheckCircle2 size={18} className={styles.successIcon} />
                    <span>Demonstrated Strengths</span>
                  </div>
                  <ul className={styles.bulletList}>
                    {(assessment.strengths || [
                      'Comprehensive STAR-structured explanation of distributed cache coherence and consistency trade-offs.',
                      'Demonstrated high composure with strategic 2-second pauses before complex technical answers.',
                      'Clear quantitative trade-off analysis between write-heavy sharding strategies vs read latency.',
                      'Strong eye-contact (98%) and optimal conversational cadence (135 words/minute).'
                    ]).map((s, idx) => (
                      <li key={idx} className={styles.bulletItem}>
                        <CheckCircle2 size={15} className={styles.bulletCheck} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.improvementsCard}>
                  <div className={styles.columnTitle}>
                    <AlertTriangle size={18} className={styles.warningIcon} />
                    <span>High-Impact Growth Areas</span>
                  </div>
                  <ul className={styles.bulletList}>
                    {(assessment.improvements || [
                      'Proactively clarify non-functional bandwidth constraints before sketching the relational schema.',
                      'Summarize bottom-line business metrics earlier in behavioral conflict resolution stories.',
                      'Elaborate on memory footprint overhead when selecting cache eviction policies (TinyLFU vs LRU).'
                    ]).map((item, idx) => (
                      <li key={idx} className={styles.bulletItem}>
                        <AlertTriangle size={15} className={styles.bulletAlert} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Proctor & Session Summary Banner */}
              <div className={styles.proctorBanner}>
                <div className={styles.proctorBadgeGroup}>
                  <div className={styles.proctorMetric}>
                    <span className={styles.metricVal}>98%</span>
                    <span className={styles.metricLabel}>Eye Contact Integrity</span>
                  </div>
                  <div className={styles.metricDivider}></div>
                  <div className={styles.proctorMetric}>
                    <span className={styles.metricVal}>135 wpm</span>
                    <span className={styles.metricLabel}>Speaking Cadence</span>
                  </div>
                  <div className={styles.metricDivider}></div>
                  <div className={styles.proctorMetric}>
                    <span className={styles.metricVal}>2 words</span>
                    <span className={styles.metricLabel}>Filler Word Count</span>
                  </div>
                  <div className={styles.metricDivider}></div>
                  <div className={styles.proctorMetric}>
                    <span className={styles.metricVal}>100%</span>
                    <span className={styles.metricLabel}>Session Authenticity</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transcripts' && (
            <div className={styles.transcriptLayout}>
              {/* Left Column: Round Picker List */}
              <div className={styles.roundsSidebar}>
                <div className={styles.sidebarHeader}>Interview Rounds ({rounds.length})</div>
                <div className={styles.roundsList}>
                  {rounds.map((r, index) => (
                    <button
                      key={r.id}
                      className={`${styles.roundPickerItem} ${selectedRoundIndex === index ? styles.roundPickerActive : ''}`}
                      onClick={() => setSelectedRoundIndex(index)}
                    >
                      <div className={styles.roundItemTop}>
                        <span className={styles.roundBadge}>Round {r.roundNumber}</span>
                        <span className={styles.roundScore}>{r.score}%</span>
                      </div>
                      <div className={styles.roundCategory}>{r.category}</div>
                      <div className={styles.roundDuration}><Clock size={12} /> {r.audioDuration}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Full Round Details & Transcript */}
              <div className={styles.roundDetailView}>
                <div className={styles.roundDetailHeader}>
                  <div>
                    <span className={styles.roundCategoryPill}>{currentRound.category}</span>
                    <h2 className={styles.questionTitle}>Round {currentRound.roundNumber}: {currentRound.prompt}</h2>
                    <div className={styles.interviewerMeta}>
                      <span>Interviewer: <strong>{currentRound.interviewerName}</strong> ({currentRound.interviewerRole})</span>
                    </div>
                  </div>
                  <div className={styles.roundScorePill}>
                    <span className={styles.scoreNum}>{currentRound.score}%</span>
                    <span className={styles.scoreText}>{currentRound.scoreLabel}</span>
                  </div>
                </div>

                {/* Candidate Response Transcript */}
                <div className={styles.transcriptBox}>
                  <div className={styles.transcriptBoxHeader}>
                    <div className={styles.transcriptTitle}>
                      <Volume2 size={16} /> Candidate Spoken Transcript ({currentRound.audioDuration})
                    </div>
                    <span className={styles.audioPill}>Audio Evaluated</span>
                  </div>
                  <p className={styles.transcriptText}>
                    "{currentRound.candidateResponseTranscript}"
                  </p>
                </div>

                {/* AI Evaluator Analysis */}
                <div className={styles.aiAnalysisCard}>
                  <div className={styles.aiAnalysisHeader}>
                    <Sparkles size={16} className={styles.sparkleIcon} />
                    <span>AI Evaluator Assessment & Key Observations</span>
                  </div>
                  <p className={styles.aiAnalysisText}>{currentRound.aiAnalysis}</p>
                </div>

                {/* Rubric Breakdown */}
                <div className={styles.rubricSection}>
                  <h3 className={styles.rubricTitle}>Rubric Scoring Criteria</h3>
                  <div className={styles.rubricGrid}>
                    {currentRound.rubricCriterion.map((c, i) => (
                      <div key={i} className={styles.rubricCard}>
                        <div className={styles.rubricHeader}>
                          <span className={styles.rubricName}>{c.name}</span>
                          <span className={styles.rubricScore}>{c.score}%</span>
                        </div>
                        <p className={styles.rubricFeedback}>{c.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'proctor' && (
            <div className={styles.proctorDetailSection}>
              <div className={styles.proctorGrid}>
                <div className={styles.proctorCard}>
                  <div className={styles.pCardHeader}>
                    <Eye size={20} className={styles.pIconBlue} />
                    <h4>Visual Presence & Gaze Consistency</h4>
                  </div>
                  <div className={styles.bigStat}>98%</div>
                  <p className={styles.pDescription}>
                    Candidate maintained steady eye-contact with the camera lens throughout 98% of verbal responses, signaling high confidence and engagement.
                  </p>
                  <div className={styles.pTag}>Optimal Eye Gaze</div>
                </div>

                <div className={styles.proctorCard}>
                  <div className={styles.pCardHeader}>
                    <Mic size={20} className={styles.pIconGreen} />
                    <h4>Speaking Pace & Articulation</h4>
                  </div>
                  <div className={styles.bigStat}>135 wpm</div>
                  <p className={styles.pDescription}>
                    The recommended target speaking speed for technical interviews is 125-145 words per minute. Delivery remained clear, deliberate, and easy to parse.
                  </p>
                  <div className={styles.pTag}>Balanced Conversational Flow</div>
                </div>

                <div className={styles.proctorCard}>
                  <div className={styles.pCardHeader}>
                    <AlertTriangle size={20} className={styles.pIconAmber} />
                    <h4>Filler Word Analysis</h4>
                  </div>
                  <div className={styles.bigStat}>2 fillers</div>
                  <p className={styles.pDescription}>
                    Only 2 instances of "um/uh" were detected across 38 minutes of dialogue. Strategic 2-second pauses effectively replaced filler habits.
                  </p>
                  <div className={styles.pTag}>Top Tier Delivery</div>
                </div>
              </div>

              <div className={styles.securityAuditBox}>
                <div className={styles.secHeader}>
                  <ShieldCheck size={20} className={styles.secShield} />
                  <div>
                    <h4>Automated Proctor Integrity Certificate</h4>
                    <p>Verified by RateEd.AI Proctor Engine • Session Hash: #8F9A-4921-Google-SWE</p>
                  </div>
                </div>
                <div className={styles.secCheckList}>
                  <div className={styles.secItem}><CheckCircle2 size={16} className={styles.greenCheck} /> Single Face Recognized in Frame</div>
                  <div className={styles.secItem}><CheckCircle2 size={16} className={styles.greenCheck} /> Audio Stream Isolated — Zero Background Interference</div>
                  <div className={styles.secItem}><CheckCircle2 size={16} className={styles.greenCheck} /> No Browser Tab Switching Detected</div>
                  <div className={styles.secItem}><CheckCircle2 size={16} className={styles.greenCheck} /> Live Audio Biomarker Verification Passed</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.footerInfo}>
              Assessment ID: <strong>{assessment.id}</strong> • Role: <strong>{assessment.role || 'Software Engineer'}</strong>
            </span>
          </div>
          <div className={styles.footerRight}>
            <button className={styles.shareBtn} onClick={handleShare}>
              {copiedNotification ? 'Link Copied!' : 'Share Assessment Report'}
            </button>
            <button className={styles.closeActionBtn} onClick={onClose}>
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetailsModal;
