import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, CheckCircle2, ChevronDown } from 'lucide-react';
import styles from './SystemCheckModal.module.css';

interface SystemCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

const AVAILABLE_MICS = [
  'Default - Internal Microphone (Built-in)',
  'MacBook Pro Microphone',
  'External USB Audio Device',
];

export const SystemCheckModal: React.FC<SystemCheckModalProps> = ({
  isOpen,
  onClose,
  onStart,
}) => {
  const [selectedMic, setSelectedMic] = useState(AVAILABLE_MICS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isTesting, setIsTesting] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(42); // percentage (0 to 100)

  const dropdownRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Animate volume bar when testing
  useEffect(() => {
    if (isTesting) {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        // Simulate speech wave volume fluctuation between 25% and 85%
        const simulated = 45 + Math.sin(step * 0.4) * 28 + (Math.random() * 12 - 6);
        setVolumeLevel(Math.min(95, Math.max(15, Math.round(simulated))));
      }, 100);

      const timeout = setTimeout(() => {
        setIsTesting(false);
        setVolumeLevel(42);
        clearInterval(interval);
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isTesting]);

  // Request real audio stream if user clicks enable
  const handleEnableMicrophone = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Release tracks after verification
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (err) {
      console.warn('Microphone permission request:', err);
    }
    setIsMicEnabled(true);
  };

  const handleTestClick = () => {
    setIsTesting(prev => !prev);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Dark Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>System Check</h2>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {/* Inner Light Grey Card */}
          <div className={styles.setupCard}>
            
            {/* Left Side: Dark Testing Screen */}
            <div className={styles.testScreen}>
              <div className={`${styles.micCircle} ${isTesting ? styles.micCirclePulsing : ''}`}>
                <Mic size={28} className={styles.micIconWhite} />
              </div>

              {/* Volume Slider Bar */}
              <div className={styles.volumeBarContainer}>
                <div className={styles.volumeTrack}>
                  <div 
                    className={styles.volumeProgress} 
                    style={{ width: `${volumeLevel}%` }}
                  />
                </div>
                <div className={styles.volumeLabels}>
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Test Button */}
              <button 
                type="button" 
                className={`${styles.testBtn} ${isTesting ? styles.testBtnActive : ''}`}
                onClick={handleTestClick}
              >
                {isTesting ? 'TESTING...' : 'TEST'}
              </button>
            </div>

            {/* Right Side: Microphone Setup */}
            <div className={styles.setupInfo}>
              {/* Header Title with Orange Mic Icon */}
              <div className={styles.setupTitleRow}>
                <Mic size={18} className={styles.micIconOrange} />
                <h3 className={styles.setupTitle}>Microphone Setup</h3>
              </div>

              {/* Status Rows */}
              <div className={styles.statusRows}>
                <div className={styles.statusRow}>
                  <span className={styles.statusLabel}>Microphone Access</span>
                  <div className={styles.statusValue}>
                    <span>Working</span>
                    <CheckCircle2 size={16} className={styles.checkIconGreen} />
                  </div>
                </div>

                <div className={styles.statusRow}>
                  <span className={styles.statusLabel}>Microphone Test</span>
                  <div className={styles.statusValue}>
                    <span>Working</span>
                    <CheckCircle2 size={16} className={styles.checkIconGreen} />
                  </div>
                </div>
              </div>

              {/* Dropdown Selector */}
              <div className={styles.dropdownContainer} ref={dropdownRef}>
                <div 
                  className={`${styles.dropdownTrigger} ${isDropdownOpen ? styles.dropdownTriggerActive : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  role="button"
                  tabIndex={0}
                >
                  <span className={styles.dropdownSelectedText}>
                    {selectedMic}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`${styles.chevron} ${isDropdownOpen ? styles.chevronRotated : ''}`} 
                  />
                </div>

                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {AVAILABLE_MICS.map((mic, idx) => (
                      <div 
                        key={idx}
                        className={`${styles.dropdownItem} ${selectedMic === mic ? styles.dropdownItemSelected : ''}`}
                        onClick={() => {
                          setSelectedMic(mic);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {mic}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Enable Microphone Full-Width Orange Button */}
              <button 
                type="button" 
                className={styles.enableMicBtn}
                onClick={handleEnableMicrophone}
              >
                ENABLE MICROPHONE
              </button>
            </div>

          </div>

          {/* Footer with Blue START button */}
          <div className={styles.modalFooter}>
            <button 
              type="button" 
              className={styles.startBtn}
              onClick={onStart}
            >
              START
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemCheckModal;
