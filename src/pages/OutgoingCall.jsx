import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OutgoingCall.module.css';

const OutgoingCall = () => {
  const navigate = useNavigate();
  const [callerName, setCallerName] = useState('');
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Get caller name from localStorage
    const name = localStorage.getItem('callerName') || '알 수 없음';
    setCallerName(name);

    // Start countdown timer
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Auto navigate to Call page after 4 seconds
    const autoNavigate = setTimeout(() => {
      navigate('/call');
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(autoNavigate);
    };
  }, [navigate]);

  const handleEndCall = () => {
    localStorage.removeItem('callerName');
    navigate('/menu');
  };

  return (
    <>
      <div className={styles.callBody}>
        <div className={styles.callContainer}>
          <div className={styles.callerInfo}>
            <div className={styles.callerAvatar}>📞</div>
            <h1 className={styles.callerName}>{callerName}</h1>
            <p className={styles.callStatus}>연결 중...</p>
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

export default OutgoingCall;