import { formatClassTime, formatClassPeriodName, formatClassTimeHideElement } from "../../../lib"
import { Class, ClassIDS } from "../../../types"
import ListGroup from 'react-bootstrap/ListGroup'
import Collapse from 'react-bootstrap/Collapse';
import { MdMoreVert } from "react-icons/md";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/store";
import { Timer } from "./Timer";

type ScheduleEntryProps = {
    key: string
    period: Class
    mini: boolean,
    viewDate: Date,
    
}

// Making this look better will be fun : )
function ScheduleEntry(props: ScheduleEntryProps) {
    // do that here
    const [open, setOpen] = useState(false);
    const [rgb, setRgb] = useState<string>("");
    const doRGBParty = useSelector((state: RootState) => state.misc.rgbParty)
    useEffect(() => {
        if (!doRGBParty) {
            setRgb("00000000");
            return;
        }
        const i = setInterval(() => {
            setRgb(Math.floor(Math.random()*16777215).toString(16));
        },50)
        return () => {
            clearInterval(i);
        }
    },[doRGBParty])
    return (
    <Container style={{"backgroundColor": "#"+rgb }}>
    <Row onClick={()=> { setOpen(!props.mini && !open) }} style={{"padding":"1rem"}}>
        <Col className={ props.mini ? 'hidden' : '' } style={{'maxWidth': '4px', 'paddingLeft': '0px'}}><MdMoreVert /></Col>
        <Col key="classTime" className={(props.mini ? 'hidden' : '') }>{formatClassTime(props.period.startTime, props.period.endTime)}</Col>
        <Col key="className">{props.period.name || formatClassPeriodName(props.period) }</Col>
        <Col key="teacherName" className={ ((props.mini || props.period.teacher.name === '') ? 'hidden' : 'd-none d-md-block') }>{props.period.teacher.name}</Col>
        <Col key="roomNumber" className={((props.mini || props.period.room === '') ? 'hidden' : 'd-none d-sm-block') }>{ props.period.room != "" ? "Room" : ""} {props.period.room}</Col>
    </Row>
    <Row onClick={() => {setOpen(!props.mini && !open)}}>
        <Collapse in={open} dimension="height">
            <div>
                <div className="innerbox"><Timer basedDate={props.viewDate} time={props.period.startTime} /> Till { props.period.name } starts</div> 
                <div className="innerbox">{ props.period.teacher.name } in room { props.period.room }</div>
                <div className="innerbox"><a href={ "mailto:" + props.period.teacher.email }>Email Teacher</a></div>
            </div>
        </Collapse>
    </Row>
    </Container>
)
}
export default ScheduleEntry