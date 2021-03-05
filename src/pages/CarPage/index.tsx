import React from "react";
import { useParams } from "react-router-dom";
import { api, apiUrl, Car, CarItem } from "../../api";
import { CarLoading } from "../../components/CarLoading";
import { CarResolved } from "../../components/CarResolved";
import { Fallback } from "../../components/Fallback";
import { NotFound } from "../../components/NotFound";

enum State {
  Pending = "pending",
  Resolved = "resolved",
  NotFound = "not found",
  Rejected = "rejected"
}

function useCarFetch(carId: string): [State, CarItem | undefined] {
  const [state, setState] = React.useState<State>(State.Pending);
  const [car, setCar] = React.useState<CarItem>();
  React.useEffect(() => {
    api<Car>(`${apiUrl.cars}/${carId}`)
      .then((data) => {
        setCar(data.car);
        setState(State.Resolved);
      })
      .catch((error) => {
        if (error.message === "Not Found") {
          setState(State.NotFound);
        } else {
          setState(State.Rejected);
        }
      });
  }, [carId]);
  return [state, car];
}

function CarPage() {
  let { carId } = useParams<{ carId: string }>();
  const [state, car] = useCarFetch(carId);

  switch (state) {
    case State.Pending:
      return <CarLoading carId={carId} />;
    case State.Resolved:
      if (!car) {
        throw new Error("car is undefined but state is resolved");
      }
      return <CarResolved car={car} />;
    case State.NotFound:
      return <NotFound />;
    case State.Rejected:
      return <Fallback />;
    default:
      throw new Error(`Unhandled state "${state}" in CarPage`);
  }
}

export { CarPage };
