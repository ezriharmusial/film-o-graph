<script>
  import ProfileCard from '../components/ProfileCard.svelte'
  import Spinner from '../components/Spinner.svelte'
  import Fa from 'svelte-fa';
  import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
  import { operationStore, query, mutation } from "@urql/svelte";
  import { ACTORS_QUERY, ADD_ACTORS } from "../graphql.js";

  $: actors = query(
    operationStore(  
      ACTORS_QUERY,
      {},
      { requestPolicy: "cache-and-network" }
    )
  );

  function addActors() {
    mutation({ query: ADD_ACTORS });
  }

  // DevLogs
  $: console.log("Actorlist", $actors.data?.queryActor)
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

<div class="container">
  <h2 class="title mx-4">
    Actors
  </h2>
  <div class="columns is-multiline">

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
    <div class="column is-one-forth is-one-third-tablet">
      <ProfileCard actor={actor} />
    </div>
  {/each}
    <div class="column is-one-forth is-one-third-tablet"> 
      <div class="profile-card is-one-third is-flex is-flex-direction-column mx-4">
        <Fa class="m-4" icon={ faUserPlus } size="4x" />
        <button class="button is-info">
          <span class="icon">
            <Fa class="m-4" icon={ faUserPlus }/>
          </span>  
          <span>Add Actor</span>
        </button>
      </div>
    </div>
  {/if}
  </div>
</div>
