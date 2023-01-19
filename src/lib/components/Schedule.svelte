<script type="ts">
    import type { HydratedEvent } from '$types';
    import autoAnimate from '@formkit/auto-animate';
    import { format } from 'date-fns';
    import FancyDate from './FancyDate.svelte';
    import ScheduleRow from './ScheduleRow.svelte';

    export let hydrated: HydratedEvent;
    export let displayDate: Date;
</script>

<ul
    class="schedule m-auto h-fit text-center"
    style="width: 75vw"
    use:autoAnimate
>
    <div class="text-xl"><FancyDate {displayDate} /></div>
    <!-- I've got a great idea on how to animate this-->
    {#each hydrated.schedule as cls (cls.period + cls.name + cls.classID)}
        <ScheduleRow {cls} {displayDate} />
    {/each}
    <div>{hydrated.message}</div>
</ul>
