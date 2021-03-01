import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import { Fallback } from "./components/Fallback";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NotFound } from "./components/NotFound";
import { CarPage } from "./pages/CarPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Header data-testid="Header" />
      <main className={styles.main}>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/cars/:carId">
              <CarPage />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </ErrorBoundary>
      </main>
      <Footer data-testid="Footer" />
    </BrowserRouter>
  );
}

// TODO: Check in different browsers

export default App;
