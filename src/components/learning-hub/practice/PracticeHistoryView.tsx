import React, { useState, useMemo } from 'react';
import { Award, Clock, Calendar, CheckCircle2, BookOpen, Layers, Info } from 'lucide-react';
import { type PracticeSetItem } from '../../../data/practicePageData';
import { useSubject } from '../../../context/SubjectContext';
import { getPracticeChaptersForSubject } from '../../../data/subjectsData';
import styles from './PracticeHistoryView.module.css';

interface PracticeHistoryViewProps {
  completedSets: PracticeSetItem[];
  onViewScore: (id: string) => void;
}

interface ChapterTopicGroup {
  chapterTitle: string;
  topics: string[];
}

const PracticeHistoryView: React.FC<PracticeHistoryViewProps> = ({
  completedSets,
  onViewScore,
}) => {
  const { currentSubject } = useSubject();
  const chaptersData = useMemo(() => getPracticeChaptersForSubject(currentSubject), [currentSubject]);

  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null);

  // Helper to resolve detailed chapters and topics breakdown
  const getIncludedBreakdown = (item: PracticeSetItem): {
    chaptersCount: number;
    topicsCount: number;
    groups: ChapterTopicGroup[];
  } => {
    const chapterList = item.selectedChapters && item.selectedChapters.length > 0 
      ? item.selectedChapters 
      : [item.chapter];

    const topicList = item.selectedTopics && item.selectedTopics.length > 0 
      ? item.selectedTopics 
      : [item.topic];

    const groups: ChapterTopicGroup[] = [];

    chaptersData.forEach((ch, idx) => {
      const chNumber = String(idx + 1).padStart(2, '0');
      const isChapterMatch = chapterList.some(
        c => c.toLowerCase() === ch.id.toLowerCase() || c.toLowerCase() === ch.name.toLowerCase()
      );

      const matchingTopics = ch.topics.filter(t => 
        topicList.some(top => top.toLowerCase() === t.id.toLowerCase() || top.toLowerCase() === t.name.toLowerCase())
      );

      if (isChapterMatch || matchingTopics.length > 0) {
        groups.push({
          chapterTitle: `Chapter ${chNumber} — ${ch.name}`,
          topics: matchingTopics.length > 0 ? matchingTopics.map(t => t.name) : topicList,
        });
      }
    });

    if (groups.length === 0) {
      groups.push({
        chapterTitle: item.chapter || 'Selected Chapter',
        topics: topicList,
      });
    }

    const totalTopics = groups.reduce((sum, g) => sum + g.topics.length, 0);

    return {
      chaptersCount: groups.length,
      topicsCount: totalTopics || topicList.length,
      groups,
    };
  };

  if (completedSets.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <Award size={40} className={styles.emptyIcon} />
        <h4 className={styles.emptyTitle}>No Practice History Yet</h4>
        <p className={styles.emptySubtitle}>Complete practice sets to build your history and track scores over time.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.title}>Practice History</h3>
        <p className={styles.subtitle}>Review your submitted sets and performance scores.</p>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Practice Set</th>
              <th className={styles.th}>Chapter & Topic</th>
              <th className={styles.th}>Submitted Date</th>
              <th className={`${styles.th} ${styles.thCenter}`}>Questions</th>
              <th className={`${styles.th} ${styles.thCenter}`}>Time Taken</th>
              <th className={`${styles.th} ${styles.thCenter}`}>Score</th>
              <th className={`${styles.th} ${styles.thRight}`}>Action</th>
            </tr>
          </thead>
          <tbody>
            {completedSets.map((item, rowIndex) => {
              const formattedDate = item.submittedAt
                ? new Date(item.submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Sep 14, 2026';

              const breakdown = getIncludedBreakdown(item);
              const popoverClass = rowIndex < 2 ? styles.popoverBelow : styles.popoverAbove;

              return (
                <tr key={item.id} className={styles.tr}>
                  <td className={`${styles.td} ${styles.nameCell}`}>
                    <div className={styles.nameWithIcon}>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>{item.name}</span>
                    </div>
                  </td>

                  {/* Chapter & Topic Cell with Interactive Hover Tooltip */}
                  <td className={styles.td}>
                    <div 
                      className={styles.popoverWrapper}
                      onMouseEnter={() => setHoveredSetId(item.id)}
                      onMouseLeave={() => setHoveredSetId(null)}
                    >
                      <div className={styles.chapterTopicText}>
                        <div className={styles.chapterTitleLine}>
                          <span className={styles.chapterText}>{item.chapter}</span>
                          <Info size={12} className={styles.infoHintIcon} />
                        </div>
                        <span className={styles.topicText}>• {item.topic}</span>
                      </div>

                      {/* Hover Tooltip / Popover showing full chapters and topics list */}
                      {hoveredSetId === item.id && (
                        <div className={`${styles.popoverBox} ${popoverClass}`}>
                          <div className={styles.popoverHeader}>
                            <div className={styles.popoverHeaderLeft}>
                              <BookOpen size={13} className={styles.headerIcon} />
                              <span className={styles.popoverTitle}>Included Details</span>
                            </div>
                            <span className={styles.popoverBadge}>
                              {breakdown.chaptersCount} {breakdown.chaptersCount === 1 ? 'Ch' : 'Chs'} • {breakdown.topicsCount} {breakdown.topicsCount === 1 ? 'Topic' : 'Topics'}
                            </span>
                          </div>

                          <div className={styles.popoverContent}>
                            {breakdown.groups.map((grp, gIdx) => (
                              <div key={gIdx} className={styles.popoverGroup}>
                                <div className={styles.groupHeading}>
                                  <span className={styles.groupTitleText}>{grp.chapterTitle}</span>
                                </div>
                                <ul className={styles.popoverList}>
                                  {grp.topics.map((tName, tIdx) => (
                                    <li key={tIdx} className={styles.popoverListItem}>
                                      <span className={styles.bulletDot}>•</span>
                                      <span>{tName}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className={styles.td}>
                    <div className={styles.dateText}>
                      <Calendar size={13} className={styles.inlineIcon} />
                      <span>{formattedDate}</span>
                    </div>
                  </td>
                  <td className={`${styles.td} ${styles.thCenter}`}>
                    <span className={styles.qCountBadge}>{item.totalQuestions} Questions</span>
                  </td>
                  <td className={`${styles.td} ${styles.thCenter}`}>
                    <div className={styles.timeText}>
                      <Clock size={13} className={styles.inlineIcon} />
                      <span>{item.timeSpentMinutes || 15} min</span>
                    </div>
                  </td>
                  <td className={`${styles.td} ${styles.thCenter}`}>
                    <span className={styles.scoreBadge}>
                      {item.score || 90}%
                    </span>
                  </td>
                  <td className={`${styles.td} ${styles.tdRight}`}>
                    <button 
                      className={styles.viewScoreBtn}
                      onClick={() => onViewScore(item.id)}
                      type="button"
                    >
                      View Feedback
                    </button>
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

export default PracticeHistoryView;
