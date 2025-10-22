import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import "../components/MovieCard/MovieCard.css";
import "../styles/Home.css";

const API_KEY = "76110a6805aca8e1a4dbcd4ba00066a9";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movieIds = [
  1064213, 549509, 661539, 974576, 693134,
  974950, 1000837, 1028196, 933260, 402431
];

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
      const results = await Promise.all(
        movieIds.map(async (id) => {
          const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
          const data = await res.json();
          return data;
        })
      );
      setMovies(results);
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
}
