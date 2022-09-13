import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { VscSettingsGear } from 'react-icons/vsc';
import { useNavigate } from '../../router/hooks';
import { Page } from '../../storage/page';

export function SettingsHeader(props: { toggleShow: (a: boolean) => void }) {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Schedule Personalizer V5</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <a onClick={() => { navigate(Page.SCHEDULE) }}><VscSettingsGear className={"white-icon spin"}/></a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}