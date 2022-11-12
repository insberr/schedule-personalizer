// Main config

/* import settings type */
export enum GradeBookAPI {
    StudentVue,
}

const settings = {
    /* Global Config */

    // Sentry Error Reporting - Sentry.io DSN if you want to use it
    sentryDSN: 'https://a5ab5a1946bd4e31a06ca456fc5b30fc@o1233680.ingest.sentry.io/6382608',

    // If all the schools use the same gradebook system. if not you can configure them seperately in the schools value
    gradeBookAPI: {
        useApi: GradeBookAPI.StudentVue,
        apiURL: 'https://wa-beth-psv.edupoint.com/Service/PXPCommunication.asmx',
    },

    startDate: new Date('September 6, 2022'),
    endDate: new Date('June 23, 2023'),

    // Schools
    schools: {
        // folder name
        bethel_high_school: {
            /* various config for the school */
            name: 'Bethel High School',
            hasMap: true,
        },
    },
};

export default settings;
