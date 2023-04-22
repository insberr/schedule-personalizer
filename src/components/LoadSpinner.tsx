import { Skeleton } from '@mui/material';

function LoadSpinner() {
    // return <Spinner animation="grow" className="full-center-spinner text-crimson" />;
    return (
        <div>
            NO MORE LOADING SPINNER
            <Skeleton variant="rectangular" width={210} height={118} />
        </div>
    );
}

export default LoadSpinner;
