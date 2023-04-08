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
                <Button size="lg" style={{marginRight:"1.2rem"}} variant="outline-success"></Button>
                <Button size="lg"variant="outline-danger"></Button>
            </Col>
        </Container>
        </>
    );
}