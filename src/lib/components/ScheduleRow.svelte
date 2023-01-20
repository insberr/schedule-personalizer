<script type="ts">
    import type { DisplayCL } from '$types';
    import autoAnimate from '@formkit/auto-animate';
    import { format, isAfter, parse } from 'date-fns';
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import Fa from 'svelte-fa';
    import Countdown from './Countdown.svelte';
    import {
        faCircle,
        faMinus,
        faPlus,
        faSun,
    } from '@fortawesome/free-solid-svg-icons';
    import DateBar from './DateBar.svelte';
    let hide = true;
    export let displayDate: Date;
    export let cls: DisplayCL;
    export let index: number;
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
    $: isOdd = index % 2 == 1;
</script>

<div
    class={isOdd ? 'bg-base-200' : 'bg-base-300'}
    on:click={() => {
        hide = !hide;
    }}
    on:keydown
>
    <div class="flex flex-row justify-evenly items-center">
        <div class="px-2" />
        <Fa icon={faCircle} class={!isNow ? 'invisible' : ''} />
        <div
            class="w-full h-fit grid max-md:grid-cols-2 gap-2 px-1 text-center grid-cols-4 grid-rows-1 place-content-center justify-around justify-items-center"
        >
            <div>{format(startTime, 'h:mm')} - {format(endTime, 'h:mm')}</div>
            <div>{cls.name}</div>
            <div class="max-md:hidden">{cls.teacher.name}</div>
            <div class="max-md:hidden" class:hidden={cls.room == ''}>
                R{cls.room}
            </div>
        </div>
        <Fa icon={hide ? faPlus : faMinus} />
        <div class="px-2" />
    </div>
    {#if !hide}
        <div transition:slide|local class="bottom flex flex-col">
            <div>Details about class, grades, and other stuff here</div>
            <div>
                {#if isAfter(currentDate, endTime)}
                    Class Ended
                {:else}
                    {cls.name}
                    {isNow ? 'ends' : 'begins'} in <Countdown
                        destDate={isNow ? endTime : startTime}
                    />
                {/if}
            </div>
            <div>
                {#if isNow}
                    <DateBar startDate={startTime} destDate={endTime} />
                {/if}
            </div>
        </div>
    {/if}
</div>
