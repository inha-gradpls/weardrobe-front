import IconButton from '@/components/Button/IconButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'test',
    icon: 'gate',
  },
};
