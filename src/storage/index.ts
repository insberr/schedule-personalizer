import { signal, Signal, computed, effect } from '@preact/signals-react';
import { produce } from 'immer';
import { serify, deserify } from '@karmaniverous/serify-deserify';
import { useEffect, useState } from 'react';
import { Page } from '../types';
import { SCS } from 'schedule-script';
export class StoreWrapper<T> {
    #signal: Signal;
    get value(): T {
        return this.#signal.value;
    }
    set value(v: T) {
        this.#signal.value = v;
    }
    constructor(s: Signal<T>) {
        this.#signal = s;
    }
    update(fn: (v: T) => T | undefined) {
        this.#signal.value = produce(this.#signal.peek(), fn);
    }
    async asyncUpdate(fn: (v: T) => Promise<T | undefined>) {
        const res = await produce(this.#signal.peek(), fn, undefined);
        this.#signal.value = res;
    }
    toString(): string {
        return this.#signal.peek().toString();
    }
}

function persistRead<T>(key: string, def: T): Signal<T> {
    const val = localStorage.getItem(key);
    if (val) {
        return signal(deserify<T>(JSON.parse(val) as T));
    }
    return signal(def);
}

function persistWrite<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(serify(value)));
}

export const store: { [key: string]: StoreWrapper<any> } = {
    theme: new StoreWrapper<'light' | 'dark'>(persistRead('theme', 'dark')), // you could also read the default from the OS
    themeMessage: new StoreWrapper(computed(() => `Current theme is ${store.theme.value}`)),
    route: new StoreWrapper<Page>(signal(Page.schedule)),
    scs: new StoreWrapper<SCS | null>(signal(null)),
};

//things that should be stored in the store:
// studentvue data
// settings
// display Date

// things that shouldnt:
// computed schedule
// anything can can be computed from the store
// you shouldnt ever read -> compute -> write, you should use computed() from signals

// for types, we should create special hooks that return the correct type
// ie:
// function useTheme(): StoreWrapper<'light' | 'dark'> {
//     return store.theme;
// }

// persistance
effect(() => {
    persistWrite('theme', store.theme.value);
});

//@ts-expect-error lmafo
window.store = store;
