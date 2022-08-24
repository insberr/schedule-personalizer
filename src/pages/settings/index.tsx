import Button from "react-bootstrap/Button";
import { resetStorage } from "../../storage/store";
import useKeyboardJs from 'react-use/lib/useKeyboardJs';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../storage/store";
import { setRgbParty } from "../../storage/misc";
import { useEffect } from "react";
import { useKeyboardShortcut } from "../../hooks";
import { refreshStudentVueSchedules } from "../../lib";
import { useStudentvue, setLastRefresh } from "../../storage/studentvue";
import { setTerms } from "../../storage/schedule";
import { Terms } from "../../types";
import {studentvueRefreshInterval} from '../../config/settings'
import useSWR from 'swr'
import { getAllSchedules, getStudentInfo } from '../../studentVueAPI'
import {STVBoundery}from '../../components/STVBoundery'

export function SettingsPage(props: { setup: (s: boolean) => void }) {
    const stv = useStudentvue();
    const doRGBParty = useSelector((state: RootState) => state.misc.rgbParty)
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
    return (<div>
        <h1>Settings</h1>
        <Button href="/editor">Editor (Devs only)</Button>
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
        <Button onClick={() => { console.log('do something') }}>Edit Schedule - For Manually Entered Schedules - NOT IMPLEMENTED PLEASE IMPLEMENT</Button>
        <br />
        <br />
        <div>
            <h3> Debug </h3>
            <div>add debug stuff here</div>
        </div>
        <div>Credits</div>
        <div>Jonah Matteson - Creator</div>
        <div>Wackery - Creator</div>
        <div>link to code on github .. need to add itr</div>
    </div>)
}
