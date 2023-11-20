import TopBar from '@/components/TopBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: TopBar,
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    backButton: true,
    children: [],
    actions: [],
  },
};
