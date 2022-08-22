import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { VscSettingsGear } from 'react-icons/vsc'
import Center from "../../../components/Center";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useId, useState} from 'react'
import { Map } from "./Map/Map"
import Button from 'react-bootstrap/Button';
import { isToday } from 'date-fns';
import Popover from 'react-bootstrap/Popover';
import Calendar from 'react-calendar'
import { IoHomeSharp } from "react-icons/io5";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { VscArrowLeft,VscCalendar, VscReply, VscArrowRight } from "react-icons/vsc";
import { RiScreenshot2Fill } from "react-icons/ri";

export function SchHeader(props: { setup: (s: boolean) => void, home: () => void, getImage: () => void, displayDate: Date, setDisplayDate: (date: Date) => void }) {
  const id = useId();
  const [map, setMap] = useState(false)

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
          <NavDropdown className="text-muted" title="More" id={id+"nav"}>
            <NavDropdown.Item onClick={()=>{setMap(!map)}}>Map</NavDropdown.Item>
          </NavDropdown>
          <Navbar.Collapse className="justify-content-end" >
            <span style={{"marginRight":"2em"}}>
                <Button variant="outline-crimson" key="back"  size="sm" onClick={ () => {
                    const newDate = new Date(props.displayDate);
                    newDate.setDate(props.displayDate.getDate() - 1);
                    props.setDisplayDate(newDate);
                }}><VscArrowLeft /></Button>
                <Button variant="outline-crimson" key="now" size="sm" className={ isToday(props.displayDate) ? 'hidden' : '' } style={{"marginLeft":"1em"}} onClick={ () => { props.setDisplayDate(new Date()) } }><IoHomeSharp /></Button>
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
      <Map show={map} close={()=>{setMap(false)}}/>
      </>
  )
}
