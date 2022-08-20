import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { VscSettingsGear } from 'react-icons/vsc'
import Center from "../../../components/Center";
export function SchHeader(props: { setup: (s: boolean) => void, centerbuttons: JSX.Element[] }) {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Schedule Personalizer V5</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end" >
            <span style={{"marginRight":"2em"}}>
              {props.centerbuttons}
            </span>
            <a onClick={() => { props.setup(true) }}><VscSettingsGear className={"white-icon"}/></a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}