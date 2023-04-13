import { useState } from 'react';

import { Box, Button, Collapse, List } from '@mui/material';
import { Skeleton } from '@mui/material';
import ScheduleRow from './ScheduleRow';
import TransitionGroup from 'react-transition-group/TransitionGroup';

export default function Schedule2() {
    const [classesForDisplay, setCl] = useState([
        { name: 'Class 1', teacher: 'Teacher 1', room: 'Room 1', start: '8:00', end: '8:45' },
        { name: 'Class 2', teacher: 'Teacher 2', room: 'Room 2', start: '8:50', end: '9:35' },
        { name: 'Class 3', teacher: 'Teacher 3', room: 'Room 3', start: '9:40', end: '10:25' },
    ]);

    return (
        <>
            <Box sx={{ mt: 1 }}>
                <List>
                    <TransitionGroup>
                        {classesForDisplay.map((c, index) => (
                            <Collapse key={index}>
                                <ScheduleRow data={c} key={index} alt={index % 2 == 1} />
                            </Collapse>
                        ))}
                        <div>
                            <strong>message</strong>
                        </div>
                    </TransitionGroup>
                </List>
            </Box>
            <Button
                onClick={() => {
                    const newCl = [...classesForDisplay, { name: 'Class 4', teacher: 'Teacher 4', room: 'Room 4', start: '10:30', end: '11:15' }];
                    setCl(newCl);
                }}
            >
                Test
            </Button>
        </>
    );
}
