import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import WeatherCard from "../../app/components/WeatherCard";
import { TemperatureProvider } from "../../app/context/TemperatureContext";

export default {
  title: "Components/WeatherCard",
  component: WeatherCard,
  decorators: [
    (Story) => (
      <TemperatureProvider>
        <Story />
      </TemperatureProvider>
    ),
  ],
} as Meta<typeof WeatherCard>;

type Story = StoryObj<typeof WeatherCard>;

export const Primary: Story = {
  args: {
    location: "New York, US",
    temperature: 20,
    description: "Sunny",
  },
};
