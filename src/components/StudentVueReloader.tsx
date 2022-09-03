import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setSch, enableSTV, setInfo, disableSTV } from '../storage/studentvueData'
import { getAllSchedules, StudentVueAPIData, convertStudentvueDataToTerms, getStudentInfo } from '../apis/studentvue/studentVueAPI'
import {setGotSchedules, useStudentvue} from '../storage/studentvue'
import {setTerms} from '../storage/schedule'
import {studentvueRefreshInterval} from '../config/settings';


export function StudentVueReloader() {
    const stv = useStudentvue()
    function swrCreate(t: string) {
        if (stv.isLoggedIn) {
            return [stv.username, stv.password, t]
        } else {
            return false
        }
    }
    const { data: studentData, error: studentError } = useSWR(swrCreate('studentinfo'), getStudentInfo, { revalidateOnFocus: false, refreshInterval: studentvueRefreshInterval })
    const { data: scheduleData, error: scheduleError } = useSWR(swrCreate('schedule'), getAllSchedules, { revalidateOnFocus: false, refreshInterval: studentvueRefreshInterval })
    const dispatch = useDispatch()
    useEffect(() => {
        if (scheduleData) {
            dispatch(setSch(scheduleData));
            dispatch(setTerms(convertStudentvueDataToTerms(scheduleData)))
            dispatch(enableSTV())
            dispatch(setGotSchedules(true))
        }
        if (scheduleError) {
            dispatch(setGotSchedules(false))
            dispatch(disableSTV())
        }
    },[scheduleData, scheduleError])
    useEffect(() => {
        if (studentData != undefined) {
            dispatch(setInfo(studentData));
            dispatch(enableSTV());
        }
        if (studentError) {
            dispatch(disableSTV());
        }
    },[studentData, studentError])
    useEffect(() => {
        console.log("student data", studentData)
        console.log("schedule data", scheduleData)
    }, [studentData, scheduleData])

    if (studentError || scheduleError) { 
        console.error(studentError, scheduleError)
        return <></>;
    }

    

    return <></>
}
