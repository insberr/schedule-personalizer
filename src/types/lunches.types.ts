

export type Lunch = {
    lunch: number
    teacherIDs: string[]
}

export type LunchesBasedOnPeriod = {
    basedOnPeriod: number
    lunches: Lunch[]
}

export type LunchesType = LunchesBasedOnPeriod[]