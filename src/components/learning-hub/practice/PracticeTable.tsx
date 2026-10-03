import React, { useState, useMemo } from 'react';
import { ArrowRight, CheckCircle2, Clock, Info } from 'lucide-react';
import { type PracticeSetItem } from '../../../data/practicePageData';
import { useSubject } from '../../../context/SubjectContext';
import { getPracticeChaptersForSubject } from '../../../data/subjectsData';
import styles from './PracticeTable.module.css';

interface PracticeTableProps {
  practiceSets: PracticeSetItem[];
  onAction: (id: string, actionType: 'start' | 'continue' | 'feedback' | 'score') => void;
}

const PracticeTable: React.FC<PracticeTableProps> = ({ practiceSets, onAction }) => {
  const { currentSubject } = useSubject();
  const chaptersData = useMemo(() => getPracticeChaptersForSubject(currentSubject), [currentSubject]);

  const [hoveredChapterSetId, setHoveredChapterSetId] = useState<string | null>(null);
  const [hoveredTopicSetId, setHoveredTopicSetId] = useState<string | null>(null);

  // Helper to extract clean chapter names
  const getChapterList = (item: PracticeSetItem): string[] => {
    if (item.selectedChapters && item.selectedChapters.length > 0) {
      return item.selectedChapters.map(chId => {
        const found = chaptersData.find(c => c.id === chId || c.name === chId);
        return found ? found.name : chId;
      });
    }
    return [item.chapter];
  };

  // Helper to group topics under their corresponding chapters
  const getTopicGroups = (item: PracticeSetItem): { chapterTitle: string; topics: string[] }[] => {
    const topicList = item.selectedTopics && item.selectedTopics.length > 0 
      ? item.selectedTopics 
      : [item.topic];

    const groups: { chapterTitle: string; topics: string[] }[] = [];

    chaptersData.forEach((ch, idx) => {
      const chNumber = String(idx + 1).padStart(2, '0');
      const matchingTopics = ch.topics.filter(t => 
        topicList.includes(t.name) || topicList.includes(t.id)
      );

      if (matchingTopics.length > 0) {
        groups.push({
          chapterTitle: `Chapter ${chNumber} — ${ch.name}`,
          topics: matchingTopics.map(t => t.name),
        });
      }
    });

    if (groups.length === 0 && topicList.length > 0) {
      groups.push({
        chapterTitle: item.chapter || 'Selected Topics',
        topics: topicList,
      });
    }

    return groups;
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.title}>Your Practice Sets (Table View)</h3>
        <p className={styles.subtitle}>Overview of active practice sets. Finished practices are stored in Practice History.</p>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Practice Set</th>
              <th className={styles.th}>Chapter</th>
              <th className={styles.th}>Topic</th>
              <th className={`${styles.th} ${styles.thCenter}`}>Questions</th>
              <th className={styles.th}>Level</th>
              <th className={styles.th}>Progress</th>
              <th className={styles.th}>Status</th>
              <th className={`${styles.th} ${styles.thRight}`}>Action</th>
            </tr>
          </thead>
          <tbody>
            {practiceSets.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '48px 24px', color: '#64748B', fontSize: '0.9rem' }}>
                  No active practice sets. Generate a new set above or view your completed sets in Practice History!
                </td>
              </tr>
            ) : (
              practiceSets.map((item, rowIndex) => {
                const percentage = Math.round((item.completedQuestions / item.totalQuestions) * 100);
                const chapters = getChapterList(item);
                const topicGroups = getTopicGroups(item);
                const totalTopicsCount = topicGroups.reduce((acc, g) => acc + g.topics.length, 0);

              const isMultiChapter = chapters.length > 1;
              const isMultiTopic = totalTopicsCount > 1;

              // Popover positioning: position below if in first two rows, else above
              const popoverClass = rowIndex < 2 ? styles.popoverBelow : styles.popoverAbove;

              return (
                <tr key={item.id} className={styles.tr}>
                  <td className={`${styles.td} ${styles.nameCell}`}>
                    <strong>{item.name}</strong>
                  </td>

                  {/* Chapter Column */}
                  <td className={styles.td}>
                    <div 
                      className={styles.popoverWrapper}
                      onMouseEnter={() => setHoveredChapterSetId(item.id)}
                      onMouseLeave={() => setHoveredChapterSetId(null)}
                    >
                      <span className={isMultiChapter ? styles.multiBadge : styles.singleBadge}>
                        <span>{isMultiChapter ? `${chapters.length} Chapters` : chapters[0]}</span>
                        <Info size={12} className={styles.infoIcon} />
                      </span>

                      {hoveredChapterSetId === item.id && (
                        <div className={`${styles.popoverBox} ${popoverClass}`}>
                          <div className={styles.popoverHeader}>Selected Chapters ({chapters.length})</div>
                          <ul className={styles.popoverList}>
                            {chapters.map((chName, cIdx) => (
                              <li key={cIdx} className={styles.popoverListItem}>
                                • {chName}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Topic Column */}
                  <td className={styles.td}>
                    <div 
                      className={styles.popoverWrapper}
                      onMouseEnter={() => setHoveredTopicSetId(item.id)}
                      onMouseLeave={() => setHoveredTopicSetId(null)}
                    >
                      <span className={isMultiTopic ? styles.multiBadge : styles.singleBadge}>
                        <span>{isMultiTopic ? `${totalTopicsCount} Topics` : (topicGroups[0]?.topics[0] || item.topic)}</span>
                        <Info size={12} className={styles.infoIcon} />
                      </span>

                      {hoveredTopicSetId === item.id && (
                        <div className={`${styles.popoverBox} ${styles.topicPopover} ${popoverClass}`}>
                          <div className={styles.popoverHeader}>Selected Topics ({totalTopicsCount})</div>
                          <div className={styles.topicGroupsContainer}>
                            {topicGroups.map((grp, gIdx) => (
                              <div key={gIdx} className={styles.topicGroupItem}>
                                <span className={styles.groupChapterHeading}>{grp.chapterTitle}</span>
                                <ul className={styles.popoverList}>
                                  {grp.topics.map((tName, tIdx) => (
                                    <li key={tIdx} className={styles.popoverListItem}>
                                      • {tName}
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

                  <td className={`${styles.td} ${styles.tdCenter}`}>
                    <span className={styles.qCountBadge}>{item.totalQuestions}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.levelBadge} ${styles[`level_${item.level}`]}`}>
                      {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.progressWrapper}>
                      <div className={styles.progressText}>
                        {item.completedQuestions}/{item.totalQuestions} ({percentage}%)
                      </div>
                      <div className={styles.progressTrack}>
                        <div 
                          className={item.status === 'completed' ? styles.progressFillGreen : styles.progressFillBlue} 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    {item.status === 'completed' && (
                      <span className={styles.statusCompleted}>
                        <CheckCircle2 size={13} />
                        Completed
                      </span>
                    )}
                    {item.status === 'in-progress' && (
                      <span className={styles.statusInProgress}>
                        In Progress
                      </span>
                    )}
                    {item.status === 'not-started' && (
                      <span className={styles.statusNotStarted}>
                        <Clock size={13} />
                        Not Started
                      </span>
                    )}
                  </td>
                  <td className={`${styles.td} ${styles.tdRight}`}>
                    {item.status === 'completed' ? (
                      <button 
                        className={styles.scoreActionBtn}
                        onClick={() => onAction(item.id, 'feedback')}
                        type="button"
                      >
                        View Feedback
                      </button>
                    ) : item.status === 'in-progress' ? (
                      <button 
                        className={styles.primaryActionBtn}
                        onClick={() => onAction(item.id, 'continue')}
                        type="button"
                      >
                        <span>Continue</span>
                        <ArrowRight size={13} />
                      </button>
                    ) : (
                      <button 
                        className={styles.primaryActionBtn}
                        onClick={() => onAction(item.id, 'start')}
                        type="button"
                      >
                        <span>Start</span>
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PracticeTable;
