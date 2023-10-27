import ProductCard from '../components/ProductCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ProductCard,
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 0,
    name: '상품이름',
    category: '카테고리1 > 카테고리2',
    price: 1000,
    viewCount: 12,
    likeCount: 34,
    commentCount: 56,
  },
};
