export type MediaType = "book" | "movie" | "tv" | "game";

export interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string | null;
  review: number | null;
}

export interface Movie {
  id: number;
  title: string;
  director: string;
  poster_url: string | null;
  review: number | null;
}

export interface TvShow {
  id: number;
  title: string;
  streaming_service: string;
  poster_url: string | null;
  review: number | null;
}

export interface Game {
  id: number;
  title: string;
  studio: string;
  poster_url: string | null;
  review: number | null;
}

export interface BacklogItem {
  id: number;
  title: string;
  media_type: MediaType;
  poster_url: string | null;
  summary: string | null;
  likes: number;
}
