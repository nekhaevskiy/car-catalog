import { render } from "@testing-library/react";
import { Catalog } from ".";

test("renders catalog", () => {
  const { getByText } = render(<Catalog />);

  expect(getByText(/available cars/i)).toBeVisible();
  expect(getByText(/showing 10 of 100 results/i)).toBeVisible();
});
