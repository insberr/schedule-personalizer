export interface IPaleKing {
    pathfind: (grid: number[][], start: number[], end: number[]) => number[][];
    buildMatrix: (data: ImageData) => number[][];
}
