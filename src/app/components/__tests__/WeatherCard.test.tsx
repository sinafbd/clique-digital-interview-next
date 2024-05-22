import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherCard from "../WeatherCard";
import { TemperatureProvider } from "../../context/TemperatureContext";

describe("WeatherCard", () => {
  it.only("renders weather information correctly", () => {
    render(
      <TemperatureProvider>
        <WeatherCard
          location="Amsterdam, NL"
          temperature={20}
          description="Sunny"
        />
      </TemperatureProvider>
    );

    expect(screen.getByText("Amsterdam, NL")).toBeInTheDocument();
    expect(screen.getByText(/20°/)).toBeInTheDocument();
    expect(screen.getByText(/Sunny/)).toBeInTheDocument();
  });

  it("toggles temperature unit correctly", () => {
    render(
      <TemperatureProvider>
        <WeatherCard
          location="Amsterdam, NL"
          temperature={20}
          description="Sunny"
        />
      </TemperatureProvider>
    );

    const celsiusButton = screen.getByText("C");
    const fahrenheitButton = screen.getByText("F");

    fireEvent.click(fahrenheitButton);

    expect(screen.getByText(/68°/)).toBeInTheDocument();

    fireEvent.click(celsiusButton);

    expect(screen.getByText(/20°/)).toBeInTheDocument();
  });
});
