import { useState } from "react";
import "./MovieCard.css";

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  duration: number;
}

export default function MovieCard({ title, poster, duration }: MovieCardProps) {
  const [watched, setWatched] = useState(false);

  return (
    <div className="movie-card">
      <img src={poster} alt={title} className="movie-poster" />

      <div className="movie-info">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-duration">{duration} min</p>
      </div>

      <button
        className={`watch-button ${watched ? "watched" : ""}`}
        onClick={() => setWatched(!watched)}
      >
        {watched ? "✔ Já assisti" : "🎬 Não assisti"}
      </button>
    </div>
  );
}
