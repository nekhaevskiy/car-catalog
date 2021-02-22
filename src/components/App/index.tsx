import React from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.filters}>Filters</div>
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

export default App;
