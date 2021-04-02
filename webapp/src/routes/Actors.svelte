<script>
  import ProfileCard from '../components/ProfileCard.svelte'
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

<style>
.profile-card {
  display:flex;
  width: 200px;
  border-radius: 1rem;
  color: grey;
  align-items: center;
  justify-content: center;  
}
</style>

  <div class="columns is-multiline">
     <div class="column is-full">
      <h2 class="title mx-4">
        Actors
      </h2>
    </div>

  {#if $actors.fetching}
    <Spinner class="column is-full"/> 
  {:else if $actors.error}
    <div class="column is-full notification is-danger m-5">
      Oh no! {$actors.error.message}
    </div>
  {:else if !$actors.data}
    <div class="column is-full notification is-info m-5">
      No data
    </div>
  {:else}
    {#each $actors.data.queryActor as actor}
      <ProfileCard actor={actor} class="column"/>
    {/each}
    <div class="column profile-card is-flex is-flex-direction-column mx-4">
      <Fa class="m-4" icon={ faUserPlus } size="4x" />
      <button class="button is-info">Add Actor</button>
    </div>
  {/if}
  </div>
