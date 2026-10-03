export const chapterPositions: Record<number, { x: number; y: number }> = {
  1: { x: 260, y: 380 },
  2: { x: 560, y: 440 },
  3: { x: 890, y: 340 },
  4: { x: 1220, y: 460 },
  5: { x: 1540, y: 360 },
  6: { x: 1840, y: 440 },
};

export const levelPositions: Record<string, { x: number; y: number }> = {
  // Universal Communication
  "comm-ch-1": { x: 260, y: 380 },
  "comm-ch-2": { x: 560, y: 440 },
  "comm-ch-3": { x: 890, y: 340 },
  "comm-ch-4": { x: 1220, y: 460 },
  "comm-ch-5": { x: 1540, y: 360 },
  "comm-ch-6": { x: 1840, y: 440 },

  // Critical Thinking
  "crit-ch-1": { x: 260, y: 380 },
  "crit-ch-2": { x: 560, y: 440 },
  "crit-ch-3": { x: 890, y: 340 },
  "crit-ch-4": { x: 1220, y: 460 },
  "crit-ch-5": { x: 1540, y: 360 },
  "crit-ch-6": { x: 1840, y: 440 },

  // Digital Literacy
  "dig-ch-1": { x: 260, y: 380 },
  "dig-ch-2": { x: 560, y: 440 },
  "dig-ch-3": { x: 890, y: 340 },
  "dig-ch-4": { x: 1220, y: 460 },
  "dig-ch-5": { x: 1540, y: 360 },
  "dig-ch-6": { x: 1840, y: 440 },

  // Teamwork
  "team-ch-1": { x: 260, y: 380 },
  "team-ch-2": { x: 560, y: 440 },
  "team-ch-3": { x: 890, y: 340 },
  "team-ch-4": { x: 1220, y: 460 },
  "team-ch-5": { x: 1540, y: 360 },
  "team-ch-6": { x: 1840, y: 440 },

  // Creativity
  "creat-ch-1": { x: 260, y: 380 },
  "creat-ch-2": { x: 560, y: 440 },
  "creat-ch-3": { x: 890, y: 340 },
  "creat-ch-4": { x: 1220, y: 460 },
  "creat-ch-5": { x: 1540, y: 360 },
  "creat-ch-6": { x: 1840, y: 440 },

  // Professional & Ethical Skills
  "prof-ch-1": { x: 260, y: 380 },
  "prof-ch-2": { x: 560, y: 440 },
  "prof-ch-3": { x: 890, y: 340 },
  "prof-ch-4": { x: 1220, y: 460 },
  "prof-ch-5": { x: 1540, y: 360 },
  "prof-ch-6": { x: 1840, y: 440 },

  // Legacy mappings for backwards compatibility
  "question-understanding": { x: 260, y: 380 },
  "thinking-before-speaking": { x: 560, y: 440 },
  "structuring-your-answer": { x: 890, y: 340 },
  "confidence-and-delivery": { x: 1220, y: 460 },
  "handling-follow-up-questions": { x: 1540, y: 360 },
};

export const getChapterPosition = (chapterId: string, chapterNumber?: number): { x: number; y: number } => {
  if (levelPositions[chapterId]) return levelPositions[chapterId];
  if (chapterNumber && chapterPositions[chapterNumber]) return chapterPositions[chapterNumber];
  return { x: 260, y: 380 };
};
