import Button from "react-bootstrap/Button";
import { persistConfig, resetStorage, store } from "../../storage/store";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../storage/store";
import { setRgbParty, setPresentationMode } from "../../storage/misc";
import { useKeyboardShortcut } from "../../hooks";
import { useStudentvue } from "../../storage/studentvue";
import { useState, useEffect } from "react";

import { ClassIDS, getTimeW, dateToTime, RGBA, Colors, Class } from "../../types";
import Center from "../../components/Center";
import { Col, Container,  Form, ListGroup, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { setCurrentClassColor, setScheduleColor, useCustomizations, resetColors, setAllColors, setTutorial } from "../../storage/customizations";
import ScheduleEntry from "../schedule/components/ScheduleEntry";
import tinyColor from 'tinycolor2';
import { debounce } from 'lodash';
import { identifyCommit, updateSW } from "../../lib/lib";
import { today } from "../../today";
import * as settings from '../../config/settings';
import * as Sentry from "@sentry/react";
import { setTerms, useSchedule } from "../../storage/schedule";
import { useNavigate } from "../../router/hooks";
import { SettingsHeader } from "./SettingsHeader";
import { Page } from "../../storage/page";
import { useAsync, useAsyncFn } from "react-use";
//import { Endpoints } from "@octokit/types";
import {latestCommit, cloudflarePagesBuilt, shouldUpdate} from "../../apis/github"

export function SettingsPage() {
    const dispatch = useDispatch()
    const stv = useStudentvue();
    const customizations = useCustomizations();
    const sch = useSchedule();
    const navigate = useNavigate();
    const lcommit = useAsync(latestCommit)
    const clBuild = useAsync(cloudflarePagesBuilt);
    const shouldDoTheUpdate = useAsync(shouldUpdate)
    const isSetupComplete = useSelector(
        (state: RootState) => state.misc.setupComplete
    );
    // setup guard
    useEffect(() => {
        if (!isSetupComplete) {
            navigate(Page.SETUP);
        }
    },[isSetupComplete, navigate])

    const doRGBParty = useSelector((state: RootState) => state.misc.rgbParty)
    const presentationMode = useSelector((state: RootState) => state.misc.presentationMode)
    const [tab, setTab] = useState('general');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [editManually, setEditManually] = useState(false);
    

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
            if (c[1].c.a > 0) {
                color.setAlpha(c[1].c.a);
            }
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
    //@todo reimplement.
    /*
    if (editManually) {
        // the satStage thing is not the best but itll be fine lol
        return (<Manual setStage={(a: number) => { console.log('setStage is not defined, oops (settings/index.tsx). attempted to set stage to: ', a) }} setSchedule={props.setSchedule} isEdit={editManually} setIsEdit={setEditManually}></Manual>)
    }
    */
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

    return (<><div><SettingsHeader /><Center>
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
                        <Form.Switch label={"Presentation Mode"} checked={presentationMode} onChange={() => {dispatch(setPresentationMode(!presentationMode))}} />
                        <div></div>
                        <Button onClick={() => {
                            Sentry.showReportDialog({ title: "Submit User Feedback.", subtitle: "This feedback will be sent to the developers or managers of this instance of Schedule Personalizer.", subtitle2: "", labelComments: "What would you like to tell us?", labelSubmit: "Submit", eventID: Sentry.captureEvent({ message: "btn-user-input-settings" }) });
                        }}>Send Feedback</Button>
                        <div></div>
                        <Button className={ stv.isLoggedIn ? 'hidden' : '' } onClick={() => { setEditManually(true) }}>Edit Schedule</Button>
                        <Button variant="danger" onClick={()=>{ navigate(Page.SCHEDULE); resetStorage(); location.reload(); }}>Reset</Button>
                        <Button onClick={()=>{ dispatch(resetColors()); setTimeout(() => { navigate(Page.SCHEDULE) }, 100); }}>Reset Custom Colors</Button>
                        <Button onClick={() => { dispatch(setTutorial(settings.defaultCustomizations.tutorial))}}>Reset Tutorial ToolTips</Button>
                        <Button onClick={()=>{ location.reload() }}>Reload</Button>
                        <Button onClick={()=>{ updateSW() }}>Force update site (beta)</Button>
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
                            <Container>
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
                                                    defaultValue={customizations.theme.colors.currentClass.c.a === 0 ? 1 : customizations.theme.colors.currentClass.c.a}
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
                                        currentTime={dateToTime(today())}
                                        isForCustomizations={true}
                                        forcedColor={colorPickerValues.currentClass}
                                        viewDate={today()} sch={[]}
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
                                                    defaultValue={c[1].c.a === 0 ? 1 : c[1].c.a}
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
                                                currentTime={dateToTime(today())}
                                                isForCustomizations={true}
                                                forcedColor={colorPickerValues.schedule[parseInt(c[0]) as unknown as ClassIDS]}
                                                viewDate={today()} sch={[]}
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
                    <Button href="#" onClick={() => navigate(Page.EDITOR)}>Event Editor (Devs only)</Button>
                    <Button onClick={() => { throw new Error('Crash the webpage button was clicked. wonder why ... maybe the Bri-ish are coming') }}>Send fake error to Sentry.io</Button>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Input Terms Object</Form.Label>
                        <Form.Control as="textarea" rows={2} cols={5} value={JSON.stringify(sch.terms)} onChange={(e) => { dispatch(setTerms(JSON.parse(e.target.value)))}} />
                    </Form.Group>
                    
                    <pre className="paper">
                        { "==Dev info==\n\nStorage Info\n\n"}
                        Redux Storage Version: {persistConfig.version}
                        { "\n\nUpdate info\n\n" }
                        Build Version: {identifyCommit() || 'Unknown'}
                        { "\n" }
                        Latest Commit: {lcommit.loading ? "loading..." : (lcommit.error ? lcommit.error.message : JSON.stringify(lcommit.value))}
                        { "\n" }
                        Cloudflare Pages Build Status: {clBuild.loading ? "loading..." : (clBuild.error ? clBuild.error.message : JSON.stringify(clBuild.value))}
                        { "\n" }
                        shouldUpdate: {shouldDoTheUpdate.loading ? "loading..." : (shouldDoTheUpdate.error ? shouldDoTheUpdate.error.message : JSON.stringify(shouldDoTheUpdate.value))}
                        {"\n\nOther\n\n"}
                        Mode: {process.env.NODE_ENV}
                        { "\nStorage Contents: " }
                        {JSON.stringify(store.getState(), null, 1)}
                    </pre>
                </div>
            </Tab>
        </Tabs>
        <Center>
    </Center></div></>)
}
