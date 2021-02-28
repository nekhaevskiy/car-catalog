import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "./logo.png";

function Header({ ...rest }) {
  return (
    <header className={styles.wrapper} {...rest}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Unnamed Company" width="100" height="37" />
        </Link>
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
