import { useSpring, animated, AnimationResult, SpringValue } from '@react-spring/web';
import { useState } from 'react';

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: any;
}

export function IntroPonent(props: Props) {
    const [stage1Complete, setStage1Complete] = useState<boolean>(localStorage.getItem("dev_skip") == "1");
    const animWelcome = useSpring({
        to: [
            { opacity: 1, left: "49%", position: "absolute", transform: "translate(-50%, -50%)", },
            { left: "40%", opacity: 0, special: 1 }
        ],
        from: { opacity: 0, top: "50%", 'left':"60%", position: "absolute", transform: "translate(-50%, -50%)", special: 0},
        reset: true,
        delay: 100,
        immediate: stage1Complete,
        config: {
            tension: 280,
            friction: 80
        },
        }
        
      )
      const animWelcome2 = useSpring({
        to: [
            { opacity: 1, left: "51%", position: "absolute", transform: "translate(-50%, -50%)",},
            { left: "60%", opacity: 0, special: 1 }
        ],
        from: { opacity: 0, top: "60%", 'left':"40%", position: "absolute", transform: "translate(-50%, -50%)", special: 0},
        reset: true,
        delay: 100,
        immediate: stage1Complete,
        config: {
            tension: 280,
            friction: 80
        },
        onChange: {
            special: (result: AnimationResult<SpringValue<number>>) => {
                //console.log(result);
                //@ts-expect-error typescript moment
                const r: number = result;
                if (r == 1) {
                    setStage1Complete(true);
                }
            }
            }
        }
        
      )
      if (!stage1Complete) {
            // Maybe add 'By insberr And wackery' text too?
            // @ts-expect-error hahaha
            return <><animated.span className="text-center" style={animWelcome}> <h1>Welcome</h1> </animated.span> <animated.span style={animWelcome2}> <h6 className="text-muted">Schedule Peronalizer v5</h6></animated.span></>
        } else {
            return props.children;
        }
}