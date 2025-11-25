import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './SettingDetails.module.css';

const SettingDetails = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // States for different settings
  const [volume, setVolume] = useState(70);
  const [alarmSound, setAlarmSound] = useState('모닝콜');
  const [lightColor, setLightColor] = useState('#00ff00');
  const [brightness, setBrightness] = useState(80);
  const [blinkInterval, setBlinkInterval] = useState(1000);
  const [notifications, setNotifications] = useState({
    kakao: true,
    message: true,
    email: false,
    instagram: true,
    facebook: false,
    twitter: true,
  });

  const alarmSounds = [
    '모닝콜',
    '새소리',
    '클래식벨',
    '디지털알람',
    '바다소리',
    '재즈멜로디'
  ];

  const connectedDevices = [
    { name: '장건우의 iPhone', connected: true, emoji: '📱' },
    { name: '똘똘이의 S25', connected: false, emoji: '📱' }
  ];

  const handleBack = () => {
    navigate('/settings');
  };

  const handleNotificationToggle = (app) => {
    setNotifications(prev => ({
      ...prev,
      [app]: !prev[app]
    }));
  };

  const renderConnectionSettings = () => (
    <div className={styles.settingSection}>
      <h2 className={styles.sectionTitle}>연결된 디바이스</h2>
      <div className={styles.deviceList}>
        {connectedDevices.map((device, index) => (
          <div key={index} className={styles.deviceItem}>
            <span className={styles.deviceEmoji}>{device.emoji}</span>
            <span className={styles.deviceName}>{device.name}</span>
            <span className={`${styles.deviceStatus} ${device.connected ? styles.connected : styles.disconnected}`}>
              {device.connected ? '연결됨' : '연결 안됨'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSoundSettings = () => (
    <div className={styles.settingSection}>
      <h2 className={styles.sectionTitle}>알람 소리</h2>
      <div className={styles.dropdownContainer}>
        <select 
          value={alarmSound} 
          onChange={(e) => setAlarmSound(e.target.value)}
          className={styles.dropdown}
        >
          {alarmSounds.map((sound, index) => (
            <option key={index} value={sound}>{sound}</option>
          ))}
        </select>
      </div>

      <h2 className={styles.sectionTitle}>음량</h2>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className={styles.slider}
        />
        <span className={styles.sliderValue}>{volume}%</span>
      </div>
    </div>
  );

  const renderLightSettings = () => (
    <div className={styles.settingSection}>
      <h2 className={styles.sectionTitle}>조명 색상</h2>
      <div className={styles.colorContainer}>
        <input
          type="color"
          value={lightColor}
          onChange={(e) => setLightColor(e.target.value)}
          className={styles.colorPicker}
        />
        <span className={styles.colorValue}>{lightColor}</span>
      </div>

      <h2 className={styles.sectionTitle}>밝기</h2>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(e.target.value)}
          className={styles.slider}
        />
        <span className={styles.sliderValue}>{brightness}%</span>
      </div>

      <h2 className={styles.sectionTitle}>깜빡임 주기</h2>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="500"
          max="3000"
          step="100"
          value={blinkInterval}
          onChange={(e) => setBlinkInterval(e.target.value)}
          className={styles.slider}
        />
        <span className={styles.sliderValue}>{blinkInterval}ms</span>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className={styles.settingSection}>
      <h2 className={styles.sectionTitle}>앱 알림 설정</h2>
      <div className={styles.notificationList}>
        {Object.entries(notifications).map(([app, enabled]) => (
          <div key={app} className={styles.notificationItem}>
            <span className={styles.appName}>
              {app === 'kakao' && '카카오톡'}
              {app === 'message' && '메시지'}
              {app === 'email' && '이메일'}
              {app === 'instagram' && '인스타그램'}
              {app === 'facebook' && '페이스북'}
              {app === 'twitter' && '트위터'}
            </span>
            <button
              onClick={() => handleNotificationToggle(app)}
              className={`${styles.toggle} ${enabled ? styles.toggleOn : styles.toggleOff}`}
            >
              <div className={styles.toggleSlider}></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(category) {
      case '연결':
        return renderConnectionSettings();
      case '소리':
        return renderSoundSettings();
      case '조명':
        return renderLightSettings();
      case '알림':
        return renderNotificationSettings();
      default:
        return <div>설정을 선택해주세요.</div>;
    }
  };

  return (
    <div className={styles.detailsBody}>
      <div className={styles.detailsContainer}>
        <div className={styles.header}>
          <button onClick={handleBack} className={styles.backButton}>
            ← 뒤로
          </button>
          <h1 className={styles.title}>{category}</h1>
        </div>
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingDetails;