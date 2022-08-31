import { Class, Term, timeToDate } from "../../../types"
import Center from "../../../components/Center"
import ScheduleEntry from "./ScheduleEntry"
import { EventSchedule } from '../index';
import { format } from 'date-fns'
import { useMemo, useRef, useEffect, useState } from "react";
import { formatClassTimeHideElement } from "../../../lib"
import { SchHeader } from "./ScheduleHeader"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useScreenshot } from 'use-react-screenshot'
import { copyImageToClipboard,canCopyImagesToClipboard, requestClipboardWritePermission } from 'copy-image-clipboard'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import * as api from '../../../apis/studentvue/studentVueAPI';
import { toPng } from 'html-to-image';
import { useStudentvue } from '../../../storage/studentvue';
import { Col, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

type ScheduleProps = {
    sch: Class[]
    event: EventSchedule
    displayDate: Date
    setDisplayDate: (date: Date) => void,
    setup: (b: boolean) => void
}

function Schedule(props: ScheduleProps) {
    const [dateText, setDateText] = useState('');

    const studentvue = useStudentvue();

    const [showImageToast, setShowImageToast] = useState(false);
    const [imageCopiedToClipboard, setImageCopiedToClipboard] = useState(false);
    const screenref = useRef<HTMLDivElement>(null)
    const [image, setImage] = useState<string | undefined>(undefined);
    function takeScreenshot() {
        return new Promise<string>((r,j) => {
            if (!screenref.current) {
                j("lmafo")
                return;
            }
            toPng(screenref.current, {backgroundColor:"#272727",cacheBust:true, style:{"fontFamily":"Roboto"}}).then(dataUrl => {
                setImage(dataUrl)
                r(dataUrl)
            })
        })

    }
    const getImage = () => takeScreenshot().then(img).catch((err) => {throw new Error(err)})
    
    const doMini: boolean = useMemo(() => {
        const hiddens = props.sch.map((i) => {
            return formatClassTimeHideElement(i) == "hidden"
        })
        return hiddens.some((i) => i)
    },[props.sch])

    /*useEffect(() => {*/
    const img = (image: any, { name = 'screenshot', extension = 'png' } = {}) => {
        // console.log(image)

        if (image) {
            if (!canCopyImagesToClipboard()) {
                //alert("unable to copy image to clipboard on this platform, cringe.")
                // window.open(image);
                setImageCopiedToClipboard(false)
                setShowImageToast(true)
                return;
            }
            requestClipboardWritePermission().then((hasPerm) => {
                if (!hasPerm) {
                    // window.open(image);
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
    }/*,[image])*/

    const [customToast, setCustomToast] = useState<{ header: string, body: string }>({
        header: "",
        body: ""
    });
    const [showCustomToast, setShowCustomToast] = useState(false);
    
    useEffect(() => {
        if (studentvue.isLoggedIn === true && studentvue.gotSchedules === false) {
            setCustomToast({
                header: "StudentVue Error",
                body: "We were unable to get your classes from StudentVue. StudentVue may be down. If this issue continues, please [ADD BUTTON !!!]click here to report a bug!"
            })
            setShowCustomToast(true);
        }

        /*
        if (studentvue.isLoggedIn) {
            api.getSchoolInfo(studentvue.username, studentvue.password).then((info) => {
                console.log(info)
            }).catch((err) => {
                console.log(err)
            })
        }
        */
    }, [studentvue])
    

    return (
        <div>
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
                        { imageCopiedToClipboard ? 'The image has been copied to your clipboard.' : <><a href={image} rel="noreferrer" target="_parent" download="screeny.png">Download</a> the image below and save it</> } 
                        <img
                            src={image}
                            className="rounded me-2"
                            style={{ width: "100%", height: "auto" }}
                            alt=""
                        />
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <SchHeader sch={props.sch} home={()=>{props.setDisplayDate(new Date())}} setup={props.setup} getImage={getImage} displayDate={props.displayDate} setDisplayDate={props.setDisplayDate} />
            { /*<Form.Control
                type="text"
                id="setTime"
                value={dateText}
                onChange={(e) => {
                    setDateText(e.target.value)
                }}
            />
            <Button onClick={() => {
                // this is temporary, i left off here
                const tds = timeToDate(JSON.parse(dateText), props.displayDate)
                props.setDisplayDate(tds)
            }}>Set time</Button>
            */ }
            <Center>
                <div
                    ref={screenref}
                    style={{ padding: "3em", fontFamily: "Roboto" }}
                >
                    <Container style={{ width: "80vw", maxWidth: "900px" }}>
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
