import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Home from "../app/page";
import { TemperatureProvider } from "../app/context/TemperatureContext";

export default {
  title: "Pages/Home",
  component: Home,
  decorators: [
    (Story) => (
      <TemperatureProvider>
        <Story />
      </TemperatureProvider>
    ),
  ],
} as Meta<typeof Home>;

type Story = StoryObj<typeof Home>;

export const Primary: Story = {
  args: {},
};
