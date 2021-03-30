<script>
    import {link} from 'svelte-spa-router'
    import Fa from 'svelte-fa';
    import { faFilm, faSearch } from '@fortawesome/free-solid-svg-icons';
</script>

<nav class="navbar is-dark">
  <div class="navbar-brand">
    <a class="navbar-item" href="/" use:link>
         <span class="icon is-large has-text-secondary">
          <Fa icon={faFilm} size="2x" />
         </span>
         <span class="title is-size-4 has-text-white">
          Film-O-Graph
         </span>
    </a>
    <div class="navbar-burger" data-target="navMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navMenu" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item field">
        <p class="control has-icons-right">
          <input class="input is-rounded has-text-white" type="search" placeholder="Search Film or Artist">
          <span class="icon is-small is-right">
            <Fa icon={faSearch} />
          </span>
        </p>
      </div>
    </div>

    <div class="navbar-end">
    </div>
  </div>
</nav>
