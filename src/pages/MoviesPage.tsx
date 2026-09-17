import { useEffect, useState, useMemo } from 'react';
import { MovieCard, MovieDetailsModal } from '../components';
import { useDebounce } from '../hooks';
import { getTrendingMovies, searchMovies } from '../services';
import type { Movie } from '../types';

interface MoviesPageProps {
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
}

export const MoviesPage = ({ searchTerm: externalSearch = '', onSearchChange }: MoviesPageProps) => {
  const [internalSearch, setInternalSearch] = useState(externalSearch);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // Keep internal and external search in sync if passed
  const activeSearch = onSearchChange ? externalSearch : internalSearch;
  const handleSearchChange = (val: string) => {
    if (onSearchChange) {
      onSearchChange(val);
    }
    setInternalSearch(val);
  };

  const debouncedQuery = useDebounce(activeSearch, 400);

  // Fetch movies based on search query or default list
  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      setLoading(true);
      setError(null);

      const query = debouncedQuery.trim();
      const response = query ? await searchMovies(query) : await getTrendingMovies();

      if (!isMounted) return;

      if (response.status >= 200 && response.status < 300) {
        setMovies(response.data);
      } else {
        setError(response.message || 'Failed to load movies from API.');
      }
      setLoading(false);
    };

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  // Extract available genres from current movies
  const availableGenres = useMemo(() => {
    const genreSet = new Set<string>();
    movies.forEach((m) => {
      m.genres?.forEach((g) => genreSet.add(g));
    });
    return ['All', ...Array.from(genreSet).sort()];
  }, [movies]);

  // Filter movies by genre if a genre is selected
  const displayedMovies = useMemo(() => {
    if (selectedGenre === 'All') return movies;
    return movies.filter((m) => m.genres?.includes(selectedGenre));
  }, [movies, selectedGenre]);

  const isSearching = Boolean(debouncedQuery.trim());

  return (
    <div className="space-y-8 pb-12">
      {/* Prominent Search Bar Section matching wireframe */}
      <div className="relative max-w-3xl mx-auto">
        <div className="relative flex items-center rounded-2xl border border-slate-700 bg-slate-900/90 shadow-xl shadow-black/40 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <span className="pl-5 pr-2 text-slate-400 text-lg">
            🔍
          </span>
          <input
            type="text"
            id="movie-search-input"
            value={activeSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full py-4 pr-12 text-base bg-transparent text-white placeholder-slate-400 focus:outline-none"
            autoFocus={false}
          />
          {activeSearch && (
            <button
              type="button"
              id="clear-search-btn"
              onClick={() => handleSearchChange('')}
              className="absolute right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search status & quick hint */}
        <div className="mt-2.5 px-2 flex items-center justify-between text-xs text-slate-400">
          <span>
            {isSearching
              ? `Results for "${debouncedQuery}"`
              : 'Showing all popular titles from TVMaze'}
          </span>
          {!loading && (
            <span>
              {displayedMovies.length} {displayedMovies.length === 1 ? 'title' : 'titles'} found
            </span>
          )}
        </div>
      </div>

      {/* Genre Filter Pills */}
      {availableGenres.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            Genre:
          </span>
          {availableGenres.slice(0, 10).map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setSelectedGenre(genre)}
              className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                selectedGenre === genre
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {/* Loading Skeleton Grid */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/40 p-3 space-y-4"
            >
              <div className="aspect-[2/3] w-full rounded-xl bg-slate-800" />
              <div className="h-4 w-3/4 rounded bg-slate-800" />
              <div className="h-3 w-1/2 rounded bg-slate-800" />
              <div className="h-9 w-full rounded-xl bg-slate-800" />
            </div>
          ))}
        </div>
      )}

      {/* Error Message with Retry */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-900/50 bg-rose-950/20 p-8 text-center space-y-3">
          <span className="text-3xl">⚠️</span>
          <p className="text-rose-300 text-sm font-medium">{error}</p>
          <button
            type="button"
            onClick={() => handleSearchChange(activeSearch)}
            className="rounded-xl bg-slate-800 border border-slate-700 px-5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
          >
            Retry Fetch
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && displayedMovies.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-2xl text-slate-400">
            🔍
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-heading">No movies found</h3>
            <p className="text-sm text-slate-400">
              {isSearching
                ? `We couldn't find any titles matching "${debouncedQuery}". Try another keyword or remove filters.`
                : 'No movies found in this genre.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              handleSearchChange('');
              setSelectedGenre('All');
            }}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-xs font-semibold text-white transition shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Responsive Movie Grid matching wireframe requirement */}
      {!loading && !error && displayedMovies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={(m) => setSelectedMovie(m)}
            />
          ))}
        </div>
      )}

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};
