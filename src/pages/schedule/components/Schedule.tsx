import { Class, dateToTime, Time } from "../../../types"
import Center from "../../../components/Center"
import ScheduleEntry from "./ScheduleEntry"
import { EventSchedule } from '../index';
import { format } from 'date-fns'
import { useMemo, useRef, useEffect, useState } from "react";
import { formatClassTimeHideElement } from "../../../lib/lib"
import { today } from "../../../today";
import { SchHeader } from "./ScheduleHeader"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { copyImageToClipboard,canCopyImagesToClipboard, requestClipboardWritePermission } from 'copy-image-clipboard'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { toPng } from 'html-to-image';
import { useStudentvue } from '../../../storage/studentvue';
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/store";
import { useInterval } from "react-use";
import React from "react";

type ScheduleProps = {
    sch: Class[]
    event: EventSchedule
    displayDate: Date
    setDisplayDate: (date: Date) => void,
    setup: (b: boolean) => void
    show: boolean
    toggleShow: (a: boolean) => void
}

function Schedule(props: ScheduleProps) {
    const [customToast, setCustomToast] = useState<{ header: string, body: string }>({ header: "", body: "" });
    const [showCustomToast, setShowCustomToast] = useState(false);
    
    const studentvue = useStudentvue();
    const presentationMode = useSelector((state: RootState) => state.misc.presentationMode);
    useEffect(() => {
        if (studentvue.isLoggedIn === true && studentvue.gotSchedules === false) {
            setCustomToast({
                header: "StudentVue Error",
                body: "We were unable to get your classes from StudentVue. StudentVue may be down/your schedule may have an issue or you are not connected to the internet."
            })
            setShowCustomToast(true);
        }
    }, [studentvue])

    const screenref = useRef<HTMLDivElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [showImageToast, setShowImageToast] = useState(false);
    const [imageCopiedToClipboard, setImageCopiedToClipboard] = useState(false);

    const img = (image: string | null) => {
        if (image) {
            if (!canCopyImagesToClipboard()) {
                setImageCopiedToClipboard(false)
                setShowImageToast(true)
                return;
            }
            requestClipboardWritePermission().then((hasPerm) => {
                if (!hasPerm) {
                    setShowImageToast(true)
                    setImageCopiedToClipboard(false)
                    return;
                }
                copyImageToClipboard(image).then(() => {
                    setImageCopiedToClipboard(true)
                    setShowImageToast(true)
                    return;
                });
            })
        }
        return;
    }

    function takeScreenshot() {
        return new Promise<string>((r,j) => {
            if (!screenref.current) {
                j("lmafo")
                return;
            }

            toPng(screenref.current, {
                backgroundColor: "#272727",
                cacheBust: true,
                style: { "fontFamily": "Roboto, Ariel" },
                filter: (node) => {
                    if (typeof node.className === 'string' && node.className.split(" ").includes("classTypeIcon")) {
                        return false;
                    }
                    return true;
                }
            }).then(dataUrl => {
                setImage(dataUrl)
                r(dataUrl)
            })
        })
    }

    const getImage = () => takeScreenshot().then(img).catch((err) => {throw new Error(err)})

    // Maybe this will get rid of the font issues? super great for preformance too isnt it : ) smh
    // It got rid of the font issues.
    useEffect(() => {
        if (image === null) {
            takeScreenshot()
        }
    }, [image])

    const [currentTime, setCurrentTime] = useState<Time>(dateToTime(today()));
    //const [devTime, setDevTime] = useState<Time | null>(process.env.NODE_ENV === 'development' ? dateToTime(today()) : null);
    useInterval(() => {
            setCurrentTime(dateToTime(today()))
    }, 1000)

    useEffect(() => {
        setCurrentTime(dateToTime(today()))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.displayDate])
    
    const doMini: boolean = useMemo(() => {
        const hiddens = props.sch.map((i) => {
            return formatClassTimeHideElement(i) == "hidden"
        })
        return hiddens.some((i) => i)
    },[props.sch])

    return (
        <div className={props.show ? 'hidden' : ''}>
            <ToastContainer className="p-3" position={'bottom-end'}>
                <Toast onClose={() => setShowCustomToast(false)} show={showCustomToast} delay={30000} autohide>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">{customToast.header}</strong>
                        <small>Just Now</small>
                    </Toast.Header>
                    <Toast.Body>{customToast.body}</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer className="p-3" position={"bottom-end"}>
                <Toast onClose={() => setShowImageToast(false)} show={showImageToast} delay={10000} autohide>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Image Captured</strong>
                        <small>Just Now</small>
                    </Toast.Header>
                    <Toast.Body>
                        { imageCopiedToClipboard ? 'The image has been copied to your clipboard.' : <><a href={image || '/'} rel="noreferrer" target="_parent" download={"screenshot.png"}>Download</a> or copy the image to save it.</> } 
                        <img
                            src={image || '/'}
                            className="rounded me-2"
                            style={{ width: "100%", height: "auto" }}
                            alt=""
                        />
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <SchHeader
                sch={ props.sch }
                home={()=>{ props.setDisplayDate(today()) }}
                getImage={ getImage }
                displayDate={ props.displayDate }
                setDisplayDate={ presentationMode ? ()=>{return;} : props.setDisplayDate }
                presentationMode={ presentationMode }
                toggleShow={ props.toggleShow }
            />
            <Center>
                <div
                    ref={screenref}
                    style={{ padding: "3em", fontFamily: "Roboto" }}
                >
                    <Container className={'scheduleList'}>
                        <Row className="row date text-center">
                            <Center className="date">
                                {format(props.displayDate, "EEEE: LL/dd/yyyy")}
                            </Center>
                        </Row>
                        { props.sch.map((period, i) => {
                            return (
                                <Row className="crow" key={period.classID.toString() + period.period?.toString() + period.name + `${period.startTime.hours}${period.startTime.minutes}${period.startTime.seconds}`}>
                                    <ScheduleEntry
                                        key={i.toString()}
                                        mini={doMini}
                                        sch={props.sch}
                                        period={period}
                                        viewDate={props.displayDate}
                                        currentTime={currentTime}
                                    />
                                </Row>
                                
                            );
                        })}
                    </Container>
                    <div>{props.event.isEvent ? (
                        // TODO: add timer for multi day event
                        <div style={{ marginTop: "1em" }} dangerouslySetInnerHTML={{ __html: props.event.info.message }}>
                        </div>
                    ) : null}
                    </div>
                    <br />
                    <div>
                        { props.event.hasError ? (
                            <div>
                                <div style={{ marginTop: "1em" }} dangerouslySetInnerHTML={{ __html: props.event.info.error || 'There was an error' }}>
                                </div>
                            </div>
                        ) : null }
                    </div>
                </div>
            </Center>
        </div>
    );
}

export default Schedule;
