import { Button } from "react-bootstrap"
import { useNavigate } from "../../router/hooks";
import { Page } from "../../storage/page";

export function BetaMap() {
    const navigate = useNavigate();
    
    return (<>
        <h2> Beta Stuff You Can Try</h2>
        <Button onClick={() => { navigate(Page.SCHEDULE) }}>Back to schedule</Button>
        <div>Haha you thought the new map would actually be done? And the paths? Oh yeah those are causing me brain damage.</div>
        <div>Ive haven&apos;t been doing any of my homework because these paths ignored walls for the longest time.</div>
    </>)
}