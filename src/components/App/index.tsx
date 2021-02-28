import React from "react";
import { carsUrl, Catalog } from "../../api";
import { CardsWrapper, State } from "../CardsWrapper";
import { Filter } from "../Filter";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Pagination } from "../Pagination";
import styles from "./App.module.css";

function App() {
  const [state, setState] = React.useState<State>("pending");
  const [page, setPage] = React.useState(1);
  const [catalog, setCatalog] = React.useState<Catalog>();
  React.useEffect(() => {
    window
      .fetch(`${carsUrl}?page=${page}`)
      .then((response) => response.json())
      .then((catalog) => {
        setCatalog(catalog);
        setState("resolved");
      })
      .catch(() => {
        setCatalog(undefined);
        setState("rejected");
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
          <Filter onFilterChange={() => {}} data-testid="Filter" />
        </div>
        <div className={styles.right}>
          <CardsWrapper state={state} catalog={catalog} />
          {catalog && (
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
