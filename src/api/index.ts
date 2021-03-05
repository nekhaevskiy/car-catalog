const apiUrl = {
  cars: "https://auto1-mock-server.herokuapp.com/api/cars",
  colors: "https://auto1-mock-server.herokuapp.com/api/colors",
  manufacturers: "https://auto1-mock-server.herokuapp.com/api/manufacturers"
};

interface CarItem {
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

interface Car {
  car: CarItem;
}

interface Catalog {
  cars: CarItem[];
  totalPageCount: number;
  totalCarsCount: number;
}

interface Colors {
  colors: string[];
}

interface Model {
  name: string;
}

interface Manufacturer {
  name: string;
  models: Model[];
}

interface Manufacturers {
  manufacturers: Manufacturer[];
}

export { apiUrl };
export type { CarItem, Car, Catalog, Colors, Manufacturers };
