type State = "pending" | "resolved" | "rejected";

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

export { State, Car, Catalog };
