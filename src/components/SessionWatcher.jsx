import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUnlockSession } from '../utils/vaultStorage';

const SessionWatcher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const checkSession = () => {
      const session = getUnlockSession();
      const now = Date.now();

      if (session && now > session.expiresAt) {
        if (location.pathname !== '/warning') {
          navigate('/warning', { replace: true });
        }
        return;
      }

      if ((!session || now <= (session?.expiresAt || 0)) && location.pathname === '/warning') {
        navigate('/', { replace: true });
      }
    };

    checkSession();
    const intervalId = setInterval(checkSession, 1000);
    window.addEventListener('storage', checkSession);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', checkSession);
    };
  }, [location.pathname, navigate]);

  return null;
};

export default SessionWatcher;
