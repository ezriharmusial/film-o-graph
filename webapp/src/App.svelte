<script>
  import Footer from './components/Footer.svelte'
  import Navbar from './components/Navbar.svelte'
  import Router from 'svelte-spa-router'
  import { routes } from './routes.js'
//  import { initClient } from "@urql/svelte";
  import urql from './urql.js'

  urql.OnInit();

//  initClient({
//    url: "http://localhost:8080/graphql"
//  });
</script>

<style lang="scss">
.hero {
  padding: 50px 0;

  .hero-head {
    position: fixed;
    top: 0;
    z-index: 3;
    width: 100vw;
    background-color: rgba(0,0,0, .5);
  }

  .hero-foot {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 3;
  }
}
</style>

<div class="hero is-fullheight is-dark is-bold">
  <div class="hero-head">
    <Navbar />
  </div>

  <div class="hero-body p-0 is-flex-direction-column">
    <Router {routes}/>
  </div>

  <div class="hero-foot">
    <Footer />
  </div>
</div>


