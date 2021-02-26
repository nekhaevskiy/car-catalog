import { render, waitFor, within } from "@testing-library/react";
import { Catalog } from ".";
import { testDataCatalog } from "../../__testData__/Catalog";

test("renders catalog", async () => {
  const {
    getByLabelText,
    queryByLabelText,
    getByText,
    getAllByTestId
  } = render(<Catalog />);
  const { cars, totalCarsCount } = testDataCatalog;

  expect(getByLabelText(/loading/i)).toBeVisible();

  await waitFor(() =>
    expect(queryByLabelText(/loading/i)).not.toBeInTheDocument()
  );

  expect(getByText(/available cars/i)).toBeVisible();
  expect(getByText(`Showing 10 of ${totalCarsCount} results`)).toBeVisible();

  const firstCard = getAllByTestId("Card")[0];
  expect(
    within(firstCard).getByText(`Stock # ${cars[0].stockNumber}`)
  ).toBeVisible();
  expect(getAllByTestId("Card")).toHaveLength(10);
});
