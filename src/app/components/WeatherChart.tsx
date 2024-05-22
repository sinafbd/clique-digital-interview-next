import React from "react";
import CustomLineChart from "./CustomLineChart";
import { useTemperature } from "@/app/context/TemperatureContext";
import { convertTemperature } from "@/app/utils/functions";

interface ChartData {
  time: string;
  temperature: number;
}

interface WeatherChartProps {
  data: ChartData[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const { isCelsius } = useTemperature();

  const chartData = data.map((d) => ({
    ...d,
    temperature: convertTemperature(d.temperature, isCelsius),
  }));

  return (
    <div className="mx-6">
      <CustomLineChart data={chartData} />
    </div>
  );
};

export default WeatherChart;
