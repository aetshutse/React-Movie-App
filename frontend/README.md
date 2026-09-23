# Movie App

A React app for browsing popular movies, searching The Movie Database (TMDB), and saving favorites in your browser.

## Features

- Browse popular movies from TMDB.
- Search the movie catalog by title.
- Add and remove movies from Favorites.
- Keep favorites saved in the browser with `localStorage`.
- Navigate between the Home and Favorites pages.

## Requirements

- [Node.js](https://nodejs.org/) and npm.
- Internet access to load movie data and poster images from TMDB.
- A TMDB API key, configured in a local environment file.

## Run locally

Open Command Prompt in the project folder, then run:

```cmd
cd frontend
npm install
npm run dev
```

Vite prints a local address in the terminal, usually `http://localhost:5173`. Open that address in your browser and keep the terminal running while using the app. Press **Ctrl+C** in the terminal to stop the development server.

If Command Prompt is already open in the `frontend` folder, skip `cd frontend`.

## TMDB API key

Movie data comes from the [TMDB API](https://developer.themoviedb.org/docs). The app reads the key from the `VITE_TMDB_API_KEY` environment variable.

1. Copy `frontend/.env.example` to `frontend/.env.local` if you do not already have the local file.
2. Replace `your_tmdb_api_key_here` in `.env.local` with your TMDB API key.
3. Restart the Vite development server after changing the environment file.

`.env.local` is ignored by Git. Keep your real key there and never commit it. Vite variables prefixed with `VITE_` are included in browser code, so treat this as a public client key: use TMDB's available restrictions and rotate the key if it has been exposed. For deployment, configure `VITE_TMDB_API_KEY` in the hosting provider's environment settings.

## Available scripts

Run these from the `frontend` folder:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the app into `dist/`. |
| `npm run preview` | Preview the production build locally. Run `npm run build` first. |
| `npm run lint` | Check the source with ESLint. |

## Project structure

```text
frontend/
├── public/             Static public assets
├── src/
│   ├── assets/          App images and other imported assets
│   ├── components/      Navigation bar and movie cards
│   ├── contexts/        Shared favorites state
│   ├── pages/           Home and Favorites screens
│   ├── services/        TMDB API requests
│   ├── css/             App styles
│   ├── App.jsx          Routes and shared app layout
│   └── main.jsx         React entry point
├── package.json         Dependencies and npm scripts
└── vite.config.js       Vite configuration
```

## Troubleshooting

- **`npm` is not recognized:** Install Node.js, then close and reopen Command Prompt.
- **The app cannot load movies:** Check your internet connection and confirm the TMDB API key is valid.
- **The local address is unavailable:** Use the exact address printed by Vite; it may choose another port if `5173` is already in use.
- **Favorites disappeared:** Favorites are stored in the current browser's local storage, so they do not automatically transfer to another browser or device. Clearing site data removes them.
