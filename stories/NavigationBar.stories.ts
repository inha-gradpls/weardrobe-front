import NavigationBar from '@/components/NavigationBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: NavigationBar,
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    pages: ['HOME', 'WARDROBE', 'MYPAGE'],
  },
};
