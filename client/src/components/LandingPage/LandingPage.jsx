import styles from './LandingPage.module.css';

import AuthButton from '../AuthButton/AuthButton';
import Hamburger from '../Hamburger/Hamburger';

export default function LandingPage() {
  return (
    <main className={styles.LandingPage}>
      <header>
        <nav className={styles.Navigation}>
          <Hamburger />
          <div>
            <AuthButton label="Sign In" />
            <AuthButton label="Sign Up" />
          </div>
        </nav>
      </header>
      <section className={styles.LandingMain} />
    </main>

  );
}
