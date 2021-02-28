import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Card } from ".";
import { Car } from "../../api";

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
  const { getByText, getByAltText } = render(
    <MemoryRouter>
      <Card car={mockedCar} />
    </MemoryRouter>
  );
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
  expect(getByText(/view details/i)).toHaveAttribute(
    "href",
    `/cars/${stockNumber}`
  );
});
