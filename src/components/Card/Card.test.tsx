import { render } from "@testing-library/react";
import React from "react";
import { Card } from ".";

test("renders Card", () => {
  const { getByText, getByAltText } = render(<Card />);

  expect(getByAltText("Chrysler Crossfire")).toBeVisible();
  expect(getByText("Chrysler Crossfire")).toBeVisible();
  expect(getByText("Stock # 61184")).toBeVisible();
  expect(getByText(/view details/i)).toHaveAttribute("href", "/car-61184");
});
