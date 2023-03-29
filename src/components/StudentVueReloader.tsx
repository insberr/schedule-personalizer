import useSWR from 'swr';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSch, enableSTV, setInfo, disableSTV } from '../storage/studentvueData';
import { getAllSchedules, convertStudentvueDataToTerms, getStudentInfo } from '../apis/studentvue/studentVueAPI';
import { setGotSchedules, useStudentvue } from '../storage/studentvue';
import { setTerms } from '../storage/schedule';
import { studentvueRefreshInterval } from '../config/settings';

export default function StudentVueReloader() {
    const dispatch = useDispatch();
    const stv = useStudentvue();

    function swrCreate(t: string) {
        if (stv.isLoggedIn) {
            return [stv.username, stv.password, t];
        } else {
            return false;
        }
    }

    const { data: studentData, error: studentError } = useSWR(
        swrCreate('studentinfo'),
        ([username, password]) => getStudentInfo(username, password),
        {
            revalidateOnFocus: false,
            refreshInterval: studentvueRefreshInterval,
        }
    );

    const { data: scheduleData, error: scheduleError } = useSWR(
        swrCreate('schedule'),
        ([username, password]) => getAllSchedules(username, password),
        {
            revalidateOnFocus: false,
            refreshInterval: studentvueRefreshInterval,
        }
    );

    useEffect(() => {
        if (scheduleData) {
            dispatch(setSch(scheduleData));
            dispatch(setTerms(convertStudentvueDataToTerms(scheduleData)));
            dispatch(enableSTV());
            dispatch(setGotSchedules(true));
        }
        if (scheduleError) {
            dispatch(setGotSchedules(false));
            dispatch(disableSTV());
        }
    }, [scheduleData, scheduleError, dispatch]);

    useEffect(() => {
        if (studentData != undefined) {
            dispatch(setInfo(studentData));
            dispatch(enableSTV());
        }
        if (studentError) {
            dispatch(disableSTV());
        }
    }, [studentData, studentError, dispatch]);

    useEffect(() => {
        if (studentData === undefined && scheduleData === undefined) return console.log('Studentvue Refresh: Student And Schedule Data Undefined');
        console.log('Studentvue Refresh: Student Data', studentData);
        console.log('Studentvue Refresh: Schedule Data', scheduleData);
    }, [studentData, scheduleData]);

    if (studentError || scheduleError) {
        console.error(studentError, scheduleError);
        return <></>;
    }

    return <></>;
}
