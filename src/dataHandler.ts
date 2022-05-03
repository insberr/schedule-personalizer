import { Stdata } from "./types";


// get data from local storage
//export const data: Stdata  | { noData: true } = JSON.parse(localStorage.getItem("scheduleData") || JSON.stringify({ noData: true }))

export function getSavedData(): Stdata | undefined {
    const data = localStorage.getItem("scheduleData")
    if (!data) {
        // check for and migrate v1 data
        return undefined
    }
    return JSON.parse(data)
}

export function saveData(data: Stdata) {
    localStorage.setItem("scheduleData", JSON.stringify(data))
}
// translate it to the new format if its from v1

// update schedules from studentvue if its been long enough

// when data is changed, save it to local storage