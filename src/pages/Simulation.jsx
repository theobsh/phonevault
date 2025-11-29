import React from 'react';
import styles from './Simulation.module.css';
import { useNavigate } from 'react-router-dom';
import {
  resetVaultStorage,
  getUsageSettings,
  getUnlockSession,
  forceSessionRemainingSeconds
} from '../utils/vaultStorage';

function Simulation() {
  const nav = useNavigate();

  const handleOutingStart = () => {
    nav('/outing');
  };

  const handleOutingEnd = () => {
    nav('/');
  };

  const handleResetStorage = () => {
    resetVaultStorage();
    alert('로컬 스토리지가 초기화되었습니다.');
  };

  const handleSet10SecondsRemaining = () => {
    const settings = getUsageSettings();
    const session = getUnlockSession();
    
    if (settings.usageMode === '자율모드' && session) {
      const success = forceSessionRemainingSeconds(10);
      if (success) {
        alert('TEST : 꺼내기 만료 10초 전으로 설정되었습니다.');
      } else {
        alert('꺼내기 세션이 없습니다.');
      }
    } else if (settings.usageMode !== '자율모드') {
      alert('자율 모드에서만 사용 가능합니다.');
    } else {
      alert('꺼내기 세션이 없습니다.');
    }
  };

  return (
    <>
      <div className={styles.simulationBody}>
        <div className={styles.simulationContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>시뮬레이션</h1>
          </div>
          <div className={styles.simulationContent}>
            <button className={styles.simButton} onClick={handleOutingStart}>
              TEST : 외출 모드 시작
            </button>
            <button className={styles.simButton} onClick={handleOutingEnd}>
              TEST : 외출 모드 종료
            </button>
            <button className={styles.simButton} onClick={handleResetStorage}>
              TEST : 로컬 스토리지 초기화
            </button>
            <button className={styles.simButton} onClick={handleSet10SecondsRemaining}>
              TEST : 꺼내기 만료 10초 전
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Simulation;