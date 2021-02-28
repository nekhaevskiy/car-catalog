import React from "react";
import { Car } from "../../api";
import styles from "./Card.module.css";

interface Props {
  car: Car;
}

function Card({
  car: {
    stockNumber,
    manufacturerName,
    modelName,
    mileage,
    fuelType,
    color,
    pictureUrl
  },
  ...rest
}: Props) {
  const carName = `${manufacturerName} ${modelName}`;
  return (
    <article className={styles.card} {...rest}>
      <img
        src={pictureUrl}
        alt={carName}
        width="100"
        height="84"
        className={styles.image}
      />
      <div>
        <h2 className={styles.heading}>{carName}</h2>
        <ul className={styles.description}>
          <li>Stock # {stockNumber}</li>
          <li className={styles.mileage}>
            {mileage.number.toLocaleString("de-DE")} {mileage.unit}
          </li>
          <li>{fuelType}</li>
          <li className={styles.color}>{color}</li>
        </ul>
        {/* TODO: Make the URL unique */}
        <a href="/car-61184">View details</a>
      </div>
    </article>
  );
}

export { Card };
