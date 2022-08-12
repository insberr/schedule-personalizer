import { useEffect, useState } from "react"
import { ScheduleFile } from "./types"
import _schedule from "../schedule.json"
import Center from "../components/Center"
import { DateEditor } from "./DateEditor"
import { ScheduleEditor } from "./ScheduleEditor"
export function EditorApp() {
    const [sch, setSch] = useState<ScheduleFile>(_schedule) // loads the schedule from the json file by default
    return (<Center><h1>Schedule Editor</h1>
                <div className="mb-2 mt-3"><DateEditor /></div>
                <div><ScheduleEditor /></div>
                <br /> <br />
                <h2> Output </h2>
                <div className="paper">{JSON.stringify(sch)}</div> 
                </Center>)
}
