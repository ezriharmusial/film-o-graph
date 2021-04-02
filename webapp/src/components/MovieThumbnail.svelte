<script>
  import { timeConvert } from '../utils'

  export let image = "/images/movies/small/mandelorian.jpg";
  export let title = "Mandelorian";
  export let length = "7600"
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
  <img src="{ image }" alt="poster { title }" />
  <figcaption class="tag">{ timeConvert( length ) }</figcaption>
</figure>
