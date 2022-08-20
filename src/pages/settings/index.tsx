import Button from "react-bootstrap/Button";
import { resetStorage } from "../../storage/store";

export function SettingsPage(props: { setup: (s: boolean) => void }) {
    return (<div>
        <h1>Settings</h1>
        <Button href="/editor">Editor (Devs only)</Button>
        <br />
        <Button onClick={()=>{ props.setup(false); resetStorage() }}>Reset</Button>
        <br />
        <Button onClick={()=>{ forceReload() }}>Force Reload (For mobile)</Button>
        <br />
        <br />
        <div>Credits To:</div>
        <div>- Jonah Matteson The Creator of This Amazing Website</div>
        <div>- Wackery For Helping With This Amazing Website</div>
    </div>)
}

function forceReload() {
    // what kind of fucking black magic is this?
    // thanks stack overflow https://stackoverflow.com/a/66250207
    const form = document.createElement('form');
    form.method = "GET";
    form.action = location.href;
    document.body.appendChild(form);
    form.submit();
}