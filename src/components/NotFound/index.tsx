import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import styles from "./styles.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <article>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Unnamed Company" width="180" height="37" />
        </Link>
        <h1 className={styles.heading}>404 - Not Found</h1>
        <p className={styles.text}>
          Sorry, the page you are looking for does not exist.
        </p>
        <p className={styles.text}>
          You can always go back to the <Link to="/">homepage</Link>.
        </p>
      </article>
    </div>
  );
}

export { NotFound };
