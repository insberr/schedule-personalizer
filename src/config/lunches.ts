import * as types from '../types/lunchesTypes';
import { teachers } from './teachers';

// maybe something like
export const lunches: types.LunchesType = [
    {
        basedOnPeriod: 3,
        lunches: [
            {
                lunch: 1,
                teachers: [
                    teachers.Officeclerk_Test
                ]
            },
            {
                lunch: 2,
                teachers: [
                ],
            },
            {
                lunch: 3,
                teachers: [
                ],
            }
        ]
    },
    {
        basedOnPeriod: 4,
        lunches: [
            {
                lunch: 1,
                teachers: [
                ],
            }
        ]
    }
]