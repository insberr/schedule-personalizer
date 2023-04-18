import { Box, Collapse, List } from '@mui/material';
// import { Skeleton } from '@mui/material';
import ScheduleRow from './ScheduleRow';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Class } from '../../types';
import EventMessagesRow from './EventMessagesRow';
import ScheduleControls from './ScheduleControls';
import { useState } from 'react';

export default function ScheduleDisplay(props: {
    DisplayDate: Date;
    SetDisplayDate: (date: Date) => void;
    SPClassesForDisplay: Class[];
    DisplayEventMessages: string[];
}) {
    return (
        <>
            <Box className={'WholeDisplaySchedule'}>
                <List className={'ScheduleDisplay-List'}>
                    <ScheduleControls DisplayDate={props.DisplayDate} setDisplayDate={props.SetDisplayDate} />
                    <TransitionGroup>
                        {props.SPClassesForDisplay.map((SPClass, index) => (
                            <Collapse key={index}>
                                <ScheduleRow data={SPClass} key={index} alt={index % 2 == 1} DisplayDate={props.DisplayDate} />
                            </Collapse>
                        ))}
                    </TransitionGroup>

                    {props.DisplayEventMessages.length !== 0 && <EventMessagesRow messages={props.DisplayEventMessages} alt={false} />}
                </List>
            </Box>
        </>
    );
}
