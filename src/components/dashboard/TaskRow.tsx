import * as React from 'react';
import { Container, Col, Button } from 'react-bootstrap';

export interface TaskProps {
    title: string
}

export default function TaskRow(props: TaskProps) {
    return (
        <>
        <Container className="mb-3" style={{display:'flex', flexDirection:'row', alignItems: 'center', padding:'0px'}}>
            <Col md={7}>
                {props.title}
            </Col>
            <Col>
                <Button style={{marginRight:"0.5rem"}} variant="outline-success"></Button>
                <Button variant="outline-danger"></Button>
            </Col>
            
        </Container>
        </>
    );
}