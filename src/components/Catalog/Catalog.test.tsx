import { render, waitFor } from "@testing-library/react";
import { Catalog } from ".";
import { testDataCatalog } from "./Catalog.testData";

test("renders catalog", async () => {
  const {
    getByLabelText,
    queryByLabelText,
    getByText,
    getAllByTestId
  } = render(<Catalog />);
  const { totalCarsCount } = testDataCatalog;

  expect(getByLabelText(/loading/i)).toBeVisible();

  await waitFor(() =>
    expect(queryByLabelText(/loading/i)).not.toBeInTheDocument()
  );

  expect(getByText(/available cars/i)).toBeVisible();
  expect(getByText(`Showing 10 of ${totalCarsCount} results`)).toBeVisible();
  expect(getAllByTestId("Card")).toHaveLength(10);
});
