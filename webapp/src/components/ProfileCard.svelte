<script>
  import { link } from 'svelte-spa-router'

  export let actor = {
    id: "",
    name: "John Doe",
    nationality: "Eartlian",
    gender: false,
    image: `https://randomuser.me/api/portraits/${( typeof actor.gender == 'undefined' || actor.gender == false)?'wo':''}men/${ Math.floor(Math.random() * 100) }.jpg`
  }

  // Catch emtpy image in initial mutation data
  $: if (actor.image == null) {
    actor.image = `https://randomuser.me/api/portraits/${( typeof actor.gender == 'undefined' || actor.gender == false)?'wo':''}men/${ Math.floor(Math.random() * 100) }.jpg`
  }

  // DevLogs
  $: console.log('Profilecard actor:', actor)
</script>

<style>
.profile-card {
  display:flex;
  width: 200px;
  border-radius: 1rem;
  color: grey;
  align-items: center;
  justify-content: center;  
} 
</style>
<a href="/actors/{actor.id}" alt="visit {actor.name}" class="profile-card column is-flex is-flex-direction-column mx-4" use:link>
  <figure class="image">
    <img class="is-rounded" src="{actor.image}" alt="Mugshot { actor.name }" />
  </figure>
  <div class="content has-text-centered p-4">
    <h3 class="title is-4">{actor.name}</h3>
    <h4 class="subtitle is-5">{actor.nationality}</h4>
  </div>
</a>
