import Button from "react-bootstrap/Button";
import { resetStorage } from "../../storage/store";
import useKeyboardJs from 'react-use/lib/useKeyboardJs';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../storage/store";
import { setRgbParty } from "../../storage/misc";
import { useEffect } from "react";
import { useKeyboardShortcut } from "../../hooks";

export function SettingsPage(props: { setup: (s: boolean) => void }) {
    const doRGBParty = useSelector((state: RootState) => state.misc.rgbParty)
    const dispatch = useDispatch()
    useKeyboardShortcut("shift + r + g + b", () => {
        dispatch(setRgbParty(!doRGBParty))
    })
    return (<div>
        <h1>Settings</h1>
        <Button href="/editor">Editor (Devs only)</Button>
        <br />
        <Button onClick={()=>{ props.setup(false); resetStorage() }}>Reset</Button>
        <br />
        <Button onClick={()=>{ location.reload() }}>Reload</Button>
        <br />
        <br />
        <div>
            <h3> Debug </h3>
            <div>add debug stuff here</div>
        </div>
        <div>Credits</div>
        <div>Jonah Matteson - Creator</div>
        <div>Wackery - Creator</div>
    </div>)
}
