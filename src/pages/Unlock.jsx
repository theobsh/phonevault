import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Unlock.module.css';

const Unlock = () => {
  const navigate = useNavigate();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (countdown !== null && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown, remainingTime]);

  const handleTimeSelect = (timeInMinutes) => {
    setCountdown(timeInMinutes);
    setRemainingTime(timeInMinutes * 60);
  };

  const handleCustomInput = () => {
    setShowCustomInput(true);
  };

  const handleCustomConfirm = () => {
    const minutes = parseInt(customTime);
    setErrorMessage('');
    
    if (!isNaN(minutes) && minutes > 0) {
      if (minutes > 60) {
        setErrorMessage('최대 60분까지 설정할 수 있습니다.');
        return;
      }
      setCountdown(minutes);
      setRemainingTime(minutes * 60);
      setShowCustomInput(false);
      setCustomTime('');
    }
  };

  const formatCountdown = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  const handleBack = () => {
    navigate('/menu');
  };

  return (
    <>
      <div className={styles.unlockBody}>
        <div className={styles.unlockContainer}>
          {countdown === null ? (
            <>
              <div className={styles.header}>
                <button onClick={handleBack} className={styles.backButton}>
                  ← 뒤로
                </button>
                <h1 className={styles.title}>꺼내기</h1>
              </div>
              {!showCustomInput ? (
                <>
                  <div className={styles.circleButtonsContainer}>
                    <button
                      className={styles.circleButton}
                      onClick={() => handleTimeSelect(5)}
                    >
                      5분
                    </button>
                    <button
                      className={styles.circleButton}
                      onClick={() => handleTimeSelect(30)}
                    >
                      30분
                    </button>
                    <button
                      className={styles.circleButton}
                      onClick={() => handleTimeSelect(60)}
                    >
                      1시간
                    </button>
                  </div>
                  <button
                    className={styles.customButton}
                    onClick={handleCustomInput}
                  >
                    직접 입력
                  </button>
                </>
              ) : (
                <div className={styles.customInputContainer}>
                  <input
                    type="number"
                    className={styles.timeInput}
                    placeholder="시간 입력 (분)"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    min="1"
                    max="60"
                  />
                  {errorMessage && (
                    <div className={styles.errorMessage}>{errorMessage}</div>
                  )}
                  <button
                    className={styles.confirmButton}
                    onClick={handleCustomConfirm}
                  >
                    확인
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.countdownContainer}>
              <h1 className={styles.countdownTitle}>디바이스를 꺼냅니다</h1>
              <div className={styles.countdownTimer}>{formatCountdown(remainingTime)}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Unlock;