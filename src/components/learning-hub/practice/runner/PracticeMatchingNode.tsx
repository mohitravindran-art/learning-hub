import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import type { PracticeQuestion } from '../../../../types/practice';
import styles from './PracticeMatchingNode.module.css';

interface PracticeMatchingNodeProps {
  question: PracticeQuestion;
  selectedMatches: Record<string, string>;
  onMatchesChange: (matches: Record<string, string>) => void;
  onReset?: () => void;
}

interface Point {
  x: number;
  y: number;
}

export const PracticeMatchingNode: React.FC<PracticeMatchingNodeProps> = ({
  question,
  selectedMatches = {},
  onMatchesChange,
  onReset,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Separate options by side
  const leftOptions = useMemo(() => {
    const explicitLeft = question.options?.filter(o => o.side === 'left');
    if (explicitLeft && explicitLeft.length > 0) return explicitLeft;
    // Fallback: first half of options
    const half = Math.ceil((question.options?.length || 0) / 2);
    return question.options?.slice(0, half) || [];
  }, [question.options]);

  const rightOptions = useMemo(() => {
    const explicitRight = question.options?.filter(o => o.side === 'right');
    if (explicitRight && explicitRight.length > 0) return explicitRight;
    // Fallback: second half of options
    const half = Math.ceil((question.options?.length || 0) / 2);
    return question.options?.slice(half) || [];
  }, [question.options]);

  // State for dragging/connecting
  const [activeLeftId, setActiveLeftId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);

  // Store DOM node refs for drawing lines
  const leftNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rightNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Force re-render to update SVG paths
  const [, setTick] = useState<number>(0);

  // Resize and Scroll observer to keep lines attached
  useEffect(() => {
    const handleUpdate = () => setTick(t => t + 1);

    const ro = new ResizeObserver(handleUpdate);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    const contEl = containerRef.current;
    if (contEl) {
      contEl.addEventListener('scroll', handleUpdate);
    }

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);

    const timeout = setTimeout(handleUpdate, 80);

    return () => {
      ro.disconnect();
      if (contEl) {
        contEl.removeEventListener('scroll', handleUpdate);
      }
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
      clearTimeout(timeout);
    };
  }, [leftOptions, rightOptions, selectedMatches]);

  // Update cursor position during active connection
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!activeLeftId || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top,
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

  const handleLeftClick = (id: string, e?: React.MouseEvent) => {
    // If there's an existing connection, break it
    if (selectedMatches[id]) {
      const next = { ...selectedMatches };
      delete next[id];
      onMatchesChange(next);
      setActiveLeftId(null);
      setCursorPos(null);
      return;
    }

    // Toggle active left
    if (activeLeftId === id) {
      setActiveLeftId(null);
      setCursorPos(null);
      return;
    }

    setActiveLeftId(id);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const nodeEl = leftNodeRefs.current[id];
      if (nodeEl) {
        const nodeRect = nodeEl.getBoundingClientRect();
        setCursorPos({
          x: nodeRect.left - rect.left + nodeRect.width / 2,
          y: nodeRect.top - rect.top + nodeRect.height / 2,
        });
      } else if (e) {
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  const handleRightClick = (rightId: string) => {
    // If not actively connecting a left node: check if this right node is matched and break it
    if (!activeLeftId) {
      const matchedLeftKey = Object.keys(selectedMatches).find(k => selectedMatches[k] === rightId);
      if (matchedLeftKey) {
        const next = { ...selectedMatches };
        delete next[matchedLeftKey];
        onMatchesChange(next);
      }
      return;
    }

    // Connect activeLeftId to rightId (overwrite any prior left node pointing to rightId if needed)
    const next = { ...selectedMatches };
    
    // If another left item was pointing to this rightId, disconnect it
    Object.keys(next).forEach(k => {
      if (next[k] === rightId) {
        delete next[k];
      }
    });

    next[activeLeftId] = rightId;
    onMatchesChange(next);
    setActiveLeftId(null);
    setCursorPos(null);
  };

  const handleReset = () => {
    setActiveLeftId(null);
    setCursorPos(null);
    onMatchesChange({});
    if (onReset) onReset();
  };

  const getRelativePosition = (element: HTMLElement | null): Point | null => {
    if (!element || !containerRef.current) return null;
    const elRect = element.getBoundingClientRect();
    const contRect = containerRef.current.getBoundingClientRect();
    return {
      x: elRect.left - contRect.left + elRect.width / 2,
      y: elRect.top - contRect.top + elRect.height / 2,
    };
  };

  const generateBezierCurve = (start: Point, end: Point): string => {
    const diff = Math.abs(end.x - start.x);
    const cp1x = start.x + diff * 0.45;
    const cp1y = start.y;
    const cp2x = end.x - diff * 0.45;
    const cp2y = end.y;
    return `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;
  };

  const matchedCount = Object.keys(selectedMatches).length;
  const totalCount = leftOptions.length;

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Top Bar with Badge & Reset */}
      <div className={styles.topBar}>
        <span className={styles.matchingBadge}>MATCHING / PAIRING</span>
        <button 
          className={styles.resetBtn} 
          onClick={handleReset}
          type="button"
          title="Reset all matches"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Header Prompt Group */}
      <div className={styles.headerTextGroup}>
        <h4 className={styles.questionTitle}>
          {question.prompt || 'Match the prompt stem to the question category:'}
        </h4>
        <p className={styles.subPrompt}>
          Connect each prompt stem to its correct category.
        </p>
      </div>

      {/* SVG Overlay for S-Curve Bezier Lines */}
      <svg className={styles.svgOverlay}>
        {/* Confirmed matches */}
        {Object.entries(selectedMatches).map(([leftId, rightId]) => {
          const startEl = leftNodeRefs.current[leftId];
          const endEl = rightNodeRefs.current[rightId];

          const start = getRelativePosition(startEl);
          const end = getRelativePosition(endEl);

          if (!start || !end) return null;

          return (
            <path
              key={`${leftId}-${rightId}`}
              d={generateBezierCurve(start, end)}
              className={`${styles.connectionLine} ${styles.lineConnected}`}
            />
          );
        })}

        {/* Active dragging / connecting line */}
        {activeLeftId && cursorPos && (() => {
          const startEl = leftNodeRefs.current[activeLeftId];
          const start = getRelativePosition(startEl);
          if (!start) return null;

          return (
            <path
              d={generateBezierCurve(start, cursorPos)}
              className={`${styles.connectionLine} ${styles.lineActive}`}
            />
          );
        })()}
      </svg>

      {/* Matching Columns Grid */}
      <div className={styles.matchingColumns}>
        {/* Left Column (Prompt Stem) */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>PROMPT STEM</div>
          <div className={styles.itemsList}>
            {leftOptions.map(option => {
              const isMatched = !!selectedMatches[option.id];
              const isActive = activeLeftId === option.id;

              return (
                <div
                  key={option.id}
                  className={`${styles.cardRow} ${styles.leftRow} ${isActive ? styles.cardRowActive : ''} ${isMatched ? styles.cardRowMatched : ''}`}
                  onClick={(e) => handleLeftClick(option.id, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLeftClick(option.id);
                    }
                  }}
                >
                  <div className={styles.cardContent}>
                    {option.text}
                  </div>
                  <div
                    ref={el => { leftNodeRefs.current[option.id] = el; }}
                    className={`
                      ${styles.connectionNode}
                      ${isMatched ? styles.nodeMatched : ''}
                      ${isActive ? styles.nodeActive : ''}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLeftClick(option.id, e);
                    }}
                    title={isMatched ? 'Click to disconnect' : 'Click to connect'}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (Question Category) */}
        <div className={styles.column}>
          <div className={styles.columnHeaderRight}>QUESTION CATEGORY</div>
          <div className={styles.itemsList}>
            {rightOptions.map(option => {
              const matchedLeftId = Object.keys(selectedMatches).find(k => selectedMatches[k] === option.id);
              const isMatched = !!matchedLeftId;

              return (
                <div
                  key={option.id}
                  className={`${styles.cardRow} ${styles.rightRow} ${isMatched ? styles.cardRowMatched : ''}`}
                  onClick={() => handleRightClick(option.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRightClick(option.id);
                    }
                  }}
                >
                  <div
                    ref={el => { rightNodeRefs.current[option.id] = el; }}
                    className={`
                      ${styles.connectionNode}
                      ${isMatched ? styles.nodeMatched : ''}
                      ${activeLeftId && !isMatched ? styles.nodeTarget : ''}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRightClick(option.id);
                    }}
                    title={isMatched ? 'Click to disconnect' : 'Click to link'}
                  />
                  <div className={styles.cardContentRight}>
                    {option.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer with Counter */}
      <div className={styles.statusFooter}>
        <div className={styles.matchCount}>
          {matchedCount} of {totalCount} matched
        </div>
        <span className={styles.matchTip}>
          {activeLeftId 
            ? 'Now click a category on the right to connect' 
            : 'Click any card on the left to start a connection'}
        </span>
      </div>
    </div>
  );
};

export default PracticeMatchingNode;
