import React, { useRef, useEffect } from 'react';
import InfiniteMap from './InfiniteMap';
import { getChapterPosition } from '../../data/levelPositions';
import styles from './MapViewport.module.css';

interface MapViewportProps {
  currentChapterId: string;
  isSidebarOpen?: boolean;
  onSelectChapter: (chapterId: string) => void;
  onPlayChapter: (chapterId: string) => void;
}

const MapViewport: React.FC<MapViewportProps> = ({ currentChapterId, isSidebarOpen = false, onSelectChapter, onPlayChapter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drag refs - mutable and synchronous to eliminate stale closures, jitter, and lag
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  // Smoothly center the map on the active chapter
  useEffect(() => {
    if (!currentChapterId || !containerRef.current) return;
    const pos = getChapterPosition(currentChapterId);
    if (pos) {
      const containerWidth = containerRef.current.clientWidth;
      const targetScroll = Math.max(0, pos.x - containerWidth / 2);
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [currentChapterId, isSidebarOpen]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    // Do not initiate map drag if interacting with buttons, nodes, or cards
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, [data-interactive="true"]')) {
      return;
    }

    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startScrollLeftRef.current = containerRef.current.scrollLeft;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    if (e.buttons === 0) {
      isDraggingRef.current = false;
      return;
    }

    // 1:1 natural drag: moving pointer left (deltaX < 0) scrolls map right, and vice-versa
    const deltaX = e.clientX - startXRef.current;
    containerRef.current.scrollLeft = startScrollLeftRef.current - deltaX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
  };

  // Convert mouse wheel or touchpad gesture into horizontal scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    containerRef.current.scrollLeft += delta;
  };

  return (
    <div 
      className={styles.viewport} 
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerMove={handlePointerMove}
      onWheel={handleWheel}
    >
      <div className={styles.world}>
        <InfiniteMap 
          currentChapterId={currentChapterId} 
          isSidebarOpen={isSidebarOpen}
          onSelectChapter={onSelectChapter} 
          onPlayChapter={onPlayChapter} 
        />
      </div>
    </div>
  );
};

export default MapViewport;
