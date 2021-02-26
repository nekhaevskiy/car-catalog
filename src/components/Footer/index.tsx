import React from "react";
import styles from "./Footer.module.css";

function Footer({ ...rest }) {
  return (
    <footer className={styles.copyText} {...rest}>
      &copy; AUTO1 Group 2018
    </footer>
  );
}

export { Footer };
