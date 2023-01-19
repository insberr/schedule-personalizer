<script>
    import { format } from 'date-fns';
    import { addDays } from 'date-fns/fp';
    import autoAnimate from '@formkit/auto-animate';
    //import { fade, slide } from 'svelte/transition';
    import { displayDate, hydrated } from '$lib/DeCOH/store';
    import Schedule from '$lib/components/Schedule.svelte';
</script>

<a href="/setup" class="btn btn-error">Go to setup</a>
<button class="btn" on:click={() => displayDate.update(addDays(-1))}>
    &lt;-
</button><button class="btn" on:click={() => displayDate.update(addDays(1))}>
    -&gt;
</button>

{#if $hydrated != undefined}
    <Schedule hydrated={$hydrated} displayDate={$displayDate} />
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
