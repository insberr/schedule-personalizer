import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { VscSettingsGear } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';

export function SettingsHeader(props: { toggleShow: (a: boolean) => void }) {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Schedule Personalizer V5</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <a onClick={() => { props.toggleShow(false) }}><VscSettingsGear className={"white-icon spin"}/></a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}