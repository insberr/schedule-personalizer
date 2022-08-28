import { useEffect, useRef, useState } from "react";
import { usePinchZoom } from "react-use";

export const Demo = () => {
    const [scale, setState] = useState(1);
    const scaleRef = useRef();
    const { zoomingState, pinchState } = usePinchZoom(scaleRef);

    useEffect(() => {
        if (zoomingState === "ZOOM_IN") {
        // perform zoom in scaling
        setState(scale + 0.1)
        } else if (zoomingState === "ZOOM_OUT") {
        // perform zoom out in scaling
        setState(scale - 0.1)
        }
    }, [zoomingState]);

    return (
        <div ref={scaleRef}>
        <img
            src="https://www.olympus-imaging.co.in/content/000107506.jpg"
            style={{
            zoom: scale,
            }}
        />
        </div>
    )
}
