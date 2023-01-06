<script type="ts">
  import ManualEntryRow from "$lib/components/ManualEntryRow.svelte";
  import ManualEntryTerm from "$lib/components/ManualEntryTerm.svelte";
  import { settings } from "$lib/studentvue";
  import { emptyCL, } from "$types";
  import type { Terms } from "$types";
  let displayedTerm: number = 0;
  //import { empty } from "svelte/internal";
  let terms: Terms = structuredClone(settings.termsDates).map((v) => {
    return {
        ...v,
        classes: emptyCL(settings.numberOfPeriods, settings.hasAdvisory)
    }
})
  //emptyCL(settings.numberOfPeriods, settings.hasAdvisory)
</script>
<h1 class="my-4 text-center">Cringe manual setup</h1>
<div class="paper">
<input type="range" min="0" max={terms.length-1} bind:value={displayedTerm} class="range" step="1" />
<div class="w-full flex justify-between text-xs px-2">
    {#each terms as _, tid}
        <span>{tid+1}</span>
    {/each}
  </div>
</div>
{#each terms as _, tind}
{#if tind == displayedTerm}
<div class="paper">
    <h3>Term {tind+1}</h3>
<ManualEntryTerm bind:classes={terms[tind].classes}></ManualEntryTerm>
</div>
{/if}
{/each}
<pre class="bg-base-200 text-left">
    {JSON.stringify(terms,null,2)}
</pre>
