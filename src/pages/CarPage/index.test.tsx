import { render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { useParams } from "react-router-dom";
import { CarPage } from ".";
import { apiUrl } from "../../api";
import { testDataCar } from "../../api/__testData__/car";
import { server } from "../../mocks/server";

jest.mock("react-router-dom", () => {
  return {
    useParams: jest.fn()
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders the page in the happy case", async () => {
  const {
    manufacturerName,
    modelName,
    mileage,
    fuelType,
    color,
    pictureUrl
  } = testDataCar.car;
  const carName = `${manufacturerName} ${modelName}`;
  const mileageFull = `${mileage.number.toLocaleString("de-DE")} ${
    mileage.unit
  }`;
  (useParams as jest.Mock).mockReturnValue({ carId: "123" });
  const { getByText, getByTestId, queryByText, getByAltText } = render(
    <CarPage />
  );

  expect(getByText(/loading car with stock # 123/i)).toBeVisible();
  expect(getByTestId("LoadingCard")).toBeVisible();

  await waitFor(() => {
    expect(
      queryByText(/loading car with stock # 123/i)
    ).not.toBeInTheDocument();
  });

  expect(getByAltText(carName)).toHaveAttribute("src", pictureUrl);
  expect(getByText(carName)).toBeVisible();
  expect(getByText(/stock # 123/i)).toBeVisible();
  expect(getByText(mileageFull)).toBeVisible();
  expect(getByText(fuelType)).toBeVisible();
  expect(getByText(color)).toBeVisible();
  expect(getByText(/this car is currently available/i)).toBeVisible();
});

test("renders the error alert in an error case", async () => {
  server.use(
    rest.get(`${apiUrl.cars}/:carId`, (req, res, ctx) => {
      return res.networkError("Failed to connect");
    })
  );
  (useParams as jest.Mock).mockReturnValue({ carId: "123" });

  const { getByText, getByTestId, queryByText, getByRole } = render(
    <CarPage />
  );

  expect(getByText(/loading car with stock # 123/i)).toBeVisible();
  expect(getByTestId("LoadingCard")).toBeVisible();

  await waitFor(() => {
    expect(
      queryByText(/loading car with stock # 123/i)
    ).not.toBeInTheDocument();
  });

  expect(getByRole("alert")).toBeVisible();
});
