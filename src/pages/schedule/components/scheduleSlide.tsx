import { useSpring, animated } from "@react-spring/web";

export function Slide(props: { children: React.ReactNode }) {
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