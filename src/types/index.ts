// types go here, or in other files and exported here.

export enum ClassIDS {
    Zero,
    Arrival,
    Advisory,
    Lunch,
    Period,
    Assembly,
    Passing,
    Dismissal,
    NoSchool,
    Weekend,
    Summer,
    Custom,
}

export * from './time';
export * from './schedule';
export * from './customizations';
export * from './router';
export * from './studentvue';

