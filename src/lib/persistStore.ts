//mport { json } from "@sveltejs/kit"
import { serialize, deserialize } from '@macfja/serializer';
import { writable, type Writable } from 'svelte/store';

export function persistWritable<T>(key: string, defaultItem: T): Writable<T> {
    if (typeof localStorage == 'undefined') {
        return writable(defaultItem);
    }

    let dt = localStorage.getItem(key);
    if (dt == undefined) {
        dt = serialize({ v: defaultItem });
    }
    let obj: T = deserialize(dt).v;
    const store = writable(obj);
    store.subscribe((n) => {
        localStorage.setItem(key, serialize({ v: n }));
    });
    return store;
}
