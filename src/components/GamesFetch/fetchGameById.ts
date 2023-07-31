import { GameDetailsResponse, GameInfo, GameResponse } from "./gamesTypes";

//This function will take the response that we got from the first endpoint, use the id to get the details of the game then return only the needed properties.
export async function fetchGameById(
  gamesRes: GameResponse[]
): Promise<GameInfo[]> {
  const games: GameInfo[] = [];
  const promises = gamesRes.map(async (game, index) => {
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games/${game.id}?key=${process.env.REACT_APP_API_KEY}
        `,
        { method: "GET" }
      );
      const data = (await res.json()) as GameDetailsResponse;
      //Since our API is returning a long description we are only taking a part of it:
      const summary =
        data.description
          .replace(/<[^>]*>/g, "")
          .split(".")
          .slice(0, 2)
          .join(".") + ".";
      const gameInfo: GameInfo = {
        id: game.id,
        cover: game.background_image,
        name: game.name,
        released: game.released,
        summary,
        // The maximum score for this API is 5 and it is a decimal. We are rounding it up and multiplying it by 2 to match the screenshots in the exercise.
        score: Math.ceil(game.rating) * 2,
      };
      // Here I am using the index to keep the data ordered, using a for loop will be slower so I opted for this solution.
      games[index] = gameInfo;
    } catch (err) {
      console.error(err);
    }
  });
  await Promise.all(promises);
  return games;
}
