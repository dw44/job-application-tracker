import styles from './LandingPage.module.css';

import AuthButton from '../AuthButton/AuthButton';
import Hamburger from '../Hamburger/Hamburger';
import logo from '../../assets/images/logo.svg';

export default function LandingPage() {
  return (
    <main className={styles.LandingPage}>
      <header className={styles.Header}>
        <a href="/" className={styles.Logo}>
          <img className={styles.LogoImage} src={logo} alt="Job Application Tracker" />
        </a>
        <nav className={styles.Navigation}>
          <Hamburger />
          <div className={styles.AuthButtonContainer}>
            <AuthButton label="Sign In" />
            <AuthButton label="Sign Up" />
          </div>
        </nav>
      </header>
      <section className={styles.LandingMain} />
    </main>
  );
}
