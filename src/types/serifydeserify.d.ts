declare module '@karmaniverous/serify-deserify' {
    export function serify<T>(val: T): any;
    export function deserify<T>(val: any): T;
}
