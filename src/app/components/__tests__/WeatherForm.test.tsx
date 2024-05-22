import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import WeatherForm from "../../components/WeatherForm";
import { getCitySuggestions } from "../../utils/api";

// Debugging: log to ensure the mock is correctly set up
console.log("Mocking getCitySuggestions:", getCitySuggestions);

jest.mock("../../utils/api", () => ({
  getCitySuggestions: jest.fn(),
}));

const mockedGetCitySuggestions = getCitySuggestions as jest.MockedFunction<
  typeof getCitySuggestions
>;

describe("WeatherForm", () => {
  beforeEach(() => {
    mockedGetCitySuggestions.mockClear();
  });

  it("renders input correctly", () => {
    render(<WeatherForm onSearch={jest.fn()} />);
    const input = screen.getByLabelText(/City Name/i);
    expect(input).toBeInTheDocument();
  });

  it("shows suggestions when typing", async () => {
    mockedGetCitySuggestions.mockResolvedValueOnce([
      { Key: "123", LocalizedName: "New York" },
      { Key: "456", LocalizedName: "Los Angeles" },
    ]);

    render(<WeatherForm onSearch={jest.fn()} />);
    const input = screen.getByLabelText(/City Name/i);

    fireEvent.change(input, { target: { value: "New" } });

    await waitFor(() => {
      expect(screen.getByText("New York")).toBeInTheDocument();
      expect(screen.getByText("Los Angeles")).toBeInTheDocument();
    });
  });

  it("hides suggestions when clicking outside", async () => {
    mockedGetCitySuggestions.mockResolvedValueOnce([
      { Key: "123", LocalizedName: "New York" },
      { Key: "456", LocalizedName: "Los Angeles" },
    ]);

    render(<WeatherForm onSearch={jest.fn()} />);
    const input = screen.getByLabelText(/City Name/i);

    fireEvent.change(input, { target: { value: "New" } });

    await waitFor(() => {
      expect(screen.getByText("New York")).toBeInTheDocument();
    });

    fireEvent.mouseDown(document);

    await waitFor(() => {
      expect(screen.queryByText("New York")).not.toBeInTheDocument();
    });
  });
});
