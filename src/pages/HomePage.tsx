export const HomePage = () => {
  return (
    <div>
      <section className="hero-card">
        <span className="hero-badge">🎬 Welcome to CinePulse.</span>

        <h1 className="hero-title">
          Discover Your Next <br />
          <span className="hero-title-highlight">Cinematic Obsession</span>
        </h1>

        <p className="hero-desc">
          Explore thousands of movies, discover hidden gems, track your watchlist, and delve into verified ratings with a lightning-fast modern interface.
        </p>

        <div className="hero-btn-group">
          <button type="button" className="btn-hero-primary">
            Explore Catalog →
          </button>
          <button type="button" className="btn-hero-secondary">
            Learn More
          </button>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <h2>Real-Time Search</h2>
          <p>Search titles, directors, actors, and genres with fast debounced queries and instant feedback.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h2>Curated Collections</h2>
          <p>Browse top-rated cinema, trending television series, and handpicked genre recommendations.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
          </div>
          <h2>Rich Metadata</h2>
          <p>Explore summaries, high-resolution poster artwork, release years, runtimes, and genre tags.</p>
        </div>
      </section>
    </div>
  );
};
