import { Skeleton } from '@mui/material';

function LoadSpinner() {
    // return <Spinner animation="grow" className="full-center-spinner text-crimson" />;
    return (
        <div>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </div>
    );
}

export default LoadSpinner;
