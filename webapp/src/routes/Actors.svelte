<script>
  import { operationStore, query } from "@urql/svelte"
  import { link } from 'svelte-spa-router'
  import Spinner from '../components/Spinner.svelte'

  // Accept incoming Parameters
  export let params

  // graphQL query
  const actors = operationStore(`
    {
      queryActor {
        id
        name
        nationality
        acts_in {
          id
          title
          length
       }
      }
    }
  `);

  // Execute query
  query(actors)

  // DevLogs
  $: console.log("Page Params:", params)
  $: console.log("Actors Data:", $actors.data?.queryActor)
</script>

<div class="container">
  <h2 class="title mx-4">
    Actors
  </h2>

  {#if $actors.fetching}
    <Spinner /> 
  {:else if $actors.error}
    Oh no! {$actors.error.message}
  {:else if !$actors.data}
    No data
  {:else}
  <div class="tile is-parent">
    {#each $actors.data.queryActor as actor}
    <div class="tile notification is-flex is-flex-direction-row mx-4">
      <figure class="image is-128x128 is-rounded">
        <img src="https://randomuser.me/api/portraits/men/{ Math.floor(Math.random() * 100) }.jpg" alt="Mugshot { actor.acts_in.title }" />
      </figure>
      <div class="conten mx-3">
        <h3 class="title is-4">{actor.name}</h3>
        <h4 class="subtitle is-5">{actor.nationality}</h4>
        <p>
          Filmography<br />
          <a class="mr-2" href="/movies/{ actor.acts_in.id }" use:link>{ actor.acts_in.title }</a>
        </p>
      </div>
    </div>
    {/each}
  </div>
  {/if}
</div>


