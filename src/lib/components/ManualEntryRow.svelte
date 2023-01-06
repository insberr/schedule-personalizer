<script type="ts">
    import type { CL } from '$types';
    import Textbox from './Textbox.svelte';

    export let classCL: CL;
</script>

<div class="grid gap-4 grid-rows-1 grid-cols-3">
    <Textbox label="Class" bind:value={classCL.name} />
    <Textbox label="Teacher" bind:value={classCL.teacher.name} />
    <Textbox label="Room" bind:value={classCL.room} />
</div>
