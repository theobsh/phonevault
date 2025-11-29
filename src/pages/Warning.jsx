import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Warning.module.css';
import { getUnlockSession, completeSessionAndStore } from '../utils/vaultStorage';

const Warning = () => {
  const navigate = useNavigate();
  const [overtimeSeconds, setOvertimeSeconds] = useState(0);
  const [isStoring, setIsStoring] = useState(false);
  const [storeConfirmed, setStoreConfirmed] = useState(false);

  useEffect(() => {
    const ensureSession = () => {
      const session = getUnlockSession();
      if (!session) {
        navigate('/');
        return null;
      }
      return session;
    };

    let session = ensureSession();
    if (!session) return;

    const updateTimer = () => {
      session = getUnlockSession();
      if (!session) {
        setOvertimeSeconds(0);
        return;
      }
      const now = Date.now();
      const overtime = Math.max(0, Math.floor((now - session.expiresAt) / 1000));
      setOvertimeSeconds(overtime);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [navigate]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  const handleStore = () => {
    if (isStoring || storeConfirmed) return;
    setIsStoring(true);

    setTimeout(() => {
      completeSessionAndStore();
      setIsStoring(false);
      setStoreConfirmed(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 3000);
  };

  return (
    <div className={styles.warningBody}>
      <div className={styles.warningContainer}>
        <div className={styles.warningTitle}>WARNING</div>
        <div className={styles.warningMessage}>
          꺼내기 시간이 초과되었습니다. 즉시 기기를 보관해주세요.
        </div>
        <div className={styles.overtimeLabel}>초과 시간</div>
        <div className={styles.overtimeTimer}>{formatTime(overtimeSeconds)}</div>
        <button className={styles.storeButton} onClick={handleStore} disabled={isStoring || storeConfirmed}>
          {isStoring ? '보관 확인 중...' : storeConfirmed ? '보관 완료' : '지금 보관하기'}
        </button>
        {isStoring && <div className={styles.storeStatus}>보관을 확인하고 있습니다...</div>}
        {storeConfirmed && <div className={styles.storeStatusConfirmed}>보관 확인 됨</div>}
      </div>
    </div>
  );
};

export default Warning;
