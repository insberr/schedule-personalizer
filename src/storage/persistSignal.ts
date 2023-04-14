import { signal, Signal, effect } from "@preact/signals-react";
import { serify, deserify } from '@karmaniverous/serify-deserify';
// idk if this works
export function persist<T>(key: string, defaul: T): Signal<T> {
    let val = defaul;
    if (localStorage.getItem(key) != null) {
        val = deserify(JSON.parse(localStorage.getItem(key) as string));
    }
    const internal = signal<T>(val);

    effect(() => {
        localStorage.setItem(key, JSON.stringify(serify(internal.value)));
    })

    return internal
}

