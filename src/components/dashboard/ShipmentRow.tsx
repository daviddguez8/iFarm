import * as React from 'react';
import { Button, FloatingLabel, Form, Row, Col, Container} from 'react-bootstrap';

export interface RowProps {
    customer: string,
    destination: string,
    eta: string,
    profit: number,
    paymentStatus: string
}

export default function ShipmentRow(props: RowProps) {
    return (
        <Container className="mb-4" style={{display:'flex', flexDirection:'row'}}>
            <Col>
                {props.customer}
            </Col>
            <Col>
                {props.destination}
            </Col>
            <Col>
                {props.eta}
            </Col>
            <Col>
                ${props.profit}
            </Col>
            <Col>
                {props.paymentStatus}
            </Col>
            </Container>
    );
}