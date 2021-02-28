import React from "react";
import { carsUrl } from "../../api";
import { Car, Card } from "../Card";
import { LoadingCard } from "../LoadingCard";
import { Pagination } from "../Pagination";
import styles from "./CardsWrapper.module.css";

interface CardsWrapperData {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
}

type State = "pending" | "resolved" | "rejected";

function Catalog({ ...rest }) {
  const [state, setState] = React.useState<State>("pending");
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState<CardsWrapperData>();
  React.useEffect(() => {
    window
      .fetch(`${carsUrl}?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setState("resolved");
      })
      .catch(() => {
        setState("rejected");
      });
  }, [page]);

  function onPageChange(newPage: number) {
    setState("pending");
    setPage(newPage);
  }

  switch (state) {
    case "pending":
      const loadingCars = new Array(10).fill(undefined);
      return (
        <div {...rest}>
          <h1 className={styles.heading}>Available cars</h1>
          <p className={styles.status}>Loading</p>

          {loadingCars.map((car, index) => (
            <div className={styles.card} key={index}>
              <LoadingCard data-testid="LoadingCard" />
            </div>
          ))}
        </div>
      );
    case "resolved":
      if (!data) {
        throw new Error(
          'data is undefined but state is "resolved" in the Catalog component'
        );
      }
      const { totalCarsCount, cars, totalPageCount } = data;
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

          <Pagination
            current={page}
            total={totalPageCount}
            onPageChange={onPageChange}
          />
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

export { Catalog };
export type { CardsWrapperData };
