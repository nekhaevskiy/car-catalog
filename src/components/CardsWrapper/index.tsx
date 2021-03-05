import React from "react";
import { Catalog } from "../../api";
import { Card } from "../Card";
import styles from "./styles.module.css";

interface Props {
  catalog: Catalog;
}

function CardsWrapper({ catalog }: Props) {
  const { cars, totalCarsCount } = catalog;
  return (
    <>
      <h1 className={styles.heading}>Available cars</h1>
      <p className={styles.status}>
        Showing {cars.length} of {totalCarsCount} results
      </p>

      {cars.map((car) => (
        <div className={styles.card} key={car.stockNumber}>
          <Card car={car} data-testid="Card" />
        </div>
      ))}
    </>
  );
}

export { CardsWrapper };
