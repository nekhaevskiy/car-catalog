import { render } from "@testing-library/react";
import App from "./App";

test("renders static components", () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId("Header")).toBeVisible();
  expect(getByTestId("Filter")).toBeVisible();
  expect(getByTestId("Footer")).toBeVisible();
});
