import styles from './Hamburger.module.css';

export default function Hamburger() {
  return (
    <label className={styles.Hamburger} htmlFor="HBCheck">
      <input type="checkbox" id="HBCheck" />
      <span />
      <span />
      <span />
    </label>
  );
}
