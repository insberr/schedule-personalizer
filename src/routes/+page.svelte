<script>
    import { schedule } from '$lib/store/schedule';
    import {
        masterSettings,
        scheduleConfig,
        schoolName,
        schoolSettings,
    } from '$lib/store/masterSettings';
    //import Textbox from '$lib/components/Textbox.svelte';
    import { DeCOH } from '$lib/DeCOH';
    import { addDays, format } from 'date-fns';
    import autoAnimate from '@formkit/auto-animate';
    //import { fade, slide } from 'svelte/transition';
    let d = new Date();
    $: hydrated = DeCOH(d, $scheduleConfig, $schoolSettings, $schedule);
</script>

<a href="/setup" class="btn btn-error">Go to setup</a>
<button class="btn" on:click={() => (d = addDays(d, -1))}>
    &lt;-
</button><button class="btn" on:click={() => (d = addDays(d, 1))}>
    -&gt;
</button>
<ul
    class="schedule m-auto h-fit text-center"
    style="width: 75vw"
    use:autoAnimate
>
    <div class="text-xl">{format(d, 'EEEE, MMMM do, yyyy')}</div>
    <!-- I've got a great idea on how to animate this-->
    {#each hydrated.schedule as cls (cls.period + cls.name + cls.classID + cls.start + cls.end)}
        <div
            class="w-full h-fit grid max-md:grid-cols-3 px-1 text-center grid-cols-4 grid-rows-1 place-content-center justify-around justify-items-center"
        >
            <div>{cls.start} - {cls.end}</div>
            <div>{cls.name}</div>
            <div class="max-md:hidden">{cls.teacher.name}</div>
            <div class:hidden={cls.room == ''}>R{cls.room}</div>
        </div>
    {/each}
    <div>{hydrated.message}</div>
</ul>
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
