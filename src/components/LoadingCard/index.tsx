import styles from "./styles.module.css";

function LoadingCard({ ...rest }) {
  return (
    <div className={styles.loading} {...rest}>
      <div className={styles.left} />
      <div className={styles.right}>
        <div className={styles.first} />
        <div className={styles.second} />
        <div className={styles.third} />
      </div>
    </div>
  );
}

export { LoadingCard };
