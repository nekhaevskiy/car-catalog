import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from ".";
import { apiUrl } from "../../api";
import {
  testDataAudiRed,
  testDataCarsPage1,
  testDataCarsPage2
} from "../../api/__testData__/cars";
import { testDataColors } from "../../api/__testData__/colors";
import { testDataManufacturers } from "../../api/__testData__/manufacturers";
import { server } from "../../mocks/server";

test("renders the first page of the catalog in the happy case", async () => {
  const { cars, totalCarsCount, totalPageCount } = testDataCarsPage1;
  const { getByText, queryByText, getAllByTestId } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  expect(getByText(/loading.../i)).toBeVisible();
  expect(getByText(/filter/i)).toBeDisabled();

  await waitFor(() =>
    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  );

  expect(getByText(/filter/i)).not.toBeDisabled();
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
    `/cars/${stockNumber}`
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
  const { getByTestId, getByText, queryByText, getByRole } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  expect(getByTestId("Filter")).toBeVisible();
  expect(getByText(/loading.../i)).toBeVisible();

  await waitFor(() =>
    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  );

  expect(getByRole("alert")).toBeVisible();
});

test("renders the second page of the catalog if the Next button is clicked", async () => {
  const { cars, totalCarsCount, totalPageCount } = testDataCarsPage2;
  const { getByText, queryByText, getAllByTestId } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

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
    `/cars/${stockNumber}`
  );

  expect(getAllByTestId("Card")).toHaveLength(cars.length);
  expect(getByText("First")).toBeVisible();
  expect(getByText("Previous")).toBeVisible();
  expect(getByText(`Page 2 of ${totalPageCount}`)).toBeVisible();
  expect(queryByText("Next")).not.toBeInTheDocument();
  expect(queryByText("Last")).not.toBeInTheDocument();
});

test("all cars with the first color and the first manufacturer can be rendered from Page 2", async () => {
  const { colors } = testDataColors;
  const manufacturers = testDataManufacturers.manufacturers.map(
    (manufacturer) => manufacturer.name
  );
  const { getByText, queryByText, getByTestId } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  await waitFor(() => expect(getByText("Next")).toBeVisible());

  userEvent.click(getByText("Next"));

  expect(getByText(/loading.../i)).toBeVisible();

  await waitFor(() =>
    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  );

  const secondPageText = `Page 2 of ${testDataCarsPage2.totalPageCount}`;
  expect(getByText(secondPageText)).toBeVisible();

  const colorWrapper = getByTestId("select-color");
  await waitFor(() =>
    expect(within(colorWrapper).getByRole("button")).not.toHaveAttribute(
      "aria-disabled"
    )
  );

  userEvent.click(getByText(/all car colors/i));
  userEvent.click(getByText(colors[0]));

  const manufacturerWrapper = getByTestId("select-manufacturer");
  await waitFor(() =>
    expect(within(manufacturerWrapper).getByRole("button")).not.toHaveAttribute(
      "aria-disabled"
    )
  );

  userEvent.click(getByText(/all manufacturers/i));
  userEvent.click(getByText(manufacturers[0]));
  userEvent.click(getByText(/filter/i));

  expect(getByText(/loading.../i)).toBeVisible();

  await waitFor(() =>
    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  );

  expect(within(colorWrapper).getByText(colors[0])).toBeVisible();
  expect(within(manufacturerWrapper).getByText(manufacturers[0])).toBeVisible();

  const { cars, totalCarsCount, totalPageCount } = testDataAudiRed;

  const resultsText = `Showing ${cars.length} of ${totalCarsCount} results`;
  expect(getByText(resultsText)).toBeVisible();

  const pageText = `Page 1 of ${totalPageCount}`;
  expect(getByText(pageText)).toBeVisible();
});
