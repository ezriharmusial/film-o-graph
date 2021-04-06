<script>
  import { timeConvert } from '../utils'

  export let movie = {
    id: "",
    title : "Mandelorian",
    image : "mandelorian.jpg",
    length : "7600"
  }

  // Catch emtpy image in initial mutation data
  $: if (movie.image == null) {
    movie.image = "mandelorian.jpg"
  }


</script>

<style lang="scss"> 
  figure {
    position: relative;
    width: 128px;

    figcaption {
      position: absolute;
      bottom: 5px;
      right: 5px;
      z-index: 2;
    }
  }
</style>

<figure class="image">
  <img src="/images/movies/small/{ movie.image }" alt="poster { movie.title }" />
  <figcaption class="tag">{ timeConvert( movie.length ) }</figcaption>
</figure>
