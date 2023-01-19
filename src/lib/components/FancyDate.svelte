<script type="ts">
    import { format } from 'date-fns';

    export let displayDate: Date;
    $: dow = format(displayDate, 'EEEE');
    $: month = format(displayDate, 'MMMM');
    $: day = format(displayDate, 'do');
    $: year = format(displayDate, 'yyyy');
</script>

<span>
    {#key dow}
        <span class="dow">{dow},</span>
    {/key}
    {#key month}
        <span class="month">{month}</span>
    {/key}
    {#key day}
        <span class="day">{day},</span>
    {/key}
    {#key year}
        <span class="year">{year}</span>
    {/key}
</span>

<style>
    span {
        display: inline-block;
    }
</style>
