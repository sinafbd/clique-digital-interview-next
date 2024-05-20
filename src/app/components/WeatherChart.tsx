import { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { useTemperature } from "../context/TemperatureContext";
import { convertTemperature } from "../utils/functions";

interface ChartData {
  time: string;
  temperature: number;
}

interface WeatherChartProps {
  data: ChartData[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const { isCelsius } = useTemperature();

  const chartData = {
    labels: data.map((d) => d.time.slice(0, -3)),
    datasets: [
      {
        label: undefined,
        data: data.map((d) => convertTemperature(d.temperature, isCelsius)),
        borderColor: "#F48403",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Evolution",
        color: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mx-4">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeatherChart;
