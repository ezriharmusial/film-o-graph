<script>
  import { operationStore, query } from "@urql/svelte"
  import { link } from 'svelte-spa-router'
  import Spinner from '../components/Spinner.svelte'
  import MovieThumbnail from '../components/MovieThumbnail.svelte'
  import { editMode } from '../stores.js'
	import { fade } from 'svelte/transition';

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
  $: actorImage = 'https://randomuser.me/api/portraits/' + ((actor && actor?.gender || actor?.gender === "1") ? 'men' : 'women') + '/73.jpg'
</script>

<div class="container" transition:fade>
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
      <img class="is-rounded" src="{ actor.image || actorImage }" alt="Mugshot { actor.name }" />
    </figure>
    <div class="content p-4">
      {#if $editMode}
      <span class="block title is-size-4" placeholder="Name" contenteditable="true" bind:textContent={actor.name}></span>
      <span class="block subtitle is-size-5" placeholder="Nationality" contenteditable="true" bind:textContent={actor.nationality}></span>
      <div class="field">
        <div class="control">
          <div class="select">
            <select bind:value={actor.gender}>
              <option value="0">Female</option>
              <option value="1">Male</option>
            </select>
          </div>
        </div>
      </div>
      {:else}
      <h2 class="title">{actor.name}</h2>
      <h3 class="subtitle">{actor.nationality}</h3>
      {/if}
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
