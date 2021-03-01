import React from "react";
import { useParams } from "react-router-dom";
import { api, apiUrl, Car, CarItem } from "../../api";
import { LoadingCard } from "../../components/LoadingCard";
import styles from "./styles.module.css";

type State = "pending" | "resolved" | "rejected by server" | "rejected";

function CarPage() {
  let { carId } = useParams<{ carId: string }>();
  const [state, setState] = React.useState<State>("pending");
  const [car, setCar] = React.useState<CarItem>();
  React.useEffect(() => {
    api<Car>(`${apiUrl.cars}/${carId}`)
      .then((data) => {
        setCar(data.car);
        setState("resolved");
      })
      .catch((error) => {
        setState("rejected");
        // TODO: add state "rejected by server"
      });
  }, [carId]);

  switch (state) {
    case "pending":
      return (
        <>
          <div className={styles.imageWrapper} />
          <div className={styles.container}>
            <h1 className={styles.heading}>
              Loading car with stock # {carId} ...
            </h1>
            <LoadingCard data-testid="LoadingCard" />
          </div>
        </>
      );
    case "resolved":
      if (!car) {
        throw new Error('car is undefined but state is "resolved" in CarPage');
      }
      const {
        stockNumber,
        manufacturerName,
        modelName,
        mileage,
        fuelType,
        color,
        pictureUrl
      } = car;
      const carName = `${manufacturerName} ${modelName}`;
      return (
        <article>
          <div className={styles.imageWrapper}>
            <img src={pictureUrl} alt={carName} />
          </div>
          <div className={styles.container}>
            <h1 className={styles.heading}>{carName}</h1>
            <ul className={styles.specs}>
              <li>Stock # {stockNumber}</li>
              <li className={styles.mileage}>
                {mileage.number.toLocaleString("de-DE")} {mileage.unit}
              </li>
              <li>{fuelType}</li>
              <li className={styles.color}>{color}</li>
            </ul>
            <p className={styles.description}>
              This car is currently available and can be delivered as soon as
              tomorrow morning. Please be aware that delivery times shown in
              this page are not definitive and may change due to bad weather
              conditions.
            </p>
          </div>
        </article>
      );
    case "rejected":
      return (
        <div className={styles.container} role="alert">
          <h1 className={styles.heading}>Something very bad has happened.</h1>
          <p className={styles.specs}>Please reload the page to try again.</p>
        </div>
      );
    default:
      throw new Error(`Unhandled state "${state}" in CarPage`);
  }
}

export { CarPage };
