import { Class } from "../../../types"
import Center from "../../../components/Center"
import ScheduleEntry from "./ScheduleEntry"
import ListGroup from 'react-bootstrap/ListGroup'
import { EventSchedule } from '../index';
import { format, isSameDay } from 'date-fns'
import Button from 'react-bootstrap/Button';
import { useId, useMemo, useRef, useEffect, useState } from "react";
import { formatClassTimeHideElement } from "../../../lib"
import { SchHeader } from "./ScheduleHeader"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Overlay } from "react-bootstrap";
import { useScreenshot } from 'use-react-screenshot'
import { copyImageToClipboard,canCopyImagesToClipboard, requestClipboardWritePermission } from 'copy-image-clipboard'

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useTransition, animated, config } from '@react-spring/web'
import {useUpdate} from 'react-use';

type ScheduleProps = {
    sch: Class[]
    event: EventSchedule
    displayDate: Date
    setDisplayDate: (date: Date) => void,
    setup: (b: boolean) => void
}

function Schedule(props: ScheduleProps) {
    console.log("props: ", props.sch)
    const [showImageToast, setShowImageToast] = useState(false);
    const [imageCopiedToClipboard, setImageCopiedToClipboard] = useState(false);
    const screenref = useRef<HTMLDivElement>(null)
    const [image, takeScreenshot] = useScreenshot()
    
    const doMini: boolean = useMemo(() => {
        const hiddens = props.sch.map((i) => {
            return formatClassTimeHideElement(i) == "hidden"
        })
        return hiddens.some((i) => i)
    },[props.sch])
    const id = useId()
    const up = useUpdate()

    useEffect(() => {
        console.log(image)

        if (image) {
            if (!canCopyImagesToClipboard()) {
                //alert("unable to copy image to clipboard on this platform, cringe.")
                // window.open(image);
                setImageCopiedToClipboard(false)
                setShowImageToast(true)
                setTimeout(up,10050)
                return;
            }
            requestClipboardWritePermission().then((hasPerm) => {
                if (!hasPerm) {
                    // window.open(image);
                    setShowImageToast(true)
                    setImageCopiedToClipboard(false)
                    setTimeout(up,10050)
                    return;
                }
                copyImageToClipboard(image).then(() => {
                    setImageCopiedToClipboard(true)
                    setShowImageToast(true)
                    setTimeout(up,10050)
                    return;
                });
            })
        }
        return;
    },[image])

    /*useEffect(() => {
        if (showImageToast === false) {
            up()
        }
    }, [showImageToast])*/

    return (
        <div>
            <ToastContainer className="p-3" position={"bottom-end"}>
                <Toast onClose={() => setShowImageToast(false)} show={showImageToast} delay={10000} autohide>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Image Captured</strong>
                        <small>Just Now</small>
                    </Toast.Header>
                    <Toast.Body>
                        { imageCopiedToClipboard ? 'The image has been copied to your clipboard.' : 'Copy the image below and save it' }
                        <img
                            src={image}
                            className="rounded me-2"
                            style={{ width: "100%", height: "auto" }}
                            alt=""
                        />
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <SchHeader home={()=>{props.setDisplayDate(new Date())}} setup={props.setup} takeScreenshot={takeScreenshot} displayDate={props.displayDate} setDisplayDate={props.setDisplayDate} screenRef={screenref} />
            <Center>
                <br />
                <br />
                <br />
                <br />
                <div
                    ref={screenref}
                    style={{ backgroundColor: "var(--bg)", padding: "3em" }}
                >
                    <Container style={{ width: "80vw", maxWidth: "900px" }}>
                        <Row className="row background-clear justify-content-center text-center">
                            <Center className="date">
                                {format(props.displayDate, "EEEE: LL/dd/yyyy")}
                            </Center>
                        </Row>
                        { props.sch.map((period, i) => {
                            return (
                                
                                <Row className="crow" key={period.classID.toString() + period.period?.toString()}>
                                    <ScheduleEntry
                                        key={i.toString()}
                                        mini={doMini}
                                        period={period}
                                        viewDate={props.displayDate}
                                    />
                                </Row>
                                
                            );
                        })}
                    </Container>
                    {props.event.isEvent ? (
                        <div style={{ marginTop: "1em" }}>
                            {props.event.info.message}
                        </div>
                    ) : null}
                    <br />
                </div>
            </Center>
        </div>
    );
}
export default Schedule

/*
import React, { createRef, useState } from 'react'
import { useScreenshot } from 'use-react-screenshot'

export default () => {
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => takeScreenshot(ref.current)
  return (
    <div>
      <div>
        <button style={{ marginBottom: '10px' }} onClick={getImage}>
          Take screenshot
        </button>
      </div>
      <img width={width} src={image} alt={'Screenshot'} />
      <div ref={ref}>
        <h1>use-react-screenshot</h1>
        <p>
          <strong>hook by @vre2h which allows to create screenshots</strong>
        </p>
      </div>
    </div>
  )
}
*/