import { useEffect, useState } from "react";
import "./GamesFetch.css";
import { GameInfo, GameResponse } from "./gamesTypes";
import { fetchGameById } from "./fetchGameById";

function GamesFetch() {
  const baseUrl = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2019-09-01,2023-08-01&platforms=18,1,7`;
  const [games, setGames] = useState<GameInfo[]>([]);
  // fetchedGames are 'dirty', they contain unnecessary data and need to be cleaned. => games contain only the data we need.
  const fetchedGames: GameResponse[] = [];
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  async function fetchGames() {
    /* This api returns a maximum of 40 games, so we are calling it many times to get the required number of games. This will return 120 games,
    I'm fixing a limit in fetchGameById.ts */
    for (let page = 1; page <= 3; page++) {
      const url = `${baseUrl}&page_size=40&page=${page}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        const result: GameResponse[] = data.results;
        fetchedGames.push(...result);
      } catch (err: any) {
        //TODO: Handle errors
        setError(err.message);
      }
    }
    // Please note that fetchGameById is also cleaning the data and returning only the data we need.
    const gameInfo: GameInfo[] = await fetchGameById(fetchedGames);
    setGames(gameInfo);
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
      {games.map((game: GameInfo) => (
        <div className="games-list-card" key={game.id}>
          <div>Index: {game.index}</div>
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
