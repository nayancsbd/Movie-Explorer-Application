export interface Movie {
  id: number | string;
  title: string;
  poster: string;
  posterUrl?: string;
  backdropUrl?: string;
  year: string | number;
  releaseYear?: string | number;
  rating?: number | string;
  genres?: string[];
  overview?: string;
  summary?: string;
  runtime?: number | string;
  language?: string;
  status?: string;
  premiered?: string;
  officialSite?: string;
  network?: string;
  imdbId?: string;
}

export interface ApiResponse<T = Movie[]> {
  data: T;
  results?: T;
  status: number;
  message?: string;
  total?: number;
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
