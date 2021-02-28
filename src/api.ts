const carsUrl = "https://auto1-mock-server.herokuapp.com/api/cars";

interface Car {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  mileage: {
    number: number;
    unit: string;
  };
  fuelType: string;
  color: string;
  pictureUrl: string;
}

interface Catalog {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
}

export { carsUrl };
export type { Car, Catalog };
