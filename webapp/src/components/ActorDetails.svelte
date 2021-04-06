<script>
  import Fa from 'svelte-fa';
  import { faMars, faVenus, faDice } from '@fortawesome/free-solid-svg-icons';
  import { editMode } from '../stores.js'

  export let actor

  function getRandomInt() {
    return Math.floor(Math.random() * 99)
  } 

  if ( $actor.data.getActor.image == null ) {
    getActorImage();
  }

  function getActorImage() {
    console.log('get ACtor IMage')
    $actor.data.getActor.image = 'https://randomuser.me/api/portraits/' + (( $actor.data.getActor.gender !== "1") ? 'women' : 'men') + '/' + getRandomInt()  + '.jpg'
  } 
</script>

<style lang="scss">
  @import '../../scss/elements/_contenteditable.scss';

  .is-random {
    position: absolute;
    top: 0;
    left: 0;
    color: #0077be;
    background: rgba(0, 0, 0, 0.2);
    width: 128px;
    height: 128px;
    padding: calc(64px - 1rem);
    border-radius: 64px;
    cursor: grabbing;

    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  }
</style>

  <div class="is-flex is-justify-content-center is-flex-direction-row m-4">
    <figure class="image is-128x128 ">
      <img class="is-rounded" src="{ $actor.data.getActor.image }" alt="Mugshot { $actor.data.getActor.name }" />
      {#if $editMode}
        <div class="is-random" on:click={getActorImage}>
          <Fa icon={ faDice } />
        </div>
       {/if}
    </figure>
    <div class="content p-4">
      {#if $editMode}
      <h2 class="title" placeholder="Name" contenteditable="true" bind:textContent={ $actor.data.getActor.name }></h2>
      <h3 class="subtitle" placeholder="Nationality" contenteditable="true" bind:textContent={ $actor.data.getActor.nationality }></h3>
      <div class="field">
        <div class="control has-icons-left">
          <div class="select is-small">
            <select bind:value={ $actor.data.getActor.gender } on:change={getActorImage}>
              <option value="0"><Fa icon={faVenus} /> Female</option>
              <option value="1"><Fa icon={faMars} /> Male</option>
            </select>
          </div>
          <div class="icon is-left">
           {#if $actor.data.getActor.gender !== 1}
             <Fa icon={faVenus} />
           {:else} 
             <Fa icon={faMars} />
           {/if}
          </div>
        </div>
      </div>
      {:else}
      <h2 class="title">{ $actor.data.getActor.name }</h2>
      <h3 class="subtitle">{ $actor.data.getActor.nationality }</h3>
       {#if actor.gender !== 1}
         <Fa icon={faVenus} /> Female
       {:else} 
         <Fa icon={faMars} /> Male
       {/if}
      {/if}
    </div>

  </div>
