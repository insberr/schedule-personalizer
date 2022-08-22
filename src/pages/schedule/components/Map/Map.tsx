import {MP} from "./MP";
import Modal from 'react-bootstrap/Modal';
import * as classes from './map.module.scss';


type props = {
    show: boolean;
    close: () => void;
}
export function Map(props: props) {

    return (<Modal size="xl" show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Map</Modal.Title>
            </Modal.Header>
                <Modal.Body className={classes["map-model-body"]} style={{"backgroundColor":"white"}}><MP /></Modal.Body>
            </Modal>)
}