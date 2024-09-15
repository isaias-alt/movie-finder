import { GenerateContentResult } from "@google/generative-ai";
import { Movie, TMDBResponse } from "../types/tmdb";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (
  query: GenerateContentResult
): Promise<Movie[]> => {
  const reponse = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data: TMDBResponse = await reponse.json();
  return data.results;
};
