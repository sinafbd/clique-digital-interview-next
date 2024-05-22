import { Meta, StoryObj } from "@storybook/react";
import WeatherForm from "@/app/components/WeatherForm";

export default {
  title: "Components/WeatherForm",
  component: WeatherForm,
} as Meta;

type Story = StoryObj<typeof WeatherForm>;

export const Primary: Story = {
  args: {
    onSearch: (city: string) => alert(`Searching for ${city}`),
  },
};
