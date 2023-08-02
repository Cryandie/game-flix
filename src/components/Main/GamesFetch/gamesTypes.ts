export interface GameResponse {
  added: string;
  added_by_status: {}; // Sorry I can't define all the properties it will take too much time, and this is just an example.
  background_image: string;
  clip: any;
  dominant_color: string;
  esrb_rating: {};
  genres: [{}];
  id: number;
  metacritic: number;
  name: string;
  parent_platforms: [{}];
  platforms: [{}];
  playtime: number;
  rating: number;
  rating_top: number;
  ratings: [{}];
  ratings_count: number;
  released: string;
  reviews_count: number;
  saturated_color: string;
  short_screenshots: [{}];
  slug: string;
  stores: [{}];
  suggestions_count: number;
  tags: [{}];
  tba: boolean;
  updated: string;
  user_game: any;
}

/* GameDetailsResponse isn't accurate, the response is a bit different but I am extending GameResponse here just for the sake of the example,
    we are only getting this data to access the games' descriptions (We need to call a second endpoint to get the description) */
export interface GameDetailsResponse extends GameResponse {
  description: string;
}

export interface GameInfo {
  id: number;
  cover: string;
  name: string;
  released: string;
  summary: string;
  score: number;
}
