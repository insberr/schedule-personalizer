import { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button'
import { useLockBodyScroll, usePinchZoom, useToggle } from "react-use";
import Center from "../components/Center";

export const Demo = () => {
    const [scale, setScale] = useState(1);
    const scaleRef = useRef<HTMLDivElement>(null);
    const { zoomingState, pinchState } = usePinchZoom(scaleRef);
    
    const [locked, toggleLocked] = useToggle(false)
    useLockBodyScroll(locked);
    
    useEffect(() => {
        
        if (scale < 0.05) return setScale(0.05);

        if (zoomingState === "ZOOMING_IN") {
            // perform zoom in scaling
            setScale(scale + 0.01)
        } else if (zoomingState === "ZOOMING_OUT") {
            // perform zoom out in scaling
            setScale(scale - 0.01)
        }
    }, [zoomingState, pinchState]);

    return (
        <>
        <div>test page</div>
        <pre className="paper">
            Pinch: { JSON.stringify(pinchState, null, 2) }
            { '\n' }
            Zoom: { JSON.stringify(zoomingState, null, 2) }
            { '\n' }
            Scale: { scale }
        </pre>
        <Button onClick={() => toggleLocked()}>
            {locked ? 'Unlock' : 'Lock'}
        </Button>
        <div ref={scaleRef} style={{ 'border': '2px solid red' }}>
            <img
                src="https://www.olympus-imaging.co.in/content/000107506.jpg"
                style={{
                    'zoom': scale,
                }}
            />
        </div>
        </>
    )
}
