import { useEffect, useState } from "react";
import "./GamesFetch.css";
import { GameInfo, GameResponse } from "./gamesTypes";
import { fetchGameById } from "./fetchGameById";

//Not creating a types file since we have only one interface here
interface GamesFetchProps {
  nameFilter: string;
  minScoreFilter: number;
  order: string;
}
function GamesFetch({ nameFilter, minScoreFilter, order }: GamesFetchProps) {
  const baseUrl = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2019-09-01,2023-08-01&platforms=18,1,7`;
  const [games, setGames] = useState<GameInfo[]>([]);
  // fetchedGames are 'dirty', they contain unnecessary data and need to be cleaned. => games contain only the data we need.
  const fetchedGames: GameResponse[] = [];
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sortedGames = [...games].sort((a, b) => {
    if (order === "release") {
      return new Date(a.released).getTime() - new Date(b.released).getTime();
    } else if (order === "score") {
      return a.score - b.score;
    } else if (order === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });
  async function fetchGames() {
    /* This api returns a maximum of 40 games, so we are calling it many times to get the required number of games. This will return 120 games,
    I'm fixing a limit in fetchGameById.ts */

    /* Since our requests are limited with this API, I will be cache-ing the data. We can check for changes and update it once in a while 
    but it won't be needed in this project so it makes more sense to request the data once and cache it, it's also better for UX. */
    setIsLoading(true);
    const cachedData = localStorage.getItem("gamesData");
    if (cachedData) {
      // If the data is in localStorage, parse it and use it
      const gameInfo: GameInfo[] = JSON.parse(cachedData);
      setGames(gameInfo);
      setIsLoading(false);
    } else {
      for (let page = 1; page <= 3; page++) {
        const url = `${baseUrl}&page_size=40&page=${page}`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          const result: GameResponse[] = data.results;
          fetchedGames.push(...result);
        } catch (err: any) {
          setError(err.message);
        }
      }
      // Please note that fetchGameById is also cleaning the data and returning only the data we need.
      const gameInfo: GameInfo[] = await fetchGameById(fetchedGames);
      setGames(gameInfo);
      // Store the data in localStorage
      localStorage.setItem("gamesData", JSON.stringify(gameInfo));
      setIsLoading(false);
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
      {/* I am not creating a re-usable loading or error component since we only need it here  */}
      {error && <p className="error-msg">{error}</p>}
      {isLoading && (
        <p className="loading-text">
          😵Loading Games... It may take some time to load the data if you are
          visiting this page for the first time, please note that this is
          intended because the data is being stored in the cache (because the
          API has a maximum requests limit) 😵
        </p>
      )}
      {!isLoading &&
        sortedGames
          .filter((game) =>
            game.name.toLowerCase().includes(nameFilter.toLowerCase())
          )
          .filter((game) => game.score >= minScoreFilter)
          .map((game: GameInfo) => (
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
