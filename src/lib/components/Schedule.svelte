<script type="ts">
    import type { HydratedEvent } from '$types';
    import autoAnimate from '@formkit/auto-animate';
    import { format } from 'date-fns';
    import FancyDate from './FancyDate.svelte';
    import ScheduleRow from './ScheduleRow.svelte';
    import { addDays } from 'date-fns/fp';
    export let hydrated: HydratedEvent;
    import { displayDate } from '$lib/DeCOH/store';
    import Fa from 'svelte-fa';
    import {
        faArrowLeft,
        faArrowRight,
    } from '@fortawesome/free-solid-svg-icons';
</script>

<ul
    class="schedule m-auto h-fit text-center"
    style="width: 75vw"
    use:autoAnimate
>
    <div class="bg-base-200 text-xl flex flex-row justify-evenly items-center">
        <button
            class="btn btn-primary btn-circle"
            on:click={() => displayDate.update(addDays(-1))}
        >
            <Fa icon={faArrowLeft} />
        </button>
        <div class="border border-primary p-2 rounded">
            <FancyDate displayDate={$displayDate} />
        </div>
        <button
            class="btn btn-primary btn-circle"
            on:click={() => displayDate.update(addDays(1))}
        >
            <Fa icon={faArrowRight} />
        </button>
    </div>
    <!-- I've got a great idea on how to animate this-->
    {#each hydrated.schedule as cls, i (cls.period + cls.name + cls.classID)}
        <ScheduleRow {cls} displayDate={$displayDate} index={i} />
    {/each}
    <div class={hydrated.schedule.length % 2 ? 'bg-base-200' : 'bg-base-300'}>
        {hydrated.message}
    </div>
</ul>
