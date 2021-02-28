import { render } from "@testing-library/react";
import { CardsWrapper } from ".";
import { testDataCarsPage1 } from "../../api/__testData__/cars";

test('renders "pending" state', () => {
  const { getByText, getAllByTestId } = render(
    <CardsWrapper state="pending" />
  );

  expect(getByText(/available cars/i)).toBeVisible();
  expect(getByText(/loading/i)).toBeVisible();
  expect(getAllByTestId("LoadingCard")).toHaveLength(10);
});

test('renders "resolved" state', () => {
  const { cars, totalCarsCount } = testDataCarsPage1;
  const { getByText, getAllByTestId } = render(
    <CardsWrapper state="resolved" catalog={testDataCarsPage1} />
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
