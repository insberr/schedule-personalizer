import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { VscSettingsGear } from 'react-icons/vsc';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useId, useRef, useState } from 'react';
import { Map } from './Map/Map';
import Button from 'react-bootstrap/Button';
import { isSameDay } from 'date-fns';
import Popover from 'react-bootstrap/Popover';
import Calendar from 'react-calendar';
import { IoHomeSharp } from 'react-icons/io5';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { VscArrowLeft, VscCalendar, VscArrowRight } from 'react-icons/vsc';
import { RiScreenshot2Fill } from 'react-icons/ri';
import { STVBoundery } from '../../../components/STVBoundery';
import { Class } from '../../../types';
import { useSTV } from '../../../storage/studentvueData';
import { Overlay, Tooltip } from 'react-bootstrap';
import { setTutorial, useCustomizations } from '../../../storage/customizations';
import { useDispatch } from 'react-redux';
import { today } from '../../../today';
import { useNavigate } from '../../../router/hooks';
import { Page } from '../../../storage/page';
import { Value } from 'react-calendar/dist/cjs/shared/types';

type Props = {
    sch: Class[];
    home: () => void;
    getImage: () => void;
    displayDate: Date;
    setDisplayDate: (date: Date) => void;
    presentationMode?: boolean;
};

export function SchHeader(props: Props) {
    const id = useId();
    const [map, setMap] = useState(false);
    const stv = useSTV();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customizations = useCustomizations();
    const [showDidYouKnow, setShowDidYouKnow] = useState(customizations.tutorial.moreMap || false);
    function hideMoreMapToolTip() {
        setShowDidYouKnow(false);
        dispatch(setTutorial({ ...customizations.tutorial, moreMap: false }));
    }
    const toolTipDidYouKnowMap = useRef(null);

    const calendar = (
        <Popover id={id + 'popover'}>
            <Popover.Header as="h3" className="text-center">
                Goto Date
            </Popover.Header>
            <Popover.Body>
                <Calendar
                    value={props.displayDate}
                    onChange={(date: Value) => {
                        if (date === null) return; // HOW
                        props.setDisplayDate(date as Date);
                    }}
                ></Calendar>
            </Popover.Body>
        </Popover>
    );

    if (props?.presentationMode) {
        return (
            <>
                <a
                    onClick={() => {
                        navigate(Page.SETTINGS);
                    }}
                    style={{ position: 'fixed', top: '1rem', right: '1rem' }}
                >
                    <VscSettingsGear className={'white-icon'} />
                </a>
            </>
        );
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="d-none d-md-block" href="#" onClick={props.home}>
                        Schedule V5
                    </Navbar.Brand>
                    <NavDropdown ref={toolTipDidYouKnowMap} className="text-muted" title="More" id={id + 'nav'} onClick={() => hideMoreMapToolTip()}>
                        <NavDropdown.Item
                            onClick={() => {
                                setMap(!map);
                            }}
                        >
                            School Map
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            onClick={() => {
                                navigate(Page.STUDENTID);
                            }}
                        >
                            Student ID
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item onClick={()=>{ navigate(Page.SCHOOL) }}>School Info</NavDropdown.Item> */}
                        <STVBoundery>
                            <NavDropdown.Item href={'mailto:' + stv.info?.content.CounselorEmail}>Email Counselor</NavDropdown.Item>
                        </STVBoundery>
                        {/* <NavDropdown.Item disabled onClick={()=>{ return; }}>Tutorial (Soon™️)</NavDropdown.Item> */}
                    </NavDropdown>
                    <Overlay target={toolTipDidYouKnowMap.current} show={showDidYouKnow} placement="bottom">
                        {(props) => (
                            <Tooltip
                                className="lighter-tool-tip"
                                id="didYouKnowMap"
                                {...props}
                                onClick={() => {
                                    hideMoreMapToolTip();
                                }}
                            >
                                Check out more cool features! (Click to dismiss)
                            </Tooltip>
                        )}
                    </Overlay>

                    <Navbar.Collapse className="justify-content-end">
                        <span style={{ marginRight: '2em' }}>
                            <Button
                                variant="outline-crimson"
                                key="now"
                                size="sm"
                                className={isSameDay(today(), props.displayDate) ? 'hidden' : ''}
                                onClick={() => {
                                    props.setDisplayDate(today());
                                }}
                            >
                                <IoHomeSharp />
                            </Button>
                            <Button
                                variant="outline-crimson"
                                key="back"
                                size="sm"
                                style={{ marginLeft: '1em' }}
                                onClick={() => {
                                    const newDate = new Date(props.displayDate);
                                    newDate.setDate(props.displayDate.getDate() - 1);
                                    props.setDisplayDate(newDate);
                                }}
                            >
                                <VscArrowLeft />
                            </Button>
                            <OverlayTrigger rootClose={true} key="calendar" trigger="click" placement="bottom" overlay={calendar}>
                                <Button variant="outline-crimson" size="sm" style={{ marginLeft: '1em' }}>
                                    <VscCalendar />
                                </Button>
                            </OverlayTrigger>
                            <Button
                                variant="outline-crimson"
                                key="forward"
                                size="sm"
                                style={{ marginLeft: '1em' }}
                                onClick={() => {
                                    const newDate = new Date(props.displayDate);
                                    newDate.setDate(props.displayDate.getDate() + 1);
                                    props.setDisplayDate(newDate);
                                }}
                            >
                                <VscArrowRight />
                            </Button>
                            <Button
                                variant="outline-crimson"
                                key="screeny"
                                size="sm"
                                style={{ marginLeft: '1em' }}
                                onClick={() => {
                                    props.getImage();
                                }}
                            >
                                <RiScreenshot2Fill />
                            </Button>
                        </span>
                        <a
                            onClick={() => {
                                navigate(Page.SETTINGS);
                            }}
                        >
                            <VscSettingsGear className={'white-icon'} />
                        </a>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Map
                sch={props.sch}
                show={map}
                close={() => {
                    setMap(false);
                }}
            />
        </>
    );
}
