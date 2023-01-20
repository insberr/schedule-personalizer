<script>
    //import { fade, slide } from 'svelte/transition';
    import Schedule from '$lib/components/Schedule.svelte';
    import { hydrated } from '$lib/DeCOH/store';
</script>

<a href="/setup" class="btn btn-error">Go to setup</a>

{#if $hydrated != undefined}
    <Schedule hydrated={$hydrated} />
{/if}
<!--
<pre class="bg-base-200 text-left">
  {JSON.stringify(hydrated, null, 2)}
</pre>

<h3>Your classes</h3>
<pre class="bg-base-200 text-left">
  {JSON.stringify($schedule, null, 2)}
</pre>
<h3>Master config</h3>
<pre class="bg-base-200 text-left">
  {JSON.stringify($masterSettings, null, 2)}
</pre>
<h3>schedule config</h3>
<pre class="bg-base-200 text-left">
  {JSON.stringify($scheduleConfig, null, 2)}
</pre>
<h3>school Name</h3>
<pre class="bg-base-200 text-left">
  {$schoolName}
</pre>-->
<!--<p>Hello {$nameStore}!</p>
<Textbox bind:value={$nameStore} isError={$nameStore.length == 0} />-->
