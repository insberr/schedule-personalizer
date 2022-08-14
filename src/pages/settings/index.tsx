import Button from "react-bootstrap/Button";
import { clearV5Data } from '../../storageManager';



export function SettingsPage() {
    return (<div>
        <h1>Settings</h1>
        <Button href="/editor">Editor (Devs only)</Button>
        <br />
        <Button onClick={()=>{ clearV5Data(); location.reload() }}>Reset</Button>
        <br />
        <Button onClick={()=>{ forceReload() }}>Force Reload (For mobile)</Button>
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