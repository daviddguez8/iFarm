import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import { fetchInventory, InventoryItem } from '../../backend/inventory';
import { fetchShipments } from '../../backend/shipments';
import ShipmentsTable from '../tables/ShipmentsTable/ShipmentsTable';
import TasksTable from '../tables/TasksTable/TasksTable';

export default function Dashboard() {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [shipmentsData, setShipmentsData] = useState<any[][]>([]);
  
  useEffect(() => {
    fetchInventory().then((response) => {
      setInventoryData(response);
    });

    fetchShipments().then((response) => {
      setShipmentsData(response);
    })
  },[]);

  const calculateContents = () => {
    const totals = inventoryData.reduce(
      (totals: any, pkg) => {
        Object.entries(pkg.contents).forEach(([crop, weight]) => {
          if (totals[crop]) {
            totals[crop] += weight;
          } else {
            totals[crop] = weight;
          }
          
        });
        return totals;
      },
      {}
    );

    return totals;
  }

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
                      <PieChart data={calculateContents()}></PieChart>
                    </Row>

                    <Row className="inventory-list-container">
                      {inventoryData.map((item, index) => (
                        <Row key={index} className="inventory-item">
                          {item['description']} | {item['entryDate']}
                        </Row>
                      ))}
                    </Row>

                  </Container>
                </Row>
              </Col>
              <Col md={6} className="section-shipments">
                <Container className="shipments-card">
                  <ShipmentsTable data={shipmentsData}></ShipmentsTable>
                </Container>
              </Col>

              <Col md={3} className="section-tasks">
                <Container className="tasks-card">
                  <TasksTable></TasksTable>                  
                </Container>
              </Col>
          </Row>
          
      </Container>
      </>
  )
}