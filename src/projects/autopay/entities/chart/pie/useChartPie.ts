import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip } from 'chart.js';

ChartJS.register(Tooltip, ArcElement, Legend);

export default function useChartPie() {
  const chartOptions: ChartOptions<'pie'> = {
    datasets: {
      pie: {
        borderWidth: 5
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return {
    chartOptions
  };
}
