import { Calendar as C } from 'react-big-calendar'
import {dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import en from "date-fns/locale/en-US";

const locales = {
    enUS: en
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
export function Calendar(props: any) {
    return (<C localizer={localizer} {...props} />)
}