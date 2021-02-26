import { render } from "@testing-library/react";
import React from "react";
import { Car, Card } from ".";

const mockedCar: Car = {
  stockNumber: 10105,
  manufacturerName: "Porsche",
  modelName: "Cayman",
  color: "black",
  mileage: {
    number: 146615,
    unit: "km"
  },
  fuelType: "Petrol",
  pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
};

test("renders Card", () => {
  const { getByText, getByAltText } = render(<Card car={mockedCar} />);
  const {
    stockNumber,
    manufacturerName,
    modelName,
    color,
    mileage,
    fuelType,
    pictureUrl
  } = mockedCar;
  const carName = `${manufacturerName} ${modelName}`;

  expect(getByAltText(carName)).toHaveAttribute("src", pictureUrl);
  expect(getByText(`Stock # ${stockNumber}`)).toBeVisible();
  expect(getByText(carName)).toBeVisible();
  expect(getByText(color)).toBeVisible();
  expect(
    getByText(`${mileage.number.toLocaleString("de-DE")} ${mileage.unit}`)
  ).toBeVisible();
  expect(getByText(fuelType)).toBeVisible();
  expect(getByText(/view details/i)).toHaveAttribute("href", "/car-61184");
});
