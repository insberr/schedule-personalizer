import { Typography } from '@mui/material';
import { useSpring, animated, AnimationResult, SpringValue } from '@react-spring/web';
import { useState } from 'preact/hooks';

type Props = {
    children?: JSX.Element | JSX.Element[];
};

export function IntroPonent(props: Props) {
    const [stage1Complete, setStage1Complete] = useState<boolean>(localStorage.getItem('dev_skip') == '1');
    const animWelcome = useSpring({
        to: [
            { opacity: 1, left: '49%', position: 'absolute', transform: 'translate(-50%, -50%)' },
            { left: '40%', opacity: 0, special: 1 },
        ],
        from: {
            opacity: 0,
            top: '50%',
            left: '60%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            special: 0,
        },
        reset: true,
        delay: 100,
        immediate: stage1Complete,
        config: {
            tension: 290,
            friction: 50,
        },
    });
    const animWelcome2 = useSpring({
        to: [
            { opacity: 1, left: '51%', position: 'absolute', transform: 'translate(-50%, -50%)' },
            { left: '60%', opacity: 0, special: 1 },
        ],
        from: {
            opacity: 0,
            top: '60%',
            left: '40%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            special: 0,
        },
        reset: true,
        delay: 100,
        immediate: stage1Complete,
        config: {
            tension: 280,
            friction: 50,
        },
        onChange: {
            special: (result: AnimationResult<SpringValue<number>>) => {
                //console.log(result);
                //@ts-expect-error typescript moment
                const r: number = result;
                if (r == 1) {
                    setStage1Complete(true);
                }
            },
        },
    });
    if (!stage1Complete) {
        return (
            <>
                <Typography variant="h2" gutterBottom className="text-center">
                    <animated.span style={animWelcome as never}>
                        <strong>Welcome</strong>
                    </animated.span>
                </Typography>
                <Typography display="block" variant="overline" className="text-center">
                    <animated.span className="text-muted" style={animWelcome2 as never}>
                        <strong>Schedule Peronalizer v6</strong>
                    </animated.span>
                </Typography>
            </>
        );
    } else {
        return <>{props.children}</>;
    }
}
