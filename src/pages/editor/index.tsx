import { useEffect, useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import Center from '../../components/Center';
// Somehow translate to mui
// import Form from 'react-bootstrap/Form';
// import { Col, Row } from 'react-bootstrap';

import { DateEditor } from './DateEditor';
import { ScheduleEditor } from './ScheduleEditor';
import { scheduleEvents, ScheduleEvents, ScheduleEvent, DateRange } from '../../config/events';
import { SchedulesType, schedules } from '../../config/schedules';
import stringifyObject from 'stringify-object';
import { format } from 'date-fns';

import { today } from '../../today';

import './editor.scss';
import { currentPage, Page } from '../../storage/page';
export default function EditorApp() {
    // const [events, setEvents] = useState<ScheduleEvents>(scheduleEvents)
    const [date, setDate] = useState<Date | DateRange>(today());
    const [schedule, setSchedule] = useState<SchedulesType | null>(schedules.normal);
    const [message, setMessage] = useState<string>('');
    // const [time, setTime] = useState<Date | string>(today())
    const [resultEvent, setResultEvent] = useState<ScheduleEvent>({
        schedule: schedule,
        info: {
            message: message,
            date: date,
        },
    });
    const [newEvents, setNewEvents] = useState<ScheduleEvents>(scheduleEvents);

    const [selectedEvent, setSelectedEvent] = useState<number>(0);

    // somehow display the object as a string (not JSON.stringify because that makes it not copy pasteable into the events.ts file)
    useEffect(() => {
        setResultEvent({
            schedule: schedule,
            info: {
                message: message,
                date: date,
            },
        });
    }, [date, schedule, message]);

    function createNewEvents() {
        if (resultEvent.schedule === undefined) return;

        let evenNewerEvents;

        // Prevent adding a duplicate of the same event
        if (
            newEvents.filter((evt) => {
                const evtStartDate = (evt.info.date as DateRange)?.start || evt.info.date;
                const rstStartDate = (resultEvent.info.date as DateRange)?.start || resultEvent.info.date;
                return evt.info.message === resultEvent.info.message && evtStartDate.getTime() === rstStartDate.getTime();
            }).length > 0
        ) {
            evenNewerEvents = [...newEvents];
        } else {
            evenNewerEvents = [...newEvents, resultEvent];
        }

        // Sorts the events by start date, it looks nicer
        evenNewerEvents.sort((e, pe) => {
            if (e.info === undefined || pe.info === undefined) return 1;

            const eStartDate = (e.info.date as DateRange)?.start || e.info.date;
            const peStartDate = (pe.info.date as DateRange)?.start || pe.info.date;
            return eStartDate.getTime() - peStartDate.getTime();
        });

        setNewEvents(evenNewerEvents);

        setMessage('');
        setSchedule(schedules.normal);
    }

    function stringifyThings(resultF: ScheduleEvent | ScheduleEvents): string {
        return stringifyObject(resultF, {
            indent: '  ',
            singleQuotes: true,
            transform: (object, property, originalResult) => {
                if (property === 'schedule') {
                    const obj = object as ScheduleEvent;
                    // console.log((object as ScheduleEvent)[property])
                    if (obj.schedule === null) return 'null';
                    for (const [i, sc] of Object.entries(schedules)) {
                        if (obj.schedule === sc) return `schedules.${i}`;
                    }
                    return 'schedules.broken';
                }

                if (property === 'date') {
                    type Info = { message: string; date: Date | DateRange };
                    const obj = object as Info;
                    if ((obj.date as DateRange)?.start) {
                        return `{\n      start: new Date('${format((obj.date as DateRange)?.start, 'MMMM d, yyyy')}'),\n      end: new Date('${format(
                            (obj.date as DateRange)?.end,
                            'MMMM d, yyyy'
                        )}')\n    }`;
                    }
                    return `new Date('${format(obj.date as Date, 'MMMM d, yyyy')}')`;
                }

                return originalResult;
            },
        });
    }

    function removeEvent(index: number) {
        const newerEvents = [...newEvents];
        newerEvents.splice(index, 1);
        setNewEvents(newerEvents);
    }

    return (
        <Center>
            <h1>Schedule Editor</h1>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <DateEditor setDate={setDate} date={date} />
                    </Col>
                    <Col>
                        <ScheduleEditor setSchedule={setSchedule} schedule={schedule} />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Stack gap={4} className="mx-auto">
                            <Form.Group>
                                <Form.Label htmlFor="inputEventMessage">Event Message</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputEventMessage"
                                    value={message}
                                    placeholder="Event Message"
                                    onInput={(e) => setMessage(e.currentTarget.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="selectEvent">Select Existing Event</Form.Label>
                                <Form.Select
                                    onChange={(n) => {
                                        setSelectedEvent(parseInt(n.target.value));
                                    }}
                                    id="selectEvent"
                                    aria-label="Select Event To Edit/Remove"
                                >
                                    <option>Select Event</option>
                                    {newEvents.map((evt, i) => {
                                        return (
                                            <option key={'event' + i} value={i}>
                                                {format((evt.info.date as DateRange)?.start || evt.info.date, 'MMMM d, yyyy') +
                                                    ' - ' +
                                                    evt.info.message}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Stack>
                    </Col>
                    <Col>
                        <Stack gap={2} className="col-md-5 mx-auto">
                            <Button
                                variant="outline-danger"
                                onClick={() => {
                                    removeEvent(selectedEvent);
                                }}
                            >
                                Remove Event
                            </Button>

                            <Button
                                onClick={() => {
                                    setSchedule(newEvents[selectedEvent].schedule);
                                    setDate(newEvents[selectedEvent].info.date);
                                    setMessage(newEvents[selectedEvent].info.message);

                                    removeEvent(selectedEvent);
                                }}
                            >
                                Edit Event
                            </Button>

                            <Button
                                onClick={() => {
                                    createNewEvents();
                                }}
                            >
                                Add new event
                            </Button>
                        </Stack>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h2> Output Event </h2>
                        <pre style={{ textAlign: 'left' }} className="paper">
                            {stringifyThings(resultEvent)}
                        </pre>
                    </Col>
                    <Col>
                        <h2> Output Events </h2>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(stringifyThings(newEvents));
                            }}
                        >
                            Copy to clipboard
                        </Button>
                        <pre style={{ textAlign: 'left' }} className="paper">
                            {stringifyThings(newEvents)}
                        </pre>
                    </Col>
                    <Button href="#" onClick={() => (currentPage.value = Page.SCHEDULE)}>
                        Back to schedule
                    </Button>
                </Row>
            </Container>
        </Center>
    );
}
