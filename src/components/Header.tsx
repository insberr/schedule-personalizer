import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { VscSettingsGear } from 'react-icons/vsc'
export function Header(props: { setup: (s: boolean) => void, c: boolean }) {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Schedule Personalizer V5</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <a onClick={() => { props.setup(!props.c) }}><VscSettingsGear className={"white-icon " + (props.c ? "spin" : "")}/></a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}