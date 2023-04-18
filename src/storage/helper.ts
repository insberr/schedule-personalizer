import { produce } from 'immer';
import type { Signal } from '@preact/signals-react';
export function deepUpdate<T>(signal: Signal<T>, fn: (value: T) => void) {
    produce(signal.peek(), fn);
}

