import { render } from "@testing-library/react";
import { Fallback } from ".";

test("renders the component", () => {
  const { getByRole, getByText } = render(<Fallback />);

  expect(getByRole("alert")).toBeVisible();
  expect(getByText(/something very bad/i)).toBeVisible();
  expect(getByText(/please reload/i)).toBeVisible();
});
