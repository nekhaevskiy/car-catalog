import { render } from "@testing-library/react";
import { Footer } from ".";

test("renders Footer", () => {
  const { getByText } = render(<Footer />);

  expect(getByText(/© auto1 group/i)).toBeVisible();
});
