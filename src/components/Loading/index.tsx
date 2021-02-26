import styles from "./Loading.module.css";

function Loading({ ...rest }) {
  return (
    <div className={styles.loading} aria-label="loading" {...rest}>
      <div className={styles.left} />
      <div className={styles.right}>
        <div className={styles.first} />
        <div className={styles.second} />
        <div className={styles.third} />
      </div>
    </div>
  );
}

export { Loading };
