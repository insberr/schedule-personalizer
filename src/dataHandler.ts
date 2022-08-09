import { Stdata } from "./types";
import { defaultStruct } from "./defaultValues";
import { fetchData } from "./studentvue";

// get data from local storage
//export const data: Stdata  | { noData: true } = JSON.parse(localStorage.getItem("scheduleData") || JSON.stringify({ noData: true }))

export function getSavedData(callback: (out: Stdata | undefined) => void) {
    getSavedDataAsync().then(callback);
}

export async function getSavedDataAsync(): Promise<Stdata | undefined> {
    const data = localStorage.getItem("scheduleData")
    if (!data) {
        // check for and migrate v1 data
        const v1data_v3 = localStorage.getItem("data-v3");
        const v1data_v2 = localStorage.getItem("data-v2");
        if (v1data_v3 !== null) {
            // migrate and return
            const parsed_v3 = JSON.parse(v1data_v3);
            const migrated = Object.assign({}, defaultStruct) // copy the default struct
            if (parsed_v3.password && parsed_v3.username) {
                const fetchedNewData = await fetchData(parsed_v3.username, parsed_v3.password)
                fetchedNewData.studentVue.stayLoggedIn = parsed_v3.rememberMe;
                saveData(fetchedNewData);
                return fetchedNewData;
                // fetch that shit
            }
            // if its not logged into studentvue ... 
            // suggest that they log in, if yes pull info from studentVue, if no, migrate from data (pain)

            // migrate  classes
            // migrate teachers
            // migrate rooms

        }
        return undefined
    }
    return JSON.parse(data)
}

export function saveData(data: Stdata) {
    localStorage.setItem("scheduleData", JSON.stringify(data))
}

export function clearData() {
    localStorage.removeItem("scheduleData")
}

// translate it to the new format if its from v1

// update schedules from studentvue if its been long enough

// when data is changed, save it to local storage
