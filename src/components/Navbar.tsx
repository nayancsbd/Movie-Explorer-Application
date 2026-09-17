import { useState } from 'react';
import type { NavigationItem } from '../types';

interface NavbarProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

const navItems: NavigationItem[] = [
  { name: 'Discover', href: '#' },
  { name: 'Trending', href: '#' },
  { name: 'Top Rated', href: '#' },
  { name: 'Genres', href: '#' },
];

export const Navbar = ({ searchTerm = '', onSearchChange }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="app-navbar">
      <div className="navbar-container">
        <a href="#" className="nav-brand" aria-label="CinePulse Home">
          <div className="brand-logo-badge">
            <div className="brand-logo-inner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 3v18" />
                <path d="M3 7.5h4" />
                <path d="M3 12h18" />
                <path d="M3 16.5h4" />
                <path d="M17 3v18" />
                <path d="M17 7.5h4" />
                <path d="M17 16.5h4" />
              </svg>
            </div>
          </div>
          <span className="brand-name">CinePulse</span>
          <span className="brand-pill">Explorer</span>
        </a>

        <nav className="navbar-menu" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a key={item.name} href={item.href}>
              {item.name}
            </a>
          ))}
        </nav>

        <div className="navbar-right">
          <div className="search-box">
            <span className="search-icon-left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search movies, shows..."
              className="search-box-input"
            />
            {searchTerm ? (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="search-clear-btn"
                aria-label="Clear search"
              >
                ×
              </button>
            ) : (
              <span className="search-shortcut-badge">⌘K</span>
            )}
          </div>

          <button type="button" className="btn-action">
            Watchlist
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn-mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search movies, shows..."
              className="search-box-input"
              style={{ width: '100%' }}
            />
          </div>
          <nav aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                <span>{item.name}</span>
                <span>→</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
