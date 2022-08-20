// prompt user to add to home screen if not already a pwa
import Button from 'react-bootstrap/Button';

export function AddToHomeScreen(props: { setStage: (s: number) => void }) {
    return (<div>add to home screen. <Button onClick={() => {props.setStage(1)}}>skip</Button></div>)
}
