<script>
  import MovieThumbnail from '../components/MovieThumbnail.svelte'
  import ProfileCard from '../components/ProfileCard.svelte'
  import { operationStore, query } from "@urql/svelte"
  import Spinner from '../components/Spinner.svelte'

  // Accept incoming Parameters
  export let params

  // Store id
  const id = params.id;

  // graphQL query
  const getMovie = operationStore(`
    query{
      getMovie(id: "${id}"){
        id
        title
        length
        image
        actors {
          id
          name
          gender
          nationality
          image
        }
      }
    }
  `);

  // Execute query
  query(getMovie)

  // DevLogs
  $: console.log("Page Params:", params)
  $: console.log("Movie Data:", $getMovie.data)
  $: movie = $getMovie.data?.getMovie
</script>


<div class="columns">
  {#if $getMovie.fetching}
    <Spinner class="column"/>
  {:else if $getMovie.error}
    <div class="column notification is-danger m-5">
      Oh no! { $getMovie.error.message }
    </div> 
  {:else if !$getMovie.data}
    <div class="column notification is-info m-5">
      No data
    </div> 
  {:else}
  <div class="column notification is-full">
    <div class="tile is-flex is-flex-direction-row mx-4">
      <MovieThumbnail movie={movie} />
      <div class="content mx-3">
        <h2 class="title">{ movie.title }</h2>
        <h3>Cast:</h3>
      </div>
    </div>
    <p class="columns is-multiline">
      {#each movie.actors as actor} 
        <ProfileCard class="column" actor={actor} />
      {/each}
    </p>
  </div>
  {/if}
</div>
