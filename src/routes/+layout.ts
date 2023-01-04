import type { LayoutLoad } from './$types';
 
export const load = (async () => {
    // things loaded here are accessable from anywhere in the app, maybe fetch/load schedule info? 
  return {
    layout: "content from +layout.ts!"
  };
}) satisfies LayoutLoad;

export const prerender = true;
// prerender the entire app
export const ssr = false;
// disable ssr, the page will be blank if there is no js/while the js is downloading (same as old sp),
// app is entirely rendered client side
