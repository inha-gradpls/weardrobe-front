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

interface BrandFilter {
  id: number;
  name: string;
}

interface CategoryFilter {
  id: number;
  name: string;
  parentId: number | null;
  parentName: string | null;
}
interface FilterResponse {
  categoryFilter: CategoryFilter[];
  brandFilter: BrandFilter[];
}

type ProductOrder = 'createdDate' | 'price' | 'viewCount';

interface UserInfo {
  id: number;
  name?: string;
  nickname: string;
  imageUrl: string;
  age?: number;
  gender?: string;
  createdDate?: string;
  phoneNumber?: string;
  reliableScore: number;
}

type UserInfoResponse = UserInfo;

interface ProductInfo {
  id: number;
  name: string;
  price: number;
  sellerId?: number;
  sellerNickname?: string;
  categoryParentName: string;
  categoryName: string;
  brandName?: string;
  deliveryAvailable?: boolean;
  productImage: string;
  description?: string;
  status?: 'SELL' | 'BUY';
  createDate: string;
  viewCount: number;
  heartCount: number;
  commentCount: number;
}

type ProductInfoResponse = ProductInfo;

interface SearchHistoryItem {
  id: number;
  word: string;
}

type SearchHistoryResponse = SearchHistoryItem[];

type SearchResultResponse = ProductInfo[];

interface SignUpFormData {
  name: string;
  nickname: string;
  age: number;
  gender: 'M' | 'F';
  phoneNumber: string;
}
