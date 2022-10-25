import { formatClassTime, formatClassPeriodName, isCurrentClass } from '../../../lib/lib';
import { Class, ClassIDS, timeToDate, RGBA, Time } from '../../../types';
import Collapse from 'react-bootstrap/Collapse';
import { MdExpandMore } from 'react-icons/md';
import { useState, useEffect, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { RootState } from '../../../storage/store';
import { Timer } from './Timer';
import { formatDuration, intervalToDuration, isAfter, isBefore, isSameDay, isWithinInterval } from 'date-fns';
import * as lib from '../../../lib/lib';
import { useCustomizations } from '../../../storage/customizations';
import { useCss } from 'react-use';
import tinyColor from 'tinycolor2';
import { BsStars } from 'react-icons/bs';
import { useSchedule } from '../../../storage/schedule';
import { today } from '../../../today';
type ScheduleEntryProps = {
    sch: Class[];
    key: string;
    period: Class;
    mini: boolean;
    viewDate: Date;
    isForCustomizations?: boolean;
    forcedColor?: RGBA;
    currentTime: Time;
};

// Making this look better will be fun : )
function ScheduleEntry(props: ScheduleEntryProps) {
    const reduxSch = useSchedule();

    // do that here
    const [open, setOpen] = useState(false);
    const [rgb, setRgb] = useState<string>('');
    const doRGBParty = useSelector((state: RootState) => state.misc.rgbParty);
    const presentationMode = useSelector((state: RootState) => state.misc.presentationMode);
    const customizations = useCustomizations();

    // TO DO: Make this update every second and then check its still the current class and the highlight it
    const currentClassDateAndTime = useMemo(() => {
        // useState(props.viewDate); // useState(new Date("SepTember 6, 2022 08:04:59")); //  {
        const nd = timeToDate(props.currentTime);
        return nd;
    }, [props.currentTime]);

    useEffect(() => {
        if (!doRGBParty) {
            setRgb('00000000');
            return;
        }
        const i = setInterval(() => {
            setRgb(Math.floor(Math.random() * 16777215).toString(16));
        }, 50);
        return () => {
            clearInterval(i);
        };
    }, [doRGBParty]);

    const [cdate, setcdate] = useState<Date>(today());
    const [highlightPeriodColor, setHighlightPeriodColor] = useState({
        backgroundColor: tinyColor({ r: 0, g: 0, b: 0, a: 0 }).toRgbString(),
    });

    const [textPeriodColor, setTextPeriodColor] = useState({
        color: 'inherit',
    });

    useEffect(() => {
        // Forced Color is for the customizations page in settings
        if (props.forcedColor !== undefined) {
            const color = tinyColor(props.forcedColor.c).toRgbString();
            let textColor = tinyColor(props.forcedColor.t).toRgbString();
            if (props.forcedColor.t.a === 0) {
                textColor = tinyColor(props.forcedColor.c).isLight() ? 'black' : 'white';
            }

            setHighlightPeriodColor({
                backgroundColor: color,
            });
            setTextPeriodColor({
                color: textColor,
            });
            return;
        }

        const custom = customizations.theme.colors.schedule[props.period.classID];

        // Set the text color to the user selected colro or to black/white automatically based on the highlight color
        let textColor = tinyColor(custom.t).toRgbString();
        if (custom.t.a === 0) {
            textColor = tinyColor(custom.c).isLight() ? 'black' : 'white';
        }
        setTextPeriodColor({
            color: textColor,
        });

        // Set the color of the period
        const backgroundColor = tinyColor(custom.c).toRgbString();
        setHighlightPeriodColor({
            backgroundColor: backgroundColor,
        });

        // If the period is one that shouldnt be highlighted by the current class period highlighting, then return
        if ([ClassIDS.Summer, ClassIDS.Weekend, ClassIDS.NoSchool].includes(props.period.classID)) return;

        // If the period is the current class period, then highlight it
        if (isSameDay(props.viewDate, currentClassDateAndTime)) {
            if (isCurrentClass(props.sch, props.period, currentClassDateAndTime)) {
                const currentClassBackgroundColor = tinyColor(customizations.theme.colors.currentClass.c).toRgbString();
                setHighlightPeriodColor({
                    backgroundColor: currentClassBackgroundColor,
                });

                let currentClassTextColor = tinyColor(customizations.theme.colors.currentClass.t).toRgbString();
                if (customizations.theme.colors.currentClass.t.a === 0) {
                    currentClassTextColor = tinyColor(customizations.theme.colors.currentClass.c).isLight() ? 'black' : 'white';
                }
                setTextPeriodColor({
                    color: currentClassTextColor,
                });
            }
        }
        if (presentationMode) {
            setOpen(isSameDay(props.viewDate, currentClassDateAndTime) && isCurrentClass(props.sch, props.period, currentClassDateAndTime));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customizations, props?.forcedColor, currentClassDateAndTime]);

    // Makes the timers update I think (ask wackery he added this)
    useEffect(() => {
        const dt = setInterval(() => {
            setcdate(today());
        }, 1000);

        return () => {
            clearInterval(dt);
        };
    }, []);
    const highlightStyle = useCss(highlightPeriodColor);
    const textStyle = useCss(textPeriodColor);
    /*if (presentationMode && !isSameDay(props.viewDate, currentClassDateAndTime) || !isCurrentClass(props.sch, props.period, currentClassDateAndTime)) {
        return <></>
    }*/

    return (
        <Container
            className={
                ' schedule-entry-container ' +
                // RGB Party Easter Egg
                (doRGBParty ? ' spin ' : '') +
                // Highlight the class based on the user customizations and current class period
                (highlightStyle +
                    ' ' +
                    // Text color for period
                    textStyle +
                    // Duplicate period highlighting
                    (props.sch.filter(
                        (pd) => pd.classID === ClassIDS.Period && pd.period === props.period.period && pd.startTime === props.period.startTime
                    ).length > 1
                        ? ' highlightClassEntryRed '
                        : ''))
            }
            style={doRGBParty ? { backgroundColor: '#' + rgb } : {}}
        >
            <Row
                onClick={() => {
                    !presentationMode && setOpen(!props.mini && !open);
                }}
                className="classRow"
            >
                <Col key="classTypeIcon" className={/* if any icons will show && customizations . show icons */ 'classTypeIcon'}>
                    <BsStars
                        className={
                            isSameDay(props.viewDate, currentClassDateAndTime) && isCurrentClass(props.sch, props.period, currentClassDateAndTime)
                                ? ''
                                : 'hidden'
                        }
                    />
                </Col>
                <Col key="classTime" className={props.mini ? 'hidden' : ''}>
                    {formatClassTime(props.period.startTime, props.period.endTime)}
                </Col>
                <Col key="className">{props.period.name || formatClassPeriodName(props.period)}</Col>
                <Col key="teacherName" className={props.mini || !lib.displayTeacherNamesCol(props.sch) ? 'hidden' : 'd-none d-md-block'}>
                    {props.period.teacher.name}
                </Col>
                <Col key="roomNumber" className={props.mini || !lib.displayRoomsCol(props.sch) ? 'hidden' : 'd-none d-sm-block'}>
                    {props.period.room != '' ? 'Room' : ''} {props.period.room}
                </Col>
                <Col className={props.mini ? 'hidden' : ''} style={{ maxWidth: '10px', paddingLeft: '0px', paddingRight: '16px' }}>
                    <MdExpandMore />
                </Col>
            </Row>
            <Row
                onClick={() => {
                    !presentationMode && setOpen(!props.mini && !open);
                }}
                className={'classInfoCollapse'}
            >
                <Collapse in={open} dimension="height">
                    <div>
                        {isBefore(cdate, timeToDate(props.period.startTime, props.viewDate)) && (
                            <div className="innerbox">
                                {props.period.name || formatClassPeriodName(props.period)} starts in
                                <Timer hidden={!open} basedDate={props.viewDate} time={props.period.startTime} />
                            </div>
                        )}
                        {isWithinInterval(cdate, {
                            start: timeToDate(props.period.startTime, props.viewDate),
                            end: timeToDate(props.period.endTime, props.viewDate),
                        }) && (
                            <div className="innerbox">
                                {props.period.name || formatClassPeriodName(props.period)} ends in
                                <Timer hidden={!open} basedDate={props.viewDate} time={props.period.endTime} />
                            </div>
                        )}
                        {isAfter(cdate, timeToDate(props.period.endTime, props.viewDate)) && <div className="innerbox">Class Ended</div>}
                        <div className="innerbox">
                            Duration:
                            {formatDuration(
                                intervalToDuration({
                                    start: timeToDate(props.period.startTime),
                                    end: timeToDate(props.period.endTime),
                                })
                            )}
                        </div>
                        {[ClassIDS.Zero, ClassIDS.Advisory, ClassIDS.Period].includes(props.period.classID) &&
                            (props.period.teacher.name !== '' || props.period.room !== '') && (
                                <div className="innerbox">
                                    <span className="bold">{props.period.teacher.name}</span>{' '}
                                    {props.period.room !== '' ? 'in room ' + props.period.room : ''}
                                </div>
                            )}
                        {props.period.classID === ClassIDS.Lunch && (
                            <div className="innerbox">
                                <span className="bold">You have lunch {reduxSch.lunch}</span>
                            </div>
                        )}
                        {[ClassIDS.Zero, ClassIDS.Advisory, ClassIDS.Period].includes(props.period.classID) && props.period.teacher.email !== '' && (
                            <div className="innerbox">
                                <a
                                    href={(props.period.teacher.email.includes('https') ? '' : 'mailto:') + props.period.teacher.email}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    Email Teacher
                                </a>
                            </div>
                        )}
                    </div>
                </Collapse>
            </Row>
        </Container>
    );
}
export default ScheduleEntry;
