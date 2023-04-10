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

export interface BarChartProps {
  data: [number, number, number, number]
}
export default function BarChart(props: BarChartProps) {
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
            text: 'Sector #',
            },
        },
    };
    
    
    const labels = ['Humidity', 'Health', 'Volume', 'Harvest'];
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: props.data,
          borderColor: 'rgb(77, 199, 251)',
          backgroundColor: 'rgba(0, 179, 255, 0.5)',
        },
      ]
    };
    
    return (
        <Bar options={options} data={data} />
    );
};