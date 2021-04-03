<script>
    import {link, location } from 'svelte-spa-router'
    import Fa from 'svelte-fa';
    import { faFilm, faSearch } from '@fortawesome/free-solid-svg-icons';

		let menuToggler;

		function foldMenu() {
				menuToggler.checked = "";
		}
</script>

<style type="text/scss">
  .navbar-item.is-active {
    border-top: 3px solid #0077be;
    transition: border;
    transition-duration: 0,5s;
  }

	@media screen and (max-width: 1024px) {
		#menu-toggle:checked~.navbar-menu {
			display: block;
		}
    .navbar-item.is-active {
      border-top: 0;
      border-left: 3px solid #0077be;
    }
	}

	#menu-toggle:checked~.navbar-brand .navbar-burger {
		span {
			&:nth-child(1) {
				transform: translateY(5px) rotate(45deg);
			}

			&:nth-child(2) {
				opacity: 0;
			}

			&:nth-child(3) {
				transform: translateY(-5px) rotate(-45deg);
			}
		}
	}

	#menu-toggle {display: none;}
</style>


<nav class="navbar is-dark">
  <div class="container">
    <!-- Hidden Checkbox hack trigger for Pure CSS toggle -->
    <input type="checkbox" id="menu-toggle" class="is-hidden" bind:this={menuToggler}>
  
    <div class="navbar-brand">
      <a class="navbar-item" href="/" use:link>
           <span class="icon is-large has-text-secondary">
            <Fa icon={faFilm} size="2x" />
           </span>
           <span class="title is-size-4 has-text-white">
            Film-O-Graph
           </span>
      </a>
      <label for="menu-toggle" class="navbar-burger" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </label>
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
        <a class="navbar-item" href="/movies" class:is-active={'/movies' == $location} on:click={foldMenu} use:link>Movies</a>
        <a class="navbar-item" href="/actors" class:is-active={'/actors' == $location} on:click={foldMenu} use:link>Actors</a>
      </div>
    </div>
  </div>
</nav>
