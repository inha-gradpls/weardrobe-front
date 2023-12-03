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
  favorite?: boolean;
  createdDate: string;
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

interface WardrobeData {
  wardrobeUser: UserItem[];
  favoriteProduct: ClothItem[];
}

type WardrobeDataResponse = WardrobeData;

interface UserItem {
  id: number;
  userImage: string;
}

interface ClothItem {
  id: number;
  productImage: string;
  name: string;
}

interface VitonFormData {
  wardrobeUserId: number;
  favoriteProductId: number;
}

interface VitonResponse {
  vitonImage: string;
}

interface SignUpFormData {
  name: string;
  nickname: string;
  age: number;
  gender: 'M' | 'F';
  phoneNumber: string;
}

interface SignUpResponse {
  id: number;
}

interface ProductFormData {
  name: string;
  price: number;
  deliveryAvailable: boolean;
  productImage: File;
  description: string;
  categoryName: string;
  brandName: string;
}

interface RegisterProductResponse {
  id: number;
}

type UserHistoryType = 'sell' | 'buy' | 'favorite';
interface UserHistory {
  id: number;
  name: string;
  price: number;
  productImage: string;
  createdDate: string;
  history: UserHistoryType;
}

interface RegisterImageResponse {
  id: number;
  type: string;
}
