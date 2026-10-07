import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  SquarePen, 
  ThumbsUp, 
  ThumbsDown, 
  HelpCircle, 
  Play, 
  Search, 
  Plus, 
  Copy, 
  FolderInput, 
  Trash2, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Shuffle, 
  Zap 
} from 'lucide-react';
import { 
  INITIAL_FLASHCARDS, 
  INITIAL_DECK_STATS, 
  type FlashcardItem, 
  type DeckStats 
} from '../../data/flashcardsDeckData';
import styles from './FlashcardsTab.module.css';

interface TabProps {
  activeTopicId?: string;
  onStudyModeChange?: (isStudyMode: boolean) => void;
}

const FlashcardsTab: React.FC<TabProps> = ({ onStudyModeChange }) => {
  // Deck and stats state
  const [cards, setCards] = useState<FlashcardItem[]>(INITIAL_FLASHCARDS);
  const [stats, setStats] = useState<DeckStats>(INITIAL_DECK_STATS);
  const [activeStatFilter, setActiveStatFilter] = useState<'total' | 'know' | 'dont-know' | 'unmarked'>('total');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [perPage, setPerPage] = useState('50');

  // Selection & Accordion state (Card 1 expanded by default to match Screenshot 1)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['card-1']));
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['card-1']));

  // Study Mode State (Screenshots 2, 3, 4)
  const [isStudyModeOpen, setIsStudyModeOpen] = useState<boolean>(false);
  const [studyIndex, setStudyIndex] = useState<number>(0);
  const [isQuizMode, setIsQuizMode] = useState<boolean>(true); // Defaults ON matching Screenshot 2
  const [isFlipped, setIsFlipped] = useState<boolean>(false);   // False = Question front, True = Answer back
  const [studyKnowCount, setStudyKnowCount] = useState<number>(1); // 1 to match Screenshot 2
  const [studyDontKnowCount, setStudyDontKnowCount] = useState<number>(0);

  // Notify parent container of Study Mode changes (for fullscreen immersive view)
  useEffect(() => {
    onStudyModeChange?.(isStudyModeOpen);
    return () => {
      onStudyModeChange?.(false);
    };
  }, [isStudyModeOpen, onStudyModeChange]);

  // Filtered Cards
  const filteredCards = useMemo(() => {
    let result = cards;

    // Filter by stat tab if selected
    if (activeStatFilter === 'know') {
      result = result.filter(c => c.status === 'know');
    } else if (activeStatFilter === 'dont-know') {
      result = result.filter(c => c.status === 'dont-know');
    } else if (activeStatFilter === 'unmarked') {
      result = result.filter(c => c.status === 'unmarked');
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.question.toLowerCase().includes(q) || 
        c.answer.toLowerCase().includes(q)
      );
    }

    return result;
  }, [cards, activeStatFilter, searchQuery]);

  // Checkbox Selection
  const allCurrentSelected = filteredCards.length > 0 && filteredCards.every(c => selectedIds.has(c.id));

  const handleToggleSelectAll = () => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allCurrentSelected) {
        filteredCards.forEach(c => next.delete(c.id));
      } else {
        filteredCards.forEach(c => next.add(c.id));
      }
      return next;
    });
  };

  const handleToggleSelectCard = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Study Mode Handlers
  const handleOpenStudyMode = () => {
    setStudyIndex(0);
    setIsFlipped(false);
    setIsStudyModeOpen(true);
  };

  const handleCloseStudyMode = () => {
    setIsStudyModeOpen(false);
    setIsFlipped(false);
  };

  const currentStudyCard = filteredCards[studyIndex] || cards[0];

  const handleStudyNext = () => {
    if (studyIndex < filteredCards.length - 1) {
      setStudyIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Loop back or stay at end
      setStudyIndex(0);
      setIsFlipped(false);
    }
  };

  const handleStudyPrev = () => {
    if (studyIndex > 0) {
      setStudyIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleStudyKnow = () => {
    setStudyKnowCount(prev => prev + 1);
    setStats(prev => ({ ...prev, know: prev.know + 1 }));
    setCards(prev => prev.map(c => c.id === currentStudyCard.id ? { ...c, status: 'know' } : c));
  };

  const handleStudyDontKnow = () => {
    setStudyDontKnowCount(prev => prev + 1);
    setStats(prev => ({ ...prev, dontKnow: prev.dontKnow + 1 }));
    setCards(prev => prev.map(c => c.id === currentStudyCard.id ? { ...c, status: 'dont-know' } : c));
  };

  const handleShuffle = () => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setStudyIndex(0);
    setIsFlipped(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // =========================================================================
  // VIEW 2: STUDY MODE (Matches Screenshots 2, 3, 4)
  // =========================================================================
  if (isStudyModeOpen) {
    // When Quiz Mode is ON:
    // - Not flipped: Screenshot 2 (Front Blue Card with Golden Border)
    // - Flipped: Screenshot 3 (Back White Card with Blue Border)
    // When Quiz Mode is OFF:
    // - Screenshot 4 (White Card showing Question Title + Answer together)
    const isBlueCard = isQuizMode && !isFlipped;

    return (
      <div className={styles.studyModeOverlay}>
        <div className={`${styles.studyCardWrapper} ${isBlueCard ? styles.studyCardBlue : styles.studyCardWhite}`}>
          
          {/* Top Bar inside Study Card */}
          <div className={styles.studyTopBar}>
            <div className={styles.studyTopLeft}>
              {/* Close Button */}
              <button 
                type="button" 
                className={styles.studyCloseBtn} 
                onClick={handleCloseStudyMode}
                aria-label="Exit Study Mode"
              >
                <X size={18} />
              </button>

              {/* QUIZ MODE Toggle Switch */}
              <div 
                className={styles.quizToggleWrapper}
                onClick={() => {
                  setIsQuizMode(!isQuizMode);
                  setIsFlipped(false);
                }}
                role="switch"
                aria-checked={isQuizMode}
              >
                <div className={`${styles.toggleTrack} ${isQuizMode ? styles.toggleTrackOn : styles.toggleTrackOff}`}>
                  <div className={`${styles.toggleThumb} ${isQuizMode ? styles.toggleThumbOn : styles.toggleThumbOff}`} />
                </div>
                <span className={styles.quizModeLabel}>
                  <Zap size={13} fill="currentColor" />
                  QUIZ MODE
                </span>
              </div>

              <div className={styles.dividerV} />

              {/* Feedback Counters: 👍 1  👎 0 */}
              <div className={styles.feedbackCounters}>
                <span className={styles.counterItem} style={{ color: isBlueCard ? '#A7F3D0' : '#16A34A' }}>
                  <ThumbsUp size={14} fill="currentColor" />
                  <span>{studyKnowCount}</span>
                </span>
                <span className={styles.counterItem} style={{ color: isBlueCard ? '#FECACA' : '#EF4444' }}>
                  <ThumbsDown size={14} fill="currentColor" />
                  <span>{studyDontKnowCount}</span>
                </span>
              </div>
            </div>

            {/* Right: Card Progress & Shuffle Icon */}
            <div className={styles.studyTopRight}>
              <span className={styles.cardCounterText}>
                {studyIndex + 1}/{filteredCards.length || 3}
              </span>
              <button 
                type="button" 
                className={styles.shuffleBtn} 
                onClick={handleShuffle}
                title="Shuffle Flashcards"
              >
                <Shuffle size={16} />
              </button>
            </div>
          </div>

          {/* Center Body of Study Card */}
          <div className={styles.studyCardBody}>
            {isQuizMode ? (
              // Quiz Mode Active
              !isFlipped ? (
                // Screenshot 2: Question Front (Large White Centered Text)
                <h1 className={styles.questionCenterText}>
                  {currentStudyCard.question}
                </h1>
              ) : (
                // Screenshot 3: Answer Back (Detailed Paragraph Text)
                <p className={styles.answerBodyText}>
                  {currentStudyCard.answer}
                </p>
              )
            ) : (
              // Screenshot 4: Quiz Mode OFF (Question Heading + Answer Paragraph together)
              <div className={styles.quizOffContainer}>
                <h2 className={styles.quizOffQuestionTitle}>
                  {currentStudyCard.question} {currentStudyCard.title}
                </h2>
                <p className={styles.quizOffAnswerText}>
                  {currentStudyCard.answer}
                </p>
              </div>
            )}

            {/* Bottom Right Orange Flip Badge (Only in Quiz Mode) */}
            {isQuizMode && (
              <button 
                type="button" 
                className={styles.flipBadgeButton} 
                onClick={() => setIsFlipped(!isFlipped)}
                title="Flip Flashcard"
              >
                {/* SVG Matching Screenshots 2 & 3: Two overlapping cards + curved arrow */}
                <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="2" width="18" height="22" rx="3" stroke="#F97316" strokeWidth="2" transform="rotate(12 18 13)" />
                  <rect x="4" y="4" width="18" height="22" rx="3" stroke="#F97316" strokeWidth="2" fill={isBlueCard ? "#0060DF" : "#FFFFFF"} />
                  <path d="M12 15 C12 11 18 11 21 15 M21 15 L17 14 M21 15 L20 11" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={styles.flipLabelText}>Flip</span>
              </button>
            )}
          </div>

          {/* Bottom Action Pill Bar */}
          <div className={styles.studyBottomBar}>
            <div className={styles.feedbackActionsLeft}>
              <button 
                type="button" 
                className={styles.btnKnowThis} 
                onClick={handleStudyKnow}
              >
                <ThumbsUp size={15} fill="currentColor" />
                <span>I KNOW THIS</span>
              </button>

              <div className={styles.pillDividerV} />

              <button 
                type="button" 
                className={styles.btnDontKnow} 
                onClick={handleStudyDontKnow}
              >
                <ThumbsDown size={15} fill="currentColor" />
                <span>I DON'T KNOW</span>
              </button>
            </div>

            <div className={styles.navButtonsRight}>
              <button 
                type="button" 
                className={styles.btnStudyBack} 
                onClick={handleStudyPrev}
                disabled={studyIndex === 0}
              >
                <ArrowLeft size={14} />
                <span>BACK</span>
              </button>

              <button 
                type="button" 
                className={styles.btnStudyNext} 
                onClick={handleStudyNext}
              >
                <span>NEXT</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: DECK DETAIL ACCORDION VIEW (Matches Screenshot 1)
  // =========================================================================
  return (
    <div className={styles.deckPageWrapper}>
      {/* Top Back Link */}
      <button 
        type="button" 
        className={styles.backLink}
        onClick={() => {}}
      >
        <ArrowLeft size={16} />
        <span>BACK TO MY FLASHCARD DECKS</span>
      </button>

      {/* Title Header with Edit Icon */}
      <div className={styles.deckTitleRow}>
        <h1 className={styles.deckTitle}>Data Structures</h1>
        <button 
          type="button" 
          className={styles.editTitleBtn}
          title="Edit Deck Name"
        >
          <SquarePen size={20} />
        </button>
      </div>

      {/* 4 Stats Cards + START STUDY MODE Button */}
      <div className={styles.statsCardBar}>
        {/* Card 1: TOTAL FLASHCARDS (Active / Blue Selected state) */}
        <div 
          className={styles.statCardItem}
          onClick={() => setActiveStatFilter('total')}
        >
          <div className={`${styles.statCardInner} ${activeStatFilter === 'total' ? styles.statCardInnerActive : ''}`}>
            <div className={`${styles.statIconBadge} ${styles.statIconBlue}`}>
              {/* Stacked Cards Icon matching Screenshot 1 */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="7" y="2" width="14" height="17" rx="2" />
                <path d="M3 7v13a2 2 0 0 0 2 2h13" />
                <polygon points="14 7 15 9.5 17.5 10 15.5 12 16 14.5 14 13.2 12 14.5 12.5 12 10.5 10 13 9.5 14 7" fill="#0052FF" stroke="none" transform="scale(0.55) translate(9, 6)" />
              </svg>
            </div>
            <div className={styles.statContent}>
              <span className={`${styles.statNumber} ${styles.statNumberBlue}`}>{stats.total}</span>
              <span className={styles.statLabel}>TOTAL FLASHCARDS</span>
            </div>
          </div>
          {activeStatFilter === 'total' && <div className={styles.activeIndicatorPill} />}
        </div>

        {/* Card 2: I KNOW THIS */}
        <div 
          className={styles.statCardItem}
          onClick={() => setActiveStatFilter('know')}
        >
          <div className={`${styles.statCardInner} ${activeStatFilter === 'know' ? styles.statCardInnerActive : ''}`}>
            <div className={`${styles.statIconBadge} ${styles.statIconGreen}`}>
              <ThumbsUp size={19} fill="#16A34A" />
            </div>
            <div className={styles.statContent}>
              <span className={`${styles.statNumber} ${styles.statNumberGreen}`}>{stats.know}</span>
              <span className={styles.statLabel}>I KNOW THIS</span>
            </div>
          </div>
          {activeStatFilter === 'know' && <div className={styles.activeIndicatorPill} />}
        </div>

        {/* Card 3: I DON'T KNOW THIS */}
        <div 
          className={styles.statCardItem}
          onClick={() => setActiveStatFilter('dont-know')}
        >
          <div className={`${styles.statCardInner} ${activeStatFilter === 'dont-know' ? styles.statCardInnerActive : ''}`}>
            <div className={`${styles.statIconBadge} ${styles.statIconRed}`}>
              <ThumbsDown size={19} fill="#EF4444" />
            </div>
            <div className={styles.statContent}>
              <span className={`${styles.statNumber} ${styles.statNumberRed}`}>{stats.dontKnow}</span>
              <span className={styles.statLabel}>I DON'T KNOW THIS</span>
            </div>
          </div>
          {activeStatFilter === 'dont-know' && <div className={styles.activeIndicatorPill} />}
        </div>

        {/* Card 4: UNMARKED */}
        <div 
          className={styles.statCardItem}
          onClick={() => setActiveStatFilter('unmarked')}
        >
          <div className={`${styles.statCardInner} ${activeStatFilter === 'unmarked' ? styles.statCardInnerActive : ''}`}>
            <div className={`${styles.statIconBadge} ${styles.statIconSlate}`}>
              <HelpCircle size={19} />
            </div>
            <div className={styles.statContent}>
              <span className={`${styles.statNumber} ${styles.statNumberDark}`}>{stats.unmarked}</span>
              <span className={styles.statLabel}>UNMARKED</span>
            </div>
          </div>
          {activeStatFilter === 'unmarked' && <div className={styles.activeIndicatorPill} />}
        </div>

        {/* Green Button: START STUDY MODE */}
        <button 
          type="button" 
          className={styles.startStudyBtn}
          onClick={handleOpenStudyMode}
        >
          <Play size={14} fill="#FFFFFF" />
          <span>START STUDY MODE</span>
        </button>
      </div>

      {/* Showing Count & Search Bar Row */}
      <div className={styles.filterSearchRow}>
        <div className={styles.showingCount}>
          <span>Showing</span>
          <select 
            value={perPage} 
            onChange={(e) => setPerPage(e.target.value)}
            className={styles.perPageSelect}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>of <span className={styles.showingTotalBold}>100078 Flashcards</span></span>
        </div>

        <div className={styles.searchBox}>
          <Search size={16} color="#94A3B8" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Bulk Action Buttons Row */}
      <div className={styles.bulkActionsRow}>
        <button 
          type="button" 
          className={styles.selectAllBtn}
          onClick={handleToggleSelectAll}
        >
          SELECT ALL
        </button>

        <div className={styles.actionButtonsGroup}>
          <button type="button" className={styles.btnManual}>
            <Plus size={14} />
            <span>MANUAL FLASHCARDS</span>
          </button>

          <button type="button" className={styles.btnCopy}>
            <Copy size={14} />
            <span>COPY TO</span>
          </button>

          <button type="button" className={styles.btnMove}>
            <FolderInput size={14} />
            <span>MOVE TO</span>
          </button>

          <button type="button" className={styles.btnTrash} title="Delete Selected">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Accordion Cards List */}
      <div className={styles.cardsList}>
        {filteredCards.map((card) => {
          const isSelected = selectedIds.has(card.id);
          const isExpanded = expandedIds.has(card.id);

          return (
            <div 
              key={card.id} 
              className={`${styles.cardAccordionItem} ${isExpanded ? styles.cardAccordionExpanded : ''}`}
            >
              {/* Header Row */}
              <div 
                className={styles.cardHeaderRow}
                onClick={() => handleToggleExpand(card.id)}
              >
                <div className={styles.cardHeaderLeft}>
                  {/* Custom Blue Checkbox */}
                  <div 
                    className={`${styles.customCheckbox} ${isSelected ? styles.customCheckboxChecked : ''}`}
                    onClick={(e) => handleToggleSelectCard(card.id, e)}
                  >
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>

                  {/* Title */}
                  <span className={styles.cardTitleText}>
                    {card.title}
                  </span>

                  {/* Thumbs Up / Down Status Icon */}
                  {card.status === 'know' && (
                    <span className={styles.statusBadgeGreen} title="I Know This">
                      <ThumbsUp size={15} fill="#16A34A" />
                    </span>
                  )}
                  {card.status === 'dont-know' && (
                    <span className={styles.statusBadgeRed} title="I Don't Know This">
                      <ThumbsDown size={15} fill="#EF4444" />
                    </span>
                  )}

                  {/* Circle Badge (e.g. M) */}
                  {card.badge && (
                    <span className={styles.badgeCircleM}>
                      {card.badge}
                    </span>
                  )}
                </div>

                {/* Chevron Toggle */}
                <div className={`${styles.cardChevron} ${isExpanded ? styles.cardChevronActive : ''}`}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Expanded Body Area */}
              {isExpanded && (
                <div className={styles.cardBodyArea}>
                  <p className={styles.cardDescriptionText}>
                    {card.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination Bar */}
      <div className={styles.paginationBar}>
        <button type="button" className={styles.pageArrowBtn} title="Previous Page">
          <ChevronLeft size={16} />
        </button>
        <button type="button" className={`${styles.pageNumberBtn} ${styles.pageNumberActive}`}>
          1
        </button>
        <button type="button" className={styles.pageNumberBtn}>
          2
        </button>
        <span className={styles.pageEllipsis}>...</span>
        <button type="button" className={styles.pageNumberBtn}>
          9
        </button>
        <button type="button" className={styles.pageNumberBtn}>
          50
        </button>
        <button type="button" className={styles.pageNumberNextBlue} title="Next Page">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Floating Right Scroll Buttons */}
      <div className={styles.floatingScrollContainer}>
        <button 
          type="button" 
          className={styles.scrollCircleBtn} 
          onClick={scrollToTop}
          title="Scroll to Top"
        >
          <ChevronUp size={18} />
        </button>
        <button 
          type="button" 
          className={styles.scrollCircleBtn} 
          onClick={scrollToBottom}
          title="Scroll to Bottom"
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </div>
  );
};

export default FlashcardsTab;
