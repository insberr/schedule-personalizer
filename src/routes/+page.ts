import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
  // load/fetch inital data, ie read content from localstorage
  // runs before page is shown, prevents pop in.
  // they can also redirect people, ie to setup https://kit.svelte.dev/docs/load#redirects
  // you could also rerun this function if you want, https://kit.svelte.dev/docs/load#invalidation-manual-invalidation
  // top level promises are awaited automatically
  // loading things like settings 
  // (not specific for one page should probably be done in +layout.ts, things loaded there are available everywhere)
  window.alert(2)
  return {
    from: "this is data from +page.ts"
  }
}) satisfies PageLoad;