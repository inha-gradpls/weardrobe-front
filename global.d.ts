interface Product {
  id: number;
  seller_id: number;
  buyer_id: number;
  category_id: number;
  brand_id: number;
  name: string;
  price: number;
  delivery_available: boolean;
  purchase_date: string;
  product_image: string;
  description: string;
  product_status: string;
  view_count: number;
  created_at: string;
}

type HomeFeedResponse = Product[];

type NavigationPage = 'HOME' | 'WARDROBE' | 'MYPAGE';
