//@ts-expect-error cirn
import _map from "./map.svg"
import { Pin } from "./Pin";
import { mapLocations } from "../../../../config/mapLocation";
import { useState, useRef, useEffect } from 'react';
import { useMouse } from 'react-use';

export function MP() {
    const ref = useRef(null)
    const mouse = useMouse(ref);
    const [cpins, setcpins] = useState<{room: string,cords: number[]}[]>([])
    useEffect(() => {
        if (mouse.elX > mouse.elW || mouse.elX < 0 || mouse.elY > mouse.elH || mouse.elY < 0) {
            return;
        }
        console.log("x%",Math.round((mouse.elX/mouse.elW)*100));
        
        console.log("y%",Math.round((mouse.elY/mouse.elH)*100))
        console.log("elpos",mouse.elX + ", " + mouse.elY);
    }, [mouse]);
    
    function clickedMap() {
        //console.log("clickX%",(mouse.elX/mouse.elW)*100);
        
        //console.log("clickY%",(mouse.elY/mouse.elH)*100)
        console.log("clickpos",mouse.elX + ", " + mouse.elY);
        setcpins([...cpins, {room: Math.floor(Math.random()*16777215).toString(16), cords: [Math.round((mouse.elX/mouse.elW)*100), Math.round((mouse.elY/mouse.elH)*100)]}])
    }
    
    return (
        <div ref={ref} onClick={clickedMap} style={{"width":"100%", "height":"100%"}}>
            <_map style={{"width":"fill-parent", "height":"auto"}}  />
            {
               ([...mapLocations,...cpins]).map(({cords, room}) => {
                    return <Pin key={room} cords={cords} />
                })
            }
            <Pin key="mouse" cords={[(mouse.elX/mouse.elW)*100,(mouse.elY/mouse.elH)*100]} />
        </div>
    )
}