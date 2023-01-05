<script>
  import Spinner from "$lib/components/Spinner.svelte";
import Textbox from "$lib/components/Textbox.svelte";
  let username = ''
  let password = ''
  let loggingIn = false;
  let error = "";
  async function doTheLogin() {
    loggingIn = true;
    error = ""
    await new Promise((n) => setTimeout(n, 10_000))
    loggingIn = false
    error = "imagine implementing logging in couldn't be me"
  }
</script>
<h1 class="text-center my-4">Setup</h1>
<div class="grid gap-2 justify-content-center justify-items-center align-center grid-cols-3 grid-rows-1">
    <div></div>
    <div class="paper">
        <h2>Login with StudentVue</h2>
        <Textbox label="Username" bind:value={username} isError={error != ""} disabled={loggingIn} />
        <Textbox label="Password" bind:value={password} isError={error != ""} disabled={loggingIn} password={true} />
        <button class="btn btn-active btn-primary mt-4" on:click={doTheLogin} disabled={loggingIn}>
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
    <div></div>
</div>