import { Button } from 'react-bootstrap';
import { Page, currentPage } from '../../storage/page';
import { studentVueCredentials } from '../../storage/studentvue';

export function StudentID() {
    const stv = studentVueCredentials.value;

    return (
        <>
            <div>Working Progress</div>
            <div>Student Number: {stv.username}</div>
            <div>Make a barcode thingy</div>
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
