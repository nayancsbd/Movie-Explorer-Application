import { useState } from 'react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onSelect?: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);

  const formattedRating =
    movie.rating !== undefined && movie.rating !== null && movie.rating !== 'N/A'
      ? typeof movie.rating === 'number'
        ? movie.rating.toFixed(1)
        : movie.rating
      : 'N/A';

  const displayYear = movie.year || movie.releaseYear || 'N/A';

  return (
    <div className="movie-card group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/40 transition-all duration-300">
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        {movie.poster && !imageError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center bg-slate-900 text-slate-500">
            <span className="text-3xl mb-2">🎬</span>
            <span className="text-xs font-medium text-slate-400">{movie.title}</span>
            <span className="text-[10px] text-slate-600 mt-1">No Poster Available</span>
          </div>
        )}

        {/* Rating Badge Overlay */}
        <div className="absolute top-2.5 right-2.5 rounded-full bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-400/20 shadow-md flex items-center gap-1">
          <span>⭐</span>
          <span>{formattedRating}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-4 gap-3">
        <div>
          <h3
            className="line-clamp-1 text-base font-bold text-white group-hover:text-indigo-300 transition-colors"
            title={movie.title}
          >
            {movie.title}
          </h3>

          {/* Rating & Release Year line matching wireframe */}
          <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-amber-400">
              ⭐ {formattedRating}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              📅 {displayYear}
            </span>
          </div>

          {/* Genre Badges */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {movie.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-700/50"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Wireframe Button: [ See Details ] */}
        <button
          type="button"
          onClick={() => onSelect?.(movie)}
          className="mt-1 w-full rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white py-2.5 px-3 text-xs font-semibold tracking-wide border border-slate-700 hover:border-indigo-500 shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer group/btn"
          aria-label={`See details for ${movie.title}`}
        >
          <span>See Details</span>
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
