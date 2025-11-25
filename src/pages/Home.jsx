import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleClick = () => {
    navigate('/menu');
  };

  return (
    <>
      <div className={styles.homeBody} onClick={handleClick}>
        <div className={styles.logo}>PHONE VAULT</div>
        <div className={styles.clock}>{formatTime(time)}</div>
      </div>
    </>
  );
}

export default Home;