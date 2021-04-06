<script>
  import MovieThumbnail from '../components/MovieThumbnail.svelte'
  import { link } from 'svelte-spa-router'
  import Spinner from '../components/Spinner.svelte'
  import Fa from 'svelte-fa';
  import { faPlus } from '@fortawesome/free-solid-svg-icons';
  import { operationStore, query, mutation } from "@urql/svelte";
  import { MOVIES_QUERY, ADD_MOVIES } from "../graphql.js";

  $: movies = query(
    operationStore(  
      MOVIES_QUERY,
      {},
      { requestPolicy: "cache-and-network" }
    )
  );

  function addMovie() {
    mutation({ query: ADD_MOVIES });
  }

  // DevLogs
  $: console.log("Movielist:", $movies.data?.queryMovie)
</script>

<div class="container">
  <h2 class="title mx-4">
    Movies
  </h2>
  <div class="columns is-multiline">
    
  {#if $movies.fetching}
    <Spinner class="column is-full"/> 
  {:else if $movies.error}
    <div class="column is-full notification is-danger m-5">
      Oh no! { $movies.error.message }
    </div> 
  {:else if !$movies.data}
    <div class="column is-full notification is-info m-5">
      No data
    </div> 
  {:else}
    {#each $movies.data.queryMovie as movie}
    <div class="column is-one-forth is-one-third-tablet is-flex is-flex-direction-row">
      <MovieThumbnail movie={movie} />
      <div class="content mx-5">
        <h3 class="title is-4"><a class="mr-2" href="/movies/{ movie.id }" use:link>{ movie.title }</a></h3>
        <p>
          Cast<br />
          {#each movie.actors as actor} <a class="mr-2" href="/actors/{ actor.id }" use:link>{ actor.name }</a> {/each}
        </p>
      </div>
    </div>
    {/each}
    <div class="column is-one-forth is-one-third-tablet is-flex is-flex-direction-column"> 
      <Fa class="m-4" icon={ faPlus } size="4x" />
      <button class="button is-info"><Fa class="m-4" icon={ faPlus } />Add Movie</button>
    </div>
  {/if}
  </div>
</div>


