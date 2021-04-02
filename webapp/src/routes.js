import Home from "./routes/Home.svelte";
import Actors from "./routes/Actors.svelte";
import Actor from "./routes/Actor.svelte";
import Movies from "./routes/Movies.svelte";
import Movie from "./routes/Movie.svelte";
import NotFound from "./routes/NotFound.svelte";

export const routes = {
  // Exact path
  "/": Home,

  // Actor Index
  "/actors/": Actors,

  // Actor Detail TODO: slug is friendlier
  "/actors/:id?": Actor,

  // Movie Index
  "/movies/": Movies,

  // Movie Detail TODO: slug is friendlier
  "/movies/:id?": Movie,

  // Catch-all
  "*": NotFound,
};
