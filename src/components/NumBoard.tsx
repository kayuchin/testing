import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface BoardProps {
    curNum: number;
    lastNum: number;
}

const NumBoard = ({ curNum, lastNum }: BoardProps) => {
    return (
        <Container>
            <Row>
                <Col>Now Serving: </Col>
                <Col>{ curNum }</Col>
            </Row>
            <Row>
                <Col>Last Number: </Col>
                <Col>{ lastNum }</Col>
            </Row>
        </Container>
    );
};

export default NumBoard;