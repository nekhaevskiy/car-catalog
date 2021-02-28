import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CardsWrapper } from ".";
import { testDataCarsPage1 } from "../../api/__testData__/cars";

test('renders "pending" state', () => {
  const { getByText, getAllByTestId } = render(
    <MemoryRouter>
      <CardsWrapper state="pending" />
    </MemoryRouter>
  );

  expect(getByText(/available cars/i)).toBeVisible();
  expect(getByText(/loading/i)).toBeVisible();
  expect(getAllByTestId("LoadingCard")).toHaveLength(10);
});

test('renders "resolved" state', () => {
  const { cars, totalCarsCount } = testDataCarsPage1;
  const { getByText, getAllByTestId } = render(
    <MemoryRouter>
      <CardsWrapper state="resolved" catalog={testDataCarsPage1} />
    </MemoryRouter>
  );

  expect(getByText(/available cars/i)).toBeVisible();
  expect(
    getByText(`Showing ${cars.length} of ${totalCarsCount} results`)
  ).toBeVisible();
  expect(getAllByTestId("Card")).toHaveLength(10);
});

test('renders "rejected" state', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <CardsWrapper state="rejected" />
    </MemoryRouter>
  );

  expect(getByRole("alert")).toBeVisible();
});
