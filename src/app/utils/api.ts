import axios from "axios";

const API_KEY = "VaWatRtIGYAOZo8dkS3RtzGld6qHft8X";
const BASE_URL = "http://dataservice.accuweather.com";

interface WeatherResponse {
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

export const getCityWeather = async (
  cityName: string
): Promise<WeatherResponse> => {
  try {
    const locationResponse = await axios.get(
      `${BASE_URL}/locations/v1/cities/search`,
      { params: { q: cityName, apikey: API_KEY } }
    );
    const locationKey = locationResponse.data[0].Key;
    const locationCountryId = locationResponse.data[0].Country.ID;

    const currentWeatherResponse = await axios.get(
      `${BASE_URL}/currentconditions/v1/${locationKey}`,
      { params: { apikey: API_KEY } }
    );
    console.log("locationResponse", locationResponse);

    const forecastResponse = await axios.get(
      `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?&metric=true`,
      { params: { apikey: API_KEY } }
    );
    console.log("forecastResponse", forecastResponse);
    const currentWeather = currentWeatherResponse.data[0];
    const forecast = forecastResponse.data.DailyForecasts;

    return {
      location: cityName + ", " + locationCountryId,
      temperature: currentWeather.Temperature.Metric.Value,
      description: currentWeather.WeatherText,
      dailyEvolution: forecast.map((day: any) => ({
        time: new Date(day.Date).toLocaleTimeString(),
        temperature: day.Temperature.Maximum.Value,
      })),
      forecast: forecast.map((day: any) => ({
        date: day.Date,
        minTemperature: day.Temperature.Minimum.Value,
        maxTemperature: day.Temperature.Maximum.Value,
        description: day.Day.IconPhrase,
        icon: day.Day.Icon,
      })),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
