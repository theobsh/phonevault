import React from 'react';
import styles from './TestButton.module.css';
import { useNavigate } from 'react-router-dom';

function TestButton() {
  const nav = useNavigate();

  const handleClick = () => {
    if (location.pathname.startsWith('/simulation')) {
      nav('/');
    } else {
      nav('/simulation');
    }
  };

  return (
    <button className={styles.testButton} onClick={handleClick}>
      TEST
    </button>
  );
}

export default TestButton;