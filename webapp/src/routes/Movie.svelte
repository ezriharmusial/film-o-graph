<script>
  import { timeConvert } from '../utils'
  import ProfileCard from '../components/ProfileCard.svelte'
  import Spinner from '../components/Spinner.svelte'
  import { operationStore, query,  } from "@urql/svelte";
	import { fade } from 'svelte/transition';
  import { MOVIE_QUERY } from "../graphql.js";

  // Accept incoming Parameters
  export let params

  $: id = params.id
  $: movie = query(
    operationStore(  
      MOVIE_QUERY,
      { id },
      { requestPolicy: "cache-and-network" }
    )
  );

  // Catch emtpy image in initial mutation data
  $: if ($movie.data.getMovie.image == null) {
    $movie.data.getMovie.image = "mandelorian.jpg"
  }

  function updateMovie() {
    console.log('Update Movie')
    //mutation({ query: UPDATE_MOVIE});
  }

  function deleteMovie() {
    console.log('Delete Movie')
    //mutation({ query: DELETE_MOVIE, variables: { id } });
  }

  // DevLogs
  $: console.log("Page Params:", params)
  $: console.log("Movie Data:", $movie.data)
</script>

<div class="container" transition:fade>
  {#if $movie.fetching}
    <Spinner class="tile"/>
  {:else if $movie.error}
    <div class="tile notification is-danger m-5">
      Oh no! { $movie.error.message }
    </div> 
  {:else if !$movie.data}
    <div class="tile notification is-info m-5">
      No data
    </div> 
  {:else}
    <figure class="image is-9by16" >
       <img src="/images/movies/large/{ $movie.data.getMovie.image }" alt="poster { $movie.data.getMovie.title }" />
    </figure>    

    <div class="tile is-vertical is-parent">
      <div class="tile is-horizontal mx-4">

        <div class="tile content mx-3">
          <h2 class="title">{ $movie.data.getMovie.title }</h2>
          <h3 class="subtitle">
            { timeConvert( $movie.data.getMovie.length ) }
          </h3>
        </div>
      </div>

      <div class="tile">
        <h3 class="title">Cast</h3>
        <p class="columns is-multiline">
          {#each $movie.data.getMovie.actors as actor} 
            <ProfileCard class="column notification" actor={actor} />
          {/each}
        </p>
      </div>
    </div>
  {/if}
  </div>
