<script type="ts">
    import type {
        MasterSettingsSchool,
        SchoolScheduleConfig,
        SEvent,
    } from '$types';
    import SchedulePicker from '$lib/components/EventPonents/SchedulePicker.svelte';
    import json5 from 'json5';
    export let schedules: SchoolScheduleConfig['schedules'];
    export let event: Partial<SEvent>;
    export let force = false;
    export let config: MasterSettingsSchool;
</script>

<div class="center grid grid-cols-2">
    <div class="paper">
        <SchedulePicker
            {force}
            termCount={config.terms.length}
            {schedules}
            bind:value={event.schedule}
        />
    </div>
</div>

<pre class="bg-base-200">
    {json5.stringify(event, null, 2)}
</pre>
