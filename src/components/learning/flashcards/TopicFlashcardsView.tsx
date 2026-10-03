import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckSquare, Square, FolderPlus, CheckCircle2 } from 'lucide-react';
import { topicFlashcardsData, type TopicFlashcard } from '../../../data/topicResourcesData';
import styles from './TopicFlashcardsView.module.css';

interface TopicFlashcardsViewProps {
  topicId?: string;
}

const ITEMS_PER_PAGE = 5;

const TopicFlashcardsView: React.FC<TopicFlashcardsViewProps> = ({ topicId = "topic-1" }) => {
  const allCards: TopicFlashcard[] = useMemo(() => {
    return topicFlashcardsData[topicId] || topicFlashcardsData["topic-1"];
  }, [topicId]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([allCards[0]?.id || '']));
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtered by search
  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) return allCards;
    const q = searchQuery.toLowerCase();
    return allCards.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.answer.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [allCards, searchQuery]);

  // Pagination calculation
  const totalItems = filteredCards.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = filteredCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Toggle single card selection
  const handleToggleSelect = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Toggle select all on current page or filtered set
  const allSelected = currentCards.length > 0 && currentCards.every(c => selectedIds.has(c.id));
  const handleSelectAll = () => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allSelected) {
        currentCards.forEach(c => next.delete(c.id));
      } else {
        currentCards.forEach(c => next.add(c.id));
      }
      return next;
    });
  };

  // Toggle expand/collapse single card
  const handleToggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Add selected to collection
  const handleAddTo = () => {
    if (selectedIds.size === 0) return;
    setToastMessage(`Added ${selectedIds.size} flashcard${selectedIds.size > 1 ? 's' : ''} to your collection!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* 1. Header Bar: FLASHCARDS + Search */}
        <div className={styles.headerBar}>
          <h1 className={styles.pageTitle}>FLASHCARDS</h1>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search flashcards..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* 2. Action Toolbar: SELECT ALL, ADD TO, Showing info */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarActions}>
            <button 
              className={styles.selectAllBtn}
              onClick={handleSelectAll}
              type="button"
            >
              {allSelected ? <CheckSquare size={16} color="#2563EB" /> : <Square size={16} />}
              <span>{allSelected ? 'DESELECT ALL' : 'SELECT ALL'}</span>
            </button>

            <button 
              className={styles.addToBtn}
              onClick={handleAddTo}
              disabled={selectedIds.size === 0}
              type="button"
            >
              <FolderPlus size={16} />
              <span>ADD TO {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}</span>
            </button>
          </div>

          <div className={styles.showingInfo}>
            Showing {filteredCards.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of {totalItems} Flashcards
          </div>
        </div>

        {/* 3. Flashcards List */}
        {currentCards.length > 0 ? (
          <div className={styles.flashcardsList}>
            {currentCards.map((card) => {
              const isSelected = selectedIds.has(card.id);
              const isExpanded = expandedIds.has(card.id);

              return (
                <div 
                  key={card.id} 
                  className={`${styles.flashcardRow} ${isExpanded ? styles.flashcardRowExpanded : ''}`}
                >
                  <div 
                    className={styles.rowHeader}
                    onClick={() => handleToggleExpand(card.id)}
                  >
                    <div className={styles.headerLeft}>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={(e) => handleToggleSelect(card.id, e as unknown as React.MouseEvent)}
                        onClick={(e) => e.stopPropagation()}
                        className={styles.checkboxInput}
                        aria-label={`Select ${card.title}`}
                      />
                      <h3 className={styles.cardTitleText}>{card.title}</h3>
                    </div>

                    <button 
                      className={styles.chevronBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleExpand(card.id);
                      }}
                      type="button"
                      aria-label={isExpanded ? "Collapse card" : "Expand card"}
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {/* Expanded Content Area */}
                  {isExpanded && (
                    <div className={styles.rowExpandedContent}>
                      <div className={styles.answerBox}>
                        <div className={styles.answerLabel}>Explanation & Framework</div>
                        <p className={styles.answerText}>{card.answer}</p>
                        
                        <div className={styles.tagRow}>
                          {card.tags.map((tag, idx) => (
                            <span key={idx} className={styles.tagBadge}>#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Search size={36} strokeWidth={1.5} color="#94A3B8" />
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>No flashcards found</div>
            <p style={{ margin: 0, fontSize: '14px' }}>
              No cards matched "{searchQuery}". Try a different search term or clear the filter.
            </p>
            <button 
              className={styles.selectAllBtn} 
              onClick={() => setSearchQuery('')}
              style={{ marginTop: '8px' }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* 4. Pagination */}
        {totalPages > 1 && (
          <div className={styles.paginationBar}>
            <button 
              className={styles.pageNavBtn}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              type="button"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                className={`${styles.pageNavBtn} ${currentPage === page ? styles.activePageBtn : ''}`}
                onClick={() => setCurrentPage(page)}
                type="button"
              >
                {page}
              </button>
            ))}

            <button 
              className={styles.pageNavBtn}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              type="button"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className={styles.toastNotification}>
          <CheckCircle2 size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default TopicFlashcardsView;
