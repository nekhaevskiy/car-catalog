import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from ".";

test("renders the page", () => {
  const { getByAltText, getByText, getAllByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  expect(getByAltText(/unnamed company/i)).toBeVisible();
  expect(getByText(/404 - not found/i)).toBeVisible();
  expect(getByText(/sorry, the page/i)).toBeVisible();
  expect(getByText(/you can always/i)).toBeVisible();

  const linksToHome = getAllByRole("link");
  linksToHome.forEach((link) => {
    expect(link).toHaveAttribute("href", "/");
  });
});
