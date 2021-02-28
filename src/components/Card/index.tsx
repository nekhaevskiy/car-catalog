import React from "react";
import { Link } from "react-router-dom";
import { Car } from "../../api";
import styles from "./styles.module.css";

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
  const carUrl = `/cars/${stockNumber}`;
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
        <Link to={carUrl}>View details</Link>
      </div>
    </article>
  );
}

export { Card };
