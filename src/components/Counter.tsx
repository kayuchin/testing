import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Socket } from 'socket.io-client/build/esm/socket';
import CallNextMsg from '../interfaces/CallNextMsg';
import { BACKEND_URL } from '../pages/constant';

interface CounterProps {
    counterId: number;
    socket?: Socket;
}

type CallNextResult = number | undefined;

const Counter = ({ counterId, socket }: CounterProps) => {

    const [ isOnline, setIsOnline ] = useState<boolean>(true);
    const [ isServing, setIsServing ] = useState<boolean>(false);
    const [ msg, setMsg ] = useState<string>("");

    const toggleStatus = () => {
        if (isOnline === true) {
            if (isServing) return;
            socket?.emit("goOffline", counterId);
            setIsOnline(false);
        }
        else {
            socket?.emit("goOnline", counterId);
            setIsOnline(true);
        }
    };

    const completeCurrent = () => {
        if (!isOnline) return;

        if (!isServing) return;

        socket?.emit("completeCurrent", counterId);
        setIsServing(false);
    };

    const callNext = async () => {
        if (!isOnline) return;

        if (isServing) return;

        const result = await axios.get<CallNextResult>(`${BACKEND_URL}/api/call-next`);
        if (result.data) {
            const socketMsg: CallNextMsg = {
                counterId,
                curNum: result.data
            };
            socket?.emit("callNext", socketMsg);
            setIsServing(true);
            setMsg("");
        }
        else {
            setMsg("No tickets in the waiting queue")
        }
    };

    return (
        <Card>
            <Card.Header>Counter { counterId }</Card.Header>
            <Card.Body>
                <Row className='btnSpace'>
                    <Button size='sm' onClick={ () => { toggleStatus() } }> {( isOnline ? "Go Offline" : "Go Online" )} </Button>
                </Row>
                <Row className='btnSpace'>
                    <Button size='sm' onClick={ () => { completeCurrent() } }>Complete</Button>
                </Row>
                <Row className='btnSpace'>
                    <Button size='sm' onClick={ () => { callNext() } }>Call Next</Button>
                </Row>
            </Card.Body>
            <Card.Footer>{ msg }</Card.Footer>
        </Card>
    )
};

export default Counter;