import { useState, useEffect } from "react";
import { Gauge } from "@mui/x-charts";
import "./CategoryCard.css";

interface CategoryCardProps {
  categoryName: string;
  movieIds: number[];
  userId: string;
}

interface Movie {
  id: number;
  title: string;
}

const tmdbKey = import.meta.env.VITE_API_KEY;

export default function CategoryCard({
  categoryName,
  movieIds,
  userId,
}: CategoryCardProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchedIds, setWatchedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const fetchedMovies = await Promise.all(
          movieIds.map(async (id) => {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbKey}`
            );
            const data = await res.json();
            return { id: data.id, title: data.title };
          })
        );
        setMovies(fetchedMovies);

        const userRes = await fetch(`http://localhost:4000/api/user/${userId}`);
        const userData = await userRes.json();
        const watched = userData.assistidos.map((id: string) => parseInt(id));
        setWatchedIds(watched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movieIds, userId]);

  const watchedCount = movies.filter((m) => watchedIds.includes(m.id)).length;
  const percentage = movies.length ? (watchedCount / movies.length) * 100 : 0;

  return (
    <div className="category-card">
      <h2>{categoryName}</h2>
      <ul className="movie-list">
        {loading && <li>Carregando...</li>}
        {!loading &&
          movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} {watchedIds.includes(movie.id) && "✔"}
            </li>
          ))}
      </ul>
      <div className="gauge-container">
        <Gauge
          value={percentage}
          max={100}
          width={180}
          height={180}
          color="#7a56c3"
        />
      </div>
    </div>
  );
}
