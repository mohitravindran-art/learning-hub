import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Camera, 
  Mic, 
  CheckCircle2, 
  ChevronDown,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import type { AssessmentItem } from '../../../types/assessment';
import styles from './AssessmentAccessModal.module.css';

interface AssessmentAccessModalProps {
  isOpen: boolean;
  assessment: AssessmentItem | null;
  onClose: () => void;
  onAllowAndContinue: () => void;
}

const AVAILABLE_MICS = [
  'Default - Internal Microphone (Built-in)',
  'MacBook Pro Microphone',
  'External USB Audio Device',
];

const AVAILABLE_CAMS = [
  'FaceTime HD Camera (Built-in)',
  'External USB HD Webcam',
];

export const AssessmentAccessModal: React.FC<AssessmentAccessModalProps> = ({
  isOpen,
  assessment,
  onClose,
  onAllowAndContinue,
}) => {
  const [selectedMic, setSelectedMic] = useState(AVAILABLE_MICS[0]);
  const [selectedCam, setSelectedCam] = useState(AVAILABLE_CAMS[0]);
  const [isMicDropdownOpen, setIsMicDropdownOpen] = useState(false);
  const [isCamDropdownOpen, setIsCamDropdownOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(48);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const dropdownMicRef = useRef<HTMLDivElement>(null);
  const dropdownCamRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownMicRef.current && !dropdownMicRef.current.contains(e.target as Node)) {
        setIsMicDropdownOpen(false);
      }
      if (dropdownCamRef.current && !dropdownCamRef.current.contains(e.target as Node)) {
        setIsCamDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Request actual camera stream or setup preview
  useEffect(() => {
    if (!isOpen) {
      if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
        setCameraStream(null);
      }
      return;
    }

    let stream: MediaStream | null = null;
    const initCam = async () => {
      try {
        if (navigator.mediaDevices?.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 320, height: 240 },
            audio: false
          });
          setCameraStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.warn('Camera preview init:', err);
      }
    };

    initCam();

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [isOpen]);

  // Animate volume bar when testing
  useEffect(() => {
    if (isTesting) {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const simulated = 48 + Math.sin(step * 0.4) * 26 + (Math.random() * 12 - 6);
        setVolumeLevel(Math.min(95, Math.max(15, Math.round(simulated))));
      }, 100);

      const timeout = setTimeout(() => {
        setIsTesting(false);
        setVolumeLevel(48);
        clearInterval(interval);
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isTesting]);

  const handleTestClick = () => {
    setIsTesting(prev => !prev);
  };

  const handleEnablePermissions = async () => {
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        stream.getTracks().forEach(t => t.stop());
      }
    } catch (e) {
      console.warn('Permissions request:', e);
    }
    setIsTesting(true);
  };

  if (!isOpen || !assessment) return null;

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
          <div className={styles.modalTitleGroup}>
            <h2 className={styles.modalTitle}>System Check</h2>
            <span className={styles.modalSubtitleTag}>Assessment Verification</span>
          </div>
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
              <div className={styles.videoWrapper}>
                {cameraStream ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={styles.realVideo} 
                  />
                ) : (
                  <div className={styles.simulatedPreview}>
                    <div className={`${styles.micCircle} ${isTesting ? styles.micCirclePulsing : ''}`}>
                      <Camera size={26} color="#FFFFFF" />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Webcam Verified</span>
                  </div>
                )}
                <div className={styles.camStatusPill}>
                  <span className={styles.camDot} />
                  <span>Proctoring Active</span>
                </div>
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
                  <span>Low Input</span>
                  <span>High Input</span>
                </div>
              </div>

              {/* Test Button */}
              <button 
                type="button" 
                className={`${styles.testBtn} ${isTesting ? styles.testBtnActive : ''}`}
                onClick={handleTestClick}
              >
                {isTesting ? 'TESTING...' : 'TEST AUDIO & VIDEO'}
              </button>
            </div>

            {/* Right Side: Setup Info */}
            <div className={styles.setupInfo}>
              <div>
                <div className={styles.setupTitleRow}>
                  <Mic size={18} className={styles.iconOrange} />
                  <h3 className={styles.setupTitle}>Camera &amp; Audio Setup</h3>
                </div>

                {/* Status Rows */}
                <div className={styles.statusRows}>
                  <div className={styles.statusRow}>
                    <span className={styles.statusLabel}>Camera Access</span>
                    <div className={styles.statusValue}>
                      <span>Working</span>
                      <CheckCircle2 size={16} className={styles.checkIconGreen} />
                    </div>
                  </div>

                  <div className={styles.statusRow}>
                    <span className={styles.statusLabel}>Microphone Access</span>
                    <div className={styles.statusValue}>
                      <span>Working</span>
                      <CheckCircle2 size={16} className={styles.checkIconGreen} />
                    </div>
                  </div>

                  <div className={styles.statusRow}>
                    <span className={styles.statusLabel}>Proctoring Readiness</span>
                    <div className={styles.statusValue}>
                      <span>Working</span>
                      <CheckCircle2 size={16} className={styles.checkIconGreen} />
                    </div>
                  </div>
                </div>

                {/* Dropdowns */}
                <div className={styles.dropdownGroup}>
                  {/* Mic Dropdown */}
                  <div className={styles.dropdownContainer} ref={dropdownMicRef}>
                    <div 
                      className={`${styles.dropdownTrigger} ${isMicDropdownOpen ? styles.dropdownTriggerActive : ''}`}
                      onClick={() => {
                        setIsMicDropdownOpen(!isMicDropdownOpen);
                        setIsCamDropdownOpen(false);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <span className={styles.dropdownSelectedText}>
                        {selectedMic}
                      </span>
                      <ChevronDown 
                        size={16} 
                        className={`${styles.chevron} ${isMicDropdownOpen ? styles.chevronRotated : ''}`} 
                      />
                    </div>

                    {isMicDropdownOpen && (
                      <div className={styles.dropdownMenu}>
                        {AVAILABLE_MICS.map((mic, idx) => (
                          <div 
                            key={idx}
                            className={`${styles.dropdownItem} ${selectedMic === mic ? styles.dropdownItemSelected : ''}`}
                            onClick={() => {
                              setSelectedMic(mic);
                              setIsMicDropdownOpen(false);
                            }}
                          >
                            {mic}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cam Dropdown */}
                  <div className={styles.dropdownContainer} ref={dropdownCamRef}>
                    <div 
                      className={`${styles.dropdownTrigger} ${isCamDropdownOpen ? styles.dropdownTriggerActive : ''}`}
                      onClick={() => {
                        setIsCamDropdownOpen(!isCamDropdownOpen);
                        setIsMicDropdownOpen(false);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <span className={styles.dropdownSelectedText}>
                        {selectedCam}
                      </span>
                      <ChevronDown 
                        size={16} 
                        className={`${styles.chevron} ${isCamDropdownOpen ? styles.chevronRotated : ''}`} 
                      />
                    </div>

                    {isCamDropdownOpen && (
                      <div className={styles.dropdownMenu}>
                        {AVAILABLE_CAMS.map((cam, idx) => (
                          <div 
                            key={idx}
                            className={`${styles.dropdownItem} ${selectedCam === cam ? styles.dropdownItemSelected : ''}`}
                            onClick={() => {
                              setSelectedCam(cam);
                              setIsCamDropdownOpen(false);
                            }}
                          >
                            {cam}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enable Permissions Button */}
              <button 
                type="button" 
                className={styles.enableBtn}
                onClick={handleEnablePermissions}
              >
                ENABLE MICROPHONE &amp; CAMERA
              </button>
            </div>

          </div>

          {/* Modal Footer with Blue START button */}
          <div className={styles.modalFooter}>
            <button 
              type="button" 
              className={styles.startBtn}
              onClick={onAllowAndContinue}
            >
              <span>START ASSESSMENT</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentAccessModal;
