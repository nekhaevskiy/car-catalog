import React from "react";
import { useParams } from "react-router-dom";
import { api, apiUrl, Car, CarItem } from "../../api";
import { Fallback } from "../../components/Fallback";
import { LoadingCard } from "../../components/LoadingCard";
import { NotFound } from "../../components/NotFound";
import styles from "./styles.module.css";

type State = "pending" | "resolved" | "not found" | "rejected";

const LOCAL_STORAGE_KEY = "favorites";

function CarPage() {
  let { carId } = useParams<{ carId: string }>();
  const [state, setState] = React.useState<State>("pending");
  const [car, setCar] = React.useState<CarItem>();
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    const valueInLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage);
    }
    return [];
  });
  React.useEffect(() => {
    api<Car>(`${apiUrl.cars}/${carId}`)
      .then((data) => {
        setCar(data.car);
        setState("resolved");
      })
      .catch((error) => {
        if (error.message === "Not Found") {
          setState("not found");
        } else {
          setState("rejected");
        }
      });
  }, [carId]);

  const isFavorite = favorites.includes(carId);

  function saveToFavorites() {
    const newFavorites = [...favorites, carId];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }

  function removeFromFavorites() {
    const newFavorites = favorites.filter((item) => item !== carId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }

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
            <div className={styles.columns}>
              <div className={styles.detailsWrapper}>
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
                  This car is currently available and can be delivered as soon
                  as tomorrow morning. Please be aware that delivery times shown
                  in this page are not definitive and may change due to bad
                  weather conditions.
                </p>
              </div>
              {isFavorite ? (
                <aside className={styles.favorites}>
                  <p className={styles.favoritesText}>
                    If you don't like this car anymore, click the button to
                    remove it from your collection of favorite items.
                  </p>
                  <div className={styles.favoritesButton}>
                    <button type="button" onClick={removeFromFavorites}>
                      Remove
                    </button>
                  </div>
                </aside>
              ) : (
                <aside className={styles.favorites}>
                  <p className={styles.favoritesText}>
                    If you like this car, click the button and save it in your
                    collection of favorite items.
                  </p>
                  <div className={styles.favoritesButton}>
                    <button type="button" onClick={saveToFavorites}>
                      Save
                    </button>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </article>
      );
    case "not found":
      return <NotFound />;
    case "rejected":
      return <Fallback />;
    default:
      throw new Error(`Unhandled state "${state}" in CarPage`);
  }
}

export { CarPage };
