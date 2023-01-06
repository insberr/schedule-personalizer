<script>
    import { nanoid } from 'nanoid';
    export let value = '';
    export let isError = false;
    export let password = false;
    export let label = '';
    export let disabled = false;
    export let warning = false;
    let id = nanoid(16);
</script>

<div class="form-control">
    <label class="label" for={id}>
        <span class="label-text">{label}</span>
    </label>

    {#if password}
        <input
            on:keydown
            on:keypress
            on:keyup
            type="password"
            {id}
            {disabled}
            class="input input-bordered"
            bind:value
            class:input-error={isError}
            class:input-warning={warning}
        />
    {:else}
        <input
            on:keydown
            on:keypress
            on:keyup
            type="text"
            {id}
            {disabled}
            class="input input-bordered"
            bind:value
            class:input-error={isError}
            class:input-warning={warning}
        />
    {/if}
</div>
