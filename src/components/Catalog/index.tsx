import React from "react";
import { Car, Card } from "../Card";
import styles from "./Catalog.module.css";

interface CatalogData {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
}

interface Props {
  data: CatalogData;
}

function Catalog({ data: { cars, totalCarsCount } }: Props) {
  return (
    <>
      <h1 className={styles.heading}>Available cars</h1>
      <p className={styles.status}>Showing 10 of {totalCarsCount} results</p>

      {cars.map((car) => (
        <div className={styles.card} key={car.stockNumber}>
          <Card car={car} />
        </div>
      ))}
    </>
  );
}

export { Catalog };
export type { CatalogData };
