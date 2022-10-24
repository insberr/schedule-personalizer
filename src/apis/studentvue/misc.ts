import { Teachers } from '../../config/teachers';
import { toTitleCase } from '../../lib/lib';
import * as api from './studentVueAPI';
// pain i hate promises
export async function getTeachers(username: string, password: string): Promise<Teachers> {
    const schoolInfo = await api.getSchoolInfo(username, password);
    const teachersList: Teachers = {};
    for (const teach of (
        schoolInfo as unknown as {
            code: string;
            content: { StaffLists: { StaffList: { Name: string; StaffGU: string }[] } };
        }
    ).content.StaffLists.StaffList) {
        teachersList[
            toTitleCase(teach.Name)
                .replace(/ |(, )|-/gi, '_')
                .replace(/[^a-z_]*/gi, '')
        ] = { id: teach.StaffGU };
    }

    return teachersList;
}
