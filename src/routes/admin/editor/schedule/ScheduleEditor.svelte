<script type="ts">
    import {
        ClassIDS,
        type MasterSettingsSchool,
        type Schedule,
        type SchoolScheduleConfig,
    } from '$types';
    import { arrayMoveImmutable } from 'array-move';
    import SveltyPicker from 'svelty-picker';
    //import { json } from "@sveltejs/kit";
    import autoAnimate from '@formkit/auto-animate';
    import Fa from 'svelte-fa';
    import {
        faArrowUp,
        faArrowDown,
        faCopy,
        faClose,
        faPlus,
    } from '@fortawesome/free-solid-svg-icons';
    export let schedule: Schedule;
    export let school: MasterSettingsSchool;
    function addNewPeriod() {
        schedule.periods.push({
            id: ClassIDS.Period,
            num: 1,
            start: '00:00',
            end: '00:00',
        });
        schedule = schedule; // trigger svelte to update
    }
    function removeP(p: number) {
        schedule.periods.splice(p, 1);
        schedule = schedule; // trigger svelte to update
    }
    function move(p: number, amt: number) {
        schedule.periods = arrayMoveImmutable(schedule.periods, p, p + amt);
    }
    function duplicate(p: number) {
        schedule.periods.push(structuredClone(schedule.periods[p]));
        schedule.periods = arrayMoveImmutable(
            schedule.periods,
            schedule.periods.length - 1,
            p + 1
        );
    }
</script>

{#if schedule == undefined}
    <span />
{:else}
    <div class="center" use:autoAnimate>
        {#each schedule.periods as p, i (p)}
            <div class="paper w-fit">
                <div class="grid grid-rows-1 gap-4 grid-cols-4">
                    <select class="select" bind:value={schedule.periods[i].id}>
                        {#each Object.keys(ClassIDS) as cls}
                            {#if !isNaN(Number(cls))}
                                <option value={parseInt(cls)}
                                    >{ClassIDS[parseInt(cls)]}</option
                                >
                            {/if}
                        {/each}
                    </select>
                    {#if p.id == ClassIDS.Period}
                        <select
                            class="select"
                            bind:value={schedule.periods[i].num}
                        >
                            {#each Array(school.numberOfPeriods) as _, i}
                                <option value={i + 1}>{i + 1}</option>
                            {/each}
                        </select>
                    {:else}
                        <div />
                    {/if}
                    <div class="inline-block">
                        <SveltyPicker
                            theme="main-clock-theme"
                            inputClasses="form-control input inline"
                            mode="time"
                            format="hh:ii"
                            bind:value={schedule.periods[i].start}
                        />
                        <div class="divider">TO</div>
                        <SveltyPicker
                            theme="main-clock-theme"
                            inputClasses="form-control input inline"
                            mode="time"
                            format="hh:ii"
                            bind:value={schedule.periods[i].end}
                        />
                    </div>
                    <div class="grid grid-cols-2 grid-rows-2 gap-0">
                        <button
                            class="btn btn-circle btn-md p-1 m-auto"
                            disabled={i == 0}
                            on:click={() => move(i, -1)}
                            ><Fa icon={faArrowUp} /></button
                        >
                        <button
                            class="btn btn-circle btn-md p-1 m-auto"
                            on:click={() => removeP(i)}
                            ><Fa icon={faClose} /></button
                        >
                        <button
                            class="btn btn-circle btn-md p-1 m-auto"
                            disabled={i == schedule.periods.length - 1}
                            on:click={() => move(i, 1)}
                            ><Fa icon={faArrowDown} /></button
                        >
                        <button
                            class="btn btn-circle btn-md p-1 m-auto"
                            on:click={() => duplicate(i)}
                            ><Fa icon={faCopy} /></button
                        >
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div class="center">
        <div class="paper">
            <button class="btn" on:click={addNewPeriod}
                ><Fa icon={faPlus} /></button
            >
        </div>
    </div>
{/if}
