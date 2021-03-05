import React from "react";
import { LoadingCard } from "../LoadingCard";
import styles from "./styles.module.css";

function HomeLoading() {
  const loadingCars = new Array(10).fill(undefined);
  return (
    <>
      <h1 className={styles.heading}>Available cars</h1>
      <p className={styles.status}>Loading...</p>

      {loadingCars.map((car, index) => (
        <div className={styles.card} key={index}>
          <LoadingCard data-testid="LoadingCard" />
        </div>
      ))}
    </>
  );
}

export { HomeLoading };
