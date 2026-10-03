import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { ConceptCheckQuestion } from '../../../../data/lessons/questionUnderstanding';
import styles from './Matching.module.css';
import { CheckCircle2 } from 'lucide-react';

interface MatchingProps {
  question: ConceptCheckQuestion;
  selectedAnswer: Record<string, string> | null;
  onSelect: (answer: Record<string, string>) => void;
  disabled?: boolean;
  onInlineRetry?: () => void;
}

interface Point {
  x: number;
  y: number;
}

const Matching: React.FC<MatchingProps> = ({ question, selectedAnswer, onSelect, disabled, onInlineRetry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create randomized right-side order only once per question
  const [shuffledRightOptions, setShuffledRightOptions] = useState<any[]>([]);
  
  const leftOptions = useMemo(() => question.options?.filter(o => o.side === 'left') || [], [question.options]);
  const rightOptions = useMemo(() => question.options?.filter(o => o.side === 'right') || [], [question.options]);
  
  useEffect(() => {
    // Shuffle right options
    const shuffled = [...rightOptions].sort(() => Math.random() - 0.5);
    setShuffledRightOptions(shuffled);
  }, [rightOptions]);

  const currentMatches = selectedAnswer || {};
  
  // State for dragging/connecting
  const [activeLeftId, setActiveLeftId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);

  // Store DOM node refs for drawing lines
  const leftNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rightNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Force re-render to update SVG paths
  const [, setTick] = useState(0);

  // Resize and Scroll observer to keep lines attached
  useEffect(() => {
    const handleUpdate = () => setTick(t => t + 1);
    
    // Resize Observer
    const ro = new ResizeObserver(handleUpdate);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    
    // Window Resize / Scroll
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);

    // Initial tick to draw lines on mount
    const timeout = setTimeout(handleUpdate, 100);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
      clearTimeout(timeout);
    };
  }, []);

  // Update cursor position during drag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!activeLeftId || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top
    });
  }, [activeLeftId]);

  useEffect(() => {
    if (activeLeftId) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeLeftId, handleMouseMove]);

  const handleLeftNodeClick = (id: string, e: React.MouseEvent) => {
    if (disabled && !currentMatches[id]) return;

    // If there's an existing connection, break it
    if (currentMatches[id]) {
      const newMatches = { ...currentMatches };
      delete newMatches[id];
      onSelect(newMatches);
      
      // If disabled (feedback mode), this means they are retrying
      if (disabled && onInlineRetry) {
        onInlineRetry();
      }
      return;
    }

    // Start a new connection
    setActiveLeftId(id);
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleRightNodeClick = (rightId: string) => {
    // Break any existing match for this right node
    if (!activeLeftId) {
      const leftKey = Object.keys(currentMatches).find(k => currentMatches[k] === rightId);
      if (leftKey) {
        const newMatches = { ...currentMatches };
        delete newMatches[leftKey];
        onSelect(newMatches);
        if (disabled && onInlineRetry) {
          onInlineRetry();
        }
      }
      return;
    }

    // Reject if already matched (unless we want to overwrite)
    const isAlreadyMatched = Object.values(currentMatches).includes(rightId);
    if (isAlreadyMatched) {
      return; // Do nothing, let user figure it out, or overwrite? The prompt says "prevent duplicate category connections"
    }

    const newMatches = { ...currentMatches };
    newMatches[activeLeftId] = rightId;
    onSelect(newMatches);
    setActiveLeftId(null);
    setCursorPos(null);
  };

  const getRelativePosition = (element: HTMLElement | null) => {
    if (!element || !containerRef.current) return null;
    const elRect = element.getBoundingClientRect();
    const contRect = containerRef.current.getBoundingClientRect();
    return {
      x: elRect.left - contRect.left + elRect.width / 2,
      y: elRect.top - contRect.top + elRect.height / 2
    };
  };

  const generateBezierCurve = (start: Point, end: Point) => {
    const diff = Math.abs(end.x - start.x);
    // Control points for a smooth S-curve
    const cp1x = start.x + diff * 0.4;
    const cp1y = start.y;
    const cp2x = end.x - diff * 0.4;
    const cp2y = end.y;
    return `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;
  };

  const expectedMatches = question.correctAnswer as Record<string, string>;
  const totalMatches = Object.keys(currentMatches).length;

  return (
    <div className={styles.container} ref={containerRef}>
      <p className={styles.subPrompt}>Connect each prompt stem to its correct category.</p>
      
      {/* SVG Overlay for Connections */}
      <svg className={styles.svgOverlay}>
        {/* Draw confirmed matches */}
        {Object.entries(currentMatches).map(([leftId, rightId]) => {
          const startEl = leftNodeRefs.current[leftId];
          const endEl = rightNodeRefs.current[rightId];
          
          const start = getRelativePosition(startEl);
          const end = getRelativePosition(endEl);

          if (!start || !end) return null;

          // Determine line style (neutral, correct green, incorrect red)
          let lineClass = styles.lineConnected;
          if (disabled) {
            lineClass = expectedMatches[leftId] === rightId ? styles.lineCorrect : styles.lineIncorrect;
          }

          return (
            <path 
              key={`${leftId}-${rightId}`}
              d={generateBezierCurve(start, end)}
              className={`${styles.connectionLine} ${lineClass}`}
            />
          );
        })}

        {/* Draw active dragging line */}
        {activeLeftId && cursorPos && (
          (() => {
            const startEl = leftNodeRefs.current[activeLeftId];
            const start = getRelativePosition(startEl);
            if (!start) return null;

            return (
              <path 
                d={generateBezierCurve(start, cursorPos)}
                className={`${styles.connectionLine} ${styles.lineActive}`}
              />
            );
          })()
        )}
      </svg>

      <div className={styles.matchingColumns}>
        {/* Left Column (Prompts) */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>PROMPT STEM</div>
          <div className={styles.itemsList}>
            {leftOptions.map(option => {
              const isMatched = !!currentMatches[option.id];
              const isCorrect = disabled && expectedMatches[option.id] === currentMatches[option.id];
              const isIncorrect = disabled && isMatched && !isCorrect;

              return (
                <div key={option.id} className={`${styles.cardRow} ${styles.leftRow}`}>
                  <div className={styles.cardContent}>
                    {option.text}
                  </div>
                  <div 
                    ref={el => { leftNodeRefs.current[option.id] = el; }}
                    className={`
                      ${styles.connectionNode} 
                      ${isMatched ? styles.nodeMatched : ''}
                      ${activeLeftId === option.id ? styles.nodeActive : ''}
                      ${isCorrect ? styles.nodeCorrect : ''}
                      ${isIncorrect ? styles.nodeIncorrect : ''}
                    `}
                    onClick={(e) => handleLeftNodeClick(option.id, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        // Mock mouse event coordinates for center of element
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        const mockEvent = { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 } as unknown as React.MouseEvent;
                        handleLeftNodeClick(option.id, mockEvent);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Connect prompt: ${option.text}`}
                  >
                    {isCorrect && <CheckCircle2 size={12} className={styles.nodeIcon} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (Categories) */}
        <div className={styles.column}>
          <div className={styles.columnHeaderRight}>QUESTION CATEGORY</div>
          <div className={styles.itemsList}>
            {shuffledRightOptions.map(option => {
              const matchedLeftId = Object.keys(currentMatches).find(k => currentMatches[k] === option.id);
              const isMatched = !!matchedLeftId;
              const isCorrect = disabled && isMatched && expectedMatches[matchedLeftId] === option.id;
              const isIncorrect = disabled && isMatched && !isCorrect;

              return (
                <div key={option.id} className={`${styles.cardRow} ${styles.rightRow}`}>
                  <div 
                    ref={el => { rightNodeRefs.current[option.id] = el; }}
                    className={`
                      ${styles.connectionNode} 
                      ${isMatched ? styles.nodeMatched : ''}
                      ${activeLeftId && !isMatched ? styles.nodeTarget : ''}
                      ${isCorrect ? styles.nodeCorrect : ''}
                      ${isIncorrect ? styles.nodeIncorrect : ''}
                    `}
                    onClick={() => handleRightNodeClick(option.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleRightNodeClick(option.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Connect to category: ${option.text}`}
                  >
                    {isCorrect && <CheckCircle2 size={12} className={styles.nodeIcon} />}
                  </div>
                  <div className={styles.cardContentRight}>
                    {option.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.statusFooter}>
        {!disabled && (
          <div className={styles.matchCount}>
            {totalMatches} of {leftOptions.length} matched
          </div>
        )}
        {!disabled && totalMatches < leftOptions.length && (
          <div className={styles.allMatchedBannerPending}>
            Complete all matches first.
          </div>
        )}
      </div>
    </div>
  );
};

export default Matching;
