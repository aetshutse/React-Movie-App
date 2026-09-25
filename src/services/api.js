export const getPopularMovies = async () => {
  const response = await fetch("/api/movies/popular");

  if (!response.ok) {
    throw new Error("Could not load popular movies.");
  }

  return response.json();
};

export const searchMovies = async (query) => {
  const params = new URLSearchParams({ query });
  const response = await fetch(`/api/movies/search?${params}`);

  if (!response.ok) {
    throw new Error("Could not search movies.");
  }

  return response.json();
};