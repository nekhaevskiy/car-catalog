import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Header } from ".";

test("renders logo and menu items", () => {
  const { getAllByRole, getByAltText, getByText } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  expect(getAllByRole("link")[0]).toHaveAttribute("href", "/");
  expect(getByAltText(/unnamed company/i)).toBeVisible();
  expect(getByText(/purchase/i)).toBeVisible();
  expect(getByText(/purchase/i)).toHaveAttribute("href", "/purchase");
  expect(getByText(/my orders/i)).toBeVisible();
  expect(getByText(/my orders/i)).toHaveAttribute("href", "/my-orders");
  expect(getByText(/sell/i)).toBeVisible();
  expect(getByText(/sell/i)).toHaveAttribute("href", "/sell");
});
