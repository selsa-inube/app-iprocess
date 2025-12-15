import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { OptionItem, OptionItemProps } from "./index";

const meta: Meta<typeof OptionItem> = {
  title: "feedback/OptionsPeriod/OptionItem",
  component: OptionItem,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<OptionItemProps> = (args) => {
  return (
      <OptionItem {...args} />
  );
};

export const Default: StoryFn<OptionItemProps> = Template.bind({});
Default.args = {
  id: "item",
  label: "item",
};

export default meta;
