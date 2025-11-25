import styles from './IncomingCall.module.css';

const IncomingCall = () => {
  const handleAccept = () => {
    console.log('Call accepted');
    // Future implementation: handle call acceptance
  };

  const handleDecline = () => {
    console.log('Call declined');
    // Future implementation: handle call decline
  };

  return (
    <>
      <div className={styles.callBody}>
        <div className={styles.callContainer}>
          <div className={styles.callerInfo}>
            <div className={styles.callerAvatar}>📞</div>
            <h1 className={styles.callerName}>엄마</h1>
            <p className={styles.callStatus}>전화 걸어오는 중...</p>
          </div>
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.callButton} ${styles.declineButton}`}
              onClick={handleDecline}
            >
              <span className={styles.buttonIcon}>✕</span>
              <span className={styles.buttonLabel}>거절</span>
            </button>
            <button 
              className={`${styles.callButton} ${styles.acceptButton}`}
              onClick={handleAccept}
            >
              <span className={styles.buttonIcon}>✓</span>
              <span className={styles.buttonLabel}>수락</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncomingCall;