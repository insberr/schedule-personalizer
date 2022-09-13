// Hollow Knight Reference: https://hollowknight.fandom.com/wiki/Path_of_Pain
// LMAO Copilot suggested that url
// This is so good
// DO NOT REMOVE THESE COMMENTS OR YOU WILL BE FIRED OR A MONSTER WILL APPEAR UNDER YOUR BED
import { wrap, transfer } from "comlink";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useAsync } from "react-use";
import { IPaleKing } from "./type"

function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return { x, y }
}



const _map = new URL('../../config/map.svg', import.meta.url);
const mult=1;

const width = 1138*mult;
const height = 780*mult;

const ThePaleKing = wrap<IPaleKing>(new Worker(new URL("./paleking.ts", import.meta.url), {type: "module"}));
export default function PathOfPain() {
    const ref = useRef<HTMLDivElement | null>(null);
    async function constructPath() {
        if (!ref.current) {
            return;
        }
        const canvas = document.createElement("canvas");
            if (ref.current.lastChild) {
                if (ref.current.lastChild instanceof HTMLCanvasElement) {
                    ref.current.removeChild(ref.current.lastChild);
                }
            }
        ref.current.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
            return;
        }
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.onload = async () => {
            
            if (!canvas) {
                return;
            }
            if (!ctx) {
                return;
            }
            // This shows the map svg. Its very important
            
            ctx.drawImage(img, 0, 0, width, height, 0, 0, width/mult, height/mult);
            console.log(width, height);
            
            const data = ctx.getImageData(0, 0, width, height)
            const d = await ThePaleKing.buildMatrix(transfer(data,[data.data.buffer]))
            console.log(d)
            console.log(canvas.width, canvas.height)
            canvas.addEventListener('click', function(e) {
                const {x,y} = getCursorPosition(canvas, e)
                console.log(x,y)
                ctx.fillStyle = "green";
                ctx.fillRect(x, y, 1, 1);
            })
            ctx.scale(1,1)
            for (const _row in d) {
                const row = parseInt(_row)
                console.log(row, d.length);
                for (const _col in d[row]) {
                    const col = parseInt(_col)
                    if (d[row][col] === 1) {
                        ctx.fillStyle = "black";
                        ctx.fillRect(col, row, 1, 1);
                    } else {
                        ctx.fillStyle = "white";
                        ctx.fillRect(col, row, 1, 1);
                    }
                    
                }
                
            }
            
            console.log("done, starting pathfind")
            async function drawPathfinding(grid: number[][], ctx: CanvasRenderingContext2D, e: number[][], color: string) {
                const path = await ThePaleKing.pathfind(grid, e[0], e[1])
                console.log(path);
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(path[0][0], path[0][1])
                for (const item of path) {
                    const [x,y] = item;
                    ctx.lineTo(x,y)
                    ctx.stroke();
                }
                ctx.endPath();
                
            }
            drawPathfinding(d, ctx, [[152, 172], [856,466]], "red")
            drawPathfinding(d, ctx, [[856,466], [524,369]], "green")
            drawPathfinding(d, ctx, [[524, 369], [277,622]], "blue")
        }
        img.src = _map.href;
    }
    return (<>
            <div >Path of Pain</div>
            <Button variant="crimson" onClick={() => { constructPath() }}>Build Path</Button>
            <div ref={ref} style={{ overflowX: "clip", width: width/mult, height: height/mult }}><img src={_map.href} style={{ pointerEvents: "none", opacity:0.25, position:"absolute", zIndex: 1, width: width/mult, height: height/mult}} /></div>
            </>);  
}
