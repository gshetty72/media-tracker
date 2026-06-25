import { supabase } from "@/lib/supabase";
import LibraryClient from "@/components/LibraryClient";
import type { Book, Movie, TvShow, Game, BacklogItem } from "@/types";

export const revalidate = 60;

async function fetchAll() {
  const [books, movies, tvShows, games, backlog] = await Promise.all([
    supabase.from("books").select("*").order("id"),
    supabase.from("movies").select("*").order("id"),
    supabase.from("tv_shows").select("*").order("id"),
    supabase.from("games").select("*").order("id"),
    supabase.from("backlog").select("*").order("likes", { ascending: false }),
  ]);

  return {
    books: (books.data ?? []) as Book[],
    movies: (movies.data ?? []) as Movie[],
    tvShows: (tvShows.data ?? []) as TvShow[],
    games: (games.data ?? []) as Game[],
    backlog: (backlog.data ?? []) as BacklogItem[],
  };
}

export default async function Home() {
  const { books, movies, tvShows, games, backlog } = await fetchAll();

  return (
    <main className="min-h-screen bg-black">
      <LibraryClient
        books={books}
        movies={movies}
        tvShows={tvShows}
        games={games}
        backlog={backlog}
      />
    </main>
  );
}
