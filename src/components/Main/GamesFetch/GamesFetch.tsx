import { Fragment, useEffect, useState } from "react";
import "./GamesFetch.css";
import { GameInfo, GameResponse } from "./gamesTypes";
import { fetchGameById } from "./fetchGameById";
import useDebounce from "../../utility/useDebounce/";

//Not creating a types file since we have only one interface here
interface GamesFetchProps {
  nameFilter: string;
  minScoreFilter: string | number;
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
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 20;

  // sort by realse / score / name
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
  // Prevents the API from being called on every keystroke and reduce the number of requests sent to the server in the nameFilter search.
  const debouncedNameFilter = useDebounce(nameFilter, 500);
  async function fetchGames(page: number, name: string) {
    setIsLoading(true);
    // Please note that this could be optimized but I am doing all the queries here for the sake of simplicity.
    const url = `${baseUrl}&page_size=${gamesPerPage}&page=${page}&search=${name}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const result: GameResponse[] = data.results;
      fetchedGames.push(...result);
    } catch (err: any) {
      setError(err.message);
    }
    // Please note that fetchGameById is also cleaning the data and returning only the data we need.
    const gameInfo: GameInfo[] = await fetchGameById(fetchedGames);
    setGames(gameInfo);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchGames(currentPage, debouncedNameFilter);
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
  }, [currentPage, debouncedNameFilter]);

  return (
    <div>
      <Fragment>
        {/* I am not creating a re-usable loading or error component since we only need it here  */}
        {error && <p className="error-msg">{error}</p>}
        {isLoading && <p className="loading-text">🥱Loading Games...😴</p>}
        {games.length === 0 && !isLoading && (
          <h2>We couldn't find this game! Try another one😄</h2>
        )}
        {!isLoading &&
          sortedGames
            .filter((game) =>
              game.name.toLowerCase().includes(nameFilter.toLowerCase())
            )
            .filter((game) => game.score >= Number(minScoreFilter))
            .map((game: GameInfo) => (
              <div className="games-list-card" key={game.id}>
                {!isMobile && (
                  <section className="game-img-container">
                    <img
                      className="game-img"
                      src={game.cover}
                      alt="game cover"
                    />
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
                      <p className="game-score-sm">{game.score}</p>
                    </div>
                    <h1 className="game-card-title">{game.name}</h1>
                    <h3 className="game-date">{game.released}</h3>
                    <p className="game-summary">{game.summary}</p>
                  </section>
                )}
                {!isMobile && (
                  <section className="game-score-container">
                    <p className="game-score"> {game.score} </p>
                  </section>
                )}
              </div>
            ))}
      </Fragment>
      <Fragment>
        {!isLoading && games.length >= 20 && (
          <div className="pagination-btns-container">
            {currentPage !== 1 && (
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(1)}
              >
                Back to First Page
              </button>
            )}
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((page) => page + 1)}
              // I am assuming that the last page contains less that 20 games here
              disabled={games.length < gamesPerPage}
            >
              Next
            </button>
          </div>
        )}
      </Fragment>
    </div>
  );
}

export default GamesFetch;
