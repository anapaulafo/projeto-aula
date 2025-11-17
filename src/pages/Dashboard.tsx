import CategoryCard from "../components/CategoryCard/CategoryCard";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Melhor Direção",
    movieIds: [1064213, 549509, 661539, 974950, 933260],
  },
];

export function Dashboard() {
  const userId = localStorage.getItem("userId") || "";
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => navigate("/home")}
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
          🏠 Home
        </button>
      </div>

      <h1>Dashboard</h1>
      <div className="categories-container">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.name}
            categoryName={cat.name}
            movieIds={cat.movieIds}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}
