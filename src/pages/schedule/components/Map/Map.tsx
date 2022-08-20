//@ts-expect-error cirn
import _map from "./map.svg"
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
                <Modal.Body style={{"backgroundColor":"white"}}><_map /></Modal.Body>
            </Modal>)
}