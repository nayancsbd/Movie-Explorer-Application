import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

interface NavbarProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export const Navbar = ({ searchTerm = '', onSearchChange }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.location.pathname !== '/movies') {
      navigate('/movies');
    }
  };

  return (
    <header className="app-navbar">
      <div className="navbar-container">
        {/* Brand Logo matching wireframe: 🎬 MovieExplorer */}
        <Link to="/" className="nav-brand" aria-label="MovieExplorer Home">
          <div className="brand-logo-badge">
            <span className="text-xl" role="img" aria-label="Clapperboard">🎬</span>
          </div>
          <span className="brand-name font-bold tracking-tight text-white text-lg sm:text-xl">
            Movie<span className="text-indigo-400">Explorer</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-menu hidden md:flex items-center gap-6" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-indigo-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-indigo-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            Movies
          </NavLink>
        </nav>

        {/* Right Section with Search & Prominent [ Movies ] Button */}
        <div className="navbar-right flex items-center gap-3">
          {onSearchChange && (
            <form onSubmit={handleSearchSubmit} className="hidden sm:block">
              <div className="search-box relative flex items-center">
                <span className="search-icon-left text-slate-400 pl-3">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => {
                    if (window.location.pathname !== '/movies') {
                      navigate('/movies');
                    }
                  }}
                  placeholder="Search movies..."
                  className="search-box-input bg-slate-900/80 border border-slate-700/80 rounded-full py-1.5 pl-9 pr-8 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-44 lg:w-56 transition-all"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 text-slate-400 hover:text-white text-xs"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Prominent CTA button matching Wireframe: [ Movies ] */}
          <Link
            to="/movies"
            id="nav-movies-btn"
            className="btn-action inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg shadow-lg shadow-indigo-600/20 transition duration-200"
          >
            <span>Movies</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn-mobile-menu md:hidden text-slate-300 hover:text-white p-2 rounded-lg border border-slate-800 bg-slate-900/60"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" height="2" />
                <line x1="4" x2="20" y1="6" />
                <line x1="4" x2="20" y1="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
          {onSearchChange && (
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (window.location.pathname !== '/movies') {
                    navigate('/movies');
                  }
                }}
                placeholder="Search movies..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
          <nav className="flex flex-col gap-2 pt-1" aria-label="Mobile Navigation">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white text-sm"
            >
              <span>Home</span>
              <span>→</span>
            </Link>
            <Link
              to="/movies"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg text-indigo-400 bg-indigo-950/30 border border-indigo-900/40 text-sm font-medium"
            >
              <span>Browse All Movies</span>
              <span>→</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
