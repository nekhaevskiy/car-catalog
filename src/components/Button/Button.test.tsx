import { render } from "@testing-library/react";
import React from "react";
import { Button } from ".";

test("renders button", () => {
  const { getByText } = render(<Button>test text</Button>);

  expect(getByText(/test text/i)).toBeVisible();
});
