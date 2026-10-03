import React from 'react';
import { X, Play, BookOpen, Clock, Layers, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { INTERVIEW_LIBRARY_OPTIONS } from '../../../data/assessmentData';
import type { AssessmentItem } from '../../../types/assessment';
import styles from './InterviewLibraryModal.module.css';

interface InterviewLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInterview: (assessment: AssessmentItem) => void;
}

export const InterviewLibraryModal: React.FC<InterviewLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectInterview
}) => {
  if (!isOpen) return null;

  const handleStartTemplate = (template: typeof INTERVIEW_LIBRARY_OPTIONS[0]) => {
    const item: AssessmentItem = {
      id: `int-lib-${template.id}-${Date.now()}`,
      name: template.title,
      role: template.role,
      company: template.company,
      source: 'Interview Library',
      hasInfoTooltip: true,
      description: template.description,
      chapter: 'Interview Simulation',
      topic: template.tags[0] || 'System Architecture',
      selectedChapters: ['Interview Simulation'],
      selectedTopics: template.tags,
      totalQuestions: template.rounds,
      completedQuestions: 0,
      durationMinutes: template.timeMinutes,
      difficulty: template.difficulty as any,
      assessmentType: 'Interview Simulation',
      status: 'in-progress',
      scheduledDate: 'Started Just Now',
    };

    onSelectInterview(item);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.iconBadge}>
              <BookOpen size={20} className={styles.icon} />
            </div>
            <div>
              <div className={styles.titleRow}>
                <h2 className={styles.title}>Interview Simulation Library</h2>
                <span className={styles.countBadge}>6 Curated Loops</span>
              </div>
              <p className={styles.subtitle}>
                Pre-configured hiring loops calibrated against real technical and behavioral rubrics.
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Templates Grid */}
        <div className={styles.body}>
          <div className={styles.templatesGrid}>
            {INTERVIEW_LIBRARY_OPTIONS.map((item) => (
              <div key={item.id} className={styles.templateCard}>
                <div className={styles.cardTop}>
                  <span className={styles.emojiIcon}>{item.icon}</span>
                  <div className={styles.companyTag}>
                    <Building2 size={12} />
                    <span>{item.company}</span>
                  </div>
                  <span className={styles.difficultyTag}>{item.difficulty}</span>
                </div>

                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>

                <div className={styles.tagList}>
                  {item.tags.map((t, idx) => (
                    <span key={idx} className={styles.tag}>{t}</span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.metaInfo}>
                    <span><Clock size={12} /> {item.timeMinutes}m</span>
                    <span><Layers size={12} /> {item.rounds} Rounds</span>
                  </div>
                  <button 
                    className={styles.startBtn}
                    onClick={() => handleStartTemplate(item)}
                  >
                    <Play size={12} fill="currentColor" />
                    <span>Start Simulation</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerNote}>
            All library interviews include AI voice analysis, STAR framework rubrics, and automated scorecards.
          </span>
          <button className={styles.closeActionBtn} onClick={onClose}>
            Close Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewLibraryModal;
