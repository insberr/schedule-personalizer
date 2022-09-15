import { useSpringRef, useSpring, config, useChain,useTransition,animated } from '@react-spring/web';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';



// THIS SHOULD BE FOR RETURNING USERS
// WE SHOULD MAKE A NEW PAGE FOR NEW USERS THATS MORE LIKE A TUTORIAL/DESCRIPTION

type Props = {
    setStage: (stage: number) => void
}


const whatsnew = [
    'Completely redesigned the UI',
    'The map shows you where your classes are! (working progress)',
    'Login with StudentVue to have all your classes automatically added.',
    'Auto schedules for events like 2 hour delays (coming soon)',
    'You can now screenshot the schedule on site!',
    'Added theme customization, That\'s right, you can customize the colors of the schedule and more!'
]

// ANIMATE THIS
export function Features(props: Props) {
    const conf = config.gentle;
    const [disappear, setDisappear] = useState(false);
    const tapi = useSpringRef()
    const title = useSpring({
        ref: tapi,
        from: { y: "-50%", opacity: 0},
        to: { y: disappear ? "-50%" : "0%", opacity: disappear ? 0 : 1},
        config: conf,
        onRest: () => {
            if (disappear) {
                setTimeout(() => {
                    props.setStage(420)
                }, 300)
            }
        }
    })
    const newsapi = useSpringRef()
    const news = useTransition(disappear ? [] : whatsnew, {
        ref: newsapi,
        trail: 600/whatsnew.length,
        from: { x: "50%", opacity: 0},
        enter: { x: "0%", opacity: 1},
        leave: { x: "50%", opacity: 0},
        config: conf,
    })
    const buttonapi = useSpringRef()
    const button = useSpring({
        ref: buttonapi,
        from: { y: "50%", opacity: 0},
        to: { y: disappear ? "50%" : "0%", opacity: disappear ? 0 : 1},
        config: conf,
        delay: 0
    })

    useChain(disappear ? [buttonapi, newsapi, tapi] : [tapi, newsapi, buttonapi], [0,0.25,0.5])
    return (<>
        <div className="text-center full-center">
            <animated.h2 style={title}>Features And Whats New?</animated.h2>
            <ul style={{"listStyleType": "none", "margin":0, "marginTop": "1em", "padding":0}}>
            { news((style, item) => {
                return <li><animated.span style={style}>{item}</animated.span></li>
            })}
            </ul>
            <br />
            <animated.span style={button}><Button variant='crimson' disabled={disappear} onClick={()=>{ setDisappear(true) }}>Continue</Button></animated.span>
        </div>
    </>)
}
