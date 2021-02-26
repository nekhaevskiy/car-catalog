import React from "react";
import logo from "./logo.png";
import styles from "./Header.module.css";

function Header({ ...rest }) {
  return (
    <header className={styles.wrapper} {...rest}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <img src={logo} alt="Unnamed Company" width="100" height="37" />
        </a>
        <nav>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <a href="/purchase">Purchase</a>
            </li>
            <li className={styles.menuItem}>
              <a href="/my-orders">My Orders</a>
            </li>
            <li className={styles.menuItem}>
              <a href="/sell">Sell</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export { Header };
