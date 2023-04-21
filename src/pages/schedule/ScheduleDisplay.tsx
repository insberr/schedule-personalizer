import { Box, Collapse, List } from '@mui/material';
// import { Skeleton } from '@mui/material';
import ScheduleRow from './ScheduleRow';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Class } from '../../types';
import EventMessagesRow from './EventMessagesRow';
import ScheduleControls from './ScheduleControls';

export default function ScheduleDisplay(props: { SPClassesForDisplay: Class[]; DisplayEventMessages: string[] }) {
    return (
        <>
            <Box className={'WholeDisplaySchedule'}>
                <List className={'ScheduleDisplay-List'}>
                    <ScheduleControls />
                    <TransitionGroup className={'ScheduleCollapseWrapper'}>
                        {props.SPClassesForDisplay.map((SPClass, index) => (
                            <Collapse key={index} className={'ScheduleCollapse'}>
                                <ScheduleRow data={SPClass} key={index} alt={index % 2 == 1} />
                            </Collapse>
                        ))}
                    </TransitionGroup>

                    {props.DisplayEventMessages.length !== 0 && <EventMessagesRow messages={props.DisplayEventMessages} alt={false} />}
                </List>
            </Box>
        </>
    );
}

