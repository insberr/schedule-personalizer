<script type="ts">
    import { formatDuration, intervalToDuration } from 'date-fns';
    import { onMount } from 'svelte';

    let now = new Date();
    onMount(() => {
        let x = setInterval(() => {
            now = new Date();
        }, 100);
        return () => {
            clearInterval(x);
        };
    });
    export let destDate: Date;
    $: message = formatDuration(
        intervalToDuration({
            start: now,
            end: destDate,
        })
    );
</script>

<div>{message}</div>
