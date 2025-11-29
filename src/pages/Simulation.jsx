import React from 'react';
import styles from './Simulation.module.css';
import { useNavigate } from 'react-router-dom';

function Simulation() {
  const nav = useNavigate();

  const handleOutingStart = () => {
    nav('/outing');
  };

  const handleOutingEnd = () => {
    nav('/');
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Simulation;