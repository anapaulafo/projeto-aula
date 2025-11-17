import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import "../components/MovieCard/MovieCard.css";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  runtime: number;
}

export const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [assistidos, setAssistidos] = useState<string[]>([]);
  const [loadingAssistidos, setLoadingAssistidos] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/movies");
      const data = await res.json();
      if (res.ok) setMovies(data);
    } catch (err) {
      console.error("Erro ao carregar filmes:", err);
    }
  };

  const fetchAssistidos = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:4000/api/user/${userId}`);
      const data = await res.json();
      if (res.ok) setAssistidos((data.assistidos || []).map(String));
      else setAssistidos([]);
    } catch (err) {
      console.error("Erro ao buscar assistidos:", err);
      setAssistidos([]);
    } finally {
      setLoadingAssistidos(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    fetchMovies();
    fetchAssistidos();
  }, [navigate, userId]);

  return (
    <div>
      {/* Botões alinhados à direita */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end", // alinhamento à direita
          alignItems: "center",
          marginBottom: "20px",
          gap: "12px", // espaço entre os botões
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "#7a56c3",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          style={{
            background: "#c0392b",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      <h1>🎥 Meus Filmes</h1>

      {loadingAssistidos ? (
        <p>Carregando...</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              duration={movie.runtime}
              imgUrl={IMG_URL}
              initialWatched={assistidos.includes(String(movie.id))}
              onToggle={(movieId, isWatched) => {
                setAssistidos((prev) =>
                  isWatched
                    ? [...prev, String(movieId)]
                    : prev.filter((id) => id !== String(movieId))
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
