import React from "react";

enum State {
  Pending = "pending",
  Resolved = "resolved",
  NotFound = "not found",
  Rejected = "rejected"
}

interface Result<T> {
  state: State;
  result?: T;
}

function useFetch<T>(url: string): Result<T> {
  const [state, setState] = React.useState<State>(State.Pending);
  const [result, setResult] = React.useState<T>();
  React.useEffect(() => {
    setState(State.Pending);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setResult(data);
        setState(State.Resolved);
      })
      .catch((error) => {
        if (error.message === "Not Found") {
          setState(State.NotFound);
        } else {
          setState(State.Rejected);
        }
      });
  }, [url]);

  return { state, result };
}

export { useFetch, State };
