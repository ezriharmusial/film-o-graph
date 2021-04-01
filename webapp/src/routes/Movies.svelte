<script>
  import { operationStore, query } from "@urql/svelte";
  
  export let params;

  const movies = operationStore(`
    {
      queryMovie {
        id
        title
        length
        actors {
          name
          nationality
       }
      }
    }
  `);
  query(movies);
$: console.log($movies.data?.queryMovie)
</script>



  <h2 class="title">
    Movies
  </h2>
  <div>
  {#if $movies.fetching}
    Loading...
  {:else if $movies.error}
    Oh no! {$movies.error.message}
  {:else if !$movies.data}
    No data
  {:else}
    <div class="grid-container">
      {#each $movies.data.queryMovie as movie}
        <div class="grid-item">
          <div>title - {movie.title}</div>
        </div>
      {/each}
    </div>
  {/if}
</div>
