import * as React from 'react';
import { Container, Table, Col, Button, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { fetchInventory } from '../../../backend/inventory';
import './TasksTable.css';
import { fetchTasks, markDone, Task } from '../../../backend/tasks';

export default function TasksTable() {
    const [tasksData, setTasksData] = useState<Task[]>([]);

    useEffect(() => {
        updateTasks();
    }, []);

    const updateTasks = () => {
        fetchTasks().then((response: Task[]) => {
            setTasksData(response);
        })
    }

    const handleDoneClick = (index: number) => {
        const taskClicked = tasksData[index];
        console.log(`Task ${taskClicked.uid} clicked!`);
        markDone(taskClicked.uid)
            .then(()=> {updateTasks()});
    }

    return (
        <>
            <Container><h5>TODO</h5></Container>
            <hr className="title-hr"></hr>
            {tasksData?.map((item, index) => {
                return (
                    <Container key={index} className="mb-1 task">
                        <Col md={7}>
                            {item['description']}
                        </Col>
                        <Col>
                            <Button onClick={() => handleDoneClick(index)} size="lg" style={{ marginRight: "1.2rem" }} variant="outline-success"></Button>
                            <Button size="lg" variant="outline-danger"></Button>
                        </Col>
                    </Container>
                )
            })
            }
        </>
    );
}