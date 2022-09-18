// prompt user to add to home screen if not already a pwa
import Button from 'react-bootstrap/Button';
import Center from '../../../components/Center';

const iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

export function AddToHomeScreen(props: { setStage: (s: number) => void }) {
    return (<Center className="text-center full-center">
        <h1 className='mt-5'>Add Site To Home Screen</h1>
        <div className='mt-5'>Schedule Personalizer is not being viewed from app : {'('}</div>
        <div className='mt-2'>It works best when used as the app! It even works offline!</div>
        <div className="mt-3" style={{'color':'crimson'}}>To add Schedule Personalizer to your homescreen, first{ iOS ? ' open it in Safari, then ' : '' }<br/>click the share button and click &apos;Add To Homescreen&apos;.</div>
        <div className="mt-1">Its that easy!</div>
        <br/><Button variant='crimson' onClick={() => {props.setStage(420)}}>skip</Button> {/* Make this appear after a second or so to encourage people to use it as an app */}
    </Center>)
}
