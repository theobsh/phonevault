import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './SettingDetails.module.css';
import { getUsageSettings, saveUsageSettings } from '../utils/vaultStorage';

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

  const initialSettings = getUsageSettings();
  // States for usage mode settings
  const [usageMode, setUsageMode] = useState(initialSettings.usageMode); // '고정시간모드' or '자율모드'
  const [fixedTimeHours, setFixedTimeHours] = useState(initialSettings.fixedTimeHours); // 0-12 hours
  const [autonomousUsageMinutes, setAutonomousUsageMinutes] = useState(initialSettings.autonomousUsageMinutes); // 30-120 minutes
  const [autonomousWaitMinutes, setAutonomousWaitMinutes] = useState(initialSettings.autonomousWaitMinutes); // 20-120 minutes
  const [saveMessage, setSaveMessage] = useState('');

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

  const handleModeToggle = () => {
    setUsageMode(prev => {
      const next = prev === '고정시간모드' ? '자율모드' : '고정시간모드';
      
      // When switching from fixed time mode to autonomous mode, clear fixed time data
      if (prev === '고정시간모드' && next === '자율모드') {
        saveUsageSettings({
          usageMode: next,
          fixedTimeHours: 0  // Clear fixed time data
        });
        setFixedTimeHours(0);
      }
      // When switching from autonomous mode to fixed time mode, reset to default values
      else if (prev === '자율모드' && next === '고정시간모드') {
        const defaultFixedTime = 3; // Default value from DEFAULT_SETTINGS
        saveUsageSettings({
          usageMode: next,
          fixedTimeHours: defaultFixedTime
        });
        setFixedTimeHours(defaultFixedTime);
        
        // Initialize local storage remaining time when switching to fixed time mode
        // This ensures the daily remaining time is properly set to the full fixed time hours
        const today = new Date();
        const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        localStorage.setItem('vaultDailyUsage', JSON.stringify({
          date: todayKey,
          usedSeconds: 0
        }));
      } else {
        saveUsageSettings({ usageMode: next });
      }
      
      return next;
    });
  };

  const handleSave = () => {
    saveUsageSettings({
      usageMode,
      fixedTimeHours,
      autonomousUsageMinutes,
      autonomousWaitMinutes
    });
    
    setSaveMessage('설정이 저장되었습니다. 24시간 후에 적용됩니다.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const validateFixedTimeHours = (value) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 0 || num > 12) {
      return false;
    }
    return true;
  };

  const validateAutonomousUsageMinutes = (value) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 30 || num > 120) {
      return false;
    }
    return true;
  };

  const validateAutonomousWaitMinutes = (value) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 20 || num > 120) {
      return false;
    }
    return true;
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

  const renderUsageModeSettings = () => (
    <div className={styles.settingSection}>
      <div className={styles.infoBox}>
        모드 변경은 24시간 후에 적용됩니다.
      </div>
      
      <div className={styles.modeToggle} onClick={handleModeToggle}>
        <div className={`${styles.toggleOption} ${usageMode === '고정시간모드' ? styles.active : ''}`}>
          고정시간모드
        </div>
        <div className={`${styles.toggleOption} ${usageMode === '자율모드' ? styles.active : ''}`}>
          자율모드
        </div>
      </div>
      
      <div className={styles.modeDescription}>
        {usageMode === '고정시간모드'
          ? "일별 핸드폰 사용가능 총 시간 지정"
          : "총 사용시간 설정 없이 회당 사용시간 제한"
        }
      </div>
      
      {saveMessage && (
        <div className={styles.saveMessage}>
          {saveMessage}
        </div>
      )}
      
      {usageMode === '고정시간모드' ? (
        <div className={styles.fixedTimeMode}>
          <div className={styles.settingTitle}>하루 총 사용시간 변경하기 (0시간 - 12시간)</div>
          <div className={styles.settingNote}>시간 변경 후 24시간 후에 반영됩니다</div>
          <div className={styles.timeInputSection}>
            <div className={styles.inputGroup}>
              <span>시간:</span>
              <input
                type="number"
                min="0"
                max="12"
                value={fixedTimeHours}
                onChange={(e) => {
                  if (validateFixedTimeHours(e.target.value)) {
                    const nextValue = parseInt(e.target.value);
                    setFixedTimeHours(nextValue);
                  }
                }}
                className={styles.timeInput}
              />
              <span>시간</span>
            </div>
            <button
              onClick={handleSave}
              className={styles.saveButton}
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.autonomousMode}>
          <div className={styles.settingNote}>시간 변경 후 24시간 후에 반영됩니다</div>
          
          <div className={styles.settingGroup}>
            <div className={styles.settingTitle}>한번 꺼냈을 때 최대 시간 (30분 - 120분)</div>
            <div className={styles.timeInputSection}>
              <div className={styles.inputGroup}>
                <input
                  type="number"
                  min="30"
                  max="120"
                  value={autonomousUsageMinutes}
                  onChange={(e) => {
                    if (validateAutonomousUsageMinutes(e.target.value)) {
                      const nextValue = parseInt(e.target.value);
                      setAutonomousUsageMinutes(nextValue);
                    }
                  }}
                  className={styles.timeInput}
                />
                <span>분</span>
              </div>
              <button
                onClick={handleSave}
                className={styles.saveButton}
              >
                저장
              </button>
            </div>
          </div>
          
          <div className={styles.settingGroup}>
            <div className={styles.settingTitle}>재사용까지 대기 시간 (20분 - 120분)</div>
            <div className={styles.timeInputSection}>
              <div className={styles.inputGroup}>
                <input
                  type="number"
                  min="20"
                  max="120"
                  value={autonomousWaitMinutes}
                  onChange={(e) => {
                    if (validateAutonomousWaitMinutes(e.target.value)) {
                      const nextValue = parseInt(e.target.value);
                      setAutonomousWaitMinutes(nextValue);
                    }
                  }}
                  className={styles.timeInput}
                />
                <span>분</span>
              </div>
              <button
                onClick={handleSave}
                className={styles.saveButton}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
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
      case '사용모드 설정':
        return renderUsageModeSettings();
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
