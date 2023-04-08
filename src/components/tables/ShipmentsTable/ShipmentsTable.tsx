import * as React from 'react';
import { Container, Table } from 'react-bootstrap';
import {useState, useEffect } from 'react';
import { fetchInventory } from '../../../backend/inventory';
import './ShipmentsTable.css';
import { fetchShipments } from '../../../backend/shipments';

export default function ShipmentsTable(props: any) {
  const [shipmentsData, setShipmentsData] = useState<any[][]>([]);

  useEffect(() => {
    fetchShipments().then((response) => {
      setShipmentsData(response);
    })
  },[]);
  
  return (
    <Table hover style={{color:'white', overflowX: 'auto'}}>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Destination</th>
          <th>ETA</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody style={{overflowX: 'auto'}}>
        <>
        {shipmentsData.map((item,index) => {
          return (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
          </tr>
          )
          
        })}
        </>
        
      </tbody>
    </Table>
  )
}