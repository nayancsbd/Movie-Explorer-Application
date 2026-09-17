import type { ApiResponse, Movie } from '../types';

export const API_BASE_URL = 'https://api.tvmaze.com';

export interface TvMazeShowRaw {
  id: number;
  name: string;
  premiered?: string;
  ended?: string;
  runtime?: number | null;
  averageRuntime?: number | null;
  language?: string;
  status?: string;
  officialSite?: string | null;
  network?: {
    name?: string;
    country?: { name?: string; code?: string; timezone?: string };
  } | null;
  webChannel?: {
    name?: string;
    country?: { name?: string; code?: string; timezone?: string } | null;
  } | null;
  externals?: {
    imdb?: string | null;
  };
  image?: {
    medium?: string;
    original?: string;
  } | null;
  rating?: {
    average?: number | null;
  };
  genres?: string[];
  summary?: string | null;
}

export interface TvMazeSearchItemRaw {
  score: number;
  show: TvMazeShowRaw;
}

export const formatShowToMovie = (show: TvMazeShowRaw): Movie => {
  const poster = show.image?.original || show.image?.medium || '';
  const backdropUrl = show.image?.original || show.image?.medium || '';
  const year = show.premiered ? show.premiered.split('-')[0] : 'N/A';
  const overview = show.summary
    ? show.summary.replace(/<[^>]*>/g, '').trim()
    : 'No summary available for this title.';

  const networkName = show.network?.name || show.webChannel?.name || 'Unknown Network';

  return {
    id: show.id,
    title: show.name,
    poster,
    posterUrl: poster,
    backdropUrl,
    year,
    releaseYear: year,
    rating: show.rating?.average !== null && show.rating?.average !== undefined
      ? show.rating.average
      : 'N/A',
    genres: show.genres && show.genres.length > 0 ? show.genres : ['Drama'],
    overview,
    summary: show.summary || undefined,
    runtime: show.runtime || show.averageRuntime || 'N/A',
    language: show.language || 'English',
    status: show.status || 'Released',
    premiered: show.premiered || 'N/A',
    officialSite: show.officialSite || undefined,
    network: networkName,
    imdbId: show.externals?.imdb || undefined,
  };
};

export const getTrendingMovies = async (): Promise<ApiResponse<Movie[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows`);
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
    const movies = rawShows.slice(0, 50).map(formatShowToMovie);

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

export const getShowById = async (id: number | string): Promise<Movie | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows/${id}`);
    if (!response.ok) {
      return null;
    }
    const rawShow: TvMazeShowRaw = await response.json();
    return formatShowToMovie(rawShow);
  } catch {
    return null;
  }
};

export const getInitialMovies = getTrendingMovies;
export const searchMoviesByKeyword = searchMovies;
