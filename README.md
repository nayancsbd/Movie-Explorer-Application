# 🎬 Movie Explorer Application

A responsive web application built with React and TypeScript that allows users to discover movies and TV shows, perform real-time search with debounced queries, and inspect detailed information in an interactive modal.

---

## ✨ Features

- **Home Landing Page**: Cinematic hero banner with direct navigation to the movie catalog and a trending spotlight section.
- **Dedicated Movie Listing**: Browse popular titles and search shows dynamically by title.
- **Real-Time Search**: Debounced search input querying the TVMaze API to minimize unnecessary network calls.
- **Interactive Details Modal**: Pop-up modal displaying backdrop artwork, ratings, release date, genre tags, runtime, network, and clean synopsis overview.
- **Responsive Layout**: Fluid CSS Grid and Flexbox layouts optimized for mobile, tablet, and desktop screens.
- **Graceful States**: Animated skeleton loaders during fetching, error handling with retry, and friendly empty states.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite
- **Data Source:** [TVMaze API](https://www.tvmaze.com/api)

---

## 🌐 API Endpoints

- **Fetch Shows:** `GET https://api.tvmaze.com/shows`
- **Search Shows:** `GET https://api.tvmaze.com/search/shows?q=:query`

---

## 📄 License

This project is open source and available under the MIT License.

## live link: 
https://vercel.com/nayan-b34c/movie-explorer-application
