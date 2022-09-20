declare global {
    interface Window {
        astar: AStar;
    }
}

export class AStar {

}

window.astar = new AStar();
