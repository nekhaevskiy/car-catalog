import { rest } from "msw";
import { carsUrl } from "../api";
import { testDataCatalog } from "../__testData__/Catalog";

export const handlers = [
  rest.get(carsUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testDataCatalog));
  })
];
