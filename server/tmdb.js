import process from "node:process";

export async function getMovies(path, query) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("TMDB_API_KEY is missing.");
  }

  const url = new URL(`https://api.themoviedb.org/3${path}`);
  url.searchParams.set("api_key", apiKey);

  if (query) {
    url.searchParams.set("query", query);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("TMDB request failed.");
  }

  const data = await response.json();
  return data.results ?? [];
}
