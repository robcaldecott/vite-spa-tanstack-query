import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-remix-react-router";
import { ErrorPage } from "../error-page";

const meta = {
  title: "ErrorPage",
  component: ErrorPage,
  args: {
    onRetry: () => {},
  },
  decorators: [withRouter()],
} satisfies Meta<typeof ErrorPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    message: "An error occurred",
  },
};
