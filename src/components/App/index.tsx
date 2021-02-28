import React from "react";
import { api, apiUrl, Catalog } from "../../api";
import { CardsWrapper, State } from "../CardsWrapper";
import { Filter, FilterState, initialFilter } from "../Filter";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Pagination } from "../Pagination";
import styles from "./App.module.css";

function App() {
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
      <Header data-testid="Header" />
      <main className={styles.main}>
        <div className={styles.left}>
          <Filter
            filter={filter}
            onFilterChange={onFilterChange}
            disabled={state !== "resolved"}
            data-testid="Filter"
          />
        </div>
        <div className={styles.right}>
          <CardsWrapper state={state} catalog={catalog} />
          {state === "resolved" && catalog && (
            <Pagination
              current={page}
              total={catalog.totalPageCount}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </main>
      <Footer data-testid="Footer" />
    </>
  );
}

// TODO: Add React Router
// TODO: Add 404 page
// TODO: Add mobile version
// TODO: Add ErrorBoundary
// TODO: Check in different browsers

export default App;
