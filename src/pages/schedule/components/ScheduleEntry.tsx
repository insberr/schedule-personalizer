import { formatClassTime, formatClassPeriodName, isCurrentClass } from "../../../lib"
import { Class, ClassIDS, timeToDate, RGBA, Time } from "../../../types"
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
import tinyColor from 'tinycolor2';
import tinycolor from "tinycolor2";
import { BsStars } from "react-icons/bs";

type ScheduleEntryProps = {
    sch: Class[]
    key: string
    period: Class
    mini: boolean,
    viewDate: Date,
    isForCustomizations?: boolean
    forcedColor?: RGBA
    currentTime: Time
    devTime?: Time | null
}

// Making this look better will be fun : )
function ScheduleEntry(props: ScheduleEntryProps) {
    // do that here
    const [open, setOpen] = useState(false);
    const [rgb, setRgb] = useState<string>("");
    const doRGBParty = useSelector((state: RootState) => state.misc.rgbParty)
    const customizations = useCustomizations();

    // TODO: Make this update every second and then check its still the current class and the highlight it 
    const [currentClassDateAndTime, setcurrentClassDateAndTime] = useState(new Date()); // useState(props.viewDate); // useState(new Date("SepTember 6, 2022 08:04:59")); // new Date();
    useEffect(() => {
        if (props.devTime) {
            setcurrentClassDateAndTime(timeToDate(props.devTime))
            return;
        }
        const nd = timeToDate(props.currentTime);
        setcurrentClassDateAndTime(nd)
    }, [props.currentTime, props.devTime])

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
        'backgroundColor': (props.forcedColor !== undefined ? tinycolor(props.forcedColor.c).toRgbString() : 'rgba('+ Object.values(props.period.teacher.id === 'currentClassColorOverride' ? customizations.theme.colors.currentClass : customizations.theme.colors.schedule[props.period.classID]).join(',') + ')'),
    });

    useEffect(() => {
        const dt = setInterval(() => {
            setcdate(new Date())
        }, 1000)

        return () => {
            clearInterval(dt);
        }
    },[])

    useEffect(() => {
        if (props.forcedColor !== undefined) {
            // TODO: USE THIS EVERYWHERE
            const color = tinycolor(props.forcedColor.c).toRgbString();
            setHighlightPeriodColor({
                'backgroundColor': color,
            });
            return;
        }
        if (props.period.teacher.id === 'currentClassColorOverride' || props.isForCustomizations) {
            setHighlightPeriodColor({
                'backgroundColor': 'rgba('+ Object.values(props.period.teacher.id === 'currentClassColorOverride' ? customizations.theme.colors.currentClass.c : customizations.theme.colors.schedule[props.period.classID].c).join(',') + ')',
            });
            return;
        }

        if ([ClassIDS.Summer, ClassIDS.Weekend, ClassIDS.NoSchool].includes(props.period.classID)) {
            setHighlightPeriodColor({
                'backgroundColor': 'rgba('+ Object.values(customizations.theme.colors.schedule[props.period.classID].c).join(',') + ')',
            });
            return;
        }

        setHighlightPeriodColor({
            'backgroundColor': 'rgba('+ Object.values(customizations.theme.colors.schedule[props.period.classID].c).join(',') + ')',
        });

        if (isSameDay(props.viewDate, currentClassDateAndTime)) {
            if (isCurrentClass(props.sch, props.period, currentClassDateAndTime)) {
                setHighlightPeriodColor({
                    'backgroundColor': 'rgba('+ Object.values(customizations.theme.colors.currentClass.c).join(',') + ')',
                });
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customizations, props?.forcedColor, currentClassDateAndTime])

    return (
    <Container className={ (doRGBParty ? "spin " : "") + (props.sch.filter(pd => (pd.classID === ClassIDS.Period && pd.period === props.period.period && pd.startTime === props.period.startTime)).length > 1 ? 'highlightClassEntryRed' : '') + (useCss(highlightPeriodColor)) } style={doRGBParty ? {"backgroundColor": "#"+rgb } : {}}>
    <Row onClick={()=> { setOpen(!props.mini && !open) }} className="classRow">
        <Col key="classTypeIcon" className={ /* if any icons will show && customizations . show icons */ 'classTypeIcon hidden'}><BsStars className={isCurrentClass(props.sch, props.period, currentClassDateAndTime) ? '' : 'hidden'} /></Col>
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
                        <Timer hidden={!open} basedDate={props.viewDate} time={props.period.endTime} />
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