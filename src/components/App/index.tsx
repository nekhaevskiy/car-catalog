import React from "react";
import { Catalog as CardsWrapper } from "../CardsWrapper";
import { Filter } from "../Filter";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <Header data-testid="Header" />
      <main className={styles.main}>
        <div className={styles.left}>
          <Filter onFilterChange={() => {}} data-testid="Filter" />
        </div>
        <div className={styles.right}>
          <CardsWrapper data-testid="CardsWrapper" />
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
