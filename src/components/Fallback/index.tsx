import styles from "./styles.module.css";

function Fallback() {
  return (
    <div className={styles.container} role="alert">
      <h1 className={styles.heading}>Something very bad has happened.</h1>
      <p className={styles.subheading}>Please reload the page to try again.</p>
    </div>
  );
}

export { Fallback };
