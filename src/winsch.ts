import {ScheduleEvents, scheduleEvents} from "./config/events"
import "./types";
/*declare global {
    interface Window {
        sch: ScheduleEvents;
    }
}*/
window.sch = scheduleEvents;

// this file should be fetched and eval;ed whenever we need to update

// download latest  index.html -> parse -> get getElementById("winsch").href -> fetch -> eval