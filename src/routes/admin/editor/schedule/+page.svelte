<script type="ts">
    import type { Writable } from 'svelte/store';
    import { getContext } from 'svelte';
    import type { SchoolScheduleConfig } from '$types';
    import ScheduleEditor from './ScheduleEditor.svelte';
    import { masterSettings } from '$lib/store/masterSettings';
    import toast from 'svelte-french-toast';
    import { nanoid } from 'nanoid';
    import { produce } from 'immer';
    let school = (getContext('school') as any)
        .data as Writable<SchoolScheduleConfig>;
    let sc = (getContext('school') as any).name as Writable<number>;
    let selectedSchedule = Object.keys($school.schedules)[0];
    let nName = '';
    import Fa from 'svelte-fa';
    import {
        faCopy,
        faPlus,
        faPencil,
        faTrash,
    } from '@fortawesome/free-solid-svg-icons';
    function newSCH() {
        let newID = nanoid(16);
        school.set(
            produce($school, (draft) => {
                draft.schedules[newID] = {
                    name: nName,
                    periods: [],
                };
            })
        );
        toast.success('Created new schedule ' + nName + '!');
        selectedSchedule = newID;
        nName = '';
    }
    function copySCH() {
        let newID = nanoid(16);
        school.set(
            produce($school, (draft) => {
                draft.schedules[newID] = structuredClone(
                    $school.schedules[selectedSchedule]
                );
                draft.schedules[newID].name = nName;
            })
        );
        toast.success(
            'Copied ' +
                $school.schedules[selectedSchedule].name +
                ' to ' +
                nName +
                '!'
        );
        selectedSchedule = newID;
        nName = '';
    }
    function renameSCH() {
        $school.schedules[selectedSchedule].name = nName;
        toast.success('Renamed!');
        nName = '';
    }
    function deleteSCH() {
        if (Object.keys($school.schedules).length <= 1) {
            toast.error("You can't delete the last schedule!");
            return;
        }
        if (
            !confirm(
                'Are you sure you want to delete schedule ' +
                    $school.schedules[selectedSchedule].name +
                    '?'
            )
        )
            return;
        school.set(
            produce($school, (draft) => {
                delete draft.schedules[selectedSchedule];
            })
        );
        toast.success('Deleted!');
        selectedSchedule = Object.keys($school.schedules)[0];
    }
</script>

<h3 class="center">Schedule</h3>

<div class="center">
    <div class="paper w-fit">
        <div class="grid grid-rows-1 gap-5 grid-cols-2">
            <select class="select" bind:value={selectedSchedule}>
                {#each Object.keys($school.schedules) as sch}
                    <option value={sch}>{$school.schedules[sch].name}</option>
                {/each}
            </select>
            <div class="form-control">
                <div class="input-group">
                    <input
                        type="text"
                        placeholder="Name"
                        bind:value={nName}
                        class="input input-bordered"
                    />
                    <button
                        class="btn btn-square"
                        disabled={nName.trim() == ''}
                        on:click={newSCH}><Fa icon={faPlus} /></button
                    >
                    <button
                        class="btn btn-square"
                        disabled={nName.trim() == ''}
                        on:click={copySCH}><Fa icon={faCopy} /></button
                    >
                    <button
                        class="btn btn-square"
                        disabled={nName.trim() == ''}
                        on:click={renameSCH}><Fa icon={faPencil} /></button
                    >
                    <button
                        class="btn btn-square btn-error"
                        on:click={deleteSCH}><Fa icon={faTrash} /></button
                    >
                </div>
            </div>
        </div>
    </div>
</div>
{#key selectedSchedule}
    <ScheduleEditor
        bind:schedule={$school.schedules[selectedSchedule]}
        school={$masterSettings.schools[$sc]}
    />
{/key}
