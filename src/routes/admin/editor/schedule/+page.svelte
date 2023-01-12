<script type="ts">
    import type { Writable } from 'svelte/store';
    import { getContext } from 'svelte';
    import type { SchoolScheduleConfig } from '$types';
    import ScheduleEditor from './ScheduleEditor.svelte';
    import { masterSettings } from '$lib/store';

    let school = (getContext('school') as any)
        .data as Writable<SchoolScheduleConfig>;
    let sc = (getContext('school') as any).name as Writable<number>;
    let selectedSchedule = Object.keys($school.schedules)[0];
</script>

<h3 class="center">Schedule</h3>

<div class="center">
    <div class="paper">
        <select bind:value={selectedSchedule}>
            {#each Object.keys($school.schedules) as sch}
                <option value={sch}>{$school.schedules[sch].name}</option>
            {/each}
        </select>
    </div>
</div>
{#key selectedSchedule}
    <ScheduleEditor
        bind:schedule={$school.schedules[selectedSchedule]}
        school={$masterSettings.schools[$sc]}
    />
{/key}
