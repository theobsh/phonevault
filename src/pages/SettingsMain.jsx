import { useNavigate } from 'react-router-dom';
import styles from './SettingsMain.module.css';

const SettingsMain = () => {
  const navigate = useNavigate();
  const settingsItems = ['연결', '소리', '조명', '알림'];

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
            {settingsItems.map((item, index) => (
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
    </>
  );
}

export default SettingsMain;