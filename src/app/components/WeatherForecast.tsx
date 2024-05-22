import Image from "next/image";
import { useTemperature } from "@/app/context/TemperatureContext";
import { convertTemperature } from "@/app/utils/functions";

interface ForecastDay {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  description: string;
  icon: number;
}

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const weekday = date
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
  return `${weekday} ${day}`;
};

export default function WeatherForecast({ forecast }: WeatherForecastProps) {
  const { isCelsius } = useTemperature();

  const getIconUrl = (icon: number) => {
    return `https://developer.accuweather.com/sites/default/files/${String(
      icon
    ).padStart(2, "0")}-s.png`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-4 mx-4">
      {forecast.map((day) => (
        <div
          key={day.date}
          className="p-2 bg-forecast-gradient text-white rounded-md"
        >
          <p className="text-md font-bold text-left text-gray-300 mb-4">
            {formatDate(day.date)}
          </p>
          <Image
            width={40}
            height={40}
            src={getIconUrl(day.icon)}
            alt={day.description}
            className="mb-3"
          />
          <div className="flex justify-between items-end mb-4">
            <p className="text-xl font-bold text-primaryColor">
              {convertTemperature(day.maxTemperature, isCelsius).toFixed(0)}°
            </p>
            <p className="text-sm text-white font-bold">
              {convertTemperature(day.minTemperature, isCelsius).toFixed(0)}°
            </p>
          </div>
          <p className="text-white text-left text-xs">{day.description}</p>
        </div>
      ))}
    </div>
  );
}
