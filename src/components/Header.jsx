import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import homeIcon from '../assets/home.png';

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <button 
        className={styles.homeButton}
        onClick={handleHomeClick}
        aria-label="Home"
      >
        <img 
          src={homeIcon} 
          alt="Home" 
          className={styles.homeIcon}
        />
      </button>
    </div>
  );
};

export default Header;