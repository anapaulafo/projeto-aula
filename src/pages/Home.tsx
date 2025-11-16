import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import "../components/MovieCard/MovieCard.css";
import "../styles/Home.css";
import { apiRequest } from "../services/api";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  runtime: number;
}

export const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await apiRequest("/movies");

      if (data && !data.error) {
        setMovies(data);
      } else {
        console.error("Erro ao carregar filmes do backend:", data.error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="movies-container">
      <h1>🎥 Meus Filmes</h1>

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={`${IMG_URL}${movie.poster_path}`}
            duration={movie.runtime}
          />
        ))}
      </div>
    </div>
  );
};
