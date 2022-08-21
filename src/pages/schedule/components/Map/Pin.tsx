import * as styles from './map.module.scss'

export function Pin(props: {cords: number[]}) {
    return (
        <span className={styles.pin} style={{left: props.cords[0]+"%", top: props.cords[1]+"%"}}></span>
    )
}