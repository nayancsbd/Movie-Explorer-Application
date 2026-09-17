import { useEffect, useState } from 'react';
import { MovieCard } from '../components';
import { getTrendingMovies } from '../services';
import type { Movie } from '../types';

export const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      const response = await getTrendingMovies();

      if (!isMounted) {
        return;
      }

      if (response.status >= 200 && response.status < 300 && response.data.length > 0) {
        setMovies(response.data);
      } else {
        setError(response.message || 'Failed to load trending movies.');
      }
      setLoading(false);
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-container space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
            Trending Movies
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore the latest popular titles and trending series.
          </p>
        </div>
        {!loading && !error && (
          <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 self-start sm:self-auto">
            {movies.length} titles
          </span>
        )}
      </div>

      {loading && (
        <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse rounded-xl border border-slate-800 bg-slate-900/40 p-3 space-y-4"
            >
              <div className="aspect-[2/3] w-full rounded-lg bg-slate-800" />
              <div className="h-4 w-3/4 rounded bg-slate-800" />
              <div className="h-3 w-1/2 rounded bg-slate-800" />
            </div>
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-900/50 bg-rose-950/20 p-8 text-center space-y-3">
          <p className="text-rose-300 text-sm font-medium">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-slate-800 border border-slate-700 px-4 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};
