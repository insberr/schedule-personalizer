import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { VscSettingsGear } from 'react-icons/vsc';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useId, useRef, useState} from 'react'
import { Map } from "./Map/Map"
import Button from 'react-bootstrap/Button';
import { isToday } from 'date-fns';
import Popover from 'react-bootstrap/Popover';
import Calendar from 'react-calendar'
import { IoHomeSharp } from "react-icons/io5";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { VscArrowLeft,VscCalendar, VscArrowRight } from "react-icons/vsc";
import { RiScreenshot2Fill } from "react-icons/ri";
import { STVBoundery } from '../../../components/STVBoundery';
import { Class } from '../../../types';
import { useSTV } from '../../../storage/studentvueData';
import { Overlay, Tooltip } from 'react-bootstrap';
import { setTutorial, useCustomizations } from '../../../storage/customizations';
import { useDispatch } from 'react-redux';
type Props = {
    sch: Class[],
    setup: (s: boolean) => void,
    home: () => void,
    getImage: () => void,
    displayDate: Date,
    setDisplayDate: (date: Date) => void
}

export function SchHeader(props: Props) {
  const id = useId();
  const [map, setMap] = useState(false)
  const stv = useSTV();
  const dispatch = useDispatch();

  const customizations = useCustomizations();
  const [showDidYouKnow, setShowDidYouKnow] = useState(customizations.tutorial.moreMap || false);
  function hideMoreMapToolTip() {
    setShowDidYouKnow(false);
    dispatch(setTutorial({ ...customizations.tutorial, moreMap: false}));
  }
  const toolTipDidYouKnowMap = useRef(null);

    const calendar = (
        <Popover id={id+"popover"}>
            <Popover.Header as="h3" className="text-center">Goto Date</Popover.Header>
            <Popover.Body>
                <Calendar value={props.displayDate} onChange={ props.setDisplayDate }></Calendar>
            </Popover.Body>
        </Popover>
    )

  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="d-none d-md-block" href="#" onClick={props.home}>Schedule V5</Navbar.Brand>
          <NavDropdown ref={toolTipDidYouKnowMap} className="text-muted" title="More" id={id+"nav"} onClick={() => hideMoreMapToolTip()}>
            <NavDropdown.Item onClick={()=>{setMap(!map)}}>Map</NavDropdown.Item>
            <STVBoundery><NavDropdown.Item href={"mailto:"+stv.info?.content.CounselorEmail}>Email Counselor</NavDropdown.Item></STVBoundery>
          </NavDropdown>
          <Overlay target={toolTipDidYouKnowMap.current} show={showDidYouKnow} placement="bottom">
            {(props) => (
                <Tooltip className="lighter-tool-tip" id="didYouKnowMap" {...props} onClick={() => { hideMoreMapToolTip() }}>
                    Did you know you can click {"'"}More{"'"} to see the school map or email your counselor?
                </Tooltip>
            )}
            </Overlay>
                

          <Navbar.Collapse className="justify-content-end" >
            <span style={{"marginRight":"2em"}}>
                <Button variant="outline-crimson" key="now" size="sm" className={ isToday(props.displayDate) ? 'hidden' : '' } onClick={ () => { props.setDisplayDate(new Date()) } }><IoHomeSharp /></Button>
                <Button variant="outline-crimson" key="back"  size="sm" style={{"marginLeft":"1em"}} onClick={ () => {
                    const newDate = new Date(props.displayDate);
                    newDate.setDate(props.displayDate.getDate() - 1);
                    props.setDisplayDate(newDate);
                }}><VscArrowLeft /></Button>
                <OverlayTrigger rootClose={true} key="calendar" trigger="click" placement="bottom" overlay={calendar}><Button variant="outline-crimson" size="sm" style={{"marginLeft":"1em"}}><VscCalendar /></Button></OverlayTrigger>
                <Button variant="outline-crimson" key="forward" size="sm" style={{"marginLeft":"1em"}} onClick={ () => {
                    const newDate = new Date(props.displayDate);
                    newDate.setDate(props.displayDate.getDate() + 1);
                    props.setDisplayDate(newDate);
                }}><VscArrowRight /></Button>
                <Button variant="outline-crimson" key="screeny" size="sm" style={{"marginLeft":"1em"}} onClick={()=> { props.getImage() }}><RiScreenshot2Fill /></Button>
            </span>
            <a onClick={() => { props.setup(true) }}><VscSettingsGear className={"white-icon"}/></a>
          </Navbar.Collapse>
        </Container>
    </Navbar>
    <Map sch={props.sch} show={map} close={()=>{setMap(false)}}/>
    </>
  )
}
