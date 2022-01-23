import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// react-bootstrap
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// custom component
import Counter from "../components/Counter";

const CounterPage = () => {

    const [ socket, setSocket ] = useState<Socket>();

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:5000?user=counter`);
        setSocket(newSocket);
    }, []);

    return (
        <div className='App'>
            <Card>
                <Card.Header>Counter Manager View</Card.Header>
            </Card>
            <br/><br/>
            <Row md='4'>
                {
                    [ 1, 2, 3, 4 ].map((id) => (
                        <Col><Counter key={id} counterId={id} socket={ socket } /></Col>
                    ))
                }
            </Row>
        </div>
    );
};

export default CounterPage;