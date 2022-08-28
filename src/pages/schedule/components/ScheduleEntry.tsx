import { formatClassTime, formatClassPeriodName } from "../../../lib"
import { Class, ClassIDS, timeToDate } from "../../../types"
import Collapse from 'react-bootstrap/Collapse';
import { MdExpandMore } from "react-icons/md";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/store";
import { Timer } from "./Timer";
import {isAfter, isBefore, isSameDay, isToday, isWithinInterval} from "date-fns"
import * as lib from "../../../lib"
import { useCustomizations } from "../../../storage/customizations";
import { useCss } from 'react-use';

type ScheduleEntryProps = {
    sch: Class[]
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
    const customizations = useCustomizations();

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

    const [cdate, setcdate] = useState<Date>(new Date())
    const [highlightPeriodColor, setHighlightPeriodColor] = useState({
        'backgroundColor': 'rgba('+ Object.values(props.period.classID === ClassIDS.Null ? customizations.theme.colors.currentClass : customizations.theme.colors.schedule[props.period.classID]).join(',') + ')',
    });

    useEffect(() => {
        const dt = setInterval(() => {
            setcdate(new Date())
        },1000)

        return () => {
            clearInterval(dt);
        }
    },[])

    useEffect(() => {
        if ([ClassIDS.Summer, ClassIDS.Weekend, ClassIDS.NoSchool].includes(props.period.classID)) {
            if (props.period.classID !== ClassIDS.Null) {
                setHighlightPeriodColor({
                    'backgroundColor': 'rgba('+ Object.values(customizations.theme.colors.schedule[props.period.classID]).join(',') + ')',
                });
            } else {
                setHighlightPeriodColor({
                    'backgroundColor': 'rgba('+ Object.values(customizations.theme.colors.currentClass).join(',') + ')',
                });
            }
            return;
        }


        // Somehow highlight the current period. THIS DOESNT WORK, I NEED HELP LOL
        /*if (isAfter(new Date(), timeToDate(props.period.startTime)) && isBefore(new Date(), timeToDate(props.period.endTime))) {
            setHighlightPeriodColor({
                'backgroundColor': 'rgba('+ Object.values(customizations.theme.colors.currentClass).join(',') + ')',
            });
            console.log(highlightPeriodColor)
            return;
        } else {
            setHighlightPeriodColor({
                'backgroundColor': 'rgba('+ Object.values(customizations.theme.colors.schedule[props.period.classID]).join(',') + ')',
            });
        }
        */

        // FOR NOW
        if (props.period.classID !== ClassIDS.Null) {
            setHighlightPeriodColor({
                'backgroundColor': 'rgba('+ Object.values(customizations.theme.colors.schedule[props.period.classID]).join(',') + ')',
            });
        } else {
            setHighlightPeriodColor({
                'backgroundColor': 'rgba('+ Object.values(customizations.theme.colors.currentClass).join(',') + ')',
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customizations])

    return (
    <Container className={ (doRGBParty ? "spin " : "") + (props.sch.filter(pd => (pd.classID === ClassIDS.Period && pd.period === props.period.period && pd.startTime === props.period.startTime)).length > 1 ? 'highlightClassEntryRed' : '') + (useCss(highlightPeriodColor)) } style={doRGBParty ? {"backgroundColor": "#"+rgb } : {}}>
    <Row onClick={()=> { setOpen(!props.mini && !open) }} style={{"padding":"1rem"}}>
        <Col key="classTime" className={(props.mini ? 'hidden' : '') }>{formatClassTime(props.period.startTime, props.period.endTime)}</Col>
        <Col key="className">{props.period.name || formatClassPeriodName(props.period) }</Col>
        <Col key="teacherName" className={ (props.mini || !lib.displayTeacherNamesCol(props.sch) ? 'hidden' : 'd-none d-md-block') }>{props.period.teacher.name}</Col>
        <Col key="roomNumber" className={(props.mini || !lib.displayRoomsCol(props.sch) ? 'hidden' : 'd-none d-sm-block') }>{ props.period.room != "" ? "Room" : ""} {props.period.room}</Col>
        <Col className={ props.mini ? 'hidden' : '' } style={{'maxWidth': '10px', 'paddingLeft': '0px', 'paddingRight': '16px'}}><MdExpandMore /></Col>
    </Row>
    <Row onClick={() => {setOpen(!props.mini && !open)}}>
        <Collapse in={open} dimension="height">
            <div>
                { isBefore(cdate, timeToDate(props.period.startTime,props.viewDate)) &&
                    <div className="innerbox">
                        { props.period.name || formatClassPeriodName(props.period) } starts in
                        <Timer hidden={!open} basedDate={props.viewDate} time={props.period.startTime} />
                    </div>
                }
                { isWithinInterval(cdate, {
                            start: timeToDate(props.period.startTime,props.viewDate),
                            end: timeToDate(props.period.endTime,props.viewDate)
                        }) &&
                    <div className="innerbox">
                        { props.period.name || formatClassPeriodName(props.period) } ends in
                        <Timer hidden={!open} basedDate={props.viewDate} time={props.period.startTime} />
                    </div>
                }
                { isAfter(cdate, timeToDate(props.period.endTime,props.viewDate)) &&
                    <div className="innerbox">
                        Class Ended
                    </div>
                }

                {
                    ([ClassIDS.Zero, ClassIDS.Advisory, ClassIDS.Period].includes(props.period.classID)
                    && (props.period.teacher.name !== '' || props.period.room !== ''))
                    &&
                    <div className="innerbox">
                        <span className="bold">{ props.period.teacher.name }</span> { props.period.room !== '' ? 'in room ' + props.period.room : '' }
                    </div>
                }
                {
                    ([ClassIDS.Zero, ClassIDS.Advisory, ClassIDS.Period].includes(props.period.classID)
                    && props.period.teacher.email !== '')
                    &&
                    <div className="innerbox">
                        <a href={ "mailto:" + props.period.teacher.email }>Email Teacher</a>
                    </div>
                }
            </div>
        </Collapse>
    </Row>
    </Container>
)
}
export default ScheduleEntry