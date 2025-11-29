import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import {
  getUsageSettings,
  getVaultState,
  getUnlockSession,
  getEffectiveDailyRemainingSeconds,
  getSessionRemainingSeconds,
  completeSessionAndStore,
} from '../utils/vaultStorage';

const Home = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const initialSettings = getUsageSettings();
  const [usageSettings, setUsageSettings] = useState(initialSettings);
  const [vaultState, setVaultStateState] = useState(getVaultState());
  const initialSession = getUnlockSession();
  const [sessionRemaining, setSessionRemaining] = useState(() =>
    initialSession ? getSessionRemainingSeconds(initialSession) : 0
  );
  const [dailyRemainingSeconds, setDailyRemainingSeconds] = useState(
    getEffectiveDailyRemainingSeconds(initialSettings.fixedTimeHours)
  );
  const [isStoringProcess, setIsStoringProcess] = useState(false);
  const [storeConfirmed, setStoreConfirmed] = useState(false);
  const isFixedMode = usageSettings.usageMode === '고정시간모드';

  const isTakenOut = vaultState === 'taken-out';
  const displayTakenOut = isTakenOut || isStoringProcess;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const syncFromStorage = () => {
      const settings = getUsageSettings();
      const session = getUnlockSession();
      setUsageSettings(settings);
      setVaultStateState(getVaultState());
      setDailyRemainingSeconds(getEffectiveDailyRemainingSeconds(settings.fixedTimeHours));
      setSessionRemaining(session ? getSessionRemainingSeconds(session) : 0);
    };

    syncFromStorage();
    const intervalId = setInterval(syncFromStorage, 1000);
    window.addEventListener('storage', syncFromStorage);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', syncFromStorage);
    };
  }, []);

  const formatClock = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDurationHMS = (seconds) => {
    const clamped = Math.max(0, seconds);
    const hours = Math.floor(clamped / 3600);
    const minutes = Math.floor((clamped % 3600) / 60);
    const secs = clamped % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleClick = () => {
    navigate('/menu');
  };

  const handleStore = (event) => {
    if (event) {
      event.stopPropagation();
    }
    if (isStoringProcess) return;
    setIsStoringProcess(true);
    setStoreConfirmed(false);
    completeSessionAndStore();

    setTimeout(() => {
      setStoreConfirmed(true);
      setTimeout(() => {
        setIsStoringProcess(false);
        setStoreConfirmed(false);
      }, 2000);
    }, 3000);
  };

  const diagramPercent =
    usageSettings.fixedTimeHours > 0
      ? (dailyRemainingSeconds / (usageSettings.fixedTimeHours * 3600)) * 100
      : 0;
  const safePercent = Math.max(0, Math.min(100, diagramPercent));

  const renderFixedMode = () => (
    <div className={styles.modeCard}>
      <div className={styles.modeHeader}>
        <span>고정시간 모드</span>
        <span className={styles.modeState}>{isTakenOut ? '사용 중' : '보관 중'}</span>
      </div>
      <div className={styles.usageRow}>
        <div
          className={styles.diagram}
          style={{
            background: `conic-gradient(#34c759 ${safePercent}%, #222 ${safePercent}% 100%)`,
          }}
        >
          <div className={styles.diagramInner}>
            <div className={styles.diagramLabel}>남은시간</div>
            <div className={styles.diagramValue}>{formatDurationHMS(dailyRemainingSeconds)}</div>
          </div>
        </div>
        <div className={styles.usageDetails}>
          <div className={styles.detailLabel}>오늘 남은 사용시간</div>
          <div className={styles.detailTime}>{formatDurationHMS(dailyRemainingSeconds)}</div>
          <div className={styles.detailSub}>총 {usageSettings.fixedTimeHours}시간 중</div>
        </div>
      </div>
    </div>
  );

  const renderAutonomousMode = () => (
    <div className={styles.modeCard}>
      <div className={styles.modeHeader}>
        <span>자율모드</span>
        {isTakenOut && <span className={styles.modeState}>사용 중</span>}
      </div>
      {isTakenOut ? (
        <div className={styles.autonomousInfo}>
          자율모드 | 반납까지 남은 시간 :
          <span className={styles.autonomousTimer}>{formatDurationHMS(sessionRemaining)}</span>
        </div>
      ) : (
        <div className={styles.autonomousStorageContainer}>
          <div className={styles.autonomousStorageIcon}>
            <div className={styles.autonomousStorageIconInner}></div>
          </div>
          <div className={styles.autonomousStorageInfo}>
            <div className={styles.autonomousStorageTitle}>자율모드 보관중</div>
            <div className={styles.autonomousStorageDetails}>
              회당 최대 {usageSettings.autonomousUsageMinutes}분 사용 · 대기 {usageSettings.autonomousWaitMinutes}분
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.homeBody} onClick={!isTakenOut ? handleClick : undefined}>
      <div className={styles.statusSection}>
        <div className={`${styles.statusPill} ${isTakenOut ? styles.unlocked : styles.stored}`}>
          {isTakenOut ? '꺼낸 상태' : '보관중'}
        </div>
        {!isTakenOut && (
          <div className={styles.clockBlock}>
            <div className={styles.clockLabel}>현재 시각</div>
            <div className={styles.clock}>{formatClock(time)}</div>
          </div>
        )}
      </div>

      {displayTakenOut && (
        <div className={styles.takenOutSection} onClick={(e) => e.stopPropagation()}>
          <div className={styles.storeSection}>
            {!isStoringProcess ? (
              <button className={styles.storeButton} onClick={handleStore}>
                보관하기
              </button>
            ) : (
              <div className={styles.storeStatusContainer}>
                {!storeConfirmed && <div className={styles.storeSpinner}></div>}
                <div className={styles.storeStatusText}>
                  {storeConfirmed ? '보관 확인 됨' : '보관 확인 중'}
                </div>
              </div>
            )}
          </div>

          <div className={styles.takenOutTimers}>
            {isFixedMode && (
              <div className={styles.timerCard}>
                <div className={styles.timerLabel}>오늘 남은 시간</div>
                <div className={styles.timerValue}>{formatDurationHMS(dailyRemainingSeconds)}</div>
              </div>
            )}
            <div className={styles.timerCard}>
              <div className={styles.timerLabel}>꺼내기 남은 시간</div>
              <div className={styles.timerValue}>{formatDurationHMS(sessionRemaining)}</div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.modeSection}>
        {usageSettings.usageMode === '고정시간모드' ? renderFixedMode() : renderAutonomousMode()}
      </div>
    </div>
  );
};

export default Home;
