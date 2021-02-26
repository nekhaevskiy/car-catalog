import { render } from "@testing-library/react";
import { Catalog } from ".";
import { testDataCatalog } from "./Catalog.testData";

test("renders catalog", () => {
  const { getByText, getAllByTestId } = render(
    <Catalog data={testDataCatalog} />
  );
  const { totalCarsCount } = testDataCatalog;

  expect(getByText(/available cars/i)).toBeVisible();
  expect(getByText(`Showing 10 of ${totalCarsCount} results`)).toBeVisible();
  expect(getAllByTestId("Card")).toHaveLength(10);
});
