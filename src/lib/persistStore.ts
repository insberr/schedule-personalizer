//mport { json } from "@sveltejs/kit"

import { writable, type Writable } from "svelte/store";

export function persistWritable<T>(key: string, defaultItem: T): Writable<T> {
    let dt = localStorage.getItem(key)
    if (dt == undefined) {
        dt = JSON.stringify(defaultItem);
    }
    let obj: T = JSON.parse(dt);
    const store = writable(obj);
    store.subscribe((n) => {
        localStorage.setItem(key, JSON.stringify(n))
    })
    return store;
}
