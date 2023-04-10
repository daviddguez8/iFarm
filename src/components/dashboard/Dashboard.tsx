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
import { fetchMapData } from '../../backend/fieldMap';


export interface SectorStats {
  name: string,
  stats: [number, number, number, number]
}

export default function Dashboard() {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [mapStats, setMapStats] = useState<SectorStats[]>([]);

  useEffect(() => {
    fetchInventory().then((response) => {
      setInventoryData(response);
    });

    fetchMapData().then((response) => {
      const stats: SectorStats[] = response.map((sector) => {
        return {
          name: sector.name,
          stats: [sector.humidity, sector.health, sector.volume, sector.harvest]
        }
      });
      setMapStats(stats);
    });

  }, []);

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
          {mapStats.map((sector, index) => {
            return (
              <Col className="sector-card" key={index}>
                <Container className="sector-stats">
                  <Row style={{ color: 'white' }}>{sector['name']}</Row>
                  <Row>
                    <BarChart data={sector.stats} />
                  </Row>
                </Container>
              </Col>
            )
          })}
          
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
              <ShipmentsTable></ShipmentsTable>
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