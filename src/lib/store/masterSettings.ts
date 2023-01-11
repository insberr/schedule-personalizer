import { persistWritable } from '$lib/persistStore';
import type { MasterSettings } from '$types';
//@ts-ignore;
export const masterSettings = persistWritable<MasterSettings>(
    'masterSettings',
    undefined
);
export const lastMasterSettings = persistWritable<number>(
    'lastMasterSettings',
    0
);
export const schoolName = persistWritable<string>('schoolName', '');
