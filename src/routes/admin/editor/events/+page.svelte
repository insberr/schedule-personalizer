<script lang="ts">
    import { masterSettings } from '$lib/store/masterSettings';
    import type { SchoolScheduleConfig, SEvent } from '$types';
    import { getContext } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import SveltyPicker from 'svelty-picker';
    import { isAfter, isSameDay, format } from 'date-fns';
    import EventEditor from './EventEditor.svelte';
    let school = (getContext('school') as any)
        .data as Writable<SchoolScheduleConfig>;
    let sc = (getContext('school') as any).name as Writable<number>;
    $: config = $masterSettings.schools[$sc];
    $: startDate = config.terms
        .map((r) => new Date(r.start))
        .sort((a, b) => (isAfter(a, b) ? 1 : isSameDay(a, b) ? 0 : -1))[0];
    $: endDate = config.terms
        .map((r) => new Date(r.end))
        .sort((b, a) => (isAfter(a, b) ? 1 : isSameDay(a, b) ? 0 : -1))[0];
    $: currentEvent = writable<Partial<SEvent>>(
        $school.events.get(selectedDate) || {}
    );
    let selectedDate = format(new Date(), 'MM-dd-yyyy');
</script>

<div class="center">
    <div class="paper">
        <SveltyPicker
            theme="dark"
            mode="date"
            format="mm-dd-yyyy"
            bind:value={selectedDate}
            {startDate}
            {endDate}
            pickerOnly
            clearBtn={false}
            clearToggle={false}
        />
    </div>
</div>
<div class="center">
    <div class="paper">
        <h2>Event on {selectedDate}</h2>
    </div>
</div>

<EventEditor bind:event={$currentEvent} />
