import FilterButton from '@/components/Button/FilterButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: FilterButton,
} satisfies Meta<typeof FilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    options: [
      'option1',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
      'option2',
      'option3',
    ],
    label: 'filter1',
  },
};
