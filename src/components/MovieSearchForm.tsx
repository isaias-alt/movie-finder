"use client";

import { useState } from "react";
import { describeMovie } from "../services/gemini";
import { searchMovies } from "../services/tmdb";

const MovieSearchForm = () => {
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("en");
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const query = await describeMovie(description, language);
      const movieResults = await searchMovies(query, language);
      setMovies(movieResults);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-4 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Descripción de la película:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium">
            Idioma:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="en">Inglés</option>
            <option value="es">Español</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Buscar película
        </button>
      </form>

      {movies.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Resultados:</h3>
          <ul className="mt-4 space-y-4">
            {movies.map((movie) => (
              <li key={movie.id} className="bg-gray-100 p-4 rounded-md">
                <h4 className="font-bold">{movie.title}</h4>
                <p>{movie.overview}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieSearchForm;
