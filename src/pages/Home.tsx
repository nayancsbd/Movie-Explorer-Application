import { useEffect, useState } from 'react';
import { MovieCard } from '../components';
import { useDebounce } from '../hooks';
import { getTrendingMovies, searchMovies } from '../services';
import type { Movie } from '../types';

interface HomeProps {
  searchTerm?: string;
  onClearSearch?: () => void;
}

export const Home = ({ searchTerm = '', onClearSearch }: HomeProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      const trimmed = debouncedSearchTerm.trim();
      const response = trimmed
        ? await searchMovies(trimmed)
        : await getTrendingMovies();

      if (!isMounted) {
        return;
      }

      if (response.status >= 200 && response.status < 300) {
        setMovies(response.data);
      } else {
        setError(response.message || 'Failed to load movies.');
      }
      setLoading(false);
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearchTerm]);

  const isSearching = Boolean(debouncedSearchTerm.trim());

  return (
    <div className="home-container space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
            {isSearching ? `Search Results for "${debouncedSearchTerm.trim()}"` : 'Trending Movies'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isSearching
              ? 'Showing matching titles from our movie database.'
              : 'Explore the latest popular titles and trending series.'}
          </p>
        </div>
        {!loading && !error && (
          <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 self-start sm:self-auto">
            {movies.length} {movies.length === 1 ? 'title' : 'titles'}
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

      {!loading && !error && movies.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/30 p-12 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xl">
            🔍
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white font-heading">No movies found</h2>
            <p className="text-sm text-slate-400">
              No matching results found for "{debouncedSearchTerm}". Try another keyword.
            </p>
          </div>
          {onClearSearch && (
            <button
              type="button"
              onClick={onClearSearch}
              className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition"
            >
              Back to Trending
            </button>
          )}
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};
