<script type="ts">
  import Spinner from "$lib/components/Spinner.svelte";
  import Textbox from "$lib/components/Textbox.svelte";
  
  let username = ''
  let password = ''
  export let loggingIn = false;
  export let error = "";
  import { createEventDispatcher } from 'svelte';
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher<{login:{username:string, password:string}}>();
  function doTheLogin() {
    dispatch('login', {username, password})
  }
  function isEnter(e : KeyboardEvent) {
    if (e.key == "Enter" && !loggingIn) {
      doTheLogin()
    }
  }
</script>

<div class="paper">
    <h2>Login with StudentVue</h2>
    <Textbox label="Username" bind:value={username} on:keydown={isEnter} isError={error != ""} disabled={loggingIn} />
    <Textbox label="Password" bind:value={password} on:keydown={isEnter} isError={error != ""} disabled={loggingIn} password={true} />
    <button type="submit" class="btn btn-active btn-primary mt-4" on:click={doTheLogin} disabled={loggingIn}>
      {#if loggingIn}
      <Spinner /> Loading
      {:else}
      Login
      {/if}
    </button>
    {#if error != ""}
    <div class="mt-5 alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error: {error}</span>
      </div>
    </div>
    {/if}
</div>