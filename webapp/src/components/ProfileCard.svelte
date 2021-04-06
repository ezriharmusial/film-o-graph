<script>
  import { link } from 'svelte-spa-router'

  export let actor = {
    id: "",
    name: "John Doe",
    nationality: "Eartlian",
    gender: false,
    image: `${( typeof actor.gender == 'undefined' || actor.gender == false)?'wo':''}men/${ Math.floor(Math.random() * 100) }.jpg`
  }

  // Catch emtpy image in initial mutation data
  $: if (actor.image == null) {
    actor.image = `${( typeof actor.gender == 'undefined' || actor.gender == false)?'wo':''}men/${ Math.floor(Math.random() * 100) }.jpg`
  }

  // DevLogs
  $: console.log('Profilecard actor:', actor)
</script>

<style lang="scss">
.profile-card {
  min-width: 30vw;
  padding: 1rem;
  border-radius: 0.5rem;
  color: grey;
  align-items: center;
  justify-content: center;
  transition: background-color;
  transition-duration: 0.5s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
} 
</style>
<a href="/actors/{actor.id}" alt="visit {actor.name}" class="profile-card is-flex is-flex-direction-column mx-4" use:link>
  <figure class="image">
    <img class="is-rounded" src="https://randomuser.me/api/portraits/{ actor.image }" alt="Mugshot { actor.name }" />
  </figure>
  <div class="content has-text-centered p-4">
    <h3 class="title is-5">{actor.name}</h3>
    <h4 class="subtitle is-6">{actor.nationality}</h4>
  </div>
</a>
