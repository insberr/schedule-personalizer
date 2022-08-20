import Button from "react-bootstrap/Button";
import { resetStorage } from "../../storage/store";

export function SettingsPage(props: { setup: (s: boolean) => void }) {
    return (<div>
        <h1>Settings</h1>
        <Button href="/editor">Editor (Devs only)</Button>
        <br />
        <Button onClick={()=>{ props.setup(false); resetStorage() }}>Reset</Button>
        <br />
        <Button onClick={()=>{ location.reload() }}>Reload</Button>
        <br />
        <br />
        <div>Credits To:</div>
        <div>- Jonah Matteson The Creator of This Amazing Website</div>
        <div>- Wackery For Helping With This Amazing Website</div>
    </div>)
}
