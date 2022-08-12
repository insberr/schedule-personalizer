import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Center from "../../../components/Center";
import { StageProps } from "../types";
import Button from "react-bootstrap/Button";
import { Stages } from "../types";
import { emptyCL, CL } from "../types";

type Props = StageProps & {
    setSchedule: (schedule: CL[]) => void
}

export function Stage0(props: Props) {
    return (
        <Center className="text-center"> 
            <h1>Setup</h1>
            <p>
                How would you like to setup your schedule?
            </p>
            <Container>
                <Row className="mb-3">
                    <Col />
                    <Col className="col-auto"><Button onClick={ () => {props.setStage(1)} } variant="primary">StudentVue</Button></Col>
                    <Col />
                </Row>
                <Row className="mb-3">
                    <Col />
                    <Col className="col-auto"><Button onClick={ () => {props.setSchedule(emptyCL(6)); props.setStage(69)} } variant="primary">Dont import</Button></Col>
                    <Col />
                </Row>
                <Row className="mb-3">
                    <Col />
                    <Col className="col-auto"><Button onClick={ () => {props.setStage(-1)} } variant="primary">Manually (cringe)</Button></Col>
                    <Col />
                </Row>
            </Container>
        </Center>
        )

}