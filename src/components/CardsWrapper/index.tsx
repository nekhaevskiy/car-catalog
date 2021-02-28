import React from "react";
import { Catalog } from "../../api";
import { Card } from "../Card";
import { LoadingCard } from "../LoadingCard";
import styles from "./CardsWrapper.module.css";

type State = "pending" | "resolved" | "rejected";

interface Props {
  state: State;
  catalog?: Catalog;
}

function CardsWrapper({ state, catalog, ...rest }: Props) {
  switch (state) {
    case "pending":
      const loadingCars = new Array(10).fill(undefined);
      return (
        <div {...rest}>
          <h1 className={styles.heading}>Available cars</h1>
          <p className={styles.status}>Loading...</p>

          {loadingCars.map((car, index) => (
            <div className={styles.card} key={index}>
              <LoadingCard data-testid="LoadingCard" />
            </div>
          ))}
        </div>
      );
    case "resolved":
      if (!catalog) {
        throw new Error(
          'catalog is undefined but state is "resolved" in the CardsWrapper component'
        );
      }
      const { cars, totalCarsCount } = catalog;
      return (
        <div {...rest}>
          <h1 className={styles.heading}>Available cars</h1>
          <p className={styles.status}>
            Showing {cars.length} of {totalCarsCount} results
          </p>

          {cars.map((car) => (
            <div className={styles.card} key={car.stockNumber}>
              <Card car={car} data-testid="Card" />
            </div>
          ))}
        </div>
      );
    case "rejected":
      return (
        <div role="alert" {...rest}>
          <h1>
            Something very bad has happened. Please reload the page to try
            again.
          </h1>
        </div>
      );
    default:
      throw new Error("Unhandled state in the Catalog component");
  }
}

export { CardsWrapper };
export type { State };
