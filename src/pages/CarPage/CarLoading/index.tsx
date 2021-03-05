import React from "react";
import { LoadingCard } from "../../../components/LoadingCard";
import styles from "./styles.module.css";

interface Props {
  carId: string;
}

function CarLoading({ carId }: Props) {
  return (
    <>
      <div className={styles.imageLoading} />
      <div className={styles.container}>
        <h1 className={styles.heading}>Loading car with stock # {carId} ...</h1>
        <LoadingCard data-testid="LoadingCard" />
      </div>
    </>
  );
}

export { CarLoading };
