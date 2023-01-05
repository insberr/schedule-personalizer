<script>
   import { nanoid } from "nanoid";
    export let value = '';
    export let isError = false;
    export let password = false;
    export let label = '';
    export let disabled = false;
    let id = nanoid(16)
</script>
<div class="form-control">
    <label class="label" for={id}>
        <span class="label-text">{label}</span>
    </label>

{#if password}
  <input on:keydown on:keypress on:keyup type="password" id={id} {disabled} class="input input-bordered" bind:value class:input-error={isError} />
{:else}
  <input on:keydown on:keypress on:keyup type="text" id={id}     {disabled} class="input input-bordered" bind:value class:input-error={isError} />
{/if}
</div>