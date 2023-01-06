<script>
    import { schedule } from '$lib/store';
    import Textbox from '$lib/components/Textbox.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<pre class="bg-base-200 text-left">
  {JSON.stringify($schedule, null, 2)}
</pre>
<!--<p>Hello {$nameStore}!</p>
<Textbox bind:value={$nameStore} isError={$nameStore.length == 0} />-->
<a href="/setup" class="btn btn-error">Go to setup</a>
