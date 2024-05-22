import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherForecast from "@/app/components/WeatherForecast";
import { TemperatureProvider } from "@/app/context/TemperatureContext";

const forecast = [
  {
    date: "2023-05-20",
    minTemperature: 10,
    maxTemperature: 20,
    description: "Cloudy",
    icon: 6,
  },
  {
    date: "2023-05-21",
    minTemperature: 12,
    maxTemperature: 22,
    description: "Partly Cloudy",
    icon: 7,
  },
];

describe("WeatherForecast", () => {
  it("renders forecast correctly", async () => {
    render(
      <TemperatureProvider>
        <WeatherForecast forecast={forecast} />
      </TemperatureProvider>
    );

    expect(await screen.findByText("SAT 20")).toBeInTheDocument();
    expect(await screen.findByText("SUN 21")).toBeInTheDocument();
    expect(await screen.findByText("Cloudy")).toBeInTheDocument();
    expect(await screen.findByText("Partly Cloudy")).toBeInTheDocument();
  });

  it("displays temperatures in correct units", async () => {
    render(
      <TemperatureProvider>
        <WeatherForecast forecast={forecast} />
      </TemperatureProvider>
    );

    expect(await screen.findByText(/20°/)).toBeInTheDocument();
    expect(await screen.findByText(/10°/)).toBeInTheDocument();
    expect(await screen.findByText(/22°/)).toBeInTheDocument();
    expect(await screen.findByText(/12°/)).toBeInTheDocument();
  });
});
