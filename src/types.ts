export interface Movie {
  id: number | string;
  title: string;
  poster: string;
  year: string | number;
  rating?: number | string;
  genres?: string[];
  overview?: string;
  posterUrl?: string;
  releaseYear?: string | number;
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
