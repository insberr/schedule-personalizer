import { Button } from "react-bootstrap"
import { useNavigate } from "../../router/hooks";
import { Page } from "../../storage/page";

export function BetaMap() {
    return (<>
        <Button onClick={() => { navigator(Page.SCHEDULE) }}>Back to schedule</Button>
        <div>Haha you thought the new map would actually be done? And the paths? Oh yeah those are causing me brain damage.</div>
        <div>Ive haven&apos;t been doing any of my homework because these paths ignored walls for the longest time.</div>
        <iframe src="https://astary.insberr.com/maptest/maptest" width="50%" height="400" frameBorder="0"></iframe>
    </>)
}