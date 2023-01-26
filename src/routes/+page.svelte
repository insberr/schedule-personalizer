<script>
    //import { fade, slide } from 'svelte/transition';
    import Schedule from '$lib/components/Schedule.svelte';
    import { hydrated } from '$lib/DeCOH/store';
</script>

<div
    class="flex flex-col justify-center justify-items-center items-center"
    style="width:100vw; min-height: 100vh; margin-top: 1em"
>
    <div class="w-fit h-fit">
        {#if $hydrated != undefined}
            <Schedule hydrated={$hydrated} />
        {/if}
    </div>
    <a href="/setup" class="btn btn-error my-5">Go to setup (remove me later)</a
    >
</div>

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
