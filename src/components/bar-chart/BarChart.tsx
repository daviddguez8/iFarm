import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function BarChart2() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
    
    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
            borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
            display: false
            },
            title: {
            display: false,
            text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };
    
    
    const labels = ['Humidity', 'Health', 'Volume', 'Harvest'];
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => Math.floor(Math.random() * (10 - 0 + 1))),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ]
    };
    
    return (
        <Bar options={options} data={data} />
    );
};