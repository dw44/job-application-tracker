/* eslint-disable no-console */
import styles from './AuthButton.module.css';

function AuthButton({ label }) {
  return (
    <button onClick={() => console.log('Boink!')} className={styles.AuthButton} type="button">
      {label}
    </button>
  );
}

export default AuthButton;
