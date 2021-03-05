import { CarItem } from "../../../api";
import { Favorites } from "../../../components/Favorites";
import styles from "./styles.module.css";

interface Props {
  car: CarItem;
}

function CarResolved({ car }: Props) {
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
              This car is currently available and can be delivered as soon as
              tomorrow morning. Please be aware that delivery times shown in
              this page are not definitive and may change due to bad weather
              conditions.
            </p>
          </div>
          <div className={styles.favoritesWrapper}>
            <Favorites id={String(car.stockNumber)} />
          </div>
        </div>
      </div>
    </article>
  );
}

export { CarResolved };
