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
            tension: 290,
            friction: 50
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
            friction: 50
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
            
            return (<>
                <div>
                    <animated.h1 className="text-center" style={animWelcome as never}>Welcome</animated.h1>
                    <animated.h6 className="text-muted" style={animWelcome2 as never}>Schedule Peronalizer v5</animated.h6>
                </div>
            </>)
        } else {
            return props.children;
        }
}