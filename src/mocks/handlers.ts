import { rest } from "msw";
import { carsUrl } from "../api";
import { testDataCatalogPage1, testDataCatalogPage2 } from "../testData";

export const handlers = [
  rest.get(carsUrl, (req, res, ctx) => {
    const page = req.url.searchParams.get("page");

    if (page === "2") {
      return res(ctx.status(200), ctx.json(testDataCatalogPage2));
    }

    return res(ctx.status(200), ctx.json(testDataCatalogPage1));
  })
];
