import React from "react";
import { Catalog } from "../Catalog";
import { Filter } from "../Filter";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <Header data-testid="Header" />
      <main className={styles.main}>
        <div className={styles.filters}>
          <Filter onFilterChange={() => {}} data-testid="Filter" />
        </div>
        <div className={styles.catalog}>
          <Catalog data-testid="Catalog" />
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
// TODO: Add CSS Grid
// TODO: Add Cypress

export default App;
