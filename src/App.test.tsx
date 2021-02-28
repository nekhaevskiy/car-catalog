import { render } from "@testing-library/react";
import App from "./App";

test("renders static components", () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId("Header")).toBeVisible();
  expect(getByTestId("Filter")).toBeVisible();
  expect(getByTestId("CardsWrapper")).toBeVisible();
  expect(getByTestId("Footer")).toBeVisible();
});

test.todo("click on the logo will redirect to the homepage");
