import React from "react";
import { render } from "@testing-library/react";
import WeatherForecast from "../WeatherForecast";
import { TemperatureProvider } from "../../context/TemperatureContext";

const mockForecast = [
  {
    date: "2024-05-20T07:00:00+01:00",
    minTemperature: 10,
    maxTemperature: 20,
    description: "Sunny",
    icon: 1,
  },
  {
    date: "2024-05-21T07:00:00+01:00",
    minTemperature: 12,
    maxTemperature: 22,
    description: "Partly cloudy",
    icon: 2,
  },
];

describe("WeatherForecast", () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<TemperatureProvider>{ui}</TemperatureProvider>);
  };

  it("should render forecast correctly", () => {
    const { getByText, getAllByAltText } = renderWithProvider(
      <WeatherForecast forecast={mockForecast} />
    );
    expect(getByText("MON 20")).toBeInTheDocument();
    expect(getByText("TUE 21")).toBeInTheDocument();
    expect(getAllByAltText("Sunny")).toHaveLength(1);
    expect(getAllByAltText("Partly cloudy")).toHaveLength(1);
    expect(getByText("20°")).toBeInTheDocument();
    expect(getByText("10°")).toBeInTheDocument();
  });
});
