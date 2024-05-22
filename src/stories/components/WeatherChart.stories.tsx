import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import WeatherChart from "../../app/components/WeatherChart";
import { TemperatureProvider } from "../../app/context/TemperatureContext";

export default {
  title: "Components/WeatherChart",
  component: WeatherChart,
  decorators: [
    (Story) => (
      <TemperatureProvider>
        <Story />
      </TemperatureProvider>
    ),
  ],
} as Meta<typeof WeatherChart>;

type Story = StoryObj<typeof WeatherChart>;

export const Primary: Story = {
  args: {
    data: [
      { time: "2024-05-22T13:00:00+02:00", temperature: 15 },
      { time: "2024-05-22T15:00:00+02:00", temperature: 17 },
      { time: "2024-05-22T17:00:00+02:00", temperature: 19 },
      { time: "2024-05-22T19:00:00+02:00", temperature: 20 },
      { time: "2024-05-22T21:00:00+02:00", temperature: 18 },
      { time: "2024-05-22T23:00:00+02:00", temperature: 16 },
    ],
  },
};
