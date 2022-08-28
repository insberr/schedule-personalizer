import { useEffect, useRef, useState } from "react";
import { usePinchZoom } from "react-use";
import Center from "../components/Center";

export const Demo = () => {
    const [scale, setState] = useState(0);
    const scaleRef = useRef<HTMLDivElement>(null);
    const { zoomingState, pinchState } = usePinchZoom(scaleRef);

    useEffect(() => {
        
        if (zoomingState === "ZOOM_IN") {
            // perform zoom in scaling
            setState(scale + 0.1)
        } else if (zoomingState === "ZOOM_OUT") {
            // perform zoom out in scaling
            setState(scale - 0.1)
        }
    }, [zoomingState, pinchState]);

    return (
        <>
        <div>test page</div>
        <pre className="paper">
            Pinch: { JSON.stringify(pinchState, null, 2) }
            { '\n' }
            Zoom: { JSON.stringify(zoomingState, null, 2) }
        </pre>
        <Center>
            <div ref={scaleRef}>
                <img
                    src="https://www.olympus-imaging.co.in/content/000107506.jpg"
                    style={{
                        'width': '80%', 'height': '80%',
                        'transform': `scale(${scale})`,
                    }}
                />
            </div>
        </Center>
        </>
    )
}
