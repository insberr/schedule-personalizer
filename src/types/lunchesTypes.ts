import * as teachersConfig from '../config/teachers';
import { ClassIDS } from '../types';

export type Lunch = {
    lunch: number;
    teachers: teachersConfig.Teacher[];
};

export type LunchesBasedOnPeriod = {
    forOveride?: boolean;
    basedOnPeriod: number;
    basedOnPeriodID?: ClassIDS;
    id?: string;
    lunches: Lunch[];
};

export type LunchesOnTerms = {
    [key: number]: LunchesBasedOnPeriod[];
};

export type LunchesType = LunchesOnTerms;
