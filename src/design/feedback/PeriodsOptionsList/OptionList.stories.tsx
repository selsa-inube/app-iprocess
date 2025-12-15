import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { PeriodsOptionsList, PeriodsOptionsListProps } from "./index";

const meta: Meta<typeof PeriodsOptionsList> = {
  title: "feedback/OptionsPeriod/PeriodsOptionsList",
  component: PeriodsOptionsList,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const options = [
  { id: "1", label: "Item 1" },
  { id: "2", label: "Item 2" },
  { id: "3", label: "Item 3" },
];

const Template: StoryFn<PeriodsOptionsListProps> = (args) => {
  return (
      <PeriodsOptionsList {...args} />
  );
};

export const Default: StoryFn<PeriodsOptionsListProps> = Template.bind({});
Default.args = {
  options,
  selectedOption: "",
  handleOptionClick: ()=> void 0,
};

export default meta;
