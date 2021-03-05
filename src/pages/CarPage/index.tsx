import React from "react";
import { useParams } from "react-router-dom";
import { apiUrl, Car } from "../../api";
import { CarLoading } from "../../components/CarLoading";
import { CarResolved } from "../../components/CarResolved";
import { Fallback } from "../../components/Fallback";
import { NotFound } from "../../components/NotFound";
import { State, useFetch } from "../../hooks/useFetch";

function CarPage() {
  let { carId } = useParams<{ carId: string }>();
  const url = `${apiUrl.cars}/${carId}`;
  const { state, result } = useFetch<Car>(url);

  return (
    <>
      {state === State.Pending && <CarLoading carId={carId} />}
      {state === State.Resolved && result && result.car && (
        <CarResolved car={result.car} />
      )}
      {state === State.NotFound && <NotFound />}
      {state === State.Rejected && <Fallback />}
    </>
  );
}

export { CarPage };
