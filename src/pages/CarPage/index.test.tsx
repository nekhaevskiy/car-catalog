import { render } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { CarPage } from ".";

jest.mock("react-router-dom", () => {
  return {
    useParams: jest.fn()
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders loading state", () => {
  (useParams as jest.Mock).mockReturnValue({ id: "123" });
  const { getByText, getByTestId } = render(<CarPage />);

  expect(getByText(/loading car with stock # 123/i)).toBeVisible();
  expect(getByTestId("LoadingCard")).toBeVisible();
});
