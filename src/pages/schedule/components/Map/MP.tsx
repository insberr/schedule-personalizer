//@ts-expect-error cirn
import _map from "./map.svg"
import { Pin } from "./Pin";
import { mapLocations, Location } from "../../../../config/mapLocation";
import { useState, useRef, useEffect } from 'react';
import { useMouseHovered } from 'react-use';
import { Class } from "../../../../types";

type Props = {
    sch: Class[]
}

export function MP(props: Props) {
    const ref = useRef(null);
    const mouse = useMouseHovered(ref, {bound: true, whenHovered: true});
    const [cpins, setcpins] = useState<Location[]>(()=>{
        const locationsFromClasses = props.sch.map((c) => {
            return mapLocations.find(l => l.room.toString() === c.room.toString())
        })
        
        return locationsFromClasses.filter(l => l != undefined) as Location[];
    });
    useEffect(() => {
        // !!!!! maybe we should consider the element position too??????? !!!!!!!!!
        if (mouse.elX > mouse.elW || mouse.elX < 0 || mouse.elY > mouse.elH || mouse.elY < 0) {
            return;
        }
        
        // console.log("x%",Math.round((mouse.elX/mouse.elW)*100));
        
        // console.log("y%",Math.round((mouse.elY/mouse.elH)*100))
        // console.log("elpos",mouse.elX + ", " + mouse.elY);
    }, [mouse]);
    
    function clickedMap() {
        //console.log("clickX%",(mouse.elX/mouse.elW)*100);
        
        //console.log("clickY%",(mouse.elY/mouse.elH)*100)
        console.log("clickpos: ", "[ " + ((mouse.elX/mouse.elW)*100) + ", " + ((mouse.elY/mouse.elH)*100) + " ]");
        setcpins([...cpins, {room: Math.floor(Math.random()*16777215).toString(16), cords: [((mouse.elX/mouse.elW)*100), ((mouse.elY/mouse.elH)*100)]}])
    }
    
    // get schedule
    // for each class use the room number to filter through mapLocations for the coords of the room

    return (
        <div ref={ref} onClick={clickedMap} style={{"width":"100%", "height":"100%"}}>
            <_map  style={{"width":"fill-parent", "height":"auto"}}  />
            {
               cpins.map(({cords, room}) => {
                    return <Pin key={room} cords={cords} />
                })
            }
            <Pin key="mouse" cords={[(mouse.elX/mouse.elW)*100,(mouse.elY/mouse.elH)*100]} />
        </div>
    )
}