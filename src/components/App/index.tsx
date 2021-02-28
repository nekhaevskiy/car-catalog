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
    api<Catalog>(`${apiUrl.cars}?page=${page}`)
      .then((catalog) => {
        setCatalog(catalog);
        setState("resolved");
      })
      .catch((error) => {
        setState("rejected");
        // TODO: log error without console
        // console.error(error);
      });
  }, [page]);

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
            onFilterChange={setFilter}
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
