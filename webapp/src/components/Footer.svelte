<script>
  import {link} from 'svelte-spa-router'
  import Fa from 'svelte-fa';
  import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
</script>

<nav class="tabs is-boxed is-fullwidth">
  <div class="container">
    <ul>
      <li><a href="/movies" use:link>Movies</a></li>
      <li><a href="/actors" use:link>Actors</a></li>
      <li><Fa icon={faPencilAlt} /></li>
      <li><Fa icon={faPlus} /></li>
    </ul>
  </div>
</nav>
