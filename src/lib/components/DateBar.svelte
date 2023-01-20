<script type="ts">
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';

    function mapBetween(currentNum: number, min: number, max: number): number {
        let minAllowed = 0;
        let maxAllowed = 100;
        return (
            ((maxAllowed - minAllowed) * (currentNum - min)) / (max - min) +
            minAllowed
        );
    }
    export let destDate: Date;
    export let startDate: Date;
    let progress = tweened(0, { duration: 100 });
    let now = new Date();
    onMount(() => {
        let x = setInterval(() => {
            now = new Date();
        }, 100);
        return () => {
            clearInterval(x);
        };
    });
    $: progress.set(
        mapBetween(now.getTime(), startDate.getTime(), destDate.getTime())
    );
</script>

<div class="w-full flex flex-row items-center">
    <span class="w-fit mx-2">{$progress.toFixed(2)}%</span>
    <progress
        class="progress progress-success mx-2"
        value={$progress}
        max={100}
    />
</div>
