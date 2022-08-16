import { useSpring, animated, config } from "@react-spring/web";

export function FadeIn(props: { children: React.ReactNode }) {
    const fadein = useSpring({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
        config: config.stiff,
    });
    return <animated.span style={fadein}>{props.children}</animated.span>;
}
