import { getMovies } from "../../server/tmdb.js";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  try {
    return response.json(await getMovies("/movie/popular"));
  } catch {
    return response.status(502).json({ error: "Could not load popular movies." });
  }
}
