import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { VscSettingsGear } from 'react-icons/vsc'
import Center from "../../../components/Center";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useId, useState} from 'react'
import { Map } from "./Map/Map"
export function SchHeader(props: { setup: (s: boolean) => void, centerbuttons: JSX.Element[] }) {
  const id = useId();
  const [map, setMap] = useState(false)
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Schedule Personalizer V5</Navbar.Brand>
          <NavDropdown className="text-muted" title="Info" id={id+"nav"}>
            <NavDropdown.Item onClick={()=>{setMap(!map)}}>Map</NavDropdown.Item>
          </NavDropdown>
          <Navbar.Collapse className="justify-content-end" >
            <span style={{"marginRight":"2em"}}>
              {props.centerbuttons}
            </span>
            <a onClick={() => { props.setup(true) }}><VscSettingsGear className={"white-icon"}/></a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Map show={map} close={()=>{setMap(false)}}/>
      </>
  )
}
