import React from 'react';
import styles from './statchart.css';
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

interface IProps {
  timesData: {data: number, now: boolean}[];
}

export function StatChart({ timesData }: IProps) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
    datasets: [
      {
        data: timesData.map((el) => el.data),
        backgroundColor: timesData.map((el) => el.now ? 'rgba(220, 62, 34, 1)' : 'rgba(234, 138, 121, 1)'),
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        ticks: {
          color: timesData.map((el) => el.now ? '#DC3E22' : '#333'),
          font: { size: 24 as const }
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        position: 'right' as const,
        ticks: {
          color: '#333' as const,
          font: { size: 14 as const },
          stepSize: 25,
          callback: (val: number | string): string => {
            const hours = Math.floor(Number(val) / 60);
            const minutes = Math.floor(Number(val) % 60);
            return `${hours > 0 ? `${hours} ч ` : ''}${minutes} мин`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className={styles.chart}>
      <Bar options={options} data={data} />
    </div>
  );
}
