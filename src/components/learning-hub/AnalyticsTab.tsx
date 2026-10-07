import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Info, 
  GraduationCap, 
  Mic, 
  Code, 
  FileText, 
  Lightbulb, 
  ClipboardList 
} from 'lucide-react';
import { 
  INITIAL_ANALYTICS_SUMMARY, 
  INITIAL_TOPIC_ANALYTICS, 
  type TopicAnalyticsItem, 
  type SectionAnalytics 
} from '../../data/analyticsData';
import styles from './AnalyticsTab.module.css';

interface TabProps {
  activeTopicId?: string;
  onNavigateTab?: (tabName: string) => void;
}

// Donut Progress Chart Component (Matches Screenshot Donut Ring)
const DonutProgressChart: React.FC<{
  percentage: number;
  correctPct: number;
  wrongPct: number;
  skippedPct: number;
}> = ({ percentage, correctPct = 35, wrongPct = 45, skippedPct = 20 }) => {
  const radius = 34;
  const circumference = 2 * Math.PI * radius; // ~213.63
  const strokeWidth = 9;

  const correctLen = (correctPct / 100) * circumference;
  const wrongLen = (wrongPct / 100) * circumference;
  const skippedLen = (skippedPct / 100) * circumference;

  return (
    <div className={styles.donutChartContainer}>
      <svg className={styles.donutSvg} viewBox="0 0 86 86">
        <circle 
          cx="43" 
          cy="43" 
          r={radius} 
          fill="none" 
          stroke="#F1F5F9" 
          strokeWidth={strokeWidth} 
        />
        {/* Correct Arc (Green) */}
        <circle
          cx="43"
          cy="43"
          r={radius}
          fill="none"
          stroke="#10B981"
          strokeWidth={strokeWidth}
          strokeDasharray={`${correctLen} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
        />
        {/* Wrong Arc (Red) */}
        <circle
          cx="43"
          cy="43"
          r={radius}
          fill="none"
          stroke="#EF4444"
          strokeWidth={strokeWidth}
          strokeDasharray={`${wrongLen} ${circumference}`}
          strokeDashoffset={-correctLen}
        />
        {/* Skipped Arc (Blue) */}
        <circle
          cx="43"
          cy="43"
          r={radius}
          fill="none"
          stroke="#0052FF"
          strokeWidth={strokeWidth}
          strokeDasharray={`${skippedLen} ${circumference}`}
          strokeDashoffset={-(correctLen + wrongLen)}
        />
      </svg>
      <div className={styles.donutCenterLabel}>{percentage}%</div>
    </div>
  );
};

// Render Question Type Icon
const renderTypeIcon = (iconName: 'mcq' | 'audio' | 'code' | 'text') => {
  switch (iconName) {
    case 'mcq':
      return <GraduationCap size={15} style={{ color: '#475569' }} />;
    case 'audio':
      return <Mic size={14} style={{ color: '#475569' }} />;
    case 'code':
      return <Code size={14} style={{ color: '#475569' }} />;
    case 'text':
      return <FileText size={14} style={{ color: '#475569' }} />;
    default:
      return null;
  }
};

const AnalyticsTab: React.FC<TabProps> = ({ onNavigateTab }) => {
  const [topics] = useState<TopicAnalyticsItem[]>(INITIAL_TOPIC_ANALYTICS);
  const [summary] = useState(INITIAL_ANALYTICS_SUMMARY);

  // Accordion state: Topic 1 expanded by default matching screenshot
  const [expandedTopicIds, setExpandedTopicIds] = useState<Set<string>>(new Set(['topic-1']));

  // Filter dropdown state
  const [selectedModule, setSelectedModule] = useState('Universal Communication');
  const [selectedChapter, setSelectedChapter] = useState('ALL');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown open states
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [isChapterOpen, setIsChapterOpen] = useState(false);
  const [isTopicOpen, setIsTopicOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedTopicIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filtered topic list
  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return t.topicName.toLowerCase().includes(q) || t.chapter.toLowerCase().includes(q);
      }
      return true;
    });
  }, [topics, searchQuery]);

  return (
    <div className={styles.analyticsPageWrapper}>
      {/* ==================== 1. TOP SUMMARY METRIC CARDS (3 CARDS) ==================== */}
      <div className={styles.summaryCardsGrid}>
        {/* Card 1: Concept Checks Completed */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryContentLeft}>
            <span className={styles.summaryTitle}>Concept Checks Completed</span>
            <span className={styles.summaryValue}>{summary.conceptChecksCompleted}</span>
          </div>
          <div className={`${styles.summaryIconBadge} ${styles.iconBadgeBlue}`}>
            <CheckCircle2 size={26} strokeWidth={2.4} />
          </div>
        </div>

        {/* Card 2: Practice Missions Completed */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryContentLeft}>
            <span className={styles.summaryTitle}>Practice Missions Completed</span>
            <span className={styles.summaryValue}>{summary.practiceMissionsCompleted}</span>
          </div>
          <div className={`${styles.summaryIconBadge} ${styles.iconBadgeGold}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>

        {/* Card 3: Practice Problems Completed */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryContentLeft}>
            <span className={styles.summaryTitle}>Practice Problems Completed</span>
            <span className={styles.summaryValue}>{summary.practiceProblemsCompleted}</span>
          </div>
          <div className={`${styles.summaryIconBadge} ${styles.iconBadgePurple}`}>
            <Lightbulb size={26} strokeWidth={2.4} />
          </div>
        </div>
      </div>

      {/* ==================== 2. TOPIC MASTERY MAIN CONTAINER ==================== */}
      <div className={styles.topicMasteryContainer}>
        {/* Header & Filter Controls Row */}
        <div className={styles.masteryHeaderRow}>
          <div className={styles.masteryTitleBox}>
            <BookOpen size={22} color="#F59E0B" strokeWidth={2.2} />
            <h2 className={styles.masteryTitle}>Topic Mastery</h2>
          </div>

          <div className={styles.filterControlsGroup}>
            {/* SELECT MODULE Dropdown */}
            <button 
              type="button" 
              className={styles.dropdownSelectBtn}
              onClick={() => setIsModuleOpen(!isModuleOpen)}
            >
              <span>SELECT MODULE</span>
              <ChevronDown size={14} />
            </button>

            {/* SELECT CHAPTER Dropdown */}
            <button 
              type="button" 
              className={styles.dropdownSelectBtn}
              onClick={() => setIsChapterOpen(!isChapterOpen)}
            >
              <span>SELECT CHAPTER</span>
              <ChevronDown size={14} />
            </button>

            {/* ALL TOPICS Dropdown */}
            <button 
              type="button" 
              className={styles.dropdownSelectBtn}
              onClick={() => setIsTopicOpen(!isTopicOpen)}
            >
              <span>ALL TOPICS</span>
              <ChevronDown size={14} />
            </button>

            {/* Orange Search Icon Button */}
            <button 
              type="button" 
              className={styles.searchSubmitBtn}
              title="Filter"
            >
              <Search size={16} />
            </button>

            {/* Search Input Box */}
            <div className={styles.searchInputWrapper}>
              <Search size={15} color="#94A3B8" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInputBox}
              />
            </div>
          </div>
        </div>

        {/* ==================== 3. TOPIC ACCORDION LIST ==================== */}
        <div className={styles.accordionList}>
          {filteredTopics.map((topicItem) => {
            const isExpanded = expandedTopicIds.has(topicItem.id);

            return (
              <div 
                key={topicItem.id} 
                className={`${styles.accordionItem} ${isExpanded ? styles.accordionItemExpanded : ''}`}
              >
                {/* Topic Header Row */}
                <div 
                  className={styles.accordionHeader}
                  onClick={() => toggleExpand(topicItem.id)}
                >
                  <div className={styles.accordionHeaderLeft}>
                    <div className={styles.topicIconSquare}>
                      <BookOpen size={18} strokeWidth={2.2} />
                    </div>
                    <h3 className={styles.topicTitleText}>{topicItem.topicName}</h3>
                  </div>

                  <div className={styles.accordionHeaderRight}>
                    <div className={styles.headerStatGroup}>
                      <span>Practice Questions</span>
                      <span className={styles.headerStatValueGreen}>
                        {topicItem.practiceAttempts} Attempts
                      </span>
                    </div>

                    <div className={styles.headerStatGroup}>
                      <span>Assessments Questions</span>
                      <span className={styles.headerStatValueBlue}>
                        {topicItem.assessmentAttempts} Attempts
                      </span>
                    </div>

                    <div className={styles.headerStatGroup}>
                      <span>Concept Check</span>
                      <span className={styles.conceptCheckDone}>
                        <CheckCircle2 size={15} strokeWidth={2.4} />
                        Completed
                      </span>
                    </div>

                    <div className={styles.accordionChevron}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details: Symmetrical Practice & Assessments Panels */}
                {isExpanded && (
                  <div className={styles.expandedPanelsGrid}>
                    
                    {/* LEFT PANEL: PRACTICE */}
                    <div className={styles.analyticPanelCard}>
                      <div className={styles.panelHeaderRow}>
                        <div className={styles.panelTitleLeft}>
                          {/* Green 3-node connected network icon */}
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="6" cy="6" r="3" />
                            <circle cx="18" cy="6" r="3" />
                            <circle cx="12" cy="18" r="3" />
                            <line x1="8.5" y1="7.5" x2="10.5" y2="15.5" />
                            <line x1="15.5" y1="7.5" x2="13.5" y2="15.5" />
                          </svg>
                          <h4 className={styles.panelTitleHeading}>Practice</h4>
                        </div>

                        <div className={styles.panelActionsRight}>
                          <button 
                            type="button" 
                            className={styles.btnPracticeOutline}
                            onClick={() => onNavigateTab?.('practice')}
                          >
                            PRACTICE
                          </button>
                          <button 
                            type="button" 
                            className={styles.btnFeedbackGreen}
                            onClick={() => onNavigateTab?.('practice')}
                          >
                            <span>FEEDBACK</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Overview Numbers & Donut Chart */}
                      <div className={styles.attemptsOverviewRow}>
                        <div className={styles.attemptsColLeft}>
                          <span className={styles.bigAttemptsNum}>
                            {topicItem.practice.attempts}
                          </span>
                          <span className={styles.attemptsSubLabel}>
                            QUESTIONS ATTEMPTED
                          </span>
                          <div className={styles.legendPillRow}>
                            <span className={styles.legendCorrect}>
                              ✓ {topicItem.practice.correctPct}%
                            </span>
                            <span className={styles.legendDivider}>|</span>
                            <span className={styles.legendWrong}>
                              ✕ {topicItem.practice.wrongPct}%
                            </span>
                            <span className={styles.legendDivider}>|</span>
                            <span className={styles.legendSkipped}>
                              ⭕ {topicItem.practice.skippedPct}%
                            </span>
                          </div>
                        </div>

                        {/* Donut Chart */}
                        <DonutProgressChart 
                          percentage={topicItem.practice.donutPercentage}
                          correctPct={topicItem.practice.correctPct}
                          wrongPct={topicItem.practice.wrongPct}
                          skippedPct={topicItem.practice.skippedPct}
                        />
                      </div>

                      {/* Section: BY QUESTION TYPE */}
                      <div className={styles.sectionContainer}>
                        <div className={styles.sectionHeaderTitle}>
                          BY QUESTION TYPE
                        </div>
                        <div className={styles.questionTypeRowsList}>
                          {topicItem.practice.byQuestionType.map((row) => (
                            <div key={row.type} className={styles.typeRowItem}>
                              <div className={styles.typeRowLabel}>
                                {renderTypeIcon(row.iconName)}
                                <span>{row.type}</span>
                              </div>
                              <span className={styles.typeRowCount}>{row.count}</span>
                              <div className={styles.typeProgressTrack}>
                                <div 
                                  className={styles.typeProgressFill} 
                                  style={{ 
                                    width: `${row.accuracy}%`, 
                                    backgroundColor: row.color 
                                  }} 
                                />
                              </div>
                              <span 
                                className={styles.typeRowAccuracy} 
                                style={{ color: row.color }}
                              >
                                {row.accuracy}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section: ACCURACY BY DIFFICULTY/BLOOM'S LEVEL */}
                      <div className={styles.sectionContainer}>
                        <div className={styles.sectionHeaderTitle}>
                          <span>ACCURACY BY DIFFICULTY/BLOOM'S LEVEL</span>
                          <Info size={14} className={styles.infoIcon} />
                        </div>
                        <div className={styles.difficultyCardsRow}>
                          {topicItem.practice.byDifficulty.map((diff) => (
                            <div key={diff.level} className={styles.difficultyCard}>
                              <div className={styles.difficultyTextLeft}>
                                <span className={styles.difficultyName}>{diff.level}</span>
                                <span className={styles.difficultyAttempted}>
                                  {diff.attempted} attempted
                                </span>
                              </div>
                              <span 
                                className={styles.difficultyAccuracyNum} 
                                style={{ color: diff.color }}
                              >
                                {diff.accuracy}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* RIGHT PANEL: ASSESSMENTS */}
                    <div className={styles.analyticPanelCard}>
                      <div className={styles.panelHeaderRow}>
                        <div className={styles.panelTitleLeft}>
                          <ClipboardList size={20} color="#0052FF" strokeWidth={2.4} />
                          <h4 className={styles.panelTitleHeading}>Assessments</h4>
                        </div>

                        <div className={styles.panelActionsRight}>
                          <button 
                            type="button" 
                            className={styles.btnFeedbackBlue}
                            onClick={() => onNavigateTab?.('assessments')}
                          >
                            <span>FEEDBACK</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Overview Numbers & Donut Chart */}
                      <div className={styles.attemptsOverviewRow}>
                        <div className={styles.attemptsColLeft}>
                          <span className={styles.bigAttemptsNum}>
                            {topicItem.assessments.attempts}
                          </span>
                          <span className={styles.attemptsSubLabel}>
                            QUESTIONS ATTEMPTED
                          </span>
                          <div className={styles.legendPillRow}>
                            <span className={styles.legendCorrect}>
                              ✓ {topicItem.assessments.correctPct}%
                            </span>
                            <span className={styles.legendDivider}>|</span>
                            <span className={styles.legendWrong}>
                              ✕ {topicItem.assessments.wrongPct}%
                            </span>
                            <span className={styles.legendDivider}>|</span>
                            <span className={styles.legendSkipped}>
                              ⭕ {topicItem.assessments.skippedPct}%
                            </span>
                          </div>
                        </div>

                        {/* Donut Chart */}
                        <DonutProgressChart 
                          percentage={topicItem.assessments.donutPercentage}
                          correctPct={topicItem.assessments.correctPct}
                          wrongPct={topicItem.assessments.wrongPct}
                          skippedPct={topicItem.assessments.skippedPct}
                        />
                      </div>

                      {/* Section: BY QUESTION TYPE */}
                      <div className={styles.sectionContainer}>
                        <div className={styles.sectionHeaderTitle}>
                          BY QUESTION TYPE
                        </div>
                        <div className={styles.questionTypeRowsList}>
                          {topicItem.assessments.byQuestionType.map((row) => (
                            <div key={row.type} className={styles.typeRowItem}>
                              <div className={styles.typeRowLabel}>
                                {renderTypeIcon(row.iconName)}
                                <span>{row.type}</span>
                              </div>
                              <span className={styles.typeRowCount}>{row.count}</span>
                              <div className={styles.typeProgressTrack}>
                                <div 
                                  className={styles.typeProgressFill} 
                                  style={{ 
                                    width: `${row.accuracy}%`, 
                                    backgroundColor: row.color 
                                  }} 
                                />
                              </div>
                              <span 
                                className={styles.typeRowAccuracy} 
                                style={{ color: row.color }}
                              >
                                {row.accuracy}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section: ACCURACY BY DIFFICULTY/BLOOM'S LEVEL */}
                      <div className={styles.sectionContainer}>
                        <div className={styles.sectionHeaderTitle}>
                          <span>ACCURACY BY DIFFICULTY/BLOOM'S LEVEL</span>
                          <Info size={14} className={styles.infoIcon} />
                        </div>
                        <div className={styles.difficultyCardsRow}>
                          {topicItem.assessments.byDifficulty.map((diff) => (
                            <div key={diff.level} className={styles.difficultyCard}>
                              <div className={styles.difficultyTextLeft}>
                                <span className={styles.difficultyName}>{diff.level}</span>
                                <span className={styles.difficultyAttempted}>
                                  {diff.attempted} attempted
                                </span>
                              </div>
                              <span 
                                className={styles.difficultyAccuracyNum} 
                                style={{ color: diff.color }}
                              >
                                {diff.accuracy}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AnalyticsTab;
