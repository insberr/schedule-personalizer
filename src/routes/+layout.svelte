<script type="ts">
  import "../app.scss";
  import "../app.postcss";
  import { A, Footer } from "flowbite-svelte";
  import {page} from '$app/stores'
  import { is_function } from "svelte/internal";
  let pageurl: URL
  page.subscribe((p) => {
    pageurl = p.url
  })
</script>

<slot />
<p>Current Route: {pageurl.pathname}</p>
<!-- The divs inside could be made into icon buttons with a href="/page" to allow sveltekit to do our routing-->
<!-- I should write a reusable component for this, make it look less ugly snd hardcoded -->
<!-- and make this resuable component automatically highlight the current page -->
{#if pageurl.pathname != "/setup"}
<Footer class="absolute bg-gray-100 dark:bg-gray-900 place-content-center grid gap-2 grid-cols-7 grid-rows-1 bottom-0 left-0 z-20 w-full">
  <div></div>
    <A href="/">
      Schedule
    </A>
    <A href="/settings">
      Settings
    </A>
    <A href="/setup"> 
      Setup
    </A>
    <A>
      page 4
    </A>
    <A>
      page 5
    </A>
    <div></div>
</Footer>
{/if}