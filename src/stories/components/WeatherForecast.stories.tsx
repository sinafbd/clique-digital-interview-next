import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import WeatherForecast from "@/app/components/WeatherForecast";
import { TemperatureProvider } from "@/app/context/TemperatureContext";

export default {
  title: "Components/WeatherForecast",
  component: WeatherForecast,
  decorators: [
    (Story) => (
      <TemperatureProvider>
        <Story />
      </TemperatureProvider>
    ),
  ],
} as Meta<typeof WeatherForecast>;

type Story = StoryObj<typeof WeatherForecast>;

export const Primary: Story = {
  args: {
    forecast: [
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
    ],
  },
};
