import * as React from 'react';
import { Container, Table, Col, Button, Row, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { fetchInventory } from '../../../backend/inventory';
import './TasksTable.css';
import { fetchTasks, markDone, Task, deleteTask, addTask } from '../../../backend/tasks';

export default function TasksTable() {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleAddButtonClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleAcceptClick = () => {
        if (inputValue !== '') {
            addTask(inputValue).then(() => {
                updateTasks();
            });
        }

        setShowInput(false);
        setInputValue('');
        updateTasks();
    };

    //Tasks code
    const [tasksData, setTasksData] = useState<Task[]>([]);

    useEffect(() => {
        updateTasks();
    }, []);

    const updateTasks = () => {
        fetchTasks(setTasksData);
    }

    const handleDoneClick = (index: number) => {
        const taskClicked = tasksData[index];
        console.log(`Task ${taskClicked.uid} clicked!`);
        markDone(taskClicked.uid)
            .then(() => { updateTasks() });
    }

    const handleRemoveClick = (index: number) => {
        const taskClicked = tasksData[index];
        deleteTask(taskClicked.uid)
            .then(() => { updateTasks() });

    }

    return (
        <>
            <Container>
                <Col>
                    <h5>TODO</h5>
                </Col>
                <Col>
                    {showInput ? (
                        <Form>
                            <Form.Control
                                className="add-task-input"
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <Button size="sm" variant="outline-info" onClick={handleAcceptClick}>
                                Accept
                            </Button>
                        </Form>
                    ) : (
                        <Button size="sm"variant="outline-info" onClick={handleAddButtonClick}>
                            Add
                        </Button>
                    )}
                </Col>

            </Container>
            <hr className="title-hr"></hr>

            {tasksData?.map((item, index) => {
                return (
                    <Container key={index} className="mb-1 task">
                        <Col md={7}>
                            {item['description']}
                        </Col>
                        <Col>
                            <Button onClick={() => handleDoneClick(index)} size="lg" style={{ marginRight: "1.2rem" }} variant="outline-success"></Button>
                            <Button onClick={() => handleRemoveClick(index)} size="lg" variant="outline-danger"></Button>
                        </Col>
                    </Container>
                )
            })
            }
        </>
    );
}