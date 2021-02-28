import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { Catalog } from ".";
import { carsUrl } from "../../api";
import { server } from "../../mocks/server";
import {
  testDataCatalogPage1,
  testDataCatalogPage2
} from "../../__testData__/Catalog";

test("renders the first page of the catalog", async () => {
  const { getByText, queryByText, getAllByTestId } = render(<Catalog />);
  const { cars, totalCarsCount, totalPageCount } = testDataCatalogPage1;

  expect(getByText(/loading/i)).toBeVisible();
  expect(getAllByTestId("LoadingCard")).toHaveLength(10);

  await waitFor(() => expect(queryByText(/loading/i)).not.toBeInTheDocument());

  expect(getByText(/available cars/i)).toBeVisible();
  expect(
    getByText(`Showing ${cars.length} of ${totalCarsCount} results`)
  ).toBeVisible();

  const firstCard = getAllByTestId("Card")[0];
  expect(
    within(firstCard).getByText(`Stock # ${cars[0].stockNumber}`)
  ).toBeVisible();
  expect(getAllByTestId("Card")).toHaveLength(10);
  expect(getByText(`Page 1 of ${totalPageCount}`)).toBeVisible();
});

test("renders error message if network error is happened", async () => {
  server.use(
    rest.get(carsUrl, (req, res, ctx) => {
      return res.networkError("Failed to connect");
    })
  );
  const { getByText, queryByText, getByRole } = render(<Catalog />);

  expect(getByText(/loading/i)).toBeVisible();

  await waitFor(() => expect(queryByText(/loading/i)).not.toBeInTheDocument());

  expect(getByRole("alert")).toBeVisible();
});

test("renders the second page if Next button is clicked", async () => {
  const { getByText, queryByText, getAllByTestId } = render(<Catalog />);

  await waitFor(() => expect(queryByText(/loading/i)).not.toBeInTheDocument());

  userEvent.click(getByText(/next/i));

  expect(getByText(/loading/i)).toBeVisible();

  await waitFor(() => expect(queryByText(/loading/i)).not.toBeInTheDocument());

  const { cars, totalCarsCount, totalPageCount } = testDataCatalogPage2;

  expect(getByText(/available cars/i)).toBeVisible();
  expect(
    getByText(`Showing ${cars.length} of ${totalCarsCount} results`)
  ).toBeVisible();

  const firstCard = getAllByTestId("Card")[0];
  expect(
    within(firstCard).getByText(`Stock # ${cars[0].stockNumber}`)
  ).toBeVisible();
  expect(getAllByTestId("Card")).toHaveLength(cars.length);
  expect(getByText(`Page 2 of ${totalPageCount}`)).toBeVisible();
});
