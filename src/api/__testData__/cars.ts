import { Catalog } from "..";

const testDataCarsPage1: Catalog = {
  cars: [
    {
      stockNumber: 10105,
      manufacturerName: "Porsche",
      modelName: "Cayman",
      color: "black",
      mileage: { number: 146615, unit: "km" },
      fuelType: "Petrol",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    },
    {
      stockNumber: 10157,
      manufacturerName: "Skoda",
      modelName: "Forman",
      color: "silver",
      mileage: { number: 199115, unit: "km" },
      fuelType: "Diesel",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    },
    {
      stockNumber: 10162,
      manufacturerName: "Mercedes-Benz",
      modelName: "190/190 E",
      color: "green",
      mileage: { number: 196729, unit: "km" },
      fuelType: "Diesel",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    },
    {
      stockNumber: 10406,
      manufacturerName: "Volkswagen",
      modelName: "Scirocco II",
      color: "yellow",
      mileage: { number: 170934, unit: "km" },
      fuelType: "Diesel",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    },
    {
      stockNumber: 10614,
      manufacturerName: "Porsche",
      modelName: "Cayenne",
      color: "black",
      mileage: { number: 102356, unit: "km" },
      fuelType: "Petrol",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    },
    {
      stockNumber: 10682,
      manufacturerName: "Porsche",
      modelName: "928",
      color: "black",
      mileage: { number: 163271, unit: "km" },
      fuelType: "Diesel",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    },
    {
      stockNumber: 10871,
      manufacturerName: "Audi",
      modelName: "TT Roadster",
      color: "yellow",
      mileage: { number: 190475, unit: "km" },
      fuelType: "Petrol",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    },
    {
      stockNumber: 10950,
      manufacturerName: "Fiat",
      modelName: "Tempra",
      color: "red",
      mileage: { number: 162939, unit: "km" },
      fuelType: "Petrol",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    },
    {
      stockNumber: 11120,
      manufacturerName: "Chrysler",
      modelName: "Sebring",
      color: "red",
      mileage: { number: 198541, unit: "km" },
      fuelType: "Diesel",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    },
    {
      stockNumber: 11140,
      manufacturerName: "Tesla",
      modelName: "Roadster",
      color: "white",
      mileage: { number: 147772, unit: "km" },
      fuelType: "Diesel",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    }
  ],
  totalPageCount: 2,
  totalCarsCount: 11
};

const testDataCarsPage2: Catalog = {
  cars: [
    {
      stockNumber: 10157,
      manufacturerName: "Skoda",
      modelName: "Forman",
      color: "silver",
      mileage: { number: 199115, unit: "km" },
      fuelType: "Diesel",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    }
  ],
  totalPageCount: 2,
  totalCarsCount: 11
};

const testDataAudiRed: Catalog = {
  cars: [
    {
      stockNumber: 64728,
      manufacturerName: "Audi",
      modelName: "RS 3",
      color: "red",
      mileage: { number: 118959, unit: "km" },
      fuelType: "Petrol",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    },
    {
      stockNumber: 72053,
      manufacturerName: "Audi",
      modelName: "A4",
      color: "red",
      mileage: { number: 171873, unit: "km" },
      fuelType: "Petrol",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
    }
  ],
  totalPageCount: 1,
  totalCarsCount: 2
};

export { testDataCarsPage1, testDataCarsPage2, testDataAudiRed };
