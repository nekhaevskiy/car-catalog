import { render, within } from "@testing-library/react";
import React from "react";
import { Filters } from ".";

test("colors select is disabled if no colors passed to Filters component", () => {
  const { getByTestId, getByText, getAllByText } = render(<Filters />);

  expect(getAllByText(/color/i)[0]).toBeVisible();
  expect(getByText(/all car colors/i)).toBeVisible();

  const { getByRole } = within(getByTestId("select-color"));
  expect(getByRole("button")).toHaveAttribute("aria-disabled", "true");
});

test("manufacturers select is disabled if no manufacturers passed to Filters component", () => {
  const { getByTestId, getByText, getAllByText } = render(<Filters />);

  expect(getAllByText(/manufacturer/i)[0]).toBeVisible();
  expect(getByText(/all manufacturers/i)).toBeVisible();

  const { getByRole } = within(getByTestId("select-manufacturer"));
  expect(getByRole("button")).toHaveAttribute("aria-disabled", "true");
});

test.todo("specific color can be selected");

test.todo("specific manufacturer can be selected");

test.todo("nothing happens if filters are disabled and button is clicked");
