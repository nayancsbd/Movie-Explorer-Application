import { useEffect } from 'react';
import type { Movie } from '../types';

interface MovieDetailsModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export const MovieDetailsModal = ({ movie, onClose }: MovieDetailsModalProps) => {
  // Handle ESC key and prevent body scrolling when modal is open
  useEffect(() => {
    if (!movie) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const formattedRating =
    movie.rating !== undefined && movie.rating !== null && movie.rating !== 'N/A'
      ? typeof movie.rating === 'number'
        ? movie.rating.toFixed(1)
        : movie.rating
      : 'N/A';

  const displayDate = movie.premiered || movie.year || movie.releaseYear || 'N/A';
  const backdropImage = movie.backdropUrl || movie.poster;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-movie-title"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl shadow-black/80 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Close Button [ ✕ ] */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 z-10">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎬</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Movie Details
            </span>
          </div>
          <button
            type="button"
            id="modal-top-close-btn"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Movie Backdrop / Poster Hero */}
          <div className="relative w-full h-56 sm:h-72 md:h-80 bg-slate-950 overflow-hidden">
            {backdropImage ? (
              <img
                src={backdropImage}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 text-slate-500">
                <span className="text-5xl mb-2">🎬</span>
                <span className="text-sm font-medium text-slate-400">Movie Backdrop</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

            {/* Poster thumbnail badge overlay on desktop */}
            {movie.poster && (
              <div className="absolute bottom-4 left-5 hidden sm:block w-20 h-28 rounded-lg overflow-hidden shadow-2xl border border-slate-700/60">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Details Body */}
          <div className="p-5 sm:p-6 sm:pl-28 space-y-4">
            {/* Movie Title */}
            <div>
              <h2
                id="modal-movie-title"
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading"
              >
                {movie.title}
              </h2>

              {/* Wireframe format: ⭐ Rating: 8.5   |   📅 Release: 2024 */}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-semibold">
                <span className="inline-flex items-center gap-1.5 text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                  <span>⭐ Rating:</span>
                  <span>{formattedRating}</span>
                </span>
                <span className="text-slate-600">|</span>
                <span className="inline-flex items-center gap-1.5 text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
                  <span>📅 Release:</span>
                  <span>{displayDate}</span>
                </span>
              </div>
            </div>

            {/* Metadata Pills (Genres, Runtime, Language, Status) */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              {movie.genres && movie.genres.length > 0 && (
                movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-md bg-indigo-950/60 border border-indigo-800/50 px-2.5 py-1 font-medium text-indigo-300"
                  >
                    {genre}
                  </span>
                ))
              )}
              {movie.runtime && movie.runtime !== 'N/A' && (
                <span className="rounded-md bg-slate-800 border border-slate-700 px-2.5 py-1 text-slate-300">
                  ⏱️ {movie.runtime} min
                </span>
              )}
              {movie.language && (
                <span className="rounded-md bg-slate-800 border border-slate-700 px-2.5 py-1 text-slate-300">
                  🌐 {movie.language}
                </span>
              )}
              {movie.status && (
                <span className="rounded-md bg-emerald-950/50 border border-emerald-800/50 px-2.5 py-1 text-emerald-300 font-medium">
                  ● {movie.status}
                </span>
              )}
              {movie.network && (
                <span className="rounded-md bg-slate-800 border border-slate-700 px-2.5 py-1 text-slate-300">
                  📡 {movie.network}
                </span>
              )}
            </div>

            {/* Overview / Summary Section */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {movie.overview || 'No synopsis available for this title.'}
              </p>
            </div>

            {/* External Links if available */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              {movie.officialSite && (
                <a
                  href={movie.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
                >
                  <span>Official Website</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
              {movie.imdbId && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  <span>View on IMDb</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer matching wireframe: [ ❌ Close ] */}
        <div className="flex items-center justify-end px-6 py-3.5 border-t border-slate-800 bg-slate-900/90">
          <button
            type="button"
            id="modal-bottom-close-btn"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold border border-slate-700 shadow-md transition-colors cursor-pointer"
          >
            <span>❌</span>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
