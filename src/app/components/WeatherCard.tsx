import { useTemperature } from "../context/TemperatureContext";
import { convertTemperature } from "../utils/functions";

interface WeatherCardProps {
  location: string;
  temperature: number; // assuming this is in Celsius by default
  description: string;
}

export default function WeatherCard({
  location,
  temperature,
  description,
}: WeatherCardProps) {
  const { isCelsius, toggleUnit } = useTemperature();

  return (
    <div className="flex flex-col items-center p-4 text-white rounded-md">
      <div className="flex flex-row">
        <div className="mr-4">
          <h2 className="text-xl capitalize font-bold mb-4">{location}</h2>
          <div className="flex justify-between mb-2">
            <p className="flex items-center text-left text-5xl text-primaryColor">
              {convertTemperature(temperature, isCelsius).toFixed(0)}°
            </p>
            <div className="flex flex-col justify-center space-y-2">
              <button
                className={`px-2 py-1 rounded ${
                  isCelsius
                    ? "bg-primaryColor text-white"
                    : "bg-gray-700 text-white"
                }`}
                onClick={() => toggleUnit(true)}
              >
                C
              </button>
              <button
                className={`px-2 py-1 rounded ${
                  !isCelsius
                    ? "bg-primaryColor text-white"
                    : "bg-gray-700 text-white"
                }`}
                onClick={() => toggleUnit(false)}
              >
                F
              </button>
            </div>
          </div>
          <p className="mb-4 text-sm">{`${new Date().toLocaleDateString(
            "en-US",
            {
              weekday: "long",
            }
          )}, ${description}`}</p>
        </div>
      </div>
    </div>
  );
}
