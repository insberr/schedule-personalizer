import { parse } from "date-fns"
import { useState } from "react"
import sch from "../data/schedule_data/schedule"

export function EditorApp() {
    const [s, ref] = useState<number>(0)
    return (<div>Crimge, use editor.set{ "(" }mm-dd-yyyy, any jsonable obj{")"} to edit the schedule. {"("}until we get a proper editor{")"} <br />
    <button className="btn btn-primary" onClick={ () => { ref(s+1) } }>Refresh displayer</button>
    <pre>{ JSON.stringify(sch.DBG_db,null,4) }</pre>
    </div> )
}
(window as any).editor = {
    sch,
    set: (date: string, data:any) => {
        const pdate = parse(date, "mm-dd-yyyy", new Date());
        sch.setSchedule(pdate, data)
    }
} // cring