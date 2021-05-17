import styles from './LandingPage.module.css';

import AuthButton from '../AuthButton/AuthButton';
import Hamburger from '../Hamburger/Hamburger';

export default function LandingPage() {
  return (
    <main className={styles.LandingPage}>
      <AuthButton label="Sign Up" />
      <section className={styles.LandingMain} />
    </main>

  );
}
