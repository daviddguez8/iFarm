import * as React from 'react';
import './Dashboard.css';
import { Button, FloatingLabel, Form, Row, Col, Container} from 'react-bootstrap';
import { logIn } from '../../backend/auth';
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../nav/SideNav';
import { ResponsiveBar } from '@nivo/bar';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BarChart2 from '../bar-chart/BarChart';
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
                          <BarChart2/>
                        </Row>
                        
                        
                    </Container>
                </Col>
                <Col className="sector-card">
                    <Container className="sector-stats">
                        <Row style={{color: 'white'}}>
                          Sector 2
                        </Row>
                        <Row>
                          <BarChart2></BarChart2>
                        </Row>                      
                    </Container>
                </Col>
                <Col className="sector-card">
                    <Container className="sector-stats">
                      <Row style={{color: 'white'}}>
                        Sector 3
                      </Row>
                      <Row>
                        <BarChart2></BarChart2>
                      </Row>                      
                    </Container>
                </Col>
                <Col className="sector-card">
                    <Container className="sector-stats">
                      <Row style={{color: 'white'}}>
                        Sector 3
                      </Row>
                      <Row>
                        <BarChart2></BarChart2>
                      </Row>   
                    </Container>
                </Col>
            </Row>
            <Row className="section-shipments">
                Shipments 
            </Row>
            
        </Container>
        
        </>
    )
}