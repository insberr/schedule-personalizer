<script type="ts">
    import Typography from '$lib/components/Typography.svelte';
import { Alert, DarkMode } from 'flowbite-svelte';
    import type {PageData} from "./$types"
    export let data: PageData;
  </script>

<Alert color="red">
  This is a test alert
</Alert>

<DarkMode />

<Typography>
<pre>
  {JSON.stringify(data)}
</pre>
</Typography>