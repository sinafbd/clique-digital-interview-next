import axios from "axios";

const API_KEY = "S3feNNCWpT71RRRcbriNuL4EQoTPTc0f";
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

interface AutocompleteResponse {
  Key: string;
  LocalizedName: string;
}

interface LocationResponse {
  Key: string;
  LocalizedName: string;
  Country: { ID: string };
}

interface CurrentWeatherResponse {
  Temperature: { Metric: { Value: number } };
  WeatherText: string;
}

interface HourlyForecastResponse {
  DateTime: string;
  Temperature: { Value: number };
}

interface DailyForecastResponse {
  Date: string;
  Temperature: {
    Minimum: { Value: number };
    Maximum: { Value: number };
  };
  Day: { IconPhrase: string; Icon: number };
}

export const getCityWeather = async (
  cityName: string
): Promise<WeatherResponse> => {
  try {
    // Fetch location key
    const { data: locationData } = await axios.get<LocationResponse[]>(
      `${BASE_URL}/locations/v1/cities/search`,
      { params: { q: cityName, apikey: API_KEY } }
    );
    const location = locationData[0];
    const locationKey = location.Key;
    const locationCountryId = location.Country.ID;

    // Fetch current weather
    const { data: currentWeatherData } = await axios.get<
      CurrentWeatherResponse[]
    >(`${BASE_URL}/currentconditions/v1/${locationKey}`, {
      params: { apikey: API_KEY },
    });
    const currentWeather = currentWeatherData[0];

    // Fetch hourly forecast
    const { data: hourlyForecastData } = await axios.get<
      HourlyForecastResponse[]
    >(`${BASE_URL}/forecasts/v1/hourly/12hour/${locationKey}`, {
      params: { apikey: API_KEY, metric: true, details: true },
    });

    // Filter and map hourly data for daily evolution
    const dailyEvolution = hourlyForecastData
      .filter((_, index) => index % 2 === 0)
      .map((hour) => ({
        time: hour.DateTime,
        temperature: hour.Temperature.Value,
      }));

    // Fetch daily forecast
    const { data: dailyForecastData } = await axios.get<{
      DailyForecasts: DailyForecastResponse[];
    }>(`${BASE_URL}/forecasts/v1/daily/5day/${locationKey}`, {
      params: { apikey: API_KEY, metric: true },
    });

    const forecast = dailyForecastData.DailyForecasts.map((day) => ({
      date: day.Date,
      minTemperature: day.Temperature.Minimum.Value,
      maxTemperature: day.Temperature.Maximum.Value,
      description: day.Day.IconPhrase,
      icon: day.Day.Icon,
    }));

    return {
      location: `${cityName}, ${locationCountryId}`,
      temperature: currentWeather.Temperature.Metric.Value,
      description: currentWeather.WeatherText,
      dailyEvolution,
      forecast,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Could not fetch weather data");
  }
};

export const getCitySuggestions = async (
  query: string
): Promise<AutocompleteResponse[]> => {
  try {
    const { data } = await axios.get<AutocompleteResponse[]>(
      `${BASE_URL}/locations/v1/cities/autocomplete`,
      { params: { q: query, apikey: API_KEY } }
    );
    return data.map((item) => ({
      Key: item.Key,
      LocalizedName: item.LocalizedName,
    }));
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    throw new Error("Could not fetch city suggestions");
  }
};
