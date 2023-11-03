interface Product {
  id: number;
  sellerId: number;
  buyerId: number;
  categoryId: number;
  brandId: number;
  name: string;
  price: number;
  deliveryAvailable: boolean;
  purchaseDate: string;
  productImage: string;
  description: string;
  productStatus: string;
  viewCount: number;
  createdAt: string;
}

type HomeFeedResponse = Product[];

type NavigationPage = 'HOME' | 'WARDROBE' | 'MYPAGE';
