import React, { useEffect } from 'react';
import { BookOpen, Target, Sparkles, Lightbulb, Check } from 'lucide-react';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './StudyCards.module.css';

import { useListen } from '../audio/ListenContext';

interface ContentSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const ContentScene: React.FC<ContentSceneProps> = ({ scene, onComplete }) => {
  const { activeElementId, loadScene, isListening } = useListen();

  useEffect(() => {
    onComplete();
  }, [onComplete]);

  // Load narration for current scene
  useEffect(() => {
    loadScene(scene, isListening);
  }, [scene, loadScene, isListening]);

  const { subtopic, heading, body, bullets, example, takeaway } = scene.content || {};

  // Split body into sentences for sentence-level reading synchronization
  const bodySentences = React.useMemo(() => {
    if (!body) return [];
    const raw = body.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g);
    return raw ? raw.map((s: string) => s.trim()).filter(Boolean) : [body];
  }, [body]);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.wideLayout}>
        {/* Main Textbook Column */}
        <div className={styles.mainStudyCard}>
          <div className={styles.badgeRow}>
            <div className={styles.badgeLeft}>
              <BookOpen size={15} />
              <span>{subtopic || `SUBTOPIC • ${scene.title.toUpperCase()}`}</span>
            </div>
          </div>

          {heading && (
            <h2 
              className={`${styles.cardTitle} ${activeElementId === 'heading' ? styles.readingHighlight : ''}`}
              data-listen-id="heading"
            >
              {heading}
            </h2>
          )}

          {bodySentences.length > 0 && (
            <p className={styles.cardBody}>
              {bodySentences.map((sentence: string, idx: number) => {
                const isSentenceActive = activeElementId === `body-sentence-${idx}`;
                return (
                  <span
                    key={idx}
                    data-listen-id={`body-sentence-${idx}`}
                    className={isSentenceActive ? styles.readingHighlightSentence : ''}
                  >
                    {sentence}{' '}
                  </span>
                );
              })}
            </p>
          )}

          {bullets && bullets.length > 0 && (
            <ul className={styles.bulletList}>
              {bullets.map((bullet: string, idx: number) => {
                const isBulletActive = activeElementId === `bullet-${idx}`;
                return (
                  <li 
                    key={idx} 
                    data-listen-id={`bullet-${idx}`}
                    className={`${styles.bulletItem} ${isBulletActive ? styles.readingHighlight : ''}`}
                  >
                    <span className={styles.bulletDot} />
                    <span>{bullet}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {example && (
            <div 
              data-listen-id="example-box"
              className={`${styles.exampleContainer} ${activeElementId === 'example-box' ? styles.readingHighlight : ''}`}
            >
              <div className={styles.exampleLabel}>Real-World Example Scenario</div>
              <div className={styles.quoteBox}>
                <span className={styles.quoteMark}>“</span>
                <span>{example.replace(/^[“"']|[”"']$/g, '')}</span>
                <span className={styles.quoteMark}>”</span>
              </div>
            </div>
          )}

          {takeaway && (
            <div 
              data-listen-id="takeaway-box"
              className={`${styles.takeawayBox} ${activeElementId === 'takeaway-box' ? styles.readingHighlight : ''}`}
            >
              <div className={styles.takeawayLabel}>
                <Target size={14} /> KEY TAKEAWAY
              </div>
              <p className={styles.takeawayText}>{takeaway}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentScene;
