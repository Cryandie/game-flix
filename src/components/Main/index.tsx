import "./index.css";
import GamesFilter from "./GamesFilter/GamesFilter";
import GamesFetch from "./GamesFetch/GamesFetch";
import { useState } from "react";

function Main() {
  const [nameFilter, setNameFilter] = useState("");
  const [minScoreFilter, setMinScoreFilter] = useState<string | number>("");
  const [order, setOrder] = useState("score");

  return (
    <div className="main-container">
      <section className="games-filter">
        <GamesFilter
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          minScoreFilter={minScoreFilter}
          setMinScoreFilter={setMinScoreFilter}
          order={order}
          setOrder={setOrder}
        />
      </section>
      <section className="games-fetch">
        <GamesFetch
          nameFilter={nameFilter}
          minScoreFilter={minScoreFilter}
          order={order}
        />
      </section>
    </div>
  );
}
export default Main;
