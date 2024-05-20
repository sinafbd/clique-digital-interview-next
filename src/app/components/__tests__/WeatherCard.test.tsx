import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WeatherCard from "../WeatherCard";
import { TemperatureProvider } from "../../context/TemperatureContext";

describe("WeatherCard", () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<TemperatureProvider>{ui}</TemperatureProvider>);
  };

  it("should render correctly", () => {
    const { getByText } = renderWithProvider(
      <WeatherCard location="London" temperature={20} description="Sunny" />
    );

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    expect(getByText("London")).toBeInTheDocument();
    expect(getByText("20°")).toBeInTheDocument();
    expect(getByText(`${today}, Sunny`)).toBeInTheDocument();
  });

  it("should toggle temperature units", () => {
    const { getByText } = renderWithProvider(
      <WeatherCard location="London" temperature={20} description="Sunny" />
    );

    const celsiusButton = getByText("C");
    const fahrenheitButton = getByText("F");

    fireEvent.click(fahrenheitButton);
    expect(getByText("68°")).toBeInTheDocument(); // 20°C -> 68°F

    fireEvent.click(celsiusButton);
    expect(getByText("20°")).toBeInTheDocument();
  });
});
