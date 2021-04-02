<script>
  import { operationStore, query } from "@urql/svelte"
  import { link } from 'svelte-spa-router'
  import Spinner from '../components/Spinner.svelte'
  import MovieThumbnail from '../components/MovieThumbnail.svelte'

  // Accept incoming Parameters
  export let params

  // Store id
  const id = params.id;

  // graphQL query
  const getActor = operationStore(`
    query{
      getActor(id: "${id}"){
        id
        name
        gender
        image
        nationality
        acts_in {
          id
          title
          length
          image
        }
      }
    }
  `);

  // Execute query
  query(getActor)

  // DevLogs
  $: console.log("Page Params:", params)
  $: console.log("Actor Data:", $getActor.data?.getActor )
  $: actor = $getActor.data?.getActor
</script>


<div class="container">
  {#if $getActor.fetching}
  <Spinner class="tile"/> 
  {:else if $getActor.error}
  <div class="tile notification is-danger m-5">
    Oh no! {$getActor.error.message}
  </div>
  {:else if !$getActor.data}
  <div class="tile notification is-info m-5">
    No data
  </div>
  {:else}
  
  <div class="is-flex is-justify-content-center is-flex-direction-row m-4">
    <figure class="image is-128x128 ">
      <img class="is-rounded" src="{ actor.image || 'https://randomuser.me/api/portraits/women/73.jpg' }" alt="Mugshot { actor.name }" />
    </figure>
    <div class="content p-4">
      <h2 class="title">{actor.name}</h2>
      <h3 class="subtitle">{actor.nationality}</h3>
    </div>
  </div>

  <div class="is-flex is-flex-direction-column">
    <h3 class="title is-3 mx-4">
      Filmography
    </h3>

    {#each actor.acts_in as movie}
    <div class="tile notification is-flex is-flex-direction-column">
      <MovieThumbnail image={movie.image} length={movie.lenght}/>
      <a href="/movies/{movie.id}" alt="go to {movie.title}" use:link>{movie.title}</a>
    </div>
    {/each}
  </div>

{/if}
</div>
