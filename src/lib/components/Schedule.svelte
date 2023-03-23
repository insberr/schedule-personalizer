<script type="ts">
    import type { HydratedEvent } from '$types';
    import autoAnimate from '@formkit/auto-animate';
    import ScheduleRow from './ScheduleRow.svelte';
    export let hydrated: HydratedEvent;
    import ScheduleHeader from './ScheduleHeader.svelte';
    import { displayDate } from '$lib/store/displayDate';
</script>

<ul
    class="schedule m-auto h-fit text-center w-[90vw] sm:w-[75vw]"
    use:autoAnimate
>
    <ScheduleHeader />

    <!-- I've got a great idea on how to animate this-->
    {#each hydrated.schedule as cls, i (cls.period + cls.name + cls.classID + cls.extra)}
        <ScheduleRow {cls} displayDate={$displayDate} index={i} />
    {/each}
    {#if hydrated.message}
        <div
            class={hydrated.schedule.length % 2 ? 'bg-base-200' : 'bg-base-300'}
        >
            <strong>{@html hydrated.message}</strong>
        </div>
    {/if}
</ul>
