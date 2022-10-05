import { useSpring, animated, config } from "@react-spring/web";
import { useEffect } from "react";

export function Slide(props: { children: React.ReactNode, viewDate: Date }) {
    const slide = useSpring({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
        config: {
            tension: 290,
            friction: 50
        },
    });
    return <animated.div style={slide}>{props.children}</animated.div>;
}