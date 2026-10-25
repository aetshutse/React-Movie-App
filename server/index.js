import express from "express";
import process from "node:process";
import { getMovies } from "./tmdb.js";

const app = express();
const port = Number(process.env.PORT || 3001);
const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
  console.error("TMDB_API_KEY is missing from .env.local.");
  process.exit(1);
}

app.get("/api/movies/popular", async (_request, response) => {
  try {
    response.json(await getMovies("/movie/popular"));
  } catch {
    response.status(502).json({ error: "Could not load popular movies." });
  }
});

app.get("/api/movies/search", async (request, response) => {
  const query =
    typeof request.query.query === "string" ? request.query.query.trim() : "";

  if (!query || query.length > 100) {
    return response.status(400).json({ error: "Invalid search query." });
  }

  try {
    response.json(await getMovies("/search/movie", query));
  } catch {
    response.status(502).json({ error: "Could not search movies." });
  }
});

app.listen(port, () => {
  console.log(`Movie API listening on http://localhost:${port}`);
});