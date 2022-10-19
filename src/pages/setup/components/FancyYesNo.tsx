import { useSpring, useSpringRef, animated, config, useTransition, useChain } from '@react-spring/web';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export function FancyQuestion(props: { question: string; onYes: () => void; onNo: () => void }): JSX.Element {
    const login = useSpringRef();
    const loginWithStudentvue = useSpring({
        ref: login,
        from: { y: '-50%', opacity: 0 },
        to: { y: '0%', opacity: 1 },
        config: config.stiff,
    });
    const tranapi = useSpringRef();
    const trans = useTransition([0, 1, 2], {
        ref: tranapi,
        trail: 400 / 3,
        from: { y: '50%', opacity: 0 },
        enter: { y: '0%', opacity: 1 },
        leave: { y: '50%', opacity: 0 },
        config: config.stiff,
    });
    useChain([login, tranapi], [0, 0.5]);
    return (
        <Container className="full-center text-center">
            <Row>
                {' '}
                <Col>
                    {' '}
                    <animated.div style={loginWithStudentvue}>
                        {' '}
                        <h2> {props.question} </h2>{' '}
                    </animated.div>{' '}
                </Col>{' '}
            </Row>
            <Row>
                {' '}
                <Col />{' '}
                {trans((style, item) => {
                    console.log(item);
                    return [
                        <animated.div key="yay" className="col-2">
                            {' '}
                            <Button variant="primary"> Yes </Button>{' '}
                        </animated.div>,
                        <animated.div key="sep" className="col-1" />,
                        <animated.div key="nay" className="col-2">
                            {' '}
                            <Button variant="primary"> No </Button>{' '}
                        </animated.div>,
                    ][item];
                })}{' '}
                <Col />{' '}
            </Row>
        </Container>
    );
}
//# sourceMappingURL=FancyYesNo.d.ts.map
