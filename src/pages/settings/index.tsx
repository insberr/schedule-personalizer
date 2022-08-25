import Button from "react-bootstrap/Button";
import { resetStorage } from "../../storage/store";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../storage/store";
import { setRgbParty } from "../../storage/misc";
import { useKeyboardShortcut } from "../../hooks";
import { useStudentvue } from "../../storage/studentvue";
import { studentvueRefreshInterval, defaultCustomizations } from '../../config/settings'
import useSWR from 'swr'
import { getAllSchedules, getStudentInfo } from '../../studentVueAPI'
import {STVBoundery}from '../../components/STVBoundery'
import { Manual } from "../setup/steps/Manual";
import { useState } from "react";
import { Terms } from "../../types";
import { useSchedule } from "../../storage/schedule";
import Center from "../../components/Center";
import { Form } from "react-bootstrap";

export function SettingsPage(props: { setSchedule: (s: Terms) => void, setup: (s: boolean) => void }) {
    const sch = useSchedule();
    const stv = useStudentvue();
    const doRGBParty = useSelector((state: RootState) => state.misc.rgbParty)

    const [editManually, setEditManually] = useState(false);
    const dispatch = useDispatch()
    function swrCreate(t: string) {
        if (stv.isLoggedIn) {
            return [stv.username, stv.password, t]
        } else {
            return false
        }
    }
    const { mutate: mutateStudentInfo, isValidating: is1 } = useSWR(swrCreate('studentinfo'), getStudentInfo, { refreshInterval: studentvueRefreshInterval })
    const { mutate: mutateSchedule, isValidating: is2 } = useSWR<any | null, any>(swrCreate('schedule'), getAllSchedules, { refreshInterval: studentvueRefreshInterval })
    useKeyboardShortcut("shift + r + g + b", () => {
        dispatch(setRgbParty(!doRGBParty))
    })

    if (editManually) {
        console.log('editManually');
        return (<Manual setSchedule={props.setSchedule} isEdit={editManually} setIsEdit={setEditManually}></Manual>)
    }

    return (<Center>
        <h1>Settings</h1>
        <div>Probably want to add tabs for different kinds of settings. also styling is going to be fun</div>
        <Button href="/editor">Event Editor (Devs only)</Button>
        <br />
        <Button onClick={()=>{ props.setup(false); resetStorage(); location.reload(); }}>Reset</Button>
        <br />
        <Button onClick={()=>{ location.reload() }}>Reload</Button>
        <br />
        <STVBoundery>
            <Button onClick={()=>{
                mutateStudentInfo()
                mutateSchedule()
            }} disabled={is1||is2}> {is1||is2 ? "Loading..." : "Force StudentVue Data Refresh"}</Button>
        </STVBoundery>
        <br /><br />
        <Button className={ stv.isLoggedIn ? 'hidden' : '' } onClick={() => { console.log('set manually'); setEditManually(true) }}>Edit Schedule</Button>
        <br />
        <br />
        <div>
            <h3> Debug </h3>
            <pre className="paper">
                add debug info here
            </pre>
        </div>
        <div>
            <h3>Customizations</h3>
            <span>Schedule colors</span>
            <div className="hidden">
                { Object.entries(defaultCustomizations.theme.schedule.classColors).map((c, i) => {
                    return (<Form.Group key={i+"scheduleClassColors"} className='mb-3'>
                        <Form.FloatingLabel controlId={i+"scheduleClassColorsForm"} label="color customization">
                            <Form.Control value={c[1]} onChange={() => { console.log('something') }} placeholder={c[0].toString()} />
                        </Form.FloatingLabel>
                    </Form.Group>)
                }) }
            </div>
        </div>
        <div>Credits</div>
        <div>Jonah Matteson - Creator</div>
        <div>Wackery - Creator</div>
        <a href="https://github.com/insberr/schedule-personalizer">See the code on GitHub</a>
    </Center>)
}
