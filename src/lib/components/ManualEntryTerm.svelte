<script type="ts">
    import type { CL, Terms } from '$types';
    import ManualEntryRow from './ManualEntryRow.svelte';

    //import { settings } from "$lib/studentvue";
    //import { emptyCL } from "$types";
    export let classes: CL[] = []; //emptyCL(settings.numberOfPeriods, settings.hasAdvisory)
</script>

{#each classes as cls, ind}
    <div class="w-full my-1">
    <div class="divider divider-horizontal"></div>
    <ManualEntryRow bind:classCL={classes[ind]} />
    </div>
{/each}
