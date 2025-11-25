import { useState, useEffect } from 'react';
import styles from './IncomingAlarm.module.css';

const IncomingAlarm = () => {
  const [time, setTime] = useState(new Date());
  const [slidePosition, setSlidePosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const slider = e.currentTarget;
      const rect = slider.getBoundingClientRect();
      const newPosition = Math.max(0, Math.min(e.clientX - rect.left, rect.width - 80));
      setSlidePosition(newPosition);

      if (newPosition > rect.width - 100) {
        handleDismiss();
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (slidePosition < 200) {
      setSlidePosition(0);
    }
  };

  const handleDismiss = () => {
    console.log('Alarm dismissed');
    setIsDragging(false);
    // Future implementation: dismiss alarm and navigate
  };

  return (
    <>
      <div className={styles.alarmBody}>
        <div className={styles.alarmContainer}>
          <div className={styles.alarmClock}>{formatTime(time)}</div>
          <div className={styles.alarmLabel}>알람</div>
          <div 
            className={styles.sliderContainer}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className={styles.sliderTrack}>
              <span className={styles.sliderText}>밀어서 끄기</span>
              <div 
                className={styles.sliderButton}
                style={{ left: `${slidePosition}px` }}
                onMouseDown={handleMouseDown}
              >
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncomingAlarm;