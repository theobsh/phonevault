import { useNavigate } from 'react-router-dom';
import styles from './MainMenu.module.css';

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.menuBody}>
        <div className={styles.menuContainer}>
          <button 
            className={styles.menuButton}
            onClick={() => navigate('/contacts')}
          >
            전화
          </button>
          <button 
            className={styles.menuButton}
            onClick={() => navigate('/settings')}
          >
            설정
          </button>
          <button 
            className={styles.menuButton}
            onClick={() => navigate('/unlock')}
          >
            꺼내기
          </button>
        </div>
      </div>
    </>
  );
}

export default MainMenu;