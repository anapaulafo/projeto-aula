import express from "express";

const router = express.Router();

let cachedMovies = [];
let lastFetch = 0;
const CACHE_LIFETIME = 1000 * 60 * 60;

const API_KEY = "bf5852ad3d3c8aeef949e17138b85599"; //Adicionem a API KEY ao .env
const BASE_URL = "https://api.themoviedb.org/3";
const movieIds = [
  661539, 989662, 1118941, 1279229, 1013850, 945961, 1064213, 1337997, 1157132,
  799766, 1214499, 974576, 1356881, 693134, 977326, 974950, 823219, 558449,
  1300245, 1178556, 1000837, 1156619, 1108462, 1022789, 1284874, 653346,
  1249728, 1038263, 1064486, 1028196, 1232493, 426063, 1214527, 1211472,
  1155828, 1214539, 1158874, 1182047, 549509, 1232827, 1316292, 1195310,
  1278263, 1061699, 933260, 1184918, 929204, 1156605, 402431, 1220646,
];

router.get("/", async (res) => {
  if (cachedMovies.length > 0 && Date.now() - lastFetch < CACHE_LIFETIME) {
    return res.json(cachedMovies);
  }

  try {
    const results = await Promise.all(
      movieIds.map(async (id) => {
        const res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
        );

        if (!res.ok) {
          console.error(
            `Erro ao buscar filme ID ${id}: ${res.status} ${res.statusText}`
          ); //podem pensar em um tratamento melhor de erro
          return null;
        }

        return res.json();
      })
    );

    const validResults = results.filter((movie) => movie !== null);

    cachedMovies = validResults;
    lastFetch = Date.now();

    res.json(cachedMovies);
  } catch (error) {
    console.error("Erro fatal ao processar requisições:", error); //podem pensar em um tratamento melhor de erro
    res.status(500).json({ error: "Erro ao carregar a lista de filmes." });
  }
});

export default router;
