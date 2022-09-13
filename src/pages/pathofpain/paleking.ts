import { expose } from 'comlink'
import {IPaleKing} from "./type"
import PF from "pathfinding";


const mapColoring = {
    hallway: { r: 183, g: 183, b: 183, a: 255 },
    door: { r: 255, g: 255, b: 255, a: 255 },
    wall: { r: 0, g: 0, b: 0, a: 255 },
    outside: { r: 0, g: 0, b: 0, a: 0 },
}

function determinePassable(r: number, g: number, b: number, a: number) {
    if (r < 75 && g < 75 && b < 75 && a > 1) {
        return 1;
    }
    return 0;
}

const getColor = (x: number, y: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const data = ctx.getImageData(x, y, 1, 1).data;
    return data;
  }
  function makeArray<T>(w: number, h: number, val: T): T[][] {
    const arr: any[] = [];
    for(let i = 0; i < h; i++) {
        arr[i] = [];
        for(let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}
class PaleKing implements IPaleKing { 
    pathfind(grid: number[][], start: number[], end: number[]): number[][] {
        const finder = new PF.AStarFinder({
            diagonalMovement: PF.DiagonalMovement.OnlyWhenNoObstacles
        });
        const pfgrid = new PF.Grid(grid);
        return PF.Util.smoothenPath(pfgrid,finder.findPath(start[0], start[1], end[0], end[1], pfgrid.clone()));
    }
    buildMatrix(data: ImageData): number[][] {
        const matrix: number[][] = makeArray<number>(data.width, data.height, -1);
        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                const i = (y * data.width + x) * 4;
                const r = data.data[i];
                const g = data.data[i + 1];
                const b = data.data[i + 2];
                const a = data.data[i + 3];
                //console.log(r, g, b, a);
                matrix[y][x] = determinePassable(r,g,b,a);
            }
            console.log("col",y,data.width);
        }
        return matrix;
    }
}
expose(new PaleKing());
