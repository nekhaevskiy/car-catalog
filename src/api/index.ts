const apiUrl = {
  cars: "https://auto1-mock-server.herokuapp.com/api/cars",
  colors: "https://auto1-mock-server.herokuapp.com/api/colors",
  manufacturers: "https://auto1-mock-server.herokuapp.com/api/manufacturers"
};

function api<T>(url: string): Promise<T> {
  return fetch(url).then((response) => response.json());
}

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

export { apiUrl, api };
export type { CarItem, Car, Catalog, Colors, Manufacturers };
