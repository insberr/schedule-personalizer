import Button from "react-bootstrap/Button";
import { resetStorage } from "../../storage/store";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../storage/store";
import { setRgbParty } from "../../storage/misc";
import { useKeyboardShortcut } from "../../hooks";
import { useStudentvue } from "../../storage/studentvue";
import { Manual } from "../setup/steps/Manual";
import { useRef, useState } from "react";
import { Terms, ClassIDS, getTimeW, dateToTime, RGBA, Colors } from "../../types";
// import { useSchedule } from "../../storage/schedule";
import Center from "../../components/Center";
import { Container,  Form,  FormControlProps,  ListGroup, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { setCurrentClassColor, setScheduleColor, useCustomizations, resetColors, setCustomizations, setAllColors } from "../../storage/customizations";
import { ChromePicker } from 'react-color';
import ScheduleEntry from "../schedule/components/ScheduleEntry";
import tinyColor from 'tinycolor2';
import { debounce } from 'lodash';
import { useDebounce } from "react-use";
import { TypedStartListening } from "@reduxjs/toolkit";

// I left off trying to debounce the color picker onChange event

export function SettingsPage(props: { setSchedule: (s: Terms) => void, setup: (s: boolean) => void }) {
    // const sch = useSchedule();
    const stv = useStudentvue();
    const customizations = useCustomizations();

    const doRGBParty = useSelector((state: RootState) => state.misc.rgbParty)

    const [tab, setTab] = useState('general');

    const [editManually, setEditManually] = useState(false);
    const dispatch = useDispatch()

    useKeyboardShortcut("shift + r + g + b", () => {
        dispatch(setRgbParty(!doRGBParty))
    })

    const [colorPickerValues, setColorPickerValues] = useState<Colors>({ ...customizations.theme.colors });

    const debounceColor = debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, c: [string, RGBA]) => {
        const color = tinyColor(e.target.value);
        if (c[0] === 'currentClass') {
            setColorPickerValues({ ...colorPickerValues, currentClass: { ...colorPickerValues.currentClass, c: color.toRgb() } })
        } else {
            setColorPickerValues({ ...colorPickerValues, schedule: { ...colorPickerValues.schedule, [parseInt(c[0])]: { ...colorPickerValues.schedule[parseInt(c[0])  as unknown as ClassIDS], c: color.toRgb() } } })
        }
    }, 5)
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, c: [string, RGBA]) {
        debounceColor(e, c);
    }

    if (editManually) {
        // the satStage thing is not the best but itll be fine lol
        return (<Manual setStage={(a: number) => { console.log('setStage is not defined, oops (settings/index.tsx). attempted to set stage to: ', a) }} setSchedule={props.setSchedule} isEdit={editManually} setIsEdit={setEditManually}></Manual>)
    }

    return (<><Center>
        <h1>Settings</h1>
        </Center>
        <Tabs
            id="settingsPageTabs"
            activeKey={tab}
            onSelect={(k) => setTab(k as string)}
            className="mb-3 crimsonTabs"
            fill>
            <Tab eventKey="general" title="General">
                <Center>
                    <h2>General</h2>
                    <Stack gap={4}>
                        <Button variant="danger" onClick={()=>{ props.setup(false); resetStorage(); location.reload(); }}>Reset</Button>
                        <Button onClick={()=>{ dispatch(resetColors()); setTimeout(() => { props.setup(false) }, 100); }}>Reset Custom Colors</Button>
                        <Button onClick={()=>{ location.reload() }}>Reload</Button>
                        <Button onClick={()=>{ navigator.serviceWorker.controller !== null ? navigator.serviceWorker.controller.postMessage("clearCache") : console.log('couldnt update') }}>Force Update Site</Button>
                        <Button className={ stv.isLoggedIn ? 'hidden' : '' } onClick={() => { console.log('set manually'); setEditManually(true) }}>Edit Schedule</Button>
                    </Stack>
                </Center>
            </Tab>
            <Tab eventKey="customizations" title="Customize">
                <Center>
                    <h2>Customizations</h2>
                </Center>
                <div className="mt-4">
                    <Center>
                        <h4>Schedule Colors</h4>
                    </Center>
                    <ListGroup variant="flush">
                        { Object.entries(customizations.theme.colors.schedule).map((c, i) => {
                            return (
                            <ListGroup.Item key={'scheduleColors'+c[0]+i}>
                                <Center>
                                    <Stack gap={2} direction="horizontal" className="mb-2">
                                        <Form.Group>
                                            <Form.Label htmlFor={"classColorInput" + c[0]}>Color picker</Form.Label>
                                            <Form.Control
                                                type="color"
                                                id={"classColorInput" + c[0]}
                                                defaultValue={ tinyColor(c[1].c).toHexString() }
                                                title={"Pick Color For " + c[0]}
                                                onChange={async (e) => {
                                                    handleChange(e, c);
                                                }}
                                                onBlur={() => { dispatch(setAllColors(colorPickerValues)); }}
                                            />
                                        </Form.Group>
                                        <span>TODO: add alpha changer</span>
                                        <Button onClick={() => { dispatch(setScheduleColor({sch: c[0] as unknown as ClassIDS, color: { ...c[1], enabled: false } })) } }>Reset</Button>
                                    </Stack>
                                    <Container style={{ width: "80vw", maxWidth: "900px" }}>
                                        <Row className="crow">
                                            <ScheduleEntry isForCustomizations={true} forcedColor={colorPickerValues.schedule[parseInt(c[0]) as unknown as ClassIDS]} viewDate={new Date()} sch={[]} period={{ classID: parseInt(c[0]), period: 0, name: ClassIDS[parseInt(c[0])], room: '100', teacher: { name: 'Crabby', email: 'CrabbyPatty@school.edu', id: 'madeupid'}, startTime: getTimeW(0, 0), endTime: getTimeW(23, 59) }} mini={false} key={'scheduleColors'+c[0]+i} />
                                        </Row>
                                    </Container>
                                </Center>
                            </ListGroup.Item>)
                        }) }
                        <ListGroup.Item>
                            <Center>
                                <Stack gap={2} direction="horizontal">
                                    <Form.Group>
                                        <Form.Label htmlFor={"classColorInputCurrentClass"}>Color picker</Form.Label>
                                        <Form.Control
                                            type="color"
                                            id={"classColorInputCurrentClass"}
                                            defaultValue={ tinyColor(customizations.theme.colors.currentClass.c).toHexString()}
                                            title={"Pick Color For Current Class"}
                                            onChange={async (e) => {
                                                handleChange(e, ['currentClass', customizations.theme.colors.currentClass]);
                                            }}
                                            onBlur={() => { dispatch(setAllColors(colorPickerValues)); }}
                                        />
                                    </Form.Group>
                                    <span>TODO: add alpha changer</span>
                                    <Button onClick={() => { dispatch(setCurrentClassColor({ ...customizations.theme.colors.currentClass, enabled: false })) } }>Reset</Button>
                                </Stack>
                                
                                <Container style={{ width: "80vw", maxWidth: "900px" }}>
                                    <Row className="crow">
                                        <ScheduleEntry isForCustomizations={true} forcedColor={colorPickerValues.currentClass} viewDate={new Date()} sch={[]} period={{ classID: ClassIDS.Period, period: 1, name: 'Current Period', room: '100', teacher: { name: 'Crabby', email: 'CrabbyPatty@school.edu', id: 'currentClassColorOverride'}, startTime: getTimeW(0, 0), endTime: getTimeW(23, 59) }} mini={false} key={'scheduleColors'+customizations.theme.colors.currentClass} />
                                    </Row>
                                </Container>
                            </Center>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </Tab>
            <Tab eventKey="credits" title="Credits">
                <Center>
                    <h2>Credits</h2>
                    <div>Jonah Matteson - Creator</div>
                    <div>Wackery - Creator</div>
                    <a href="https://github.com/insberr/schedule-personalizer">See the code on GitHub</a>
                </Center>
            </Tab>
            <Tab eventKey="devs" title="Devs">
                <h2>Dev And Debug</h2>
                <div>
                    <Button href="/editor">Event Editor (Devs only)</Button>
                    <Button href="/test">testing (Devs only)</Button>
                    <pre className="paper">
                        add debug info here
                    </pre>
                </div>
            </Tab>
        </Tabs>
        <Center>
    </Center></>)
}
