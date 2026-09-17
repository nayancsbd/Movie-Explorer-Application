import type { ApiResponse, Movie } from '../types';

export const API_BASE_URL = 'https://api.tvmaze.com';

interface TvMazeShowRaw {
  id: number;
  name: string;
  premiered?: string;
  image?: {
    medium?: string;
    original?: string;
  } | null;
  rating?: {
    average?: number;
  };
  genres?: string[];
  summary?: string;
}

interface TvMazeSearchItemRaw {
  score: number;
  show: TvMazeShowRaw;
}

const formatShowToMovie = (show: TvMazeShowRaw): Movie => {
  const poster = show.image?.original || show.image?.medium || '';
  const year = show.premiered ? show.premiered.split('-')[0] : 'N/A';
  const overview = show.summary ? show.summary.replace(/<[^>]*>/g, '').trim() : '';

  return {
    id: show.id,
    title: show.name,
    poster,
    year,
    rating: show.rating?.average ?? 'N/A',
    genres: show.genres || [],
    overview,
    posterUrl: poster,
    releaseYear: year,
  };
};

export const getTrendingMovies = async (): Promise<ApiResponse<Movie[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows?page=0`);
    if (!response.ok) {
      return {
        data: [],
        results: [],
        status: response.status,
        message: `Error: ${response.statusText}`,
        total: 0,
      };
    }

    const rawShows: TvMazeShowRaw[] = await response.json();
    const movies = rawShows.slice(0, 30).map(formatShowToMovie);

    return {
      data: movies,
      results: movies,
      status: response.status,
      total: movies.length,
    };
  } catch (error) {
    return {
      data: [],
      results: [],
      status: 500,
      message: error instanceof Error ? error.message : 'Unknown network error',
      total: 0,
    };
  }
};

export const searchMovies = async (query: string): Promise<ApiResponse<Movie[]>> => {
  const trimmed = query.trim();
  if (!trimmed) {
    return getTrendingMovies();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/search/shows?q=${encodeURIComponent(trimmed)}`);
    if (!response.ok) {
      return {
        data: [],
        results: [],
        status: response.status,
        message: `Error: ${response.statusText}`,
        total: 0,
      };
    }

    const rawItems: TvMazeSearchItemRaw[] = await response.json();
    const movies = rawItems.map((item) => formatShowToMovie(item.show));

    return {
      data: movies,
      results: movies,
      status: response.status,
      total: movies.length,
    };
  } catch (error) {
    return {
      data: [],
      results: [],
      status: 500,
      message: error instanceof Error ? error.message : 'Unknown network error',
      total: 0,
    };
  }
};

export const getInitialMovies = getTrendingMovies;
export const searchMoviesByKeyword = searchMovies;
