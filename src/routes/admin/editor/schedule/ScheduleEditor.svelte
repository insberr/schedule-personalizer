<script type="ts">
    import {
        ClassIDS,
        type MasterSettingsSchool,
        type Schedule,
        type SchoolScheduleConfig,
    } from '$types';
    //import { json } from "@sveltejs/kit";
    import autoAnimate from '@formkit/auto-animate';
    import { produce, setAutoFreeze } from 'immer';
    setAutoFreeze(false);
    export let schedule: Schedule;
    export let school: MasterSettingsSchool;
    function addNewPeriod() {
        schedule = produce(schedule, (s) => {
            s.periods.push({ id: ClassIDS.Period, num: 1 });
        });
    }
    function removeP(p: number) {
        schedule = produce(schedule, (s) => {
            s.periods.splice(p, 1);
        });
    }
</script>

<div class="center" use:autoAnimate>
    {#each schedule.periods as p, i (p)}
        <div class="paper">
            <div class="grid grid-rows-1 gap-4 grid-cols-5">
                <select bind:value={schedule.periods[i].id}>
                    {#each Object.keys(ClassIDS) as cls}
                        {#if !isNaN(Number(cls))}
                            <option value={parseInt(cls)}
                                >{ClassIDS[parseInt(cls)]}</option
                            >
                        {/if}
                    {/each}
                </select>
                {#if p.id == ClassIDS.Period}
                    <select bind:value={schedule.periods[i].num}>
                        {#each Array(school.numberOfPeriods) as _, i}
                            <option value={i + 1}>{i + 1}</option>
                        {/each}
                    </select>
                {:else}
                    <div />
                {/if}
                <div>StartTimePicker</div>
                <div>EndTimePicker</div>
                <button class="btn" on:click={() => removeP(i)}>X</button>
            </div>
        </div>
    {/each}
</div>
<button class="btn" on:click={addNewPeriod}>Add</button>
<pre>
    {JSON.stringify(schedule, null, 2)}
</pre>
