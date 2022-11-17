import { signal, Signal } from '@preact/signals-react';
import { produce } from 'immer';

class StoreWrapper<T> {
    #s: Signal;
    get value(): T {
        return this.#s.value;
    }
    constructor(s: Signal<T>) {
        this.#s = s;
    }
    update(fn: (v: T) => T | undefined) {
        this.#s.value = produce(this.#s.peek(), fn);
    }
    async asyncUpdate(fn: (v: T) => Promise<T | undefined>) {
        const res = await produce(this.#s.peek(), fn, undefined);
        this.#s.value = res;
    }
    toString(): string {
        return this.#s.peek().toString();
    }
}

export const store = {
    theme: new StoreWrapper<'light' | 'dark'>(signal('dark')),
};

//things that should be stored in the store:
// studentvue data
// settings
// display Date

// things that shouldnt:
// computed schedule
// anything can can be computed from the store

//@ts-expect-error lmafo
window.store = store;
