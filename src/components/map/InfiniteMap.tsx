import React from 'react';
import { useSubject } from '../../context/SubjectContext';
import { getChapterPosition } from '../../data/levelPositions';
import LevelNode from '../nodes/LevelNode';
import styles from './InfiniteMap.module.css';

interface InfiniteMapProps {
  currentChapterId: string;
  isSidebarOpen: boolean;
  onSelectChapter: (chapterId: string) => void;
  onPlayChapter: (chapterId: string) => void;
}

const InfiniteMap: React.FC<InfiniteMapProps> = ({ currentChapterId, isSidebarOpen, onSelectChapter, onPlayChapter }) => {
  const { currentSubject } = useSubject();
  
  // Tile width calibrated to 1920px matching levelPositions
  const TILE_WIDTH = 1920;
  
  // 5 tiles to cover 9600px total world width
  const tiles = [0, 1, 2, 3, 4];

  return (
    <div className={`${styles.infiniteMap} ${isSidebarOpen ? styles.mapShifted : ''}`}>
      {/* Dynamic Background Layer for the active learning world */}
      <div className={styles.backgroundLayer}>
        {tiles.map(tileIndex => (
          <div 
            key={tileIndex}
            className={styles.mapTile}
            style={{ 
              left: `${tileIndex * TILE_WIDTH}px`,
              width: `${TILE_WIDTH}px`,
              backgroundImage: `url("${currentSubject.backgroundImage}")`
            }}
          />
        ))}
      </div>
      
      {/* 6 Levels / Chapters Layer */}
      <div className={styles.levelLayer}>
        {currentSubject.chapters.map(chapter => {
          const pos = getChapterPosition(chapter.id, chapter.number);
          
          return (
            <div 
              key={chapter.id} 
              className={styles.levelNodeWrapper}
              style={{ 
                left: `${pos.x}px`, 
                top: `${pos.y}px` 
              }}
            >
              <LevelNode 
                chapter={chapter}
                isActive={currentChapterId === chapter.id}
                onClick={() => onSelectChapter(chapter.id)}
                onPlay={() => onPlayChapter(chapter.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteMap;
