// Just rewrite it all pain.

export type StudentVueAPIDataClassListsTermClass = {
    CourseTitle: string;
    Period: string;
    RoomName: string;
    Teacher: string;
    TeacherEmail: string;
    TeacherStaffGU: string;
};

export type StudentVueAPIDataClassListsTerm = StudentVueAPIDataClassListsTermClass[] | StudentVueAPIDataClassListsTermClass;
export type StudentVueAPIDataClassLists = StudentVueAPIDataClassListsTerm[];
export type StudentVueAPIData = {
    code: string;
    content: {
        code?: string;
        error?: string;
        ClassLists: StudentVueAPIDataClassLists;
        ConcurrentSchoolStudentClassSchedules: Record<string, unknown>; // find waht this should be
        ErrorMessage: string;
        IncludeAdditionalStaffWhenEmailingTeachers: 'true';
        TermIndex: string;
        TermIndexName: 'Trimester 1';
        TermLists: {
            TermListing: unknown[];
        };
    };
};

export type StudentVueAPIDataUserDate = {
    code: string;
    content: {
        code?: string;
        error?: string;
        BirthDate: string;
        CounselorEmail: string;
        CounselorName: string;
        CounselorStaffGU: string;
        CurrentSchool: string;
        EMail: string;
        FormattedName: string;
        Grade: string;
        PermID: string;
    };
};

