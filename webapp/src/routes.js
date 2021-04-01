import Home from "./routes/Home.svelte";
import Movies from "./routes/Movies.svelte";
import Actors from "./routes/Actors.svelte";
import NotFound from "./routes/NotFound.svelte";

export const routes = {
  // Exact path
  "/": Home,

  // Movie Detail
  "/movies/:slug?": Movies,

  // Actor Detail
  "/actors/:slug?": Actors,

  // Catch-all
  "*": NotFound,
};
