import * as teachersConfig from '../config/teachers';

export type Lunch = {
    lunch: number
    teachers: teachersConfig.Teacher[]
}

export type LunchesBasedOnPeriod = {
    basedOnPeriod: number
    lunches: Lunch[]
}

export type LunchesType = LunchesBasedOnPeriod[]