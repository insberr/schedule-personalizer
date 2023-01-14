<script lang="ts">
    import { masterSettings } from '$lib/store/masterSettings';
    import type { SchoolScheduleConfig, SEvent } from '$types';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import SveltyPicker from 'svelty-picker';
    import { isAfter, isSameDay, format } from 'date-fns';
    import EventEditor from '../events/EventEditor.svelte';
    let school = (getContext('school') as any)
        .data as Writable<SchoolScheduleConfig>;
    let sc = (getContext('school') as any).name as Writable<number>;
    $: config = $masterSettings.schools[$sc];
</script>

<div class="center">
    <div class="paper">
        <h2>Default Event</h2>
    </div>
</div>
<EventEditor
    force={true}
    schedules={$school.schedules}
    {config}
    bind:event={$school.defaults}
/>
