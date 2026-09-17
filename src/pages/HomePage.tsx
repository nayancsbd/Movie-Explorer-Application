import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieCard, MovieDetailsModal } from '../components';
import { getTrendingMovies } from '../services';
import type { Movie } from '../types';

export const HomePage = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchFeatured = async () => {
      const res = await getTrendingMovies();
      if (isMounted && res.data) {
        setFeaturedMovies(res.data.slice(0, 4));
        setLoading(false);
      }
    };
    fetchFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner Section matching wireframe with movie background image */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 p-8 sm:p-14 md:p-18 text-center shadow-2xl">
        {/* Cinematic Movie Background Image with rich gradient overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-cinema-bg.jpg"
            alt="Cinema auditorium with movie projector and audience"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.35] contrast-[1.2]"
          />
          {/* Multi-layered dark gradients to ensure perfect text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90" />
          <div className="absolute inset-0 bg-indigo-950/25 mix-blend-multiply" />
        </div>

        {/* Ambient glow effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide">
            <span>🎬</span>
            <span>Welcome to MovieExplorer</span>
          </div>

          {/* Wireframe Heading: DISCOVER MOVIES */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-heading uppercase leading-tight">
            Discover <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Movies</span>
          </h1>

          {/* Wireframe Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Explore and discover your favorite movies and TV shows from around the world. Browse comprehensive databases, verified ratings, and behind-the-scenes data.
          </p>

          {/* Wireframe CTA button: [ Explore Now ] */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/movies"
              id="hero-explore-now-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base px-8 py-3.5 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 transition-all duration-200"
            >
              <span>Explore Now</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={() => {
                const element = document.getElementById('featured-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-semibold text-base px-6 py-3.5 border border-slate-700/80 transition-all duration-200 cursor-pointer"
            >
              <span>Featured Picks</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured / Trending Spotlight Section */}
      <section id="featured-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <span>⭐</span>
              <span>Trending Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 font-heading">
              Featured Titles
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Top curated picks streaming right now across global platforms.
            </p>
          </div>

          <Link
            to="/movies"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
          >
            <span>View All Movies</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Featured Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/40 p-3 space-y-4"
              >
                <div className="aspect-[2/3] w-full rounded-xl bg-slate-800" />
                <div className="h-4 w-3/4 rounded bg-slate-800" />
                <div className="h-3 w-1/2 rounded bg-slate-800" />
                <div className="h-8 w-full rounded-lg bg-slate-800" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={(m) => setSelectedMovie(m)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};
