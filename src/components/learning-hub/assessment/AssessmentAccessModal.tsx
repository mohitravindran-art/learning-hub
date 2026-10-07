import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Camera, 
  Mic, 
  AlertTriangle, 
  ChevronDown, 
  Check, 
  CheckCircle2 
} from 'lucide-react';
import type { AssessmentItem } from '../../../types/assessment';
import styles from './AssessmentAccessModal.module.css';

interface AssessmentAccessModalProps {
  isOpen: boolean;
  assessment: AssessmentItem | null;
  onClose: () => void;
  onAllowAndContinue: () => void;
}

const CAMERA_DEVICES = [
  'FaceTime HD Camera (Built-in)',
  'External USB HD Webcam',
];

const MIC_DEVICES = [
  'Default - Internal Microphone (Built-in)',
  'External USB Audio Device',
];

export const AssessmentAccessModal: React.FC<AssessmentAccessModalProps> = ({
  isOpen,
  assessment,
  onClose,
  onAllowAndContinue,
}) => {
  // Device selections
  const [selectedCamera, setSelectedCamera] = useState<string>('Camera');
  const [selectedMic, setSelectedMic] = useState<string>('Microphone');
  const [isCameraDropdownOpen, setIsCameraDropdownOpen] = useState(false);
  const [isMicDropdownOpen, setIsMicDropdownOpen] = useState(false);

  // Device permissions / states matching screenshot
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true); // Matches screenshot: "ENABLED" (orange)
  const [screenShared, setScreenShared] = useState(false);

  // Audio Testing & volume level (matches screenshot audio bar around 48%)
  const [isTesting, setIsTesting] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(48);

  // Live Streams
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const camDropdownRef = useRef<HTMLDivElement>(null);
  const micDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (camDropdownRef.current && !camDropdownRef.current.contains(e.target as Node)) {
        setIsCameraDropdownOpen(false);
      }
      if (micDropdownRef.current && !micDropdownRef.current.contains(e.target as Node)) {
        setIsMicDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Cleanup media streams on modal close
  useEffect(() => {
    if (!isOpen) {
      if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.stop());
        setCameraStream(null);
      }
      if (screenStream) {
        screenStream.getTracks().forEach((t) => t.stop());
        setScreenStream(null);
      }
      setCameraEnabled(false);
      setScreenShared(false);
      setIsTesting(false);
    }
  }, [isOpen]);

  // Audio testing animation
  useEffect(() => {
    if (!isTesting) return;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const simulated = 46 + Math.sin(step * 0.5) * 28 + (Math.random() * 10 - 5);
      setVolumeLevel(Math.min(95, Math.max(15, Math.round(simulated))));
    }, 100);

    const timer = setTimeout(() => {
      setIsTesting(false);
      setVolumeLevel(48);
      clearInterval(interval);
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isTesting]);

  // Request actual camera or toggle enable
  const handleEnableCamera = async () => {
    if (cameraEnabled && cameraStream) {
      cameraStream.getTracks().forEach((t) => t.stop());
      setCameraStream(null);
      setCameraEnabled(false);
      return;
    }

    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 400, height: 300 },
          audio: false,
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraEnabled(true);
        setSelectedCamera(CAMERA_DEVICES[0]);
      } else {
        setCameraEnabled(true);
      }
    } catch (err) {
      console.warn('Camera request error:', err);
      // Fallback toggle for demo environments without webcam
      setCameraEnabled((prev) => !prev);
    }
  };

  // Test microphone button
  const handleTestMic = () => {
    setIsTesting((prev) => !prev);
  };

  // Toggle microphone
  const handleToggleMic = () => {
    setMicEnabled((prev) => !prev);
  };

  // Request screen sharing
  const handleShareScreen = async () => {
    if (screenShared && screenStream) {
      screenStream.getTracks().forEach((t) => t.stop());
      setScreenStream(null);
      setScreenShared(false);
      return;
    }

    try {
      if (navigator.mediaDevices?.getDisplayMedia) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        setScreenStream(stream);
        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = stream;
        }
        setScreenShared(true);

        stream.getVideoTracks()[0].onended = () => {
          setScreenShared(false);
          setScreenStream(null);
        };
      } else {
        setScreenShared(true);
      }
    } catch (err) {
      console.warn('Screen share request error:', err);
      // Fallback toggle for environments without displayMedia
      setScreenShared((prev) => !prev);
    }
  };

  if (!isOpen || !assessment) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="system-check-title"
      >
        {/* 1. DARK CHARCOAL SLATE HEADER */}
        <div className={styles.modalHeader}>
          <h2 id="system-check-title" className={styles.modalTitle}>
            System Check
          </h2>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* 2. MODAL BODY */}
        <div className={styles.modalBody}>
          
          {/* Top Banner: Chrome browser detected */}
          <div className={styles.browserBanner}>
            <div className={styles.browserBannerLeft}>
              {/* Window / Browser Outline Icon matching screenshot */}
              <svg 
                className={styles.browserIcon} 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#1E293B" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="18" rx="3" />
                <line x1="2" y1="8" x2="22" y2="8" />
                <circle cx="5" cy="5.5" r="0.75" fill="#1E293B" />
                <circle cx="8" cy="5.5" r="0.75" fill="#1E293B" />
                <circle cx="11" cy="5.5" r="0.75" fill="#1E293B" />
              </svg>
              <span className={styles.browserText}>Chrome browser detected</span>
            </div>
            <div className={styles.greenCheckBadge}>
              <Check size={14} strokeWidth={3.5} color="#FFFFFF" />
            </div>
          </div>

          {/* 3 COLUMNS GRID */}
          <div className={styles.columnsGrid}>
            
            {/* COLUMN 1: CAMERA */}
            <div className={styles.columnCard}>
              {/* Top Preview Area (Black Box) */}
              <div className={styles.cameraPreviewBox}>
                {cameraStream ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={styles.previewVideo}
                  />
                ) : (
                  <div className={styles.previewCenterPlaceholder}>
                    <div className={styles.previewIconCircle}>
                      <Camera size={24} color="#FFFFFF" />
                    </div>
                    <span className={styles.previewPlaceholderText}>Camera Preview</span>
                  </div>
                )}
              </div>

              {/* Title Row */}
              <div className={styles.deviceTitleRow}>
                <Camera size={18} className={styles.iconBlue} />
                <span className={styles.deviceTitle}>Camera</span>
              </div>

              {/* Alert or Connected Message */}
              {!cameraEnabled ? (
                <div className={styles.alertBox}>
                  <div className={styles.alertHeader}>
                    <AlertTriangle size={15} className={styles.alertTriangleIcon} />
                    <span className={styles.alertTitle}>No Device Found</span>
                  </div>
                  <p className={styles.alertDesc}>
                    No camera detected.<br />
                    Please connect your device and try again.
                  </p>
                </div>
              ) : (
                <div className={styles.successBox}>
                  <div className={styles.successHeader}>
                    <CheckCircle2 size={15} className={styles.successCheckIcon} />
                    <span className={styles.successTitle}>Camera Connected</span>
                  </div>
                  <p className={styles.successDesc}>
                    Video feed active and verified.
                  </p>
                </div>
              )}

              {/* Device Dropdown */}
              <div className={styles.dropdownWrapper} ref={camDropdownRef}>
                <button
                  type="button"
                  className={styles.dropdownBtn}
                  onClick={() => setIsCameraDropdownOpen(!isCameraDropdownOpen)}
                >
                  <span className={styles.dropdownSelected}>{selectedCamera}</span>
                  <ChevronDown size={16} className={styles.dropdownChevron} />
                </button>
                {isCameraDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {CAMERA_DEVICES.map((dev) => (
                      <div
                        key={dev}
                        className={styles.dropdownItem}
                        onClick={() => {
                          setSelectedCamera(dev);
                          setIsCameraDropdownOpen(false);
                        }}
                      >
                        {dev}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button: ENABLE CAMERA */}
              <button
                type="button"
                className={`${styles.actionBtn} ${cameraEnabled ? styles.actionBtnOrange : styles.actionBtnGray}`}
                onClick={handleEnableCamera}
              >
                {cameraEnabled ? 'ENABLED' : 'ENABLE CAMERA'}
              </button>
            </div>

            {/* COLUMN 2: MICROPHONE */}
            <div className={styles.columnCard}>
              {/* Top Preview Area (Dark Slate Box with Volume Meter & Test Button) */}
              <div className={styles.micPreviewBox}>
                <div className={styles.previewIconCircle}>
                  <Mic size={24} color="#FFFFFF" />
                </div>

                {/* Volume Meter Bar */}
                <div className={styles.volumeMeterSection}>
                  <div className={styles.volumeTrack}>
                    <div 
                      className={styles.volumeFill} 
                      style={{ width: `${volumeLevel}%` }} 
                    />
                  </div>
                  <div className={styles.volumeLabels}>
                    <span>Low</span>
                    <span>High</span>
                  </div>

                  {/* TEST Button */}
                  <button
                    type="button"
                    className={`${styles.testBtn} ${isTesting ? styles.testBtnActive : ''}`}
                    onClick={handleTestMic}
                  >
                    {isTesting ? 'TESTING' : 'TEST'}
                  </button>
                </div>
              </div>

              {/* Title Row */}
              <div className={styles.deviceTitleRow}>
                <Mic size={18} className={styles.iconOrange} />
                <span className={styles.deviceTitle}>Microphone</span>
              </div>

              {/* Alert Box matching screenshot */}
              <div className={styles.alertBox}>
                <div className={styles.alertHeader}>
                  <AlertTriangle size={15} className={styles.alertTriangleIcon} />
                  <span className={styles.alertTitle}>No Device Found</span>
                </div>
                <p className={styles.alertDesc}>
                  No microphone detected.<br />
                  Please connect your device and try again.
                </p>
              </div>

              {/* Device Dropdown */}
              <div className={styles.dropdownWrapper} ref={micDropdownRef}>
                <button
                  type="button"
                  className={styles.dropdownBtn}
                  onClick={() => setIsMicDropdownOpen(!isMicDropdownOpen)}
                >
                  <span className={styles.dropdownSelected}>{selectedMic}</span>
                  <ChevronDown size={16} className={styles.dropdownChevron} />
                </button>
                {isMicDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {MIC_DEVICES.map((dev) => (
                      <div
                        key={dev}
                        className={styles.dropdownItem}
                        onClick={() => {
                          setSelectedMic(dev);
                          setIsMicDropdownOpen(false);
                        }}
                      >
                        {dev}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button: ENABLED (Orange in screenshot) */}
              <button
                type="button"
                className={`${styles.actionBtn} ${micEnabled ? styles.actionBtnOrange : styles.actionBtnGray}`}
                onClick={handleToggleMic}
              >
                {micEnabled ? 'ENABLED' : 'ENABLE MICROPHONE'}
              </button>
            </div>

            {/* COLUMN 3: SCREEN SHARING */}
            <div className={styles.columnCard}>
              {/* Top Preview Area (Black Box) */}
              <div className={styles.screenPreviewBox}>
                {screenStream ? (
                  <video 
                    ref={screenVideoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={styles.previewVideo}
                  />
                ) : (
                  <div className={styles.previewCenterPlaceholder}>
                    <div className={styles.previewIconCircle}>
                      {/* Screen with Arrow Up Icon matching screenshot */}
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#FFFFFF" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8" />
                        <path d="M12 17v4" />
                        <path d="m9 10 3-3 3 3" />
                        <path d="M12 7v6" />
                      </svg>
                    </div>
                    <span className={styles.previewPlaceholderText}>Screen Preview</span>
                  </div>
                )}
              </div>

              {/* Title Row */}
              <div className={styles.deviceTitleRow}>
                {/* Screen Share Blue Icon */}
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#0066FF" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                  <path d="m9 10 3-3 3 3" />
                  <path d="M12 7v6" />
                </svg>
                <span className={styles.deviceTitle}>Screen Sharing</span>
              </div>

              {/* Status Section matching screenshot */}
              <div className={styles.screenStatusContainer}>
                <div className={styles.screenStatusRow}>
                  <span className={styles.screenAccessLabel}>Screen Access</span>
                  {screenShared ? (
                    <span className={styles.screenGrantedTag}>
                      Granted <Check size={14} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className={styles.screenRequiredTag}>
                      Required <AlertTriangle size={14} className={styles.requiredAlertIcon} />
                    </span>
                  )}
                </div>
                <p className={styles.screenStatusDesc}>
                  This assessment requires screen sharing.
                </p>
              </div>

              {/* Spacer to align buttons equally */}
              <div className={styles.columnSpacer} />

              {/* Action Button: SHARE SCREEN */}
              <button
                type="button"
                className={`${styles.actionBtn} ${screenShared ? styles.actionBtnOrange : styles.actionBtnGray}`}
                onClick={handleShareScreen}
              >
                {screenShared ? 'SCREEN SHARED' : 'SHARE SCREEN'}
              </button>
            </div>

          </div>

          {/* 4. BOTTOM ACTION ROW: JOIN NOW */}
          <div className={styles.bottomFooter}>
            <button
              type="button"
              className={styles.joinNowBtn}
              onClick={onAllowAndContinue}
            >
              JOIN NOW
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssessmentAccessModal;
