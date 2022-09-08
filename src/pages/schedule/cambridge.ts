// implement
// I havent a clue how cambridge schedules wore

// For now

import * as config from '../../config/settings';
import { CL } from '../../types';

export function translateCambridgeClassesToCLList__TEMPORARYYYYY__(classes: CL[]): CL[] {
    const newClasses = classes.map((cl) => {
        if (config.cambridgePeriods.includes(cl.period)) {
            return {
                ...cl,
                period: config.cambridgePeriods.indexOf(cl.period)
            }
        }
        return cl;
    });

    console.log(newClasses);
    return newClasses;
}