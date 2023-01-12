<script lang="ts">
    import type { LayoutData } from './$types';
    import json5 from 'json5';
    //import { loadConfigFromFile } from 'vite';
    import type { MasterSettingsSchool, SchoolScheduleConfig } from '$types';
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { masterSettings } from '$lib/store';
    import { page } from '$app/stores';
    import CoolLink from '$lib/components/CoolLink.svelte';
    //export let data: LayoutData;
    function download(filename: string, text: string) {
        var element = document.createElement('a');
        element.setAttribute(
            'href',
            'data:application/json5;charset=utf-8,' + encodeURIComponent(text)
        );
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    let school = writable(0);
    $: dlPath =
        new URL(
            $masterSettings.schools[$school].scheduleURL,
            $page.url
        ).pathname
            .split('/')
            .pop() || 'data.json5';
    let schStore = writable<SchoolScheduleConfig | null>(null);
    let ctx = setContext('school', {
        data: schStore,
        name: school,
    });
    $: loadPromise = fetch($masterSettings.schools[$school].scheduleURL)
        .then((r) => r.text())
        .then((r) => json5.parse(r))
        .then((r) => schStore.set(r));
</script>

<div class="navbar bg-base-200">
    <div class="flex-1">
        <a href="/admin/editor" class="btn btn-ghost normal-case text-xl"
            >Editor</a
        >
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li><a class="mr-2" href="/">Back</a></li>
            <li><CoolLink href="/admin/editor/schedule">Schedule</CoolLink></li>
            <li><CoolLink href="/admin/editor/events">Events</CoolLink></li>
            <li><CoolLink href="/admin/editor/default">Default</CoolLink></li>
        </ul>
    </div>
</div>

<div class="center">
    <div class="paper">
        <select
            bind:value={$school}
            disabled={$masterSettings.schools.length == 1}
            class="select w-fit"
        >
            {#each $masterSettings.schools as sch, i}
                <option value={i}>{sch.stvName}</option>
            {/each}
        </select>
    </div>
</div>

{#await loadPromise}
    loading...
{:then _}
    {#if $schStore != null}
        <slot />
    {/if}
{/await}

<button
    class="btn btn-primary"
    on:click={() => download(dlPath, json5.stringify($schStore))}>Finish</button
>
