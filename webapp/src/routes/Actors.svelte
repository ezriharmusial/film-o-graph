<script>
  import { operationStore, query } from "@urql/svelte"
  import { link } from 'svelte-spa-router'
  import Spinner from '../components/Spinner.svelte'
  import Fa from 'svelte-fa';
  import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

  export let params

  // graphQL query
  const actors = operationStore(`
    {
      queryActor {
        id
        name
        gender
        image
        nationality
        acts_in {
          id
          title
          image
          length
       }
      }
    }
  `);

  // Execute query
  query(actors)

  // DevLogs
  $: console.log("Actors Data:", $actors.data?.queryActor)
</script>

<style lang="scss">
.is-parent {
  display: flex;

  .tile {
    flex: 0 0 auto;
    width: 200px;
    border-radius: 1rem;
    color: grey;
    align-items: center;
    justify-content: center;  
  } 
}
</style>

  <div class="tile is-parent flex-direction-row">
     <div class="tile">
      <h2 class="title mx-4">
        Actors
      </h2>
    </div>

  {#if $actors.fetching}
    <Spinner class="tile"/> 
  {:else if $actors.error}
    <div class="tile notification is-danger m-5">
      Oh no! {$actors.error.message}
    </div>
  {:else if !$actors.data}
    <div class="tile notification is-info m-5">
      No data
    </div>
  {:else}
    {#each $actors.data.queryActor as actor}
    <div class="profile-card tile is-flex is-flex-direction-column mx-4">
      <figure class="image">
        <img class="is-rounded" src="https://randomuser.me/api/portraits/men/{ Math.floor(Math.random() * 100) }.jpg" alt="Mugshot { actor.name }" />
      </figure>
      <div class="content has-text-centered p-4">
        <h3 class="title is-4">{actor.name}</h3>
        <h4 class="subtitle is-5">{actor.nationality}</h4>
      </div>
    </div>
    {/each}
    <div class="profile-card tile is-flex is-flex-direction-column mx-4">
      <Fa class="m-4" icon={ faUserPlus } size="4x" />
      <button class="button is-info">Add Actor</button>
    </div>
  {/if}
  </div>
