import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WeatherForm from "../WeatherForm";

describe("WeatherForm", () => {
  it("should render correctly", () => {
    const { getByLabelText, getByText } = render(
      <WeatherForm onSearch={jest.fn()} />
    );
    expect(getByLabelText("City Name")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
  });

  it("should call onSearch with the city name when the form is submitted", () => {
    const onSearch = jest.fn();
    const { getByLabelText, getByText } = render(
      <WeatherForm onSearch={onSearch} />
    );

    const input = getByLabelText("City Name");
    fireEvent.change(input, { target: { value: "London" } });

    const button = getByText("Search");
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith("London");
  });

  it("should not call onSearch if the input is empty", () => {
    const onSearch = jest.fn();
    const { getByText } = render(<WeatherForm onSearch={onSearch} />);

    const button = getByText("Search");
    fireEvent.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });
});
