import * as React from 'react';
import './AppLayout.css';
import { Button, FloatingLabel, Form, Row, Col, Container} from 'react-bootstrap';
import { logIn } from '../../backend/auth';
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../nav/SideNav';

import Dashboard from '../screens/Dashboard';

export default function AppLayout() {

    const selectedClassNames = ['navbar-button', 'mb-1', 'selected'];
    const unselectedClassNames = ['navbar-button', 'mb-1'];
    
    const [dasbhoardClassNames, setDashboardClassNames] = React.useState(['navbar-button', 'mb-1', 'selected']);
    const [fieldClassNames, setFieldClassNames] = React.useState(['navbar-button', 'mb-1']);
    const [inventoryClassNames, setInventoryClassNames] = React.useState(['navbar-button', 'mb-1']);
    const [shipmentsClassNames, setShipmentsClassNames] = React.useState(['navbar-button', 'mb-1']);
    const [earningsClassNames, setEarningsClassNames] = React.useState(['navbar-button', 'mb-1']);

    const [currentScreen, setCurrentScreen] = React.useState(0);

    const content = React.useRef(NavBar);
    
    const classNamesSetters = [
        setDashboardClassNames,
        setFieldClassNames,
        setInventoryClassNames,
        setShipmentsClassNames,
        setEarningsClassNames
    ]

    const screenNames = [
        'dashboard',
        'field',
        'inventory',
        'shipments',
        'earnings'
    ]

    const sectionChange = (e: React.MouseEvent, selection: number) => {
        console.log('unsetting: ' + currentScreen);
        classNamesSetters[currentScreen](unselectedClassNames)
        console.log('setting: ' + selection);
        classNamesSetters[selection](selectedClassNames);
        setCurrentScreen(selection);
    }

    return (
        <Container fluid className="main">
            <Col md={2} className="my-navbar">
                

                <div className="mb-5">
                    <img src="src\assets\logo.png"></img>
                </div>

                <Row className="navbar-btns-container">
                    <Row id="dashboard" className={dasbhoardClassNames.join(' ')} onClick={(e)=> {sectionChange(e, 0)}}>
                        <Col md={4} className="material-icons">
                                dashboard
                        </Col>
                        <Col>
                            <div style={{height:'100%'}}>
                                Dashboard
                            </div>
                            
                        </Col>
                    </Row>

                    <Row id="field" className={fieldClassNames.join(' ')} onClick={(e)=>{sectionChange(e, 1)}}>
                        <Col md={4} className="material-symbols-outlined">
                                agriculture
                        </Col>
                        <Col>
                            Field
                        </Col>
                    </Row>
                    
                    <Row id="invetory" className={inventoryClassNames.join(' ')} onClick={(e)=> {sectionChange(e, 2)}}>
                        <Col md={4} className="material-icons-outlined">
                                warehouse
                        </Col>
                        <Col>
                            Inventory
                        </Col>
                    </Row>


                    <Row id="shipments" className={shipmentsClassNames.join(' ')} onClick={(e)=> {sectionChange(e, 3)}}>
                        <Col md={4} className="material-icons-outlined">
                                local_shipping
                        </Col>
                        <Col>
                            Shipments
                        </Col>
                    </Row>

                    <Row id="earnings" className={earningsClassNames.join(' ')} onClick={(e)=> {sectionChange(e, 4)}}>
                        <Col md={4} className="material-icons-outlined">
                                paid
                        </Col>
                        <Col>
                            Earnings
                        </Col>
                    </Row>

                </Row>
                
                
                
            </Col>
            
            <Col>
                <Row className="topbar" style={{margin: 0}}>
                    <Col>
                        Sign out
                    </Col>
                    <Col>
                    Help
                    </Col>
                </Row>

                <Row className="content" style={{margin: 0, padding: 5}}>
                    <div>
                        {currentScreen == 0 && <Dashboard></Dashboard>}
                        {currentScreen == 1 && <div>field</div>}
                        {currentScreen == 2 && <div>inventory</div>}
                        {currentScreen == 3 && <div>shipments</div>}
                        {currentScreen == 4 && <div>earnings</div>}

                    </div>
                </Row>
            </Col>
        </Container>
        
    );
}