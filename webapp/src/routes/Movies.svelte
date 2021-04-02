<script>
  import MovieThumbnail from '../components/MovieThumbnail.svelte'
  import { operationStore, query } from "@urql/svelte"
  import { link } from 'svelte-spa-router'
  import Spinner from '../components/Spinner.svelte'
  import Fa from 'svelte-fa';
  import { faPlus } from '@fortawesome/free-solid-svg-icons';

  // graphQL query
  const movies = operationStore(`
    {
      queryMovie {
        id
        title
        image
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
  $: console.log("Movies Data:", $movies.data?.queryActor)
</script>


<div class="container">
  <h2 class="title mx-4">
    Movies
  </h2>

  {#if $movies.fetching}
    <Spinner />
  {:else if $movies.error}
    <div class="notification is-danger m-5">
      Oh no! { $movies.error.message }
    </div> 
  {:else if !$movies.data}
    <div class="notification is-info m-5">
      No data
    </div> 
  {:else}
  <div class="tile is-parent">
    {#each $movies.data.queryMovie as movie}
    <div class="tile notification is-flex is-flex-direction-row mx-4">
      <MovieThumbnail movie={movie} } />
      <div class="content mx-5">
        <h3 class="title is-4">{ movie.title }</h3>
        <p>
          Cast<br />
          {#each movie.actors as actor} <a class="mr-2" href="/actors/{ actor.id }" use:link>{ actor.name }</a> {/each}
        </p>
      </div>
    </div>
    {/each}
    <div class="tile notification is-flex is-flex-direction-column mx-4">
      <Fa class="m-4" icon={ faPlus } size="4x" />
      <button class="button is-info">Add Movie</button>
    </div>
  </div>
  {/if}
</div>


