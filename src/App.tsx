import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CarPage } from "./pages/CarPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Header data-testid="Header" />
      <main className={styles.main}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/cars/:id">
            <CarPage />
          </Route>
        </Switch>
      </main>
      <Footer data-testid="Footer" />
    </BrowserRouter>
  );
}

// TODO: Add 404 page
// TODO: Add mobile version
// TODO: Add ErrorBoundary
// TODO: Check in different browsers

export default App;
