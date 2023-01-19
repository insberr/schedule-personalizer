<script type="ts">
    import ManualEntryRow from '$lib/components/ManualEntryRow.svelte';
    import ManualEntryTerm from '$lib/components/ManualEntryTerm.svelte';
    import { masterSettings, schoolName } from '$lib/store/masterSettings';
    import { emptyCL } from '$types';
    import { toast } from 'svelte-french-toast';
    import type { Terms } from '$types';
    // import { fade } from 'svelte/transition';
    import { manualTerms } from '$lib/store/manual';
    import { isStudentvue } from '$lib/store/studentvue';
    import { goto } from '$app/navigation';
    import { get, writable } from 'svelte/store';
    let selectedSchool = 0;
    $: settings = $masterSettings.schools[selectedSchool];
    //import { INFOPATH } from '$env/static/private';
    let displayedTerm: number = 0;
    //import { empty } from "svelte/internal";
    $: terms = writable(
        structuredClone(settings.terms).map((v, i) => {
            return {
                startDate: new Date(v.start),
                endDate: new Date(v.end),
                termIndex: i,
                classes: emptyCL(
                    settings.numberOfPeriods,
                    settings.hasAdvisory
                ),
            };
        }) as Terms
    );
    $: missingName = $terms.map(
        (i) => i.classes.filter((c) => c.name.trim() == '').length
    );
    $: missingTeacher = $terms.map(
        (i) => i.classes.filter((c) => c.teacher.name.trim() == '').length
    );
    $: missingRoom = $terms.map(
        (i) => i.classes.filter((c) => c.room.trim() == '').length
    );
    $: totalWarn = $terms.map(
        (_, i) => missingName[i] + missingTeacher[i] + missingRoom[i]
    );
    $: shouldShowError = totalWarn.reduce((a, b) => a + b, 0) > 0;
    function finishSetup() {
        if (shouldShowError) {
            if (
                !confirm(
                    'There are still warnings left, are you sure you want to complete setup? (todo: replace this with a modal)'
                )
            )
                return;
        }
        manualTerms.set(get(terms));
        isStudentvue.set(false);
        schoolName.set(settings.stvName);
        localStorage.setItem('setup-complete', 'true');
        //toast.success('Setup complete!');
        toast.promise(goto('/'), {
            loading: 'Finishing up...',
            success: 'Setup complete!',
            error: 'Failed to setup!',
        });
    }
    //emetyCL(settings.numberOfPeriods settings.hasAdvisory)
</script>

<h1 class="my-4 text-center">Cringe manual setup</h1>
<div class="m-auto w-fit text-center">
    <div class="paper m-auto w-fit">
        <h3>School</h3>
        <select
            bind:value={selectedSchool}
            disabled={$masterSettings.schools.length == 1}
            class="select w-fit"
        >
            {#each $masterSettings.schools as sch, i}
                <option value={i}>{sch.stvName}</option>
            {/each}
        </select>
    </div>
</div>
<div class="m-auto w-fit text-center">
    <div class="paper m-auto w-fit">
        <h3>Terms</h3>
        <input
            type="range"
            min="0"
            max={$terms.length - 1}
            bind:value={displayedTerm}
            class="range"
            step="1"
        />
        <div class="w-full flex justify-between text-xs px-2">
            {#each $terms as _, tid}
                <span
                    class:text-warning={totalWarn[tid] > 0}
                    class:text-success={totalWarn[tid] == 0}>{tid + 1}</span
                >
            {/each}
        </div>
    </div>
</div>
<div class="m-auto w-fit text-center">
    {#each $terms as _, tind}
        {#if tind == displayedTerm}
            <div class="paper">
                <h3>Term {tind + 1}</h3>
                <ManualEntryTerm bind:classes={$terms[tind].classes} />
            </div>
        {/if}
    {/each}
</div>
<div class="m-auto w-fit">
    {#if shouldShowError}
        <div class="alert alert-warning my-4 shadow-lg w-fit">
            <div class="grid gap-4 grid-rows-1 grid-cols-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    /></svg
                >
                <span>Warning!</span>
                {#each $terms as _, term}
                    {#if totalWarn[term] > 0}
                        <div class="grid gap-1 grid-cols-1">
                            <span>Term {term + 1}:</span>
                            {#if missingName[term] > 0}<span
                                    >&nbsp;&nbsp;Classes missing a name: {missingName[
                                        term
                                    ]}</span
                                >{/if}
                            {#if missingRoom[term] > 0}<span
                                    >&nbsp;&nbsp;Classes missing a room: {missingRoom[
                                        term
                                    ]}</span
                                >{/if}
                            {#if missingTeacher[term] > 0}<span
                                    >&nbsp;&nbsp;Classes missing a teacher: {missingTeacher[
                                        term
                                    ]}</span
                                >{/if}
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {:else}
        <div class="alert alert-success shadow-lg w-fit my-4">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    /></svg
                >
                <span>Everything looks good!</span>
            </div>
        </div>
    {/if}
</div>
<div class="w-fit m-auto my-r">
    <button
        on:click={finishSetup}
        class="w-fit m-auto btn"
        class:btn-warning={shouldShowError}
        class:btn-success={!shouldShowError}>Finish</button
    >
</div>

<pre class="bg-base-200 text-left">
    {JSON.stringify($terms, null, 2)}
</pre>
