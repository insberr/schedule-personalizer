const weekend: any[] = []; // these should be CL[] probably
const normal: any[] = [];
const adv: any[] = [];

function lunch(period: number, teachers: any) {
    return (schedule: any) => {
        // die
    };
}

export const config = {
    terms: [], // Terms object
    defaults: {
        schedule: {
            matchtype: 'DOW',
            sun: weekend,
            mon: normal,
            tue: adv,
            wed: normal,
            thu: adv,
            fri: normal,
            sat: weekend,
        },
        overrides: [lunch(3, ['teacher1', 'teacher2'])],
        message: '',
    },
    schedules: [
        {
            for: new Date('05-17-2023'),
            schedule: adv,
        },
    ],
};
