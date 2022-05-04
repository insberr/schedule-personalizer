import { Stdata } from "./types";

export const defaultStruct: Stdata = {
    studentVue: {
        stayLoggedIn: true,
        username: "",
        password: "",
    },
    terms: [],
    customizations: {
        theme: {
            colors: {
                currentClass: "#00bcd4",
                zeroHour: "#ff9800",
                lunch: "#ff9800",
                normalClass: "#4caf50",
                dismissal: "#f44336",
                arrival: "#4caf50",
                background: "#fafafa",
            },
        },
        showInfoOnSchedule: true,
    }
}