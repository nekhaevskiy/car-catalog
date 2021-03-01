import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import styles from "./styles.module.css";

function Header({ ...rest }) {
  return (
    <header className={styles.wrapper} {...rest}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Unnamed Company" width="180" height="37" />
        </Link>
        <nav>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Link to="/purchase">Purchase</Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/my-orders">My Orders</Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/sell">Sell</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export { Header };
