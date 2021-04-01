<script>
  import { operationStore, query } from "@urql/svelte";
  import {  timeConvert } from '../utils.js';

  const movies = operationStore(`
    {
      queryMovie {
        id
        title
        length
        actors {
          id
          name
          nationality
       }
      }
    }
  `);
  query(movies);

</script>

<style lang="scss"> 
  figure {
    position: relative;
    width: 128px;

    figcaption {
      position: absolute;
      bottom: 5px;
      right: 5px;
      z-index: 2;
    }
  }
</style>

<div class="container">
  <h2 class="title mx-4">
    Movies
  </h2>

  {#if $movies.fetching}
    Loading...
  {:else if $movies.error}
    Oh no! {$movies.error.message}
  {:else if !$movies.data}
    No data
  {:else}
  <div class="tile is-parent">
    {#each $movies.data.queryMovie as movie}
    <div class="tile notification is-flex is-flex-direction-row mx-4">
      <figure class="image">
        <img src="/images/movies/small/mandelorian.jpg" alt="poster { movie.title }" />
        <figcaption class="tag">{ timeConvert(movie.length) }</figcaption>
      </figure>
      <div class="conten mx-3">
        <h3 class="title is-4">{movie.title}</h3>
        <p>
        Cast<br />
        {#each movie.actors as actor} <a class="mr-2" href="">{actor.name}</a> {/each}

        </p>
      </div>
    </div>
    {/each}
  </div>
  {/if}
</div>


