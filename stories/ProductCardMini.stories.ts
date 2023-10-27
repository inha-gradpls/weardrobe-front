import ProductCardMini from '@/components/ProductCard/ProductCardMini';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ProductCardMini,
} satisfies Meta<typeof ProductCardMini>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 0,
    name: '상품이름',
    price: 1000,
  },
};
