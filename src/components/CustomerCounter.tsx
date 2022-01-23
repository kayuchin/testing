import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import CounterStatusProps from '../interfaces/CounterStatusProps';
import Dot from './Dot';

const CustomerCounter = ({ counterId, curNum, isServing, isOnline }: CounterStatusProps) => {
    return (
        <Card style={isOnline ? {} : {pointerEvents: "none", opacity: "0.6"}}>
            <Card.Header>
                Counter { counterId } 
                {
                    isOnline ?
                        isServing ? <Dot color='red'></Dot> : <Dot color='green'></Dot>
                        : <Dot color='grey'></Dot>
                }
            </Card.Header>
            <Card.Body>{ isOnline ? curNum : "Offline" }</Card.Body>
        </Card>
    );
};

export default CustomerCounter;