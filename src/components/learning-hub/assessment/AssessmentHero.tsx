import React from 'react';
import { Award, ShieldCheck, Check } from 'lucide-react';
import styles from './AssessmentHero.module.css';
import practiceIllustration from '../../../assets/practice-illustration.jpg';

export const AssessmentHero: React.FC = () => {
  return (
    <div className={styles.heroWrapper}>
      {/* 1. Compact Page Header */}
      <div className={styles.headerArea}>
        <div className={styles.titleRow}>
          <div className={styles.titleIconBadge}>
            <Award size={20} className={styles.awardIcon} />
          </div>
          <div className={styles.titleTextGroup}>
            <h1 className={styles.pageTitle}>Assessments</h1>
            <p className={styles.pageSubtitle}>
              Assessments help students evaluate their understanding, demonstrate mastery, and track progress over time.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Colorful, Friendly, Compact Banner */}
      <div className={styles.bannerCard}>
        <div className={styles.bannerLeft}>
          <div className={styles.bannerTag}>
            <ShieldCheck size={13} className={styles.tagIcon} />
            <span>Official Evaluation &amp; Diagnostics</span>
          </div>

          <h2 className={styles.bannerHeading}>
            Test your knowledge. Track your progress. Improve your skills.
          </h2>

          <p className={styles.bannerDescription}>
            Complete structured assessments to measure your understanding and track your progress.
          </p>

          {/* 3 Compact Highlights */}
          <div className={styles.highlightsRow}>
            <div className={styles.highlightChip}>
              <span className={styles.checkCircle}>
                <Check size={12} strokeWidth={3} />
              </span>
              <span>Curriculum Aligned</span>
            </div>
            <div className={styles.highlightChip}>
              <span className={styles.checkCircle}>
                <Check size={12} strokeWidth={3} />
              </span>
              <span>AI Evaluation</span>
            </div>
            <div className={styles.highlightChip}>
              <span className={styles.checkCircle}>
                <Check size={12} strokeWidth={3} />
              </span>
              <span>Video Verified</span>
            </div>
          </div>
        </div>

        {/* Right Mascot Illustration with soft glow & compact speech bubble */}
        <div className={styles.bannerRight}>
          <div className={styles.mascotArea}>
            <div className={styles.speechBubble}>
              <span>Stay calm &amp; trust your prep!</span>
              <div className={styles.speechTail} />
            </div>

            <div className={styles.avatarGlowContainer}>
              <div className={styles.softGlowBlob} />
              <img 
                src={practiceIllustration} 
                alt="Assessment Mentor" 
                className={styles.mascotImg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentHero;
