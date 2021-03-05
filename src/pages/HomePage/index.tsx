import React from "react";
import { apiUrl, Catalog } from "../../api";
import { CardsWrapper } from "../../components/CardsWrapper";
import { Fallback } from "../../components/Fallback";
import { Filter, FilterState, initialFilter } from "../../components/Filter";
import { HomeLoading } from "../../components/HomeLoading";
import { Pagination } from "../../components/Pagination";
import { State, useFetch } from "../../hooks/useFetch";
import styles from "./styles.module.css";

function HomePage() {
  const [filter, setFilter] = React.useState<FilterState>(initialFilter);
  const [page, setPage] = React.useState(1);
  const { color, manufacturer } = filter;
  const colorParam = color !== initialFilter.color ? `&color=${color}` : "";
  const manufacturerParam =
    manufacturer !== initialFilter.manufacturer
      ? `&manufacturer=${manufacturer}`
      : "";
  const url = `${apiUrl.cars}?page=${page}${colorParam}${manufacturerParam}`;
  const { state, result: catalog } = useFetch<Catalog>(url);

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
