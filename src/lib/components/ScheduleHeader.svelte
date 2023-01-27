<script type="ts">
    import { displayDate } from '$lib/store/displayDate';
    import { addDays } from 'date-fns/fp';
    import Fa from 'svelte-fa';
    import FancyDate from './FancyDate.svelte';
    import {
        faArrowLeft,
        faArrowRight,
    } from '@fortawesome/free-solid-svg-icons';
    import autoAnimate from '@formkit/auto-animate';
    import { slide } from 'svelte/transition';
    import { daysLeftTerm, daysLeftYear } from '$lib/store/daysLeft';
    import {
        format,
        isAfter,
        isSameDay,
        isWithinInterval,
        parse,
    } from 'date-fns';
    import SveltyPicker from 'svelty-picker';
    import { scheduleConfig, schoolSettings } from '$lib/store/masterSettings';
    import { get } from 'svelte/store';
    import { schoolDateCount } from '$lib/DeCOH';
    import { currentTermStore } from '$lib/store/currentTerm';
    import { tweened } from 'svelte/motion';
    let showMore = false;
    let SL: string = format($displayDate, 'MM-dd-yyyy');
    function updateSL() {
        SL = format(get(displayDate), 'MM-dd-yyyy');
    }
    $: {
        if (showMore) {
            updateSL();
        }
    }
    $: startDate = $schoolSettings.terms
        .map((r) => new Date(r.start))
        .sort((a, b) => (isAfter(a, b) ? 1 : isSameDay(a, b) ? 0 : -1))[0];
    $: endDate = $schoolSettings.terms
        .map((r) => new Date(r.end))
        .sort((b, a) => (isAfter(a, b) ? 1 : isSameDay(a, b) ? 0 : -1))[0];
    $: daysInYear = schoolDateCount(
        startDate,
        endDate,
        $scheduleConfig,
        $schoolSettings
    );
    $: daysInTerm = schoolDateCount(
        new Date($schoolSettings.terms[$currentTermStore].start),
        new Date($schoolSettings.terms[$currentTermStore].end),
        $scheduleConfig,
        $schoolSettings
    );
    $: {
        displayDate.set(parse(SL, 'MM-dd-yyyy', new Date()));
    }
    let daysLeftTermProgress = tweened(0, { duration: 500 });
    $: {
        daysLeftTermProgress.set(daysInTerm - $daysLeftTerm);
    }
    let daysLeftYearProgress = tweened(0, { duration: 500 });
    $: {
        daysLeftYearProgress.set(daysInYear - $daysLeftYear);
    }
</script>

<div class="bg-base-200">
    <div class="text-xl flex gap-3 flex-row justify-evenly items-center">
        <button
            class="btn btn-primary btn-circle mx-3"
            disabled={isAfter(startDate, addDays(-1)($displayDate))}
            on:click={() => {
                displayDate.update(addDays(-1));
                updateSL();
            }}
        >
            <Fa icon={faArrowLeft} />
        </button>
        <div
            class="border border-primary p-2 rounded cursor-pointer hover:bg-primary-focus"
            on:keydown
            on:click={() => (showMore = !showMore)}
        >
            <FancyDate displayDate={$displayDate} />
        </div>
        <button
            class="btn btn-primary btn-circle mx-3"
            disabled={isAfter(addDays(1)($displayDate), endDate)}
            on:click={() => {
                displayDate.update(addDays(1));
                updateSL();
            }}
        >
            <Fa icon={faArrowRight} />
        </button>
    </div>
    {#if showMore}
        <div
            transition:slide
            class="mt-3 m-auto w-fit flex flex-row gap-4 items-center"
        >
            <div>
                <h3>Date information</h3>
                <div class="text-center">
                    <p>School days left in term: {$daysLeftTerm}</p>
                    <progress
                        class="progress progress-success"
                        value={$daysLeftTermProgress}
                        max={daysInTerm}
                    />
                </div>
                <div class="text-center">
                    <p>School days left in year: {$daysLeftYear}</p>
                    <progress
                        class="progress progress-success"
                        value={$daysLeftYearProgress}
                        max={daysInYear}
                    />
                </div>
                <p>Days until the next day off: idk figure it out</p>
                <p>
                    Days until the next day off (excluding weekends): idk figure
                    it out
                </p>
                <p>Current term: {$currentTermStore + 1}</p>
            </div>
            <div>
                <SveltyPicker
                    theme="dark"
                    mode="date"
                    format="mm-dd-yyyy"
                    bind:value={SL}
                    {startDate}
                    {endDate}
                    pickerOnly
                    clearBtn={false}
                    clearToggle={false}
                />
            </div>
        </div>
    {/if}
</div>
