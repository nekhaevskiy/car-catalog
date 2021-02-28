import React from "react";
import { api, apiUrl, Catalog } from "../../api";
import { CardsWrapper, State } from "../../components/CardsWrapper";
import { Filter, FilterState, initialFilter } from "../../components/Filter";
import { Pagination } from "../../components/Pagination";
import styles from "./styles.module.css";

function HomePage() {
  const [state, setState] = React.useState<State>("pending");
  const [filter, setFilter] = React.useState<FilterState>(initialFilter);
  const [page, setPage] = React.useState(1);
  const [catalog, setCatalog] = React.useState<Catalog>();
  React.useEffect(() => {
    const colorParam =
      filter.color !== initialFilter.color ? `&color=${filter.color}` : "";
    const manufacturerParam =
      filter.manufacturer !== initialFilter.manufacturer
        ? `&manufacturer=${filter.manufacturer}`
        : "";
    api<Catalog>(`${apiUrl.cars}?page=${page}${colorParam}${manufacturerParam}`)
      .then((catalog) => {
        setCatalog(catalog);
        setState("resolved");
      })
      .catch((error) => {
        setState("rejected");
        // TODO: log error without console
        // console.error(error);
      });
  }, [filter.color, filter.manufacturer, page]);

  function onFilterChange(filter: FilterState) {
    setState("pending");
    setPage(1);
    setFilter(filter);
  }

  function onPageChange(newPage: number) {
    setState("pending");
    setPage(newPage);
  }

  return (
    <>
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
          <CardsWrapper
            state={state}
            catalog={catalog}
            data-testid="CardsWrapper"
          />
          {state === "resolved" && catalog && (
            <Pagination
              current={page}
              total={catalog.totalPageCount}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

export { HomePage };
