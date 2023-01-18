<script>
    import { schedule } from '$lib/store/schedule';
    import {
        masterSettings,
        scheduleConfig,
        schoolName,
        schoolSettings,
    } from '$lib/store/masterSettings';
    import Textbox from '$lib/components/Textbox.svelte';
    import { DeCOH } from '$lib/DeCOH';
    import { addDays, format } from 'date-fns';
    import autoAnimate from '@formkit/auto-animate';
    let d = new Date();
    $: hydrated = DeCOH(d, $scheduleConfig, $schoolSettings, $schedule);
</script>

<a href="/setup" class="btn btn-error">Go to setup</a>
<h3>Hydrated schedule for {format(d, 'MM-dd-yyyy')}</h3>
<button class="btn" on:click={() => (d = addDays(d, -1))}>
    &lt;-
</button><button class="btn" on:click={() => (d = addDays(d, 1))}> -> </button>
<div class="center grid grid-cols-1 grid-rows-auto" use:autoAnimate>
    {#each hydrated.schedule as cls (cls.name)}
        <div class="grid grid-rows-1 grid-cols-4">
            <div>{cls.start} -> {cls.end}</div>
            <div>{cls.name}</div>
            <div>{cls.teacher.name}</div>
            <div>R{cls.room}</div>
        </div>
    {/each}
</div>
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
</pre>
<!--<p>Hello {$nameStore}!</p>
<Textbox bind:value={$nameStore} isError={$nameStore.length == 0} />-->
