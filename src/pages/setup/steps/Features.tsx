import { useSpringRef, useSpring, config, useChain, useTransition, animated } from '@react-spring/web';
import { useState } from 'preact/hooks';
import { Button } from '@mui/material';
import { SetupSteps } from '..';

// TODO We should make this page display for existing users on major updates, or make a seperate page for that
// ? Just an idea, would require some implementation thinking.

// THIS SHOULD BE FOR RETURNING USERS
// WE SHOULD MAKE A NEW PAGE FOR NEW USERS THATS MORE LIKE A TUTORIAL/DESCRIPTION

type Props = {
    setStage: (stage: number) => void;
};

const whatsnew = [
    'Completely redesigned the UI - Again',
    'Updated Map with pathfinding!',
    'Push notifications! (On IOS, your device must be on IOS 16.4.1 or higher)',
    'More customization options!',
    'Smooth new animations',
    'Progress bars - Dont worry they can be disabled in settings',
];

// ANIMATE THIS
export function Features(props: Props) {
    const conf = config.gentle;
    const [disappear, setDisappear] = useState(false);
    const tapi = useSpringRef();
    const title = useSpring({
        ref: tapi,
        from: { y: '-50%', opacity: 0 },
        to: { y: disappear ? '-50%' : '0%', opacity: disappear ? 0 : 1 },
        config: conf,
        onRest: () => {
            if (disappear) {
                setTimeout(() => {
                    props.setStage(SetupSteps.Login);
                }, 300);
            }
        },
    });
    const newsapi = useSpringRef();
    const news = useTransition(disappear ? [] : whatsnew, {
        ref: newsapi,
        trail: 600 / whatsnew.length,
        from: { x: '50%', opacity: 0 },
        enter: { x: '0%', opacity: 1 },
        leave: { x: '50%', opacity: 0 },
        config: conf,
    });
    const buttonapi = useSpringRef();
    const button = useSpring({
        ref: buttonapi,
        from: { y: '50%', opacity: 0 },
        to: { y: disappear ? '50%' : '0%', opacity: disappear ? 0 : 1 },
        config: conf,
        delay: 0,
    });

    useChain(disappear ? [buttonapi, newsapi, tapi] : [tapi, newsapi, buttonapi], [0, 0.25, 0.5]);
    return (
        <>
            <div className="text-center full-center">
                <animated.h2 style={title}>Features And Whats New?</animated.h2>
                <ul style={{ listStyleType: 'none', margin: 0, marginTop: '1em', padding: 0 }}>
                    {news((style, item) => {
                        return (
                            <li>
                                <animated.span style={style}>{item}</animated.span>
                            </li>
                        );
                    })}
                </ul>
                <br />
                <animated.span style={button}>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={disappear}
                        onClick={() => {
                            setDisappear(true);
                        }}
                    >
                        Continue
                    </Button>
                </animated.span>
            </div>
        </>
    );
}
