
export type Location = {
    room: string,
    cords: number[]
}

export type Locations = Location[];

export const mapLocations: Locations = [
    { room: 'greenhouse', cords: [ 17.882249560632687, 15.775581877276792 ] },
    { room: "123", cords: [ 36.96741854636591, 51.64561687301686 ] },
    { room: "120", cords: [42.5, 51] },
    { room: "115", cords: [ 43.42105263157895, 61.57220182915448 ] },
]