import Button from "react-bootstrap/Button";
import { persistConfig, resetStorage, store } from "../../storage/store";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../storage/store";
import { setRgbParty } from "../../storage/misc";
import { useKeyboardShortcut } from "../../hooks";
import { useStudentvue } from "../../storage/studentvue";
import { Manual } from "../setup/steps/Manual";
import { useState } from "react";
import { Terms, ClassIDS, getTimeW, dateToTime, RGBA, Colors, Class } from "../../types";
import Center from "../../components/Center";
import { Col, Container,  Form, ListGroup, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { setCurrentClassColor, setScheduleColor, useCustomizations, resetColors, setAllColors } from "../../storage/customizations";
import ScheduleEntry from "../schedule/components/ScheduleEntry";
import tinyColor from 'tinycolor2';
import { debounce } from 'lodash';
import { identifyCommit } from "../../lib";


export function SettingsPage(props: { setSchedule: (s: Terms) => void, setup: (s: boolean) => void }) {
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

    const debounceColor = debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, c: [string, RGBA], type: string) => {
        let color = tinyColor('#ffffff');
        if (type === 'alpha') {
            color = tinyColor(c[1].c)
            color.setAlpha(parseFloat(e.target.value))
        } else if (type === 'color') {
            color = tinyColor(e.target.value);
        } else if (type === 'text') {
            color = tinyColor(e.target.value);

            if (c[0] === 'currentClass') {
                setColorPickerValues({ ...colorPickerValues, currentClass: { ...colorPickerValues.currentClass, t: color.toRgb() } })
            } else {
                setColorPickerValues({ ...colorPickerValues, schedule: { ...colorPickerValues.schedule, [parseInt(c[0])]: { ...colorPickerValues.schedule[parseInt(c[0])  as unknown as ClassIDS], t: color.toRgb() } } })
            }
            return;
        }

        if (c[0] === 'currentClass') {
            setColorPickerValues({ ...colorPickerValues, currentClass: { ...colorPickerValues.currentClass, c: color.toRgb() } })
        } else {
            setColorPickerValues({ ...colorPickerValues, schedule: { ...colorPickerValues.schedule, [parseInt(c[0])]: { ...colorPickerValues.schedule[parseInt(c[0])  as unknown as ClassIDS], c: color.toRgb() } } })
        }
    }, 5)
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, c: [string, RGBA], type: string) {
        debounceColor(e, c, type);
    }

    if (editManually) {
        // the satStage thing is not the best but itll be fine lol
        return (<Manual setStage={(a: number) => { console.log('setStage is not defined, oops (settings/index.tsx). attempted to set stage to: ', a) }} setSchedule={props.setSchedule} isEdit={editManually} setIsEdit={setEditManually}></Manual>)
    }

    function scheduleEntryFakePeriod(classID: ClassIDS, name?: string): Class {
        return {
            classID: classID,
            period: classID === ClassIDS.Period ? 1 : 0,
            name: name || ClassIDS[classID],
            room: '100',
            teacher: {
                name: 'Bo Burnham',
                email: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                id: 'madeUpID'
            },
            startTime: getTimeW(0, 0),
            endTime: getTimeW(23, 59)
        }
    }
    function updateSW() {
        navigator.serviceWorker.getRegistration().then((s)=>{
            if (s == undefined) {
                return window.location.reload();
            }
            s.update().then(window.location.reload).catch(window.location.reload)
        });
    }

    return (<><Center>
        <h1>Settings</h1>
        </Center>
        <Tabs
            id="settingsPageTabs"
            activeKey={tab}
            onSelect={(k) => setTab(k as string)}
            className="mb-3 crimsonTabs"
            justify>
            <Tab eventKey="general" title="General">
                <Center>
                    <h2>General</h2>
                    <Stack gap={4}>
                        <Button variant="danger" onClick={()=>{ props.setup(false); resetStorage(); location.reload(); }}>Reset</Button>
                        <Button onClick={()=>{ dispatch(resetColors()); setTimeout(() => { props.setup(false) }, 100); }}>Reset Custom Colors</Button>
                        <Button onClick={()=>{ location.reload() }}>Reload</Button>
                        <Button onClick={()=>{ updateSW() }}>Force Update Site</Button>
                        <Button className={ stv.isLoggedIn ? 'hidden' : '' } onClick={() => { console.log('set manually'); setEditManually(true) }}>Edit Schedule</Button>
                    </Stack>
                </Center>
            </Tab>
            <Tab eventKey="customizations" title="Customize">
                <Center>
                    <h2>Customizations</h2>
                </Center>
                <div className="mt-4 mb-5">
                    <Center>
                        <h4>Schedule Colors</h4>
                    </Center>
                    { /* Implement option to show/hide schedule icons. the pain */ }
                    <Form.Check
                        className="hidden" 
                        type="switch"
                        id="enableIcons"
                        label="Enable Schedule Icons"
                    />
                    <ListGroup variant="flush">
                        <ListGroup.Item key={'scheduleColorsCurrentClass'} className="mb-5 mt-5">
                            <Center noDFlex noVW>
                            <Container fluid>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Form.Group>
                                                <Form.Label htmlFor={"classColorInputCurrentClass"}>Color</Form.Label>
                                                <Form.Control
                                                    type="color"
                                                    id={"classColorInputCurrentClass"}
                                                    defaultValue={ tinyColor(customizations.theme.colors.currentClass.c).toHexString()}
                                                    title={"Pick Color For Current Class"}
                                                    onChange={async (e) => {
                                                        handleChange(e, ['currentClass', customizations.theme.colors.currentClass], 'color');
                                                    }}
                                                    onBlur={() => { dispatch(setAllColors(colorPickerValues)); }}
                                                    style={{ width: "6rem", marginLeft: 'calc(50% - 3rem)' }}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col>
                                                <Button onClick={() => {
                                                        dispatch(setCurrentClassColor({ ...colorPickerValues.currentClass, c: { r: 0, g: 0, b: 0, a: 0 } }))
                                                        setColorPickerValues({ ...colorPickerValues, currentClass: { ...colorPickerValues.currentClass, c: { r: 0, g: 0, b: 0, a: 0 } } })
                                                }}>Reset</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Form.Group>
                                                <Form.Label htmlFor={"textColorInputCurrentClass"}>Text</Form.Label>
                                                <Form.Control
                                                    type="color"
                                                    id={"textColorInputCurrentClass"}
                                                    defaultValue={ tinyColor(customizations.theme.colors.currentClass.t).toHexString()}
                                                    title={"Pick Text Color For Current Class"}
                                                    onChange={async (e) => {
                                                        handleChange(e, ['currentClass', customizations.theme.colors.currentClass], 'text');
                                                    }}
                                                    onBlur={() => { dispatch(setAllColors(colorPickerValues)); }}
                                                    style={{ width: "6rem", marginLeft: 'calc(50% - 3rem)' }}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col>
                                                <Button onClick={() => {
                                                    dispatch(setCurrentClassColor({ ...colorPickerValues.currentClass, t: { r: 0, g: 0, b: 0, a: 0 } }))
                                                    setColorPickerValues({ ...colorPickerValues, currentClass: { ...colorPickerValues.currentClass, t: { r: 0, g: 0, b: 0, a: 0 } } })
                                                }}>Reset</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Form.Group>
                                                <Form.Label htmlFor="classColorRangeCurrentClass">Transparency</Form.Label>
                                                <Form.Range
                                                    id={"classColorRangeCurrentClass"}
                                                    min={0.00}
                                                    max={1.00}
                                                    step={0.01}
                                                    defaultValue={customizations.theme.colors.currentClass.c.a}
                                                    onChange={(e) => {
                                                        handleChange(e, ['currentClass', customizations.theme.colors.currentClass], 'alpha');
                                                    }}
                                                    onBlur={() => { dispatch(setAllColors(colorPickerValues)); }}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col>
                                                <Button onClick={() => {
                                                    dispatch(setCurrentClassColor({ t: { r: 0, g: 0, b: 0, a: 0 }, c: { r: 0, g: 0, b: 0, a: 0 }, enabled: false }))
                                                    setColorPickerValues({ ...colorPickerValues, currentClass: { t: { r: 0, g: 0, b: 0, a: 0 }, c: { r: 0, g: 0, b: 0, a: 0 }, enabled: false } })
                                                }}>Reset All</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="mt-3 crow">
                                    <ScheduleEntry
                                        currentTime={dateToTime(new Date())}
                                        isForCustomizations={true}
                                        forcedColor={colorPickerValues.currentClass}
                                        viewDate={new Date()} sch={[]}
                                        period={scheduleEntryFakePeriod(ClassIDS.Period, 'Current Period')}
                                        mini={false}
                                        key={'scheduleColorsCurrentClass'}
                                    />
                                </Row>
                            </Container>
                            </Center>
                        </ListGroup.Item>
                        { Object.entries(customizations.theme.colors.schedule).map((c, i) => {
                            return (
                            <ListGroup.Item key={'scheduleColors'+c[0]+i} className="mb-5">
                                <Center noDFlex noVW>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Form.Group>
                                                    <Form.Label htmlFor={"classColorInput" + c[0]}>Color</Form.Label>
                                                    <Form.Control
                                                        type="color"
                                                        id={"classColorInput" + c[0]}
                                                        defaultValue={ tinyColor(c[1].c).toHexString() }
                                                        title={"Pick Color For " + c[0]}
                                                        onChange={async (e) => {
                                                            handleChange(e, c, 'color');
                                                        }}
                                                        onBlur={() => { dispatch(setAllColors(colorPickerValues)); }}
                                                        style={{ width: "6rem", marginLeft: 'calc(50% - 3rem)' }}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col>
                                                    <Button onClick={() => {
                                                        dispatch(setScheduleColor({sch: c[0] as unknown as ClassIDS, color: { ...colorPickerValues.schedule[c[0] as unknown as ClassIDS], c: { r: 0, g: 0, b: 0, a: 0 } } }))
                                                        setColorPickerValues({ ...colorPickerValues, schedule: { ...colorPickerValues.schedule, [parseInt(c[0])]: { ...colorPickerValues.schedule[c[0] as unknown as ClassIDS], c: { r: 0, g: 0, b: 0, a: 0 } } } })
                                                    }}>Reset</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Form.Group>
                                                    <Form.Label htmlFor={"textColorInput" + c[0]}>Text</Form.Label>
                                                    <Form.Control
                                                        type="color"
                                                        id={"textColorInput" + c[0]}
                                                        defaultValue={ tinyColor(c[1].t).toHexString()}
                                                        title={"Pick Text Color For " + c[0]}
                                                        onChange={async (e) => {
                                                            handleChange(e, c, 'text');
                                                        }}
                                                        onBlur={() => { dispatch(setAllColors(colorPickerValues)); }}
                                                        style={{ width: "6rem", marginLeft: 'calc(50% - 3rem)' }}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button onClick={() => {
                                                        dispatch(setScheduleColor({sch: c[0] as unknown as ClassIDS, color: { ...colorPickerValues.schedule[c[0] as unknown as ClassIDS], t: { r: 0, g: 0, b: 0, a: 0 } } }))
                                                        setColorPickerValues({ ...colorPickerValues, schedule: { ...colorPickerValues.schedule, [parseInt(c[0])]: { ...colorPickerValues.schedule[c[0] as unknown as ClassIDS], t: { r: 0, g: 0, b: 0, a: 0 } } } })
                                                    }}>Reset</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                            <Form.Group>
                                                <Form.Label htmlFor={"classColorRange" + c[0]}>Transparency</Form.Label>
                                                <Form.Range
                                                    id={"classColorRange" + c[0]}
                                                    min={0.00}
                                                    max={1.00}
                                                    step={0.01}
                                                    defaultValue={c[1].c.a}
                                                    onChange={(e) => {
                                                        handleChange(e, c, 'alpha');
                                                    }}
                                                    onBlur={() => { dispatch(setAllColors(colorPickerValues)); }}
                                                />
                                            </Form.Group>
                                            </Row>
                                            <Row>
                                            <Col>
                                                <Button onClick={() => {
                                                        dispatch(setScheduleColor({sch: c[0] as unknown as ClassIDS, color: { t: { r: 0, g: 0, b: 0, a: 0 }, c: { r: 0, g: 0, b: 0, a: 0 }, enabled: false } }))
                                                        setColorPickerValues({ ...colorPickerValues, schedule: { ...colorPickerValues.schedule, [parseInt(c[0])]: { t: { r: 0, g: 0, b: 0, a: 0 }, c: { r: 0, g: 0, b: 0, a: 0 }, enabled: false } } })
                                                    }}>Reset All</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3 crow">
                                            <ScheduleEntry
                                                currentTime={dateToTime(new Date())}
                                                isForCustomizations={true}
                                                forcedColor={colorPickerValues.schedule[parseInt(c[0]) as unknown as ClassIDS]}
                                                viewDate={new Date()} sch={[]}
                                                period={scheduleEntryFakePeriod(parseInt(c[0]) as unknown as ClassIDS)}
                                                mini={false}
                                                key={'scheduleColors'+c[0]+i}
                                            />
                                    </Row>
                                </Container>
                                </Center>
                            </ListGroup.Item>)
                        }) }
                    </ListGroup>
                </div>
            </Tab>
            <Tab eventKey="credits" title="Credits">
                <Center>
                    <h2>Credits</h2>
                    <div><a href="https://insberr.com">Jonah Matteson</a> - Creator - @insberr on all socials</div>
                    <div><a href="https://wackery.com">Wackery</a> - Creator</div>
                    <a href="https://github.com/insberr/schedule-personalizer">See the code on GitHub</a>
                </Center>
            </Tab>
            <Tab eventKey="devs" title="Devs">
                <h2>Dev And Debug</h2>
                <div>
                    <Button href="/editor">Event Editor (Devs only)</Button>
                    <Button href="/test">testing (Devs only)</Button>
                    <Button onClick={() => { throw new Error('Crash the webpage button was clicked. wonder why ... maybe the Bri ish are cuming') }}>Crash Webpage</Button>
                    <pre className="paper">
                        Redux Storeage Version: {persistConfig.version}
                        { "\n" }
                        Build Version: {identifyCommit() || 'Unknown'}
                        { "\n" }
                        Mode: {process.env.NODE_ENV}
                        { "\n" }
                        {JSON.stringify(store.getState(), null, 1)}
                    </pre>
                </div>
            </Tab>
        </Tabs>
        <Center>
    </Center></>)
}
