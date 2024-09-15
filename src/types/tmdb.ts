export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface TMDBResponse {
  results: Movie[];
}
