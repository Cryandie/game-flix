import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/Header";
import GamesFilter from "./components/GamesFilter/GamesFilter";
import GamesFetch from "./components/GamesFetch/GamesFetch";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <header>
      <Header />
    </header>
    <main className="main-container">
      <section className="games-filter">
        <GamesFilter />
      </section>
      <section className="games-fetch">
        <GamesFetch />
      </section>
    </main>
  </React.StrictMode>
);
