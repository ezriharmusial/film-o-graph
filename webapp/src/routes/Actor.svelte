<script>
  import { operationStore, query } from "@urql/svelte"
  import { link } from 'svelte-spa-router'
  import Spinner from '../components/Spinner.svelte'
  import ActorDetails from '../components/ActorDetails.svelte'
  import MovieThumbnail from '../components/MovieThumbnail.svelte'
	import { fade } from 'svelte/transition';
  import { ACTOR_QUERY } from "../graphql.js";

  // Accept incoming Parameters
  export let params

  $: id = params.id
  $: actor = query(
    operationStore(  
      ACTOR_QUERY,
      { id },
      { requestPolicy: "cache-and-network" }
    )
  );

  function updateActor() {
    console.log('Update Actor')
    //mutation({ query: UPDATE_ACTOR});
  }

  function deleteActor() {
    console.log('Delete Actor')
    //mutation({ query: DELETE_ACTOR, variables: { id } });
  }

  $: console.log("Page Params:", params)
  $: console.log("Actor Data:", $actor.data?.getActor )

</script>


<div class="container" transition:fade>
  {#if $actor.fetching}
  <Spinner class="tile"/> 
  {:else if $actor.error}
  <div class="tile notification is-danger m-5">
    Oh no! {$actor.error.message}
  </div>
  {:else if !$actor.data}
  <div class="tile notification is-info m-5">
    No data
  </div>
  {:else}

  <ActorDetails actor={$actor} />

  <div class="is-flex is-flex-direction-column">
    <h3 class="title is-3 mx-4">
      Filmography
    </h3>

    {#each $actor.data.getActor.acts_in as movie}
    <div class="tile notification is-flex is-flex-direction-column">
      <MovieThumbnail image={movie.image} length={movie.lenght}/>
      <a href="/movies/{movie.id}" alt="go to {movie.title}" use:link>{movie.title}</a>
    </div>
    {/each}
  </div>

{/if}
</div>
