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


type ScheduleEntryProps = {
    key: string
    period: Class
    mini: boolean,
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
    <Row onClick={()=> { setOpen(!props.mini && !open) }} style={{"padding":"1em"}}>
        <Col className={ props.mini ? 'hidden' : '' }><MdMoreVert /></Col>
        <Col key="classTime" className={(props.mini ? 'hidden' : '') }>{formatClassTime(props.period.startTime, props.period.endTime)}</Col>
        <Col key="className">{props.period.name || formatClassPeriodName(props.period) }</Col>
        <Col key="teacherName" className={ (props.mini ? 'hidden' : '') }>{props.period.teacher.name}</Col>
        <Col key="roomNumber" className={(props.mini ? 'hidden' : '') }>{ props.period.room != "" ? "Room" : ""} {props.period.room}</Col>
    </Row>
    <Row onClick={() => {setOpen(!props.mini && !open)}}>
        <Collapse in={open} dimension="height">
            <div className="innerbox">inner</div> 
        </Collapse>
    </Row>
    </Container>
)
}
export default ScheduleEntry