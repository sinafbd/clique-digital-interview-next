"use client";

import { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/WeatherForecast";
import { getCityWeather } from "./utils/api";
import WeatherChart from "./components/WeatherChart";

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  dailyEvolution: { time: string; temperature: number }[];
  forecast: {
    date: string;
    minTemperature: number;
    maxTemperature: number;
    description: string;
    icon: number;
  }[];
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCityWeather(city);
      setWeatherData(data);
    } catch (error) {
      setError("Could not fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <section>
        <div className="flex bg-secondaryBg p-4 content-center">
          <h1 className="text-2xl text-white">React Weather</h1>
        </div>
        <WeatherForm onSearch={handleSearch} />
        {loading && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </section>

      {weatherData && (
        <>
          <section className="py-12 bg-secondaryBg">
            <WeatherCard
              location={weatherData.location}
              temperature={weatherData.temperature}
              description={weatherData.description}
            />
          </section>

          <section className="py-12">
            <div className="container mx-auto">
              <h2 className="text-2xl text-primaryColor mb-20 ml-4">
                5 Days Forecast
              </h2>
              <WeatherForecast forecast={weatherData.forecast} />
            </div>
          </section>

          <section className="py-10 bg-secondaryBg">
            <div className="container fluid mx-auto">
              <h2 className="text-2xl text-primaryColor my-4 ml-4">
                DAILY EVOLUTION
              </h2>
              <WeatherChart data={weatherData.dailyEvolution} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
