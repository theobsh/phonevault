const STORAGE_KEYS = {
  usageMode: 'usageMode',
  fixedTimeHours: 'fixedTimeHours',
  autonomousUsageMinutes: 'autonomousUsageMinutes',
  autonomousWaitMinutes: 'autonomousWaitMinutes',
  vaultState: 'vaultState',
  unlockSession: 'vaultUnlockSession',
  dailyUsage: 'vaultDailyUsage',
};

const DEFAULT_SETTINGS = {
  usageMode: '고정시간모드',
  fixedTimeHours: 3,
  autonomousUsageMinutes: 60,
  autonomousWaitMinutes: 30,
};

export const DEFAULT_USAGE_SETTINGS = Object.freeze({ ...DEFAULT_SETTINGS });

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

const todayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;
};

const parseNumber = (value, fallback) => {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const getUsageSettings = () => {
  if (!isBrowser()) return { ...DEFAULT_SETTINGS };

  return {
    usageMode: localStorage.getItem(STORAGE_KEYS.usageMode) || DEFAULT_SETTINGS.usageMode,
    fixedTimeHours: parseNumber(
      localStorage.getItem(STORAGE_KEYS.fixedTimeHours),
      DEFAULT_SETTINGS.fixedTimeHours
    ),
    autonomousUsageMinutes: parseNumber(
      localStorage.getItem(STORAGE_KEYS.autonomousUsageMinutes),
      DEFAULT_SETTINGS.autonomousUsageMinutes
    ),
    autonomousWaitMinutes: parseNumber(
      localStorage.getItem(STORAGE_KEYS.autonomousWaitMinutes),
      DEFAULT_SETTINGS.autonomousWaitMinutes
    ),
  };
};

export const saveUsageSettings = (updates = {}) => {
  if (!isBrowser()) return;

  const current = getUsageSettings();
  const next = { ...current, ...updates };

  localStorage.setItem(STORAGE_KEYS.usageMode, next.usageMode);
  localStorage.setItem(STORAGE_KEYS.fixedTimeHours, String(next.fixedTimeHours));
  localStorage.setItem(STORAGE_KEYS.autonomousUsageMinutes, String(next.autonomousUsageMinutes));
  localStorage.setItem(STORAGE_KEYS.autonomousWaitMinutes, String(next.autonomousWaitMinutes));

  return next;
};

export const getVaultState = () => {
  if (!isBrowser()) return 'stored';
  return localStorage.getItem(STORAGE_KEYS.vaultState) || 'stored';
};

export const setVaultState = (state) => {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.vaultState, state);
};

export const getUnlockSession = () => {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.unlockSession);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(STORAGE_KEYS.unlockSession);
    return null;
  }
};

const persistSession = (session) => {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.unlockSession, JSON.stringify(session));
};

export const resetVaultStorage = () => {
  if (!isBrowser()) return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};

export const startUnlockSession = (durationMinutes) => {
  if (!isBrowser()) return null;
  const durationSeconds = Math.max(Number(durationMinutes) || 0, 1) * 60;
  return startUnlockSessionWithSeconds(durationSeconds);
};

export const startUnlockSessionWithSeconds = (durationSeconds) => {
  if (!isBrowser()) return null;
  const safeDuration = Math.max(1, Math.round(durationSeconds));
  const startedAt = Date.now();
  const expiresAt = startedAt + safeDuration * 1000;
  const session = { startedAt, durationSeconds: safeDuration, expiresAt };
  persistSession(session);
  setVaultState('taken-out');
  return session;
};

export const clearUnlockSession = () => {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.unlockSession);
};

const getDailyUsageRecord = () => {
  if (!isBrowser()) return { date: todayKey(), usedSeconds: 0 };
  const today = todayKey();
  const raw = localStorage.getItem(STORAGE_KEYS.dailyUsage);
  if (!raw) return { date: today, usedSeconds: 0 };
  try {
    const parsed = JSON.parse(raw);
    if (parsed.date !== today) {
      const fresh = { date: today, usedSeconds: 0 };
      localStorage.setItem(STORAGE_KEYS.dailyUsage, JSON.stringify(fresh));
      return fresh;
    }
    return parsed;
  } catch {
    const fresh = { date: today, usedSeconds: 0 };
    localStorage.setItem(STORAGE_KEYS.dailyUsage, JSON.stringify(fresh));
    return fresh;
  }
};

const saveDailyUsageRecord = (record) => {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.dailyUsage, JSON.stringify(record));
};

export const addUsageSeconds = (seconds = 0) => {
  if (!isBrowser()) return;
  const record = getDailyUsageRecord();
  const safeSeconds = Math.max(0, Math.round(seconds));
  record.usedSeconds = Math.max(0, Math.round(record.usedSeconds) + safeSeconds);
  saveDailyUsageRecord(record);
  return record;
};

export const getRemainingDailySeconds = (limitHours) => {
  const record = getDailyUsageRecord();
  const limitSeconds = Math.max(Number(limitHours) || 0, 0) * 3600;
  return Math.max(0, Math.floor(limitSeconds - record.usedSeconds));
};

export const calculateSessionUsageSeconds = (session, endTimestamp = Date.now()) => {
  if (!session) return 0;
  const elapsed = Math.max(0, (endTimestamp - session.startedAt) / 1000);
  return Math.min(elapsed, session.durationSeconds);
};

export const completeSessionAndStore = () => {
  if (!isBrowser()) return;
  const session = getUnlockSession();
  const usedSeconds = calculateSessionUsageSeconds(session);
  addUsageSeconds(usedSeconds);
  clearUnlockSession();
  setVaultState('stored');
  return usedSeconds;
};

export const getDailyUsageRecordSafe = () => getDailyUsageRecord();

export const STORAGE_KEY_MAP = STORAGE_KEYS;

export const getSessionRemainingSeconds = (session = getUnlockSession(), now = Date.now()) => {
  if (!session) return 0;
  return Math.max(0, Math.floor((session.expiresAt - now) / 1000));
};

export const getActiveSessionElapsedSeconds = (session = getUnlockSession(), now = Date.now()) => {
  if (!session) return 0;
  return Math.floor(calculateSessionUsageSeconds(session, now));
};

export const getEffectiveDailyRemainingSeconds = (limitHours) => {
  const baseRemaining = getRemainingDailySeconds(limitHours);
  const elapsed = getActiveSessionElapsedSeconds();
  return Math.max(0, baseRemaining - elapsed);
};

export const forceSessionRemainingSeconds = (remainingSeconds = 10) => {
  if (!isBrowser()) return false;
  const session = getUnlockSession();
  if (!session) return false;

  const safeRemaining = Math.max(1, Math.round(remainingSeconds));
  const now = Date.now();
  const elapsedSeconds = Math.max(0, Math.floor((now - session.startedAt) / 1000));

  const updatedSession = {
    ...session,
    durationSeconds: elapsedSeconds + safeRemaining,
    expiresAt: now + safeRemaining * 1000,
  };

  persistSession(updatedSession);
  return true;
};
