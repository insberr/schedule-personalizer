import { Teachers } from '../../config/teachers'
import * as api from './studentVueAPI'

export function getTeachers(username: string, password: string): Teachers {
    const schoolInfo = api.getSchoolInfo(username, password);
    const teachersList: Teachers = {};

    for (const teach of (schoolInfo as unknown as { code: string, content: { StaffLists: { StaffList: { Name: string, StaffGU: string }[] }}}).content.StaffLists.StaffList) {
        teachersList[
            toTitleCase(teach.Name).replace(/ |(, )|-/gi, "_").replace(/[^a-z_]*/gi, "")
        ] = { id: teach.StaffGU };
    }

    return teachersList;
}