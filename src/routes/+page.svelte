<script>
    import { schedule } from '$lib/store/schedule';
    import {
        masterSettings,
        scheduleConfig,
        schoolName,
    } from '$lib/store/masterSettings';
    import Textbox from '$lib/components/Textbox.svelte';
</script>

<a href="/setup" class="btn btn-error">Go to setup</a>
<h3>Your classes</h3>
<pre class="bg-base-200 text-left">
  {JSON.stringify($schedule, null, 2)}
</pre>
<h3>Master config</h3>
<pre class="bg-base-200 text-left">
  {JSON.stringify($masterSettings, null, 2)}
</pre>
<h3>schedule config</h3>
<pre class="bg-base-200 text-left">
  {JSON.stringify($scheduleConfig, null, 2)}
</pre>
<h3>school Name</h3>
<pre class="bg-base-200 text-left">
  {$schoolName}
</pre>
<!--<p>Hello {$nameStore}!</p>
<Textbox bind:value={$nameStore} isError={$nameStore.length == 0} />-->
