import { MP } from './MP';
import Modal from 'react-bootstrap/Modal';
import { Class } from '../../../../types';

type props = {
    show: boolean;
    close: () => void;
    sch: Class[];
};
export function Map(props: props) {
    return (
        <Modal className="map" size="xl" show={props.show} onHide={props.close}>
            <Modal.Header className="map" closeButton>
                <Modal.Title>Map</Modal.Title>
            </Modal.Header>
            <Modal.Body className={'map'}>
                <MP sch={props.sch} />
            </Modal.Body>
        </Modal>
    );
}
