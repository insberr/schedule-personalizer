<script type="ts">
    import { ClassIDS, type CL } from '$types';
    import Textbox from './Textbox.svelte';

    export let classCL: CL;
</script>

<div class="grid gap-4 grid-rows-1 grid-cols-3">
    <Textbox
        label="Class"
        warning={classCL.name.trim() == ''}
        disabled={classCL.classID == ClassIDS.Advisory}
        bind:value={classCL.name}
    />
    <Textbox
        label="Teacher"
        warning={classCL.teacher.name.trim() == ''}
        bind:value={classCL.teacher.name}
    />
    <Textbox
        label="Room"
        warning={classCL.room.trim() == ''}
        bind:value={classCL.room}
    />
</div>
