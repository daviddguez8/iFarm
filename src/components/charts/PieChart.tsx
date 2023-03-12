import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const labels = ['Potato', 'Corn', 'Carrot', 'Apples'];
    const data = {
        labels: labels,
        datasets: [
          {
            label: '# of Votes',
            data: labels.map(() => Math.floor(Math.random() * (10 - 0 + 1))),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right' as const
        }
      },
      maintainAspectRatio: false,
    };
      
    return (
        <Pie options={options} data={data} />
    );
}
