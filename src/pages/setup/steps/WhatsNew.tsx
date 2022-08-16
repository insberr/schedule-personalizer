import { useSpringRef, useSpring, config, useChain,useTransition,animated } from '@react-spring/web';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';


// THIS SHOULD BE FOR RETURNING USERS
// WE SHOULD MAKE A NEW PAGE FOR NEW USERS THATS MORE LIKE A TUTORIAL/DESCRIPTION

type Props = {
    setStage: (stage: number) => void
}


const whatsnew = [
    "Cringe? yes.",
    "This is a game about a guy who is a little bit of a cringer. (thanks codepilot)",
    "this is example data, please change it",
    "hello mario"
]

// ANIMATE THIS
export function WhatsNew(props: Props) {
    const conf = config.gentle;
    const [disappear, setDisappear] = useState(false);
    const tapi = useSpringRef()
    const title = useSpring({
        ref: tapi,
        from: { y: "-50%", opacity: 0},
        to: { y: disappear ? "-50%" : "0%", opacity: disappear ? 0 : 1},
        config: conf,
        onRest: () => {
            console.log("rest")
            console.log(disappear)
            if (disappear) {
                setTimeout(() => {props.setStage(420)},500)
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

    useChain(disappear ? [buttonapi ,newsapi,tapi] : [tapi, newsapi, buttonapi], [0,0.25,0.5])
    return (
    <div className="text-center full-center">
        <animated.span style={title}><h5>Whats New?</h5></animated.span>
        <ul style={{"listStyleType": "none", "margin":0, "marginTop": "1em", "padding":0}}>
        { news((style, item) => {
            return <li><animated.span style={style}>{item}</animated.span></li>
        })}
        </ul>
        <br />
        <animated.span style={button}><Button disabled={disappear} onClick={()=>{ setDisappear(true) }}>Continue</Button></animated.span>
    </div>)
}
