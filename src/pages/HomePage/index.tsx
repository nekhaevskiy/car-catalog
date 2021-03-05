import React from "react";
import { api, apiUrl, Catalog } from "../../api";
import { CardsWrapper } from "../../components/CardsWrapper";
import { Fallback } from "../../components/Fallback";
import { Filter, FilterState, initialFilter } from "../../components/Filter";
import { HomeLoading } from "../../components/HomeLoading";
import { Pagination } from "../../components/Pagination";
import styles from "./styles.module.css";

enum State {
  Pending = "pending",
  Resolved = "resolved",
  Rejected = "rejected"
}

function useCatalogFetch(
  filter: FilterState,
  page: number
): { state: State; catalog?: Catalog } {
  const [state, setState] = React.useState<State>(State.Pending);
  const [catalog, setCatalog] = React.useState<Catalog>();

  React.useEffect(() => {
    const { color, manufacturer } = filter;
    const colorParam = color !== initialFilter.color ? `&color=${color}` : "";
    const manufacturerParam =
      manufacturer !== initialFilter.manufacturer
        ? `&manufacturer=${manufacturer}`
        : "";
    setState(State.Pending);
    api<Catalog>(`${apiUrl.cars}?page=${page}${colorParam}${manufacturerParam}`)
      .then((catalog) => {
        setState(State.Resolved);
        setCatalog(catalog);
      })
      .catch((error) => {
        setState(State.Rejected);
      });
  }, [filter, page]);

  return { state, catalog };
}

function HomePage() {
  const [filter, setFilter] = React.useState<FilterState>(initialFilter);
  const [page, setPage] = React.useState(1);
  const { state, catalog } = useCatalogFetch(filter, page);

  function onFilterChange(filter: FilterState) {
    setPage(1);
    setFilter(filter);
  }

  function onPageChange(newPage: number) {
    setPage(newPage);
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Filter
          filter={filter}
          onFilterChange={onFilterChange}
          disabled={state !== "resolved"}
          data-testid="Filter"
        />
      </div>
      <div className={styles.right}>
        {state === State.Pending && <HomeLoading />}
        {state === State.Resolved && catalog && (
          <>
            <CardsWrapper catalog={catalog} />
            <Pagination
              current={page}
              total={catalog.totalPageCount}
              onPageChange={onPageChange}
            />
          </>
        )}
        {state === State.Rejected && <Fallback />}
      </div>
    </div>
  );
}

export { HomePage };
