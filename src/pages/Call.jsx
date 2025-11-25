import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Call.module.css';

const Call = () => {
  const navigate = useNavigate();
  const [callerName, setCallerName] = useState('');
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Get caller name from localStorage
    const name = localStorage.getItem('callerName') || '알 수 없음';
    setCallerName(name);

    // Start call duration timer
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEndCall = () => {
    localStorage.removeItem('callerName');
    navigate('/menu');
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <>
      <div className={styles.callBody}>
        <div className={styles.callContainer}>
          <div className={styles.callerInfo}>
            <div className={styles.callerAvatar}>📞</div>
            <h1 className={styles.callerName}>{callerName}</h1>
            <p className={styles.callDuration}>{formatDuration(callDuration)}</p>
          </div>
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.callButton} ${styles.endButton}`}
              onClick={handleEndCall}
            >
              <span className={styles.buttonIcon}>✕</span>
              <span className={styles.buttonLabel}>종료</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Call;