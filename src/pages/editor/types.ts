export type ScheduleFile = {
    dates: {
        [key: string]: string; // date in ms (with 0:00 time) -> key for schedule array
    };
    schedules: {
        [key: string]: {
            //schedule goes here
        };
    };
};
