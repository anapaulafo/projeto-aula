import { useState, useEffect } from "react";
import "./MovieCard.css";

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  duration: number;
  imgUrl: string;
  initialWatched?: boolean;
  onToggle?: (movieId: number, isWatched: boolean) => void;
}

export default function MovieCard({
  id,
  title,
  poster,
  duration,
  imgUrl,
  initialWatched = false,
  onToggle,
}: MovieCardProps) {
  const [watched, setWatched] = useState(initialWatched);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setWatched(initialWatched);
  }, [initialWatched]);

  const toggleWatched = async () => {
    if (loading) return;
    setLoading(true);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/user/watched", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, movieId: id }),
      });

      const data = await res.json();

      if (res.ok) {
        const watchedNow = data.assistidos.includes(String(id));
        setWatched(watchedNow);
        if (onToggle) onToggle(id, watchedNow);
      } else {
        console.error("Erro ao atualizar assistidos:", data.error);
      }
    } catch (err) {
      console.error("Erro ao atualizar assistidos:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-card">
      <img src={`${imgUrl}${poster}`} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-duration">{duration} min</p>
      </div>
      <button
        className={`watch-button ${watched ? "watched" : ""}`}
        onClick={toggleWatched}
        disabled={loading}
      >
        {watched ? "✔ Já assisti" : "🎬 Não assisti"}
      </button>
    </div>
  );
}
