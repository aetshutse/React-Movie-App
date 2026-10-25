import { getMovies } from "../../server/tmdb.js";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const requestUrl = new URL(request.url, "http://localhost");
  const query = requestUrl.searchParams.get("query")?.trim() ?? "";

  if (!query || query.length > 100) {
    return response.status(400).json({ error: "Invalid search query." });
  }

  try {
    return response.json(await getMovies("/search/movie", query));
  } catch {
    return response.status(502).json({ error: "Could not search movies." });
  }
}
