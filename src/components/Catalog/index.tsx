import React from "react";
import styles from "./Catalog.module.css";

function Catalog() {
  return (
    <>
      <h1 className={styles.heading}>Available cars</h1>
      <p className={styles.status}>Showing 10 of 100 results</p>
    </>
  );
}

export { Catalog };
