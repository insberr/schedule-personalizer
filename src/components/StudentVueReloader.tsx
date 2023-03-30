import useSWR from 'swr';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSch, enableSTV, setInfo, disableSTV } from '../storage/studentvueData';
import {
    getAllSchedules,
    convertStudentvueDataToTerms,
    getStudentInfo,
    getAllGradesFromGradeBook_Legacy,
    formatStudentVueGradebookToStorage,
} from '../apis/studentvue/studentVueAPI';
import { setGotSchedules, useStudentvue } from '../storage/studentvue';
import { setTerms } from '../storage/schedule';
import { studentvueRefreshInterval } from '../config/settings';
import { setGrades } from '../storage/studentVueGrades';

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

    const { data: gradesData, error: gradesError } = useSWR(
        swrCreate('grades'),
        ([username, password, info]) => getAllGradesFromGradeBook_Legacy(username, password, 'API call from studentvue reloader | ' + info),
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
        if (gradesData !== undefined) {
            dispatch(setGrades(formatStudentVueGradebookToStorage(gradesData)));
        }
        if (gradesError) {
            // do nothing i guess
        }
    }, [gradesData, gradesError, dispatch]);

    useEffect(() => {
        if (studentData === undefined && scheduleData === undefined && gradesData === undefined)
            return console.log('Studentvue Refresh: Student, Schedule, And Grades Data Are Undefined');
        console.log('Studentvue Refresh: Student Data', studentData);
        console.log('Studentvue Refresh: Schedule Data', scheduleData);
        console.log('Studentvue Refresh: Grades Data', gradesData);
    }, [studentData, scheduleData, gradesData]);

    if (studentError || scheduleError || gradesError) {
        console.error(studentError, scheduleError, gradesError);
        return <></>;
    }

    return <></>;
}
