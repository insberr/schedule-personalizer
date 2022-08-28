import Button from "react-bootstrap/Button";
import { resetStorage } from "../../storage/store";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../storage/store";
import { setRgbParty } from "../../storage/misc";
import { useKeyboardShortcut } from "../../hooks";
import { useStudentvue } from "../../storage/studentvue";
import { Manual } from "../setup/steps/Manual";
import { useState } from "react";
import { Terms, ClassIDS, getTimeW, dateToTime } from "../../types";
// import { useSchedule } from "../../storage/schedule";
import Center from "../../components/Center";
import { Container,  ListGroup, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { setCurrentClassColor, setScheduleColor, useCustomizations, resetColors } from "../../storage/customizations";
import { ChromePicker } from 'react-color';
import ScheduleEntry from "../schedule/components/ScheduleEntry";

export function SettingsPage(props: { setSchedule: (s: Terms) => void, setup: (s: boolean) => void }) {
    // const sch = useSchedule();
    const stv = useStudentvue();
    const customizations = useCustomizations();

    const [colorPickers, setColorPickers] = useState<{ [key: string]: boolean }>({ });

    const doRGBParty = useSelector((state: RootState) => state.misc.rgbParty)

    const [tab, setTab] = useState('general');

    const [editManually, setEditManually] = useState(false);
    const dispatch = useDispatch()
    useKeyboardShortcut("shift + r + g + b", () => {
        dispatch(setRgbParty(!doRGBParty))
    })

    if (editManually) {
        return (<Manual setSchedule={props.setSchedule} isEdit={editManually} setIsEdit={setEditManually}></Manual>)
    }

    return (<><Center>
        <h1>Settings</h1>
        </Center>
        <Tabs
            id="settingsPageTabs"
            activeKey={tab}
            onSelect={(k) => setTab(k)}
            className="mb-3 crimsonTabs"
            fill>
            <Tab eventKey="general" title="General">
                <Center>
                    <h2>General</h2>
                    <Stack gap={4}>
                        <Button onClick={()=>{ props.setup(false); resetStorage(); location.reload(); }}>Reset</Button>
                        <Button onClick={()=>{ dispatch(resetColors()); setTimeout(() => { props.setup(false) }, 100); }}>Reset Custom Colors</Button>
                        <Button onClick={()=>{ location.reload() }}>Reload</Button>
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
                                    <Stack gap={2} direction="horizontal">
                                        <Button onClick={() => { setColorPickers({ ...colorPickers, [c[0]]: true }) } }>Pick Color</Button>
                                        <Button onClick={() => { dispatch(setScheduleColor({sch: c[0] as unknown as ClassIDS, color: { ...c[1], a: 0 } })) } }>Reset</Button>
                                    </Stack>
                                    
                                    { colorPickers[c[0]] ? <div style={{ 'position': 'absolute', 'zIndex': '2', 'overscrollBehavior': 'contain' }}>
                                        <div style={{ 'position': 'fixed', 'top': '0px', 'right': '0px', 'bottom': '0px', 'left': '0px' }}  onClick={() => { setColorPickers({ ...colorPickers, [c[0]]: false}) }}/>
                                        <ChromePicker color={(c[1] || {})} onChange={(color: any) => { dispatch(setScheduleColor({sch: parseInt(c[0]) as ClassIDS, color: { ...color.rgb, a: c[1].a === 0 ? 1 : color.rgb.a } })) }} />
                                    </div> : null }

                                    <Container style={{ width: "80vw", maxWidth: "900px" }}>
                                        <Row className="crow">
                                            <ScheduleEntry isForCustomizations={true} viewDate={new Date()} sch={[]} period={{ classID: parseInt(c[0]), period: 0, name: ClassIDS[parseInt(c[0])], room: '100', teacher: { name: 'Crabby', email: 'CrabbyPatty@school.edu', id: 'madeupid'}, startTime: getTimeW(0, 0), endTime: getTimeW(23, 59) }} mini={false} key={'scheduleColors'+c[0]+i} />
                                        </Row>
                                    </Container>
                                </Center>
                            </ListGroup.Item>)
                        }) }
                        <ListGroup.Item>
                            <Center>
                                <Stack gap={2} direction="horizontal">
                                    <Button onClick={() => { setColorPickers({ ...colorPickers, currentClass: true }) } }>Pick Color</Button>
                                    <Button onClick={() => { dispatch(setCurrentClassColor({ ...customizations.theme.colors.currentClass, a: 0 })) } }>Reset</Button>
                                </Stack>
                                { colorPickers.currentClass ? <div style={{ 'position': 'absolute', 'zIndex': '2' }}>
                                    <div style={{ 'position': 'fixed', 'top': '0px', 'right': '0px', 'bottom': '0px', 'left': '0px' }}  onClick={() => { setColorPickers({ ...colorPickers, currentClass: false }) }}/>
                                    <ChromePicker color={(customizations.theme.colors.currentClass || {})} onChange={(color: any) => { dispatch(setCurrentClassColor({ ...color.rgb, a: customizations.theme.colors.currentClass.a === 0 ? 1 : color.rgb.a })) }} />
                                </div> : null }
                                
                                <Container style={{ width: "80vw", maxWidth: "900px" }}>
                                    <Row className="crow">
                                        <ScheduleEntry isForCustomizations={true} viewDate={new Date()} sch={[]} period={{ classID: ClassIDS.Period, period: 1, name: 'Current Period', room: '100', teacher: { name: 'Crabby', email: 'CrabbyPatty@school.edu', id: 'currentClassColorOverride'}, startTime: getTimeW(0, 0), endTime: getTimeW(23, 59) }} mini={false} key={'scheduleColors'+customizations.theme.colors.currentClass} />
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
                    <pre className="paper">
                        add debug info here
                    </pre>
                </div>
            </Tab>
        </Tabs>
        <Center>
    </Center></>)
}
