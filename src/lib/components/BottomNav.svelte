<script type="ts">
  import {Footer, Button} from "flowbite-svelte"
  //import type { SvelteComponent } from "svelte/internal";
  export let navs: {
    name: string
    href: string
    icon: any
  }[] = []
  $: colAmt = navs.length + 2
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  $: pageurl = $page.url;
  /*page.subscribe((p) => {
    pageurl = p.url; // svelte should/may have a better way of doing this
  })*/
</script>
<!-- changing button outline might not be the best idea -->
<Footer style={'grid-template-columns: repeat('+colAmt+', minmax(0, 1fr));'} class="absolute bg-gray-100 dark:bg-gray-900 place-content-center grid gap-2 grid-rows-1 bottom-0 left-0 z-20 w-full">
    <div></div>
    {#each navs as nav (nav.href)}
      <Button pill={true} outline={pageurl.pathname != nav.href} class="grid grid-cols-1 justify-items-center" on:click={() => goto(nav.href)}>
        <svelte:component this={nav.icon} />
        <div>{nav.name}</div>
      </Button>
    {/each}
    <div></div>
  </Footer>