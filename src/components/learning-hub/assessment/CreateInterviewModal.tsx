import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Briefcase, 
  Building2, 
  Layers, 
  Sliders, 
  Check, 
  ArrowRight,
  ShieldAlert,
  Clock
} from 'lucide-react';
import type { AssessmentItem, AssessmentDifficulty } from '../../../types/assessment';
import styles from './CreateInterviewModal.module.css';

interface CreateInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newInterview: AssessmentItem) => void;
}

const ROLES = [
  'Software Engineer',
  'Backend Systems Engineer',
  'Senior Frontend Architect',
  'Machine Learning Engineer',
  'Engineering Manager',
  'Site Reliability Engineer'
];

const COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Stripe',
  'Apple',
  'Netflix',
  'Microsoft'
];

const DIFFICULTIES: AssessmentDifficulty[] = ['Standard', 'Intermediate', 'Advance', 'Challenge'];

const TOPIC_OPTIONS = [
  'System Design & Microservices',
  'STAR Behavioral Leadership',
  'Distributed Consensus & Caching',
  'Concurrency & Data Structures',
  'API Scalability & Rate Limiting'
];

export const CreateInterviewModal: React.FC<CreateInterviewModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  if (!isOpen) return null;

  const [role, setRole] = useState<string>('Software Engineer');
  const [company, setCompany] = useState<string>('Google');
  const [difficulty, setDifficulty] = useState<AssessmentDifficulty>('Advance');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'System Design & Microservices',
    'STAR Behavioral Leadership',
    'Distributed Consensus & Caching'
  ]);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleLaunch = () => {
    const newInterview: AssessmentItem = {
      id: `as-custom-${Date.now()}`,
      name: `${role} Assessment`,
      role: role,
      company: company,
      source: 'Self-Created',
      hasInfoTooltip: true,
      description: `Tailored ${difficulty} assessment for ${role} at ${company} covering ${selectedTopics.join(', ')}.`,
      chapter: '2 Chapters',
      topic: `${selectedTopics.length} Topics`,
      selectedChapters: ['Chapter 01 — Fundamental Principles', 'Chapter 02 — Applied Execution'],
      selectedTopics: selectedTopics,
      totalQuestions: 15,
      completedQuestions: 0,
      durationMinutes: durationMinutes,
      difficulty: difficulty,
      assessmentType: 'Comprehensive',
      status: 'in-progress',
      scheduledDate: 'Started Just Now',
    };

    onCreate(newInterview);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.sparkleIconBox}>
              <Sparkles size={20} className={styles.sparkleIcon} />
            </div>
            <div>
              <h2 className={styles.title}>Create Custom Assessment</h2>
              <p className={styles.subtitle}>Configure topics and evaluation criteria to generate an adaptive assessment.</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Content Form */}
        <div className={styles.body}>
          {/* Target Role & Company Grid */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Briefcase size={15} /> Target Role
              </label>
              <select 
                className={styles.select}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Building2 size={15} /> Target Company
              </label>
              <select 
                className={styles.select}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                {COMPANIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Difficulty Level */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Layers size={15} /> Simulation Difficulty
            </label>
            <div className={styles.difficultyPills}>
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  type="button"
                  className={`${styles.diffPill} ${difficulty === d ? styles.diffPillActive : ''}`}
                  onClick={() => setDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Dimensions & Topics */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Sliders size={15} /> Evaluated Competency Domains
            </label>
            <div className={styles.topicGrid}>
              {TOPIC_OPTIONS.map(topic => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    className={`${styles.topicChip} ${isSelected ? styles.topicChipActive : ''}`}
                    onClick={() => toggleTopic(topic)}
                  >
                    <div className={styles.checkIconBox}>
                      {isSelected && <Check size={12} />}
                    </div>
                    <span>{topic}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simulation Duration Info */}
          <div className={styles.infoBox}>
            <Clock size={16} className={styles.infoIcon} />
            <div className={styles.infoText}>
              <strong>Estimated Time: {durationMinutes} Minutes (5 Interview Rounds)</strong>
              <p>Adaptive AI interviewers will evaluate technical depth, STAR responses, and live composure.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.launchBtn} onClick={handleLaunch}>
            <span>Generate & Launch Interview</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInterviewModal;
