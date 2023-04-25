// Prompt the user to add to home screen if not already a PWA
import { Button } from '@mui/material';
import Center from '../../../components/Center';
import { SetupSteps } from '..';

const iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

export function AddToHomeScreen(props: { setStage: (s: number) => void }) {
    return (
        <Center className="text-center full-center">
            <h1 className="mt-5">Add Site To Home Screen</h1>
            <div className="mt-4">It works best when used as the app! It even works offline!</div>
            <div className="mt-3" style={{ color: 'crimson' }}>
                To add Schedule Personalizer to your homescreen, first
                {iOS ? ' open it in Safari, then ' : ''}
                <br />
                click the share button and click &apos;Add To Homescreen&apos;.
            </div>
            <br />
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                    props.setStage(SetupSteps.Features);
                }}
            >
                Skip
            </Button>
        </Center>
    );
}
