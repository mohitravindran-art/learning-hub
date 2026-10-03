import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, Check } from 'lucide-react';
import { useSubject } from '../../context/SubjectContext';
import styles from './LearningHubHeader.module.css';

const LearningHubHeader: React.FC = () => {
  const { subjects, currentSubjectId, currentSubject, setCurrentSubjectId } = useSubject();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <span className={styles.icon}>💡</span>
          <span className={styles.brand}>Learning Hub</span>
        </div>

        {/* Dynamic 6-Subject Dropdown */}
        <div className={styles.courseSelectorWrapper} ref={dropdownRef}>
          <div 
            className={`${styles.courseSelector} ${isDropdownOpen ? styles.courseSelectorActive : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            role="button"
            tabIndex={0}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span className={styles.subjectIconEmoji}>{currentSubject.icon}</span>
            <span className={styles.subjectCurrentName}>{currentSubject.name}</span>
            <span className={`${styles.chevron} ${isDropdownOpen ? styles.chevronRotated : ''}`}>▼</span>
          </div>

          {isDropdownOpen && (
            <div className={styles.subjectDropdownMenu} role="listbox">
              <div className={styles.dropdownHeader}>
                <span>Select Subject</span>
              </div>
              <div className={styles.dropdownList}>
                {subjects.map(subject => {
                  const isSelected = subject.id === currentSubjectId;
                  return (
                    <div 
                      key={subject.id}
                      className={`${styles.subjectItem} ${isSelected ? styles.subjectItemSelected : ''}`}
                      onClick={() => {
                        setCurrentSubjectId(subject.id);
                        setIsDropdownOpen(false);
                      }}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={0}
                    >
                      <div className={styles.checkCol}>
                        {isSelected ? (
                          <Check size={16} strokeWidth={2.8} className={styles.checkIcon} />
                        ) : (
                          <div className={styles.checkSpacer} />
                        )}
                      </div>
                      <div className={styles.subjectIconBox}>
                        <span>{subject.icon}</span>
                      </div>
                      <div className={styles.subjectTextCol}>
                        <div className={styles.subjectTitleRow}>
                          <span className={styles.subjectTitle}>{subject.name}</span>
                        </div>
                        <span className={styles.subjectTagline}>{subject.tagline}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Search">
          <Search size={20} />
        </button>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
          <span className={styles.badge}></span>
        </button>
        <button className={styles.profileBtn} aria-label="Profile">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default LearningHubHeader;
