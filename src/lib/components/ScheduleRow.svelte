<script type="ts">
    import type { DisplayCL } from '$types';
    import autoAnimate from '@formkit/auto-animate';
    import { format, isAfter, parse } from 'date-fns';
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import Fa from 'svelte-fa';
    import { faSun } from '@fortawesome/free-solid-svg-icons';
    let hide = true;
    export let displayDate: Date;
    export let cls: DisplayCL;
    let currentDate = new Date();
    onMount(() => {
        let x = setInterval(() => {
            currentDate = new Date();
        }, 1000);
        return () => {
            clearInterval(x);
        };
    });
    $: startTime = parse(cls.start, 'HH:mm', displayDate);
    $: endTime = parse(cls.end, 'HH:mm', displayDate);
    $: isNow = isAfter(currentDate, startTime) && isAfter(endTime, currentDate);
</script>

<div
    on:click={() => {
        hide = !hide;
    }}
    on:keydown
>
    <div
        class="w-full h-fit grid max-md:grid-cols-3 gap-2 px-1 text-center grid-cols-4 grid-rows-1 place-content-center justify-around justify-items-center"
    >
        <div>{format(startTime, 'h:mm')} - {format(endTime, 'h:mm')}</div>
        <div>{cls.name}</div>
        <div class="max-md:hidden">{cls.teacher.name}</div>
        <div class:hidden={cls.room == ''}>R{cls.room}</div>
    </div>
    {#if !hide}
        <div transition:slide|local class="bottom block">
            {isNow ? 'Now!' : 'Not now!'}
        </div>
    {/if}
</div>
