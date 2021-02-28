import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Filter, initialFilter } from ".";
import { testDataColors } from "../../api/__testData__/colors";
import { testDataManufacturers } from "../../api/__testData__/manufacturers";

const onFilterChange = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test("renders initial state with disabled button", async () => {
  const { getByTestId, getByText, getAllByText } = render(
    <Filter
      filter={initialFilter}
      onFilterChange={onFilterChange}
      disabled={true}
    />
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

  expect(getByText(/filter/i)).toBeDisabled();
});

test("renders initial state with enabled button", async () => {
  const { getByTestId, getByText, getAllByText } = render(
    <Filter
      filter={initialFilter}
      onFilterChange={onFilterChange}
      disabled={false}
    />
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

  expect(getByText(/filter/i)).not.toBeDisabled();
});

test("onFilterChange is not called if filter is not changed", async () => {
  const { getByText } = render(
    <Filter
      filter={initialFilter}
      onFilterChange={onFilterChange}
      disabled={false}
    />
  );

  userEvent.click(getByText(/filter/i));

  expect(onFilterChange).not.toHaveBeenCalled();
});

test("color can be changed", async () => {
  const { colors } = testDataColors;
  const { getByTestId, getByText, queryByText } = render(
    <Filter
      filter={initialFilter}
      onFilterChange={onFilterChange}
      disabled={false}
    />
  );

  const colorWrapper = getByTestId("select-color");

  await waitFor(() =>
    expect(within(colorWrapper).getByRole("button")).not.toHaveAttribute(
      "aria-disabled"
    )
  );

  userEvent.click(getByText(/all car colors/i));

  colors.forEach((color) => {
    expect(getByText(color)).toBeVisible();
  });

  userEvent.click(getByText(colors[0]));

  await waitFor(() =>
    expect(queryByText(/all car colors/i)).not.toBeInTheDocument()
  );
  expect(getByText(colors[0])).toBeVisible();

  userEvent.click(getByText(/filter/i));

  expect(onFilterChange).toHaveBeenCalledWith({
    color: colors[0],
    manufacturer: initialFilter.manufacturer
  });
  expect(onFilterChange).toHaveBeenCalledTimes(1);
});

test("manufacturer can be changed", async () => {
  const manufacturers = testDataManufacturers.manufacturers.map(
    (manufacturer) => manufacturer.name
  );
  const { getByTestId, getByText, queryByText } = render(
    <Filter
      filter={initialFilter}
      onFilterChange={onFilterChange}
      disabled={false}
    />
  );

  const manufacturerWrapper = getByTestId("select-manufacturer");

  await waitFor(() =>
    expect(within(manufacturerWrapper).getByRole("button")).not.toHaveAttribute(
      "aria-disabled"
    )
  );

  userEvent.click(getByText(/all manufacturers/i));

  manufacturers.forEach((manufacturer) => {
    expect(getByText(manufacturer)).toBeVisible();
  });

  userEvent.click(getByText(manufacturers[0]));

  await waitFor(() =>
    expect(queryByText(/all manufacturers/i)).not.toBeInTheDocument()
  );
  expect(getByText(manufacturers[0])).toBeVisible();

  userEvent.click(getByText(/filter/i));

  expect(onFilterChange).toHaveBeenCalledWith({
    color: initialFilter.color,
    manufacturer: manufacturers[0]
  });
  expect(onFilterChange).toHaveBeenCalledTimes(1);
});
