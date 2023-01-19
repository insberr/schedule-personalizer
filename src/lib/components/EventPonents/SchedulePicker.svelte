<script type="ts">
    import type { OptionalMatcher, Schedule } from '$types';
    import { nanoid } from 'nanoid';
    export let force = false;
    export let schedules: { [key: string]: Schedule };
    let initial = Object.keys(schedules)[0];
    export let value: OptionalMatcher<string> | undefined;
    export let termCount = 1;

    let checkid = nanoid();
    let selectID = nanoid();
    let itemIDS = Array(16).map(() => nanoid());

    let show = value != undefined || force;
    let mType: 'VAL' | 'DOW' | 'TERM' = 'VAL';
    $: {
        if (!force) {
            if (show) {
                if (value == undefined) {
                    value = initial;
                    mType = 'VAL';
                }
            } else {
                value = undefined;
            }
        }
    }
    function overR() {
        switch (mType) {
            case 'VAL':
                value = initial;
                break;
            case 'DOW':
                value = {
                    matchtype: 'DOW',
                    sun: initial,
                    mon: initial,
                    tue: initial,
                    wed: initial,
                    thu: initial,
                    fri: initial,
                    sat: initial,
                };
                break;
            case 'TERM':
                value = {
                    matchtype: 'TERM',
                };
                for (let i = 0; i < termCount; i++) {
                    value[i.toString()] = initial;
                }

                break;
        }
    }
    let dowIDS = {
        sun: nanoid(),
        mon: nanoid(),
        tue: nanoid(),
        wed: nanoid(),
        thu: nanoid(),
        fri: nanoid(),
        sat: nanoid(),
    };
</script>

{#if !force}
    <label for={checkid} class="label">Enable Override Schedule</label>
    <input type="checkbox" class="checkbox" bind:checked={show} id={checkid} />
{/if}

{#if force || show}
    <label for={selectID} class="label">Schedule Type</label>
    <select class="select" bind:value={mType} on:change={(e) => overR()}>
        <option value="VAL">Single</option>
        <option value="DOW">Day of Week</option>
        <option value="TERM">Term</option>
    </select>

    <!-- Replace these! -->
    {#if typeof value == 'string'}
        <select class="select" bind:value>
            {#each Object.entries(schedules) as [key, value]}
                <option value={key}>{value.name}</option>
            {/each}
        </select>
    {:else if value?.matchtype == 'DOW'}
        <!-- BAD BAD BAD BAD -->
        <div class="form-control">
            <label for={dowIDS.sun} class="label">Sunday</label>
            <select id={dowIDS.sun} class="select" bind:value={value.sun}>
                {#each Object.entries(schedules) as [key, value]}
                    <option value={key}>{value.name}</option>
                {/each}
            </select>
        </div>
        <div class="form-control">
            <label for={dowIDS.mon} class="label">Monday</label>
            <select id={dowIDS.mon} class="select" bind:value={value.mon}>
                {#each Object.entries(schedules) as [key, value]}
                    <option value={key}>{value.name}</option>
                {/each}
            </select>
        </div>
        <div class="form-control">
            <label for={dowIDS.tue} class="label">Tuesday</label>
            <select id={dowIDS.tue} class="select" bind:value={value.tue}>
                {#each Object.entries(schedules) as [key, value]}
                    <option value={key}>{value.name}</option>
                {/each}
            </select>
        </div>
        <div class="form-control">
            <label for={dowIDS.wed} class="label">Wednesday</label>
            <select id={dowIDS.wed} class="select" bind:value={value.wed}>
                {#each Object.entries(schedules) as [key, value]}
                    <option value={key}>{value.name}</option>
                {/each}
            </select>
        </div>
        <div class="form-control">
            <label for={dowIDS.thu} class="label">Thursday</label>
            <select id={dowIDS.thu} class="select" bind:value={value.thu}>
                {#each Object.entries(schedules) as [key, value]}
                    <option value={key}>{value.name}</option>
                {/each}
            </select>
        </div>
        <div class="form-control">
            <label for={dowIDS.fri} class="label">Friday</label>
            <select id={dowIDS.fri} class="select" bind:value={value.fri}>
                {#each Object.entries(schedules) as [key, value]}
                    <option value={key}>{value.name}</option>
                {/each}
            </select>
        </div>
        <div class="form-control">
            <label for={dowIDS.sat} class="label">Saturday</label>
            <select id={dowIDS.sat} class="select" bind:value={value.sat}>
                {#each Object.entries(schedules) as [key, value]}
                    <option value={key}>{value.name}</option>
                {/each}
            </select>
        </div>
    {:else if value?.matchtype == 'TERM'}
        {#each Array(termCount) as _, t}
            <div class="form-control">
                <label for={itemIDS[t]} class="label">Term {t + 1}</label>
                <select
                    id={itemIDS[t]}
                    class="select"
                    bind:value={value[t.toString()]}
                >
                    {#each Object.entries(schedules) as [key, value]}
                        <option value={key}>{value.name}</option>
                    {/each}
                </select>
            </div>
        {/each}
    {/if}
{/if}
