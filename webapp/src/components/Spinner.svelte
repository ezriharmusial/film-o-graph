<script>
  import Fa from 'svelte-fa';
  import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

  export let size = 10;
  export let speed = 750;
  export let color = '#0077be';
</script>


<style>
  .svelte-spinner {
    margin: 15% auto;
    transition-property: transform;
    animation-name: svelte-spinner_infinite-spin;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  
  @keyframes svelte-spinner_infinite-spin {
    from { transform: rotate( 0deg ); }
    to { transform: rotate( 360deg ); }
  }
</style>

<div class="svelte-spinner" style="color: { color }; width: 159px; animation-duration: { speed }ms;">
  <Fa icon={ faCircleNotch } size="{ size }x"/>
</div>
