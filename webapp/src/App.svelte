<script>
  import Footer from './components/Footer.svelte'
  import Navbar from './components/Navbar.svelte'
  import Router from 'svelte-spa-router'
  import { routes  }from './routes.js'
</script>


<div class="hero is-fullheight is-dark is-bold">
  <div class="hero-foot">
    <Navbar />
  </div>

  <div class="hero-body">
    <Router {routes}/>
  </div>
  <div class="hero-foot">
    <Footer />
  </div>
</div>


