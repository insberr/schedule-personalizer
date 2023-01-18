import { ClassIDS } from '$types';

export function nameFromClass(cls: ClassIDS): string {
    return {
        [ClassIDS.Zero]: 'Zero Hour',
        [ClassIDS.Arrival]: 'Arrival',
        [ClassIDS.Advisory]: 'Advisory',
        [ClassIDS.NoSchool]: 'No School',
        [ClassIDS.Dismissal]: 'Dismissal',
        [ClassIDS.Assembly]: 'Assembly',
        [ClassIDS.Weekend]: 'Weekend',
        [ClassIDS.Summer]: 'Summer',
        [ClassIDS.Passing]: 'Passing',
        [ClassIDS.Lunch]: 'Lunch',
        [ClassIDS.Period]: 'Period',
        [ClassIDS.Custom]: 'Custom',
    }[cls];
}
