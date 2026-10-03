import React, { useState } from 'react';
import styles from './Tabs.module.css';
import flashcardStyles from './FlashcardsTab.module.css';
import { Search, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface TabProps {
  activeTopicId: string;
}

const mockFlashcards = [
  { id: 1, question: "What is the STAR method used for in interviews?", answer: "Situation, Task, Action, Result. It's a structured manner of responding to a behavioral-based interview question." },
  { id: 2, question: "What distinguishes a behavioral question from a situational one?", answer: "Behavioral questions ask about your past experiences, while situational questions ask how you would handle a hypothetical future scenario." },
  { id: 3, question: "Why is it important to pause before answering a difficult question?", answer: "It allows you to organize your thoughts, demonstrates composure under pressure, and helps avoid rambling or filler words." }
];

const filters = ['All Flashcards', 'My Flashcards', 'Bookmarked'];

const FlashcardsTab: React.FC<TabProps> = ({ activeTopicId: _activeTopicId }) => {
  const [activeFilter, setActiveFilter] = useState('All Flashcards');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = mockFlashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < mockFlashcards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  return (
    <div className={styles.tabContainer}>
      <h2 className={styles.header}>My Flashcards</h2>
      <p className={styles.supportingText}>Quickly revise key concepts and build long-term memory.</p>

      <div className={flashcardStyles.container}>
        <div className={flashcardStyles.controls}>
          <div className={flashcardStyles.searchBar}>
            <Search size={20} color="var(--text-secondary)" />
            <input type="text" placeholder="Search..." className={flashcardStyles.searchInput} />
          </div>
          <button className={flashcardStyles.createBtn}>Create Flashcards</button>
        </div>

        <div className={flashcardStyles.filters}>
          {filters.map(filter => (
            <button 
              key={filter}
              className={`${flashcardStyles.filterBtn} ${activeFilter === filter ? flashcardStyles.active : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className={flashcardStyles.flashcardArea}>
          <div 
            className={`${flashcardStyles.flashcard} ${isFlipped ? flashcardStyles.flipped : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={flashcardStyles.flashcardInner}>
              <div className={flashcardStyles.flashcardFront}>
                <div className={flashcardStyles.cardType}>Question</div>
                <div className={flashcardStyles.concept}>{currentCard.question}</div>
                <div className={flashcardStyles.flipHint}><RotateCcw size={16} /> Click to flip</div>
              </div>
              <div className={flashcardStyles.flashcardBack}>
                <div className={flashcardStyles.cardType}>Answer</div>
                <div className={flashcardStyles.answer}>{currentCard.answer}</div>
              </div>
            </div>
          </div>

          <div className={flashcardStyles.actionRow}>
            <button 
              className={flashcardStyles.navBtn} 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className={flashcardStyles.progress}>
              {currentIndex + 1} / {mockFlashcards.length}
            </div>
            
            <button 
              className={flashcardStyles.navBtn} 
              onClick={handleNext} 
              disabled={currentIndex === mockFlashcards.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {isFlipped && (
            <div className={flashcardStyles.knowledgeButtons}>
              <button className={flashcardStyles.dontKnowBtn} onClick={handleNext}>I Don't Know This</button>
              <button className={flashcardStyles.knowBtn} onClick={handleNext}>I Know This</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsTab;
