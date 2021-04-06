<script>
  import { createEventDispatcher } from 'svelte'
  import {link} from 'svelte-spa-router'
  import Fa from 'svelte-fa';
  import { faPencilAlt, faPlus, faTrash, faSave  } from '@fortawesome/free-solid-svg-icons';
  import { editMode } from '../stores.js'

  function toggleEditMode(){ 
   editMode.update(editMode => !editMode )
  }

  //devlog
  $: console.log('editMode:', $editMode)
</script>

<style lang="scss">
.buttons {
  margin: 1rem;

  .button {
    transition: background-color color;
    transition-duration: 0.9s;
  }
} 
</style>

<nav class="tabs is-right is-toggle is-toggle-rounded is-medium is-fullwidth">
  <ul class="buttons">
    {#if $editMode}
    <li on:click={() => createEventDispatcher('delete')} class="button is-rounded is-danger">
        <Fa icon={faTrash}></Fa>
    </li>
  
    <li on:click={() => createEventDispatcher('update')} class="button is-rounded is-success">
        <Fa icon={faSave}></Fa>
    </li>
    {:else}
    <li class="button is-rounded{ ($editMode) ? ' is-danger' : ' is-warning' }" on:click={toggleEditMode}><Fa icon={faPencilAlt} />{ ($editMode) ? ' Edit mode' : '' }</li>
    {/if}
    <li class="button is-rounded is-info"><Fa icon={faPlus} /></li>
  </ul>
</nav>
