# Movie App

A React app for browsing popular movies, searching TMDB, and saving favorites in your browser. The app has a Vite-powered React frontend and a small Express backend that makes requests to TMDB without putting the API key in browser code.

## Features

- Browse popular movies and search TMDB by title.
- Add and remove movies from Favorites.
- Store favorites in the current browser with `localStorage`.
- Navigate between the Home and Favorites pages.

## Requirements

- Node.js 20.19+ or 22.12+ and npm. These versions satisfy the Vite version used by this project.
- A TMDB **API Key (v3 auth)** from [TMDB's API settings](https://www.themoviedb.org/settings/api).
- Internet access for the app to contact TMDB and load poster images.

## First-time setup

Run these commands from the project root, the folder containing `package.json`.

Install the project dependencies:

```powershell
npm.cmd install
```

On macOS, Linux, or Windows Command Prompt, use `npm install` instead of `npm.cmd install`.

Create your local environment file. Run this only if `.env.local` does not already exist, so you do not overwrite a key you have already configured.

```powershell
Copy-Item .env.example .env.local
```

On macOS or Linux, use `cp .env.example .env.local`.

Open `.env.local` and replace the placeholder with your TMDB **API Key (v3 auth)**:

```env
TMDB_API_KEY=your_actual_v3_api_key
```

Do not use TMDB's separate API Read Access Token here; this server expects the v3 API key. Do not add quotes around the value.

## Run the app locally

The frontend and backend are separate processes. Keep two terminals open, both with the project root as their current directory.

In terminal 1, start the backend:

```powershell
node --env-file=.env.local server/index.js
```

You should see `Movie API listening on http://localhost:3001`. If the server says `TMDB_API_KEY is missing`, check that `.env.local` is in the project root and that its variable is named `TMDB_API_KEY`.

In terminal 2, start the frontend:

```powershell
npm.cmd run dev
```

On macOS, Linux, or Windows Command Prompt, use `npm run dev`. Open the local URL Vite prints, usually <http://localhost:5173/>. Vite forwards `/api` requests to the backend on port 3001. Leave both terminals running while you use the app. Press **Ctrl+C** in each terminal to stop its process.

## Check the API

With the backend running, open these URLs in a browser:

- <http://localhost:3001/api/movies/popular> returns popular movie data.
- <http://localhost:3001/api/movies/search?query=Inception> returns search results.

The frontend calls these same routes through Vite at `/api/movies/popular` and `/api/movies/search`.

## API key safety

The key is read by the Express backend from `TMDB_API_KEY`. The React app calls your backend; it does not need the key. Do not rename the variable with a `VITE_` prefix, because Vite exposes `VITE_` variables to browser code.

The real key belongs only in `.env.local` for local development or in your hosting provider's **server-side environment variables** after deployment. `.env.local` is ignored by Git; `.env.example` contains only a placeholder and is safe to commit. Never commit or share the real key. If it has been exposed, revoke it in TMDB and create a replacement.

## Available scripts

Run these from the project root. In Windows PowerShell, use `npm.cmd` in place of `npm`.

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies. |
| `npm run dev` | Start the Vite frontend development server. |
| `npm run build` | Build the frontend into `dist/`. |
| `npm run preview` | Preview the frontend build locally after running the build. |
| `npm run lint` | Check the project with ESLint. |
| `node --env-file=.env.local server/index.js` | Start the Express backend. |

The frontend and backend commands must run in separate terminals during development. `npm run preview` previews only the frontend; it does not start the backend.

## Project structure

```text
.
├── api/
│   └── movies/             Vercel serverless API routes
├── server/
│   ├── index.js            Local Express API server
│   └── tmdb.js             Shared server-side TMDB requests
├── src/
│   ├── assets/             App images and other imported assets
│   ├── components/         Navigation bar and movie cards
│   ├── contexts/           Shared favorites state
│   ├── css/                App styles
│   ├── pages/              Home and Favorites screens
│   ├── services/api.js     Frontend requests to the local API
│   ├── App.jsx             Routes and shared app layout
│   └── main.jsx            React entry point
├── .env.example            Safe environment-variable template
├── .env.local              Local TMDB key; ignored by Git
├── index.html              Vite HTML entry point
├── package.json            Dependencies and npm scripts
├── vercel.json             Vercel SPA routing configuration
└── vite.config.js          Vite configuration and development proxy
```

## Deploy to Vercel

The repository is configured for a single Vercel project: Vercel builds the Vite frontend as static files and deploys the two files in `api/movies/` as serverless functions. The Vercel API functions and the local Express server share the TMDB request helper in `server/tmdb.js`. `vercel.json` sends client-side routes such as `/favorites` back to the React app. The Vite proxy in `vite.config.js` is only for local development.

1. Push this repository to GitHub.
2. In the [Vercel dashboard](https://vercel.com/dashboard), choose **Add New → Project**, then import `aetshutse/React-Movie-App`.
3. Keep the project root as the **Root Directory**. Vercel should detect Vite. Use these build settings if it asks:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install`
4. In the project’s **Environment Variables** settings, add `TMDB_API_KEY` with your TMDB **API Key (v3 auth)**. Add it to the Production environment (and Preview if you want preview deployments to load movies). Do not add a `VITE_` prefix.
5. Deploy. After adding or changing an environment variable, redeploy for the change to take effect.
6. Test the deployed site at `/` and `/favorites`, and check these API routes:
   - `/api/movies/popular`
   - `/api/movies/search?query=Inception`

Favorites remain in each visitor's browser `localStorage`; they are not shared between devices or browsers. The API key is read only by server-side code. The API does not currently include rate limiting or caching, so consider adding those before exposing it to significant public traffic.

See Vercel's guides for [Vite](https://vercel.com/docs/frameworks/frontend/vite) and [Node.js functions](https://vercel.com/docs/functions/runtimes/node-js) for platform details.

## Troubleshooting

- **`npm` is blocked or not recognized in PowerShell:** Use `npm.cmd` commands. If Node.js is missing, install a supported version and reopen the terminal.
- **The backend reports that `TMDB_API_KEY` is missing:** Confirm `.env.local` is at the project root and uses the exact name `TMDB_API_KEY`.
- **TMDB returns HTTP 401:** Check that the value is a valid TMDB API Key (v3 auth), not the Read Access Token or the example placeholder.
- **The app says it failed to load movies:** Make sure both terminals are running. The backend should listen on port 3001; the Vite frontend usually listens on port 5173.
- **Port 5173 is already in use:** Open the alternate URL Vite prints. The backend proxy still expects port 3001.
- **Favorites disappeared:** Favorites are stored in the current browser's local storage. They do not automatically move between browsers or devices, and clearing site data removes them.
