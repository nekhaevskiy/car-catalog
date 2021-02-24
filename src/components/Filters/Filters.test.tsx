import { render, waitFor, within } from "@testing-library/react";
import React from "react";
import { Filters } from ".";
import userEvent from "@testing-library/user-event";

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

test("specific color can be selected", async () => {
  const testColors = ["blue", "black", "white"];
  const { getByText, queryByText } = render(<Filters colors={testColors} />);

  expect(queryByText(/black/i)).not.toBeInTheDocument();
  expect(queryByText(/white/i)).not.toBeInTheDocument();

  userEvent.click(getByText(/all car colors/i));
  userEvent.click(getByText(/black/i));

  await waitFor(() =>
    expect(queryByText(/all car colors/i)).not.toBeInTheDocument()
  );
  expect(getByText(/black/i)).toBeVisible();
  expect(queryByText(/white/i)).not.toBeInTheDocument();
});

test("specific manufacturer can be selected", async () => {
  const testManufacturers = ["bmw", "mercedes", "chrysler"];
  const { getByText, queryByText } = render(
    <Filters manufacturers={testManufacturers} />
  );

  expect(queryByText(/bmw/i)).not.toBeInTheDocument();
  expect(queryByText(/mercedes/i)).not.toBeInTheDocument();

  userEvent.click(getByText(/all manufacturers/i));
  userEvent.click(getByText(/bmw/i));

  await waitFor(() =>
    expect(queryByText(/all manufacturers/i)).not.toBeInTheDocument()
  );
  expect(getByText(/bmw/i)).toBeVisible();
  expect(queryByText(/mercedes/i)).not.toBeInTheDocument();
});

test.todo("nothing happens if filters are disabled and button is clicked");
