import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { 
  narrationEngine, 
  getSceneNarration, 
  type NarrationSegment, 
  type ListenState 
} from '../../../services/audioNarrationService';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';

interface ListenContextType {
  isListening: boolean;
  listenState: ListenState;
  currentSegment: NarrationSegment | null;
  activeElementId: string | null;
  currentTimeSec: number;
  totalDurationSec: number;
  playbackSpeed: number;
  isMuted: boolean;
  startListening: () => void;
  pauseListening: () => void;
  resumeListening: () => void;
  togglePlayPause: () => void;
  stopListening: () => void;
  setPlaybackSpeed: (speed: number) => void;
  toggleMute: () => void;
  nextSegment: () => void;
  prevSegment: () => void;
  notifyInteractionComplete: (feedback?: string) => void;
  loadScene: (scene: SceneData, autoPlay?: boolean) => void;
}

const ListenContext = createContext<ListenContextType | undefined>(undefined);

export const ListenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [listenState, setListenState] = useState<ListenState>('idle');
  const [currentSegment, setCurrentSegment] = useState<NarrationSegment | null>(null);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [totalDurationSec, setTotalDurationSec] = useState(0);
  const [playbackSpeed, setPlaybackSpeedState] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);

  const currentSceneRef = useRef<SceneData | null>(null);

  // Set up listeners for the NarrationEngine
  useEffect(() => {
    narrationEngine.setListener({
      onStateChange: (state) => {
        setListenState(state);
      },
      onSegmentChange: (segment, _index) => {
        setCurrentSegment(segment);
        setActiveElementId(segment ? segment.elementId : null);

        // Auto-scroll to active element smoothly if not currently in view
        if (segment?.elementId) {
          setTimeout(() => {
            const el = document.querySelector(`[data-listen-id="${segment.elementId}"]`) || 
                       document.getElementById(segment.elementId);
            if (el) {
              const rect = el.getBoundingClientRect();
              const isVisible = rect.top >= 120 && rect.bottom <= (window.innerHeight - 120);
              if (!isVisible) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
          }, 60);
        }
      },
      onProgress: (current, total) => {
        setCurrentTimeSec(Math.round(current));
        setTotalDurationSec(Math.round(total));
      }
    });

    return () => {
      narrationEngine.stop();
      narrationEngine.setListener(null);
    };
  }, []);

  const loadScene = useCallback((scene: SceneData, autoPlay: boolean = false) => {
    currentSceneRef.current = scene;
    const narration = getSceneNarration(scene);
    narrationEngine.loadScene(narration, autoPlay);
    if (autoPlay) {
      setIsListening(true);
    }
  }, []);

  const startListening = useCallback(() => {
    setIsListening(true);
    if (currentSceneRef.current) {
      const narration = getSceneNarration(currentSceneRef.current);
      narrationEngine.loadScene(narration, true);
    } else {
      narrationEngine.play();
    }
  }, []);

  const pauseListening = useCallback(() => {
    narrationEngine.pause();
  }, []);

  const resumeListening = useCallback(() => {
    narrationEngine.play();
  }, []);

  const togglePlayPause = useCallback(() => {
    if (listenState === 'playing') {
      narrationEngine.pause();
    } else {
      setIsListening(true);
      narrationEngine.play();
    }
  }, [listenState]);

  const stopListening = useCallback(() => {
    narrationEngine.stop();
    setIsListening(false);
    setActiveElementId(null);
    setCurrentSegment(null);
  }, []);

  const setPlaybackSpeed = useCallback((speed: number) => {
    setPlaybackSpeedState(speed);
    narrationEngine.setRate(speed);
  }, []);

  const toggleMute = useCallback(() => {
    const muted = narrationEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  const nextSegment = useCallback(() => {
    narrationEngine.nextSegment();
  }, []);

  const prevSegment = useCallback(() => {
    narrationEngine.previousSegment();
  }, []);

  const notifyInteractionComplete = useCallback((feedback?: string) => {
    narrationEngine.notifyInteractionCompleted(feedback);
  }, []);

  return (
    <ListenContext.Provider
      value={{
        isListening,
        listenState,
        currentSegment,
        activeElementId,
        currentTimeSec,
        totalDurationSec,
        playbackSpeed,
        isMuted,
        startListening,
        pauseListening,
        resumeListening,
        togglePlayPause,
        stopListening,
        setPlaybackSpeed,
        toggleMute,
        nextSegment,
        prevSegment,
        notifyInteractionComplete,
        loadScene,
      }}
    >
      {children}
    </ListenContext.Provider>
  );
};

export const useListen = (): ListenContextType => {
  const context = useContext(ListenContext);
  if (!context) {
    throw new Error('useListen must be used within a ListenProvider');
  }
  return context;
};
