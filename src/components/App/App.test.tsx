import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import React from "react";
import App from ".";
import { apiUrl } from "../../api";
import {
  testDataCarsPage1,
  testDataCarsPage2
} from "../../api/__testData__/cars";
import { server } from "../../mocks/server";

test("renders the first page of the catalog in the happy case", async () => {
  const { cars, totalCarsCount, totalPageCount } = testDataCarsPage1;
  const { getByTestId, getByText, queryByText, getAllByTestId } = render(
    <App />
  );

  expect(getByTestId("Header")).toBeVisible();
  expect(getByTestId("Filter")).toBeVisible();
  expect(getByTestId("Footer")).toBeVisible();
  expect(getByText(/loading.../i)).toBeVisible();

  await waitFor(() =>
    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  );

  expect(
    getByText(`Showing ${cars.length} of ${totalCarsCount} results`)
  ).toBeVisible();

  const firstCard = getAllByTestId("Card")[0];
  const {
    manufacturerName,
    modelName,
    pictureUrl,
    stockNumber,
    color,
    mileage,
    fuelType
  } = cars[0];
  const carName = `${manufacturerName} ${modelName}`;

  expect(within(firstCard).getByAltText(carName)).toHaveAttribute(
    "src",
    pictureUrl
  );
  expect(within(firstCard).getByText(`Stock # ${stockNumber}`)).toBeVisible();
  expect(within(firstCard).getByText(carName)).toBeVisible();
  expect(within(firstCard).getByText(color)).toBeVisible();
  expect(
    within(firstCard).getByText(
      `${mileage.number.toLocaleString("de-DE")} ${mileage.unit}`
    )
  ).toBeVisible();
  expect(within(firstCard).getByText(fuelType)).toBeVisible();
  expect(within(firstCard).getByText(/view details/i)).toHaveAttribute(
    "href",
    "/car-61184"
  );

  expect(getAllByTestId("Card")).toHaveLength(cars.length);
  expect(queryByText("First")).not.toBeInTheDocument();
  expect(queryByText("Previous")).not.toBeInTheDocument();
  expect(getByText(`Page 1 of ${totalPageCount}`)).toBeVisible();
  expect(getByText("Next")).toBeVisible();
  expect(getByText("Last")).toBeVisible();
});

test("renders the error alert in an error case", async () => {
  server.use(
    rest.get(apiUrl.cars, (req, res, ctx) => {
      return res.networkError("Failed to connect");
    })
  );
  server.use(
    rest.get(apiUrl.colors, (req, res, ctx) => {
      return res.networkError("Failed to connect");
    })
  );
  server.use(
    rest.get(apiUrl.manufacturers, (req, res, ctx) => {
      return res.networkError("Failed to connect");
    })
  );
  const { getByTestId, getByText, queryByText, getByRole } = render(<App />);

  expect(getByTestId("Header")).toBeVisible();
  expect(getByTestId("Filter")).toBeVisible();
  expect(getByTestId("Footer")).toBeVisible();
  expect(getByText(/loading.../i)).toBeVisible();

  await waitFor(() =>
    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  );

  expect(getByRole("alert")).toBeVisible();
});

test("renders the second page of the catalog if the Next button is clicked", async () => {
  const { cars, totalCarsCount, totalPageCount } = testDataCarsPage2;
  const { getByText, queryByText, getAllByTestId } = render(<App />);

  await waitFor(() => expect(getByText("Next")).toBeVisible());

  userEvent.click(getByText("Next"));

  expect(getByText(/loading.../i)).toBeVisible();

  await waitFor(() =>
    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  );

  expect(
    getByText(`Showing ${cars.length} of ${totalCarsCount} results`)
  ).toBeVisible();

  const firstCard = getAllByTestId("Card")[0];
  const {
    manufacturerName,
    modelName,
    pictureUrl,
    stockNumber,
    color,
    mileage,
    fuelType
  } = cars[0];
  const carName = `${manufacturerName} ${modelName}`;

  expect(within(firstCard).getByAltText(carName)).toHaveAttribute(
    "src",
    pictureUrl
  );
  expect(within(firstCard).getByText(`Stock # ${stockNumber}`)).toBeVisible();
  expect(within(firstCard).getByText(carName)).toBeVisible();
  expect(within(firstCard).getByText(color)).toBeVisible();
  expect(
    within(firstCard).getByText(
      `${mileage.number.toLocaleString("de-DE")} ${mileage.unit}`
    )
  ).toBeVisible();
  expect(within(firstCard).getByText(fuelType)).toBeVisible();
  expect(within(firstCard).getByText(/view details/i)).toHaveAttribute(
    "href",
    "/car-61184"
  );

  expect(getAllByTestId("Card")).toHaveLength(cars.length);
  expect(getByText("First")).toBeVisible();
  expect(getByText("Previous")).toBeVisible();
  expect(getByText(`Page 2 of ${totalPageCount}`)).toBeVisible();
  expect(queryByText("Next")).not.toBeInTheDocument();
  expect(queryByText("Last")).not.toBeInTheDocument();
});
