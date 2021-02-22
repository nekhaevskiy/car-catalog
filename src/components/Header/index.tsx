import React from "react";
import logo from "./logo.png";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <a href="/">
          <img src={logo} alt="Unnamed Company" width="314" height="64" />
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
