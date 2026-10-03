import type { SceneData } from '../data/lessons/questionUnderstanding';

export interface NarrationSegment {
  id: string;
  elementId: string;
  text: string;
  speaker: 'narrator' | 'interviewer' | 'candidate' | 'coach';
  pauseAfterMs?: number;
  isInteractivePause?: boolean;
  durationSec?: number;
}

export interface SceneNarration {
  sceneId: string;
  title: string;
  segments: NarrationSegment[];
  totalDurationSec: number;
}

/**
 * Splits a paragraph into natural sentences for synchronized highlighting
 */
function splitIntoSentences(text: string): string[] {
  if (!text) return [];
  // Split on sentence terminators while preserving words
  const raw = text.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g);
  if (!raw) return [text.trim()];
  return raw.map(s => s.trim()).filter(Boolean);
}

/**
 * Calculates estimated speech duration based on word count and speech rate (WPM)
 */
function estimateDurationSec(text: string, rate: number = 1): number {
  const words = text.trim().split(/\s+/).length;
  // Standard conversational speech is ~150 words per minute
  const baseSeconds = (words / 150) * 60;
  return Math.max(1.5, baseSeconds / rate);
}

/**
 * Generates structured narration segments for any learning scene
 */
export function getSceneNarration(scene: SceneData): SceneNarration {
  const segments: NarrationSegment[] = [];
  const content = scene.content || {};

  switch (scene.type) {
    case 'content':
    case 'explanation': {
      // 1. Heading
      if (content.heading) {
        segments.push({
          id: `${scene.id}-heading`,
          elementId: 'heading',
          text: content.heading,
          speaker: 'narrator',
          pauseAfterMs: 500,
        });
      }

      // 2. Body sentences
      if (content.body) {
        const sentences = splitIntoSentences(content.body);
        sentences.forEach((sentence, idx) => {
          segments.push({
            id: `${scene.id}-body-${idx}`,
            elementId: `body-sentence-${idx}`,
            text: sentence,
            speaker: 'narrator',
            pauseAfterMs: 400,
          });
        });
      }

      // 3. Bullet points
      if (content.bullets && Array.isArray(content.bullets)) {
        content.bullets.forEach((bullet: string, idx: number) => {
          segments.push({
            id: `${scene.id}-bullet-${idx}`,
            elementId: `bullet-${idx}`,
            text: bullet,
            speaker: 'narrator',
            pauseAfterMs: 450,
          });
        });
      }

      // 4. Real-world Example
      if (content.example) {
        segments.push({
          id: `${scene.id}-example-intro`,
          elementId: 'example-box',
          text: "Here is a real-world interview example:",
          speaker: 'narrator',
          pauseAfterMs: 300,
        });
        segments.push({
          id: `${scene.id}-example-text`,
          elementId: 'example-box',
          text: content.example.replace(/^[“"']|[”"']$/g, ''),
          speaker: 'interviewer',
          pauseAfterMs: 500,
        });
      }

      // 5. Key Takeaway
      if (content.takeaway) {
        segments.push({
          id: `${scene.id}-takeaway`,
          elementId: 'takeaway-box',
          text: `Key Takeaway: ${content.takeaway}`,
          speaker: 'coach',
          pauseAfterMs: 600,
        });
      }
      break;
    }

    case 'scenario':
    case 'conversation': {
      // 1. Scene Intro
      if (content.subtopic) {
        segments.push({
          id: `${scene.id}-subtopic`,
          elementId: 'scenario-subtopic',
          text: content.subtopic.replace(/[•\-_]/g, ' '),
          speaker: 'narrator',
          pauseAfterMs: 400,
        });
      }

      // 2. Interviewer Dialogue
      const interviewerText = content.interviewerText || 
        content.dialogue?.find((d: any) => d.speaker === 'interviewer')?.text;

      if (interviewerText) {
        segments.push({
          id: `${scene.id}-interviewer`,
          elementId: 'interviewer-bubble',
          text: interviewerText.replace(/^[“"']|[”"']$/g, ''),
          speaker: 'interviewer',
          pauseAfterMs: 650,
        });
      }

      // 3. Candidate Thought / Dialogue
      const thoughtText = content.thoughtText || 
        content.dialogue?.find((d: any) => d.speaker === 'candidate')?.text;

      if (thoughtText) {
        segments.push({
          id: `${scene.id}-candidate`,
          elementId: 'candidate-bubble',
          text: thoughtText.replace(/^[“"']|[”"']$/g, ''),
          speaker: 'candidate',
          pauseAfterMs: 650,
        });
      }

      // 4. Question Prompt -> Pauses for interaction!
      const question = content.question || content.prompt || "How should you classify this interview question?";
      segments.push({
        id: `${scene.id}-question`,
        elementId: 'question-card',
        text: question,
        speaker: 'narrator',
        isInteractivePause: true, // Will pause and wait for student to answer
        pauseAfterMs: 500,
      });

      break;
    }

    case 'topic-complete': {
      segments.push({
        id: `${scene.id}-complete-heading`,
        elementId: 'complete-heading',
        text: content.heading || "Topic Study Complete!",
        speaker: 'narrator',
        pauseAfterMs: 400,
      });

      if (content.subtitle) {
        segments.push({
          id: `${scene.id}-complete-subtitle`,
          elementId: 'complete-subtitle',
          text: content.subtitle,
          speaker: 'narrator',
          pauseAfterMs: 400,
        });
      }

      if (content.points && Array.isArray(content.points)) {
        content.points.forEach((point: string, idx: number) => {
          segments.push({
            id: `${scene.id}-point-${idx}`,
            elementId: `complete-point-${idx}`,
            text: point,
            speaker: 'narrator',
            pauseAfterMs: 400,
          });
        });
      }

      segments.push({
        id: `${scene.id}-complete-cta`,
        elementId: 'complete-cta',
        text: "You are now ready to test your knowledge with the Concept Check.",
        speaker: 'coach',
        pauseAfterMs: 500,
      });
      break;
    }

    default: {
      if (content.heading) {
        segments.push({
          id: `${scene.id}-heading`,
          elementId: 'heading',
          text: content.heading,
          speaker: 'narrator',
          pauseAfterMs: 400,
        });
      }
      if (content.body) {
        segments.push({
          id: `${scene.id}-body`,
          elementId: 'body',
          text: content.body,
          speaker: 'narrator',
          pauseAfterMs: 400,
        });
      }
    }
  }

  // Calculate durations for each segment
  let cumulativeTime = 0;
  segments.forEach(seg => {
    seg.durationSec = estimateDurationSec(seg.text, 1);
    cumulativeTime += seg.durationSec + (seg.pauseAfterMs || 0) / 1000;
  });

  return {
    sceneId: scene.id,
    title: scene.title,
    segments,
    totalDurationSec: Math.max(5, Math.round(cumulativeTime)),
  };
}

export type ListenState = 'idle' | 'playing' | 'paused' | 'waiting_for_interaction' | 'completed';

export interface NarrationEngineListener {
  onStateChange: (state: ListenState) => void;
  onSegmentChange: (segment: NarrationSegment | null, index: number) => void;
  onProgress: (currentTimeSec: number, totalDurationSec: number) => void;
}

/**
 * Text-to-Speech Narration Controller supporting Web Speech API with reliable boundary handling,
 * speed scaling, pausing on interactive questions, and graceful cleanup.
 */
export class NarrationEngine {
  private segments: NarrationSegment[] = [];
  private currentIndex: number = -1;
  private state: ListenState = 'idle';
  private rate: number = 1.0;
  private volume: number = 1.0;
  private isMuted: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listener: NarrationEngineListener | null = null;
  private timer: number | null = null;
  private totalDurationSec: number = 0;
  private elapsedBeforeCurrentSec: number = 0;
  private segmentStartTime: number = 0;

  constructor() {
    // Warm up speech synthesis if available in browser
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Voices loaded
      };
    }
  }

  public setListener(listener: NarrationEngineListener | null) {
    this.listener = listener;
  }

  public loadScene(narration: SceneNarration, autoPlay: boolean = false) {
    this.stop();
    this.segments = narration.segments;
    this.totalDurationSec = narration.totalDurationSec;
    this.currentIndex = 0;
    this.elapsedBeforeCurrentSec = 0;

    if (autoPlay && this.segments.length > 0) {
      this.playSegment(0);
    } else {
      this.setState('idle');
      if (this.listener && this.segments.length > 0) {
        this.listener.onSegmentChange(this.segments[0], 0);
        this.listener.onProgress(0, this.totalDurationSec);
      }
    }
  }

  public play() {
    if (this.state === 'paused') {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        this.playSegment(this.currentIndex >= 0 ? this.currentIndex : 0);
      }
      this.setState('playing');
      return;
    }

    if (this.state === 'waiting_for_interaction') {
      // User requested resume after interaction
      this.nextSegment();
      return;
    }

    const targetIdx = this.currentIndex >= 0 ? this.currentIndex : 0;
    this.playSegment(targetIdx);
  }

  public pause() {
    if (this.state !== 'playing') return;
    this.clearTimer();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    this.setState('paused');
  }

  public stop() {
    this.clearTimer();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
    this.currentIndex = -1;
    this.elapsedBeforeCurrentSec = 0;
    this.setState('idle');
    if (this.listener) {
      this.listener.onSegmentChange(null, -1);
      this.listener.onProgress(0, this.totalDurationSec);
    }
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.75, Math.min(2.0, rate));
    // If currently playing, restart current segment with new rate for smooth transition
    if (this.state === 'playing' && this.currentIndex >= 0) {
      this.playSegment(this.currentIndex);
    }
  }

  public getRate(): number {
    return this.rate;
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.currentUtterance) {
      this.currentUtterance.volume = this.isMuted ? 0 : this.volume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.currentUtterance) {
      this.currentUtterance.volume = this.isMuted ? 0 : this.volume;
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public nextSegment() {
    if (this.currentIndex < this.segments.length - 1) {
      this.playSegment(this.currentIndex + 1);
    } else {
      this.setState('completed');
    }
  }

  public previousSegment() {
    if (this.currentIndex > 0) {
      this.playSegment(this.currentIndex - 1);
    } else {
      this.playSegment(0);
    }
  }

  public notifyInteractionCompleted(feedbackText?: string) {
    // When student answers an interactive question, narrate feedback if provided, then resume
    if (feedbackText) {
      const feedbackSegment: NarrationSegment = {
        id: `feedback-${Date.now()}`,
        elementId: 'feedback-banner',
        text: feedbackText,
        speaker: 'narrator',
        pauseAfterMs: 600,
      };
      this.segments.splice(this.currentIndex + 1, 0, feedbackSegment);
    }
    this.nextSegment();
  }

  private playSegment(index: number) {
    if (index < 0 || index >= this.segments.length) {
      this.setState('completed');
      return;
    }

    this.clearTimer();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    this.currentIndex = index;
    const segment = this.segments[index];

    // Calculate elapsed time up to this segment
    let elapsed = 0;
    for (let i = 0; i < index; i++) {
      elapsed += (this.segments[i].durationSec || 2) + ((this.segments[i].pauseAfterMs || 0) / 1000);
    }
    this.elapsedBeforeCurrentSec = elapsed;
    this.segmentStartTime = Date.now();

    this.setState('playing');
    if (this.listener) {
      this.listener.onSegmentChange(segment, index);
      this.listener.onProgress(this.elapsedBeforeCurrentSec, this.totalDurationSec);
    }

    // Start timer for progress updates
    this.startProgressTicker();

    // If Web Speech API is supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(segment.text);
        utterance.rate = this.rate;
        utterance.pitch = segment.speaker === 'interviewer' ? 0.95 : (segment.speaker === 'candidate' ? 1.05 : 1.0);
        utterance.volume = this.isMuted ? 0 : this.volume;

        // Pick preferred English natural voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => 
          (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')))
        ) || voices.find(v => v.lang.startsWith('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onend = () => {
          this.handleSegmentEnded(segment);
        };

        utterance.onerror = (e) => {
          console.warn("SpeechSynthesis error, falling back to timer:", e);
          this.fallbackTimerEnd(segment);
        };

        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("SpeechSynthesis failed to speak:", err);
        this.fallbackTimerEnd(segment);
      }
    } else {
      // Fallback timer simulation for environments without Web Speech API
      this.fallbackTimerEnd(segment);
    }
  }

  private fallbackTimerEnd(segment: NarrationSegment) {
    const durationMs = (segment.durationSec || 3) * 1000 / this.rate;
    this.timer = window.setTimeout(() => {
      this.handleSegmentEnded(segment);
    }, durationMs);
  }

  private handleSegmentEnded(segment: NarrationSegment) {
    this.clearTimer();

    // Check if this segment requires pausing for student interaction
    if (segment.isInteractivePause) {
      this.setState('waiting_for_interaction');
      return;
    }

    // Pause between segments
    const pauseMs = (segment.pauseAfterMs || 300) / this.rate;
    this.timer = window.setTimeout(() => {
      this.nextSegment();
    }, pauseMs);
  }

  private startProgressTicker() {
    const interval = 250;
    const ticker = () => {
      if (this.state === 'playing' && this.currentIndex >= 0) {
        const segDuration = this.segments[this.currentIndex]?.durationSec || 2;
        const segElapsed = Math.min(segDuration, (Date.now() - this.segmentStartTime) / 1000);
        const currentSec = Math.min(this.totalDurationSec, this.elapsedBeforeCurrentSec + segElapsed);

        if (this.listener) {
          this.listener.onProgress(currentSec, this.totalDurationSec);
        }
        this.timer = window.setTimeout(ticker, interval);
      }
    };
    this.timer = window.setTimeout(ticker, interval);
  }

  private clearTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private setState(state: ListenState) {
    this.state = state;
    if (this.listener) {
      this.listener.onStateChange(state);
    }
  }

  public getState(): ListenState {
    return this.state;
  }

  public getCurrentSegment(): NarrationSegment | null {
    return this.currentIndex >= 0 && this.currentIndex < this.segments.length 
      ? this.segments[this.currentIndex] 
      : null;
  }
}

// Global Singleton for easy cross-component access
export const narrationEngine = new NarrationEngine();
