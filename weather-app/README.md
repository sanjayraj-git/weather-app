# Skyline — Weather Application

A responsive weather app built with React (Vite), Tailwind CSS, and Axios,
using the OpenWeatherMap API. Built as the minor project for the Dale Edge
Industry Internship Program 2026 take-home assessment.

## Features

- Search current weather by city name
- "Use my location" button (browser geolocation)
- Current temperature, feels-like, high/low, condition, and icon
- Humidity, wind speed + direction, pressure, visibility, sunrise/sunset
- 5-day forecast strip (collapsed from OpenWeatherMap's 3-hour data)
- Loading skeletons and a dedicated error state with retry
- Persists the last searched city in `localStorage` and reloads it on refresh
- Fully responsive: mobile, tablet, and desktop
- Background gradient and icon shift based on live weather condition and day/night

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Axios
- lucide-react (icons)
- OpenWeatherMap API (`/weather` + `/forecast` endpoints)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example env file and add your API key:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env`:

   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

   Get a free key at https://openweathermap.org/api — the free tier covers
   both the Current Weather and 5 Day / 3 Hour Forecast endpoints used here.
   New keys can take up to a couple of hours to activate.

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open the URL Vite prints (default `http://localhost:5173`).

4. Build for production:

   ```bash
   npm run build
   npm run preview
   ```

## Assumptions & Known Limitations

- The 5-day forecast is derived from OpenWeatherMap's free 3-hour-step
  endpoint by picking the reading closest to midday for each day, since the
  free tier has no true daily-forecast endpoint.
- Wind speed is shown in m/s and visibility in km (metric units throughout).
- Geolocation requires the user to grant browser permission; if denied, the
  app shows a message and falls back to manual search.
- No backend/server — all requests go directly from the browser to
  OpenWeatherMap using a client-side env variable, which is standard for a
  take-home/demo app but not recommended for a production app with a
  private key (a real deployment would proxy requests through a backend).

## AI Usage Disclosure

- **AI tool used:** Claude (Anthropic)
- **Tasks AI assisted with:** scaffolding the Vite/Tailwind config, generating
  the initial component structure, the API service/error-handling layer, and
  the design token system (colors, fonts, gradients).
- **What I wrote/adjusted myself:** _(fill in before submitting — e.g. any
  copy changes, API key setup, testing against real cities, tweaks to layout
  or breakpoints you made by hand)_.
- **One technical decision made independently:** _(fill in — e.g. "I chose to
  cancel in-flight requests with AbortController when a new search fires, to
  avoid race conditions between overlapping API calls.")_

## Folder Structure

```
weather-app/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── SkyBackground.jsx
│   │   ├── SearchBar.jsx
│   │   ├── WeatherCard.jsx
│   │   ├── StatsGrid.jsx
│   │   ├── ForecastStrip.jsx
│   │   ├── LoadingState.jsx
│   │   └── ErrorState.jsx
│   ├── hooks/
│   │   └── useWeather.js
│   ├── services/
│   │   └── weatherApi.js
│   └── utils/
│       └── weatherHelpers.js
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
├── .env.example
└── README.md
```
