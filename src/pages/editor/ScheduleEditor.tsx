import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { SchedulesType, schedules } from '../../config/schedules';

type Props = {
    setSchedule: (schedule: SchedulesType | null) => void;
    schedule: SchedulesType | null;
};

export function ScheduleEditor(props: Props) {
    // console.log("ScheduleEditor.tsx props: " + JSON.stringify(props))

    return (
        <div>
            <h2>Schedule Editor</h2>
            <Stack gap={2} className="col-md-5 mx-auto">
                {Object.keys(schedules).map((k, i) => {
                    return (
                        <Button
                            key={i}
                            onClick={() => {
                                props.setSchedule(schedules[k]);
                            }}
                        >
                            {schedules[k].name}
                        </Button>
                    );
                })}
                <Button
                    key={'nullSchedule'}
                    onClick={() => {
                        props.setSchedule(null);
                    }}
                >
                    {'null (not a bug)'}
                </Button>
            </Stack>

            <div>
                <h4> Custom Schedule </h4>
                <span>add later, probably a thing where you add to a list</span>
            </div>
        </div>
    );
}
