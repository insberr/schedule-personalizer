import { Button } from 'react-bootstrap';
import { Page, currentPage } from '../../storage/page';
import { studentVueStudentData } from '../../storage/studentvueData';

export function SchoolInfo() {
    const stv = studentVueStudentData.value;
    return (
        <>
            <div>Working Progress</div>
            <div>
                You Go To <strong>{stv.school}</strong>
            </div>
            <Button
                onClick={() => {
                    // navigate(Page.SCHEDULE);
                    currentPage.value = Page.SCHEDULE;
                }}
            >
                Back to schedule
            </Button>
        </>
    );
}
