import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition duration-200">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
            No Poster Available
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-white">
          {movie.title}
        </h3>
        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
          <span>{movie.year || 'N/A'}</span>
          {movie.rating && movie.rating !== 'N/A' && (
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              ★ {movie.rating}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
