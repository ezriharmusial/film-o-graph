<script>
  import MovieThumbnail from '../components/MovieThumbnail.svelte'
  import { operationStore, query } from "@urql/svelte"
  import { link } from 'svelte-spa-router'

  // Accept incoming Parameters
  export let params

  // graphQL query
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

  // Execute query
  query(movies)

  // DevLogs
  $: console.log("Page Params:", params)
  $: console.log("Movies Data:", $movies.data?.queryActor)
</script>


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
      <MovieThumbnail title={movie.title} length={movie.length} />
      <div class="conten mx-3">
        <h3 class="title is-4">{movie.title}</h3>
        <p>
          Cast<br />
          {#each movie.actors as actor} <a class="mr-2" href="/actors/{ actor.id }" use:link>{actor.name}</a> {/each}
        </p>
      </div>
    </div>
    {/each}
  </div>
  {/if}
</div>


