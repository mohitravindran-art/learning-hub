import React, { useState } from 'react';
import { Info, Clock, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import type { AssessmentItem } from '../../../types/assessment';
import styles from './AssessmentTable.module.css';

interface AssessmentTableProps {
  assessments: AssessmentItem[];
  onAction: (id: string, action: 'start' | 'continue' | 'feedback' | 'details') => void;
  isHistory?: boolean;
}

export const AssessmentTable: React.FC<AssessmentTableProps> = ({
  assessments,
  onAction,
  isHistory = false,
}) => {
  const [activeTooltip, setActiveTooltip] = useState<{ id: string; type: 'assessment' | 'chapter' | 'topic' } | null>(null);

  if (assessments.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyText}>
          {isHistory
            ? 'No completed assessments yet. Complete an assessment to see detailed feedback and scores.'
            : 'No active assessments right now. Create an assessment or select one to begin.'}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableCard}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={`${styles.th} ${styles.thAssessment}`}>ASSESSMENT</th>
              <th className={`${styles.th} ${styles.thCenter}`}>CHAPTER</th>
              <th className={`${styles.th} ${styles.thCenter}`}>TOPIC</th>
              <th className={`${styles.th} ${styles.thCenter}`}>QUESTIONS</th>
              <th className={`${styles.th} ${styles.thCenter}`}>LEVEL</th>
              <th className={`${styles.th} ${styles.thCenter}`}>SCORE / PROGRESS</th>
              <th className={`${styles.th} ${styles.thCenter}`}>STATUS</th>
              <th className={`${styles.th} ${styles.thCenter}`}>DATE</th>
              <th className={`${styles.th} ${styles.thAction}`}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((item) => {
              const completedQ = item.completedQuestions || 0;
              const totalQ = item.totalQuestions || 20;
              const progressPct = totalQ > 0 ? Math.round((completedQ / totalQ) * 100) : 0;

              return (
                <tr key={item.id} className={styles.tr}>
                  {/* 1. ASSESSMENT */}
                  <td className={`${styles.td} ${styles.tdAssessment}`}>
                    <div className={styles.assessmentTitleWrapper}>
                      <span className={styles.assessmentTitle}>{item.name}</span>
                      <div
                        className={styles.infoBtnWrapper}
                        onMouseEnter={() => setActiveTooltip({ id: item.id, type: 'assessment' })}
                        onMouseLeave={() => setActiveTooltip(null)}
                      >
                        <button
                          type="button"
                          className={styles.infoBtn}
                          aria-label="Assessment details info"
                        >
                          <Info size={15} />
                        </button>
                        {activeTooltip?.id === item.id && activeTooltip.type === 'assessment' && (
                          <div className={styles.tooltipBox}>
                            <div className={styles.tooltipTitle}>{item.name}</div>
                            <p className={styles.tooltipText}>{item.description}</p>
                            <div className={styles.tooltipMeta}>
                              Duration: {item.durationMinutes} min &bull; Level: {item.difficulty}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* 2. CHAPTER */}
                  <td className={`${styles.td} ${styles.tdCenter}`}>
                    <div
                      className={styles.scopeWrapper}
                      onMouseEnter={() => setActiveTooltip({ id: item.id, type: 'chapter' })}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <button type="button" className={styles.scopePill}>
                        <span>{item.chapter || `${item.selectedChapters?.length || 2} Chapters`}</span>
                        <Info size={13} className={styles.scopeInfoIcon} />
                      </button>
                      {activeTooltip?.id === item.id && activeTooltip.type === 'chapter' && (
                        <div className={styles.tooltipBox}>
                          <div className={styles.tooltipTitle}>Covered Chapters</div>
                          <ul className={styles.tooltipList}>
                            {(item.selectedChapters || ['Chapter 01 — Question Understanding', 'Chapter 02 — Thinking Before Speaking']).map((ch, idx) => (
                              <li key={idx}>{ch}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* 3. TOPIC */}
                  <td className={`${styles.td} ${styles.tdCenter}`}>
                    <div
                      className={styles.scopeWrapper}
                      onMouseEnter={() => setActiveTooltip({ id: item.id, type: 'topic' })}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <button type="button" className={styles.scopePill}>
                        <span>{item.topic || `${item.selectedTopics?.length || 3} Topics`}</span>
                        <Info size={13} className={styles.scopeInfoIcon} />
                      </button>
                      {activeTooltip?.id === item.id && activeTooltip.type === 'topic' && (
                        <div className={styles.tooltipBox}>
                          <div className={styles.tooltipTitle}>Covered Topics</div>
                          <ul className={styles.tooltipList}>
                            {(item.selectedTopics || ['Identify Question Types', 'Understanding Intent', 'Active Listening']).map((tp, idx) => (
                              <li key={idx}>{tp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* 4. QUESTIONS */}
                  <td className={`${styles.td} ${styles.tdCenter}`}>
                    <span className={styles.questionsCount}>{item.totalQuestions}</span>
                  </td>

                  {/* 5. LEVEL */}
                  <td className={`${styles.td} ${styles.tdCenter}`}>
                    <span
                      className={`${styles.levelBadge} ${
                        item.difficulty === 'Challenge'
                          ? styles.levelChallenge
                          : item.difficulty === 'Advance'
                          ? styles.levelAdvance
                          : styles.levelStandard
                      }`}
                    >
                      {item.difficulty}
                    </span>
                  </td>

                  {/* 6. SCORE / PROGRESS */}
                  <td className={`${styles.td} ${styles.tdCenter}`}>
                    {isHistory || item.status === 'completed' ? (
                      <span className={styles.scoreGreen}>
                        {item.score !== undefined ? `${item.score}%` : '90%'}
                      </span>
                    ) : item.status === 'in-progress' ? (
                      <div className={styles.progressCell}>
                        <div className={styles.progressBarTrack}>
                          <div
                            className={styles.progressBarFill}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <span className={styles.progressLabel}>
                          {completedQ}/{totalQ} ({progressPct}%)
                        </span>
                      </div>
                    ) : (
                      <span className={styles.dashText}>—</span>
                    )}
                  </td>

                  {/* 7. STATUS */}
                  <td className={`${styles.td} ${styles.tdCenter}`}>
                    {item.status === 'in-progress' && (
                      <span className={`${styles.statusPill} ${styles.statusInProgress}`}>
                        <Clock size={13} strokeWidth={2.5} />
                        <span>In Progress</span>
                      </span>
                    )}
                    {item.status === 'upcoming' && (
                      <span className={`${styles.statusPill} ${styles.statusUpcoming}`}>
                        <Calendar size={13} strokeWidth={2} />
                        <span>Upcoming</span>
                      </span>
                    )}
                    {(item.status === 'completed' || isHistory) && (
                      <span className={`${styles.statusPill} ${styles.statusCompleted}`}>
                        <CheckCircle2 size={13} strokeWidth={2.5} />
                        <span>Completed</span>
                      </span>
                    )}
                  </td>

                  {/* 8. DATE */}
                  <td className={`${styles.td} ${styles.tdCenter}`}>
                    <span className={styles.dateText}>
                      {isHistory || item.status === 'completed'
                        ? item.completedDate || '28 Sep 2026'
                        : item.scheduledDate || 'Tomorrow, 11:30 AM'}
                    </span>
                  </td>

                  {/* 9. ACTION */}
                  <td className={`${styles.td} ${styles.tdAction}`}>
                    {isHistory || item.status === 'completed' ? (
                      <button
                        type="button"
                        className={styles.feedbackBtn}
                        onClick={() => onAction(item.id, 'feedback')}
                      >
                        <span>View Feedback</span>
                        <ArrowRight size={14} />
                      </button>
                    ) : item.status === 'in-progress' ? (
                      <button
                        type="button"
                        className={styles.continueBtn}
                        onClick={() => onAction(item.id, 'continue')}
                      >
                        Continue Assessment
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={styles.startBtn}
                        onClick={() => onAction(item.id, 'start')}
                      >
                        Start Assessment
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssessmentTable;

