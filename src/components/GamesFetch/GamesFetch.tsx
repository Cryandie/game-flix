import { useEffect, useState } from "react";
import "./GamesFetch.css";
import { GameInfo, GameResponse } from "./gamesTypes";
import { fetchGameById } from "./fetchGameById";

function GamesFetch() {
  // TODO: Move private data to env
  //TODO: Clean the data result and keep only what is needed before storing it in the games array.
  const url = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}`;
  const options = {
    method: "GET",
  };

  const [games, setGames] = useState<GameInfo[]>([]);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  async function fetchGames() {
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      const result: GameResponse[] = data.results;
      const gameInfo: GameInfo[] = await fetchGameById(result);
      setGames(gameInfo);
      //   console.log(games);
    } catch (err: any) {
      //TODO: Handle errors
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchGames();
    // I am using the following func to check if the screen is mobile and manage the responsiveness, and to avoid using another library since bootstrap isn't allowed.
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 500px)").matches);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* TODO:handle err style */}
      {error && <p>{error}</p>}
      {/* TODO:Give Game a type */}
      {games.map((game: GameInfo) => (
        <div className="games-list-card" key={game.id}>
          {!isMobile && (
            <section className="game-img-container">
              <img className="game-img" src={game.cover} alt="game cover" />
            </section>
          )}
          {isMobile && (
            <section className="game-img-container">
              <img
                className="game-img-sm"
                style={{ backgroundImage: `url(${game.cover})` }}
                src={game.cover}
                alt="game cover"
              />
            </section>
          )}
          {!isMobile && (
            <section className="game-text-container">
              <h1 className="game-card-title">{game.name}</h1>
              <h3 className="game-date">{game.released}</h3>
              <p className="game-summary">{game.summary}</p>
            </section>
          )}
          {isMobile && (
            <section className="game-text-container-sm">
              <div className="game-score-container-sm">
                <div className="game-score-sm">{game.score}</div>
              </div>
              <h1 className="game-card-title">{game.name}</h1>
              <h3 className="game-date">{game.released}</h3>
              <p className="game-summary">{game.summary}</p>
            </section>
          )}
          {!isMobile && (
            <section className="game-score-container">
              <div className="game-score"> {game.score} </div>
            </section>
          )}
        </div>
      ))}
    </div>
  );
}

export default GamesFetch;
