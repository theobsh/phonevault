import { useNavigate } from 'react-router-dom';
import styles from './SettingsMain.module.css';

const SettingsMain = () => {
  const navigate = useNavigate();
  
  // First row: 연결, 사용모드 설정
  // Second row: 소리, 조명, 알림
  const firstRowItems = ['사용모드 설정', '연결'];
  const secondRowItems = ['소리', '조명', '알림'];

  const handleSettingClick = (item) => {
    navigate(`/settings/${item}`);
  };

  const handleBack = () => {
    navigate('/menu');
  };

  return (
    <>
      <div className={styles.settingsBody}>
        <div className={styles.settingsContainer}>
          <div className={styles.header}>
            <button onClick={handleBack} className={styles.backButton}>
              ← 뒤로
            </button>
            <h1 className={styles.title}>설정</h1>
          </div>
          <div className={styles.settingsContent}>
            <div className={styles.firstRow}>
              {firstRowItems.map((item, index) => (
                <button
                  key={index}
                  className={styles.settingButton}
                  onClick={() => handleSettingClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className={styles.secondRow}>
              {secondRowItems.map((item, index) => (
                <button
                  key={index}
                  className={styles.settingButton}
                  onClick={() => handleSettingClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsMain;