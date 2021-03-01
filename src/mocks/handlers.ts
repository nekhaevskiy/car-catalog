import { rest } from "msw";
import { apiUrl } from "../api";
import { testDataCar } from "../api/__testData__/car";
import {
  testDataAudiRed,
  testDataCarsPage1,
  testDataCarsPage2
} from "../api/__testData__/cars";
import { testDataColors } from "../api/__testData__/colors";
import { testDataManufacturers } from "../api/__testData__/manufacturers";

export const handlers = [
  rest.get(apiUrl.cars, (req, res, ctx) => {
    const page = req.url.searchParams.get("page");
    const color = req.url.searchParams.get("color");
    const manufacturer = req.url.searchParams.get("manufacturer");
    if (page === "1" && color === "red" && manufacturer === "Audi") {
      return res(ctx.status(200), ctx.json(testDataAudiRed));
    }
    if (page === "2") {
      return res(ctx.status(200), ctx.json(testDataCarsPage2));
    }
    return res(ctx.status(200), ctx.json(testDataCarsPage1));
  }),

  rest.get(`${apiUrl.cars}/:carId`, (req, res, ctx) => {
    const { carId } = req.params;
    const updatedTestData = { ...testDataCar };
    updatedTestData.car.stockNumber = carId;
    return res(ctx.status(200), ctx.json(updatedTestData));
  }),

  rest.get(apiUrl.colors, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testDataColors));
  }),

  rest.get(apiUrl.manufacturers, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testDataManufacturers));
  })
];
