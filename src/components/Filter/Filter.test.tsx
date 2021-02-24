import { render, waitFor, within } from "@testing-library/react";
import React from "react";
import { Filter, initialFilter } from ".";
import userEvent from "@testing-library/user-event";

const onFilterChange = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test("selects are disabled if no colors and no manufacturers are passed", () => {
  const { getByTestId, getByText, getAllByText } = render(
    <Filter onFilterChange={onFilterChange} />
  );

  expect(getAllByText(/color/i)[0]).toBeVisible();
  expect(getByText(/all car colors/i)).toBeVisible();

  const colorWrapper = getByTestId("select-color");
  expect(within(colorWrapper).getByRole("button")).toHaveAttribute(
    "aria-disabled",
    "true"
  );

  expect(getAllByText(/manufacturer/i)[0]).toBeVisible();
  expect(getByText(/all manufacturers/i)).toBeVisible();

  const manufacturerWrapper = getByTestId("select-manufacturer");
  expect(within(manufacturerWrapper).getByRole("button")).toHaveAttribute(
    "aria-disabled",
    "true"
  );

  userEvent.click(getByText(/filter/i));

  expect(onFilterChange).toHaveBeenCalledWith({
    color: initialFilter.color,
    manufacturer: initialFilter.manufacturer
  });
  expect(onFilterChange).toHaveBeenCalledTimes(1);
});

test("color can be changed", async () => {
  const testColors = ["blue", "black", "white"];
  const { getByText, queryByText } = render(
    <Filter onFilterChange={onFilterChange} colors={testColors} />
  );

  expect(queryByText(/black/i)).not.toBeInTheDocument();
  expect(queryByText(/white/i)).not.toBeInTheDocument();

  userEvent.click(getByText(/all car colors/i));
  userEvent.click(getByText(/black/i));

  await waitFor(() =>
    expect(queryByText(/all car colors/i)).not.toBeInTheDocument()
  );
  expect(getByText(/black/i)).toBeVisible();
  expect(queryByText(/white/i)).not.toBeInTheDocument();

  userEvent.click(getByText(/filter/i));

  expect(onFilterChange).toHaveBeenCalledWith({
    color: "black",
    manufacturer: initialFilter.manufacturer
  });
  expect(onFilterChange).toHaveBeenCalledTimes(1);
});

test("manufacturer can be changed", async () => {
  const testManufacturers = ["bmw", "mercedes", "chrysler"];
  const { getByText, queryByText } = render(
    <Filter onFilterChange={onFilterChange} manufacturers={testManufacturers} />
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

  userEvent.click(getByText(/filter/i));

  expect(onFilterChange).toHaveBeenCalledWith({
    color: initialFilter.color,
    manufacturer: "bmw"
  });
  expect(onFilterChange).toHaveBeenCalledTimes(1);
});
