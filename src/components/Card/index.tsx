import React from "react";
import styles from "./Card.module.css";

function Card() {
  return (
    <article className={styles.card}>
      <img
        src="https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
        alt="Chrysler Crossfire"
        width="100"
        height="84"
        className={styles.image}
      />
      <div>
        <h2 className={styles.heading}>Chrysler Crossfire</h2>
        <p className={styles.description}>Stock # 61184</p>
        <a href="/car-61184">View details</a>
      </div>
    </article>
  );
}

export { Card };
