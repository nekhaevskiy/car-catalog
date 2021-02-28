import { render, waitFor } from "@testing-library/react";
import React from "react";
import App from ".";

test("renders all necessary components", async () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId("Header")).toBeVisible();
  expect(getByTestId("Filter")).toBeVisible();
  expect(getByTestId("CardsWrapper")).toBeVisible();
  expect(getByTestId("Footer")).toBeVisible();

  await waitFor(() => expect(getByTestId("CardsWrapper")).toBeVisible());
});
