import CategoryCard from "../components/CategoryCard/CategoryCard";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const categories = [
{
name: "Melhor Filme",
movieIds: [1064213,549509,661539,974576,693134,974950,1000837,1028196,933260,402431],
 },
{
name: "Melhor Ator ",
movieIds: [549509,661539,974576,1155828,1182047],
 },
{
name: "Melhor Atriz",
movieIds: [1064213,974950,1000837,933260,402431],
 },
{
name: "Melhor Ator Coadjuvante",
movieIds: [1064213,549509,661539,1182047,1013850],
 },
{
name: "Melhor Atriz Coadjuvante",
movieIds: [549509,661539,974576,974950,402431],
 },
{
name: "Melhor Direção",
movieIds: [1064213,549509,661539,974950,933260],
 },
{
name: "Melhor Cinematografia",
movieIds: [549509,693134,974950,1038263,426063],
 },
{
name: "Melhor Filme Internacional",
movieIds: [974950,1000837,1232827,1278263,823219],
 },
{
name: "Melhor Roteiro Adaptado",
movieIds: [661539,974576,974950,1028196,1155828],
 },
{
name: "Melhor Roteiro Original",
movieIds: [1064213,549509,933260,1013850,1211472],
 },
{
name: "Melhor Animação",
movieIds: [823219,1022789,1064486,929204,1184918],
 },
{
name: "Melhor Documentário",
movieIds: [1214499,1232493,1214527,1214539,1158874],
 },
{
name: "Melhor Canção Original",
movieIds: [974950,1155828,1061699,977326],
 },
{
name: "Melhor Trilha Sonora Original",
movieIds: [549509,974576,974950,402431,1184918],
 },
{
name: "Melhor Maquiagem",
movieIds: [974950,933260,402431,426063,989662],
 },
{
name: "Melhor Figurino",
movieIds: [661539,974576,402431,426063,558449],
 },
{
name: "Melhor Edição",
movieIds: [1064213,549509,974576,974950,402431],
 },
{
name: "Melhor Som",
movieIds: [661539,693134,974950,402431,1184918],
 },
{
name: "Melhor Design de Produção",
movieIds: [549509,974576,693134,402431,426063],
 },
{
name: "Melhor Efeito Visual",
movieIds: [693134,402431,945961,799766,653346],
 },
{
name: "Melhor Curta Live Action",
movieIds: [1118941,1337997,1178556,1316292,1279229],
 },
{
name: "Melhor Curta Animado",
movieIds: [1157132,1156619,1249728,1156605,1220646],
 },
{
name: "Melhor Documentário Curtametragem",
movieIds: [1356881,1300245,1284874,1195310,1108462],
 }
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
