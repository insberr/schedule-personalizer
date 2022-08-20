import { Class } from "../../../types"
import Center from "../../../components/Center"
import ScheduleEntry from "./ScheduleEntry"
import ListGroup from 'react-bootstrap/ListGroup'
import { EventSchedule } from '../index';
import { format, isSameDay } from 'date-fns'
import Button from 'react-bootstrap/Button';
import { useId, useMemo, useRef } from "react";
import { formatClassTimeHideElement } from "../../../lib"
import { SchHeader } from "./ScheduleHeader"
import { VscArrowLeft,VscCalendar, VscReply, VscArrowRight } from "react-icons/vsc";
import { isToday } from 'date-fns'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Calendar from 'react-calendar'
import { Overlay } from "react-bootstrap";

type ScheduleProps = {
    sch: Class[]
    event: EventSchedule
    displayDate: Date
    setDisplayDate: (date: Date) => void,
    setup: (b: boolean) => void
}

function Schedule(props: ScheduleProps) {
    console.log("props: ", props.sch)
    const doMini: boolean = useMemo(() => {
        const hiddens = props.sch.map((i) => {
            return formatClassTimeHideElement(i) == "hidden"
        })
        return hiddens.some((i) => i)
    },[props.sch])
    const id = useId()
    const calendar = (
        <Popover id={id+"popover"}>
            <Popover.Header as="h3" className="text-center">Goto Date</Popover.Header>
            <Popover.Body>
                <Calendar value={props.displayDate} onChange={ props.setDisplayDate }></Calendar>
            </Popover.Body>
        </Popover>
    )
    const buttons = [
        <Button key="back" onClick={ () => {
            const newDate = new Date(props.displayDate);
            newDate.setDate(props.displayDate.getDate() - 1);
            props.setDisplayDate(newDate);
        }}><VscArrowLeft /></Button>,
        <Button key="now" className={ isToday(props.displayDate) ? 'hidden' : '' } style={{"marginLeft":"1em"}} onClick={ () => { props.setDisplayDate(new Date()) } }><VscReply /></Button>,
        <OverlayTrigger rootClose={true} key="calendar" trigger="click" placement="bottom" overlay={calendar}><Button style={{"marginLeft":"1em"}}><VscCalendar /></Button></OverlayTrigger>,
        <Button key="forward" style={{"marginLeft":"1em"}} onClick={ () => {
            const newDate = new Date(props.displayDate);
            newDate.setDate(props.displayDate.getDate() + 1);
            props.setDisplayDate(newDate);
        }}><VscArrowRight /></Button>
    ]

    return (<><SchHeader setup={props.setup} centerbuttons={buttons}/><Center>
        <br />
        <br /><br /><br />
        <Container style={{ "width": "80vw", "maxWidth": "900px" }}>
        <Row className="row background-clear justify-content-center text-center">
            <Center className="date">{ format(props.displayDate, "EEEE: LL/dd/yyyy") }</Center> 
        </Row>
        { props.sch.map((period, i) => {
            return (<Row className="crow" key={i.toString()}><ScheduleEntry key={i.toString()} mini={doMini} period={period} /></Row>)
        }) }
    </Container>
    <br></br>
    { props.event.isEvent ? props.event.info.message : null }
    <br />
    </Center></>)
}
export default Schedule