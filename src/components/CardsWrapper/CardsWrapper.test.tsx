import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CardsWrapper } from ".";
import { testDataCatalogPage1, testDataCatalogPage2 } from "../../testData";

test('renders "pending" state', () => {
  const { getByText, getAllByTestId } = render(
    <CardsWrapper state="pending" />
  );

  expect(getByText(/available cars/i)).toBeVisible();
  expect(getByText(/loading/i)).toBeVisible();
  expect(getAllByTestId("LoadingCard")).toHaveLength(10);
});

test('renders "resolved" state', () => {
  const { cars, totalCarsCount } = testDataCatalogPage1;
  const { getByText, getAllByTestId } = render(
    <CardsWrapper state="resolved" catalog={testDataCatalogPage1} />
  );

  expect(getByText(/available cars/i)).toBeVisible();
  expect(
    getByText(`Showing ${cars.length} of ${totalCarsCount} results`)
  ).toBeVisible();
  expect(getAllByTestId("Card")).toHaveLength(10);
});

test('renders "rejected" state', () => {
  const { getByRole } = render(<CardsWrapper state="rejected" />);

  expect(getByRole("alert")).toBeVisible();
});

test.skip("renders the second page if Next button is clicked", async () => {
  const { getByText, queryByText, getAllByTestId } = render(
    <CardsWrapper state="pending" />
  );

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
