import React from "react";
import { carsUrl } from "../../api";
import { Car, Card } from "../Card";
import { Loading } from "../Loading";
import styles from "./Catalog.module.css";

interface CatalogData {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
}

type State = "pending" | "resolved" | "rejected";

function Catalog({ ...rest }) {
  const [state, setState] = React.useState<State>("pending");
  const [data, setData] = React.useState<CatalogData>();
  React.useEffect(() => {
    window
      .fetch(carsUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setState("resolved");
      })
      .catch((error) => {
        setState("rejected");
      });
  }, []);

  switch (state) {
    case "pending":
      return <Loading {...rest} />;
    case "resolved":
      return (
        <div {...rest}>
          <h1 className={styles.heading}>Available cars</h1>
          <p className={styles.status}>
            Showing 10 of {data?.totalCarsCount} results
          </p>

          {data?.cars.map((car) => (
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

export { Catalog };
export type { CatalogData };
