//@ts-expect-error cirn
import _map from "../../../../config/map.svg"
import { Pin } from "./Pin";
import { mapLocations, Location } from "../../../../config/mapLocation";
import { useState, useRef, useEffect } from 'react';
import { useMouseHovered } from 'react-use';
import { Class, ClassIDS } from "../../../../types";
import * as Sentry from '@sentry/react';
type Props = {
    sch: Class[]
}

export function MP(props: Props) {
    const ref = useRef(null);
    const mouse = useMouseHovered(ref, {bound: true, whenHovered: true});
    const [cpins, setcpins] = useState<Location[]>(()=>{
        const locationsFromClasses = props.sch.map((c) => {
            if (['', ' '].includes(c.room.toString())) return undefined; // if no room number, prevent sentry error cause its annoying
            const m = mapLocations.find(l => l.room.toString() === c.room.toString())
            if (c.classID === ClassIDS.Period && m === undefined) {
                console.error("Could not find location for class", c);
                console.log(mapLocations)
                Sentry.captureMessage(`Room '${c.room}' not found in mapLocations`, "warning");
            }
            return m
        })
        if (process.env.NODE_ENV === 'development') {
            return mapLocations;
        }
        return locationsFromClasses.filter(l => l != undefined) as Location[];
    });
    
    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') return;
        if (mouse.elX > mouse.elW || mouse.elX < 0 || mouse.elY > mouse.elH || mouse.elY < 0) {
            return;
        }
    }, [mouse]);

    
    function clickedMap() {
        if (process.env.NODE_ENV !== 'development') return;
        console.log("{ room: '', cords: [ " + ((mouse.elX/mouse.elW)*100) + ", " + ((mouse.elY/mouse.elH)*100) + " ] },");
        // REMOVE THIS SSSSSS FOR PRODUCTION
        // navigator.clipboard.writeText("{ room: '', cords: [ " + ((mouse.elX/mouse.elW)*100) + ", " + ((mouse.elY/mouse.elH)*100) + " ] },")
        // END REMOVE
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