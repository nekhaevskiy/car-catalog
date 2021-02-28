import { rest } from "msw";
import { apiUrl } from "../api";
import { testDataCarsPage1, testDataCarsPage2 } from "../api/__testData__/cars";
import { testDataColors } from "../api/__testData__/colors";
import { testDataManufacturers } from "../api/__testData__/manufacturers";

export const handlers = [
  rest.get(apiUrl.cars, (req, res, ctx) => {
    const page = req.url.searchParams.get("page");
    if (page === "2") {
      return res(ctx.status(200), ctx.json(testDataCarsPage2));
    }
    return res(ctx.status(200), ctx.json(testDataCarsPage1));
  }),

  rest.get(apiUrl.colors, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testDataColors));
  }),

  rest.get(apiUrl.manufacturers, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testDataManufacturers));
  })
];
