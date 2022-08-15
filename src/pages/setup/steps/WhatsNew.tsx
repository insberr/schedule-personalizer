import Button from 'react-bootstrap/Button';
import Center from '../../../components/Center';

type Props = {
    setStage: (stage: number) => void
}

// ANIMATE THIS
export function WhatsNew(props: Props) {
    return (<Center className="text-center">
        <div>Whats new</div>
        <div>ADD DETAILS AND FANCY ANIMATIONS HERE</div>
        <br />
        <Button onClick={()=>{ props.setStage(420) }}>Continue</Button>
    </Center>)
}
