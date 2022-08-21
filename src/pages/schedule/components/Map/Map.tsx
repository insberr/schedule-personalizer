import {MP} from "./MP";
import Modal from 'react-bootstrap/Modal';



type props = {
    show: boolean;
    close: () => void;
}
export function Map(props: props) {

    return (<Modal size="xl" show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Map</Modal.Title>
            </Modal.Header>
                <Modal.Body style={{"backgroundColor":"white"}}><MP /></Modal.Body>
            </Modal>)
}