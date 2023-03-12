import * as React from 'react';
import './Dashboard.css';
import { FloatingLabel, Form, Row, Col, Container} from 'react-bootstrap';
import { logIn } from '../../backend/auth';
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../nav/SideNav';
import { ResponsiveBar } from '@nivo/bar';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';
import ShipmentRow from './ShipmentRow';
import TaskRow from './TaskRow';
import ShipmentsTable from './ShipmentsTable';

export default function Dashboard() {
    const tempData = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

    return (
        <>
        <Container className="main-content">
            <Row className="section-fields">
                <Col className="sector-card">
                    <Container className="sector-stats">
                        <Row style={{color: 'white'}}>Sector 1</Row>
                        <Row>
                          <BarChart/>
                        </Row>
                        
                        
                    </Container>
                </Col>
                <Col className="sector-card">
                    <Container className="sector-stats">
                        <Row style={{color: 'white'}}>
                          Sector 2
                        </Row>
                        <Row>
                          <BarChart/>
                        </Row>                      
                    </Container>
                </Col>
                <Col className="sector-card">
                    <Container className="sector-stats">
                      <Row style={{color: 'white'}}>
                        Sector 3
                      </Row>
                      <Row>
                        <BarChart/>
                      </Row>                      
                    </Container>
                </Col>
                <Col className="sector-card">
                    <Container className="sector-stats">
                      <Row style={{color: 'white'}}>
                        Sector 4
                      </Row>
                      <Row>
                        <BarChart/>
                      </Row>   
                    </Container>
                </Col>
            </Row>
            <Row className="section-bottom">
                <Col md={3} className="section-inventory">
                  <Row className="inventory-card-container">
                    <Container className="inventory-card">
                      <Row className="inventory-chart-container">
                        <PieChart></PieChart>
                      </Row>

                      <Row className="inventory-list-container">
                        <Row className="inventory-item">
                          Package 1
                        </Row>
                        <Row className="inventory-item">
                          Package 3
                        </Row>
                        <Row className="inventory-item">
                          Package 4
                        </Row>
                        <Row className="inventory-item">
                          Package 5
                        </Row>
                        <Row className="inventory-item">
                          Package 6
                        </Row>
                      </Row>

                    </Container>
                  </Row>
                </Col>
                <Col md={6} className="section-shipments">
                  <Container className="shipments-card">
                    <ShipmentsTable></ShipmentsTable>
                    {

                      /*
                      <ShipmentRow customer="Customer" destination="Destination" eta="ETA" profit={0} paymentStatus="status"/>
                    <ShipmentRow customer="Walmart" destination="Salt Lake City, UT" eta="2 days" profit={3500.43} paymentStatus="fulfilled"/>
                    <ShipmentRow customer="Target" destination="Los Angeles, CS" eta="3 days" profit={1004.20} paymentStatus="not paid"/>
                    <ShipmentRow customer="Albertson's" destination="El Paso, TX" eta="3 days" profit={340.92} paymentStatus="paid"/>
                 
                      */
                    }
                  </Container>
                </Col>

                <Col md={3} className="section-tasks">
                  <Container className="tasks-card">
                    <TaskRow title="Task"/>
                    <TaskRow title="Harvest sector 2"/>
                    <TaskRow title="Water sector 1"/>
                    <TaskRow title="Ship package 3"/>
                    <TaskRow title="Walk around field"/>
                    <TaskRow title="Do dr. mejia's hw"/>
                  </Container>
                </Col>
            </Row>
            
        </Container>
        </>
    )
}