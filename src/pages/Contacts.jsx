import { useNavigate } from 'react-router-dom';
import styles from './Contacts.module.css';

const Contacts = () => {
  const navigate = useNavigate();
  const contacts = ['엄마', '아빠', '동생', '여자친구'];

  const handleCall = (contact) => {
    // Save caller name to localStorage
    localStorage.setItem('callerName', contact);
    // Navigate to outgoing call screen
    navigate('/outgoing-call');
  };

  const handleBack = () => {
    navigate('/menu');
  };

  return (
    <>
      <div className={styles.contactsBody}>
        <div className={styles.contactsContainer}>
          <div className={styles.header}>
            <button onClick={handleBack} className={styles.backButton}>
              ← 뒤로
            </button>
            <h1 className={styles.title}>연락처</h1>
          </div>
          <div className={styles.contactsList}>
            {contacts.map((contact, index) => (
              <button
                key={index}
                className={styles.contactButton}
                onClick={() => handleCall(contact)}
              >
                {contact}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacts;