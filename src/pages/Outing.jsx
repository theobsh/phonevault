import React from 'react';
import styles from './Outing.module.css';
import TestButton from '../components/TestButton.jsx';

const Outing = () => {
  return (
    <>
      <div className={styles.outingBody}>
        <div className={styles.outingContainer}>
          <div className={styles.outingIcon}>
            <div className={styles.door}></div>
            <div className={styles.person}></div>
          </div>
          <div className={styles.outingText}>외출 모드 활성화 중</div>
          <div className={styles.outingSubtext}>현재 집을 비우고 있습니다</div>
          <div className={styles.statusIndicator}>
            <div className={styles.statusDot}></div>
            <span>AWAY</span>
          </div>
        </div>
      </div>
      <TestButton />
    </>
  );
}

export default Outing;