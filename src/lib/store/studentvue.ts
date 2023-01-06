import { persistWritable } from "$lib/persistStore";
import type { StudentVueAPIData, StudentVueAPIDataUserDate} from "$lib/studentvue";
import { get } from "svelte/store";

export const studentVueSchedule = persistWritable<StudentVueAPIData | undefined>("stvSchedule", undefined)
export const studentInfo = persistWritable<StudentVueAPIDataUserDate | undefined>("stvStudentInfo", undefined)
export const isStudentvue = persistWritable<boolean>("isStudentvue", false)
export const studentVueCreds = persistWritable<{username: string, password: string}>("stvInfo", {username: "", password: ""})

let stvID: NodeJS.Timer | undefined

function updStv() {
    if (stvID) {
        clearInterval(stvID)
    }
    if (!get(isStudentvue)) {
        return;
    }
    stvID = setInterval(async () => {
        let creds = get(studentVueCreds);
        // piss
    }, 5*60*1000)
}

isStudentvue.subscribe(updStv);
studentVueCreds.subscribe(updStv);