import React from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  SkipBack, 
  SkipForward, 
  Headphones, 
  Clock 
} from 'lucide-react';
import { useListen } from './ListenContext';
import styles from './ListenPlayerBar.module.css';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5, 2.0];

const ListenPlayerBar: React.FC = () => {
  const {
    listenState,
    currentTimeSec,
    totalDurationSec,
    playbackSpeed,
    isMuted,
    togglePlayPause,
    stopListening,
    setPlaybackSpeed,
    toggleMute,
    nextSegment,
    prevSegment,
  } = useListen();

  const isPlaying = listenState === 'playing';
  const isWaiting = listenState === 'waiting_for_interaction';
  const progressPercent = totalDurationSec > 0 
    ? Math.min(100, Math.max(0, (currentTimeSec / totalDurationSec) * 100)) 
    : 0;

  const cycleSpeed = () => {
    const currentIdx = SPEED_OPTIONS.indexOf(playbackSpeed);
    const nextIdx = (currentIdx + 1) % SPEED_OPTIONS.length;
    setPlaybackSpeed(SPEED_OPTIONS[nextIdx]);
  };

  return (
    <div className={styles.playerBar} role="region" aria-label="Audio Narration Player">
      {/* 1. Status Indicator */}
      <div className={styles.statusGroup}>
        {isWaiting ? (
          <span className={`${styles.statusBadge} ${styles.waitingBadge}`}>
            <Clock size={14} /> Waiting for Answer
          </span>
        ) : (
          <span className={styles.statusBadge}>
            <Headphones size={14} /> {isPlaying ? "Listening..." : "Audio Ready"}
          </span>
        )}
      </div>

      {/* 2. Main Play/Pause & Skip Controls */}
      <div className={styles.controlsGroup}>
        <button
          className={styles.skipBtn}
          onClick={prevSegment}
          title="Previous sentence (Left Arrow)"
          aria-label="Previous sentence"
          type="button"
        >
          <SkipBack size={15} />
        </button>

        <button
          className={styles.playPauseBtn}
          onClick={togglePlayPause}
          title={isPlaying ? "Pause audio (Space)" : "Play audio (Space)"}
          aria-label={isPlaying ? "Pause" : "Play"}
          type="button"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
        </button>

        <button
          className={styles.skipBtn}
          onClick={nextSegment}
          title="Next sentence (Right Arrow)"
          aria-label="Next sentence"
          type="button"
        >
          <SkipForward size={15} />
        </button>
      </div>

      {/* 3. Progress Bar & Time */}
      <div className={styles.progressSection}>
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className={styles.timeDisplay}>
          {formatTime(currentTimeSec)} / {formatTime(totalDurationSec)}
        </span>
      </div>

      {/* 4. Speed & Volume & Stop Controls */}
      <div className={styles.utilityGroup}>
        <button
          className={styles.speedBtn}
          onClick={cycleSpeed}
          title="Change playback speed"
          aria-label={`Playback speed ${playbackSpeed}x`}
          type="button"
        >
          {playbackSpeed}×
        </button>

        <button
          className={styles.volumeBtn}
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
          type="button"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <button
          className={styles.closeBtn}
          onClick={stopListening}
          title="Close listening mode (Escape)"
          aria-label="Close listen mode"
          type="button"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ListenPlayerBar;
