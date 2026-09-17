export interface Movie {
  id: string | number;
  title: string;
  overview?: string;
  posterUrl?: string;
  backdropUrl?: string;
  releaseYear?: number | string;
  rating?: number;
  genres?: string[];
  runtime?: number | string;
}

export interface Genre {
  id: number | string;
  name: string;
}

export interface SearchFilterState {
  query: string;
  selectedGenre?: string;
  sortBy?: 'popularity' | 'rating' | 'release_date';
}

export interface NavigationItem {
  name: string;
  href: string;
  badge?: string;
}
