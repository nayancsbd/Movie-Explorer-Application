export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-brand">
              <div className="brand-logo-badge">
                <div className="brand-logo-inner">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            </div>

            <p>
              Your next-generation cinematic explorer. Browse top trending films, TV series, ratings, and behind-the-scenes data all in one unified interface.
            </p>

            <div className="status-badge">
              <span className="status-dot"></span>
              <span>All Systems Operational</span>
            </div>
          </div>

          <div className="footer-col">
            <h3>Explore</h3>
            <ul>
              {['Trending Movies', 'Top Rated', 'Upcoming Releases', 'Popular Series', 'Film Festivals'].map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Genres</h3>
            <ul>
              {['Action & Sci-Fi', 'Drama & Romance', 'Thriller & Mystery', 'Animation & Anime', 'Documentary'].map((genre) => (
                <li key={genre}>
                  <a href="#">{genre}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Platform</h3>
            <ul>
              {['API Documentation', 'Changelog', 'Privacy Policy', 'Terms of Service', 'Support Desk'].map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CinePulse Movie Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
