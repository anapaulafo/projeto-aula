import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import "../components/MovieCard/MovieCard.css";
import "../styles/Home.css";

const API_KEY = "INSERT API KEY HERE";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movieIds = [661539, 989662, 1118941, 1279229, 1013850, 
  945961, 1064213, 1337997, 1157132, 799766, 1214499, 974576, 
  1356881, 693134, 977326, 974950, 823219, 558449, 1300245, 
  1178556, 1000837, 1156619, 1108462, 1022789, 1284874, 653346, 
  1249728, 1038263, 1064486, 1028196, 1232493, 426063, 1214527, 
  1211472, 1155828, 1214539, 1158874, 1182047, 549509, 1232827, 
  1316292, 1195310, 1278263, 1061699, 933260, 1184918, 929204, 
  1156605, 402431, 1220646]


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
