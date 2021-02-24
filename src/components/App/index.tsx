import React from "react";
import { Filter, FilterState, initialFilter } from "../Filter";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./App.module.css";

function App() {
  const [filterState, setFilterState] = React.useState<FilterState>(
    initialFilter
  );

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.filters}>
          <Filter
            // colors={["Black", "White", "Blue", "Yellow"]}
            // manufacturers={["Chrysler", "Mercedes-Bens", "BMW", "Tesla"]}
            onFilterChange={setFilterState}
          />
        </div>
        <div className={styles.catalog}>Catalog</div>
      </main>
      <Footer />
    </>
  );
}

// TODO: Add 404 page
// TODO: Add mobile version
// TODO: Add React Router
// TODO: Add CSS Grid
// TODO: Add Cypress
// TODO: Check in different browsers

export default App;
