import { getTimeW_Input12Hour } from '../types';

// School start and end times
export const schoolStartTime = getTimeW_Input12Hour(7, 45);
export const schoolStartTime_1HourLate = getTimeW_Input12Hour(8, 45);
export const schoolEndTime = getTimeW_Input12Hour(2, 15, true);
export const schoolEndTime_EarlyDismissal = getTimeW_Input12Hour(10, 15);

