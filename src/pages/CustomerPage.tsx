import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';

// react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// custom component
import CustomerCounter from "../components/CustomerCounter";
import NumBoard from "../components/NumBoard";

import { BACKEND_URL } from './constant';
import CallNextMsg from '../interfaces/CallNextMsg';
import CounterStatusProps from '../interfaces/CounterStatusProps';

const CustomerPage = () => {

    const ids = [1, 2, 3, 4];
    const initCounters: CounterStatusProps[] = [
        {counterId: 1, curNum: 0, isOnline: true, isServing: false},
        {counterId: 2, curNum: 0, isOnline: true, isServing: false},
        {counterId: 3, curNum: 0, isOnline: true, isServing: false},
        {counterId: 4, curNum: 0, isOnline: true, isServing: false},
    ];

    const [ socket, setSocket ] = useState<Socket|null>(null);
    const [ curNum, setCurNum ] = useState<number>(0);
    const [ lastNum, setLastNum ] = useState<number>(0);
    const [ counters, setCounters ] = useState<CounterStatusProps[]>(initCounters);

    useEffect(() => {

        // Socket IO connection
        const newSocket = io(`${BACKEND_URL}?user=customer`);
        newSocket.on("callNext", callNext);
        newSocket.on("completeCurrent", completeCurrent);
        newSocket.on("goOffline", goOffline);
        newSocket.on("goOnline", goOnline);
        setSocket(newSocket);

    }, []);
 
    const getTicket = async () => {
        const result = await axios.get<number>(`${BACKEND_URL}/api/get-ticket`);
        setLastNum(result.data);
    };

    const callNext = (msg: CallNextMsg) => {
        const newCounters = [...counters];
        newCounters.forEach(c => {
            if (c.counterId === msg.counterId) {
                c.curNum = msg.curNum;
                c.isServing = true;
            }
        });
        setCurNum(msg.curNum);
        setCounters(newCounters);
    };

    const completeCurrent = (id: number) => {
        const newCounters = [...counters];
        newCounters.forEach(c => {
            if (c.counterId === id) {
                c.isServing = false;
            }
        });
        setCounters(newCounters);
    };

    const goOffline = (id: number) => {
        const newCounters = [...counters];
        newCounters.forEach(c => {
            if (c.counterId === id) {
                c.isOnline = false;
            }
        });
        setCounters(newCounters);
    };

    const goOnline = (id: number) => {
        const newCounters = [...counters];
        newCounters.forEach(c => {
            if (c.counterId === id) {
                c.isOnline = true;
            }
        });
        setCounters(newCounters);
    };

    return (
        <div className='App'>
            <Card>
                <Card.Header>Counter Customer View</Card.Header>
                <Card.Body>
                    <NumBoard curNum={ curNum } lastNum={ lastNum }/>
                    <Button variant='success' onClick={ () => { getTicket() } }>Take a number</Button>
                </Card.Body>
            </Card>
            <br/><br/>
            <Row md='4'>
                {
                    ids.map((id, i) => (
                        <Col>
                            <CustomerCounter key={id} { ...counters[i] }  />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
};

export default CustomerPage;