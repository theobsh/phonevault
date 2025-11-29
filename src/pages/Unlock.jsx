import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Unlock.module.css';
import { startUnlockSession } from '../utils/vaultStorage';

const Unlock = () => {
  const navigate = useNavigate();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    if (isProcessing) return;
    navigate('/menu');
  };

  const confirmUnlock = (minutes) => {
    if (isProcessing) return;
    startUnlockSession(minutes);
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleTimeSelect = (minutes) => {
    confirmUnlock(minutes);
  };

  const handleCustomInput = () => {
    setShowCustomInput(true);
  };

  const handleCustomConfirm = () => {
    const minutes = parseInt(customTime, 10);
    setErrorMessage('');

    if (Number.isNaN(minutes) || minutes <= 0) {
      setErrorMessage('시간을 입력해주세요.');
      return;
    }

    if (minutes > 60) {
      setErrorMessage('최대 60분까지 설정할 수 있습니다.');
      return;
    }

    confirmUnlock(minutes);
  };

  return (
    <>
      <div className={styles.unlockBody}>
        <div className={styles.unlockContainer}>
          <div className={styles.header}>
            <button onClick={handleBack} className={styles.backButton}>
              ← 뒤로
            </button>
            <h1 className={styles.title}>꺼내기</h1>
          </div>

          {!isProcessing ? (
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
              {!showCustomInput ? (
                <button
                  className={styles.customButton}
                  onClick={handleCustomInput}
                >
                  직접 입력
                </button>
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
            <div className={styles.processingContainer}>
              <h1 className={styles.processingTitle}>디바이스를 꺼냅니다</h1>
              <div className={styles.spinner}></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Unlock;
